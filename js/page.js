"use strict";

(() => {
  const pinsArea = document.querySelector(`.map__pins`);
  const map = document.querySelector(`.map`);
  const mapFilters = document.querySelector(`.map__filters`);
  const mapPin = document.querySelector(`.map__pin--main`);
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
    mainPin.style.left = `570px`;
    mainPin.style.top = `375px`;
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
    window.filter.disableFilters();
    window.form.disableForm();
    disableMap();

    window.form.resetForm();
    window.preview.previewImageDeleter();
    window.pin.hidePins();
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
      window.pin.renderPins(data);
    });

    window.filter.enableFilters();
    window.form.enableForm();
    enableMap();

    window.move.setCoords(mapPin);

    mapPin.removeEventListener(`mousedown`, onPinMouseDown);
    mapPin.removeEventListener(`keydown`, onPinEnterPress);
    mapFilters.addEventListener(`change`, window.filter.onFilterFormChange);
  };

  window.page = {
    pageIsActive,
    disablePage,
    enablePage,
    toggleFields
  };
})();
