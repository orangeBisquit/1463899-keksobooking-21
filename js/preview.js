"use strict";

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

const avatarPreview = document.querySelector(`.ad-form-header__preview`);
const avatarPhotoInput = document.querySelector(`.ad-form__field input[type="file"]`);
const housePreview = document.querySelector(`.ad-form__photo`);
const housePhotoInput = document.querySelector(`.ad-form__upload input[type="file"]`);

const PREVIEW_STYLE = {
  image: {
    width: `70px`,
    height: `70px`,
    class: `preview__image`,
    position: `absolute`,
    left: `0`,
  },
  parent: {
    position: `relative`,
  }
};

const getPreviewImage = (parent, reader) => {
  const previewImage = document.createElement(`img`);

  previewImage.setAttribute(`width`, PREVIEW_STYLE.image.width);
  previewImage.setAttribute(`height`, PREVIEW_STYLE.image.height);
  previewImage.setAttribute(`class`, PREVIEW_STYLE.image.class);
  previewImage.style.position = PREVIEW_STYLE.image.position;
  previewImage.style.left = PREVIEW_STYLE.image.left;
  previewImage.src = reader.result;

  parent.style.position = PREVIEW_STYLE.parent.position;

  return previewImage;
};

const previewImageDeleter = () => {
  const avatarImage = avatarPreview.querySelector(`.preview__image`);
  const houseImage = housePreview.querySelector(`.preview__image`);

  if (avatarImage) {
    avatarImage.remove();
  }
  if (houseImage) {
    houseImage.remove();
  }
};

const previewHandler = (input, parent) => {
  return () => {
    const file = input.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((type) => {
      return fileName.endsWith(type);
    });

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener(`load`, () => {
        const newImage = getPreviewImage(parent, reader);
        parent.appendChild(newImage);
      });

      reader.readAsDataURL(file);
    }
  };
};

avatarPhotoInput.addEventListener(`change`, previewHandler(avatarPhotoInput, avatarPreview));
housePhotoInput.addEventListener(`change`, previewHandler(housePhotoInput, housePreview));


window.preview = {
  previewImageDeleter
};
