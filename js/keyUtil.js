function keyCode_to_note(keyCode) {
  var note = -1;
  //-----------------------------------
  if (keyCode == 90) note = 0; // Z = C0
  if (keyCode == 83) note = 1; // S = C#0
  if (keyCode == 88) note = 2; // X = D0
  if (keyCode == 68) note = 3; // D = D#0
  if (keyCode == 67) note = 4; // C = E0
  if (keyCode == 86) note = 5; // V = F0
  if (keyCode == 71) note = 6; // G = F#0
  if (keyCode == 66) note = 7; // B = G0
  if (keyCode == 72) note = 8; // H = G#0
  if (keyCode == 78) note = 9; // N = A0
  if (keyCode == 74) note = 10; // J = A#0
  if (keyCode == 77) note = 11; // M = B0
  if (keyCode == 188) note = 12; // , = C1
  if (keyCode == 76) note = 13; // L = C#1
  if (keyCode == 190) note = 14; // . = D1
  if (keyCode == 186) note = 15; // ; = D#1
  if (keyCode == 191) note = 16; // / = E1
  //-----------------------------------
  if (keyCode == 81) note = 17; // F1
  if (keyCode == 50) note = 18; // F#1
  if (keyCode == 87) note = 19; // G1
  if (keyCode == 51) note = 20; // G#1
  if (keyCode == 69) note = 21; // A1
  if (keyCode == 52) note = 22; // A#1
  if (keyCode == 82) note = 23; // B1
  if (keyCode == 84) note = 24; // C2
  if (keyCode == 54) note = 25; // C#2
  if (keyCode == 89) note = 26; // D2
  if (keyCode == 55) note = 27; // D#2
  if (keyCode == 85) note = 28; // E2
  //-----------------------------------
  if (keyCode == 73) note = 29; // F2
  if (keyCode == 57) note = 30; // F#2
  if (keyCode == 79) note = 31; // G
  if (keyCode == 48) note = 32; // G#2
  if (keyCode == 80) note = 33; // A2
  if (keyCode == 189) note = 34; // A#2
  if (keyCode == 219) note = 35; // B2
  if (keyCode == 221) note = 36; // C3
  //-----------------------------------

  if (note == -1) return -1;
  return "_" + (note + controls.octave * 12);
}

function keyCode_to_color(note) {
  let colorMap;
  if (controls.map === "rainbow") {
    colorMap = {
      0: "#ff2000", // C
      1: "#00b3d6", // C#
      2: "#ffa600", // D
      3: "#0024b9", // D#
      4: "#ffff00", // E
      5: "#f42494", // F
      6: "#00b901", // F#
      7: "#ff7e00", // G
      8: "#007ac7", // G#
      9: "#ffcf00", // A
      10: "#8b21ba", // A#
      11: "#85ce00", // B
    };
  }
  if (controls.map === "reverserainbow") {
    colorMap = {
      0: "#ff2000", // C
      1: "#85ce00", // C#
      2: "#8b21ba", // D
      3: "#ffcf00", // D#
      4: "#007ac7", // E
      5: "#ff7e00", // F
      6: "#00b901", // F#
      7: "#f42494", // G
      8: "#ffff00", // G#
      9: "#0024b9", // A
      10: "#ffa600", // A#
      11: "#00b3d6", // B
    };
  }
  if (controls.map === "scriabin") {
    colorMap = {
      0: "#ff0000", // C
      1: "#ffccff", // C#
      2: "#ffff00", // D
      3: "#9933ff", // D#
      4: "#f0f0f0", // E
      5: "#990000", // F
      6: "#33ffff", // F#
      7: "#ff8000", // G
      8: "#ff00ff", // G#
      9: "#00ff00", // A
      10: "#808080", // Bb
      11: "#0000ff", // B
    };
  }
  if (controls.map === "mars") {
    colorMap = {
      0: "#00ffff", // C
      1: "#ffc0cb", // C#
      2: "#66ff00", // D
      3: "#8f00ff", // D#
      4: "#ffff00", // E
      5: "#007fff", // F
      6: "#ff0000", // F#
      7: "#09feab", // G
      8: "#ff00ff", // G#
      9: "#dfff00", // A
      10: "#93ccea", // Bb
      11: "#e9a447", // B
    };
  }
  if (controls.map === "messiaen") {
    colorMap = {
      0: "#ffffff", // C
      1: "#75816b", // C#
      2: "#00ff00", // D
      3: "#c0428a", // D#
      4: "#ff0000", // E
      5: "#98fb98", // F
      6: "#ffd700", // F#
      7: "#ffff00", // G
      8: "#0f52ba", // G#
      9: "#0000ff", // A
      10: "#997570", // Bb
      11: "#a0522d", // B
    };
  }
  return colorMap[note % 12];
}

// Change background color based on key pressed
function changeBackgroundColor(note) {
  const hexcode = keyCode_to_color(note - 21);
  // Single color
  document.body.style.background = "none";
  document.body.style.backgroundColor = hexcode;

  if (controls.gradient !== "single") {
    // Multiple colors
    if (Object.keys(keys_down).length > 1) {
      let gradient;
      if (controls.gradient === "conic") {
        gradient = "conic-gradient(";
      }
      if (controls.gradient === "radial" || controls.gradient === "animated") {
        gradient = "radial-gradient(circle, ";
      }

      if (controls.gradient === "random") {
        gradient = getRandom(["conic-gradient(", "radial-gradient(circle, "]);
      }

      let firstColor = [Object.keys(keys_down)[0], false];
      if (gradient === "conic-gradient(") {
        firstColor[1] = true;
      }

      for (let key in keys_down) {
        const note = keyCode_to_note(key).substring(1);
        const color = keyCode_to_color(note);
        gradient += `${color},`;
      }

      if (firstColor[1]) {
        const note = keyCode_to_note(firstColor[0]).substring(1);
        const color = keyCode_to_color(note);
        gradient += `${color},`;
      }
      gradient = gradient.slice(0, -1) + ")";

      document.body.style.background = gradient;
      if (controls.gradient === "animated") {
        document.body.style.backgroundSize = "400% 400%";
        document.body.style.animation = "gradient 10s infinite ease-in-out";
      } else {
        document.body.style.backgroundSize = "100% 100%";
        document.body.style.animation = "none";
      }
    }
  }
}