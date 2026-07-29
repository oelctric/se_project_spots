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

initialCards.forEach((card) => {
  console.log(card.name);
});

// --- Modal functions ---

function openModal(modalElement) {
  modalElement.classList.add('modal_is-opened');
}

function closeModal(modalElement) {
  modalElement.classList.remove('modal_is-opened');
}

// --- DOM elements ---

const editProfileButton = document.querySelector('.profile__edit-button');
const newPostButton = document.querySelector('.profile__new-post-button');
const editProfileModal = document.getElementById('edit-profile-modal');
const newPostModal = document.getElementById('new-post-modal');
const profileNameElement = document.querySelector('.profile__name');
const profileDescriptionElement = document.querySelector('.profile__description');
const editProfileForm = document.querySelector('[name="edit-profile"]');
const newPostForm = document.querySelector('[name="new-post"]');

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

  const linkInput = newPostForm.querySelector('[name="link"]');
  const captionInput = newPostForm.querySelector('[name="caption"]');

  console.log({
    link: linkInput.value,
    caption: captionInput.value
  });

  closeModal(newPostModal);
});

// --- Close buttons ---

document.querySelectorAll('.modal__close-button').forEach((button) => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal');
    closeModal(modal);
  });
});
