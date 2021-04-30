var hypnoticBall, database;
var position;


function setup(){
  database = firebase.database();
  console.log(database);
  createCanvas(500,500);

  ball = createSprite(250,250,10,10);
  ball.shapeColor = "red";


  var ballPosition = database.ref('ballPosition');
  //hypnoticBallPosition contains db reference to the ballPosition node
  ballPosition.on("value", readPosition, showError);
  //on() is  a listener function which is attached to db reference to the ballPosition node
  
}

function draw(){
  background("white");
  
    if(keyDown(LEFT_ARROW)){
      writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
      writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,+1);
    }
    drawSprites();
  
}

function writePosition(x,y){
  database.ref('ballPosition').set(
    {
    'x': position.x + x ,
    'y': position.y + y
  })
}

function readPosition(data){
  //storing data read from db in var position
  position = data.val();
  //assigning values read from db to the sprite x and y
  ball.x = position.x;
  ball.y = position.y;
}

function showError(){
  console.log("Error in writing to the database");
}
