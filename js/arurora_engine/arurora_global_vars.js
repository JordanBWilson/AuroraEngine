
let Game = { // the user will want to play with this object
  frameRate: 1000 / 60, // 60 frames a second
  methodsToRun: [], // all the methods to make the game run
  methodParams: [], // this will detect if any values change
  canvas: undefined, // need the game stage
  stageWidthPrct: .98, // how much of the screen width will it take up
  stageHeightPrct: .97, // how much of the screen height will it take up
  clearStage: function() { // clear the game stage
    this.methodsToRun = [];
    this.methodParams = [];
    this.id = 0;
  },
  collisions: [],
  deleteEntity: function(id) {
    for (let i = 0; i < this.methodParams.length; i++) {
      if (this.methodParams[i].methodId === id) {
        for (let j = 0; j < this.methodsToRun.length; j++) {
          if (this.methodParams[i]?.methodId === this.methodsToRun[j]?.methodId) {
            this.methodParams.splice(i, 1);
            this.methodsToRun.splice(j, 1);
          }
        }
      }
    }
  },
  id: 0,
};

let Main = { // global variables to keep the game running nicely
  interval: undefined, // the main loop running
  stage: undefined, // the 2D game stage
  resizeWindow: undefined, // when the browser window gets resized in the timeout
  isResizing: false,
  resizeWindowTime: 250, // how long to wait for the browser to resize
  entitySize: 0, // this is a base standard for how big an object will be drawn to the screen
  entityWidth: 0, // this is the base standard for the width of an entity
  isStageTapped: false, // is the stage tapped
  tappedX: 0, // where the user tapped on the stage last on the X axis
  tappedY: 0, // where the user tapped on the stage last on the Y axis
};
