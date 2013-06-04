   var gScene;
   var gCamera;
   var gRenderer;
   var paused = false;
   var updateTimer;
   var defaultMat = new THREE.MeshLambertMaterial({color: 0xCC0000});
   var player = new THREE.Mesh(new THREE.SphereGeometry(50, 16, 16),defaultMat);
   var obstacleLine = new THREE.Object3D();
   var obstacle = new THREE.Mesh(new THREE.CubeGeometry(75,125,75), defaultMat);
   obstacleLine.cOne = false;
   obstacleLine.cTwo = false;
   obstacleLine.cThree = false;
   obstacleLine.isCollided = new function(track){
    switch(track){
        case 0:
            return this.cOne;
        break;
        case 1:
            return this.cTwo;
        break;
        case 2:
            return this.cThree;
        break;
    }
   };
   obstacleLine.generate = new function(){
       var a = Math.random() > 0.5;
       var b = Math.random() > 0.5;
       var c = Math.random() > 0.5;
       this.cOne = a;
       this.cTwo = b;
       this.cThree = c;

       if(this.cOne){
           this.add(obstacle.clone);
       }
       if(this.cTwo){
           this.add(obstacle.clone);
       }
       if(this.cThree){
           this.add(obstacle.clone);
       }
   };
   var boxes;




function main() {

  initTHREE();  //sets up all THREE.js variables
  initScene(); //adds all objects,creates textures, creates first blocks
  updateTimer = setInterval(draw,100);
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
   gCamera.translateY(100); //move above to give perspective
  // gCamera.rotateY(); //rotate back into view
    gScene.add(player);

    //[Brandon] so yeah, this code isn't working because I still haven't gotten my head around javascript's inheritance/extending syntax. Zach, maybe you
    //could figure out whats going wrong, I can't run a .clone command on the object because the Object3D doesn't have a clone function but we need a
    //empty object to add the boxes to and this will cut out our having to have actual collision detection, everything is track based anyway so this should cut
    //down on the time needed for each update loop. my idea is that when obstacleLine.Z == player.Z then run the obstacleLine.isCollided(player.track).
    //player.track is 0-2 representing which lane it is in (obviously but I thought I'd better write it down). I'm going to continue with the 3D side so Zach or Ja
    //good luck to you! :D

    /*var test = obstacleLine;
    test.generate();
    gScene.add(test);*/
}
function update() {
         //updates location of all 'obstacles' objects, checks collisions, removes hidden, adds new

}

function draw() {
    if(!paused)
    {
    update();
    gRenderer.render(gScene,gCamera);
    }
}

