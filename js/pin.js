"use strict";

(() => {
  const pin = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

  // Генерация пина
  const generatePin = (pinData) => {
    const newPin = pin.cloneNode(true);
    const locationX = pinData.location.x - pin.offsetWidth;
    const locationY = pinData.location.y - pin.offsetWidth;
    newPin.style = `left: ${locationX}px; top: ${locationY}px`;

    const pinImg = newPin.querySelector(`img`);
    pinImg.alt = pinData.offer.description;
    pinImg.src = pinData.author.avatar;

    newPin.addEventListener(`click`, () => {
      window.map.renderCard(window.card.createCard(pinData));
    });
    return newPin;
  };

  window.pin = {
    generatePin,
  };
})();
