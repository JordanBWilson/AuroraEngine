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

const maulPage = {
	description: 'The multiplayer game',
	loadPage: function() {
		gameObject.selectedRobot = [];
		Game.clearStage();
		// future Jordan, work on double tapping towers.
		// one to build/display range and health under and one more tap to bring up a menu to upgrade or switch tower
		// --finish up positioning the blue robots spawn positions and set up red spawn position.
		// --make the robots move
		let gameCanvasWidth = JSON.parse(JSON.stringify(Game.canvas.width));
		let gameCanvasHeight = JSON.parse(JSON.stringify(Game.canvas.height));
		let prevCanvasWidth = JSON.parse(JSON.stringify(Game.canvas.width));
		let prevCanvasHeight = JSON.parse(JSON.stringify(Game.canvas.height));
		const roadImg = new Image();
		const roadPath = './assets/images/brick.png';
		roadImg.src = roadPath;
		Particle.init();
		setupGame();
		Game.pageResized = {
			section: 'arena-game',
			method: function() {
				if (gameObject.selectedRobotDesign !== -1) {
					selectArenaRobot(gameObject.selectedRobotDesign);
				}
				let posX = 0;
				let posY = 0;
				// resize blue's robots
				gameObject.arenaBlueAttackers.forEach((br, i) => {
					gameCanvasWidth = JSON.parse(JSON.stringify(prevCanvasWidth));
					gameCanvasHeight = JSON.parse(JSON.stringify(prevCanvasHeight));
					let coords = resizeRobotCoords(br, posX, posY);
					posX = coords.x;
					posY = coords.y;
					gameCanvasWidth = JSON.parse(JSON.stringify(Game.canvas.width));
					gameCanvasHeight = JSON.parse(JSON.stringify(Game.canvas.height));
					resizeRobotCoords(br, posX, posY);
					posX = 0;
					posY = 0;
				});
				// resize red's robots
				gameObject.arenaRedAttackers.forEach((rr, i) => {
					gameCanvasWidth = JSON.parse(JSON.stringify(prevCanvasWidth));
					gameCanvasHeight = JSON.parse(JSON.stringify(prevCanvasHeight));
					let coords = resizeRobotCoords(rr, posX, posY);
					posX = coords.x;
					posY = coords.y;
					gameCanvasWidth = JSON.parse(JSON.stringify(Game.canvas.width));
					gameCanvasHeight = JSON.parse(JSON.stringify(Game.canvas.height));
					resizeRobotCoords(rr, posX, posY);
					posX = 0;
					posY = 0;
				});
				prevCanvasWidth = JSON.parse(JSON.stringify(Game.canvas.width));
				prevCanvasHeight = JSON.parse(JSON.stringify(Game.canvas.height));
			}
		}
		function resizeRobots(robot, posX, posY) {
			
			// this offset is good for robots comming from the right.
			// this will also need to work for robots coming from the left
			//let posXOffset = gameCanvasHeight * 0.001;
			//posXOffset = posXOffset / 100;
			//console.log(gameCanvasWidth, prevCanvasWidth);
			//if (gameCanvasWidth < prevCanvasWidth) {
				//posX = posX - (posXOffset);
			//} else if (gameCanvasWidth > prevCanvasWidth) {
				//// posX = posX + (posXOffset);
			//}
			// 
			// console.log(posXOffset);
			robot.posX = Game.placeEntityX(posX); // (posXOffset * -1)
			robot.posY = Game.placeEntityY(posY);
			robot.width = (Game.entitySize * 1.5);
			robot.height = (Game.entitySize * 1.5);
		}
		function resizeRobotCoords(robot, posX, posY) {
			// future Jordan look into the proper offset here on resizeRobots() above
			// let posXOffset = gameCanvasHeight * 0.45;
			// posXOffset = posXOffset / 100;
			
			//let posXOffsetRaw = gameCanvasHeight * 0.001;
			//let posXOffset = posXOffsetRaw / 100;
			
			if (gameCanvasWidth > robot.posX) {
				// console.log(posXOffset, posX, posY);
				//if (gameCanvasWidth < prevCanvasWidth) {
					////posX = (robot.posX / gameCanvasWidth) - (posXOffset);
					//robot.posX = robot.posX - posXOffsetRaw;
					//console.log('here');
				//} else if (gameCanvasWidth > prevCanvasWidth) {
					//robot.posX = robot.posX + posXOffsetRaw;
					//console.log('there');
					////posX = (robot.posX / gameCanvasWidth) + (posXOffset);
				//} else {
					//// console.log('else');
					////posX = (robot.posX / gameCanvasWidth) - (posXOffset);
				//}
				posX = (robot.posX / gameCanvasWidth); // - (posXOffset); // - posXOffset;
			}
			//else if (gameCanvasWidth < robot.posX) { // may not need this method. Only fires when a robot is all the way right
				//console.log('here');
				//posX = (gameCanvasWidth / robot.posX); // - posXOffset; //  + (posXOffset)
			//}
			if (gameCanvasHeight > robot.posY) {
				posY = robot.posY / gameCanvasHeight;
			}
			else if (gameCanvasHeight < robot.posY) {
				posY = gameCanvasHeight / robot.posY;
			}
			// console.log(posX, posY);
			resizeRobots(robot, posX, posY);
			const coords = { x: posX, y: posY };
			return coords;
		}
		function setupGame() {
			drawGrassBackGround();
			drawRobotSelection();
			drawBlueRoads();
			drawRedRoads();
			drawBasesAndSends();
			drawBlueTowerSpawns();
			drawRedTowerSpawns();
			// drawBlueRobotRoadNavigation();
			drawPlayerMoney();
			drawRoundTime();
			readySetGoGame();
			Game.methodSetup = { method: function(id) { moveBlueRobots(); }};
			Game.addMethod(Game.methodSetup);
			// future Jordan, just to note, if we go with the 'guard rails' approach, to keep the robots in 
			// place we will also need a hard pixel stop to make sure robots cant stray off too far,
			// kind of like how it is now. It's not perfect but it's close enough if a player resizes the
			// screen at a 'bad time'.
			Game.collisionSetup = {
				primary: 'arena-blue-att-robot-right-' + gameObject.arenaBlueSendCount,
				target: 'red-right-base-road-2', // red-right-base-road-2 // blue-stop-1
				method: function(id) {
					// future Jordan, make a method that sets up all the collisions.
					// make a method for the split shenanigans as well when we're done here
					// for red and blues guide rails. position the rails in the ideal place
					const split = this.primary.split('-');
					const sendCountId = +split[split.length-1]++;
					let collisionId = '';
					for (let i = 0; i < split.length; i++) {
						// console.log(i, split[i]);
						if (i < (split.length -1)) {
							collisionId += (split[i] + '-');
						} else {
							collisionId += split[i];
						}
					}
					console.log(collisionId);
					// use the collisionId to find what object was hit
				},
				methodId: undefined,
			}
			Game.addCollision(Game.collisionSetup);
			console.log(Main.collisions);
		}
		
		function drawGrassBackGround() {
			const grassImg = new Image();
			const grassPath = './assets/images/grass.png';
			grassImg.src = grassPath;
			
			Game.methodSetup = {
				method: function(id) {
					drawRect({
						posX: Game.placeEntityX(0),
						posY: Game.placeEntityY(0),
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
						posY: Game.placeEntityY(0),
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
		function selectArenaRobot(index) {
			if (gameObject.arenaGameStarted && gameObject.robotArenaDesigns[index].robotParts.length === 6) {
				const allBackgrounds = Game.methodObjects.filter(bg => bg.id.includes('arena-robot-details-btn-'));
				allBackgrounds.forEach(bg => {
					bg.color = 'darkgrey';	
				});
				const selectRobotBG = Game.methodObjects.find(bg => bg.id === 'arena-robot-details-btn-' + index);
				selectRobotBG.color = 'yellow';
				gameObject.selectedRobot = gameObject.robotArenaDesigns[index].robotParts;
				gameObject.selectedRobotDesign = index;
			}
		}
		function drawRobotSelection() {
			Game.methodSetup = {
				method: function(id) {
					drawRect({
						posX: Game.placeEntityX(0),
						posY: Game.placeEntityY(0.90),
						width: Game.canvas.width,
						height: (Game.canvas.height * 0.10),
						lineWidth: 1,
						color: 'brown',
						isFilled: true,
						id: 'robot-bar-background',
						isBackground: true,
						props: {},
						methodId: id
					});
				}
			};
			Game.addMethod(Game.methodSetup);
			let robotCount = 0;
			let robotSelectRow = 1;
			for (let i = 0; i < gameObject.robotArenaDesignCount; i++) {
				robotCount++;
				let posY = 0
				let posYoffset = 0;
				let posX = 0;
				let posXoffset = 0;
				if (robotSelectRow === 1) {
					posY = 0.84;
					posYoffset = -11;
				}
				if (robotCount === 1) {
					posX = 0.11;
					posXoffset = -0.01;
				}
				if (robotCount === 2) {
					posX = 0.43;
					posXoffset = 1.99;
				}
				if (robotCount === 3) {
					posX = 0.739;
					posXoffset = 1;
				}	
					
				Game.methodSetup = {
					method: function(id) {
						drawRect({
							posX: Game.placeEntityX(posX, (Game.entitySize * posXoffset)),
							posY: Game.placeEntityY(posY, (Game.entitySize * posYoffset)),
							width: (Game.canvas.width * 0.15),
							height: (Game.entitySize * 10),
							lineWidth: 1,
							color: 'darkgrey',
							isBackground: false,
							isFilled: true,
							id: 'arena-robot-details-btn-' + i,
							props: {},
							methodId: id
						});
					}
				};
				Game.addMethod(Game.methodSetup);
				Game.methodSetup = {
					method: function(id) {
						drawButton({
							posX: Game.placeEntityX(posX + (0.07), (Game.entitySize * (posXoffset + 2))),
							posY: Game.placeEntityY(posY + (0.033), (Game.entitySize * posYoffset)),
							width: (Game.entitySize * 3),
							height: (Game.entitySize * 3),
							lineWidth: 1,
							btnColor: drawRobotSelectPreviewParts('chassis', gameObject.robotArenaDesigns[i].robotParts),
							txtColor: 'white',
							font: '1.5em serif',
							msg: '',
							isFilled: true,
							id: 'arena-robot-' + i,
							action: {
								method: function(id) {
									selectArenaRobot(i);
								}
							},
							isModalBtn: false,
							props: {
								drawHead: function(parent) {
									Game.methodSetup = {
										method: function(id) {
											drawButton({
												posX: parent.posX + (Game.entitySize * 0.3),
												posY: parent.posY - (Game.entitySize * 2.5),
												width: (Game.entitySize * 2.5),
												height: (Game.entitySize * 2.5),
												lineWidth: 1,
												btnColor: drawRobotSelectPreviewParts('head', gameObject.robotArenaDesigns[i].robotParts),
												txtColor: 'white',
												font: '1.5em serif',
												msg: '',
												isFilled: true,
												id: parent.id,
												action: {
													method: function(id) {
														selectArenaRobot(i);
													}
												},
												isModalBtn: false,
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
											drawButton({
												posX: parent.posX - (Game.entitySize * 0.75),
												posY: parent.posY,
												width: (Game.entitySize * 0.75),
												height: (Game.entitySize * 3),
												lineWidth: 1,
												btnColor: drawRobotSelectPreviewParts('left-arm', gameObject.robotArenaDesigns[i].robotParts),
												txtColor: 'white',
												font: '1.5em serif',
												msg: '',
												isFilled: true,
												id: parent.id,
												action: {
													method: function(id) {
														selectArenaRobot(i);
													}
												},
												isModalBtn: false,
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
											drawButton({
												posX: parent.posX + (Game.entitySize * 3),
												posY: parent.posY,
												width: (Game.entitySize * 0.75),
												height: (Game.entitySize * 3),
												lineWidth: 1,
												btnColor: drawRobotSelectPreviewParts('right-arm', gameObject.robotArenaDesigns[i].robotParts),
												txtColor: 'white',
												font: '1.5em serif',
												msg: '',
												isFilled: true,
												id: parent.id,
												action: {
													method: function(id) {
														selectArenaRobot(i);
													}
												},
												isModalBtn: false,
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
											drawButton({
												posX: parent.posX + (Game.entitySize * 0.25),
												posY: parent.posY + (Game.entitySize * 3),
												width: (Game.entitySize * 0.75),
												height: (Game.entitySize * 3),
												lineWidth: 1,
												btnColor: drawRobotSelectPreviewParts('left-leg', gameObject.robotArenaDesigns[i].robotParts),
												txtColor: 'white',
												font: '1.5em serif',
												msg: '',
												isFilled: true,
												id: parent.id,
												action: {
													method: function(id) {
														selectArenaRobot(i);
													}
												},
												isModalBtn: false,
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
											drawButton({
												posX: parent.posX + (Game.entitySize * 2.15),
												posY: parent.posY + (Game.entitySize * 3),
												width: (Game.entitySize * 0.75),
												height: (Game.entitySize * 3),
												lineWidth: 1,
												btnColor: drawRobotSelectPreviewParts('right-leg', gameObject.robotArenaDesigns[i].robotParts),
												txtColor: 'white',
												font: '1.5em serif',
												msg: '',
												isFilled: true,
												id: parent.id,
												action: {
													method: function(id) {
														selectArenaRobot(i);
													}
												},
												isModalBtn: false,
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
				drawRobotSelectParts('arena-robot-' + i);
			}
		}
		function drawBasesAndSends() {
			Game.methodSetup = {
				method: function(id) {
					drawRect({
						posX: Game.placeEntityX(0.49, (Game.entitySize * 9)),
						posY: Game.placeEntityY(0.78),
						width: (Game.entitySize * 10),
						height: (Game.entitySize * 10),
						lineWidth: 1,
						color: 'darkblue',
						isFilled: true,
						id: 'blue-base',
						isBackground: false,
						props: {
							hp: 20
						},
						methodId: id
					});
				}
			};
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				method: function(id) {
					drawRect({
						posX: Game.placeEntityX(0.49, (Game.entitySize * 9)),
						posY: Game.placeEntityY(0.03),
						width: (Game.entitySize * 10),
						height: (Game.entitySize * 10),
						lineWidth: 1,
						color: 'darkred',
						isFilled: true,
						id: 'red-base',
						isBackground: false,
						props: {
							hp: 20
						},
						methodId: id
					});
				}
			};
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				method: function(id) {
					drawButton({
						posX: Game.placeEntityX(0.19, (Game.entitySize * 9)),
						posY: Game.placeEntityY(0.78),
						width: (Game.entitySize * 10),
						height: (Game.entitySize * 10),
						lineWidth: 1,
						btnColor: 'grey',
						txtColor: 'white',
						font: '1em serif',
						msg: 'Send',
						isFilled: true,
						id: 'send-robots-left',
						action: { 
							method: function(id) {
								if (gameObject.arenaGameStarted && gameObject.selectedRobot.length === 6 && gameObject.arenaBlueGameMoney >= 10) {
									gameObject.arenaBlueGameMoney -= 10;
									const moneyBackground = Game.methodObjects.find(bg => bg.id === 'money-bar-background');
									const moneyCounter = Game.methodObjects.find(bg => bg.id === 'player-money-amount-title');
									if (moneyCounter) {
										moneyCounter.msg = '$' + gameObject.arenaBlueGameMoney;
										moneyBackground.isAnim = true;
									}
									const blueRobot = {
										posX: Game.placeEntityX(-0.018),
										posY: Game.placeEntityY(0.265), // reds bots start position- posY: Game.placeEntityY(0.615),
										width: (Game.entitySize * 1.5),
										height: (Game.entitySize * 1.5),
										id: 'arena-blue-att-robot-left-' + gameObject.arenaBlueSendCount,
										hp: 10,
										robotParts: gameObject.selectedRobot,
										direction: 'lt',
										stop: 0,
									}
									sendBlueRobot(blueRobot);
								}
							}
						},
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
						posX: Game.placeEntityX(0.81, (Game.entitySize * 9)),
						posY: Game.placeEntityY(0.78),
						width: (Game.entitySize * 10),
						height: (Game.entitySize * 10),
						lineWidth: 1,
						btnColor: 'grey',
						txtColor: 'white',
						font: '1em serif',
						msg: 'Send',
						isFilled: true,
						id: 'send-robots-right',
						action: { 
							method: function(id) {
								if (gameObject.arenaGameStarted && gameObject.selectedRobot.length === 6 && gameObject.arenaBlueGameMoney >= 10) {
									gameObject.arenaBlueGameMoney -= 10;
									const moneyBackground = Game.methodObjects.find(bg => bg.id === 'money-bar-background');
									const moneyCounter = Game.methodObjects.find(bg => bg.id === 'player-money-amount-title');
									if (moneyCounter) {
										moneyCounter.msg = '$' + gameObject.arenaBlueGameMoney;
										moneyBackground.isAnim = true;
									}
									const blueRobot = {
										// future Jordan, fix this once we find the proper offset
										posX: Game.placeEntityX(1), // 0.999 // 0.903 <- stop there for pos 1
										posY: Game.placeEntityY(0.265), // reds bots start position- posY: Game.placeEntityY(0.615),
										width: (Game.entitySize * 1.5),
										height: (Game.entitySize * 1.5),
										id: 'arena-blue-att-robot-right-' + gameObject.arenaBlueSendCount,
										hp: 10,
										robotParts: gameObject.selectedRobot,
										direction: 'rt',
										stop: 0,
									}
									sendBlueRobot(blueRobot);
									Game.collisionSetup = {
										primary: 'arena-blue-att-robot-right-' + gameObject.arenaBlueSendCount,
										target: 'red-right-base-road-2', // red-right-base-road-2 // blue-stop-1
										method: function(id) {
											const split = this.primary.split('-');
											+split[split.length-1]++;
											let collisionId = '';
											for (let i = 0; i < split.length; i++) {
												if (i < (split.length -1)) {
													collisionId += (split[i] + '-');
												} else {
													collisionId += split[i];
												}
												
											}
											console.log(collisionId);
										},
										methodId: undefined,
									}
									Game.addCollision(Game.collisionSetup);
									
								}
							}
						},
						isModalBtn: false,
						props: {},
						methodId: id
					});
				}
			};
			Game.addMethod(Game.methodSetup);
		}
		function sendBlueRobot(blueRobot) {
			Game.methodSetup = {
				method: function(id) {
					drawRect({
						posX: blueRobot.posX,
						posY: blueRobot.posY,
						width: blueRobot.width,
						height: blueRobot.height,
						lineWidth: 1,
						color: drawRobotSelectPreviewParts('chassis', blueRobot?.robotParts),
						isFilled: true,
						isBackground: false,
						id: blueRobot.id,
						props: {
							drawHead: function(parent) {
								Game.methodSetup = {
									method: function(id) {
										drawRect({
											posX: parent.posX + (Game.entitySize * 0.15),
											posY: parent.posY - (Game.entitySize * 1.25),
											width: (Game.entitySize * 1.25),
											height: (Game.entitySize * 1.25),
											lineWidth: 1,
											color: drawRobotSelectPreviewParts('head', blueRobot?.robotParts),
											isFilled: true,
											isBackground: false,
											id: parent.id,
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
											posX: parent.posX - (Game.entitySize * 0.375),
											posY: parent.posY,
											width: (Game.entitySize * 0.375),
											height: (Game.entitySize * 1.5),
											lineWidth: 1,
											color: drawRobotSelectPreviewParts('left-arm', blueRobot?.robotParts),
											isFilled: true,
											isBackground: false,
											id: parent.id,
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
											posX: parent.posX + (Game.entitySize * 1.5),
											posY: parent.posY,
											width: (Game.entitySize * 0.375),
											height: (Game.entitySize * 1.5),
											lineWidth: 1,
											color: drawRobotSelectPreviewParts('right-arm', blueRobot?.robotParts),
											isFilled: true,
											isBackground: false,
											id: parent.id,
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
											posX: parent.posX + (Game.entitySize * 0.125),
											posY: parent.posY + (Game.entitySize * 1.5),
											width: (Game.entitySize * 0.375),
											height: (Game.entitySize * 1.5),
											lineWidth: 1,
											color: drawRobotSelectPreviewParts('left-leg', blueRobot?.robotParts),
											isFilled: true,
											isBackground: false,
											id: parent.id,
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
											posX: parent.posX + (Game.entitySize * 1.075),
											posY: parent.posY + (Game.entitySize * 1.5),
											width: (Game.entitySize * 0.375),
											height: (Game.entitySize * 1.5),
											lineWidth: 1,
											color: drawRobotSelectPreviewParts('right-leg', blueRobot?.robotParts),
											isFilled: true,
											isBackground: false,
											id: parent.id,
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
			drawRobotSelectParts(blueRobot.id);
			gameObject.arenaBlueAttackers.push(blueRobot);
			gameObject.arenaBlueSendCount++;
		}
		function drawBlueRoads() {
			Game.methodSetup = {
				method: function(id) {
					drawImage({
			 			posX: Game.placeEntityX(0.10, (Game.entitySize * 4.3)),
			 			posY: Game.placeEntityY(0.46),
			 			width: (Game.canvas.width * 0.50),
			 			height: (Game.entitySize * 7),
			 			images: [roadImg],
			 			selectedImage: 0,
			 			animTicks: 0,
			 			ticks: 0,
			 			id: 'blue-left-base-road-1',
			 			isBackground: false,
			 			props: {
			 				
			 			},
			 			methodId: id
			 		});
			 	}
			};
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				method: function(id) {
					drawImage({
			 			posX: Game.placeEntityX(0.48, (Game.entitySize * 5.5)),
			 			posY: Game.placeEntityY(0.46),
			 			width: (Game.canvas.width * 0.50),
			 			height: (Game.entitySize * 7),
			 			images: [roadImg],
			 			selectedImage: 0,
			 			animTicks: 0,
			 			ticks: 0,
			 			id: 'blue-right-base-road-1',
			 			isBackground: false,
			 			props: {
			 				
			 			},
			 			methodId: id
			 		});
			 	}
			};
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				method: function(id) {
					drawImage({
			 			posX: Game.placeEntityX(0.93, (Game.entitySize * 5.5)),
			 			posY: Game.placeEntityY(0.59),
			 			width: (Game.entitySize * 20),
			 			height: (Game.entitySize * 7),
			 			images: [roadImg],
			 			selectedImage: 0,
			 			animTicks: 0,
			 			ticks: 0,
			 			id: 'blue-right-road-spawn',
			 			isBackground: false,
			 			props: {
			 				
			 			},
			 			methodId: id
			 		});
			 	}
			};
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				method: function(id) {
					drawImage({
			 			posX: Game.placeEntityX(0.05, (Game.entitySize * 24)),
			 			posY: Game.placeEntityY(0.59),
			 			width: (Game.entitySize * 20),
			 			height: (Game.entitySize * 7),
			 			images: [roadImg],
			 			selectedImage: 0,
			 			animTicks: 0,
			 			ticks: 0,
			 			id: 'blue-left-road-spawn',
			 			isBackground: false,
			 			props: {
			 				
			 			},
			 			methodId: id
			 		});
			 	}
			};
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				method: function(id) {
					drawImage({
			 			posX: Game.placeEntityX(0.95, (Game.entitySize * 15)),
			 			posY: Game.placeEntityY(0.46),
			 			width: (Game.entitySize * 7),
			 			height: (Game.entitySize * 20),
			 			images: [roadImg],
			 			selectedImage: 0,
			 			animTicks: 0,
			 			ticks: 0,
			 			id: 'blue-right-base-road-2',
			 			isBackground: false,
			 			props: {
			 				
			 			},
			 			methodId: id
			 		});
			 	}
			};
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				method: function(id) {
					drawImage({
			 			posX: Game.placeEntityX(0.09, (Game.entitySize * 3)),
			 			posY: Game.placeEntityY(0.46),
			 			width: (Game.entitySize * 7),
			 			height: (Game.entitySize * 20),
			 			images: [roadImg],
			 			selectedImage: 0,
			 			animTicks: 0,
			 			ticks: 0,
			 			id: 'blue-left-base-road-2',
			 			isBackground: false,
			 			props: {
			 				
			 			},
			 			methodId: id
			 		});
			 	}
			};
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				method: function(id) {
					drawImage({
			 			posX: Game.placeEntityX(0.49, (Game.entitySize * 5.5)),
			 			posY: Game.placeEntityY(0.46),
			 			width: (Game.entitySize * 7),
			 			height: (Game.entitySize * 33),
			 			images: [roadImg],
			 			selectedImage: 0,
			 			animTicks: 0,
			 			ticks: 0,
			 			id: 'blue-base-road',
			 			isBackground: false,
			 			props: {
			 				
			 			},
			 			methodId: id
			 		});
			 	}
			};
			Game.addMethod(Game.methodSetup);
		}
		
		function drawRedRoads() {
			Game.methodSetup = {
				method: function(id) {
					drawImage({
			 			posX: Game.placeEntityX(0.10, (Game.entitySize * 4.3)),
			 			posY: Game.placeEntityY(0.37),
			 			width: (Game.canvas.width * 0.50),
			 			height: (Game.entitySize * 7),
			 			images: [roadImg],
			 			selectedImage: 0,
			 			animTicks: 0,
			 			ticks: 0,
			 			id: 'red-left-base-road-1',
			 			isBackground: false,
			 			props: {
			 				
			 			},
			 			methodId: id
			 		});
			 	}
			};
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				method: function(id) {
					drawImage({
			 			posX: Game.placeEntityX(0.48, (Game.entitySize * 5.5)),
			 			posY: Game.placeEntityY(0.37),
			 			width: (Game.canvas.width * 0.50),
			 			height: (Game.entitySize * 7),
			 			images: [roadImg],
			 			selectedImage: 0,
			 			animTicks: 0,
			 			ticks: 0,
			 			id: 'red-right-base-road-1',
			 			isBackground: false,
			 			props: {
			 				
			 			},
			 			methodId: id
			 		});
			 	}
			};
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				method: function(id) {
					drawImage({
			 			posX: Game.placeEntityX(0.93, (Game.entitySize * 5.5)),
			 			posY: Game.placeEntityY(0.24),
			 			width: (Game.entitySize * 20),
			 			height: (Game.entitySize * 7),
			 			images: [roadImg],
			 			selectedImage: 0,
			 			animTicks: 0,
			 			ticks: 0,
			 			id: 'red-right-road-spawn',
			 			isBackground: false,
			 			props: {
			 				
			 			},
			 			methodId: id
			 		});
			 	}
			};
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				method: function(id) {
					drawImage({
			 			posX: Game.placeEntityX(0.05, (Game.entitySize * 24)),
			 			posY: Game.placeEntityY(0.24),
			 			width: (Game.entitySize * 20),
			 			height: (Game.entitySize * 7),
			 			images: [roadImg],
			 			selectedImage: 0,
			 			animTicks: 0,
			 			ticks: 0,
			 			id: 'red-left-road-spawn',
			 			isBackground: false,
			 			props: {
			 				
			 			},
			 			methodId: id
			 		});
			 	}
			};
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				method: function(id) {
					drawImage({
			 			posX: Game.placeEntityX(0.95, (Game.entitySize * 15)),
			 			posY: Game.placeEntityY(0.24),
			 			width: (Game.entitySize * 7),
			 			height: (Game.entitySize * 20),
			 			images: [roadImg],
			 			selectedImage: 0,
			 			animTicks: 0,
			 			ticks: 0,
			 			id: 'red-right-base-road-2',
			 			isBackground: false,
			 			props: {
			 				
			 			},
			 			methodId: id
			 		});
			 	}
			};
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				method: function(id) {
					drawImage({
			 			posX: Game.placeEntityX(0.09, (Game.entitySize * 3)),
			 			posY: Game.placeEntityY(0.24),
			 			width: (Game.entitySize * 7),
			 			height: (Game.entitySize * 20),
			 			images: [roadImg],
			 			selectedImage: 0,
			 			animTicks: 0,
			 			ticks: 0,
			 			id: 'red-left-base-road-2',
			 			isBackground: false,
			 			props: {
			 				
			 			},
			 			methodId: id
			 		});
			 	}
			};
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				method: function(id) {
					drawImage({
			 			posX: Game.placeEntityX(0.49, (Game.entitySize * 5.5)),
			 			posY: Game.placeEntityY(0.113),
			 			width: (Game.entitySize * 7),
			 			height: (Game.entitySize * 33),
			 			images: [roadImg],
			 			selectedImage: 0,
			 			animTicks: 0,
			 			ticks: 0,
			 			id: 'red-base-road',
			 			isBackground: false,
			 			props: {
			 				
			 			},
			 			methodId: id
			 		});
			 	}
			};
			Game.addMethod(Game.methodSetup);
		}
		function drawBlueTowerSpawns() {
			Game.methodSetup = {
				method: function(id) {
					drawButton({
						posX: Game.placeEntityX(0.11, (Game.entitySize * 9)),
						posY: Game.placeEntityY(0.66),
						width: (Game.entitySize * 6),
						height: (Game.entitySize * 6),
						lineWidth: 1,
						btnColor: 'orange',
						txtColor: 'white',
						font: '0.8em serif',
						msg: 'Tower',
						isFilled: true,
						id: 'blue-left-tower-spawn-1',
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
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				method: function(id) {
					drawButton({
						posX: Game.placeEntityX(0.195, (Game.entitySize * 1)),
						posY: Game.placeEntityY(0.53),
						width: (Game.entitySize * 6),
						height: (Game.entitySize * 6),
						lineWidth: 1,
						btnColor: 'orange',
						txtColor: 'white',
						font: '0.8em serif',
						msg: 'Tower',
						isFilled: true,
						id: 'blue-left-tower-spawn-2',
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
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				method: function(id) {
					drawButton({
						posX: Game.placeEntityX(0.345, (Game.entitySize * 1)),
						posY: Game.placeEntityY(0.53),
						width: (Game.entitySize * 6),
						height: (Game.entitySize * 6),
						lineWidth: 1,
						btnColor: 'orange',
						txtColor: 'white',
						font: '0.8em serif',
						msg: 'Tower',
						isFilled: true,
						id: 'blue-left-tower-spawn-3',
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
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				method: function(id) {
					drawButton({
						posX: Game.placeEntityX(0.49, (Game.entitySize * 17.5)),
						posY: Game.placeEntityY(0.67),
						width: (Game.entitySize * 6),
						height: (Game.entitySize * 6),
						lineWidth: 1,
						btnColor: 'orange',
						txtColor: 'white',
						font: '0.8em serif',
						msg: 'Tower',
						isFilled: true,
						id: 'blue-left-tower-spawn-4',
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
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				method: function(id) {
					drawButton({
						posX: Game.placeEntityX(0.49, (Game.entitySize * -8.5)),
						posY: Game.placeEntityY(0.67),
						width: (Game.entitySize * 6),
						height: (Game.entitySize * 6),
						lineWidth: 1,
						btnColor: 'orange',
						txtColor: 'white',
						font: '0.8em serif',
						msg: 'Tower',
						isFilled: true,
						id: 'blue-right-tower-spawn-5',
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
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				method: function(id) {
					drawButton({
						posX: Game.placeEntityX(0.65, (Game.entitySize * 9.5)),
						posY: Game.placeEntityY(0.53),
						width: (Game.entitySize * 6),
						height: (Game.entitySize * 6),
						lineWidth: 1,
						btnColor: 'orange',
						txtColor: 'white',
						font: '0.8em serif',
						msg: 'Tower',
						isFilled: true,
						id: 'blue-right-tower-spawn-6',
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
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				method: function(id) {
					drawButton({
						posX: Game.placeEntityX(0.85, (Game.entitySize * 15.5)),
						posY: Game.placeEntityY(0.53),
						width: (Game.entitySize * 6),
						height: (Game.entitySize * 6),
						lineWidth: 1,
						btnColor: 'orange',
						txtColor: 'white',
						font: '0.8em serif',
						msg: 'Tower',
						isFilled: true,
						id: 'blue-right-tower-spawn-7',
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
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				method: function(id) {
					drawButton({
						posX: Game.placeEntityX(0.94, (Game.entitySize * 9.6)),
						posY: Game.placeEntityY(0.66),
						width: (Game.entitySize * 6),
						height: (Game.entitySize * 6),
						lineWidth: 1,
						btnColor: 'orange',
						txtColor: 'white',
						font: '0.8em serif',
						msg: 'Tower',
						isFilled: true,
						id: 'blue-right-tower-spawn-8',
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
			Game.addMethod(Game.methodSetup);
		}
		function drawRedTowerSpawns() {
			Game.methodSetup = {
				method: function(id) {
					drawRect({
						posX: Game.placeEntityX(0.11, (Game.entitySize * 9)),
						posY: Game.placeEntityY(0.18),
						width: (Game.entitySize * 6),
						height: (Game.entitySize * 6),
						lineWidth: 1,
						color: 'darkorange',
						isFilled: true,
						id: 'red-left-tower-spawn-1',
						isBackground: false,
						props: {},
						methodId: id
					});
				}
			};
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				method: function(id) {
					drawRect({
						posX: Game.placeEntityX(0.195, (Game.entitySize * 1)),
						posY: Game.placeEntityY(0.311),
						width: (Game.entitySize * 6),
						height: (Game.entitySize * 6),
						lineWidth: 1,
						color: 'darkorange',
						isFilled: true,
						id: 'red-left-tower-spawn-2',
						isBackground: false,
						props: {},
						methodId: id
					});
				}
			};
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				method: function(id) {
					drawRect({
						posX: Game.placeEntityX(0.345, (Game.entitySize * 1)),
						posY: Game.placeEntityY(0.311),
						width: (Game.entitySize * 6),
						height: (Game.entitySize * 6),
						lineWidth: 1,
						color: 'darkorange',
						isFilled: true,
						id: 'red-left-tower-spawn-3',
						isBackground: false,
						props: {},
						methodId: id
					});
				}
			};
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				method: function(id) {
					drawRect({
						posX: Game.placeEntityX(0.49, (Game.entitySize * 17.5)),
						posY: Game.placeEntityY(0.18),
						width: (Game.entitySize * 6),
						height: (Game.entitySize * 6),
						lineWidth: 1,
						color: 'darkorange',
						isFilled: true,
						id: 'red-left-tower-spawn-4',
						isBackground: false,
						props: {},
						methodId: id
					});
				}
			};
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				method: function(id) {
					drawRect({
						posX: Game.placeEntityX(0.49, (Game.entitySize * -8.5)),
						posY: Game.placeEntityY(0.18),
						width: (Game.entitySize * 6),
						height: (Game.entitySize * 6),
						lineWidth: 1,
						color: 'darkorange',
						isFilled: true,
						id: 'red-right-tower-spawn-5',
						isBackground: false,
						props: {},
						methodId: id
					});
				}
			};
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				method: function(id) {
					drawRect({
						posX: Game.placeEntityX(0.65, (Game.entitySize * 9.5)),
						posY: Game.placeEntityY(0.311),
						width: (Game.entitySize * 6),
						height: (Game.entitySize * 6),
						lineWidth: 1,
						color: 'darkorange',
						isFilled: true,
						id: 'red-right-tower-spawn-6',
						isBackground: false,
						props: {},
						methodId: id
					});
				}
			};
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				method: function(id) {
					drawRect({
						posX: Game.placeEntityX(0.85, (Game.entitySize * 15.5)),
						posY: Game.placeEntityY(0.311),
						width: (Game.entitySize * 6),
						height: (Game.entitySize * 6),
						lineWidth: 1,
						color: 'darkorange',
						isFilled: true,
						id: 'red-right-tower-spawn-7',
						isBackground: false,
						props: {},
						methodId: id
					});
				}
			};
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				method: function(id) {
					drawRect({
						posX: Game.placeEntityX(0.94, (Game.entitySize * 9.6)),
						posY: Game.placeEntityY(0.18),
						width: (Game.entitySize * 6),
						height: (Game.entitySize * 6),
						lineWidth: 1,
						color: 'darkorange',
						isFilled: true,
						id: 'red-right-tower-spawn-8',
						isBackground: false,
						props: {},
						methodId: id
					});
				}
			};
			Game.addMethod(Game.methodSetup);
		}
		function drawBlueRobotRoadNavigation() {
			Game.methodSetup = {
				method: function(id) {
					drawRect({
						posX: Game.placeEntityX(0.903, (Game.entitySize * 10.6)), // , (Game.entitySize * 9.6)
						posY: Game.placeEntityY(0.25),
						width: (Game.entitySize * 4),
						height: (Game.entitySize * 4),
						lineWidth: 1,
						color: 'blue',
						isFilled: true,
						id: 'blue-stop-1',
						isBackground: false,
						props: {},
						methodId: id
					});
				}
			};
			Game.addMethod(Game.methodSetup);
		}
		function drawPlayerMoney() {
			Game.methodSetup = {
				method: function(id) {
					drawRect({
						posX: Game.placeEntityX(0.05),
						posY: Game.placeEntityY(0),
						width: (Game.entitySize * 18),
						height: (Game.canvas.height * 0.10),
						lineWidth: 1,
						color: 'brown',
						isFilled: true,
						id: 'money-bar-background',
						isBackground: true,
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
						msg: 'Money',
						posX: Game.placeEntityX(0.08),
						posY: Game.placeEntityY(0.03),
						color: 'white',
						align: 'left',
						props: {},
						id: 'player-money-title',
						methodId: id
					});
				}
			};
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				method: function(id) {
					drawText({
						font: '1.5em serif',
						msg: '$' + gameObject.arenaBlueGameMoney,
						posX: Game.placeEntityX(0.08),
						posY: Game.placeEntityY(0.07),
						color: 'white',
						align: 'left',
						props: {},
						id: 'player-money-amount-title',
						methodId: id
					});
				}
			};
			Game.addMethod(Game.methodSetup);
		}
		function drawRoundTime() {
			Game.methodSetup = {
				method: function(id) {
					drawRect({
						posX: Game.placeEntityX(0.98, (Game.entitySize * 40.5)),
						posY: Game.placeEntityY(0),
						width: (Game.entitySize * 18),
						height: (Game.canvas.height * 0.10),
						lineWidth: 1,
						color: 'brown',
						isFilled: true,
						id: 'round-bar-background',
						isBackground: true,
						props: {},
						methodId: id
					});
				}
			};
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				method: function(id) {
					drawText({
						font: '1.5em serif',
						msg: gameObject.arenaRoundSeconds + 's',
						posX: Game.placeEntityX(0.98, (Game.entitySize * 38.5)),
						posY: Game.placeEntityY(0.04),
						color: 'white',
						align: 'left',
						props: {},
						id: 'player-round-time-title',
						methodId: id
					});
				}
			};
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				method: function(id) {
					drawText({
						font: '1em serif',
						msg: 'Turn: ' + gameObject.arenaGameRound + '/' + gameObject.arenaGameMaxRounds,
						posX: Game.placeEntityX(0.98, (Game.entitySize * 38.5)),
						posY: Game.placeEntityY(0.08),
						color: 'white',
						align: 'left',
						props: {},
						id: 'player-round-number-title',
						methodId: id
					});
				}
			};
			Game.addMethod(Game.methodSetup);
		}
		function readySetGoGame() {
			Game.methodSetup = {
				method: function(id) {
					drawRect({
						posX: Game.placeEntityX(0.50, (Game.entitySize * 40)),
						posY: Game.placeEntityY(0.50, (Game.entitySize * 30)),
						width: (Game.entitySize * 40),
						height: (Game.entitySize * 30),
						lineWidth: 1,
						color: 'lightslategrey',
						isFilled: true,
						id: 'arena-game-ready-background',
						isBackground: false,
						props: {},
						methodId: id
					});
				}
			};
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				method: function(id) {
					drawText({
						font: '2em serif',
						msg: 'Battle Stations!',
						posX: Game.placeEntityX(0.50),
						posY: Game.placeEntityY(0.52),
						color: 'white',
						align: 'center',
						props: {},
						id: 'arena-game-ready-title',
						methodId: id
					});
				}
			};
			Game.addMethod(Game.methodSetup);
			setTimeout(function() {
				const gameStartBackground = Game.methodObjects.find(bg => bg.id === 'arena-game-ready-background');
				const gameStartTitle = Game.methodObjects.find(title => title.id === 'arena-game-ready-title');
				if (gameStartTitle) {
					gameStartBackground.isAnim = true;
					gameStartTitle.msg = 'Get Ready';
				}
			}, 2000);
			setTimeout(function() {
				const gameStartBackground = Game.methodObjects.find(bg => bg.id === 'arena-game-ready-background');
				const gameStartTitle = Game.methodObjects.find(title => title.id === 'arena-game-ready-title');
				if (gameStartTitle) {
					gameStartBackground.isAnim = true;
					gameStartTitle.msg = 'Fight!';
				}
			}, 4500);
			setTimeout(function() {
				const gameStartBackground = Game.methodObjects.find(bg => bg.id === 'arena-game-ready-background');
				const gameStartTitle = Game.methodObjects.find(title => title.id === 'arena-game-ready-title');
				Game.deleteEntity(gameStartBackground.methodId);
				Game.deleteEntity(gameStartTitle.methodId);
				// start the game round timer and round numbers
				if (!gameObject.arenaGameStarted) {
					startGameRounds();
				}
			}, 5500);
			
		}
		function startGameRounds() {
			gameObject.arenaGameStarted = true;
			const roundTimer = Game.methodObjects.find(bg => bg.id === 'player-round-time-title');
			const roundBackground = Game.methodObjects.find(bg => bg.id === 'round-bar-background');
			const roundCounter = Game.methodObjects.find(bg => bg.id === 'player-round-number-title');
			const gameTimer = setInterval(function() {
				if (gameObject.arenaRoundSeconds > 0) {
					gameObject.arenaRoundSeconds--;
					roundTimer.msg = gameObject.arenaRoundSeconds + 's';
					roundCounter.msg = 'Round: ' + gameObject.arenaGameRound + '/' + gameObject.arenaGameMaxRounds;
				} else if(gameObject.arenaRoundSeconds === 0) {
					// add to the players money
					gameObject.arenaBlueGameMoney += 50;
					gameObject.arenaBlueGameMoney += (gameObject.arenaBlueSendCount * 2);
					gameObject.arenaRedGameMoney += 50;
					gameObject.arenaRedGameMoney += (gameObject.arenaBlueSendCount * 2);
					gameObject.arenaGameRound++;
					gameObject.arenaRoundSeconds = 15;
					const blueMoney = Game.methodObjects.find(bg => bg.id === 'player-money-amount-title');
					if (gameObject.arenaGameRound <= 12) {
						roundTimer.msg = gameObject.arenaRoundSeconds + 's';
						roundCounter.msg = 'Round: ' + gameObject.arenaGameRound + '/' + gameObject.arenaGameMaxRounds;
						blueMoney.msg = '$' + gameObject.arenaBlueGameMoney;
						Particle.floatingText({
							font: '2rem serif',
							msg: '+      +',
							align: 'left',
							posX: Game.placeEntityX(0.065),
							posY: Game.placeEntityY(0.07),
							direction: 'top',
							color: 'green',
							ticks: 33,
							speed: 0.1,
						});
					}
					if (gameObject.arenaGameRound === 13) {
						// future Jordan, see who won the game
						// show a modal showing the winner
						// go back to the arena page
						clearInterval(gameTimer);
						setTimeout(function() {
							gameObject.selectedRobot = [];
							gameObject.selectedRobotDesign = -1;
							gameObject.arenaGameRound = 1;
							gameObject.arenaRoundSeconds = 15;
							gameObject.arenaBlueGameMoney = 50;
							gameObject.arenaRedGameMoney = 50;
							gameObject.arenaBlueSendCount = 0;
							gameObject.arenaRedSendCount = 0;
							gameObject.arenaGameStarted = false;
							arenaPage.loadPage();
						}, 2000);
						
					}
				}
				roundBackground.isAnim = true;
			}, 1000);
		}
		function moveBlueRobots() {
			 gameObject.arenaBlueAttackers.forEach((br, i) => {
				// future Jordan, make the robots move
				if (br.direction === 'rt' && br.stop === 0) {
					const robot = Game.methodObjects.filter(bg => bg.id === br.id);
					robot.forEach((rob, j) => {
						// future Jordan base the speed on the robot's stats
						// future Jordan we are going to need some sort of 'marker' to know where each robot is.
						// when resizing the screen, using exact percents can cause the robot to jump.
						// the marker will be a place of reference for when the screen changes preventing the jumps.
						if (!Main.isResizing) {
							rob.posX -= Game.moveEntity(0.01, Game.enumDirections.leftRight);
							gameObject.arenaBlueAttackers[i].posX -= Game.moveEntity(0.01, Game.enumDirections.leftRight);
							const posXPerc = (rob.posX / gameCanvasWidth);
							// console.log(posXPerc)
							if (posXPerc <= 0.903) { // 903
								br.stop++;
								rob.posX = Game.placeEntityX(posXPerc);
								gameObject.arenaBlueAttackers[i].posX = Game.placeEntityX(posXPerc);
							}
						}
						
						
						//rob.posX = Game.placeEntityX(0.90);
						//gameObject.arenaBlueAttackers[i].posX = Game.placeEntityX(0.90);
					});
				}
			 });
			
		}
	}
}
