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
    newArray.push(value + j + postfix);
  }
  return newArray;
};

// Одно рандомное значение массива
const getRandomArrayItem = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

// Несколько рандомных значений массива
const getRandomArrayValues = (array) => {
  const shuffledArray = array.sort(() => 0.5 - Math.random());
  const valuesPickedNumber = getRandomNumber(0, array.length) + 1;
  const valuesPickedArray = [];
  for (let i = 0; i < valuesPickedNumber; i++) {
    valuesPickedArray[i] = shuffledArray[i];
  }
  return valuesPickedArray;
};

// Рендер массива объектов

// Переменные
const avatarDir = `img/avatars/user0`; // + Number + .png
const title = `Объявление`;
const TYPE = [`palace`, `flat`, `house`, `bungalow`];
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
const description = `Подробное описание №`;
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
        title: title + ` ` + adNumber,
        address: getRandomNumber(0, 600) + ` ,` + getRandomNumber(0, 600),
        price: getRandomNumber(100, 500),
        TYPE: TYPE[getRandomNumber(0, TYPE.length - 1)],
        rooms: getRandomNumber(1, 5),
        guests: getRandomNumber(1, 10),
        CHECKIN: getRandomArrayItem(CHECKIN),
        CHECKOUT: getRandomArrayItem(CHECKOUT),
        FEATURES: getRandomArrayValues(FEATURES),
        description: description + adNumber,
        photos: getOrderedArray(2, 7, photosDir, `.jpg`),
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
const map = document.querySelector(`.map`);
map.classList.remove(`map--faded`);

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

renderPins(renderRandomAds(8));
