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

const arenaPage = {
	description: 'This is where the player can compete for prizes',
	loadPage: function() {
		function arenaMenuSelect() {
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
						id: 'arena-background',
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
						posX: Aurora.placeEntityX(0.03),
						posY: Aurora.placeEntityY(0.03),
						width: (Aurora.entitySize * 12),
						height: (Aurora.entitySize * 7),
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
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawText({
						font: '2.3em serif',
						msg: 'Arena',
						posX: Aurora.placeEntityX(0.50),
						posY: Aurora.placeEntityY(0.085),
						color: 'darkgrey',
						align: 'center',
						props: {},
						id: 'arena-title',
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawRect({
						posX: Aurora.placeEntityX(0.255, (Aurora.canvas.width * 0.45)),
						posY: Aurora.placeEntityY(0.35, (Aurora.canvas.height * 0.45)),
						width: (Aurora.canvas.width * 0.94),
						height: (Aurora.canvas.height * 0.855),
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
			Aurora.addMethod(Aurora.methodSetup);
			
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
				
				Aurora.methodSetup = {
					method: function(id) {
						drawRect({
							posX: Aurora.placeEntityX(posX, (Aurora.entitySize * posXoffset)),
							posY: Aurora.placeEntityY(posY, (Aurora.entitySize * posYoffset)),
							width: (Aurora.canvas.width * 0.25),
							height: (Aurora.entitySize * 20),
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
				Aurora.addMethod(Aurora.methodSetup);
				drawRobotSelect(
					Aurora.placeEntityX(posX, (Aurora.entitySize * posXoffset)),
					Aurora.placeEntityY(posY, (Aurora.entitySize * posYoffset)),
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
								arenaRobotDetails(true);
							}
							
						} else {
							noRobotDesignModal();
						}
					}
				);
				
			}
			drawRobotSelectParts();
			
			Aurora.methodSetup = {
				method: function(id) {
					drawText({
						font: '2.3em serif',
						msg: 'Team',
						posX: Aurora.placeEntityX(0.50),
						posY: Aurora.placeEntityY(0.20),
						color: 'grey',
						align: 'center',
						props: {},
						id: 'arena-title',
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			
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
				Aurora.methodSetup = {
					method: function(id) {
						drawRect({
							posX: Aurora.placeEntityX(posX, (Aurora.entitySize * posXoffset)),
							posY: Aurora.placeEntityY(posY, (Aurora.entitySize * posYoffset)),
							width: (Aurora.canvas.width * 0.25),
							height: (Aurora.entitySize * 20),
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
				Aurora.addMethod(Aurora.methodSetup);
				
				drawTowerSelect(
					Aurora.placeEntityX(posX, (Aurora.entitySize * posXoffset)),
					Aurora.placeEntityY(posY, (Aurora.entitySize * posYoffset)),
					gameObject.towerArenaDesigns[i].arenaTower,
					i,
					function() {
						if (gameObject.towerArenaDesigns[i]?.arenaTower?.towerId) {
							arenaTowerDetails(gameObject.towerArenaDesigns[i].arenaTower, i, true, false);
						} else {
							arenaTowerSelect(i);
						}
					}
				);
				
			}
			
			Aurora.methodSetup = {
				method: function(id) {
					drawText({
						font: '2.3em serif',
						msg: 'Tower Defense',
						posX: Aurora.placeEntityX(0.50),
						posY: Aurora.placeEntityY(0.50),
						color: 'grey',
						align: 'center',
						props: {},
						id: 'arena-title',
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			
			Aurora.methodSetup = {
				method: function(id) {
					drawButton({
						posX: Aurora.placeEntityX(0.925, (Aurora.entitySize * 47)),
						posY: Aurora.placeEntityY(0.90),
						width: (Aurora.entitySize * 25),
						height: (Aurora.entitySize * 7),
						lineWidth: 1,
						btnColor: 'grey',
						txtColor: 'white',
						font: '1.5em serif',
						msg: 'Play',
						isFilled: true,
						id: 'play-game',
						action: { 
							method: function(id) {
								let selectedRobots = 0;
								gameObject.robotArenaDesigns.forEach((design, i) => {
									if (design.robotParts.length === 6) {
										selectedRobots++;
									}
								});
								let selectedTower = 0;
								gameObject.towerArenaDesigns.forEach((design, i) => {
									if (design.arenaTower?.towerId !== undefined) {
										selectedTower++;
									}
								});
								
								if (selectedRobots >= 1 && selectedTower >= 1) {
									if (gameObject.gameSounds) {
										selectSound.cloneNode(true).play();
									}
									// future Jordan, add the final tutorial here
									maulPage.loadPage();
								} else {
									let msgs = ['Select At Least', 'One Robot and Tower', 'Tap here to continue'];
									Aurora.methodSetup = {
										method: function(id) {
											drawDialogueModal({
												posX: Aurora.placeEntityX(0.45, (Aurora.entitySize * 40)),
												posY: Aurora.placeEntityY(0.40, (Aurora.entitySize * 30)),
												width: (Aurora.entitySize * 45),
												height: (Aurora.entitySize * 25),
												lineWidth: 1,
												modalColor: 'grey',
												msgColor: 'white',
												msgFont: '1em serif',
												msgs: msgs,
												msgStart: Aurora.placeEntityY(0.45, (Aurora.entitySize * 30)),
												msgDistance: (Aurora.entitySize * 8),
												bgColor: '',
												isModalFilled: true,
												id: Aurora.modalId,
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
									Aurora.addMethod(Aurora.methodSetup);
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
			
			Aurora.pageResized = {
				section: 'arena-robot-select',
				method: function() {
					const modal = Aurora.methodObjects.find(build => build.id === Aurora.modalId);
					if (modal) {
						Aurora.deleteEntity(modal.methodId);
						setTimeout(function() {
							Aurora.methodSetup = {
								method: function(id) {
									drawDialogueModal({
										posX: Aurora.placeEntityX(0.45, (Aurora.entitySize * 40)),
										posY: Aurora.placeEntityY(0.40, (Aurora.entitySize * 30)),
										width: (Aurora.entitySize * 45),
										height: (Aurora.entitySize * 25),
										lineWidth: modal.lineWidth,
										modalColor: modal.modalColor,
										msgColor: modal.msgColor,
										msgFont: modal.msgFont,
										msgs: modal.msgs,
										msgStart: Aurora.placeEntityY(0.45, (Aurora.entitySize * 30)),
										msgDistance: (Aurora.entitySize * 8),
										bgColor: modal.bgColor,
										isModalFilled: modal.isModalFilled,
										id: Aurora.modalId,
										action: modal.action,
										isModalBtn: modal.isModalBtn,
										props: {},
										methodId: id
									});
								}
							};
							Aurora.addMethod(Aurora.methodSetup);
						}, 150);
					}
					arenaPage.loadPage();
				}
			}
			if (gameObject.tutorialStep === 13) {
				tutorialArena();
			}
		}
		arenaMenuSelect();
		function arenaRobotSelect(selectedTower, arenaTowerIndex = -1, reselect = false, standardDirective = true) {
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
						id: 'arena-robot-select-background',
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
						posX: Aurora.placeEntityX(0.03),
						posY: Aurora.placeEntityY(0.03),
						width: (Aurora.entitySize * 12),
						height: (Aurora.entitySize * 7),
						lineWidth: 1,
						btnColor: 'darkgrey',
						txtColor: 'white',
						font: '1.5em serif',
						msg: 'Back',
						isFilled: true,
						id: 'arena-robot-select-back-game',
						action: { 
							method: function(id) {
								gameObject.partPageIndex = 0;
								if (arenaTowerIndex === -1) {
									gameObject.selectedRobot = [];
									gameObject.selectedRobotDesign = -1;
									arenaPage.loadPage();
								} else {
									let reselectTower = false;
									if (gameObject.towerArenaDesigns[arenaTowerIndex].arenaTower?.towerId) {
										reselectTower = true;
									}
									let standardDirective = false;
									if (gameObject.towerArenaDesigns[arenaTowerIndex].directive === 2) {
										standardDirective = true;
									}
									arenaTowerDetails(selectedTower, arenaTowerIndex, reselectTower, standardDirective);
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
			Aurora.methodSetup = {
				method: function(id) {
					drawText({
						font: '2.3em serif',
						msg: 'Select',
						posX: Aurora.placeEntityX(0.50),
						posY: Aurora.placeEntityY(0.085),
						color: 'darkgrey',
						align: 'center',
						props: {},
						id: 'arena-robot-select-title',
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawRect({
						posX: Aurora.placeEntityX(0.255, (Aurora.canvas.width * 0.45)),
						posY: Aurora.placeEntityY(0.35, (Aurora.canvas.height * 0.45)),
						width: (Aurora.canvas.width * 0.94),
						height: (Aurora.canvas.height * 0.855),
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
			Aurora.addMethod(Aurora.methodSetup);
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
				
				Aurora.methodSetup = {
					method: function(id) {
						drawRect({
							posX: Aurora.placeEntityX(posX, (Aurora.entitySize * posXoffset)),
							posY: Aurora.placeEntityY(posY, (Aurora.entitySize * posYoffset)),
							width: (Aurora.canvas.width * 0.25),
							height: (Aurora.entitySize * 20),
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
				Aurora.addMethod(Aurora.methodSetup);
				drawRobotSelect(
					Aurora.placeEntityX(posX, (Aurora.entitySize * posXoffset)),
					Aurora.placeEntityY(posY, (Aurora.entitySize * posYoffset)),
					gameObject.robotTeams[i].robotParts,
					i,
					function() {
						gameObject.selectedRobot = gameObject.robotTeams[i].robotParts;
						arenaRobotDetails(false, arenaTowerIndex, selectedTower);
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
			drawNextPrevRobotList(gameObject.robotTeams, function() { arenaRobotSelect(selectedTower, arenaTowerIndex, reselect, standardDirective); });
		}
		function arenaTowerSelect(arenaTowerIndex) {
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
						id: 'arena-tower-select-background',
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
						posX: Aurora.placeEntityX(0.03),
						posY: Aurora.placeEntityY(0.03),
						width: (Aurora.entitySize * 12),
						height: (Aurora.entitySize * 7),
						lineWidth: 1,
						btnColor: 'darkgrey',
						txtColor: 'white',
						font: '1.5em serif',
						msg: 'Back',
						isFilled: true,
						id: 'arena-tower-select-back-game',
						action: { 
							method: function(id) {
								arenaPage.loadPage();
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
					drawText({
						font: '2.3em serif',
						msg: 'Select',
						posX: Aurora.placeEntityX(0.50),
						posY: Aurora.placeEntityY(0.085),
						color: 'darkgrey',
						align: 'center',
						props: {},
						id: 'arena-tower-select-title',
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawRect({
						posX: Aurora.placeEntityX(0.255, (Aurora.canvas.width * 0.45)),
						posY: Aurora.placeEntityY(0.35, (Aurora.canvas.height * 0.45)),
						width: (Aurora.canvas.width * 0.94),
						height: (Aurora.canvas.height * 0.855),
						lineWidth: 1,
						color: 'lightgrey',
						isFilled: true,
						id: 'arena-tower-select-background',
						isBackground: true,
						props: {},
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			let robotCount = 0;
			let robotSelectRow = 1;
			for (let i = gameObject.partPageIndex; i < arenaTowers.length; i++) {
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
				arenaTowers.length >= 3) {
					posX = 0.689;
					posXoffset = 1;
				} 	
				
				Aurora.methodSetup = {
					method: function(id) {
						drawRect({
							posX: Aurora.placeEntityX(posX, (Aurora.entitySize * posXoffset)),
							posY: Aurora.placeEntityY(posY, (Aurora.entitySize * posYoffset)),
							width: (Aurora.canvas.width * 0.25),
							height: (Aurora.entitySize * 20),
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
				Aurora.addMethod(Aurora.methodSetup);
				
				previewTower(
					Aurora.placeEntityX(posX, (Aurora.entitySize * posXoffset)),
					Aurora.placeEntityY(posY, (Aurora.entitySize * posYoffset)),
					arenaTowers[i],
					i,
					function() {
						arenaTowerDetails(arenaTowers[i], arenaTowerIndex);
					},
					true
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
			drawNextPrevRobotList(arenaTowers, function(){ arenaTowerSelect(arenaTowerIndex); });
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
			Aurora.methodSetup = {
				method: function(id) {
					drawDialogueModal({
						posX: Aurora.placeEntityX(0.45, (Aurora.entitySize * 40)),
						posY: Aurora.placeEntityY(0.40, (Aurora.entitySize * 30)),
						width: (Aurora.entitySize * 45),
						height: (Aurora.entitySize * 25),
						lineWidth: 1,
						modalColor: 'grey',
						msgColor: 'white',
						msgFont: '1em serif',
						msgs: msg,
						msgStart: Aurora.placeEntityY(0.45, (Aurora.entitySize * 30)),
						msgDistance: (Aurora.entitySize * 8),
						bgColor: '',
						isModalFilled: true,
						id: Aurora.modalId,
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
			Aurora.addMethod(Aurora.methodSetup);
		}
		function arenaRobotDetails(reselect = false, arenaTowerIndex, selectedTower) {
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
						id: 'arena-background',
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
						posX: Aurora.placeEntityX(0.255, (Aurora.canvas.width * 0.45)),
						posY: Aurora.placeEntityY(0.35, (Aurora.canvas.height * 0.45)),
						width: (Aurora.canvas.width * 0.45),
						height: (Aurora.canvas.height * 0.45),
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
					drawRect({
						posX: Aurora.placeEntityX(0.825, (Aurora.canvas.width * 0.57)),
						posY: Aurora.placeEntityY(0.35, (Aurora.canvas.height * 0.45)),
						width: (Aurora.canvas.width * 0.43),
						height: (Aurora.canvas.height * 0.855),
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
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawRect({
						posX: Aurora.placeEntityX(0.255, (Aurora.canvas.width * 0.45)),
						posY: Aurora.placeEntityY(0.815, (Aurora.canvas.height * 0.45)),
						width: (Aurora.canvas.width * 0.45),
						height: (Aurora.canvas.height * 0.39),
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
			Aurora.addMethod(Aurora.methodSetup);
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
			const directiveReadyList = []; // future Jordan, when these directives are ready, remove this
			for (let i = 0; i < 4; i++) {
				let directiveMsg = '';
				if (i === 0) {
					directiveMsg = 'Tank';
					directiveReadyList.push(true);
				} else if (i === 1) {
					directiveMsg = 'Warrior';
					directiveReadyList.push(false);
				} else if (i === 2) {
					directiveMsg = 'Support';
					directiveReadyList.push(false);
				} else if (i === 3) {
					directiveMsg = 'Lee-Roy';
					directiveReadyList.push(true);
				}
				
				Aurora.methodSetup = {
					method: function(id) {
						drawButton({
							posX: Aurora.placeEntityX(0.76, (Aurora.entitySize * 22.5)),
							posY: Aurora.placeEntityY(0.330 + (i * 0.125)),
							width: (Aurora.entitySize * 22),
							height: (Aurora.entitySize * 9),
							lineWidth: 1,
							btnColor: (arenaTowerIndex === -1 || arenaTowerIndex === undefined) && directiveReadyList[i] ? 'green' : '#C0C0C0',
							txtColor: 'white',
							font: '1em serif',
							msg: directiveMsg,
							isFilled: true,
							id: 'directive-' + (i + 1),
							action: { 
								method: function(id) {
									if ((arenaTowerIndex === -1 || arenaTowerIndex === undefined) && directiveReadyList[i]) {
										let msgs = [];
										if (i === 0) {
											msgs = ['Tank', '- In Game Cost: $' + gameObject.robotDirectiveCost.d1 + ' -', 'Tanks will target towers before', 'getting to the enemy base'];
										} else if (i === 1) {
											msgs = ['Warrior', '- In Game Cost: $' + gameObject.robotDirectiveCost.d2 + ' -', 'Warriors will target troops before', 'getting to the enemy base'];
										} else if (i === 2) {
											msgs = ['Support', '- In Game Cost: $' + gameObject.robotDirectiveCost.d3 + ' -', 'Supports will heal fellow robots', 'before getting to the', 'enemy base'];
										} else if (i === 3) {
											msgs = ['Lee-Roy', '- In Game Cost: $' + gameObject.robotDirectiveCost.d4 + ' -', 'Lee-Roys will run past ', 'everything before getting to', 'the enemy base'];
										}
										Aurora.methodSetup = {
											method: function(id) {
												drawDialogueModal({
													posX: Aurora.placeEntityX(0.45, (Aurora.entitySize * 40)),
													posY: Aurora.placeEntityY(0.40, (Aurora.entitySize * 30)),
													width: (Aurora.entitySize * 45),
													height: (Aurora.entitySize * 50),
													lineWidth: 1,
													modalColor: 'darkgrey',
													msgColor: 'white',
													msgFont: '1em serif',
													msgs: msgs,
													msgStart: Aurora.placeEntityY(0.45, (Aurora.entitySize * 30)),
													msgDistance: (Aurora.entitySize * 5),
													bgColor: '',
													isModalFilled: true,
													id: Aurora.modalId,
													action: {
														method: function(id) {}
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
													posX: Aurora.placeEntityX(0.47, (Aurora.entitySize * 40)),
													posY: Aurora.placeEntityY(0.72, (Aurora.entitySize * 30)),
													width: (Aurora.entitySize * 45) - (Aurora.canvas.width * 0.04),
													height: (Aurora.entitySize * 7),
													lineWidth: 1,
													btnColor: 'grey',
													txtColor: 'white',
													font: '1.3em serif',
													msg: 'Program',
													isFilled: true,
													id: 'Program-directive',
													action: { 
														method: function(id) {
															if (gameObject.gameSounds) {
																selectSound.cloneNode(true).play();
															}
															gameObject.robotArenaDesigns[gameObject.selectedRobotDesign].directive = i + 1;
															const modal = Aurora.methodObjects.find(build => build.id === Aurora.modalId);
															Aurora.deleteEntity(modal.methodId);
															arenaRobotDetails(reselect, arenaTowerIndex, selectedTower);
														}
													},
													isModalBtn: true,
													props: {},
													methodId: id
												});
											}
										};
										Aurora.addMethod(Aurora.methodSetup);
										Aurora.methodSetup = {
											method: function(id) {
												drawButton({
													posX: Aurora.placeEntityX(0.47, (Aurora.entitySize * 40)),
													posY: Aurora.placeEntityY(0.815, (Aurora.entitySize * 30)),
													width:(Aurora.entitySize * 45) - (Aurora.canvas.width * 0.04),
													height: (Aurora.entitySize * 7),
													lineWidth: 1,
													btnColor: 'grey',
													txtColor: 'white',
													font: '1.3em serif',
													msg: 'Cancel',
													isFilled: true,
													id: 'cancel-directive',
													action: { 
														method: function(id) { 
															const modal = Aurora.methodObjects.find(build => build.id === Aurora.modalId);
															Aurora.deleteEntity(modal.methodId);
															arenaRobotDetails(reselect, arenaTowerIndex, selectedTower);
														}
													},
													isModalBtn: true,
													props: {},
													methodId: id
												});
											}
										};
										Aurora.addMethod(Aurora.methodSetup);
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
			}
			Aurora.methodSetup = {
				method: function(id) {
					drawButton({
						posX: Aurora.placeEntityX(0.03),
						posY: Aurora.placeEntityY(0.03),
						width: (Aurora.entitySize * 12),
						height: (Aurora.entitySize * 7),
						lineWidth: 1,
						btnColor: 'darkgrey',
						txtColor: 'white',
						font: '1.5em serif',
						msg: 'Back',
						isFilled: true,
						id: 'robot-detail-back-game',
						action: { 
							method: function(id) {
								gameObject.partPageIndex = 0;
								if (arenaTowerIndex === undefined || arenaTowerIndex === -1) {
									if (reselect === true) {
										arenaPage.loadPage();
									} else {
										arenaRobotSelect();
									}
								} else {
									let reselectTower = false;
									if (gameObject.towerArenaDesigns[arenaTowerIndex].arenaTower?.towerId) {
										reselectTower = true;
									}
									let standardDirective = false;
									if (gameObject.towerArenaDesigns[arenaTowerIndex].directive === 2) {
										standardDirective = true;
									}
									arenaTowerDetails(selectedTower, arenaTowerIndex, reselectTower, standardDirective);
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
			Aurora.methodSetup = {
				method: function(id) {
					drawText({
						font: '2.3em serif',
						msg: 'Details',
						posX: Aurora.placeEntityX(0.50),
						posY: Aurora.placeEntityY(0.085),
						color: 'darkgrey',
						align: 'center',
						props: {},
						id: 'robot-detail-title',
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawText({
						font: '2.3em serif',
						msg: 'Stats',
						posX: Aurora.placeEntityX(0.247),
						posY: Aurora.placeEntityY(0.65),
						color: 'grey',
						align: 'center',
						props: {},
						id: 'stat-title',
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			const robotStats = totalSelectedRobotStats();
			Aurora.methodSetup = {
				method: function(id) {
					drawText({
						font: '1em serif',
						msg: 'Attack: ' + robotStats.stats.att,
						posX: Aurora.placeEntityX(0.09),
						posY: Aurora.placeEntityY(0.69),
						color: 'grey',
						align: 'left',
						props: {},
						id: 'att-stat',
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawText({
						font: '1em serif',
						msg: 'Defense: ' + robotStats.stats.def,
						posX: Aurora.placeEntityX(0.09),
						posY: Aurora.placeEntityY(0.74),
						color: 'grey',
						align: 'left',
						props: {},
						id: 'def-stat',
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawText({
						font: '1em serif',
						msg: 'Speed: ' + robotStats.stats.spd,
						posX: Aurora.placeEntityX(0.09),
						posY: Aurora.placeEntityY(0.79),
						color: 'grey',
						align: 'left',
						props: {},
						id: 'spd-stat',
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawText({
						font: '1em serif',
						msg: 'AI: ' + robotStats.stats.ai,
						posX: Aurora.placeEntityX(0.09),
						posY: Aurora.placeEntityY(0.84),
						color: 'grey',
						align: 'left',
						props: {},
						id: 'ai-stat',
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawText({
						font: '1em serif',
						msg: 'Storage: ' + robotStats.stats.storage,
						posX: Aurora.placeEntityX(0.09),
						posY: Aurora.placeEntityY(0.88),
						color: 'grey',
						align: 'left',
						props: {},
						id: 'storage-stat',
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawButton({
						posX: Aurora.placeEntityX(0.226, (Aurora.entitySize * 19.7)),
						posY: Aurora.placeEntityY(0.90),
						width: (Aurora.entitySize * 23),
						height: (Aurora.entitySize * 7),
						lineWidth: 1,
						btnColor: 'grey',
						txtColor: 'white',
						font: '1.5em serif',
						msg: !reselect ? 'Select' : 'Reselect',
						isFilled: true,
						id: 'select-robot',
						action: { 
							method: function(id) {
								if (gameObject.gameSounds) {
									selectSound.cloneNode(true).play();
								}
								gameObject.partPageIndex = 0;
								if (arenaTowerIndex === -1 || arenaTowerIndex === undefined) {
									if (!reselect) {
										gameObject.robotArenaDesigns[gameObject.selectedRobotDesign].robotParts = gameObject.selectedRobot;
										arenaPage.loadPage();
									} else {
										arenaRobotSelect();
									}
								} else {
									if (!reselect) {
										gameObject.towerArenaDesigns[arenaTowerIndex].robotParts = gameObject.selectedRobot;
										
										let standardDirective = false;
										if (gameObject.towerArenaDesigns[arenaTowerIndex].directive === 2) {
											standardDirective = true;
										}
										 arenaTowerDetails(selectedTower, arenaTowerIndex, false, standardDirective);
									} else {
										arenaRobotSelect();
									}
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
			if (arenaTowerIndex === -1 || arenaTowerIndex === undefined) { 
				selectRobotDirective();
				Aurora.pageResized = {
					section: 'arena-robot-details',
					method: function() {
						selectRobotDirective();
					}
				}
			}
		}
		function arenaTowerDetails(selectedTower, arenaTowerIndex, reselect = false, standardDirective = true) {
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
						id: 'arena-background',
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
						posX: Aurora.placeEntityX(0.255, (Aurora.canvas.width * 0.45)),
						posY: Aurora.placeEntityY(0.35, (Aurora.canvas.height * 0.45)),
						width: (Aurora.canvas.width * 0.45),
						height: (Aurora.canvas.height * 0.45),
						lineWidth: 1,
						color: 'lightgrey',
						isFilled: true,
						id: 'tower-background',
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
						posX: Aurora.placeEntityX(0.825, (Aurora.canvas.width * 0.57)),
						posY: Aurora.placeEntityY(0.35, (Aurora.canvas.height * 0.45)),
						width: (Aurora.canvas.width * 0.43),
						height: (Aurora.canvas.height * 0.855),
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
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawRect({
						posX: Aurora.placeEntityX(0.255, (Aurora.canvas.width * 0.45)),
						posY: Aurora.placeEntityY(0.815, (Aurora.canvas.height * 0.45)),
						width: (Aurora.canvas.width * 0.45),
						height: (Aurora.canvas.height * 0.39),
						lineWidth: 1,
						color: 'lightgrey',
						isFilled: true,
						id: 'tower-stat-background',
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
						font: '2em serif',
						msg: 'Directive',
						posX: Aurora.placeEntityX(0.76),
						posY: Aurora.placeEntityY(0.20),
						color: 'grey',
						align: 'center',
						props: {},
						id: 'directive-title',
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			
			if (selectedTower.type !== 'bunker') {
				selectedTower.robotParts = [];
			} else {
				selectedTower.robotParts = Object.assign([], gameObject.towerArenaDesigns[arenaTowerIndex].robotParts);
			}
			drawTowerDetail(selectedTower);
			
			Aurora.methodSetup = {
				method: function(id) {
					drawButton({
						posX: Aurora.placeEntityX(0.03),
						posY: Aurora.placeEntityY(0.03),
						width: (Aurora.entitySize * 12),
						height: (Aurora.entitySize * 7),
						lineWidth: 1,
						btnColor: 'darkgrey',
						txtColor: 'white',
						font: '1.5em serif',
						msg: 'Back',
						isFilled: true,
						id: 'tower-detail-back-game',
						action: { 
							method: function(id) {
								if (gameObject.towerArenaDesigns[arenaTowerIndex].arenaTower?.towerId === undefined) {
									gameObject.towerArenaDesigns[arenaTowerIndex].robotParts = [];
								}
								if (standardDirective && gameObject.towerArenaDesigns[arenaTowerIndex].arenaTower.type === 'bunker') {
									gameObject.towerArenaDesigns[arenaTowerIndex].directive = 2;
								}
								arenaPage.loadPage();
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
					drawText({
						font: '2.3em serif',
						msg: 'Details',
						posX: Aurora.placeEntityX(0.50),
						posY: Aurora.placeEntityY(0.085),
						color: 'darkgrey',
						align: 'center',
						props: {},
						id: 'tower-detail-title',
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawText({
						font: '1.1em serif',
						msg: selectedTower.name,
						posX: Aurora.placeEntityX(0.25, (Aurora.entitySize * 0.5)),
						posY: Aurora.placeEntityY(0.185),
						color: 'grey',
						align: 'center',
						props: {},
						id: 'tower-detail-name',
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawText({
						font: '2.3em serif',
						msg: 'Stats',
						posX: Aurora.placeEntityX(0.247),
						posY: Aurora.placeEntityY(0.65),
						color: 'grey',
						align: 'center',
						props: {},
						id: 'stat-title',
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawText({
						font: '1em serif',
						msg: 'Attack: ' + selectedTower.stats.att,
						posX: Aurora.placeEntityX(0.09),
						posY: Aurora.placeEntityY(0.69),
						color: 'grey',
						align: 'left',
						props: {},
						id: 'att-stat',
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawText({
						font: '1em serif',
						msg: 'Defense: ' + selectedTower.stats.def,
						posX: Aurora.placeEntityX(0.09),
						posY: Aurora.placeEntityY(0.74),
						color: 'grey',
						align: 'left',
						props: {},
						id: 'def-stat',
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawText({
						font: '1em serif',
						msg: 'Speed: ' + selectedTower.stats.spd,
						posX: Aurora.placeEntityX(0.09),
						posY: Aurora.placeEntityY(0.79),
						color: 'grey',
						align: 'left',
						props: {},
						id: 'spd-stat',
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawText({
						font: '1em serif',
						msg: 'HP: ' + selectedTower.stats.hp,
						posX: Aurora.placeEntityX(0.09),
						posY: Aurora.placeEntityY(0.84),
						color: 'grey',
						align: 'left',
						props: {},
						id: 'hp-stat',
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawText({
						font: '1em serif',
						msg: 'Splash: ' + selectedTower.stats.splash,
						posX: Aurora.placeEntityX(0.09),
						posY: Aurora.placeEntityY(0.88),
						color: 'grey',
						align: 'left',
						props: {},
						id: 'hp-stat',
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawButton({
						posX: Aurora.placeEntityX(0.226, (Aurora.entitySize * 19.7)),
						posY: Aurora.placeEntityY(0.90),
						width: (Aurora.entitySize * 23),
						height: (Aurora.entitySize * 7),
						lineWidth: 1,
						btnColor: selectedTower.type === 'bunker' && gameObject.towerArenaDesigns[arenaTowerIndex].robotParts.length !== 6 ? '#C0C0C0' : 'grey',
						txtColor: 'white',
						font: '1.5em serif',
						msg: !reselect ? 'Select' : 'Reselect',
						isFilled: true,
						id: 'select-tower',
						action: { 
							method: function(id) {
								if (gameObject.gameSounds) {
									selectSound.cloneNode(true).play();
								}
								gameObject.partPageIndex = 0;
								if (selectedTower.type !== 'bunker') {
									gameObject.towerArenaDesigns[arenaTowerIndex].robotParts = [];
									selectTower(reselect, selectedTower, arenaTowerIndex);
								} else if (selectedTower.type === 'bunker' && gameObject.towerArenaDesigns[arenaTowerIndex].robotParts.length === 6) {
									selectTower(reselect, selectedTower, arenaTowerIndex);
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
			function selectTower(reselect, selectedTower, arenaTowerIndex) {
				if (!reselect) {
					const cloneTower = Object.assign({}, selectedTower);
					gameObject.towerArenaDesigns[arenaTowerIndex].arenaTower = cloneTower;
					arenaPage.loadPage();
				} else {
					arenaTowerSelect(arenaTowerIndex);
				}
			}
			const directiveReadyList = []; // future Jordan, when these directives are ready, remove this
			for (let i = 0; i < 4; i++) {
				let directiveMsg = '';
				if (i === 0) {
					directiveMsg = selectedTower.type === 'bunker' ? 'Select Robot' : 'Standard';
					directiveReadyList.push(true);
				} else if (i === 1) {
					directiveMsg = selectedTower.type === 'bunker' ? 'Standard' : 'Splash-Shot';
					directiveReadyList.push(false);
				} else if (i === 2) {
					directiveMsg = selectedTower.type === 'bunker' ? 'Rapid' : 'Rapid-Shot';
					directiveReadyList.push(true);
				} else if (i === 3) {
					directiveMsg = selectedTower.type === 'bunker' ? 'Defense' : 'Ram-Shot';
					directiveReadyList.push(false);
				}
				Aurora.methodSetup = {
					method: function(id) {
						drawButton({
							posX: Aurora.placeEntityX(0.76, (Aurora.entitySize * 22.5)),
							posY: Aurora.placeEntityY(0.330 + (i * 0.125)),
							width: (Aurora.entitySize * 22),
							height: (Aurora.entitySize * 9),
							lineWidth: 1,
							btnColor: (selectedTower.type === 'bunker' && i === 0) || !directiveReadyList[i] ? '#C0C0C0' : 'green', // the color here should be grey or green
							txtColor: 'white',
							font: '1em serif',
							msg: directiveMsg,
							isFilled: true,
							id: 'directive-' + (i + 1),
							action: { 
								method: function(id) {
									if (directiveReadyList[i]) {
										let msgs = [];
										let selectRobot = false;
										if (i === 0) {
											if (selectedTower.type === 'bunker') {
												selectRobot = true;
											} else {
												msgs = ['Standard', '- In Game Cost: $' + gameObject.towerDirectiveCost.d1 + ' -', 'Tower will attack at', 'a standard rate'];
											}
										} else if (i === 1) {
											if (selectedTower.type === 'bunker') {
												msgs = ['Standard', '- In Game Cost: $' + gameObject.bunkerDirectiveCost.d1 + ' -', 'Bunker will create', ' 2 robots a turn'];
											} else {
												msgs = ['Splash-Shot', '- In Game Cost: $' + gameObject.towerDirectiveCost.d2 + ' -', 'Tower will gain splash', 'but will attack slower'];
											}
										} else if (i === 2) {
											if (selectedTower.type === 'bunker') {
												msgs = ['Rapid', '- In Game Cost: $' + gameObject.bunkerDirectiveCost.d2 + ' -', 'Bunker will create 3', 'robots a turn but', 'will lose some HP'];
											} else {
												msgs = ['Rapid-Shot', '- In Game Cost: $' + gameObject.towerDirectiveCost.d3 + ' -', 'Tower will attack faster but will', 'lose some attack and HP'];
											}
										} else if (i === 3) {
											if (selectedTower.type === 'bunker') {
												msgs = ['Defense', '- In Game Cost: $' + gameObject.bunkerDirectiveCost.d3 + ' -', 'Bunker will create 1 robot', 'a turn but will gain', 'attack and splash'];
											} else {
												msgs = ['Ram-Shot', '- In Game Cost: $' + gameObject.towerDirectiveCost.d4 + ' -', 'Tower will get added attack', 'and splash but lose some speed'];
											}
										}
										if (selectRobot) {
											// select a robot
											arenaRobotSelect(selectedTower, arenaTowerIndex);
										} else {
											Aurora.methodSetup = {
												method: function(id) {
													drawDialogueModal({
														posX: Aurora.placeEntityX(0.45, (Aurora.entitySize * 40)),
														posY: Aurora.placeEntityY(0.40, (Aurora.entitySize * 30)),
														width: (Aurora.entitySize * 45),
														height: (Aurora.entitySize * 50),
														lineWidth: 1,
														modalColor: 'darkgrey',
														msgColor: 'white',
														msgFont: '1em serif',
														msgs: msgs,
														msgStart: Aurora.placeEntityY(0.45, (Aurora.entitySize * 30)),
														msgDistance: (Aurora.entitySize * 5),
														bgColor: '',
														isModalFilled: true,
														id: Aurora.modalId,
														action: {
															method: function(id) {}
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
														posX: Aurora.placeEntityX(0.47, (Aurora.entitySize * 40)),
														posY: Aurora.placeEntityY(0.72, (Aurora.entitySize * 30)),
														width: (Aurora.entitySize * 45) - (Aurora.canvas.width * 0.04),
														height: (Aurora.entitySize * 7),
														lineWidth: 1,
														btnColor: 'grey',
														txtColor: 'white',
														font: '1.3em serif',
														msg: 'Program',
														isFilled: true,
														id: 'Program-directive',
														action: { 
															method: function(id) {
																if (gameObject.gameSounds) {
																	selectSound.cloneNode(true).play();
																}
																gameObject.towerArenaDesigns[arenaTowerIndex].directive = i + 1;
																// apply the stat changes
																const cloneTower = Object.assign({}, selectedTower);
																cloneTower.stats = Object.assign({}, selectedTower.stats);
																if (cloneTower.type === 'bunker') {
																	// find the default tower stats
																	cloneTower.stats = Object.assign({}, arenaTowers.find(x => x.towerId === selectedTower.towerId).stats);
																	// directive 1 is select robot
																	if (i + 1 === 2) { // standard
																		// use the default tower stats
																	} else if (i + 1 === 3) { // rapid
																		cloneTower.stats.hp -= 5;
																	} else if (i + 1 === 4) { // defense
																		cloneTower.stats.att += 2;
																		cloneTower.stats.spd += 1;
																		cloneTower.stats.splash += 1;
																	}
																	if (reselect) {
																		gameObject.towerArenaDesigns[arenaTowerIndex].arenaTower.stats = Object.assign({}, cloneTower.stats);
																	}
																} else {
																	// find the default tower stats
																	cloneTower.stats = Object.assign({}, arenaTowers.find(x => x.towerId === selectedTower.towerId).stats);
																	if (i + 1 === 1) { // standard
																		// use the default tower stats
																	} else if (i + 1 === 2) { // splash shot
																		cloneTower.stats.att -= 1;
																		cloneTower.stats.spd -= 2;
																		cloneTower.stats.splash += 3;
																	} else if (i + 1 === 3) { // rapid shot
																		cloneTower.stats.spd += 3;
																		cloneTower.stats.att -= 2;
																		cloneTower.stats.hp -= 5;
																	} else if (i + 1 === 4) { // ram shot
																		cloneTower.stats.att += 2;
																		cloneTower.stats.spd -= 2;
																		cloneTower.stats.splash += 1;
																	}
																	if (reselect) {
																		gameObject.towerArenaDesigns[arenaTowerIndex].arenaTower.stats = Object.assign({}, cloneTower.stats);
																	}
																}
																const modal = Aurora.methodObjects.find(build => build.id === Aurora.modalId);
																Aurora.deleteEntity(modal.methodId);
																
																arenaTowerDetails(cloneTower, arenaTowerIndex, reselect, false);
															}
														},
														isModalBtn: true,
														props: {},
														methodId: id
													});
												}
											};
											Aurora.addMethod(Aurora.methodSetup);
											Aurora.methodSetup = {
												method: function(id) {
													drawButton({
														posX: Aurora.placeEntityX(0.47, (Aurora.entitySize * 40)),
														posY: Aurora.placeEntityY(0.815, (Aurora.entitySize * 30)),
														width:(Aurora.entitySize * 45) - (Aurora.canvas.width * 0.04),
														height: (Aurora.entitySize * 7),
														lineWidth: 1,
														btnColor: 'grey',
														txtColor: 'white',
														font: '1.3em serif',
														msg: 'Cancel',
														isFilled: true,
														id: 'cancel-directive',
														action: { 
															method: function(id) { 
																const modal = Aurora.methodObjects.find(build => build.id === Aurora.modalId);
																Aurora.deleteEntity(modal.methodId);
																arenaTowerDetails(selectedTower, arenaTowerIndex, reselect, false);
															}
														},
														isModalBtn: true,
														props: {},
														methodId: id
													});
												}
											};
											Aurora.addMethod(Aurora.methodSetup);
										}
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
			}
			if (selectedTower.type === 'bunker' && standardDirective) {
				gameObject.towerArenaDesigns[arenaTowerIndex].directive = 2;
			} else if (standardDirective) {
				gameObject.towerArenaDesigns[arenaTowerIndex].directive = 1;
			}
			selectTowerDirective(arenaTowerIndex, selectedTower);
			
			Aurora.pageResized = {
				section: 'arena-tower-details',
				method: function() {
					if (selectedTower.type === 'bunker') {
						gameObject.towerArenaDesigns[arenaTowerIndex].directive = 2;
					} else {
						gameObject.towerArenaDesigns[arenaTowerIndex].directive = 1;
					}
					selectTowerDirective(arenaTowerIndex, selectedTower);
				}
			}
		}
		function selectRobotDirective() {
			setTimeout(function() {
				clearRobotPreviewHighlight();
				const highlight = Aurora.methodObjects.find(item => item.id === 'directive-' + gameObject.robotArenaDesigns[gameObject.selectedRobotDesign].directive);
				if (highlight) {
					highlight.btnColor = 'yellow';
					highlight.txtColor = 'black';
				}
			}, 100);
		}
		function clearRobotPreviewHighlight() {
			for (let i = 1; i <= 4; i++) {
				const highlight = Aurora.methodObjects.find(item => item.id === 'directive-' + i);
				if (highlight) {
					if (i !== 2 && i !== 3) { 
						highlight.btnColor = 'green';
						highlight.txtColor = 'white';
					}
				}
				
			}
		}
		function selectTowerDirective(arenaTowerIndex, selectedTower) {
			setTimeout(function() {
				clearTowerPreviewHighlight(selectedTower);
				const highlight = Aurora.methodObjects.find(item => item.id === 'directive-' + gameObject.towerArenaDesigns[arenaTowerIndex].directive);
				if (highlight) {
					highlight.btnColor = 'yellow';
					highlight.txtColor = 'black';
				}
			}, 100);
		}
		function clearTowerPreviewHighlight(selectedTower) {
			for (let i = 1; i <= 4; i++) {
				const highlight = Aurora.methodObjects.find(item => item.id === 'directive-' + i);
				if (highlight) { // future Jordan, when the robot directives are ready, remove || (i === 2 || i === 4). The color should be grey or green
					highlight.btnColor = (selectedTower.type === 'bunker' && i === 1) || (i === 2 || i === 4) ? '#C0C0C0' : 'green';
					highlight.txtColor = 'white';
				}
				
			}
		}
		function createRobotTitleStats(existingPart, part, confirmed, partChanged) {
			Aurora.methodSetup = {
				method: function(id) {
					drawText({
						font: '2em serif',
						msg: 'Directive',
						posX: Aurora.placeEntityX(0.76),
						posY: Aurora.placeEntityY(0.20),
						color: 'grey',
						align: 'center',
						props: {},
						id: 'directive-title',
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawText({
						font: '2.3em serif',
						msg: 'Details',
						posX: Aurora.placeEntityX(0.50),
						posY: Aurora.placeEntityY(0.085),
						color: 'darkgrey',
						align: 'center',
						props: {},
						id: 'robot-detail-title',
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawText({
						font: '2.3em serif',
						msg: 'Stats',
						posX: Aurora.placeEntityX(0.247),
						posY: Aurora.placeEntityY(0.65),
						color: 'grey',
						align: 'center',
						props: {},
						id: 'stat-title',
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			
			clearSelectedRobotDetails();
		}
		function clearSelectedRobotDetails() {
			// clear the titles
			const directiveTitle = Aurora.methodObjects.filter(x => x.id === 'directive-title');
			if (directiveTitle) {
				directiveTitle.forEach((item, i) => {
					Aurora.deleteEntity(item.methodId);
				});
			}
			const detailTitle = Aurora.methodObjects.filter(x => x.id === 'robot-detail-title');
			if (detailTitle) {
				detailTitle.forEach((item, i) => {
					Aurora.deleteEntity(item.methodId);
				});
			}
			const statTitle = Aurora.methodObjects.filter(x => x.id === 'stat-title');
			if (statTitle) {
				statTitle.forEach((item, i) => {
					Aurora.deleteEntity(item.methodId);
				});
			}
		}
		function drawTowerSelect(posX, posY, towerDesign, index, action) {
			previewTower(posX, posY, towerDesign, index, action);
			if (gameObject.towerArenaDesigns[index].robotParts.length === 6) {
				Aurora.methodSetup = {
					method: function(id) {
						drawButton({
							posX: posX + (Aurora.entityWidth * 12.15) - (Aurora.entitySize * 1.3),
							posY: posY + (Aurora.canvas.height * 0.11),
							width: (Aurora.entitySize * 3),
							height: (Aurora.entitySize * 3),
							lineWidth: 1,
							btnColor: drawRobotSelectPreviewParts('chassis', gameObject.towerArenaDesigns[index].robotParts),
							txtColor: 'white',
							font: '1.5em serif',
							msg: '',
							isFilled: true,
							id: 'preview-robot',
							action: {
								method: function(id) {
									action();
								}
							},
							isModalBtn: false,
							props: {
								drawHead: function(parent) {
									Aurora.methodSetup = {
										method: function(id) {
											drawButton({
												posX: parent.posX + (Aurora.entitySize * 0.3),
												posY: parent.posY - (Aurora.entitySize * 2.5),
												width: (Aurora.entitySize * 2.5),
												height: (Aurora.entitySize * 2.5),
												lineWidth: 1,
												btnColor: drawRobotSelectPreviewParts('head', gameObject.towerArenaDesigns[index].robotParts),
												txtColor: 'white',
												font: '1.5em serif',
												msg: '',
												isFilled: true,
												id: parent.id,
												action: {
													method: function(id) {
														action();
													}
												},
												isModalBtn: false,
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
											drawButton({
												posX: parent.posX - (Aurora.entitySize * 0.75),
												posY: parent.posY,
												width: (Aurora.entitySize * 0.75),
												height: (Aurora.entitySize * 3),
												lineWidth: 1,
												btnColor: drawRobotSelectPreviewParts('left-arm', gameObject.towerArenaDesigns[index].robotParts),
												txtColor: 'white',
												font: '1.5em serif',
												msg: '',
												isFilled: true,
												id: parent.id,
												action: {
													method: function(id) {
														action();
													}
												},
												isModalBtn: false,
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
											drawButton({
												posX: parent.posX + (Aurora.entitySize * 3),
												posY: parent.posY,
												width: (Aurora.entitySize * 0.75),
												height: (Aurora.entitySize * 3),
												lineWidth: 1,
												btnColor: drawRobotSelectPreviewParts('right-arm', gameObject.towerArenaDesigns[index].robotParts),
												txtColor: 'white',
												font: '1.5em serif',
												msg: '',
												isFilled: true,
												id: parent.id,
												action: {
													method: function(id) {
														action();
													}
												},
												isModalBtn: false,
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
											drawButton({
												posX: parent.posX + (Aurora.entitySize * 0.25),
												posY: parent.posY + (Aurora.entitySize * 3),
												width: (Aurora.entitySize * 0.75),
												height: (Aurora.entitySize * 3),
												lineWidth: 1,
												btnColor: drawRobotSelectPreviewParts('left-leg', gameObject.towerArenaDesigns[index].robotParts),
												txtColor: 'white',
												font: '1.5em serif',
												msg: '',
												isFilled: true,
												id: parent.id,
												action: {
													method: function(id) {
														action();
													}
												},
												isModalBtn: false,
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
											drawButton({
												posX: parent.posX + (Aurora.entitySize * 2.15),
												posY: parent.posY + (Aurora.entitySize * 3),
												width: (Aurora.entitySize * 0.75),
												height: (Aurora.entitySize * 3),
												lineWidth: 1,
												btnColor: drawRobotSelectPreviewParts('right-leg', gameObject.towerArenaDesigns[index].robotParts),
												txtColor: 'white',
												font: '1.5em serif',
												msg: '',
												isFilled: true,
												id: parent.id,
												action: {
													method: function(id) {
														action();
													}
												},
												isModalBtn: false,
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
		}
		function previewTower(posX, posY, towerDesign, index, action, showImg = false) {
			if (towerDesign?.towerId) {
				showImg = true;
			}
			Aurora.methodSetup = {
				method: function(id) {
					drawButton({
						posX: posX + (Aurora.entityWidth * 11.9) - (Aurora.entitySize * 4),
						posY: posY + (Aurora.canvas.height * 0.025),
						width: (Aurora.entitySize * 9),
						height: (Aurora.entitySize * 15),
						lineWidth: 1,
						btnColor: !showImg ? 'lightslategrey' : towerDesign.img,
						txtColor: 'white',
						font: '1.5em serif',
						msg: '',
						isFilled: true,
						id: 'preview-tower',
						action: {
							method: function(id) {
								action();
							}
						},
						isModalBtn: false,
						props: {},
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
		}
		function drawTowerDetail(selectedTower) {
			Aurora.methodSetup = {
				method: function(id) {
					drawButton({
						posX: Aurora.placeEntityX(0.23, (Aurora.entitySize * 15)),
						posY: Aurora.placeEntityY(0.30, (Aurora.entitySize * 15)),
						width: (Aurora.entitySize * 18),
						height: (Aurora.entitySize * 30),
						lineWidth: 1,
						btnColor: selectedTower.img,
						txtColor: 'white',
						font: '1.5em serif',
						msg: '',
						isFilled: true,
						id: 'tower-detail',
						action: { 
							method: function(id) {}
						},
						isModalBtn: false,
						props: {},
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			if (selectedTower.robotParts.length === 6) {
				const posX = 0.39;
				const posY = 0.0;
				Aurora.methodSetup = {
					method: function(id) {
						drawButton({
							posX: posX + (Aurora.entityWidth * 22.55) - (Aurora.entitySize * 1.3),
							posY: posY + (Aurora.canvas.height * 0.41),
							width: (Aurora.entitySize * 6),
							height: (Aurora.entitySize * 6),
							lineWidth: 1,
							btnColor: drawRobotSelectPreviewParts('chassis', selectedTower.robotParts),
							txtColor: 'white',
							font: '1.5em serif',
							msg: '',
							isFilled: true,
							id: 'preview-robot',
							action: {
								method: function(id) {
									
								}
							},
							isModalBtn: false,
							props: {
								drawHead: function(parent) {
									Aurora.methodSetup = {
										method: function(id) {
											drawButton({
												posX: parent.posX + (Aurora.entitySize * 0.5),
												posY: parent.posY - (Aurora.entitySize * 5),
												width: (Aurora.entitySize * 5),
												height: (Aurora.entitySize * 5),
												lineWidth: 1,
												btnColor: drawRobotSelectPreviewParts('head', selectedTower.robotParts),
												txtColor: 'white',
												font: '1.5em serif',
												msg: '',
												isFilled: true,
												id: parent.id,
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
								},
								drawLeftArm: function(parent) {
									Aurora.methodSetup = {
										method: function(id) {
											drawButton({
												posX: parent.posX - (Aurora.entitySize * 1.5),
												posY: parent.posY,
												width: (Aurora.entitySize * 1.5),
												height: (Aurora.entitySize * 6),
												lineWidth: 1,
												btnColor: drawRobotSelectPreviewParts('left-arm', selectedTower.robotParts),
												txtColor: 'white',
												font: '1.5em serif',
												msg: '',
												isFilled: true,
												id: parent.id,
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
								},
								drawRightArm: function(parent) {
									Aurora.methodSetup = {
										method: function(id) {
											drawButton({
												posX: parent.posX + (Aurora.entitySize * 6),
												posY: parent.posY,
												width: (Aurora.entitySize * 1.5),
												height: (Aurora.entitySize * 6),
												lineWidth: 1,
												btnColor: drawRobotSelectPreviewParts('right-arm', selectedTower.robotParts),
												txtColor: 'white',
												font: '1.5em serif',
												msg: '',
												isFilled: true,
												id: parent.id,
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
								},
								drawLeftLeg: function(parent) {
									Aurora.methodSetup = {
										method: function(id) {
											drawButton({
												posX: parent.posX + (Aurora.entitySize * 0.25),
												posY: parent.posY + (Aurora.entitySize * 6),
												width: (Aurora.entitySize * 1.5),
												height: (Aurora.entitySize * 6),
												lineWidth: 1,
												btnColor: drawRobotSelectPreviewParts('left-leg', selectedTower.robotParts),
												txtColor: 'white',
												font: '1.5em serif',
												msg: '',
												isFilled: true,
												id: parent.id,
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
								},
								drawRightLeg: function(parent) {
									Aurora.methodSetup = {
										method: function(id) {
											drawButton({
												posX: parent.posX + (Aurora.entitySize * 4.3),
												posY: parent.posY + (Aurora.entitySize * 6),
												width: (Aurora.entitySize * 1.5),
												height: (Aurora.entitySize * 6),
												lineWidth: 1,
												btnColor: drawRobotSelectPreviewParts('right-leg', selectedTower.robotParts),
												txtColor: 'white',
												font: '1.5em serif',
												msg: '',
												isFilled: true,
												id: parent.id,
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
								},
							},
							methodId: id
						});
					}
				};
				Aurora.addMethod(Aurora.methodSetup);
				drawRobotSelectParts();
			}
		}
	}
}
