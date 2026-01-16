
const toggle = document.getElementById("themeToggle");
const circle = document.getElementById("toggleCircle");
const sun = document.getElementById("sunIcon");
const moon = document.getElementById("moonIcon");
const html = document.documentElement;

const getPreferredTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const applyTheme = (theme) => {
    if (theme === 'dark') {
        html.classList.add('dark');
        circle.style.transform = 'translateX(26px)';
        sun.classList.add('hidden');
        moon.classList.remove('hidden');
        // Show moon icon in dark mode
        moon.classList.remove('dark:hidden');
        moon.classList.add('dark:block');
    } else {
        html.classList.remove('dark');
        circle.style.transform = 'translateX(0px)';
        sun.classList.remove('hidden');
        moon.classList.add('hidden');
        // Show sun icon in light mode
        sun.classList.remove('dark:hidden');
        sun.classList.add('dark:block');
    }
};

const currentTheme = getPreferredTheme();
applyTheme(currentTheme);

toggle.addEventListener("click", () => {
    const isDark = html.classList.contains('dark');
    const newTheme = isDark ? 'light' : 'dark';
    
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        applyTheme(newTheme);
    }
});

const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const closeMenu = document.getElementById("closeMenu");

  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.remove("-translate-x-full");
  });

  closeMenu.addEventListener("click", () => {
    mobileMenu.classList.add("-translate-x-full");
  });