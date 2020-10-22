"use strict";

(() => {
  const LOAD_URL = `https://21.javascript.pages.academy/keksobooking/data`;
  const UPLOAD_URL = `https://21.javascript.pages.academy/keksobooking`;

  const StatusCode = {
    OK: 200,
  };
  const TIMEOUT_IN_MS = 10000;

  // Повторяющийся код XHR
  const xhrConnectionHandler = (xhr, onSuccess, onError) => {
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
      }
    });

    xhr.addEventListener(`error`, () => {
      onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, () => {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });

    xhr.timeout = TIMEOUT_IN_MS;

    return xhr;
  };
  // Загрузка объявлений
  const download = (onSuccess, onError) => {
    const xhr = new XMLHttpRequest();
    xhrConnectionHandler(xhr, onSuccess, onError);
    xhr.open(`GET`, LOAD_URL);
    xhr.send();
  };
  // Отправка формы
  const upload = (data, onSuccess, onError) => {
    const xhr = new XMLHttpRequest();
    xhrConnectionHandler(xhr, onSuccess, onError);
    xhr.open(`POST`, UPLOAD_URL);
    xhr.send(data);
  };
  window.ajax = {
    download,
    upload
  };
})();
