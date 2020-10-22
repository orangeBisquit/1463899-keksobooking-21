"use strict";

(() => {
  const pinsArea = document.querySelector(`.map__pins`);

  const renderPins = (adsArray) => {
    const pinsFragment = document.createDocumentFragment();

    adsArray.slice(0, 5).forEach((item) => {
      pinsFragment.appendChild(window.pin.getPin(item));
    });

    pinsArea.appendChild(pinsFragment);
  };
  // Возвращение главного пина на начальную точку
  const resetMainPinCoords = () => {
    const mainPin = pinsArea.querySelector(`.map__pin--main`);
    mainPin.style.left = `570px`;
    mainPin.style.top = `375px`;
  };
  // Обновление пинов
  const updatePins = (data) => {
    window.pin.hidePins();
    window.card.cardCloseHandler();
    renderPins(data);
  };

  window.map = {
    renderPins,
    updatePins,
    resetMainPinCoords
  };
})();
