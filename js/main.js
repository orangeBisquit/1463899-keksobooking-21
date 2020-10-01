"use strict";

/* ЗАДАНИЕ 1 */

// Рандомное число
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// Массив заданной длины
const getOrderedArray = (min, max, value, postfix) => {
  const newArray = [];
  const itemsCount = getRandomNumber(min, max);

  for (let j = 0; j < itemsCount; j++) {
    newArray.push(value + (j + 1) + postfix);
  }
  return newArray;
};

// Одно рандомное значение массива
const getRandomArrayItem = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

// Несколько рандомных значений массива
const getRandomArrayValues = (min, array) => {
  const shuffledArray = array.sort(() => 0.5 - Math.random());
  const valuesPickedNumber = getRandomNumber(min, array.length);
  const valuesPickedArray = [];
  for (let i = 0; i < valuesPickedNumber; i++) {
    valuesPickedArray[i] = shuffledArray[i];
  }
  return valuesPickedArray;
};

// Рендер массива объектов

// Переменные
const avatarDir = `img/avatars/user0`; // + Number + .png
const title = `Уютное гнездышко для молодоженов №`;
const TYPE = [`palace`, `flat`, `house`, `bungalow`];
const TYPE_KEYS = {
  palace: `Дворец`,
  flat: `Квартира`,
  house: `Дом`,
  bungalow: `Бунгало`,
};
const CHECKIN = [`12:00`, `13:00`, `14:00`];
const CHECKOUT = [`12:00`, `13:00`, `14:00`];
const FEATURES = [
  `wifi`,
  `dishwasher`,
  `parking`,
  `washer`,
  `elevator`,
  `conditioner`,
];
const description = `Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована. №`;
const photosDir = `http://o0.github.io/assets/images/tokyo/hotel`; // + Number + .jpg

const renderRandomAds = (adsNumber) => {
  const adsArray = [];

  for (let i = 0; i < adsNumber; i++) {
    const adNumber = i + 1;

    adsArray[i] = {
      author: {
        avatar: avatarDir + adNumber + `.png`,
      },
      offer: {
        title: title + adNumber,
        address: getRandomNumber(0, 600) + `, ` + getRandomNumber(0, 600),
        price: getRandomNumber(1000, 10000),
        TYPE: TYPE[getRandomNumber(0, TYPE.length - 1)],
        rooms: getRandomNumber(2, 5),
        guests: getRandomNumber(2, 10),
        CHECKIN: getRandomArrayItem(CHECKIN),
        CHECKOUT: getRandomArrayItem(CHECKOUT),
        FEATURES: getRandomArrayValues(1, FEATURES),
        description: description + adNumber,
        photos: getOrderedArray(1, 3, photosDir, `.jpg`),
      },
      location: {
        x: getRandomNumber(0, document.querySelector(`.map`).offsetWidth),
        y: getRandomNumber(130, 630),
      },
    };
  }
  return adsArray;
};

/* ЗАДАНИЕ 2 */

// Показать скрытую карту
// const map = document.querySelector(`.map`);
// map.classList.remove(`map--faded`);

/* ЗАДАНИЕ 3 */

const pin = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

// Генерация пина
const generatePin = (pinData) => {
  const newPin = pin.cloneNode(true);
  const locationX = pinData.location.x - pin.offsetWidth;
  const locationY = pinData.location.y - pin.offsetWidth;
  newPin.style = `left: ${locationX}px; top: ${locationY}px`;

  const pinImg = newPin.querySelector(`img`);
  pinImg.alt = pinData.offer.description;
  pinImg.src = pinData.author.avatar;
  return newPin;
};

// Рендер пинов на карте
const pinsArea = document.querySelector(`.map__pins`);

const renderPins = (adsArray) => {
  const pinsFragment = document.createDocumentFragment();

  for (let i = 0; i < adsArray.length; i++) {
    pinsFragment.appendChild(generatePin(adsArray[i]));
  }

  pinsArea.appendChild(pinsFragment);
};

const fixedPins = renderRandomAds(8);

// module3-task2, Задание 2

const cardTemplate = document
  .querySelector(`#card`)
  .content.querySelector(`.map__card`);

// Рендер включенных удобств
const renderFeatures = (cardObject, featuresBlock, element) => {
  const featuresArray = cardObject.offer.FEATURES;
  featuresBlock.innerHTML = ``;

  for (let j = 0; j < featuresArray.length; j++) {
    const featuresItem = document.createElement(element);
    featuresItem.classList = `map__feature map__feature--${featuresArray[j]}`;
    featuresBlock.appendChild(featuresItem);
  }
};

const renderPhotos = (cardObject, photosBlock) => {
  const photoTemplate = photosBlock.querySelector(`img`);
  photosBlock.innerHTML = ``;

  cardObject.offer.photos.forEach((photoSrc) => {
    const newPhoto = photoTemplate.cloneNode();
    newPhoto.src = photoSrc;
    photosBlock.appendChild(newPhoto);
  });
};

// Соаздание карточки из объекта
// const createCard = (cardObject) => {
//   const newCard = cardTemplate.cloneNode(true);
//   const features = newCard.querySelector(`.popup__features`);
//   const photos = newCard.querySelector(`.popup__photos`);

//   newCard.querySelector(`.popup__title`).textContent = cardObject.offer.title;

//   newCard.querySelector(`.popup__text--address`).textContent =
//     cardObject.offer.address;

//   newCard.querySelector(
//     `.popup__text--price`
//   ).textContent = `${cardObject.offer.price}₽/ночь`;

//   newCard.querySelector(`.popup__type`).textContent =
//     TYPE_KEYS[cardObject.offer.TYPE];

//   newCard.querySelector(
//     `.popup__text--capacity`
//   ).textContent = `${cardObject.offer.rooms} комнаты для ${cardObject.offer.guests} гостей`;

//   newCard.querySelector(
//     `.popup__text--time`
//   ).textContent = `Заезд после ${cardObject.offer.CHECKIN}, выезд до ${cardObject.offer.CHECKOUT}`;

//   renderFeatures(cardObject, features, `li`);

//   newCard.querySelector(`.popup__description`).textContent =
//     cardObject.offer.description;

//   renderPhotos(cardObject, photos);

//   newCard.querySelector(`.popup__avatar`).src = cardObject.author.avatar;

//   return newCard;
// };

// // Рендер карточки
// const mapFilters = map.querySelector(`.map__filters-container`);

// const renderCard = (createdCard) => {
//   const newCard = createdCard;
//   map.insertBefore(newCard, mapFilters);
// };

// renderCard(createCard(fixedPins[0]));

// module4-task1

const mapPin = document.querySelector(`.map__pin--main`);
const map = document.querySelector(`.map`);
const adForm = document.querySelector(`.ad-form`);
const adFormFields = adForm.querySelectorAll(`fieldset`);
const mapFilters = document.querySelector(`.map__filters`);
const mapFiltersField = mapFilters.querySelectorAll(`.map__filter`);
const currentPins = pinsArea.children;
const MAIN_PIN_WIDTH = 65;
const MAIN_PIN_HEIGHT = 87; /* ROUND + after arrow */
let pageIsActive = false;

// Получаем позицию пина
const getPinPosition = () => {
  const pinPosition = {};
  if (pageIsActive) {
    pinPosition.xCoord = Math.round(mapPin.offsetLeft + MAIN_PIN_WIDTH);
    pinPosition.yCoord = Math.round(mapPin.offsetTop + MAIN_PIN_HEIGHT / 2);
    console.log(pinPosition);
    return pinPosition;
  }
  pinPosition.xCoord = Math.round(mapPin.offsetLeft + MAIN_PIN_WIDTH / 2);
  pinPosition.yCoord = Math.round(mapPin.offsetTop + MAIN_PIN_HEIGHT / 2);
  console.log(pinPosition);
  return pinPosition;
};

// Добавляем позицию пина в input
const addressInput = document.querySelector(`#address`);

const setCurrentAddress = () => {
  let currentAddress = getPinPosition();
  addressInput.value = currentAddress.xCoord + `, ` + currentAddress.yCoord;
};

// Блокируем/разблокируем инпуты
const toggleFields = (fields, boolean) => {
  fields.forEach((item) => {
    if (boolean) {
      item.disabled = true;
      return;
    }
    item.disabled = false;
  });
};

const roomNumberInput = adForm.querySelector(`#room_number`);
const capacityInput = adForm.querySelector(`#capacity`);
const capacityOptions = capacityInput.querySelectorAll(`option`);

// Валидируем комнаты/гостей
const roomsHandler = () => {
  if (roomNumberInput.options[roomNumberInput.selectedIndex].value === `1`) {
    toggleFields(capacityOptions, true);
    capacityOptions[2].disabled = false;
    capacityInput.value = ``;
    capacityInput.setCustomValidity(
      `Количество гостей при выборе 1 комнаты может быть не больше 1`
    );
  } else if (
    roomNumberInput.options[roomNumberInput.selectedIndex].value === `2`
  ) {
    toggleFields(capacityOptions, true);
    capacityOptions[1].disabled = false;
    capacityOptions[2].disabled = false;
    capacityInput.value = ``;
    capacityInput.setCustomValidity(
      `Количество гостей при выборе 2 комнат может быть не больше 2`
    );
  } else if (
    roomNumberInput.options[roomNumberInput.selectedIndex].value === `3`
  ) {
    toggleFields(capacityOptions, true);
    capacityOptions[0].disabled = false;
    capacityOptions[1].disabled = false;
    capacityOptions[2].disabled = false;
    capacityInput.value = ``;
    capacityInput.setCustomValidity(
      `Количество гостей при выборе 3 комнат может быть не больше 3`
    );
  } else if (
    roomNumberInput.options[roomNumberInput.selectedIndex].value === `100`
  ) {
    toggleFields(capacityOptions, true);
    capacityOptions[3].disabled = false;
    capacityInput.value = ``;
    capacityInput.setCustomValidity(
      `Выбор 100 комнат доступен только не для гостей`
    );
  }
  capacityInput.reportValidity();
};

roomNumberInput.addEventListener(`change`, () => {
  roomsHandler();
});

// Блокируем/разблокируем страницу
const pageStateToggle = (state) => {
  if (state === `disabled`) {
    map.classList.add(`map--faded`);
    toggleFields(mapFiltersField, true);

    adForm.classList.add(`ad-form--disabled`);
    toggleFields(adFormFields, true);

    mapFilters.classList.add(`map__filters--faded`);
    pageIsActive = false;
    setCurrentAddress();
    roomsHandler();
  } else if (state === `active`) {
    map.classList.remove(`map--faded`);
    toggleFields(mapFiltersField, false);

    adForm.disabled = true;

    adForm.classList.remove(`ad-form--disabled`);
    toggleFields(adFormFields, false);

    mapFilters.classList.remove(`map__filters--faded`);

    pageIsActive = true;
    setCurrentAddress();
  }
};

mapPin.addEventListener(`mousedown`, (evt) => {
  if (evt.button === 0) {
    pageStateToggle(`active`);
    getPinPosition();
  }
});

mapPin.addEventListener(`keydown`, (evt) => {
  if (evt.keyCode === 13) {
    pageStateToggle(`active`);
    getPinPosition();
  }
});

window.onload = pageStateToggle(`disabled`);
