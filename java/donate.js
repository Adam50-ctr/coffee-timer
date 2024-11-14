"use strict";

const hamburgerMenu = document.getElementById("hamburger-menu");
const navLinks = document.querySelector(".navbar__container");
const navbar = document.querySelector(".nav");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
});

hamburgerMenu.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});
