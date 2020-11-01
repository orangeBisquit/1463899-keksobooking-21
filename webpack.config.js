const path = require("path");
module.exports = {
  entry: [
    "./js/ajax.js",
    "./js/debounce.js",
    "./js/preview.js",
    "./js/form.js",
    "./js/pin.js",
    "./js/card.js",
    "./js/message.js",
    "./js/filter.js",
    "./js/page.js",
    "./js/move.js",
    "./js/main.js",
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
}
