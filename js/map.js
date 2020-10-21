"use strict";

(() => {
  const map = document.querySelector(`.map`);
  const mapFilters = document.querySelector(`.map__filters--container`);
  const pinsArea = document.querySelector(`.map__pins`);

  // Рендер карточки
  const renderCard = (cardData) => {
    const oldCard = document.querySelector(`.map__card`);
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
  // Удаление пинов после блокировки
  const hidePins = () => {
    const allPins = pinsArea.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    allPins.forEach((item) => {
      item.remove();
    });
  };
  // Возвращение главного пина на начальную точку
  const resetMainPinCoords = () => {
    const mainPin = pinsArea.querySelector(`.map__pin--main`);
    mainPin.style.left = `570px`;
    mainPin.style.top = `375px`;
  }
  // Обновление пинов
  const updatePins = (data) => {
    hidePins();
    window.card.cardCloseHandler();
    renderPins(data);
  };

  window.map = {
    renderCard,
    renderPins,
    hidePins,
    updatePins,
    resetMainPinCoords
  };
})();
