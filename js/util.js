"use strict";

(() => {
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

  window.util = {
    getRandomNumber,
    getOrderedArray,
    getRandomArrayItem,
    getRandomArrayValues
  }
})();
