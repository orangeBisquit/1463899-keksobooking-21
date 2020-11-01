"use strict";

const pin = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const pinsArea = document.querySelector(`.map__pins`);

// Подсветка активного пина
const getActivePin = (activePin) => {
  const allActivePins = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);
  allActivePins.forEach((item) => {
    item.classList.remove(`map__pin--active`);
  });
  activePin.classList.add(`map__pin--active`);
};
// Генерация пина
const getPin = (pinData) => {
  const newPin = pin.cloneNode(true);
  const locationX = pinData.location.x - pin.offsetWidth;
  const locationY = pinData.location.y - pin.offsetWidth;
  newPin.style = `left: ${locationX}px; top: ${locationY}px`;

  const pinImg = newPin.querySelector(`img`);
  pinImg.alt = pinData.offer.description;
  pinImg.src = pinData.author.avatar;

  newPin.addEventListener(`click`, () => {
    window.card.renderCard(window.card.createCard(pinData));
    getActivePin(newPin);
  });
  return newPin;
};
const renderPins = (adsArray) => {
  const pinsFragment = document.createDocumentFragment();

  adsArray.slice(0, 5).forEach((item) => {
    pinsFragment.appendChild(getPin(item));
  });

  pinsArea.appendChild(pinsFragment);
};
// Обновление пинов
const updatePins = window.debounce((data) => {
  hidePins();
  window.card.cardCloseHandler();
  renderPins(data);
});
// Удаление пинов после блокировки
const hidePins = () => {
  const allPins = pinsArea.querySelectorAll(`.map__pin:not(.map__pin--main)`);
  allPins.forEach((item) => {
    item.remove();
  });
};

window.pin = {
  getPin,
  hidePins,
  renderPins,
  updatePins
};
