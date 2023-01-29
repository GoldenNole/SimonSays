const buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern =[];
var gamePattern = [];
var started = false;
var level = 0;


$(document).keypress(function() {
    if (started === false){
    $("#level-title").text("Level "+ level)
    nextSequence();
    started = true;
    }
  });

$( ".btn" ).click(function() {
    userClickedPattern.push(this.id);
    playSound(this.id);
    animatePress(this.id);  
    checkAnswer(userClickedPattern.length-1);
});
  
function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+ level)
    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
};

function playSound(name){
var audio = new Audio("sounds/"+name+".mp3");
audio.play();
};

function animatePress(currentColor) {
    $("#"+currentColor).addClass("pressed")
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed"); 
       }, 100);
}

function checkAnswer(currentLevel){   
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if(userClickedPattern.length == gamePattern.length){
            setTimeout(function(){
                nextSequence(); 
               }, 1000);
        }
    }
    else{
        startOver();
        playSound("wrong");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over")
        setTimeout(function(){
            $("body").removeClass("game-over"); 
           }, 200);
        };
};

function startOver(){
level = 0;
started = false;
gamePattern = [];
};