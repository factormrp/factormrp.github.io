import { initSkillTimeline } from './skill-timeline.js';
import { Gallery } from './image-list.js';

const timelineEl = document.querySelector('.timeline');

// ── Gallery (dark mode) ───────────────────────────────────────────────────

const getImageBlob = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Image failed: ${res.status}`);
  return res.blob();
};

const loadGallery = async () => {
  if (timelineEl.querySelector('.topic-card')) return; // already populated
  for (const img of Gallery.images) {
    try {
      const blob = await getImageBlob(img.url);
      const div  = document.createElement('div');
      div.setAttribute('class', 'topic-card');
      div.style.backgroundImage = `url(${URL.createObjectURL(blob)})`;
      div.setAttribute('alt', img.alt);
      const name  = document.createElement('h3');
      name.textContent = img.name;
      name.setAttribute('class', 'topic-name');
      const date  = document.createElement('p');
      date.textContent = img.date;
      date.setAttribute('class', 'topic-date');
      const venue = document.createElement('p');
      venue.textContent = img.venue;
      venue.setAttribute('class', 'topic-venue');
      div.append(name, date, venue);
      timelineEl.append(div);
    } catch (e) {
      console.error(e);
    }
  }
};

// ── Theme switching ───────────────────────────────────────────────────────

function syncTimeline() {
  const theme = document.documentElement.getAttribute('data-theme') || 'dark';

  if (theme === 'light') {
    timelineEl.innerHTML = '';
    initSkillTimeline(timelineEl);
  } else {
    timelineEl.innerHTML = '';
    timelineEl.classList.remove('skill-timeline-wrap');
    loadGallery();
  }
}

syncTimeline();
document.addEventListener('themechange', syncTimeline);