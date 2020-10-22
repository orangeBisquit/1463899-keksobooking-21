"use strict";

(() => {
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
    let currentHouseType = housingTypeFilter.value;

    if (currentHouseType === FILTER_TYPE_ANY) {
      return true;
    } else {
      return currentHouseType === elem.offer.type;
    }
  };
  // Фильтр по Цене
  const getHousingPrice = (elem) => {
    let currentHousePrice = housingPriceFilter.value;

    if (currentHousePrice === `low`) {
      return elem.offer.price < PRICE_KEYS.low;
    } else if (currentHousePrice === `middle`) {
      return elem.offer.price >= PRICE_KEYS.low && elem.offer.price <= PRICE_KEYS.high;
    } else if (currentHousePrice === `high`) {
      return elem.offer.price > PRICE_KEYS.high;
    } else {
      return true;
    }
  };

  // Фильтр по Числу Комнат
  const getRoomsNumber = (elem) => {
    let currentRoomsNumber = housingRoomsFilter.value;

    if (currentRoomsNumber === `1`) {
      return elem.offer.rooms === 1;
    } else if (currentRoomsNumber === `2`) {
      return elem.offer.rooms === 2;
    } else if (currentRoomsNumber === `3`) {
      return elem.offer.rooms === 3;
    } else {
      return true;
    }
  };
  // Фильтр по Числу Гостей
  const getGuestsNumber = (elem) => {
    let currentGuestsNumber = housingGuestsFilter.value;

    if (currentGuestsNumber === `0`) {
      return elem.offer.rooms === 0;
    } else if (currentGuestsNumber === `1`) {
      return elem.offer.rooms === 1;
    } else if (currentGuestsNumber === `2`) {
      return elem.offer.rooms === 2;
    } else {
      return true;
    }
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
})();
