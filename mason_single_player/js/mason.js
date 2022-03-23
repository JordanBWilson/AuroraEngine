const masonWorkerImg = new Image();
const rockImg = new Image();
const grassImg = new Image();
const masonWorkerPath = './assets/images/stoneWorker.png';
const rock1Path = './assets/images/rock1.png';
const grassPath = './assets/images/grass.png';
let knight = {};
let animationTick = 0;

// this will keep track of the game
let gameObject = {
	money: 0
};

(function() {
	Game.canvas = document.getElementById('Stage');
	masonWorkerImg.src = masonWorkerPath;
	rockImg.src = rock1Path;
	grassImg.src = grassPath;
	Game.setSettingsHigh();
	drawMainMenu();

	// may need some sort of loading screen or loading indicator
	// the bigger the image, the bigger the lag
	// Game.createImageListFromGif('./assets/images/testKnight.GIF', 1);
	// future Jordan, setup arurora_2d_core to handle an array of images and
	// make a parameter to display the current image selected with an index
})();

function drawMainMenu() {
	Game.methodSetup = {
		method: function(id) {
			drawRect({
				posX: 0,
				posY: 0,
				width: Game.canvas.width,
				height: (Game.canvas.height) * 0.50,
				lineWidth: 1,
				color: '#0000FF',
				isFilled: true,
				id: 'sky-background',
				isSolid: false,
				isBackground: true,
				props: {},
				methodId: id
			});
		}
	};
	Game.addMethod(Game.methodSetup);
	Game.methodSetup = {
		method: function(id) {
			drawRect({
				posX: 0,
				posY: (Game.canvas.height) * 0.50,
				width: Game.canvas.width,
				height: Game.canvas.height,
				lineWidth: 1,
				color: '#3C7521',
				isFilled: true,
				id: 'grass-background',
				isSolid: false,
				isBackground: false,
				props: {},
				methodId: id
			});
		}
	};
	Game.addMethod(Game.methodSetup);
	Game.methodSetup = {
		method: function(id) {
			drawImagePattern({
				posX: 0,
				posY: (Game.canvas.height) * 0.50,
				width: (Game.canvas.width),
				height: (Game.canvas.height),
				patternWidth: (Game.canvas.height * 0.2),
				patternHeight: (Game.canvas.height * 0.2),
				images: [grassImg],
				selectedImage: 0,
				animTicks: 0,
				id: 'grass-background',
				isSolid: false,
				isBackground: true,
				props: {},
				methodId: id
			});
		}
	};
	Game.addMethod(Game.methodSetup);
	Game.methodSetup = {
		method: function(id) {
			drawImage({
				posX: 0,
				posY: (Game.canvas.height * 0.65),
				width: (Game.canvas.height * 0.1),
				height: (Game.canvas.height * 0.1),
				images: [masonWorkerImg],
				selectedImage: 0,
				animTicks: 0,
				id: 'mason-worker',
				isSolid: true,
				isBackground: false,
				props: {
					direction: 'right',
				},
				methodId: id
			});
		}
	};
	Game.addMethod(Game.methodSetup);
	Game.methodSetup = {
		method: function(id) {
			drawImage({
				posX: (Game.canvas.width * 0.35),
				posY: (Game.canvas.height * 0.65),
				width: (Game.canvas.height * 0.1),
				height: (Game.canvas.height * 0.1),
				images: [],
				selectedImage: 0,
				animTicks: 50,
				id: 'knight',
				isSolid: true,
				isBackground: false,
				props: {
					direction: 'right',
				},
				methodId: id
			});
		}
	};
	Game.addMethod(Game.methodSetup);
	Game.methodSetup = {
    method: function(id) {
      drawButtonImage({
        posX: (Game.canvas.width * 0.45),
        posY: (Game.canvas.height * 0.65),
        width: (Game.canvas.height * 0.15),
        height: (Game.canvas.height * 0.15),
        images: [rockImg],
				selectedImage: 0,
				animTicks: 0,
        id: 'rock',
        isSolid: false,
        action: { method: function(id) { mineRock(); }},
        props: {},
        methodId: id
      });
    }
  };
  Game.addMethod(Game.methodSetup);
  Game.methodSetup = { method: function(id) { moveMasonWorker(); }};
  Game.addMethod(Game.methodSetup);

	Game.methodSetup = { method: function(id) { findGameObjects(); }};
	Game.addMethod(Game.methodSetup);

	Game.methodSetup = { method: function(id) { animateObjects(); }};
	Game.addMethod(Game.methodSetup);

  Game.collisionSetup = {
    primary: 'rock',
    target: 'mason-worker',
    method: function(id) { masonRockCollision(this.methodId) },
    methodId: undefined,
  }
  Game.addCollision(Game.collisionSetup);
  Particle.initParticles();
  Particle.drawSpark({
	  posX: 200,
	  posY: 200,
	  shape: 0,
	  color: 'purple',
	  count: 1,
	  size: (Game.canvas.width * 0.05)
	});
}

function findGameObjects() {
  // when the game starts up, look for the knight and animate it
  if (!knight?.methodId) {
    knight = Game.methodObjects.find(x => x.id === 'knight');
		if (knight.methodId) {
			Game.createImageListFromGif('./assets/images/testKnight.GIF', knight.methodId);
			animateObjects();
		}
  }
}

function animateObjects() { // future Jordan, this method or some part of it can/could be made into the engine
	if (knight?.methodId) {
		if (animationTick >= knight.animTicks) {
			if (knight.selectedImage === 0) {
				knight.selectedImage = 1;
				animationTick = 0;
			} else if (knight.selectedImage === 1) {
				knight.selectedImage = 0;
				animationTick = 0;
			}
		}
	}
	if (Game.selectedSetting === Game.enumSettings.high) {
		animationTick++;
	} else if (Game.selectedSetting === Game.enumSettings.med) {
		animationTick += 2;
	} else if (Game.selectedSetting === Game.enumSettings.low) {
		animationTick += 4;
	}

}

function mineRock() {
	gameObject.money++;
	console.log('chiseling rock! ', gameObject.money);
}

function moveMasonWorker() {
	const masonWorkers = Game.methodObjects.filter(x => x.id === 'mason-worker');
	// move the mason worker
	masonWorkers.forEach((worker, i) => {
		if (worker.props.direction === 'right') {
			masonWorkers[i].posX += Game.moveEntity(0.15, Game.enumDirections.leftRight);
		}
		if (worker.props.direction === 'left') {
			masonWorkers[i].posX -= Game.moveEntity(0.15, Game.enumDirections.leftRight);
		}
	});
}

function masonRockCollision(methodId) {
	const masonWorker = Game.methodObjects.find(x => x.methodId === methodId);
	if (masonWorker.props.direction === 'left') {
		masonWorker.props.direction = 'right';
	}
	if (masonWorker.props.direction === 'right') {
		masonWorker.props.direction = 'left';
	}

}
