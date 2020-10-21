"use strict";

(() => {
  const mapFilters = document.querySelector(`.map__filters`);
  const housingTypeFilter = mapFilters.querySelector(`#housing-type`);
  const MAXIMUM_ADS_SHOWN = 5;

  const ANY_HOUSE_TYPE = "any";

  const FILTER_PRICE_KEYS = {
    "low": 10000,
    "high": 50000,
  }

  const getHousingType = (elem) => {
    let currentHouseType = housingTypeFilter.value;
    if (currentHouseType === ANY_HOUSE_TYPE) {
      return true;
    } else {
      return currentHouseType === elem.offer.type;
    };
  };

  const applyAllFilters = () => {
    const data = window.receivedData;
    let myArr = data.filter((elem) => {
      return getHousingType(elem);
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
