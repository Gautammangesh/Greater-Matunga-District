gsap.registerPlugin(ScrollTrigger);

let lenis;

function initLoader() {
  const loader = document.getElementById("loader");
  const fill = document.getElementById("loaderFill");
  const count = document.getElementById("loaderCount");
  const loaderBrand = document.querySelector(".loader-brand");
  const loaderTitle = document.querySelector(".loader-title");
  const loaderKicker = document.querySelector(".loader-kicker");
  const state = { value: 0 };

  // TheCube exact style - single expanding curtain reveal from center
  const curtain = document.createElement('div');
  curtain.className = 'loader-curtain-cube';
  loader.appendChild(curtain);

  // TheCube style - text characters split and animate
  if (loaderTitle) {
    const text = loaderTitle.innerText;
    loaderTitle.innerHTML = '';
    text.split('').forEach((char, i) => {
      const span = document.createElement('span');
      span.className = 'loader-char';
      span.innerHTML = char === ' ' ? '&nbsp;' : char;
      span.style.transitionDelay = `${i * 0.02}s`;
      loaderTitle.appendChild(span);
    });
  }

  // Animate loader text in
  gsap.fromTo(".loader-char", 
    { y: 80, opacity: 0, rotationX: -90 },
    { y: 0, opacity: 1, rotationX: 0, duration: 1.2, stagger: 0.02, ease: "power4.out", delay: 0.3 }
  );

  gsap.to(state, {
    value: 100,
    duration: 2.8,
    ease: "power2.inOut",
    onUpdate: () => {
      if (fill) fill.style.width = `${state.value}%`;
      if (count) count.textContent = `${Math.round(state.value)}%`;
    },
    onComplete: () => {
      initPage();

      // TheCube exact reveal - curtain scales from center outward with clip-path
      const revealTL = gsap.timeline();
      
      revealTL
        // Fade out text with upward motion
        .to(".loader-char", {
          y: -40,
          opacity: 0,
          stagger: 0.01,
          duration: 0.5,
          ease: "power2.in"
        })
        .to(loaderKicker, {
          y: -20,
          opacity: 0,
          duration: 0.4,
          ease: "power2.in"
        }, "<")
        .to(count, {
          y: -20,
          opacity: 0,
          duration: 0.4,
          ease: "power2.in"
        }, "<")
        // TheCube signature - circular reveal expanding from center
        .to(curtain, {
          clipPath: "circle(0% at 50% 50%)",
          duration: 1.6,
          ease: "expo.inOut"
        }, "-=0.2")
        .to(loader, {
          autoAlpha: 0,
          duration: 0.3,
          onComplete: () => {
            if (loader) loader.remove();
          }
        });
    }
  });
}

function initLenis() {
  lenis = new Lenis({ 
    lerp: 0.04, // TheCube ultra-smooth feel
    smoothWheel: true,
    wheelMultiplier: 0.7,
    touchMultiplier: 1.5,
    infinite: false
  });
  
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
  
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.lagSmoothing(0);
  
  // Sync ScrollTrigger with Lenis
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
}


function initCursor() {
  if (window.matchMedia("(max-width: 900px)").matches) {
    return;
  }

  const dot = document.getElementById("cursor-dot");
  const ring = document.getElementById("cursor-ring");
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    gsap.set(dot, { x: mouseX, y: mouseY });
  });

  gsap.ticker.add(() => {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    gsap.set(ring, { x: ringX, y: ringY });
  });

  const hoverTargets = document.querySelectorAll("a, button, input, .amenity-card, .future-card, .metric-card");
  hoverTargets.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      gsap.to(ring, { width: 72, height: 72, borderColor: "rgba(168,109,43,0.7)", duration: 0.25 });
      gsap.to(dot, { scale: 1.4, duration: 0.25 });
    });
    element.addEventListener("mouseleave", () => {
      gsap.to(ring, { width: 44, height: 44, borderColor: "rgba(168,109,43,0.45)", duration: 0.25 });
      gsap.to(dot, { scale: 1, duration: 0.25 });
    });
  });
}

function initHeader() {
  const header = document.getElementById("siteHeader");
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("mainNav");

  window.addEventListener("scroll", () => {
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  }, { passive: true });

  toggle.addEventListener("click", () => {
    const expanded = document.body.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", expanded ? "true" : "false");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      document.body.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function initSmoothLinks() {
  document.querySelectorAll("[data-scroll]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.getAttribute("data-scroll");
      if (lenis) {
        lenis.scrollTo(target, { offset: -90 });
      }
    });
  });
}

function initScrollProgress() {
  const progress = document.getElementById("scrollProgressBar");
  if (!progress) return;

  gsap.to(progress, {
    scaleX: 1,
    ease: "none",
    scrollTrigger: {
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: true
    }
  });
}

function initChapterNav() {
  const links = gsap.utils.toArray(".main-nav a");
  if (!links.length) return;

  links.forEach((link) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;

    ScrollTrigger.create({
      trigger: target,
      start: "top 45%",
      end: "bottom 45%",
      onToggle: ({ isActive }) => {
        if (!isActive) return;
        links.forEach((item) => item.classList.remove("is-active"));
        link.classList.add("is-active");
      }
    });
  });
}

function initHeroStage() {
  const hero = document.querySelector(".hero");
  if (!hero) return;

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: hero,
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });

  timeline
    .to(".hero-copy", {
      yPercent: -14,
      scale: 0.96,
      autoAlpha: 0.38,
      ease: "none"
    }, 0)
    .to(".hero-visual", {
      yPercent: 10,
      scale: 1.04,
      rotation: -1.2,
      ease: "none"
    }, 0)
    .to(".hero-facts article", {
      yPercent: -30,
      autoAlpha: 0.28,
      stagger: 0.08,
      ease: "none"
    }, 0)
    .to(".scroll-mark", {
      autoAlpha: 0,
      y: 20,
      ease: "none"
    }, 0.1);
}

// --- THE CUBE TEXT SPLITTING UTILITIES ---
function splitTextIntoChars(selector) {
  document.querySelectorAll(selector).forEach(el => {
    if (el.dataset.split === 'done') return;
    const text = el.innerText;
    el.innerHTML = '';
    
    text.split('').forEach(char => {
      const outer = document.createElement('span');
      outer.className = 'char-wrap';
      
      const inner = document.createElement('span');
      inner.className = 'char-inner';
      inner.innerHTML = char === ' ' ? '&nbsp;' : char;
      
      outer.appendChild(inner);
      el.appendChild(outer);
    });
    el.dataset.split = 'done';
  });
}

function splitTextIntoWords(selector) {
  document.querySelectorAll(selector).forEach(el => {
    if (el.dataset.split === 'done') return;
    const text = el.innerText;
    const words = text.split(' ');
    el.innerHTML = '';
    words.forEach((word, i) => {
      const outer = document.createElement('span');
      outer.className = 'word-wrap';
      
      const inner = document.createElement('span');
      inner.className = 'split-inner';
      inner.innerHTML = word;
      
      outer.appendChild(inner);
      el.appendChild(outer);
      
      // Add space between words (except last)
      if (i < words.length - 1) {
        const space = document.createElement('span');
        space.innerHTML = '&nbsp;';
        el.appendChild(space);
      }
    });
    el.dataset.split = 'done';
  });
}

function splitTextIntoLines(selector) {
  document.querySelectorAll(selector).forEach(el => {
    if (el.dataset.split === 'done') return;
    const text = el.innerText;
    el.innerHTML = '';
    
    const outer = document.createElement('span');
    outer.className = 'line-wrap';
    
    const inner = document.createElement('span');
    inner.className = 'line-inner';
    inner.innerHTML = text;
    
    outer.appendChild(inner);
    el.appendChild(outer);
    el.dataset.split = 'done';
  });
}

function initHero() {
  // TheCube-style character-by-character split for dramatic effect
  splitTextIntoChars(".hero-title");
  splitTextIntoWords(".hero .eyebrow, .hero-text");
  
  const timeline = gsap.timeline({ defaults: { ease: "expo.out" } });
  
  // TheCube signature: dramatic clip-path reveal with rotation
  timeline
    .fromTo(".hero-image-frame", 
      { 
        clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)", 
        scale: 1.3, 
        rotation: -5,
        autoAlpha: 0.3 
      },
      { 
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", 
        scale: 1, 
        rotation: 0,
        autoAlpha: 1, 
        duration: 2.4, 
        ease: "expo.inOut" 
      },
      0.3
    )
    .from(".site-header", { 
      y: -60, 
      autoAlpha: 0, 
      duration: 1.4,
      ease: "power4.out"
    }, 1.0)
    // TheCube style - chars reveal with stagger and rotation
    .to(".hero .eyebrow .split-inner", { 
      y: 0, 
      rotation: 0,
      stagger: 0.03, 
      duration: 1.0 
    }, 0.9)
    .to(".hero-title .char-inner", { 
      y: 0, 
      rotation: 0,
      stagger: 0.02, 
      duration: 0.8,
      ease: "power4.out"
    }, 1.0)
    .to(".hero-text .split-inner", { 
      y: 0, 
      stagger: 0.025, 
      duration: 1.0 
    }, 1.3)
    .from(".hero-actions", { 
      y: 50, 
      autoAlpha: 0, 
      duration: 1.2,
      ease: "power3.out"
    }, 1.5)
    .from(".floating-chip", { 
      scale: 0.8,
      y: 60, 
      autoAlpha: 0, 
      stagger: 0.12, 
      duration: 1.4,
      ease: "back.out(1.2)"
    }, 1.4)
    .from(".scroll-mark", { 
      y: 30, 
      autoAlpha: 0, 
      duration: 1.2 
    }, 1.8);

  // TheCube-style dramatic parallax with scale
  gsap.to(".hero-image-frame img", {
    yPercent: 25,
    scale: 1.1,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 0.8
    }
  });

  // Hero copy parallax - TheCube style with rotation
  gsap.to(".hero-copy", {
    y: -120,
    rotation: -2,
    autoAlpha: 0,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "50% top",
      scrub: 0.6
    }
  });

  // Gold city model — TheCube style with scale and blur effect simulation
  const cityModel = document.querySelector(".hero-city-model");
  if (cityModel) {
    gsap.fromTo(cityModel,
      { y: 120, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 2.6, ease: "expo.out", delay: 1.0 }
    );
    
    gsap.to(cityModel, {
      yPercent: -40,
      scale: 1.1,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: 1.2
      }
    });
  }

  // TheCube style - smooth floating with slight rotation
  gsap.to(".chip-top", { 
    y: -12, 
    rotation: 3,
    duration: 4, 
    repeat: -1, 
    yoyo: true, 
    ease: "sine.inOut" 
  });
  gsap.to(".chip-middle", { 
    y: 15, 
    rotation: -2,
    duration: 4.5, 
    repeat: -1, 
    yoyo: true, 
    ease: "sine.inOut" 
  });
  gsap.to(".chip-bottom", { 
    y: -10, 
    rotation: 2,
    duration: 3.8, 
    repeat: -1, 
    yoyo: true, 
    ease: "sine.inOut" 
  });
}

function initCinematicReveals() {
  // Split all major headings and lead paragraphs
  splitTextIntoWords(".section-heading h2, .section-heading .eyebrow, .story-copy h3");

  // Word-sweep reveal for every heading
  document.querySelectorAll(".section-heading").forEach(heading => {
    gsap.to(heading.querySelectorAll(".split-inner"), {
      y: 0,
      stagger: 0.035,
      duration: 1.2,
      ease: "expo.out",
      scrollTrigger: {
        trigger: heading,
        start: "top 88%",
        once: true
      }
    });
  });

  // Story copy headings
  document.querySelectorAll(".story-copy h3").forEach(h => {
    gsap.to(h.querySelectorAll(".split-inner"), {
      y: 0,
      stagger: 0.04,
      duration: 1.1,
      ease: "expo.out",
      scrollTrigger: { trigger: h, start: "top 88%", once: true }
    });
  });

  // Standard fade-up for all other .reveal elements
  document.querySelectorAll(".reveal").forEach(element => {
    gsap.fromTo(element,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.4, ease: "expo.out",
        scrollTrigger: { trigger: element, start: "top 88%", once: true }
      }
    );
  });
}

function initCinematicMediaMasks() {
  const mediaTargets = [
    ".intro-card",
    ".portrait-card",
    ".highlight-media",
    ".amenity-card",
    ".map-frame",
    ".future-card",
    ".cta-visual",
    ".rail-card"
  ];

  document.querySelectorAll(mediaTargets.join(", ")).forEach(card => {
    const img = card.querySelector("img");
    if(!img) return;

    // Mask expand
    gsap.fromTo(card,
      { clipPath: "inset(20% 0% 20% 0%)", autoAlpha: 0.4 },
      { clipPath: "inset(0% 0% 0% 0%)", autoAlpha: 1, duration: 1.5, ease: "power3.inOut", scrollTrigger: { trigger: card, start: "top 85%", once: true } }
    );

    // Parallax
    gsap.fromTo(img,
      { scale: 1.15, yPercent: -5 },
      { scale: 1, yPercent: 5, ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true } }
    );
  });
}

function initStoryPanels() {
  if (window.matchMedia("(max-width: 900px)").matches) return;

  const panels = gsap.utils.toArray(".story-panel");
  if (!panels.length) return;

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".story-shell",
      start: "top top",
      end: "bottom bottom",
      scrub: 1.2
    }
  });

  panels.forEach((panel, index) => {
    const img = panel.querySelector(".story-media img");
    const copyChildren = panel.querySelectorAll(".story-copy > *");
    const startLabel = `panel-${index}`;

    gsap.set(panel, { autoAlpha: index === 0 ? 1 : 0 });
    if (img && index !== 0) gsap.set(img, { scale: 1.12 });
    if (index !== 0) gsap.set(copyChildren, { y: 30, autoAlpha: 0 });

    timeline.addLabel(startLabel);

    if (index !== 0) {
      timeline.to(panel, { autoAlpha: 1, duration: 0.6 }, startLabel);
      if (img) timeline.to(img, { scale: 1, duration: 1.2, ease: "power3.out" }, startLabel);
      if (copyChildren.length) timeline.to(copyChildren, { y: 0, autoAlpha: 1, stagger: 0.08, duration: 0.8, ease: "expo.out" }, `${startLabel}+=0.2`);
    }

    if (index < panels.length - 1) {
      timeline.to(panel, { autoAlpha: 0, duration: 0.5 }, `${startLabel}+=1.2`);
    }
  });
}

function initPinnedIntro() {
  if (window.matchMedia("(max-width: 1180px)").matches) return;
  const introSpread = document.querySelector(".intro-spread");
  if (!introSpread) return;

  gsap.to(".intro-visual-panel", {
    yPercent: -20,
    ease: "none",
    scrollTrigger: {
      trigger: introSpread,
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });
}

function initCounters() {
  document.querySelectorAll("[data-counter]").forEach(card => {
    const valueEl = card.querySelector(".metric-value");
    if(!valueEl) return;
    const target = Number(card.dataset.counter);
    const prefix = card.dataset.prefix || "";
    const suffix = card.dataset.suffix || "";
    const state = { value: 0 };

    ScrollTrigger.create({
      trigger: card,
      start: "top 82%",
      once: true,
      onEnter: () => {
        gsap.to(state, {
          value: target,
          duration: 2,
          ease: "power2.out",
          onUpdate: () => {
            const rounded = target >= 1000 ? Math.round(state.value).toLocaleString("en-IN") : Math.round(state.value);
            valueEl.textContent = `${prefix}${rounded}${suffix}`;
          }
        });
      }
    });
  });
}

function initChart() {
  ["#chartPathA", "#chartPathB"].forEach(selector => {
    const path = document.querySelector(selector);
    if (!path) return;
    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 2.2,
      ease: "power2.out",
      scrollTrigger: { trigger: ".trend-panel", start: "top 72%", once: true }
    });
  });
}

function initSectionSweeps() {
  document.querySelectorAll(".section-sweep").forEach(sweep => {
    gsap.fromTo(sweep, 
      { scaleX: 0, transformOrigin: 'left center' },
      { scaleX: 1, duration: 1.5, ease: "power3.inOut", scrollTrigger: { trigger: sweep.parentElement, start: "top 70%", once: true } }
    );
  });
}

function initLocation() {
  gsap.from(".location-group li", {
    x: -24,
    autoAlpha: 0,
    stagger: 0.06,
    duration: 0.55,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".location-columns",
      start: "top 78%",
      once: true
    }
  });
}

function initShowcaseRail() {
  if (window.matchMedia("(max-width: 900px)").matches) {
    return;
  }

  const track = document.getElementById("railTrack");
  const cards = gsap.utils.toArray(".rail-card");
  const totalShift = Math.max(0, track.scrollWidth - window.innerWidth + 120);

  // TheCube style - cards slide in from right with stagger and rotation
  cards.forEach((card, i) => {
    gsap.fromTo(card,
      { 
        x: 200 + (i * 50),
        rotation: 8 - (i * 2),
        scale: 0.85,
        autoAlpha: 0 
      },
      { 
        x: 0,
        rotation: 0,
        scale: 1,
        autoAlpha: 1,
        duration: 1.4,
        delay: i * 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".showcase-rail",
          start: "top 85%",
          once: true
        }
      }
    );
  });

  if (totalShift > 0) {
    // TheCube style horizontal scroll with easing
    gsap.to(track, {
      x: -totalShift,
      ease: "none",
      scrollTrigger: {
        trigger: ".showcase-rail",
        start: "top top",
        end: () => `+=${totalShift * 1.5}`,
        scrub: 0.8,
        pin: true,
        anticipatePin: 1,
        // TheCube style - scale cards slightly as they pass center
        onUpdate: (self) => {
          const progress = self.progress;
          cards.forEach((card, i) => {
            const cardProgress = (progress * cards.length) - i;
            const scale = 1 - Math.abs(cardProgress - 0.5) * 0.08;
            const rotation = (cardProgress - 0.5) * -3;
            gsap.set(card, { 
              scale: Math.max(0.92, Math.min(1.02, scale)),
              rotation: rotation * 0.5
            });
          });
        }
      }
    });
  }
}

function initMagnetic() {
  if (window.matchMedia("(max-width: 900px)").matches) return;

  document.querySelectorAll(".magnetic, .btn, .header-cta").forEach(element => {
    element.addEventListener("mousemove", (event) => {
      const rect = element.getBoundingClientRect();
      const offsetX = (event.clientX - rect.left - rect.width / 2) * 0.2;
      const offsetY = (event.clientY - rect.top - rect.height / 2) * 0.2;
      gsap.to(element, { x: offsetX, y: offsetY, duration: 0.4, ease: "power2.out" });
    });
    element.addEventListener("mouseleave", () => {
      gsap.to(element, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.45)" });
    });
  });
}

function initCardDepth() {
  if (window.matchMedia("(max-width: 900px)").matches) return;

  document.querySelectorAll(".amenity-card, .future-card, .metric-card, .rail-card").forEach(card => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const rotateY = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
      const rotateX = ((event.clientY - rect.top) / rect.height - 0.5) * -10;
      gsap.to(card, { rotateX, rotateY, transformPerspective: 800, duration: 0.35, ease: "power2.out" });
    });
    card.addEventListener("mouseleave", () => {
      gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "power2.out" });
    });
  });
}

function initForm() {
  const form = document.getElementById("enquiryForm");
  const message = document.getElementById("formMessage");
  const nameField = document.getElementById("nameField");
  const emailField = document.getElementById("emailField");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    message.textContent = `Thank you, ${nameField.value.trim() || "there"}. Our team will connect with you shortly.`;
    form.reset();
    gsap.fromTo(message, {
      autoAlpha: 0, y: 10
    }, {
      autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out"
    });
  });
}

// TheCube-style infinite marquee
function initMarquee() {
  const marquees = document.querySelectorAll('.marquee-track');
  
  marquees.forEach((track, index) => {
    const items = track.querySelectorAll('.marquee-item');
    if (!items.length) return;
    
    // Clone items for seamless loop
    items.forEach(item => {
      const clone = item.cloneNode(true);
      track.appendChild(clone);
    });
    
    const direction = index % 2 === 0 ? -1 : 1;
    const duration = 25 + (index * 5);
    
    gsap.to(track, {
      xPercent: direction * -50,
      duration: duration,
      ease: "none",
      repeat: -1
    });
    
    // Speed up on scroll
    ScrollTrigger.create({
      trigger: track.parentElement,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const velocity = Math.abs(self.getVelocity()) / 1000;
        gsap.to(track, {
          timeScale: 1 + velocity * 0.5,
          duration: 0.3
        });
      }
    });
  });
}

// TheCube-style vertical timeline scrub
function initTimelineScrub() {
  const timeline = document.querySelector('.history-timeline');
  if (!timeline) return;
  
  const items = gsap.utils.toArray('.history-item');
  const numbers = gsap.utils.toArray('.history-number');
  
  items.forEach((item, i) => {
    const number = numbers[i];
    
    ScrollTrigger.create({
      trigger: item,
      start: "top 60%",
      end: "bottom 40%",
      onEnter: () => {
        gsap.to(item, { autoAlpha: 1, x: 0, duration: 0.8, ease: "power3.out" });
        gsap.to(number, { scale: 1.2, color: "#a86d2b", duration: 0.4 });
      },
      onLeave: () => {
        gsap.to(item, { autoAlpha: 0.3, duration: 0.4 });
        gsap.to(number, { scale: 1, color: "rgba(255,255,255,0.3)", duration: 0.4 });
      },
      onEnterBack: () => {
        gsap.to(item, { autoAlpha: 1, x: 0, duration: 0.8, ease: "power3.out" });
        gsap.to(number, { scale: 1.2, color: "#a86d2b", duration: 0.4 });
      },
      onLeaveBack: () => {
        gsap.to(item, { autoAlpha: 0.3, duration: 0.4 });
        gsap.to(number, { scale: 1, color: "rgba(255,255,255,0.3)", duration: 0.4 });
      }
    });
  });
}

// TheCube-style image reveal with mask
function initImageMaskReveals() {
  const images = document.querySelectorAll('[data-mask-reveal]');
  
  images.forEach(img => {
    const direction = img.dataset.maskReveal || 'bottom';
    let clipStart, clipEnd;
    
    switch(direction) {
      case 'left':
        clipStart = "inset(0 100% 0 0)";
        clipEnd = "inset(0 0% 0 0)";
        break;
      case 'right':
        clipStart = "inset(0 0 0 100%)";
        clipEnd = "inset(0 0 0 0%)";
        break;
      case 'top':
        clipStart = "inset(100% 0 0 0)";
        clipEnd = "inset(0% 0 0 0)";
        break;
      default: // bottom
        clipStart = "inset(0 0 100% 0)";
        clipEnd = "inset(0 0 0% 0)";
    }
    
    gsap.fromTo(img,
      { clipPath: clipStart },
      {
        clipPath: clipEnd,
        duration: 1.6,
        ease: "expo.inOut",
        scrollTrigger: {
          trigger: img,
          start: "top 80%",
          once: true
        }
      }
    );
  });
}

// TheCube-style text scramble effect
function initTextScramble() {
  const scrambleElements = document.querySelectorAll('[data-scramble]');
  const chars = "!<>-_\\/[]{}—=+*^?#_____";
  
  scrambleElements.forEach(el => {
    const originalText = el.innerText;
    
    ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        let iteration = 0;
        const interval = setInterval(() => {
          el.innerText = originalText
            .split("")
            .map((char, index) => {
              if (index < iteration) return originalText[index];
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("");
          
          if (iteration >= originalText.length) clearInterval(interval);
          iteration += 1/3;
        }, 30);
      }
    });
  });
}

function initPage() {
  initLenis();
  initCursor();
  initHeader();
  initSmoothLinks();
  initScrollProgress();
  initChapterNav();
  initHero();
  initHeroStats();
  initCinematicReveals();
  initCinematicMediaMasks();
  initStoryPanels();
  initPinnedIntro();
  initSectionSweeps();
  initCounters();
  initChart();
  initLocation();
  initShowcaseRail();
  initUseCaseCards();
  initMagnetic();
  initCardDepth();
  initForm();
  initMarquee();
  initTimelineScrub();
  initImageMaskReveals();
  initTextScramble();
  initScrollVelocityEffects();
  initSpecsAccordion();
  initHistorySection();
  initPageEntrance();

  window.addEventListener("load", () => ScrollTrigger.refresh());
  setTimeout(() => ScrollTrigger.refresh(), 800);
}

// TheCube-style scroll velocity effects
function initScrollVelocityEffects() {
  // Skew elements based on scroll velocity
  const skewElements = document.querySelectorAll('.velocity-skew');
  
  skewElements.forEach(el => {
    ScrollTrigger.create({
      trigger: el,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const velocity = self.getVelocity() / 300;
        gsap.to(el, {
          skewY: Math.max(-5, Math.min(5, velocity)),
          duration: 0.3
        });
      }
    });
  });
  
  // Scale images based on scroll position (TheCube parallax depth)
  document.querySelectorAll('[data-parallax-scale]').forEach(el => {
    const intensity = parseFloat(el.dataset.parallaxScale) || 0.1;
    
    gsap.fromTo(el,
      { scale: 1 + intensity },
      {
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: el.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      }
    );
  });
}

// TheCube exact - Hero stats with large numbers
function initHeroStats() {
  const statsSection = document.querySelector('.hero-stats');
  if (!statsSection) return;
  
  const statItems = gsap.utils.toArray('.hero-stat');
  
  statItems.forEach((item, i) => {
    const number = item.querySelector('.stat-number');
    const label = item.querySelector('.stat-label');
    const detail = item.querySelector('.stat-detail');
    
    // Staggered reveal
    gsap.fromTo(item,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        delay: 0.8 + (i * 0.15),
        ease: "power4.out"
      }
    );
    
    // Number counter animation
    if (number) {
      const target = parseInt(number.dataset.value) || 0;
      const suffix = number.dataset.suffix || '';
      const prefix = number.dataset.prefix || '';
      const state = { val: 0 };
      
      gsap.to(state, {
        val: target,
        duration: 2,
        delay: 1 + (i * 0.15),
        ease: "power2.out",
        onUpdate: () => {
          number.textContent = prefix + Math.round(state.val).toLocaleString() + suffix;
        }
      });
    }
  });
}

// TheCube exact - Use case cards horizontal scroll with number indicators
function initUseCaseCards() {
  const section = document.querySelector('.usecase-section');
  if (!section) return;
  
  const cards = gsap.utils.toArray('.usecase-card');
  const numbers = gsap.utils.toArray('.usecase-number');
  const track = document.querySelector('.usecase-track');
  
  if (!track || !cards.length) return;
  
  // Calculate total scroll distance
  const totalWidth = track.scrollWidth - window.innerWidth + 200;
  
  // Pin and horizontal scroll
  const scrollTween = gsap.to(track, {
    x: -totalWidth,
    ease: "none",
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: () => `+=${totalWidth}`,
      scrub: 1,
      pin: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const activeIndex = Math.floor(progress * cards.length);
        
        // Update number indicators
        numbers.forEach((num, i) => {
          if (i === activeIndex) {
            gsap.to(num, { scale: 1.5, color: "#a86d2b", duration: 0.3 });
          } else {
            gsap.to(num, { scale: 1, color: "rgba(255,255,255,0.3)", duration: 0.3 });
          }
        });
        
        // TheCube style - card transforms based on position
        cards.forEach((card, i) => {
          const cardProgress = (progress * cards.length) - i;
          
          // Scale and rotate based on distance from center
          if (cardProgress >= -0.5 && cardProgress <= 1.5) {
            const scale = 1 - Math.abs(cardProgress - 0.5) * 0.1;
            const rotate = (cardProgress - 0.5) * -5;
            const opacity = 1 - Math.abs(cardProgress - 0.5) * 0.3;
            
            gsap.to(card, {
              scale: Math.max(0.85, Math.min(1.05, scale)),
              rotation: rotate,
              opacity: Math.max(0.5, opacity),
              duration: 0.2
            });
          }
        });
      }
    }
  });
  
  // Initial card entrance animation
  cards.forEach((card, i) => {
    gsap.fromTo(card,
      { x: 200, rotation: 15, opacity: 0 },
      {
        x: 0,
        rotation: 0,
        opacity: 1,
        duration: 1.2,
        delay: i * 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true
        }
      }
    );
  });
}

// TheCube exact - Specifications accordion
function initSpecsAccordion() {
  const items = document.querySelectorAll('.spec-item');
  
  items.forEach(item => {
    const header = item.querySelector('.spec-header');
    const content = item.querySelector('.spec-content');
    const icon = item.querySelector('.spec-icon');
    
    if (!header || !content) return;
    
    // Set initial state
    gsap.set(content, { height: 0, opacity: 0 });
    
    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      
      // Close all other items
      items.forEach(other => {
        if (other !== item && other.classList.contains('is-open')) {
          other.classList.remove('is-open');
          gsap.to(other.querySelector('.spec-content'), {
            height: 0,
            opacity: 0,
            duration: 0.5,
            ease: "power3.inOut"
          });
          gsap.to(other.querySelector('.spec-icon'), {
            rotation: 0,
            duration: 0.3
          });
        }
      });
      
      // Toggle current item
      if (isOpen) {
        item.classList.remove('is-open');
        gsap.to(content, {
          height: 0,
          opacity: 0,
          duration: 0.5,
          ease: "power3.inOut"
        });
        gsap.to(icon, { rotation: 0, duration: 0.3 });
      } else {
        item.classList.add('is-open');
        gsap.to(content, {
          height: "auto",
          opacity: 1,
          duration: 0.5,
          ease: "power3.inOut"
        });
        gsap.to(icon, { rotation: 45, duration: 0.3 });
      }
    });
  });
}

// TheCube exact - History timeline with vertical number rail
function initHistorySection() {
  const section = document.querySelector('.history-section');
  if (!section) return;
  
  const items = gsap.utils.toArray('.history-item');
  const numberRail = document.querySelector('.history-number-rail');
  const numbers = gsap.utils.toArray('.history-number');
  
  if (!items.length) return;
  
  // Pin the number rail
  if (numberRail) {
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      pin: numberRail,
      pinSpacing: false
    });
  }
  
  // Animate each history item
  items.forEach((item, i) => {
    const year = item.querySelector('.history-year');
    const title = item.querySelector('.history-title');
    const text = item.querySelector('.history-text');
    const image = item.querySelector('.history-image');
    
    ScrollTrigger.create({
      trigger: item,
      start: "top 60%",
      end: "bottom 40%",
      onEnter: () => {
        // Highlight corresponding number
        numbers.forEach((num, j) => {
          if (j === i) {
            gsap.to(num, { 
              scale: 1.4, 
              color: "#a86d2b",
              x: 20,
              duration: 0.4,
              ease: "power2.out"
            });
          } else {
            gsap.to(num, { 
              scale: 1, 
              color: "rgba(255,255,255,0.25)",
              x: 0,
              duration: 0.4 
            });
          }
        });
        
        // Animate content in
        gsap.to(item, { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" });
        if (year) gsap.to(year, { opacity: 1, y: 0, duration: 0.6, delay: 0.1 });
        if (title) gsap.to(title, { opacity: 1, y: 0, duration: 0.6, delay: 0.2 });
        if (text) gsap.to(text, { opacity: 1, y: 0, duration: 0.6, delay: 0.3 });
        if (image) gsap.to(image, { 
          clipPath: "inset(0% 0% 0% 0%)", 
          scale: 1,
          duration: 1.2, 
          ease: "power3.inOut" 
        });
      },
      onLeave: () => {
        gsap.to(item, { opacity: 0.3, duration: 0.4 });
      },
      onEnterBack: () => {
        numbers.forEach((num, j) => {
          if (j === i) {
            gsap.to(num, { scale: 1.4, color: "#a86d2b", x: 20, duration: 0.4 });
          } else {
            gsap.to(num, { scale: 1, color: "rgba(255,255,255,0.25)", x: 0, duration: 0.4 });
          }
        });
        gsap.to(item, { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" });
      },
      onLeaveBack: () => {
        gsap.to(item, { opacity: 0.3, duration: 0.4 });
      }
    });
    
    // Set initial states
    gsap.set(item, { opacity: 0.3, x: 50 });
    if (year) gsap.set(year, { opacity: 0, y: 20 });
    if (title) gsap.set(title, { opacity: 0, y: 30 });
    if (text) gsap.set(text, { opacity: 0, y: 20 });
    if (image) gsap.set(image, { clipPath: "inset(0% 100% 0% 0%)", scale: 1.1 });
  });
}

// TheCube exact - Smooth page entrance with staggered elements
function initPageEntrance() {
  // Add entrance class to body
  document.body.classList.add('page-loaded');
  
  // Staggered entrance for all major elements
  gsap.fromTo(".site-header",
    { y: -100, opacity: 0 },
    { y: 0, opacity: 1, duration: 1.2, delay: 0.2, ease: "power4.out" }
  );
}

initLoader();
