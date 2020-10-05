"use strict";

(() => {
  const map = document.querySelector(`.map`);
  const mapFilters = document.querySelector(`.map__filters--container`);
  const fixedPins = window.data.renderRandomAds(8);
  const pinsArea = document.querySelector(`.map__pins`);
  const oldCard = document.querySelector(".map__card");

  const onCardEscapePress = (evt) => {
    if (evt.keyCode === 27) {
      const oldCard = document.querySelector(".map__card");
      oldCard.remove();
      document.removeEventListener("keydown", onCardEscapePress);
    }
  };

  const onCloseButtonClick = (evt) => {
    const oldCard = document.querySelector(".map__card");
    oldCard.remove();
    document.removeEventListener("click", onCloseButtonClick);
  };

  // Рендер карточки
  const renderCard = (createdCard) => {
    const oldCard = document.querySelector(".map__card");
    if (oldCard) {
      oldCard.remove();
    }
    const newCard = createdCard;
    const cardCloseButton = newCard.querySelector(".popup__close");

    document.addEventListener("keydown", onCardEscapePress);
    cardCloseButton.addEventListener("click", onCloseButtonClick);

    map.insertBefore(newCard, mapFilters);
  };

  const renderPins = (adsArray) => {
    const pinsFragment = document.createDocumentFragment();

    for (let i = 0; i < adsArray.length; i++) {
      pinsFragment.appendChild(window.pin.generatePin(adsArray[i]));
    }

    pinsArea.appendChild(pinsFragment);
  };

  window.map = {
    renderCard,
    renderPins
  };

})();

