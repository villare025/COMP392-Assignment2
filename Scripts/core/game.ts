/// <reference path="_reference.ts"/>

// MAIN GAME FILE
/*
Author:                Elaine Mae Villarino (villare025)
Last Modified By:      Elaine Mae Villarino (villare025) 
Last Modified Date:    Friday, February 26th, 2016
Program Description:   With Three.js, JavaScript, and TypeScript, create a web application that displays a Solar System. 
                       The Solar System Objects will be made from Sphere Meshes.
                       GUI Controls should allow the user/overseer to:
                         >> focus on a planet.
                         >> focus on the solar system.
Revision History:      https://github.com/villare025/COMP392-Assignment2/commits/master
Last Modification:     Fix Kratos Orbit Mistype
*/

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
import ImageUtils = THREE.ImageUtils;
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

// Create Solar System Game Objects
// Sun Objects
var sunLight: PointLight;
var sun: Mesh;
var sunGeometry: SphereGeometry;
var sunMaterial: LambertMaterial;
var sunOver: Mesh;
var sunOverGeometry: SphereGeometry;
var sunOverMaterial: LambertMaterial;
// Moon Objects
var praxidice: Mesh;
// Planet Objects
var styx: Mesh;
var nike: Mesh;
var kratos: Mesh;
var zelos: Mesh;
var bia: Mesh;


// Empty Game Objects for Orbits
// Moon Orbits
var praxidiceOrbit = new Object3D();
// Planet Orbits
var styxOrbit = new Object3D();
var nikeOrbit = new Object3D();
var kratosOrbit = new Object3D();
var zelosOrbit = new Object3D();
var biaOrbit = new Object3D();

function init() {
    // Instantiate a new Scene object
    scene = new Scene();
    
    // Setup the default renderer
    setupRenderer();
	
    // Setup the Camera
    setupCamera();
	
    // Add an Axis Helper to the Scene
    axes = new AxisHelper(500);
    scene.add(axes);
    console.log("Added Axis Helper to Scene");

    ////////////////////////////////////////////////////////
    ////        Start Building the Solar System         ////
    ////////////////////////////////////////////////////////
    
    // Define the Textures
    var sunBaseTexture = THREE.ImageUtils.loadTexture('Textures/sun.jpg');
    var sunOverTexture = THREE.ImageUtils.loadTexture('Textures/cloudmap1.jpg');

    var styxBaseTexture = THREE.ImageUtils.loadTexture('Textures/planet_Bog1200.png');
    var styxOverTexture = THREE.ImageUtils.loadTexture('Textures/cloudmap2.jpg');

    var nikeBaseTexture = THREE.ImageUtils.loadTexture('Textures/pic_new1.jpg');
    var nikeOverTexture = THREE.ImageUtils.loadTexture('Textures/cloudmap3.jpg');

    var kratosBaseTexture = THREE.ImageUtils.loadTexture('Textures/scarredplanet.jpg');
    var kratosOverTexture = THREE.ImageUtils.loadTexture('Textures/cloudmap4.jpg');

    var zelosBaseTexture = THREE.ImageUtils.loadTexture('Textures/ice_planet.png');
    var zelosOverTexture = THREE.ImageUtils.loadTexture('Textures/cloudmap5.jpg');

    var biaBaseTexture = THREE.ImageUtils.loadTexture('Textures/planet-512.jpg');
    var biaOverTexture = THREE.ImageUtils.loadTexture('Textures/cloudmap6.jpg');

    var praxidiceBaseTexture = THREE.ImageUtils.loadTexture('Textures/moon.jpg');
       
       
    // Add the Life Giver - Sun
    sunGeometry = new SphereGeometry(100, 200, 200);
    sunMaterial = new LambertMaterial({ map: sunBaseTexture });
    sun = new Mesh(sunGeometry, sunMaterial);

    scene.add(sun);
    console.log("Added Sun to Scene");
    
    // Second Layer of sun
    sunOverGeometry = new SphereGeometry(101, 200, 200);
    sunOverMaterial = new LambertMaterial({ transparent: true, opacity: 0.1, map: sunOverTexture});
    sunOver = new Mesh(sunOverGeometry, sunOverMaterial);
    sun.add(sunOver);
    console.log("Added sun2 to the scene");
    
    // Add Planet 1 - Styx (Hate)
    
    styx = new gameObject(
        new SphereGeometry(20, 100, 100),
        new LambertMaterial({ color: 0x66FFCC }),
        100, 100, 200);
    styx.name = "Styx";
    
    // Add Planet 2 - Nike (Victory)    
    nike = new gameObject(
        new SphereGeometry(45, 100, 100),
        new LambertMaterial({ color: 0xCC33CC }),
        200, 100, 200);
    nike.name = "Nike";
    
    // Add Planet 3 - Kratos (Strength)
    kratos = new gameObject(
        new SphereGeometry(32, 100, 100),
        new LambertMaterial({ color: 0xFFCC33 }),
        300, 100, 200);
    kratos.name = "Kratos";
    
    // Add Planet 4 - Zelos (Rivalry)    
    zelos = new gameObject(
        new SphereGeometry(60, 100, 100),
        new LambertMaterial({ color: 0xFF99CC }),
        400, 100, 200);
    zelos.name = "Zelos";
    
    // Add Planet 5 - Bia (Force) 
    bia = new gameObject(
        new SphereGeometry(75, 100, 100),
        new LambertMaterial({ color: 0x99CC33 }),
        500, 100, 200);
    bia.name = "Bia";
    
    // Add Moon for Nike - Praxidice (Exacting Justice)
    praxidice = new gameObject(
        new SphereGeometry(8, 100, 100),
        new LambertMaterial({ color: 0x555E43 }),
        50, 25, 25);
    praxidice.name = "Praxidice";
    
    // Add Orbits to Sun 
    sun.add(styxOrbit);
    sun.add(nikeOrbit);
    sun.add(kratosOrbit);
    sun.add(zelosOrbit);
    sun.add(biaOrbit);
    
    // Add Planets to their Own Orbits
    styxOrbit.add(styx);
    console.log("Added Planet1 - Styx to Styx Orbit");
    nikeOrbit.add(nike);
    console.log("Added Planet2 - Nike to Nike Orbit");
    kratosOrbit.add(kratos);
    console.log("Added Planet3 - Kratos to Kratos Orbit");
    zelosOrbit.add(zelos);
    console.log("Added Planet4 - Zelos to Zelos Orbit");
    biaOrbit.add(bia);
    console.log("Added Planet5 - Bia to Bia Orbit");
    
    // Add Moon Praxidice Orbit to Planet Nike
    nike.add(praxidiceOrbit);
    praxidiceOrbit.add(praxidice);
    console.log("Added Praxidice Orbit to Planet Nike and Moon Praxidice to Praxidice Orbit");
    
    // Add an AmbientLight to Scene
    ambientLight = new AmbientLight(0xffffff);
    scene.add(ambientLight);
    console.log("Added an Ambient Light to Scene");
	
    // Add a PointLight to Scene as Sun's light)
    sunLight = new PointLight(0xffffff);
    sunLight.position.set(0, 0, 0);
    sunLight.castShadow = true;
    sunLight.intensity = 1;
    sunLight.shadowMapHeight = 2048;
    sunLight.shadowMapWidth = 2048;
    scene.add(sunLight);
    console.log("Added Sun Light to Scene");
 
    ////////////////////////////////////////////////////////
    ////         End Building the Solar System          ////
    ////////////////////////////////////////////////////////
    
    ////////////////////////////////////////////////////////
    //// Start Building Solar System's Overseer Control ////
    ////////////////////////////////////////////////////////
    
    // Add Scene Controls
    gui = new GUI();
    control = new Control();
    addControl(control);

    // Add Frame Rate Stats
    addStatsObject();
    console.log("Added Stats to Scene");

    document.body.appendChild(renderer.domElement);
    gameLoop(); // Render the Scene	
    
    window.addEventListener('resize', onResize, false);
    
    ////////////////////////////////////////////////////////
    ////  End Building Solar System's Overseer Control  ////
    ////////////////////////////////////////////////////////
}
// Setup GUI Controls (for the Overseer) 
function addControl(controlObject: Control): void {
    gui.add(controlObject, 'viewSun');
    gui.add(controlObject, 'viewStyx');
    gui.add(controlObject, 'viewNike');
    gui.add(controlObject, 'viewKratos');
    gui.add(controlObject, 'viewZelos');
    gui.add(controlObject, 'viewBia');
    gui.add(controlObject, 'viewSolarSystem');
    gui.add(controlObject, 'viewFarther');
}

// Setup Main Game Loop
function gameLoop(): void {
    stats.update();
    // Define Over Layers Rotation Speed 
    sunOver.rotation.x += 0.001
    sunOver.rotation.z -= 0.001
    sunOver.rotation.y += 0.005
    
    // Define Orbits Y-Rotation Speed 
    praxidiceOrbit.rotation.y += 0.05;
    styxOrbit.rotation.y += 0.05;
    nikeOrbit.rotation.y += 0.02;
    kratosOrbit.rotation.y += 0.035;
    zelosOrbit.rotation.y += 0.015;
    biaOrbit.rotation.y += 0.01;
    
    // Render using RequestAnimationFrame
    requestAnimationFrame(gameLoop);
	
    // Render the Scene
    renderer.render(scene, camera);
}

// Setup Statistics
function addStatsObject() {
    stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);
}

// Set Aspect Ratio Based on Window Size
function onResize(): void {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Setup Default Renderer
function setupRenderer(): void {
    renderer = new Renderer();
    renderer.setClearColor(0x131313, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    console.log("Finished setting up Renderer");
}

// Setup Main Camera for the Scene
function setupCamera(): void {
    camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 5000);
    camera.position.x = -1100;
    camera.position.y = 1000;
    camera.position.z = 1100;
    camera.lookAt(new Vector3(0, 0, 0));
    console.log("Finished setting up Camera");
}
