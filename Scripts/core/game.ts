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
Last Modification:     Added Sun's Fake Gases as a Pseudo Asteroid
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
var sunFakeGas1: Mesh;
var sunFakeGas1Geometry: SphereGeometry;
var sunFakeGas1Material: LambertMaterial;
var sunFakeGas2: Mesh;
var sunFakeGas2Geometry: SphereGeometry;
var sunFakeGas2Material: LambertMaterial;
// Moon Objects
var praxidice: Mesh;
var ioke: Mesh;
var hormes: Mesh;
// Planet Objects
var styx: Mesh;
var styxOver: Mesh;
var styxOverGeometry: SphereGeometry;
var styxOverMaterial: LambertMaterial;
var nike: Mesh;
var nikeOver: Mesh;
var nikeOverGeometry: SphereGeometry;
var nikeOverMaterial: LambertMaterial;
var kratos: Mesh;
var kratosOver: Mesh;
var kratosOverGeometry: SphereGeometry;
var kratosOverMaterial: LambertMaterial;
var zelos: Mesh;
var zelosOver: Mesh;
var zelosOverGeometry: SphereGeometry;
var zelosOverMaterial: LambertMaterial;
var bia: Mesh;
var biaOver: Mesh;
var biaOverGeometry: SphereGeometry;
var biaOverMaterial: LambertMaterial;
var alala: Mesh;
var alalaOver: Mesh;
var alalaOverGeometry: SphereGeometry;
var alalaOverMaterial: LambertMaterial;

// Empty Game Objects for Orbits
// Moon Orbits
var praxidiceOrbit = new Object3D();
var iokeOrbit = new Object3D();
var hormesOrbit = new Object3D();
// Planet Orbits
var styxOrbit = new Object3D();
var nikeOrbit = new Object3D();
var kratosOrbit = new Object3D();
var zelosOrbit = new Object3D();
var biaOrbit = new Object3D();
var alalaOrbit = new Object3D();

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

    var alalaBaseTexture = THREE.ImageUtils.loadTexture('Textures/planet-alala.jpg');
    var alalaOverTexture = THREE.ImageUtils.loadTexture('Textures/cloudmap2.jpg');

    var praxidiceBaseTexture = THREE.ImageUtils.loadTexture('Textures/moon.jpg');
    var iokeBaseTexture = THREE.ImageUtils.loadTexture('Textures/moon.jpg');
    var hormesBaseTexture = THREE.ImageUtils.loadTexture('Textures/moon.jpg');
       
       
    // Add the Life Giver - Sun
    sunGeometry = new SphereGeometry(100, 200, 200);
    sunMaterial = new LambertMaterial({ map: sunBaseTexture });
    sun = new Mesh(sunGeometry, sunMaterial);

    scene.add(sun);
    console.log("Added Sun to Scene");
    
    // Add Sun Over Layer
    sunOverGeometry = new SphereGeometry(101, 200, 200);
    sunOverMaterial = new LambertMaterial({ transparent: true, opacity: 0.1, map: sunOverTexture});
    sunOver = new Mesh(sunOverGeometry, sunOverMaterial);
    sun.add(sunOver);
    console.log("Added Sun Over Layer to Scene");
    
    // Add Sun Fake Gas Layer 1
    sunFakeGas1Geometry = new SphereGeometry(150, 200, 200);
    sunFakeGas1Material = new LambertMaterial({ transparent: true, opacity: 0.1, map: styxOverTexture});
    sunFakeGas1 = new Mesh(sunFakeGas1Geometry, sunFakeGas1Material);
    sun.add(sunFakeGas1);
    console.log("Added Sun Fake Gas Layer 1 to Scene");
    
    // Add Sun Fake Gas Layer 2
    sunFakeGas2Geometry = new SphereGeometry(190, 200, 200);
    sunFakeGas2Material = new LambertMaterial({ transparent: true, opacity: 0.1, map: kratosOverTexture});
    sunFakeGas2 = new Mesh(sunFakeGas2Geometry, sunFakeGas2Material);
    sun.add(sunFakeGas2);
    console.log("Added Sun Fake Gas Layer 2 to Scene");
    
    // Add Planet 1 - Styx (Hate)
    
    styx = new gameObject(
        new SphereGeometry(20, 100, 100),
        new LambertMaterial({  map: styxBaseTexture }),
        100, 100, 200);
    styx.name = "Styx";
    
    // Add Planet 1 - Styx Over Layer
    styxOverGeometry = new SphereGeometry(21, 100, 100);
    styxOverMaterial = new LambertMaterial({ transparent: true, opacity: 0.1, map: styxOverTexture});
    styxOver = new Mesh(styxOverGeometry, styxOverMaterial);
    styx.add(styxOver);
    console.log("Added Styx Over Layer to Scene");
    
    // Add Planet 2 - Nike (Victory)    
    nike = new gameObject(
        new SphereGeometry(45, 100, 100),
        new LambertMaterial({  map: nikeBaseTexture }),
        300, 100, 200);
    nike.name = "Nike";
    
    // Add Planet 2 - Nike Over Layer
    nikeOverGeometry = new SphereGeometry(101, 200, 200);
    nikeOverMaterial = new LambertMaterial({ transparent: true, opacity: 0.1, map: nikeOverTexture});
    nikeOver = new Mesh(nikeOverGeometry, nikeOverMaterial);
    nike.add(nikeOver);
    console.log("Added Nike Over Layer to Scene");
    
    // Add Planet 3 - Kratos (Strength)
    kratos = new gameObject(
        new SphereGeometry(32, 100, 100),
        new LambertMaterial({  map: kratosBaseTexture }),
        500, 100, 200);
    kratos.name = "Kratos";
    
    // Add Planet 3 - Kratos Over Layer
    kratosOverGeometry = new SphereGeometry(33, 100, 100);
    kratosOverMaterial = new LambertMaterial({ transparent: true, opacity: 0.1, map: kratosOverTexture});
    kratosOver = new Mesh(kratosOverGeometry, kratosOverMaterial);
    kratos.add(kratosOver);
    console.log("Added Kratos Over Layer to Scene");
    
    // Add Planet 4 - Zelos (Rivalry)    
    zelos = new gameObject(
        new SphereGeometry(60, 100, 100),
        new LambertMaterial({  map: zelosBaseTexture }),
        600, 100, 200);
    zelos.name = "Zelos";
    
    // Add Planet 4 - Zelos Over Layer
    zelosOverGeometry = new SphereGeometry(61, 100, 100);
    zelosOverMaterial = new LambertMaterial({ transparent: true, opacity: 0.1, map: zelosOverTexture});
    zelosOver = new Mesh(zelosOverGeometry, zelosOverMaterial);
    zelos.add(zelosOver);
    console.log("Added Zelos Over Layer to Scene");
    
    // Add Planet 5 - Bia (Force) 
    bia = new gameObject(
        new SphereGeometry(75, 100, 100),
        new LambertMaterial({  map: biaBaseTexture }),
        800, 100, 200);
    bia.name = "Bia";
    
    // Add Planet 5 - Bia Over Layer
    biaOverGeometry = new SphereGeometry(76, 100, 100);
    biaOverMaterial = new LambertMaterial({ transparent: true, opacity: 0.1, map: biaOverTexture});
    biaOver = new Mesh(biaOverGeometry, biaOverMaterial);
    bia.add(biaOver);
    console.log("Added Bia Over Layer to Scene");
    
    // Add Planet 6 - Alala (Battle-Cry) 
    alala = new gameObject(
        new SphereGeometry(85, 100, 100),
        new LambertMaterial({  map: alalaBaseTexture }),
        1000, 100, 200);
    alala.name = "Alala";
    
    // Add Planet 6 - Alala Over Layer
    alalaOverGeometry = new SphereGeometry(96, 100, 100);
    alalaOverMaterial = new LambertMaterial({ transparent: true, opacity: 0.1, map: alalaOverTexture});
    alalaOver = new Mesh(alalaOverGeometry, alalaOverMaterial);
    alala.add(alalaOver);
    console.log("Added Alala Over Layer to Scene");
    
    // Add Moon for Nike - Praxidice (Exacting Justice)
    praxidice = new gameObject(
        new SphereGeometry(8, 100, 100),
        new LambertMaterial({  map: praxidiceBaseTexture }),
        50, 25, 25);
    praxidice.name = "Praxidice";
    
    // Add Moon for Alala - Ioke (Onslaught)
    ioke = new gameObject(
        new SphereGeometry(8, 100, 100),
        new LambertMaterial({  map: iokeBaseTexture }),
        100, 25, 25);
    ioke.name = "Ioke";
    
    // Add Moon for Alala - Hormes (Effort)
    hormes = new gameObject(
        new SphereGeometry(35, 100, 100),
        new LambertMaterial({  map: hormesBaseTexture }),
        250, 25, 10);
    hormes.name = "Hormes";
    
    
    // Add Orbits to Sun 
    sun.add(styxOrbit);
    sun.add(nikeOrbit);
    sun.add(kratosOrbit);
    sun.add(zelosOrbit);
    sun.add(biaOrbit);
    sun.add(alalaOrbit);
    
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
    alalaOrbit.add(alala);
    console.log("Added Planet6 - Alala to Alala Orbit");
    
    // Add Moon Praxidice Orbit to Planet Nike
    nike.add(praxidiceOrbit);
    praxidiceOrbit.add(praxidice);
    console.log("Added Praxidice Orbit to Planet Nike and Moon Praxidice to Praxidice Orbit");
    
    // Add Moon Ioke Orbit to Planet Alala
    alala.add(iokeOrbit);
    iokeOrbit.add(ioke);
    console.log("Added Ioke Orbit to Planet Alala and Moon Ioke to Ioke Orbit");
    
    // Add Moon Hormes Orbit to Planet Alala
    alala.add(hormesOrbit);
    hormesOrbit.add(hormes);
    console.log("Added Hormes Orbit to Planet Alala and Moon Hormes to Hormes Orbit");
    
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
    gui.add(controlObject, 'viewAlala');
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
    
    sunFakeGas1.rotation.x -= 0.001
    sunFakeGas1.rotation.z += 0.001
    sunFakeGas1.rotation.y -= 0.005
    
    sunFakeGas2.rotation.x -= 0.009
    sunFakeGas2.rotation.z += 0.008
    sunFakeGas2.rotation.y += 0.006
    
    styxOver.rotation.x += 0.002
    styxOver.rotation.z -= 0.003
    styxOver.rotation.y += 0.004
    
    nikeOver.rotation.x += 0.003
    nikeOver.rotation.z -= 0.002
    nikeOver.rotation.y += 0.001
    
    kratosOver.rotation.x += 0.004
    kratosOver.rotation.z -= 0.004
    kratosOver.rotation.y += 0.002
    
    zelosOver.rotation.x += 0.0025
    zelosOver.rotation.z -= 0.0015
    zelosOver.rotation.y += 0.0045
    
    biaOver.rotation.x += 0.0035
    biaOver.rotation.z -= 0.0018
    biaOver.rotation.y += 0.0054
    
    alalaOver.rotation.x += 0.0012
    alalaOver.rotation.z -= 0.0008
    alalaOver.rotation.y += 0.0024
    
    // Define Orbits Y-Rotation Speed 
    praxidiceOrbit.rotation.y += 0.05;
    iokeOrbit.rotation.y += 0.07;
    hormesOrbit.rotation.y += 0.08;
    styxOrbit.rotation.y += 0.05;
    nikeOrbit.rotation.y += 0.02;
    kratosOrbit.rotation.y += 0.035;
    zelosOrbit.rotation.y += 0.015;
    biaOrbit.rotation.y += 0.01;
    alalaOrbit.rotation.y += 0.008;
    
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
