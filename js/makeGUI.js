const CONTROLS = new (function () {
  this.key_attack_time = 9.0;
  this.key_max_rotation = 0.72;
  // Camera Settings
  this.orbit = false;
  this.resetView = () => {
    cameraControls.autoRotate = false;
    cameraControls.userZoom = true;
    cameraControls.userRotate = true;
    this.orbit = false;
    this.lockCamera = false;
    scene.hideAllSpheres();
    scene.showPiano();
    this.colorfulView();
  };
  // Keyboard Settings
  this.instrument = "keyboard";
  this.showKeyboard = true;
  this.sustain = false;
  this.mute = false;
  this.octave = 2;
  this.showLabels = true;
  // Sphere Settings
  this.showSphere = false;
  this.sphereMaterial = "basic";
  this.autoSphere = false;
  this.showWave = false;
  this.waveMaterial = "basic";
  this.autoWave = false;
  // Sound Effects
  this.volume = 100;
  this.lastVolume = 100;
  this.reverbAmount = 0;
  this.chorusAmount = 0;
  this.phaserAmount = 0;
  this.vibratoAmount = 0;
  // Color Settings
  this.showColor = true;
  this.gradient = "animated";
  this.showSpotlight = false;
  this.invertSpotlight = false;
  this.spotlightDirection = "circle";
  this.map = "rainbow";
  this.vintage = false;
  // Camera Settings
  this.lockCamera = false;
  this.customView = "simple";
  // Camera Views
  this.simpleView = () => {
    camera.position.set(5, 10, 20);
    camera.lookAt(new THREE.Vector3(5.8, 0, 0));
    cameraControls.target.set(5.8, 0, 0);
  };
  this.colorfulView = () => {
    camera.position.set(5.8, 25, 10);
    camera.lookAt(new THREE.Vector3(5.8, 0, 0));
    cameraControls.target.set(5.8, 0, 0);
  };
  this.closeView = () => {
    camera.position.set(-4, 2, 7);
    camera.lookAt(new THREE.Vector3(6, 1, -4));
    cameraControls.target.set(5, 0, 0);
  };
  this.nostalgicView = () => {
    camera.position.set(-4, 11, 10);
    camera.lookAt(new THREE.Vector3(6, 1, -4));
    cameraControls.target.set(5, 0, 0);
  };
  this.trippyView = () => {
    camera.position.set(5, 5, -50);
    camera.lookAt(new THREE.Vector3(6, 1, -4));
    cameraControls.target.set(5, 0, 0);
  };
  this.sphereView = () => {
    camera.position.set(-15, 15, 30);
    camera.lookAt(new THREE.Vector3(6, 1, -4));
    cameraControls.target.set(5, 0, 0);
  };
  // Preset Handler
  this.selectPreset = () => {
    // Simple Keyboard
    if (this.customView === "simple") {
      // Change Settings
      this.instrument = "keyboard";
      this.octave = 2;
      this.sustain = false;
      // Set Effects
      this.reverbAmount = 0;
      reverb.setDecay(0);
      this.chorusAmount = 0;
      chorus.setFrequency(0);
      this.phaserAmount = 0;
      phaser.setFrequency(0);
      this.vibratoAmount = 0;
      vibrato.setFrequency(0);
      this.volume = 100;
      // Set Color
      this.showColor = false;
      document.body.style.background = "";
      this.map = "messiaen";
      // Set View
      this.simpleView();
      handleInstrument("keyboard");
      showPiano();
      hideAllSpheres();
    } else {
      this.showColor = true;
    }
    // Colorful Piano
    if (this.customView === "colorful") {
      // Change Settings
      this.instrument = "keyboard";
      this.octave = 2;
      this.sustain = true;
      // Set Effects
      this.reverbAmount = 10;
      reverb.setDecay(10);
      this.chorusAmount = 0;
      chorus.setFrequency(0);
      this.phaserAmount = 0;
      phaser.setFrequency(0);
      this.vibratoAmount = 0;
      vibrato.setFrequency(0);
      this.volume = 100;
      // Set Color
      this.gradient = "radial";
      this.map = "scriabin";
      // Set View
      this.colorfulView();
      handleInstrument("keyboard");
      this.showKeyboard = true;
      showPiano();
      this.showSphere = false;
      hideAllSpheres();
      this.showWave = false;
      initializeWave();
    }
    // Close Up FM
    if (this.customView === "closeup") {
      // Change Settings
      this.instrument = "fmsynth";
      this.octave = 2;
      this.sustain = true;
      // Set Effects
      this.reverbAmount = 50;
      reverb.setDecay(50);
      this.chorusAmount = 10;
      chorus.setFrequency(10);
      this.phaserAmount = 5;
      phaser.setFrequency(5);
      this.vibratoAmount = 50;
      vibrato.setFrequency(50);
      this.volume = 85;
      // Set Color
      this.map = "rainbow";
      this.gradient = "radial";
      // Set View
      this.closeView();
      handleInstrument("fmsynth");
      this.showKeyboard = true;
      showPiano();
      this.showSphere = false;
      hideAllSpheres();
      this.showWave = false;
      initializeWave();
    }
    if (this.customView === "nostalgic") {
      // Change Settings
      this.instrument = "amsynth";
      this.octave = 2;
      this.sustain = true;
      // Set Effects
      this.reverbAmount = 100;
      reverb.setDecay(100);
      this.chorusAmount = 30;
      chorus.setFrequency(30);
      this.phaserAmount = 2;
      phaser.setFrequency(2);
      this.vibratoAmount = 10;
      vibrato.setFrequency(10);
      this.volume = 90;
      // Set Color
      this.gradient = "radial";
      this.map = "mars";
      // Set View
      this.nostalgicView();
      handleInstrument("amsynth");
      this.showWave = false;
      initializeWave();
      showBigSphere();
      this.showKeyboard = true;
      showPiano();
      this.showSphere = false;
      hideSpheres();
    }
    if (this.customView === "trippy") {
      // Change Settings
      this.instrument = "duosynth";
      this.octave = 2;
      this.sustain = true;
      // Set Effects
      this.reverbAmount = 10;
      reverb.setDecay(10);
      this.chorusAmount = 0;
      chorus.setFrequency(0);
      this.phaserAmount = 10;
      phaser.setFrequency(10);
      this.vibratoAmount = 10;
      vibrato.setFrequency(10);
      this.volume = 85;
      // Set Color
      this.gradient = "random";
      this.map = "reverserainbow";
      // Set View
      this.trippyView();
      handleInstrument("duosynth");
      this.showKeyboard = false;
      hidePiano();
      this.showSphere = false;
      hideAllSpheres();
      this.showWave = true;
      initializeWave();
    }
    initializeEffects();
  };
})();

const makeGUI = () => {
  var gui = new dat.GUI({ width: 300, hideable: false });

  const keyboardFolder = gui.addFolder("Keyboard");
  keyboardFolder.open();

  // Set Instrument
  var instrument = keyboardFolder
    .add(controls, "instrument", {
      "Grand Piano": "keyboard",
      "AM Synth": "amsynth",
      "FM Synth": "fmsynth",
      "Duo Synth": "duosynth",
    })
    .name("Instrument")
    .listen();
  instrument.onChange(handleInstrument);

  // Show Keyboard
  const showKeyboard = keyboardFolder
    .add(controls, "showKeyboard")
    .name("Show Keyboard")
    .listen();
  showKeyboard.onChange((val) => {
    val ? showPiano() : hidePiano();
    labels.setValue(val);
    moveKeyLabels();
    if (val) {
      if (controls.showSphere) {
        showSphere.setValue(false);
        hideSpheres();
      }
      if (controls.showWave) {
        showWave.setValue(false);
        initializeWave();
      }
    }
  });

  var sustain = keyboardFolder
    .add(controls, "sustain")
    .name("Sustain")
    .listen();
  sustain.onChange((value) => {
    tone.releaseAll();
    // Make sure reverb is off
    if (!value && !!controls.reverbAmount) reverbEffect.setValue(0);
  });

  var mute = keyboardFolder.add(controls, "mute").name("Mute");
  mute.onChange((value) => {
    if (value) {
      lastVolume = controls.volume;
      volumeControl.setValue(0);
      volume.mute = true;
    } else {
      volumeControl.setValue(lastVolume);
    }
  });

  var octave = keyboardFolder
    .add(controls, "octave", 0, 4)
    .step(1)
    .name("Octave")
    .listen();

  octave.onChange(() => {
    for (keyCode in keys_down) {
      var note = keyCode_to_note(keyCode);
      key_status(note, keyState.note_off);
    }
    if (controls.showKeyboard) {
      moveKeyLabels();
    }
  });

  const labels = keyboardFolder
    .add(controls, "showLabels")
    .name("Show Labels")
    .listen();
  labels.onChange(moveKeyLabels);

  const sphereFolder = gui.addFolder("Sphere");

  // Show Sphere
  const showSphere = sphereFolder
    .add(controls, "showSphere")
    .name("Show Sphere")
    .listen();
  showSphere.onChange((val) => {
    !!val ? showSpheres() : hideSpheres();
    if (val) {
      if (controls.showKeyboard) {
        showKeyboard.setValue(false);
        hidePiano();
      }
      if (controls.showWave) {
        showWave.setValue(false);
        initializeWave();
      }
    }
  });

  // Sphere Material
  sphereFolder
    .add(controls, "sphereMaterial", {
      Basic: "basic",
      Phong: "phong",
      Toon: "toon",
      Mesh: "mesh",
    })
    .name("Sphere Material")
    .listen();

  sphereFolder.add(controls, "autoSphere").name("Auto Update").listen();

  const waveFolder = gui.addFolder("Wave");

  // Show Wave
  var showWave = waveFolder
    .add(controls, "showWave")
    .name("Show Wave")
    .listen();
  showWave.onChange((val) => {
    initializeWave();
    if (val) {
      if (controls.showKeyboard) {
        showKeyboard.setValue(false);
        hidePiano();
      }
      if (controls.showSphere) {
        showSphere.setValue(false);
        hideSpheres();
      }
    }
  });

  // Wave Material
  waveFolder
    .add(controls, "waveMaterial", {
      Basic: "basic",
      Phong: "phong",
      Toon: "toon",
      Mesh: "mesh",
    })
    .name("Wave Material")
    .onChange(() => initializeWave());

  waveFolder.add(controls, "autoWave").name("Auto Update").listen();

  // Add folder for color settings
  const colorFolder = gui.addFolder("Color");
  colorFolder.open();

  var showColor = colorFolder
    .add(controls, "showColor")
    .name("Show Color")
    .listen();
  showColor.onChange(() => {
    document.body.style.background = "";
  });

  colorFolder
    .add(controls, "gradient", {
      Animated: "animated",
      Radial: "radial",
      Conic: "conic",
      Random: "random",
    })
    .name("Gradient Type")
    .listen();

  colorFolder.add(controls, "showSpotlight").name("Show Spotlight");
  colorFolder.add(controls, "invertSpotlight").name("Invert Spotlight");

  colorFolder
    .add(controls, "spotlightDirection", {
      Circle: "circle",
      Up: "up",
      Down: "down",
      All: "random",
    })
    .name("Spotlight Direction")
    .listen();

  colorFolder
    .add(controls, "map", {
      Rainbow: "rainbow",
      "Reverse Rainbow": "reverserainbow",
      Scriabin: "scriabin",
      Messiaen: "messiaen",
      Mars: "mars",
    })
    .name("Color Map")
    .listen();

  var vintage = colorFolder
    .add(controls, "vintage")
    .name("Vintage Mode")
    .listen();
  vintage.onChange((val) => (val ? showBigSphere() : hideBigSphere()));

  // Add effect folder
  const effectFolder = gui.addFolder("Sound Effects");
  effectFolder.open();

  var volumeControl = effectFolder
    .add(controls, "volume", 0, 100)
    .step(1)
    .name("Volume")
    .listen();
  volumeControl.onChange((value) => {
    volume.volume.value = value / 2 - 50;
    volume.mute = !value;
  });

  // Add reverb effect
  var reverbEffect = effectFolder
    .add(controls, "reverbAmount", 0, 100)
    .step(1)
    .name("Reverb")
    .listen();
  reverbEffect.onChange((value) => {
    reverb.setDecay(value);
    if (value > 0 && !controls.sustain) sustain.setValue(true);
    if (controls.showSphere) updateSpheres();
  });

  // Add chorus effect
  var chorusEffect = effectFolder
    .add(controls, "chorusAmount", 0, 100)
    .step(1)
    .name("Chorus")
    .listen();
  chorusEffect.onChange((value) => {
    chorus.setFrequency(value);
    if (controls.showSphere) updateSpheres();
  });

  // Add phaser effect
  var phaserEffect = effectFolder
    .add(controls, "phaserAmount", 0, 100)
    .step(1)
    .name("Phaser")
    .listen();
  phaserEffect.onChange((value) => {
    phaser.setFrequency(value);
    if (controls.showSphere) updateSpheres();
  });

  // Add vibrato effect
  var vibratoEffect = effectFolder
    .add(controls, "vibratoAmount", 0, 100)
    .step(1)
    .name("Vibrato")
    .listen();
  vibratoEffect.onChange((value) => {
    vibrato.setFrequency(value);
    if (controls.showSphere) updateSpheres();
  });

  // Folder for custom views
  const viewFolder = gui.addFolder("View");
  viewFolder.open();

  // Custom Preset View
  viewFolder
    .add(controls, "customView", {
      "Simple Keyboard": "simple",
      "Colorful Piano": "colorful",
      "Close Up FM": "closeup",
      "Nostalgic AM": "nostalgic",
      "Trippy Waves": "trippy",
    })
    .name("Custom Preset")
    .onChange(controls.selectPreset);

  // Orbit Camera
  const orbitCamera = viewFolder
    .add(controls, "orbit")
    .name("Orbit Camera")
    .listen();
  orbitCamera.onChange((val) => {
    cameraControls.autoRotate = val;
    if (controls.lockCamera && val) lockCamera.setValue(false);
    if (val) cameraControls.userZoom = true;
    if (val) cameraControls.userRotate = true;
  });

  // Lock Camera View
  const lockCamera = viewFolder
    .add(controls, "lockCamera")
    .name("Lock Camera")
    .listen();
  lockCamera.onChange((val) => {
    if (val) cameraControls.autoRotate = !val;
    cameraControls.userZoom = !val;
    cameraControls.userRotate = !val;
    if (val) controls.orbit = !val;
  });

  // Reset Camera View
  viewFolder.add(controls, "resetView").name("Reset Camera");
};
