// Experience timeline: hover, focus or click a point to show that role
// in the panel beside the timeline.
document.querySelectorAll('.timeline').forEach(function (timeline) {
  var items = Array.prototype.slice.call(timeline.querySelectorAll('.tl-item'));
  var col = timeline.querySelector('.tl-panel-col');
  var panel = document.createElement('div');
  var current = items[0];

  panel.className = 'tl-panel';
  col.appendChild(panel);
  timeline.classList.add('js');

  function activate(item) {
    current = item;
    items.forEach(function (it) {
      it.classList.toggle('active', it === item);
    });
    panel.innerHTML = item.querySelector('.tl-detail').innerHTML;

    // slide the panel so it lines up with the selected point
    var maxTop = Math.max(0, col.clientHeight - panel.offsetHeight);
    panel.style.top = Math.min(item.offsetTop, maxTop) + 'px';
  }

  items.forEach(function (item) {
    item.addEventListener('mouseenter', function () { activate(item); });
    item.addEventListener('click', function () { activate(item); });
    item.addEventListener('focusin', function () { activate(item); });
  });

  window.addEventListener('resize', function () { activate(current); });
  activate(current);
});
