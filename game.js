   var gScene;
   var gCamera;
   var gRenderer;
   var paused = false;
   var updateTimer;
   var defaultMat = new THREE.MeshLambertMaterial({color: 0xCC0000});
   var player = new THREE.Mesh(new THREE.SphereGeometry(50, 16, 16),defaultMat);

   function obLine(){}
   obLine.prototype.L1 = false;
   obLine.prototype.L2 = false;
   obLine.prototype.L3 = false;
   obLine.prototype.data = new THREE.Object3D();
   obLine.prototype.distance = 0; //the z value to provide easy access
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
   obLine.prototype.generate = function(){
       var a = Math.random() > 0.5;
       var b = Math.random() > 0.5;
       var c = Math.random() > 0.5;
       this.L1 = a;
       this.L2 = b;
       this.L3 = c;
       var placed = 0;

       if(this.L1 && placed < 2){
           var t = new THREE.Mesh(new THREE.CubeGeometry(75,125,75), defaultMat);
           t.translateX(-90);
           this.data.add(t);
           placed++;
       }
       if(this.L2 && placed < 2){
           var t = new THREE.Mesh(new THREE.CubeGeometry(75,125,75), defaultMat);
           t.translateX(0);
           this.data.add(t);
           placed++;
       }
       if(this.L3 && placed < 2){
           var t = new THREE.Mesh(new THREE.CubeGeometry(75,125,75), defaultMat);
           t.translateX(90);
           this.data.add(t);
           placed++;
       }
       if(placed < 2){
           var r = Math.random() * 3;
           var trans = 0;
           if(r < 1){trans = -90;}
           if(r > 2){trans = 90;}

           var t = new THREE.Mesh(new THREE.CubeGeometry(75,125,75), defaultMat);
           t.translateX(trans);
           this.data.add(t);
       }
   };

   var test = new obLine();



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
   player.translateZ(25);  //moves the player back a bit
   gScene.add(player);



    test.generate();
    test.data.translateZ(-100);
    gScene.add(test.data);
    console.log(test);
}
function update() {
         //updates location of all 'obstacles' objects, checks collisions, removes hidden, adds new
         test.data.translateZ(1); //this is what brings the boxes to the player, the value can be incremented to increase difficulty
}

function draw() {
    if(!paused)
    {
    update();
    gRenderer.render(gScene,gCamera);
    }
}

