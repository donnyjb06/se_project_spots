// ========================
// IMPORTS
// ========================

import './index.css';
import { Api } from '../scripts/Api.js';
import {
  enableValidation,
  settings,
  resetInputErrors,
} from '../scripts/validation.js';

import likeButtonIcon from '../images/like-icon.svg';
import activeLikeButtonIcon from '../images/like-icon-active.svg';
import plusIcon from '../images/plus-icon.svg';
import logo from '../images/Logo.svg';
import darkEditButton from '../images/edit-icon-dark.svg';
import lightEditButton from '../images/edit-icon-light.svg';
import deleteIcon from '../images/delete-icon.svg';
import darkExitButton from '../images/exit-icon-dark.svg';
import lightExitButton from '../images/exit-icon-light.svg';

// ========================
// DOM SELECTORS
// ========================

// Modals
const editProfileModal = document.querySelector('#edit-profile-modal');
const newPostModal = document.querySelector('#new-post-modal');
const postModal = document.querySelector('#post-modal');
const deletePostModal = document.querySelector('#delete-post-modal');

// Buttons
const editProfileBtn = document.querySelector('.profile__edit-button');
const editAvatarBtn = document.querySelector('.profile__edit-avatar-button');
const newPostBtn = document.querySelector('.profile__post-button');
const deleteModalDeleteBtn = deletePostModal.querySelector(
  '.modal__button_type_delete',
);
const deleteModalCancelButton = deletePostModal.querySelector(
  '.modal__button_type_cancel',
);

// Profile fields
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__bio');
const profileAvatar = document.querySelector('.profile__avatar');

// Forms & inputs
const editProfileForm = document.forms['edit-profile-form'];
const nameInput = document.querySelector('[name="name"]');
const jobInput = document.querySelector('[name="description"]');

const newPostForm = document.forms['new-post-form'];
const linkInput = document.querySelector('[name="link"]');
const captionInput = document.querySelector('[name="caption"]');

// Cards
const gallery = document.querySelector('.gallery');
const cardTemplate = document.querySelector('#card-template').content;

// Post Modal content
const postModalImage = postModal.querySelector('.modal__image');
const postModalCaption = postModal.querySelector('.modal__caption');

// ========================
// GLOBAL VARIABLES
// ========================

let selectedCard;
let selectedCardId;

// ========================
// API CONFIG
// ========================

const api = new Api({
  baseUrl: 'https://around-api.en.tripleten-services.com/v1',
  headers: {
    authorization: 'a8040853-68c0-456c-91da-f53acdcb6623',
    'Content-Type': 'application/json',
  },
});

// ========================
// UI INITIALIZATION
// ========================

document.querySelector('.header__logo').src = logo;
newPostBtn.querySelector('.profile__plus-icon').src = plusIcon;
editProfileBtn.querySelector('.profile__edit-icon').src = darkEditButton;
editAvatarBtn.querySelector('.profile__edit-avatar-icon').src = lightEditButton;

document.querySelectorAll('.modal__exit-icon').forEach((icon) => {
  icon.src = icon.classList.contains('modal__exit-icon_type_dark')
    ? lightExitButton
    : darkExitButton;
});

// ========================
// UTILITY FUNCTIONS
// ========================

const updateProfileInfo = (data) => {
  profileName.textContent = data.name || profileName.textContent;
  profileJob.textContent = data.about || profileJob.textContent;
  profileAvatar.src = data.avatar;
};

const handleClick = (event) => {
  const modal = document.querySelector('.modal_is-opened');
  if (event.target.classList.contains('modal')) closeModal(modal);
};

const handleEscape = (event) => {
  const modal = document.querySelector('.modal_is-opened');
  if (event.key === 'Escape') closeModal(modal);
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

const handleDeleteCard = (cardElement, data) => {
  selectedCard = cardElement;
  selectedCardId = data._id;
  openModal(deletePostModal);
};

const handleConfirmDelete = () => {
  api
    .deletePost(selectedCardId)
    .then((res) => console.log(res))
    .catch((error) => console.error(error));
  selectedCard.remove();
  closeModal(deletePostModal);
};

// ========================
// CARD GENERATOR
// ========================

const getCardElement = (data) => {
  const cardElement = cardTemplate.querySelector('.post').cloneNode(true);
  cardElement.dataset.id = data.id;

  const cardTitle = cardElement.querySelector('.post__caption');
  cardTitle.textContent = data.name;

  const cardImage = cardElement.querySelector('.post__image');
  cardImage.setAttribute('src', data.link);
  cardImage.setAttribute('alt', data.name);

  const likeBtn = cardElement.querySelector('.post__like-button');
  if (data.isLiked) {
    likeBtn.classList.add('post__like-button_status_active');
  }

  const likeIcon = cardElement.querySelector('.post__like-icon');
  likeIcon.src = data.isLiked ? activeLikeButtonIcon : likeButtonIcon;

  likeBtn.addEventListener('click', () => {
    const isLiked = likeBtn.classList.contains(
      'post__like-button_status_active',
    );

    api
      .toggleLike(data._id, isLiked)
      .then((res) => {
        const src = res.isLiked ? activeLikeButtonIcon : likeButtonIcon;
        likeIcon.setAttribute('src', src);
        likeBtn.classList.toggle('post__like-button_status_active');
      })
      .catch((error) => console.log(error));
  });

  const deleteBtn = cardElement.querySelector('.post__delete-button');
  deleteBtn.querySelector('.post__delete-icon').src = deleteIcon;
  deleteBtn.addEventListener('click', () => {
    handleDeleteCard(cardElement, data);
  });

  cardImage.addEventListener('click', () => {
    postModalImage.setAttribute('src', data.link);
    postModalImage.setAttribute('alt', data.name);
    postModalCaption.textContent = data.name;
    openModal(postModal);
  });

  return cardElement;
};

// ========================
// EVENT LISTENERS
// ========================

// Edit profile button
editProfileBtn.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  resetInputErrors(editProfileForm, [nameInput, jobInput], settings);
  openModal(editProfileModal);
});

// Edit profile submit
editProfileForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const values = {
    name: nameInput.value,
    about: jobInput.value,
  };

  api
    .editUserInfo(values)
    .then((res) => {
      profileName.textContent = res.name;
      profileJob.textContent = res.about;
    })
    .catch((error) => console.error(error));

  closeModal(editProfileModal);
});

// New post button
newPostBtn.addEventListener('click', () => openModal(newPostModal));

// Close modals
Array.from(document.querySelectorAll('.modal__close-btn')).forEach((button) => {
  const modal = button.closest('.modal');
  button.addEventListener('click', () => closeModal(modal));
});

// Submit new post
const handleSubmit = (event) => {
  event.preventDefault();

  const cardObj = {
    name: captionInput.value,
    link: linkInput.value,
  };

  api
    .addNewPost(cardObj)
    .then((res) => {
      const cardElement = getCardElement(res);
      gallery.prepend(cardElement);
    })
    .catch((error) => console.error(error));

  newPostForm.reset();
  closeModal(newPostModal);
};

newPostForm.addEventListener('submit', handleSubmit);

deleteModalDeleteBtn.addEventListener('click', () => {
  handleConfirmDelete();
});

deleteModalCancelButton.addEventListener('click', () => {
  closeModal(deletePostModal);
});

// ========================
// INIT APP
// ========================

enableValidation(settings);

api
  .renderInitialDetails()
  .then(({ userData, postsData }) => {
    updateProfileInfo(userData);

    postsData.forEach((post) => {
      const cardElement = getCardElement(post);
      gallery.append(cardElement);
    });
  })
  .catch((error) => console.error(error));
