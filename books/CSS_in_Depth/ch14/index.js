(() => {
  const toggle = document.querySelectorAll('.dropdown__toggle')[0];
  const dropdown = toggle.parentElement;

  toggle.addEventListener('click', (e) => {
    e.preventDefault();
    dropdown.classList.toggle('is-open');
  });
})();

(() => {
  const toggle = document.querySelectorAll('.dropdown__toggle')[1];
  const dropdown = toggle.parentElement;

  toggle.addEventListener('click', (e) => {
    e.preventDefault();
    dropdown.classList.toggle('is-open');
  });
})();

(() => {
  const toggle = document.querySelectorAll('.dropdown__toggle')[2];
  const dropdown = toggle.parentElement;
  const drawer = document.querySelector('.dropdown__drawer--transition-height');
  const height = drawer.scrollHeight;

  toggle.addEventListener('click', (e) => {
    e.preventDefault();
    dropdown.classList.toggle('is-open');
    if (dropdown.classList.contains('is-open')) {
      drawer.style.setProperty('height', height + 'px');
    } else {
      drawer.style.setProperty('height', '0');
    }
  });
})();
