/* ------------------------------------------------------------------
   SCENES LAB  (TEST/scenes-lab/lab.js)

   A sandbox to try how a "set of photos" can look and feel.
   Open index.html through a local server (VS Code "Live Server" works),
   then press T (or click "Tweak") and move the sliders.

   Sections of this file:
     1. CONTENT      the scenes. Edit this to change what you see.
     2. FONTS        which fonts the panel offers
     3. COLOUR       builds a palette from the colours of the photos
     4. SCENES       builds the HTML for every scene
     5. NAVIGATION   arrows, keys, wheel, swipe
     6. MOTION       mouse parallax + the focus that travels between photos
     7. TWEAK PANEL  live controls
------------------------------------------------------------------- */
(() => {
  'use strict';

  /* ===================================================================
     1. CONTENT
     =================================================================== */
  const PHOTO_DIR = '../../PHOTOS/PORTFOLIO/';
  const photoUrl = n => `${PHOTO_DIR}1 (${n}).jpg`;

  // Each scene is one "set of photos" with its own concept.
  //   concept     'grid' | 'prints' | 'contact'   (layouts are in lab.css, section 4)
  //   grid        background grid: 'lines' | 'dots' | 'none'
  //   mode        'dark' | 'light'   (how the palette is built when it comes from the photos)
  //   titleSize   in vw       titleSpacing   in em
  //   preset      hand picked colours, used when the palette is "preset" or can't be built from the photos
  //   photos      4 photo numbers  ->  PHOTOS/PORTFOLIO/1 (n).jpg
  //
  // The photo numbers are PLACEHOLDERS: put the numbers of your own night / Italy / street photos.
  const SCENES = [
    {
      id: 'cyber',
      concept: 'grid',
      grid: 'lines',
      mode: 'dark',
      word: 'CYBER',
      kicker: 'Night series — 2024',
      desc: 'Neon, wet asphalt and glass at night. Faces lit by whatever light the city leaves behind.',
      ghost: 'CYBER · NIGHT · NEON · ',
      titleFont: 'Unbounded',
      titleWeight: 700,
      titleSize: 6.2,
      titleSpacing: 0.22,
      titleCase: 'uppercase',
      preset: { bg: '#05050d', a: '#ff1f3d', b: '#2a3cff', ink: '#d7d7e0', accent: '#ff3b5c' },
      photos: [12, 23, 36, 47]
    },
    {
      id: 'italy',
      concept: 'prints',
      grid: 'dots',
      mode: 'light',
      word: 'Italia',
      kicker: 'Summer — Liguria & Veneto',
      desc: 'Pastel walls, laundry between windows, espresso standing at the bar. Slow days, warm light.',
      ghost: 'Italia ✶ estate ✶ sole ✶ ',
      titleFont: 'Caveat Brush',
      titleWeight: 400,
      titleSize: 11,
      titleSpacing: 0,
      titleCase: 'none',
      preset: { bg: '#f4e4d2', a: '#ffb4a2', b: '#8fd3d8', ink: '#3b2a22', accent: '#e4572e' },
      photos: [55, 63, 72, 80]
    },
    {
      id: 'street',
      concept: 'contact',
      grid: 'none',
      mode: 'light',
      word: 'STREET',
      kicker: 'Daylight — city notes',
      desc: 'Hard light, long shadows, people who never look up. Shot on the way to somewhere else.',
      ghost: '',
      titleFont: 'Anton',
      titleWeight: 400,
      titleSize: 23,
      titleSpacing: 0.01,
      titleCase: 'uppercase',
      preset: { bg: '#e9e6df', a: '#ffd23f', b: '#c9d6df', ink: '#111111', accent: '#ffd23f' },
      photos: [88, 96, 107, 115]
    }
  ];

  /* ===================================================================
     2. FONTS
     To add a font: add its <link> in index.html, then add its name to a group here.
     =================================================================== */
  const FONT_GROUPS = [
    ['Neon / techy',          'sans-serif', ['Unbounded', 'Chakra Petch', 'Michroma', 'Syncopate', 'Tilt Neon', 'Orbitron', 'Syne']],
    ['Contrast, still filled', 'serif',     ['Bodoni Moda', 'Instrument Serif', 'Fraunces']],
    ['Heavy / condensed',     'sans-serif', ['Anton', 'Big Shoulders Display', 'Bricolage Grotesque']],
    ['Handwriting / cheerful', 'cursive',   ['Caveat Brush', 'Gochi Hand', 'Amatic SC', 'Yellowtail', 'Permanent Marker', 'Covered By Your Grace']],
    ['What you use now',      'sans-serif', ['Space Grotesk']]
  ];
  const TEXT_FONTS = ['Space Grotesk', 'Roboto', 'Instrument Sans', 'DM Sans', 'IBM Plex Sans', 'Hanken Grotesk', 'Familjen Grotesk'];

  const FONT_CSS = {};
  FONT_GROUPS.forEach(([, generic, names]) => names.forEach(n => { FONT_CSS[n] = `"${n}", ${generic}`; }));
  TEXT_FONTS.forEach(n => { FONT_CSS[n] = FONT_CSS[n] || `"${n}", system-ui, sans-serif`; });

  /* ===================================================================
     3. COLOUR
     Idea: the background should not be "a nice colour", it should be a colour that
     is already in the photos. We shrink each photo to 24x24 pixels, count which hues
     are strong, and take the two strongest as the two glows of the background.
     (Reading pixels needs http://, it does not work from file://. Then the presets are used.)
     =================================================================== */
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  const hexToRgb = hex => {
    const n = parseInt(hex.replace('#', ''), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  };
  function rgbToHsl([r, g, b]) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2;
    let h = 0, s = 0;
    if (max !== min) {
      const d = max - min;
      s = l > .5 ? d / (2 - max - min) : d / (max + min);
      if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
      else if (max === g) h = (b - r) / d + 2;
      else h = (r - g) / d + 4;
      h /= 6;
    }
    return [h, s, l];
  }
  function hslToRgb(h, s, l) {
    const f = (p, q, t) => {
      if (t < 0) t += 1; if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    if (s === 0) { const v = Math.round(l * 255); return [v, v, v]; }
    const q = l < .5 ? l * (1 + s) : l + s - l * s, p = 2 * l - q;
    return [f(p, q, h + 1 / 3), f(p, q, h), f(p, q, h - 1 / 3)].map(v => Math.round(v * 255));
  }

  function readPixels(img, size) {
    const c = document.createElement('canvas');
    c.width = c.height = size;
    const g = c.getContext('2d', { willReadFrequently: true });
    g.drawImage(img, 0, 0, size, size);
    return g.getImageData(0, 0, size, size).data;   // throws on file:// (tainted canvas)
  }

  // which hues are strong in these photos?
  function analyse(imgs) {
    const bins = Array.from({ length: 12 }, () => ({ w: 0, r: 0, g: 0, b: 0 }));
    let count = 0;
    imgs.forEach(img => {
      const d = readPixels(img, 24);
      for (let i = 0; i < d.length; i += 4) {
        const [h, s, l] = rgbToHsl([d[i], d[i + 1], d[i + 2]]);
        count++;
        if (s > .2 && l > .12 && l < .88) {                 // ignore greys, near-black and near-white
          const w = s * (1 - Math.abs(l - .5) * 1.4);       // colourful, mid-light pixels count more
          const b = bins[Math.floor(h * 12) % 12];
          b.w += w; b.r += d[i] * w; b.g += d[i + 1] * w; b.b += d[i + 2] * w;
        }
      }
    });
    const ranked = bins.map((b, i) => ({ i, ...b })).filter(b => b.w > 0).sort((x, y) => y.w - x.w);
    if (!ranked.length) return null;                        // black & white photos
    const col = b => [b.r / b.w, b.g / b.w, b.b / b.w];
    const dist = (a, b) => Math.min(Math.abs(a - b), 12 - Math.abs(a - b));
    const first = ranked[0];
    const second = ranked.find(b => b !== first && dist(b.i, first.i) >= 2);
    return { a: col(first), b: second ? col(second) : null };
  }

  // turn the two hues into a full palette (dark scenes get a near-black base, light scenes a pale tint)
  function autoPalette(an, mode) {
    if (!an) return null;
    const [ha, sa] = rgbToHsl(an.a);
    const hb = an.b ? rgbToHsl(an.b)[0] : (ha + .12) % 1;
    if (mode === 'dark') {
      return {
        bg: hslToRgb(ha, .5, .045),
        a: hslToRgb(ha, clamp(sa, .6, .95), .5),
        b: hslToRgb(hb, .75, .46),
        ink: hslToRgb(ha, .12, .86),
        accent: hslToRgb(ha, .85, .62)
      };
    }
    return {
      bg: hslToRgb(ha, .55, .9),
      a: hslToRgb(ha, .75, .74),
      b: hslToRgb(hb, .7, .78),
      ink: hslToRgb(ha, .4, .13),
      accent: hslToRgb(ha, .78, .46)
    };
  }

  // the glow around a photo = that photo's own average colour, made a bit brighter
  function glowColour(img) {
    const d = readPixels(img, 8);
    let r = 0, g = 0, b = 0, n = 0;
    for (let i = 0; i < d.length; i += 4) { r += d[i]; g += d[i + 1]; b += d[i + 2]; n++; }
    const [h, s, l] = rgbToHsl([r / n, g / n, b / n]);
    return hslToRgb(h, Math.max(s, .55), clamp(l, .5, .72));
  }

  /* ===================================================================
     4. SCENES (build the HTML)
     =================================================================== */
  const lab = document.getElementById('lab');
  const rootStyle = document.documentElement.style;
  const rnd = a => a.join(',');
  const pad = n => String(n).padStart(2, '0');

  SCENES.forEach(s => {
    s.presetRgb = { bg: hexToRgb(s.preset.bg), a: hexToRgb(s.preset.a), b: hexToRgb(s.preset.b), ink: hexToRgb(s.preset.ink), accent: hexToRgb(s.preset.accent) };
    s.auto = null;
  });

  function buildScene(sc, si) {
    const root = document.createElement('section');
    root.className = `scene concept-${sc.concept}`;
    root.dataset.grid = sc.grid;
    root.dataset.mode = sc.mode;
    root.setAttribute('aria-label', sc.word);
    root.style.setProperty('--tfont', FONT_CSS[sc.titleFont]);
    root.style.setProperty('--tweight', sc.titleWeight);
    root.style.setProperty('--tsize', sc.titleSize);
    root.style.setProperty('--tls', sc.titleSpacing);
    root.style.setProperty('--ttransform', sc.titleCase || 'uppercase');

    const ghost = sc.ghost ? `<span>${sc.ghost}</span><span>${sc.ghost}</span>` : '';
    const letters = [...sc.word].map((c, i) => `<span class="ch" aria-hidden="true" style="--ci:${i}">${c}</span>`).join('');
    const photos = sc.photos.map((n, k) => `
      <figure class="ph ph-${k + 1}${k === 0 ? ' is-focus' : ''}" style="--i:${k}" data-k="${k}">
        <div class="img"><img src="${photoUrl(n)}" alt="" decoding="async"></div>
        <figcaption>${pad(k + 1)}</figcaption>
      </figure>`).join('');

    root.innerHTML = `
      <div class="s-bg"></div>
      <div class="s-blob s-blob-a"></div>
      <div class="s-blob s-blob-b"></div>
      <div class="s-block"></div>
      <div class="s-grid"></div>
      <div class="s-scan"></div>
      <div class="s-ghost" aria-hidden="true">${ghost}</div>
      ${photos}
      <h2 class="word" aria-label="${sc.word}">${letters}</h2>
      <div class="copy"><p class="kicker">${sc.kicker}</p><p class="desc">${sc.desc}</p></div>`;

    const figs = [...root.querySelectorAll('.ph')];
    const imgs = figs.map(f => f.querySelector('img'));
    imgs.forEach((img, k) => img.addEventListener('error', () => figs[k].classList.add('missing'), { once: true }));
    figs.forEach((fig, k) => fig.addEventListener('pointerenter', () => setFocus(si, k)));
    return { root, figs, imgs };
  }

  const els = SCENES.map(buildScene);
  els.forEach(e => lab.appendChild(e.root));

  /* ---------- palette -> CSS variables ---------- */
  let canAuto = true;

  function paletteOf(i) {
    const s = SCENES[i];
    return (state.palette === 'auto' && s.auto) ? s.auto : s.presetRgb;
  }
  function applyPalette(i) {
    const pal = paletteOf(i);
    const st = els[i].root.style;
    st.setProperty('--bg-rgb', rnd(pal.bg));
    st.setProperty('--ga-rgb', rnd(pal.a));
    st.setProperty('--gb-rgb', rnd(pal.b));
    st.setProperty('--ink-rgb', rnd(pal.ink));
    st.setProperty('--accent-rgb', rnd(pal.accent));
    if (i === current) {                       // the header and the HUD live outside the scenes
      rootStyle.setProperty('--ink-rgb', rnd(pal.ink));
      rootStyle.setProperty('--accent-rgb', rnd(pal.accent));
    }
  }
  const applyAllPalettes = () => SCENES.forEach((_, i) => applyPalette(i));

  async function buildAutoPalettes() {
    await Promise.all(els.flatMap(e => e.imgs.map(img => img.decode().catch(() => {}))));
    els.forEach((e, i) => {
      try {
        const ok = e.imgs.filter(img => img.complete && img.naturalWidth);
        if (!ok.length) return;
        SCENES[i].auto = autoPalette(analyse(ok), SCENES[i].mode);
        e.figs.forEach((fig, k) => {
          const img = e.imgs[k];
          if (img.complete && img.naturalWidth) fig.style.setProperty('--glow-col', rnd(glowColour(img)));
        });
      } catch (err) {
        canAuto = false;
        console.info('[lab] colours from photos need http:// (not file://). Using the presets.', err.name);
      }
    });
    applyAllPalettes();
    renderPanelNote();
  }

  /* ===================================================================
     5. NAVIGATION
     =================================================================== */
  const countEl = document.getElementById('count');
  const barFill = document.getElementById('bar-fill');
  const navScene = document.getElementById('nav-scene');
  let current = -1;
  let leaveTimers = {};
  let spTarget = 0;

  function goTo(i, dir) {
    const n = SCENES.length;
    i = ((i % n) + n) % n;
    if (i === current) return;
    dir = dir || (i > current ? 1 : -1);
    rootStyle.setProperty('--dir', dir);

    if (current >= 0) {
      const prev = els[current].root;
      prev.classList.remove('is-active');
      prev.classList.add('is-leaving');
      clearTimeout(leaveTimers[current]);
      const old = current;
      leaveTimers[old] = setTimeout(() => els[old].root.classList.remove('is-leaving'), 1100);
    }
    current = i;
    clearTimeout(leaveTimers[i]);
    els[i].root.classList.remove('is-leaving');
    els[i].root.classList.add('is-active');
    applyPalette(i);

    countEl.textContent = `${i + 1}/${n}`;
    barFill.style.width = `${((i + 1) / n) * 100}%`;
    navScene.textContent = `${SCENES[i].word} — ${SCENES[i].concept}`;
    spTarget += dir * 420;                       // the ghost text slides when you change scene
  }
  const next = () => goTo(current + 1, 1);
  const prev = () => goTo(current - 1, -1);

  document.getElementById('next').addEventListener('click', next);
  document.getElementById('prev').addEventListener('click', prev);

  window.addEventListener('keydown', e => {
    if (e.target.matches('select, input')) return;
    if (['ArrowRight', 'ArrowDown', 'PageDown'].includes(e.key)) next();
    else if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key)) prev();
    else if (e.key === 't' || e.key === 'T') togglePanel();
  });

  let wheelAcc = 0, wheelLock = 0;
  window.addEventListener('wheel', e => {
    if (e.target.closest && e.target.closest('#panel')) return;
    const now = performance.now();
    if (now < wheelLock) return;
    wheelAcc += e.deltaY;
    if (Math.abs(wheelAcc) > 60) {
      wheelAcc > 0 ? next() : prev();
      wheelAcc = 0;
      wheelLock = now + 1000;
    }
  }, { passive: true });

  let touch = null;
  window.addEventListener('touchstart', e => { touch = { x: e.touches[0].clientX, y: e.touches[0].clientY }; }, { passive: true });
  window.addEventListener('touchend', e => {
    if (!touch || (e.target.closest && e.target.closest('#panel'))) return;
    const dx = e.changedTouches[0].clientX - touch.x, dy = e.changedTouches[0].clientY - touch.y;
    touch = null;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 50) return;
    (Math.abs(dx) > Math.abs(dy) ? dx : dy) < 0 ? next() : prev();
  }, { passive: true });

  /* ===================================================================
     6. MOTION
     - mouse parallax: layers move by different amounts (their --d), eased so it feels heavy
     - focus: one photo glows; it follows the mouse, and when you are idle it travels on its own
     =================================================================== */
  let tx = 0, ty = 0, cx = 0, cy = 0, sp = 0;
  let lastX = -1, lastY = -1, lastSp = -1;
  let lastPointer = 0;

  window.addEventListener('pointermove', e => {
    tx = (e.clientX / window.innerWidth - .5) * 2;
    ty = (e.clientY / window.innerHeight - .5) * 2;
    lastPointer = performance.now();
  }, { passive: true });

  function tick() {
    if (state.motion) {
      cx += (tx - cx) * .06;
      cy += (ty - cy) * .06;
      sp += (spTarget - sp) * .05;
      if (Math.abs(cx - lastX) > .0005 || Math.abs(cy - lastY) > .0005) {
        rootStyle.setProperty('--mx', cx.toFixed(4));
        rootStyle.setProperty('--my', cy.toFixed(4));
        lastX = cx; lastY = cy;
      }
      if (Math.abs(sp - lastSp) > .05) { rootStyle.setProperty('--sp', sp.toFixed(1)); lastSp = sp; }
    }
    requestAnimationFrame(tick);
  }

  function setFocus(si, k) {
    els[si].figs.forEach((f, j) => f.classList.toggle('is-focus', j === k));
  }
  setInterval(() => {                           // idle: the glow moves to the next photo
    if (!state.motion || current < 0 || performance.now() - lastPointer < 3500) return;
    const figs = els[current].figs;
    const at = figs.findIndex(f => f.classList.contains('is-focus'));
    setFocus(current, (at + 1) % figs.length);
  }, 4200);

  /* ===================================================================
     7. TWEAK PANEL
     =================================================================== */
  const DEFAULTS = {
    titleFont: 'scene', textFont: 'Space Grotesk',
    sizeMul: 1, lsAdd: 0,
    palette: 'auto', dim: .42, glow: 60,
    gridOp: .08, gridSize: 64, ghost: .06, ghostSpeed: 1, grain: .09,
    par: 1, motion: true,
    nav: 'clear'
  };
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const state = { ...DEFAULTS };
  if (reduced) { state.motion = false; state.par = 0; }

  function titleFontOptions() {
    return [['scene', '(each scene its own)']].concat(FONT_GROUPS.map(([label, , names]) => ({ label, items: names.map(n => [n, n]) })));
  }

  const CONTROLS = [
    { h: 'Typography' },
    { key: 'titleFont', label: 'Title font', type: 'select', options: titleFontOptions },
    { key: 'sizeMul', label: 'Title size', type: 'range', min: .5, max: 1.6, step: .01, fmt: v => `× ${(+v).toFixed(2)}` },
    { key: 'lsAdd', label: 'Title letter spacing', type: 'range', min: -.1, max: .8, step: .01, fmt: v => `${v >= 0 ? '+' : ''}${(+v).toFixed(2)} em` },
    { key: 'textFont', label: 'Text + UI font', type: 'select', options: () => TEXT_FONTS.map(n => [n, n]) },
    { h: 'Colour' },
    { key: 'palette', label: 'Palette', type: 'select', options: () => [['auto', 'built from the photos'], ['preset', 'preset (hand picked)']] },
    { key: 'dim', label: 'Dim the unfocused photos', type: 'range', min: .1, max: 1, step: .01, fmt: v => (+v).toFixed(2) },
    { key: 'glow', label: 'Glow', type: 'range', min: 0, max: 140, step: 1, fmt: v => `${v} px` },
    { h: 'Background' },
    { key: 'gridOp', label: 'Grid opacity', type: 'range', min: 0, max: .3, step: .005, fmt: v => (+v).toFixed(3) },
    { key: 'gridSize', label: 'Grid cell', type: 'range', min: 24, max: 140, step: 1, fmt: v => `${v} px` },
    { key: 'ghost', label: 'Ghost text opacity', type: 'range', min: 0, max: .3, step: .005, fmt: v => (+v).toFixed(3) },
    { key: 'ghostSpeed', label: 'Ghost text speed', type: 'range', min: .2, max: 4, step: .05, fmt: v => `× ${(+v).toFixed(2)}` },
    { key: 'grain', label: 'Film grain', type: 'range', min: 0, max: .35, step: .005, fmt: v => (+v).toFixed(3) },
    { h: 'Motion' },
    { key: 'par', label: 'Mouse parallax', type: 'range', min: 0, max: 2.5, step: .05, fmt: v => `× ${(+v).toFixed(2)}` },
    { key: 'motion', label: 'Ambient motion (drift, scan, grain)', type: 'check' },
    { h: 'Header' },
    { key: 'nav', label: 'Nav style', type: 'select', options: () => [['clear', 'clear, takes the scene colour'], ['blend', 'blend, always readable'], ['pill', 'pill, glass capsule']] }
  ];

  function applyState() {
    const r = rootStyle;
    r.setProperty('--size-mul', state.sizeMul);
    r.setProperty('--ls-add', state.lsAdd);
    if (state.titleFont === 'scene') r.removeProperty('--tfont-override');
    else r.setProperty('--tfont-override', FONT_CSS[state.titleFont]);
    r.setProperty('--text-font', FONT_CSS[state.textFont]);
    r.setProperty('--dim', state.dim);
    r.setProperty('--glow', state.glow);
    r.setProperty('--grid-op', state.gridOp);
    r.setProperty('--grid', `${state.gridSize}px`);
    r.setProperty('--ghost', state.ghost);
    r.setProperty('--ghost-speed', state.ghostSpeed);
    r.setProperty('--grain', state.grain);
    r.setProperty('--par', state.par);
    document.body.dataset.nav = state.nav;
    document.body.classList.toggle('no-motion', !state.motion);
    if (!state.motion) { r.setProperty('--mx', 0); r.setProperty('--my', 0); lastX = lastY = -1; }
    applyAllPalettes();
  }

  const panel = document.getElementById('panel');
  const tweakBtn = document.getElementById('tweak-btn');
  let noteEl = null;

  function renderPanelNote() {
    if (!noteEl) return;
    noteEl.textContent = canAuto
      ? 'Palette "built from the photos" reads the colours of the 4 photos of each scene.'
      : 'Colours from photos are not available here (file://). Open the page through a local server, e.g. VS Code Live Server. Presets are used meanwhile.';
  }

  function buildPanel() {
    panel.innerHTML = '';
    CONTROLS.forEach(c => {
      if (c.h) { const h = document.createElement('h3'); h.textContent = c.h; panel.appendChild(h); return; }
      const row = document.createElement('div');
      row.className = 'row' + (c.type === 'check' ? ' check' : '');
      const label = document.createElement('label');
      label.textContent = c.label;
      const id = `ctl-${c.key}`;
      label.htmlFor = id;
      let input, out = null;

      if (c.type === 'select') {
        input = document.createElement('select');
        c.options().forEach(o => {
          if (Array.isArray(o)) input.add(new Option(o[1], o[0]));
          else { const g = document.createElement('optgroup'); g.label = o.label; o.items.forEach(it => g.appendChild(new Option(it[1], it[0]))); input.appendChild(g); }
        });
        input.value = state[c.key];
        input.addEventListener('change', () => { state[c.key] = input.value; applyState(); });
      } else if (c.type === 'check') {
        input = document.createElement('input');
        input.type = 'checkbox';
        input.checked = state[c.key];
        input.addEventListener('change', () => { state[c.key] = input.checked; applyState(); });
        row.appendChild(input);
      } else {
        input = document.createElement('input');
        input.type = 'range';
        input.min = c.min; input.max = c.max; input.step = c.step;
        input.value = state[c.key];
        out = document.createElement('output');
        out.textContent = c.fmt(state[c.key]);
        input.addEventListener('input', () => { state[c.key] = +input.value; out.textContent = c.fmt(input.value); applyState(); });
      }
      input.id = id;
      row.appendChild(label);
      if (out) row.appendChild(out);
      if (c.type !== 'check') row.appendChild(input);
      panel.appendChild(row);
    });

    noteEl = document.createElement('p');
    noteEl.className = 'note';
    panel.appendChild(noteEl);
    renderPanelNote();

    const btns = document.createElement('div');
    btns.className = 'btns';
    const copy = document.createElement('button');
    copy.type = 'button'; copy.textContent = 'Copy settings';
    copy.addEventListener('click', () => {
      const text = JSON.stringify(state, null, 2);
      (navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject()).then(
        () => { copy.textContent = 'Copied ✓'; setTimeout(() => (copy.textContent = 'Copy settings'), 1400); },
        () => window.prompt('Copy your settings:', JSON.stringify(state)));
    });
    const reset = document.createElement('button');
    reset.type = 'button'; reset.textContent = 'Reset';
    reset.addEventListener('click', () => { Object.assign(state, DEFAULTS); if (reduced) { state.motion = false; state.par = 0; } buildPanel(); applyState(); });
    btns.append(copy, reset);
    panel.appendChild(btns);
  }

  function togglePanel(force) {
    const open = force === undefined ? panel.hidden : force;
    panel.hidden = !open;
  }
  tweakBtn.addEventListener('click', () => togglePanel());

  /* ===================================================================
     START
     =================================================================== */
  buildPanel();
  applyState();
  goTo(0, 1);
  requestAnimationFrame(tick);
  buildAutoPalettes();

  // for debugging in the console:  lab.state, lab.scenes
  window.lab = { state, scenes: SCENES, goTo };
})();
