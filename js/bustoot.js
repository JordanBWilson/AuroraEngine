
(function() {

  Game.canvas = document.getElementById('Stage');
  drawMainMenu();
})();

let ball = {}; // initialize the game ball
let brick = {};
let bricks = [];
let background = {};
let collision = {};

function playGame() { // draw the game
  console.log('Play');
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
      direction: 'top'
    },
    methodId: undefined,
  }
  backgroundTop = {
    posX: 0,
    posY: 0,
    width: Game.canvas.width,
    height: (Game.canvas.height * 0.5),
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
    posY: (Game.canvas.height * 0.5),
    width: Game.canvas.width,
    height: (Game.canvas.height * 0.5),
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
  collision = {
    primary: 'ball',
    target: 'brick',
    method: function(id) {brickCollision(ball, brick)}
  }
  Game.clearStage();
  const backgroundColorTop = { method: function(id) {backgroundTop.methodId = id; drawRect(backgroundTop.posX, backgroundTop.posY, backgroundTop.width, backgroundTop.height, backgroundTop.lineWidth, backgroundTop.color, backgroundTop.isFilled, backgroundTop.id, backgroundTop.isSolid, backgroundTop.isAnim, backgroundTop.isBackground, backgroundTop.props, id);} };
  const backgroundColorBot = { method: function(id) {backgroundBot.methodId = id; drawRect(backgroundBot.posX, backgroundBot.posY, backgroundBot.width, backgroundBot.height, backgroundBot.lineWidth, backgroundBot.color, backgroundBot.isFilled, backgroundBot.id, backgroundBot.isSolid, backgroundBot.isAnim, backgroundBot.isBackground, backgroundBot.props, id);} };
  Game.methodsToRun.push(backgroundColorTop);
  Game.methodsToRun.push(backgroundColorBot);
  // drawGameBricks();
  brick = {
    posX: Game.canvas.width * 0.5,
    posY: Game.canvas.height * 0.10,
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

  let gameBrick = { method: function(id) {brick.methodId = id; drawRect(brick.posX, brick.posY, brick.width, brick.height, brick.lineWidth, brick.color, brick.isFilled, brick.id, brick.isSolid, brick.isAnim, brick.isBackground, brick.props, id);} };
  Game.methodsToRun.push(gameBrick);
  const gameBall = { method: function(id) {ball.methodId = id; drawArc(ball.posX, ball.posY, ball.width,ball.aglStrt, ball.aglEnd, ball.lineWidth, ball.color, ball.isFilled, ball.id, ball.isSolid, ball.isAnim, ball.props, ball.methodId);} };
  Game.methodsToRun.push(gameBall);
  const playGameBall = { method: function(id) { moveGameBall(); }};
  Game.methodsToRun.push(playGameBall);
  Game.collisions.push(collision);
}

function moveGameBall() {
  // Main.stage.clearRect(ball.posX - (Game.canvas.width * 0.05), ball.posY - (Game.canvas.height * 0.02), ball.width * 2, ball.width * 2);
  // ball.posX += (Game.canvas.width * 0.01);
  if (ball.props.direction === 'top') {
    ball.posY -= (Game.canvas.height * 0.01);
  } else if (ball.props.direction === 'bot') {
    ball.posY += (Game.canvas.height * 0.01);
  }

  if (ball.props.direction === 'top' && ball.posY <= 0) {
    ball.props.direction = 'bot';
  }
  if (ball.props.direction === 'bot' && ball.posY > (Game.canvas.height - ball.width)) {
    ball.props.direction = 'top';
  }

  // Game.deleteEntity(ball.methodId);

  // console.log(ball.methodId);
}

function brickCollision(ball, brick) {
  if (ball.props.direction === 'top') {
    ball.props.direction = 'bot';
    brick.props.hp--;
  }
  if (brick.props.hp === 0) {
    Game.deleteEntity(brick.methodId);
  }
}

function drawGameBricks() {

  // for (let i = 1; i < 10; i++) {
  //   brick = {
  //     posX: Game.canvas.width * 0.5,
  //     posY: Game.canvas.height * 0.10,
  //     width: Game.canvas.width * 0.10,
  //     height: Game.canvas.height * 0.05,
  //     lineWidth: 1,
  //     color: 'green',
  //     isFilled: true,
  //     id: 'brick',
  //     isSolid: true,
  //     isAnim: false,
  //     isBackground: false,
  //     props: {
  //       hp: 2
  //     },
  //     methodId: undefined,
  //   }
  //
  //   let gameBrick = { method: function(id) {brick.methodId = id; drawRect(brick.posX, brick.posY, brick.width, brick.height, brick.lineWidth, brick.color, brick.isFilled, brick.id, brick.isSolid, brick.isAnim, brick.isBackground, brick.props, id);} };
  //   Game.methodsToRun.push(gameBrick);
  //   console.log(brick.posX);
  // }

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
         (Game.canvas.width * 0.25),
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
