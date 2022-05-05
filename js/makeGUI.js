const CONTROLS = new (function () {
  this.key_attack_time = 9.0;
  this.key_max_rotation = 0.72;
  // Camera Settings
  this.orbit = false;
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
  this.showColor = false;
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
  this.setView = (pos, target) => {
    camera.position.set(pos[0], pos[1], pos[2]);
    cameraControls.target.set(target[0], target[1], target[2]);
  };
  this.resetView = () => {
    cameraControls.autoRotate = false;
    cameraControls.userZoom = true;
    cameraControls.userRotate = true;
    this.orbit = false;
    this.lockCamera = false;
    hideAllSpheres();
    showPiano();
    this.setView([5.8, 25, 10], [5.8, 0, 0]);
  };
  // Preset Handler
  this.selectPreset = () => {
    // Simple Keyboard
    if (this.customView === "simple") {
      // Change Settings
      this.octave = 2;
      this.sustain = false;
      // Set Effects
      selectInstrument("keyboard", 0, 0, 0, 0);
      this.volume = 100;
      // Set Color
      this.showColor = false;
      document.body.style.background = "";
      this.map = "rainbow";
      this.vintage = false;
      // Set View
      this.setView([5.8, 25, 10], [5.8, 0, 0]);
      renderInstrument("keyboard");
      selectPiano();
    } else {
      this.showColor = true;
    }
    // Scriabin Piano
    if (this.customView === "scriabin") {
      // Change Settings
      this.octave = 2;
      this.sustain = true;
      // Set Effects
      selectInstrument("keyboard", 10, 5, 0, 5);
      this.volume = 100;
      document.body.style.background =
        "radial-gradient(circle, #ff0000, #f0f0f0, #ff8000)";
      this.gradient = "animated";
      this.map = "scriabin";
      this.vintage = false;
      // Set View
      this.setView([-2.5, 8.5, 20], [5.8, 0, 0]);
      renderInstrument("keyboard");
      selectPiano();
    }
    // Sunset FM
    if (this.customView === "sunset") {
      // Change Settings
      this.octave = 2;
      this.sustain = true;
      // Set Effects
      selectInstrument("fmsynth", 50, 10, 5, 50);
      this.volume = 85;
      // Set Color
      document.body.style.background =
        "radial-gradient(circle, #f42494, #ffcf00, #ff2000)";
      this.map = "rainbow";
      this.gradient = "radial";
      this.vintage = false;
      // Set View
      this.setView([-3, 2, 5], [5.8, 0, 0]);
      renderInstrument("fmsynth");
      selectPiano();
    }
    if (this.customView === "nostalgic") {
      // Change Settings
      this.octave = 2;
      this.sustain = true;
      // Set Effects
      selectInstrument("amsynth", 100, 10, 2, 10);
      this.volume = 90;
      // Set Color
      document.body.style.background =
        "radial-gradient(circle, #007fff, #09feab, #00ffff)";
      this.gradient = "conic";
      this.map = "mars";
      this.vintage = false;
      // Set View
      this.setView([-4, 11, 15], [5.8, 0, 0]);
      renderInstrument("amsynth");
      selectPiano();
      // Set Vintage Mode
      this.vintage = true;
      showBigSphere();
    }
    if (this.customView === "retro") {
      // Change Settings
      this.octave = 2;
      this.sustain = true;
      // Set Effects
      selectInstrument("duosynth", 10, 100, 100, 100);
      this.volume = 85;
      document.body.style.background =
        "conic-gradient(#ff2000, #007ac7, #f42494, #ff2000)";
      // Set Color
      this.gradient = "conic";
      this.map = "reverserainbow";
      this.vintage = false;
      // Set View
      this.setView([0, 20, 30], [5.8, 0, 0]);
      renderInstrument("duosynth");
      selectPiano();
    }
    if (this.customView === "sphere") {
      // Change Settings
      this.octave = 2;
      this.sustain = true;
      // Set Effects
      selectInstrument("amsynth", 5, 0, 0, 0);
      this.volume = 85;
      document.body.style.background =
        "radial-gradient(circle, #ffff00, #c0428a, #0000ff, #ffffff)";
      // Set Color
      this.gradient = "radial";
      this.map = "messiaen";
      this.vintage = false;
      // Set View
      this.setView([-40, 5, -20], [5.8, 0, 0]);
      selectSphere("phong");
      updateSphere();
    }
    if (this.customView === "wave") {
      // Change Settings
      this.octave = 2;
      this.sustain = true;
      // Set Effects
      selectInstrument("fmsynth", 10, 0, 10, 10);
      this.volume = 85;
      // Set Color
      this.gradient = "animated";
      this.map = "reverserainbow";
      this.vintage = false;
      // Set View
      this.setView([0, 20, 45], [5.8, 0, 0]);
      selectWave("toon");
      this.autoWave = true;
      initializeWave();
    }
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
  instrument.onChange((val) => {
    selectInstrument(
      val,
      controls.reverbAmount,
      controls.chorusAmount,
      controls.phaserAmount,
      controls.vibratoAmount
    );
    renderInstrument(val);
  });

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
    scene.tone.releaseAll();
    // Make sure reverb is off
    if (!value && !!controls.reverbAmount) reverbEffect.setValue(0);
  });

  var mute = keyboardFolder.add(controls, "mute").name("Mute").listen();
  mute.onChange((value) => {
    if (value) {
      lastVolume = controls.volume;
      setVolume(scene.volume, 0);
      scene.volume.mute = true;
    } else {
      setVolume(scene.volume, lastVolume);
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
  labels.onChange((val) => {
    if (!controls.showKeyboard && val) controls.showLabels = false;
    moveKeyLabels();
  });

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
  const sphereMaterial = sphereFolder
    .add(controls, "sphereMaterial", {
      Basic: "basic",
      Toon: "toon",
      Phong: "phong",
      Mesh: "mesh",
    })
    .name("Sphere Material")
    .listen();
  sphereMaterial.onChange(() => {
    if (controls.showSphere) updateSpheres();
  });

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
  const waveMaterial = waveFolder
    .add(controls, "waveMaterial", {
      Basic: "basic",
      Toon: "toon",
      Phong: "phong",
      Mesh: "mesh",
    })
    .name("Wave Material")
    .listen();
  waveMaterial.onChange(() => {
    if (controls.showWave) initializeWave();
  });

  waveFolder.add(controls, "autoWave").name("Auto Update").listen();

  // Add folder for color settings
  const colorFolder = gui.addFolder("Color");
  colorFolder.open();

  var showColor = colorFolder
    .add(controls, "showColor")
    .name("Animate Background")
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
    setVolume(scene.volume, value);
    scene.volume.mute = !value;
    controls.mute = !value;
  });

  // Add reverb effect
  var reverbEffect = effectFolder
    .add(controls, "reverbAmount", 0, 100)
    .step(1)
    .name("Reverb")
    .listen();
  reverbEffect.onChange((value) => {
    setReverb(scene.reverb, value);
    if (value > 0 && !controls.sustain) sustain.setValue(true);
    if (controls.showSphere) updateSpheres();
    if (controls.showWave) initializeWave();
  });

  // Add chorus effect
  var chorusEffect = effectFolder
    .add(controls, "chorusAmount", 0, 100)
    .step(1)
    .name("Chorus")
    .listen();
  chorusEffect.onChange((value) => {
    setChorus(scene.chorus, value);
    if (controls.showSphere) updateSpheres();
    if (controls.showWave) initializeWave();
  });

  // Add phaser effect
  var phaserEffect = effectFolder
    .add(controls, "phaserAmount", 0, 100)
    .step(1)
    .name("Phaser")
    .listen();
  phaserEffect.onChange((value) => {
    setPhaser(scene.phaser, value);
    if (controls.showSphere) updateSpheres();
    if (controls.showWave) initializeWave();
  });

  // Add vibrato effect
  var vibratoEffect = effectFolder
    .add(controls, "vibratoAmount", 0, 100)
    .step(1)
    .name("Vibrato")
    .listen();
  vibratoEffect.onChange((value) => {
    setVibrato(scene.vibrato, value);
    if (controls.showSphere) updateSpheres();
    if (controls.showWave) initializeWave();
  });

  // Folder for custom views
  const viewFolder = gui.addFolder("View");
  viewFolder.open();

  // Custom Preset View
  viewFolder
    .add(controls, "customView", {
      "Simple Keyboard": "simple",
      "Scriabin's Piano": "scriabin",
      "Sunset FM": "sunset",
      "Nostalgic AM": "nostalgic",
      "Retro Duo": "retro",
      "Messiaen's Sphere": "sphere",
      "Cartoon Waves": "wave",
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
