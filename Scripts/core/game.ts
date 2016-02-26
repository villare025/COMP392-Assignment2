/// <reference path="_reference.ts"/>

// MAIN GAME FILE

// THREEJS Aliases
import Scene = THREE.Scene;
import Renderer = THREE.WebGLRenderer;
import PerspectiveCamera = THREE.PerspectiveCamera;
import BoxGeometry = THREE.BoxGeometry;
import CubeGeometry = THREE.CubeGeometry;
import PlaneGeometry = THREE.PlaneGeometry;
import SphereGeometry = THREE.SphereGeometry;
import Geometry = THREE.Geometry;
import AxisHelper = THREE.AxisHelper;
import LambertMaterial = THREE.MeshLambertMaterial;
import MeshBasicMaterial = THREE.MeshBasicMaterial;
import Material = THREE.Material;
import Mesh = THREE.Mesh;
import Object3D = THREE.Object3D;
import SpotLight = THREE.SpotLight;
import PointLight = THREE.PointLight;
import DirectionalLight = THREE.DirectionalLight;
import AmbientLight = THREE.AmbientLight;
import Control = objects.Control;
import GUI = dat.GUI;
import Color = THREE.Color;
import Vector3 = THREE.Vector3;
import Face3 = THREE.Face3;
import Point = objects.Point;
import CScreen = config.Screen;

// Custom Game Objects
import gameObject = objects.gameObject;

var scene: Scene;
var renderer: Renderer;
var camera: PerspectiveCamera;
var axes: AxisHelper;
var sphere: Mesh;
var ambientLight: AmbientLight;
var pointLight: PointLight;
var spotLight1: SpotLight;
var spotLight2: SpotLight;
var control: Control;
var gui: GUI;
var stats: Stats;
var step: number = 0;

// Solar System Game Objects
var sun: Mesh;
var sunGeometry: SphereGeometry;
var sunMaterial: LambertMaterial;
var moon: Mesh;
var plnt1: Mesh;
var plnt2: Mesh;
var plnt3: Mesh;
var plnt4: Mesh;
var plnt5: Mesh;

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
    
    plnt1 = new gameObject(
        new SphereGeometry(20, 100, 100),
        new LambertMaterial({ color: 0x66FFCC }),
        100, 100, 100);
    plnt1.name = "First planet";

    scene.add(plnt1);
    console.log("Added P1 to scene...");
    
    // add planet2    
    plnt2 = new gameObject(
        new SphereGeometry(45, 100, 100),
        new LambertMaterial({ color: 0xCC33CC }),
        200, 200, 200);
    plnt2.name = "Second planet";

    scene.add(plnt2);
    console.log("Added P2 to scene...");
    
    // add planet3    
    plnt3 = new gameObject(
        new SphereGeometry(32, 100, 100),
        new LambertMaterial({ color: 0xFFCC33 }),
        300, 300, 300);
    plnt3.name = "Third planet";

    scene.add(plnt3);
    console.log("Added P3 to scene...");
    
    // add planet4    
    plnt4 = new gameObject(
        new SphereGeometry(60, 100, 100),
        new LambertMaterial({ color: 0xFF99CC }),
        400, 400, 400);
    plnt4.name = "Fourth planet";

    scene.add(plnt4);
    console.log("Added P4 to scene...");
    
    // add planet5    
    plnt5 = new gameObject(
        new SphereGeometry(75, 100, 100),
        new LambertMaterial({ color: 0x99CC33 }),
        500, 500, 500);
    plnt5.name = "Fifth planet";

    scene.add(plnt5);
    console.log("Added P5 to scene...");
    
    //Create moon
    moon = new gameObject(
        new SphereGeometry(8, 100, 100),
        new LambertMaterial({ color: 0x555E43 }),
        50, 25, 25);
    moon.name = "moon";
    
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

function onResize(): void {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function addControl(controlObject: Control): void {

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
function gameLoop(): void {
    stats.update();
    // render using requestAnimationFrame

    requestAnimationFrame(gameLoop);
	
    // render the scene
    renderer.render(scene, camera);
}

// Setup default renderer
function setupRenderer(): void {
    renderer = new Renderer();
    renderer.setClearColor(0xEEEEEE, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    console.log("Finished setting up Renderer...");
}

// Setup main camera for the scene
function setupCamera(): void {
    camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 5000);
    camera.position.x = -1100;
    camera.position.y = 1000;
    camera.position.z = 1100;
    camera.lookAt(new Vector3(0, 0, 0));
    console.log("Finished setting up Camera...");
}
