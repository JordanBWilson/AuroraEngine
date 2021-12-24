let newGame = false;
let highscoreList; // this is an array
let highscoreItem = { name: '', score: 0 };
(function() {

  Game.canvas = document.getElementById('Stage');
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
Game.addCanvasEvent(Game.enumEvents.touchDown, readyPaddle);
Game.addCanvasEvent(Game.enumEvents.touchUp, stopPaddle);
Game.addCanvasEvent(Game.enumEvents.touchMove, movePaddle);

// mouse controls
Game.addCanvasEvent(Game.enumEvents.mouseDown, readyPaddle);
Game.addCanvasEvent(Game.enumEvents.mouseUp, stopPaddle);
Game.addCanvasEvent(Game.enumEvents.mouseMove, movePaddle);

window.addEventListener('resize', function() {
  if (!newGame) {
    setTimeout(function() {
      Game.clearStage();
      gameLevel--;
      gamePoints = 0;
      playGame();
    }, 300);
  }
}, false);

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

function playGame() { // draw the game
  
  if (newGame) {
    gamePoints = 0;
    gameLevel = 0;
    gameLives = 3;
    newGame = false;
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
  
  nextGameLevel();
}

function findGameObjects() {
  // when the game starts up, look for the ball, paddle and bricks
  if (!ball?.methodId) {
    ball = Game.methodObjects.find(x => x.id === 'ball');
  }
  if (!paddle?.methodId) {
    paddle = Game.methodObjects.find(x => x.id === 'paddle');
  }
  if (bricks?.length === 0) {
    bricks = Game.methodObjects.filter(x => x.id === 'brick');
  }
  if (!readyText?.methodId && !gameStart) {
    readyText = Game.methodObjects.find(x => x.id === 'readyText');
  }
  if (!tapText?.methodId && !gameStart) { 
    tapText = Game.methodObjects.find(x => x.id === 'tapText');
  }
  if (!swipeTextTop?.methodId && !gameStart) { 
    swipeTextTop = Game.methodObjects.find(x => x.id === 'swipeTextTop');
  }
  if (!swipeTextBot?.methodId && !gameStart) { 
    swipeTextBot = Game.methodObjects.find(x => x.id === 'swipeTextBot');
  }
  if (!scoreBoard?.methodId && !gameStart) {
    scoreBoard = Game.methodObjects.find(x => x.id === 'score-board');
  }
  if (!dangerMark?.methodId && !gameStart) {
    dangerMark = Game.methodObjects.find(x => x.id === 'danger');
  }
}

function moveGameBall() {
  
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
        ball.posY -= Game.moveEntity(ballSpeed, Game.enumDirections.topDown);
      } else if (ball.props.direction === 'bot') {
        ball.posY += Game.moveEntity(ballSpeed, Game.enumDirections.topDown);
      } else if (ball.props.direction === 'toprt') {
        ball.posY -= Game.moveEntity(ballSpeed, Game.enumDirections.topDown);
        ball.posX += Game.moveEntity(ballSpeed, Game.enumDirections.leftRight);
      } else if (ball.props.direction === 'toplt') {
        ball.posY -= Game.moveEntity(ballSpeed, Game.enumDirections.topDown);
        ball.posX -= Game.moveEntity(ballSpeed, Game.enumDirections.leftRight);
      } else if (ball.props.direction === 'botrt') {
        ball.posY += Game.moveEntity(ballSpeed, Game.enumDirections.topDown);
        ball.posX += Game.moveEntity(ballSpeed, Game.enumDirections.leftRight);
      } else if (ball.props.direction === 'botlt') {
        ball.posY += Game.moveEntity(ballSpeed, Game.enumDirections.topDown);
        ball.posX -= Game.moveEntity(ballSpeed, Game.enumDirections.leftRight);
      }
      if (ball.props.direction === 'toprt' && ball.posX >= (Game.canvas.width - ball.width)) {
        ball.props.direction = 'toplt';
      }
      if (ball.props.direction === 'toplt' && ball.posY <= (Game.entitySize * 8)) {
        ball.props.direction = 'botlt';
      }
      if (ball.props.direction === 'botlt' && ball.posX <= ball.width) {
        ball.props.direction = 'botrt';
      }
      if (ball.props.direction === 'botrt' && ball.posY >= (Game.canvas.height - ball.width)) {
        ball.props.direction = 'toprt';
        if (!isPoweredUp) {
          drawDangerArea();
          gameLives--;
        }
      }
      if (ball.props.direction === 'toplt' && ball.posX <= ball.width) {
        ball.props.direction = 'toprt';
      }
      if (ball.props.direction === 'toprt' && ball.posY <= (Game.entitySize * 8)) {
        ball.props.direction = 'botrt';
      }
      if (ball.props.direction === 'botrt' && ball.posX >= (Game.canvas.width - ball.width)) {
        ball.props.direction = 'botlt';
      }
      if (ball.props.direction === 'botlt' && ball.posY >= (Game.canvas.height - ball.width)) {
        ball.props.direction = 'toplt';
        if (!isPoweredUp) {
          drawDangerArea();
          gameLives--;
        }
      }
      if (ball.props.direction === 'bot' && ball.posY >= (Game.canvas.height - ball.width)) {
        ball.props.direction = 'top';
        if (!isPoweredUp) {
          drawDangerArea();
          gameLives--;
        }
      }
      if (ball.props.direction === 'top' && ball.posY <= (Game.entitySize * 8)) {
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
        Game.deleteEntity(methodId);
      }

    }
  }
  setTimeout(function() {
    ball.props.collision = false;
    if (Game.methodObjects.filter(x => x.id==='brick').length === 0) {
      playGame();
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
    Game.deleteEntity(readyText.methodId);
    Game.deleteEntity(tapText.methodId);
    Game.deleteEntity(swipeTextTop.methodId);
    Game.deleteEntity(swipeTextBot.methodId);
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
        paddle.posX -= Game.moveEntity(4.5, Game.enumDirections.leftRight);
        paddle.props.direction = 'lt';
      }
    } else { // this is the touch screen controls
      if (paddle && paddle.props) {
        paddle.props.direction = 'non';
      }
      if (paddle.posX < event.changedTouches[0].clientX) {
        paddle.posX -= Game.moveEntity(4.5, Game.enumDirections.leftRight);
        paddle.props.direction = 'lt';
      }
    }
    centerPaddle(event);
  }
}

function centerPaddle(event) {
  if (!event.changedTouches) { // this will get the mouse position offset
    paddle.posX = event.clientX * 0.8;
  } else if (event.changedTouches) { // this is getting the touch screen position offset
    if (Game.selectedSetting === Game.enumSettings.high) {
      paddle.posX = event.changedTouches[0].clientX  * 0.8;
    }
    if (Game.selectedSetting === Game.enumSettings.med) {
      paddle.posX = event.changedTouches[0].clientX  * 0.85;
    }
    if (Game.selectedSetting === Game.enumSettings.low) {
      paddle.posX = event.changedTouches[0].clientX  * 0.9;
    }
  }
}

function stopPaddle(event) {
  isPaddleMoving = false;
  if (paddle && paddle.props) {
    paddle.props.direction = 'non';
  }
}

function nextGameLevel() { // draw the game
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
  
  Game.clearStage();
  Game.methodSetup = { method: function(id) { findGameObjects(); }};
  Game.addMethod(Game.methodSetup);
  Game.methodSetup = { method: function(id) { moveGameBall(); }};
  Game.addMethod(Game.methodSetup);
  Game.methodSetup = { 
    method: function(id) {
      drawRect({ 
        posX: 0, 
        posY: 0, 
        width: Game.canvas.width, 
        height: Game.canvas.height, 
        lineWidth: 1, 
        color: 'black', 
        isFilled: true, 
        id: 'background', 
        isSolid: false, 
        isBackground: true, 
        props: {}, 
        methodId: id 
      });
    } 
  };
  Game.addMethod(Game.methodSetup);
  Game.methodSetup = { 
    method: function(id) {
      drawRect({ 
        posX: 0, 
        posY: (Game.canvas.height * 0.90), 
        width: Game.canvas.width, 
        height: Game.canvas.height, 
        lineWidth: 1, 
        color: 'black', 
        isFilled: true, 
        id: 'danger', 
        isSolid: false, 
        isBackground: false, 
        props: {}, 
        methodId: id 
      });
    } 
  };
  Game.addMethod(Game.methodSetup);
  Game.methodSetup = { method: function(id) {drawRect({ posX: (Game.canvas.width * 0.5 - (Game.entityWidth * 12.5)), posY: (Game.canvas.height * 0.82), width: (Game.entityWidth * 25), height: (Game.entitySize * 3), lineWidth: 1, color: 'green', isFilled: true, id: 'paddle', isSolid: true, isBackground: false, props: {direction: 'non'}, methodId: id });} };
  Game.addMethod(Game.methodSetup);
  Game.methodSetup = {
    method: function(id) {
      drawArc({
        posX: (Game.canvas.width * 0.5), 
        posY: (Game.canvas.height * 0.78), 
        width: (Game.entitySize * 2),
        aglStrt: 0, 
        aglEnd: (2 * Math.PI), 
        lineWidth: 1, 
        color: 'green', 
        isFilled: true, 
        id: 'ball', 
        isSolid: true, 
        props: {
          direction: 'top',
          collision: false
        }, 
        methodId: id
      });
    } 
  }
  Game.addMethod(Game.methodSetup);
  Game.methodSetup = { method: function(id) {drawText({ font: '3em serif', msg: 'Ready?', posX: (Game.canvas.width * 0.5), posY: (Game.canvas.height * 0.68), color: 'green', align: 'center', props: {}, id: 'readyText', methodId: id });} };
  Game.addMethod(Game.methodSetup);
  Game.methodSetup = { method: function(id) {drawText({ font: '1em serif', msg: 'Tap to Play', posX: (Game.canvas.width * 0.5), posY: (Game.canvas.height * 0.74), color: 'green', align: 'center', props: {}, id: 'tapText', methodId: id });} };
  Game.addMethod(Game.methodSetup);
  Game.methodSetup = { method: function(id) {drawText({ font: '1em serif', msg: 'Swipe Left And Right', posX: (Game.canvas.width * 0.5), posY: (Game.canvas.height * 0.90), color: 'green', align: 'center', props: {}, id: 'swipeTextTop', methodId: id });} };
  Game.addMethod(Game.methodSetup);
  Game.methodSetup = { method: function(id) {drawText({ font: '1em serif', msg: 'To Move The Paddle', posX: (Game.canvas.width * 0.5), posY: (Game.canvas.height * 0.95), color: 'green', align: 'center', props: {}, id: 'swipeTextBot', methodId: id });} };
  Game.addMethod(Game.methodSetup);
  
  drawToolbar();
  Game.collisionSetup = {
    primary: 'ball',
    target: 'paddle',
    method: function(id) {paddleCollision()},
    methodId: undefined
  }
  Game.addCollision(Game.collisionSetup);
  Game.collisionSetup = {
    primary: 'ball',
    target: 'brick',
    method: function(id) {brickCollision(ball, bricks, this.methodId)},
    methodId: undefined,
  }
  Game.addCollision(Game.collisionSetup);
  gameLevel++;
  if (gameLevel === 1) {
    brickCount = 27;
    drawGameBricks();
  }
  if (gameLevel === 2) {
    brickCount = 45;
    drawGameBricks();
  }
  if (gameLevel === 3) {
    brickCount = 63;
    drawGameBricks();
  }
  if (gameLevel === 4) {
    drawHighScoreMenu();
    drawWinMenu();
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

function drawGameBricks() {
  let rows = 0; // keeps track of the rows being drawn
  let brickNum = 0; // the current brick number in each row
  bricks = [];
  for (let i = 0; i < brickCount; i++) {
    let yPos = 0;
    let xPos = 0;
    if (i < 9) { // this is the first row
      yPos = Game.canvas.height * 0.09;
    } else if (i > 8 && i < 18) {
      yPos = Game.canvas.height * 0.16;
    } else if (i > 17 && i < 27) {
      yPos = Game.canvas.height * 0.23;
    } else if (i > 26 && i < 36) {
      yPos = Game.canvas.height * 0.30;
    } else if (i > 35 && i < 45) {
      yPos = Game.canvas.height * 0.37;
    } else if (i > 44 && i < 54) {
      yPos = Game.canvas.height * 0.44;
    }  else if (i > 53 && i < 63) {
      yPos = Game.canvas.height * 0.51;
    }
    xPos = (Game.canvas.width * 0.005) + (Game.canvas.width * (brickNum * 0.11));
    brickNum++;
    Game.methodSetup = { method: function(id) {drawRect({ posX: xPos, posY: yPos, width: (Game.entityWidth * 10.5), height: (Game.entitySize * 6.5), lineWidth: 1, color: 'green', isFilled: true, id: 'brick', isSolid: true, isBackground: false, props: {hp: 2,powerUp: false}, methodId: id });} };
    Game.addMethod(Game.methodSetup);
    // when we hit the end of the row, move down to the next row
    if (i === 8 || i === 17 || i === 26 || i === 35 || i === 44 || i === 53) {
      rows++;
      brickNum = 0;
    }
  }
}

function drawLoseMenu() {
  Game.clearStage(); 
  newGame = true;
  Game.methodSetup = { method: function(id) {drawRect({ posX: 0, posY: 0, width: Game.canvas.width, height: Game.canvas.height, lineWidth: 1, color: 'black', isFilled: true, id: 'background', isSolid: false, isBackground: false, props: {}, methodId: id });} };
  Game.addMethod(Game.methodSetup);
  Game.methodSetup = { method: function(id) {drawText({ font: '3em serif', msg: 'You Lose!', posX: (Game.canvas.width * 0.5), posY: (Game.canvas.height * 0.1), color: 'green', align: 'center', props: {}, id: 'loseText', methodId: id });} };
  Game.addMethod(Game.methodSetup);
  Game.methodSetup = { method: function(id) {drawText({ font: '2em serif', msg: gamePoints.toString() + ' Points', posX: (Game.canvas.width * 0.5), posY: (Game.canvas.height * 0.24), color: 'green', align: 'center', props: {}, id: 'score', methodId: id });} };
  Game.addMethod(Game.methodSetup);
  Game.methodSetup = {
    method: function(id) {
      drawButton({
        posX: (Game.canvas.width * 0.27),
        posY: (Game.canvas.height * 0.4),
        width: (Game.canvas.width * 0.5),
        height: (Game.entitySize * 11),
        lineWidth: 1,
        btnColor: 'green',
        txtColor: 'white',
        font: '1.5em serif',
        msg: 'Restart',
        isFilled: true,
        id: 'restart',
        isSolid: false,
        action: { method: function(id) { playGame(); }},
        props: {},
        methodId: id
      });
    }
  }
  Game.addMethod(Game.methodSetup);
  Game.methodSetup = {
    method: function(id) {
      drawButton({
        posX: (Game.canvas.width * 0.27),
        posY: (Game.canvas.height * 0.55),
        width: (Game.canvas.width * 0.5),
        height: (Game.entitySize * 11),
        lineWidth: 1,
        btnColor: 'green',
        txtColor: 'white',
        font: '1.5em serif',
        msg: 'Main Menu',
        isFilled: true,
        id: 'exit',
        isSolid: false,
        action: { method: function(id) { drawMainMenu(); }},
        props: {},
        methodId: id
      });
    }
  }
  Game.addMethod(Game.methodSetup);
}

function drawWinMenu() {
  Game.clearStage();
  newGame = true;
  Game.methodSetup = { method: function(id) {drawRect({ posX: 0, posY: 0, width: Game.canvas.width, height: Game.canvas.height, lineWidth: 1, color: 'black', isFilled: true, id: 'background', isSolid: false, isBackground: false, props: {}, methodId: id });} };
  Game.addMethod(Game.methodSetup);
  Game.methodSetup = { method: function(id) {drawText({ font: '3em serif', msg: 'You Win!', posX: (Game.canvas.width * 0.5), posY: (Game.canvas.height * 0.1), color: 'green', align: 'center', props: {}, id: 'winText', methodId: id });} };
  Game.addMethod(Game.methodSetup);
  Game.methodSetup = { method: function(id) {drawText({ font: '2em serif', msg: gamePoints.toString() + ' Points', posX: (Game.canvas.width * 0.5), posY: (Game.canvas.height * 0.24), color: 'green', align: 'center', props: {}, id: 'score', methodId: id });} };
  Game.addMethod(Game.methodSetup);
  Game.methodSetup = {
    method: function(id) {
       drawButton({
        posX: (Game.canvas.width * 0.27),
        posY: (Game.canvas.height * 0.4),
        width: (Game.canvas.width * 0.5),
        height: (Game.entitySize * 11),
        lineWidth: 1,
        btnColor: 'green',
        txtColor: 'white',
        font: '1.5em serif',
        msg: 'Main Menu',
        isFilled: true,
        id: 'main-menu',
        isSolid: false,
        action: { method: function(id) { drawMainMenu(); }},
        props: {},
        methodId: id
      });
    }
  };
  Game.addMethod(Game.methodSetup);
}

function drawMainMenu() { // draw the main menu
  Game.clearStage();
  if (!Game.selectedSetting) {
    Game.setSettingsHigh();
  }
  newGame = true;
  Game.methodSetup = { method: function(id) {drawRect({ posX: 0, posY: 0, width: Game.canvas.width, height: Game.canvas.height, lineWidth: 1, color: 'black', isFilled: true, id: 'menu-background', isSolid: false, isBackground: false, props: {}, methodId: id });} };
  Game.addMethod(Game.methodSetup);
  Game.methodSetup = { method: function(id) {drawText({ font: '3em serif', msg: 'Bustoot', posX: (Game.canvas.width * 0.5), posY: (Game.canvas.height * 0.1), color: 'green', align: 'center', props: {}, id: 'title', methodId: id });} };
  Game.addMethod(Game.methodSetup);
  Game.methodSetup = { method: function(id) {drawText({ font: '1em serif', msg: 'An Arurora Engine Demo', posX: (Game.canvas.width * 0.5), posY: (Game.canvas.height * 0.14), color: 'green', align: 'center', props: {}, id: 'minor', methodId: id });} };
  Game.addMethod(Game.methodSetup);
  Game.methodSetup = { method: function(id) {drawRect({ posX: (Game.canvas.width * 0.01), posY: (Game.canvas.height * 0.17), width: (Game.canvas.width * 0.15), height: (Game.entitySize * 6), lineWidth: 1, color: 'green', isFilled: true, id: 'prop', isSolid: false, isBackground: false, props: {}, methodId: id });} };
  Game.addMethod(Game.methodSetup);
  Game.methodSetup = { method: function(id) {drawRect({ posX: (Game.canvas.width * 0.17), posY: (Game.canvas.height * 0.17), width: (Game.canvas.width * 0.15), height: (Game.entitySize * 6), lineWidth: 1, color: 'green', isFilled: true, id: 'prop', isSolid: false, isBackground: false, props: {}, methodId: id });} };
  Game.addMethod(Game.methodSetup);
  Game.methodSetup = { method: function(id) {drawRect({ posX: (Game.canvas.width * 0.33), posY: (Game.canvas.height * 0.17), width: (Game.canvas.width * 0.17), height: (Game.entitySize * 6), lineWidth: 1, color: 'green', isFilled: true, id: 'prop', isSolid: false, isBackground: false, props: {}, methodId: id });} };
  Game.addMethod(Game.methodSetup);
  Game.methodSetup = { method: function(id) {drawRect({ posX: (Game.canvas.width * 0.51), posY: (Game.canvas.height * 0.17), width: (Game.canvas.width * 0.16), height: (Game.entitySize * 6), lineWidth: 1, color: 'green', isFilled: true, id: 'prop', isSolid: false, isBackground: false, props: {}, methodId: id });} };
  Game.addMethod(Game.methodSetup);
  Game.methodSetup = { method: function(id) {drawRect({ posX: (Game.canvas.width * 0.68), posY: (Game.canvas.height * 0.17), width: (Game.canvas.width * 0.15), height: (Game.entitySize * 6), lineWidth: 1, color: 'green', isFilled: true, id: 'prop', isSolid: false, isBackground: false, props: {}, methodId: id });} };
  Game.addMethod(Game.methodSetup);
  Game.methodSetup = { method: function(id) {drawRect({ posX: (Game.canvas.width * 0.84), posY: (Game.canvas.height * 0.17), width: (Game.canvas.width * 0.15), height: (Game.entitySize * 6), lineWidth: 1, color: 'green', isFilled: true, id: 'prop', isSolid: false, isBackground: false, props: {}, methodId: id });} };
  Game.addMethod(Game.methodSetup);
  Game.methodSetup = { method: function(id) {drawArc({ posX: (Game.canvas.width * 0.1), posY: (Game.canvas.height * 0.3), width: (Game.entitySize * 2), aglStrt: 0, aglEnd: 2 * Math.PI, lineWidth: 2, color: 'green', isFilled: false, id: 'prop', isSolid: false, props: {}, methodId: id });} };
  Game.addMethod(Game.methodSetup);
  Game.methodSetup = { method: function(id) {drawArc({ posX: (Game.canvas.width * 0.12), posY: (Game.canvas.height * 0.32), width: (Game.entitySize * 2), aglStrt: 0, aglEnd: 2 * Math.PI, lineWidth: 2, color: 'green', isFilled: false, id: 'prop', isSolid: false, props: {}, methodId: id });} };
  Game.addMethod(Game.methodSetup);
  Game.methodSetup = { method: function(id) {drawArc({ posX: (Game.canvas.width * 0.14), posY: (Game.canvas.height * 0.34), width: (Game.entitySize * 2), aglStrt: 0, aglEnd: 2 * Math.PI, lineWidth: 2, color: 'green', isFilled: false, id: 'prop', isSolid: false, props: {}, methodId: id });} };
  Game.addMethod(Game.methodSetup);
  Game.methodSetup = { method: function(id) {drawArc({ posX: (Game.canvas.width * 0.16), posY: (Game.canvas.height * 0.36), width: (Game.entitySize * 2), aglStrt: 0, aglEnd: 2 * Math.PI, lineWidth: 2, color: 'green', isFilled: false, id: 'prop', isSolid: false, props: {}, methodId: id });} };
  Game.addMethod(Game.methodSetup);
  Game.methodSetup = { method: function(id) {drawArc({ posX: (Game.canvas.width * 0.18), posY: (Game.canvas.height * 0.38), width: (Game.entitySize * 2), aglStrt: 0, aglEnd: 2 * Math.PI, lineWidth: 2, color: 'green', isFilled: false, id: 'prop', isSolid: false, props: {}, methodId: id });} };
  Game.addMethod(Game.methodSetup);
  Game.methodSetup = { method: function(id) {drawArc({ posX: (Game.canvas.width * 0.20), posY: (Game.canvas.height * 0.40), width: (Game.entitySize * 2), aglStrt: 0, aglEnd: 2 * Math.PI, lineWidth: 2, color: 'green', isFilled: false, id: 'prop', isSolid: false, props: {}, methodId: id });} };
  Game.addMethod(Game.methodSetup);
  Game.methodSetup = { method: function(id) {drawArc({ posX: (Game.canvas.width * 0.22), posY: (Game.canvas.height * 0.42), width: (Game.entitySize * 2), aglStrt: 0, aglEnd: 2 * Math.PI, lineWidth: 2, color: 'green', isFilled: false, id: 'prop', isSolid: false, props: {}, methodId: id });} };
  Game.addMethod(Game.methodSetup);
  Game.methodSetup = { method: function(id) {drawArc({ posX: (Game.canvas.width * 0.24), posY: (Game.canvas.height * 0.44), width: (Game.entitySize * 2), aglStrt: 0, aglEnd: 2 * Math.PI, lineWidth: 2, color: 'green', isFilled: false, id: 'prop', isSolid: false, props: {}, methodId: id });} };
  Game.addMethod(Game.methodSetup);
  Game.methodSetup = { method: function(id) {drawArc({ posX: (Game.canvas.width * 0.26), posY: (Game.canvas.height * 0.46), width: (Game.entitySize * 2), aglStrt: 0, aglEnd: 2 * Math.PI, lineWidth: 2, color: 'green', isFilled: false, id: 'prop', isSolid: false, props: {}, methodId: id });} };
  Game.addMethod(Game.methodSetup);
  Game.methodSetup = { method: function(id) {drawArc({ posX: (Game.canvas.width * 0.28), posY: (Game.canvas.height * 0.48), width: (Game.entitySize * 2), aglStrt: 0, aglEnd: 2 * Math.PI, lineWidth: 2, color: 'green', isFilled: false, id: 'prop', isSolid: false, props: {}, methodId: id });} };
  Game.addMethod(Game.methodSetup);
  Game.methodSetup = { method: function(id) {drawArc({ posX: (Game.canvas.width * 0.32), posY: (Game.canvas.height * 0.52), width: (Game.entitySize * 2), aglStrt: 0, aglEnd: 2 * Math.PI, lineWidth: 2, color: 'green', isFilled: true, id: 'prop', isSolid: false, props: {}, methodId: id });} };
  Game.addMethod(Game.methodSetup);
  Game.methodSetup = {
    method: function(id) {
      drawButton({
        posX: (Game.canvas.width * 0.25),
        posY: (Game.canvas.height * 0.56),
        width: (Game.canvas.width * 0.5),
        height: (Game.entitySize * 9),
        lineWidth: 1,
        btnColor: 'green',
        txtColor: 'white',
        font: '1.5em serif',
        msg: 'Playyy',
        isFilled: true,
        id: 'play',
        isSolid: false,
        action: { method: function(id) { playGame(); }},
        props: {},
        methodId: id
      });
    }
  };
  Game.addMethod(Game.methodSetup);
  Game.methodSetup = {
    method: function(id) {
      drawButton({
        posX: (Game.canvas.width * 0.25),
        posY: (Game.canvas.height * 0.68),
        width: (Game.canvas.width * 0.5),
        height: (Game.entitySize * 9),
        lineWidth: 1,
        btnColor: 'green',
        txtColor: 'white',
        font: '1.5em serif',
        msg: 'High Scores',
        isFilled: true,
        id: 'highscores',
        isSolid: false,
        action: { method: function(id) { highscoreMenu(); }},
        props: {},
        methodId: id
      });
    }
  };
  Game.addMethod(Game.methodSetup);
  Game.methodSetup = {
    method: function(id) {
      drawButton({
        posX: (Game.canvas.width * 0.25),
        posY: (Game.canvas.height * 0.80),
        width: (Game.canvas.width * 0.5),
        height: (Game.entitySize * 9),
        lineWidth: 1,
        btnColor: 'green',
        txtColor: 'white',
        font: '1.5em serif',
        msg: 'Settings',
        isFilled: true,
        id: 'settings',
        isSolid: false,
        action: { method: function(id) { settingsMenu(); }},
        props: {},
        methodId: id
      });
    }
  };
  Game.addMethod(Game.methodSetup);
}

function settingsMenu() {
  Game.clearStage();
  Game.methodSetup = { method: function(id) {drawRect({ posX: 0, posY: 0, width: Game.canvas.width, height: Game.canvas.height, lineWidth: 1, color: 'black', isFilled: true, id: 'menu-background', isSolid: false, isBackground: false, props: {}, methodId: id });} };
  Game.addMethod(Game.methodSetup);
  Game.methodSetup = { method: function(id) {drawText({ font: '3em serif', msg: 'Settings', posX: (Game.canvas.width * 0.5), posY: (Game.canvas.height * 0.1), color: 'green', align: 'center', props: {}, id: 'title', methodId: id });} };
  Game.addMethod(Game.methodSetup);
  Game.methodSetup = { method: function(id) {drawText({ font: '2em serif', msg: 'Game Quality', posX: (Game.canvas.width * 0.5), posY: (Game.canvas.height * 0.2), color: 'green', align: 'center', props: {}, id: 'title', methodId: id });} };
  Game.addMethod(Game.methodSetup);
  Game.methodSetup = {
    method: function(id) {
      drawButton({
        posX: (Game.canvas.width * 0.25),
        posY: (Game.canvas.height * 0.25),
        width: (Game.canvas.width * 0.5),
        height: (Game.entitySize * 11),
        lineWidth: 1,
        btnColor: Game.selectedSetting === Game.enumSettings.high ? 'blue' : 'green',
        txtColor: 'white',
        font: '2em serif',
        msg: 'High',
        isFilled: true,
        id: 'high-quality',
        isSolid: false,
        action: { method: function(id) { Game.setSettingsHigh(); drawMainMenu(); }},
        props: {},
        methodId: id
      });
    }
  };
  Game.addMethod(Game.methodSetup);
  Game.methodSetup = {
    method: function(id) {
      drawButton({
        posX: (Game.canvas.width * 0.25),
        posY: (Game.canvas.height * 0.40),
        width: (Game.canvas.width * 0.5),
        height: (Game.entitySize * 11),
        lineWidth: 1,
        btnColor: Game.selectedSetting === Game.enumSettings.med ? 'blue' : 'green',
        txtColor: 'white',
        font: '2em serif',
        msg: 'Medium',
        isFilled: true,
        id: 'med-quality',
        isSolid: false,
        action: { method: function(id) { Game.setSettingsMed(); drawMainMenu(); }},
        props: {},
        methodId: id
      });
    }
  };
  Game.addMethod(Game.methodSetup);
  Game.methodSetup = {
    method: function(id) {
      drawButton({
        posX: (Game.canvas.width * 0.25),
        posY: (Game.canvas.height * 0.55),
        width: (Game.canvas.width * 0.5),
        height: (Game.entitySize * 11),
        lineWidth: 1,
        btnColor: Game.selectedSetting === Game.enumSettings.low ? 'blue' : 'green',
        txtColor: 'white',
        font: '2em serif',
        msg: 'Low',
        isFilled: true,
        id: 'low-quality',
        isSolid: false,
        action: { method: function(id) { Game.setSettingsLow(); drawMainMenu(); }},
        props: {},
        methodId: id
      });
    }
  };
  Game.addMethod(Game.methodSetup);
  Game.methodSetup = {
    method: function(id) {
      drawButton({
        posX: (Game.canvas.width * 0.25),
        posY: (Game.canvas.height * 0.75),
        width: (Game.canvas.width * 0.5),
        height: (Game.entitySize * 11),
        lineWidth: 1,
        btnColor: 'green',
        txtColor: 'white',
        font: '2em serif',
        msg: 'Back',
        isFilled: true,
        id: 'back',
        isSolid: false,
        action: { method: function(id) { drawMainMenu(); }},
        props: {},
        methodId: id
      });
    }
  };
  Game.addMethod(Game.methodSetup);
}

function highscoreMenu() {
  Game.clearStage();
  Game.methodSetup = { method: function(id) {drawRect({ posX: 0, posY: 0, width: Game.canvas.width, height: Game.canvas.height, lineWidth: 1, color: 'black', isFilled: true, id: 'menu-background', isSolid: false, isBackground: false, props: {}, methodId: id });} };
  Game.addMethod(Game.methodSetup);
  Game.methodSetup = { method: function(id) {drawText({ font: '3em serif', msg: 'High Scores', posX: (Game.canvas.width * 0.5), posY: (Game.canvas.height * 0.1), color: 'green', align: 'center', props: {}, id: 'title', methodId: id });} };
  Game.addMethod(Game.methodSetup);
  if (highscoreList && highscoreList.length > 0) {
    for (let i = 0; i < highscoreList.length; i++) {
      Game.methodSetup = { method: function(id) {drawText({ font: '1.5em serif', msg: highscoreList[i].name + ': ' + highscoreList[i].score, posX: (Game.canvas.width * 0.5), posY: (Game.canvas.height * 0.2) + (Game.canvas.height * (i * 0.11)), color: 'green', align: 'center', props: {}, id: 'title', methodId: id });} };
      Game.addMethod(Game.methodSetup);
    }
  } else {
    Game.methodSetup = { method: function(id) {drawText({ font: '1.5em serif', msg: 'No High Scores Yet!', posX: (Game.canvas.width * 0.5), posY: (Game.canvas.height * 0.2), color: 'green', align: 'center', props: {}, id: 'title', methodId: id });} };
    Game.addMethod(Game.methodSetup);
  }
  
  Game.methodSetup = {
    method: function(id) {
      drawButton({
        posX: (Game.canvas.width * 0.25),
        posY: (Game.canvas.height * 0.75),
        width: (Game.canvas.width * 0.5),
        height: (Game.entitySize * 11),
        lineWidth: 1,
        btnColor: 'green',
        txtColor: 'white',
        font: '2em serif',
        msg: 'Back',
        isFilled: true,
        id: 'back',
        isSolid: false,
        action: { method: function(id) { drawMainMenu(); }},
        props: {},
        methodId: id
      });
    }
  };
  Game.addMethod(Game.methodSetup);
}

function drawToolbar() {
  Game.methodSetup = {
    method: function(id) {
      drawButton({
        posX: (Game.canvas.width * 0.01),
        posY: (Game.canvas.height * 0.01),
        width: (Game.canvas.width * 0.2),
        height: (Game.entitySize * 7),
        lineWidth: 1,
        btnColor: 'green',
        txtColor: 'white',
        font: '1em serif',
        msg: 'Exit',
        isFilled: true,
        id: 'exit',
        isSolid: false,
        action: { method: function(id) { drawMainMenu(); }},
        props: {},
        methodId: id
      });
    }
  };
  Game.addMethod(Game.methodSetup);
  Game.methodSetup = { 
    method: function(id) {
      drawText({ 
        font: '1.7em serif', 
        msg: gamePoints.toString() + ' Points', 
        posX: (Game.canvas.width * 0.75), 
        posY: (Game.canvas.height * 0.07), 
        color: 'green', 
        align: 'center', 
        props: {}, 
        id: 'score-board', 
        methodId: id 
      });
    } 
  };
  Game.addMethod(Game.methodSetup);
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
