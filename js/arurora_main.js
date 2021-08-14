
let Game = { // the user will want to play with this object
  frameRate: 1000 / 60, // 60 frames a second
  methodsToRun: [], // all the methods to make the game run
  canvas: document.getElementById('Stage'), // need the game stage
  stageWidthPrct: .90, // how much of the screen width will it take up
  stageHeightPrct: .80, // how much of the screen height will it take up
};

let Global = { // global variables to keep the game running nicely
  interval: undefined,
  intervalAnimateId: undefined,
  stage: undefined,
  resizeTime: undefined
};

(function() {
  if (!Game.canvas) {
    console.log('No game stage detected. Add a canvas tag.');
  } else {
    // get this party train moving
    // let testMethod = {method: function() {console.log('test');}}
    // Game.methodsToRun.push(testMethod);
    window.addEventListener('resize', resizeStage, false);
    resizeStage();
    Global.stage = Game.canvas.getContext('2d');

    console.log(Game);
    mainLoop();
  }
})();

function mainLoop() {
  Global.interval = setInterval(function() {
    if (Game.methodsToRun.length > 0) {
      // run the game
      for (let i = 0; i < Game.methodsToRun.length; i++) {
        Game.methodsToRun[i].method(); // run through all the methods the user sent us
        Global.intervalAnimateId = requestAnimationFrame(function() {mainLoop});
      }
    } else {
      // stop the game
      console.log('The game has stopped. No more methods to listen to');
      clearInterval(Global.interval);
      cancelAnimationFrame(Global.intervalAnimateId);
    }
  }, Game.frameRate);
}

function resizeStage() {
  // don't want to grab the new width and height too many times..
  clearTimeout(Global.resizeTime);
  Global.resizeTime = setTimeout(function() {
    Game.canvas.width = window.innerWidth * Game.stageWidthPrct;
    Game.canvas.height = window.innerHeight * Game.stageHeightPrct;
  }, 250);
}
