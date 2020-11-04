"use strict";

const MAIN_PIN_HEIGHT = 87;
const MAIN_PIN_WIDTH = 65;
const MAP_TOP = 130 - MAIN_PIN_HEIGHT / 2;
const MAP_RIGHT = 1200 - MAIN_PIN_WIDTH / 2;
const MAP_BOTTOM = 630 - MAIN_PIN_HEIGHT / 2;
const MAP_LEFT = 0 - MAIN_PIN_WIDTH / 2;

const mapPin = document.querySelector(`.map__pin--main`);
const addressInput = document.querySelector(`#address`);

// Проверка максимальных координат Пина
const checkCoords = (x, y) => {
  let maxCoords = {};

  if (x <= MAP_LEFT) {
    maxCoords.x = MAP_LEFT;
  } else if (x >= MAP_RIGHT) {
    maxCoords.x = MAP_RIGHT;
  } else {
    maxCoords.x = x;
  }

  if (y <= MAP_TOP) {
    maxCoords.y = MAP_TOP;
  } else if (y >= MAP_BOTTOM) {
    maxCoords.y = MAP_BOTTOM;
  } else {
    maxCoords.y = y;
  }

  return maxCoords;
};

// Перетаскивание Пина
mapPin.addEventListener(`mousedown`, (evt) => {
  evt.preventDefault();

  let startCoords = {
    x: evt.clientX,
    y: evt.clientY,
  };

  const onMouseMove = (moveEvt) => {
    moveEvt.preventDefault();

    const shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY,
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY,
    };

    mapPin.style.top = mapPin.offsetTop - shift.y + `px`;
    mapPin.style.left = mapPin.offsetLeft - shift.x + `px`;

    let maxCoords = checkCoords(mapPin.offsetLeft, mapPin.offsetTop);
    mapPin.style.top = maxCoords.y + `px`;
    mapPin.style.left = maxCoords.x + `px`;

    setCoords(mapPin);
  };

  const onMouseUp = (upEvt) => {
    upEvt.preventDefault();

    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
  };

  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
});
// Установка координат Пина в поле адреса формы
const setCoords = (pin) => {
  if (window.page.isActive) {
    addressInput.value =
      Math.round(pin.offsetLeft + MAIN_PIN_WIDTH) +
      `, ` +
      Math.round(pin.offsetTop + MAIN_PIN_HEIGHT / 2);
    return;
  }
  addressInput.value =
    Math.round(pin.offsetLeft + MAIN_PIN_WIDTH / 2) +
    `, ` +
    Math.round(pin.offsetTop + MAIN_PIN_HEIGHT / 2);
};

window.move = {
  setCoords,
};
