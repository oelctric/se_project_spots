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

// --- Validation configuration ---

const validationConfig = {
  formSelector: '.modal__form',
  inputSelector: '.modal__input',
  submitButtonSelector: '.modal__save-button',
  inactiveButtonClass: 'modal__save-button_disabled',
  inputErrorClass: 'modal__input_type_error',
  errorClass: 'modal__error_visible'
};

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
const previewTitle = previewModal.querySelector('.modal__preview-title');
const previewContainer = previewModal.querySelector('.modal__container');
const nameInput = editProfileForm.querySelector('[name="name"]');
const descriptionInput = editProfileForm.querySelector('[name="description"]');

// --- Modal functions ---

function handleEscapeKeydown(event) {
  if (event.key === 'Escape') {
    const openedModal = document.querySelector('.modal_is-opened');
    closeModal(openedModal);
  }
}

function openModal(modalElement) {
  modalElement.classList.add('modal_is-opened');
  document.addEventListener('keydown', handleEscapeKeydown);
}

function closeModal(modalElement) {
  modalElement.classList.remove('modal_is-opened');
  document.removeEventListener('keydown', handleEscapeKeydown);
}

enableValidation(validationConfig);

document.querySelectorAll('.modal').forEach((modalElement) => {
  modalElement.addEventListener('mousedown', (event) => {
    if (event.target === modalElement) {
      closeModal(modalElement);
    }
  });
});

document.querySelectorAll('.modal__close-button').forEach((closeButton) => {
  closeButton.addEventListener('click', () => {
    closeModal(closeButton.closest('.modal'));
  });
});

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
    likeButton.classList.toggle('card__like-button_is-liked');
  });

  deleteButton.addEventListener('click', () => {
    cardElement.remove();
  });

  cardImage.addEventListener('click', () => {
    previewImage.src = data.link;
    previewImage.alt = data.name;
    previewTitle.textContent = data.name;

    const img = new Image();
    img.onload = () => {
      const isHorizontal = img.naturalWidth > img.naturalHeight;
      if (isHorizontal) {
        previewContainer.classList.add('modal__container--horizontal');
      } else {
        previewContainer.classList.remove('modal__container--horizontal');
      }
      openModal(previewModal);
    };
    img.onerror = () => {
      openModal(previewModal);
    };
    img.src = data.link;
  });

  return cardElement;
}

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardsList.prepend(cardElement);
});

// --- Edit Profile Modal ---

editProfileButton.addEventListener('click', () => {
  nameInput.value = profileNameElement.textContent;
  descriptionInput.value = profileDescriptionElement.textContent;
  resetValidation(editProfileForm, validationConfig);

  openModal(editProfileModal);
});

editProfileForm.addEventListener('submit', (event) => {
  event.preventDefault();

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

  const linkInput = newPostForm.querySelector('[name="link"]');
  const captionInput = newPostForm.querySelector('[name="caption"]');

  const newCardData = {
    name: captionInput.value,
    link: linkInput.value
  };

  const cardElement = getCardElement(newCardData);
  cardsList.prepend(cardElement);

  newPostForm.reset();
  resetValidation(newPostForm, validationConfig);

  closeModal(newPostModal);
});

