"use strict";

(() => {
  const mapPin = document.querySelector(`.map__pin--main`);
  const map = document.querySelector(`.map`);
  const pin = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const adFormFields = window.form.adForm.querySelectorAll(`fieldset`);
  const mapFilters = document.querySelector(`.map__filters`);
  const mapFiltersField = mapFilters.querySelectorAll(`.map__filter`);
  const pinsArea = document.querySelector(`.map__pins`);
  const currentPins = pinsArea.children;

  // Генерация пина
  const generatePin = (pinData) => {
    const newPin = pin.cloneNode(true);
    const locationX = pinData.location.x - pin.offsetWidth;
    const locationY = pinData.location.y - pin.offsetWidth;
    newPin.style = `left: ${locationX}px; top: ${locationY}px`;

    const pinImg = newPin.querySelector(`img`);
    pinImg.alt = pinData.offer.description;
    pinImg.src = pinData.author.avatar;
    return newPin;
  };

  window.pin = {
    generatePin,
  }

})();
