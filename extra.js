function toggleGuardian() {
  var guardian = document.getElementById('the-guardian');
  var button = document.getElementById('guardian-button');
  var isOpen = guardian.style.display === 'block';

  guardian.style.display = isOpen ? 'none' : 'block';
  button.textContent = isOpen
    ? 'Click to see more of my work with The Guardian!'
    : 'Hide my Guardian work';
  button.setAttribute('aria-expanded', String(!isOpen));
}
