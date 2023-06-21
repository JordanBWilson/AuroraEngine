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
		Game.keepPreviousSize = true;
		Game.clearStage();
		// future Jordan, work on double tapping towers.
		// one to build/display range and health under and one more tap to bring up a menu to upgrade or switch tower
		// if there isn't a tower built, one tap to open the build menu
		let prevCanvasWidth = JSON.parse(JSON.stringify(Game.canvas.width));
		let prevCanvasHeight = JSON.parse(JSON.stringify(Game.canvas.height));
		const roadImg = new Image();
		const roadPath = './assets/images/brick.png';
		let aiThinking = true;
		let sendRedLeftCount = 0;
		let sendRedRightCount = 0;
		let gameTimer;
		roadImg.src = roadPath;
		Particle.init();
		setupGame();
		Game.pageResized = {
			section: 'arena-game',
			method: function() {
				if (gameObject.selectedRobotDesign !== -1) {
					selectArenaRobot(gameObject.selectedRobotDesign);
				}
			}
		}
		function setupGame() {
			generateRedArenaRobots();
			drawGrassBackGround();
			drawRobotSelection();
			drawBlueRoads();
			drawRedRoads();
			drawBasesAndSends();
			drawBlueTowerSpawns();
			drawRedTowerSpawns();
			drawBlueRobotRoadNavigation();
			drawRedRobotRoadNavigation();
			drawPlayerMoney();
			drawRoundTime();
			readySetGoGame();
			Game.methodSetup = { method: function(id) { moveBlueRobots(); }};
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = { method: function(id) { moveRedRobots(); }};
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = { 
				method: function(id) {
					if (aiThinking === true) {
						redAiMind(); 
					}
					if (aiThinking === false) {
						aiThinking = undefined;
						setTimeout(function() {
							aiThinking = true;
						}, 1500);
					}
				}
			};
			Game.addMethod(Game.methodSetup);
			gameObject.redMaxTowerLevel = Math.floor((Math.random() * 3) + 1);
		}
		function setBlueRightRoadNavCollisions() {
			Game.collisionSetup = {
				primary: 'arena-blue-att-robot-right-' + gameObject.arenaBlueSendCount,
				target: 'blue-right-stop-1',
				method: function(id) {
					const robot = Game.methodObjects.find(bg => bg.id === this.primary);
					const robotPasser = gameObject.arenaBlueAttackers.find(bg => bg.id === this.primary); 
					if (robotPasser?.stop === 0) { // moving down the road now
						robotPasser.stop++;
					}
				},
				methodId: undefined,
			}
			Game.addCollision(Game.collisionSetup);
			Game.collisionSetup = {
				primary: 'arena-blue-att-robot-right-' + gameObject.arenaBlueSendCount,
				target: 'blue-right-stop-2',
				method: function(id) {
					const robot = Game.methodObjects.find(bg => bg.id === this.primary);
					const robotPasser = gameObject.arenaBlueAttackers.find(bg => bg.id === this.primary); 
					if (robotPasser?.stop === 1) { // moving left on the road
						robotPasser.stop++;
					}
				},
				methodId: undefined,
			}
			Game.addCollision(Game.collisionSetup);
			Game.collisionSetup = {
				primary: 'arena-blue-att-robot-right-' + gameObject.arenaBlueSendCount,
				target: 'blue-stop-3',
				method: function(id) {
					const robot = Game.methodObjects.find(bg => bg.id === this.primary);
					const robotPasser = gameObject.arenaBlueAttackers.find(bg => bg.id === this.primary); 
					if (robotPasser?.stop === 2) { // moving up the road
						robotPasser.stop++;
					}
				},
				methodId: undefined,
			}
			Game.addCollision(Game.collisionSetup);
			Game.collisionSetup = {
				primary: 'arena-blue-att-robot-right-' + gameObject.arenaBlueSendCount,
				target: 'red-base',
				method: function(id) {
					const robot = Game.methodObjects.find(bg => bg.id === this.primary);
					const robotPasser = gameObject.arenaBlueAttackers.find(bg => bg.id === this.primary); 
					if (robotPasser?.stop === 3) { // attack the red base
						robotPasser.stop++;
					}
				},
				methodId: undefined,
			}
			Game.addCollision(Game.collisionSetup);
		}
		function setRedRightRoadNavCollisions() {
			Game.collisionSetup = {
				primary: 'arena-red-att-robot-right-' + gameObject.arenaRedSendCount,
				target: 'red-right-stop-1',
				method: function(id) {
					const robot = Game.methodObjects.find(bg => bg.id === this.primary);
					const robotPasser = gameObject.arenaRedAttackers.find(bg => bg.id === this.primary); 
					if (robotPasser?.stop === 0) { // moving down the road now
						robotPasser.stop++;
					}
				},
				methodId: undefined,
			}
			Game.addCollision(Game.collisionSetup);
			Game.collisionSetup = {
				primary: 'arena-red-att-robot-right-' + gameObject.arenaRedSendCount,
				target: 'red-right-stop-2',
				method: function(id) {
					const robot = Game.methodObjects.find(bg => bg.id === this.primary);
					const robotPasser = gameObject.arenaRedAttackers.find(bg => bg.id === this.primary); 
					if (robotPasser?.stop === 1) { // moving left on the road
						robotPasser.stop++;
					}
				},
				methodId: undefined,
			}
			Game.addCollision(Game.collisionSetup);
			Game.collisionSetup = {
				primary: 'arena-red-att-robot-right-' + gameObject.arenaRedSendCount,
				target: 'red-stop-3',
				method: function(id) {
					const robot = Game.methodObjects.find(bg => bg.id === this.primary);
					const robotPasser = gameObject.arenaRedAttackers.find(bg => bg.id === this.primary); 
					if (robotPasser?.stop === 2) { // moving up the road
						robotPasser.stop++;
					}
				},
				methodId: undefined,
			}
			Game.addCollision(Game.collisionSetup);
			Game.collisionSetup = {
				primary: 'arena-red-att-robot-right-' + gameObject.arenaRedSendCount,
				target: 'blue-base',
				method: function(id) {
					const robot = Game.methodObjects.find(bg => bg.id === this.primary);
					const robotPasser = gameObject.arenaRedAttackers.find(bg => bg.id === this.primary); 
					if (robotPasser?.stop === 3) { // attack the blue base
						robotPasser.stop++;
					}
				},
				methodId: undefined,
			}
			Game.addCollision(Game.collisionSetup);
		}
		function setBlueLeftRoadNavCollisions() {
			Game.collisionSetup = {
				primary: 'arena-blue-att-robot-left-' + gameObject.arenaBlueSendCount,
				target: 'blue-left-stop-1',
				method: function(id) {
					const robot = Game.methodObjects.find(bg => bg.id === this.primary);
					const robotPasser = gameObject.arenaBlueAttackers.find(bg => bg.id === this.primary); 
					if (robotPasser?.stop === 0) { // moving down the road now
						robotPasser.stop++;
					}
				},
				methodId: undefined,
			}
			Game.addCollision(Game.collisionSetup);
			Game.collisionSetup = {
				primary: 'arena-blue-att-robot-left-' + gameObject.arenaBlueSendCount,
				target: 'blue-left-stop-2',
				method: function(id) {
					const robot = Game.methodObjects.find(bg => bg.id === this.primary);
					const robotPasser = gameObject.arenaBlueAttackers.find(bg => bg.id === this.primary); 
					if (robotPasser?.stop === 1) { // moving right on the road
						robotPasser.stop++;
					}
				},
				methodId: undefined,
			}
			Game.addCollision(Game.collisionSetup);
			Game.collisionSetup = {
				primary: 'arena-blue-att-robot-left-' + gameObject.arenaBlueSendCount,
				target: 'blue-stop-3',
				method: function(id) {
					const robot = Game.methodObjects.find(bg => bg.id === this.primary);
					const robotPasser = gameObject.arenaBlueAttackers.find(bg => bg.id === this.primary); 
					if (robotPasser?.stop === 2) { // moving up the road
						robotPasser.stop++;
					}
				},
				methodId: undefined,
			}
			Game.addCollision(Game.collisionSetup);
			Game.collisionSetup = {
				primary: 'arena-blue-att-robot-left-' + gameObject.arenaBlueSendCount,
				target: 'red-base',
				method: function(id) {
					const robot = Game.methodObjects.find(bg => bg.id === this.primary);
					const robotPasser = gameObject.arenaBlueAttackers.find(bg => bg.id === this.primary); 
					if (robotPasser?.stop === 3) { // attack the red base
						robotPasser.stop++;
					}
				},
				methodId: undefined,
			}
			Game.addCollision(Game.collisionSetup);
		}
		function setRedLeftRoadNavCollisions() {
			Game.collisionSetup = {
				primary: 'arena-red-att-robot-left-' + gameObject.arenaRedSendCount,
				target: 'red-left-stop-1',
				method: function(id) {
					const robot = Game.methodObjects.find(bg => bg.id === this.primary);
					const robotPasser = gameObject.arenaRedAttackers.find(bg => bg.id === this.primary); 
					if (robotPasser?.stop === 0) { // moving down the road now
						robotPasser.stop++;
					}
				},
				methodId: undefined,
			}
			Game.addCollision(Game.collisionSetup);
			Game.collisionSetup = {
				primary: 'arena-red-att-robot-left-' + gameObject.arenaRedSendCount,
				target: 'red-left-stop-2',
				method: function(id) {
					const robot = Game.methodObjects.find(bg => bg.id === this.primary);
					const robotPasser = gameObject.arenaRedAttackers.find(bg => bg.id === this.primary); 
					if (robotPasser?.stop === 1) { // moving right on the road
						robotPasser.stop++;
					}
				},
				methodId: undefined,
			}
			Game.addCollision(Game.collisionSetup);
			Game.collisionSetup = {
				primary: 'arena-red-att-robot-left-' + gameObject.arenaRedSendCount,
				target: 'red-stop-3',
				method: function(id) {
					const robot = Game.methodObjects.find(bg => bg.id === this.primary);
					const robotPasser = gameObject.arenaRedAttackers.find(bg => bg.id === this.primary); 
					if (robotPasser?.stop === 2) { // moving up the road
						robotPasser.stop++;
					}
				},
				methodId: undefined,
			}
			Game.addCollision(Game.collisionSetup);
			Game.collisionSetup = {
				primary: 'arena-red-att-robot-left-' + gameObject.arenaRedSendCount,
				target: 'blue-base',
				method: function(id) {
					const robot = Game.methodObjects.find(bg => bg.id === this.primary);
					const robotPasser = gameObject.arenaRedAttackers.find(bg => bg.id === this.primary); 
					if (robotPasser?.stop === 3) { // attack the blue base
						robotPasser.stop++;
					}
				},
				methodId: undefined,
			}
			Game.addCollision(Game.collisionSetup);
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
						isBackground: true,
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
						id: 'grass',
						isBackground: false,
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
				
				// reset the send button colors
				const sendRobotsLeft = Game.methodObjects.find(bs => bs.id === 'send-robots-left');
				sendRobotsLeft.btnColor = 'grey';
				const sendRobotsRight = Game.methodObjects.find(bs => bs.id === 'send-robots-right');
				sendRobotsRight.btnColor = 'grey';
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
					drawButton({
						posX: Game.placeEntityX(0.49, (Game.entitySize * 9)),
						posY: Game.placeEntityY(0.78),
						width: (Game.entitySize * 10),
						height: (Game.entitySize * 10),
						lineWidth: 1,
						btnColor: 'darkblue',
						txtColor: 'white',
						font: '1em serif',
						msg: 'HP: 20',
						isFilled: true,
						id: 'blue-base',
						action: { 
							method: function(id) {
								
							}
						},
						isModalBtn: false,
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
						posX: Game.placeEntityX(0.49, (Game.entitySize * 9)),
						posY: Game.placeEntityY(0.03),
						width: (Game.entitySize * 10),
						height: (Game.entitySize * 10),
						lineWidth: 1,
						btnColor: 'darkred',
						txtColor: 'white',
						font: '1em serif',
						msg: 'HP: 20',
						isFilled: true,
						id: 'red-base',
						action: { 
							method: function(id) {
								
							}
						},
						isModalBtn: false,
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
								if (gameObject.arenaGameStarted && gameObject.arenaBlueGameMoney >= 10 && gameObject.selectedRobot.length === 6) {
									if (gameObject.canClick) {
										gameObject.canClick = false;
										blueRobotSendMoneyUpdate();
										setBlueLeftRoadNavCollisions();
										const blueRobot = {
											posX: Game.placeEntityX(0),
											posY: Game.placeEntityY(0.265), // reds bots start position- posY: Game.placeEntityY(0.615),
											width: (Game.entitySize * 1.5),
											height: (Game.entitySize * 1.5),
											id: 'arena-blue-att-robot-left-' + gameObject.arenaBlueSendCount,
											hp: 10, // future Jordan, buff this with the robots defense
											robotParts: gameObject.selectedRobot,
											direction: 'lt',
											stop: 0,
										}
										sendBlueRobot(blueRobot);
										setTimeout(function() {
											gameObject.canClick = true;
										}, 800);
									}
								} else {
									const sendRobotsLeft = Game.methodObjects.find(bs => bs.id === 'send-robots-left');
									sendRobotsLeft.btnColor = '#C0C0C0';
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
								if (gameObject.arenaGameStarted && gameObject.arenaBlueGameMoney >= 10 && gameObject.selectedRobot.length === 6 ) {
									if (gameObject.canClick) {
										gameObject.canClick = false;
										blueRobotSendMoneyUpdate();
										setBlueRightRoadNavCollisions();
										const blueRobot = {
											posX: Game.placeEntityX(1), // 0.999 // 0.903 <- stop there for pos 1
											posY: Game.placeEntityY(0.265), //0.265 // reds bots start position- posY: Game.placeEntityY(0.615),
											width: (Game.entitySize * 1.5),
											height: (Game.entitySize * 1.5),
											id: 'arena-blue-att-robot-right-' + gameObject.arenaBlueSendCount,
											hp: 10, // future Jordan, buff this with the robots defense
											robotParts: gameObject.selectedRobot,
											direction: 'rt',
											stop: 0,
										}
										sendBlueRobot(blueRobot);
										setTimeout(function() {
											gameObject.canClick = true;
										}, 800);
									}
								} else {
									const sendRobotsRight = Game.methodObjects.find(bs => bs.id === 'send-robots-right');
									sendRobotsRight.btnColor = '#C0C0C0';
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
		function sendRedRobotLeft(robot) {
			gameObject.arenaRedGameMoney -= 10;
			setRedLeftRoadNavCollisions();
			const redRobot = {
				posX: Game.placeEntityX(0),
				posY: Game.placeEntityY(0.615), // reds bots start position- posY: Game.placeEntityY(0.615),
				width: (Game.entitySize * 1.5),
				height: (Game.entitySize * 1.5),
				id: 'arena-red-att-robot-left-' + gameObject.arenaRedSendCount,
				hp: 10, // future Jordan, buff this with the robots defense
				robotParts: robot.robotParts,
				direction: 'lt',
				stop: 0,
			}
			sendRedRobot(redRobot);
		}
		function sendRedRobotRight(robot) {
			gameObject.arenaRedGameMoney -= 10;
			setRedRightRoadNavCollisions();
			const redRobot = {
				posX: Game.placeEntityX(1), // 0.999 // 0.903 <- stop there for pos 1
				posY: Game.placeEntityY(0.615), //0.265 // reds bots start position- posY: Game.placeEntityY(0.615),
				width: (Game.entitySize * 1.5),
				height: (Game.entitySize * 1.5),
				id: 'arena-red-att-robot-right-' + gameObject.arenaRedSendCount,
				hp: 10, // future Jordan, buff this with the robots defense
				robotParts: robot.robotParts,
				direction: 'rt',
				stop: 0,
			}
			sendRedRobot(redRobot);
		}
		function blueRobotSendMoneyUpdate() {
			gameObject.arenaBlueGameMoney -= 10;
			const moneyBackground = Game.methodObjects.find(bg => bg.id === 'money-bar-background');
			const moneyCounter = Game.methodObjects.find(bg => bg.id === 'player-money-amount-title');
			if (moneyCounter) {
				moneyCounter.msg = '$' + gameObject.arenaBlueGameMoney;
				moneyBackground.isAnim = true;
			}
		}
		function generateRedArenaRobots() {
			for (let i = 0; i < gameObject.robotArenaDesignCount; i++) {
				const robotDesign = {
					robotId: i,
					robotParts: [],
					directive: Math.floor((Math.random() * 4) + 1),
				};
				const headIndex = Math.floor((Math.random() * robotHeads.length));
				const randomHead = Object.assign({}, robotHeads[headIndex]);
				robotDesign.robotParts.push(randomHead);
				const chassisIndex = Math.floor((Math.random() * robotChassis.length));
				const randomChassis = Object.assign({}, robotChassis[chassisIndex]);
				robotDesign.robotParts.push(randomChassis);
				const leftArmIndex = Math.floor((Math.random() * robotArms.length));
				const randomLeftArm = Object.assign({}, robotArms[leftArmIndex]);
				randomLeftArm.armPos = 'left';
				robotDesign.robotParts.push(randomLeftArm);
				const rightArmIndex = Math.floor((Math.random() * robotArms.length));
				const randomRightArm = Object.assign({}, robotArms[rightArmIndex]);
				randomRightArm.armPos = 'right';
				robotDesign.robotParts.push(randomRightArm);
				const leftLegIndex = Math.floor((Math.random() * robotLegs.length));
				const randomLeftLeg = Object.assign({}, robotLegs[leftLegIndex]);
				randomLeftLeg.legPos = 'left';
				robotDesign.robotParts.push(randomLeftLeg);
				const rightLegIndex = Math.floor((Math.random() * robotLegs.length));
				const randomRightLeg = Object.assign({}, robotLegs[rightLegIndex]);
				randomRightLeg.legPos = 'right';
				robotDesign.robotParts.push(randomRightLeg);
				
				gameObject.redRobotArenaDesigns.push(robotDesign);
			}
		}
		function sendRobot(robot) {
			Game.methodSetup = {
				method: function(id) {
					drawRect({
						posX: robot.posX,
						posY: robot.posY,
						width: robot.width,
						height: robot.height,
						lineWidth: 1,
						color: drawRobotSelectPreviewParts('chassis', robot?.robotParts),
						isFilled: true,
						isBackground: false,
						id: robot.id,
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
											color: drawRobotSelectPreviewParts('head', robot?.robotParts),
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
											color: drawRobotSelectPreviewParts('left-arm', robot?.robotParts),
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
											color: drawRobotSelectPreviewParts('right-arm', robot?.robotParts),
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
											color: drawRobotSelectPreviewParts('left-leg', robot?.robotParts),
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
											color: drawRobotSelectPreviewParts('right-leg', robot?.robotParts),
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
		}
		function sendBlueRobot(blueRobot) {
			sendRobot(blueRobot);
			drawRobotSelectParts(blueRobot.id);
			gameObject.arenaBlueAttackers.push(blueRobot);
			gameObject.arenaBlueSendCount++;
		}
		function sendRedRobot(redRobot) {
			sendRobot(redRobot);
			drawRobotSelectParts(redRobot.id);
			gameObject.arenaRedAttackers.push(redRobot);
			gameObject.arenaRedSendCount++;
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
							methodId: id,
							method: function(id) {
								if (gameObject.arenaGameStarted) {
									const tower = Game.methodObjects.find(bg => bg.methodId === this.methodId);
									selectBuildTowerMenu(tower, 1);
									console.log(tower);
								}
							}
						},
						isModalBtn: false,
						props: {
							towerId: 0,
							type: '',
							name: '',
							stats: {
								att: 0,
								def: 0,
								spd: 0,
								hp: 0,
								lvl: 0,
								range: 0,
							},
							robotParts: [],
							requires: {
								arenaLvlToBuild: 0,
								arenaLvlToUpgrade: 0,
							},
						},
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
							methodId: id,
							method: function(id) {
								if (gameObject.arenaGameStarted) {
									const tower = Game.methodObjects.find(bg => bg.methodId === this.methodId);
									selectBuildTowerMenu(tower, 2);
									console.log(tower);
								}
							}
						},
						isModalBtn: false,
						props: {
							towerId: 0,
							type: '',
							name: '',
							stats: {
								att: 0,
								def: 0,
								spd: 0,
								hp: 0,
								lvl: 0,
								range: 0,
							},
							robotParts: [],
							requires: {
								arenaLvlToBuild: 0,
								arenaLvlToUpgrade: 0,
							},
						},
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
							methodId: id,
							method: function(id) {
								if (gameObject.arenaGameStarted) {
									const tower = Game.methodObjects.find(bg => bg.methodId === this.methodId);
									selectBuildTowerMenu(tower, 3);
									console.log(tower);
								}
							}
						},
						isModalBtn: false,
						props: {
							towerId: 0,
							type: '',
							name: '',
							stats: {
								att: 0,
								def: 0,
								spd: 0,
								hp: 0,
								lvl: 0,
								range: 0,
							},
							robotParts: [],
							requires: {
								arenaLvlToBuild: 0,
								arenaLvlToUpgrade: 0,
							},
						},
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
							methodId: id,
							method: function(id) {
								if (gameObject.arenaGameStarted) {
									const tower = Game.methodObjects.find(bg => bg.methodId === this.methodId);
									selectBuildTowerMenu(tower, 4);
									console.log(tower);
								}
							}
						},
						isModalBtn: false,
						props: {
							towerId: 0,
							type: '',
							name: '',
							stats: {
								att: 0,
								def: 0,
								spd: 0,
								hp: 0,
								lvl: 0,
								range: 0,
							},
							robotParts: [],
							requires: {
								arenaLvlToBuild: 0,
								arenaLvlToUpgrade: 0,
							},
						},
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
							methodId: id,
							method: function(id) {
								if (gameObject.arenaGameStarted) {
									const tower = Game.methodObjects.find(bg => bg.methodId === this.methodId);
									selectBuildTowerMenu(tower, 5);
									console.log(tower);
								}
							}
						},
						isModalBtn: false,
						props: {
							towerId: 0,
							type: '',
							name: '',
							stats: {
								att: 0,
								def: 0,
								spd: 0,
								hp: 0,
								lvl: 0,
								range: 0,
							},
							robotParts: [],
							requires: {
								arenaLvlToBuild: 0,
								arenaLvlToUpgrade: 0,
							},
						},
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
							methodId: id,
							method: function(id) {
								if (gameObject.arenaGameStarted) {
									const tower = Game.methodObjects.find(bg => bg.methodId === this.methodId);
									selectBuildTowerMenu(tower, 6);
									console.log(tower);
								}
							}
						},
						isModalBtn: false,
						props: {
							towerId: 0,
							type: '',
							name: '',
							stats: {
								att: 0,
								def: 0,
								spd: 0,
								hp: 0,
								lvl: 0,
								range: 0,
							},
							robotParts: [],
							requires: {
								arenaLvlToBuild: 0,
								arenaLvlToUpgrade: 0,
							},
						},
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
							methodId: id,
							method: function(id) {
								if (gameObject.arenaGameStarted) {
									const tower = Game.methodObjects.find(bg => bg.methodId === this.methodId);
									selectBuildTowerMenu(tower, 7);
									console.log(tower);
								}
							}
						},
						isModalBtn: false,
						props: {
							towerId: 0,
							type: '',
							name: '',
							stats: {
								att: 0,
								def: 0,
								spd: 0,
								hp: 0,
								lvl: 0,
								range: 0,
							},
							robotParts: [],
							requires: {
								arenaLvlToBuild: 0,
								arenaLvlToUpgrade: 0,
							},
						},
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
							methodId: id,
							method: function(id) {
								if (gameObject.arenaGameStarted) {
									const tower = Game.methodObjects.find(bg => bg.methodId === this.methodId);
									selectBuildTowerMenu(tower, 8);
									console.log(tower);
								}
							}
						},
						isModalBtn: false,
						props: {
							towerId: 0,
							type: '',
							name: '',
							stats: {
								att: 0,
								def: 0,
								spd: 0,
								hp: 0,
								lvl: 0,
								range: 0,
							},
							robotParts: [],
							requires: {
								arenaLvlToBuild: 0,
								arenaLvlToUpgrade: 0,
							},
						},
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
						props: {
							towerId: 0,
							type: '',
							stats: {
								att: 0,
								def: 0,
								spd: 0,
								hp: 0,
								lvl: 0,
								range: 0,
							},
							robotParts: [],
						},
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
						props: {
							towerId: 0,
							type: '',
							stats: {
								att: 0,
								def: 0,
								spd: 0,
								hp: 0,
								lvl: 0,
								range: 0,
							},
							robotParts: [],
						},
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
						props: {
							towerId: 0,
							type: '',
							stats: {
								att: 0,
								def: 0,
								spd: 0,
								hp: 0,
								lvl: 0,
								range: 0,
							},
							robotParts: [],
						},
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
						props: {
							towerId: 0,
							type: '',
							stats: {
								att: 0,
								def: 0,
								spd: 0,
								hp: 0,
								lvl: 0,
								range: 0,
							},
							robotParts: [],
						},
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
						props: {
							towerId: 0,
							type: '',
							stats: {
								att: 0,
								def: 0,
								spd: 0,
								hp: 0,
								lvl: 0,
								range: 0,
							},
							robotParts: [],
						},
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
						props: {
							towerId: 0,
							type: '',
							stats: {
								att: 0,
								def: 0,
								spd: 0,
								hp: 0,
								lvl: 0,
								range: 0,
							},
							robotParts: [],
						},
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
						props: {
							towerId: 0,
							type: '',
							stats: {
								att: 0,
								def: 0,
								spd: 0,
								hp: 0,
								lvl: 0,
								range: 0,
							},
							robotParts: [],
						},
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
						props: {
							towerId: 0,
							type: '',
							stats: {
								att: 0,
								def: 0,
								spd: 0,
								hp: 0,
								lvl: 0,
								range: 0,
							},
							robotParts: [],
						},
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
						posX: Game.placeEntityX(0.928, (Game.entitySize * 9.6)),
						posY: Game.placeEntityY(0.26),
						width: (Game.entitySize * 2),
						height: (Game.entitySize * 2),
						lineWidth: 1,
						color: 'rgba(0, 0, 200, 0)', // transparant
						isFilled: false,
						id: 'blue-right-stop-1', // start moving down
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
						posX: Game.placeEntityX(0.08, (Game.entitySize * -9.6)),
						posY: Game.placeEntityY(0.26),
						width: (Game.entitySize * 2),
						height: (Game.entitySize * 2),
						lineWidth: 1,
						color: 'rgba(0, 0, 200, 0)', // transparant
						isFilled: false,
						id: 'blue-left-stop-1', // start moving down
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
						posX: Game.placeEntityX(0.928, (Game.entitySize * 9.6)),
						posY: Game.placeEntityY(0.42),
						width: (Game.entitySize * 4),
						height: (Game.entitySize * 2),
						lineWidth: 1,
						color: 'rgba(0, 0, 200, 0)', // transparant
						isFilled: false,
						id: 'blue-right-stop-2', // start moving left
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
						posX: Game.placeEntityX(0.06, (Game.entitySize * -9.6)),
						posY: Game.placeEntityY(0.42),
						width: (Game.entitySize * 4),
						height: (Game.entitySize * 2),
						lineWidth: 1,
						color: 'rgba(0, 0, 200, 0)', // transparant
						isFilled: false,
						id: 'blue-left-stop-2', // start moving right
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
						posX: Game.placeEntityX(0.495),
						posY: Game.placeEntityY(0.42),
						width: (Game.entitySize * 1),
						height: (Game.entitySize * 2),
						lineWidth: 1,
						color: 'rgba(0, 0, 200, 0)', // transparant
						isFilled: false,
						id: 'blue-stop-3', // start moving up
						isBackground: false,
						props: {},
						methodId: id
					});
				}
			};
			Game.addMethod(Game.methodSetup);
		}
		function drawRedRobotRoadNavigation() {
			Game.methodSetup = {
				method: function(id) {
					drawRect({
						posX: Game.placeEntityX(0.928, (Game.entitySize * 9.6)),
						posY: Game.placeEntityY(0.62),
						width: (Game.entitySize * 2),
						height: (Game.entitySize * 2),
						lineWidth: 1,
						color: 'rgba(0, 0, 200, 0)', // transparant
						isFilled: false,
						id: 'red-right-stop-1', // start moving down
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
						posX: Game.placeEntityX(0.08, (Game.entitySize * -9.6)),
						posY: Game.placeEntityY(0.62),
						width: (Game.entitySize * 2),
						height: (Game.entitySize * 2),
						lineWidth: 1,
						color: 'rgba(0, 0, 200, 0)', // transparant
						isFilled: false,
						id: 'red-left-stop-1', // start moving down
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
						posX: Game.placeEntityX(0.928, (Game.entitySize * 9.6)),
						posY: Game.placeEntityY(0.46),
						width: (Game.entitySize * 4),
						height: (Game.entitySize * 2),
						lineWidth: 1,
						color: 'rgba(0, 0, 200, 0)', // transparant
						isFilled: false,
						id: 'red-right-stop-2', // start moving left
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
						posX: Game.placeEntityX(0.06, (Game.entitySize * -9.6)),
						posY: Game.placeEntityY(0.46),
						width: (Game.entitySize * 4),
						height: (Game.entitySize * 2),
						lineWidth: 1,
						color: 'rgba(0, 0, 200, 0)', // transparant
						isFilled: false,
						id: 'red-left-stop-2', // start moving right
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
						posX: Game.placeEntityX(0.495),
						posY: Game.placeEntityY(0.46),
						width: (Game.entitySize * 1),
						height: (Game.entitySize * 2),
						lineWidth: 1,
						color: 'rgba(0, 0, 200, 0)', // transparant
						isFilled: false,
						id: 'red-stop-3', // start moving down
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
						msg: 'Funds',
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
			gameTimer = setInterval(function() {
				if (gameObject.arenaRoundSeconds > 0) {
					gameObject.arenaRoundSeconds--;
					roundTimer.msg = gameObject.arenaRoundSeconds + 's';
					roundCounter.msg = 'Turn: ' + gameObject.arenaGameRound + '/' + gameObject.arenaGameMaxRounds;
				} else if(gameObject.arenaRoundSeconds === 0) {
					// add to the players money
					gameObject.arenaBlueGameMoney += 50;
					gameObject.arenaBlueGameMoney += (gameObject.arenaBlueSendCount * 2);
					gameObject.arenaRedGameMoney += 50;
					gameObject.arenaRedGameMoney += (gameObject.arenaRedSendCount * 2);
					gameObject.arenaGameRound++;
					gameObject.arenaRoundSeconds = 15;
					const blueMoney = Game.methodObjects.find(bg => bg.id === 'player-money-amount-title');
					// reset send robot buttons
					const sendRobotsLeft = Game.methodObjects.find(bs => bs.id === 'send-robots-left');
					sendRobotsLeft.btnColor = 'grey';
					const sendRobotsRight = Game.methodObjects.find(bs => bs.id === 'send-robots-right');
					sendRobotsRight.btnColor = 'grey';
					// every turn except the last turn
					if (gameObject.arenaGameRound <= 12) {
						roundTimer.msg = gameObject.arenaRoundSeconds + 's';
						roundCounter.msg = 'Turn: ' + gameObject.arenaGameRound + '/' + gameObject.arenaGameMaxRounds;
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
					// the very last turn. End game
					if (gameObject.arenaGameRound === 13) {
						const redBase = Game.methodObjects.find(bs => bs.id === 'red-base');
						const blueBase = Game.methodObjects.find(bs => bs.id === 'blue-base');
						let winningTeam = '';
						if (redBase.props.hp > blueBase.props.hp) {
							winningTeam = 'red';
						} else if (blueBase.props.hp > redBase.props.hp) {
							winningTeam = 'blue';
						} else {
							winningTeam = 'draw';
						}
						endGame(winningTeam);
					}
				}
				roundBackground.isAnim = true;
			}, 1000);
		}
		function moveBlueRobots() {
			gameObject.arenaBlueAttackers.forEach((battleRobot, i) => {
				const robot = Game.methodObjects.filter(rob => rob.id === battleRobot.id);
				moveRightRobots(battleRobot, robot, 'blue', i);
				moveLeftRobots(battleRobot, robot, 'blue', i);
			});
		}
		function moveRedRobots() {
			gameObject.arenaRedAttackers.forEach((battleRobot, i) => {
				// future Jordan, make the robots move
				const robot = Game.methodObjects.filter(rob => rob.id === battleRobot.id);
				moveRightRobots(battleRobot, robot, 'red', i);
				moveLeftRobots(battleRobot, robot, 'red', i);
			});
		}
		function robotAttackBase(base, robot, i, color) {
			if (base) {
				base.props.hp--;
				base.msg = 'HP: ' + base.props.hp;
				// remove the robot and all of its parts
				for (let i = 0; i < robot.length; i++) {
					// make the robot explode where the body is
					if (i === 0) {
						Particle.drawSpark({
							posX: robot[i].posX,
							posY: robot[i].posY,
							shape: Particle.enumShapes.rect,
							color: 'yellow',
							ticks: 11,
							count: 8,
							size: (Game.entitySize * 1),
							speed: 1.3,
						});
					}
					Game.deleteEntity(robot[i].methodId);
				}
				if (color === 'blue') {
					gameObject.arenaBlueAttackers.splice(i, 1);
				} else if (color === 'red') {
					gameObject.arenaRedAttackers.splice(i, 1);
				}
			}
		}
		function moveRightRobots(br, robot, color, i) {
			if (br.direction === 'rt' && br.stop === 0) {
				robot.forEach((rob, j) => {
					// future Jordan base the speed on the robot's stats
					rob.posX -= Game.moveEntity(0.05, Game.enumDirections.leftRight);
					br.posX = rob.posX;
				});
			}
			if (br.direction === 'rt' && br.stop === 1) {
				robot.forEach((rob, j) => {
					if (color === 'blue') {
						rob.posY += Game.moveEntity(0.05, Game.enumDirections.topDown);
						br.posY = rob.posY;
					} else if (color === 'red') {
						rob.posY -= Game.moveEntity(0.05, Game.enumDirections.topDown);
						br.posY = rob.posY;
					}
				});
			}
			if (br.direction === 'rt' && br.stop === 2) {
				robot.forEach((rob, j) => {
					// future Jordan base the speed on the robot's stats
					rob.posX -= Game.moveEntity(0.05, Game.enumDirections.leftRight);
					br.posX = rob.posX;
				});
			}
			if (br.direction === 'rt' && br.stop === 3) {
				robot.forEach((rob, j) => {
					if (color === 'blue') {
						rob.posY -= Game.moveEntity(0.05, Game.enumDirections.topDown);
						br.posY = rob.posY;
					} else if (color === 'red') {
						rob.posY += Game.moveEntity(0.05, Game.enumDirections.topDown);
						br.posY = rob.posY;
					}
					
				});
			}
			if (br.direction === 'rt' && br.stop === 4) {
				// start attacking red or blue base
				
				// future Jordan, start working on blue attacking reds base and
				// red attacking blue base. display the bases health. perhaps destroy the
				// robots on contact with the bases. work on establishing a winner and a loser.
				// if blue wins, create a chance to unlock a new robot part
				
				// future Jordan, after all of that is said and done, start to work on reds towers
				// selection and generation. red should also be able to upgrade towers that they've built
				// there's a new 'redMaxTowerLevel' to determine what the max level is this game
				
				// future Jordan, make some sort of delay for sending out blue robots
				
				// future Jordan, look into some of the buttons and backrounds that use "Game.entitySize"
				// some of the styles look a little off when switching between some of the different IOS and Android mobile screens
				if (color === 'blue') {
					const redBase = Game.methodObjects.find(bs => bs.id === 'red-base');
					robotAttackBase(redBase, robot, i, color);
					if (redBase.props.hp <= 0) {
						endGame('blue');
					}
				} else if (color === 'red') {
					const blueBase = Game.methodObjects.find(bg => bg.id === 'blue-base');
					robotAttackBase(blueBase, robot, i, color);
					if (blueBase.props.hp <= 0) {
						endGame('red');
					}
				}
			}
		}
		function moveLeftRobots(br, robot, color, i) {
			if (br.direction === 'lt' && br.stop === 0) {
				robot.forEach((rob, j) => {
					// future Jordan base the speed on the robot's stats
					rob.posX += Game.moveEntity(0.05, Game.enumDirections.leftRight);
					br.posX = rob.posX;
				});
			}
			if (br.direction === 'lt' && br.stop === 1) {
				robot.forEach((rob, j) => {
					if (color === 'blue') {
						rob.posY += Game.moveEntity(0.05, Game.enumDirections.topDown);
						br.posY = rob.posY;
					} else if (color === 'red') {
						rob.posY -= Game.moveEntity(0.05, Game.enumDirections.topDown);
						br.posY = rob.posY;
					}
				});
			}
			if (br.direction === 'lt' && br.stop === 2) {
				robot.forEach((rob, j) => {
					// future Jordan base the speed on the robot's stats
					rob.posX += Game.moveEntity(0.05, Game.enumDirections.leftRight);
					br.posX = rob.posX;
				});
			}
			if (br.direction === 'lt' && br.stop === 3) {
				robot.forEach((rob, j) => {
					if (color === 'blue') {
						rob.posY -= Game.moveEntity(0.05, Game.enumDirections.topDown);
						br.posY = rob.posY;
					} else if (color === 'red') {
						rob.posY += Game.moveEntity(0.05, Game.enumDirections.topDown);
						br.posY = rob.posY;
					}
				});
			}
			if (br.direction === 'lt' && br.stop === 4) {
				// start attacking red or blue base
				if (color === 'blue') {
					const redBase = Game.methodObjects.find(bs => bs.id === 'red-base');
					robotAttackBase(redBase, robot, i, color);
					if (redBase.props.hp <= 0) {
						endGame('blue');
					}
				} else if (color === 'red') {
					const blueBase = Game.methodObjects.find(bg => bg.id === 'blue-base');
					robotAttackBase(blueBase, robot, i, color);
					if (blueBase.props.hp <= 0) {
						endGame('red');
					}
				}
			}
		}
		function redAiMind() {
			if (gameObject.arenaGameStarted) {
				const whatToDo = Math.floor((Math.random() * 2) + 1);
				// future Jordan, figure out what towers are availiable to build on
				if (whatToDo === 1 && gameObject.arenaRedGameMoney >= 20) {
					// build a level 1 tower
					
				}
				if (whatToDo === 2 && gameObject.arenaRedGameMoney >= 10) {
					// send a robot
					const redBotIndex = Math.floor((Math.random() * gameObject.redRobotArenaDesigns.length));
					const redBot = Object.assign({}, gameObject.redRobotArenaDesigns[redBotIndex]);
					const whereToSend = Math.floor((Math.random() * 2) + 1);
					if (whereToSend === 1 && sendRedLeftCount < 3 || sendRedRightCount === 2) {
						sendRedLeftCount++;
						sendRedRobotLeft(redBot);
						sendRedRightCount = 0;
					} else if (whereToSend === 2 && sendRedRightCount < 3 || sendRedLeftCount == 2) {
						sendRedRightCount++;
						sendRedRobotRight(redBot);
						sendRedLeftCount = 0;
					}
				}
				aiThinking = false;
			}
		}
		function endGame(winningTeam) {
			if (gameTimer) {
				clearInterval(gameTimer);
			}
			setTimeout(function() {
				gameObject.selectedRobot = [];
				gameObject.arenaBlueAttackers = [];
				gameObject.arenaRedAttackers = [];
				gameObject.redRobotArenaDesigns = [];
				gameObject.redTowerArenaDesigns = [];
				gameObject.selectedRobotDesign = -1;
				gameObject.arenaGameRound = 1;
				gameObject.arenaRoundSeconds = 15;
				gameObject.arenaBlueGameMoney = 50;
				gameObject.arenaRedGameMoney = 50;
				gameObject.arenaBlueSendCount = 0;
				gameObject.arenaRedSendCount = 0;
				gameObject.arenaGameStarted = false;
				gameObject.canClick = true;
				Game.canvas.width = window.innerWidth * Game.stageWidthPrct;
				Game.canvas.height = window.innerHeight * Game.stageHeightPrct;
				Game.entitySize = (Game.canvas.height * 0.01);
				Game.entityWidth = (Game.canvas.width * 0.01);
				drawWinnerModal(winningTeam);
			}, 0);
		}
		function drawWinnerModal(winningTeam) { // winningTeam can be red, blue or draw
			let msgs = [];
			if (winningTeam === 'red') {
				msgs = ['Red Team Wins!', '', 'Tap here to continue'];
			} else if (winningTeam === 'draw') {
				msgs = ['Draw!', '', 'Tap here to continue'];
			} else if (winningTeam === 'blue') {
				const newPart = Math.floor((Math.random() * 4) + 1);
				let unlockPart = '';
				if (newPart === 4) { // 1 and 4 chance to unlock a part
					unlockPart = unlockRobotPart();
				}
				msgs = ['Blue Team Wins!', unlockPart , 'Tap here to continue'];
			}
			Game.methodSetup = {
				layer: 1,
				method: function(id) {
					drawDialogueModal({
						posX: Game.placeEntityX(0.50, (Game.entitySize * 40)),
						posY: Game.placeEntityY(0.50, (Game.entitySize * 30)),
						width: (Game.entitySize * 45),
						height: (Game.entitySize * 25),
						lineWidth: 1,
						modalColor: 'grey',
						msgColor: 'white',
						msgFont: '1em serif',
						msgs: msgs,
						msgStart: Game.placeEntityY(0.55, (Game.entitySize * 30)),
						msgDistance: (Game.entitySize * 8),
						bgColor: '',
						isModalFilled: true,
						id: Game.modalId,
						layer: 1,
						action: {
							method: function(id) {
								Game.keepPreviousSize = false;
								arenaPage.loadPage(); 
							}
						},
						isModalBtn: true,
						props: {},
						methodId: id
					});
				}
			};
			Game.addMethod(Game.methodSetup);
		}
		function unlockRobotPart() {
			let partSelection = '';
			// check to see if all the parts are maxed out
			if (gameObject.discoveredChassis.length >= robotChassis.length &&
			gameObject.discoveredHeads.length >= robotHeads.length &&
			gameObject.discoveredLegs.length >= robotLegs.length &&
			gameObject.discoveredArms >= robotArms.length) {
				return partSelection;
			} else { // find a robot part
				let foundPart = false;
				while(!foundPart) {
					const selectSection = Math.floor((Math.random() * 4) + 1); // chassis, heads, arms or legs
					if (selectSection === 1 && gameObject.discoveredChassis.length < robotChassis.length) {
						const findChassis = Math.floor((Math.random() * robotChassis.length));
						const unlockChassis = gameObject.discoveredChassis.find(x => x.chassisId === robotChassis[findChassis].chassisId);
						if (!unlockChassis) {
							const newChassis = Object.assign({}, robotChassis[findChassis]);
							gameObject.discoveredChassis.push(newChassis);
							partSelection += 'New Chassis Part Discovered!';
							foundPart = true;
							return partSelection;
						} else {
							foundPart = false;
						}
					} else if (selectSection === 2 && gameObject.discoveredHeads.length < robotHeads.length) {
						const findHead = Math.floor((Math.random() * robotHeads.length));
						const unlockHead = gameObject.discoveredHeads.find(x => x.headId === robotHeads[findHead].headId);
						if (!unlockHead) {
							const newHead = Object.assign({}, robotHeads[findHead]);
							gameObject.discoveredHeads.push(newHead);
							partSelection += 'New Head Part Discovered!';
							foundPart = true;
							return partSelection;
						} else {
							foundPart = false;
						}
					} else if (selectSection === 3 && gameObject.discoveredLegs.length < robotLegs.length) {
						const findLeg = Math.floor((Math.random() * robotLegs.length));
						const unlockLeg = gameObject.discoveredLegs.find(x => x.legId === robotLegs[findLeg].legId);
						if (!unlockLeg) {
							const newLeg = Object.assign({}, robotLegs[findLeg]);
							gameObject.discoveredLegs.push(newLeg);
							partSelection += 'New Leg Part Discovered!';
							foundPart = true;
							return partSelection;
						} else {
							foundPart = false;
						}
					} else if (selectSection === 4 && gameObject.discoveredArms.length < robotArms.length) {
						const findArm = Math.floor((Math.random() * robotArms.length));
						const unlockArm = gameObject.discoveredArms.find(x => x.armId === robotArms[findArm].armId);
						if (!unlockArm) {
							const newArm = Object.assign({}, robotArms[findArm]);
							gameObject.discoveredArms.push(newArm);
							partSelection += 'New Arm Part Discovered!';
							foundPart = true;
							return partSelection;
						} else {
							foundPart = false;
						}
					}
				}
			}
		}
		function findTowerDirectiveName(index) {
			let directiveName = '';
			if (gameObject.towerArenaDesigns[index].directive === 1 && gameObject.towerArenaDesigns[index].arenaTower.type !== 'bunker') {
				directiveName = 'Standard';
			}
			if (gameObject.towerArenaDesigns[index].directive === 2 && gameObject.towerArenaDesigns[index].arenaTower.type !== 'bunker') {
				directiveName = 'Long-Shot';
			} else if (gameObject.towerArenaDesigns[index].directive === 2 && gameObject.towerArenaDesigns[index].arenaTower.type === 'bunker') {
				directiveName = 'Standard';
			}
			if (gameObject.towerArenaDesigns[index].directive === 3 && gameObject.towerArenaDesigns[index].arenaTower.type !== 'bunker') {
				directiveName = 'Rapid-Shot';
			} else if (gameObject.towerArenaDesigns[index].directive === 3 && gameObject.towerArenaDesigns[index].arenaTower.type === 'bunker') {
				directiveName = 'Rapid';
			}
			if (gameObject.towerArenaDesigns[index].directive === 4 && gameObject.towerArenaDesigns[index].arenaTower.type !== 'bunker') {
				directiveName = 'Ram-Shot';
			} else if (gameObject.towerArenaDesigns[index].directive === 4 && gameObject.towerArenaDesigns[index].arenaTower.type === 'bunker') {
				directiveName = 'Defense';
			} 
			
			return directiveName;
		}
		function resetTowerSelect() {
			const towerOne = Game.methodObjects.find(bg => bg.id === 'arena-tower-bg-1');
			if (towerOne) {
				towerOne.color = 'darkgrey';
			}
			const towerTwo = Game.methodObjects.find(bg => bg.id === 'arena-tower-bg-2');
			if (towerTwo) {
				towerTwo.color = 'darkgrey';
			}
			const towerThree = Game.methodObjects.find(bg => bg.id === 'arena-tower-bg-3');
			if (towerThree) {
				towerThree.color = 'darkgrey';
			}
		}
		function selectBuildTower(tower, index) {
			console.log('select', index);
			const directiveName = findTowerDirectiveName(index);
			const selectedTowerDesign = gameObject.towerArenaDesigns[index];
			msgs = [selectedTowerDesign.arenaTower.name ? selectedTowerDesign.arenaTower.name : 'Nothing Selected', directiveName];
			const modal = Game.methodObjects.find(bg => bg.id === Game.modalId);
			if (modal) {
				modal.msgs = msgs;
			}
			resetTowerSelect();
			const towerBg = Game.methodObjects.find(bg => bg.id === 'arena-tower-bg-' + (index + 1));
			if (towerBg) {
				towerBg.color = 'yellow';
			}
			const returnTower = {
				directiveName: directiveName,
				selectedTowerDesign: selectedTowerDesign
			}
			return returnTower;
		}
		function selectBuildTowerMenu(tower, towerIndex) {
			// future Jordan, work on the build tower modal
			// draw the towers and draw the currently selected tower in the middle
			// draw a build and cancel button
			let directiveName = findTowerDirectiveName(0);
			let selectedTowerDesign = gameObject.towerArenaDesigns[0];
			let msgs = [selectedTowerDesign.arenaTower.name, directiveName];
			Game.methodSetup = {
				layer: 1,
				method: function(id) {
					drawDialogueModal({
						posX: Game.placeEntityX(0.07),
						posY: Game.placeEntityY(0.40, (Game.entitySize * 30)),
						width: (Game.canvas.width * 0.85),
						height: (Game.entitySize * 50),
						lineWidth: 1,
						modalColor: 'grey',
						msgColor: 'white',
						msgFont: '1em serif',
						msgs: msgs,
						msgStart: Game.placeEntityY(0.58, (Game.entitySize * 30)),
						msgDistance: (Game.entitySize * 7),
						bgColor: '',
						isModalFilled: true,
						id: Game.modalId,
						layer: 1,
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
				layer: 1,
				method: function(id) {
					drawRect({
						posX: Game.placeEntityX(0.11, (Game.entitySize * -0.01)),
						posY: Game.placeEntityY(0.43, (Game.entitySize * 30)),
						width: (Game.canvas.width * 0.15),
						height: (Game.entitySize * 10),
						lineWidth: 1,
						color: 'yellow',
						isBackground: false,
						isFilled: true,
						id: 'arena-tower-bg-1',
						layer: 1,
						props: {},
						methodId: id
					});
				}
			};
			Game.addMethod(Game.methodSetup);
			console.log('tower', gameObject.towerArenaDesigns[0], gameObject.towerArenaDesigns[1]);
			Game.methodSetup = {
				layer: 1,
				method: function(id) {
					drawButton({
						posX: Game.placeEntityX(0.136, (Game.entitySize * -0.01)),
						posY: Game.placeEntityY(0.435, (Game.entitySize * 30)),
						width: (Game.canvas.width * 0.10),
						height: (Game.entitySize * 9),
						lineWidth: 1,
						btnColor: gameObject.towerArenaDesigns[0].arenaTower.img ? gameObject.towerArenaDesigns[0].arenaTower.img : 'lightslategrey',
						txtColor: 'white',
						font: '0.8em serif',
						msg: '',
						isFilled: true,
						id: 'blue-tower-1',
						layer: 1,
						action: {
							methodId: id,
							method: function(id) {
								const selectTower = selectBuildTower(tower, 0);
								directiveName = selectTower.directiveName;
								selectedTowerDesign = selectTower.selectedTowerDesign;
							}
						},
						isModalBtn: true,
						props: {},
						methodId: id
					});
				}
			};
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				layer: 1,
				method: function(id) {
					drawRect({
						posX: Game.placeEntityX(0.43, (Game.entitySize * 1.99)),
						posY: Game.placeEntityY(0.43, (Game.entitySize * 30)),
						width: (Game.canvas.width * 0.15),
						height: (Game.entitySize * 10),
						lineWidth: 1,
						color: 'darkgrey',
						isBackground: false,
						isFilled: true,
						id: 'arena-tower-bg-2',
						layer: 1,
						props: {},
						methodId: id
					});
				}
			};
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				layer: 1,
				method: function(id) {
					drawButton({
						posX: Game.placeEntityX(0.456, (Game.entitySize * 1.99)),
						posY: Game.placeEntityY(0.435, (Game.entitySize * 30)),
						width: (Game.canvas.width * 0.10),
						height: (Game.entitySize * 9),
						lineWidth: 1,
						btnColor: gameObject.towerArenaDesigns[1].arenaTower.img ? gameObject.towerArenaDesigns[1].arenaTower.img : 'lightslategrey',
						txtColor: 'white',
						font: '0.8em serif',
						msg: '',
						isFilled: true,
						id: 'blue-tower-2',
						layer: 1,
						action: {
							methodId: id,
							method: function(id) {
								const selectTower = selectBuildTower(tower, 1);
								directiveName = selectTower.directiveName;
								selectedTowerDesign = selectTower.selectedTowerDesign;
							}
						},
						isModalBtn: true,
						props: {},
						methodId: id
					});
				}
			};
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				layer: 1,
				method: function(id) {
					drawRect({
						posX: Game.placeEntityX(0.739, (Game.entitySize * 1)),
						posY: Game.placeEntityY(0.43, (Game.entitySize * 30)),
						width: (Game.canvas.width * 0.15),
						height: (Game.entitySize * 10),
						lineWidth: 1,
						color: 'darkgrey',
						isBackground: false,
						isFilled: true,
						id: 'arena-tower-bg-3',
						layer: 1,
						props: {},
						methodId: id
					});
				}
			};
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				layer: 1,
				method: function(id) {
					drawButton({
						posX: Game.placeEntityX(0.765, (Game.entitySize * 1)),
						posY: Game.placeEntityY(0.435, (Game.entitySize * 30)),
						width: (Game.canvas.width * 0.10),
						height: (Game.entitySize * 9),
						lineWidth: 1,
						btnColor: gameObject.towerArenaDesigns[2].arenaTower.img ? gameObject.towerArenaDesigns[2].arenaTower.img : 'lightslategrey',
						txtColor: 'white',
						font: '0.8em serif',
						msg: '',
						isFilled: true,
						id: 'blue-tower-3',
						layer: 1,
						action: {
							methodId: id,
							method: function(id) {
								const selectTower = selectBuildTower(tower, 2);
								directiveName = selectTower.directiveName;
								selectedTowerDesign = selectTower.selectedTowerDesign;
							}
						},
						isModalBtn: true,
						props: {},
						methodId: id
					});
				}
			};
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				layer: 1,
				method: function(id) {
					drawButton({
						posX: Game.placeEntityX(0.47, (Game.entitySize * 40)),
						posY: Game.placeEntityY(0.70, (Game.entitySize * 30)),
						width: (Game.entitySize * 45) - (Game.canvas.width * 0.04),
						height: (Game.entitySize * 7),
						lineWidth: 1,
						btnColor: 'darkgrey',
						txtColor: 'white',
						font: '1.3em serif',
						msg: 'Build',
						isFilled: true,
						id: 'build-tower',
						layer: 1,
						action: { 
							method: function(id) {
								if (selectedTowerDesign.arenaTower.towerId) {
									// future Jordan, add a range circle around the tower when built.
									// the range circle should be displayed when tapping the tower once
									// and other range circles should be hidden. tapping a tower with
									// the range cirlce displayed should bring up the upgrade/rebuild tower menu
									// for that tower
									// we also need to work on bullets targeting the robots when the range circle
									// has been crossed
									tower.btnColor = selectedTowerDesign.arenaTower.img;
									tower.msg = '';
									tower.props.name = selectedTowerDesign.arenaTower.name;
									tower.props.requires = selectedTowerDesign.arenaTower.requires;
									tower.props.robotParts = selectedTowerDesign.arenaTower.robotParts;
									tower.props.stats = selectedTowerDesign.arenaTower.stats;
									tower.props.towerId = selectedTowerDesign.arenaTower.towerId;
									tower.props.type = selectedTowerDesign.arenaTower.type;
									const modal = Game.methodObjects.find(build => build.id === Game.modalId);
									if (modal) {
										Game.deleteEntity(modal.methodId);
									}
									removeTowerSelect();
									const buildBtn = Game.methodObjects.find(btn => btn.id === 'build-tower');
									if (buildBtn) {
										Game.deleteEntity(buildBtn.methodId);
									}
									const cancelBtn = Game.methodObjects.find(btn => btn.id === 'cancel-build-tower');
									if (cancelBtn) {
										Game.deleteEntity(cancelBtn.methodId);
									}
								}
							}
						},
						isModalBtn: true,
						props: {},
						methodId: id
					});
				}
			};
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				layer: 1,
				method: function(id) {
					drawButton({
						posX: Game.placeEntityX(0.47, (Game.entitySize * 40)),
						posY: Game.placeEntityY(0.80, (Game.entitySize * 30)),
						width: (Game.entitySize * 45) - (Game.canvas.width * 0.04),
						height: (Game.entitySize * 7),
						lineWidth: 1,
						btnColor: 'darkgrey',
						txtColor: 'white',
						font: '1.3em serif',
						msg: 'Cancel',
						isFilled: true,
						id: 'cancel-build-tower',
						layer: 1,
						action: { 
							method: function(id) {
								const modal = Game.methodObjects.find(build => build.id === Game.modalId);
								if (modal) {
									Game.deleteEntity(modal.methodId);
								}
								removeTowerSelect();
								const buildBtn = Game.methodObjects.find(btn => btn.id === 'build-tower');
								if (buildBtn) {
									Game.deleteEntity(buildBtn.methodId);
								}
								const cancelBtn = Game.methodObjects.find(btn => btn.id === 'cancel-build-tower');
								if (cancelBtn) {
									Game.deleteEntity(cancelBtn.methodId);
								}
							}
						},
						isModalBtn: true,
						props: {},
						methodId: id
					});
				}
			};
			Game.addMethod(Game.methodSetup);
		}
		function removeTowerSelect() {
			const towerSelect1 = Game.methodObjects.find(tower => tower.id === 'blue-tower-1');
			if (towerSelect1) {
				Game.deleteEntity(towerSelect1.methodId);
			}
			const towerSelect2 = Game.methodObjects.find(tower => tower.id === 'blue-tower-2');
			if (towerSelect2) {
				Game.deleteEntity(towerSelect2.methodId);
			}
			const towerSelect3 = Game.methodObjects.find(tower => tower.id === 'blue-tower-3');
			if (towerSelect3) {
				Game.deleteEntity(towerSelect3.methodId);
			}
			const towerSelectBg1 = Game.methodObjects.find(tower => tower.id === 'arena-tower-bg-1');
			if (towerSelectBg1) {
				Game.deleteEntity(towerSelectBg1.methodId);
			}
			const towerSelectBg2 = Game.methodObjects.find(tower => tower.id === 'arena-tower-bg-2');
			if (towerSelectBg2) {
				Game.deleteEntity(towerSelectBg2.methodId);
			}
			const towerSelectBg3 = Game.methodObjects.find(tower => tower.id === 'arena-tower-bg-3');
			if (towerSelectBg3) {
				Game.deleteEntity(towerSelectBg3.methodId);
			}
		}
	}
}
