"use strict";

(() => {
  const bodyMain = document.querySelector(`main`);
  const formSuccessMessage = document
    .querySelector(`#success`)
    .content.querySelector(`.success`);

  const formErrorMessage = document
    .querySelector(`#error`)
    .content.querySelector(`.error`);

  // Обработчики закрытия
  const onPagePress = () => {
    if (document.querySelector(`.success`)) {
      document.querySelector(`.success`).remove();
    } else {
      document.querySelector(`.error`).remove();
    }

    document.removeEventListener(`click`, onPagePress);
  };

  const onEscPress = (evt) => {
    if (evt.keyCode === 27) {
      if (document.querySelector(`.success`)) {
        document.querySelector(`.success`).remove();
      } else {
        document.querySelector(`.error`).remove();
      }
      document.removeEventListener(`keydown`, onEscPress);
    }
  };
  // Сообщение об удачной отправке
  const successMessageHandler = () => {
    let sucessMessage = formSuccessMessage.cloneNode(true);
    bodyMain.insertAdjacentElement(`afterBegin`, sucessMessage);

    document.addEventListener(`click`, onPagePress);
    document.addEventListener(`keydown`, onEscPress);
  };
  // Сообщение об удачной отправке
  const errorMessageHandler = () => {
    let errorMessage = formErrorMessage.cloneNode(true);
    bodyMain.insertAdjacentElement(`afterBegin`, errorMessage);

    document.addEventListener(`click`, onPagePress);
    document.addEventListener(`keydown`, onEscPress);
  };

  window.message = {
    successMessageHandler,
    errorMessageHandler,
  };
})();
