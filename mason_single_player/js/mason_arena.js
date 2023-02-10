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
							arenaRobotSelect();
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
						gameObject.selectedRobotDesign = i;
						// future Jordan, we need to make the robot details
						// and show the robot directives to the right
						//arenaRobotDetails();
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
	}
	
}
