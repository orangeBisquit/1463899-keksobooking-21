"use strict";

(() => {
  const mapFilters = document.querySelector(`.map__filters`);
  const housingTypeFilter = mapFilters.querySelector(`#housing-type`);
  const housingPriceFilter = mapFilters.querySelector(`#housing-price`);
  const housingRoomsFilter = mapFilters.querySelector(`#housing-rooms`);
  const housingGuestsFilter = mapFilters.querySelector(`#housing-guests`);
  const MAXIMUM_ADS_SHOWN = 5;

  const FILTER_TYPE_ANY = "any";

  const FILTER_PRICE_KEYS = {
    "low": 10000,
    "high": 50000,
  };
  // Фильтр по Типу
  const getHousingType = (elem) => {
    let currentHouseType = housingTypeFilter.value;

    if (currentHouseType === FILTER_TYPE_ANY) {
      return true;
    } else {
      return currentHouseType === elem.offer.type;
    };
  };
  // Фильтр по Цене
  const getHousingPrice = (elem) => {
    let currentHousePrice = housingPriceFilter.value;

    if (currentHousePrice === "low") {
      return elem.offer.price < FILTER_PRICE_KEYS.low;
    } else if (currentHousePrice === "middle") {
      return elem.offer.price >= FILTER_PRICE_KEYS.low && elem.offer.price <= FILTER_PRICE_KEYS.high;
    } else if (currentHousePrice === "high") {
      return elem.offer.price > FILTER_PRICE_KEYS.high;
    } else {
      return true;
    }
  };
  // Фильтр по Числу Комнат
  const getRoomsNumber = (elem) => {
    let currentRoomsNumber = housingRoomsFilter.value;

    if (currentRoomsNumber === "1") {
      return elem.offer.rooms === 1;
    } else if (currentRoomsNumber === "2") {
      return elem.offer.rooms === 2;
    } else if (currentRoomsNumber === "3") {
      return elem.offer.rooms === 3;
    } else {
      return true;
    }
  };
  // Фильтр по Числу Гостей
  const getGuestsNumber = (elem) => {
    let currentGuestsNumber = housingGuestsFilter.value;

    if (currentGuestsNumber === "0") {
      return elem.offer.rooms === 0;
    } else if (currentGuestsNumber === "1") {
      return elem.offer.rooms === 1;
    } else if (currentGuestsNumber === "2") {
      return elem.offer.rooms === 2;
    } else {
      return true;
    }
  };
  // Применение всех фильтров
  const applyAllFilters = () => {
    const data = window.receivedData;
    let myArr = data.filter((elem) => {
      return getHousingType(elem) && getHousingPrice(elem) && getRoomsNumber(elem) && getGuestsNumber(elem);
    }).slice(0, MAXIMUM_ADS_SHOWN);
    return myArr;
  };

  const onFilterFormChange = () => {
    window.map.updatePins(window.filter.applyAllFilters());
  };

  window.filter = {
    applyAllFilters,
    onFilterFormChange
  };
})();
