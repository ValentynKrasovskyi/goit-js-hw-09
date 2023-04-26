import * as notiflix from "notiflix";

const form = document.querySelector('.form');
const delayInput = form.querySelector('input[name="delay"]');
const stepInput = form.querySelector('input[name="step"]');
const amountInput = form.querySelector('input[name="amount"]');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function createPromises(event) {
  event.preventDefault();
  const delay = parseInt(delayInput.value);
  const step = parseInt(stepInput.value);
  const amount = parseInt(amountInput.value);

  const promises = [];
  for (let i = 0; i < amount; i += 1) {
    const position = i + 1;
    const promise = createPromise(position, delay + i * step);
    promises.push(promise);
  }

  Promise.allSettled(promises)
    .then((results) => {
      results.forEach((result) => {
        const { position, delay } = result.value || result.reason;
        if (result.status === "fulfilled") {
          notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`
          );
        } else {
          notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${delay}ms`
          );
        }
      });
    })
    .catch((error) => {
      console.error(error);
    });
}

form.addEventListener('submit', createPromises);
