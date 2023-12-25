// TODO - fucntion checkSequence dont work well, probobly line 33-34

var level = 0;
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var deleay = 1000;
var currentIndexColor = 0;
listenersButton();

$(document).keydown(function(){    
  if(!started){
    showLevel();
    nextSequence();
    started = true;
  }
});

function listenersButton(){
  $(".btn").click(function() {
    var thisColor = $(this).attr("id");
    console.log("the color: " + thisColor);
    userClickedPattern.push(thisColor);
    flashbutton(thisColor);
    console.log("User Sequence: " + userClickedPattern.toString())
    checkSequence(thisColor);
    playSound(thisColor);
  });
}


function checkSequence(thisColor){
  
  console.log(gamePattern[currentIndexColor] + " vs " + thisColor);
  if (gamePattern[currentIndexColor] != thisColor){
    endGame();
  }
  else if ((gamePattern.length === userClickedPattern.length) && gamePattern.toString() === userClickedPattern.toString()){
    setTimeout(function () {
      userClickedPattern = []; 
      currentIndexColor = 0;
      nextSequence();
    },2000)
  }
  currentIndexColor++;
}

function nextSequence(){
  level++;
  currentIndexColor = 0;
  difficulty();
  showLevel();
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  console.log("Game Sequence: " + gamePattern.toString())
  playSequence();
}

function playSequence() {
  for (var i = 0; i < gamePattern.length; i++) {
    (function(index) {
      setTimeout(function() {
        playSound(gamePattern[index]);
        animatePress(gamePattern[index]);
      }, deleay * index); // Multiply by index to stagger the timeouts
    })(i);
  }
}


function playSound(color){
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

function flashbutton(color){
  $("#" + color).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100); 
}

function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function showLevel(){
  $("#level-title").text("Level " + level);
}

function endGame(){
  $("#level-title").text("Game Over, Press Any Key to Restart");
  $("body").addClass("game-over");
  playSound("wrong");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);

  gamePattern = [];
  started = false;
  level = 0
  currentIndexColor = 0;
  userClickedPattern = []; 
} 


function difficulty(){
  if (level/5 == 1){
    deleay = 800;
  }
  else if(level/5 == 2){
    deleay = 500;
  }
  else if(level/5 == 3){
    deleay = 400;
  }
  else if(level/5 == 4){
    deleay = 300;
  }
  else if(level/5 == 5){
    deleay = 200;
  }
  else if(level/5 == 6){
    deleay = 100;
  }
}