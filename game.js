   var gScene;
   var gCamera;
   var gRenderer;
   var paused = false;



function main() {

  initTHREE();  //sets up all THREE.js variables
  initScene(); //adds all objects,creates textures, creates first blocks
  while(!paused){
      draw();
  }
}

function initTHREE() {
    // set the scene size
    var WIDTH = $("#canvas").width(),
        HEIGHT = $("#canvas").height();

    // set some camera attributes
    var VIEW_ANGLE = 45,
        ASPECT = WIDTH / HEIGHT,
        NEAR = 0.1,
        FAR = 10000;

    // get the DOM element to attach to
    // - assume we've got jQuery to hand
    var $container =$('#canvas');

    // create a WebGL renderer, camera
    // and a scene
    var renderer = new THREE.WebGLRenderer();
    var camera = new THREE.PerspectiveCamera(  VIEW_ANGLE,
        ASPECT,
        NEAR,
        FAR  );
    var scene = new THREE.Scene();

    // the camera starts at 0,0,0 so pull it back
    camera.position.z = 300;

    // start the renderer
    renderer.setSize(WIDTH, HEIGHT);

    // attach the render-supplied DOM element
    $container.append(renderer.domElement);
    scene.add(camera);

    // create a point light
    var pointLight = new THREE.PointLight( 0xFFFFFF );

    // set its position
    pointLight.position.x = 10;
    pointLight.position.y = 50;
    pointLight.position.z = 100;

    // add to the scene
    scene.add(pointLight);
    gScene = scene;
    gCamera = camera;
    gRenderer = renderer;
}
function initScene() {
    // create the sphere's material
    var sphereMaterial = new THREE.MeshLambertMaterial(
        {
            color: 0xCC0000
        });
    var sphere = new THREE.Mesh(
        new THREE.SphereGeometry(50, 16, 16),
        sphereMaterial);
    gScene.add(sphere);
}
function update() {
         //updates location of all 'obstacles' objects, checks collisions, removes hidden, adds new
}

function draw() {
    update();
    gRenderer.render(gScene,gCamera);
    paused=true;      //used to not crash until delay is added
    //delay here, need to vary it based on time between calls to keep a solid fps (45?)
}

