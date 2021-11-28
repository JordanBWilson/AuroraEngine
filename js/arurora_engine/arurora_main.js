
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
        if (Main.clearStage === true) {
          Main.clearStage = false;
          break;
        }
        if (Game.methodsToRun[i].methodId === undefined) { // if there isn't a methodId, add one
          Main.globalId++;
          Game.methodsToRun[i].methodId = Main.globalId;
        }
        Game.methodsToRun[i].method(Game.methodsToRun[i].methodId); // run through all the methods the user sent us
        if (Main.isStageTapped) { // when the stage is tapped
          if (Game.methodObjects[i]?.isBtn) { // look to see if the user tapped on a button
            isButtonTapped(Game.methodObjects[i]);
            if (i == Game.methodsToRun.length - 1) {
              Main.isStageTapped = false;
              Main.tappedX = 0;
              Main.tappedY = 0;
            }
          } else if (i === (Game.methodsToRun.length - 1)) {
            Main.isStageTapped = false;
          }
        }
      }
      collisionCheck();
    } else {
      // stop the game
      console.log('The game has stopped. No more methods to listen to.');
      clearInterval(Main.interval);
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
    }, 100);
  }, Main.resizeWindowTime);
}

function screenTapped(event) {
  Main.isStageTapped = event ? true : false;
  Main.tappedX = event.clientX;
  Main.tappedY = event.clientY;
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
    let solidMethods = Game.methodObjects.filter(x => x.isSolid === true);
    if (solidMethods && solidMethods.length > 0) {
      // go through all the collisions
      for (let i = 0; i < Game.collisions.length; i++) {
        let primary = Game.collisions[i].primary;
        let target = Game.collisions[i].target;
        let primaryMethods = Game.methodObjects.filter(x => x.id === primary);
        let targetMethods = Game.methodObjects.filter(x => x.id === target);
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
                break;
              }
            }
          }
        }
      }
    }
  }
}

function backgroundAnimationCheck(index) {
  if (!Main.isResizing && Game.methodObjects[index] && Game.methodObjects[index].isBackground) { // is this rect a backgound..
    for (let i = 0; i < Game.methodObjects.length; i++) { // find any method param that in colliding with this background
      if (Game.methodObjects[i].isAnim) { // is this thing animated? Find if it is colliding with this background

            let widthOrHeight = 0;
            // because we are dealing with arcs as well, there might not be a height. you can't be too careful
            if (!Game.methodObjects[i].height) {
              widthOrHeight = Game.methodObjects[i].width;
            } else {
              widthOrHeight = Game.methodObjects[i].height;
            }

        if (Game.methodObjects[i].posX >= Game.methodObjects[index].posX - Game.methodObjects[i].width &&
           Game.methodObjects[i].posX <= Game.methodObjects[index].posX + Game.methodObjects[index].width + Game.methodObjects[i].width) {
          if (Game.methodObjects[i].posY >= Game.methodObjects[index].posY - widthOrHeight  &&
             Game.methodObjects[i].posY <= Game.methodObjects[index].posY + Game.methodObjects[index].height + widthOrHeight) {

            for (let j = 0; j < Game.methodObjects.length; j++) { // look and see if there is anything not animated that needs to be redrawn..
              if (Game.methodObjects[j].posX >= Game.methodObjects[index].posX - Game.methodObjects[j].width &&
                  Game.methodObjects[j].posX <= Game.methodObjects[index].posX + Game.methodObjects[index].width + Game.methodObjects[j].width) {

                let widthOrHeight = 0;
                // because we are dealing with arcs as well, there might not be a height. you can't be too careful
                if (!Game.methodObjects[j].height) {
                  widthOrHeight = Game.methodObjects[j].width;
                } else {
                  widthOrHeight = Game.methodObjects[j].height;
                }
                if (Game.methodObjects[j].posY >= Game.methodObjects[index].posY - Game.methodObjects[j].width  &&
                     Game.methodObjects[j].posY <= Game.methodObjects[index].posY + Game.methodObjects[index].height + widthOrHeight) {

                       if (!Game.methodObjects[j].isAnim && !Game.methodObjects[j].isBackground && j !== index) { // find out what shape this is and redraw it
                         // this will need to be split up as the shapes and graphics grow
                         if (Game.methodObjects[j].height) { // check for a rect shape
                           Game.methodObjects[j].isAnim = true;
                         }

                       }
                }
              }
            }
            Game.methodObjects[index].isAnim = true; // animate the background
          }
        }
      }
    }
  }
}

function doesMethodParamExist(methodId) {
  return Game.methodObjects.find(x => x.methodId === methodId) ? true : false;
}

function findMethodParamIndex(methodId) {
  // for (let i = 0; i < Game.methodObjects.length; i++) {
    // if (Game.methodObjects[i].methodId === methodId) {
      // return i;
    // }
  // }
  
  return Game.methodObjects.findIndex(x => x.methodId === methodId);
}
