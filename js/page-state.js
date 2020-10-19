"use strict";

(() => {
  const map = document.querySelector(`.map`);
  const mapFilters = document.querySelector(`.map__filters`);
  const mapFiltersField = mapFilters.querySelectorAll(`.map__filter`);
  const adForm = document.querySelector(`.ad-form`);
  const adFormFields = adForm.querySelectorAll(`fieldset`);
  const mapPin = document.querySelector(`.map__pin--main`);
  let pageIsActive = false;
  const roomNumberInput = window.form.adForm.querySelector(`#room_number`);

  const toggleFields = (fields, boolean) => {
    fields.forEach((item) => {
      if (boolean) {
        item.disabled = true;
        return;
      }
      item.disabled = false;
    });
  };

  // Валидидация комнаты/гостей
  roomNumberInput.addEventListener(`change`, (evt) => {
    window.form.roomsChecker(evt.target.value);
  });

  // Блокировка/Разблокировка страницы
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

  const disablePage = () => {
    map.classList.add(`map--faded`);
    toggleFields(mapFiltersField, true);
    mapFilters.removeEventListener(`change`, window.filter.filtersHandler);

    adForm.classList.add(`ad-form--disabled`);
    toggleFields(adFormFields, true);

    mapFilters.classList.add(`map__filters--faded`);
    pageIsActive = false;

    window.form.resetForm();
    window.map.hidePins();
    window.map.resetMainPinCoords();
    window.move.setCoords(mapPin);

    mapPin.addEventListener(`mousedown`, onPinMouseDown);
    mapPin.addEventListener(`keydown`, onPinEnterPress);
  };

  const enablePage = () => {
    map.classList.remove(`map--faded`);
    toggleFields(mapFiltersField, false);
    mapFilters.addEventListener(`change`, window.filter.filtersHandler);

    adForm.disabled = true;

    adForm.classList.remove(`ad-form--disabled`);
    toggleFields(adFormFields, false);

    mapFilters.classList.remove(`map__filters--faded`);
    pageIsActive = true;

    window.ajax.download(window.map.renderPins, (error) => {
      console.log(error);
    });

    window.move.setCoords(mapPin);

    mapPin.removeEventListener(`mousedown`, onPinMouseDown);
    mapPin.removeEventListener(`keydown`, onPinEnterPress);
  };

  window.pageState = {
    pageIsActive,
    disablePage,
    enablePage,
  };
})();
