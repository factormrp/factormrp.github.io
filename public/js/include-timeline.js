import { Gallery, Skillset } from './image-list.js';

const timelineEl = document.querySelector('.timeline');
const years = [2016];

const getImageBlob = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Image failed: ${res.status}`);
  return res.blob();
};

export const loadGallery = async () => {
  for (const img of Gallery.images) {
    try {
      const blob = await getImageBlob(img.url);
      const div = document.createElement('div');
      div.className = 'topic-card';
      div.style.backgroundImage = `url(${URL.createObjectURL(blob)})`;
      div.setAttribute('alt', img.alt);
      const name  = document.createElement('h3');
      name.textContent = img.name;
      name.className = 'topic-name';
      const date = document.createElement('p');
      date.textContent = img.date;
      date.className = 'topic-date';
      const venue = document.createElement('p');
      venue.textContent = img.venue;
      venue.className = 'topic-venue';
      div.append(name, date, venue);
      timelineEl.append(div);
    } catch (e) {
      console.error(e);
    }
  }
};

export const loadSkillset = async() => {
  const byYear = Skillset.skills.reduce((acc, skill) => {
    (acc[skill.year] = acc[skill.year] || []).push(skill);
    return acc;
  }, {});

  for (const [year, skills] of Object.entries(byYear)) {
    const row = document.createElement('div');
    row.className = 'skill-row';

    const yearLabel = document.createElement('span');
    yearLabel.className = 'skill-year-label';
    yearLabel.textContent = year;
    row.appendChild(yearLabel);
    
    for (const skill of skills) {
      const div = document.createElement('div');
      div.className = 'skill-card';
      const img = document.createElement('img');
      img.className = 'skill-img';
      img.src = skill.url;
      img.alt = skill.label;
      const label = document.createElement('span');
      label.className = 'skill-label';
      label.textContent = skill.label;
      div.append(img, label);
      row.appendChild(div);
    }

    timelineEl.appendChild(row);
  }
}
  
function syncTimeline() {
  const theme = document.documentElement.getAttribute('data-theme') || 'dark';
  timelineEl.innerHTML = '';
  if (theme === 'light') {
    loadSkillset();
  } else {
    loadGallery();
  }
}

syncTimeline();
document.addEventListener('themechange', syncTimeline);
