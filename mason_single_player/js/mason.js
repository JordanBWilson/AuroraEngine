// Copyright (C) 2022  Jordan Wilson
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, version 3.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

const masonWorkerImg = new Image();
const rockImg = new Image();
const grassImg = new Image();
const masonWorkerPath = './assets/images/stoneWorker.png';
const rock1Path = './assets/images/rock1.png';
const grassPath = './assets/images/grass.png';
let knight = {};
let robot = {};

// this will keep track of the game
let gameObject = {
	// types of scrap matirials
	commonScrap: 0,
	unCommonScrap: 0,
	uniqueScrap: 0, // rare
	intriguingScrap: 0, // epic
	facinatingScrap: 0, // legendary
	mythicScrap: 0,
	exoticScrap: 0, // I'm thinking this scrap type could be used to make special items
	scrapInvintory: 10, // how much scrap can the player hold
	scrapperSkill: 0, // ability to find more rare scrap
	roboticSkill: 0, // ability to put together robots with higher tiered parts
	engineeringSkill: 0, // abiltiy to to turn higher tiered scrap into parts
	barterSkill: 0, // sell for more on the grand exchange
	// different tiers of money
	copper: 0, // 1000 copper = 1 bronze
	bronze: 0, // 1000 bronze = 1 silver
	silver: 0, // 1000 silver = 1 gold
	gold: 0, // 1000 gold = 1 platinum
	platinum: 0, // 1000 platinum = 1 mythryl
	mythryl: 0, // mythryl is the highest tier
	// types of buildings
	factoryBuilt: false, // this building is where the player can make and automate robot production
	factoryLevel: 0, // the factory level will determine how many different robots can be qued and saved
	arenaBuild: false, // this is where multiplayer will come in. assign and build battle bots and buildings
	arenaLevel: 0, // this will determine what type of buildings are availiable in multiplayer
	// robot adventuring
	robotStorage: 5, // these robots can be sold on the grand exchange
	robotsMade: 0, // or go on adventures to find riches
	robotTeams: [], // the number of robot teams going out to find riches
};

(function() {
	Game.canvas = document.getElementById('Stage');
	masonWorkerImg.src = masonWorkerPath;
	rockImg.src = rock1Path;
	grassImg.src = grassPath;
	Game.setSettingsHigh();
	playGame();
})();

function playGame() {
	robot = {};
	Game.clearStage();
	Game.methodSetup = {
		method: function(id) {
			drawRect({
				posX: Game.placeEntityX(0),
				posY: Game.placeEntityY(0),
				width: Game.canvas.width,
				height: (Game.canvas.height * 0.50),
				lineWidth: 1,
				color: '#0000FF',
				isFilled: true,
				id: 'sky-background',
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
				posX: Game.placeEntityX(0),
				posY: Game.placeEntityY(0.50),
				width: Game.canvas.width,
				height: Game.canvas.height,
				lineWidth: 1,
				color: '#3C7521',
				isFilled: true,
				id: 'grass-background',
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
				posX: Game.placeEntityX(0),
				posY: Game.placeEntityY(0.50),
				width: (Game.canvas.width),
				height: (Game.canvas.height),
				patternWidth: (Game.canvas.height * 0.2),
				patternHeight: (Game.canvas.height * 0.2),
				images: [grassImg],
				selectedImage: 0,
				animTicks: 0,
				ticks: 0,
				id: 'grass-background',
				isBackground: true,
				props: {},
				methodId: id
			});
		}
	};
	Game.addMethod(Game.methodSetup);
	if (!Game.isLoaded) {
		Game.methodSetup = {
			method: function(id) {
				drawText({
					font: '3em serif',
					msg: 'Loading...',
					posX: Game.placeEntityX(0.50),
					posY: Game.placeEntityY(0.55),
					color: 'indigo',
					align: 'center',
					props: {},
					id: Game.loadingId,
					methodId: id
				});
			}
		};
	  Game.addMethod(Game.methodSetup);
	}

	// Game.methodSetup = {
	// 	method: function(id) {
	// 		drawImage({
	// 			posX: Game.placeEntityX(0, (Game.entitySize * 10)),
	// 			posY: Game.placeEntityY(0.77, (Game.entitySize * 10)),
	// 			width: (Game.entitySize * 10),
	// 			height: (Game.entitySize * 10),
	// 			images: [masonWorkerImg],
	// 			selectedImage: 0,
	// 			animTicks: 0,
	// 			ticks: 0,
	// 			id: 'mason-worker',
	// 			isBackground: false,
	// 			props: {
	// 				direction: 'right',
	// 			},
	// 			methodId: id
	// 		});
	// 	}
	// };
	// Game.addMethod(Game.methodSetup);
	// Game.methodSetup = {
	// 	method: function(id) {
	// 		drawImage({
	// 			posX: Game.placeEntityX(0.75, (Game.entitySize * 10)),
	// 			posY: Game.placeEntityY(0.77, (Game.entitySize * 10)),
	// 			width: (Game.entitySize * 10),
	// 			height: (Game.entitySize * 10),
	// 			images: Game.gifImageList.length > 0 ? Game.gifImageList.find(img => img.methodId === id).pngs : [],
	// 			selectedImage: 0,
	// 			animTicks: 25,
	// 			ticks: 25,
	// 			id: 'knight',
	// 			isBackground: false,
	// 			props: {
	// 				direction: 'right',
	// 			},
	// 			methodId: id
	// 		});
	// 	}
	// };
	// Game.addMethod(Game.methodSetup);
	Game.methodSetup = {
    method: function(id) {
      // drawButtonImage({
      //   posX: Game.placeEntityX(0.50, (Game.entitySize * 15)),
      //   posY: Game.placeEntityY(0.795, (Game.entitySize * 15)),
      //   width: (Game.entitySize * 15),
      //   height: (Game.entitySize * 15),
      //   images: [rockImg],
			// 	selectedImage: 0,
			// 	animTicks: 0,
			// 	ticks: 0,
      //   id: 'rock',
      //   action: { method: function(id) { mineScrap(); }},
      //   props: {},
      //   methodId: id
      // });
			drawButton({
        posX: Game.placeEntityX(0.50, (Game.entitySize * 15)),
        posY: Game.placeEntityY(0.75, (Game.entitySize * 15)),
        width: (Game.entitySize * 15),
        height: (Game.entitySize * 15),
        lineWidth: 1,
        btnColor: 'darkgrey',
        txtColor: 'black',
        font: '1.5em serif',
        msg: 'Scrap',
        isFilled: true,
        id: 'scrap',
        action: { method: function(id) { mineScrap(); }},
        props: {},
        methodId: id
      });
    }
  };
  Game.addMethod(Game.methodSetup);
	Game.methodSetup = {
		method: function(id) {
			drawButton({
        posX: Game.placeEntityX(0.82, (Game.entitySize * 15)),
        posY: Game.placeEntityY(0.90, (Game.entitySize * 15)),
        width: (Game.entitySize * 15),
        height: (Game.entitySize * 15),
        lineWidth: 1,
        btnColor: 'green',
        txtColor: 'white',
        font: '1.5em serif',
        msg: 'Home',
        isFilled: true,
        id: 'home',
        action: { method: function(id) { openHome(); }},
        props: {},
        methodId: id
      });
		}
	};
	Game.addMethod(Game.methodSetup);
	Game.methodSetup = {
		method: function(id) {
			drawButton({
        posX: Game.placeEntityX(0.82, (Game.entitySize * 15)),
        posY: Game.placeEntityY(0.60, (Game.entitySize * 15)),
        width: (Game.entitySize * 15),
        height: (Game.entitySize * 15),
        lineWidth: 1,
        btnColor: 'grey',
        txtColor: 'black',
        font: '1.5em serif',
        msg: 'Factory',
        isFilled: true,
        id: 'factory',
        action: { method: function(id) { openFactory(); }},
        props: {},
        methodId: id
      });
		}
	};
	Game.addMethod(Game.methodSetup);
	Game.methodSetup = {
		method: function(id) {
			drawButton({
        posX: Game.placeEntityX(0.165, (Game.entitySize * 15)),
        posY: Game.placeEntityY(0.75, (Game.entitySize * 15)),
        width: (Game.entitySize * 15),
        height: (Game.entitySize * 15),
        lineWidth: 1,
        btnColor: 'brown',
        txtColor: 'white',
        font: '1.5em serif',
        msg: 'Arena',
        isFilled: true,
        id: 'arena',
        action: { method: function(id) { openArena(); }},
        props: {},
        methodId: id
      });
		}
	};
	Game.addMethod(Game.methodSetup);
	Game.methodSetup = {
		method: function(id) {
			drawRect({
				posX: Game.placeEntityX(0.60, (Game.entitySize * 3)),
				posY: Game.placeEntityY(0.62, (Game.entitySize * 3)),
				width: (Game.entitySize * 3),
				height: (Game.entitySize * 3),
				lineWidth: 1,
				color: 'blue',
				isFilled: true,
				id: 'robot',
				isBackground: false,
				props: {
					drawHead: function(parent) {
						Game.methodSetup = {
							method: function(id) {
								drawRect({
									posX: parent.posX + (Game.entitySize * 0.5),
									posY: parent.posY - (Game.entitySize * 2),
									width: (Game.entitySize * 2),
									height: (Game.entitySize * 2),
									lineWidth: 1,
									color: 'yellow',
									isFilled: true,
									id: parent.id,
									isBackground: false,
									props: {},
									methodId: id
								});
							}
						};
						Game.addMethod(Game.methodSetup);
					},
					drawLeftArm: function(parent) {
						Game.methodSetup = {
							method: function(id) {
								drawRect({
									posX: parent.posX - (Game.entitySize * 0.9),
									posY: parent.posY,
									width: (Game.entitySize * 1),
									height: (Game.entitySize * 3),
									lineWidth: 1,
									color: 'purple',
									isFilled: true,
									id: parent.id,
									isBackground: false,
									props: {},
									methodId: id
								});
							}
						};
						Game.addMethod(Game.methodSetup);
					},
					drawRightArm: function(parent) {
						Game.methodSetup = {
							method: function(id) {
								drawRect({
									posX: parent.posX + (Game.entitySize * 3),
									posY: parent.posY,
									width: (Game.entitySize * 1),
									height: (Game.entitySize * 3),
									lineWidth: 1,
									color: 'khaki',
									isFilled: true,
									id: parent.id,
									isBackground: false,
									props: {},
									methodId: id
								});
							}
						};
						Game.addMethod(Game.methodSetup);
					},
					drawLeftLeg: function(parent) {
						Game.methodSetup = {
							method: function(id) {
								drawRect({
									posX: parent.posX + (Game.entitySize * 0.19),
									posY: parent.posY + (Game.entitySize * 3),
									width: (Game.entitySize * 1),
									height: (Game.entitySize * 3),
									lineWidth: 1,
									color: 'lightslategrey',
									isFilled: true,
									id: parent.id,
									isBackground: false,
									props: {},
									methodId: id
								});
							}
						};
						Game.addMethod(Game.methodSetup);
					},
					drawRightLeg: function(parent) {
						Game.methodSetup = {
							method: function(id) {
								drawRect({
									posX: parent.posX + (Game.entitySize * 1.9),
									posY: parent.posY + (Game.entitySize * 3),
									width: (Game.entitySize * 1),
									height: (Game.entitySize * 3),
									lineWidth: 1,
									color: 'navy',
									isFilled: true,
									id: parent.id,
									isBackground: false,
									props: {},
									methodId: id
								});
							}
						};
						Game.addMethod(Game.methodSetup);
					},
				},
				methodId: id
			});
		}
	};
	Game.addMethod(Game.methodSetup);
  // Game.methodSetup = { method: function(id) { moveMasonWorker(); }};
  // Game.addMethod(Game.methodSetup);

	Game.methodSetup = { method: function(id) { findGameObjects(); }};
	Game.addMethod(Game.methodSetup);

	Game.methodSetup = { method: function(id) { animateObjects(); }};
	Game.addMethod(Game.methodSetup);

  Game.collisionSetup = {
    primary: 'scrap',
    target: 'mason-worker',
    method: function(id) { masonRockCollision(this.methodId) },
    methodId: undefined,
  }
  // Game.addCollision(Game.collisionSetup);
  Particle.init();

}

function findGameObjects() {
  // when the game starts up, look for the knight and animate it
  // if (!knight?.methodId) {
  //   knight = Game.methodObjects.find(x => x.id === 'knight');
	// 	if (knight.methodId) {
	// 		Game.createImageListFromGif('./assets/images/testKnight.GIF', knight.methodId);
	// 		animateObjects();
	// 	}
  // }
	if (!robot?.methodId) {
		robot = Game.methodObjects.find(x => x.id === 'robot');
		robot.props.drawHead(robot);
		robot.props.drawLeftArm(robot);
		robot.props.drawRightArm(robot);
		robot.props.drawLeftLeg(robot);
		robot.props.drawRightLeg(robot);

	}
}

function animateObjects() {
	if (knight?.methodId) {
		if (knight.animTicks <= 1) {
			if (knight.selectedImage === 0) {
				knight.selectedImage = 1;
			} else if (knight.selectedImage === 1) {
				knight.selectedImage = 0;
			}
		}
		knight = Game.nextTick(knight);
	}
	if (robot?.methodId) {
		const roboParts = Game.methodObjects.filter(x => x.id === 'robot');
		roboParts.forEach((item, i) => {
			item.posX -= Game.moveEntity(0.1, Game.enumDirections.leftRight);
		});
	}
}

function mineScrap() {
	Particle.drawSpark({
		posX: Game.placeEntityX(0.50, (Game.entitySize * 0.7)),
		posY: Game.placeEntityY(0.78, (Game.entitySize * 0.7)),
		shape: Particle.enumShapes.rect,
		color: '#909090',
		ticks: 11,
		count: 8,
		size: (Game.entitySize * 0.7),
		speed: 1.3,
	});
	console.log('scrapping! ');
}

function openHome() {
	console.log('open Home');
}

function openFactory() {
	console.log('open Factory');
	Game.clearStage();
	Game.methodSetup = {
		method: function(id) {
			drawRect({
				posX: Game.placeEntityX(0),
				posY: Game.placeEntityY(0),
				width: Game.canvas.width,
				height: (Game.canvas.height),
				lineWidth: 1,
				color: 'grey',
				isFilled: true,
				id: 'factory-background',
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
				posX: Game.placeEntityX(0.255, (Game.canvas.width * 0.45)),
				posY: Game.placeEntityY(0.35, (Game.canvas.height * 0.45)),
				width: (Game.canvas.width * 0.45),
				height: (Game.canvas.height * 0.45),
				lineWidth: 1,
				color: 'lightgrey',
				isFilled: true,
				id: 'robot-background',
				isBackground: true,
				props: {},
				methodId: id
			});
		}
	};
	Game.addMethod(Game.methodSetup);
	Game.methodSetup = {
		method: function(id) {
			drawButton({
        posX: Game.placeEntityX(0.22, (Game.entitySize * 12)),
        posY: Game.placeEntityY(0.35, (Game.entitySize * 12)),
        width: (Game.entitySize * 12),
        height: (Game.entitySize * 12),
        lineWidth: 1,
        btnColor: 'blue',
        txtColor: 'white',
        font: '1.5em serif',
        msg: '',
        isFilled: true,
        id: 'robot-body',
        action: { method: function(id) { console.log('Select body'); }},
        props: {},
        methodId: id
      });
		}
	};
	Game.addMethod(Game.methodSetup);
	Game.methodSetup = {
		method: function(id) {
			drawButton({
        posX: Game.placeEntityX(0.22, (Game.entitySize * 10)),
        posY: Game.placeEntityY(0.22, (Game.entitySize * 10)),
        width: (Game.entitySize * 10),
        height: (Game.entitySize * 10),
        lineWidth: 1,
        btnColor: 'yellow',
        txtColor: 'black',
        font: '1.5em serif',
        msg: '',
        isFilled: true,
        id: 'robot-head',
        action: { method: function(id) { console.log('Select head'); }},
        props: {},
        methodId: id
      });
		}
	};
	Game.addMethod(Game.methodSetup);
	Game.methodSetup = {
		method: function(id) {
			drawButton({
        posX: Game.placeEntityX(0.07, (Game.entitySize * 3)),
        posY: Game.placeEntityY(0.35, (Game.entitySize * 12)),
        width: (Game.entitySize * 3),
        height: (Game.entitySize * 12),
        lineWidth: 1,
        btnColor: 'purple',
        txtColor: 'black',
        font: '1em serif',
        msg: '',
        isFilled: true,
        id: 'robot-head',
        action: { method: function(id) { console.log('Select Left Arm'); }},
        props: {},
        methodId: id
      });
		}
	};
	Game.addMethod(Game.methodSetup);
	Game.methodSetup = {
		method: function(id) {
			drawButton({
        posX: Game.placeEntityX(0.37, (Game.entitySize * 3)),
        posY: Game.placeEntityY(0.35, (Game.entitySize * 12)),
        width: (Game.entitySize * 3),
        height: (Game.entitySize * 12),
        lineWidth: 1,
        btnColor: 'khaki',
        txtColor: 'black',
        font: '1em serif',
        msg: '',
        isFilled: true,
        id: 'robot-head',
        action: { method: function(id) { console.log('Select Right Arm'); }},
        props: {},
        methodId: id
      });
		}
	};
	Game.addMethod(Game.methodSetup);
	Game.methodSetup = {
		method: function(id) {
			drawButton({
        posX: Game.placeEntityX(0.03),
        posY: Game.placeEntityY(0.03),
        width: (Game.entitySize * 12),
        height: (Game.entitySize * 7),
        lineWidth: 1,
        btnColor: 'darkgrey',
        txtColor: 'white',
        font: '1.5em serif',
        msg: 'Back',
        isFilled: true,
        id: 'factory-back-game',
        action: { method: function(id) { playGame(); }},
        props: {},
        methodId: id
      });
		}
	};
	Game.addMethod(Game.methodSetup);
}

function openArena() {
	console.log('open Arena');
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
