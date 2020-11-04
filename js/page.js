"use strict";

const PIN_START_X = `570px`;
const PIN_START_Y = `375px`;

const pinsArea = document.querySelector(`.map__pins`);
const map = document.querySelector(`.map`);
const mapFilters = document.querySelector(`.map__filters`);
const mapPin = document.querySelector(`.map__pin--main`);
const formResetButton = document.querySelector(`.ad-form__reset`);
let pageIsActive = false;

const toggleFields = (fields, boolean) => {
  fields.forEach((item) => {
    if (boolean) {
      item.disabled = true;
      return;
    }
    item.disabled = false;
  });
};

// Возвращение главного пина на начальную точку
const resetMainPinCoords = () => {
  const mainPin = pinsArea.querySelector(`.map__pin--main`);
  mainPin.style.left = PIN_START_X;
  mainPin.style.top = PIN_START_Y;
};

// Обработчики активации страницы
const onPinMouseDown = (evt) => {
  if (evt.button === 0) {
    enablePage();
  }
};

const onPinEnterPress = (evt) => {
  if (evt.keyCode === 13) {
    enablePage();
  }
};
// Активации карты
const enableMap = () => {
  map.classList.remove(`map--faded`);
  pageIsActive = true;
};
// Блокировка карты
const disableMap = () => {
  map.classList.add(`map--faded`);
  pageIsActive = false;
};
// Блокировка страницы
const disablePage = () => {
  window.filter.disableAll();
  window.form.disable();
  disableMap();

  window.form.reset();
  window.preview.imageDeleter();
  window.pin.hide();
  resetMainPinCoords();
  window.move.setCoords(mapPin);

  mapFilters.removeEventListener(`change`, window.filter.onFormChange);
  mapPin.addEventListener(`mousedown`, onPinMouseDown);
  mapPin.addEventListener(`keydown`, onPinEnterPress);
};
// Активация страницы
const enablePage = () => {
  window.ajax.download((data) => {
    window.receivedData = data;
    window.pin.render(data);
  });

  window.filter.enableAll();
  window.form.enable();
  enableMap();

  window.move.setCoords(mapPin);

  mapPin.removeEventListener(`mousedown`, onPinMouseDown);
  mapPin.removeEventListener(`keydown`, onPinEnterPress);
  mapFilters.addEventListener(`change`, window.filter.onFormChange);
};
// Обработчик очистки формы
formResetButton.addEventListener(`click`, disablePage);


window.page = {
  isActive: pageIsActive,
  disable: disablePage,
  enable: enablePage,
  toggleFields
};
