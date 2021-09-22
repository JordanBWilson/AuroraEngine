
(function() {
  if (!Game.canvas) {
    console.log('No game stage detected.');
  } else {
    // get this party train moving
    Main.stage = Game.canvas.getContext('2d');
    window.addEventListener('resize', resizeStage, false);
    Game.canvas.addEventListener('click', function(event) {
      screenTapped(event);
    }, false);
    resizeStage();
    mainLoop();
  }
})();

function mainLoop() {
  Main.interval = setInterval(function() {
    if (Game.methodsToRun.length > 0) {
      // run the game
      for (let i = 0; i < Game.methodsToRun.length; i++) {
        // create a random method id future Jordan
        // let newId = Math.floor((Math.random() * 9999)) + '-' + Math.floor((Math.random() * 9999)) + '-' + Math.floor((Math.random() * 9999));
        // console.log(newId);
        Game.methodsToRun[i].method(i); // run through all the methods the user sent us
        if (Game.methodsToRun[i].methodId === undefined) {
          Game.methodsToRun[i].methodId = i;
        }

        Main.intervalAnimateId = requestAnimationFrame(function() {mainLoop});

        if (Main.isStageTapped) { // when the stage is tapped
          if (Game.methodParams[i].isBtn) { // look to see if the user tapped on a button
            isButtonTapped(Game.methodParams[i]);
            if (i == Game.methodsToRun.length - 1) {
              Main.isStageTapped = false;
              Main.tappedX = 0;
              Main.tappedY = 0;
            }
          }
        }
      }
      collisionCheck();
    } else {
      // stop the game
      console.log('The game has stopped. No more methods to listen to.');
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
    Main.isResizing = true;
    const doneResizing = setTimeout(function() {
      Main.isResizing = false;
      clearTimeout(doneResizing);
    }, 50);
  }, Main.resizeWindowTime);
}

function screenTapped(event) {
  Main.isStageTapped = event ? true : false;
  Main.tappedX = event.clientX;
  Main.tappedY = event.clientY;
  Main.intervalPos = 0;
}

function isButtonTapped(btnParams) {
  if (Main.tappedX >= btnParams.posX && Main.tappedX <= btnParams.posX + btnParams.width) {
    if (Main.tappedY >= btnParams.posY && Main.tappedY <= btnParams.posY + btnParams.height) {
      btnParams.action.method();
      Main.isStageTapped = false;
      Main.tappedX = 0;
      Main.tappedY = 0;
    }
  }
}

function collisionCheck() {
  // this will check for any collisions in game
  if (Game.collisions.length > 0) {
    // find all the methods that are accepting collision events
    let solidMethods = Game.methodParams.filter(x => x.isSolid === true);
    if (solidMethods && solidMethods.length > 0) {
      // go through all the collisions
      for (let i = 0; i < Game.collisions.length; i++) {
        let primary = Game.collisions[i].primary;
        let target = Game.collisions[i].target;
        let primaryMethods = Game.methodParams.filter(x => x.id === primary);
        let targetMethods = Game.methodParams.filter(x => x.id === target);

        // find out if a collision is happening
        for (let j = 0; j < primaryMethods.length; j++) {
          for (let k = 0; k < targetMethods.length; k++) {
            if (primaryMethods[j].posX >= targetMethods[k].posX && primaryMethods[j].posX <= targetMethods[k].posX + targetMethods[k].width) {
              let widthOrHeight = 0;
              // because we are dealing with arcs as well, you can't be too careful
              if (!targetMethods[k].height) {
                widthOrHeight = targetMethods[k].width;
              } else {
                widthOrHeight = targetMethods[k].height;
              }
              if (primaryMethods[j].posY >= targetMethods[k].posY && primaryMethods[j].posY <= targetMethods[k].posY + widthOrHeight) {
                Game.collisions[i].methodId = targetMethods[k].methodId;
                Game.collisions[i].method();
              }
            }
            break;
          }
        }
      }
    }
  }
}

function backgroundAnimationCheck(index) {
  if (!Main.isResizing && Game.methodParams[index] && Game.methodParams[index].isBackground) { // is this rect a backgound..
    for (let i = 0; i < Game.methodParams.length; i++) { // find any method param that in colliding with this background
      if (Game.methodParams[i].isAnim) { // is this thing animated? Find if it is colliding with this background

            let widthOrHeight = 0;
            // because we are dealing with arcs as well, there might not be a height. you can't be too careful
            if (!Game.methodParams[i].height) {
              widthOrHeight = Game.methodParams[i].width;
            } else {
              widthOrHeight = Game.methodParams[i].height;
            }

        if (Game.methodParams[i].posX >= Game.methodParams[index].posX - Game.methodParams[i].width &&
           Game.methodParams[i].posX <= Game.methodParams[index].posX + Game.methodParams[index].width + Game.methodParams[i].width) {
          if (Game.methodParams[i].posY >= Game.methodParams[index].posY - widthOrHeight  &&
             Game.methodParams[i].posY <= Game.methodParams[index].posY + Game.methodParams[index].height + widthOrHeight) {

            for (let j = 0; j < Game.methodParams.length; j++) { // look and see if there is anything not animated that needs to be redrawn..
              if (Game.methodParams[j].posX >= Game.methodParams[index].posX - Game.methodParams[j].width &&
                  Game.methodParams[j].posX <= Game.methodParams[index].posX + Game.methodParams[index].width + Game.methodParams[j].width) {

                let widthOrHeight = 0;
                // because we are dealing with arcs as well, there might not be a height. you can't be too careful
                if (!Game.methodParams[j].height) {
                  widthOrHeight = Game.methodParams[j].width;
                } else {
                  widthOrHeight = Game.methodParams[j].height;
                }
                if (Game.methodParams[j].posY >= Game.methodParams[index].posY - Game.methodParams[j].width  &&
                     Game.methodParams[j].posY <= Game.methodParams[index].posY + Game.methodParams[index].height + widthOrHeight) {

                       if (!Game.methodParams[j].isAnim && !Game.methodParams[j].isBackground && j !== index) { // find out what shape this is and redraw it
                         // this will need to be split up as the shapes and graphics grow
                         if (Game.methodParams[j].height) { // check for a rect shape
                           Game.methodParams[j].isAnim = true;
                         }

                       }
                }
              }
            }
            Game.methodParams[index].isAnim = true; // animate the background
          }
        }
      }
    }
  }
}

function doesMethodParamExist(methodId) {
  return Game.methodParams.find(x => x.methodId === methodId) ? true : false;
}

function findMethodParamIndex(methodId) {
  return Game.methodParams.findIndex(x => x.methodId === methodId);
}
