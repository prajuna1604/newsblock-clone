const toggle = document.getElementById("themeToggle");
const circle = document.getElementById("toggleCircle");
const sun = document.getElementById("sunIcon");
const moon = document.getElementById("moonIcon");
const sunMb = document.getElementById("sunIconMb");
const moonMb = document.getElementById("moonIconMb");
const mobileToggle = document.getElementById("themeToggleMb");
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const closeMenu = document.getElementById("closeMenu");
const menuItems = document.querySelectorAll(".menu-item");
const contentGroups = document.querySelectorAll(".content-group");

const html = document.documentElement;
const getPreferredTheme = () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    return savedTheme;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const applyTheme = (theme) => {
  if (theme === "dark") {
    html.classList.add("dark");
    circle.style.transform = "translateX(26px)";
    // sun.classList.add('hidden');
    moon.classList.remove("hidden");
    // Show moon icon in dark mode
    moon.classList.remove("dark:hidden");
    moon.classList.add("dark:block");
  } else {
    html.classList.remove("dark");
    circle.style.transform = "translateX(0px)";
    sun.classList.remove("hidden");
    // moon.classList.add('hidden');
    // Show sun icon in light mode
    sun.classList.remove("dark:hidden");
    sun.classList.add("dark:block");
  }
};

// toggle for mobile
function updateMobileIcons() {
  const isDark = html.classList.contains("dark");
  if (isDark) {
    sunIconMb.classList.remove("hidden");
    moonIconMb.classList.add("hidden");
  } else {
    sunIconMb.classList.add("hidden");
    moonIconMb.classList.remove("hidden");
  }
}

mobileToggle.addEventListener("click", () => {
  const isDark = html.classList.contains("dark");
  const newTheme = isDark ? "light" : "dark";

  applyTheme(newTheme);
  localStorage.setItem("theme", newTheme);
  updateMobileIcons();
});
updateMobileIcons();

const currentTheme = getPreferredTheme();
applyTheme(currentTheme);

toggle.addEventListener("click", () => {
  const isDark = html.classList.contains("dark");
  const newTheme = isDark ? "light" : "dark";

  applyTheme(newTheme);
  localStorage.setItem("theme", newTheme);
});

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    if (!localStorage.getItem("theme")) {
      const newTheme = e.matches ? "dark" : "light";
      applyTheme(newTheme);
    }
  });
// sidebar dropdown
menuBtn.addEventListener("click", () => {
  mobileMenu.classList.remove("-translate-x-full");
});
closeMenu.addEventListener("click", () => {
  mobileMenu.classList.add("-translate-x-full");
});
// categories dropdown
menuItems.forEach((item) => {
  item.addEventListener("mouseenter", () => {
    const category = item.dataset.category;

    contentGroups.forEach((content) => {
      content.classList.add("hidden");
      if (content.dataset.content === category) {
        content.classList.remove("hidden");
      }
    });
  });
});

// loadmire
  const loadMoreBtn = document.getElementById("loadMore");
  const hiddenPosts = document.querySelectorAll(".post.hidden");
  let index = 0;
  const step = 2; // load 2 articles per click

  loadMoreBtn.addEventListener("click", () => {
    for (let i = index; i < index + step; i++) {
      if (hiddenPosts[i]) {
        hiddenPosts[i].classList.remove("hidden");
      }
    }
    index += step;

    if (index >= hiddenPosts.length) {
      loadMoreBtn.classList.add("hidden");
    }
  });

