
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
let readyText;
let tapText;
let isPaddleMoving = false;
let gamePoints = 0;
let gameStart = false;
let brickCount = 1; // lvl1- 27, lvl2- 45, lvl3- 63
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
  // readyText;
  // tapText;
  gameStart = false;

  // Game.clearStage();
  
  Game.clearStage();
  Game.methodSetup = { method: function(id) {drawRect({ posX: 0, posY: 0, width: Game.canvas.width, height: (Game.canvas.height * 0.65), lineWidth: 1, color: 'black', isFilled: true, id: 'background-top', isSolid: false, isBackground: true, props: {}, methodId: id });} };
  Game.addMethod(Game.methodSetup);
  Game.methodSetup = { method: function(id) {drawRect({ posX: 0, posY: (Game.canvas.height * 0.64), width: Game.canvas.width, height: (Game.canvas.height * 0.36), lineWidth: 1, color: 'black', isFilled: true, id: 'background-bot', isSolid: false, isBackground: true, props: {}, methodId: id });} };
  Game.addMethod(Game.methodSetup);
  Game.methodSetup = { method: function(id) {drawRect({ posX: (Game.canvas.width * 0.5 - (Game.entityWidth * 12.5)), posY: (Game.canvas.height * 0.82), width: (Game.entityWidth * 25), height: (Game.entitySize * 3), lineWidth: 1, color: 'green', isFilled: true, id: 'paddle', isSolid: true, isBackground: false, props: {direction: 'non'}, methodId: id });} };
  Game.addMethod(Game.methodSetup);
  drawGameBricks();
  Game.methodSetup = {
    method: function(id) {
      drawArc({
        posX: (Game.canvas.width * 0.5), 
        posY: (Game.canvas.height * 0.7), 
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
  nextGameLevel();
  Game.methodSetup = { method: function(id) { moveGameBall(); }};
  Game.addMethod(Game.methodSetup);
  
  
  
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
  if (!readyText?.methodId && !gameStart) {
    readyText = Game.methodObjects.find(x => x.id === 'readyText');
    console.log(readyText);
  }
  if (!tapText?.methodId && !gameStart) {
    tapText = Game.methodObjects.find(x => x.id === 'tapText');
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
      nextGameLevel();
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
  if (!gameStart && readyText?.methodId && tapText?.methodId) {
    gameStart = true;
    
    console.log(readyText);
    // if (readyText?.methoId) {
      readyText.msg = '';
      tapText.msg = '';
      // Game.deleteEntity(readyText.methodId);
      // Game.deleteEntity(tapText.methodId);
    // }
    
    // readyText;
    // tapText;
  // } 
  // else {
    // readyText = Game.methodObjects.find(x => x.id === 'readyText');
    // if (readyText) {
      // readyText.msg = '';
    // }
    
    // console.log(readyText);
  }
  // console.log(readyText?.methodId);
  isPaddleMoving = true;
}

function movePaddle(event) {
  if (gameStart && isPaddleMoving) {
    if (!event.changedTouches) {
      if (paddle && paddle.props) {
        paddle.props.direction = 'non';
      }
      if (paddle.posX < event.clientX) { 
        paddle.posX += Game.moveEntity(4.5, Game.enumDirections.leftRight);
        paddle.props.direction = 'rt';
      }
      if (paddle.posX > event.clientX) {
        paddle.posX -= Game.moveEntity(4.5, Game.enumDirections.leftRight);
        paddle.props.direction = 'lt';
      }
    } else {
      if (paddle && paddle.props) {
        paddle.props.direction = 'non';
      }
      if (paddle.posX < event.changedTouches[0].clientX) { 
        paddle.posX += Game.moveEntity(4.5, Game.enumDirections.leftRight);
        paddle.props.direction = 'rt';
      }
      if (paddle.posX > event.changedTouches[0].clientX) {
        paddle.posX -= Game.moveEntity(4.5, Game.enumDirections.leftRight);
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
  // look into this future Jordan
  // may want to clear the scene and redraw everything
  
  ball.posX = (Game.canvas.width * 0.5);
  ball.posY = (Game.canvas.height * 0.7);
  gameLevel++;
  if (gameLevel === 2) {
    gameLives++;
    brickCount = 45;
    drawGameBricks();
  }
  if (gameLevel === 3) {
    gameLives++;
    brickCount = 63;
    drawGameBricks();
  }
  if (gameLevel === 4) {
    drawWinMenu();
  }
  if (!readyText?.methodId) {
    Game.methodSetup = { method: function(id) {drawText({ font: '3em serif', msg: 'Ready?', posX: (Game.canvas.width * 0.5), posY: (Game.canvas.height * 0.6), color: 'green', align: 'center', props: {}, id: 'readyText', methodId: id });} };
    Game.addMethod(Game.methodSetup);
  } else { // get everything including the move ball function and try 
    // to restart this whole game in the next level function future Jordan
    
    // Game.methodSetup = { method: function(id) {drawText({ font: '3em serif', msg: 'Ready?', posX: (Game.canvas.width * 0.5), posY: (Game.canvas.height * 0.6), color: 'green', align: 'center', props: {}, id: 'readyText', methodId: id });} };
    // Game.addMethod(Game.methodSetup);
    readyText.msg = 'Ready?';
  }
  if (!tapText?.methodId) {
    Game.methodSetup = { method: function(id) {drawText({ font: '1em serif', msg: 'Tap to Continue', posX: (Game.canvas.width * 0.5), posY: (Game.canvas.height * 0.64), color: 'green', align: 'center', props: {}, id: 'tapText', methodId: id });} };
    Game.addMethod(Game.methodSetup);
  } else {
    tapText.msg = 'Tap to Continue';
    // Game.methodSetup = { method: function(id) {drawText({ font: '1em serif', msg: 'Tap to Continue', posX: (Game.canvas.width * 0.5), posY: (Game.canvas.height * 0.64), color: 'green', align: 'center', props: {}, id: 'tapText', methodId: id });} };
    // Game.addMethod(Game.methodSetup);
  }
  setTimeout(function() {
    readyText = Game.methodObjects.find(x => x.id === 'readyText');
    console.log(readyText);
    tapText = Game.methodObjects.find(x => x.id === 'tapText');
    },300);
  
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
  Game.methodSetup = { method: function(id) {drawRect({ posX: 0, posY: 0, width: Game.canvas.width, height: Game.canvas.height, lineWidth: 1, color: 'black', isFilled: true, id: 'background', isSolid: false, isBackground: false, props: {}, methodId: id });} };
  Game.addMethod(Game.methodSetup);
  Game.methodSetup = { method: function(id) {drawText({ font: '3em serif', msg: 'You Lose!', posX: (Game.canvas.width * 0.5), posY: (Game.canvas.height * 0.1), color: 'green', align: 'center', props: {}, id: 'loseText', methodId: id });} };
  Game.addMethod(Game.methodSetup);
  Game.methodSetup = { method: function(id) {drawText({ font: '2em serif', msg: gamePoints.toString() + ' Points', posX: (Game.canvas.width * 0.5), posY: (Game.canvas.height * 0.14), color: 'green', align: 'center', props: {}, id: 'score', methodId: id });} };
  Game.addMethod(Game.methodSetup);
  Game.methodSetup = {
    method: function(id) {
      drawButton({
        posX: (Game.canvas.width * 0.3),
        posY: (Game.canvas.height * 0.6),
        width: (Game.canvas.width * 0.4),
        height: (Game.entitySize * 7),
        lineWidth: 1,
        btnColor: 'green',
        txtColor: 'white',
        font: '2em serif',
        msg: 'Restart',
        isFilled: true,
        action: { method: function(id) { playGame(); }},
        props: {},
        methodId: id
      });
    }
  }
  Game.addMethod(Game.methodSetup);
}

function drawWinMenu() {
  Game.clearStage();
  Game.methodSetup = { method: function(id) {drawRect({ posX: 0, posY: 0, width: Game.canvas.width, height: Game.canvas.height, lineWidth: 1, color: 'black', isFilled: true, id: 'background', isSolid: false, isBackground: false, props: {}, methodId: id });} };
  Game.addMethod(Game.methodSetup);
  Game.methodSetup = { method: function(id) {drawText({ font: '3em serif', msg: 'You Win!', posX: (Game.canvas.width * 0.5), posY: (Game.canvas.height * 0.1), color: 'green', align: 'center', props: {}, id: 'winText', methodId: id });} };
  Game.addMethod(Game.methodSetup);
  Game.methodSetup = { method: function(id) {drawText({ font: '2em serif', msg: gamePoints.toString() + ' Points', posX: (Game.canvas.width * 0.5), posY: (Game.canvas.height * 0.14), color: 'green', align: 'center', props: {}, id: 'score', methodId: id });} };
  Game.addMethod(Game.methodSetup);
  Game.methodSetup = {
    method: function(id) {
       drawButton({
        posX: (Game.canvas.width * 0.3),
        posY: (Game.canvas.height * 0.6),
        width: (Game.canvas.width * 0.4),
        height: (Game.entitySize * 7),
        lineWidth: 1,
        btnColor: 'green',
        txtColor: 'white',
        font: '2em serif',
        msg: 'Main Menu',
        isFilled: true,
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
  Game.setSettingsHigh();
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
        posX: (Game.canvas.width * 0.3),
        posY: (Game.canvas.height * 0.6),
        width: (Game.canvas.width * 0.4),
        height: (Game.entitySize * 7),
        lineWidth: 1,
        btnColor: 'green',
        txtColor: 'white',
        font: '2em serif',
        msg: 'Playyy',
        isFilled: true,
        action: { method: function(id) { playGame(); }},
        props: {},
        methodId: id
      });
    }
  };
  Game.addMethod(Game.methodSetup);
}
