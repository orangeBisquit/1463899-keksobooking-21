"use strict";

(() => {
  const mapFilters = document.querySelector(`.map__filters`);
  const housingTypeFilter = mapFilters.querySelector(`#housing-type`);
  const MAXIMUM_ADS_SHOWN = 5;

  const ANY_HOUSE_TYPE = "any";

  const adsAmountFilter = (data) => {
    return data.slice(0, MAXIMUM_ADS_SHOWN);
  };

  const typeFilter = (houseType) => {
    window.ajax.download((data) => {
      if (houseType !== ANY_HOUSE_TYPE) {
        let filteredData = data.filter((elem) => {
          return elem.offer.type === houseType;
        });
        window.map.updatePins(filteredData);
        return;
      } window.map.updatePins(data);
    });
  };

  let currentHouseType;

  const filtersHandler = (data) => {
    currentHouseType = housingTypeFilter.value;
    typeFilter(currentHouseType);
  };

  window.filter = {
    adsAmountFilter,
    filtersHandler
  };
})();
