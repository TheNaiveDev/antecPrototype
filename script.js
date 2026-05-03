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
