import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', onSubmitForm);

function onSubmitForm(event) {
  event.preventDefault();
  const delay = form.elements.delay.value;
  const state = document.querySelector('input[name="state"]:checked').value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(delay => {
      iziToast.show({
        title: '✅',
        message: `Fulfilled promise in ${delay}ms`,
        position: 'topRight',
        backgroundColor: '#59A10D',
        titleColor: '#FFFFFF',
        messageColor: '#FFFFFF',
      });
    })
    .catch(delay => {
      iziToast.show({
        title: '❌',
        message: `Rejected promise in ${delay}ms`,
        position: 'topRight',
        backgroundColor: '#EF4040',
        titleColor: '#FFFFFF',
        messageColor: '#FFFFFF',
      });
    });
}
