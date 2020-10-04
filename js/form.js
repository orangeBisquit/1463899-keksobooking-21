"use strict";

(() => {
  const adForm = document.querySelector(`.ad-form`); /* Повторяется */
  const roomNumberInput = adForm.querySelector(`#room_number`); /* Повторяется */
  const capacityInput = adForm.querySelector(`#capacity`);
  const capacityOptions = capacityInput.querySelectorAll(`option`);
  const roomOptions = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0],
  };
  // Валидация кол-ва гостей/комнат
  const roomsChecker = (peopleAmount) => {
    capacityOptions.forEach((option) => {
      option.disabled = true;
    });

    roomOptions[peopleAmount].forEach((maximumPeople) => {
      capacityOptions.forEach((option) => {
        if (Number(option.value) === maximumPeople) {
          option.disabled = false;
          option.selected = true;
        }
      });
    });
  };

  window.form = {
    roomsChecker,
    adForm
  }
})();
