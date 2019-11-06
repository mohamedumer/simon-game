var k = 0;
var game = {
  count: 0,
  possibilities: ["green", "blue", "red", "yellow"],
  currentGame: [],
  player: [],
  score: 0
};
var x=parseInt(localStorage.highscore);
if(isNaN(x)){
  document.getElementById("highscores").innerHTML="High Score:0"
}
else{
  document.getElementById("highscores").innerHTML =
  "High Score:" + parseInt(localStorage.highscore);
}
if( localStorage.a==undefined){
  document.getElementById("top").innerHTML = "Topper: none " ;
}
else{
  document.getElementById("top").innerHTML = "Topper: " + localStorage.a;
}


function newgame() {
  clearGame();
}

function clearGame() {
  game.currentGame = [];
  game.count = 0;
  generator();
}

function generator() {
  game.currentGame.push(game.possibilities[Math.floor(Math.random() * 4)]);
  showmoves();
}

function showmoves() {
  var i = 0;
  var moves = setInterval(function() {
    new Audio("beep.mp3").play();
    playGame(game.currentGame[i]);
    i++;
    if (i >= game.currentGame.length) {
      clearInterval(moves);
    }
  }, 600);

  Playerturn();
}

function playGame(field) {
  console.log(field);
  document.getElementById(field).setAttribute("class", "bright");

  setTimeout(function() {
    document.getElementById(field).removeAttribute("class", "bright");
  }, 300);
}

function Playerturn() {
  game.player = [];
}

function check(num) {
  if (game.currentGame.length > 0) {
    new Audio("foclick.mp3").play();

    k = k + 1;
    var field = num.id;
    game.player.push(field);
    console.log(game.player);
    console.log(k);

    if (k == game.currentGame.length) {
      finalcheck(field);
      k = 0;
    }
  }
}

function finalcheck(x) {
  var check = JSON.stringify(game.player) === JSON.stringify(game.currentGame);
  if (check) {
    if (game.count == 20) {
      alert("You won! Congrats.");
    } else {
      new Audio("crop.mp3").play();
      game.score++;
      document.getElementById("score").innerHTML = "score:" + game.score;
      generator();
    }
  } else {
    alert("You are Wrong! Try Again");
    if (localStorage.highscore) {
      if (game.score > parseInt(localStorage.highscore)) {
        localStorage.highscore = game.score;
        localStorage.a = "";
        localStorage.a = prompt("Hae Champion Enter Your Name!");
      }
    } else {
      localStorage.highscore = 1;
    }
    document.getElementById("highscores").innerHTML =
      "High Score:" + parseInt(localStorage.highscore);
    document.location.reload();
  }
}
function reset() {
  document.location.reload();
}
