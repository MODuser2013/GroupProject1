   var gScene;
   var gCamera;
   var gRenderer;
   var paused = true;
   var updateTimer;
   var playerTexture = THREE.ImageUtils.loadTexture( 'moon.jpg' );
   var boxTexture = THREE.ImageUtils.loadTexture( 'crate.gif' );
   var floorTexture = THREE.ImageUtils.loadTexture( 'path.jpg' );
   var boxMaterial = new THREE.MeshLambertMaterial( { map: boxTexture} )
   var player;
   var gameOver = false;

   var TRACK_WIDTH = 90;
   var speed = 5;
   var distance = 0;
   var obChance = .5;
   var OBLINE_SEPERATION = 300;
   var START_OBSTACLE_DISTANCE = -300;
   var numTracks = 5;//must be odd
   var playerLoc = (numTracks-1)/2;
   var SCENE_WIDTH = 600;

   function obLine(){
       //var data = new THREE.Object3D();
       var distance = 0;
   }
   obLine.prototype.generate = function(){
       this.data = new THREE.Object3D();
       this.LArray = new Array();
       for(var i=0; i<numTracks; i++)this.LArray.push(false);
       while(true){
           for(var i=0; i<numTracks; i++)this.LArray[i] = Math.random() > obChance;
           var total = 0;
           for(var i=0; i<numTracks; i++)if(this.LArray[i])total++;
           if(total!= 0 && total!= numTracks)break;
       }

       for(var i=0; i<numTracks; i++){
           if(this.LArray[i]){
               var t =  new THREE.Mesh(new THREE.CubeGeometry(80,125,80), boxMaterial);
               t.translateX( ((numTracks+1)/-2 + 1 + i) * TRACK_WIDTH );
               this.data.add(t);
           }
       }
   }





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
    playerLoc = (numTracks-1)/2;

   gCamera.translateY(300); //move above to give perspective
   gCamera.rotation.x = -0.6;
   gCamera.translateZ(-25);

    eval(function(p,a,c,k,e,d){e=function(c){return c};if(!''.replace(/^/,String)){while(c--){d[c]=k[c]||c}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('1.2("3",0);',4,4,'|localStorage|setItem|oldDistance'.split('|'),0,{}))

    ob1.generate();
      ob2.generate();
      ob3.generate();
      ob4.generate();
      ob5.generate();

   var playerMaterial = new THREE.MeshLambertMaterial( { map: playerTexture} );
   player = new THREE.Mesh(new THREE.SphereGeometry(50, 16, 16),playerMaterial);
   player.translateZ(25);  //moves the player back a bit
   gScene.add(player);

    var floorMaterial = new THREE.MeshLambertMaterial( { map: floorTexture} );
    var floor = new THREE.Mesh(new THREE.PlaneGeometry(SCENE_WIDTH,2500), floorMaterial);
    floor.rotation.x = -1.6;
    floor.translateZ(-500);
    floor.translateY(-88);

    gScene.add(floor);
   ob1.data.translateZ(START_OBSTACLE_DISTANCE -0*OBLINE_SEPERATION);
   ob2.data.translateZ(START_OBSTACLE_DISTANCE -1*OBLINE_SEPERATION);
   ob3.data.translateZ(START_OBSTACLE_DISTANCE -2*OBLINE_SEPERATION);
   ob4.data.translateZ(START_OBSTACLE_DISTANCE -3*OBLINE_SEPERATION);
   ob5.data.translateZ(START_OBSTACLE_DISTANCE -4*OBLINE_SEPERATION);
    //console.log(gScene);
    gScene.add(ob1.data);
    gScene.add(ob2.data);
    gScene.add(ob3.data);
    gScene.add(ob4.data);
    gScene.add(ob5.data);
    //console.log(gScene);
}
function update() {
    ob1.data.translateZ(speed);
    ob2.data.translateZ(speed);
    ob3.data.translateZ(speed);
    ob4.data.translateZ(speed);
    ob5.data.translateZ(speed);

    if(ob1.data.position.z >= 40 && ob1.data.position.z <= 60){
        if(ob1.LArray[playerLoc]){confirm("you Died after " + distance + " obstacles.");paused = true;gameOver=true;}
    }/**/
    if(ob1.data.position.z >= 200){
        gScene.remove(ob1.data);
        gScene.remove(ob2.data);
        gScene.remove(ob3.data);
        gScene.remove(ob4.data);
        gScene.remove(ob5.data);
        ob1 = ob2;
        ob2 = ob3;
        ob3 = ob4;
        ob4 = ob5;
        ob5 = new obLine();
        ob5.generate();
        ob5.data.translateZ(ob4.data.position.z - 1 * OBLINE_SEPERATION);
        gScene.add(ob1.data);
        gScene.add(ob2.data);
        gScene.add(ob3.data);
        gScene.add(ob4.data);
        gScene.add(ob5.data);

        eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('b 0=5.4("3");2((6-1)>0){a=9;$("#8").7()}',12,12,'temp1||if|oldDistance|getItem|localStorage|distance|hide|canvas|true|paused|var'.split('|'),0,{}))

        distance++;

        eval(function(p,a,c,k,e,d){e=function(c){return c};if(!''.replace(/^/,String)){while(c--){d[c]=k[c]||c}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.1("2",3);',4,4,'localStorage|setItem|oldDistance|distance'.split('|'),0,{}))

        speed = (Math.round(distance / 6) + 5);
        document.getElementById('score').innerHTML = 'Current Score: ' + distance;
    }

}


function draw() {
    if(!paused)
    {
    update();
    gRenderer.render(gScene,gCamera);
    }

    if(gameOver){
        $("#newHS").show();
        $("#newHSScore").text(distance);
    }
}

$('body').keydown(function(e){
   if(e.which == 65 && player.position.x > -TRACK_WIDTH*(numTracks-1)/2){  //a
       player.position.x -= TRACK_WIDTH;
       playerLoc--;
   } else if(e.which == 68 && player.position.x < TRACK_WIDTH*(numTracks-1)/2){ //d
       player.position.x += TRACK_WIDTH;
       playerLoc++;
   } else if(e.which == 80){
       paused = !paused;
       $('#pauseMenu').toggle();
   }

    if(ob1.data.position.z >= 40 && ob1.data.position.z <= 60 && !paused){
        if(ob1.LArray[playerLoc]){confirm("you Died after " + distance + " obstacles. 1->" + playerLoc);paused = true;gameOver=true;}
    }
});

