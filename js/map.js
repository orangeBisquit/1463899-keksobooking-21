"use strict";

(() => {
  const map = document.querySelector(`.map`);
  const mapFilters = document.querySelector(`.map__filters--container`);
  const fixedPins = window.data.renderRandomAds(8);
  const pinsArea = document.querySelector(`.map__pins`);

  // Рендер карточки
  const renderCard = (createdCard) => {
    const newCard = createdCard;
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
  }

})();

