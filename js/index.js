console.clear();

var renderer, scene, camera, galaxy,strokes, dots, dotStrokes, dotsMaterial, strokesMaterial;

var ww = window.innerWidth,
  wh = window.innerHeight;

var positions = [];
for (var x = 0; x < 5000; x++) {
  var pos = {
    x: Math.random(),
    y: Math.random(),
    z: Math.random(),
    lat : 2 * Math.PI * Math.random(),
    long : Math.acos(2 * Math.random() - 1)
  };
  pos.u = Math.cos(pos.long);
  pos.sqrt = Math.sqrt(1 - (pos.u*pos.u));
  positions.push(pos);
}

function Options(){
	this.radius = 200;
	this.connections = 3;
	this.distance = 30;
	this.linesOpacity = 0.3;
	this.height = 20;
	this.dots = true;
	this.amount = 3000;
	this.dotsSize = 6;
	this.dotsOpacity = 0.3;
	this.strokesColor = "#ffffff";
	this.dotsColor = "#ffffff";
	this.backgroundColor = "#000000";
}


function init() {
  
  userData = new Options(); 

  renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('canvas'),
    antialias: true,
    alpha: true
  });
  renderer.setPixelRatio(window.devicePixelRatio>1?2:1)


  renderer.setSize(ww, wh);
  renderer.setClearColor(0x000000);

  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x000000, 800, 2500);

  camera = new THREE.PerspectiveCamera(50, ww / wh, 0.1, 10000);
  camera.position.set(0, 1, 6);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  galaxy = new THREE.Object3D();
  scene.add(galaxy);
  
  //removed renderer.domElement as second parameter to allow controls for entire page, only works locally
  controls = new THREE.TrackballControls(camera);

  var loader = new THREE.TextureLoader();
  loader.crossOrigin = "";
  var loader2 = new THREE.TextureLoader();
  loader2.crossOrigin = "";
  dotTexture = loader2.load("res/dotTexture.png");
  
  dotsMaterial = new THREE.PointsMaterial({
      size: userData.dotsSize,
      map: dotTexture,
      transparent: true,
      opacity:userData.dotsOpacity,
      alphaTest: 0.1
  });
  
  strokesMaterial = new THREE.LineBasicMaterial({
    color: 0xffffff,
    transparent:true,
    opacity:userData.linesOpacity
  });
  strokes = new THREE.LineSegments(new THREE.Geometry(), strokesMaterial);
  galaxy.add(strokes);
  dotStrokes = new THREE.Points(new THREE.Geometry(), dotsMaterial);
  galaxy.add(dotStrokes);
  
  createStrokes();
  requestAnimationFrame(render);
}

var particlesRandom = [];

function createStrokes() {
  var dots = new THREE.Geometry();
  // Create vertices
  for (var i = 0; i < userData.amount; i++) {
    var pos = {
      x: (positions[i].x*userData.height + userData.radius) * positions[i].sqrt * Math.cos(positions[i].lat),
      y: (positions[i].y*userData.height + userData.radius) * positions[i].sqrt * Math.sin(positions[i].lat),
      z: (positions[i].z*userData.height + userData.radius) * positions[i].u
    };
    var vector = new THREE.Vector3(pos.x, pos.y, pos.z);
    vector.amount = 0;
    dots.vertices.push(vector);
  }
  
  // Create segments
  var segments = new THREE.Geometry();
  for(var i=dots.vertices.length-1;i>=0;i--){
    var vector = dots.vertices[i];
    for(var j=dots.vertices.length-1;j>=0;j--){
      if(vector.amount < userData.connections && i!==j && vector.distanceTo(dots.vertices[j]) < userData.distance){
        segments.vertices.push(vector);
        segments.vertices.push(dots.vertices[j]);
        vector.amount++; 
        dots.vertices[j].amount++;
      }
    }
  }
  
  strokesMaterial.opacity = userData.linesOpacity;
  strokesMaterial.color = new THREE.Color(userData.strokesColor);
  strokes.geometry = segments;
  
  if(userData.dots){
    dotsMaterial.size = userData.dotsSize;
    dotsMaterial.opacity = userData.dotsOpacity;
    dotsMaterial.color = new THREE.Color(userData.dotsColor);
    dotStrokes.geometry = dots;
    dotStrokes.geometry.verticesNeedUpdate = true;
  } else {
    dotsMaterial.opacity = 0;
  }
  
  renderer.setClearColor(new THREE.Color(userData.backgroundColor));
}

window.addEventListener("resize", onResize);

function onResize() {
  ww = window.innerWidth;
  wh = window.innerHeight;
  camera.aspect = ww / wh;
  camera.updateProjectionMatrix();
  renderer.setSize(ww, wh);
}

var render = function(a) {
  requestAnimationFrame(render);
  
  controls.update();

  renderer.render(scene, camera);
};

init();