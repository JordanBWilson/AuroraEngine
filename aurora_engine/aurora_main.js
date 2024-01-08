// These are the core methods to run a game.

// Copyright (C) 2024  Jordan Wilson
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
  if (!Aurora.canvas) {
    console.log('No game stage detected.');
  } else {
    // get this party train moving
    Main.stage = Aurora.canvas.getContext('2d');
    window.addEventListener('resize', resizeStage, false);
    Aurora.canvas.addEventListener('click', function(event) {
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
    if (Aurora.isLoaded) {
		// layer the methods
		Main.methodsToRun.sort(function(a, b) {
			return a?.layer - b?.layer;
		});
		Aurora.methodObjects.sort(function(a, b) {
			return a?.layer - b?.layer;
		});
      if (Main.methodsToRun.length > 0) {
        // run the game
        for (let i = 0; i < Main.methodsToRun.length; i++) {
          if (Main.clearStage === true) {
            Main.clearStage = false;
            break;
          }
          //if (Main.methodsToRun[i].layer !== 0) {
			  //// layer the methods
			  //Main.methodsToRun.sort(function(a, b) {
				//return a?.layer - b?.layer;
			  //});
			  //Aurora.methodObjects.sort(function(a, b) {
				//return a?.layer - b?.layer;
			  //});
		  //}
          if (Main.methodsToRun[i].methodId === undefined) { // if there isn't a methodId, add one
            Main.globalId = createGUID();
            Main.methodsToRun[i].methodId = Main.globalId;
          }
          Main.methodsToRun[i].method(Main.methodsToRun[i].methodId); // run through all the methods the user sent us
          if (Main.isStageTapped) { // when the stage is tapped
            if (Aurora.methodObjects[i]?.isBtn) { // look to see if the user tapped on a button
              isButtonTapped(Aurora.methodObjects[i]);
              if (i == Main.methodsToRun.length - 1) {
                Main.isStageTapped = false;
                Main.tappedX = 0;
                Main.tappedY = 0;
              }
            } else if (i === (Main.methodsToRun.length - 1)) {
              Main.isStageTapped = false;
            }
          }
			if (Aurora.methodObjects[i]?.id === Aurora.modalId) {
				Main.isModalVisible = true;
			}
        }
        collisionCheck();
        if (Main.isResizing && Aurora.pageResized.section.length > 0) {
			Aurora.pageResized.method();
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
  }, Aurora.frameRate);
}

function resizeStage() {
  // don't want to grab the new width and height too many times..
  clearTimeout(Main.resizeWindow);
  if (!Aurora.keepPreviousSize) {
	Main.resizeWindow = setTimeout(function() {
		// resize the game stage and set new base values
		Aurora.canvas.width = window.innerWidth * Aurora.stageWidthPrct;
		Aurora.canvas.height = window.innerHeight * Aurora.stageHeightPrct;
		Aurora.entitySize = (Aurora.canvas.height * 0.01);
		Aurora.entityWidth = (Aurora.canvas.width * 0.01);
		Main.isResizing = true;
		Aurora.isLoaded = true;
		const doneResizing = setTimeout(function() {
		  Main.isResizing = false;
		  removeLoadingScreen();
		  clearTimeout(doneResizing);
		}, 100);
	  }, Main.resizeWindowTime);
  }
  
}

function screenTapped(event) {
	const boundingBox = Aurora.canvas.getBoundingClientRect();
	Main.isStageTapped = event ? true : false;
	Main.tappedX = event.clientX - boundingBox.left;
	Main.tappedY = event.clientY - boundingBox.top;
}

function isButtonTapped(btnParams) {
	if (Main.tappedY >= btnParams.posY && Main.tappedY <= btnParams.posY + btnParams.height) {
		if (Main.tappedX >= btnParams.posX && Main.tappedX <= btnParams.posX + btnParams.width) {
			const pos = { // the coords the button was tapped
				tappedX: Main.tappedX,
				tappedY: Main.tappedY,
			};
			if (!Main.isModalVisible && !btnParams.isModalBtn) {
				btnParams.action.method(btnParams.methodId, pos);
				Main.isStageTapped = false;
				Main.tappedX = 0;
				Main.tappedY = 0;
			} else if(Main.isModalVisible && btnParams.isModalBtn) {
				btnParams.action.method(btnParams.methodId, pos);
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
    let primaryMethods = Aurora.methodObjects.filter(x => x.id === primary);
    let targetMethods = Aurora.methodObjects.filter(x => x.id === target);
    // find out if a collision is happening
	const targetHit = targetMethods.find(target => 
		primaryMethods.find(primary => 
			primary.posY + (primary.width * 0.94) >= target.posY 
			&& primary.posY <= (target.posY + (!target.height ? target.width : target.height)) && primary.posX + (primary.width * 0.94) >= target.posX 
			&& primary.posX <= (target.posX + target.width)));
	if (targetHit) {
		Main.collisions[i].methodId = targetHit.methodId;
        Main.collisions[i].method(targetHit.methodId, primary);
	}
  }
}

function backgroundAnimationCheck(index) {
  if (!Main.isResizing && Aurora.methodObjects[index] && Aurora.methodObjects[index].isBackground) { // is this rect a backgound..
	 // find what's being animated
	const animatedObjects = Aurora.methodObjects.filter(
		obj => obj.isAnim && !obj.isBtn && obj.methodId !== Aurora.methodObjects[index].methodId && 
		obj.posY >= Aurora.methodObjects[index].posY - (!obj.height ? obj.width : obj.height) && 
		obj.posY <= Aurora.methodObjects[index].posY + Aurora.methodObjects[index].height + (!obj.height ? obj.width : obj.height) &&
		obj.posX >= Aurora.methodObjects[index].posX - obj.width &&
		obj.posX <= Aurora.methodObjects[index].posX + Aurora.methodObjects[index].width + obj.width
	);
	for (let j = 0; j < animatedObjects.length; j++) {
		// look for colliding methods objects
		const collidingMethods = Aurora.methodObjects.filter(
			obj => !obj.isAnim && !obj.isBackground && obj.methodId !== Aurora.methodObjects[index].methodId && 
			obj.posY >= Aurora.methodObjects[index].posY - (!obj.height ? obj.width : obj.height) && 
			obj.posY <= Aurora.methodObjects[index].posY + Aurora.methodObjects[index].height + (!obj.height ? obj.width : obj.height) || obj.align &&
			obj.posX >= Aurora.methodObjects[index].posX - obj.width &&
			obj.posX <= Aurora.methodObjects[index].posX + Aurora.methodObjects[index].width + obj.width || obj.align
		);
		Aurora.methodObjects[index].isAnim = true; // animate the background
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
  return Aurora.methodObjects.find(x => x.methodId === methodId) ? true : false;
}

function findMethodParamIndex(methodId) {
  return Aurora.methodObjects.findIndex(x => x.methodId === methodId);
}
// this method grabs the gif image frames and assigns it to the correct method Id
function assignImages(pngs, id) {
  if (Aurora.gifImageList.length === 0) { // if the list is empty, add the new method
    Aurora.gifImageList.push({pngs: pngs, id: id});
  } else { // if the list has something, look and see if the same id is getting used
    const imgCheck = Aurora.gifImageList.filter(img => img.id === id);
    if (imgCheck.length === 0) {
      Aurora.gifImageList.push({pngs: pngs, id: id});
    }
  }
  Aurora.isLoaded = true;
}
function removeLoadingScreen() {
	const checkLoad = setInterval(function() {
		const loading = Aurora.methodObjects.find(x => x.id === Aurora.loadingId)?.methodId;
		if (loading) {
			// remove the loading message
			clearInterval(checkLoad);
			Aurora.deleteEntity(loading);
		}
	}, 300);
  
}
function createGUID() {
	const guid = '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, c => 
		(c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
	);
	return guid;
}
