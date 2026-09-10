# Contributing to Sitara MPU Open Source

Engineers and community contributors can submit technical blogs, conference talks, and video recordings through standard Git pull requests.

---

## Quick Navigation

- [Image Specifications & Dimensions Guide](#image-specifications--dimensions-guide)
- [Contributing Blogs](#contributing-blogs)
- [Contributing Conference Talks](#contributing-conference-talks)
- [Contributing Videos](#contributing-videos)
- [How to Add and Reference Images](#how-to-add-and-reference-images)
- [Review Checklist](#review-checklist)

---

## Image Specifications & Dimensions Guide

To ensure consistent visuals, crisp rendering on high-DPI displays, and optimal page load performance across desktop and mobile devices, adhere to the following image dimensions and aspect ratios:

| Content Type | Recommended Dimensions | Aspect Ratio | Storage Directory | Front Matter Key | Fallback / Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **All Blogs (Featured, Grid & Post Pages)** | **1467 × 1072 px** | **1467 : 1072** (~1.37:1 / 4:3) | `assets/images/blogs/` | `image: /assets/images/blogs/<name>.png` | Standardized across featured hero, 3-column blog grid, and individual blog post headers. Falls back to `featured-default.png`. Set `featured: true` to highlight on homepage. Supports optional `external_url` to link the card out to a third-party article instead of hosting it locally. |
| **In-Article Diagrams / Plots** | Width: **1200 – 1920 px** *(Height flexible)* | Flexible | `assets/images/blogs/` | Embedded in body Markdown | Use crisp PNG or SVG for block diagrams, schematics, waveforms, and architecture charts. |
| **Conference Talks** | **1280 × 720 px** or YouTube HQ | **16:9** | YouTube CDN or `assets/images/talks/` | `image: "https://img.youtube.com/vi/<ID>/hqdefault.jpg"` | Standard presentation slide / title cover. Automatically displays YouTube thumbnail or local custom image. |
| **Technical Videos** | **1280 × 720 px** or TI/Brightcove CDN | **16:9** | `assets/images/videos/` or CDN | `image: /assets/images/videos/<name>.png` | Clean 16:9 video preview without play overlays. Supports `external_url`, `source: "TI.com"`, and `video_embed`. |

### Image Best Practices
- **Formats**: Use `.png` (ideal for diagrams, text, and vector-style graphics) or `.jpg`/`.webp` (ideal for photography and complex gradients).
- **Compression**: Keep image file sizes under **500 KB** (or max **1 MB** for high-resolution graphics) using tools like TinyPNG, ImageOptim, or `oxipng`.
- **Naming Convention**: Use lowercase alphanumeric characters and hyphens (e.g. `blog-am62x-power.png`, `talk-zephyr-rtos.png`, `diagram-rpmsg-flow.png`).

---

## Contributing Blogs

1. **Create a branch**:
   ```bash
   git checkout -b feature/my-new-blog
   ```
2. **Copy the blog template**:
   ```bash
   cp docs/blog-template.md _posts/YYYY-MM-DD-short-title.md
   ```
3. **Add Cover Image**:
   - Save your cover image to `assets/images/blogs/your-blog-image.png`.
   - Recommended size: **1467 × 1072 px** (standard aspect ratio used across all cards and article headers).
4. **Fill in the Front Matter**:
   ```yaml
   ---
   layout: post
   title: "Your Engineering Blog Title"
   author: "Sitara MPU Software Team"
   date: 2026-09-05
   categories: [Linux, Power]
   tags: [AM62x, CPUIdle, Power Management]
   description: "A practical look at power optimization techniques on AM62x."
   featured: false # Set to true to highlight as Featured Blog on the homepage and blog page
   image: /assets/images/blogs/your-blog-image.png
   external_url: "https://example.com/original-article" # Optional: link out to a third-party/external article instead of hosting it on this site
   ---
   ```
5. **Write Article in Markdown**: Include code blocks, diagrams, and section headings.
   - **Linking to an external/third-party article**: If you're featuring an article that already lives elsewhere (e.g. a partner or third-party engineering blog) and don't want to duplicate its content here, set `external_url` in the front matter to that article's URL. On the `/blog/` listing page, the featured card and grid card's thumbnail, title, and "Read article"/"Read full article" button will all link directly to `external_url` and open it in a new tab instead of this site's own post page. Keep the Markdown body to a short one-line note (e.g. "This article was originally published on the XYZ engineering blog. Read the full article at the link above.") for the rare case someone navigates directly to the internal post URL — do not reproduce the external article's content here. If `external_url` is omitted, the card links to the post's own internal page as before.
6. **Submit Pull Request**: Open a PR against `main`.

---

## Contributing Conference Talks

1. **Create a branch**:
   ```bash
   git checkout -b feature/my-conference-talk
   ```
2. **Copy the talk template**:
   ```bash
   cp docs/talk-template.md _talks/short-talk-slug.md
   ```
3. **Add YouTube Thumbnail or Cover Image**:
   - Use YouTube thumbnail format: `image: "https://img.youtube.com/vi/<YOUTUBE_ID>/hqdefault.jpg"`
   - Or save local image to `assets/images/talks/talk-slug.png` (**1280 × 720 px**, 16:9).
4. **Fill in the Front Matter**:
   ```yaml
   ---
   layout: talk
   title: "Scaling Secure Boot with U-Boot Binman"
   category: "Security" # Options: Linux, DSP, Security, Zephyr, Power, Industrial, Graphics
   conference: "Embedded Linux Conference (ELCE)"
   year: 2026
   speaker: "Engineer Name"
   description: "How U-Boot Binman and HSM signing enable scalable secure boot image creation."
   slides: "https://example.com/slides.pdf" # Link to presentation slides (PDF/hosted)
   youtube: "https://www.youtube.com/watch?v=VIDEO_ID" # Link to recording
   image: "https://img.youtube.com/vi/VIDEO_ID/hqdefault.jpg" # 16:9 thumbnail
   ---
   ```
5. **Add Description and Key Takeaways** in the Markdown body.
6. **Submit Pull Request**: Open a PR against `main`.

---

## Contributing Videos

1. **Create a branch**:
   ```bash
   git checkout -b feature/my-new-video
   ```
2. **Copy the video template**:
   ```bash
   cp docs/video-template.md _videos/short-video-slug.md
   ```
3. **Add Thumbnail**:
   - Save video preview image to `assets/images/videos/your-video-name.png` (**16:9** aspect ratio).
4. **Fill in the Front Matter**:
   ```yaml
   ---
   layout: video
   title: "Integrated Wired and Wireless Linux Networking"
   category: Networking # Options: Automotive, Edge AI, Industrial, Linux, Networking
   year: 2026
   speaker: "Texas Instruments"
   description: "Technical walkthrough of wired and wireless Linux networking using the AM64x starter kit."
   external_url: "https://www.ti.com/video/6258686532001" # Or YouTube URL
   source: "TI.com"
   video_embed: "https://players.brightcove.net/3816841626001/d0PyGHVSu_default/index.html?videoId=6258686532001" # Optional embed
   thumbnail: "/assets/images/videos/your-video-name.png"
   image: "/assets/images/videos/your-video-name.png"
   featured: false
   ---
   ```
5. **Add Context** in the Markdown body.
6. **Submit Pull Request**: Open a PR against `main`.

---

## How to Add and Reference Images

### 1. Adding Blog Cover Images
1. Save your cover image into `assets/images/blogs/` (e.g. `assets/images/blogs/my-feature.png`) with **1467 × 1072 px** dimensions.
2. In the Markdown file's YAML front matter, reference it with an absolute root-relative path:
   ```yaml
   image: /assets/images/blogs/my-feature.png
   ```

### 2. Adding In-Article Diagrams, Plots, and Screenshots
1. Save diagram/screenshot files into `assets/images/blogs/` (e.g. `assets/images/blogs/my-architecture-diagram.png`).
2. In your Markdown body, embed the image using standard Markdown syntax:
   ```markdown
   ![AM62x RPMsg Architecture Overview](/assets/images/blogs/my-architecture-diagram.png)
   ```
3. *(Optional)* For centered images with captions:
   ```html
   <figure style="text-align: center; margin: 24px 0;">
     <img src="/assets/images/blogs/my-architecture-diagram.png" alt="Architecture Overview" style="max-width: 100%; height: auto; border-radius: 6px;">
     <figcaption style="font-size: 13.5px; color: #666; margin-top: 8px;">Figure 1: Sitara RPMsg inter-core communication buffer architecture.</figcaption>
   </figure>
   ```

### 3. Adding Conference Talk Cover Images
1. Use YouTube thumbnail: `image: "https://img.youtube.com/vi/<YOUTUBE_ID>/hqdefault.jpg"`
2. Or save custom 16:9 image to `assets/images/talks/` (e.g. `assets/images/talks/elce-2026-power.png`).

### 4. Adding Video Thumbnails
1. Save 16:9 preview screenshot to `assets/images/videos/my-video.png`.
2. Set `image:` and `thumbnail:` in `_videos/my-video.md` front matter:
   ```yaml
   image: /assets/images/videos/my-video.png
   thumbnail: /assets/images/videos/my-video.png
   ```

---

## Review Checklist

Before submitting your pull request, verify the following items:

- [ ] **Image Specifications**: Blog images use standard **1467 × 1072 px** dimensions. Talk/video images use **16:9** aspect ratio.
- [ ] **File Size**: Images and assets are optimized and compressed (under 500 KB whenever possible).
- [ ] **Technical Review**: Architecture details, register names, and commands are accurate.
- [ ] **No Confidential Information**: Content contains only public, non-restricted material.
- [ ] **Claims Verified**: Product capabilities and performance figures align with official Sitara collateral.
- [ ] **Links & Embeds**: YouTube IDs, Brightcove video IDs, slide deck URLs, and external links (including blog and video `external_url` values) resolve properly and open correctly in a new tab.
- [ ] **Attribution**: Speaker and author credits are accurate.
- [ ] **Chronological Order**: The `year` front matter is set correctly; the talks page sorts entries by `year` (newest first), so no manual reordering is needed.
