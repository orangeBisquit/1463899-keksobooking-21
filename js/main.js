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

const fixedPins = renderRandomAds(8);

renderPins(fixedPins);

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
  const photoTemplate = photosBlock.querySelector("img");
  photosBlock.innerHTML = ``;

  cardObject.offer.photos.forEach((photoSrc) => {
    const newPhoto = photoTemplate.cloneNode();
    newPhoto.src = photoSrc;
    photosBlock.appendChild(newPhoto);
  });
};

// Соаздание карточки из объекта
const createCard = (cardObject) => {
  const newCard = cardTemplate.cloneNode(true);
  const features = newCard.querySelector(`.popup__features`);
  const photos = newCard.querySelector(`.popup__photos`);

  newCard.querySelector(`.popup__title`).textContent = cardObject.offer.title;

  newCard.querySelector(`.popup__text--address`).textContent =
    cardObject.offer.address;

  newCard.querySelector(
    `.popup__text--price`
  ).textContent = `${cardObject.offer.price}₽/ночь`;

  newCard.querySelector(`.popup__type`).textContent =
    TYPE_KEYS[cardObject.offer.TYPE];

  newCard.querySelector(
    `.popup__text--capacity`
  ).textContent = `${cardObject.offer.rooms} комнаты для ${cardObject.offer.guests} гостей`;

  newCard.querySelector(
    `.popup__text--time`
  ).textContent = `Заезд после ${cardObject.offer.CHECKIN}, выезд до ${cardObject.offer.CHECKOUT}`;

  renderFeatures(cardObject, features, `li`);

  newCard.querySelector(`.popup__description`).textContent =
    cardObject.offer.description;

  renderPhotos(cardObject, photos);

  newCard.querySelector(`.popup__avatar`).src = cardObject.author.avatar;

  return newCard;
};

// Рендер карточки
const mapFilters = map.querySelector(`.map__filters-container`);

const renderCard = (createdCard) => {
  const newCard = createdCard;
  map.insertBefore(newCard, mapFilters);
};

renderCard(createCard(fixedPins[0]));
