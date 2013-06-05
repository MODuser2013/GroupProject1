   var gScene;
   var gCamera;
   var gRenderer;
   var paused = false;
   var updateTimer;
   var playerTexture = THREE.ImageUtils.loadTexture( 'moon.jpg' );
   var boxTexture = THREE.ImageUtils.loadTexture( 'crate.gif' );
   var boxMaterial = new THREE.MeshLambertMaterial( { map: boxTexture} )
   var player;

   var TRACK_WIDTH = 90;
   var speed = 1;
   var distance = 0;
   var obChance = .5;

   function obLine(){
       var L1 = false;
       var L2 = false;
       var L3 = false;
       var data = new THREE.Object3D();
       var distance = 0;
       function generate() {
           var a = Math.random() > obChance;
           var b = Math.random() > obChance;
           var c = Math.random() > obChance;
           while(  ( !a && !b && !c ) || (a && b && c)  ){
               a = Math.random() > obChance;
               b = Math.random() > obChance;
               c = Math.random() > obChance;
           }
           this.L1 = a;
           this.L2 = b;
           this.L3 = c;

           if(this.L1){
               var t = new THREE.Mesh(new THREE.CubeGeometry(75,125,75), boxMaterial);
               t.translateX(-TRACK_WIDTH);
               this.data.add(t);
           }
           if(this.L2){
               var t = new THREE.Mesh(new THREE.CubeGeometry(75,125,75), boxMaterial);
               t.translateX(0);
               this.data.add(t);
           }
           if(this.L3){
               var t = new THREE.Mesh(new THREE.CubeGeometry(75,125,75), boxMaterial);
               t.translateX(TRACK_WIDTH);
               this.data.add(t);
           }
       }

   }


   obLine.prototype.isCollided = function(track){
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



    var ob1 = new obLine();
    var ob2 = new obLine();
    var ob3 = new obLine();
    var ob4 = new obLine();
    var ob5 = new obLine();

   //TODO add in movement controls
   //TODO add in collision checking
   //TODO add in floor
   //TODO add in a menu and high score screen
   //TODO add obstacle spawning, score tracking and difficulty levels
   //TODO make it look cooler :D if we have time that is

function main() {

  initTHREE();  //sets up all THREE.js variables
  initScene(); //adds all objects,creates textures, creates first blocks
  updateTimer = setInterval(draw,50);
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
    pointLight.position.y = 150;
    pointLight.position.z = 100;

    // add to the scene
    scene.add(pointLight);
    gScene = scene;
    gCamera = camera;
    gRenderer = renderer;
}
function initScene() {
   gCamera.translateY(300); //move above to give perspective
   gCamera.rotation.x = -0.6;
   gCamera.translateZ(-25);


      ob1.generate();
      ob2.generate();
      ob3.generate();
      ob4.generate();
      ob5.generate();

   var playerMaterial = new THREE.MeshLambertMaterial( { map: playerTexture} )
   player = new THREE.Mesh(new THREE.SphereGeometry(40, 32, 16),playerMaterial);
   player.translateZ(25);  //moves the player back a bit
   gScene.add(player);
     ob1.data.translateX(75);
      /*ob2.data.translateZ(200);
     ob3.data.translateZ(300);
     ob4.data.translateZ(400);
     ob5.data.translateZ(500);*/
    console.log(gScene);
    gScene.add(ob1.data);
    gScene.add(ob2.data);
    gScene.add(ob3.data);
    gScene.add(ob4.data);
    gScene.add(ob5.data);
    console.log(gScene);
}
function update() {

    //test.data.translateZ(speed); //this is what brings the boxes to the player, the value can be incremented to increase difficulty
         distance+= speed;
}

 function spawnOb() {

 }

function draw() {
    if(!paused)
    {
    update();
    gRenderer.render(gScene,gCamera);
    }
}

$('body').keyup(function(e){
   if(e.which == 65 && player.position.x > -TRACK_WIDTH){  //a
       player.position.x -= TRACK_WIDTH;
   } else if(e.which == 68 && player.position.x < TRACK_WIDTH){ //d
       player.position.x += TRACK_WIDTH;
   } else if(e.which == 80){
       paused = !paused;
       $('#pauseMenu').toggle();
   }
});

