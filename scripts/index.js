const initialCards = [
  {
    name: 'Val Thorens',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg'
  },
  {
    name: 'Restaurant terrace',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg'
  },
  {
    name: 'An outdoor cafe',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg'
  },
  {
    name: 'A very long bridge, over the forest and through the trees',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg'
  },
  {
    name: 'Tunnel with morning light',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg'
  },
  {
    name: 'Mountain house',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg'
  },
  {
    name: 'Landscape photo',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg'
  }
];

// --- DOM elements ---

const cardsList = document.querySelector('.cards__list');
const cardTemplate = document.getElementById('card-template');
const editProfileButton = document.querySelector('.profile__edit-button');
const newPostButton = document.querySelector('.profile__new-post-button');
const editProfileModal = document.getElementById('edit-profile-modal');
const newPostModal = document.getElementById('new-post-modal');
const previewModal = document.getElementById('preview-modal');
const profileNameElement = document.querySelector('.profile__name');
const profileDescriptionElement = document.querySelector('.profile__description');
const editProfileForm = document.querySelector('[name="edit-profile"]');
const newPostForm = document.querySelector('[name="new-post"]');
const previewImage = previewModal.querySelector('.modal__preview-image');
const previewCaption = previewModal.querySelector('.modal__preview-caption');

// --- Modal functions ---

function openModal(modalElement) {
  modalElement.classList.add('modal_is-opened');
}

function closeModal(modalElement) {
  modalElement.classList.remove('modal_is-opened');
}

// --- Card generation ---

function getCardElement(data) {
  const cardElement = cardTemplate.content.cloneNode(true).querySelector('.card');
  const cardCaption = cardElement.querySelector('.card__caption');
  const cardImage = cardElement.querySelector('.card__img');
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardCaption.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

  likeButton.addEventListener('click', () => {
    const likeIcon = likeButton.querySelector('.card__like-icon');
    likeButton.classList.toggle('card__like-button_is-liked');
    if (likeButton.classList.contains('card__like-button_is-liked')) {
      likeIcon.style.filter = 'invert(26%) sepia(88%) saturate(7495%) hue-rotate(351deg) brightness(95%) contrast(98%)';
    } else {
      likeIcon.style.filter = '';
    }
  });

  deleteButton.addEventListener('click', () => {
    cardElement.remove();
  });

  cardImage.addEventListener('click', () => {
    previewImage.src = data.link;
    previewImage.alt = data.name;
    previewCaption.textContent = data.name;
    openModal(previewModal);
  });

  return cardElement;
}

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardsList.prepend(cardElement);
});

// --- Edit Profile Modal ---

editProfileButton.addEventListener('click', () => {
  const nameInput = editProfileForm.querySelector('[name="name"]');
  const descriptionInput = editProfileForm.querySelector('[name="description"]');

  nameInput.value = profileNameElement.textContent;
  descriptionInput.value = profileDescriptionElement.textContent;

  openModal(editProfileModal);
});

editProfileForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!editProfileForm.checkValidity()) {
    editProfileForm.reportValidity();
    return;
  }

  const nameInput = editProfileForm.querySelector('[name="name"]');
  const descriptionInput = editProfileForm.querySelector('[name="description"]');

  profileNameElement.textContent = nameInput.value;
  profileDescriptionElement.textContent = descriptionInput.value;

  closeModal(editProfileModal);
});

// --- New Post Modal ---

newPostButton.addEventListener('click', () => {
  openModal(newPostModal);
});

newPostForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!newPostForm.checkValidity()) {
    newPostForm.reportValidity();
    return;
  }

  const linkInput = newPostForm.querySelector('[name="link"]');
  const captionInput = newPostForm.querySelector('[name="caption"]');

  const newCardData = {
    name: captionInput.value,
    link: linkInput.value
  };

  const cardElement = getCardElement(newCardData);
  cardsList.prepend(cardElement);

  newPostForm.reset();

  closeModal(newPostModal);
});

// --- Close buttons ---

const editProfileCloseButton = editProfileModal.querySelector('.modal__close-button');
const newPostCloseButton = newPostModal.querySelector('.modal__close-button');
const previewCloseButton = previewModal.querySelector('.modal__close-button');

editProfileCloseButton.addEventListener('click', () => {
  closeModal(editProfileModal);
});

newPostCloseButton.addEventListener('click', () => {
  closeModal(newPostModal);
});

previewCloseButton.addEventListener('click', () => {
  closeModal(previewModal);
});
