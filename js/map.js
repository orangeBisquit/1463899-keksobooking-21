"use strict";

(() => {
  const map = document.querySelector(`.map`);
  const mapFilters = document.querySelector(`.map__filters--container`);
  const fixedPins = window.data.renderRandomAds(8);
  const pinsArea = document.querySelector(`.map__pins`);
  const oldCard = document.querySelector(".map__card");

  // Рендер карточки
  const renderCard = (cardData) => {
    const oldCard = document.querySelector(".map__card");
    if (oldCard) {
      oldCard.remove();
    }
    const newCard = cardData;

    map.insertBefore(newCard, mapFilters);
  };

  const renderPins = (adsArray) => {
    const pinsFragment = document.createDocumentFragment();

    adsArray.forEach((item) => {
      pinsFragment.appendChild(window.pin.generatePin(item));
    });

    pinsArea.appendChild(pinsFragment);
  };

  window.map = {
    renderCard,
    renderPins
  };

})();

