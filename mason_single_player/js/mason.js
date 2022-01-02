const masonWorkerImg = new Image();
const masonWorkerPath = './assets/images/stoneWorker.png';
(function() {
	Game.canvas = document.getElementById('Stage');
	masonWorkerImg.src = masonWorkerPath;
	drawMainMenu();
})();

function drawMainMenu() {
	Game.methodSetup = { method: function(id) {drawRect({ posX: 0, posY: 0, width: Game.canvas.width, height: Game.canvas.height, lineWidth: 1, color: 'black', isFilled: true, id: 'menu-background', isSolid: false, isBackground: false, props: {}, methodId: id });} };
	Game.addMethod(Game.methodSetup);
	Game.methodSetup = { method: function(id) {drawImage({ posX: (Game.canvas.width * 0.50), posY: (Game.canvas.height * 0.50), width: (Game.entitySize * 10), height: (Game.entitySize * 10), image: masonWorkerImg, id: 'mason-worker', isSolid: false, isBackground: false, props: {}, methodId: id });} };
	Game.addMethod(Game.methodSetup);
}
