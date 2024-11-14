// set variables
let duration = 1500;
let elapsed = 0;

const hamburgerMenu = document.getElementById("hamburger-menu");
const navLinks = document.querySelector(".navbar__container");
const navbar = document.querySelector(".nav");
const progress = document.getElementById("progress");
const timeText = document.getElementById("time");
const checkmarkContainer = document.getElementById("checkmark-container");
const coffeeLevel = document.getElementById("coffee-level");
const tickMarks = document.getElementById("tick-marks");
const bubble = document.getElementById("pomodoro-bubble");

const centerX = 50;
const centerY = 50;
const radius = 45;
const tickLength = 7;
const numberOfTicks = 4;

const totalLength = 2 * Math.PI * radius;
let timerStarted = false;

// create hamburgermenu for click
hamburgerMenu.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// use when you reach that part of the page and start Promodoro timer
function updateTimer() {
  const remaining = duration - elapsed;
  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  timeText.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
  const offset = (remaining / duration) * totalLength;
  progress.style.strokeDashoffset = offset;
  if (remaining > 0) {
    elapsed++;
    requestAnimationFrame(updateTimer);
  }
}

// Also popup when you reached the promodoro timer
function showBubble() {
  bubble.setAttribute("opacity", "1");
  bubble.style.transition =
    "opacity 0.5s ease-in-out, transform 0.5s ease-in-out";
  bubble.style.transform = "translateY(-10px)";

  // The buble disapear after 2 sec
  setTimeout(() => {
    bubble.style.opacity = "0";
    bubble.style.transform = "translateY(0)";
  }, 2000);
}

const timerObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !timerStarted) {
        timerStarted = true;
        updateTimer();
        showBubble();
      }
    });
  },
  {
    threshold: 1,
  }
);

timerObserver.observe(document.querySelector(".timer-container"));

//Sticky Navbar
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
});

//Checkmark Observer
document.addEventListener("DOMContentLoaded", () => {
  const checkmarkObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log("Checkmark animáció indítása");
          checkmarkContainer.classList.add(
            "show-checkmark",
            "animate-checkmark"
          );
          checkmarkObserver.unobserve(checkmarkContainer);
        }
      });
    },
    {
      threshold: 1, //it has to be visible all of the item
    }
  );
  checkmarkObserver.observe(checkmarkContainer);
});

// sticks on the clock
for (let i = 0; i < numberOfTicks; i++) {
  const angle = (i * 360) / numberOfTicks;
  const radian = (angle * Math.PI) / 180;

  // startpoint
  const x1 = centerX + radius * Math.cos(radian);
  const y1 = centerY + radius * Math.sin(radian);

  // endpoint
  const x2 = centerX + (radius + tickLength) * Math.cos(radian);
  const y2 = centerY + (radius + tickLength) * Math.sin(radian);

  // add sticks
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", x1);
  line.setAttribute("y1", y1);
  line.setAttribute("x2", x2);
  line.setAttribute("y2", y2);
  line.setAttribute("stroke", "#FFFFFF");
  line.setAttribute("stroke-width", "1");

  tickMarks.appendChild(line);
}
