(function () {
  const key = 'weblab-theme';
  const saved = localStorage.getItem(key);
  const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  const initial = saved || (prefersLight ? 'light' : 'dark');
  document.documentElement.dataset.theme = initial;

  function addToggle() {
    const nav = document.querySelector('.nav');
    if (!nav || document.querySelector('.theme-toggle')) return;
    const button = document.createElement('button');
    button.className = 'theme-toggle';
    button.type = 'button';
    button.setAttribute('aria-label', 'Toggle dark and light mode');
    button.addEventListener('click', () => {
      const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
      document.documentElement.dataset.theme = next;
      localStorage.setItem(key, next);
      updateButton(button);
    });
    nav.appendChild(button);
    updateButton(button);
  }

  function updateButton(button) {
    const light = document.documentElement.dataset.theme === 'light';
    button.innerHTML = light ? '☀️ <span>Light</span>' : '🌙 <span>Dark</span>';
    button.title = light ? 'Switch to dark mode' : 'Switch to light mode';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addToggle);
  } else addToggle();
})();
