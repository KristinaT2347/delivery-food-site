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

  //Classes for cards

  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 27;
      this.changeToUAH();
    }

    changeToUAH() {
      this.price = this.price * this.transfer;
    }

    render() {
      const element = document.createElement('div');
      element.innerHTML = `
      <div class="menu__item">
            <img src=${this.src} alt=${this.alt} />
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
              <div class="menu__item-cost">Цена:</div>
              <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
          </div>
      `;
      this.parent.append(element);
    }
  }

  new MenuCard(
    'img/tabs/vegy.jpg',
    'vegy',
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    9,
    '.menu .container'
  ).render();

  new MenuCard(
    'img/tabs/elite.jpg',
    'elite',
    'Меню “Премиум”',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    14,
    '.menu .container'
  ).render();

  new MenuCard(
    'img/tabs/post.jpg',
    'post',
    'Меню "Постное"',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    21,
    '.menu .container'
  ).render();
});
