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
