const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

let intervalId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

function switchBackgroundColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}

function startBackgroundSwitch() {
  intervalId = setInterval(switchBackgroundColor, 1000);
  startBtn.disabled = true;
}

function stopBackgroundSwitch() {
  clearInterval(intervalId);
  startBtn.disabled = false;
}

startBtn.addEventListener('click', startBackgroundSwitch);
stopBtn.addEventListener('click', stopBackgroundSwitch);