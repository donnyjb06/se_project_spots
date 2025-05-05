const editProfileModal = document.querySelector('#edit-profile-modal');
const editProfileBtn = document.querySelector('.profile__edit-button');
const editProfileCloseBtn = editProfileModal.querySelector(
  '.modal__exit-button',
);
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__bio');
const editProfileForm = editProfileModal.querySelector('form');
const nameInput = document.querySelector('[name="name"]');
const jobInput = document.querySelector('[name="description"]');

const newPostModal = document.querySelector('#new-post-modal');
const newPostBtn = document.querySelector('.profile__post-button');
const newPostCloseBtn = newPostModal.querySelector('.modal__exit-button');
const newPostForm = newPostModal.querySelector('form');
const linkInput = document.querySelector('[name="link"]');
const captionInput = document.querySelector('[name="caption"]');

editProfileBtn.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  editProfileModal.classList.add('modal_is-opened');
});

editProfileCloseBtn.addEventListener('click', () => {
  editProfileModal.classList.remove('modal_is-opened');
});

editProfileForm.addEventListener('submit', (event) => {
  event.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  editProfileModal.classList.remove('modal_is-opened');
});

newPostBtn.addEventListener('click', () => {
  newPostModal.classList.add('modal_is-opened');
});

newPostCloseBtn.addEventListener('click', () => {
  newPostModal.classList.remove('modal_is-opened');
});

newPostForm.addEventListener('submit', (event) => {
  event.preventDefault();

  console.log(linkInput.value);
  console.log(captionInput.value);

  newPostModal.classList.remove('modal_is-opened');
});
