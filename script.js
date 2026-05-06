// ─── Navbar: Scroll shrink effect ───────────────────────────────────────────
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    navbar.classList.add("navbar-scrolled");
  } else {
    navbar.classList.remove("navbar-scrolled");
  }
});

// ─── Mobile Menu: Toggle ─────────────────────────────────────────────────────
const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
const menuOverlay = document.getElementById("menu-overlay");
const menuClose = document.getElementById("menu-close");
const hamburgerIcon = document.getElementById("hamburger-icon");

function openMenu() {
  mobileMenu.classList.add("menu-open");
  menuOverlay.classList.add("overlay-visible");
  document.body.style.overflow = "hidden";
  hamburgerIcon.textContent = "close";
}

function closeMenu() {
  mobileMenu.classList.remove("menu-open");
  menuOverlay.classList.remove("overlay-visible");
  document.body.style.overflow = "";
  hamburgerIcon.textContent = "menu";
}

menuToggle.addEventListener("click", () => {
  mobileMenu.classList.contains("menu-open") ? closeMenu() : openMenu();
});

menuClose.addEventListener("click", closeMenu);
menuOverlay.addEventListener("click", closeMenu);

// Close on escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenu();
});

// ─── Mobile Menu: Close on link click ────────────────────────────────────────
const mobileLinks = mobileMenu.querySelectorAll("a");
mobileLinks.forEach((link) => link.addEventListener("click", closeMenu));

// Hero Carousel
(function () {
  const slides = document.querySelectorAll("#heroTrack .slide");
  const dots = document.querySelectorAll("#heroDots .carousel-dot");
  const progress = document.getElementById("heroProgress");
  const slideNum = document.getElementById("heroSlideNum");
  let current = 0,
    timer;

  function goTo(n) {
    slides[current].classList.remove("active");
    dots[current].classList.remove("active");
    current = (n + slides.length) % slides.length;
    slides[current].classList.add("active");
    dots[current].classList.add("active");
    slideNum.textContent =
      String(current + 1).padStart(2, "0") + " / 0" + slides.length;
    progress.classList.remove("animating");
    void progress.offsetWidth; // force reflow to restart animation
    progress.classList.add("animating");
  }

  function startAuto() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), 5000);
  }

  document.getElementById("heroNext").onclick = () => {
    goTo(current + 1);
    startAuto();
  };
  document.getElementById("heroPrev").onclick = () => {
    goTo(current - 1);
    startAuto();
  };
  dots.forEach(
    (d, i) =>
      (d.onclick = () => {
        goTo(i);
        startAuto();
      }),
  );

  startAuto();
})();
