const api = new Api({
  baseUrl: 'https://around-api.en.tripleten-services.com/v1',
  headers: {
    authorization: '6d6fd1bb-9d80-4955-ab7e-8bde698df1e1',
    'Content-Type': 'application/json'
  }
});

// --- DOM elements ---

const cardsList = document.querySelector('.cards__list');
const cardTemplate = document.getElementById('card-template');
const editProfileButton = document.querySelector('.profile__edit-button');
const newPostButton = document.querySelector('.profile__new-post-button');
const avatarEditButton = document.querySelector('.profile__avatar-edit-button');
const avatarImage = document.querySelector('.profile__avatar');
const editProfileModal = document.getElementById('edit-profile-modal');
const newPostModal = document.getElementById('new-post-modal');
const previewModal = document.getElementById('preview-modal');
const deleteConfirmModal = document.getElementById('delete-confirm-modal');
const editAvatarModal = document.getElementById('edit-avatar-modal');
const profileNameElement = document.querySelector('.profile__name');
const profileDescriptionElement = document.querySelector('.profile__description');
const editProfileForm = document.querySelector('[name="edit-profile"]');
const newPostForm = document.querySelector('[name="new-post"]');
const deleteConfirmForm = document.querySelector('[name="delete-confirm"]');
const deleteCancelButton = deleteConfirmForm.querySelector('.modal__cancel-button');
const editAvatarForm = document.querySelector('[name="edit-avatar"]');
const previewImage = previewModal.querySelector('.modal__preview-image');
const previewTitle = previewModal.querySelector('.modal__preview-title');
const previewContainer = previewModal.querySelector('.modal__container');
const nameInput = editProfileForm.querySelector('[name="name"]');
const descriptionInput = editProfileForm.querySelector('[name="description"]');
const avatarInput = editAvatarForm.querySelector('[name="avatar"]');

let selectedCardElement = null;
let selectedCardId = null;

// --- Modal functions ---

function closeOnEscape(event) {
  if (event.key === 'Escape') {
    const openedModal = document.querySelector('.modal_is-opened');
    closeModal(openedModal);
  }
}

function openModal(modalElement) {
  modalElement.classList.add('modal_is-opened');
  document.addEventListener('keydown', closeOnEscape);
}

function closeModal(modalElement) {
  modalElement.classList.remove('modal_is-opened');
  document.removeEventListener('keydown', closeOnEscape);
}

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

// --- Loading text helper ---

function renderLoading(buttonElement, isLoading, loadingText = 'Saving...') {
  if (isLoading) {
    buttonElement.dataset.originalText = buttonElement.textContent;
    buttonElement.textContent = loadingText;
  } else {
    buttonElement.textContent = buttonElement.dataset.originalText;
  }
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

  if (data.isLiked) {
    likeButton.classList.add('card__like-button_is-liked');
  }

  likeButton.addEventListener('click', () => {
    const isLiked = likeButton.classList.contains('card__like-button_is-liked');
    api
      .changeLikeCardStatus(data._id, !isLiked)
      .then((updatedCard) => {
        likeButton.classList.toggle('card__like-button_is-liked', updatedCard.isLiked);
      })
      .catch((err) => {
        console.error(err);
      });
  });

  deleteButton.addEventListener('click', () => {
    selectedCardElement = cardElement;
    selectedCardId = data._id;
    openModal(deleteConfirmModal);
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

// --- Load user info and cards from the server ---

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    profileNameElement.textContent = userData.name;
    profileDescriptionElement.textContent = userData.about;
    avatarImage.src = userData.avatar;
    avatarImage.alt = userData.name;

    cards.forEach((cardData) => {
      const cardElement = getCardElement(cardData);
      cardsList.prepend(cardElement);
    });
  })
  .catch((err) => {
    console.error(err);
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

  const submitButton = editProfileForm.querySelector('.modal__save-button');
  renderLoading(submitButton, true);

  api
    .editUserInfo({ name: nameInput.value, about: descriptionInput.value })
    .then((userData) => {
      profileNameElement.textContent = userData.name;
      profileDescriptionElement.textContent = userData.about;
      closeModal(editProfileModal);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      renderLoading(submitButton, false);
    });
});

// --- New Post Modal ---

newPostButton.addEventListener('click', () => {
  openModal(newPostModal);
});

newPostForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const linkInput = newPostForm.querySelector('[name="link"]');
  const captionInput = newPostForm.querySelector('[name="caption"]');
  const submitButton = newPostForm.querySelector('.modal__save-button');

  renderLoading(submitButton, true);

  api
    .addCard({ name: captionInput.value, link: linkInput.value })
    .then((cardData) => {
      const cardElement = getCardElement(cardData);
      cardsList.prepend(cardElement);

      newPostForm.reset();
      resetValidation(newPostForm, validationConfig);

      closeModal(newPostModal);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      renderLoading(submitButton, false);
    });
});

// --- Delete Confirmation Modal ---

deleteCancelButton.addEventListener('click', () => {
  closeModal(deleteConfirmModal);
});

deleteConfirmForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const submitButton = deleteConfirmForm.querySelector('.modal__save-button');
  renderLoading(submitButton, true, 'Deleting...');

  api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCardElement.remove();
      selectedCardElement = null;
      selectedCardId = null;
      closeModal(deleteConfirmModal);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      renderLoading(submitButton, false);
    });
});

// --- Avatar Edit Modal ---

avatarEditButton.addEventListener('click', () => {
  avatarInput.value = '';
  resetValidation(editAvatarForm, validationConfig);

  openModal(editAvatarModal);
});

editAvatarForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const submitButton = editAvatarForm.querySelector('.modal__save-button');
  renderLoading(submitButton, true);

  api
    .updateAvatar({ avatar: avatarInput.value })
    .then((userData) => {
      avatarImage.src = userData.avatar;

      editAvatarForm.reset();
      resetValidation(editAvatarForm, validationConfig);

      closeModal(editAvatarModal);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      renderLoading(submitButton, false);
    });
});
