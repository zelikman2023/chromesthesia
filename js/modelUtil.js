const hideAllSpheres = () => {
  scene.sphere.visible = false;
  scene.chorusSphere.visible = false;
  scene.bigSphere.visible = false;
};
const hideSpheres = () => {
  scene.sphere.visible = false;
  scene.chorusSphere.visible = false;
};
const hideBigSphere = () => {
  scene.bigSphere.visible = false;
};
const showAllSpheres = () => {
  scene.sphere.visible = true;
  scene.chorusSphere.visible = true;
  scene.bigSphere.visible = true;
  updateSphere();
  updateChorusSphere();
  updateBigSphere();
};
const showSpheres = () => {
  scene.sphere.visible = true;
  scene.chorusSphere.visible = true;
  updateSphere();
  updateChorusSphere();
};
const showBigSphere = () => {
  scene.bigSphere.visible = true;
  updateBigSphere();
};
const hidePiano = () => {
  scene.piano.visible = false;
};
const showPiano = () => {
  scene.piano.visible = true;
};

// Update main sphere
const updateSphere = () => {
  scene.remove(scene.sphere);
  const sphere = makeSphere(5 + controls.reverbAmount / 25);

  let center = sphere.position;
  const vertices = sphere.geometry.vertices;

  for (const v of vertices) {
    let noise = getRandomArbitrary(-1, 1);
    if (controls.vibratoAmount > 0) {
      noise *= 1 + controls.vibratoAmount / 40;
    }
    let normal = v.clone().sub(center);
    normal.normalize();
    normal.multiplyScalar(noise);
    v.add(normal);
    v.x += sphereOffset;
  }
  scene.sphere = sphere;
  scene.add(sphere);
};

// Update chorused sphere
const updateChorusSphere = () => {
  scene.remove(scene.chorusSphere);
  if (!(controls.chorusAmount > 0)) return;
  const chorusSphere = makeSphere(5 + controls.reverbAmount / 25);

  let center = scene.sphere.position;
  center.x -= controls.chorusAmount / 20;
  const vertices = chorusSphere.geometry.vertices;

  for (const v of vertices) {
    let noise = getRandomArbitrary(-1, 1);
    if (controls.vibratoAmount > 0) {
      noise *= 1 + controls.vibratoAmount / 40;
    }
    let normal = v.clone().sub(center);
    normal.normalize();
    normal.multiplyScalar(noise);
    v.add(normal);
    v.x += sphereOffset;
  }
  scene.chorusSphere = chorusSphere;
  scene.add(chorusSphere);
};

// Update outer vintage sphere
const updateBigSphere = () => {
  scene.remove(scene.bigSphere);
  if (!controls.vintage) return;
  const bigSphere = makeSphere(60);
  bigSphere.material.side = THREE.BackSide;

  let center = bigSphere.position;
  const vertices = bigSphere.geometry.vertices;

  for (const v of vertices) {
    let noise = 10 * getRandomArbitrary(-1, 1);
    let normal = v.clone().sub(center);
    normal.normalize();
    normal.multiplyScalar(noise);
    v.add(normal);
  }
  scene.bigSphere = bigSphere;
  scene.add(bigSphere);
};

const updateSpheres = () => {
  updateSphere();
  updateChorusSphere();
  updateBigSphere();
};

const removeCubes = () => {
  for (const cube of scene.cubes) {
    scene.remove(cube);
  }
  scene.cubes = [];
};

const makeSphere = (radius) => {
  let geometry = new THREE.SphereGeometry(radius, 50, 70);

  let sMaterial;

  if (controls.sphereMaterial === "basic") {
    sMaterial = new THREE.MeshLambertMaterial({
      color: 0xccb4e0,
      opacity: 0.5,
    });
  }
  if (controls.sphereMaterial === "phong") {
    sMaterial = new THREE.MeshPhongMaterial({
      color: 0xff0000,
      specular: 0x0800ff,
      shininess: 100,
      flatShading: true,
    });
  }
  if (controls.sphereMaterial === "toon") {
    sMaterial = new THREE.MeshToonMaterial({
      color: 0xccb4e0,
    });
  }
  if (controls.sphereMaterial === "mesh") {
    sMaterial = new THREE.MeshBasicMaterial({
      color: 0x00000,
      wireframe: true,
    });
    geometry = new THREE.SphereGeometry(radius, 30, 30);
  }

  let sphere = new THREE.Mesh(geometry, sMaterial);
  sphere.position.set(4.5, 0, 0);
  return sphere;
};

const initializeWave = () => {
  removeCubes();
  if (!controls.showWave) return;
  for (var x = -30; x <= 30; x += 0.5) {
    for (var y = -4; y <= 4; y += 0.5) {
      var boxGeometry = new THREE.BoxGeometry(4.4, 6, 4.4);
      var boxMaterial;
      if (controls.waveMaterial === "basic") {
        boxMaterial = new THREE.MeshLambertMaterial({
          color: 0x4d7ca2,
        });
      }
      if (controls.waveMaterial === "phong") {
        boxMaterial = new THREE.MeshPhongMaterial({
          color: 0x4d7ca2,
          specular: 0x0800ff,
          shininess: 50,
          flatShading: true,
        });
      }
      if (controls.waveMaterial === "toon") {
        boxMaterial = new THREE.MeshToonMaterial({
          color: 0x4d7ca2,
        });
      }
      if (controls.waveMaterial === "mesh") {
        boxMaterial = new THREE.MeshBasicMaterial({
          color: 0x4d7ca2,
          wireframe: true,
        });
      }
      var box = new THREE.Mesh(boxGeometry, boxMaterial);

      box.position.x = 5.8 + x;
      box.position.y = 0;
      box.position.z = y;

      box.vy = 0.1;

      box.scale.y = Math.sin(box.position.x / 3 + box.position.z / 6) + 1;
      box.scale.z = Math.max(0.1, 0.05 * Math.abs(box.position.x - 5.8));

      box.scale.oldY = box.scale.y;

      scene.add(box);
      scene.cubes.push(box);
    }
  }
};
