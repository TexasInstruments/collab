/**
 * Texas Instruments & Sitara Community UI Scripts
 * - Mobile Navigation Drawer & Backdrop Toggle
 * - Mobile Footer Accordion
 * - Search bar interactions
 */

document.addEventListener('DOMContentLoaded', function() {
  // --- 1. Mobile Menu Drawer & Backdrop ---
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mobileDrawer = document.getElementById('tiMobileDrawer');
  const drawerClose = document.getElementById('tiDrawerClose');
  const drawerBackdrop = document.getElementById('tiDrawerBackdrop');

  function openDrawer() {
    if (mobileDrawer && drawerBackdrop) {
      mobileDrawer.classList.add('is-active');
      drawerBackdrop.classList.add('is-active');
      document.body.style.overflow = 'hidden';
      if (mobileToggle) {
        mobileToggle.setAttribute('aria-expanded', 'true');
      }
    }
  }

  function closeDrawer() {
    if (mobileDrawer && drawerBackdrop) {
      mobileDrawer.classList.remove('is-active');
      drawerBackdrop.classList.remove('is-active');
      document.body.style.overflow = '';
      if (mobileToggle) {
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    }
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      const isActive = mobileDrawer && mobileDrawer.classList.contains('is-active');
      if (isActive) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });
  }

  if (drawerClose) {
    drawerClose.addEventListener('click', function(e) {
      e.stopPropagation();
      closeDrawer();
    });
  }

  if (drawerBackdrop) {
    drawerBackdrop.addEventListener('click', function() {
      closeDrawer();
    });
  }

  // --- 2. Mobile Footer Accordions ---
  const footerHeaders = document.querySelectorAll('.ti-footer-col-header');

  function toggleFooterAccordion(header) {
    if (window.innerWidth <= 768) {
      const parentCol = header.closest('.ti-footer-col');
      if (!parentCol) return;

      const isOpen = parentCol.classList.contains('is-open');

      if (isOpen) {
        parentCol.classList.remove('is-open');
        header.setAttribute('aria-expanded', 'false');
      } else {
        parentCol.classList.add('is-open');
        header.setAttribute('aria-expanded', 'true');
      }
    }
  }

  footerHeaders.forEach(function(header) {
    header.addEventListener('click', function() {
      toggleFooterAccordion(header);
    });

    header.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleFooterAccordion(header);
      }
    });
  });

  // Handle window resize
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      closeDrawer();
      document.querySelectorAll('.ti-footer-col').forEach(function(col) {
        col.classList.remove('is-open');
      });
    }
  });
});
