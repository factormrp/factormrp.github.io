import { Gallery } from './image-list.js';

const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register(
        '/js/sw.js',
        {
          scope: '/',
        }
      );
      if (registration.installing) {
        console.log('Service worker installing');
      } else if (registration.waiting) {
        console.log('Service worker installed');
      } else if (registration.active) {
        console.log('Service worker active');
      }
    } catch (error) {
      console.error(`Registration failed with ${error}`);
    }
  }
};

const grid = document.querySelector('.topics-grid');

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

registerServiceWorker();
// Gallery.images.map(createGalleryFigure);
Gallery.images.sort((a,b) => a.date - b.date).forEach((image, index) => createTimelineItem(image, index));