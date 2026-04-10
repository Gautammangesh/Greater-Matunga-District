gsap.registerPlugin(ScrollTrigger);

let lenis;

function initLoader() {
  const loader = document.getElementById("loader");
  const fill = document.getElementById("loaderFill");
  const count = document.getElementById("loaderCount");
  const state = { value: 0 };

  gsap.to(state, {
    value: 100,
    duration: 2.1,
    ease: "power3.inOut",
    onUpdate: () => {
      if (fill) fill.style.width = `${state.value}%`;
      if (count) count.textContent = `${Math.round(state.value)}%`;
    },
    onComplete: () => {
      // Initialize the page animations immediately so they start running underneath the sweeping loader!
      initPage();

      // TheCube style curtain sweep
      gsap.to(loader, {
        yPercent: -100,
        duration: 1.6,
        ease: "expo.inOut",
        onComplete: () => {
          if (loader) loader.remove();
        }
      });
    }
  });
}

function initLenis() {
  lenis = new Lenis({ 
    lerp: 0.05, // Heavy buttery smooth feel 
    smoothWheel: true,
    wheelMultiplier: 0.8
  });
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.lagSmoothing(0);
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
function splitTextIntoWords(selector) {
  document.querySelectorAll(selector).forEach(el => {
    const text = el.innerText;
    const words = text.split(' ');
    el.innerHTML = '';
    words.forEach(word => {
      const outer = document.createElement('span');
      outer.style.display = 'inline-block';
      outer.style.overflow = 'hidden';
      outer.style.verticalAlign = 'top';
      // keep space after word unless it's a punctuation issue, but simple space is fine
      outer.style.marginRight = '0.25em'; 
      
      const inner = document.createElement('span');
      inner.style.display = 'inline-block';
      inner.style.transform = 'translateY(110%)';
      inner.style.transformOrigin = 'bottom left';
      inner.innerHTML = word;
      inner.classList.add('split-inner');
      
      outer.appendChild(inner);
      el.appendChild(outer);
    });
  });
}

function initHero() {
  // Prep text split for cinematic reveal
  splitTextIntoWords(".hero-title, .hero .eyebrow, .hero-text");
  
  const timeline = gsap.timeline({ defaults: { ease: "expo.out" } });
  
  // The moment initPage is called, the loader is starting its 1.6s sweep.
  // We want the hero timeline to slightly delay and then expand masterfully.
  timeline
    .fromTo(".hero-image-frame", 
      { clipPath: "inset(25% 25% 25% 25% round 0px)", scale: 1.15, autoAlpha: 0.2 },
      { clipPath: "inset(0% 0% 0% 0% round 0px)", scale: 1, autoAlpha: 1, duration: 2.2, ease: "expo.inOut" },
      0.2 // Starts while loader curtain is pulling up
    )
    .from(".site-header", { y: -30, autoAlpha: 0, duration: 1.2 }, 1.2)
    .to(".hero .eyebrow .split-inner", { y: 0, stagger: 0.04, duration: 1.2 }, 1.0)
    .to(".hero-title .split-inner", { y: 0, stagger: 0.06, duration: 1.4 }, 1.2)
    .to(".hero-text .split-inner", { y: 0, stagger: 0.03, duration: 1.2 }, 1.4)
    .from(".hero-actions", { y: 30, autoAlpha: 0, duration: 1 }, 1.6)
    .from(".floating-chip", { y: 40, autoAlpha: 0, stagger: 0.1, duration: 1.2 }, 1.6)
    .from(".scroll-mark", { y: 20, autoAlpha: 0, duration: 1 }, 1.8);

  // Image parallax — slow subtle zoom as you scroll away
  gsap.to(".hero-image-frame img", {
    yPercent: 20,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 1.2
    }
  });

  // Copy moves up faster than image = parallax depth separation
  gsap.to(".hero-copy", {
    y: -80,
    autoAlpha: 0,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "60% top",
      scrub: 1
    }
  });

  // Gold city model — animate in with a rise from below
  const cityModel = document.querySelector(".hero-city-model");
  if (cityModel) {
    gsap.fromTo(cityModel,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 2.2, ease: "expo.out", delay: 1.2 }
    );
    // Slow float upward on scroll (slower than bg = parallax depth)
    gsap.to(cityModel, {
      yPercent: -30,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: 1.5
      }
    });
  }

  // Floating chips idle animation
  gsap.to(".chip-top", { y: -8, duration: 3.2, repeat: -1, yoyo: true, ease: "sine.inOut" });
  gsap.to(".chip-middle", { y: 10, duration: 3.8, repeat: -1, yoyo: true, ease: "sine.inOut" });
  gsap.to(".chip-bottom", { y: -6, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut" });
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

  gsap.from(cards, {
    y: 120,
    scale: 0.94,
    autoAlpha: 0,
    stagger: 0.15,
    duration: 1.1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".showcase-rail",
      start: "top 78%",
      once: true
    }
  });

  if (totalShift > 0) {
    gsap.to(track, {
      x: -totalShift,
      ease: "none",
      scrollTrigger: {
        trigger: ".showcase-rail",
        start: "top top",
        end: () => `+=${totalShift}`,
        scrub: true,
        pin: true,
        anticipatePin: 1
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

function initPage() {
  initLenis();
  initCursor();
  initHeader();
  initSmoothLinks();
  initScrollProgress();
  initChapterNav();
  initHero();
  initCinematicReveals();
  initCinematicMediaMasks();
  initStoryPanels();
  initPinnedIntro();
  initSectionSweeps();
  initCounters();
  initChart();
  initLocation();
  initShowcaseRail();
  initMagnetic();
  initCardDepth();
  initForm();

  window.addEventListener("load", () => ScrollTrigger.refresh());
  setTimeout(() => ScrollTrigger.refresh(), 800);
}

initLoader();
