// Create spotlight
function createSpotlight(color) {
  const light = new THREE.SpotLight(color, 2);
  light.castShadow = true;
  light.angle = 0.3;
  light.penumbra = 0.2;
  light.decay = 2;
  light.distance = 50;
  return light;
}

let targetPos = -5;
// Change spotlight
function changeSpotlight(note) {
  const hexcode = keyCode_to_color(note - 21);
  const color = controls.invertSpotlight ? invertColor(hexcode) : hexcode;

  // Random spotlights
  if (controls.spotlightDirection === "circle") {
    const spotLight = createSpotlight(color);
    let x = getRandomArbitrary(-10, 19);
    let y = getRandomArbitrary(-5, 5);
    let z = getRandomArbitrary(-10, 0);
    spotLight.position.set(x, y, z);
    spotLight.target.position.set(4.5, -0.3, 0);
    scene.add(spotLight.target);
    let lightHelper = new THREE.SpotLightHelper(spotLight);
    scene.add(lightHelper);
    scene.spotlights.push(lightHelper);
  }
  // Less random spotlights
  if (
    controls.spotlightDirection === "up" ||
    controls.spotlightDirection === "down"
  ) {
    const vertices = scene.spotlightsCircle.geometry.vertices;
    for (const v of vertices) {
      let spotLight = createSpotlight(color);
      const yOffset = controls.spotlightDirection === "up" ? -30 : 30;
      spotLight.position.set(v.x + 6, v.y + yOffset, v.z - 5);

      if (targetPos < 10) {
        spotLight.target.position.set(targetPos, targetPos, targetPos);
        targetPos += 1;
      } else {
        spotLight.target.position.set(targetPos, targetPos, targetPos);
        targetPos = 0;
      }

      scene.add(spotLight.target);
      let lightHelper = new THREE.SpotLightHelper(spotLight);
      scene.add(lightHelper);
      scene.spotlights.push(lightHelper);
    }
  }
  if (controls.spotlightDirection === "random") {
    const vertices = scene.spotlightsCircle.geometry.vertices;
    for (const v of vertices) {
      let spotLight = createSpotlight(color);
      if (targetPos < 10) {
        spotLight.target.position.set(targetPos, targetPos, targetPos);
        targetPos += 1;
      } else {
        spotLight.target.position.set(targetPos, targetPos, targetPos);
        targetPos = 0;
      }
      spotLight.position.set(v.x + 6, v.y - 10, v.z - 20);
      spotLight.position.x += Math.random() * 30 - 15;
      spotLight.position.y += Math.random() * 10 - 5;

      scene.add(spotLight.target);
      let lightHelper = new THREE.SpotLightHelper(spotLight);
      scene.add(lightHelper);
      scene.spotlights.push(lightHelper);
    }
  }
}
