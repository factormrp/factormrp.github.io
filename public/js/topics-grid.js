import { Gallery } from './image-list.js';

const getImageBlob = async (url) => {
  const imageResponse = await fetch(url);
  if (!imageResponse.ok) {
    throw new Error(
      `Image didn't load successfully; error code: ${
        imageResponse.statusText || imageResponse.status
      }`
    );
  }
  return imageResponse.blob();
};

const timeline = document.querySelector('.timeline');

const createTimelineItem = async (galleryImage, index) => {
  try {
    const imageBlob = await getImageBlob(galleryImage.url);
    const timelineItem = document.createElement('div');
    timelineItem.setAttribute(
      'class', `timeline-item ${index % 2 === 0 ? 'left' : 'right'}`
    );
    timelineItem.addEventListener(
      'click', () => {timelineItem.classList.toggle('expanded');}
    );

    const content = `
      <div class="timeline-content">
        <img class="timeline-image hidden" src="${window.URL.createObjectURL(imageBlob)}" alt="${galleryImage.alt}">
        <h3 class="timeline-name">${galleryImage.name}</h3>
        <p class="timeline-date">${galleryImage.date}</p>
        <p class="timeline-blurb hidden">${galleryImage.blurb}</p>
      </div>
    `;

    timelineItem.innerHTML = content;
    timeline.appendChild(timelineItem);
  } catch (error) {
    console.error(error);
  }
};

Gallery.images.sort((a,b) => a.date - b.date).forEach((image, index) => createTimelineItem(image, index));