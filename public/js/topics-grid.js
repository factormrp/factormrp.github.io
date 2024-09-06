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

const createGalleryFigure = async (galleryImage) => {
  try {
    const imageBlob = await getImageBlob(galleryImage.url);
    const myDiv = document.createElement('div');
    myDiv.setAttribute('class','topic-card');
    const myImage = document.createElement('img');
    myImage.src = window.URL.createObjectURL(imageBlob);
    myImage.setAttribute('alt', galleryImage.alt);
    const myName = document.createElement('h3');
    myName.textContent = `${galleryImage.name}`;
    myName.setAttribute('class', 'topic-name');
    const myDate = document.createElement('p');
    myDate.textContent = `${galleryImage.date}`
    myDate.setAttribute('class', 'topic-date');
    const myVenue = document.createElement('p');
    myVenue.textContent = `${galleryImage.venue}`
    myVenue.setAttribute('class', 'topic-venue');
    myDiv.append(myImage, myName, myDate, myVenue);
    grid.append(myDiv);
  } catch (error) {
    console.error(error);
  }
};

registerServiceWorker();
Gallery.images.map(createGalleryFigure);