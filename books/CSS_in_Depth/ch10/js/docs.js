(() => {
  const dropdowns = document.querySelectorAll('.dropdown__toggle');
  Array.prototype.forEach.call(dropdowns, (dropdown) => {
    dropdown.addEventListener('click', (event) => {
      event.preventDefault();
      event.target.parentNode.classList.toggle('is-open');
    });
  });
})();
