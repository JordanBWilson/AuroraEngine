
(function() {

  Game.canvas = document.getElementById('Stage');
  drawMainMenu();
})();

let ball = {}; // initialize the game ball
let bricks; // this is an array
let background = {};
let ballBrickCollision = {};
let ballPaddleCollision = {};
let paddle = {};
let readyText = {};
let tapText = {};
let isPaddleMoving = false;
let gamePoints = 0;
let gameStart = false;
let brickCount = 63; // lvl1- 27, lvl2- 45, lvl3- 63
let isPoweredUp = false;
let gameLevel = 0;
let gameLives = 3;

// touch controls
Game.addEvent(Game.enumEvents.touchDown, readyPaddle);
Game.addEvent(Game.enumEvents.touchUp, stopPaddle);
Game.addEvent(Game.enumEvents.touchMove, movePaddle);

// mouse controls
Game.addEvent(Game.enumEvents.mouseDown, readyPaddle);
Game.addEvent(Game.enumEvents.mouseUp, stopPaddle);
Game.addEvent(Game.enumEvents.mouseMove, movePaddle);

function playGame() { // draw the game
  gamePoints = 0;
  gameLevel = 0;
  gameLives = 3;
  isPoweredUp = false;
  bricks;
  ball = {};
  paddle = {};
  readyText = {};
  tapText = {};
  gameStart = false;
  ballBrickCollision = {
    primary: 'ball',
    target: 'brick',
    method: function(id) {brickCollision(ball, bricks, this.methodId)},
    methodId: undefined,
  }
  ballPaddleCollision = {
    primary: 'ball',
    target: 'paddle',
    method: function(id) {paddleCollision()},
    methodId: undefined,
  }
  Game.clearStage();
  const playGameBall = { method: function(id) { moveGameBall(); }};
  Game.methodsToRun.push(playGameBall);
  
  const backgroundColorTop = { method: function(id) {drawRect({ posX: 0, posY: 0, width: Game.canvas.width, height: (Game.canvas.height * 0.65), lineWidth: 1, color: 'black', isFilled: true, id: 'background-top', isSolid: false, isBackground: true, props: {}, methodId: id });} };
  Game.methodsToRun.push(backgroundColorTop);
  const backgroundColorBot = { method: function(id) {drawRect({ posX: 0, posY: (Game.canvas.height * 0.64), width: Game.canvas.width, height: (Game.canvas.height * 0.36), lineWidth: 1, color: 'black', isFilled: true, id: 'background-bot', isSolid: false, isBackground: true, props: {}, methodId: id });} };
  Game.methodsToRun.push(backgroundColorBot);
  
  const gamePaddle = { method: function(id) {drawRect({ posX: (Game.canvas.width * 0.40), posY: (Game.canvas.height * 0.93), width: (Main.entitySize * 28), height: (Main.entitySize * 3), lineWidth: 1, color: 'green', isFilled: true, id: 'paddle', isSolid: true, isBackground: false, props: {direction: 'non'}, methodId: id });} };
  Game.methodsToRun.push(gamePaddle);
  drawGameBricks();
  const gameBall = { 
    method: function(id) {
      drawArc({
        posX: (Game.canvas.width * 0.5), 
        posY: (Game.canvas.height * 0.7), 
        width: (Main.entitySize * 2),
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
  };
  Game.methodsToRun.push(gameBall);
  
  Game.collisions.push(ballBrickCollision);
  Game.collisions.push(ballPaddleCollision);
  nextGameLevel();
}

function moveGameBall() {
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
  
  if (ball?.methodId) {
    if (isPoweredUp) {
      ball.color = 'blue';
    } else {
      ball.color = 'green';
    }
    if (gameStart) {
      if (ball.props.direction === 'top') {
        ball.posY -= Game.moveEntity(1, Game.enumDirections.topDown);
      } else if (ball.props.direction === 'bot') {
        ball.posY += Game.moveEntity(1, Game.enumDirections.topDown);
      } else if (ball.props.direction === 'toprt') {
        ball.posY -= Game.moveEntity(1, Game.enumDirections.topDown);
        ball.posX += Game.moveEntity(1, Game.enumDirections.leftRight);
      } else if (ball.props.direction === 'toplt') {
        ball.posY -= Game.moveEntity(1, Game.enumDirections.topDown);
        ball.posX -= Game.moveEntity(1, Game.enumDirections.leftRight);
      } else if (ball.props.direction === 'botrt') {
        ball.posY += Game.moveEntity(1, Game.enumDirections.topDown);
        ball.posX += Game.moveEntity(1, Game.enumDirections.leftRight);
      } else if (ball.props.direction === 'botlt') {
        ball.posY += Game.moveEntity(1, Game.enumDirections.topDown);
        ball.posX -= Game.moveEntity(1, Game.enumDirections.leftRight);
      }

      if (ball.props.direction === 'toprt' && ball.posX >= (Game.canvas.width - ball.width)) {
        ball.props.direction = 'toplt';
      }
      if (ball.props.direction === 'toplt' && ball.posY <= ball.width) {
        ball.props.direction = 'botlt';
      }
      if (ball.props.direction === 'botlt' && ball.posX <= ball.width) {
        ball.props.direction = 'botrt';
      }
      if (ball.props.direction === 'botrt' && ball.posY >= (Game.canvas.height - ball.width)) {
        ball.props.direction = 'toprt';
        if (!isPoweredUp) {
          gameLives--;
        }
      }
      if (ball.props.direction === 'toplt' && ball.posX <= ball.width) {
        ball.props.direction = 'toprt';
      }
      if (ball.props.direction === 'toprt' && ball.posY <= ball.width) {
        ball.props.direction = 'botrt';
      }
      if (ball.props.direction === 'botrt' && ball.posX >= (Game.canvas.width - ball.width)) {
        ball.props.direction = 'botlt';
      }
      if (ball.props.direction === 'botlt' && ball.posY >= (Game.canvas.height - ball.width)) {
        ball.props.direction = 'toplt';
        if (!isPoweredUp) {
          gameLives--;
        }
      }
      if (ball.props.direction === 'bot' && ball.posY >= (Game.canvas.height - ball.width)) {
        ball.props.direction = 'top';
        if (!isPoweredUp) {
          gameLives--;
        }
      }
      if (ball.props.direction === 'top' && ball.posY <= (ball.width)) {
        ball.props.direction = 'bot';
      }
      if (gameLives === 0) {
        drawLoseMenu();
        gameLives = -1;
        
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
        brickPowerReveal(i);
      }
      if (ball.props.direction === 'bot' && !ball.props.collision) {
        ball.props.direction = 'top';
        ball.props.collision = true;
        bricks[i].props.hp--;
        gamePoints++;
        brickPowerReveal(i);
      }
      if (ball.props.direction === 'toprt' && !ball.props.collision) {
        ball.props.direction = 'botrt';
        ball.props.collision = true;
        bricks[i].props.hp--;
        brickPowerReveal(i);
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
        brickPowerReveal(i);
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
        brickPowerReveal(i);
      }
      if (ball.props.direction === 'botlt' && !ball.props.collision) {
        ball.props.direction = 'toplt';
        ball.props.collision = true;
        bricks[i].props.hp--;
        gamePoints++;
        brickPowerReveal(i);
      }
      if (bricks[i].props.hp < 1 && bricks[i].props.powerUp) {
        gamePowerUp();
      }
      if (bricks[i].props.hp < 1) {
        Game.deleteEntity(methodId);
      }

    }
  }
  setTimeout(function() {
    ball.props.collision = false;
    // game levels need work
    if (Game.methodObjects.filter(x => x.id==='brick').length === 0) {
      // nextGameLevel();
      drawWinMenu();
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
  isPoweredUp = true;
  let powerTime = setTimeout(function() {
    isPoweredUp = false;
    clearTimeout(powerTime);
  }, 6000);
}

function readyPaddle(event) {
  if (!gameStart) {
    gameStart = true;
    Game.deleteEntity(readyText.methodId);
  }
  isPaddleMoving = true;
}

function movePaddle(event) {
  if (gameStart && isPaddleMoving) {
    if (!event.changedTouches) {
      if (paddle && paddle.props) {
        paddle.props.direction = 'non';
      }
      if (paddle.posX < event.clientX) { 
        paddle.posX += Game.moveEntity(2.6, Game.enumDirections.leftRight);
        paddle.props.direction = 'rt';
      }
      if (paddle.posX > event.clientX) {
        paddle.posX -= Game.moveEntity(2.6, Game.enumDirections.leftRight);
        paddle.props.direction = 'lt';
      }
    } else {
      if (paddle && paddle.props) {
        paddle.props.direction = 'non';
      }
      if (paddle.posX < event.changedTouches[0].clientX) { 
        paddle.posX += Game.moveEntity(2.6, Game.enumDirections.leftRight);
        paddle.props.direction = 'rt';
      }
      if (paddle.posX > event.changedTouches[0].clientX) {
        paddle.posX -= Game.moveEntity(2.6, Game.enumDirections.leftRight);
        paddle.props.direction = 'lt';
      }
    }
  }
  
  
}

function stopPaddle(event) {
  isPaddleMoving = false;
  if (paddle && paddle.props) {
    paddle.props.direction = 'non';
  }
}

function nextGameLevel() {
  gameStart = false;
  // currently isn't getting the ball
  ball.posX = (Game.canvas.width * 0.5);
  ball.posY = (Game.canvas.height * 0.54);
  // this text doesn't behave as expected... 
  const majorTitle = { method: function(id) {drawText({ font: '3em serif', msg: 'Ready?', posX: (Game.canvas.width * 0.5), posY: (Game.canvas.height * 0.6), color: 'green', align: 'center', props: {}, methodId: id });} };
  const minorTitle = { method: function(id) {drawText({ font: '1em serif', msg: 'Tap to Continue', posX: (Game.canvas.width * 0.5), posY: (Game.canvas.height * 0.64), color: 'green', align: 'center', props: {}, methodId: id });} };
  Game.methodsToRun.push(majorTitle);
  Game.methodsToRun.push(minorTitle);
  Game.deleteEntity(readyText.methodId);
  Game.deleteEntity(tapText.methodId);
  gameLevel++;
  if (gameLevel === 2) {
    brickCount = 45;
    drawGameBricks();
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
      yPos = Game.canvas.height * 0.01;
    } else if (i > 8 && i < 18) {
      yPos = Game.canvas.height * 0.08;
    } else if (i > 17 && i < 27) {
      yPos = Game.canvas.height * 0.15;
    } else if (i > 26 && i < 36) {
      yPos = Game.canvas.height * 0.22;
    } else if (i > 35 && i < 45) {
      yPos = Game.canvas.height * 0.29;
    } else if (i > 44 && i < 54) {
      yPos = Game.canvas.height * 0.36;
    }  else if (i > 53 && i < 63) {
      yPos = Game.canvas.height * 0.43;
    }
    xPos = (Game.canvas.width * 0.01) + (Game.canvas.width * (brickNum * 0.11));
    brickNum++;
    const gameBrick = { method: function(id) {drawRect({ posX: xPos, posY: yPos, width: (Main.entitySize * 13.5), height: (Main.entitySize * 6.5), lineWidth: 1, color: 'green', isFilled: true, id: 'brick', isSolid: true, isBackground: false, props: {hp: 2,powerUp: false}, methodId: id });} };
    Game.methodsToRun.push(gameBrick);
    // when we hit the end of the row, move down to the next row
    if (i === 8 || i === 17 || i === 26 || i === 35 || i === 44 || i === 53) {
      rows++;
      brickNum = 0;
    }
  }
}

function drawLoseMenu() {
  Game.clearStage();
  const backgroundColor = { method: function(id) {drawRect({ posX: 0, posY: 0, width: Game.canvas.width, height: Game.canvas.height, lineWidth: 1, color: 'black', isFilled: true, id: 'background', isSolid: false, isBackground: false, props: {}, methodId: id });} };
  Game.methodsToRun.push(backgroundColor); 
  const majorTitle = { method: function(id) {drawText({ font: '3em serif', msg: 'You Lose!', posX: (Game.canvas.width * 0.5), posY: (Game.canvas.height * 0.1), color: 'green', align: 'center', props: {}, methodId: id });} };
  const minorTitle = { method: function(id) {drawText({ font: '2em serif', msg: gamePoints.toString() + ' Points', posX: (Game.canvas.width * 0.5), posY: (Game.canvas.height * 0.14), color: 'green', align: 'center', props: {}, methodId: id });} };
  Game.methodsToRun.push(majorTitle);
  Game.methodsToRun.push(minorTitle);
  const playGameMethod = { method: function(id) { playGame(); }}
  const playBtn = {
     method: function(id) {
       drawButton({
        posX: (Game.canvas.width * 0.3),
        posY: (Game.canvas.height * 0.6),
        width: (Game.canvas.width * 0.4),
        height: (Main.entitySize * 7),
        lineWidth: 1,
        btnColor: 'green',
        txtColor: 'white',
        font: '2em serif',
        msg: 'Restart',
        isFilled: true,
        action: playGameMethod,
        props: {},
        methodId: id});
        }
     };
  Game.methodsToRun.push(playBtn);
}

function drawWinMenu() {
  Game.clearStage();
  const backgroundColor = { method: function(id) {drawRect({ posX: 0, posY: 0, width: Game.canvas.width, height: Game.canvas.height, lineWidth: 1, color: 'black', isFilled: true, id: 'background', isSolid: false, isBackground: false, props: {}, methodId: id });} };
  Game.methodsToRun.push(backgroundColor);
  const majorTitle = { method: function(id) {drawText({ font: '3em serif', msg: 'You Win!', posX: (Game.canvas.width * 0.5), posY: (Game.canvas.height * 0.1), color: 'green', align: 'center', props: {}, methodId: id });} };
  const minorTitle = { method: function(id) {drawText({ font: '2em serif', msg: gamePoints.toString() + ' Points', posX: (Game.canvas.width * 0.5), posY: (Game.canvas.height * 0.14), color: 'green', align: 'center', props: {}, methodId: id });} };
  Game.methodsToRun.push(majorTitle);
  Game.methodsToRun.push(minorTitle);
  const mainMenuMethod = { method: function(id) { drawMainMenu(); }}
  const menuBtn = {
     method: function(id) {
       drawButton({
        posX: (Game.canvas.width * 0.3),
        posY: (Game.canvas.height * 0.6),
        width: (Game.canvas.width * 0.4),
        height: (Main.entitySize * 7),
        lineWidth: 1,
        btnColor: 'green',
        txtColor: 'white',
        font: '2em serif',
        msg: 'Main Menu',
        isFilled: true,
        action: mainMenuMethod,
        props: {},
        methodId: id});
        }
     };
  Game.methodsToRun.push(menuBtn);
}

function drawMainMenu() { // draw the main menu
  Game.clearStage();
  Game.setSettingsHigh();
  const backgroundColor = { method: function(id) {drawRect({ posX: 0, posY: 0, width: Game.canvas.width, height: Game.canvas.height, lineWidth: 1, color: 'black', isFilled: true, id: 'menu-background', isSolid: false, isBackground: false, props: {}, methodId: id });} };
  Game.methodsToRun.push(backgroundColor);
  const majorTitle = { method: function(id) {drawText({ font: '3em serif', msg: 'Bustoot', posX: (Game.canvas.width * 0.5), posY: (Game.canvas.height * 0.1), color: 'green', align: 'center', props: {}, id });} };
  const minorTitle = { method: function(id) {drawText({ font: '1em serif', msg: 'An Arurora Engine Demo', posX: (Game.canvas.width * 0.5), posY: (Game.canvas.height * 0.14), color: 'green', align: 'center', props: {}, methodId: id });} };
  Game.methodsToRun.push(majorTitle);
  Game.methodsToRun.push(minorTitle);
  const brick1 = { method: function(id) {drawRect({ posX: (Game.canvas.width * 0.01), posY: (Game.canvas.height * 0.17), width: (Game.canvas.width * 0.15), height: (Main.entitySize * 6), lineWidth: 1, color: 'green', isFilled: true, id: 'prop', isSolid: false, isBackground: false, props: {}, methodId: id });} };
  const brick2 = { method: function(id) {drawRect({ posX: (Game.canvas.width * 0.17), posY: (Game.canvas.height * 0.17), width: (Game.canvas.width * 0.15), height: (Main.entitySize * 6), lineWidth: 1, color: 'green', isFilled: true, id: 'prop', isSolid: false, isBackground: false, props: {}, methodId: id });} };
  const brick3 = { method: function(id) {drawRect({ posX: (Game.canvas.width * 0.33), posY: (Game.canvas.height * 0.17), width: (Game.canvas.width * 0.17), height: (Main.entitySize * 6), lineWidth: 1, color: 'green', isFilled: true, id: 'prop', isSolid: false, isBackground: false, props: {}, methodId: id });} };
  const brick4 = { method: function(id) {drawRect({ posX: (Game.canvas.width * 0.51), posY: (Game.canvas.height * 0.17), width: (Game.canvas.width * 0.16), height: (Main.entitySize * 6), lineWidth: 1, color: 'green', isFilled: true, id: 'prop', isSolid: false, isBackground: false, props: {}, methodId: id });} };
  const brick5 = { method: function(id) {drawRect({ posX: (Game.canvas.width * 0.68), posY: (Game.canvas.height * 0.17), width: (Game.canvas.width * 0.15), height: (Main.entitySize * 6), lineWidth: 1, color: 'green', isFilled: true, id: 'prop', isSolid: false, isBackground: false, props: {}, methodId: id });} };
  const brick6 = { method: function(id) {drawRect({ posX: (Game.canvas.width * 0.84), posY: (Game.canvas.height * 0.17), width: (Game.canvas.width * 0.15), height: (Main.entitySize * 6), lineWidth: 1, color: 'green', isFilled: true, id: 'prop', isSolid: false, isBackground: false, props: {}, methodId: id });} };
  Game.methodsToRun.push(brick1);
  Game.methodsToRun.push(brick2);
  Game.methodsToRun.push(brick3);
  Game.methodsToRun.push(brick4);
  Game.methodsToRun.push(brick5);
  Game.methodsToRun.push(brick6); 
  const ballShadow1 = { method: function(id) {drawArc({ posX: (Game.canvas.width * 0.1), posY: (Game.canvas.height * 0.3), width: (Main.entitySize * 2), aglStrt: 0, aglEnd: 2 * Math.PI, lineWidth: 2, color: 'green', isFilled: false, id: 'prop', isSolid: false, props: {}, methodId: id });} };
  const ballShadow2 = { method: function(id) {drawArc({ posX: (Game.canvas.width * 0.12), posY: (Game.canvas.height * 0.32), width: (Main.entitySize * 2), aglStrt: 0, aglEnd: 2 * Math.PI, lineWidth: 2, color: 'green', isFilled: false, id: 'prop', isSolid: false, props: {}, methodId: id });} };
  const ballShadow3 = { method: function(id) {drawArc({ posX: (Game.canvas.width * 0.14), posY: (Game.canvas.height * 0.34), width: (Main.entitySize * 2), aglStrt: 0, aglEnd: 2 * Math.PI, lineWidth: 2, color: 'green', isFilled: false, id: 'prop', isSolid: false, props: {}, methodId: id });} };
  const ballShadow4 = { method: function(id) {drawArc({ posX: (Game.canvas.width * 0.16), posY: (Game.canvas.height * 0.36), width: (Main.entitySize * 2), aglStrt: 0, aglEnd: 2 * Math.PI, lineWidth: 2, color: 'green', isFilled: false, id: 'prop', isSolid: false, props: {}, methodId: id });} };
  const ballShadow5 = { method: function(id) {drawArc({ posX: (Game.canvas.width * 0.18), posY: (Game.canvas.height * 0.38), width: (Main.entitySize * 2), aglStrt: 0, aglEnd: 2 * Math.PI, lineWidth: 2, color: 'green', isFilled: false, id: 'prop', isSolid: false, props: {}, methodId: id });} };
  const ballShadow6 = { method: function(id) {drawArc({ posX: (Game.canvas.width * 0.20), posY: (Game.canvas.height * 0.40), width: (Main.entitySize * 2), aglStrt: 0, aglEnd: 2 * Math.PI, lineWidth: 2, color: 'green', isFilled: false, id: 'prop', isSolid: false, props: {}, methodId: id });} };
  const ballShadow7 = { method: function(id) {drawArc({ posX: (Game.canvas.width * 0.22), posY: (Game.canvas.height * 0.42), width: (Main.entitySize * 2), aglStrt: 0, aglEnd: 2 * Math.PI, lineWidth: 2, color: 'green', isFilled: false, id: 'prop', isSolid: false, props: {}, methodId: id });} };
  const ballShadow8 = { method: function(id) {drawArc({ posX: (Game.canvas.width * 0.24), posY: (Game.canvas.height * 0.44), width: (Main.entitySize * 2), aglStrt: 0, aglEnd: 2 * Math.PI, lineWidth: 2, color: 'green', isFilled: false, id: 'prop', isSolid: false, props: {}, methodId: id });} };
  const ballShadow9 = { method: function(id) {drawArc({ posX: (Game.canvas.width * 0.26), posY: (Game.canvas.height * 0.46), width: (Main.entitySize * 2), aglStrt: 0, aglEnd: 2 * Math.PI, lineWidth: 2, color: 'green', isFilled: false, id: 'prop', isSolid: false, props: {}, methodId: id });} };
  const ballShadow10 = { method: function(id) {drawArc({ posX: (Game.canvas.width * 0.28), posY: (Game.canvas.height * 0.48), width: (Main.entitySize * 2), aglStrt: 0, aglEnd: 2 * Math.PI, lineWidth: 2, color: 'green', isFilled: false, id: 'prop', isSolid: false, props: {}, methodId: id });} };
  const ball = { method: function(id) {drawArc({ posX: (Game.canvas.width * 0.32), posY: (Game.canvas.height * 0.52), width: (Main.entitySize * 2), aglStrt: 0, aglEnd: 2 * Math.PI, lineWidth: 2, color: 'green', isFilled: true, id: 'prop', isSolid: false, props: {}, methodId: id });} };
  Game.methodsToRun.push(ballShadow1);
  Game.methodsToRun.push(ballShadow2);
  Game.methodsToRun.push(ballShadow3);
  Game.methodsToRun.push(ballShadow4);
  Game.methodsToRun.push(ballShadow5);
  Game.methodsToRun.push(ballShadow6);
  Game.methodsToRun.push(ballShadow7);
  Game.methodsToRun.push(ballShadow8);
  Game.methodsToRun.push(ballShadow9);
  Game.methodsToRun.push(ballShadow10);
  Game.methodsToRun.push(ball);
  const playGameMethod = { method: function(id) { playGame(); }}
  const playBtn = {
     method: function(id) {
       drawButton({
        posX: (Game.canvas.width * 0.3),
        posY: (Game.canvas.height * 0.6),
        width: (Game.canvas.width * 0.4),
        height: (Main.entitySize * 7),
        lineWidth: 1,
        btnColor: 'green',
        txtColor: 'white',
        font: '2em serif',
        msg: 'Playyy',
        isFilled: true,
        action: playGameMethod,
        props: {},
        methodId: id});
        }
     };
  Game.methodsToRun.push(playBtn);
}
