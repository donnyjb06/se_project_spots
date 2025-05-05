const editProfileModal = document.querySelector('#edit-profile-modal');
const editProfileBtn = document.querySelector('.profile__edit-button');
const editProfileCloseBtn = editProfileModal.querySelector(
  '.modal__exit-button',
);

const newPostModal = document.querySelector('#new-post-modal');
const newPostBtn = document.querySelector('.profile__post-button');
const newPostCloseBtn = newPostModal.querySelector('.modal__exit-button');

editProfileBtn.addEventListener('click', () => {
  editProfileModal.classList.add('modal_is-opened');
});

editProfileCloseBtn.addEventListener('click', () => {
  editProfileModal.classList.remove('modal_is-opened');
});

newPostBtn.addEventListener('click', () => {
  newPostModal.classList.add('modal_is-opened');
});

newPostCloseBtn.addEventListener('click', () => {
  newPostModal.classList.remove('modal_is-opened');
});
