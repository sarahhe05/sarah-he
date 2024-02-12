function toggleGuardian() {
    // get the clock
    var guardian = document.getElementById('the-guardian-section');

    // get the current value of the clock's display property
    var displaySetting = guardian.style.display;

    // also get the clock button, so we can change what it says
    var guardianButton = document.getElementById('access-the-guardian-button');

    // now toggle the clock and the button text, depending on current state
    if (displaySetting == 'block') {
      // clock is visible. hide it
      guardian.style.display = 'none';
      // change button text
      guardianButton.innerHTML = 'Show clock';
    }
    else {
      // clock is hidden. show it
      guardian.style.display = 'block';
      // change button text
      guardianButton.innerHTML = 'Hide clock';
    }
  }