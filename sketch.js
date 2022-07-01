var bg, bgImg;
var player, shooterImg, shooter_shooting;
var gameState = "play"
var bullet 
var score = 0
var life = 3
function preload() {

  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  zombieImg = loadImage("assets/zombie.png")
  bgImg = loadImage("assets/bg.jpeg")
heart_third = loadImage("assets/heart_3.png")
heart_second = loadImage("assets/heart_2.png")
heart_first = loadImage("assets/heart_1.png")

}

function setup() {


  createCanvas(windowWidth, windowHeight);

  //adding the background image
  bg = createSprite(displayWidth / 2 - 20, displayHeight / 2 - 40, 20, 20)
  bg.addImage(bgImg)
  bg.scale = 1.1

  //creating the player sprite
  player = createSprite(displayWidth - 1150, displayHeight - 300, 50, 50);
  player.addImage(shooterImg)
  player.scale = 0.3
  player.debug = true
  player.setCollider("rectangle", 0, 0, 150, 150)

  zombieGroup = new Group()
  bulletGroup = new Group()

  heart = createSprite(150,60)
  heart.addAnimation("heart3",heart_third)
  heart.addAnimation("heart2",heart_second)
  heart.addAnimation("heart1",heart_first)
  heart.changeAnimation("heart3",heart_third)

  heart.scale = 0.2
}

function draw() {
  background(0);

  if (gameState == "play") {

    //console.log(player.x)

    //moving the player up and down and making the game mobile compatible using touches
    if (keyDown("UP_ARROW") || touches.length > 0) {
      player.y = player.y - 10
    }
    if (keyDown("DOWN_ARROW") || touches.length > 0) {
      player.y = player.y + 10
    }

    if (keyDown("LEFT_ARROW") || touches.length > 0) {
      player.x = player.x - 10
    }


    if (keyDown("RIGHT_ARROW") || touches.length > 0) {
      player.x = player.x + 10
    }

    //release bullets and change the image of shooter to shooting position when space is pressed
    if (keyWentDown("space")) {

      player.addImage(shooter_shooting)
      shootBullet()

    }
    //player goes back to original standing image once we stop pressing the space bar
    else if (keyWentUp("space")) {
      player.addImage(shooterImg)
    }
    spawnZombies()

   // if(zombieGroup.isTouching(bulletGroup)){
      for(var i=0;i<zombieGroup.length;i++){     
          
       if(zombieGroup[i].isTouching(bulletGroup)){
            zombieGroup[i].destroy()
            bulletGroup.destroyEach()
            
     
            score = score+1
            } 
      
      }
   // }

      if (zombieGroup.isTouching(player)) {
        console.log(life)
        life = life-1
        lifeline()
       }
       if (life == 0){
        gameState = "end"
       }
      drawSprites();

    }
else if (gameState == "end") {
      zombieGroup.setVelocityXEach(0);
      fill("red")
      textSize(70)
      text("GAME END", displayWidth / 2 - 150, displayHeight / 2 - 100)

    }
    fill("red")
    textSize(25)
    text("SCORE :"+score, displayWidth  - 250,50)

  }
  // line no 92 or 90 in p5 changes
  function spawnZombies() {
    //write code here to spawn the clouds
    if (frameCount % 120 === 0) {
      zombie = createSprite(windowWidth, 100, 40, 10);
      zombie.debug = true
      zombie.setCollider("rectangle", 0, 0, 60, 900)

      zombie.y = Math.round(random(50, displayHeight - 50));
      zombie.addImage(zombieImg);
      zombie.scale = 0.15;
      zombie.velocityX = -(3+score/100)

      //assign lifetime to the variable
      zombie.lifetime = windowWidth;

      //adjust the depth
      zombie.depth = player.depth;
      player.depth = player.depth + 1;

      //adding cloud to the group
      zombieGroup.add(zombie);
    }
  }

  function shootBullet() {
    bullet = createSprite(player.x + 40, player.y - 23, 20, 10)
    bullet.velocityX = 7
    bullet.shapeColor = "brown"
    bulletGroup.add(bullet)
  }
  function lifeline(){
   if (life == 3){
    heart.changeAnimation("heart3",heart_third)
   }
    if (life==2){
      heart.changeAnimation("heart2",heart_second)
    }
    if(life == 1){
      heart.changeAnimation("heart1",heart_first)
    }
    
  }