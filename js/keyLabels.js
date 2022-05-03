// Adapted from https://github.com/DeegZC/VSKeys
function initialize_labels(scene) {
  var loader = new THREE.FontLoader();
  loader.load("fonts/droid_serif_bold.typeface.json", function (font) {
    let textSettings = {
      font: font,
      size: 1.75,
      height: 0.6,
      curveSegments: 4,
      bevelEnabled: true,
      bevelThickness: 0.01,
      bevelSize: 0.05,
      bevelSegments: 3,
    };
    evenKeySpacing();
    let textMat = new THREE.MeshPhongMaterial({ color: 0x000000 });
    let key_offset = 0.29;
    let keyLabels = new THREE.Group();
    let hideableLabels = [];
    let white_keys = [
      "Z",
      "X",
      "C",
      "V",
      "B",
      "N",
      "M",
      ",",
      ".",
      "/",
      "Q",
      "W",
      "E",
      "R",
      "T",
      "Y",
      "U",
      "I",
      "O",
      "P",
      "[",
      "]",
    ];
    for (let i = 0; i < white_keys.length; i++) {
      var geometry = new THREE.TextGeometry(white_keys[i], textSettings);
      var mesh = new THREE.Mesh(geometry, textMat);
      mesh.black = false;
      mesh.scale.fromArray([0.1, 0.1, 0.1]);
      mesh.rotation.fromArray([-Math.PI / 2, 0, 0]);
      mesh.position.fromArray([3.4 + key_offset * i, -0.31, 1.2]);
      mesh.translateX(-0.21);
      if (i === 7) mesh.translateX(0.1);
      if (i === 8) mesh.translateX(0.05);
      if (i === 9) mesh.translateX(0.05);
      if (i === 11) mesh.translateX(-0.02);
      if (i === 12) mesh.translateX(0.02);
      if (i === 17) mesh.translateX(0.04);
      if (i > 18) mesh.translateX(0.05);
      if (i > white_keys.length - 3) {
        hideableLabels.push(mesh);
      }
      keyLabels.add(mesh);
    }
    textSettings.height = 0.1;
    let black_keys = [
      "S",
      "D",
      "",
      "G",
      "H",
      "J",
      "",
      "L",
      ";",
      "",
      "2",
      "3",
      "4",
      "",
      "6",
      "7",
      "",
      "9",
      "-",
      "=",
    ];
    for (let i = 0; i < black_keys.length; i++) {
      if (!black_keys[i]) {
        continue;
      }
      var geometry = new THREE.TextGeometry(black_keys[i], textSettings);
      var mesh = new THREE.Mesh(geometry, whiteText);
      mesh.black = true;
      mesh.scale.fromArray([0.1, 0.1, 0.1]);
      mesh.rotation.fromArray([-Math.PI / 2, 0, 0]);
      mesh.position.fromArray([3.4 + key_offset * i, -0.125, -0.6]);
      if (i == 9) mesh.translateX(0.05);
      keyLabels.add(mesh);
      if (i > black_keys.length - 3) {
        hideableLabels.push(mesh);
      }
    }
    scene.add(keyLabels);
    keyLabels.hideable = hideableLabels;
    scene.keyLabels = keyLabels;
  });
}

function evenKeySpacing() {
  const keySpace = 29;
  const xCenter = 0;
  let numWhite = 0;
  let numBlack = 0;
  for (let i = 0; i < keys_obj.length - 2; i++) {
    let mod = i % 12;
    if (mod == 1 || mod == 3 || mod == 6 || mod == 8 || mod == 10) {
      if (!!scene.getObjectByName("_" + i, true)) {
        scene.getObjectByName("_" + i, true).position.x =
          xCenter - 62 + keySpace * numBlack;
        numBlack++;
        if (mod == 3 || mod == 10) {
          numBlack++;
        }
      }
    } else {
      if (!!scene.getObjectByName("_" + i, true)) {
        scene.getObjectByName("_" + i, true).position.x =
          xCenter - 77 + keySpace * numWhite;
        numWhite++;
      }
    }
  }
}

function moveKeyLabels() {
  const labels = scene.keyLabels.children;
  scene.keyLabels.position.x = 2.03 * (controls.octave - 2);
  for (let i in labels) {
    const label = labels[i];
    const offsetX = scene.keyLabels.position.x + label.position.x;
    label.visible = !!controls.showLabels && offsetX < 12.6;
  }
}
