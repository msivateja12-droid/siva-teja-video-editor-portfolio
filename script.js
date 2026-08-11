/* =========================================================================
   SIVA TEJA — VIDEO EDITOR PORTFOLIO
   SCRIPT
   ========================================================================= */
(() => {
  "use strict";

  const cfg = window.SITE_CONFIG;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* -----------------------------------------------------------------------
     ICONS (inline, reused across social cards)
  ----------------------------------------------------------------------- */
  const ICONS = {
    youtube: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.5V8.5L15.8 12Z"/></svg>',
    instagram: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="2.5" y="2.5" width="19" height="19" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none"/></svg>',
    telegram: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22 3 2.5 10.7c-1.3.5-1.3 1.3-.2 1.6l5 1.6 1.9 5.9c.2.6.4.8.9.8.4 0 .6-.2.9-.5l2.2-2.1 4.6 3.4c.8.5 1.4.2 1.6-.8L23.9 4.4c.3-1.2-.4-1.8-1.9-1.4Zm-13 11.5-1.1-3.6L18 6.4c.4-.3.8 0 .5.4L9 14.5Z"/></svg>'
  };

  /* -----------------------------------------------------------------------
     VIDEO COMPONENT — renders an mp4/YouTube/Vimeo trigger onto a frame
  ----------------------------------------------------------------------- */
  function buildVideoMarkup({ type, src, title }) {
    if (type === "youtube" && src) {
      return `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${src}?autoplay=1" title="${title}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen loading="lazy"></iframe>`;
    }
    if (type === "vimeo" && src) {
      return `<iframe width="100%" height="100%" src="https://player.vimeo.com/video/${src}?autoplay=1" title="${title}" frameborder="0" allow="autoplay" allowfullscreen loading="lazy"></iframe>`;
    }
    if (type === "mp4" && src) {
      return `<video width="100%" height="100%" src="${src}" controls autoplay playsinline></video>`;
    }
    return `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-family:var(--font-mono);font-size:12px;color:var(--text-faint);">Add a video source in config.js</div>`;
  }

  function playInFrame(frameEl, videoData) {
    frameEl.innerHTML = buildVideoMarkup(videoData);
  }

  /* -----------------------------------------------------------------------
     RENDER: SELECTED WORK GRID
  ----------------------------------------------------------------------- */
  const projectGrid = document.getElementById("projectGrid");
  cfg.projects.forEach((p, i) => {
    const card = document.createElement("article");
    card.className = "project-card is-shown";
    card.dataset.category = p.category;
    card.innerHTML = `
      <div class="video-frame" data-project-index="${i}">
        <div class="video-frame__scan"></div>
        <div class="video-frame__tag">${p.tag}</div>
        <button class="play-btn" aria-label="Play ${p.title}">
          <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
        </button>
        <div class="video-frame__meta"><span>PROJECT_${String(i + 1).padStart(2, "0")}</span><span>16:9</span></div>
      </div>
      <div class="project-card__body">
        <div>
          <p class="project-card__title">${p.title}</p>
          <p class="project-card__desc">${p.description}</p>
        </div>
        <span class="project-card__watch">Watch →</span>
      </div>
    `;
    projectGrid.appendChild(card);

    card.querySelector(".video-frame").addEventListener("click", function () {
      playInFrame(this, { type: p.type, src: p.src, title: p.title });
    });
  });

  /* -----------------------------------------------------------------------
     FILTERING
  ----------------------------------------------------------------------- */
  const filterRow = document.getElementById("filterRow");
  filterRow.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;
    filterRow.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    const filter = btn.dataset.filter;
    document.querySelectorAll(".project-card").forEach((card) => {
      const match = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("is-shown", match);
    });
  });

  /* -----------------------------------------------------------------------
     RENDER: YOUTUBE SECTION
  ----------------------------------------------------------------------- */
  const yt = cfg.channels.youtube;
  document.getElementById("ytChannelName").textContent = yt.name;
  document.getElementById("ytSubCount").textContent = yt.subscribers || "";
  const ytBtn = document.getElementById("ytVisitBtn");
  ytBtn.href = yt.url;

  const ytVideoCards = document.getElementById("ytVideoCards");
  cfg.youtubeVideos.forEach((v, i) => {
    const el = document.createElement("div");
    el.className = "video-card";
    el.innerHTML = `
      <div class="video-frame" data-yt-index="${i}">
        <div class="video-frame__scan"></div>
        <button class="play-btn" aria-label="Watch ${v.title}">
          <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
        </button>
      </div>
      <p class="video-card__title">${v.title}</p>
      <p class="video-card__meta">${v.views || "— views"}</p>
    `;
    ytVideoCards.appendChild(el);
    el.querySelector(".video-frame").addEventListener("click", () => {
      if (v.url) window.open(v.url, "_blank", "noopener");
    });
  });

  /* -----------------------------------------------------------------------
     RENDER: SHORTS / REELS GRID
  ----------------------------------------------------------------------- */
  const shortsGrid = document.getElementById("shortsGrid");
  cfg.shortForm.forEach((s, i) => {
    const el = document.createElement("div");
    el.innerHTML = `
      <div class="video-frame ratio-9-16" data-short-index="${i}">
        <div class="video-frame__scan"></div>
        <div class="video-frame__tag">${s.platform}</div>
        <button class="play-btn" aria-label="Watch short ${i + 1}">
          <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
        </button>
        <div class="video-frame__meta"><span>${s.views || "— views"}</span></div>
      </div>
    `;
    shortsGrid.appendChild(el);
    el.querySelector(".video-frame").addEventListener("click", () => {
      if (s.url) window.open(s.url, "_blank", "noopener");
    });
  });

  /* -----------------------------------------------------------------------
     RENDER: SOCIAL GRID
  ----------------------------------------------------------------------- */
  const socialGrid = document.getElementById("socialGrid");
  const socialCards = [
    { key: "youtube", label: "YouTube", data: cfg.channels.youtube },
    { key: "instagram", label: "Instagram", data: cfg.channels.instagram },
    { key: "telegram", label: "Telegram", data: cfg.channels.telegram }
  ];
  socialCards.forEach(({ key, label, data }) => {
    const el = document.createElement("div");
    el.className = "social-card";
    const iconMarkup = key === "youtube" && cfg.logo
      ? `<img src="${cfg.logo}" alt="${data.name} logo" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">`
      : ICONS[key];
    el.innerHTML = `
      <div class="social-card__icon">${iconMarkup}</div>
      <p class="social-card__platform">${label}</p>
      <p class="social-card__name">${data.name}</p>
      <p class="social-card__desc">${data.description}</p>
      <a class="social-card__link" href="${data.url}" target="_blank" rel="noopener">Visit ${label} →</a>
    `;
    socialGrid.appendChild(el);
  });

  document.getElementById("footerYt").href = cfg.channels.youtube.url;
  document.getElementById("footerIg").href = cfg.channels.instagram.url;
  document.getElementById("footerTg").href = cfg.channels.telegram.url;

  /* -----------------------------------------------------------------------
     RENDER: CONTACT GRID
  ----------------------------------------------------------------------- */
  const contactGrid = document.getElementById("contactGrid");
  const contactItems = [
    { label: "Email", value: cfg.contact.email, href: `mailto:${cfg.contact.email}` },
    { label: "Instagram", value: cfg.contact.instagramHandle, href: cfg.contact.instagramUrl },
    { label: "WhatsApp", value: "Message Me", href: cfg.contact.whatsapp },
    { label: "Telegram", value: cfg.contact.telegramHandle, href: cfg.contact.telegramUrl }
  ];
  contactItems.forEach((c) => {
    const a = document.createElement("a");
    a.className = "contact-item";
    a.href = c.href;
    a.target = "_blank";
    a.rel = "noopener";
    a.innerHTML = `<p class="contact-item__label">${c.label}</p><p class="contact-item__value">${c.value}</p>`;
    contactGrid.appendChild(a);
  });

  /* -----------------------------------------------------------------------
     HERO / SHOWREEL PLAY TRIGGERS
  ----------------------------------------------------------------------- */
  document.querySelectorAll('[data-video-trigger="showreel"]').forEach((el) => {
    el.addEventListener("click", function () {
      const frame = this.closest(".video-frame") || this.closest(".hero__reel");
      playInFrame(frame, { type: cfg.showreel.type, src: cfg.showreel.src, title: "Showreel" });
    });
  });

  /* -----------------------------------------------------------------------
     NAVBAR: scrolled state + mobile menu
  ----------------------------------------------------------------------- */
  const navbar = document.getElementById("navbar");
  const burger = document.getElementById("burger");
  const mobileMenu = document.getElementById("mobileMenu");

  burger.addEventListener("click", () => {
    const open = mobileMenu.classList.toggle("is-open");
    burger.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", open);
  });
  mobileMenu.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      mobileMenu.classList.remove("is-open");
      burger.classList.remove("is-open");
    })
  );

  /* -----------------------------------------------------------------------
     SCROLL: timeline progress, navbar state, active nav link, back to top
  ----------------------------------------------------------------------- */
  const scrollFill = document.getElementById("scrollFill");
  const backToTop = document.getElementById("backToTop");
  const navLinks = document.querySelectorAll(".navbar__links a");
  const sections = ["work", "about", "skills", "social", "contact"].map((id) => document.getElementById(id));

  function onScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollFill.style.width = progress + "%";

    navbar.classList.toggle("is-scrolled", scrollTop > 20);
    backToTop.classList.toggle("is-visible", scrollTop > 600);

    let current = null;
    sections.forEach((sec) => {
      if (sec && sec.getBoundingClientRect().top <= 140) current = sec.id;
    });
    navLinks.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === `#${current}`));
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" }));

  /* -----------------------------------------------------------------------
     REVEAL ON SCROLL
  ----------------------------------------------------------------------- */
  const revealEls = document.querySelectorAll(".reveal, .process-step");
  if (prefersReducedMotion) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => io.observe(el));
  }

  /* -----------------------------------------------------------------------
     TIMECODE — decorative running counter, echoes an editor's timeline
  ----------------------------------------------------------------------- */
  function startTimecode(el, frameSubEl) {
    if (!el || prefersReducedMotion) return;
    let frames = 0;
    const fps = 24;
    setInterval(() => {
      frames++;
      const totalSeconds = Math.floor(frames / fps);
      const f = frames % fps;
      const h = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
      const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
      const s = String(totalSeconds % 60).padStart(2, "0");
      el.firstChild.textContent = `${h}:${m}:${s}`;
      if (frameSubEl) frameSubEl.textContent = `:${String(f).padStart(2, "0")}`;
    }, 1000 / fps);
  }
  const heroTc = document.getElementById("heroTimecode");
  const reelTc = document.getElementById("reelTimecode");
  if (heroTc) startTimecode(heroTc, heroTc.querySelector("span"));
  if (reelTc) startTimecode(reelTc, reelTc.querySelector("span"));

  /* -----------------------------------------------------------------------
     MAGNETIC BUTTONS
  ----------------------------------------------------------------------- */
  if (!prefersReducedMotion && window.matchMedia("(hover: hover)").matches) {
    document.querySelectorAll(".magnetic").forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * 0.18}px, ${y * 0.35}px)`;
      });
      btn.addEventListener("mouseleave", () => (btn.style.transform = ""));
    });
  }

  /* -----------------------------------------------------------------------
     CURSOR DOT
  ----------------------------------------------------------------------- */
  const cursorDot = document.getElementById("cursorDot");
  if (!prefersReducedMotion && window.matchMedia("(hover: hover)").matches) {
    window.addEventListener("mousemove", (e) => {
      cursorDot.classList.add("is-active");
      cursorDot.style.left = e.clientX + "px";
      cursorDot.style.top = e.clientY + "px";
    });
    document.querySelectorAll("a, button, .video-frame").forEach((el) => {
      el.addEventListener("mouseenter", () => cursorDot.classList.add("is-hovering"));
      el.addEventListener("mouseleave", () => cursorDot.classList.remove("is-hovering"));
    });
  }
})();
