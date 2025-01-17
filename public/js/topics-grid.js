import { Gallery } from './image-list.js';

const grid = document.querySelector('.timeline');

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
    // const myImage = document.createElement('img');
    myDiv.style.backgroundImage = `url(${window.URL.createObjectURL(imageBlob)})`;
    myDiv.setAttribute('alt', galleryImage.alt);
    const myName = document.createElement('h3');
    myName.textContent = `${galleryImage.name}`;
    myName.setAttribute('class', 'topic-name');
    const myDate = document.createElement('p');
    myDate.textContent = `${galleryImage.date}`
    myDate.setAttribute('class', 'topic-date');
    const myVenue = document.createElement('p');
    myVenue.textContent = `${galleryImage.venue}`
    myVenue.setAttribute('class', 'topic-venue');
    myDiv.append(myName, myDate, myVenue);
    grid.append(myDiv);
  } catch (error) {
    console.error(error);
  }
};

Gallery.images.map(createGalleryFigure);