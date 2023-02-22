var scoreArr = []; //save points_earn and _done
var imageBall = []; //array for image in juggling.js

var done = false; // LOOSE
var points_earn = 0;
var game_type;
var st;


const pointsToWin = 5;
const innerBall = document.getElementById('innerBall');
const ball = document.getElementById('ball');
const gameDiv = document.getElementById('game-div');
const scoreBoard = document.getElementById('scoreBoard');
const difficulty = document.getElementById('difficulty');
const loaderScreen = document.getElementById("loader");


var ballBounce;
var chooseDiff = 0;
var bounces = 0;
var speedX = 10;
var speedY = 0;
var positionX = 0;
var positionY = gameDiv.clientHeight + 300;
var stopY = false;
var defaultDifficulty = 22;

scoreBoard.innerText = '0';
window.addEventListener('load', startJuggle);
window.addEventListener('resize', startJuggle);


//loading screen
setTimeout(() => {
    gameDiv.style.opacity = '1';
}, 500);
setTimeout(() => {
    loaderScreen.style.opacity = '0';
}, 500);
setTimeout(() => {
    loaderScreen.style.display = 'none';
}, 1000);


function juggle(ballImage, _done, _game_type, _st) {
    done = _done;
    game_type = _game_type;
    st = _st;
    imageBall = ballImage;
}


function startJuggle() {
    // need to reload window with the new difficulty level saved
    ball.addEventListener('click', function (event) {
        //remember the bounces count 
        bounces++;

        //change the speed of the ball both vertically and horizontally acording to the mouse X,Y position at the moment of clicking
        speedX = (45 - event.layerX) / 5;
        speedY = (event.layerY + 30) / 6;

        if (speedY > 1) {
            stopY = false;
        } else {
            speedY = 0;
        }
    });

};

//continuous update of the position and speed according to the physical state of the ball
timeInterval = setInterval(() => {
    if (speedY < 3 && speedY > -3 && positionY < 0.2) {
        stopY = true;
        speedY = 0;
        positionY = 0;
        bounces = 0;
    }

    if (!stopY) {
        speedY -= 0.5;
    }
    if (positionY <= 0 && !stopY) {
        if (bounces >= pointsToWin) {
            gameWin();
        }
        else if (speedY < 0 && bounces > 0) {
            tryAgain();
            bounces = 0;
        }
        positionY = Math.abs(positionY);
        speedY = Math.abs(speedY) / 2;
    }
    if (positionX <= 0) {
        positionX = Math.abs(positionX);
        speedX = Math.abs(speedX) / 1.5;
    }
    if (positionX + 90 > gameDiv.clientWidth) {
        positionX = 2 * gameDiv.clientWidth - Math.abs(positionX) - 180;
        speedX = 0 - speedX / 1.5;
    }
    positionY += speedY;
    if (speedX < 0.1 && speedX > -0.1 && stopY) {
        speedX = 0;
    }
    if (speedX > 0 && stopY) {
        speedX -= 0.1;
    }
    if (speedX < 0 && stopY) {
        speedX += 0.1;
    }
    positionX += speedX;

    ballPosition();

    scoreBoard.innerText = bounces;
}, defaultDifficulty);



function ballPosition() {
    //actual update of the elements' style attributes to change his position
    ball.style.bottom = positionY.toString() + "px";
    ball.style.left = positionX.toString() + "px";
    ball.style.transform =
        "rotate(" + (positionX * (360 / 150)).toString() + "deg)";
}

function tryAgain() {
    done = false;
    stopY = true;
    speedY = 0;
    positionY = 0;
    bounces = bounces;

    console.log("try again");
    document.getElementById('cc-title').innerText = 'You got: ' + bounces + ', try again.';

}

function gameWin() {
    done = true;
    stopY = true;
    speedY = 0;
    positionY = 0;
    bounces = bounces;

    scoreArr.unshift(done);
    scoreArr.unshift(bounces);
    console.log(scoreArr);


    console.log("CONGRATSSSSS");
    document.getElementById('cc-title').innerText = 'Congratulations! You got: ' + bounces + '! YOU WIN!';

    gameDone();
}

function gameDone() {
    gameCards = document.getElementById('ball').children;

    /*     var gameDone = false;
    
        for(var i=0; i < gameCards.length; i++) {
          //console.log("class name", gameCards[i].classList[0]);
          if(gameCards[i].classList[0] != "rotate-card")
            return;
        } */

    if (game_type == "contestJuggle") {
        done(game_type, encodeString((Date.now() - st).toString()));
    } else if (game_type == "couponJuggle") {
        done("contestJuggle", encodeString((Date.now() - st).toString()));
    }
    else
        done();

    /* FELMEDDELANDE I CONSOLE */
    /* Uncaught TypeError: done is not a function
        at gameDone (main.js:246:9)
        at gameWin (main.js:224:5)
        at main.js:92:17 */
}