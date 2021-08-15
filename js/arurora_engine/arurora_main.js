
(function() {
  if (!Game.canvas) {
    console.log('No game stage detected.');
    // console.log('To add a game stage, create a canvas tag on your html file.');
    // console.log('Then assign it to the game like this:');
    // console.log('_________________________________________');
    // console.log('Game.canvas = document.getElementById("Stage");');
    // console.log('_________________________________________');
  } else {
    // get this party train moving
    // let method = {method: function() {console.log('test');}}
    // Game.methodsToRun.push(testMethod);
    Main.stage = Game.canvas.getContext('2d');
    window.addEventListener('resize', resizeStage, false);
    resizeStage();

    console.log(Game);
    mainLoop();
  }
})();

function mainLoop() {
  Main.interval = setInterval(function() {
    if (Game.methodsToRun.length > 0) {
      // run the game
      for (let i = 0; i < Game.methodsToRun.length; i++) {
        Game.methodsToRun[i].method(i); // run through all the methods the user sent us
        Main.intervalAnimateId = requestAnimationFrame(function() {mainLoop});
      }
    } else {
      // stop the game
      console.log('The game has stopped. No more methods to listen to.');
      // console.log('Assign new methods to the game like this:');
      // console.log('_________________________________________');
      // console.log('let method = {method: function() {console.log("test");}};');
      // console.log('Game.methodsToRun.push(method);');
      // console.log('_________________________________________');
      // console.log('Now you will see the the word test being ran indefinetly in the console.');
      clearInterval(Main.interval);
      cancelAnimationFrame(Main.intervalAnimateId);
    }
  }, Game.frameRate);
}

function resizeStage() {
  // don't want to grab the new width and height too many times..
  clearTimeout(Main.resizeWindow);
  Main.resizeWindow = setTimeout(function() {
    // resize the game stage and set new base values
    Game.canvas.width = window.innerWidth * Game.stageWidthPrct;
    Game.canvas.height = window.innerHeight * Game.stageHeightPrct;
    Main.entitySize = (Game.canvas.height * 0.01);
    Main.entityWidth = (Game.canvas.width * 0.01);
  }, Main.resizeWindowTime);
}
