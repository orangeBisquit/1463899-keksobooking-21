// "use strict";

// (() => {
//   const avatarDir = `img/avatars/user0`; // + Number + .png
//   const title = `Уютное гнездышко для молодоженов №`;
//   const TYPE = [`palace`, `flat`, `house`, `bungalow`];
//   const TYPE_KEYS = {
//     palace: `Дворец`,
//     flat: `Квартира`,
//     house: `Дом`,
//     bungalow: `Бунгало`,
//   };
//   const CHECKIN = [`12:00`, `13:00`, `14:00`];
//   const CHECKOUT = [`12:00`, `13:00`, `14:00`];
//   const FEATURES = [
//     `wifi`,
//     `dishwasher`,
//     `parking`,
//     `washer`,
//     `elevator`,
//     `conditioner`,
//   ];
//   const description = `Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована. №`;
//   const photosDir = `http://o0.github.io/assets/images/tokyo/hotel`; // + Number + .jpg

//   const renderRandomAds = (adsNumber) => {
//     const adsArray = [];

//     for (let i = 0; i < adsNumber; i++) {
//       const adNumber = i + 1;

//       adsArray[i] = {
//         author: {
//           avatar: avatarDir + adNumber + `.png`,
//         },
//         offer: {
//           title: title + adNumber,
//           address: window.util.getRandomNumber(0, 600) + `, ` + window.util.getRandomNumber(0, 600),
//           price: window.util.getRandomNumber(1000, 10000),
//           TYPE: TYPE[window.util.getRandomNumber(0, TYPE.length - 1)],
//           rooms: window.util.getRandomNumber(2, 5),
//           guests: window.util.getRandomNumber(2, 10),
//           CHECKIN: window.util.getRandomArrayItem(CHECKIN),
//           CHECKOUT: window.util.getRandomArrayItem(CHECKOUT),
//           FEATURES: window.util.getRandomArrayValues(1, FEATURES),
//           description: description + adNumber,
//           photos: window.util.getOrderedArray(1, 3, photosDir, `.jpg`),
//         },
//         location: {
//           x: window.util.getRandomNumber(0, document.querySelector(`.map`).offsetWidth),
//           y: window.util.getRandomNumber(130, 630),
//         },
//       };
//     }
//     return adsArray;
//   };

//   const fixedPins = renderRandomAds(8);

//   window.data = {
//     TYPE_KEYS,
//     renderRandomAds,
//     fixedPins
//   };
// })();
