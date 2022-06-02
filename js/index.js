window.addEventListener('DOMContentLoaded', () => {
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
});
