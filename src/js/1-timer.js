import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'iziToast/dist/css/iziToast.min.css';

let userSelectedDate;
let countdownInterval;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] > Date.now()) {
      userSelectedDate = selectedDates[0];
      document.querySelector('[data-start]').removeAttribute('disabled');
    } else {
      document.querySelector('[data-start]').setAttribute('disabled', '');
      iziToast.show({
        title: 'Warning',
        message: 'Please choose a date in the future',
        position: 'topRight',
        backgroundColor: '#EF4040',
        titleColor: '#FFFFFF',
        messageColor: '#FFFFFF',
      });
    }
  },
};

flatpickr('#datetime-picker', options);

const countdownTimer = () => {
  const now = Date.now();
  const distance = userSelectedDate - now;

  if (distance < 0) {
    clearInterval(countdownInterval);
    document.querySelector('[data-start]').setAttribute('disabled', '');
  } else {
    const { days, hours, minutes, seconds } = convertMs(distance);

    document.querySelector('[data-days]').innerText = addLeadingZero(days);
    document.querySelector('[data-hours]').innerText = addLeadingZero(hours);
    document.querySelector('[data-minutes]').innerText =
      addLeadingZero(minutes);
    document.querySelector('[data-seconds]').innerText =
      addLeadingZero(seconds);
  }
};

function addLeadingZero(time) {
  return time.toString().padStart(2, '0');
}

document.querySelector('[data-start]').addEventListener('click', () => {
  if (userSelectedDate) {
    countdownInterval = setInterval(countdownTimer, 1000);
  } else {
    iziToast.show({
      title: 'Warning',
      message: 'Please choose a date first',
      position: 'topRight',
      backgroundColor: '#EF4040',
      titleColor: '#FFFFFF',
      messageColor: '#FFFFFF',
    });
  }
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
