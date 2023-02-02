// Copyright (C) 2022  Jordan Wilson
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

(function() {
	Game.canvas = document.getElementById('Stage');
	seedRobotDesigns();
	Game.setSettingsHigh();
})();

function seedRobotDesigns() {
	for (let i = 0; i < gameObject.robotDesignCount; i++) {
		const robotDesign = {
			robotId: i,
			robotParts: [],
		};
		gameObject.robotDesigns.push(robotDesign);
	}
}

const mainPage = {
	description: 'The main landing page of Mason',
	loadPage: function() {
		const masonWorkerImg = new Image();
		const rockImg = new Image();
		const grassImg = new Image();
		const masonWorkerPath = './assets/images/stoneWorker.png';
		const rock1Path = './assets/images/rock1.png';
		const grassPath = './assets/images/grass.png';
		let knight = {};
		let robot = {};

		masonWorkerImg.src = masonWorkerPath;
		rockImg.src = rock1Path;
		grassImg.src = grassPath;
		playGame();

		function playGame() {
			robot = {};
			// below is a test... the player needs to discover these
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
			  //   isModalBtn: false,
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
				isModalBtn: false,
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
						isModalBtn: false,
						props: {},
						methodId: id
					});
				}
			};
			Game.addMethod(Game.methodSetup);
			if (gameObject.factoryBuilt) {
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
							isModalBtn: false,
							props: {},
							methodId: id
						});
					}
				};
				Game.addMethod(Game.methodSetup);
			}
			if (gameObject.arenaBuild) {
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
							isModalBtn: false,
							props: {},
							methodId: id
						});
					}
				};
				Game.addMethod(Game.methodSetup);
			}
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
				if (roboParts.length === 6) {
					setTimeout(function() {
						for (let i = 0; i < roboParts.length; i++) {
							roboParts[i].posX -= Game.moveEntity(0.1, Game.enumDirections.leftRight);
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

		function openFactory() {
			// this method is in mason_factory
			factoryPage.loadPage();
		}

		function mineScrap() {
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
					posX: Game.placeEntityX(0.50, (Game.entitySize * 0.7)),
					posY: Game.placeEntityY(0.78, (Game.entitySize * 0.7)),
					shape: Particle.enumShapes.rect,
					color: '#909090',
					ticks: 11,
					count: 8,
					size: (Game.entitySize * 1),
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
				Particle.floatingText({
					font: '1.5rem serif',
					msg: scrapFoundText,
					align: 'center',
					posX: Game.placeEntityX(0.50, (Game.entitySize * 0.7)),
					posY: Game.placeEntityY(0.72, (Game.entitySize * 0.7)),
					direction: 'top',
					color: 'darkgrey',
					ticks: 100,
					speed: 0.5,
				});
			} else {
				Game.methodSetup = {
					method: function(id) {
						drawSimpleModal({
							posX: Game.placeEntityX(0.50, (Game.entitySize * 40)),
							posY: Game.placeEntityY(0.50, (Game.entitySize * 30)),
							width: (Game.entitySize * 40),
							height: (Game.entitySize * 30),
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
							id: Game.modalId,
							action: { 
								method: function(id) {
									const modal = Game.methodObjects.find(build => build.id === Game.modalId);
									Game.deleteEntity(modal.methodId);
								}
							},
							props: {},
							methodId: id
						});
					}
				};
				Game.addMethod(Game.methodSetup);
			}
		}

		function openHome() {
			// this method is in mason
			homePage.loadPage();
		}
	}
}
mainPage.loadPage();




