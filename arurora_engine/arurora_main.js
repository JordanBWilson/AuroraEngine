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
            Main.globalId = createGUID();
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
	const targetHit = targetMethods.find(target => 
		primaryMethods.find(primary => 
			primary.posY + (primary.width * 0.94) >= target.posY 
			&& primary.posY <= (target.posY + (!target.height ? target.width : target.height)) && primary.posX + (primary.width * 0.94) >= target.posX 
			&& primary.posX <= (target.posX + target.width)));
	if (targetHit) {
		Main.collisions[i].methodId = targetHit.methodId;
        Main.collisions[i].method(targetHit.methodId);
	}
  }
}

function backgroundAnimationCheck(index) {
	// future Jordan, look into simplifying this check just like the collision check method above
  if (!Main.isResizing && Game.methodObjects[index] && Game.methodObjects[index].isBackground) { // is this rect a backgound..
	 // find what's being animated
	const animatedObjects = Game.methodObjects.filter(
		obj => obj.isAnim && !obj.isBtn && obj.methodId !== Game.methodObjects[index].methodId && 
		obj.posY >= Game.methodObjects[index].posY - (!obj.height ? obj.width : obj.height) && 
		obj.posY <= Game.methodObjects[index].posY + Game.methodObjects[index].height + (!obj.height ? obj.width : obj.height) &&
		obj.posX >= Game.methodObjects[index].posX - obj.width &&
		obj.posX <= Game.methodObjects[index].posX + Game.methodObjects[index].width + obj.width
	);
	for (let j = 0; j < animatedObjects.length; j++) {
		// look for colliding methods objects
		const collidingMethods = Game.methodObjects.filter(
			obj => !obj.isAnim && !obj.isBackground && obj.methodId !== Game.methodObjects[index].methodId && 
			obj.posY >= Game.methodObjects[index].posY - (!obj.height ? obj.width : obj.height) && 
			obj.posY <= Game.methodObjects[index].posY + Game.methodObjects[index].height + (!obj.height ? obj.width : obj.height) || obj.align &&
			obj.posX >= Game.methodObjects[index].posX - obj.width &&
			obj.posX <= Game.methodObjects[index].posX + Game.methodObjects[index].width + obj.width || obj.align
		);
		Game.methodObjects[index].isAnim = true; // animate the background
		const animateRects = collidingMethods.filter(rect => rect.height);
		for (let i = 0; i < animateRects.length; i++) {
			animateRects[i].isAnim = true;
		}
		const animateText = collidingMethods.filter(rect => rect.align);
		for (let i = 0; i < animateText.length; i++) {
			animateText[i].isAnim = true;
			
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
function createGUID() {
	const guid = '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, c => 
		(c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
	);
	return guid;
}
