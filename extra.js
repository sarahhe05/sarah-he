function toggleGuardian() {
    var guardian = document.getElementById('the-guardian-section');
    var displaySetting = guardian.style.display;
    if (displaySetting == 'block') {
      guardian.style.display = 'none';
    }
    else {
      guardian.style.display = 'block';
    }
  }
