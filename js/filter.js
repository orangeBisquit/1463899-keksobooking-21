"use strict";

const mapFilters = document.querySelector(`.map__filters`);
const mapFiltersField = mapFilters.querySelectorAll(`.map__filter`);
const housingTypeFilter = mapFilters.querySelector(`#housing-type`);
const housingPriceFilter = mapFilters.querySelector(`#housing-price`);
const housingRoomsFilter = mapFilters.querySelector(`#housing-rooms`);
const housingGuestsFilter = mapFilters.querySelector(`#housing-guests`);
const MAXIMUM_ADS_SHOWN = 5;

const FILTER_TYPE_ANY = `any`;

const PRICE_KEYS = {
  "low": 10000,
  "high": 50000,
};

// Фильтр по включенным услугам
const getFeatures = (elem) => {
  const checkedHousingFeatures = mapFilters.querySelectorAll(`.map__checkbox:checked`);

  return Array.from(checkedHousingFeatures).every((checkedFeature) =>
    elem.offer.features.includes(checkedFeature.value)
  );
};
// Фильтр по Типу
const getHousingType = (elem) => {
  return housingTypeFilter.value === FILTER_TYPE_ANY ? true : housingTypeFilter.value === elem.offer.type;
};
// Фильтр по Цене
const getHousingPrice = (elem) => {
  switch (housingPriceFilter.value) {
    case `low`:
      return elem.offer.price < PRICE_KEYS.low;
    case `middle`:
      return elem.offer.price >= PRICE_KEYS.low && elem.offer.price <= PRICE_KEYS.high;
    case `high`:
      return elem.offer.price > PRICE_KEYS.high;
    default:
      return true;
  }
};

// Фильтр по Числу Комнат
const getRoomsNumber = (elem) => {
  return housingRoomsFilter.value === FILTER_TYPE_ANY ? true : parseInt(housingRoomsFilter.value, 10) === elem.offer.rooms;
};
// Фильтр по Числу Гостей
const getGuestsNumber = (elem) => {
  return housingGuestsFilter.value === FILTER_TYPE_ANY ? true : parseInt(housingGuestsFilter.value, 10) === elem.offer.guests;
};
// Применение всех фильтров
const applyAllFilters = () => {
  return window.receivedData.filter((elem) => {
    return getHousingType(elem) && getHousingPrice(elem) && getRoomsNumber(elem) && getGuestsNumber(elem) && getFeatures(elem);
  }).slice(0, MAXIMUM_ADS_SHOWN);
};

const onFilterFormChange = () => {
  window.pin.updatePins(window.filter.applyAllFilters());
};
// Активация фильтров
const enableFilters = () => {
  window.page.toggleFields(mapFiltersField, false);
  mapFilters.classList.remove(`map__filters--faded`);
};
// Блокировка фильтров
const disableFilters = () => {
  window.page.toggleFields(mapFiltersField, true);
  mapFilters.classList.add(`map__filters--faded`);
};


window.filter = {
  applyAllFilters,
  onFilterFormChange,
  enableFilters,
  disableFilters
};

