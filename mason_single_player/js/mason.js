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

const masonWorkerImg = new Image();
const rockImg = new Image();
const grassImg = new Image();
const masonWorkerPath = './assets/images/stoneWorker.png';
const rock1Path = './assets/images/rock1.png';
const grassPath = './assets/images/grass.png';
let knight = {};
let robot = {};



(function() {
	Game.canvas = document.getElementById('Stage');
	masonWorkerImg.src = masonWorkerPath;
	rockImg.src = rock1Path;
	grassImg.src = grassPath;
	Game.setSettingsHigh();
	seedRobotDesigns()
	playGame();
})();

function seedRobotDesigns() {
	for (let i = 0; i < gameObject.robotDesignCount; i++) {
		const robotDesign = {
			robotId: i,
			robotParts: [],
		};
		gameObject.robotDesigns.push(robotDesign);
	}
	console.log(gameObject.robotDesigns);
}

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

function openFactory() {
	// this method is in mason_factory
	factoryRobotSelect();
}

function mineScrap() {
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
	console.log('scrapping! ');
}

function openHome() {
	console.log('open Home');
	homeMenuSelect();
}

function displayCondensedFunds() {
	if (gameObject.mythryl > 0) {
		// future Jordan, 99,999 is the max number on mobile display
		Game.methodSetup = {
			method: function(id) {
				drawText({
					font: '1.2em serif',
					msg: 'Mythryl: ' + gameObject.mythryl,
					posX: Game.placeEntityX(0.565),
					posY: Game.placeEntityY(0.245),
					color: 'grey',
					align: 'left',
					props: {},
					id: 'player-funds-high',
					methodId: id
				});
			}
		};
		Game.addMethod(Game.methodSetup);
		Game.methodSetup = {
			method: function(id) {
				drawText({
					font: '1.2em serif',
					msg: 'Platinum: ' + gameObject.platinum,
					posX: Game.placeEntityX(0.565),
					posY: Game.placeEntityY(0.295),
					color: 'grey',
					align: 'left',
					props: {},
					id: 'player-funds-low',
					methodId: id
				});
			}
		};
		Game.addMethod(Game.methodSetup);
	} else if (gameObject.platinum > 0) {
		Game.methodSetup = {
			method: function(id) {
				drawText({
					font: '1.2em serif',
					msg: 'Platinum: ' + gameObject.platinum,
					posX: Game.placeEntityX(0.565),
					posY: Game.placeEntityY(0.245),
					color: 'grey',
					align: 'left',
					props: {},
					id: 'player-funds-high',
					methodId: id
				});
			}
		};
		Game.addMethod(Game.methodSetup);
		Game.methodSetup = {
			method: function(id) {
				drawText({
					font: '1.2em serif',
					msg: 'Gold: ' + gameObject.gold,
					posX: Game.placeEntityX(0.565),
					posY: Game.placeEntityY(0.295),
					color: 'grey',
					align: 'left',
					props: {},
					id: 'player-funds-low',
					methodId: id
				});
			}
		};
		Game.addMethod(Game.methodSetup);
	} else if (gameObject.gold > 0) {
		Game.methodSetup = {
			method: function(id) {
				drawText({
					font: '1.2em serif',
					msg: 'Gold: ' + gameObject.gold,
					posX: Game.placeEntityX(0.565),
					posY: Game.placeEntityY(0.245),
					color: 'grey',
					align: 'left',
					props: {},
					id: 'player-funds-high',
					methodId: id
				});
			}
		};
		Game.addMethod(Game.methodSetup);
		Game.methodSetup = {
			method: function(id) {
				drawText({
					font: '1.2em serif',
					msg: 'Silver: ' + gameObject.silver,
					posX: Game.placeEntityX(0.565),
					posY: Game.placeEntityY(0.295),
					color: 'grey',
					align: 'left',
					props: {},
					id: 'player-funds-low',
					methodId: id
				});
			}
		};
		Game.addMethod(Game.methodSetup);
	} else if (gameObject.silver > 0) {
		Game.methodSetup = {
			method: function(id) {
				drawText({
					font: '1.2em serif',
					msg: 'Silver: ' + gameObject.silver,
					posX: Game.placeEntityX(0.565),
					posY: Game.placeEntityY(0.245),
					color: 'grey',
					align: 'left',
					props: {},
					id: 'player-funds-high',
					methodId: id
				});
			}
		};
		Game.addMethod(Game.methodSetup);
		Game.methodSetup = {
			method: function(id) {
				drawText({
					font: '1.2em serif',
					msg: 'Bronze: ' + gameObject.bronze,
					posX: Game.placeEntityX(0.565),
					posY: Game.placeEntityY(0.295),
					color: 'grey',
					align: 'left',
					props: {},
					id: 'player-funds-low',
					methodId: id
				});
			}
		};
		Game.addMethod(Game.methodSetup);
	} else if (gameObject.bronze > 0) {
		Game.methodSetup = {
			method: function(id) {
				drawText({
					font: '1.2em serif',
					msg: 'Bronze: ' + gameObject.bronze,
					posX: Game.placeEntityX(0.565),
					posY: Game.placeEntityY(0.245),
					color: 'grey',
					align: 'left',
					props: {},
					id: 'player-funds-high',
					methodId: id
				});
			}
		};
		Game.addMethod(Game.methodSetup);
		Game.methodSetup = {
			method: function(id) {
				drawText({
					font: '1.2em serif',
					msg: 'Copper: ' + gameObject.copper,
					posX: Game.placeEntityX(0.565),
					posY: Game.placeEntityY(0.295),
					color: 'grey',
					align: 'left',
					props: {},
					id: 'player-funds-low',
					methodId: id
				});
			}
		};
		Game.addMethod(Game.methodSetup);
	} else if (gameObject.copper >= 0) {
		Game.methodSetup = {
			method: function(id) {
				drawText({
					font: '1.2em serif',
					msg: 'Copper: ' + gameObject.copper,
					posX: Game.placeEntityX(0.565),
					posY: Game.placeEntityY(0.245),
					color: 'grey',
					align: 'left',
					props: {},
					id: 'player-funds-high',
					methodId: id
				});
			}
		};
		Game.addMethod(Game.methodSetup);
	}
}

function addFunds(addFund) {
	addFund.forEach(fund => {
		if (fund.money === 'copper') {
			for (let i = 0; i < fund.price; i++) {
				gameObject.copper++;
				if (gameObject.copper >= 1000) {
					gameObject.copper = 0;
					gameObject.bronze++;
				}
			}
		}
	});
	
	console.log(gameObject.copper);
	
}

// this is the start of the home menus
function homeMenuSelect() {
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
				id: 'home-background',
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
				id: 'home-back-game',
				action: { 
					method: function(id) { 
						playGame();
					}
				},
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
				msg: 'Home',
				posX: Game.placeEntityX(0.50),
				posY: Game.placeEntityY(0.085),
				color: 'darkgrey',
				align: 'center',
				props: {},
				id: 'home-title',
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
				width: (Game.canvas.width * 0.94),
				height: (Game.canvas.height * 0.855),
				lineWidth: 1,
				color: 'lightgrey',
				isFilled: true,
				id: 'home-select-background',
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
				posX: Game.placeEntityX(0.25, (Game.entitySize * 20)),
				posY: Game.placeEntityY(0.55, (Game.entitySize * 75)),
				width: (Game.entitySize * 20),
				height: (Game.entitySize * 75),
				lineWidth: 1,
				btnColor: 'brown',
				txtColor: 'white',
				font: '1.5em serif',
				msg: 'Map',
				isFilled: true,
				id: 'home-select-map',
				action: { 
					method: function(id) { 
						console.log('load up the map menu');
					}
				},
				props: {},
				methodId: id
			});
		}
	};
	Game.addMethod(Game.methodSetup);
	Game.methodSetup = {
		method: function(id) {
			drawButton({
				posX: Game.placeEntityX(0.75, (Game.entitySize * 20)),
				posY: Game.placeEntityY(0.36, (Game.entitySize * 37)),
				width: (Game.entitySize * 20),
				height: (Game.entitySize * 37),
				lineWidth: 1,
				btnColor: 'burlywood',
				txtColor: 'white',
				font: '1.5em serif',
				msg: 'Sell',
				isFilled: true,
				id: 'home-select-sell',
				action: { 
					method: function(id) { 
						console.log('load up the sell menu');
						homeSellSelect();
					}
				},
				props: {},
				methodId: id
			});
		}
	};
	Game.addMethod(Game.methodSetup);
	Game.methodSetup = {
		method: function(id) {
			drawButton({
				posX: Game.placeEntityX(0.75, (Game.entitySize * 20)),
				posY: Game.placeEntityY(0.74, (Game.entitySize * 37)),
				width: (Game.entitySize * 20),
				height: (Game.entitySize * 37),
				lineWidth: 1,
				btnColor: 'cadetblue',
				txtColor: 'white',
				font: '1.5em serif',
				msg: 'Upgrade',
				isFilled: true,
				id: 'home-select-upgrade',
				action: { 
					method: function(id) { 
						console.log('load up the upgrade menu');
					}
				},
				props: {},
				methodId: id
			});
		}
	};
	Game.addMethod(Game.methodSetup);
}

function homeSellSelect() {
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
				id: 'sell-background',
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
				id: 'sell-back-game',
				action: { 
					method: function(id) { 
						homeMenuSelect();
					}
				},
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
				msg: 'Sell',
				posX: Game.placeEntityX(0.50),
				posY: Game.placeEntityY(0.085),
				color: 'darkgrey',
				align: 'center',
				props: {},
				id: 'sell-title',
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
				width: (Game.canvas.width * 0.94),
				height: (Game.canvas.height * 0.855),
				lineWidth: 1,
				color: 'lightgrey',
				isFilled: true,
				id: 'sell-select-background',
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
				posX: Game.placeEntityX(0.50, (Game.entitySize * 45)),
				posY: Game.placeEntityY(0.30, (Game.entitySize * 20)),
				width: (Game.entitySize * 45),
				height: (Game.entitySize * 20),
				lineWidth: 1,
				btnColor: 'dodgerblue',
				txtColor: 'white',
				font: '1.5em serif',
				msg: 'Scrap',
				isFilled: true,
				id: 'sell-select-scrap',
				action: { 
					method: function(id) { 
						console.log('load up the sell scrap menu');
						homeSellScrap();
					}
				},
				props: {},
				methodId: id
			});
		}
	};
	Game.addMethod(Game.methodSetup);
	Game.methodSetup = {
		method: function(id) {
			drawButton({
				posX: Game.placeEntityX(0.50, (Game.entitySize * 45)),
				posY: Game.placeEntityY(0.55, (Game.entitySize * 20)),
				width: (Game.entitySize * 45),
				height: (Game.entitySize * 20),
				lineWidth: 1,
				btnColor: 'goldenrod',
				txtColor: 'white',
				font: '1.5em serif',
				msg: 'Parts',
				isFilled: true,
				id: 'sell-select-parts',
				action: { 
					method: function(id) { 
						console.log('load up the sell parts menu');
					}
				},
				props: {},
				methodId: id
			});
		}
	};
	Game.addMethod(Game.methodSetup);
	Game.methodSetup = { 
		method: function(id) {
			drawButton({
				posX: Game.placeEntityX(0.50, (Game.entitySize * 45)),
				posY: Game.placeEntityY(0.80, (Game.entitySize * 20)),
				width: (Game.entitySize * 45),
				height: (Game.entitySize * 20),
				lineWidth: 1,
				btnColor: 'indigo',
				txtColor: 'white',
				font: '1.5em serif',
				msg: 'Robots',
				isFilled: true,
				id: 'sell-select-robots',
				action: { 
					method: function(id) {
						console.log('load up the sell robots menu');
					}
				},
				props: {},
				methodId: id
			});
		}
	};
	Game.addMethod(Game.methodSetup);
}

function homeSellScrap() {
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
				id: 'sell-scrap-main-background',
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
				height: (Game.canvas.height * 0.855),
				lineWidth: 1,
				color: 'lightgrey',
				isFilled: true,
				id: 'scrap-types-background',
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
				posX: Game.placeEntityX(0.775, (Game.canvas.width * 0.57)),
				posY: Game.placeEntityY(0.725, (Game.canvas.height * 0.45)),
				width: (Game.canvas.width * 0.48),
				height: (Game.canvas.height * 0.48),
				lineWidth: 1,
				color: 'lightgrey',
				isFilled: true,
				id: 'scrap-sell-background',
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
				posX: Game.placeEntityX(0.775, (Game.canvas.width * 0.57)),
				posY: Game.placeEntityY(0.35, (Game.canvas.height * 0.45)),
				width: (Game.canvas.width * 0.48),
				height: (Game.canvas.height * 0.365),
				lineWidth: 1,
				color: 'lightgrey',
				isFilled: true,
				id: 'scrap-count-background',
				isBackground: true,
				props: {},
				methodId: id
			});
		}
	};
	Game.addMethod(Game.methodSetup);
	drawSellScrapButtons(); // draw the scrap buttons in the top left
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
				id: 'scrap-back-game',
				action: { method: function(id) {
					 homeSellSelect();

					}
				},
				props: {},
				methodId: id
			});
		}
	};
	Game.addMethod(Game.methodSetup);
	createSellScrapTitles();
	displayCondensedFunds();
}

function createSellScrapTitles() {
	Game.methodSetup = {
		method: function(id) {
			drawText({
				font: '2em serif',
				msg: 'Sell Scrap',
				posX: Game.placeEntityX(0.50),
				posY: Game.placeEntityY(0.085),
				color: 'darkgrey',
				align: 'center',
				props: {},
				id: 'sell-scrap-title',
				methodId: id
			});
		}
	};
	Game.addMethod(Game.methodSetup);
	Game.methodSetup = {
		method: function(id) {
			drawText({
				font: '2em serif',
				msg: 'Total',
				posX: Game.placeEntityX(0.715),
				posY: Game.placeEntityY(0.565),
				color: 'grey',
				align: 'center',
				props: {},
				id: 'total-scrap-price-title',
				methodId: id
			});
		}
	};
	Game.addMethod(Game.methodSetup);
	Game.methodSetup = {
		method: function(id) {
			drawText({
				font: '2em serif',
				msg: 'Funds',
				posX: Game.placeEntityX(0.715),
				posY: Game.placeEntityY(0.185),
				color: 'grey',
				align: 'center',
				props: {},
				id: 'total-funds-title',
				methodId: id
			});
		}
	};
	Game.addMethod(Game.methodSetup);
	Game.methodSetup = {
		method: function(id) {
			drawText({
				font: '2em serif',
				msg: 'Count',
				posX: Game.placeEntityX(0.715),
				posY: Game.placeEntityY(0.385),
				color: 'grey',
				align: 'center',
				props: {},
				id: 'total-scrap-count-title',
				methodId: id
			});
		}
	};
	Game.addMethod(Game.methodSetup);
}

function drawSellScrapButtons() {
	Game.methodSetup = {
		method: function(id) {
			drawButton({
				posX: Game.placeEntityX(0.2547, (Game.canvas.width * 0.44)),
				posY: Game.placeEntityY(0.395, (Game.canvas.height * 0.45)),
				width: (Game.canvas.width * 0.44),
				height: (Game.canvas.height * 0.1),
				lineWidth: 1,
				btnColor: gameObject.commonScrap <= 0 ? '#C0C0C0' : 'lightslategrey',
				txtColor: 'white',
				font: '1.1em serif',
				msg: 'Common Scrap',
				isFilled: true,
				id: 'sell-common-scrap',
				action: { 
					method: function(id) {
						if (gameObject.commonScrap > 0) {
							selectCommonScrap(); 
						}
						
					}
				},
				props: {},
				methodId: id
			});
		}
	};
	Game.addMethod(Game.methodSetup);
	Game.methodSetup = {
		method: function(id) {
			drawButton({
				posX: Game.placeEntityX(0.2547, (Game.canvas.width * 0.44)),
				posY: Game.placeEntityY(0.505, (Game.canvas.height * 0.45)),
				width: (Game.canvas.width * 0.44),
				height: (Game.canvas.height * 0.1),
				lineWidth: 1,
				btnColor: gameObject.unCommonScrap <= 0 ? '#C0C0C0' : 'lightslategrey',
				txtColor: 'white',
				font: '1.1em serif',
				msg: 'UnCommon Scrap',
				isFilled: true,
				id: 'sell-uncommon-scrap',
				action: { 
					method: function(id) { 
						if (gameObject.unCommonScrap > 0) {
							selectUnCommonScrap(); 
						}
					}
				},
				props: {},
				methodId: id
			});
		}
	};
	Game.addMethod(Game.methodSetup);
	Game.methodSetup = {
		method: function(id) {
			drawButton({
				posX: Game.placeEntityX(0.2547, (Game.canvas.width * 0.44)),
				posY: Game.placeEntityY(0.615, (Game.canvas.height * 0.45)),
				width: (Game.canvas.width * 0.44),
				height: (Game.canvas.height * 0.1),
				lineWidth: 1,
				btnColor: gameObject.uniqueScrap <= 0 ? '#C0C0C0' : 'lightslategrey',
				txtColor: 'white',
				font: '1.1em serif',
				msg: 'Unique Scrap',
				isFilled: true,
				id: 'sell-unique-scrap',
				action: { 
					method: function(id) {
						if (gameObject.uniqueScrap > 0) {
							selectUniqueScrap(); 
						}
					}
				},
				props: {},
				methodId: id
			});
		}
	};
	Game.addMethod(Game.methodSetup);
	Game.methodSetup = {
		method: function(id) {
			drawButton({
				posX: Game.placeEntityX(0.2547, (Game.canvas.width * 0.44)),
				posY: Game.placeEntityY(0.725, (Game.canvas.height * 0.45)),
				width: (Game.canvas.width * 0.44),
				height: (Game.canvas.height * 0.1),
				lineWidth: 1,
				btnColor: gameObject.intriguingScrap <= 0 ? '#C0C0C0' : 'lightslategrey',
				txtColor: 'white',
				font: '1.1em serif',
				msg: 'Intriguing Scrap',
				isFilled: true,
				id: 'sell-intriguing-scrap',
				action: { 
					method: function(id) {
						if (gameObject.intriguingScrap > 0) {
							selectIntriguingScrap();
						}
					}
				},
				props: {},
				methodId: id
			});
		}
	};
	Game.addMethod(Game.methodSetup);
	Game.methodSetup = {
		method: function(id) {
			drawButton({
				posX: Game.placeEntityX(0.2547, (Game.canvas.width * 0.44)),
				posY: Game.placeEntityY(0.835, (Game.canvas.height * 0.45)),
				width: (Game.canvas.width * 0.44),
				height: (Game.canvas.height * 0.1),
				lineWidth: 1,
				btnColor: gameObject.facinatingScrap <= 0 ? '#C0C0C0' : 'lightslategrey',
				txtColor: 'white',
				font: '1.1em serif',
				msg: 'Facinating Scrap',
				isFilled: true,
				id: 'sell-facinating-scrap',
				action: { 
					method: function(id) { 
						if (gameObject.facinatingScrap > 0) {
							selectFacinatingScrap(); 
						}
					}
				},
				props: {},
				methodId: id
			});
		}
	};
	Game.addMethod(Game.methodSetup);
	Game.methodSetup = {
		method: function(id) {
			drawButton({
				posX: Game.placeEntityX(0.2547, (Game.canvas.width * 0.44)),
				posY: Game.placeEntityY(0.945, (Game.canvas.height * 0.45)),
				width: (Game.canvas.width * 0.44),
				height: (Game.canvas.height * 0.1),
				lineWidth: 1,
				btnColor: gameObject.mythicScrap <= 0 ? '#C0C0C0' : 'lightslategrey',
				txtColor: 'white',
				font: '1.1em serif',
				msg: 'Mythic Scrap',
				isFilled: true,
				id: 'sell-mythic-scrap',
				action: { 
					method: function(id) {
						if (gameObject.mythicScrap > 0) {
							selectMythicScrap(); 
						}
					}
				},
				props: {},
				methodId: id
			});
		}
	};
	Game.addMethod(Game.methodSetup);
	Game.methodSetup = {
		method: function(id) {
			drawButton({
				posX: Game.placeEntityX(0.2547, (Game.canvas.width * 0.44)),
				posY: Game.placeEntityY(1.055, (Game.canvas.height * 0.45)),
				width: (Game.canvas.width * 0.44),
				height: (Game.canvas.height * 0.1),
				lineWidth: 1,
				btnColor: gameObject.exoticScrap <= 0 ? '#C0C0C0' : 'lightslategrey',
				txtColor: 'white',
				font: '1.1em serif',
				msg: 'Exotic Scrap',
				isFilled: true,
				id: 'sell-exotic-scrap',
				action: { 
					method: function(id) { 
						if (gameObject.exoticScrap > 0) {
							selectExoticScrap();
						}
					}
				},
				props: {},
				methodId: id
			});
		}
	};
	Game.addMethod(Game.methodSetup);
}

function selectCommonScrap() {
	gameObject.scrapToSell = 'common';
	clearSellScrapScreen();
	refreshSellScrapBackgrounds();
	clearSellScrapHighlight();
	const highlight = Game.methodObjects.find(item => item.id === 'sell-common-scrap');
	highlight.btnColor = 'yellow';
	highlight.txtColor = 'black';
	setTimeout(function() {
		selectScrapPrice(gameObject.scrapToSell);
	}, 0);
	
}

function selectUnCommonScrap() {
	gameObject.scrapToSell = 'unCommon';
	clearSellScrapScreen();
	refreshSellScrapBackgrounds();
	clearSellScrapHighlight();
	const highlight = Game.methodObjects.find(item => item.id === 'sell-uncommon-scrap');
	highlight.btnColor = 'yellow';
	highlight.txtColor = 'black';
	setTimeout(function() {
		selectScrapPrice(gameObject.scrapToSell);
	}, 0);
}

function selectUniqueScrap() {
	gameObject.scrapToSell = 'unique';
	clearSellScrapScreen();
	refreshSellScrapBackgrounds();
	clearSellScrapHighlight();
	const highlight = Game.methodObjects.find(item => item.id === 'sell-unique-scrap');
	highlight.btnColor = 'yellow';
	highlight.txtColor = 'black';
	setTimeout(function() {
		selectScrapPrice(gameObject.scrapToSell);
	}, 0);
}

function selectIntriguingScrap() {
	gameObject.scrapToSell = 'intriguing';
	clearSellScrapScreen();
	refreshSellScrapBackgrounds();
	clearSellScrapHighlight();
	const highlight = Game.methodObjects.find(item => item.id === 'sell-intriguing-scrap');
	highlight.btnColor = 'yellow';
	highlight.txtColor = 'black';
	setTimeout(function() {
		selectScrapPrice(gameObject.scrapToSell);
	}, 0);
}

function selectFacinatingScrap() {
	gameObject.scrapToSell = 'facinating';
	clearSellScrapScreen();
	refreshSellScrapBackgrounds();
	clearSellScrapHighlight();
	const highlight = Game.methodObjects.find(item => item.id === 'sell-facinating-scrap');
	highlight.btnColor = 'yellow';
	highlight.txtColor = 'black';
	setTimeout(function() {
		selectScrapPrice(gameObject.scrapToSell);
	}, 0);
}

function selectMythicScrap() {
	gameObject.scrapToSell = 'mythic';
	clearSellScrapScreen();
	refreshSellScrapBackgrounds();
	clearSellScrapHighlight();
	const highlight = Game.methodObjects.find(item => item.id === 'sell-mythic-scrap');
	highlight.btnColor = 'yellow';
	highlight.txtColor = 'black';
	setTimeout(function() {
		selectScrapPrice(gameObject.scrapToSell);
	}, 0);
}

function selectExoticScrap() {
	gameObject.scrapToSell = 'exotic';
	clearSellScrapScreen();
	refreshSellScrapBackgrounds();
	clearSellScrapHighlight();
	const highlight = Game.methodObjects.find(item => item.id === 'sell-exotic-scrap');
	highlight.btnColor = 'yellow';
	highlight.txtColor = 'black';
	setTimeout(function() {
		selectScrapPrice(gameObject.scrapToSell);
	}, 0);
}

function selectScrapPrice(scrapType) {
	createSellScrapTitles();
	displayCondensedFunds();
	Game.methodSetup = {
		method: function(id) {
			drawText({
				font: '1.5em serif',
				msg: displayScrapCount(scrapType),
				posX: Game.placeEntityX(0.715),
				posY: Game.placeEntityY(0.445),
				color: 'grey',
				align: 'center',
				props: {},
				id: 'scrap-count',
				methodId: id
			});
		}
	};
	Game.addMethod(Game.methodSetup);
	let maxValue = false;
	const pricesToDisplay = [];
	
	if (scrapType === 'common') {
		gameObject.commonScrapBase.forEach((scrap, i) => {
			if (scrap.price > 0) {
				maxValue = true;
			}
			if (maxValue) {
				pricesToDisplay.push(scrap);
			}
		});
	} else if (scrapType === 'unCommon') {
		gameObject.unCommonScrapBase.forEach((scrap, i) => {
			if (scrap.price > 0) {
				maxValue = true;
			}
			if (maxValue) {
				pricesToDisplay.push(scrap);
			}
		});
	} else if (scrapType === 'unique') {
		gameObject.uniqueScrapBase.forEach((scrap, i) => {
			if (scrap.price > 0) {
				maxValue = true;
			}
			if (maxValue) {
				pricesToDisplay.push(scrap);
			}
		});
	} else if (scrapType === 'intriguing') {
		gameObject.intriguingScrapBase.forEach((scrap, i) => {
			if (scrap.price > 0) {
				maxValue = true;
			}
			if (maxValue) {
				pricesToDisplay.push(scrap);
			}
		});
	} else if (scrapType === 'facinating') {
		gameObject.facinatingScrapBase.forEach((scrap, i) => {
			if (scrap.price > 0) {
				maxValue = true;
			}
			if (maxValue) {
				pricesToDisplay.push(scrap);
			}
		});
	} else if (scrapType === 'mythic') {
		gameObject.mythicScrapBase.forEach((scrap, i) => {
			if (scrap.price > 0) {
				maxValue = true;
			}
			if (maxValue) {
				pricesToDisplay.push(scrap);
			}
		});
	} else if (scrapType === 'exotic') {
		gameObject.exoticScrapBase.forEach((scrap, i) => {
			if (scrap.price > 0) {
				maxValue = true;
			}
			if (maxValue) {
				pricesToDisplay.push(scrap);
			}
		});
	}
	
	pricesToDisplay.forEach((scrap, i) => {
		Game.methodSetup = {
			method: function(id) {
				drawText({
					font: '1.2em serif',
					msg: scrap.money.charAt(0).toUpperCase() + scrap.money.slice(1) + ': ' + scrap.price,
					posX: Game.placeEntityX(0.515),
					posY: Game.placeEntityY(0.635 + (i * 0.045)),
					color: 'grey',
					align: 'left',
					props: {},
					id: 'scrap-price',
					methodId: id
				});
			}
		};
		Game.addMethod(Game.methodSetup);
	});
	// future Jordan, make the sell button do something. make methods that will
	// add to your funds in regards to the exchange rates and also a subtract method.
	// grey out the sell button and display a modal once the player has sold all of that scrap.
	Game.methodSetup = {
		method: function(id) {
			drawButton({
				posX: Game.placeEntityX(0.73, (Game.canvas.width * 0.44)),
				posY: Game.placeEntityY(1.111, (Game.canvas.height * 0.45)),
				width: (Game.canvas.width * 0.44),
				height: (Game.canvas.height * 0.08),
				lineWidth: 1,
				btnColor: 'grey',
				txtColor: 'white',
				font: '1.1em serif',
				msg: 'Sell',
				isFilled: true,
				id: 'sell-scrap-btn',
				action: { 
					method: function(id) {
						console.log('sell ' + gameObject.scrapToSell + ' scrap');
						if (gameObject.scrapToSell === 'common') {
							// future Jordan, update the funds on the screen
							gameObject.commonScrap--;
							if (gameObject.commonScrap >= 0) {
								// future Jordan, add more to addFunds()
								addFunds(gameObject.commonScrapBase);
								
								// future Jordan, whatever happens when the common scrap button is pressed,
								// needs to happen here.
								
								//const scrapCountBg = Game.methodObjects.find(x => x.id === 'scrap-sell-background');
								//if (scrapCountBg) {
									//scrapCountBg.isAnim = true;
								//}
								
								// Game.methodObjects.find(x => x.id === 'robot-stat-background').isAnim = true;
								// clearSellScrapScreen();
								//const fundsHigh = Game.methodObjects.filter(x => x.id === 'player-funds-high');
								//const fundsLow = Game.methodObjects.filter(x => x.id === 'player-funds-low');
								//if (fundsHigh.length > 0) {
									//fundsHigh.forEach((item, i) => {
										//Game.deleteEntity(item.methodId);
									//});
								//}
								//if (fundsLow.length > 0) {
									//fundsLow.forEach((item, i) => {
										//Game.deleteEntity(item.methodId);
									//});
								//}
								displayCondensedFunds();
							} else {
								gameObject.commonScrap = 0;
							}
						}
					}
				},
				props: {},
				methodId: id
			});
		}
	};
	Game.addMethod(Game.methodSetup);
}

function displayScrapCount(scrapType) {
	if (scrapType === 'common') {
		return gameObject.commonScrap;
	} else if (scrapType === 'unCommon') {
		return gameObject.unCommonScrap;
	} else if (scrapType === 'unique') {
		return gameObject.uniqueScrap;
	} else if (scrapType === 'intriguing') {
		return gameObject.intriguingScrap;
	} else if (scrapType === 'facinating') {
		return gameObject.facinatingScrap;
	} else if (scrapType === 'mythic') {
		return gameObject.mythicScrap;
	} else if (scrapType === 'exotic') {
		return gameObject.exoticScrap;
	}
}

function clearSellScrapHighlight() {
	const commonHighlight = Game.methodObjects.find(item => item.id === 'sell-common-scrap');
	commonHighlight.btnColor = gameObject.commonScrap <= 0 ? '#C0C0C0' : 'lightslategrey';
	commonHighlight.txtColor = 'white';
	const unCommonHighlight = Game.methodObjects.find(item => item.id === 'sell-uncommon-scrap');
	unCommonHighlight.btnColor = gameObject.unCommonScrap <= 0 ? '#C0C0C0' : 'lightslategrey';
	unCommonHighlight.txtColor = 'white';
	const uniqueHighlight = Game.methodObjects.find(x => x.id === 'sell-unique-scrap');
	uniqueHighlight.btnColor = gameObject.uniqueScrap <= 0 ? '#C0C0C0' : 'lightslategrey';
	uniqueHighlight.txtColor = 'white';
	const intriguingHighlight = Game.methodObjects.find(x => x.id === 'sell-intriguing-scrap');
	intriguingHighlight.btnColor = gameObject.intriguingScrap <= 0 ? '#C0C0C0' : 'lightslategrey';
	intriguingHighlight.txtColor = 'white';
	const facinatingHighlight = Game.methodObjects.find(x => x.id === 'sell-facinating-scrap');
	facinatingHighlight.btnColor = gameObject.facinatingScrap <= 0 ? '#C0C0C0' : 'lightslategrey';
	facinatingHighlight.txtColor = 'white';
	const mythicHighlight = Game.methodObjects.find(x => x.id === 'sell-mythic-scrap');
	mythicHighlight.btnColor = gameObject.mythicScrap <= 0 ? '#C0C0C0' : 'lightslategrey';
	mythicHighlight.txtColor = 'white';
	const exoticHighlight = Game.methodObjects.find(x => x.id === 'sell-exotic-scrap');
	exoticHighlight.btnColor = gameObject.exoticScrap <= 0 ? '#C0C0C0' : 'lightslategrey';
	exoticHighlight.txtColor = 'white';
}

function clearSellScrapScreen() {
	const scrapCount = Game.methodObjects.filter(x => x.id === 'scrap-count');
	const scrapPrice = Game.methodObjects.filter(x => x.id === 'scrap-price');
	const sellScrapBtn = Game.methodObjects.filter(x => x.id === 'sell-scrap-btn');
	const sellScrapTitle = Game.methodObjects.filter(x => x.id === 'sell-scrap-title');
	const scrapPriceTitle = Game.methodObjects.filter(x => x.id === 'total-scrap-price-title');
	const fundsTitle = Game.methodObjects.filter(x => x.id === 'total-funds-title');
	const scrapCountTitle = Game.methodObjects.filter(x => x.id === 'total-scrap-count-title');
	const fundsHigh = Game.methodObjects.filter(x => x.id === 'player-funds-high');
	const fundsLow = Game.methodObjects.filter(x => x.id === 'player-funds-low');
	if (scrapCount.length > 0) {
		scrapCount.forEach((item, i) => {
			Game.deleteEntity(item.methodId);
		});
	}
	if (scrapPrice.length > 0) {
		scrapPrice.forEach((item, i) => {
			Game.deleteEntity(item.methodId);
		});
	}
	if (sellScrapBtn.length > 0) {
		sellScrapBtn.forEach((item, i) => {
			Game.deleteEntity(item.methodId);
		});
	}
	if (sellScrapTitle.length > 0) {
		sellScrapTitle.forEach((item, i) => {
			Game.deleteEntity(item.methodId);
		});
	}
	if (scrapPriceTitle.length > 0) {
		scrapPriceTitle.forEach((item, i) => {
			Game.deleteEntity(item.methodId);
		});
	}
	if (fundsTitle.length > 0) {
		fundsTitle.forEach((item, i) => {
			Game.deleteEntity(item.methodId);
		});
	}
	if (scrapCountTitle.length > 0) {
		scrapCountTitle.forEach((item, i) => {
			Game.deleteEntity(item.methodId);
		});
	}
	if (fundsHigh.length > 0) {
		fundsHigh.forEach((item, i) => {
			Game.deleteEntity(item.methodId);
		});
	}
	if (fundsLow.length > 0) {
		fundsLow.forEach((item, i) => {
			Game.deleteEntity(item.methodId);
		});
	}
}

function refreshSellScrapBackgrounds() {
	if (Game.methodObjects.find(x => x.id === 'sell-scrap-main-background')) {
		Game.methodObjects.find(x => x.id === 'sell-scrap-main-background').isAnim = true;
	}
	if (Game.methodObjects.find(x => x.id === 'scrap-types-background')) {
		Game.methodObjects.find(x => x.id === 'scrap-types-background').isAnim = true;
	}
	if (Game.methodObjects.find(x => x.id === 'scrap-sell-background')) {
		Game.methodObjects.find(x => x.id === 'scrap-sell-background').isAnim = true;
	}
	if (Game.methodObjects.find(x => x.id === 'scrap-count-background')) {
		Game.methodObjects.find(x => x.id === 'scrap-count-background').isAnim = true;
	}
}
