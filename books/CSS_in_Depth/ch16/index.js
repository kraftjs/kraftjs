const input = document.querySelector('#trip');
const button = document.querySelector('#submit-button');

let timeout = null;

button.addEventListener('click', (event) => {
    event.preventDefault();
    clearTimeout(timeout);
    button.classList.toggle('is-loading');
    button.disabled = true;
    input.disabled = true;
//  Code here would submit form data using JavaScript
});

input.addEventListener('keyup', () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => button.classList.add('shake'), 1000);
});

button.addEventListener('animationend', () => button.classList.remove('shake'));