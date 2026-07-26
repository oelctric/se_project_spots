// Edit Profile Modal
const editProfileButton = document.querySelector('.profile__edit-button');
const editProfileModal = document.querySelector('#edit-profile-modal');
const editProfileCloseButton = editProfileModal.querySelector('.modal__close-button');

editProfileButton.addEventListener('click', () => {
  editProfileModal.classList.add('modal_is-opened');
});

editProfileCloseButton.addEventListener('click', () => {
  editProfileModal.classList.remove('modal_is-opened');
});

// New Post Modal
const newPostButton = document.querySelector('.profile__new-post-button');
const newPostModal = document.querySelector('#new-post-modal');
const newPostCloseButton = newPostModal.querySelector('.modal__close-button');

newPostButton.addEventListener('click', () => {
  newPostModal.classList.add('modal_is-opened');
});

newPostCloseButton.addEventListener('click', () => {
  newPostModal.classList.remove('modal_is-opened');
});
