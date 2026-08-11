/* =========================================================================
   SIVA TEJA — VIDEO EDITOR PORTFOLIO
   CENTRAL CONFIG
   -------------------------------------------------------------------------
   Everything you'll want to replace with real content lives in this file.
   Nothing else in the codebase needs to change when you update these.
   ========================================================================= */

window.SITE_CONFIG = {

  /* ---------------------------------------------------------------------
     IDENTITY
  --------------------------------------------------------------------- */
  name: "Siva Teja",
  role: "Video Editor",
  tagline: "YouTube \u2022 Shorts \u2022 Reels \u2022 Social Media Content",

  /* ---------------------------------------------------------------------
     CONTACT — replace every placeholder below with your real details.
     Nothing here is invented; these stay as placeholders until you edit them.
  --------------------------------------------------------------------- */
  contact: {
    email: "your@email.com",
    whatsapp: "https://wa.me/910000000000",   // replace with your number
    instagramHandle: "@yourusername",
    instagramUrl: "https://instagram.com/yourusername",
    telegramHandle: "@yourusername",
    telegramUrl: "https://t.me/yourusername"
  },

  /* ---------------------------------------------------------------------
     SOCIAL / CHANNELS
  --------------------------------------------------------------------- */
  channels: {
    youtube: {
      name: "Telugu Cartoon Lover",
      url: "https://youtube.com/@telugucartoonlover7238?si=WDxxb58jTY1NQwfS",
      subscribers: "",  // e.g. "34K+ Subscribers" — leave blank until confirmed
      description: "A Telugu entertainment channel focused on cartoons, anime, storytelling, edits and short-form content."
    },
    instagram: {
      name: "Telugu Cartoon Lover",
      url: "https://www.instagram.com/telugu_cartoon.lover?igsh=MXU5cWlrb2phZmt4Nw==",
      description: "Reels and short-form edits built for fast, scroll-stopping storytelling."
    },
    telegram: {
      name: "Telugu Cartoon Lover",
      url: "https://t.me/Telugu_cartoon_lover",
      description: "Community and content distribution — sharing edits and updates directly with the audience."
    }
  },

  /* ---------------------------------------------------------------------
     BRAND MARK — channel logo, used as favicon and small brand icon.
     Replace assets/logo.jpg with a new file (same name) to update it.
  --------------------------------------------------------------------- */
  logo: "Mallipamula_siva_teja.png",

  /* ---------------------------------------------------------------------
     SHOWREEL — main featured video (hero + showreel section)
     type: "mp4" | "youtube" | "vimeo"
     src:  mp4 file path, YouTube video ID, or Vimeo video ID
  --------------------------------------------------------------------- */
  showreel: {
    type: "mp4",
    src: "assets/video/showreel.mp4",     // replace with your showreel file or embed ID
    poster: "" // optional poster image path
  },

  /* ---------------------------------------------------------------------
     SELECTED WORK — long-form project grid
     category must be one of: youtube | shorts | reels | cinematic | anime
  --------------------------------------------------------------------- */
  projects: [
    {
      title: "City Nights",
      category: "cinematic",
      tag: "Cinematic",
      description: "Mood-driven color grade and sound design for a travel piece.",
      type: "mp4",
      src: "assets/video/project-01.mp4",
      thumb: ""
    },
    {
      title: "Cartoon Recap #12",
      category: "youtube",
      tag: "YouTube",
      description: "Fast-paced recap edit with anime-style captions and SFX.",
      type: "youtube",
      src: "",
      thumb: ""
    },
    {
      title: "Hook in 3 Seconds",
      category: "shorts",
      tag: "Shorts",
      description: "Retention-first vertical edit built around a cold open.",
      type: "mp4",
      src: "assets/video/project-03.mp4",
      thumb: ""
    },
    {
      title: "Reel Drop",
      category: "reels",
      tag: "Reels",
      description: "Beat-synced transitions timed to a trending audio.",
      type: "mp4",
      src: "assets/video/project-04.mp4",
      thumb: ""
    },
    {
      title: "Villain Arc",
      category: "anime",
      tag: "Anime / Entertainment",
      description: "Dynamic motion graphics over dubbed anime commentary.",
      type: "youtube",
      src: "",
      thumb: ""
    },
    {
      title: "Storyline Cut",
      category: "cinematic",
      tag: "Cinematic",
      description: "Narrative-driven structure with layered sound design.",
      type: "mp4",
      src: "assets/video/project-06.mp4",
      thumb: ""
    }
  ],

  /* ---------------------------------------------------------------------
     YOUTUBE — featured video cards
  --------------------------------------------------------------------- */
  youtubeVideos: [
    { title: "Cartoon Recap #12", views: "", thumb: "", url: "" },
    { title: "Anime Edit — Villain Arc", views: "", thumb: "", url: "" },
    { title: "Storytime: The Twist", views: "", thumb: "", url: "" },
    { title: "Top 5 Moments", views: "", thumb: "", url: "" }
  ],

  /* ---------------------------------------------------------------------
     SHORT-FORM — vertical 9:16 cards
     platform: "YouTube Shorts" | "Instagram Reels"
  --------------------------------------------------------------------- */
  shortForm: [
    { platform: "YouTube Shorts", views: "", thumb: "", url: "" },
    { platform: "Instagram Reels", views: "", thumb: "", url: "" },
    { platform: "YouTube Shorts", views: "", thumb: "", url: "" },
    { platform: "Instagram Reels", views: "", thumb: "", url: "" }
  ]
};
