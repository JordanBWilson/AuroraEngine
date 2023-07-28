// These are the core methods to run a game.

// Copyright (C) 2023  Jordan Wilson
//
// This library is free software; you can redistribute it and/or
// modify it under the terms of the GNU Lesser General Public
// License as published by the Free Software Foundation; either
// version 2.1 of the License.

// This library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
// Lesser General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

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
    // this takes out the old animationId when the page is refreshed
    cancelAnimationFrame(Main.intervalAnimateId);
    window.addEventListener('beforeunload', function(e) { cancelAnimationFrame(Main.intervalAnimateId); });
    Main.intervalAnimateId = requestAnimationFrame(function() {
		if (typeof mainLoop !== 'undefined') {
			mainLoop(); 
		}
	});
  }
})();

function mainLoop() {

  Main.interval = setInterval(function() {
    if (Game.isLoaded) {
      if (Main.methodsToRun.length > 0) {
        // run the game
        for (let i = 0; i < Main.methodsToRun.length; i++) {
          if (Main.clearStage === true) {
            Main.clearStage = false;
            break;
          }
          if (Main.methodsToRun[i].layer !== 0) {
			  // layer the methods
			  Main.methodsToRun.sort(function(a, b) {
				return a?.layer - b?.layer;
			  });
			  Game.methodObjects.sort(function(a, b) {
				return a?.layer - b?.layer;
			  });
		  }
          if (Main.methodsToRun[i].methodId === undefined) { // if there isn't a methodId, add one
            Main.globalId = Math.floor((Math.random() * 9007199254740992) + 1); // max int size
            Main.methodsToRun[i].methodId = Main.globalId;
          }
          Main.methodsToRun[i].method(Main.methodsToRun[i].methodId); // run through all the methods the user sent us
          if (Main.isStageTapped) { // when the stage is tapped
            if (Game.methodObjects[i]?.isBtn) { // look to see if the user tapped on a button
              isButtonTapped(Game.methodObjects[i]);
              if (i == Main.methodsToRun.length - 1) {
                Main.isStageTapped = false;
                Main.tappedX = 0;
                Main.tappedY = 0;
              }
            } else if (i === (Main.methodsToRun.length - 1)) {
              Main.isStageTapped = false;
            }
          }
			if (Game.methodObjects[i]?.id === Game.modalId) {
				Main.isModalVisible = true;
			}
        }
        collisionCheck();
        if (Main.isResizing && Game.pageResized.section.length > 0) {
			Game.pageResized.method();
		}

      } else {
        // stop the game
        console.log('The game has stopped. No more methods to listen to.');
        clearInterval(Main.interval);
        cancelAnimationFrame(Main.intervalAnimateId);
      }
    } else {
      removeLoadingScreen();
    }
  }, Game.frameRate);
}

function resizeStage() {
  // don't want to grab the new width and height too many times..
  clearTimeout(Main.resizeWindow);
  if (!Game.keepPreviousSize) {
	Main.resizeWindow = setTimeout(function() {
		// resize the game stage and set new base values
		Game.canvas.width = window.innerWidth * Game.stageWidthPrct;
		Game.canvas.height = window.innerHeight * Game.stageHeightPrct;
		Game.entitySize = (Game.canvas.height * 0.01);
		Game.entityWidth = (Game.canvas.width * 0.01);
		Main.isResizing = true;
		Game.isLoaded = true;
		const doneResizing = setTimeout(function() {
		  Main.isResizing = false;
		  removeLoadingScreen();
		  clearTimeout(doneResizing);
		}, 100);
	  }, Main.resizeWindowTime);
  }
  
}

function screenTapped(event) {
	const boundingBox = Game.canvas.getBoundingClientRect();
	Main.isStageTapped = event ? true : false;
	Main.tappedX = event.clientX - boundingBox.left;
	Main.tappedY = event.clientY - boundingBox.top;
}

function isButtonTapped(btnParams) {
	if (Main.tappedY >= btnParams.posY && Main.tappedY <= btnParams.posY + btnParams.height) {
		if (Main.tappedX >= btnParams.posX && Main.tappedX <= btnParams.posX + btnParams.width) {
			if (!Main.isModalVisible && !btnParams.isModalBtn) {
				btnParams.action.method();
				Main.isStageTapped = false;
				Main.tappedX = 0;
				Main.tappedY = 0;
			} else if(Main.isModalVisible && btnParams.isModalBtn) {
				btnParams.action.method();
				Main.isStageTapped = false;
				Main.tappedX = 0;
				Main.tappedY = 0;
			}
      
		}
	}
}

function collisionCheck() {
  // this will check for any collisions in game
  // go through all the collisions
  for (let i = 0; i < Main.collisions.length; i++) {
    let primary = Main.collisions[i].primary;
    let target = Main.collisions[i].target;
    let primaryMethods = Game.methodObjects.filter(x => x.id === primary);
    let targetMethods = Game.methodObjects.filter(x => x.id === target);
    // find out if a collision is happening
    
    // *** this is a test for future collisions ***
    // const isCollisionY = !!primaryMethods.find(x => targetMethods.find(y => x.posY + (x.width * 0.94) >= y.posY && x.posY <= (y.posY + (!y.height ? y.width : y.height))));
    // future Jordan, do the same thing for the X axis
    // console.log(isCollisionY);
    // *** end test ***
    
    for (let j = 0; j < primaryMethods.length; j++) {
      for (let k = 0; k < targetMethods.length; k++) {
        let widthOrHeight = 0;
        // because we are dealing with arcs as well, you can't be too careful
        if (!targetMethods[k]?.height) {
          widthOrHeight = targetMethods[k].width;
        } else {
          widthOrHeight = targetMethods[k].height;
        }
        if (primaryMethods[j].posY + (primaryMethods[j].width * 0.94) >= targetMethods[k].posY && primaryMethods[j].posY <= (targetMethods[k].posY + widthOrHeight)) {
          if (primaryMethods[j].posX + (primaryMethods[j].width * 0.94) >= targetMethods[k].posX && primaryMethods[j].posX <= (targetMethods[k].posX + targetMethods[k].width)) {
            Main.collisions[i].methodId = targetMethods[k].methodId;
            Main.collisions[i].method(targetMethods[k].methodId);
            break;
          }
        }
      }
    }
  }
}

function backgroundAnimationCheck(index) {
  if (!Main.isResizing && Game.methodObjects[index] && Game.methodObjects[index].isBackground) { // is this rect a backgound..
    for (let i = 0; i < Game.methodObjects.length; i++) { // find any method object that in colliding with this background
      if (Game.methodObjects[i].isAnim && !Game.methodObjects[i].isBtn) { // is this thing animated? Find if it is colliding with this background
        // future Jordan. '&& !Game.methodObjects[i].isBtn' check may not be needed there. fixes a bug with the button on an animated screen
        let widthOrHeight = findWidthHeightMethodObjects(i);
        if (Game.methodObjects[i].posY >= Game.methodObjects[index].posY - widthOrHeight  &&
           Game.methodObjects[i].posY <= Game.methodObjects[index].posY + Game.methodObjects[index].height + widthOrHeight) {
          if (Game.methodObjects[i].posX >= Game.methodObjects[index].posX - Game.methodObjects[i].width &&
             Game.methodObjects[i].posX <= Game.methodObjects[index].posX + Game.methodObjects[index].width + Game.methodObjects[i].width) {

            for (let j = 0; j < Game.methodObjects.length; j++) { // look and see if there is anything not animated that needs to be redrawn..
              let widthOrHeight = findWidthHeightMethodObjects(j);
              if (Game.methodObjects[j].posY >= Game.methodObjects[index].posY - Game.methodObjects[j].width  &&
                   Game.methodObjects[j].posY <= Game.methodObjects[index].posY + Game.methodObjects[index].height + widthOrHeight || Game.methodObjects[j].align) {
                if (Game.methodObjects[j].posX >= Game.methodObjects[index].posX - Game.methodObjects[j].width &&
                    Game.methodObjects[j].posX <= Game.methodObjects[index].posX + Game.methodObjects[index].width + Game.methodObjects[j].width || Game.methodObjects[j].align) {
                  // find out what shape this is and redraw it
                  if (!Game.methodObjects[j].isAnim && !Game.methodObjects[j].isBackground && j !== index) {
                    // this will need to be split up as the shapes and graphics grow
                    if (Game.methodObjects[j].height) { // check for a rect shape
                      Game.methodObjects[j].isAnim = true;
                    }
                  }
                  // redraw this text
                  if(Game.methodObjects[j].align && j !== index && !Game.methodObjects[j].isAnim) {
                    Game.methodObjects[j].isAnim = true;
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
  return Game.methodObjects.findIndex(x => x.methodId === methodId);
}
function findWidthHeightMethodObjects(index) {
  // because we are dealing with arcs as well, there might not be a height.
  if (!Game.methodObjects[index].height) {
    return Game.methodObjects[index].width;
  } else {
    return Game.methodObjects[index].height;
  }
}
// this method grabs the gif image frames and assigns it to the correct method Id
function assignImages(pngs, methodId) {
  if (Game.gifImageList.length === 0) { // if the list is empty, add the new method
    Game.gifImageList.push({pngs: pngs, methodId: methodId});
  } else { // if the list has something, look and see if the same id is getting used
    const imgCheck = Game.gifImageList.filter(img => img.methodId === methodId);
    if (imgCheck.length === 0) {
      Game.gifImageList.push({pngs: pngs, methodId: methodId});
    }
  }
  Game.methodObjects.find(x => x.methodId === methodId).images = pngs;
  Game.isLoaded = true;
}
function removeLoadingScreen() {
	const checkLoad = setInterval(function() {
		const loading = Game.methodObjects.find(x => x.id === Game.loadingId)?.methodId;
		if (loading) {
			// remove the loading message
			clearInterval(checkLoad);
			Game.deleteEntity(loading);
		}
	}, 300);
  
}
