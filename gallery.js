// Justified gallery + lightbox for photography.html

// ==========================================
// 1. DATA ARRAYS
// ==========================================

var concertImages = [
  { file: "Tiffany-Day-1.jpg", alt: "Tiffany Day concert" },
  { file: "Katherine-Li-2.jpg", alt: "Katherine Li concert" },
  { file: "Eric-Nam-1.jpg", alt: "Eric Nam concert" },
  { file: "ILLENIUM.jpg", alt: "ILLENIUM concert" },
  { file: "battle-of-the-bands.jpg", alt: "Battle of the bands" },
  { file: "Eric-Nam-2.jpg", alt: "Eric Nam concert" },
  { file: "Tiffany-Day-2.jpg", alt: "Tiffany Day concert" },
  { file: "Katherine-Li-1.jpg", alt: "Katherine Li concert" },
  { file: "aespa.jpg", alt: "aespa concert" }
];

var guardianPages = [
  { file: "01_041524NEWS.jpg", date: "April 15, 2024", alt: "The Guardian front page, April 15, 2024" },
  { file: "05_031124SPORTS.jpg", date: "March 11, 2024", alt: "The Guardian sports page, March 11, 2024" },
  { file: "09_021224A%26E.jpg", date: "February 12, 2024", alt: "The Guardian A&E page, February 12, 2024" },
  { file: "01_012224NEWS.jpg", date: "January 22, 2024", alt: "The Guardian front page, January 22, 2024" },
  { file: "01_112723NEWS.jpg", date: "November 27, 2023", alt: "The Guardian front page, November 27, 2023" },
  { file: "12_112023SPORTS.jpg", date: "November 20, 2023", alt: "The Guardian sports page, November 20, 2023" }
];

var guardianCarouselPhotos = [
  { file: "AS Election Results Photo Cred - Sarah He4.jpg", alt: "AS election results" },
  { file: "Baseball Game Photo Cred - Sarah He1.jpg", alt: "Baseball game" },
  { file: "Cut Up The Guardian - Photo Cred - Sarah He1.jpg", alt: "Cut Up The Guardian" },
  { file: "UAW for Suresh Photo Cred - Sarah He1.jpg", alt: "UAW rally" },
  { file: "Womens Volleyball Photo Cred - Sarah He1.jpg", alt: "Women's volleyball" },
  { file: "AS Meeting Photo Cred - Sarah He1.jpg", alt: "AS meeting" }
];

var moreImages = [
  { file: "full-worlds.jpg", preview: "worlds.jpg", alt: "worlds" },
  { file: "full-UAW-Rally.jpg", preview: "UAW-Rally.jpg", alt: "UAW Rally" },
  { file: "full-break-of-light.jpg", preview: "break-of-light.jpg", alt: "break of light" },
  { file: "full-swim.jpg", preview: "swim.jpg", alt: "swim" },
  { file: "full-dusk.JPG", preview: "dusk.jpg", alt: "dusk" },
  { file: "full-seal.jpg", preview: "seal.jpg", alt: "seal" },
  { file: "full-crow.jpg", preview: "crow.jpg", alt: "crow" },
  { file: "full-dreamy-moonlight.jpg", preview: "dreamy-moonlight.jpg", alt: "dreamy moonlight" }
];

// ==========================================
// 2. DYNAMIC RENDERING
// ==========================================

// Concerts gallery
var concertContainer = document.getElementById('concert-gallery');
if (concertContainer) {
  concertContainer.innerHTML = concertImages.map(function(img) {
    return '<a class="gallery-item" href="./images/full/full-' + img.file + '" target="_blank">' +
           '<img src="./images/preview/' + img.file + '" alt="' + img.alt + '">' +
           '</a>';
  }).join('');
}

// Guardian pages viewer stage
var guardianPagesStage = document.getElementById('guardian-pages-stage');
if (guardianPagesStage) {
  guardianPagesStage.innerHTML = guardianPages.map(function(page) {
    return '<a class="press-item" href="./guardian/' + page.file + '" data-date="' + page.date + '" target="_blank">' +
           '<img src="./guardian/' + page.file + '" alt="' + page.alt + '">' +
           '</a>';
  }).join('');
}

// Guardian carousel stage
var guardianCarouselStage = document.getElementById('guardian-carousel-stage');
if (guardianCarouselStage) {
  guardianCarouselStage.innerHTML = guardianCarouselPhotos.map(function(photo) {
    return '<div class="carousel-slide">' +
           '<img src="./guardian/' + photo.file + '" alt="' + photo.alt + '">' +
           '</div>';
  }).join('');
}

// More photography gallery
var moreContainer = document.getElementById('more-gallery');
if (moreContainer) {
  moreContainer.innerHTML = moreImages.map(function(img) {
    return '<a class="gallery-item" href="./images/full/' + img.file + '" target="_blank">' +
           '<img src="./images/preview/' + img.preview + '" alt="' + img.alt + '">' +
           '</a>';
  }).join('');
}

// ==========================================
// 3. GALLERY & INTERACTION LOGIC
// ==========================================

// Calculate real aspect ratio for grid items
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

// Lightbox
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

// Guardian page viewer controls
document.querySelectorAll('.pages-viewer').forEach(function (viewer) {
  var pages = viewer.querySelectorAll('.press-item');
  var counter = viewer.querySelector('.viewer-counter');
  var caption = viewer.querySelector('.viewer-caption');
  var i = 0;

  viewer.classList.add('js');

  function show(n) {
    if (!pages.length) return;
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

// Photo carousel controls
document.querySelectorAll('.photo-carousel').forEach(function (carousel) {
  var slides = carousel.querySelectorAll('.carousel-slide');
  var dotsBox = carousel.querySelector('.carousel-dots');
  var i = 0;
  var timer = null;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  dotsBox.innerHTML = ''; // clear existing if any
  slides.forEach(function (_, k) {
    var dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', 'Show photo ' + (k + 1));
    dot.addEventListener('click', function () { show(k); restart(); });
    dotsBox.appendChild(dot);
  });
  var dots = dotsBox.querySelectorAll('button');

  function show(n) {
    if (!slides.length) return;
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
