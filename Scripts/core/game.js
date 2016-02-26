/// <reference path="_reference.ts"/>
// MAIN GAME FILE
// THREEJS Aliases
var Scene = THREE.Scene;
var Renderer = THREE.WebGLRenderer;
var PerspectiveCamera = THREE.PerspectiveCamera;
var BoxGeometry = THREE.BoxGeometry;
var CubeGeometry = THREE.CubeGeometry;
var PlaneGeometry = THREE.PlaneGeometry;
var SphereGeometry = THREE.SphereGeometry;
var Geometry = THREE.Geometry;
var AxisHelper = THREE.AxisHelper;
var LambertMaterial = THREE.MeshLambertMaterial;
var MeshBasicMaterial = THREE.MeshBasicMaterial;
var Material = THREE.Material;
var Mesh = THREE.Mesh;
var Object3D = THREE.Object3D;
var SpotLight = THREE.SpotLight;
var PointLight = THREE.PointLight;
var DirectionalLight = THREE.DirectionalLight;
var AmbientLight = THREE.AmbientLight;
var Control = objects.Control;
var GUI = dat.GUI;
var Color = THREE.Color;
var Vector3 = THREE.Vector3;
var Face3 = THREE.Face3;
var Point = objects.Point;
var CScreen = config.Screen;
// Custom Game Objects
var gameObject = objects.gameObject;
var scene;
var renderer;
var camera;
var axes;
var sphere;
var ambientLight;
var pointLight;
var spotLight1;
var spotLight2;
var control;
var gui;
var stats;
var step = 0;
// Solar System Game Objects
var sun;
var sunGeometry;
var sunMaterial;
var plnt1;
var plnt2;
var plnt3;
function init() {
    // Instantiate a new Scene object
    scene = new Scene();
    setupRenderer(); // setup the default renderer
    setupCamera(); // setup the camera
    // add an axis helper to the scene
    axes = new AxisHelper(500);
    scene.add(axes);
    console.log("Added Axis Helper to scene...");
    // add sun
    sunGeometry = new SphereGeometry(100, 100, 100);
    sunMaterial = new LambertMaterial({ color: 0xFF0000 });
    sun = new Mesh(sunGeometry, sunMaterial);
    scene.add(sun);
    console.log("Added Sun to scene...");
    // add planet1
    plnt1 = new gameObject(new SphereGeometry(20, 100, 100), new LambertMaterial({ color: 0x66FFCC }), 100, 100, 100);
    plnt1.name = "First planet";
    scene.add(plnt1);
    console.log("Added P1 to scene...");
    // add planet2    
    plnt2 = new gameObject(new SphereGeometry(45, 100, 100), new LambertMaterial({ color: 0xCC33CC }), 200, 200, 200);
    plnt2.name = "Second planet";
    scene.add(plnt2);
    console.log("Added P2 to scene...");
    // add planet3    
    plnt3 = new gameObject(new SphereGeometry(32, 100, 100), new LambertMaterial({ color: 0xFFCC33 }), 300, 300, 300);
    plnt3.name = "Third planet";
    scene.add(plnt3);
    console.log("Added P3 to scene...");
    // add controls
    gui = new GUI();
    control = new Control();
    addControl(control);
    // Add framerate stats
    addStatsObject();
    console.log("Added Stats to scene...");
    document.body.appendChild(renderer.domElement);
    gameLoop(); // render the scene	
    window.addEventListener('resize', onResize, false);
}
function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
function addControl(controlObject) {
}
function addStatsObject() {
    stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);
}
// Setup main game loop
function gameLoop() {
    stats.update();
    // render using requestAnimationFrame
    requestAnimationFrame(gameLoop);
    // render the scene
    renderer.render(scene, camera);
}
// Setup default renderer
function setupRenderer() {
    renderer = new Renderer();
    renderer.setClearColor(0xEEEEEE, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    console.log("Finished setting up Renderer...");
}
// Setup main camera for the scene
function setupCamera() {
    camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 5000);
    camera.position.x = -1100;
    camera.position.y = 1000;
    camera.position.z = 1100;
    camera.lookAt(new Vector3(0, 0, 0));
    console.log("Finished setting up Camera...");
}

//# sourceMappingURL=game.js.map
