"use strict";

// set variables
const popup = document.querySelector(".popup");

const hamburgerMenu = document.getElementById("hamburger-menu");
const navLinks = document.querySelector(".navbar__container");
const setTimer = document.querySelector("#set-timer");
const startButton = document.querySelector("#start-timer");
const stopButton = document.querySelector("#stop-timer");
const timerDisplay = document.querySelector("#timer-display");

const openPopup = [
  ...document.querySelectorAll(".open"),
  ...document.querySelectorAll(".coffee_cup"),
];
const closePopup = document.querySelector("#close-popup");

let countdown;
let time;

// show hamburgerbar by clicking
hamburgerMenu.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// Opening pop up when click img or text
openPopup.forEach((el) => {
  el.addEventListener("click", function () {
    popup.classList.add("show");
  });
});
// close popup
closePopup.addEventListener("click", function () {
  popup.classList.remove("show");
});
// set timer
setTimer.addEventListener("click", function () {
  timer();
});

// stop timer button
stopButton.addEventListener("click", function () {
  stopTimer();
  startButton.addEventListener("click", function () {
    if (time <= 0 || isNaN(time)) {
      alert("Please enter a valid time greater than 00:00.");
      return;
    }
    startTimer();
  });
});

// Timer first function
const timer = function () {
  const realMinutes = parseInt(document.querySelector("#minutes").value) || 0;
  const realSeconds = parseInt(document.querySelector("#seconds").value) || 0;

  time = realMinutes * 60 + realSeconds;

  popup.classList.remove("show");
  clearInterval(countdown);
  startTimer();
};

// Timer final fuction
const startTimer = function () {
  clearInterval(countdown);
  countdown = setInterval(() => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;

    if (time <= -1) {
      clearInterval(countdown);
      timerDisplay.textContent = "00:00";
      alert("The Time is up");
    }

    time--;
  }, 1000);
};

// when you click the stop button this function use
const stopTimer = function () {
  clearInterval(countdown);
};
