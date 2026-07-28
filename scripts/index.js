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
  }
];

// Modal utilities
function openModal(modal) {
  modal.classList.add('modal_is-opened');
}

function closeModal(modal) {
  modal.classList.remove('modal_is-opened');
}

// Profile elements
const profileNameElement = document.querySelector('.profile__name');
const profileDescriptionElement = document.querySelector('.profile__description');

// Edit Profile Modal
const editProfileButton = document.querySelector('.profile__edit-button');
const editProfileModal = document.querySelector('#edit-profile-modal');
const editProfileCloseButton = editProfileModal.querySelector('.modal__close-button');
const editProfileForm = editProfileModal.querySelector('.modal__form');
const nameInput = editProfileForm.querySelector('[name="name"]');
const descriptionInput = editProfileForm.querySelector('[name="description"]');

// Fill form fields when opening modal
function fillEditProfileFields() {
  nameInput.value = profileNameElement.textContent;
  descriptionInput.value = profileDescriptionElement.textContent;
}

editProfileButton.addEventListener('click', () => {
  fillEditProfileFields();
  openModal(editProfileModal);
});

editProfileCloseButton.addEventListener('click', () => {
  closeModal(editProfileModal);
});

// Edit Profile form submission
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileNameElement.textContent = nameInput.value;
  profileDescriptionElement.textContent = descriptionInput.value;

  closeModal(editProfileModal);
}

editProfileForm.addEventListener('submit', handleProfileFormSubmit);

// New Post Modal
const newPostButton = document.querySelector('.profile__new-post-button');
const newPostModal = document.querySelector('#new-post-modal');
const newPostCloseButton = newPostModal.querySelector('.modal__close-button');
const addCardFormElement = newPostModal.querySelector('.modal__form');
const linkInput = addCardFormElement.querySelector('[name="link"]');
const captionInput = addCardFormElement.querySelector('[name="caption"]');

newPostButton.addEventListener('click', () => {
  openModal(newPostModal);
});

newPostCloseButton.addEventListener('click', () => {
  closeModal(newPostModal);
});

// New Post form submission
function handleAddCardSubmit(evt) {
  evt.preventDefault();

  console.log(linkInput.value);
  console.log(captionInput.value);

  closeModal(newPostModal);
}

addCardFormElement.addEventListener('submit', handleAddCardSubmit);

// Loop through initialCards and log each card's name
initialCards.forEach(function(card) {
  console.log(card.name);
});
