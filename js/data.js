"use strict";

(() => {
  const saveOnSuccess = (data) => {
    window.receivedData = data;
    return window.receivedData;
  };

  const onErrorFN = (error) => {
    console.log(error);
  };

  const saveData = () => {
    window.ajax.download(saveOnSuccess, onErrorFN);
  };

  saveData();

  window.data = {
    saveData,
  }
})();
