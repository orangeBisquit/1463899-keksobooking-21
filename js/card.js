"use strict";

(() => {
  const map = document.querySelector(`.map`);
  const mapFilters = document.querySelector(`.map__filters--container`);

  const TYPE_KEYS = {
    palace: `Дворец`,
    flat: `Квартира`,
    house: `Дом`,
    bungalow: `Бунгало`,
  };

  const cardTemplate = document
    .querySelector(`#card`)
    .content.querySelector(`.map__card`);

  // Закрытие карточки
  const cardCloseHandler = () => {
    const oldCard = document.querySelector(`.map__card`);
    if (oldCard) {
      oldCard.remove();
    }
  };

  const onCardEscapePress = (evt) => {
    if (evt.keyCode === 27) {
      cardCloseHandler();
      document.removeEventListener(`keydown`, onCardEscapePress);
    }
  };

  const onCloseButtonClick = () => {
    cardCloseHandler();
    document.removeEventListener(`click`, onCloseButtonClick);
  };

  // Добавление features в карточку
  const renderFeatures = (cardObject, featuresBlock, element) => {
    const featuresArray = cardObject.offer.features;
    featuresBlock.innerHTML = ``;

    featuresArray.forEach((item) => {
      const featuresItem = document.createElement(element);
      featuresItem.classList = `map__feature map__feature--${item}`;
      featuresBlock.appendChild(featuresItem);
    });
  };

  // Добавление фото в карточку
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
    const cardCloseButton = newCard.querySelector(`.popup__close`);

    newCard.querySelector(`.popup__title`).textContent = cardObject.offer.title;

    newCard.querySelector(`.popup__text--address`).textContent =
      cardObject.offer.address;

    newCard.querySelector(
        `.popup__text--price`
    ).textContent = `${cardObject.offer.price}₽/ночь`;

    newCard.querySelector(`.popup__type`).textContent =
      TYPE_KEYS[cardObject.offer.TYPE];

    newCard.querySelector(
        `.popup__text--capacity`
    ).textContent = `${cardObject.offer.rooms} комнаты для ${cardObject.offer.guests} гостей`;

    newCard.querySelector(
        `.popup__text--time`
    ).textContent = `Заезд после ${cardObject.offer.checkin}, выезд до ${cardObject.offer.checkout}`;

    renderFeatures(cardObject, features, `li`);

    newCard.querySelector(`.popup__description`).textContent =
      cardObject.offer.description;

    renderPhotos(cardObject, photos);

    newCard.querySelector(`.popup__avatar`).src = cardObject.author.avatar;

    document.addEventListener(`keydown`, onCardEscapePress);
    cardCloseButton.addEventListener(`click`, onCloseButtonClick);

    return newCard;
  };

  // Рендер карточки
  const renderCard = (cardData) => {
    const oldCard = document.querySelector(`.map__card`);
    if (oldCard) {
      oldCard.remove();
    }
    const newCard = cardData;

    map.insertBefore(newCard, mapFilters);
  };

  window.card = {
    createCard,
    cardCloseHandler,
    renderCard
  };
})();
