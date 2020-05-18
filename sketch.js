var treximage, trexcollidedimage, trex, groundimage, ground, invisibleground,Cloudimage,CloudGroup,ObstacleGroup,ob1,ob2,ob3,ob4,ob5,ob6,gameState = "play",count;



function preload (){
treximage = loadAnimation ("trex1.png", "trex3.png", "trex4.png");  
  
  trexcollidedimage = loadAnimation("trex_collided.png");
  groundimage = loadImage("ground2.png")
  Cloudimage = loadImage("cloud.png");
ob1 =  loadImage("obstacle1.png");
  ob2 = loadImage("obstacle2.png");
ob3 =  loadImage("obstacle3.png");
  ob4 = loadImage("obstacle4.png");
ob5 =  loadImage("obstacle5.png");
  ob6 = loadImage("obstacle6.png");
  
  
}





function setup() {
  createCanvas(600,300);
trex = createSprite(50,250,2,2);
trex.addAnimation("running", treximage)
  trex.addAnimation("collided",trexcollidedimage)
ground = createSprite(200,280,1,1);  
ground.addImage(groundimage)
trex.scale = 0.75;
ground.velocityX = -8;
invisibleground = createSprite(200,290,400,5);
invisibleground.visible = false;
CloudGroup = new Group();
ObstacleGroup = new Group();

}






function draw() {
  background(20);

    
  if (gameState === "play") {
  
     count = frameCount;
  
text("score:" + count,400,200);     
    
    ObstacleGroup.setLifetimeEach = 250;
    
        CloudGroup.setLifetimeEach = 234;
    
if (keyDown("space") && trex.collide(invisibleground)){
 trex.velocityY = -15;
}
  
 if (ground.x < 0){
  ground.x = ground.width/2;
}

  spawnClouds();
 
  spawnObstacles();
  

  if (ObstacleGroup.isTouching(trex)) {
      gameState = "end";
      }
    
  }
  
  
else if (gameState === "end") {

  textSize(40);
  text("score:" + count,300,200)
  
  
CloudGroup.setVelocityXEach(0);

ground.velocityX = 0;
  
  ObstacleGroup.setVelocityXEach(0);
  
  trex.changeAnimation("collided", trexcollidedimage);
}
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
trex.velocityY = trex.velocityY + 0.8

  trex.collide(invisibleground);
  

  drawSprites();
}


function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,220,40,10);
    cloud.y = random(180,220);
    cloud.addImage(Cloudimage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    CloudGroup.add(cloud); 
     //assign lifetime to the variable

    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
  }
  
}


function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,265,10,40);
    obstacle.velocityX = -8;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
   
   switch(rand) {
   
     case 1: obstacle.addImage(ob1);
             break;
             
    case 2: obstacle.addImage(ob2)
             break;
       
    case 3: obstacle.addImage(ob3);
             break;
             
    case 4: obstacle.addImage(ob4)
             break;    
             
     case 5: obstacle.addImage(ob5);
             break;
             
    case 6: obstacle.addImage(ob6)
             break;         
      
    default : break;         
             
   } 
    
    
    ObstacleGroup.add(obstacle);
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
   
  }
}




