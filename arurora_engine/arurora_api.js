
const Game = { // the user will want to use this object
  frameRate: 1000 / 60, // how fast the game is running
  methodObjects: [], // this holds all the current param values
  canvas: undefined, // the game stage
  stageWidthPrct: 1, // how much of the screen width will it take up. use a percent
  stageHeightPrct: 1, // how much of the screen height will it take up. use a percent
  clearStage: function() { // clear the game stage
    Main.clearStage = true;
    Main.stage?.clearRect(0, 0, this.canvas.width, this.canvas.height);
    Main.collisions = [];
    Main.methodsToRun = [];
    this.methodObjects = [];
    Main.methodObjectShadows = [];
    Main.globalId = 0;

  },
  collisionSetup: { // use this to create collisions
    primary: '', // the id that's waiting for a collision
    target: '', // the id that did the colliding
    method: function(id) {/*put your method here*/},
    methodId: undefined, // this will return the id of the targetId
  },
  addCollision: function(collision) { // pass the collision setup
    Main.collisions.push(collision);
    this.collisionSetup = {
      primaryId: '',
      targetId: '',
      method: function(id) {},
      methodId: undefined,
    }
  },
  methodSetup: {
    method: function(id) {/*put your method here*/}
  },
  addMethod: function(method) {
    Main.methodsToRun.push(method);
    this.methodSetup = {
      method: function(id) {},
    }
  },
  deleteEntity: function(id) { // delete an object in the MethodObjects
    for (let i = 0; i < this.methodObjects.length; i++) {
      if (this.methodObjects[i].methodId === id) {
        for (let j = 0; j < Main.methodsToRun.length; j++) {
          if (this.methodObjects[i]?.methodId === Main.methodsToRun[j]?.methodId) {
            this.methodObjects.splice(i, 1);
            Main.methodObjectShadows.splice(i, 1);
            Main.methodsToRun.splice(j, 1);
            break;
          }
        }
      }
    }
    for (let i = 0; i < this.methodObjects.length; i++) {
      if (!this.methodObjects[i]?.isBackground) {
        this.methodObjects[i].isAnim = true;
      }

    }
  },
  // these settings will make the game run faster or slower
  setSettingsLow: function() {
    this.selectedSetting = Game.enumSettings.low;
    this.frameRate = 1000 / 15; // 15 frames a second
    setTimeout(function() {
      clearInterval(Main.interval);
      cancelAnimationFrame(Main.intervalAnimateId);
      Main.intervalAnimateId = requestAnimationFrame(function() {mainLoop()});
    },0);
  },
  setSettingsMed: function() {
    this.selectedSetting = Game.enumSettings.med;
    this.frameRate = 1000 / 30; // 30 frames a second
    setTimeout(function() {
      clearInterval(Main.interval);
      cancelAnimationFrame(Main.intervalAnimateId);
      Main.intervalAnimateId = requestAnimationFrame(function() {mainLoop()});
    },0);
  },
  setSettingsHigh: function() {
    this.selectedSetting = Game.enumSettings.high;
    this.frameRate = 1000 / 60; // 60 frames a second
    setTimeout(function() {
      clearInterval(Main.interval);
      cancelAnimationFrame(Main.intervalAnimateId);
      Main.intervalAnimateId = requestAnimationFrame(function() {mainLoop()});
    },0);

  }, // give your game a default setting for the smoothest frames
  selectedSetting: undefined, // the selected game setting
  enumSettings: {
    high: 0,
    med: 1,
    low: 2,
  },
  enumDirections: { // this is the x and y directions
    topDown: 0,
    leftRight: 1
  },
  // this will calculate the speed based on the direction and settings
  moveEntity: function(speed, direction) {
    const speedPerc = speed * 0.01;
    if (direction === this.enumDirections.topDown) {
      if (this.selectedSetting === Game.enumSettings.high) {
        return (Game.canvas.height * speedPerc);
      }
      if (this.selectedSetting === Game.enumSettings.med) {
        return (Game.canvas.height * speedPerc) * 2;
      }
      if (this.selectedSetting === Game.enumSettings.low) {
        return (Game.canvas.height * speedPerc) * 4;
      }
      if (!this.selectedSetting) {
        return (Game.canvas.height * speedPerc);
      }

    }
    if (direction === this.enumDirections.leftRight) {
      if (this.selectedSetting === Game.enumSettings.high) {
        return (Game.canvas.width * speedPerc);
      }
      if (this.selectedSetting === Game.enumSettings.med) {
        return (Game.canvas.width * speedPerc) * 2;
      }
      if (this.selectedSetting === Game.enumSettings.low) {
        return (Game.canvas.width * speedPerc) * 4;
      }
      if (!this.selectedSetting) {
        return (Game.canvas.width * speedPerc);
      }
    }

  },
  enumEvents: { // ways to interact with the game
    touchDown: 'touchstart',
    touchUp: 'touchend',
    touchMove: 'touchmove',
    mouseDown: 'mousedown',
    mouseUp: 'mouseup',
    mouseMove: 'mousemove',
  },
  addCanvasEvent: function(enumEvent, method) { // add game stage events
    return this.canvas.addEventListener(enumEvent, function(event) {
      method(event);
    }, false);
  },
  createImageListFromGif: function(gifLocation, methodId) {
    // this method is dependent on arurora_gifs.js
    if (gifLocation.length > 0 && methodId > 0) {
      createImagesFromGif(gifLocation, methodId);
    }
  },
  nextTick: function(entity) {
    // this will animate an entity at the based on the frame rate
    if (this.selectedSetting === this.enumSettings.high) {
  		entity.animTicks--;
  	} else if (this.selectedSetting === this.enumSettings.med) {
  		entity.animTicks -= 2;
  	} else if (this.selectedSetting === this.enumSettings.low) {
  		entity.animTicks -= 4;
  	} else {
      entity.animTicks--;
    }
    if (entity.animTicks <= 0) {
      entity.animTicks = entity.ticks;
    }
    return entity;
  },
  loadingMessage: {
    msg: '',
    font: '3em serif',
    posX: 300,
    posY: 300,
    color: 'indigo',
    align: 'center',
    id: 'loading-message',
  }
};

const Main = { // global variables to keep the game running nicely
  intervalAnimateId: undefined, // this keeps track of the animations
  interval: undefined, // the main loop running
  stage: undefined, // the 2D game stage
  resizeWindow: undefined, // when the browser window gets resized in the timeout
  isResizing: false, // is the game resizing
  resizeWindowTime: 250, // how long to wait for the browser to resize
  isStageTapped: false, // is the stage tapped
  tappedX: 0, // where the user tapped on the stage last on the X axis
  tappedY: 0, // where the user tapped on the stage last on the Y axis
  globalId: 0, // makes all the objects easier to find
  methodObjectShadows: [], // this is all the param values recorded previously
  clearStage: false,
  collisions: [], // all the collisions in the game to look for
  methodsToRun: [], // all the methods to make the game run
  isLoaded: false, // wait for assets to load before starting the game
  loadingMessage: function() {
    Game.methodSetup = {
      method: function(id) {
        drawText({
          font: Game.loadingMessage.font,
          msg: Game.loadingMessage.msg,
          posX: Game.loadingMessage.posX,
          posY: Game.loadingMessage.posY,
          color: Game.loadingMessage.color,
          align: Game.loadingMessage.align,
          props: {},
          id: Game.loadingMessage.id,
          methodId: id
        });
      }
    };
    Game.addMethod(Game.methodSetup);
  }
};
