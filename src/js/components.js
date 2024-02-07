const header = document.querySelector('header');
window.addEventListener('load', () => {
    // Custom VH
    let vh = window.innerHeight * 0.01;
    let vw = document.documentElement.clientWidth;

    document.documentElement.style.setProperty('--vh', `${vh}px`);
    document.documentElement.style.setProperty('--vw', `${vw}px`);
    window.addEventListener('resize', () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);

        let vw = document.documentElement.clientWidth;
        document.documentElement.style.setProperty('--vw', `${vw}px`);
    });

    document.documentElement.style.setProperty('--header-height', `${header.clientHeight}px`);
})

function fadeToggle(elem, speed = 500) {
    elem.classList.remove('fade-in');
    elem.classList.remove('fade-out');
    if (elem.classList.contains('active')) {
        elem.classList.add('fade-out');

        setTimeout(() => {
            elem.classList.remove('active');
        }, speed)
    } else {
        elem.classList.add('active');
        elem.classList.add('fade-in');
    }
}


function fadeIn(elem, speed = 100) {
    console.log('fade in');
    elem.classList.remove('fade-in');
    elem.classList.remove('fade-out');

    elem.classList.add('active');
    setTimeout(() => {
        elem.classList.add('fade-in');
    }, speed)
}

function fadeOut(elem, speed = 500) {
    elem.style.opacity = '0';

    setTimeout(() => {
        elem.classList.remove('active');
        elem.classList.remove('fade-in');
        elem.classList.remove('fade-out');
        elem.style = '0';
    }, speed)
}

// Заблокувати cкрол та прибрати стрибок
let bodyLockStatus = true;

function bodyLockToggle(delay = 500) {
    if (document.documentElement.classList.contains('lock')) {
        bodyUnlock(delay);
    } else {
        bodyLock(delay);
    }
}

function bodyUnlock(delay = 0) {
    console.log('body unlock');
    let body = document.querySelector("body");
    if (bodyLockStatus) {
        let lock_padding = document.querySelectorAll("[data-lp]");
        setTimeout(() => {
            for (let index = 0; index < lock_padding.length; index++) {
                const el = lock_padding[index];
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

function bodyLock(delay = 0) {

    let body = document.querySelector("body");
    if (bodyLockStatus) {
        let lock_padding = document.querySelectorAll("[data-lp]");
        for (let index = 0; index < lock_padding.length; index++) {
            const el = lock_padding[index];
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

let overlayModal = document.querySelector('.overlay-modal');
if (overlayModal) {
    overlayModal.addEventListener('click', () => {
        closeAllModal();
        bodyUnlock();
    });
}

function closeAllModal() {
    //fadeOut(overlayModal);
    bodyUnlock();
    fadeOut(overlayModal);
    document.querySelectorAll('._js-modal').forEach(modal => {
        fadeOut(modal);
        // modal.classList.remove('active');
    })
}

// Show modal
let btnsOpenModal = document.querySelectorAll('._js-btn-show-modal'),
    btnsCloseModal = document.querySelectorAll('._js-btn-close-modal');

if (btnsOpenModal.length) {
    btnsOpenModal.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.dataset.modal;

            if (modal !== '' && modal !== undefined) {
                const modal_node = document.querySelector(`.js-modal-${modal}`);

                if (modal_node) {
                    // overlayModal.classList.add('active');
                    // modal_node.classList.add('active');
                    fadeIn(modal_node);
                    fadeIn(overlayModal);
                    bodyLock();
                }
            }
        })
    })
}
if (btnsCloseModal.length > 0) {
    btnsCloseModal.forEach(btn => {
        btn.addEventListener('click', () => {
            let modal = btn.closest('._js-modal');
            if (modal) {
                // modal.classList.remove('active');
                fadeOut(modal);
            }
            bodyUnlock();
            fadeOut(overlayModal);
            // overlayModal.classList.remove('active');
        })
    })
}
