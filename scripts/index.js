import { enableValidation, settings } from './validation.js';
import { initialCards } from './cards.js';

const editProfileModal = document.querySelector('#edit-profile-modal');
const editProfileBtn = document.querySelector('.profile__edit-button');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__bio');
const editProfileForm = document.forms['edit-profile-form'];
const nameInput = document.querySelector('[name="name"]');
const jobInput = document.querySelector('[name="description"]');

const newPostModal = document.querySelector('#new-post-modal');
const newPostBtn = document.querySelector('.profile__post-button');
const newPostForm = document.forms['new-post-form'];
const linkInput = document.querySelector('[name="link"]');
const captionInput = document.querySelector('[name="caption"]');

const gallery = document.querySelector('.gallery');

const cardTemplate = document.querySelector('#card-template').content;

const postModal = document.querySelector('#post-modal');
const postModalImage = postModal.querySelector('.modal__image');
const postModalCaption = postModal.querySelector('.modal__caption');

const handleClick = (event) => {
  const modal = document.querySelector('.modal_is-opened');
  if (event.target.classList.contains('modal')) {
    closeModal(modal);
  }
};

const handleEscape = (event) => {
  const modal = document.querySelector('.modal_is-opened');
  if (event.key === 'Escape') {
    closeModal(modal);
  }
};

const openModal = (modal) => {
  modal.classList.add('modal_is-opened');

  document.addEventListener('click', handleClick);
  document.addEventListener('keydown', handleEscape);
};

const closeModal = (modal) => {
  modal.classList.remove('modal_is-opened');
  document.removeEventListener('click', handleClick);
  document.removeEventListener('keydown', handleEscape);
};

const getCardElement = (data) => {
  const cardElement = cardTemplate.querySelector('.post').cloneNode(true);

  const cardTitle = cardElement.querySelector('.post__caption');
  cardTitle.textContent = data.name;

  const cardImage = cardElement.querySelector('.post__image');
  cardImage.setAttribute('src', data.link);
  cardImage.setAttribute('alt', data.name);

  const likeBtn = cardElement.querySelector('.post__like-button');
  const likeIcon = cardElement.querySelector('.post__like-icon');
  likeBtn.addEventListener('click', () => {
    const src = likeIcon.getAttribute('src').includes('active')
      ? './images/like-icon.svg'
      : './images/like-icon-active.svg';
    likeIcon.setAttribute('src', src);

    likeBtn.classList.toggle('post__like-button_status_active');
  });

  const deleteBtn = cardElement.querySelector('.post__delete-button');
  deleteBtn.addEventListener('click', () => {
    cardElement.remove();
  });

  cardImage.addEventListener('click', () => {
    postModalImage.setAttribute('src', data.link);
    postModalImage.setAttribute('alt', data.name);
    postModalCaption.textContent = data.name;
    openModal(postModal);
  });

  return cardElement;
};

editProfileBtn.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  resetInputErrors(editProfileForm, [nameInput, jobInput], settings);
  openModal(editProfileModal);
});

editProfileForm.addEventListener('submit', (event) => {
  event.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeModal(editProfileModal);
});

newPostBtn.addEventListener('click', () => openModal(newPostModal));

Array.from(document.querySelectorAll('.modal__close-btn')).forEach((button) => {
  const modal = button.closest('.modal');

  button.addEventListener('click', () => {
    closeModal(modal);
  });
});

const handleSubmit = (event) => {
  event.preventDefault();

  const cardObj = {
    name: captionInput.value,
    link: linkInput.value,
  };
  const cardElement = getCardElement(cardObj);
  gallery.prepend(cardElement);

  newPostForm.reset();

  closeModal(newPostModal);
};

newPostForm.addEventListener('submit', handleSubmit);

enableValidation(settings);

initialCards.forEach((card) => {
  const cardElement = getCardElement(card);
  gallery.append(cardElement);
});
