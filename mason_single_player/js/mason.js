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
const gameObject = {
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
	robotTeams: [], // the different number of robot teams going out to find riches
	discoveredHeads: [], // all the robot heads discovered by the player
	discoveredChassis: [], // all the robot chassis discovered by the player
	discoveredLegs: [], // all the robot legs discovered by the player
	discoveredArms: [], // all the robot arms discovered by the player
	selectedRobot: [], // this is the robot currently selected in the shop
};

const robotHeads = [
	{
		headId: 1,
		type: 'head',
		name: 'New World Head',
		img: 'orange',
		stats: {
			att: 0,
			def: 1,
			spd: 0,
			ai: 1,
			storage: 0,
		},
		partsToBuild: {
			commonScrap: 3,
			unCommonScrap: 0,
			uniqueScrap: 0,
			intriguingScrap: 0,
			facinatingScrap: 0,
			mythicScrap: 0,
			exoticScrap: 0,
		},
	},
	{
		headId: 2,
		type: 'head',
		name: 'NW Scrapper Head',
		img: 'coral',
		stats: {
			att: 0,
			def: 1,
			spd: 0,
			ai: 1,
			storage: 1,
		},
		partsToBuild: {
			commonScrap: 5,
			unCommonScrap: 0,
			uniqueScrap: 0,
			intriguingScrap: 0,
			facinatingScrap: 0,
			mythicScrap: 0,
			exoticScrap: 0,
		},
	},
	{
		headId: 3,
		type: 'head',
		name: 'NW Scout Head',
		img: 'darkgoldenrod',
		stats: {
			att: 0,
			def: 1,
			spd: 0,
			ai: 2,
			storage: 0,
		},
		partsToBuild: {
			commonScrap: 4,
			unCommonScrap: 0,
			uniqueScrap: 0,
			intriguingScrap: 0,
			facinatingScrap: 0,
			mythicScrap: 0,
			exoticScrap: 0,
		},
	}
];
const robotChassis = [
	{
		chassisId: 1,
		type: 'chassis',
		name: 'New World Chassis',
		img: 'orange',
		stats: {
			att: 0,
			def: 1,
			spd: 0,
			ai: 0,
			storage: 1,
		},
		partsToBuild: {
			commonScrap: 7,
			unCommonScrap: 0,
			uniqueScrap: 0,
			intriguingScrap: 0,
			facinatingScrap: 0,
			mythicScrap: 0,
			exoticScrap: 0,
		},
	},
	{
		chassisId: 2,
		type: 'chassis',
		name: 'NW Scrapper Chassis',
		img: 'coral',
		stats: {
			att: 0,
			def: 1,
			spd: 0,
			ai: 0,
			storage: 2,
		},
		partsToBuild: {
			commonScrap: 10,
			unCommonScrap: 0,
			uniqueScrap: 0,
			intriguingScrap: 0,
			facinatingScrap: 0,
			mythicScrap: 0,
			exoticScrap: 0,
		},
	},
	{
		chassisId: 3,
		type: 'chassis',
		name: 'NW Scout Chassis',
		img: 'darkgoldenrod',
		stats: {
			att: 0,
			def: 1,
			spd: 0,
			ai: 2,
			storage: 0,
		},
		partsToBuild: {
			commonScrap: 9,
			unCommonScrap: 0,
			uniqueScrap: 0,
			intriguingScrap: 0,
			facinatingScrap: 0,
			mythicScrap: 0,
			exoticScrap: 0,
		},
	},
	{
		chassisId: 4,
		type: 'chassis',
		name: 'Test Chassis',
		img: 'red',
		stats: {
			att: 0,
			def: 1,
			spd: 0,
			ai: 0,
			storage: 0,
		},
		partsToBuild: {
			commonScrap: 0,
			unCommonScrap: 0,
			uniqueScrap: 0,
			intriguingScrap: 0,
			facinatingScrap: 0,
			mythicScrap: 0,
			exoticScrap: 0,
		},
	},
	{
		chassisId: 5,
		type: 'chassis',
		name: 'Test Chassis-1',
		img: 'red',
		stats: {
			att: 0,
			def: 1,
			spd: 0,
			ai: 0,
			storage: 0,
		},
		partsToBuild: {
			commonScrap: 0,
			unCommonScrap: 0,
			uniqueScrap: 0,
			intriguingScrap: 0,
			facinatingScrap: 0,
			mythicScrap: 0,
			exoticScrap: 0,
		},
	},
];
const robotLegs = [
	{
		legId: 1,
		type: 'leg',
		legPos: undefined, // can be 'left' or 'right'
		name: 'New World Leg',
		img: 'orange',
		stats: {
			att: 0,
			def: 1,
			spd: 1,
			ai: 0,
			storage: 0,
		},
		partsToBuild: {
			commonScrap: 5,
			unCommonScrap: 0,
			uniqueScrap: 0,
			intriguingScrap: 0,
			facinatingScrap: 0,
			mythicScrap: 0,
			exoticScrap: 0,
		},
	},
	{
		legId: 2,
		type: 'leg',
		legPos: undefined, // can be 'left' or 'right'
		name: 'NW Scrapper Leg',
		img: 'coral',
		stats: {
			att: 0,
			def: 1,
			spd: 1,
			ai: 1,
			storage: 0,
		},
		partsToBuild: {
			commonScrap: 7,
			unCommonScrap: 0,
			uniqueScrap: 0,
			intriguingScrap: 0,
			facinatingScrap: 0,
			mythicScrap: 0,
			exoticScrap: 0,
		},
	},
	{
		legId: 3,
		type: 'leg',
		legPos: undefined, // can be 'left' or 'right'
		name: 'NW Scout Leg',
		img: 'darkgoldenrod',
		stats: {
			att: 0,
			def: 1,
			spd: 1,
			ai: 1,
			storage: 0,
		},
		partsToBuild: {
			commonScrap: 6,
			unCommonScrap: 0,
			uniqueScrap: 0,
			intriguingScrap: 0,
			facinatingScrap: 0,
			mythicScrap: 0,
			exoticScrap: 0,
		},
	}
];
const robotArms = [
	{
		armId: 1,
		type: 'arm',
		armPos: undefined, // can be 'left' or 'right'
		name: 'New World Arm',
		img: 'orange',
		stats: {
			att: 1,
			def: 1,
			spd: 0,
			ai: 0,
			storage: 0,
		},
		partsToBuild: {
			commonScrap: 5,
			unCommonScrap: 0,
			uniqueScrap: 0,
			intriguingScrap: 0,
			facinatingScrap: 0,
			mythicScrap: 0,
			exoticScrap: 0,
		},
	},
	{
		armId: 2,
		type: 'arm',
		armPos: undefined, // can be 'left' or 'right'
		name: 'NW Scrapper Arm',
		img: 'coral',
		stats: {
			att: 1,
			def: 1,
			spd: 0,
			ai: 0,
			storage: 1,
		},
		partsToBuild: {
			commonScrap: 7,
			unCommonScrap: 0,
			uniqueScrap: 0,
			intriguingScrap: 0,
			facinatingScrap: 0,
			mythicScrap: 0,
			exoticScrap: 0,
		},
	},
	{
		armId: 3,
		type: 'arm',
		armPos: undefined, // can be 'left' or 'right'
		name: 'NW Scout Arm',
		img: 'darkgoldenrod',
		stats: {
			att: 1,
			def: 1,
			spd: 0,
			ai: 1,
			storage: 0,
		},
		partsToBuild: {
			commonScrap: 6,
			unCommonScrap: 0,
			uniqueScrap: 0,
			intriguingScrap: 0,
			facinatingScrap: 0,
			mythicScrap: 0,
			exoticScrap: 0,
		},
	}
];

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
	// below is a test...
	gameObject.discoveredChassis = robotChassis;
	gameObject.discoveredHeads = robotHeads;
	gameObject.discoveredLegs = robotLegs;
	gameObject.discoveredArms = robotArms;
	Game.clearStage();
	drawBackground();
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
	drawRobot();
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

function drawBackground() {
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
}

function drawRobot() {
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
	// future Jordan, we are going to need to show the free robot spots and any
	// past made robots. when selecting the past made robots, show this detailed
	// robot screen. We will need to make some tabs at the top to show the robot
	// selection screen and then the robot part screen where the player can make
	// different heads, bodys, arms and legs
	factoryRobotDetails();

	gameObject.selectedRobot.forEach((part, i) => {
		const waitForRobot = setInterval(function() {
			console.log(part);
			const robotBody = Game.methodObjects.find(x => x.id === 'robot-body');
			const robotHead = Game.methodObjects.find(x => x.id === 'robot-head');
			if (robotBody && robotHead) {
				equipPart(part);
				clearSelectedPartStatDetails();
				refreshFactoryBackgrounds();
				// createFactoryTitleStats(existingPart, part, confirmed);
				clearInterval(waitForRobot);
			}
		}, 5);
	});
}

function factoryRobotDetails() {
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
			drawRect({
				posX: Game.placeEntityX(0.825, (Game.canvas.width * 0.55)),
				posY: Game.placeEntityY(0.35, (Game.canvas.height * 0.45)),
				width: (Game.canvas.width * 0.43),
				height: (Game.canvas.height * 0.855),
				lineWidth: 1,
				color: 'lightgrey',
				isFilled: true,
				id: 'part-background',
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
				posY: Game.placeEntityY(0.815, (Game.canvas.height * 0.45)),
				width: (Game.canvas.width * 0.45),
				height: (Game.canvas.height * 0.39),
				lineWidth: 1,
				color: 'lightgrey',
				isFilled: true,
				id: 'robot-stat-background',
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
        posX: Game.placeEntityX(0.25, (Game.entitySize * 12)),
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
        action: { method: function(id) { selectRobotChassis() }},
        props: {},
        methodId: id
      });
		}
	};
	Game.addMethod(Game.methodSetup);
	Game.methodSetup = {
		method: function(id) {
			drawButton({
        posX: Game.placeEntityX(0.249, (Game.entitySize * 10)),
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
        action: { method: function(id) { selectRobotHead() }},
        props: {},
        methodId: id
      });
		}
	};
	Game.addMethod(Game.methodSetup);
	Game.methodSetup = {
		method: function(id) {
			drawButton({
        posX: Game.placeEntityX(0.20, (Game.entitySize * 15)),
        posY: Game.placeEntityY(0.35, (Game.entitySize * 12)),
        width: (Game.entitySize * 3),
        height: (Game.entitySize * 12),
        lineWidth: 1,
        btnColor: 'purple',
        txtColor: 'black',
        font: '1em serif',
        msg: '',
        isFilled: true,
        id: 'robot-left-arm',
        action: { method: function(id) { selectRobotArms('left'); }},
        props: {},
        methodId: id
      });
		}
	};
	Game.addMethod(Game.methodSetup);
	Game.methodSetup = {
		method: function(id) {
			drawButton({
        posX: Game.placeEntityX(0.31, (Game.entitySize * -8.3)),
        posY: Game.placeEntityY(0.35, (Game.entitySize * 12)),
        width: (Game.entitySize * 3),
        height: (Game.entitySize * 12),
        lineWidth: 1,
        btnColor: 'khaki',
        txtColor: 'black',
        font: '1em serif',
        msg: '',
        isFilled: true,
        id: 'robot-right-arm',
        action: { method: function(id) { selectRobotArms('right'); }},
        props: {},
        methodId: id
      });
		}
	};
	Game.addMethod(Game.methodSetup);
	Game.methodSetup = {
		method: function(id) {
			drawButton({
        posX: Game.placeEntityX(0.246, (Game.entitySize * 9)),
        posY: Game.placeEntityY(0.49, (Game.entitySize * 12)),
        width: (Game.entitySize * 3),
        height: (Game.entitySize * 12),
        lineWidth: 1,
        btnColor: 'lightslategrey',
        txtColor: 'black',
        font: '1em serif',
        msg: '',
        isFilled: true,
        id: 'robot-left-leg',
        action: { method: function(id) { selectRobotLegs('left'); }},
        props: {},
        methodId: id
      });
		}
	};
	Game.addMethod(Game.methodSetup);
	Game.methodSetup = {
		method: function(id) {
			drawButton({
        posX: Game.placeEntityX(0.247, (Game.entitySize * -4.3)),
        posY: Game.placeEntityY(0.49, (Game.entitySize * 12)),
        width: (Game.entitySize * 3),
        height: (Game.entitySize * 12),
        lineWidth: 1,
        btnColor: 'navy',
        txtColor: 'black',
        font: '1em serif',
        msg: '',
        isFilled: true,
        id: 'robot-right-leg',
        action: { method: function(id) { selectRobotLegs('right'); }},
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
	Game.methodSetup = {
		method: function(id) {
			drawText({
				font: '2.3em serif',
				msg: 'Details',
				posX: Game.placeEntityX(0.50),
				posY: Game.placeEntityY(0.085),
				color: 'darkgrey',
				align: 'center',
				props: {},
				id: 'factory-title',
				methodId: id
			});
		}
	};
	Game.addMethod(Game.methodSetup);
	Game.methodSetup = {
		method: function(id) {
			drawText({
				font: '2.3em serif',
				msg: 'Stats',
				posX: Game.placeEntityX(0.247),
				posY: Game.placeEntityY(0.65),
				color: 'grey',
				align: 'center',
				props: {},
				id: 'stat-title',
				methodId: id
			});
		}
	};
	Game.addMethod(Game.methodSetup);
	Game.methodSetup = {
		method: function(id) {
			drawButton({
        posX: Game.placeEntityX(0.98, (Game.entitySize * 30)),
        posY: Game.placeEntityY(0.03),
        width: (Game.entitySize * 15),
        height: (Game.entitySize * 7),
        lineWidth: 1,
        btnColor: 'darkgrey',
        txtColor: 'white',
        font: '1.5em serif',
        msg: 'Factory',
        isFilled: true,
        id: 'factory-view',
        action: { method: function(id) { playGame(); }}, // this needs to go to the robot list view
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

function clearRobotParts() {
	const chassisParts = Game.methodObjects.filter(x => x.id === 'robot-chassis-part');
	const headParts = Game.methodObjects.filter(x => x.id === 'robot-head-part');
	if (chassisParts.length > 0) {
		chassisParts.forEach((item, i) => {
			Game.deleteEntity(chassisParts[i].methodId);
		});
	}
	if (headParts.length > 0) {
		headParts.forEach((item, i) => {
			Game.deleteEntity(headParts[i].methodId);
		});
	}
	clearSelectedPartStatDetails();
	refreshFactoryBackgrounds();
	setTimeout(function() {
		createFactoryTitleStats(undefined, undefined, undefined, undefined);
	}, 0);
}

function selectRobotArms(arm) {
	// the arm could be left or right
	console.log('selecting the ' + arm + ' arm...');
	// load up the robot parts the player has discovered...
}

function selectRobotLegs(leg) {
	// the leg could be left or right
	console.log('selecting the ' + leg + ' leg...');
	// load up the robot parts the player has discovered...
}

function selectRobotChassis() {
	console.log('selecting the body...');
	// load up the robot parts the player has discovered...
	// future Jordan only show the next and previous buttons if the number of parts is greater than 5
	clearRobotParts(); // clear the previous parts
	clearSelectedPartStatDetails(); // clear the stats
	refreshFactoryBackgrounds(); // refresh the background
	drawNextPrevPartList('chassis');
	gameObject.discoveredChassis.forEach((chassis, i) => {
		Game.methodSetup = {
			method: function(id) {
				drawButton({
	        posX: Game.placeEntityX(0.78, (Game.entitySize * 23.6)),
	        posY: Game.placeEntityY(0.24 + (i * 0.135)),
	        width: (Game.entitySize * 22),
	        height: (Game.entitySize * 9),
	        lineWidth: 1,
	        btnColor: chassis.img,
	        txtColor: 'black',
	        font: '0.8em serif',
	        msg: chassis.name,
	        isFilled: true,
	        id: 'robot-chassis-part',
	        action: { method: function(id) { console.log('select robot chassis-' + i); displaySelectPart(gameObject.discoveredChassis[i], false); }},
	        props: {
						chassisId: chassis.chassisId,
						stats: chassis.stats
					},
	        methodId: id
	      });
			}
		};
		Game.addMethod(Game.methodSetup);
	});
}

function selectRobotHead() {
	console.log('selecting the head...');
	// load up the robot parts the player has discovered...
	// only show the next and previous buttons if the number of parts is greater than 5
	clearRobotParts(); // clear the previous parts
	clearSelectedPartStatDetails(); // clear the stats
	refreshFactoryBackgrounds(); // refresh the background
	drawNextPrevPartList('head');
	// clear the parts from the last selection future Jordan
	gameObject.discoveredHeads.forEach((head, i) => {
		Game.methodSetup = {
			method: function(id) {
				drawButton({
	        posX: Game.placeEntityX(0.78, (Game.entitySize * 23.6)),
	        posY: Game.placeEntityY(0.24 + (i * 0.135)),
	        width: (Game.entitySize * 22),
	        height: (Game.entitySize * 9),
	        lineWidth: 1,
	        btnColor: head.img,
	        txtColor: 'black',
	        font: '0.8em serif',
	        msg: head.name,
	        isFilled: true,
	        id: 'robot-head-part',
	        action: { method: function(id) { console.log('select robot head-' + i); displaySelectPart(gameObject.discoveredHeads[i], false); }},
	        props: {
						chassisId: head.chassisId,
						stats: head.stats
					},
	        methodId: id
	      });
			}
		};
		Game.addMethod(Game.methodSetup);
	});
}

function drawNextPrevPartList(part) {
	// the part could be head, chassis, legs and arms
	Game.methodSetup = {
		method: function(id) {
			drawButton({
        posX: Game.placeEntityX(0.78, (Game.entitySize * 23.5)),
        posY: Game.placeEntityY(0.135),
        width: (Game.entitySize * 22),
        height: (Game.entitySize * 7),
        lineWidth: 1,
        btnColor: 'grey',
        txtColor: 'white',
        font: '1.5em serif',
        msg: 'Next',
        isFilled: true,
        id: 'next-part',
        action: { method: function(id) { console.log('next part'); }},
        props: {},
        methodId: id
      });
		}
	};
	Game.addMethod(Game.methodSetup);
	Game.methodSetup = {
		method: function(id) {
			drawButton({
        posX: Game.placeEntityX(0.78, (Game.entitySize * 23.5)),
        posY: Game.placeEntityY(0.90),
        width: (Game.entitySize * 22),
        height: (Game.entitySize * 7),
        lineWidth: 1,
        btnColor: 'grey',
        txtColor: 'white',
        font: '1.5em serif',
        msg: 'Previous',
        isFilled: true,
        id: 'last-part',
        action: { method: function(id) { console.log('previous part'); }},
        props: {},
        methodId: id
      });
		}
	};
	Game.addMethod(Game.methodSetup);
}

function clearSelectedPartStatDetails() {
	// clear the stats and the buttons
	const selectPartBtn = Game.methodObjects.find(x => x.id === 'select-part');
	if (selectPartBtn) {
		Game.deleteEntity(selectPartBtn.methodId);
	}
	const selectAttStat = Game.methodObjects.find(x => x.id === 'att-stat');
	if (selectAttStat) {
		Game.deleteEntity(selectAttStat.methodId);
	}
	const selectDefStat = Game.methodObjects.find(x => x.id === 'def-stat');
	if (selectDefStat) {
		Game.deleteEntity(selectDefStat.methodId);
	}
	const selectSpdStat = Game.methodObjects.find(x => x.id === 'spd-stat');
	if (selectSpdStat) {
		Game.deleteEntity(selectSpdStat.methodId);
	}
	const selectAiStat = Game.methodObjects.find(x => x.id === 'ai-stat');
	if (selectAiStat) {
		Game.deleteEntity(selectAiStat.methodId);
	}
	const selectStorageStat = Game.methodObjects.find(x => x.id === 'storage-stat');
	if (selectStorageStat) {
		Game.deleteEntity(selectStorageStat.methodId);
	}
	// clear the titles
	const factoryTitle = Game.methodObjects.find(x => x.id === 'factory-title');
	if (factoryTitle) {
		Game.deleteEntity(factoryTitle.methodId);
	}
	const statTitle = Game.methodObjects.find(x => x.id === 'stat-title');
	if (statTitle) {
		Game.deleteEntity(statTitle.methodId);
	}
}

function totalSelectedRobotStats() {
	const stat = {
		stats: {
			att: 0,
			def: 0,
			spd: 0,
			ai: 0,
			storage: 0,
		}
	};
	gameObject.selectedRobot.forEach((part, i) => {
		stat.stats.att += part.stats.att;
		stat.stats.def += part.stats.def;
		stat.stats.spd += part.stats.spd;
		stat.stats.ai += part.stats.ai;
		stat.stats.storage += part.stats.storage;
	});

	return stat;

}

function createFactoryTitleStats(existingPart, part, confirmed, partChanged) {
	// when the existingPart and parts come in, then we are selecting different parts
	// future Jordan, when gameObject.selectedRobot.length > 0 we need to add up then
	// current stats and the new stats
	let selectedPart = part;
	if (!selectedPart || confirmed) {
		selectedPart = totalSelectedRobotStats();
		console.log(selectedPart);
	}
	Game.methodSetup = {
		method: function(id) {
			drawText({
				font: '2.3em serif',
				msg: 'Stats',
				posX: Game.placeEntityX(0.247),
				posY: Game.placeEntityY(0.65),
				color: 'grey',
				align: 'center',
				props: {},
				id: 'stat-title',
				methodId: id
			});
		}
	};
	Game.addMethod(Game.methodSetup);
	Game.methodSetup = {
		method: function(id) {
			drawText({
				font: '2.3em serif',
				msg: 'Details',
				posX: Game.placeEntityX(0.50),
				posY: Game.placeEntityY(0.085),
				color: 'darkgrey',
				align: 'center',
				props: {},
				id: 'factory-title',
				methodId: id
			});
		}
	};
	Game.addMethod(Game.methodSetup);
	// future Jordan, after a part is selected, if the robot is completed, display a confirm button
	Game.methodSetup = { // future Jordan, this button should only appear when a part is selected
		method: function(id) {
			drawButton({
				posX: Game.placeEntityX(0.226, (Game.entitySize * 19.7)),
				posY: Game.placeEntityY(0.90),
				width: (Game.entitySize * 23),
				height: (Game.entitySize * 7),
				lineWidth: 1,
				btnColor: 'grey',
				txtColor: 'white',
				font: '1.5em serif',
				msg: 'Select',
				isFilled: true,
				id: 'select-part',
				action: { method: function(id) { equipPart(selectedPart); }},
				props: {},
				methodId: id
			});
		}
	};
	Game.addMethod(Game.methodSetup);
	Game.methodSetup = {
		method: function(id) {
			drawText({
				font: '1em serif',
				msg: 'Attack: ' + selectedPart?.stats?.att,
				posX: Game.placeEntityX(0.09),
				posY: Game.placeEntityY(0.69),
				color: returnStatColor(existingPart?.stats?.att, selectedPart?.stats?.att, 'att', partChanged, confirmed),
				align: 'left',
				props: {},
				id: 'att-stat',
				methodId: id
			});
		}
	};
	Game.addMethod(Game.methodSetup);
	Game.methodSetup = {
		method: function(id) {
			drawText({
				font: '1em serif',
				msg: 'Defense: ' + selectedPart?.stats?.def,
				posX: Game.placeEntityX(0.09),
				posY: Game.placeEntityY(0.74),
				color: returnStatColor(existingPart?.stats?.def, selectedPart?.stats?.def, 'def', partChanged, confirmed),
				align: 'left',
				props: {},
				id: 'def-stat',
				methodId: id
			});
		}
	};
	Game.addMethod(Game.methodSetup);
	Game.methodSetup = {
		method: function(id) {
			drawText({
				font: '1em serif',
				msg: 'Speed: ' + selectedPart?.stats?.spd,
				posX: Game.placeEntityX(0.09),
				posY: Game.placeEntityY(0.79),
				color: returnStatColor(existingPart?.stats?.spd, selectedPart?.stats?.spd, 'spd', partChanged, confirmed),
				align: 'left',
				props: {},
				id: 'spd-stat',
				methodId: id
			});
		}
	};
	Game.addMethod(Game.methodSetup);
	Game.methodSetup = {
		method: function(id) {
			drawText({
				font: '1em serif',
				msg: 'AI: ' + selectedPart?.stats?.ai,
				posX: Game.placeEntityX(0.09),
				posY: Game.placeEntityY(0.84),
				color: returnStatColor(existingPart?.stats?.ai, selectedPart?.stats?.ai, 'ai', partChanged, confirmed),
				align: 'left',
				props: {},
				id: 'ai-stat',
				methodId: id
			});
		}
	};
	Game.addMethod(Game.methodSetup);
	console.log(existingPart?.stats?.storage, selectedPart?.stats?.storage);
	Game.methodSetup = {
		method: function(id) {
			drawText({
				font: '1em serif',
				msg: 'Storage: ' + returnStatValue(selectedPart?.stats?.storage, 'storage', confirmed, partChanged, existingPart?.stats?.storage),
				posX: Game.placeEntityX(0.09),
				posY: Game.placeEntityY(0.88),
				color: returnStatColor(existingPart?.stats?.storage, selectedPart?.stats?.storage, 'storage', partChanged, confirmed),
				align: 'left',
				props: {},
				id: 'storage-stat',
				methodId: id
			});
		}
	};
	Game.addMethod(Game.methodSetup);
}

function refreshFactoryBackgrounds() {
	Game.methodObjects.find(x => x.id === 'robot-stat-background').isAnim = true;
	Game.methodObjects.find(x => x.id === 'part-background').isAnim = true;
	Game.methodObjects.find(x => x.id === 'factory-background').isAnim = true;
}

function displaySelectPart(part, confirmed) {
	const partChanged = true;
	clearSelectedPartStatDetails();
	setTimeout(function() {
		refreshFactoryBackgrounds();
		let existingPart;
		if (part.type === 'chassis') {
			existingPart = gameObject.selectedRobot.find(build => build.type === 'chassis');
		}
		if (part.type === 'head') {
			existingPart = gameObject.selectedRobot.find(build => build.type === 'head');
		}
		createFactoryTitleStats(existingPart, part, confirmed, partChanged);
	}, 0);
}

function returnStatValue(selectedPartVal, stat, confirmed, partChanged, existingPartValue) {
	// if there are no parts equiped, display the part value
	// future Jordan, we need to pass the existing part variable to this method
	if (gameObject.selectedRobot.length === 0) {
		return selectedPartVal;
	} else {
		if (stat === 'storage') {
			const totalStats = totalSelectedRobotStats();
			if (confirmed || !partChanged) {
				return totalStats.stats.storage;
			} else if (totalStats.stats.storage > selectedPartVal ||
				totalStats.stats.storage < selectedPartVal ||
				totalStats.stats.storage === selectedPartVal ||
				partChanged) {
					if (existingPartValue) {
						const partUpgradeValue = (selectedPartVal - existingPartValue);
						const displayUpgrade = (partUpgradeValue > 0) ? ('+' + partUpgradeValue) : partUpgradeValue;
						return totalStats.stats.storage + '|' + displayUpgrade;
					} else {
						const displayUpgrade = (selectedPartVal > 0) ? ('+' + selectedPartVal) : selectedPartVal;
						return totalStats.stats.storage + '|' + displayUpgrade;
					}

			} // else if the existing part exists, show the total stat | and then
			// take the existing part and subtract from the selected part val
		}
	}
}

function returnStatColor(existingPartValue, newPartValue, stat, partChanged, confirmed) {
	// future Jordan we need to fix up the stat colors
	// if the part is a like part, compare it and show display the colors based on
	// how much or little over it is. If the parts are different, show the stat in
	// green if it's over 1 and grey if it's 0

	// console.log(totalSelectedRobotStats(), existingPartValue, newPartValue);
	const totalStats = totalSelectedRobotStats();
	if (!existingPartValue) {
		if (gameObject.selectedRobot.length === 0) {
			if (stat === 'storage') {
				if (newPartValue === 0 || !newPartValue) {
					return 'grey';
				}
				else if (((totalStats.stats.storage - newPartValue) * -1) >= 1) {
					return 'green';
				}
				else if (((totalStats.stats.storage - newPartValue) * -1) < 0) {
					return 'red';
				}
				// else {
				// 	return 'grey';
				// }
				// if (((totalStats.stats.storage - newPartValue) * -1) > 0) {
				// 	return 'green';
				// } else if (((totalStats.stats.storage - newPartValue) * -1) < 0) {
				// 	return 'red';
				// } else if (((totalStats.stats.storage - newPartValue) * -1) === 0) {
				// 	return 'grey';
				// }
			}
		} else { // when the new value is 0 then return grey if it's greater than 1 return green
			if (!confirmed && !partChanged) {
				return 'grey';
			}
			else if (!confirmed && partChanged && newPartValue > 0) {
				return 'green';
			}
			else {
				return 'grey';
			}
			// if (newPartValue > 0) {
			// 	return 'green';
			// } else {
			// 	return 'grey';
			// }


		}

	}
	// else
	if (!confirmed && ((existingPartValue - newPartValue) * -1) > 0) {
		return 'green';
	} else if (!confirmed && ((existingPartValue - newPartValue) * -1) < 0) {
		return 'red';
	}
	else if (!confirmed && existingPartValue === newPartValue) {
		return 'grey';
	}
	else {
		return 'grey';
	}

	// if (!existingPartValue) {
	// 	// console.log(newPartValue, totalStats);
	// 	return 'grey';
	// } else if (((existingPartValue - newPartValue) * -1) > 0) {
	// 	return 'green';
	// } else if (((existingPartValue - newPartValue) * -1) < 0) {
	// 	return 'red';
	// }
}

function equipPart(part) {
	if (part.type === 'chassis') {
		const existingChassis = gameObject.selectedRobot.findIndex(part => part.type === 'chassis');
		if (existingChassis > -1) {
			gameObject.selectedRobot.splice(existingChassis, 1);
		}
		gameObject.selectedRobot.push(part);
		Game.methodObjects.find(x => x.id === 'robot-body').btnColor = part.img; // change this to the actual image when availiable
	} else if (part.type === 'head') {
		const existingHead = gameObject.selectedRobot.findIndex(part => part.type === 'head');
		if (existingHead > -1) {
			gameObject.selectedRobot.splice(existingHead, 1);
		}
		gameObject.selectedRobot.push(part);
		Game.methodObjects.find(x => x.id === 'robot-head').btnColor = part.img; // change this to the actual image when availiable
	}
	displaySelectPart(part, true);

	console.log(gameObject.selectedRobot);
}
