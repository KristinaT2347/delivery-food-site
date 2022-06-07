window.addEventListener('DOMContentLoaded', () => {
  //Tabs
  const tabsEls = document.querySelectorAll('.tabheader__item'),
    tabsContentEls = document.querySelectorAll('.tabcontent'),
    tabsParentEl = document.querySelector('.tabheader__items');

  function hideTabContent() {
    tabsContentEls.forEach((item) => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });

    tabsEls.forEach((item) => {
      item.classList.remove('tabheader__item_active');
    });
  }

  function showTabConten(i = 0) {
    tabsContentEls[i].classList.add('show', 'fade');
    tabsContentEls[i].classList.remove('hide');
    tabsEls[i].classList.add('tabheader__item_active');
  }

  hideTabContent();
  showTabConten();

  tabsParentEl.addEventListener('click', (e) => {
    const targetEl = e.target;

    if (targetEl && targetEl.classList.contains('tabheader__item')) {
      tabsEls.forEach((item, i) => {
        if (targetEl === item) {
          hideTabContent();
          showTabConten(i);
        }
      });
    }
  });

  //Timer

  const deadline = '2022-08-31';

  function getTimeRemaining(endtime) {
    let days, hours, minutes, seconds;
    const t = Date.parse(endtime) - Date.parse(new Date());

    if (t <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      (days = Math.floor(t / (1000 * 60 * 60 * 24))),
        (hours = Math.floor((t / (1000 * 60 * 60)) % 24)),
        (minutes = Math.floor((t / 1000 / 60) % 60)),
        (seconds = Math.floor((t / 1000) % 60));
    }

    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timerEl = document.querySelector(selector),
      daysEl = timerEl.querySelector('#days'),
      hoursEl = timerEl.querySelector('#hours'),
      minutesEl = timerEl.querySelector('#minutes'),
      secondsEl = timerEl.querySelector('#seconds'),
      timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime);

      daysEl.innerHTML = getZero(t.days);
      hoursEl.innerHTML = getZero(t.hours);
      minutesEl.innerHTML = getZero(t.minutes);
      secondsEl.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock('.timer', deadline);

  //Modal

  const modalTriggerEls = document.querySelectorAll('[data-modal]'),
    modalEl = document.querySelector('.modal'),
    modalCloseBtnEl = document.querySelector('[data-close]');

  function openModal() {
    modalEl.classList.add('show');
    modalEl.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimerId);
  }

  modalTriggerEls.forEach((btn) => {
    btn.addEventListener('click', openModal);
  });

  function closeModal() {
    modalEl.classList.add('hide');
    modalEl.classList.remove('show');
    document.body.style.overflow = '';
  }

  modalCloseBtnEl.addEventListener('click', closeModal);

  modalEl.addEventListener('click', (e) => {
    if (e.target === modalEl) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modalEl.classList.contains('show')) {
      closeModal();
    }
  });

  const modalTimerId = setTimeout(openModal, 15000);

  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight - 1
    ) {
      openModal();
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  window.addEventListener('scroll', showModalByScroll);
});
