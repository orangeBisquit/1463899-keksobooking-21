"use strict";

(() => {
  const cardTemplate = document
    .querySelector(`#card`)
    .content.querySelector(`.map__card`);

  const renderFeatures = (cardObject, featuresBlock, element) => {
    const featuresArray = cardObject.offer.FEATURES;
    featuresBlock.innerHTML = ``;

    for (let j = 0; j < featuresArray.length; j++) {
      const featuresItem = document.createElement(element);
      featuresItem.classList = `map__feature map__feature--${featuresArray[j]}`;
      featuresBlock.appendChild(featuresItem);
    }
  };

  const renderPhotos = (cardObject, photosBlock) => {
    const photoTemplate = photosBlock.querySelector(`img`);
    photosBlock.innerHTML = ``;

    cardObject.offer.photos.forEach((photoSrc) => {
      const newPhoto = photoTemplate.cloneNode();
      newPhoto.src = photoSrc;
      photosBlock.appendChild(newPhoto);
    });
  };

  // Создание карточки из объекта
  const createCard = (cardObject) => {
    const newCard = cardTemplate.cloneNode(true);
    const features = newCard.querySelector(`.popup__features`);
    const photos = newCard.querySelector(`.popup__photos`);

    newCard.querySelector(`.popup__title`).textContent = cardObject.offer.title;

    newCard.querySelector(`.popup__text--address`).textContent =
      cardObject.offer.address;

    newCard.querySelector(
      `.popup__text--price`
    ).textContent = `${cardObject.offer.price}₽/ночь`;

    newCard.querySelector(`.popup__type`).textContent =
      window.data.TYPE_KEYS[cardObject.offer.TYPE];

    newCard.querySelector(
      `.popup__text--capacity`
    ).textContent = `${cardObject.offer.rooms} комнаты для ${cardObject.offer.guests} гостей`;

    newCard.querySelector(
      `.popup__text--time`
    ).textContent = `Заезд после ${cardObject.offer.CHECKIN}, выезд до ${cardObject.offer.CHECKOUT}`;

    renderFeatures(cardObject, features, `li`);

    newCard.querySelector(`.popup__description`).textContent =
      cardObject.offer.description;

    renderPhotos(cardObject, photos);

    newCard.querySelector(`.popup__avatar`).src = cardObject.author.avatar;

    return newCard;
  };

  window.card = {
    createCard,
  }
})();
