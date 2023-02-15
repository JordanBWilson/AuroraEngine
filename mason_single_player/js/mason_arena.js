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

const arenaPage = {
	description: 'This is where the player can compete for prizes',
	loadPage: function() {
		function arenaMenuSelect() {
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
						id: 'arena-background',
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
						id: 'arena-back-game',
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
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				method: function(id) {
					drawText({
						font: '2.3em serif',
						msg: 'Arena',
						posX: Game.placeEntityX(0.50),
						posY: Game.placeEntityY(0.085),
						color: 'darkgrey',
						align: 'center',
						props: {},
						id: 'arena-title',
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
						id: 'arena-select-background',
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
					posY = 0.18;
					posYoffset = -11;
				}
				if (robotCount === 1) {
					posX = 0.07;
					posXoffset = -0.01;
				}
				if (robotCount === 2) {
					posX = 0.39;
					posXoffset = 1.99;
				}
				if (robotCount === 3) {
					posX = 0.689;
					posXoffset = 1;
				}	
				
				Game.methodSetup = {
					method: function(id) {
						drawRect({
							posX: Game.placeEntityX(posX, (Game.entitySize * posXoffset)),
							posY: Game.placeEntityY(posY, (Game.entitySize * posYoffset)),
							width: (Game.canvas.width * 0.25),
							height: (Game.entitySize * 20),
							lineWidth: 1,
							color: 'darkgrey',
							isBackground: false,
							isFilled: true,
							id: 'arena-robot-details-btn',
							props: {},
							methodId: id
						});
					}
				};
				Game.addMethod(Game.methodSetup);
				drawRobotSelect(
					Game.placeEntityX(posX, (Game.entitySize * posXoffset)),
					Game.placeEntityY(posY, (Game.entitySize * posYoffset)),
					gameObject.robotArenaDesigns[i].robotParts,
					i,
					function() {
						gameObject.selectedRobot = gameObject.robotArenaDesigns[i].robotParts;
						gameObject.selectedRobotDesign = i;
						const robotReady = arenaRobotBuiltCheck();
						if (robotReady) {
							if (gameObject.selectedRobot.length === 0) {
								arenaRobotSelect();
							} else {
								// future Jordan, work on the towers next.
								// set it up similar to the robots but for
								// bunker types, make a button under the 
								// directives to select a robot to spawn
								arenaRobotDetails(true);
							}
							
						} else {
							noRobotDesignModal();
						}
					}
				);
				
			}
			drawRobotSelectParts();
			
			Game.methodSetup = {
				method: function(id) {
					drawText({
						font: '2.3em serif',
						msg: 'Team',
						posX: Game.placeEntityX(0.50),
						posY: Game.placeEntityY(0.20),
						color: 'grey',
						align: 'center',
						props: {},
						id: 'arena-title',
						methodId: id
					});
				}
			};
			Game.addMethod(Game.methodSetup);
			
			let towerCount = 0;
			let towerSelectRow = 1;
			
			for (let i = 0; i < gameObject.towerArenaDesignCount; i++) {
				towerCount++;
				let posY = 0
				let posYoffset = 0;
				let posX = 0;
				let posXoffset = 0;
				if (towerSelectRow === 1) {
					posY = 0.48;
					posYoffset = -11;
				}
				if (towerCount === 1) {
					posX = 0.07;
					posXoffset = -0.01;
				}
				if (towerCount === 2) {
					posX = 0.39;
					posXoffset = 1.99;
				}
				if (towerCount === 3) {
					posX = 0.689;
					posXoffset = 1;
				}	
				Game.methodSetup = {
					method: function(id) {
						drawRect({
							posX: Game.placeEntityX(posX, (Game.entitySize * posXoffset)),
							posY: Game.placeEntityY(posY, (Game.entitySize * posYoffset)),
							width: (Game.canvas.width * 0.25),
							height: (Game.entitySize * 20),
							lineWidth: 1,
							color: 'darkgrey',
							isBackground: false,
							isFilled: true,
							id: 'arena-tower-details-btn',
							props: {},
							methodId: id
						});
					}
				};
				Game.addMethod(Game.methodSetup);
				// future Jordan, work on drawing all the towers
				//drawRobotSelect(
					//Game.placeEntityX(posX, (Game.entitySize * posXoffset)),
					//Game.placeEntityY(posY, (Game.entitySize * posYoffset)),
					//gameObject.towerArenaDesigns[i].robotParts,
					//i
				//);
				
			}
			
			Game.methodSetup = {
				method: function(id) {
					drawText({
						font: '2.3em serif',
						msg: 'Tower Defense',
						posX: Game.placeEntityX(0.50),
						posY: Game.placeEntityY(0.50),
						color: 'grey',
						align: 'center',
						props: {},
						id: 'arena-title',
						methodId: id
					});
				}
			};
			Game.addMethod(Game.methodSetup);
			
			Game.pageResized = {
				section: 'arena-robot-select',
				method: function() {
					const modal = Game.methodObjects.find(build => build.id === Game.modalId);
					if (modal) {
						Game.deleteEntity(modal.methodId);
						setTimeout(function() {
							Game.methodSetup = {
								method: function(id) {
									drawDialogueModal({
										posX: Game.placeEntityX(0.45, (Game.entitySize * 40)),
										posY: Game.placeEntityY(0.40, (Game.entitySize * 30)),
										width: (Game.entitySize * 45),
										height: (Game.entitySize * 25),
										lineWidth: modal.lineWidth,
										modalColor: modal.modalColor,
										msgColor: modal.msgColor,
										msgFont: modal.msgFont,
										msgs: modal.msgs,
										msgStart: Game.placeEntityY(0.45, (Game.entitySize * 30)),
										msgDistance: (Game.entitySize * 8),
										bgColor: modal.bgColor,
										isModalFilled: modal.isModalFilled,
										id: Game.modalId,
										action: modal.action,
										isModalBtn: modal.isModalBtn,
										props: {},
										methodId: id
									});
								}
							};
							Game.addMethod(Game.methodSetup);
						}, 150);
					}
					arenaPage.loadPage();
				}
			}
		}
		arenaMenuSelect();
		function arenaRobotSelect() {
			// draw a menu of gameObject.robotTeams
			// when the player selects one, load it in gameObject.robotArenaDesigns
			// we only want robots the player can make
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
						id: 'arena-robot-select-background',
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
						id: 'arena-robot-select-back-game',
						action: { 
							method: function(id) {
								gameObject.selectedRobot = [];
								gameObject.selectedRobotDesign = -1;
								arenaPage.loadPage();
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
					drawText({
						font: '2.3em serif',
						msg: 'Select',
						posX: Game.placeEntityX(0.50),
						posY: Game.placeEntityY(0.085),
						color: 'darkgrey',
						align: 'center',
						props: {},
						id: 'arena-robot-select-title',
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
						id: 'arena-robot-select-background',
						isBackground: true,
						props: {},
						methodId: id
					});
				}
			};
			Game.addMethod(Game.methodSetup);
			let robotCount = 0;
			let robotSelectRow = 1;
			for (let i = gameObject.partPageIndex; i < gameObject.robotTeams.length; i++) {
				robotCount++;
				let posY = 0
				let posYoffset = 0;
				let posX = 0;
				let posXoffset = 0;
				if (robotSelectRow === 1) {
					posY = 0.14;
					posYoffset = -11;
				}
				if (robotSelectRow === 2) {
					posY = 0.34;
					posYoffset = -22;
				}
				if (robotSelectRow === 3) {
					break;
				}
				if (robotCount === 1) {
					posX = 0.07;
					posXoffset = -0.01;
				}
				if (robotCount === 2) {
					posX = 0.39;
					posXoffset = 1.99;
				}
				if (robotCount === 3 &&
				gameObject.robotTeams.length >= 3) {
					posX = 0.689;
					posXoffset = 1;
				} 	
				
				Game.methodSetup = {
					method: function(id) {
						drawRect({
							posX: Game.placeEntityX(posX, (Game.entitySize * posXoffset)),
							posY: Game.placeEntityY(posY, (Game.entitySize * posYoffset)),
							width: (Game.canvas.width * 0.25),
							height: (Game.entitySize * 20),
							lineWidth: 1,
							color: 'darkgrey',
							isBackground: false,
							isFilled: true,
							id: 'factory-details-btn',
							props: {},
							methodId: id
						});
					}
				};
				Game.addMethod(Game.methodSetup);
				drawRobotSelect(
					Game.placeEntityX(posX, (Game.entitySize * posXoffset)),
					Game.placeEntityY(posY, (Game.entitySize * posYoffset)),
					gameObject.robotTeams[i].robotParts,
					i,
					function() {
						gameObject.selectedRobot = gameObject.robotTeams[i].robotParts;
						arenaRobotDetails();
					},
				);
				
				if (i === 2) {
					robotSelectRow++;
				}
				if (i === 5) {
					robotSelectRow++;
				}
				if (robotCount === 3) {
					robotCount = 0;
				}
				
			}
			drawRobotSelectParts();
			drawNextPrevRobotList(gameObject.robotTeams, arenaRobotSelect);
		}
		function arenaRobotBuiltCheck() {
			let robotsBuilt = false;
			let robotsBuiltCount = 0;
			for (let i = 0; i < gameObject.robotTeams.length; i++) {
				if (gameObject.robotTeams[i].robotParts.length === 6) {
					robotsBuiltCount++;
				}
			}
			if (robotsBuiltCount > 0) {
				robotsBuilt = true;
			}
			return robotsBuilt;
		}
		
		function noRobotDesignModal() {
			const msg = ['In the Factory, Design', 'a Robot and Build it!', 'Tap here to continue'];
			Game.methodSetup = {
				method: function(id) {
					drawDialogueModal({
						posX: Game.placeEntityX(0.45, (Game.entitySize * 40)),
						posY: Game.placeEntityY(0.40, (Game.entitySize * 30)),
						width: (Game.entitySize * 45),
						height: (Game.entitySize * 25),
						lineWidth: 1,
						modalColor: 'grey',
						msgColor: 'white',
						msgFont: '1em serif',
						msgs: msg,
						msgStart: Game.placeEntityY(0.45, (Game.entitySize * 30)),
						msgDistance: (Game.entitySize * 8),
						bgColor: '',
						isModalFilled: true,
						id: Game.modalId,
						action: {
							method: function(id) {
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
		
		function arenaRobotDetails(reselect = false) {
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
						id: 'arena-background',
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
						posX: Game.placeEntityX(0.825, (Game.canvas.width * 0.57)),
						posY: Game.placeEntityY(0.35, (Game.canvas.height * 0.45)),
						width: (Game.canvas.width * 0.43),
						height: (Game.canvas.height * 0.855),
						lineWidth: 1,
						color: 'lightgrey',
						isFilled: true,
						id: 'directive-background',
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
			drawRobotPreview(
				function() {},
				function() {},
				function() {},
				function() {},
				function() {},
				function() {},
				function() {
					if (gameObject.selectedRobot.length > 0) {
						createRobotTitleStats(undefined, undefined, undefined, undefined);
					}
				}
			);
			for (let i = 0; i < 4; i++) {
				let directiveMsg = '';
				if (i === 0) {
					directiveMsg = 'Tank';
				} else if (i === 1) {
					directiveMsg = 'Warrior';
				} else if (i === 2) {
					directiveMsg = 'Support';
				} else if (i === 3) {
					directiveMsg = 'Lee-Roy';
				}
				Game.methodSetup = {
					method: function(id) {
						drawButton({
							posX: Game.placeEntityX(0.76, (Game.entitySize * 22.5)),
							posY: Game.placeEntityY(0.330 + (i * 0.125)),
							width: (Game.entitySize * 22),
							height: (Game.entitySize * 9),
							lineWidth: 1,
							btnColor: 'green',
							txtColor: 'white',
							font: '1em serif',
							msg: directiveMsg,
							isFilled: true,
							id: 'directive-' + (i + 1),
							action: { 
								method: function(id) {
									let msgs = [];
									if (i === 0) {
										msgs = ['Tank', 'Tanks will target towers before', 'getting to the enemy stronghold'];
									} else if (i === 1) {
										msgs = ['Warrior', 'Warriors will target troops before', 'getting to the enemy stronghold'];
									} else if (i === 2) {
										msgs = ['Support', 'Supports will target anything', 'before getting to the', 'enemy stronghold'];
									} else if (i === 3) {
										directiveMsg = 'Lee-Roy';
										msgs = ['Support', 'Lee-Roys will run past ', 'everything before getting to', 'the enemy stronghold'];
									}
									Game.methodSetup = {
										method: function(id) {
											drawDialogueModal({
												posX: Game.placeEntityX(0.45, (Game.entitySize * 40)),
												posY: Game.placeEntityY(0.40, (Game.entitySize * 30)),
												width: (Game.entitySize * 45),
												height: (Game.entitySize * 50),
												lineWidth: 1,
												modalColor: 'darkgrey',
												msgColor: 'white',
												msgFont: '1em serif',
												msgs: msgs,
												msgStart: Game.placeEntityY(0.45, (Game.entitySize * 30)),
												msgDistance: (Game.entitySize * 5),
												bgColor: '',
												isModalFilled: true,
												id: Game.modalId,
												action: {
													method: function(id) {}
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
												posX: Game.placeEntityX(0.47, (Game.entitySize * 40)),
												posY: Game.placeEntityY(0.72, (Game.entitySize * 30)),
												width: (Game.entitySize * 45) - (Game.canvas.width * 0.04),
												height: (Game.entitySize * 7),
												lineWidth: 1,
												btnColor: 'grey',
												txtColor: 'white',
												font: '1.3em serif',
												msg: 'Program',
												isFilled: true,
												id: 'Program-directive',
												action: { 
													method: function(id) {
														gameObject.robotArenaDesigns[gameObject.selectedRobotDesign].directive = i + 1;
														const modal = Game.methodObjects.find(build => build.id === Game.modalId);
														Game.deleteEntity(modal.methodId);
														arenaRobotDetails(reselect);
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
										method: function(id) {
											drawButton({
												posX: Game.placeEntityX(0.47, (Game.entitySize * 40)),
												posY: Game.placeEntityY(0.815, (Game.entitySize * 30)),
												width:(Game.entitySize * 45) - (Game.canvas.width * 0.04),
												height: (Game.entitySize * 7),
												lineWidth: 1,
												btnColor: 'grey',
												txtColor: 'white',
												font: '1.3em serif',
												msg: 'Cancel',
												isFilled: true,
												id: 'cancel-directive',
												action: { 
													method: function(id) { 
														const modal = Game.methodObjects.find(build => build.id === Game.modalId);
														Game.deleteEntity(modal.methodId);
														arenaRobotDetails(reselect);
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
							},
							isModalBtn: false,
							props: {},
							methodId: id
						});
					}
				};
				Game.addMethod(Game.methodSetup);
			}
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
						id: 'robot-detail-back-game',
						action: { 
							method: function(id) {
								if (reselect === true) {
									arenaPage.loadPage();
								} else {
									arenaRobotSelect();
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
					drawText({
						font: '2.3em serif',
						msg: 'Details',
						posX: Game.placeEntityX(0.50),
						posY: Game.placeEntityY(0.085),
						color: 'darkgrey',
						align: 'center',
						props: {},
						id: 'robot-detail-title',
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
			const robotStats = totalSelectedRobotStats();
			Game.methodSetup = {
				method: function(id) {
					drawText({
						font: '1em serif',
						msg: 'Attack: ' + robotStats.stats.att,
						posX: Game.placeEntityX(0.09),
						posY: Game.placeEntityY(0.69),
						color: 'grey',
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
						msg: 'Defense: ' + robotStats.stats.def,
						posX: Game.placeEntityX(0.09),
						posY: Game.placeEntityY(0.74),
						color: 'grey',
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
						msg: 'Speed: ' + robotStats.stats.spd,
						posX: Game.placeEntityX(0.09),
						posY: Game.placeEntityY(0.79),
						color: 'grey',
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
						msg: 'AI: ' + robotStats.stats.ai,
						posX: Game.placeEntityX(0.09),
						posY: Game.placeEntityY(0.84),
						color: 'grey',
						align: 'left',
						props: {},
						id: 'ai-stat',
						methodId: id
					});
				}
			};
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				method: function(id) {
					drawText({
						font: '1em serif',
						msg: 'Storage: ' + robotStats.stats.storage,
						posX: Game.placeEntityX(0.09),
						posY: Game.placeEntityY(0.88),
						color: 'grey',
						align: 'left',
						props: {},
						id: 'storage-stat',
						methodId: id
					});
				}
			};
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
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
						msg: !reselect ? 'Select' : 'Reselect',
						isFilled: true,
						id: 'select-robot',
						action: { method: function(id) {
							if (!reselect) {
								gameObject.robotArenaDesigns[gameObject.selectedRobotDesign].robotParts = gameObject.selectedRobot;
								arenaPage.loadPage();
							} else {
								arenaRobotSelect();
							}
						}},
						isModalBtn: false,
						props: {},
						methodId: id
					});
				}
			};
			Game.addMethod(Game.methodSetup);
			selectDirective();
		}
		function selectDirective() {
			setTimeout(function() {
				clearRobotPreviewHighlight();
				const highlight = Game.methodObjects.find(item => item.id === 'directive-' + gameObject.robotArenaDesigns[gameObject.selectedRobotDesign].directive);
				if (highlight) {
					highlight.btnColor = 'yellow';
					highlight.txtColor = 'black';
				}
			}, 100);
		}
		function clearRobotPreviewHighlight() {
			for (let i = 1; i <= 4; i++) {
				const highlight = Game.methodObjects.find(item => item.id === 'directive-' + i);
				if (highlight) {
					highlight.btnColor = 'green';
					highlight.txtColor = 'white';
				}
				
			}
		}
		function createRobotTitleStats(existingPart, part, confirmed, partChanged) {
			Game.methodSetup = {
				method: function(id) {
					drawText({
						font: '2em serif',
						msg: 'Directive',
						posX: Game.placeEntityX(0.76),
						posY: Game.placeEntityY(0.20),
						color: 'grey',
						align: 'center',
						props: {},
						id: 'directive-title',
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
						id: 'robot-detail-title',
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
			
			clearSelectedRobotDetails();
		}
		
		function clearSelectedRobotDetails() {
			// clear the titles
			const directiveTitle = Game.methodObjects.filter(x => x.id === 'directive-title');
			if (directiveTitle) {
				directiveTitle.forEach((item, i) => {
					Game.deleteEntity(item.methodId);
				});
			}
			const detailTitle = Game.methodObjects.filter(x => x.id === 'robot-detail-title');
			if (detailTitle) {
				detailTitle.forEach((item, i) => {
					Game.deleteEntity(item.methodId);
				});
			}
			const statTitle = Game.methodObjects.filter(x => x.id === 'stat-title');
			if (statTitle) {
				statTitle.forEach((item, i) => {
					Game.deleteEntity(item.methodId);
				});
			}
		}
	}
	
}
