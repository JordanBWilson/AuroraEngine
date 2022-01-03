const masonWorkerImg = new Image();
const rockImg = new Image();
const masonWorkerPath = './assets/images/stoneWorker.png';
const rock1Path = './assets/images/rock1.png';
(function() {
	Game.canvas = document.getElementById('Stage');
	masonWorkerImg.src = masonWorkerPath;
	rockImg.src = rock1Path;
	drawMainMenu();
})();

function drawMainMenu() {
	Game.methodSetup = { method: function(id) {drawRect({ posX: 0, posY: 0, width: Game.canvas.width, height: Game.canvas.height, lineWidth: 1, color: 'black', isFilled: true, id: 'menu-background', isSolid: false, isBackground: false, props: {}, methodId: id });} };
	Game.addMethod(Game.methodSetup);
	Game.methodSetup = { method: function(id) {drawImage({ posX: (Game.canvas.width * 0.50), posY: (Game.canvas.height * 0.50), width: (Game.entitySize * 10), height: (Game.entitySize * 10), image: masonWorkerImg, id: 'mason-worker', isSolid: false, isBackground: false, props: {}, methodId: id });} };
	Game.addMethod(Game.methodSetup);
	Game.methodSetup = {
    method: function(id) {
      drawButtonImage({
        posX: (Game.canvas.width * 0.50),
        posY: (Game.canvas.height * 0.65),
        width: (Game.entitySize * 15),
        height: (Game.entitySize * 15),
        image: rockImg,
        id: 'rock',
        isSolid: false,
        action: { method: function(id) { mineRock(); }},
        props: {},
        methodId: id
      });
    }
  };
  Game.addMethod(Game.methodSetup);
}

function mineRock() {
	console.log('chiseling rock!');
}
