
(function() {

  Game.canvas = document.getElementById('Stage');
  drawMainMenu();
})();

let ball = {}; // initialize the game ball
let bricks = [];
let background = {};
let ballBrickCollision = {};
let ballPaddleCollision = {};
let paddle = {};
let isPaddleMoving = false;
let gamePoints = 0;

function playGame() { // draw the game
  console.log('Play');
  Game.canvas.addEventListener('mousedown', function(event) {
    readyPaddle(event);
  }, false);
  Game.canvas.addEventListener('mouseup', function(event) {
    stopPaddle(event);
  }, false);
  Game.canvas.addEventListener('mousemove', function(event) {
    if (isPaddleMoving) {
      movePaddle(event);
    }
  }, false);
  ball = {
    posX: (Game.canvas.width * 0.5),
    posY: (Game.canvas.height * 0.5),
    width: (Main.entitySize * 2),
    aglStrt: 0,
    aglEnd: 2 * Math.PI,
    lineWidth: 2,
    color: 'green',
    isFilled: true,
    id: 'ball',
    isSolid: true,
    isAnim: false,
    props: {
      direction: 'top',
      collision: false
    },
    methodId: undefined,
  }
  backgroundTop = {
    posX: 0,
    posY: 0,
    width: Game.canvas.width,
    height: (Game.canvas.height * 0.65),
    lineWidth: 1,
    color: 'black',
    isFilled: true,
    id: 'background',
    isSolid: false,
    isAnim: false,
    isBackground: true,
    props: {},
    methodId: undefined,
  }
  backgroundBot = {
    posX: 0,
    posY: (Game.canvas.height * 0.65),
    width: Game.canvas.width,
    height: (Game.canvas.height * 0.35),
    lineWidth: 1,
    color: 'black',
    isFilled: true,
    id: 'background',
    isSolid: false,
    isAnim: false,
    isBackground: true,
    props: {},
    methodId: undefined,
  }
  paddle = {
    posX: Game.canvas.width * (0.45),
    posY: (Game.canvas.height * 0.93),
    width: Game.canvas.width * (0.2),
    height: (Game.canvas.height * 0.04),
    lineWidth: 1,
    color: 'green',
    isFilled: true,
    id: 'paddle',
    isSolid: true,
    isAnim: false,
    isBackground: false,
    props: {
      direction: 'non'
    },
    methodId: undefined,
  }
  ballBrickCollision = {
    primary: 'ball',
    target: 'brick',
    method: function(id) {brickCollision(ball, bricks, this.methodId)},
    methodId: undefined,
  }
  ballPaddleCollision = {
    primary: 'ball',
    target: 'paddle',
    method: function(id) {paddleCollision(ball)},
    methodId: undefined,
  }
  Game.clearStage();
  const backgroundColorTop = { method: function(id) {if (backgroundTop.methodId === undefined){backgroundTop.methodId = id;} drawRect(backgroundTop.posX, backgroundTop.posY, backgroundTop.width, backgroundTop.height, backgroundTop.lineWidth, backgroundTop.color, backgroundTop.isFilled, backgroundTop.id, backgroundTop.isSolid, backgroundTop.isAnim, backgroundTop.isBackground, backgroundTop.props, backgroundTop.methodId);} };
  const backgroundColorBot = { method: function(id) {if (backgroundBot.methodId === undefined){backgroundBot.methodId = id;} drawRect(backgroundBot.posX, backgroundBot.posY, backgroundBot.width, backgroundBot.height, backgroundBot.lineWidth, backgroundBot.color, backgroundBot.isFilled, backgroundBot.id, backgroundBot.isSolid, backgroundBot.isAnim, backgroundBot.isBackground, backgroundBot.props, backgroundBot.methodId);} };
  Game.methodsToRun.push(backgroundColorTop);
  Game.methodsToRun.push(backgroundColorBot);
  const gamePaddle = { method: function(id) {if (paddle.methodId === undefined){paddle.methodId = id;} drawRect(paddle.posX, paddle.posY, paddle.width, paddle.height, paddle.lineWidth, paddle.color, paddle.isFilled, paddle.id, paddle.isSolid, paddle.isAnim, paddle.isBackground, paddle.props, paddle.methodId);} };
  Game.methodsToRun.push(gamePaddle);
  drawGameBricks();
  const gameBall = { method: function(id) {if (ball.methodId === undefined){ball.methodId = id;} drawArc(ball.posX, ball.posY, ball.width,ball.aglStrt, ball.aglEnd, ball.lineWidth, ball.color, ball.isFilled, ball.id, ball.isSolid, ball.isAnim, ball.props, ball.methodId);} };
  Game.methodsToRun.push(gameBall);

  const playGameBall = { method: function(id) { moveGameBall(); }};
  Game.methodsToRun.push(playGameBall);
  Game.collisions.push(ballBrickCollision);
  Game.collisions.push(ballPaddleCollision);
}

function moveGameBall() {
  if (ball.props.direction === 'top') {
    ball.posY -= (Game.canvas.height * 0.01);
  } else if (ball.props.direction === 'bot') {
    ball.posY += (Game.canvas.height * 0.01);
  } else if (ball.props.direction === 'toprt') {
    ball.posY -= (Game.canvas.height * 0.01);
    ball.posX += (Game.canvas.width * 0.01);
  } else if (ball.props.direction === 'toplt') {
    ball.posY -= (Game.canvas.height * 0.01);
    ball.posX -= (Game.canvas.width * 0.01);
  } else if (ball.props.direction === 'botrt') {
    ball.posY += (Game.canvas.height * 0.01);
    ball.posX += (Game.canvas.width * 0.01);
  } else if (ball.props.direction === 'botlt') {
    ball.posY += (Game.canvas.height * 0.01);
    ball.posX -= (Game.canvas.width * 0.01);
  }

  if (ball.props.direction === 'toprt' && ball.posX >= (Game.canvas.width - ball.width)) {
    ball.props.direction = 'toplt';
  }
  if (ball.props.direction === 'toplt' && ball.posY <= 0) {
    ball.props.direction = 'botlt';
  }
  if (ball.props.direction === 'botlt' && ball.posX <= 0) {
    ball.props.direction = 'botrt';
  }
  if (ball.props.direction === 'botrt' && ball.posY >= (Game.canvas.height - ball.width)) {
    ball.props.direction = 'toprt';
  }
  if (ball.props.direction === 'toplt' && ball.posX <= 0) {
    ball.props.direction = 'toprt';
  }
  if (ball.props.direction === 'toprt' && ball.posY <= 0) {
    ball.props.direction = 'botrt';
  }
  if (ball.props.direction === 'botrt' && ball.posX >= (Game.canvas.width - ball.width)) {
    ball.props.direction = 'botlt';
  }
  if (ball.props.direction === 'botlt' && ball.posY >= (Game.canvas.height - ball.width)) {
    ball.props.direction = 'toplt';
  }
  if (ball.props.direction === 'bot' && ball.posY >= (Game.canvas.height - ball.width)) {
    ball.props.direction = 'top';
  }
  if (ball.props.direction === 'top' && ball.posY <= 0) {
    ball.props.direction = 'bot';
  }

}

function brickCollision(ball, bricks, methodId) {
  for (let i = 0; i < bricks.length; i++) {

    if (bricks[i].methodId === methodId) {
      if (ball.props.direction === 'top' && !ball.props.collision) {
        ball.props.direction = 'bot';
        ball.props.collision = true;
        bricks[i].props.hp--;
      }
      if (ball.props.direction === 'bot' && !ball.props.collision) {
        ball.props.direction = 'top';
        ball.props.collision = true;
        bricks[i].props.hp--;
      }
      if (ball.props.direction === 'toprt' && !ball.props.collision) {
        ball.props.direction = 'botrt';
        ball.props.collision = true;
        bricks[i].props.hp--;
      }
      if (ball.props.direction === 'botrt' && !ball.props.collision) {
        ball.props.direction = 'toprt';
        ball.props.collision = true;
        bricks[i].props.hp--;
      }
      if (ball.props.direction === 'toplt' && !ball.props.collision) {
        ball.props.direction = 'botlt';
        ball.props.collision = true;
        bricks[i].props.hp--;
      }
      if (ball.props.direction === 'botlt' && !ball.props.collision) {
        ball.props.direction = 'toplt';
        ball.props.collision = true;
        bricks[i].props.hp--;
      }
      if (bricks[i].props.hp < 1) {
        Game.deleteEntity(methodId);
      }
    }
  }
  setTimeout(function() {
    ball.props.collision = false;
  }, 30);
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
    ball.props.direction = 'toplt';
  }
  if (ball.props.direction === 'botlt' && paddle.props.direction === 'rt') {
    ball.props.direction = 'toplt';
  }
  if (ball.props.direction === 'bot' && paddle.props.direction === 'lt') {
    ball.props.direction = 'toprt';
  }
  if (ball.props.direction === 'botlt' && paddle.props.direction === 'lt') {
    ball.props.direction = 'toprt';
  }
  if (ball.props.direction === 'botrt' && paddle.props.direction === 'lt') {
    ball.props.direction = 'toplt';
  }
}

function readyPaddle(event) {
  isPaddleMoving = true;
}

function movePaddle(event) {
  paddle.props.direction = 'non';
  if (paddle.posX < event.clientX) {
    paddle.posX += Game.canvas.width * (0.016);
    paddle.props.direction = 'rt';
  }
  if (paddle.posX > event.clientX) {
    paddle.posX -= Game.canvas.width * (0.016);
    paddle.props.direction = 'lt';
  }
}

function stopPaddle(event) {
  isPaddleMoving = false;
  paddle.props.direction = 'non';
}

function drawGameBricks() {
  let rows = 0; // keeps track of the rows being drawn
  let brickNum = 0; // the current brick number in each row
  for (let i = 0; i < 63; i++) {
    let yPos = 0;
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
    let brick = {
      posX: Game.canvas.width * (0.01) + (Game.canvas.width * (brickNum * 0.11)),
      posY: yPos,
      width: Game.canvas.width * 0.10,
      height: Game.canvas.height * 0.05,
      lineWidth: 1,
      color: 'green',
      isFilled: true,
      id: 'brick',
      isSolid: true,
      isAnim: false,
      isBackground: false,
      props: {
        hp: 2
      },
      methodId: undefined,
    }
    bricks.push(brick);
    brickNum++;
    let gameBrick = { method: function(id) {if (bricks[i].methodId === undefined){bricks[i].methodId = id;} drawRect(bricks[i].posX, bricks[i].posY, bricks[i].width, bricks[i].height, bricks[i].lineWidth, bricks[i].color, bricks[i].isFilled, bricks[i].id, bricks[i].isSolid, bricks[i].isAnim, bricks[i].isBackground, bricks[i].props, bricks[i].methodId);}};
    Game.methodsToRun.push(gameBrick);
    // when we hit the end of the row, move down to the next row
    if (i === 8 || i === 17 || i === 26 || i === 35 || i === 44 || i === 53) {
      rows++;
      brickNum = 0;
    }
  }
}

function drawMainMenu() { // draw the main menu
  Game.clearStage();
  const backgroundColor = { method: function(id) {drawRect(0, 0, Game.canvas.width, Game.canvas.height, 1, 'black', true, 'background', false, false, false, {}, id);} };
  Game.methodsToRun.push(backgroundColor);
  const majorTitle = { method: function(id) {drawText('3em serif', 'Bustoot', (Game.canvas.width * 0.5), (Game.canvas.height * 0.1), 'green', 'center', false, {}, id);} };
  const minorTitle = { method: function(id) {drawText('16px serif', 'An Arurora Engine Demo', (Game.canvas.width * 0.5), (Game.canvas.height * 0.14), 'green', 'center', false, {}, id);} };
  Game.methodsToRun.push(majorTitle);
  Game.methodsToRun.push(minorTitle);
  const brick1 = { method: function(id) {drawRect((Game.canvas.width * 0.01), (Game.canvas.height * 0.17), (Game.canvas.width * 0.15), (Main.entitySize * 6), 1, 'green', true, 'prop', false, false, false, {}, id);} };
  const brick2 = { method: function(id) {drawRect((Game.canvas.width * 0.17), (Game.canvas.height * 0.17), (Game.canvas.width * 0.15), (Main.entitySize * 6), 1, 'green', true, 'prop', false, false, false, {}, id);} };
  const brick3 = { method: function(id) {drawRect((Game.canvas.width * 0.33), (Game.canvas.height * 0.17), (Game.canvas.width * 0.17), (Main.entitySize * 6), 1, 'green', true, 'prop', false, false, false, {}, id);} };
  const brick4 = { method: function(id) {drawRect((Game.canvas.width * 0.51), (Game.canvas.height * 0.17), (Game.canvas.width * 0.16), (Main.entitySize * 6), 1, 'green', true, 'prop', false, false, false, {}, id);} };
  const brick5 = { method: function(id) {drawRect((Game.canvas.width * 0.68), (Game.canvas.height * 0.17), (Game.canvas.width * 0.15), (Main.entitySize * 6), 1, 'green', true, 'prop', false, false, false, {}, id);} };
  const brick6 = { method: function(id) {drawRect((Game.canvas.width * 0.84), (Game.canvas.height * 0.17), (Game.canvas.width * 0.15), (Main.entitySize * 6), 1, 'green', true, 'prop', false, false, false, {}, id);} };
  Game.methodsToRun.push(brick1);
  Game.methodsToRun.push(brick2);
  Game.methodsToRun.push(brick3);
  Game.methodsToRun.push(brick4);
  Game.methodsToRun.push(brick5);
  Game.methodsToRun.push(brick6);
  const ballShadow1 = { method: function(id) {drawArc((Game.canvas.width * 0.1), (Game.canvas.height * 0.3), (Main.entitySize * 2), 0, 2 * Math.PI, 2, 'green', false, 'prop', false, false, {}, id);} };
  const ballShadow2 = { method: function(id) {drawArc((Game.canvas.width * 0.12), (Game.canvas.height * 0.32), (Main.entitySize * 2), 0, 2 * Math.PI, 2, 'green', false, 'prop', false, false, {}, id);} };
  const ballShadow3 = { method: function(id) {drawArc((Game.canvas.width * 0.14), (Game.canvas.height * 0.34), (Main.entitySize * 2), 0, 2 * Math.PI, 2, 'green', false, 'prop', false, false, {}, id);} };
  const ballShadow4 = { method: function(id) {drawArc((Game.canvas.width * 0.16), (Game.canvas.height * 0.36), (Main.entitySize * 2), 0, 2 * Math.PI, 2, 'green', false, 'prop', false, false, {}, id);} };
  const ballShadow5 = { method: function(id) {drawArc((Game.canvas.width * 0.18), (Game.canvas.height * 0.38), (Main.entitySize * 2), 0, 2 * Math.PI, 2, 'green', false, 'prop', false, false, {}, id);} };
  const ballShadow6 = { method: function(id) {drawArc((Game.canvas.width * 0.20), (Game.canvas.height * 0.40), (Main.entitySize * 2), 0, 2 * Math.PI, 2, 'green', false, 'prop', false, false, {}, id);} };
  const ballShadow7 = { method: function(id) {drawArc((Game.canvas.width * 0.22), (Game.canvas.height * 0.42), (Main.entitySize * 2), 0, 2 * Math.PI, 2, 'green', false, 'prop', false, false, {}, id);} };
  const ballShadow8 = { method: function(id) {drawArc((Game.canvas.width * 0.24), (Game.canvas.height * 0.44), (Main.entitySize * 2), 0, 2 * Math.PI, 2, 'green', false, 'prop', false, false, {}, id);} };
  const ballShadow9 = { method: function(id) {drawArc((Game.canvas.width * 0.26), (Game.canvas.height * 0.46), (Main.entitySize * 2), 0, 2 * Math.PI, 2, 'green', false, 'prop', false, false, {}, id);} };
  const ballShadow10 = { method: function(id) {drawArc((Game.canvas.width * 0.28), (Game.canvas.height * 0.48), (Main.entitySize * 2), 0, 2 * Math.PI, 2, 'green', false, 'prop', false, false, {}, id);} };
  const ball = { method: function(id) {drawArc((Game.canvas.width * 0.32), (Game.canvas.height * 0.52), (Main.entitySize * 2), 0, 2 * Math.PI, 2, 'green', true, 'prop', false, false, {}, id);} };
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
       drawButton(
         (Game.canvas.width * 0.3),
         (Game.canvas.height * 0.6),
         (Game.canvas.width * 0.4),
         (Main.entitySize * 7),
         1,
         'green',
         'white',
         '2em serif',
         'Playyy',
          true,
          playGameMethod,
          false,
          {},
          id);
        }
     };
  Game.methodsToRun.push(playBtn);
}
