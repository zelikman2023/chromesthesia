const createPianoTone = () =>
  new Tone.Sampler({
    urls: {
      C2: "C2.mp3",
      Db2: "Db2.mp3",
      D2: "D2.mp3",
      Eb2: "Eb2.mp3",
      E2: "E2.mp3",
      F2: "F2.mp3",
      Gb2: "Gb2.mp3",
      G2: "G2.mp3",
      Ab2: "Ab2.mp3",
      A2: "A2.mp3",
      Bb2: "Bb2.mp3",
      B2: "B2.mp3",
      C3: "C3.mp3",
      Db3: "Db3.mp3",
      D3: "D3.mp3",
      Eb3: "Eb3.mp3",
      E3: "E3.mp3",
      F3: "F3.mp3",
      Gb3: "Gb3.mp3",
      G3: "G3.mp3",
      Ab3: "Ab3.mp3",
      A3: "A3.mp3",
      Bb3: "Bb3.mp3",
      B3: "B3.mp3",
      C4: "C4.mp3",
      Db4: "Db4.mp3",
      D4: "D4.mp3",
      Eb4: "Eb4.mp3",
      E4: "E4.mp3",
      F4: "F4.mp3",
      Gb4: "Gb4.mp3",
      G4: "G4.mp3",
      Ab4: "Ab4.mp3",
      A4: "A4.mp3",
      Bb4: "Bb4.mp3",
      B4: "B4.mp3",
      C5: "C5.mp3",
      Db5: "Db5.mp3",
      D5: "D5.mp3",
      Eb5: "Eb5.mp3",
      E5: "E5.mp3",
      F5: "F5.mp3",
      Gb5: "Gb5.mp3",
      G5: "G5.mp3",
      Ab5: "Ab5.mp3",
      A5: "A5.mp3",
      Bb5: "Bb5.mp3",
      B5: "B5.mp3",
    },
    baseUrl: "soundfont/acoustic_grand_piano-mp3/",
    onload: () => {
      console.log("Loaded piano!");
    },
  });

const createAMTone = () => new Tone.AMSynth();
const createFMTone = () => new Tone.FMSynth();
const createDuoTone = () => new Tone.DuoSynth();

const createReverb = (val = 0.1) => {
  const reverb = new Tone.Reverb(val);
  reverb.wet.value = 0;
  return reverb;
};

const setReverb = (reverb, value) => {
  if (value > 0) {
    reverb.decay = value / 10;
  }
  reverb.wet.value = !!value ? 1 : 0;
  controls.reverbAmount = value;
};

const createChorus = (val = 0.1) => {
  const chorus = new Tone.Chorus(val).start();
  chorus.wet.value = 0;
  return chorus;
};

const setChorus = (chorus, value) => {
  if (value > 0) {
    chorus.frequency.value = value / 50;
  }
  chorus.wet.value = !!value ? 1 : 0;
  controls.chorusAmount = value;
};

const createPhaser = (val = 0.1) => {
  const phaser = new Tone.Phaser(val);
  phaser.wet.value = 0;
  return phaser;
};

const setPhaser = (phaser, value) => {
  if (value > 0) {
    phaser.frequency.value = value / 10;
  }
  phaser.wet.value = !!value ? 1 : 0;
  !!value ? scene.oscClock.start() : scene.oscClock.stop();
  controls.phaserAmount = value;
};

const createVibrato = (val = 0.1) => {
  const vibrato = new Tone.Vibrato(val);
  vibrato.wet.value = 0;
  return vibrato;
};

const setVibrato = (vibrato, value) => {
  if (value > 0) {
    vibrato.frequency.value = value / 5;
  }
  vibrato.wet.value = !!value ? 1 : 0;
  controls.vibratoAmount = value;
};

const createVolume = (val = 0) => new Tone.Volume(val);

const setVolume = (volume, value) => {
  volume.volume.value = value / 2 - 50;
  controls.volume = value;
};

const initializeEffects = (r = 0, c = 0, p = 0, v = 0, on = true) => {
  scene.reverb = createReverb();
  scene.chorus = createChorus();
  scene.phaser = createPhaser();
  scene.vibrato = createVibrato();
  scene.volume = createVolume();
  if (on) {
    setReverb(scene.reverb, r);
    setChorus(scene.chorus, c);
    setPhaser(scene.phaser, p);
    setVibrato(scene.vibrato, v);
    setVolume(scene.volume, 100);
  }
  scene.tone.chain(
    scene.reverb,
    scene.chorus,
    scene.phaser,
    scene.vibrato,
    scene.volume,
    Tone.Master
  );
};

const selectInstrument = (value, reverb, chorus, phaser, vibrato) => {
  scene.tone.releaseAll();
  scene.tone.dispose();
  if (value === "keyboard") {
    scene.tone = createPianoTone();
    scene.tone.volume.value = 0;
  }
  if (value === "amsynth") {
    scene.tone = new Tone.PolySynth(Tone.AMSynth, 6);
    scene.tone.volume.value = -16;
  }
  if (value === "fmsynth") {
    scene.tone = new Tone.PolySynth(Tone.FMSynth, 6);
    scene.tone.volume.value = -20;
  }
  if (value === "duosynth") {
    scene.tone = new Tone.PolySynth(Tone.DuoSynth, 1);
    scene.tone.volume.value = -24;
  }
  controls.instrument = value;
  initializeEffects(reverb, chorus, phaser, vibrato);
};

const renderInstrument = (value) => {
  let blackColor;
  let whiteColor;
  if (value === "keyboard") {
    blackColor = new THREE.Color("#000000");
    whiteColor = new THREE.Color("#ffffff");
  }
  if (value === "amsynth") {
    blackColor = new THREE.Color("#ff0000");
    whiteColor = new THREE.Color("#c9fbff");
  }
  if (value === "fmsynth") {
    blackColor = new THREE.Color("#8f013a");
    whiteColor = new THREE.Color("#f7d8a1");
  }
  if (value === "duosynth") {
    blackColor = new THREE.Color("#382301");
    whiteColor = new THREE.Color("#b09364");
  }
  for (let i = 0; i < 81; i++) {
    let x = i % 12;
    if (scene.piano.children[i].material) {
      if (x == 1 || x == 3 || x == 6 || x == 8 || x == 10) {
        scene.piano.children[i].material.color = blackColor;
      } else {
        scene.piano.children[i].material.color = whiteColor;
      }
    }
  }
  loader.load("obj/piano.dae", prepare_scene);
};
