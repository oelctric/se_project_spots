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
  editProfileModal.classList.add('modal_is-opened');
});

editProfileCloseButton.addEventListener('click', () => {
  editProfileModal.classList.remove('modal_is-opened');
});

// Edit Profile form submission
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileNameElement.textContent = nameInput.value;
  profileDescriptionElement.textContent = descriptionInput.value;

  editProfileModal.classList.remove('modal_is-opened');
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
  newPostModal.classList.add('modal_is-opened');
});

newPostCloseButton.addEventListener('click', () => {
  newPostModal.classList.remove('modal_is-opened');
});

// New Post form submission
function handleAddCardSubmit(evt) {
  evt.preventDefault();

  console.log(linkInput.value);
  console.log(captionInput.value);

  newPostModal.classList.remove('modal_is-opened');
}

addCardFormElement.addEventListener('submit', handleAddCardSubmit);
