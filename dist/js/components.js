"use strict";

var header = document.querySelector('header');
window.addEventListener('load', function () {
  // Custom VH
  var vh = window.innerHeight * 0.01;
  var vw = document.documentElement.clientWidth;
  document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
  document.documentElement.style.setProperty('--vw', "".concat(vw, "px"));
  window.addEventListener('resize', function () {
    var vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
    var vw = document.documentElement.clientWidth;
    document.documentElement.style.setProperty('--vw', "".concat(vw, "px"));
  });
  document.documentElement.style.setProperty('--header-height', "".concat(header.clientHeight, "px"));
});