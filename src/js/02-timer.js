import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const datePicker = flatpickr("#datetime-picker", {
enableTime: true,
time_24hr: true,
defaultDate: new Date(),
minuteIncrement: 1,
onClose(selectedDates) {
const selectedDate = selectedDates[0];
if (selectedDate.getTime() < Date.now()) {
alert("Please choose a date in the future");
return;
 }
startButton.disabled = false;
},
});

const startButton = document.querySelector("[data-start]");
const elements = document.querySelectorAll(".value");
const [daysElement, hoursElement, minutesElement, secondsElement] = elements;

let countdownIntervalId = null;

startButton.addEventListener("click", () => {
clearInterval(countdownIntervalId);
const selectedDate = datePicker.selectedDates[0];

countdownIntervalId = setInterval(() => {
const now = new Date().getTime();
const timeLeft = selectedDate.getTime() - now;
if (timeLeft < 0) {
clearInterval(countdownIntervalId);
elements.innerText = "00";
return;
}
    
const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
daysElement.innerText = padNumber(days);
hoursElement.innerText = padNumber(hours);
minutesElement.innerText = padNumber(minutes);
secondsElement.innerText = padNumber(seconds);
}, 1000);
});

function padNumber(num) {
return num.toString().padStart(2, "0");
}