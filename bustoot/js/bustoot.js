// Copyright (C) 2023  Jordan Wilson
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, version 2.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

let newAurora = false;
let highscoreList; // this is an array
let highscoreItem = { name: '', score: 0 };
(function() {
  Aurora.canvas = document.getElementById('Stage');
  drawMainMenu();
  highscoreList = JSON.parse(localStorage.getItem('bustoot-highscores'));
  sortHighScoreList();
})();

let ball = {}; // initialize the game ball
let bricks; // this is an array
let background = {};
let ballBrickCollision = {};
let ballPaddleCollision = {};
let paddle = {};
let dangerMark = {};
let readyText = undefined;
let tapText = undefined;
let swipeTextTop = undefined;
let swipeTextBot = undefined;
let scoreBoard = undefined;
let isPaddleMoving = false;
let gamePoints = 0;
let gameStart = false;
let brickCount = 27; // lvl1- 27, lvl2- 45, lvl3- 63
let isPoweredUp = false;
let isDoublePoints = false;
let gameLevel = 0;
let gameLives = 3;
let ballSpeed = 1;

// touch controls
Aurora.addCanvasEvent(Aurora.enumEvents.touchDown, readyPaddle);
Aurora.addCanvasEvent(Aurora.enumEvents.touchUp, stopPaddle);
Aurora.addCanvasEvent(Aurora.enumEvents.touchMove, movePaddle);

// mouse controls
Aurora.addCanvasEvent(Aurora.enumEvents.mouseDown, readyPaddle);
Aurora.addCanvasEvent(Aurora.enumEvents.mouseUp, stopPaddle);
Aurora.addCanvasEvent(Aurora.enumEvents.mouseMove, movePaddle);


function sortHighScoreList() {
  if (highscoreList && highscoreList.length > 0) {
    highscoreList.sort(function(a, b) {
      return b.score - a.score;
    });
    if (highscoreList.length > 5) {
      highscoreList.splice(highscoreList.length - 1, 1);
      localStorage.setItem('bustoot-highscores', JSON.stringify(highscoreList));
    }
  }
}

function playAurora() { // draw the game
  if (newAurora) {
    gamePoints = 0;
    gameLevel = 0;
    gameLives = 3;
    newAurora = false;
  }
  isPoweredUp = false;
  isDoublePoints = false;
  bricks = {};
  ball = {};
  paddle = {};
  dangerMark = {};
  readyText = undefined;
  tapText = undefined;
  swipeTextTop = undefined;
  swipeTextBot = undefined;
  gameStart = false;
  scoreBoard = undefined;

  nextAuroraLevel();
}

function findAuroraObjects() {
  // when the game starts up, look for the ball, paddle and bricks
  if (!ball?.methodId) {
    ball = Aurora.methodObjects.find(x => x.id === 'ball');
  }
  if (!paddle?.methodId) {
    paddle = Aurora.methodObjects.find(x => x.id === 'paddle');
  }
  if (bricks?.length === 0) {
    bricks = Aurora.methodObjects.filter(x => x.id === 'brick');
  }
  if (!readyText?.methodId && !gameStart) {
    readyText = Aurora.methodObjects.find(x => x.id === 'readyText');
  }
  if (!tapText?.methodId && !gameStart) {
    tapText = Aurora.methodObjects.find(x => x.id === 'tapText');
  }
  if (!swipeTextTop?.methodId && !gameStart) {
    swipeTextTop = Aurora.methodObjects.find(x => x.id === 'swipeTextTop');
  }
  if (!swipeTextBot?.methodId && !gameStart) {
    swipeTextBot = Aurora.methodObjects.find(x => x.id === 'swipeTextBot');
  }
  if (!scoreBoard?.methodId && !gameStart) {
    scoreBoard = Aurora.methodObjects.find(x => x.id === 'score-board');
  }
  if (!dangerMark?.methodId && !gameStart) {
    dangerMark = Aurora.methodObjects.find(x => x.id === 'danger');
  }
}

function moveAuroraBall() {
  if (ball?.methodId) {
    if (isPoweredUp && !isDoublePoints) {
      ballSpeed = 1.15;
      ball.color = 'blue';
    } else if (isPoweredUp && isDoublePoints) {
      ballSpeed = 1.3;
      ball.color = 'yellow';
    } else {
      ballSpeed = 1;
      ball.color = 'green';
    }
    if (gameStart) {
      if (ball.props.direction === 'top') {
        ball.posY -= Aurora.moveEntity(ballSpeed, Aurora.enumDirections.topDown);
      } else if (ball.props.direction === 'bot') {
        ball.posY += Aurora.moveEntity(ballSpeed, Aurora.enumDirections.topDown);
      } else if (ball.props.direction === 'toprt') {
        ball.posY -= Aurora.moveEntity(ballSpeed, Aurora.enumDirections.topDown);
        ball.posX += Aurora.moveEntity(ballSpeed, Aurora.enumDirections.leftRight);
      } else if (ball.props.direction === 'toplt') {
        ball.posY -= Aurora.moveEntity(ballSpeed, Aurora.enumDirections.topDown);
        ball.posX -= Aurora.moveEntity(ballSpeed, Aurora.enumDirections.leftRight);
      } else if (ball.props.direction === 'botrt') {
        ball.posY += Aurora.moveEntity(ballSpeed, Aurora.enumDirections.topDown);
        ball.posX += Aurora.moveEntity(ballSpeed, Aurora.enumDirections.leftRight);
      } else if (ball.props.direction === 'botlt') {
        ball.posY += Aurora.moveEntity(ballSpeed, Aurora.enumDirections.topDown);
        ball.posX -= Aurora.moveEntity(ballSpeed, Aurora.enumDirections.leftRight);
      }
      if (ball.props.direction === 'toprt' && ball.posX >= (Aurora.canvas.width - ball.width)) {
        ball.props.direction = 'toplt';
      }
      if (ball.props.direction === 'toplt' && ball.posY <= (Aurora.canvas.height * 0.08)) {
        ball.props.direction = 'botlt';
      }
      if (ball.props.direction === 'botlt' && ball.posX <= ball.width) {
        ball.props.direction = 'botrt';
      }
      if (ball.props.direction === 'botrt' && ball.posY >= (Aurora.canvas.height - ball.width)) {
        ball.props.direction = 'toprt';
        if (!isPoweredUp) {
          drawDangerArea();
          gameLives--;
        }
      }
      if (ball.props.direction === 'toplt' && ball.posX <= ball.width) {
        ball.props.direction = 'toprt';
      }
      if (ball.props.direction === 'toprt' && ball.posY <= (Aurora.canvas.height * 0.08)) {
        ball.props.direction = 'botrt';
      }
      if (ball.props.direction === 'botrt' && ball.posX >= (Aurora.canvas.width - ball.width)) {
        ball.props.direction = 'botlt';
      }
      if (ball.props.direction === 'botlt' && ball.posY >= (Aurora.canvas.height - ball.width)) {
        ball.props.direction = 'toplt';
        if (!isPoweredUp) {
          drawDangerArea();
          gameLives--;
        }
      }
      if (ball.props.direction === 'bot' && ball.posY >= (Aurora.canvas.height - ball.width)) {
        ball.props.direction = 'top';
        if (!isPoweredUp) {
          drawDangerArea();
          gameLives--;
        }
      }
      if (ball.props.direction === 'top' && ball.posY <= (Aurora.canvas.height * 0.08)) {
        ball.props.direction = 'bot';
      }
      if (gameLives === 0) {
        drawHighScoreMenu();
        drawLoseMenu();
      }
    }
  }
}

function brickCollision(ball, bricks, methodId) {
  for (let i = 0; i < bricks.length; i++) {
    if (bricks[i].methodId === methodId) {
      if (ball.props.direction === 'top' && !ball.props.collision) {
        ball.props.direction = 'bot';
        ball.props.collision = true;
        bricks[i].props.hp--;
        gamePoints++;
        if (isDoublePoints) {
          gamePoints++;
        }
        scoreBoard.msg = gamePoints.toString() + ' Points';
        if (bricks[i].props.hp === 1) {
          brickPowerReveal(i);
        }
      }
      if (ball.props.direction === 'bot' && !ball.props.collision) {
        ball.props.direction = 'top';
        ball.props.collision = true;
        bricks[i].props.hp--;
        gamePoints++;
        if (isDoublePoints) {
          gamePoints++;
        }
        scoreBoard.msg = gamePoints.toString() + ' Points';
        if (bricks[i].props.hp === 1) {
          brickPowerReveal(i);
        }
      }
      if (ball.props.direction === 'toprt' && !ball.props.collision) {
        ball.props.direction = 'botrt';
        ball.props.collision = true;
        bricks[i].props.hp--;
        gamePoints++;
        if (isDoublePoints) {
          gamePoints++;
        }
        scoreBoard.msg = gamePoints.toString() + ' Points';
        if (bricks[i].props.hp === 1) {
          brickPowerReveal(i);
        }
      }
      if (ball.props.direction === 'botrt' && !ball.props.collision) {
        if (isPoweredUp) {
          ball.props.direction = 'toprt';
        } else {
          ball.props.direction = 'botlt';
        }
        ball.props.collision = true;
        bricks[i].props.hp--;
        gamePoints++;
        if (isDoublePoints) {
          gamePoints++;
        }
        scoreBoard.msg = gamePoints.toString() + ' Points';
        if (bricks[i].props.hp === 1) {
          brickPowerReveal(i);
        }
      }
      if (ball.props.direction === 'toplt' && !ball.props.collision) {
        if (isPoweredUp) {
          ball.props.direction = 'botlt';
        } else {
          ball.props.direction = 'botrt';
        }
        ball.props.collision = true;
        bricks[i].props.hp--;
        gamePoints++;
        if (isDoublePoints) {
          gamePoints++;
        }
        scoreBoard.msg = gamePoints.toString() + ' Points';
        if (bricks[i].props.hp === 1) {
          brickPowerReveal(i);
        }
      }
      if (ball.props.direction === 'botlt' && !ball.props.collision) {
        ball.props.direction = 'toplt';
        ball.props.collision = true;
        bricks[i].props.hp--;
        gamePoints++;
        if (isDoublePoints) {
          gamePoints++;
        }
        scoreBoard.msg = gamePoints.toString() + ' Points';
        if (bricks[i].props.hp === 1) {
          brickPowerReveal(i);
        }
      }
      if (bricks[i].props.hp < 1 && bricks[i].props.powerUp) {
        if (bricks[i].props.powerUp && isPoweredUp) {
          isDoublePoints = true;
          gamePoints++;
        }
        gamePowerUp();
      }
      if (bricks[i].props.hp < 1) {
        Aurora.deleteEntity(methodId);
      }

    }
  }
  setTimeout(function() {
    ball.props.collision = false;
    if (Aurora.methodObjects.filter(x => x.id === 'brick').length === 0) {
      playAurora();
    }
  }, 0);
}
function brickPowerReveal(index) {
  const random = Math.floor(Math.random() * 10) + 1;
  if (random <= 3) {
    bricks[index].props.powerUp = true;
    bricks[index].color = 'blue';
  }

}
function paddleCollision() {
  if (ball.props.direction === 'bot' && paddle.props.direction === 'non') {
    ball.props.direction = 'top';
  }
  if (ball.props.direction === 'botrt' && paddle.props.direction === 'non') {
    ball.props.direction = 'top';
  }
  if (ball.props.direction === 'botlt' && paddle.props.direction === 'non') {
    ball.props.direction = 'top';
  }
  if (ball.props.direction === 'bot' && paddle.props.direction === 'rt') {
    ball.props.direction = 'toplt';
  }
  if (ball.props.direction === 'botrt' && paddle.props.direction === 'rt') {
    ball.props.direction = 'toprt';
  }
  if (ball.props.direction === 'botlt' && paddle.props.direction === 'rt') {
    ball.props.direction = 'toprt';
  }
  if (ball.props.direction === 'bot' && paddle.props.direction === 'lt') {
    ball.props.direction = 'toplt';
  }
  if (ball.props.direction === 'botlt' && paddle.props.direction === 'lt') {
    ball.props.direction = 'toplt';
  }
  if (ball.props.direction === 'botrt' && paddle.props.direction === 'lt') {
    ball.props.direction = 'toprt';
  }
}
function gamePowerUp() {
  if (!isPoweredUp) {
    isPoweredUp = true;
    let powerTime = setTimeout(function() {
      isPoweredUp = false;
      isDoublePoints = false;
      clearTimeout(powerTime);
    }, 6000);
  }

}
function readyPaddle(event) {
  if (!gameStart && readyText?.methodId &&
  tapText?.methodId && swipeTextTop?.methodId &&
  swipeTextBot?.methodId) {
    gameStart = true;
    Aurora.deleteEntity(readyText.methodId);
    Aurora.deleteEntity(tapText.methodId);
    Aurora.deleteEntity(swipeTextTop.methodId);
    Aurora.deleteEntity(swipeTextBot.methodId);
  }
  isPaddleMoving = true;
}

function movePaddle(event) {
  if (gameStart && isPaddleMoving) {

    if (!event.changedTouches) { // this is the mouse controls
      if (paddle && paddle.props) {
        paddle.props.direction = 'non';
      }
      if (paddle.posX < event.clientX) {
        paddle.posX -= Aurora.moveEntity(4.5, Aurora.enumDirections.leftRight);
        paddle.props.direction = 'lt';
      }
      if (paddle.posX > event.clientX) {
        paddle.posX += Aurora.moveEntity(4.5, Aurora.enumDirections.leftRight);
        paddle.props.direction = 'rt';
      }
    } else { // this is the touch screen controls
      if (paddle && paddle.props) {
        paddle.props.direction = 'non';
      }
      if (paddle.posX < event.changedTouches[0].clientX) {
        paddle.posX -= Aurora.moveEntity(4.5, Aurora.enumDirections.leftRight);
        paddle.props.direction = 'lt';
      }
      if (paddle.posX > event.changedTouches[0].clientX) {
        paddle.posX += Aurora.moveEntity(4.5, Aurora.enumDirections.leftRight);
        paddle.props.direction = 'rt';
      }
    }
    centerPaddle(event);
  }
}
function centerPaddle(event) {
  if (!event.changedTouches) { // this will get the mouse position offset
    paddle.posX = event.clientX * 0.8;
  } else if (event.changedTouches) { // this is getting the touch screen position offset
    if (Aurora.selectedSetting === Aurora.enumSettings.high) {
      paddle.posX = event.changedTouches[0].clientX  * 0.8;
    } else {
      paddle.posX = event.changedTouches[0].clientX  * 0.83;
    }
  }
}

function stopPaddle(event) {
  isPaddleMoving = false;
  if (paddle && paddle.props) {
    paddle.props.direction = 'non';
  }
}
function nextAuroraLevel() { // draw the game
  gameStart = false;
  ball = undefined;
  paddle = undefined;
  readyText = undefined;
  tapText = undefined;
  swipeTextTop = undefined;
  swipeTextBot = undefined;
  if (scoreBoard?.methodId) {
    scoreBoard = undefined;
  }
  Aurora.clearStage();
  Aurora.methodSetup = { method: function(id) { findAuroraObjects(); }};
  Aurora.addMethod(Aurora.methodSetup);
  Aurora.methodSetup = { method: function(id) { moveAuroraBall(); }};
  Aurora.addMethod(Aurora.methodSetup);
  Aurora.methodSetup = {
    method: function(id) {
      drawRect({
        posX: 0,
        posY: 0,
        width: Aurora.canvas.width,
        height: Aurora.canvas.height,
        lineWidth: 1,
        color: 'black',
        isFilled: true,
        id: 'background',
        isBackground: true,
        props: {},
        methodId: id
      });
    }
  };
  Aurora.addMethod(Aurora.methodSetup);
  Aurora.methodSetup = {
    method: function(id) {
      drawRect({
        posX: 0,
        posY: (Aurora.canvas.height * 0.90),
        width: Aurora.canvas.width,
        height: Aurora.canvas.height,
        lineWidth: 1,
        color: 'black',
        isFilled: true,
        id: 'danger',
        isBackground: false,
        props: {},
        methodId: id
      });
    }
  };
  Aurora.addMethod(Aurora.methodSetup);
  Aurora.methodSetup = { method: function(id) {drawRect({ posX: (Aurora.canvas.width * 0.5 - (Aurora.canvas.width * 0.125)), posY: (Aurora.canvas.height * 0.82), width: (Aurora.canvas.width * 0.25), height: (Aurora.canvas.height * 0.03), lineWidth: 1, color: 'green', isFilled: true, id: 'paddle', isBackground: false, props: {direction: 'non'}, methodId: id });} };
  Aurora.addMethod(Aurora.methodSetup);
  Aurora.methodSetup = {
    method: function(id) {
      drawArc({
        posX: (Aurora.canvas.width * 0.5),
        posY: (Aurora.canvas.height * 0.78),
        width: (Aurora.canvas.height * 0.02),
        aglStrt: 0,
        aglEnd: (2 * Math.PI),
        lineWidth: 1,
        color: 'green',
        isFilled: true,
        id: 'ball',
        props: {
          direction: 'top',
          collision: false
        },
        methodId: id
      });
    }
  }
  Aurora.addMethod(Aurora.methodSetup);
  Aurora.methodSetup = { method: function(id) {drawText({ font: '3em serif', msg: 'Ready?', posX: (Aurora.canvas.width * 0.5), posY: (Aurora.canvas.height * 0.68), color: 'green', align: 'center', props: {}, id: 'readyText', methodId: id });} };
  Aurora.addMethod(Aurora.methodSetup);
  Aurora.methodSetup = { method: function(id) {drawText({ font: '1em serif', msg: 'Tap to Play', posX: (Aurora.canvas.width * 0.5), posY: (Aurora.canvas.height * 0.74), color: 'green', align: 'center', props: {}, id: 'tapText', methodId: id });} };
  Aurora.addMethod(Aurora.methodSetup);
  Aurora.methodSetup = { method: function(id) {drawText({ font: '1em serif', msg: 'Swipe Left And Right', posX: (Aurora.canvas.width * 0.5), posY: (Aurora.canvas.height * 0.90), color: 'green', align: 'center', props: {}, id: 'swipeTextTop', methodId: id });} };
  Aurora.addMethod(Aurora.methodSetup);
  Aurora.methodSetup = { method: function(id) {drawText({ font: '1em serif', msg: 'To Move The Paddle', posX: (Aurora.canvas.width * 0.5), posY: (Aurora.canvas.height * 0.95), color: 'green', align: 'center', props: {}, id: 'swipeTextBot', methodId: id });} };
  Aurora.addMethod(Aurora.methodSetup);
  drawToolbar();
  Aurora.collisionSetup = {
    primary: 'ball',
    target: 'paddle',
    method: function(id) {paddleCollision()},
    methodId: undefined
  }
  Aurora.addCollision(Aurora.collisionSetup);
  Aurora.collisionSetup = {
    primary: 'ball',
    target: 'brick',
    method: function(id) {brickCollision(ball, bricks, this.methodId)},
    methodId: undefined,
  }
  Aurora.addCollision(Aurora.collisionSetup);
  gameLevel++;
  if (gameLevel === 1) {
    brickCount = 27;
    drawAuroraBricks();
  }
  if (gameLevel === 2) {
    brickCount = 45;
    drawAuroraBricks();
  }
  if (gameLevel === 3) {
    brickCount = 63;
    drawAuroraBricks();
  }
  if (gameLevel === 4) {
    drawHighScoreMenu();
    drawWinMenu();
  }
  Aurora.pageResized = {
		section: 'resize-bustoot',
		method: function() {
			if (!newAurora) {
				setTimeout(function() {
				  Aurora.clearStage();
				  gameLevel = 0;
				  gamePoints = 0;
				  playAurora();
				}, 0);
			 }
		}
	}
}
function drawHighScoreMenu() {
  if (!highscoreList) {
    highscoreList = [];
  }
  if (highscoreList && highscoreList.length < 5) {
      document.querySelector('#highscore-wrapper').style = 'display: block';
    }
  if (highscoreList && highscoreList.length > 4) {
    for (let i = 0; i < highscoreList.length; i++) {
      if (gamePoints >= highscoreList[i].score) {
        document.querySelector('#highscore-wrapper').style = 'display: block';
        break;
      }
    }
  }
}

function drawAuroraBricks() {
  let rows = 0; // keeps track of the rows being drawn
  let brickNum = 0; // the current brick number in each row
  bricks = [];
  for (let i = 0; i < brickCount; i++) {
    let yPos = 0;
    let xPos = 0;
    if (i < 9) { // this is the first row
      yPos = Aurora.canvas.height * 0.09;
    } else if (i > 8 && i < 18) {
      yPos = Aurora.canvas.height * 0.16;
    } else if (i > 17 && i < 27) {
      yPos = Aurora.canvas.height * 0.23;
    } else if (i > 26 && i < 36) {
      yPos = Aurora.canvas.height * 0.30;
    } else if (i > 35 && i < 45) {
      yPos = Aurora.canvas.height * 0.37;
    } else if (i > 44 && i < 54) {
      yPos = Aurora.canvas.height * 0.44;
    }  else if (i > 53 && i < 63) {
      yPos = Aurora.canvas.height * 0.51;
    }
    xPos = (Aurora.canvas.width * 0.005) + (Aurora.canvas.width * (brickNum * 0.11));
    brickNum++;
    Aurora.methodSetup = { method: function(id) {drawRect({ posX: xPos, posY: yPos, width: (Aurora.canvas.width * 0.105), height: (Aurora.canvas.height * 0.065), lineWidth: 1, color: 'green', isFilled: true, id: 'brick', isBackground: false, props: {hp: 2,powerUp: false}, methodId: id });} };
    Aurora.addMethod(Aurora.methodSetup);
    // when we hit the end of the row, move down to the next row
    if (i === 8 || i === 17 || i === 26 || i === 35 || i === 44 || i === 53) {
      rows++;
      brickNum = 0;
    }
  }
}
function drawLoseMenu() {
  Aurora.clearStage();
  newAurora = true;
  Aurora.methodSetup = { method: function(id) {drawRect({ posX: 0, posY: 0, width: Aurora.canvas.width, height: Aurora.canvas.height, lineWidth: 1, color: 'black', isFilled: true, id: 'background', isBackground: false, props: {}, methodId: id });} };
  Aurora.addMethod(Aurora.methodSetup);
  Aurora.methodSetup = { method: function(id) {drawText({ font: '3em serif', msg: 'You Lose!', posX: (Aurora.canvas.width * 0.5), posY: (Aurora.canvas.height * 0.1), color: 'green', align: 'center', props: {}, id: 'loseText', methodId: id });} };
  Aurora.addMethod(Aurora.methodSetup);
  Aurora.methodSetup = { method: function(id) {drawText({ font: '2em serif', msg: gamePoints.toString() + ' Points', posX: (Aurora.canvas.width * 0.5), posY: (Aurora.canvas.height * 0.24), color: 'green', align: 'center', props: {}, id: 'score', methodId: id });} };
  Aurora.addMethod(Aurora.methodSetup);
  Aurora.methodSetup = {
    method: function(id) {
      drawButton({
        posX: (Aurora.canvas.width * 0.27),
        posY: (Aurora.canvas.height * 0.4),
        width: (Aurora.canvas.width * 0.5),
        height: (Aurora.canvas.height * 0.11),
        lineWidth: 1,
        btnColor: 'green',
        txtColor: 'white',
        font: '1.5em serif',
        msg: 'Restart',
        isFilled: true,
        id: 'restart',
        action: { method: function(id) { playAurora(); }},
        isModalBtn: false,
        props: {},
        methodId: id
      });
    }
  }
  Aurora.addMethod(Aurora.methodSetup);
  Aurora.methodSetup = {
    method: function(id) {
      drawButton({
        posX: (Aurora.canvas.width * 0.27),
        posY: (Aurora.canvas.height * 0.55),
        width: (Aurora.canvas.width * 0.5),
        height: (Aurora.canvas.height * 0.11),
        lineWidth: 1,
        btnColor: 'green',
        txtColor: 'white',
        font: '1.5em serif',
        msg: 'Main Menu',
        isFilled: true,
        id: 'exit',
        action: { method: function(id) { drawMainMenu(); }},
        isModalBtn: false,
        props: {},
        methodId: id
      });
    }
  }
  Aurora.addMethod(Aurora.methodSetup);
}
function drawWinMenu() {
  Aurora.clearStage();
  newAurora = true;
  Aurora.methodSetup = { method: function(id) {drawRect({ posX: 0, posY: 0, width: Aurora.canvas.width, height: Aurora.canvas.height, lineWidth: 1, color: 'black', isFilled: true, id: 'background', isBackground: false, props: {}, methodId: id });} };
  Aurora.addMethod(Aurora.methodSetup);
  Aurora.methodSetup = { method: function(id) {drawText({ font: '3em serif', msg: 'You Win!', posX: (Aurora.canvas.width * 0.5), posY: (Aurora.canvas.height * 0.1), color: 'green', align: 'center', props: {}, id: 'winText', methodId: id });} };
  Aurora.addMethod(Aurora.methodSetup);
  Aurora.methodSetup = { method: function(id) {drawText({ font: '2em serif', msg: gamePoints.toString() + ' Points', posX: (Aurora.canvas.width * 0.5), posY: (Aurora.canvas.height * 0.24), color: 'green', align: 'center', props: {}, id: 'score', methodId: id });} };
  Aurora.addMethod(Aurora.methodSetup);
  Aurora.methodSetup = {
    method: function(id) {
       drawButton({
        posX: (Aurora.canvas.width * 0.27),
        posY: (Aurora.canvas.height * 0.4),
        width: (Aurora.canvas.width * 0.5),
        height: (Aurora.canvas.height * 0.11),
        lineWidth: 1,
        btnColor: 'green',
        txtColor: 'white',
        font: '1.5em serif',
        msg: 'Main Menu',
        isFilled: true,
        id: 'main-menu',
        action: { method: function(id) { drawMainMenu(); }},
        isModalBtn: false,
        props: {},
        methodId: id
      });
    }
  };
  Aurora.addMethod(Aurora.methodSetup);
}
function drawMainMenu() { // draw the main menu
  Aurora.clearStage();
  if (!Aurora.selectedSetting) {
    Aurora.setSettingsHigh();
  }
  newAurora = true;
  Aurora.methodSetup = { method: function(id) {drawRect({ posX: 0, posY: 0, width: Aurora.canvas.width, height: Aurora.canvas.height, lineWidth: 1, color: 'black', isFilled: true, id: 'menu-background', isBackground: false, props: {}, methodId: id });} };
  Aurora.addMethod(Aurora.methodSetup);
  Aurora.methodSetup = { method: function(id) {drawText({ font: '3em serif', msg: 'Bustoot', posX: (Aurora.canvas.width * 0.5), posY: (Aurora.canvas.height * 0.1), color: 'green', align: 'center', props: {}, id: 'title', methodId: id });} };
  Aurora.addMethod(Aurora.methodSetup);
  Aurora.methodSetup = { method: function(id) {drawText({ font: '1em serif', msg: 'An Arurora Engine Demo', posX: (Aurora.canvas.width * 0.5), posY: (Aurora.canvas.height * 0.14), color: 'green', align: 'center', props: {}, id: 'minor', methodId: id });} };
  Aurora.addMethod(Aurora.methodSetup);
  Aurora.methodSetup = { method: function(id) {drawRect({ posX: (Aurora.canvas.width * 0.01), posY: (Aurora.canvas.height * 0.17), width: (Aurora.canvas.width * 0.15), height: (Aurora.canvas.height * 0.06), lineWidth: 1, color: 'green', isFilled: true, id: 'prop', isBackground: false, props: {}, methodId: id });} };
  Aurora.addMethod(Aurora.methodSetup);
  Aurora.methodSetup = { method: function(id) {drawRect({ posX: (Aurora.canvas.width * 0.17), posY: (Aurora.canvas.height * 0.17), width: (Aurora.canvas.width * 0.15), height: (Aurora.canvas.height * 0.06), lineWidth: 1, color: 'green', isFilled: true, id: 'prop', isBackground: false, props: {}, methodId: id });} };
  Aurora.addMethod(Aurora.methodSetup);
  Aurora.methodSetup = { method: function(id) {drawRect({ posX: (Aurora.canvas.width * 0.33), posY: (Aurora.canvas.height * 0.17), width: (Aurora.canvas.width * 0.17), height: (Aurora.canvas.height * 0.06), lineWidth: 1, color: 'green', isFilled: true, id: 'prop', isBackground: false, props: {}, methodId: id });} };
  Aurora.addMethod(Aurora.methodSetup);
  Aurora.methodSetup = { method: function(id) {drawRect({ posX: (Aurora.canvas.width * 0.51), posY: (Aurora.canvas.height * 0.17), width: (Aurora.canvas.width * 0.16), height: (Aurora.canvas.height * 0.06), lineWidth: 1, color: 'green', isFilled: true, id: 'prop', isBackground: false, props: {}, methodId: id });} };
  Aurora.addMethod(Aurora.methodSetup);
  Aurora.methodSetup = { method: function(id) {drawRect({ posX: (Aurora.canvas.width * 0.68), posY: (Aurora.canvas.height * 0.17), width: (Aurora.canvas.width * 0.15), height: (Aurora.canvas.height * 0.06), lineWidth: 1, color: 'green', isFilled: true, id: 'prop', isBackground: false, props: {}, methodId: id });} };
  Aurora.addMethod(Aurora.methodSetup);
  Aurora.methodSetup = { method: function(id) {drawRect({ posX: (Aurora.canvas.width * 0.84), posY: (Aurora.canvas.height * 0.17), width: (Aurora.canvas.width * 0.15), height: (Aurora.canvas.height * 0.06), lineWidth: 1, color: 'green', isFilled: true, id: 'prop', isBackground: false, props: {}, methodId: id });} };
  Aurora.addMethod(Aurora.methodSetup);
  Aurora.methodSetup = { method: function(id) {drawArc({ posX: (Aurora.canvas.width * 0.1), posY: (Aurora.canvas.height * 0.3), width: (Aurora.canvas.height * 0.02), aglStrt: 0, aglEnd: 2 * Math.PI, lineWidth: 2, color: 'green', isFilled: false, id: 'prop', props: {}, methodId: id });} };
  Aurora.addMethod(Aurora.methodSetup);
  Aurora.methodSetup = { method: function(id) {drawArc({ posX: (Aurora.canvas.width * 0.12), posY: (Aurora.canvas.height * 0.32), width: (Aurora.canvas.height * 0.02), aglStrt: 0, aglEnd: 2 * Math.PI, lineWidth: 2, color: 'green', isFilled: false, id: 'prop', props: {}, methodId: id });} };
  Aurora.addMethod(Aurora.methodSetup);
  Aurora.methodSetup = { method: function(id) {drawArc({ posX: (Aurora.canvas.width * 0.14), posY: (Aurora.canvas.height * 0.34), width: (Aurora.canvas.height * 0.02), aglStrt: 0, aglEnd: 2 * Math.PI, lineWidth: 2, color: 'green', isFilled: false, id: 'prop', props: {}, methodId: id });} };
  Aurora.addMethod(Aurora.methodSetup);
  Aurora.methodSetup = { method: function(id) {drawArc({ posX: (Aurora.canvas.width * 0.16), posY: (Aurora.canvas.height * 0.36), width: (Aurora.canvas.height * 0.02), aglStrt: 0, aglEnd: 2 * Math.PI, lineWidth: 2, color: 'green', isFilled: false, id: 'prop', props: {}, methodId: id });} };
  Aurora.addMethod(Aurora.methodSetup);
  Aurora.methodSetup = { method: function(id) {drawArc({ posX: (Aurora.canvas.width * 0.18), posY: (Aurora.canvas.height * 0.38), width: (Aurora.canvas.height * 0.02), aglStrt: 0, aglEnd: 2 * Math.PI, lineWidth: 2, color: 'green', isFilled: false, id: 'prop', props: {}, methodId: id });} };
  Aurora.addMethod(Aurora.methodSetup);
  Aurora.methodSetup = { method: function(id) {drawArc({ posX: (Aurora.canvas.width * 0.20), posY: (Aurora.canvas.height * 0.40), width: (Aurora.canvas.height * 0.02), aglStrt: 0, aglEnd: 2 * Math.PI, lineWidth: 2, color: 'green', isFilled: false, id: 'prop', props: {}, methodId: id });} };
  Aurora.addMethod(Aurora.methodSetup);
  Aurora.methodSetup = { method: function(id) {drawArc({ posX: (Aurora.canvas.width * 0.22), posY: (Aurora.canvas.height * 0.42), width: (Aurora.canvas.height * 0.02), aglStrt: 0, aglEnd: 2 * Math.PI, lineWidth: 2, color: 'green', isFilled: false, id: 'prop', props: {}, methodId: id });} };
  Aurora.addMethod(Aurora.methodSetup);
  Aurora.methodSetup = { method: function(id) {drawArc({ posX: (Aurora.canvas.width * 0.24), posY: (Aurora.canvas.height * 0.44), width: (Aurora.canvas.height * 0.02), aglStrt: 0, aglEnd: 2 * Math.PI, lineWidth: 2, color: 'green', isFilled: false, id: 'prop', props: {}, methodId: id });} };
  Aurora.addMethod(Aurora.methodSetup);
  Aurora.methodSetup = { method: function(id) {drawArc({ posX: (Aurora.canvas.width * 0.26), posY: (Aurora.canvas.height * 0.46), width: (Aurora.canvas.height * 0.02), aglStrt: 0, aglEnd: 2 * Math.PI, lineWidth: 2, color: 'green', isFilled: false, id: 'prop', props: {}, methodId: id });} };
  Aurora.addMethod(Aurora.methodSetup);
  Aurora.methodSetup = { method: function(id) {drawArc({ posX: (Aurora.canvas.width * 0.28), posY: (Aurora.canvas.height * 0.48), width: (Aurora.canvas.height * 0.02), aglStrt: 0, aglEnd: 2 * Math.PI, lineWidth: 2, color: 'green', isFilled: false, id: 'prop', props: {}, methodId: id });} };
  Aurora.addMethod(Aurora.methodSetup);
  Aurora.methodSetup = { method: function(id) {drawArc({ posX: (Aurora.canvas.width * 0.32), posY: (Aurora.canvas.height * 0.52), width: (Aurora.canvas.height * 0.02), aglStrt: 0, aglEnd: 2 * Math.PI, lineWidth: 2, color: 'green', isFilled: true, id: 'prop', props: {}, methodId: id });} };
  Aurora.addMethod(Aurora.methodSetup);
  Aurora.methodSetup = {
    method: function(id) {
      drawButton({
        posX: (Aurora.canvas.width * 0.25),
        posY: (Aurora.canvas.height * 0.56),
        width: (Aurora.canvas.width * 0.5),
        height: (Aurora.canvas.height * 0.09),
        lineWidth: 1,
        btnColor: 'green',
        txtColor: 'white',
        font: '1.5em serif',
        msg: 'Playyy',
        isFilled: true,
        id: 'play',
        action: { method: function(id) { playAurora(); }},
        isModalBtn: false,
        props: {},
        methodId: id
      });
    }
  };
  Aurora.addMethod(Aurora.methodSetup);
  Aurora.methodSetup = {
    method: function(id) {
      drawButton({
        posX: (Aurora.canvas.width * 0.25),
        posY: (Aurora.canvas.height * 0.68),
        width: (Aurora.canvas.width * 0.5),
        height: (Aurora.canvas.height * 0.09),
        lineWidth: 1,
        btnColor: 'green',
        txtColor: 'white',
        font: '1.5em serif',
        msg: 'High Scores',
        isFilled: true,
        id: 'highscores',
        action: { method: function(id) { highscoreMenu(); }},
        isModalBtn: false,
        props: {},
        methodId: id
      });
    }
  };
  Aurora.addMethod(Aurora.methodSetup);
  Aurora.methodSetup = {
    method: function(id) {
      drawButton({
        posX: (Aurora.canvas.width * 0.25),
        posY: (Aurora.canvas.height * 0.80),
        width: (Aurora.canvas.width * 0.5),
        height: (Aurora.canvas.height * 0.09),
        lineWidth: 1,
        btnColor: 'green',
        txtColor: 'white',
        font: '1.5em serif',
        msg: 'Settings',
        isFilled: true,
        id: 'settings',
        action: { method: function(id) { settingsMenu(); }},
        isModalBtn: false,
        props: {},
        methodId: id
      });
    }
  };
  Aurora.addMethod(Aurora.methodSetup);
}
function selectSetting() {
  drawMainMenu();
  localStorage.setItem('bustoot-highscores', JSON.stringify(highscoreList));
}
function settingsMenu() {
  Aurora.clearStage();
  Aurora.methodSetup = { method: function(id) {drawRect({ posX: 0, posY: 0, width: Aurora.canvas.width, height: Aurora.canvas.height, lineWidth: 1, color: 'black', isFilled: true, id: 'menu-background', isBackground: false, props: {}, methodId: id });} };
  Aurora.addMethod(Aurora.methodSetup);
  Aurora.methodSetup = { method: function(id) {drawText({ font: '3em serif', msg: 'Settings', posX: (Aurora.canvas.width * 0.5), posY: (Aurora.canvas.height * 0.1), color: 'green', align: 'center', props: {}, id: 'title', methodId: id });} };
  Aurora.addMethod(Aurora.methodSetup);
  Aurora.methodSetup = { method: function(id) {drawText({ font: '2em serif', msg: 'Aurora Quality', posX: (Aurora.canvas.width * 0.5), posY: (Aurora.canvas.height * 0.2), color: 'green', align: 'center', props: {}, id: 'title', methodId: id });} };
  Aurora.addMethod(Aurora.methodSetup);
  Aurora.methodSetup = {
    method: function(id) {
      drawButton({
        posX: (Aurora.canvas.width * 0.25),
        posY: (Aurora.canvas.height * 0.25),
        width: (Aurora.canvas.width * 0.5),
        height: (Aurora.canvas.height * 0.11),
        lineWidth: 1,
        btnColor: Aurora.selectedSetting === Aurora.enumSettings.high ? 'blue' : 'green',
        txtColor: 'white',
        font: '2em serif',
        msg: 'High',
        isFilled: true,
        id: 'high-quality',
        action: { method: function(id) { Aurora.setSettingsHigh(); selectSetting(); }},
        isModalBtn: false,
        props: {},
        methodId: id
      });
    }
  };
  Aurora.addMethod(Aurora.methodSetup);
  Aurora.methodSetup = {
    method: function(id) {
      drawButton({
        posX: (Aurora.canvas.width * 0.25),
        posY: (Aurora.canvas.height * 0.40),
        width: (Aurora.canvas.width * 0.5),
        height: (Aurora.canvas.height * 0.11),
        lineWidth: 1,
        btnColor: Aurora.selectedSetting === Aurora.enumSettings.med ? 'blue' : 'green',
        txtColor: 'white',
        font: '2em serif',
        msg: 'Medium',
        isFilled: true,
        id: 'med-quality',
        action: { method: function(id) { Aurora.setSettingsMed(); selectSetting(); }},
        isModalBtn: false,
        props: {},
        methodId: id
      });
    }
  };
  Aurora.addMethod(Aurora.methodSetup);
  Aurora.methodSetup = {
    method: function(id) {
      drawButton({
        posX: (Aurora.canvas.width * 0.25),
        posY: (Aurora.canvas.height * 0.55),
        width: (Aurora.canvas.width * 0.5),
        height: (Aurora.canvas.height * 0.11),
        lineWidth: 1,
        btnColor: Aurora.selectedSetting === Aurora.enumSettings.low ? 'blue' : 'green',
        txtColor: 'white',
        font: '2em serif',
        msg: 'Low',
        isFilled: true,
        id: 'low-quality',
        action: { method: function(id) { Aurora.setSettingsLow(); selectSetting(); }},
        isModalBtn: false,
        props: {},
        methodId: id
      });
    }
  };
  Aurora.addMethod(Aurora.methodSetup);
  Aurora.methodSetup = {
    method: function(id) {
      drawButton({
        posX: (Aurora.canvas.width * 0.25),
        posY: (Aurora.canvas.height * 0.75),
        width: (Aurora.canvas.width * 0.5),
        height: (Aurora.canvas.height * 0.11),
        lineWidth: 1,
        btnColor: 'green',
        txtColor: 'white',
        font: '2em serif',
        msg: 'Back',
        isFilled: true,
        id: 'back',
        action: { method: function(id) { drawMainMenu(); }},
        isModalBtn: false,
        props: {},
        methodId: id
      });
    }
  };
  Aurora.addMethod(Aurora.methodSetup);
}

function highscoreMenu() {
  Aurora.clearStage();
  Aurora.methodSetup = { method: function(id) {drawRect({ posX: 0, posY: 0, width: Aurora.canvas.width, height: Aurora.canvas.height, lineWidth: 1, color: 'black', isFilled: true, id: 'menu-background', isBackground: false, props: {}, methodId: id });} };
  Aurora.addMethod(Aurora.methodSetup);
  Aurora.methodSetup = { method: function(id) {drawText({ font: '3em serif', msg: 'High Scores', posX: (Aurora.canvas.width * 0.5), posY: (Aurora.canvas.height * 0.1), color: 'green', align: 'center', props: {}, id: 'title', methodId: id });} };
  Aurora.addMethod(Aurora.methodSetup);
  if (highscoreList && highscoreList.length > 0) {
    for (let i = 0; i < highscoreList.length; i++) {
      Aurora.methodSetup = { method: function(id) {drawText({ font: '1.5em serif', msg: highscoreList[i].name + ': ' + highscoreList[i].score, posX: (Aurora.canvas.width * 0.5), posY: (Aurora.canvas.height * 0.2) + (Aurora.canvas.height * (i * 0.11)), color: 'green', align: 'center', props: {}, id: 'title', methodId: id });} };
      Aurora.addMethod(Aurora.methodSetup);
    }
  } else {
    Aurora.methodSetup = { method: function(id) {drawText({ font: '1.5em serif', msg: 'No High Scores Yet!', posX: (Aurora.canvas.width * 0.5), posY: (Aurora.canvas.height * 0.2), color: 'green', align: 'center', props: {}, id: 'title', methodId: id });} };
    Aurora.addMethod(Aurora.methodSetup);
  }

  Aurora.methodSetup = {
    method: function(id) {
      drawButton({
        posX: (Aurora.canvas.width * 0.25),
        posY: (Aurora.canvas.height * 0.75),
        width: (Aurora.canvas.width * 0.5),
        height: (Aurora.canvas.height * 0.11),
        lineWidth: 1,
        btnColor: 'green',
        txtColor: 'white',
        font: '2em serif',
        msg: 'Back',
        isFilled: true,
        id: 'back',
        action: { method: function(id) { drawMainMenu(); }},
        isModalBtn: false,
        props: {},
        methodId: id
      });
    }
  };
  Aurora.addMethod(Aurora.methodSetup);
}

function drawToolbar() {
  Aurora.methodSetup = {
    method: function(id) {
      drawButton({
        posX: (Aurora.canvas.width * 0.01),
        posY: (Aurora.canvas.height * 0.01),
        width: (Aurora.canvas.width * 0.2),
        height: (Aurora.canvas.height * 0.07),
        lineWidth: 1,
        btnColor: 'green',
        txtColor: 'white',
        font: '1em serif',
        msg: 'Exit',
        isFilled: true,
        id: 'exit',
        action: { method: function(id) { drawMainMenu(); }},
        isModalBtn: false,
        props: {},
        methodId: id
      });
    }
  };
  Aurora.addMethod(Aurora.methodSetup);
  Aurora.methodSetup = {
    method: function(id) {
      drawText({
        font: '1.7em serif',
        msg: gamePoints.toString() + ' Points',
        posX: (Aurora.canvas.width * 0.75),
        posY: (Aurora.canvas.height * 0.07),
        color: 'green',
        align: 'center',
        props: {},
        id: 'score-board',
        methodId: id
      });
    }
  };
  Aurora.addMethod(Aurora.methodSetup);
}

function drawDangerArea() {
  dangerMark.color = 'red';
  let dangerTime = setTimeout(function() {
    dangerMark.color = 'black';
    clearTimeout(dangerTime);
  }, 500);
}

function submitHighScore() {
  // get the name
  const highscoreName = document.querySelector('#highscoreName').value;
  highscoreItem.name = highscoreName;
  highscoreItem.score = gamePoints;
  sortHighScoreList();
  highscoreList.push(highscoreItem);
  sortHighScoreList();
  localStorage.setItem('bustoot-highscores', JSON.stringify(highscoreList));
  highscoreItem = { name: '', score: 0 };
  document.querySelector('#highscoreName').value = '';
  document.querySelector('#highscore-wrapper').style = 'display: none';
}
