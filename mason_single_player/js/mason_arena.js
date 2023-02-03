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
				// future Jordan, look into making this method and drawRobotSelect global. It's used in the factory as well
				drawRobotSelect(
					Game.placeEntityX(posX, (Game.entitySize * posXoffset)),
					Game.placeEntityY(posY, (Game.entitySize * posYoffset)),
					gameObject.robotArenaDesigns[i].robotParts,
					i
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
					arenaPage.loadPage();
				}
			}
		}
		arenaMenuSelect();
		
		function drawRobotSelect(posX, posY, robotDesign, index) {
			Game.methodSetup = {
				method: function(id) {
					drawButton({
						posX: posX + (Game.entityWidth * 12.6) - (Game.entitySize * 3),
						posY: posY + (Game.canvas.height * 0.065),
						width: (Game.entitySize * 6),
						height: (Game.entitySize * 6),
						lineWidth: 1,
						btnColor: drawRobotSelectPreviewParts('chassis', robotDesign),
						txtColor: 'white',
						font: '1.5em serif',
						msg: '',
						isFilled: true,
						id: 'preview-robot',
						action: {
							method: function(id) {
								gameObject.selectedRobot = gameObject.robotArenaDesigns[index].robotParts;
								gameObject.selectedRobotDesign = index;
								arenaRobotSelect();
							}
						},
						isModalBtn: false,
						props: {
							drawHead: function(parent) {
								Game.methodSetup = {
									method: function(id) {
										drawButton({
											posX: parent.posX + (Game.entitySize * 0.5),
											posY: parent.posY - (Game.entitySize * 5),
											width: (Game.entitySize * 5),
											height: (Game.entitySize * 5),
											lineWidth: 1,
											btnColor: drawRobotSelectPreviewParts('head', robotDesign),
											txtColor: 'white',
											font: '1.5em serif',
											msg: '',
											isFilled: true,
											id: parent.id,
											action: {
												method: function(id) {
													gameObject.selectedRobot = gameObject.robotArenaDesigns[index].robotParts;
													gameObject.selectedRobotDesign = index;
													arenaRobotSelect();
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
											posX: parent.posX - (Game.entitySize * 1.5),
											posY: parent.posY,
											width: (Game.entitySize * 1.5),
											height: (Game.entitySize * 6),
											lineWidth: 1,
											btnColor: drawRobotSelectPreviewParts('left-arm', robotDesign),
											txtColor: 'white',
											font: '1.5em serif',
											msg: '',
											isFilled: true,
											id: parent.id,
											action: {
												method: function(id) {
													gameObject.selectedRobot = gameObject.robotArenaDesigns[index].robotParts;
													gameObject.selectedRobotDesign = index;
													arenaRobotSelect();
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
											posX: parent.posX + (Game.entitySize * 6),
											posY: parent.posY,
											width: (Game.entitySize * 1.5),
											height: (Game.entitySize * 6),
											lineWidth: 1,
											btnColor: drawRobotSelectPreviewParts('right-arm', robotDesign),
											txtColor: 'white',
											font: '1.5em serif',
											msg: '',
											isFilled: true,
											id: parent.id,
											action: {
												method: function(id) {
													gameObject.selectedRobot = gameObject.robotArenaDesigns[index].robotParts;
													gameObject.selectedRobotDesign = index;
													arenaRobotSelect();
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
											posY: parent.posY + (Game.entitySize * 6),
											width: (Game.entitySize * 1.5),
											height: (Game.entitySize * 6),
											lineWidth: 1,
											btnColor: drawRobotSelectPreviewParts('left-leg', robotDesign),
											txtColor: 'white',
											font: '1.5em serif',
											msg: '',
											isFilled: true,
											id: parent.id,
											action: {
												method: function(id) {
													gameObject.selectedRobot = gameObject.robotArenaDesigns[index].robotParts;
													gameObject.selectedRobotDesign = index;
													arenaRobotSelect();
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
											posX: parent.posX + (Game.entitySize * 4.3),
											posY: parent.posY + (Game.entitySize * 6),
											width: (Game.entitySize * 1.5),
											height: (Game.entitySize * 6),
											lineWidth: 1,
											btnColor: drawRobotSelectPreviewParts('right-leg', robotDesign),
											txtColor: 'white',
											font: '1.5em serif',
											msg: '',
											isFilled: true,
											id: parent.id,
											action: {
												method: function(id) {
													gameObject.selectedRobot = gameObject.robotArenaDesigns[index].robotParts;
													gameObject.selectedRobotDesign = index;
													arenaRobotSelect(); 
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
		}
		function drawRobotSelectPreviewParts(partType, robotDesign) {
			if (partType === 'chassis') {
				if (robotDesign.length === 0) {
					return 'lightslategrey';
				} else {
					const part = robotDesign.find(partPos => partPos.type === 'chassis');
					if (part) {
						return part.img;
					} else {
						return 'lightslategrey';
					}
				}
			}
			if (partType === 'head') {
				if (robotDesign.length === 0) {
					return 'lightslategrey';
				} else {
					const part = robotDesign.find(partPos => partPos.type === 'head');
					if (part) {
						return part.img;
					} else {
						return 'lightslategrey';
					}
				}
			}
			if (partType === 'left-leg') {
				if (robotDesign.length === 0) {
					return 'lightslategrey';
				} else {
					const part = robotDesign.find(partPos => partPos.type === 'leg' && partPos.legPos === 'left');
					if (part) {
						return part.img;
					} else {
						return 'lightslategrey';
					}
				}
			}
			if (partType === 'right-leg') {
				if (robotDesign.length === 0) {
					return 'lightslategrey';
				} else {
					const part = robotDesign.find(partPos => partPos.type === 'leg' && partPos.legPos === 'right');
					if (part) {
						return part.img;
					} else {
						return 'lightslategrey';
					}
				}
			}
			if (partType === 'left-arm') {
				if (robotDesign.length === 0) {
					return 'lightslategrey';
				} else {
					const part = robotDesign.find(partPos => partPos.type === 'arm' && partPos.armPos === 'left');
					if (part) {
						return part.img;
					} else {
						return 'lightslategrey';
					}
				}
			}
			if (partType === 'right-arm') {
				if (robotDesign.length === 0) {
					return 'lightslategrey';
				} else {
					const part = robotDesign.find(partPos => partPos.type === 'arm' && partPos.armPos === 'right');
					if (part) {
						return part.img;
					} else {
						return 'lightslategrey';
					}
				}
			}
		}
		function drawRobotSelectParts() {
			const findPreviews = setInterval(function() {
				if (Game.methodObjects.filter(x => x.id === 'preview-robot').length > 0) {
					Game.methodObjects.filter(x => x.id === 'preview-robot').forEach(robot => {
						robot.props.drawHead(robot);
						robot.props.drawLeftArm(robot);
						robot.props.drawRightArm(robot);
						robot.props.drawLeftLeg(robot);
						robot.props.drawRightLeg(robot);
					});
					clearInterval(findPreviews);
				}
			}, Game.frameRate);
		}
		function arenaRobotSelect() {
			// draw a menu of gameObject.robotDesigns
			// when the player selects one, load it in gameObject.robotArenaDesigns
		}
	}
	
}
