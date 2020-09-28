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

const fixedRenderedPins = renderRandomAds(8);

renderPins(fixedRenderedPins);

// module3-task2, Задание 2

const cardTemplate = document
  .querySelector(`#card`)
  .content.querySelector(`.map__card`);
const mapFilters = map.querySelector(`.map__filters-container`);

// Рендер включенных удобств
const renderFeatures = (featuresArr, featuresBlock, element) => {
  featuresBlock.innerHTML = ``;
  const featuresFragment = document.createDocumentFragment();

  for (let j = 0; j < featuresArr.length; j++) {
    const featuresItem = document.createElement(element);
    featuresItem.classList = `map__feature map__feature--${featuresArr[j]}`;
    featuresFragment.appendChild(featuresItem);
  }

  featuresBlock.appendChild(featuresFragment);
};

// Рендер карточки
const createCardFragment = (adsArray) => {
  const cardFragment = document.createDocumentFragment();
  const newCard = cardTemplate.cloneNode(true);
  const features = newCard.querySelector(`.popup__features`);
  const photos = newCard.querySelector(`.popup__photos`);

  for (let i = 0; i < adsArray.length; i++) {
    /* Отрисовка только одной карточки */
    if (i === 0) {
      newCard.querySelector(`.popup__title`).textContent =
        adsArray[i].offer.title;

      newCard.querySelector(`.popup__text--address`).textContent =
        adsArray[i].offer.address;

      newCard.querySelector(
        `.popup__text--price`
      ).textContent = `${adsArray[i].offer.price}₽/ночь`;

      newCard.querySelector(`.popup__type`).textContent =
        TYPE_KEYS[adsArray[i].offer.TYPE];

      newCard.querySelector(
        `.popup__text--capacity`
      ).textContent = `${adsArray[i].offer.rooms} комнаты для ${adsArray[i].offer.guests} гостей`;

      newCard.querySelector(
        `.popup__text--time`
      ).textContent = `Заезд после ${adsArray[i].offer.CHECKIN}, выезд до ${adsArray[i].offer.CHECKOUT}`; /* Как сюда вставить &nbsp; ? =) */

      renderFeatures(adsArray[i].offer.FEATURES, features, `li`);
      newCard.querySelector(`.popup__description`).textContent =
        adsArray[i].offer.description;

      const photoTemplate = photos.children[0];
      photos.innerHTML = ``;
      adsArray[i].offer.photos.forEach((photoSrc) => {
        const newPhoto = photoTemplate.cloneNode();
        newPhoto.src = photoSrc;
        photos.appendChild(newPhoto);
      });

      newCard.querySelector(`.popup__avatar`).src = adsArray[i].author.avatar;
    }

    cardFragment.appendChild(newCard);
    return cardFragment;
  }
};

const renderCard = (createFragment) => {
  map.insertBefore(createCardFragment(fixedRenderedPins), mapFilters);
};

renderCard(createCardFragment);
