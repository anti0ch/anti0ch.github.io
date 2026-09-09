(function () {
  var dialog = document.getElementById('lightbox');
  if (!dialog) return;

  var lightboxImg = dialog.querySelector('img');
  var closeBtn = dialog.querySelector('.lightbox-close');
  var lastFocused = null;

  function open(img) {
    lastFocused = img;
    lightboxImg.src = img.currentSrc || img.src;
    lightboxImg.alt = img.alt;
    dialog.showModal();
  }

  document.querySelectorAll('.project-thumb img').forEach(function (img) {
    img.tabIndex = 0;
    img.setAttribute('role', 'button');
    img.setAttribute('aria-label', 'Expand image');
    img.addEventListener('click', function () { open(img); });
    img.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        open(img);
      }
    });
  });

  dialog.addEventListener('click', function (e) {
    if (e.target === dialog) dialog.close();
  });

  closeBtn.addEventListener('click', function () {
    dialog.close();
  });

  dialog.addEventListener('close', function () {
    if (lastFocused) lastFocused.focus();
  });
})();

(function () {
  var STORAGE_KEY = 'theme';
  var root = document.documentElement;
  var toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  function systemTheme() {
    return window.matchMedia('(prefers-color-scheme: light)').matches
      ? 'light'
      : 'dark';
  }

  function render(theme) {
    toggle.textContent = '[ ' + (theme || systemTheme()) + ' ]';
  }

  var stored = null;
  try {
    stored = localStorage.getItem(STORAGE_KEY);
  } catch (e) {}
  render(stored);

  toggle.addEventListener('click', function () {
    var current = root.getAttribute('data-theme') || systemTheme();
    var next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    render(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch (e) {}
  });
})();
