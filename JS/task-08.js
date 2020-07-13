import imagesList from './gallery-items.js';

const refs = {
  list: document.querySelector('.js-gallery'),
  boxModal: document.querySelector(' .js-lightbox'),
  largeImage: document.querySelector('.lightbox__image'),
  clouseModalBtn: document.querySelector('.lightbox__button'),
};

const createGallary = ({ description, preview, original }) => {
  const items = document.createElement('li');
  const links = document.createElement('a');
  const smallImage = document.createElement('img');

  items.classList.add('gallery__item');
  links.classList.add('gallery__link');
  smallImage.classList.add('gallery__image');
  smallImage.alt = description;
  smallImage.src = preview;
  smallImage.dataset.source = original;
  links.href = smallImage.dataset.source;

  links.appendChild(smallImage);
  items.appendChild(links);
  return items;
};

const galleryBuilder = data => {
  const galleryListHtml = data.map(item => createGallary(item));

  refs.list.append(...galleryListHtml);
};

refs.list.addEventListener('click', onGallaryClick);
refs.clouseModalBtn.addEventListener('click', onBtnClick);

function onGallaryClick(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return;
  }

  const imageRef = event.target;
  refs.largeImage.src = imageRef.dataset.source;
  refs.largeImage.alt = imageRef.alt;
  refs.boxModal.classList.add('is-open');
}

function onBtnClick() {
  refs.boxModal.classList.remove('is-open');
  refs.largeImage.src = '';
}

galleryBuilder(imagesList);
