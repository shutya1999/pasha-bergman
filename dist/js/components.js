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
function fadeToggle(elem) {
  var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  elem.classList.remove('fade-in');
  elem.classList.remove('fade-out');
  if (elem.classList.contains('active')) {
    elem.classList.add('fade-out');
    setTimeout(function () {
      elem.classList.remove('active');
    }, speed);
  } else {
    elem.classList.add('active');
    elem.classList.add('fade-in');
  }
}
function fadeIn(elem) {
  var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
  console.log('fade in');
  elem.classList.remove('fade-in');
  elem.classList.remove('fade-out');
  elem.classList.add('active');
  setTimeout(function () {
    elem.classList.add('fade-in');
  }, speed);
}
function fadeOut(elem) {
  var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  elem.style.opacity = '0';
  setTimeout(function () {
    elem.classList.remove('active');
    elem.classList.remove('fade-in');
    elem.classList.remove('fade-out');
    elem.style = '0';
  }, speed);
}

// Заблокувати cкрол та прибрати стрибок
var bodyLockStatus = true;
function bodyLockToggle() {
  var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 500;
  if (document.documentElement.classList.contains('lock')) {
    bodyUnlock(delay);
  } else {
    bodyLock(delay);
  }
}
function bodyUnlock() {
  var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  console.log('body unlock');
  var body = document.querySelector("body");
  if (bodyLockStatus) {
    var lock_padding = document.querySelectorAll("[data-lp]");
    setTimeout(function () {
      for (var index = 0; index < lock_padding.length; index++) {
        var el = lock_padding[index];
        el.style.paddingRight = '0px';
      }
      body.style.paddingRight = '0px';
      document.documentElement.classList.remove("lock");
    }, delay);
    bodyLockStatus = false;
    setTimeout(function () {
      bodyLockStatus = true;
    }, delay);
  }
}
function bodyLock() {
  var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var body = document.querySelector("body");
  if (bodyLockStatus) {
    var lock_padding = document.querySelectorAll("[data-lp]");
    for (var index = 0; index < lock_padding.length; index++) {
      var el = lock_padding[index];
      el.style.paddingRight = window.innerWidth - document.querySelector('.main').offsetWidth + 'px';
    }
    body.style.paddingRight = window.innerWidth - document.querySelector('.main').offsetWidth + 'px';
    document.documentElement.classList.add("lock");
    bodyLockStatus = false;
    setTimeout(function () {
      bodyLockStatus = true;
    }, delay);
  }
}
var overlayModal = document.querySelector('.overlay-modal');
if (overlayModal) {
  overlayModal.addEventListener('click', function () {
    closeAllModal();
    bodyUnlock();
  });
}
function closeAllModal() {
  //fadeOut(overlayModal);
  bodyUnlock();
  fadeOut(overlayModal);
  document.querySelectorAll('._js-modal').forEach(function (modal) {
    fadeOut(modal);
    // modal.classList.remove('active');
  });
}

// Show modal
var btnsOpenModal = document.querySelectorAll('._js-btn-show-modal'),
  btnsCloseModal = document.querySelectorAll('._js-btn-close-modal');
if (btnsOpenModal.length) {
  btnsOpenModal.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var modal = btn.dataset.modal;
      if (modal !== '' && modal !== undefined) {
        var modal_node = document.querySelector(".js-modal-".concat(modal));
        if (modal_node) {
          // overlayModal.classList.add('active');
          // modal_node.classList.add('active');
          fadeIn(modal_node);
          fadeIn(overlayModal);
          bodyLock();
        }
      }
    });
  });
}
if (btnsCloseModal.length > 0) {
  btnsCloseModal.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var modal = btn.closest('._js-modal');
      if (modal) {
        // modal.classList.remove('active');
        fadeOut(modal);
      }
      bodyUnlock();
      fadeOut(overlayModal);
      // overlayModal.classList.remove('active');
    });
  });
}