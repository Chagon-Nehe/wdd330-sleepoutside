const h1 = document.getElementById("countdown");

const button = document.getElementById("startButton");
const input = document.getElementById("timeInput");

button.addEventListener("click", (e) => {
  e.preventDefault();
  startCountdown();
});

function startCountdown() {
  let time = parseInt(input.value);
  let countdown = time;

  const intervalId = setInterval(() => {
    h1.textContent = countdown;
    countdown--;
  }, 1000);
  setTimeout(() => {
    clearInterval(intervalId);
    h1.textContent = "Time's up!";
  }, time * 1000);
}
