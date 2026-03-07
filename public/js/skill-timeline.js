/**
 * skill-timeline.js
 * -----------------
 * Horizontal scroll-driven timeline for light mode on the about page.
 *
 * Behaviour:
 *  - A single dot sits at the left. A pulsing right-arrow hint floats beside it.
 *  - As the user scrolls right inside the timeline container, a line draws
 *    out from the dot. The viewport re-centres on the drawing head.
 *  - Every ~200px of drawn line a skill card pops in above the line.
 *  - The arrow hint disappears once scrolling starts; reappears only if the
 *    user scrolls all the way back to the origin dot.
 *
 * Customise the SKILLS array below with real labels, years, and image paths.
 */

export const Path = '/assets/images/';

// ── Skill data ──────────────────────────────────────────────────────────────
const SKILLS = [
  { label: 'Excel',         year: '2013', img: `${Path}excel.png` },
  { label: 'Python',        year: '2018', img: `${Path}python.png` },
  { label: 'T-SQL',         year: '2021', img: `${Path}ms-sql.png` },
  { label: 'Power BI',      year: '2021', img: `${Path}power-bi.png` },
  { label: 'PostgreSQL',    year: '2022', img: `${Path}postgresql.png` },
  { label: 'AWS S3',        year: '2022', img: `${Path}aws-s3.png` },
  { label: 'Snowflake',     year: '2023', img: `${Path}snowflake.png` },
  { label: 'AWS EC2',       year: '2023', img: `${Path}aws-ec2.png` },
  { label: 'AWS EKS',       year: '2023', img: `${Path}amazon-eks.png` },
];

// ── Layout constants ─────────────────────────────────────────────────────────
const DOT_X          = 60;       // x-position of the origin dot
const LINE_Y         = 200;      // y-position of the horizontal line
const CARD_INTERVAL  = 220;      // px of drawn line between each card
const CANVAS_HEIGHT  = 360;
const LINE_THICKNESS = 3;
const DOT_RADIUS     = 10;

// ── Init ─────────────────────────────────────────────────────────────────────
export function initSkillTimeline(container) {
  container.innerHTML = '';
  container.classList.add('skill-timeline-wrap');

  // ── Scroll wrapper (provides the horizontal scroll surface) ──────────────
  const scroller = document.createElement('div');
  scroller.className = 'skill-timeline-scroller';

  // ── Canvas (drawn into this) ──────────────────────────────────────────────
  const canvas = document.createElement('canvas');
  canvas.className = 'skill-timeline-canvas';
  canvas.height = CANVAS_HEIGHT;

  // ── Arrow hint ────────────────────────────────────────────────────────────
  const hint = document.createElement('div');
  hint.className = 'skill-timeline-hint';
  hint.innerHTML = '&#8594;'; // →
  hint.setAttribute('aria-label', 'Scroll right to explore timeline');

  scroller.appendChild(canvas);
  scroller.appendChild(hint);
  container.appendChild(scroller);

  // ── State ─────────────────────────────────────────────────────────────────
  let totalWidth     = window.innerWidth;
  let drawnLength    = 0;        // px of line drawn so far
  let cardsRevealed  = 0;
  let hasScrolled    = false;
  const cardEls      = [];

  // ── Resize canvas to always fill scroll content ───────────────────────────
  function setCanvasWidth(w) {
    // Preserve pixel ratio for sharp rendering
    const dpr = window.devicePixelRatio || 1;
    canvas.style.width  = w + 'px';
    canvas.style.height = CANVAS_HEIGHT + 'px';
    canvas.width  = w * dpr;
    canvas.height = CANVAS_HEIGHT * dpr;
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
  }

  function getCtx() {
    const dpr = window.devicePixelRatio || 1;
    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return ctx;
  }

  // ── Draw the current state of the timeline ────────────────────────────────
  function draw() {
    const ctx = getCtx();
    ctx.clearRect(0, 0, totalWidth, CANVAS_HEIGHT);

    // Canvas cannot read CSS variables — resolve colors directly
    const theme      = document.documentElement.getAttribute('data-theme') || 'dark';
    const lineColor  = theme === 'light' ? '#111111' : '#ffffff';
    const dotColor   = theme === 'light' ? '#111111' : '#ffffff';
    const glowColor  = theme === 'light' ? 'rgba(0,0,0,0.18)' : 'rgba(255,255,255,0.2)';

    // Origin dot
    ctx.beginPath();
    ctx.arc(DOT_X, LINE_Y, DOT_RADIUS, 0, Math.PI * 2);
    ctx.fillStyle = dotColor;
    ctx.shadowColor = glowColor;
    ctx.shadowBlur = 12;
    ctx.fill();
    ctx.shadowBlur = 0;

    if (drawnLength <= 0) return;

    // Line
    ctx.beginPath();
    ctx.moveTo(DOT_X + DOT_RADIUS, LINE_Y);
    ctx.lineTo(DOT_X + DOT_RADIUS + drawnLength, LINE_Y);
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = LINE_THICKNESS;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Leading dot (drawing head)
    const headX = DOT_X + DOT_RADIUS + drawnLength;
    ctx.beginPath();
    ctx.arc(headX, LINE_Y, DOT_RADIUS * 0.6, 0, Math.PI * 2);
    ctx.fillStyle = lineColor;
    ctx.shadowColor = glowColor;
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.shadowBlur = 0;

    // Tick marks at each card interval
    for (let i = 0; i < SKILLS.length; i++) {
      const tickX = DOT_X + DOT_RADIUS + (i + 1) * CARD_INTERVAL;
      if (tickX > DOT_X + DOT_RADIUS + drawnLength) break;
      ctx.beginPath();
      ctx.moveTo(tickX, LINE_Y - 12);
      ctx.lineTo(tickX, LINE_Y + 12);
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }

  // ── Reveal skill cards ────────────────────────────────────────────────────
  function revealCards() {
    const shouldReveal = Math.floor(drawnLength / CARD_INTERVAL);
    while (cardsRevealed < shouldReveal && cardsRevealed < SKILLS.length) {
      spawnCard(cardsRevealed);
      cardsRevealed++;
    }
    // Hide cards if user scrolls back
    while (cardsRevealed > shouldReveal) {
      cardsRevealed--;
      if (cardEls[cardsRevealed]) {
        cardEls[cardsRevealed].classList.remove('visible');
      }
    }
  }

  function spawnCard(index) {
    if (cardEls[index]) {
      cardEls[index].classList.add('visible');
      return;
    }

    const skill = SKILLS[index];
    const cardX = DOT_X + DOT_RADIUS + (index + 1) * CARD_INTERVAL;
    const cardY = LINE_Y - 130; // above the line

    const card = document.createElement('div');
    card.className = 'skill-card';
    card.style.left = cardX + 'px';
    card.style.top  = cardY + 'px';

    if (skill.img) {
      const img = document.createElement('img');
      img.src = skill.img;
      img.alt = skill.label;
      card.appendChild(img);
    } else {
      // Placeholder icon using the skill initial
      const icon = document.createElement('div');
      icon.className = 'skill-card-icon';
      icon.textContent = skill.label.charAt(0);
      card.appendChild(icon);
    }

    const label = document.createElement('span');
    label.className = 'skill-card-label';
    label.textContent = skill.label;
    card.appendChild(label);

    const year = document.createElement('span');
    year.className = 'skill-card-year';
    year.textContent = skill.year;
    card.appendChild(year);

    // Connector line from card to tick mark
    const connector = document.createElement('div');
    connector.className = 'skill-card-connector';
    card.appendChild(connector);

    scroller.appendChild(card);
    cardEls[index] = card;

    // Trigger transition on next frame
    requestAnimationFrame(() => {
      requestAnimationFrame(() => card.classList.add('visible'));
    });
  }

  // ── Expand canvas when drawing head nears the right edge ──────────────────
  function ensureCanvasWidth() {
    const needed = DOT_X + DOT_RADIUS + drawnLength + window.innerWidth;
    if (needed > totalWidth) {
      totalWidth = needed + window.innerWidth;
      setCanvasWidth(totalWidth);
      scroller.style.width = totalWidth + 'px';
    }
  }

  // ── Scroll handler ────────────────────────────────────────────────────────
  scroller.addEventListener('scroll', () => {
    const scrollLeft = scroller.scrollLeft;
    drawnLength = Math.max(0, scrollLeft);

    // Arrow hint
    if (scrollLeft > 5 && !hasScrolled) {
      hasScrolled = true;
      hint.classList.add('hidden');
    } else if (scrollLeft <= 5 && hasScrolled) {
      hasScrolled = false;
      hint.classList.remove('hidden');
    }

    ensureCanvasWidth();
    draw();
    revealCards();
  });

  // ── Initial setup ─────────────────────────────────────────────────────────
  totalWidth = window.innerWidth * 3;
  setCanvasWidth(totalWidth);
  scroller.style.width = totalWidth + 'px';
  draw();

  // Redraw on theme change
  document.addEventListener('themechange', draw);

  // Redraw on resize
  window.addEventListener('resize', () => {
    ensureCanvasWidth();
    draw();
  });
}