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

const postModal = document.querySelector('#post-modal');
const postModalCloseBtn = postModal.querySelector('.modal__close-button');
const postModalImage = postModal.querySelector('.modal__image');
const postModalCaption = postModal.querySelector('.modal__caption');

const getClickHandler = (modal) => {
  const clickHandler = (event) => {
    if (event.target === modal) {
      closeModal(modal);
      modal.removeEventListener('click', clickHandler);
    }
  };

  return clickHandler;
};

const getEscapeHandler = (modal) => {
  const escapeHandler = (event) => {
    if (event.key === 'Escape') {
      closeModal(modal);
      document.removeEventListener('keydown', escapeHandler);
    }
  };

  return escapeHandler;
};

const setModalEventListeners = (modal) => {
  const escapeHandler = getEscapeHandler(modal);
  document.addEventListener('keydown', escapeHandler);

  const clickHandler = getClickHandler(modal);
  modal.addEventListener('click', clickHandler);
};

const openModal = (modal) => {
  modal.classList.add('modal_is-opened');
  modal.removeAttribute('aria-hidden');

  setModalEventListeners(modal);
};

const closeModal = (modal) => {
  modal.classList.remove('modal_is-opened');
  modal.setAttribute('aria-hidden', 'true');
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

postModalCloseBtn.addEventListener('click', () => {
  closeModal(postModal);
});

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
  const cardObj = {
    name: captionInput.value,
    link: linkInput.value,
  };
  const cardElement = getCardElement(cardObj);
  gallery.prepend(cardElement);

  newPostForm.reset();

  closeModal(newPostModal);
});

const initialCards = [
  {
    name: 'Val Thorens',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg',
  },
  {
    name: 'Jellyfish in the ocean',
    link: 'https://images.unsplash.com/photo-1745613184657-3c8dcd5f079a?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
