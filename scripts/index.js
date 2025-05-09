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

const gallery = document.querySelector('.gallery');

const cardTemplate = document.querySelector('#card-template').content;

const getCardElement = (data) => {
  const cardElement = cardTemplate.querySelector('.post').cloneNode(true);

  const cardTitle = cardElement.querySelector('.post__caption');
  cardTitle.textContent = data.name;

  const cardImage = cardElement.querySelector('.post__image');
  cardImage.setAttribute('src', data.link);

  const likeBtn = cardElement.querySelector('.post__like-button');
  const likeIcon = cardElement.querySelector('.post__like-icon');
  likeBtn.addEventListener('click', () => {
    const src = likeIcon.getAttribute('src').includes('active')
      ? './images/like-icon.svg'
      : './images/like-icon-active.svg';
    likeIcon.setAttribute('src', src);

    likeBtn.classList.toggle('post__like-button_status_active');
  });

  return cardElement;
};

const openModal = (modal) => {
  modal.classList.add('modal_is-opened');
};

const closeModal = (modal) => {
  modal.classList.remove('modal_is-opened');
};

editProfileBtn.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openModal(editProfileModal);
});

editProfileCloseBtn.addEventListener('click', () =>
  closeModal(editProfileModal),
);

editProfileForm.addEventListener('submit', (event) => {
  event.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeModal(editProfileModal);
});

newPostBtn.addEventListener('click', () => openModal(newPostModal));

newPostCloseBtn.addEventListener('click', () => closeModal(newPostModal));

newPostForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const cardObj = {
    name: captionInput.value,
    link: linkInput.value,
  };
  const cardElement = getCardElement(cardObj);
  gallery.prepend(cardElement);

  closeModal(newPostModal);
});

const initialCards = [
  {
    name: 'Val Thorens',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg',
  },
  {
    name: 'Restaurant terrace',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg',
  },
  {
    name: 'An outdoor cafe',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg',
  },
  {
    name: 'A very long bridge, over the forest and through the trees',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg',
  },
  {
    name: 'Tunnel with morning light',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg',
  },
  {
    name: 'Mountain house',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg',
  },
];

initialCards.forEach((card) => {
  const cardElement = getCardElement(card);
  gallery.append(cardElement);
});
