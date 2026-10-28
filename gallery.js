// Justified gallery + lightbox for photography.html

// 1. Give each gallery item its real aspect ratio so landscape and portrait
//    photos each get the right width without cropping.
document.querySelectorAll('.gallery-item img').forEach(function (img) {
  function setRatio() {
    if (img.naturalWidth && img.naturalHeight) {
      img.parentElement.style.setProperty(
        '--ar',
        (img.naturalWidth / img.naturalHeight).toFixed(3)
      );
    }
  }
  if (img.complete) {
    setRatio();
  } else {
    img.addEventListener('load', setRatio);
  }
});

// 2. Lightbox: clicking a photo opens the full-size version on the page.
(function () {
  var box = document.createElement('div');
  box.className = 'lightbox';
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.setAttribute('aria-label', 'Photo viewer');
  box.innerHTML =
    '<button class="lightbox-close" aria-label="Close">&times;</button>' +
    '<button class="lightbox-prev" aria-label="Previous photo">&#8249;</button>' +
    '<img alt="">' +
    '<button class="lightbox-next" aria-label="Next photo">&#8250;</button>';
  document.body.appendChild(box);

  var bigImg = box.querySelector('img');
  var items = [];
  var index = 0;

  function show(i) {
    index = (i + items.length) % items.length;
    var link = items[index];
    bigImg.src = link.getAttribute('href');
    bigImg.alt = link.querySelector('img').alt;
  }

  function open(gallery, link) {
    items = Array.prototype.slice.call(gallery.querySelectorAll('.gallery-item, .press-item'));
    show(items.indexOf(link));
    box.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    box.classList.remove('open');
    bigImg.removeAttribute('src');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.gallery, .pages-viewer').forEach(function (gallery) {
    gallery.addEventListener('click', function (e) {
      var link = e.target.closest('.gallery-item, .press-item');
      if (!link) return;
      e.preventDefault();
      open(gallery, link);
    });
  });

  box.addEventListener('click', function (e) {
    if (e.target === box || e.target.classList.contains('lightbox-close')) close();
    else if (e.target.classList.contains('lightbox-prev')) show(index - 1);
    else if (e.target.classList.contains('lightbox-next')) show(index + 1);
  });

  document.addEventListener('keydown', function (e) {
    if (!box.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(index - 1);
    else if (e.key === 'ArrowRight') show(index + 1);
  });
})();

// 3. Guardian page viewer: one page at a time, arrows + counter.
document.querySelectorAll('.pages-viewer').forEach(function (viewer) {
  var pages = viewer.querySelectorAll('.press-item');
  var counter = viewer.querySelector('.viewer-counter');
  var caption = viewer.querySelector('.viewer-caption');
  var i = 0;

  viewer.classList.add('js');

  function show(n) {
    i = (n + pages.length) % pages.length;
    pages.forEach(function (page, k) {
      page.classList.toggle('active', k === i);
    });
    counter.textContent = (i + 1) + '/' + pages.length;
    caption.textContent = pages[i].getAttribute('data-date') || '';
  }

  viewer.querySelector('.viewer-prev').addEventListener('click', function () { show(i - 1); });
  viewer.querySelector('.viewer-next').addEventListener('click', function () { show(i + 1); });
  show(0);
});

// 4. Rotating photo carousel: auto-advances, pauses on hover, dots to jump.
document.querySelectorAll('.photo-carousel').forEach(function (carousel) {
  var slides = carousel.querySelectorAll('.carousel-slide');
  var dotsBox = carousel.querySelector('.carousel-dots');
  var i = 0;
  var timer = null;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  slides.forEach(function (_, k) {
    var dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', 'Show photo ' + (k + 1));
    dot.addEventListener('click', function () { show(k); restart(); });
    dotsBox.appendChild(dot);
  });
  var dots = dotsBox.querySelectorAll('button');

  function show(n) {
    i = (n + slides.length) % slides.length;
    slides.forEach(function (s, k) { s.classList.toggle('active', k === i); });
    dots.forEach(function (d, k) { d.classList.toggle('active', k === i); });
  }

  function start() {
    if (reduceMotion || timer) return;
    timer = setInterval(function () { show(i + 1); }, 4500);
  }
  function stop() { clearInterval(timer); timer = null; }
  function restart() { stop(); start(); }

  carousel.addEventListener('mouseenter', stop);
  carousel.addEventListener('mouseleave', start);
  show(0);
  start();
});
