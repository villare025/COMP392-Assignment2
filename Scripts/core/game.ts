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
var sunLight: PointLight;
var sun: Mesh;
var sunGeometry: SphereGeometry;
var sunMaterial: LambertMaterial;
var praxidice: Mesh;
var styx: Mesh;
var nike: Mesh;
var kratos: Mesh;
var zelos: Mesh;
var bia: Mesh;

var praxidiceOrbit = new Object3D();
var styxOrbit = new Object3D();
var nikeOrbit = new Object3D();
var kratosOrbit = new Object3D();
var zelosOrbit = new Object3D();
var biaOrbit = new Object3D();

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
    
    styx = new gameObject(
        new SphereGeometry(20, 100, 100),
        new LambertMaterial({ color: 0x66FFCC }),
        100, 100, 200);
    styx.name = "Styx";
    
    // add planet2    
    nike = new gameObject(
        new SphereGeometry(45, 100, 100),
        new LambertMaterial({ color: 0xCC33CC }),
        200, 100, 200);
    nike.name = "Nike";
    
    // add planet3    
    kratos = new gameObject(
        new SphereGeometry(32, 100, 100),
        new LambertMaterial({ color: 0xFFCC33 }),
        300, 100, 200);
    kratos.name = "Kratos";
    
    // add planet4    
    zelos = new gameObject(
        new SphereGeometry(60, 100, 100),
        new LambertMaterial({ color: 0xFF99CC }),
        400, 100, 200);
    zelos.name = "Zelos";
    
    // add planet5    
    bia = new gameObject(
        new SphereGeometry(75, 100, 100),
        new LambertMaterial({ color: 0x99CC33 }),
        500, 100, 200);
    bia.name = "Bia";
    
    //Create moon
    praxidice = new gameObject(
        new SphereGeometry(8, 100, 100),
        new LambertMaterial({ color: 0x555E43 }),
        50, 25, 25);
    praxidice.name = "Praxidice";
    
    // Add orbits to sun 
    sun.add(styxOrbit);
    sun.add(nikeOrbit);
    sun.add(kratosOrbit);
    sun.add(zelosOrbit);
    sun.add(biaOrbit);
    
    //Add planets to their own orbits
    styxOrbit.add(styx);
    console.log("Added Planet1 - Styx to Styx Orbit...");
    nikeOrbit.add(nike);
    console.log("Added Planet2 - Nike to Nike Orbit...");
    kratos.add(kratos);
    console.log("Added Planet3 - Kratos to Kratos Orbit...");
    zelosOrbit.add(zelos);
    console.log("Added Planet4 - Zelos to Zelos Orbit...");
    biaOrbit.add(bia);
    console.log("Added Planet5 - Bia to Bia Orbit...");
    
    //Add moon rotation object to planet2
    nike.add(praxidiceOrbit);
    praxidiceOrbit.add(praxidice);
    console.log("Added Praxidice Orbit to Planet Nike and Moon Praxidice to Praxidice Orbit...");
    
    // Add an AmbientLight to the scene
    ambientLight = new AmbientLight(0xffffff);
    scene.add(ambientLight);
    console.log("Added an Ambient Light to Scene");
	
    //Add a PointLight to the scene as sun's light)
    sunLight = new PointLight(0xffffff);
    sunLight.position.set(0, 0, 0);
    sunLight.castShadow = true;
    sunLight.intensity = 1;
    sunLight.shadowMapHeight = 2048;
    sunLight.shadowMapWidth = 2048;
    scene.add(sunLight);
    console.log("Added a sunLight to the scene");
    
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
    gui.add(controlObject, 'viewStyx');
    gui.add(controlObject, 'viewNike');
    gui.add(controlObject, 'viewKratos');
    gui.add(controlObject, 'viewZelos');
    gui.add(controlObject, 'viewBia');
    gui.add(controlObject, 'viewSolarSystem');
    gui.add(controlObject, 'viewFarther');
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
    praxidiceOrbit.rotation.y += 0.05;
    styxOrbit.rotation.y += 0.05;
    nikeOrbit.rotation.y += 0.02;
    kratosOrbit.rotation.y += 0.035;
    zelosOrbit.rotation.y += 0.015;
    biaOrbit.rotation.y += 0.01;    
    requestAnimationFrame(gameLoop);
	
    // render the scene
    renderer.render(scene, camera);
}

// Setup default renderer
function setupRenderer(): void {
    renderer = new Renderer();
    renderer.setClearColor(0x131313, 1.0);
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
