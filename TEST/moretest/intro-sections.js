/* ------------------------------------------------------------------
   INTRO SECTIONS ENGINE  (javascript/intro-sections.js)
   Builds the hero + wall sections of photogrid.html and animates them.

   Three kinds of movement, on purpose:
     1. ENTRANCE   one-time reveal (letters rise, tiles pop in)        CSS transitions
     2. CONSTANT   columns drift forever, a line pulses                CSS keyframes
     3. SCROLL     parallax, shrinking panel, fading title             --exit / --enter / --drift
                   (this file measures the scroll and writes those
                    three numbers; the CSS decides what they do)
------------------------------------------------------------------- */
(() => {
  'use strict';

  const root = document.querySelector('.intro-sections');
  if (!root) return;

  /* ---------- 1. WHAT TO SHOW (edit this) ---------- */
  const CONFIG = {
    // number -> file used for the small tiles. If the page feels heavy, make small copies of
    // your photos (about 600px wide) in another folder and point tilePath at it.
    tilePath: n => `./PHOTOS/PORTFOLIO/1 (${n}).jpg`,
    // number -> file shown big when you click a photo on the wall
    fullPath: n => `./PHOTOS/PORTFOLIO/1 (${n}).jpg`,

    // photo numbers used by each section (PLACEHOLDERS: pick your own favourites)
    heroPhotos: [5, 18, 27, 33, 41, 52, 60, 68, 75, 83, 91, 104],
    wallPhotos: [12, 23, 36, 47, 55, 63, 72, 80, 88, 96, 107, 115],

    // one entry per column
    //   dir    'up' | 'down'   direction of the constant drift
    //   dur    seconds for one full loop (bigger = slower)
    //   k      scroll parallax strength (negative = moves the other way)
    //   ratios tile shapes, width / height (below 1 = tall, above 1 = wide). They repeat.
    heroColumns: [
      { dir: 'up',   dur: 95,  k: -14, ratios: [0.62, 1.15, 0.80, 0.55, 1.30, 0.72] },
      { dir: 'down', dur: 80,  k: 10,  ratios: [1.20, 0.60, 0.90, 0.70, 0.58, 1.10] },
      { dir: 'up',   dur: 110, k: -24, ratios: [0.70, 0.58, 1.25, 0.80, 1.00, 0.60] },
      { dir: 'down', dur: 88,  k: 8,   ratios: [0.90, 1.30, 0.60, 0.75, 1.15, 0.55] }
    ],
    wallColumns: [
      { dir: 'up',   dur: 70, k: 14,  ratios: [1.10, 0.78, 1.25, 0.82, 0.95, 0.78] },
      { dir: 'down', dur: 85, k: -20, ratios: [0.78, 1.00, 0.90, 0.78, 1.15, 0.95] },
      { dir: 'up',   dur: 62, k: 10,  ratios: [0.95, 0.78, 1.15, 0.85, 1.20, 0.78] }
    ]
  };

  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const heroSec = root.querySelector('#sec-hero');
  const wallSec = root.querySelector('#sec-wall');
  const heroTilt = root.querySelector('#hero-tilt');
  const wallWindow = root.querySelector('#wall-window');

  /* ---------- 2. TILES AND COLUMNS ---------- */
  function makeTile(ratio, index, list) {
    const fig = document.createElement('figure');
    fig.className = 'tile';
    fig.style.setProperty('--r', ratio);
    fig.dataset.idx = index;
    const img = new Image();
    img.alt = '';
    img.decoding = 'async';
    img.loading = 'lazy';
    img.src = CONFIG.tilePath(list[index]);
    img.addEventListener('error', () => fig.classList.add('missing'), { once: true });
    fig.appendChild(img);
    return fig;
  }

  // Fills one column with tiles. The content is built twice: the CSS animation moves it by
  // exactly -50%, so when the first copy has scrolled away the second one is in its place.
  function fillColumn(col, def, list, startIndex) {
    const inner = col.querySelector('.col-in');
    inner.textContent = '';
    const target = col.clientHeight * 1.1 + 40;   // one copy must be taller than the column
    const half = [];
    let used = 0, reps = 0;
    do {
      def.ratios.forEach(ratio => {
        const tile = makeTile(ratio, (startIndex + used) % list.length, list);
        tile.style.setProperty('--d', half.length);   // pop-in order
        inner.appendChild(tile);
        half.push(tile);
        used++;
      });
      reps++;
    } while (inner.offsetHeight < target && reps < 12);
    half.forEach(t => {
      const copy = t.cloneNode(true);
      copy.setAttribute('aria-hidden', 'true');
      inner.appendChild(copy);
    });
    col.dataset.builtFor = col.clientHeight;
    return used;
  }

  function buildColumns(container, defs, list, className) {
    container.style.setProperty('--cols', defs.length);
    container.textContent = '';
    let startIndex = 0;
    defs.forEach((def, ci) => {
      const col = document.createElement('div');
      col.className = `col ${className}`;
      col.dataset.dir = def.dir;
      col.style.setProperty('--dur', def.dur + 's');
      col.style.setProperty('--k', def.k);
      col.style.setProperty('--ci', ci);
      const inner = document.createElement('div');
      inner.className = 'col-in';
      col.appendChild(inner);
      container.appendChild(col);
      startIndex += fillColumn(col, def, list, startIndex);
    });
  }

  function buildAll() {
    buildColumns(heroTilt, CONFIG.heroColumns, CONFIG.heroPhotos, 'tcol');
    buildColumns(wallWindow, CONFIG.wallColumns, CONFIG.wallPhotos, 'wcol');
  }

  /* ---------- 3. TITLE LETTERS ---------- */
  function splitLetters() {
    let n = 0;
    root.querySelectorAll('[data-split]').forEach(line => {
      const text = line.textContent.trim();
      line.textContent = '';
      [...text].forEach(chr => {
        const s = document.createElement('span');
        s.className = 'ch';
        s.setAttribute('aria-hidden', 'true');
        s.style.setProperty('--ci', n++);
        s.textContent = chr === ' ' ? ' ' : chr;
        line.appendChild(s);
      });
    });
  }

  /* ---------- 4. SCROLL -> three numbers per section ---------- */
  const sections = [heroSec, wallSec].filter(Boolean);

  function update() {
    const vh = window.innerHeight;
    sections.forEach(sec => {
      const r = sec.getBoundingClientRect();
      if (r.bottom < -vh * 0.2 || r.top > vh * 1.2) return;           // far away, skip
      const enter = clamp((vh - r.top) / vh, 0, 1);                   // 0 below the screen -> 1 when its top reaches the top
      const exit = clamp(-r.top / r.height, 0, 1);                    // 0 at the top -> 1 when fully scrolled away
      const drift = clamp((r.top + r.height / 2 - vh / 2) / vh, -1.5, 1.5);   // -1 above, 0 centred, +1 below
      sec.style.setProperty('--enter', enter.toFixed(4));
      sec.style.setProperty('--exit', exit.toFixed(4));
      sec.style.setProperty('--drift', drift.toFixed(4));
    });
  }

  let ticking = false;
  function requestUpdate() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { update(); ticking = false; });
  }

  /* ---------- 5. ENTRANCES + PAUSE WHEN OFFSCREEN ---------- */
  function setupObservers() {
    if (!('IntersectionObserver' in window)) {
      sections.forEach(s => s.classList.add('is-in'));
      return;
    }
    const seen = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting && e.target !== heroSec) {
          e.target.classList.add('is-in');
          seen.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });
    if (wallSec) seen.observe(wallSec);

    const visible = new IntersectionObserver(entries => {
      entries.forEach(e => e.target.classList.toggle('is-offscreen', !e.isIntersecting));
    });
    sections.forEach(s => visible.observe(s));
  }

  /* ---------- 6. VIEWER (click a photo on the wall) ---------- */
  const viewer = document.createElement('div');
  viewer.className = 'is-viewer';
  viewer.hidden = true;
  viewer.innerHTML =
    '<button type="button" class="v-close" aria-label="Close">&#8592;</button>' +
    '<button type="button" class="v-prev" aria-label="Previous">&#8249;</button>' +
    '<img alt="">' +
    '<button type="button" class="v-next" aria-label="Next">&#8250;</button>';
  document.body.appendChild(viewer);
  const viewerImg = viewer.querySelector('img');
  let viewerIndex = 0;

  function showViewer(i) {
    const list = CONFIG.wallPhotos;
    viewerIndex = (i + list.length) % list.length;
    viewerImg.src = CONFIG.fullPath(list[viewerIndex]);
  }
  function openViewer(i) {
    showViewer(i);
    viewer.hidden = false;
    document.documentElement.classList.add('is-viewer-open');
  }
  function closeViewer() {
    viewer.hidden = true;
    viewerImg.removeAttribute('src');
    document.documentElement.classList.remove('is-viewer-open');
  }
  viewer.querySelector('.v-close').addEventListener('click', closeViewer);
  viewer.querySelector('.v-prev').addEventListener('click', () => showViewer(viewerIndex - 1));
  viewer.querySelector('.v-next').addEventListener('click', () => showViewer(viewerIndex + 1));
  viewer.addEventListener('click', e => { if (e.target === viewer) closeViewer(); });
  window.addEventListener('keydown', e => {
    if (viewer.hidden) return;
    if (e.key === 'Escape') closeViewer();
    else if (e.key === 'ArrowRight') showViewer(viewerIndex + 1);
    else if (e.key === 'ArrowLeft') showViewer(viewerIndex - 1);
  });
  if (wallWindow) {
    wallWindow.addEventListener('click', e => {
      const tile = e.target.closest('.tile');
      if (tile) openViewer(Number(tile.dataset.idx));
    });
  }

  /* ---------- 7. START ---------- */
  function start() {
    splitLetters();
    buildAll();
    update();
    setupObservers();

    // wait for the web fonts (max ~1s) so the title does not jump after it appears
    const fontsReady = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
    Promise.race([fontsReady, new Promise(r => setTimeout(r, 1000))]).then(() => {
      requestAnimationFrame(() => requestAnimationFrame(() => heroSec && heroSec.classList.add('is-in')));
    });

    window.addEventListener('scroll', requestUpdate, { passive: true });

    // if the window gets taller, a column may need more tiles: rebuild (debounced)
    let timer = null;
    window.addEventListener('resize', () => {
      requestUpdate();
      clearTimeout(timer);
      timer = setTimeout(() => {
        const grew = [...root.querySelectorAll('.col')].some(c => c.clientHeight > Number(c.dataset.builtFor || 0) * 1.05);
        if (grew) buildAll();
      }, 250);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
