//© 2025 LeeKiJoon all rights reserved
'use strict';
// Toggle Switch element, theme status label element
const themeToggle = document.getElementById('mode-toggle');

// Update theme function
function updateTheme(isDarkMode) {
  document.documentElement.classList.toggle('dark-mode', isDarkMode);

  // Save to local storage
  localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
}

// Update checkbox status
themeToggle?.addEventListener('change', () => {
  updateTheme(themeToggle.checked);
});

// Theme apply when page loaded
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  const isDarkMode = savedTheme === 'dark';

  // Status restore
  if (themeToggle) {
    themeToggle.checked = isDarkMode;
  }
  updateTheme(isDarkMode);
});
