/**
 * Sitara Community Connect — Client-Side Search
 * Loads search.json at startup, filters in real-time as user types.
 */
(function () {
  'use strict';

  var searchIndex = [];
  var loaded = false;
  var activeResultIndex = -1;

  // Type label map
  var typeLabels = {
    blog: 'Blog',
    talk: 'Talk',
    video: 'Video',
    appnote: 'App Note'
  };

  function getSearchJsonUrl() {
    // Determine the base path for search.json
    var path = window.location.pathname;
    if (path.indexOf('/collab') === 0) {
      return '/collab/search.json';
    }
    if (path.indexOf('/sitara-open-source-talks') === 0) {
      return '/sitara-open-source-talks/search.json';
    }
    return '/search.json';
  }

  function loadIndex(callback) {
    if (loaded) {
      if (callback) callback();
      return;
    }
    var xhr = new XMLHttpRequest();
    xhr.open('GET', getSearchJsonUrl(), true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          try {
            searchIndex = JSON.parse(xhr.responseText);
            loaded = true;
          } catch (e) {
            searchIndex = [];
          }
        }
        if (callback) callback();
      }
    };
    xhr.send();
  }

  function normalize(str) {
    return (str || '').toLowerCase().trim();
  }

  function search(query) {
    var q = normalize(query);
    if (!q || q.length < 2) return [];

    var results = [];
    for (var i = 0; i < searchIndex.length; i++) {
      var item = searchIndex[i];
      var haystack = normalize(
        item.title + ' ' +
        item.description + ' ' +
        (item.categories || []).join(' ') + ' ' +
        (item.tags || []).join(' ') + ' ' +
        item.author
      );

      if (haystack.indexOf(q) !== -1) {
        results.push(item);
      }
      if (results.length >= 10) break;
    }
    return results;
  }

  function renderResults(results, container) {
    container.innerHTML = '';
    activeResultIndex = -1;

    if (results.length === 0) {
      container.innerHTML = '<div class="ti-search-no-results">No results found</div>';
      container.classList.add('is-visible');
      return;
    }

    for (var i = 0; i < results.length; i++) {
      var item = results[i];
      var isExternal = item.type === 'appnote';
      var a = document.createElement('a');
      a.className = 'ti-search-result-item';
      a.href = item.url;
      if (isExternal) {
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
      }

      a.innerHTML =
        '<span class="ti-search-result-type type-' + item.type + '">' +
          (typeLabels[item.type] || item.type) +
        '</span>' +
        '<div class="ti-search-result-body">' +
          '<p class="ti-search-result-title">' + escapeHtml(item.title) + '</p>' +
          '<p class="ti-search-result-desc">' + escapeHtml(item.description) + '</p>' +
        '</div>';

      container.appendChild(a);
    }

    container.classList.add('is-visible');
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str || ''));
    return div.innerHTML;
  }

  function hideResults(container) {
    container.classList.remove('is-visible');
    container.innerHTML = '';
    activeResultIndex = -1;
  }

  function navigateToFirstMatch(query) {
    if (!query || query.trim().length < 2) return;
    loadIndex(function () {
      var matches = search(query);
      if (matches.length > 0) {
        window.location.href = matches[0].url;
      }
    });
  }

  function initSearch(inputSelector, resultsSelector) {
    var input = document.querySelector(inputSelector);
    var results = document.querySelector(resultsSelector);
    if (!input || !results) return;

    var debounceTimer;

    input.addEventListener('input', function () {
      clearTimeout(debounceTimer);
      var query = input.value;

      if (query.length < 2) {
        hideResults(results);
        return;
      }

      debounceTimer = setTimeout(function () {
        loadIndex(function () {
          var matches = search(query);
          renderResults(matches, results);
        });
      }, 150);
    });

    input.addEventListener('focus', function () {
      if (input.value.length >= 2) {
        loadIndex(function () {
          var matches = search(input.value);
          renderResults(matches, results);
        });
      }
    });

    // Handle keyboard navigation (Enter, ArrowUp, ArrowDown, Escape)
    input.addEventListener('keydown', function (e) {
      var items = results.querySelectorAll('.ti-search-result-item');

      if (e.key === 'ArrowDown') {
        if (items.length > 0) {
          e.preventDefault();
          activeResultIndex = (activeResultIndex + 1) % items.length;
          updateActiveItem(items);
        }
      } else if (e.key === 'ArrowUp') {
        if (items.length > 0) {
          e.preventDefault();
          activeResultIndex = (activeResultIndex - 1 + items.length) % items.length;
          updateActiveItem(items);
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        e.stopPropagation();
        if (items.length > 0 && activeResultIndex >= 0 && items[activeResultIndex]) {
          items[activeResultIndex].click();
        } else {
          navigateToFirstMatch(input.value);
        }
      } else if (e.key === 'Escape') {
        hideResults(results);
        input.blur();
      }
    });

    // Close results when clicking outside
    document.addEventListener('click', function (e) {
      if (!input.contains(e.target) && !results.contains(e.target)) {
        hideResults(results);
      }
    });
  }

  function updateActiveItem(items) {
    items.forEach(function (el, idx) {
      if (idx === activeResultIndex) {
        el.classList.add('is-active');
        el.scrollIntoView({ block: 'nearest' });
      } else {
        el.classList.remove('is-active');
      }
    });
  }

  // Initialize on DOM ready
  document.addEventListener('DOMContentLoaded', function () {
    // Preload search index in the background
    loadIndex();

    // Desktop header search
    initSearch('#tiHeaderSearchInput', '#tiSearchResults');
    // Mobile drawer search
    initSearch('.ti-drawer-search-input', '#tiDrawerSearchResults');

    // Prevent any form submission from navigating externally
    var forms = document.querySelectorAll('.ti-search-form, .ti-drawer-search-form');
    forms.forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var input = form.querySelector('input[name="searchTerm"], .ti-drawer-search-input');
        if (input) {
          navigateToFirstMatch(input.value);
        }
        return false;
      });
    });
  });
})();
