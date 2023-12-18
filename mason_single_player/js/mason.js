// Copyright (C) 2023  Jordan Wilson
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, version 2.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

// load the games images
const grassImg = new Image();
const grassPath = './assets/images/grass.png';
grassImg.src = grassPath;
const roadImg = new Image();
const roadPath = './assets/images/brick.png';
roadImg.src = roadPath;

// load the game sounds
const selectSound = new Audio('./assets/sounds/select.wav');
const addScrapSound = new Audio('./assets/sounds/add_scrap.wav');
const arenaReadySound = new Audio('./assets/sounds/arena_ready.wav');
const buildTowerSound = new Audio('./assets/sounds/build_tower.wav');
const robotHitSound = new Audio('./assets/sounds/robot_hit.wav');
const scrappingSound = new Audio('./assets/sounds/scrapping.wav');
const sellSound = new Audio('./assets/sounds/sell.wav');
const towerExplosionSound = new Audio('./assets/sounds/tower_explosion.wav');
const towerShootSound = new Audio('./assets/sounds/tower_shoot.wav');
const empExplosionSound = new Audio('./assets/sounds/emp_explosion.wav');
const wallDropSound = new Audio('./assets/sounds/wall_drop.wav');


(function() {
	Aurora.canvas = document.getElementById('Stage');
	seedRobotDesigns();
	seedArenaRobotDesigns();
	seedArenaTowers();
	loadAurora();
	Aurora.setSettingsHigh();
})();

// future Jordan, add a small tutorial as well

function seedRobotDesigns() {
	for (let i = 0; i < gameObject.robotDesignCount; i++) {
		const robotDesign = {
			robotId: i,
			robotParts: [],
		};
		gameObject.robotDesigns.push(robotDesign);
	}
}
function seedArenaRobotDesigns() {
	for (let i = 0; i < gameObject.robotArenaDesignCount; i++) {
		const robotDesign = {
			robotId: i,
			robotParts: [],
			directive: 4, // will the robot be a tank, warrior, support or lee-roy
		};
		gameObject.robotArenaDesigns.push(robotDesign);
	}
}
function seedArenaTowers() {
	for (let i = 0; i < gameObject.towerArenaDesignCount; i++) {
		const towerDesign = {
			arenaTowerId: i,
			arenaTower: {},
			robotParts: [], // if the tower is a bunker, this is the selected robot
			directive: 1, // will the tower be standard, splash-shot, rapid-shot or ram-shot
			// each directive will alter the tower stats. standard will be default
		}
		gameObject.towerArenaDesigns.push(towerDesign);
	}
}
function loadAurora() {
	const gameLoaded = localStorage.getItem('mason-game');
	if (gameLoaded) {
		gameObject = JSON.parse(gameLoaded);
	}
}
// future Jordan, make sure this works and apply it to the other parts
function loadRobotHeadGifs() {
	// load the images
	const newWorldHeadImgId = 'new-world-head';
	Aurora.createImageListFromGif('./assets/images/New_World_Head_Walk.gif', newWorldHeadImgId);
	const nwScrapperHeadImgId = 'nw-scrapper-head';
	Aurora.createImageListFromGif('./assets/images/NW_Scrapper_Head_Walk.gif', nwScrapperHeadImgId);
	const nwScoutHeadImgId = 'nw-scout-head';
	Aurora.createImageListFromGif('./assets/images/NW_Scout_Head_Walk.gif', nwScoutHeadImgId);
	const nwHarvesterHeadImgId = 'nw-harvester-head';
	Aurora.createImageListFromGif('./assets/images/NW_Harvester_Head_Walk.gif', nwHarvesterHeadImgId);
	// find the images
	let imageCount = 0;
	const searchForImages = setInterval(function() {
		const findNewWorldHead = Aurora.gifImageList.find(x => x.id === newWorldHeadImgId);
		if (findNewWorldHead && robotHeads[0].imgs.length === 0) {
			robotHeads[0].imgs.push(findNewWorldHead);
			imageCount++;
		}
		const findNWScrapperHead = Aurora.gifImageList.find(x => x.id === nwScrapperHeadImgId);
		if (findNWScrapperHead && robotHeads[1].imgs.length === 0) {
			robotHeads[1].imgs.push(findNWScrapperHead);
			imageCount++;
		}
		const findNWScoutHead = Aurora.gifImageList.find(x => x.id === nwScoutHeadImgId);
		if (findNWScoutHead && robotHeads[2].imgs.length === 0) {
			robotHeads[2].imgs.push(findNWScoutHead);
			imageCount++;
		}
		const findNWHarvesterHead = Aurora.gifImageList.find(x => x.id === nwHarvesterHeadImgId);
		if (findNWHarvesterHead && robotHeads[3].imgs.length === 0) {
			robotHeads[3].imgs.push(findNWHarvesterHead);
			imageCount++;
		}
		if (imageCount === robotHeads.length -1) {
			clearInterval(searchForImages);
		}
	}, 300);
}
function loadRobotChassisGifs() {
	// load the images
	const newWorldChassisImgId = 'new-world-chassis';
	Aurora.createImageListFromGif('./assets/images/New_World_Chassis_Walk.gif', newWorldChassisImgId);
	const nwScrapperChassisImgId = 'nw-scrapper-chassis';
	Aurora.createImageListFromGif('./assets/images/NW_Scrapper_Chassis_Walk.gif', nwScrapperChassisImgId);
	const nwScoutChassisImgId = 'nw-scout-chassis';
	Aurora.createImageListFromGif('./assets/images/NW_Scout_Chassis_Walk.gif', nwScoutChassisImgId);
	const nwHarvesterChassisImgId = 'nw-harvester-chassis';
	Aurora.createImageListFromGif('./assets/images/NW_Harvester_Chassis_Walk.gif', nwHarvesterChassisImgId);
	// find the images
	let imageCount = 0;
	const searchForImages = setInterval(function() {
		const findNewWorldChassis = Aurora.gifImageList.find(x => x.id === newWorldChassisImgId);
		if (findNewWorldChassis) {
			robotChassis[0].imgs.push(findNewWorldChassis);
			imageCount++;
			// future Jordan, we don't want to remove this function until we have all the images
			clearInterval(searchForImages);
		}
	}, 300);
}
function loadRobotLeftArmGifs() {
	// load the images
	const newWorldLeftArmImgId = 'new-world-left-arm';
	Aurora.createImageListFromGif('./assets/images/New_World_Left_Arm_Walk.gif', newWorldLeftArmImgId);
	// find the images
	let imageCount = 0;
	const searchForImages = setInterval(function() {
		const findNewWorldLeftArm = Aurora.gifImageList.find(x => x.id === newWorldLeftArmImgId);
		if (findNewWorldLeftArm) {
			robotArms[imageCount].imgs.push(findNewWorldLeftArm);
			imageCount++;
			// future Jordan, we don't want to remove this function until we have all the images
			clearInterval(searchForImages);
		}
	}, 300);
}
function loadRobotRightArmGifs() {
	// load the images
	const newWorldRightArmImgId = 'new-world-right-arm';
	Aurora.createImageListFromGif('./assets/images/New_World_Right_Arm_Walk.gif', newWorldRightArmImgId);
	// find the images
	let imageCount = 0;
	const searchForImages = setInterval(function() {
		const findNewWorldRightArm = Aurora.gifImageList.find(x => x.id === newWorldRightArmImgId);
		if (findNewWorldRightArm) {
			robotArms[imageCount].imgs.push(findNewWorldRightArm);
			imageCount++;
			// future Jordan, we don't want to remove this function until we have all the images
			clearInterval(searchForImages);
		}
	}, 300);
}
function loadRobotLeftLegGifs() {
	// load the images
	const newWorldLeftLegImgId = 'new-world-left-leg';
	Aurora.createImageListFromGif('./assets/images/New_World_Left_Leg_Walk.gif', newWorldLeftLegImgId);
	// find the images
	let imageCount = 0;
	const searchForImages = setInterval(function() {
		const findNewWorldLeftLeg = Aurora.gifImageList.find(x => x.id === newWorldLeftLegImgId);
		if (findNewWorldLeftLeg) {
			robotLegs[imageCount].imgs.push(findNewWorldLeftLeg);
			imageCount++;
			// future Jordan, we don't want to remove this function until we have all the images
			clearInterval(searchForImages);
		}
	}, 300);
}
function loadRobotRightLegGifs() {
	// load the images
	const newWorldRightLegImgId = 'new-world-right-leg';
	Aurora.createImageListFromGif('./assets/images/New_World_Right_Leg_Walk.gif', newWorldRightLegImgId);
	// find the images
	let imageCount = 0;
	const searchForImages = setInterval(function() {
		const findNewWorldRightLeg = Aurora.gifImageList.find(x => x.id === newWorldRightLegImgId);
		if (findNewWorldRightLeg) {
			robotLegs[imageCount].imgs.push(findNewWorldRightLeg);
			imageCount++;
			// future Jordan, we don't want to remove this function until we have all the images
			clearInterval(searchForImages);
		}
	}, 300);
}

const titlePage = {
	description: 'The main title page of Mason',
	loadPage: function() {
		Aurora.clearStage();
		Aurora.methodSetup = {
			method: function(id) {
				drawRect({
					posX: Aurora.placeEntityX(0),
					posY: Aurora.placeEntityY(0),
					width: Aurora.canvas.width,
					height: (Aurora.canvas.height),
					lineWidth: 1,
					color: 'grey',
					isFilled: true,
					id: 'title-background',
					isBackground: true,
					props: {},
					methodId: id
				});
			}
		};
		Aurora.addMethod(Aurora.methodSetup);
		Aurora.methodSetup = {
			method: function(id) {
				drawText({
					font: '3.3em serif',
					msg: 'Mason',
					posX: Aurora.placeEntityX(0.50),
					posY: Aurora.placeEntityY(0.075),
					color: 'darkgrey',
					align: 'center',
					props: {},
					id: 'home-title',
					methodId: id
				});
			}
		};
		Aurora.addMethod(Aurora.methodSetup);
		Aurora.methodSetup = {
			method: function(id) {
				drawText({
					font: '1.5em serif',
					msg: 'MVP Edition',
					posX: Aurora.placeEntityX(0.50),
					posY: Aurora.placeEntityY(0.13),
					color: 'darkgrey',
					align: 'center',
					props: {},
					id: 'home-title',
					methodId: id
				});
			}
		};
		Aurora.addMethod(Aurora.methodSetup);
		Aurora.methodSetup = {
			method: function(id) {
				drawRect({
					posX: Aurora.placeEntityX(0.505, (Aurora.canvas.width * 0.45)),
					posY: Aurora.placeEntityY(0.375, (Aurora.canvas.height * 0.45)),
					width: (Aurora.canvas.width * 0.45),
					height: (Aurora.canvas.height * 0.42),
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
		Aurora.addMethod(Aurora.methodSetup);
		Aurora.methodSetup = {
			method: function(id) {
				drawButton({
					posX: Aurora.placeEntityX(0.50, (Aurora.entitySize * 12)),
					posY: Aurora.placeEntityY(0.35, (Aurora.entitySize * 12)),
					width: (Aurora.entitySize * 12),
					height: (Aurora.entitySize * 12),
					lineWidth: 1,
					btnColor: 'orange',
					txtColor: 'white',
					font: '1.5em serif',
					msg: '',
					isFilled: true,
					id: 'robot-body',
					action: { 
						method: function(id) {
						
						}
					},
					isModalBtn: false,
					props: {},
					methodId: id
				});
			}
		};
		Aurora.addMethod(Aurora.methodSetup);
		Aurora.methodSetup = {
			method: function(id) {
				drawButton({
					posX: Aurora.placeEntityX(0.499, (Aurora.entitySize * 10)),
					posY: Aurora.placeEntityY(0.22, (Aurora.entitySize * 10)),
					width: (Aurora.entitySize * 10),
					height: (Aurora.entitySize * 10),
					lineWidth: 1,
					btnColor: 'orange',
					txtColor: 'black',
					font: '1.5em serif',
					msg: '',
					isFilled: true,
					id: 'robot-head',
					action: {
						method: function(id) {
							
						}
					},
					isModalBtn: false,
					props: {},
					methodId: id
				});
			}
		};
		Aurora.addMethod(Aurora.methodSetup);
		Aurora.methodSetup = {
			method: function(id) {
				drawButton({
					posX: Aurora.placeEntityX(0.45, (Aurora.entitySize * 15)),
					posY: Aurora.placeEntityY(0.35, (Aurora.entitySize * 12)),
					width: (Aurora.entitySize * 3),
					height: (Aurora.entitySize * 12),
					lineWidth: 1,
					btnColor: 'orange',
					txtColor: 'black',
					font: '1em serif',
					msg: '',
					isFilled: true,
					id: 'robot-left-arm',
					action: { 
						method: function(id) {
							
						}
					},
					isModalBtn: false,
					props: {},
					methodId: id
				});
			}
		};
		Aurora.addMethod(Aurora.methodSetup);
		Aurora.methodSetup = {
			method: function(id) {
				drawButton({
					posX: Aurora.placeEntityX(0.56, (Aurora.entitySize * -8.3)),
					posY: Aurora.placeEntityY(0.35, (Aurora.entitySize * 12)),
					width: (Aurora.entitySize * 3),
					height: (Aurora.entitySize * 12),
					lineWidth: 1,
					btnColor: 'orange',
					txtColor: 'black',
					font: '1em serif',
					msg: '',
					isFilled: true,
					id: 'robot-right-arm',
					action: { 
						method: function(id) {
							
						}
					},
					isModalBtn: false,
					props: {},
					methodId: id
				});
			}
		};
		Aurora.addMethod(Aurora.methodSetup);
		Aurora.methodSetup = {
			method: function(id) {
				drawButton({
					posX: Aurora.placeEntityX(0.496, (Aurora.entitySize * 9)),
					posY: Aurora.placeEntityY(0.49, (Aurora.entitySize * 12)),
					width: (Aurora.entitySize * 3),
					height: (Aurora.entitySize * 12),
					lineWidth: 1,
					btnColor: 'orange',
					txtColor: 'black',
					font: '1em serif',
					msg: '',
					isFilled: true,
					id: 'robot-left-leg',
					action: {
						method: function(id) {
							
						}
					},
					isModalBtn: false,
					props: {},
					methodId: id
				});
			}
		};
		Aurora.addMethod(Aurora.methodSetup);
		Aurora.methodSetup = {
			method: function(id) {
				drawButton({
					posX: Aurora.placeEntityX(0.497, (Aurora.entitySize * -4.3)),
					posY: Aurora.placeEntityY(0.49, (Aurora.entitySize * 12)),
					width: (Aurora.entitySize * 3),
					height: (Aurora.entitySize * 12),
					lineWidth: 1,
					btnColor: 'orange',
					txtColor: 'black',
					font: '1em serif',
					msg: '',
					isFilled: true,
					id: 'robot-right-leg',
					action: {
						method: function(id) {
							
						}
					},
					isModalBtn: false,
					props: {},
					methodId: id
				});
			}
		};
		Aurora.addMethod(Aurora.methodSetup);
		Aurora.methodSetup = {
			method: function(id) {
				drawButton({
					posX: Aurora.placeEntityX(0.505, (Aurora.canvas.width * 0.45)),
					posY: Aurora.placeEntityY(0.90, (Aurora.canvas.height * 0.45)),
					width: (Aurora.canvas.width * 0.45),
					height: (Aurora.entitySize * 7),
					lineWidth: 1,
					btnColor: 'darkgrey',
					txtColor: 'white',
					font: '1.5em serif',
					msg: 'Play',
					isFilled: true,
					id: 'play-game',
					action: { 
						method: function(id) {
							mainPage.loadPage();
						}
					},
					isModalBtn: false,
					props: {},
					methodId: id
				});
			}
		};
		Aurora.addMethod(Aurora.methodSetup);
		Aurora.methodSetup = {
			method: function(id) {
				drawButton({
					posX: Aurora.placeEntityX(0.505, (Aurora.canvas.width * 0.45)),
					posY: Aurora.placeEntityY(1.05, (Aurora.canvas.height * 0.45)),
					width: (Aurora.canvas.width * 0.45),
					height: (Aurora.entitySize * 7),
					lineWidth: 1,
					btnColor: 'darkgrey',
					txtColor: 'white',
					font: '1.2em serif',
					msg: !gameObject.gameSounds ? 'Sounds: Off' : 'Sounds: On',
					isFilled: true,
					id: 'play-game-sounds',
					action: { 
						method: function(id) {
							gameObject.gameSounds = !gameObject.gameSounds;
							const soundBtn = Aurora.methodObjects.find(btn => btn.id === 'play-game-sounds');
							soundBtn.msg = !gameObject.gameSounds ? 'Sounds: Off' : 'Sounds: On';
							if (gameObject.gameSounds) {
								selectSound.cloneNode(true).play();
							}
						}
					},
					isModalBtn: false,
					props: {},
					methodId: id
				});
			}
		};
		Aurora.addMethod(Aurora.methodSetup);
		if (!Aurora.isLoaded) {
			Aurora.methodSetup = {
				method: function(id) {
					drawText({
						font: '3em serif',
						msg: 'Loading...',
						posX: Aurora.placeEntityX(0.50),
						posY: Aurora.placeEntityY(0.63),
						color: 'indigo',
						align: 'center',
						props: {},
						id: Aurora.loadingId,
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			loadRobotHeadGifs();
			loadRobotChassisGifs();
			loadRobotLeftArmGifs();
			loadRobotRightArmGifs();
			loadRobotLeftLegGifs();
			loadRobotRightLegGifs();
			const loadCheck = setInterval(function() {
				if (Aurora.isLoaded) {
					clearInterval(loadCheck);
					titlePage.loadPage();
				}
			}, 300);
		}
		
	}
}

const mainPage = {
	description: 'The main game page of Mason',
	loadPage: function() {
		gameObject.canClick = true;
		let knight = {};
		let robot = {};
		playAurora();

		function playAurora() {
			robot = {};
			if (gameObject.discoveredChassis.length === 0) {
				gameObject.discoveredChassis.push(robotChassis[0]);
			}
			if (gameObject.discoveredHeads.length === 0) {
				gameObject.discoveredHeads.push(robotHeads[0]);
			}
			if (gameObject.discoveredLegs.length === 0 ) {
				gameObject.discoveredLegs.push(robotLegs[0]);
			}
			if (gameObject.discoveredArms.length === 0) {
				gameObject.discoveredArms.push(robotArms[0]);
			}
			
			Aurora.clearStage();
			drawBackground();
			// Aurora.methodSetup = {
			// 	method: function(id) {
			// 		drawImage({
			// 			posX: Aurora.placeEntityX(0, (Aurora.entitySize * 10)),
			// 			posY: Aurora.placeEntityY(0.77, (Aurora.entitySize * 10)),
			// 			width: (Aurora.entitySize * 10),
			// 			height: (Aurora.entitySize * 10),
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
			// Aurora.addMethod(Aurora.methodSetup);
			// Aurora.methodSetup = {
			// 	method: function(id) {
			// 		drawImage({
			// 			posX: Aurora.placeEntityX(0.75, (Aurora.entitySize * 10)),
			// 			posY: Aurora.placeEntityY(0.77, (Aurora.entitySize * 10)),
			// 			width: (Aurora.entitySize * 10),
			// 			height: (Aurora.entitySize * 10),
			// 			images: Aurora.gifImageList.length > 0 ? Aurora.gifImageList.find(img => img.methodId === id).pngs : [],
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
			// Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
			method: function(id) {
			  // drawButtonImage({
			  //   posX: Aurora.placeEntityX(0.50, (Aurora.entitySize * 15)),
			  //   posY: Aurora.placeEntityY(0.795, (Aurora.entitySize * 15)),
			  //   width: (Aurora.entitySize * 15),
			  //   height: (Aurora.entitySize * 15),
			  //   images: [rockImg],
					// 	selectedImage: 0,
					// 	animTicks: 0,
					// 	ticks: 0,
			  //   id: 'rock',
			  //   action: { method: function(id) { mineScrap(); }},
			  //   isModalBtn: false,
			  //   props: {},
			  //   methodId: id
			  // });
			drawButton({
				posX: Aurora.placeEntityX(0.50, (Aurora.entitySize * 15)),
				posY: Aurora.placeEntityY(0.75, (Aurora.entitySize * 15)),
				width: (Aurora.entitySize * 15),
				height: (Aurora.entitySize * 15),
				lineWidth: 1,
				btnColor: 'darkgrey',
				txtColor: 'black',
				font: '1.5em serif',
				msg: 'Scrap',
				isFilled: true,
				id: 'scrap',
				action: { 
					method: function(id) { 
						mineScrap(); 
					}
				},
				isModalBtn: false,
				props: {},
				methodId: id
			  });
			}
		  };
		  Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawButton({
						posX: Aurora.placeEntityX(0.82, (Aurora.entitySize * 15)),
						posY: Aurora.placeEntityY(0.90, (Aurora.entitySize * 15)),
						width: (Aurora.entitySize * 15),
						height: (Aurora.entitySize * 15),
						lineWidth: 1,
						btnColor: 'green',
						txtColor: 'white',
						font: '1.5em serif',
						msg: 'Home',
						isFilled: true,
						id: 'home',
						action: { method: function(id) { openHome(); }},
						isModalBtn: false,
						props: {},
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			if (gameObject.factoryBuilt) {
				Aurora.methodSetup = {
					method: function(id) {
						drawButton({
							posX: Aurora.placeEntityX(0.82, (Aurora.entitySize * 15)),
							posY: Aurora.placeEntityY(0.60, (Aurora.entitySize * 15)),
							width: (Aurora.entitySize * 15),
							height: (Aurora.entitySize * 15),
							lineWidth: 1,
							btnColor: 'grey',
							txtColor: 'black',
							font: '1.5em serif',
							msg: 'Factory',
							isFilled: true,
							id: 'factory',
							action: { method: function(id) { openFactory(); }},
							isModalBtn: false,
							props: {},
							methodId: id
						});
					}
				};
				Aurora.addMethod(Aurora.methodSetup);
			}
			if (gameObject.arenaBuild) {
				Aurora.methodSetup = {
					method: function(id) {
						drawButton({
							posX: Aurora.placeEntityX(0.165, (Aurora.entitySize * 15)),
							posY: Aurora.placeEntityY(0.75, (Aurora.entitySize * 15)),
							width: (Aurora.entitySize * 15),
							height: (Aurora.entitySize * 15),
							lineWidth: 1,
							btnColor: 'brown',
							txtColor: 'white',
							font: '1.5em serif',
							msg: 'Arena',
							isFilled: true,
							id: 'arena',
							action: { method: function(id) { openArena(); }},
							isModalBtn: false,
							props: {},
							methodId: id
						});
					}
				};
				Aurora.addMethod(Aurora.methodSetup);
			}
			// drawRobot();
		  // Aurora.methodSetup = { method: function(id) { moveMasonWorker(); }};
		  // Aurora.addMethod(Aurora.methodSetup);

			//Aurora.methodSetup = { method: function(id) { findAuroraObjects(); }};
			//Aurora.addMethod(Aurora.methodSetup);

			//Aurora.methodSetup = { method: function(id) { animateObjects(); }};
			//Aurora.addMethod(Aurora.methodSetup);

		  Aurora.collisionSetup = {
			primary: 'scrap',
			target: 'mason-worker',
			method: function(id) { masonRockCollision(this.methodId) },
			methodId: undefined,
		  }
		  // Aurora.addCollision(Aurora.collisionSetup);
		  Particle.init();
		}

		function drawBackground() {
			Aurora.methodSetup = {
				method: function(id) {
					drawRect({
						posX: Aurora.placeEntityX(0),
						posY: Aurora.placeEntityY(0),
						width: Aurora.canvas.width,
						height: (Aurora.canvas.height * 0.50),
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
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawRect({
						posX: Aurora.placeEntityX(0),
						posY: Aurora.placeEntityY(0.50),
						width: Aurora.canvas.width,
						height: Aurora.canvas.height,
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
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawImagePattern({
						posX: Aurora.placeEntityX(0),
						posY: Aurora.placeEntityY(0.50),
						width: (Aurora.canvas.width),
						height: (Aurora.canvas.height),
						patternWidth: (Aurora.canvas.height * 0.2),
						patternHeight: (Aurora.canvas.height * 0.2),
						images: [grassImg],
						selectedImage: 0,
						animTicks: 0,
						ticks: 0,
						id: 'grass-background-pattern',
						isBackground: true,
						props: {},
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
		}

		function drawRobot() {
			Aurora.methodSetup = {
				method: function(id) {
					drawRect({
						posX: Aurora.placeEntityX(0.60, (Aurora.entitySize * 3)),
						posY: Aurora.placeEntityY(0.62, (Aurora.entitySize * 3)),
						width: (Aurora.entitySize * 3),
						height: (Aurora.entitySize * 3),
						lineWidth: 1,
						color: 'blue',
						isFilled: true,
						id: 'robot',
						isBackground: false,
						props: {
							drawHead: function(parent) {
								Aurora.methodSetup = {
									method: function(id) {
										drawRect({
											posX: parent.posX + (Aurora.entitySize * 0.5),
											posY: parent.posY - (Aurora.entitySize * 2),
											width: (Aurora.entitySize * 2),
											height: (Aurora.entitySize * 2),
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
								Aurora.addMethod(Aurora.methodSetup);
							},
							drawLeftArm: function(parent) {
								Aurora.methodSetup = {
									method: function(id) {
										drawRect({
											posX: parent.posX - (Aurora.entitySize * 0.9),
											posY: parent.posY,
											width: (Aurora.entitySize * 1),
											height: (Aurora.entitySize * 3),
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
								Aurora.addMethod(Aurora.methodSetup);
							},
							drawRightArm: function(parent) {
								Aurora.methodSetup = {
									method: function(id) {
										drawRect({
											posX: parent.posX + (Aurora.entitySize * 3),
											posY: parent.posY,
											width: (Aurora.entitySize * 1),
											height: (Aurora.entitySize * 3),
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
								Aurora.addMethod(Aurora.methodSetup);
							},
							drawLeftLeg: function(parent) {
								Aurora.methodSetup = {
									method: function(id) {
										drawRect({
											posX: parent.posX + (Aurora.entitySize * 0.19),
											posY: parent.posY + (Aurora.entitySize * 3),
											width: (Aurora.entitySize * 1),
											height: (Aurora.entitySize * 3),
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
								Aurora.addMethod(Aurora.methodSetup);
							},
							drawRightLeg: function(parent) {
								Aurora.methodSetup = {
									method: function(id) {
										drawRect({
											posX: parent.posX + (Aurora.entitySize * 1.9),
											posY: parent.posY + (Aurora.entitySize * 3),
											width: (Aurora.entitySize * 1),
											height: (Aurora.entitySize * 3),
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
								Aurora.addMethod(Aurora.methodSetup);
							},
						},
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
		}

		function findAuroraObjects() {
		  // when the game starts up, look for the knight and animate it
		  // if (!knight?.methodId) {
		  //   knight = Aurora.methodObjects.find(x => x.id === 'knight');
			// 	if (knight.methodId) {
			// 		Aurora.createImageListFromGif('./assets/images/testKnight.GIF', knight.methodId);
			// 		animateObjects();
			// 	}
		  // }
			if (!robot?.methodId) {
				robot = Aurora.methodObjects.find(x => x.id === 'robot');
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
				knight = Aurora.nextTick(knight);
			}
			if (robot?.methodId) {
				const roboParts = Aurora.methodObjects.filter(x => x.id === 'robot');
				if (roboParts.length === 6) {
					setTimeout(function() {
						for (let i = 0; i < roboParts.length; i++) {
							roboParts[i].posX -= Aurora.moveEntity(0.1, Aurora.enumDirections.leftRight);
							if (i === roboParts.length -1) {
								break;
							}
						}
					}, 0);
				}
			}
		}

		function openArena() {
			// this is in mason_arena
			arenaPage.loadPage();
		}

		function moveMasonWorker() {
			const masonWorkers = Aurora.methodObjects.filter(x => x.id === 'mason-worker');
			// move the mason worker
			masonWorkers.forEach((worker, i) => {
				if (worker.props.direction === 'right') {
					masonWorkers[i].posX += Aurora.moveEntity(0.15, Aurora.enumDirections.leftRight);
				}
				if (worker.props.direction === 'left') {
					masonWorkers[i].posX -= Aurora.moveEntity(0.15, Aurora.enumDirections.leftRight);
				}
			});
		}

		function masonRockCollision(methodId) {
			const masonWorker = Aurora.methodObjects.find(x => x.methodId === methodId);
			if (masonWorker.props.direction === 'left') {
				masonWorker.props.direction = 'right';
			}
			if (masonWorker.props.direction === 'right') {
				masonWorker.props.direction = 'left';
			}
		}

		function openFactory() {
			// this method is in mason_factory
			factoryPage.loadPage();
		}

		function mineScrap() {
			if (gameObject.canClick) {
				gameObject.canClick = false;
				if (gameObject.gameSounds) {
					scrappingSound.cloneNode(true).play();
				}
				let scrapFoundText = '';
				let scrapFoundCount = 0;
				let totalScrap = 
					gameObject.commonScrap + 
					gameObject.unCommonScrap + 
					gameObject.uniqueScrap + 
					gameObject.intriguingScrap + 
					gameObject.facinatingScrap + 
					gameObject.mythicScrap + 
					gameObject.exoticScrap;
				if (totalScrap < gameObject.scrapInvintory) {
					Particle.drawSpark({
						posX: Aurora.placeEntityX(0.50, (Aurora.entitySize * 0.7)),
						posY: Aurora.placeEntityY(0.78, (Aurora.entitySize * 0.7)),
						shape: Particle.enumShapes.rect,
						color: '#909090',
						ticks: 11,
						count: 8,
						size: (Aurora.entitySize * 1),
						speed: 1.3,
					});
					const scrapRoll =  Math.round(Math.random() * (gameObject.scrapperSkill + 40));
					
					// future Jordan, consider reversing the scrap order. later levels makes common scrap look rare
					// other than testing the scrapping skill completely, it's time to work on the arena
					if (gameObject.scrapperSkill === 0) {
						if (scrapRoll >= (gameObject.scrapperSkill + 39)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Common Scrap +' + scrapFoundCount;
							gameObject.commonScrap += scrapFoundCount;
						}
					} else if (gameObject.scrapperSkill === 1) {
						if (scrapRoll >= (gameObject.scrapperSkill + 37)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Common Scrap +' + scrapFoundCount;
							gameObject.commonScrap += scrapFoundCount;
						}
					} else if (gameObject.scrapperSkill === 2) {
						if (scrapRoll >= (gameObject.scrapperSkill + 35)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Common Scrap +' + scrapFoundCount;
							gameObject.commonScrap += scrapFoundCount;
						}
					} else if (gameObject.scrapperSkill === 3) {
						if (scrapRoll >= (gameObject.scrapperSkill + 33)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Common Scrap +' + scrapFoundCount;
							gameObject.commonScrap += scrapFoundCount;
						}
					} else if (gameObject.scrapperSkill === 4) {
						if (scrapRoll >= (gameObject.scrapperSkill + 39)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Uncommon Scrap +' + scrapFoundCount;
							gameObject.unCommonScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 33)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Common Scrap +' + scrapFoundCount;
							gameObject.commonScrap += scrapFoundCount;
						}
					} else if (gameObject.scrapperSkill === 5) {
						if (scrapRoll >= (gameObject.scrapperSkill + 37)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Uncommon Scrap +' + scrapFoundCount;
							gameObject.unCommonScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 33)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Common Scrap +' + scrapFoundCount;
							gameObject.commonScrap += scrapFoundCount;
						}
					} else if (gameObject.scrapperSkill === 6) {
						if (scrapRoll >= (gameObject.scrapperSkill + 35)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Uncommon Scrap +' + scrapFoundCount;
							gameObject.unCommonScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 33)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Common Scrap +' + scrapFoundCount;
							gameObject.commonScrap += scrapFoundCount;
						}
					} else if (gameObject.scrapperSkill === 7) {
						if (scrapRoll >= (gameObject.scrapperSkill + 33)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Uncommon Scrap +' + scrapFoundCount;
							gameObject.unCommonScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 30)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Common Scrap +' + scrapFoundCount;
							gameObject.commonScrap += scrapFoundCount;
						}
					} else if (gameObject.scrapperSkill === 8) {
						if (scrapRoll >= (gameObject.scrapperSkill + 39)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Unique Scrap +' + scrapFoundCount;
							gameObject.uniqueScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 33)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Uncommon Scrap +' + scrapFoundCount;
							gameObject.unCommonScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 30)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Common Scrap +' + scrapFoundCount;
							gameObject.commonScrap += scrapFoundCount;
						}
					} else if (gameObject.scrapperSkill === 9) {
						if (scrapRoll >= (gameObject.scrapperSkill + 37)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Unique Scrap +' + scrapFoundCount;
							gameObject.uniqueScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 33)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Uncommon Scrap +' + scrapFoundCount;
							gameObject.unCommonScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 30)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Common Scrap +' + scrapFoundCount;
							gameObject.commonScrap += scrapFoundCount;
						}
					} else if (gameObject.scrapperSkill === 10) {
						if (scrapRoll >= (gameObject.scrapperSkill + 35)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Unique Scrap +' + scrapFoundCount;
							gameObject.uniqueScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 33)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Uncommon Scrap +' + scrapFoundCount;
							gameObject.unCommonScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 30)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Common Scrap +' + scrapFoundCount;
							gameObject.commonScrap += scrapFoundCount;
						}
					} else if (gameObject.scrapperSkill === 11) {
						if (scrapRoll >= (gameObject.scrapperSkill + 33)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Unique Scrap +' + scrapFoundCount;
							gameObject.uniqueScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 30)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Uncommon Scrap +' + scrapFoundCount;
							gameObject.unCommonScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 27)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Common Scrap +' + scrapFoundCount;
							gameObject.commonScrap += scrapFoundCount;
						}
					} else if (gameObject.scrapperSkill === 12) {
						if (scrapRoll >= (gameObject.scrapperSkill + 39)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Intriguing Scrap +' + scrapFoundCount;
							gameObject.intriguingScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 33)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Unique Scrap +' + scrapFoundCount;
							gameObject.uniqueScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 30)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Uncommon Scrap +' + scrapFoundCount;
							gameObject.unCommonScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 27)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Common Scrap +' + scrapFoundCount;
							gameObject.commonScrap += scrapFoundCount;
						}
					} else if (gameObject.scrapperSkill === 13) {
						if (scrapRoll >= (gameObject.scrapperSkill + 37)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Intriguing Scrap +' + scrapFoundCount;
							gameObject.intriguingScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 33)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Unique Scrap +' + scrapFoundCount;
							gameObject.uniqueScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 30)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Uncommon Scrap +' + scrapFoundCount;
							gameObject.unCommonScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 27)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Common Scrap +' + scrapFoundCount;
							gameObject.commonScrap += scrapFoundCount;
						}
					} else if (gameObject.scrapperSkill === 14) {
						if (scrapRoll >= (gameObject.scrapperSkill + 35)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Intriguing Scrap +' + scrapFoundCount;
							gameObject.intriguingScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 33)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Unique Scrap +' + scrapFoundCount;
							gameObject.uniqueScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 30)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Uncommon Scrap +' + scrapFoundCount;
							gameObject.unCommonScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 27)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Common Scrap +' + scrapFoundCount;
							gameObject.commonScrap += scrapFoundCount;
						}
					} else if (gameObject.scrapperSkill === 15) {
						if (scrapRoll >= (gameObject.scrapperSkill + 33)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Intriguing Scrap +' + scrapFoundCount;
							gameObject.intriguingScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 30)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Unique Scrap +' + scrapFoundCount;
							gameObject.uniqueScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 27)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Uncommon Scrap +' + scrapFoundCount;
							gameObject.unCommonScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 24)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Common Scrap +' + scrapFoundCount;
							gameObject.commonScrap += scrapFoundCount;
						}
					} else if (gameObject.scrapperSkill === 16) {
						if (scrapRoll >= (gameObject.scrapperSkill + 39)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Facinating Scrap +' + scrapFoundCount;
							gameObject.facinatingScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 33)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Intriguing Scrap +' + scrapFoundCount;
							gameObject.intriguingScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 30)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Unique Scrap +' + scrapFoundCount;
							gameObject.uniqueScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 27)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Uncommon Scrap +' + scrapFoundCount;
							gameObject.unCommonScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 24)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Common Scrap +' + scrapFoundCount;
							gameObject.commonScrap += scrapFoundCount;
						}
					} else if (gameObject.scrapperSkill === 17) {
						if (scrapRoll >= (gameObject.scrapperSkill + 37)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Facinating Scrap +' + scrapFoundCount;
							gameObject.facinatingScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 33)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Intriguing Scrap +' + scrapFoundCount;
							gameObject.intriguingScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 30)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Unique Scrap +' + scrapFoundCount;
							gameObject.uniqueScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 27)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Uncommon Scrap +' + scrapFoundCount;
							gameObject.unCommonScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 24)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Common Scrap +' + scrapFoundCount;
							gameObject.commonScrap += scrapFoundCount;
						}
					} else if (gameObject.scrapperSkill === 18) {
						if (scrapRoll >= (gameObject.scrapperSkill + 35)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Facinating Scrap +' + scrapFoundCount;
							gameObject.facinatingScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 33)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Intriguing Scrap +' + scrapFoundCount;
							gameObject.intriguingScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 30)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Unique Scrap +' + scrapFoundCount;
							gameObject.uniqueScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 27)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Uncommon Scrap +' + scrapFoundCount;
							gameObject.unCommonScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 24)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Common Scrap +' + scrapFoundCount;
							gameObject.commonScrap += scrapFoundCount;
						}
					} else if (gameObject.scrapperSkill === 19) {
						if (scrapRoll >= (gameObject.scrapperSkill + 33)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Facinating Scrap +' + scrapFoundCount;
							gameObject.facinatingScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 30)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Intriguing Scrap +' + scrapFoundCount;
							gameObject.intriguingScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 27)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Unique Scrap +' + scrapFoundCount;
							gameObject.uniqueScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 24)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Uncommon Scrap +' + scrapFoundCount;
							gameObject.unCommonScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 21)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Common Scrap +' + scrapFoundCount;
							gameObject.commonScrap += scrapFoundCount;
						}
					} else if (gameObject.scrapperSkill === 20) {
						if (scrapRoll >= (gameObject.scrapperSkill + 39)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Mythic Scrap +' + scrapFoundCount;
							gameObject.mythicScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 33)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Facinating Scrap +' + scrapFoundCount;
							gameObject.facinatingScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 30)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Intriguing Scrap +' + scrapFoundCount;
							gameObject.intriguingScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 27)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Unique Scrap +' + scrapFoundCount;
							gameObject.uniqueScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 24)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Uncommon Scrap +' + scrapFoundCount;
							gameObject.unCommonScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 21)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Common Scrap +' + scrapFoundCount;
							gameObject.commonScrap += scrapFoundCount;
						}
					} else if (gameObject.scrapperSkill === 21) {
						if (scrapRoll >= (gameObject.scrapperSkill + 37)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Mythic Scrap +' + scrapFoundCount;
							gameObject.mythicScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 33)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Facinating Scrap +' + scrapFoundCount;
							gameObject.facinatingScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 30)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Intriguing Scrap +' + scrapFoundCount;
							gameObject.intriguingScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 27)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Unique Scrap +' + scrapFoundCount;
							gameObject.uniqueScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 24)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Uncommon Scrap +' + scrapFoundCount;
							gameObject.unCommonScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 21)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Common Scrap +' + scrapFoundCount;
							gameObject.commonScrap += scrapFoundCount;
						}
					} else if (gameObject.scrapperSkill === 22) {
						if (scrapRoll >= (gameObject.scrapperSkill + 35)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Mythic Scrap +' + scrapFoundCount;
							gameObject.mythicScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 33)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Facinating Scrap +' + scrapFoundCount;
							gameObject.facinatingScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 30)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Intriguing Scrap +' + scrapFoundCount;
							gameObject.intriguingScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 27)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Unique Scrap +' + scrapFoundCount;
							gameObject.uniqueScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 24)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Uncommon Scrap +' + scrapFoundCount;
							gameObject.unCommonScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 21)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Common Scrap +' + scrapFoundCount;
							gameObject.commonScrap += scrapFoundCount;
						}
					} else if (gameObject.scrapperSkill === 23) {
						if (scrapRoll >= (gameObject.scrapperSkill + 33)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Mythic Scrap +' + scrapFoundCount;
							gameObject.mythicScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 30)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Facinating Scrap +' + scrapFoundCount;
							gameObject.facinatingScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 27)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Intriguing Scrap +' + scrapFoundCount;
							gameObject.intriguingScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 24)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Unique Scrap +' + scrapFoundCount;
							gameObject.uniqueScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 21)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Uncommon Scrap +' + scrapFoundCount;
							gameObject.unCommonScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 18)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Common Scrap +' + scrapFoundCount;
							gameObject.commonScrap += scrapFoundCount;
						}
					} else if (gameObject.scrapperSkill === 24) {
						if (scrapRoll >= (gameObject.scrapperSkill + 39)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Exotic Scrap +' + scrapFoundCount;
							gameObject.exoticScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 33)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Mythic Scrap +' + scrapFoundCount;
							gameObject.mythicScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 30)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Facinating Scrap +' + scrapFoundCount;
							gameObject.facinatingScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 27)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Intriguing Scrap +' + scrapFoundCount;
							gameObject.intriguingScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 24)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Unique Scrap +' + scrapFoundCount;
							gameObject.uniqueScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 21)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Uncommon Scrap +' + scrapFoundCount;
							gameObject.unCommonScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 18)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Common Scrap +' + scrapFoundCount;
							gameObject.commonScrap += scrapFoundCount;
						}
					} else if (gameObject.scrapperSkill === 25) {
						if (scrapRoll >= (gameObject.scrapperSkill + 37)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Exotic Scrap +' + scrapFoundCount;
							gameObject.exoticScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 33)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Mythic Scrap +' + scrapFoundCount;
							gameObject.mythicScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 30)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Facinating Scrap +' + scrapFoundCount;
							gameObject.facinatingScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 27)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Intriguing Scrap +' + scrapFoundCount;
							gameObject.intriguingScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 24)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Unique Scrap +' + scrapFoundCount;
							gameObject.uniqueScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 21)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Uncommon Scrap +' + scrapFoundCount;
							gameObject.unCommonScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 18)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Common Scrap +' + scrapFoundCount;
							gameObject.commonScrap += scrapFoundCount;
						}
					} else if (gameObject.scrapperSkill === 26) {
						if (scrapRoll >= (gameObject.scrapperSkill + 35)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Exotic Scrap +' + scrapFoundCount;
							gameObject.exoticScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 33)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Mythic Scrap +' + scrapFoundCount;
							gameObject.mythicScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 30)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Facinating Scrap +' + scrapFoundCount;
							gameObject.facinatingScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 27)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Intriguing Scrap +' + scrapFoundCount;
							gameObject.intriguingScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 24)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Unique Scrap +' + scrapFoundCount;
							gameObject.uniqueScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 21)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Uncommon Scrap +' + scrapFoundCount;
							gameObject.unCommonScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 18)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Common Scrap +' + scrapFoundCount;
							gameObject.commonScrap += scrapFoundCount;
						}
					} else if (gameObject.scrapperSkill >= 27) { // max level for now...
						if (scrapRoll >= (gameObject.scrapperSkill + 33)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Exotic Scrap +' + scrapFoundCount;
							gameObject.exoticScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 30)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Mythic Scrap +' + scrapFoundCount;
							gameObject.mythicScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 27)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Facinating Scrap +' + scrapFoundCount;
							gameObject.facinatingScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 24)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Intriguing Scrap +' + scrapFoundCount;
							gameObject.intriguingScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 21)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Unique Scrap +' + scrapFoundCount;
							gameObject.uniqueScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 18)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Uncommon Scrap +' + scrapFoundCount;
							gameObject.unCommonScrap += scrapFoundCount;
						} else if (scrapRoll >= (gameObject.scrapperSkill + 15)) {
							scrapFoundCount = 1;
							scrapFoundText = 'Common Scrap +' + scrapFoundCount;
							gameObject.commonScrap += scrapFoundCount;
						}
					}
					if (scrapFoundCount > 0) {
						if (gameObject.gameSounds) {
							addScrapSound.cloneNode(true).play();
						}
					}
					Particle.floatingText({
						font: '1.5rem serif',
						msg: scrapFoundText,
						align: 'center',
						posX: Aurora.placeEntityX(0.50, (Aurora.entitySize * 0.7)),
						posY: Aurora.placeEntityY(0.72, (Aurora.entitySize * 0.7)),
						direction: 'top',
						color: 'darkgrey',
						ticks: 100,
						speed: 0.5,
					});
				} else {
					Aurora.methodSetup = {
						method: function(id) {
							drawSimpleModal({
								posX: Aurora.placeEntityX(0.50, (Aurora.entitySize * 40)),
								posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
								width: (Aurora.entitySize * 40),
								height: (Aurora.entitySize * 30),
								lineWidth: 1,
								modalColor: 'darkgrey',
								msgColor: 'white',
								msgFont: '1.1em serif',
								msg: 'Not Enough Scrap Space',
								footerColor: 'white',
								footerFont: '1em serif',
								footerMsg: 'Tap here to continue',
								bgColor: '',
								isModalFilled: true,
								id: Aurora.modalId,
								action: { 
									method: function(id) {
										const modal = Aurora.methodObjects.find(build => build.id === Aurora.modalId);
										Aurora.deleteEntity(modal.methodId);
									}
								},
								props: {},
								methodId: id
							});
						}
					};
					Aurora.addMethod(Aurora.methodSetup);
				}
				const scrapRest = setInterval(function() {
					gameObject.canClick = true;
					clearInterval(scrapRest);
				}, gameObject.clickSpeed);
			}
			
		}

		function openHome() {
			// this method is in mason
			homePage.loadPage();
		}
	}
}
titlePage.loadPage();




