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

const factoryPage = {
	description: 'This is where the player can build parts and robots',
	loadPage: function() {
		function factoryRobotSelect() {
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
						id: 'factory-background',
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
						id: 'factory-back-game',
						action: { 
							method: function(id) { 
								mainPage.loadPage();
								gameObject.partsDisplayed = ''; 
								gameObject.selectedRobotDesign = -1;
								gameObject.buildButtonDisabled = false;
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
						posX: Aurora.placeEntityX(0.97, (Aurora.entitySize * 30)),
						posY: Aurora.placeEntityY(0.03),
						width: (Aurora.entitySize * 15),
						height: (Aurora.entitySize * 7),
						lineWidth: 1,
						btnColor: 'darkgrey',
						txtColor: 'white',
						font: '1.5em serif',
						msg: 'Parts',
						isFilled: true,
						id: 'part-view',
						action: { 
							method: function(id) { 
								factoryParts.loadPage();
								gameObject.partsDisplayed = ''; 
								gameObject.selectedRobotDesign = -1;
								gameObject.buildButtonDisabled = false;
							}
						}, // this needs to go to the parts screen
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
						id: 'factory-title',
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
						id: 'robot-select-background',
						isBackground: true,
						props: {},
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			let robotCount = 0;
			let robotSelectRow = 1;
			for (let i = 0; i < gameObject.robotDesignCount; i++) {
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
					posY = 0.54;
					posYoffset = -33;
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
					gameObject.robotDesigns[i].robotParts,
					i,
					function() {
						gameObject.selectedRobot = gameObject.robotDesigns[i].robotParts;
						gameObject.selectedRobotDesign = i;
						factoryRobotDetails(); 
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

			Aurora.pageResized = {
				section: 'factory-robot-select',
				method: function() {
					factoryPage.loadPage();
				}
			}
			if (gameObject.tutorialStep === 10) {
				setTimeout(function() {
					tutorialFactoryMenu();
				}, 100);
				
			}
		}
		factoryRobotSelect(); // draw the factory page
		function factoryRobotDetails() {
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
						id: 'factory-background',
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
						id: 'part-background',
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
				function() {
					const robotMade = Aurora.methodObjects.find(build => build.id === 'robot-built-title');
					if (!robotMade) {
						selectRobotChassis(); 
					}
				},
				function() {
					const robotMade = Aurora.methodObjects.find(build => build.id === 'robot-built-title');
					if (!robotMade) {
							selectRobotHead(); 
					}
				},
				function() {
					const robotMade = Aurora.methodObjects.find(build => build.id === 'robot-built-title');
					if (!robotMade) {
						selectRobotArms('left');
					}
				},
				function() {
					const robotMade = Aurora.methodObjects.find(build => build.id === 'robot-built-title');
					if (!robotMade) {
						selectRobotArms('right');
					}
				},
				function() {
					const robotMade = Aurora.methodObjects.find(build => build.id === 'robot-built-title');
					if (!robotMade) {
						selectRobotLegs('left'); 
					}
				},
				function() {
					const robotMade = Aurora.methodObjects.find(build => build.id === 'robot-built-title');
					if (!robotMade) {
						selectRobotLegs('right'); 
					}
				},
				function() {
					if (gameObject.selectedRobot.length > 0) {
						createFactoryTitleStats(undefined, undefined, undefined, undefined);
					}
				}
			); // draw the robot in the top left
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
						id: 'factory-back-game',
						action: { method: function(id) {
								const robotMade = Aurora.methodObjects.find(build => build.id === 'robot-built-title');
								if (!robotMade) {
									factoryPage.loadPage();
									gameObject.partsDisplayed = ''; 
									gameObject.selectedRobotDesign = -1;
									gameObject.buildButtonDisabled = false;
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
						id: 'factory-title',
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
					drawButton({
						posX: Aurora.placeEntityX(0.97, (Aurora.entitySize * 30)),
						posY: Aurora.placeEntityY(0.03),
						width: (Aurora.entitySize * 15),
						height: (Aurora.entitySize * 7),
						lineWidth: 1,
						btnColor: 'darkgrey',
						txtColor: 'white',
						font: '1.5em serif',
						msg: 'Parts',
						isFilled: true,
						id: 'factory-view',
						action: { 
							method: function(id) {
								const robotMade = Aurora.methodObjects.find(build => build.id === 'robot-built-title');
								if (!robotMade) {
									factoryParts.loadPage();
									gameObject.partsDisplayed = ''; 
									gameObject.selectedRobotDesign = -1;
									gameObject.buildButtonDisabled = false;
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
			// display the build button when the robot parts are complete
			if (gameObject.selectedRobot.length === 6) {
				displaySelectPart({}, true);
			}
			
			Aurora.pageResized = {
				section: 'factory-robot-details',
				method: function() {
					const modal = Aurora.methodObjects.find(build => build.id === Aurora.modalId);
					clearRobotBuildMessage();
					if (!modal && gameObject.partsDisplayed === 'leg-right') {
						selectRobotLegs('right');
					}
					if (!modal && gameObject.partsDisplayed === 'leg-left') {
						selectRobotLegs('left');
					}
					if (!modal && gameObject.partsDisplayed === 'arm-left') {
						selectRobotArms('left');
					}
					if (!modal && gameObject.partsDisplayed === 'arm-right') {
						selectRobotArms('right');
					}
					if (!modal && gameObject.partsDisplayed === 'chassis') {
						selectRobotChassis();
					}
					if (!modal && gameObject.partsDisplayed === 'head') {
						selectRobotHead();
					}
				}
			}
			if (gameObject.tutorialStep === 12) {
				tutorialFactoryRobots();
			}
		}
		function clearRobotParts() {
			const chassisParts = Aurora.methodObjects.filter(x => x.id === 'robot-chassis-part');
			const headParts = Aurora.methodObjects.filter(x => x.id === 'robot-head-part');
			const legLeftParts = Aurora.methodObjects.filter(x => x.id === 'robot-left-leg-part');
			const legRightParts = Aurora.methodObjects.filter(x => x.id === 'robot-right-leg-part');
			const armRightParts = Aurora.methodObjects.filter(x => x.id === 'robot-right-arm-part');
			const armLeftParts = Aurora.methodObjects.filter(x => x.id === 'robot-left-arm-part');
			const nextBtn = Aurora.methodObjects.filter(x => x.id === 'next-part');
			const prevBtn = Aurora.methodObjects.filter(x => x.id === 'last-part');
			const partCount = Aurora.methodObjects.filter(x => x.id === 'part-count');
			if (chassisParts.length > 0) {
				chassisParts.forEach((item, i) => {
					Aurora.deleteEntity(chassisParts[i].methodId);
				});
			}
			if (headParts.length > 0) {
				headParts.forEach((item, i) => {
					Aurora.deleteEntity(headParts[i].methodId);
				});
			}
			if (legLeftParts.length > 0) {
				legLeftParts.forEach((item, i) => {
					Aurora.deleteEntity(legLeftParts[i].methodId);
				});
			}
			if (legRightParts.length > 0) {
				legRightParts.forEach((item, i) => {
					Aurora.deleteEntity(legRightParts[i].methodId);
				});
			}
			if (armRightParts.length > 0) {
				armRightParts.forEach((item, i) => {
					Aurora.deleteEntity(armRightParts[i].methodId);
				});
			}
			if (armLeftParts.length > 0) {
				armLeftParts.forEach((item, i) => {
					Aurora.deleteEntity(armLeftParts[i].methodId);
				});
			}
			if (nextBtn.length > 0) {
				nextBtn.forEach((item, i) => {
					Aurora.deleteEntity(nextBtn[i].methodId);
				});
			}
			if (prevBtn.length > 0) {
				prevBtn.forEach((item, i) => {
					Aurora.deleteEntity(prevBtn[i].methodId);
				});
			}
			if (partCount.length > 0) {
				partCount.forEach((item, i) => {
					Aurora.deleteEntity(partCount[i].methodId);
				});
			}
			setTimeout(function() {
				createFactoryTitleStats(undefined, undefined, undefined, undefined);
			}, 0);
		}

		function selectRobotArms(armPos) {
			// the armPos could be left or right
			gameObject.partsDisplayed = 'arm-' + armPos;
			// load up the robot parts the player has discovered...
			clearRobotParts(); // clear the previous parts
			clearSelectedPartStatDetails(); // clear the stats
			refreshFactoryBackgrounds(); // refresh the background
			clearRobotPreviewHighlight();
			const highlight = Aurora.methodObjects.find(item => item.id === 'robot-' + armPos + '-arm');
			highlight.btnColor = 'yellow';
			displayDiscoveredParts(gameObject.discoveredArms, armPos);
			if (gameObject.selectedRobot.length === 6) {
				gameObject.buildButtonDisabled = false;
				displaySelectPart({}, true);
			}
		}

		function selectRobotLegs(legPos) {
			// the legPos could be left or right
			gameObject.partsDisplayed = 'leg-' + legPos;
			// load up the robot parts the player has discovered...
			clearRobotParts(); // clear the previous parts
			clearSelectedPartStatDetails(); // clear the stats
			refreshFactoryBackgrounds(); // refresh the background
			clearRobotPreviewHighlight();
			const highlight = Aurora.methodObjects.find(item => item.id === 'robot-' + legPos + '-leg');
			highlight.btnColor = 'yellow';
			displayDiscoveredParts(gameObject.discoveredLegs, legPos);
			if (gameObject.selectedRobot.length === 6) {
				gameObject.buildButtonDisabled = false;
				displaySelectPart({}, true);
			}
		}

		function selectRobotChassis() {
			gameObject.partsDisplayed = 'chassis';
			// load up the robot parts the player has discovered...
			clearRobotParts(); // clear the previous parts
			clearSelectedPartStatDetails(); // clear the stats
			refreshFactoryBackgrounds(); // refresh the background
			clearRobotPreviewHighlight();
			const highlight = Aurora.methodObjects.find(item => item.id === 'robot-body');
			highlight.btnColor = 'yellow';
			displayDiscoveredParts(gameObject.discoveredChassis, '');
			if (gameObject.selectedRobot.length === 6) {
				gameObject.buildButtonDisabled = false;
				displaySelectPart({}, true);
			}
		}

		function selectRobotHead() {
			gameObject.partsDisplayed = 'head';
			// load up the robot parts the player has discovered...
			clearRobotParts(); // clear the previous parts
			clearSelectedPartStatDetails(); // clear the stats
			refreshFactoryBackgrounds(); // refresh the background
			clearRobotPreviewHighlight();
			const highlight = Aurora.methodObjects.find(item => item.id === 'robot-head');
			highlight.btnColor = 'yellow';
			displayDiscoveredParts(gameObject.discoveredHeads, '');
			if (gameObject.selectedRobot.length === 6) {
				gameObject.buildButtonDisabled = false;
				displaySelectPart({}, true);
			}
		}

		function displayDiscoveredParts(partsDiscovered, limbPos) {
			gameObject.discoveredPartsList = [];
			let partCount = 0;
			let currentList = [];

			let displayLimb = '';
			if (!limbPos) {
				displayLimb = '';
			} else {
				displayLimb = limbPos + '-';
			}
			partsDiscovered.forEach((item, i) => { // this will organize all the parts
				if (partCount === 5) { // into five items per page
					gameObject.discoveredPartsList.push(currentList);
					partCount = 0;
					currentList = [];
				}
				currentList.push(item);
				partCount++;
				if (i === (partsDiscovered.length - 1)) {
					gameObject.discoveredPartsList.push(currentList);
				}
			});
			if (gameObject.partPageIndex >= gameObject.discoveredPartsList.length) {
				gameObject.partPageIndex = 0;
			}
			// display all the parts on each page
			for (let i = 0; i < gameObject.discoveredPartsList[gameObject.partPageIndex].length; i++) {
				const discoveredPart = gameObject.discoveredPartsList[gameObject.partPageIndex][i];
				Aurora.methodSetup = {
					method: function(id) {
						drawButton({
							posX: Aurora.placeEntityX(0.76, (Aurora.entitySize * 22.5)),
							posY: Aurora.placeEntityY(0.330 + (i * 0.125)),
							width: (Aurora.entitySize * 22),
							height: (Aurora.entitySize * 3),
							lineWidth: 1,
							btnColor: drawActiveParts(discoveredPart, true),
							txtColor: 'black',
							font: '0.8em serif',
							msg: discoveredPart.count,
							isFilled: true,
							id: 'part-count',
							action: { 
								method: function(id) {
									const newPart = Object.assign({}, discoveredPart);
									if (discoveredPart.type === 'leg') {
										newPart.legPos = limbPos;
									}
									if (discoveredPart.type === 'arm') {
										newPart.armPos = limbPos;
									}
									gameObject.buildButtonDisabled = false;
									displaySelectPart(newPart, false);
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
							posX: Aurora.placeEntityX(0.76, (Aurora.entitySize * 22.5)),
							posY: Aurora.placeEntityY(0.241 + (i * 0.125)),
							width: (Aurora.entitySize * 22),
							height: (Aurora.entitySize * 9),
							lineWidth: 1,
							btnColor: drawActiveParts(discoveredPart, true),
							txtColor: 'black',
							font: '0.8em serif',
							msg: discoveredPart.name,
							isFilled: true,
							id: 'robot-' + displayLimb + discoveredPart.type + '-part',
							action: { 
								method: function(id) {
									const newPart = Object.assign({}, discoveredPart);
									if (discoveredPart.type === 'leg') {
										newPart.legPos = limbPos;
									}
									if (discoveredPart.type === 'arm') {
										newPart.armPos = limbPos;
									}
									gameObject.buildButtonDisabled = false;
									displaySelectPart(newPart, false);
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
			drawNextPrevPartList(partsDiscovered, limbPos);
		}

		function drawNextPrevPartList(partList, limbPos) {
			// the part could be head, chassis, legs or arms
			Aurora.methodSetup = {
				method: function(id) {
					drawButton({ // the btnColor is css grey
						posX: Aurora.placeEntityX(0.76, (Aurora.entitySize * 22.5)),
						posY: Aurora.placeEntityY(0.135),
						width: (Aurora.entitySize * 22),
						height: (Aurora.entitySize * 7),
						lineWidth: 1,
						btnColor: partList.length < 5 ? '#C0C0C0' : '#808080',
						txtColor: 'white',
						font: '1.5em serif',
						msg: 'Next',
						isFilled: true,
						id: 'next-part',
						action: {
							method: function(id) {
								gameObject.partPageIndex++; // go to the next part page
								clearRobotParts(); // clear the previous parts
								displayDiscoveredParts(partList, limbPos);
								if (gameObject.selectedRobot.length === 6) {
									displaySelectPart({}, true);
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
					drawButton({ // the btnColor is css grey
						posX: Aurora.placeEntityX(0.76, (Aurora.entitySize * 22.5)),
						posY: Aurora.placeEntityY(0.90),
						width: (Aurora.entitySize * 22),
						height: (Aurora.entitySize * 7),
						lineWidth: 1,
						btnColor: partList.length < 5 ? '#C0C0C0' : '#808080',
						txtColor: 'white',
						font: '1.5em serif',
						msg: 'Previous',
						isFilled: true,
						id: 'last-part',
						action: {
							method: function(id) {
								gameObject.partPageIndex--; // go back a page
								if (gameObject.partPageIndex < 0) { // if the page is at the beginning
									// go to the last page
									gameObject.partPageIndex = (gameObject.discoveredPartsList.length - 1);
								}
								clearRobotParts(); // clear the previous parts
								displayDiscoveredParts(partList, limbPos);
								if (gameObject.selectedRobot.length === 6) {
									displaySelectPart({}, true);
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
		function clearRobotPreviewHighlight() {
			const headHighlight = Aurora.methodObjects.find(item => item.id === 'robot-head');
			headHighlight.btnColor = drawRobotPreviewParts('head');
			const chassisHighlight = Aurora.methodObjects.find(item => item.id === 'robot-body');
			chassisHighlight.btnColor = drawRobotPreviewParts('chassis');
			const armRightHighlight = Aurora.methodObjects.find(x => x.id === 'robot-right-arm');
			armRightHighlight.btnColor = drawRobotPreviewParts('right-arm');
			const armLeftHighlight = Aurora.methodObjects.find(x => x.id === 'robot-left-arm');
			armLeftHighlight.btnColor = drawRobotPreviewParts('left-arm');
			const legRightHighlight = Aurora.methodObjects.find(x => x.id === 'robot-right-leg');
			legRightHighlight.btnColor = drawRobotPreviewParts('right-leg');
			const legLeftHighlight = Aurora.methodObjects.find(x => x.id === 'robot-left-leg');
			legLeftHighlight.btnColor = drawRobotPreviewParts('left-leg');
		}

		function clearSelectedPartStatDetails() {
			// clear the stats and the buttons
			const selectPartBtn = Aurora.methodObjects.filter(x => x.id === 'confirm-part');
			if (selectPartBtn) {
				selectPartBtn.forEach((item, i) => {
					Aurora.deleteEntity(item.methodId);
				});
			}
			const selectAttStat = Aurora.methodObjects.filter(x => x.id === 'att-stat');
			if (selectAttStat) {
				selectAttStat.forEach((item, i) => {
					Aurora.deleteEntity(item.methodId);
				});
			}
			const selectDefStat = Aurora.methodObjects.filter(x => x.id === 'def-stat');
			if (selectDefStat) {
				selectDefStat.forEach((item, i) => {
					Aurora.deleteEntity(item.methodId);
				});
			}
			const selectSpdStat = Aurora.methodObjects.filter(x => x.id === 'spd-stat');
			if (selectSpdStat) {
				selectSpdStat.forEach((item, i) => {
					Aurora.deleteEntity(item.methodId);
				});
			}
			const selectAiStat = Aurora.methodObjects.filter(x => x.id === 'ai-stat');
			if (selectAiStat) {
				selectAiStat.forEach((item, i) => {
					Aurora.deleteEntity(item.methodId);
				});
			}
			const selectStorageStat = Aurora.methodObjects.filter(x => x.id === 'storage-stat');
			if (selectStorageStat) {
				selectStorageStat.forEach((item, i) => {
					Aurora.deleteEntity(item.methodId);
				});
			}
			// clear the titles
			const factoryTitle = Aurora.methodObjects.filter(x => x.id === 'factory-title');
			if (factoryTitle) {
				factoryTitle.forEach((item, i) => {
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
		function createFactoryTitleStats(existingPart, part, confirmed, partChanged) {
			// when the existingPart and parts come in, then we are selecting different parts
			let selectedPart = part;
			if (!selectedPart || confirmed) {
				selectedPart = totalSelectedRobotStats();
			}
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
						font: '2.3em serif',
						msg: 'Details',
						posX: Aurora.placeEntityX(0.50),
						posY: Aurora.placeEntityY(0.085),
						color: 'darkgrey',
						align: 'center',
						props: {},
						id: 'factory-title',
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawText({
						font: '1em serif',
						msg: 'Attack: ' + returnStatValue(selectedPart?.stats?.att, 'att', confirmed, partChanged, existingPart?.stats?.att),
						posX: Aurora.placeEntityX(0.09),
						posY: Aurora.placeEntityY(0.69),
						color: returnStatColor(existingPart?.stats?.att, selectedPart?.stats?.att, 'att', partChanged, confirmed),
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
						msg: 'Defense: ' + returnStatValue(selectedPart?.stats?.def, 'def', confirmed, partChanged, existingPart?.stats?.def),
						posX: Aurora.placeEntityX(0.09),
						posY: Aurora.placeEntityY(0.74),
						color: returnStatColor(existingPart?.stats?.def, selectedPart?.stats?.def, 'def', partChanged, confirmed),
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
						msg: 'Speed: ' + returnStatValue(selectedPart?.stats?.spd, 'spd', confirmed, partChanged, existingPart?.stats?.spd),
						posX: Aurora.placeEntityX(0.09),
						posY: Aurora.placeEntityY(0.79),
						color: returnStatColor(existingPart?.stats?.spd, selectedPart?.stats?.spd, 'spd', partChanged, confirmed),
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
						msg: 'AI: ' + returnStatValue(selectedPart?.stats?.ai, 'ai', confirmed, partChanged, existingPart?.stats?.ai),
						posX: Aurora.placeEntityX(0.09),
						posY: Aurora.placeEntityY(0.84),
						color: returnStatColor(existingPart?.stats?.ai, selectedPart?.stats?.ai, 'ai', partChanged, confirmed),
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
						msg: 'Storage: ' + returnStatValue(selectedPart?.stats?.storage, 'storage', confirmed, partChanged, existingPart?.stats?.storage),
						posX: Aurora.placeEntityX(0.09),
						posY: Aurora.placeEntityY(0.88),
						color: returnStatColor(existingPart?.stats?.storage, selectedPart?.stats?.storage, 'storage', partChanged, confirmed),
						align: 'left',
						props: {},
						id: 'storage-stat',
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			clearSelectedPartStatDetails();
			refreshFactoryBackgrounds();
		}
		function displaySelectPart(part, confirmed) {
			const partChanged = true;
			setTimeout(function() {
				Aurora.methodSetup = {
					method: function(id) {
						drawButton({
							posX: Aurora.placeEntityX(0.226, (Aurora.entitySize * 19.7)),
							posY: Aurora.placeEntityY(0.90),
							width: (Aurora.entitySize * 23),
							height: (Aurora.entitySize * 7),
							lineWidth: 1,
							btnColor: !gameObject.buildButtonDisabled ? 'grey' : '#C0C0C0',
							txtColor: 'white',
							font: '1.5em serif',
							msg: confirmed && gameObject.selectedRobot.length === 6 ? 'Build' : 'Confirm',
							isFilled: true,
							id: 'confirm-part',
							action: { method: function(id) {
								if (confirmed && gameObject.selectedRobot.length === 6) {
									if (gameObject.gameSounds) {
										addScrapSound.cloneNode(true).play();
									}
									buildRobot();
								} else {
									if (part.requires !== undefined && part.requires.roboticSkill <= gameObject.roboticSkill) {
										if (gameObject.gameSounds) {
											selectSound.cloneNode(true).play();
										}
										equipPart(part);
									} else {
										// display modal
										if (part.requires !== undefined) {
											const msgs = ['Part Requires', 'Robotics Level: ' + part.requires.roboticSkill];
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
														msgDistance: (Aurora.entitySize * 10),
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
														posY: Aurora.placeEntityY(0.815, (Aurora.entitySize * 30)),
														width:(Aurora.entitySize * 45) - (Aurora.canvas.width * 0.04),
														height: (Aurora.entitySize * 7),
														lineWidth: 1,
														btnColor: 'grey',
														txtColor: 'white',
														font: '1.3em serif',
														msg: 'Ok...',
														isFilled: true,
														id: 'requires-robot',
														action: { 
															method: function(id) { 
																const modal = Aurora.methodObjects.find(build => build.id === Aurora.modalId);
																Aurora.deleteEntity(modal.methodId);
																const btn = Aurora.methodObjects.find(build => build.id === 'requires-robot');
																Aurora.deleteEntity(btn.methodId);
																gameObject.buildButtonDisabled = true;
																displaySelectPart({}, true);
																setTimeout(function() {
																	createFactoryTitleStats(undefined, undefined, undefined, undefined);
																},0);
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
							}},
							isModalBtn: false,
							props: {},
							methodId: id
						});
					}
				};
				Aurora.addMethod(Aurora.methodSetup);
				let existingPart;
				if (part.type === 'chassis') {
					existingPart = gameObject.selectedRobot.find(build => build.type === 'chassis');
				}
				if (part.type === 'head') {
					existingPart = gameObject.selectedRobot.find(build => build.type === 'head');
				}
				if (part.type === 'leg') {
					existingPart = gameObject.selectedRobot.find(build => build.type === 'leg' && build.legPos === part.legPos);
				}
				if (part.type === 'arm') {
					existingPart = gameObject.selectedRobot.find(build => build.type === 'arm' && build.armPos === part.armPos);
				}
				if (part.type) {
					createFactoryTitleStats(existingPart, part, confirmed, partChanged);
				}
			}, 0);
		}
		function returnStatValue(selectedPartVal, stat, confirmed, partChanged, existingPartValue) {
			if (gameObject.selectedRobot.length === 0) {
				return selectedPartVal;
			} else {
				const totalStats = totalSelectedRobotStats();
				if (confirmed || !partChanged) {
					return totalStats.stats[stat];
				} else if (totalStats.stats[stat] > selectedPartVal ||
					totalStats.stats[stat] < selectedPartVal ||
					totalStats.stats[stat] === selectedPartVal ||
					partChanged) {
						if (existingPartValue) {
							const partUpgradeValue = (selectedPartVal - existingPartValue);
							const displayUpgrade = (partUpgradeValue > 0) ? ('+' + partUpgradeValue) : partUpgradeValue;
							return totalStats.stats[stat] + '|' + displayUpgrade;
						} else {
							const displayUpgrade = (selectedPartVal > 0) ? ('+' + selectedPartVal) : selectedPartVal;
							return totalStats.stats[stat] + '|' + displayUpgrade;
						}
				}
			}
		}
		function returnStatColor(existingPartValue, newPartValue, stat, partChanged, confirmed) {
			const totalStats = totalSelectedRobotStats();
			if (!existingPartValue) {
				if (gameObject.selectedRobot.length === 0) {
					if (newPartValue === 0 || !newPartValue) {
						return 'grey';
					}
					else if (((totalStats.stats[stat] - newPartValue) * -1) >= 1) {
						return 'green';
					}
					else if (((totalStats.stats[stat] - newPartValue) * -1) < 0) {
						return 'red';
					}
				} else {
					if (!confirmed && !partChanged) {
						return 'grey';
					}
					else if (!confirmed && partChanged && newPartValue > 0) {
						return 'green';
					}
					else {
						return 'grey';
					}
				}
			}
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
		}
		function equipPart(part) {
			// clear the confirm button
			if (part.type === 'chassis') {
				const existingChassis = gameObject.selectedRobot.findIndex(partPos => partPos.type === 'chassis');
				if (existingChassis > -1) {
					gameObject.selectedRobot.splice(existingChassis, 1);
				}
				gameObject.selectedRobot.push(part);
				Aurora.methodObjects.find(x => x.id === 'robot-body').btnColor = part.img; // change this to the actual image when availiable
			} else if (part.type === 'head') {
				const existingHead = gameObject.selectedRobot.findIndex(partPos => partPos.type === 'head');
				if (existingHead > -1) {
					gameObject.selectedRobot.splice(existingHead, 1);
				}
				gameObject.selectedRobot.push(part);
				Aurora.methodObjects.find(x => x.id === 'robot-head').btnColor = part.img; // change this to the actual image when availiable
			} else if (part.type === 'leg') {
				const existingLeg = gameObject.selectedRobot.findIndex(partPos => partPos.type === 'leg' && partPos.legPos === part.legPos);
				if (existingLeg > -1) {
					gameObject.selectedRobot.splice(existingLeg, 1);
				}
				if (part.legPos === 'left') {
					gameObject.selectedRobot.push(part);
					Aurora.methodObjects.find(x => x.id === 'robot-left-leg').btnColor = part.img; // change this to the actual image when availiable
				} else if (part.legPos === 'right') {
					gameObject.selectedRobot.push(part);
					Aurora.methodObjects.find(x => x.id === 'robot-right-leg').btnColor = part.img; // change this to the actual image when availiable
				}
			} else if (part.type === 'arm') {
				const existingArm = gameObject.selectedRobot.findIndex(partPos => partPos.type === 'arm' && partPos.armPos === part.armPos);
				if (existingArm > -1) {
					gameObject.selectedRobot.splice(existingArm, 1);
				}
				if (part.armPos === 'left') {
					gameObject.selectedRobot.push(part);
					Aurora.methodObjects.find(x => x.id === 'robot-left-arm').btnColor = part.img; // change this to the actual image when availiable
				} else if (part.armPos === 'right') {
					gameObject.selectedRobot.push(part);
					Aurora.methodObjects.find(x => x.id === 'robot-right-arm').btnColor = part.img; // change this to the actual image when availiable
				}
			}
			gameObject.robotDesigns[gameObject.selectedRobotDesign].robotParts = gameObject.selectedRobot;
			displaySelectPart(part, true);
		}

		function buildRobot() {
			let problems = 0;
			let head;
			let chassis;
			let leg1;
			let leg2;
			let arm1;
			let arm2;
			gameObject.selectedRobot.forEach(item => {
				if (item.headId) {
					head = robotHeads.find(part => part.headId === item.headId);	
				}
				if (item.chassisId) {
					chassis = robotChassis.find(part => part.chassisId === item.chassisId);
				}
				if (item.legId && !leg1) {
					leg1 = robotLegs.find(part => part.legId === item.legId);
				}
				if (item.legId && leg1) {
					leg2 = robotLegs.find(part => part.legId === item.legId);
				}
				if (item.armId && !arm1) {
					arm1 = robotArms.find(part => part.armId === item.armId);
				}
				if (item.armId && arm1) {
					arm2 = robotArms.find(part => part.armId === item.armId);
				}
			});
			if (head.count >= 1 && chassis.count >= 1 && 
				leg1.count >= 1 && leg2.count >= 1 && 
				arm1.count >= 1 && arm2.count >= 1) {
					head.count -= 1;
					chassis.count -= 1;
					leg1.count -= 1;
					leg2.count -= 1;
					arm1.count -= 1;
					arm2.count -= 1;
			} else {
				problems++;
			}
			if (problems === 0) {
				if (gameObject.robotsMade < gameObject.robotStorage) {
					gameObject.partsDisplayed = '';
					// add the robot to the list
					gameObject.robotsMade++;
					gameObject.robotTeams.push(gameObject.robotDesigns[gameObject.selectedRobotDesign]);
					// refresh the parts that are displayed
					clearSelectedPartStatDetails();
					clearRobotPreviewHighlight();

					setTimeout(function() {
						Aurora.methodSetup = {
							method: function(id) {
								drawRect({
									posX: Aurora.placeEntityX(0.50, (Aurora.entitySize * 40)),
									posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
									width: (Aurora.entitySize * 40),
									height: (Aurora.entitySize * 30),
									lineWidth: 1,
									color: 'lightslategrey',
									isFilled: true,
									id: 'robot-built-background',
									isBackground: false,
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
									msg: 'Robot Made',
									posX: Aurora.placeEntityX(0.50),
									posY: Aurora.placeEntityY(0.50),
									color: 'white',
									align: 'center',
									props: {},
									id: 'robot-built-title',
									methodId: id
								});
							}
						};
						Aurora.addMethod(Aurora.methodSetup);
						Aurora.methodSetup = {
							method: function(id) {
								drawText({
									font: '1em serif',
									msg: 'Robot Storage: ' + gameObject.robotsMade + '/' + gameObject.robotStorage,
									posX: Aurora.placeEntityX(0.50),
									posY: Aurora.placeEntityY(0.55),
									color: 'white',
									align: 'center',
									props: {},
									id: 'robot-storage-title',
									methodId: id
								});
							}
						};
						Aurora.addMethod(Aurora.methodSetup);
						const removeTitles = setInterval(function() {
							clearInterval(removeTitles);
							clearRobotBuildMessage();
							clearSelectedPartStatDetails(); // clear the stats
							refreshFactoryBackgrounds(); // refresh the background
							createFactoryTitleStats(undefined, undefined, undefined, undefined);
							const modal = Aurora.methodObjects.find(build => build.id === Aurora.modalId);
							if (!modal) {
								displaySelectPart({}, true);
							}
							if (modal) {
								Aurora.deleteEntity(modal.methodId);
								Aurora.methodSetup = {
									method: function(id) {
										drawSimpleModal({
											posX: Aurora.placeEntityX(0.50, (Aurora.entitySize * 40)),
											posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
											width: (Aurora.entitySize * 40),
											height: (Aurora.entitySize * 30),
											lineWidth: modal.lineWidth,
											modalColor: modal.modalColor,
											msgColor: modal.msgColor,
											msgFont: modal.msgFont,
											msg: modal.msg,
											footerColor: modal.footerColor,
											footerFont: modal.footerFont,
											footerMsg: modal.footerMsg,
											bgColor: modal.bgColor,
											isModalFilled: modal.isModalFilled,
											id: Aurora.modalId,
											action: modal.action,
											props: {},
											methodId: id
										});
									}
								};
								Aurora.addMethod(Aurora.methodSetup);
							}
						}, 1500);
					}, 100);
					
				} else {
					// add the parts back when storage is full
					head.count++;
					chassis.count++;
					leg1.count++;
					leg2.count++;
					arm1.count++;
					arm2.count++;
					setTimeout(function() {
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
									msgFont: '1.3em serif',
									msg: 'Robot Storage Full',
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
											gameObject.buildButtonDisabled = true;
											displaySelectPart({}, true);
											setTimeout(function() {
												createFactoryTitleStats(undefined, undefined, undefined, undefined);
											},0);
											
										}
									},
									props: {},
									methodId: id
								});
							}
						};
						Aurora.addMethod(Aurora.methodSetup);
					}, 100);
				}
				
			} else {
				setTimeout(function() {
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
								msgFont: '1.3em serif',
								msg: 'Missing Parts',
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
										gameObject.buildButtonDisabled = true;
										displaySelectPart({}, true);
										setTimeout(function() {
											createFactoryTitleStats(undefined, undefined, undefined, undefined);
										},0);
										
									}
								},
								props: {},
								methodId: id
							});
						}
					};
					Aurora.addMethod(Aurora.methodSetup);
				}, 100);
			}
			clearRobotParts();
			if (gameObject.partsDisplayed === 'leg-right') {
				displayDiscoveredParts(gameObject.discoveredLegs, 'right');
			}
			if (gameObject.partsDisplayed === 'leg-left') {
				displayDiscoveredParts(gameObject.discoveredLegs, 'left');
			}
			if (gameObject.partsDisplayed === 'arm-left') {
				displayDiscoveredParts(gameObject.discoveredArms, 'left');
			}
			if (gameObject.partsDisplayed === 'arm-right') {
				displayDiscoveredParts(gameObject.discoveredArms, 'right');
			}
			if (gameObject.partsDisplayed === 'chassis') {
				displayDiscoveredParts(gameObject.discoveredChassis, '');
			}
			if (gameObject.partsDisplayed === 'head') {
				displayDiscoveredParts(gameObject.discoveredHeads, '');
			}
		}

		function clearRobotBuildMessage() {
			const builtBg = Aurora.methodObjects.find(x => x.id === 'robot-built-background');
			if (builtBg) {
				Aurora.deleteEntity(builtBg.methodId);
			}
			const builtTitle = Aurora.methodObjects.find(x => x.id === 'robot-built-title');
			if (builtTitle) {
				Aurora.deleteEntity(builtTitle.methodId);
			}
			const storageTitle = Aurora.methodObjects.find(x => x.id === 'robot-storage-title');
			if (storageTitle) {
				Aurora.deleteEntity(storageTitle.methodId);
			}
		}
	}
}

// *** Factory Parts Page ***

const factoryParts = {
	description: 'This is where the player can build parts for their robots',
	loadPage: function() {
		function factoryRobotParts() {
			Aurora.clearStage();
			Particle.init();
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
						id: 'factory-background',
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
						id: 'part-background',
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
			if (gameObject.tutorialStep !== 11) {
				drawRobotPartButtons(); // draw the buttons in the top left
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
						id: 'factory-back-game',
						action: { method: function(id) {
							 factoryPage.loadPage();
							 gameObject.partsDisplayed = ''; 
							 gameObject.selectedRobotDesign = -1;
							 gameObject.buildButtonDisabled = false;
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
						msg: 'Parts',
						posX: Aurora.placeEntityX(0.50),
						posY: Aurora.placeEntityY(0.085),
						color: 'darkgrey',
						align: 'center',
						props: {},
						id: 'factory-title',
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			
			Aurora.pageResized = {
				section: 'factory-robot-parts',
				method: function() {
					if (gameObject.partsDisplayed === 'leg') {
						selectRobotPartLegs();
					}
					if (gameObject.partsDisplayed === 'arm') {
						selectRobotPartArms();
					}
					if (gameObject.partsDisplayed === 'chassis') {
						selectRobotPartChassis();
					}
					if (gameObject.partsDisplayed === 'head') {
						selectRobotPartHead();
					}
					const modal = Aurora.methodObjects.find(build => build.id === Aurora.modalId);
					if (modal?.isModalBtn !== undefined && modal.isModalBtn === true) {
						Aurora.deleteEntity(modal.methodId);
						setTimeout(function() {
							Aurora.methodSetup = {
								method: function(id) {
									drawSimpleModal({
										posX: Aurora.placeEntityX(0.50, (Aurora.entitySize * 40)),
										posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
										width: (Aurora.entitySize * 40),
										height: (Aurora.entitySize * 30),
										lineWidth: modal.lineWidth,
										modalColor: modal.modalColor,
										msgColor: modal.msgColor,
										msgFont: modal.msgFont,
										msg: modal.msg,
										footerColor: modal.footerColor,
										footerFont: modal.footerFont,
										footerMsg: modal.footerMsg,
										bgColor: modal.bgColor,
										isModalFilled: modal.isModalFilled,
										id: Aurora.modalId,
										action: modal.action,
										props: {},
										methodId: id
									});
								}
							};
							Aurora.addMethod(Aurora.methodSetup);
						}, 150);
					} else {
						if (modal?.methodId !== undefined && modal.isModalBtn === false) {
							Aurora.deleteEntity(modal.methodId);
							const btn = Aurora.methodObjects.find(build => build.id === 'requires-parts');
							Aurora.deleteEntity(btn.methodId);
							setTimeout(function() {
								Aurora.methodSetup = {
									method: function(id) {
										drawDialogueModal({
											posX: Aurora.placeEntityX(0.45, (Aurora.entitySize * 40)),
											posY: Aurora.placeEntityY(0.40, (Aurora.entitySize * 30)),
											width: (Aurora.entitySize * 45),
											height: (Aurora.entitySize * 50),
											lineWidth: modal.lineWidth,
											modalColor: modal.modalColor,
											msgColor: modal.msgColor,
											msgFont: modal.msgFont,
											msgs: modal.msgs,
											msgStart: Aurora.placeEntityY(0.45, (Aurora.entitySize * 30)),
											msgDistance: (Aurora.entitySize * 10),
											bgColor: modal.bgColor,
											isModalFilled: modal.isModalFilled,
											id: Aurora.modalId,
											action: modal.action,
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
											posY: Aurora.placeEntityY(0.815, (Aurora.entitySize * 30)),
											width:(Aurora.entitySize * 45) - (Aurora.canvas.width * 0.04),
											height: (Aurora.entitySize * 7),
											lineWidth: 1,
											btnColor: 'grey',
											txtColor: 'white',
											font: '1.3em serif',
											msg: 'Ok...',
											isFilled: true,
											id: 'requires-parts',
											action: { 
												method: function(id) { 
													const modal = Aurora.methodObjects.find(build => build.id === Aurora.modalId);
													Aurora.deleteEntity(modal.methodId);
													const btn = Aurora.methodObjects.find(build => build.id === 'requires-parts');
													Aurora.deleteEntity(btn.methodId);
													if (gameObject.partsDisplayed === 'chassis') {
														selectRobotPartChassis();
													} else if (gameObject.partsDisplayed === 'head') {
														selectRobotPartHead();
													} else if (gameObject.partsDisplayed === 'arm') {
														selectRobotPartArms();
													} else if (gameObject.partsDisplayed === 'leg') {
														selectRobotPartLegs();
													}
												}
											},
											isModalBtn: true,
											props: {},
											methodId: id
										});
									}
								};
								Aurora.addMethod(Aurora.methodSetup);
								
							}, 150);
						}
						
					}
				}
			}
			if (gameObject.tutorialStep === 11) {
				tutorialFactoryParts();
			}
		}
		factoryRobotParts(); // load the parts page
		function drawRobotPartButtons() {
			Aurora.methodSetup = {
				method: function(id) {
					drawButton({
						posX: Aurora.placeEntityX(0.2547, (Aurora.canvas.width * 0.44)),
						posY: Aurora.placeEntityY(0.36, (Aurora.canvas.height * 0.45)),
						width: (Aurora.canvas.width * 0.44),
						height: (Aurora.canvas.height * 0.1),
						lineWidth: 1,
						btnColor: 'lightslategrey',
						txtColor: 'white',
						font: '1.5em serif',
						msg: 'Chassis',
						isFilled: true,
						id: 'robot-body-parts',
						action: { method: function(id) { selectRobotPartChassis(); }},
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
						posX: Aurora.placeEntityX(0.2547, (Aurora.canvas.width * 0.44)),
						posY: Aurora.placeEntityY(0.47, (Aurora.canvas.height * 0.45)),
						width: (Aurora.canvas.width * 0.44),
						height: (Aurora.canvas.height * 0.1),
						lineWidth: 1,
						btnColor: 'lightslategrey',
						txtColor: 'white',
						font: '1.5em serif',
						msg: 'Heads',
						isFilled: true,
						id: 'robot-head-parts',
						action: { method: function(id) { selectRobotPartHead(); }},
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
						posX: Aurora.placeEntityX(0.2547, (Aurora.canvas.width * 0.44)),
						posY: Aurora.placeEntityY(0.58, (Aurora.canvas.height * 0.45)),
						width: (Aurora.canvas.width * 0.44),
						height: (Aurora.canvas.height * 0.1),
						lineWidth: 1,
						btnColor: 'lightslategrey',
						txtColor: 'white',
						font: '1.5em serif',
						msg: 'Arms',
						isFilled: true,
						id: 'robot-arm-parts',
						action: { method: function(id) { selectRobotPartArms(); }},
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
						posX: Aurora.placeEntityX(0.2547, (Aurora.canvas.width * 0.44)),
						posY: Aurora.placeEntityY(0.69, (Aurora.canvas.height * 0.45)),
						width: (Aurora.canvas.width * 0.44),
						height: (Aurora.canvas.height * 0.1),
						lineWidth: 1,
						btnColor: 'lightslategrey',
						txtColor: 'white',
						font: '1.5em serif',
						msg: 'Legs',
						isFilled: true,
						id: 'robot-leg-parts',
						action: { method: function(id) { selectRobotPartLegs(); }},
						isModalBtn: false,
						props: {},
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
		}
		function selectRobotPartChassis() {
			gameObject.partsDisplayed = 'chassis';
			// load up the robot parts the player has discovered...
			clearRobotPartParts();
			clearSelectedPartScrapDetails();
			refreshFactoryBackgrounds();
			clearRobotPartPreviewHighlight();
			const highlight = Aurora.methodObjects.find(item => item.id === 'robot-body-parts');
			highlight.btnColor = 'yellow';
			highlight.txtColor = 'black';
			displayDiscoveredPartParts(gameObject.discoveredChassis);
		}

		function selectRobotPartHead() {
			gameObject.partsDisplayed = 'head';
			// load up the robot parts the player has discovered...
			clearRobotPartParts();
			clearSelectedPartScrapDetails();
			refreshFactoryBackgrounds();
			clearRobotPartPreviewHighlight();
			const highlight = Aurora.methodObjects.find(item => item.id === 'robot-head-parts');
			highlight.btnColor = 'yellow';
			highlight.txtColor = 'black';
			displayDiscoveredPartParts(gameObject.discoveredHeads);
		}

		function selectRobotPartArms() {
			gameObject.partsDisplayed = 'arm';
			// load up the robot parts the player has discovered...
			clearRobotPartParts();
			clearSelectedPartScrapDetails();
			refreshFactoryBackgrounds();
			clearRobotPartPreviewHighlight();
			const highlight = Aurora.methodObjects.find(item => item.id === 'robot-arm-parts');
			highlight.btnColor = 'yellow';
			highlight.txtColor = 'black';
			displayDiscoveredPartParts(gameObject.discoveredArms);
		}

		function selectRobotPartLegs() {
			gameObject.partsDisplayed = 'leg';
			// load up the robot parts the player has discovered...
			clearRobotPartParts();
			clearSelectedPartScrapDetails();
			refreshFactoryBackgrounds();
			clearRobotPartPreviewHighlight();
			const highlight = Aurora.methodObjects.find(item => item.id === 'robot-leg-parts');
			highlight.btnColor = 'yellow';
			highlight.txtColor = 'black';
			displayDiscoveredPartParts(gameObject.discoveredLegs);
		}
		function clearRobotPartParts() {
			const chassisParts = Aurora.methodObjects.filter(x => x.id === 'robot-chassis-part');
			const headParts = Aurora.methodObjects.filter(x => x.id === 'robot-head-part');
			const legParts = Aurora.methodObjects.filter(x => x.id === 'robot-leg-part');
			const armParts = Aurora.methodObjects.filter(x => x.id === 'robot-arm-part');
			const nextBtn = Aurora.methodObjects.filter(x => x.id === 'next-part');
			const prevBtn = Aurora.methodObjects.filter(x => x.id === 'last-part');
			const partCount = Aurora.methodObjects.filter(x => x.id === 'part-count');
			if (chassisParts.length > 0) {
				chassisParts.forEach((item, i) => {
					Aurora.deleteEntity(chassisParts[i].methodId);
				});
			}
			if (headParts.length > 0) {
				headParts.forEach((item, i) => {
					Aurora.deleteEntity(headParts[i].methodId);
				});
			}
			if (legParts.length > 0) {
				legParts.forEach((item, i) => {
					Aurora.deleteEntity(legParts[i].methodId);
				});
			}
			if (armParts.length > 0) {
				armParts.forEach((item, i) => {
					Aurora.deleteEntity(armParts[i].methodId);
				});
			}
			if (nextBtn.length > 0) {
				nextBtn.forEach((item, i) => {
					Aurora.deleteEntity(nextBtn[i].methodId);
				});
			}
			if (prevBtn.length > 0) {
				prevBtn.forEach((item, i) => {
					Aurora.deleteEntity(prevBtn[i].methodId);
				});
			}
			if (partCount.length > 0) {
				partCount.forEach((item, i) => {
					Aurora.deleteEntity(partCount[i].methodId);
				});
			}
			setTimeout(function() {
				createFactoryTitleScraps(undefined);
			}, 0);
		}
		function createFactoryTitleScraps(part) {
			if (part) {
				const scrapCosts = [];
				for (const scrap in part.scrapToBuild) {
					
					if (part.scrapToBuild[scrap] > 0) {
						const scrapObj = { 
							type: scrap, 
							cost: part.scrapToBuild[scrap]
						};
						scrapCosts.push(scrapObj);
					}
				}
				Aurora.methodSetup = {
					method: function(id) {
						drawText({
							font: '0.9em serif',
							msg: part.name,
							posX: Aurora.placeEntityX(0.255),
							posY: Aurora.placeEntityY(0.62),
							color: 'grey',
							align: 'center',
							props: {},
							id: 'part-title',
							methodId: id
						});
					}
				};
				Aurora.addMethod(Aurora.methodSetup);
				Aurora.methodSetup = {
					method: function(id) {
						drawText({
							font: '0.9em serif',
							msg: 'Count: ' + part.count,
							posX: Aurora.placeEntityX(0.255),
							posY: Aurora.placeEntityY(0.655),
							color: 'grey',
							align: 'center',
							props: {},
							id: 'count-title',
							methodId: id
						});
					}
				};
				Aurora.addMethod(Aurora.methodSetup);
				Aurora.methodSetup = {
					method: function(id) {
						drawText({
							font: '2em serif',
							msg: 'Scrap',
							posX: Aurora.placeEntityX(0.25),
							posY: Aurora.placeEntityY(0.705),
							color: 'grey',
							align: 'center',
							props: {},
							id: 'scrap-title',
							methodId: id
						});
					}
				};
				Aurora.addMethod(Aurora.methodSetup);
				
				scrapCosts.forEach((scrap, i) => {
					let scrapType = '';
					let scrapCost = 0;
					let totalScrap = 0;
					if (scrap.type === 'commonScrap') {
						scrapType = 'Common';
						totalScrap = gameObject.commonScrap;
					} else if (scrap.type === 'unCommonScrap') {
						scrapType = 'Uncommon';
						totalScrap = gameObject.unCommonScrap;
					} else if (scrap.type === 'uniqueScrap') {
						scrapType = 'Unique';
						totalScrap = gameObject.uniqueScrap;
					} else if (scrap.type === 'intriguingScrap') {
						scrapType = 'Intriguing';
						totalScrap = gameObject.intriguingScrap;
					} else if (scrap.type === 'facinatingScrap') {
						scrapType = 'Facinating';
						totalScrap = gameObject.facinatingScrap;
					} else if (scrap.type === 'mythicScrap') {
						scrapType = 'Mythic';
						totalScrap = gameObject.mythicScrap;
					} else if (scrap.type === 'exoticScrap') {
						scrapType = 'Exotic';
						totalScrap = gameObject.exoticScrap;
					}
					scrapCost = scrap.cost;
					// future Jordan just under 10,000 scrapCost would fit nicely in
					// this spot
					Aurora.methodSetup = {
						method: function(id) {
							drawText({
								font: '0.9em serif',
								msg: scrapType + ': ' + scrapCost + ' (' + totalScrap + ')',
								posX: Aurora.placeEntityX(0.08),
								posY: Aurora.placeEntityY(0.75 + (i * 0.055)),
								color: 'grey',
								align: 'left',
								props: {},
								id: scrap.type,
								methodId: id
							});
						}
					};
					Aurora.addMethod(Aurora.methodSetup);
				});
			}

			clearSelectedPartScrapDetails();
			refreshFactoryBackgrounds();
		}
		function clearSelectedPartScrapDetails() {
			// clear the stats and the buttons
			const selectPartBtn = Aurora.methodObjects.filter(x => x.id === 'confirm-part');
			if (selectPartBtn) {
				selectPartBtn.forEach((item, i) => {
					Aurora.deleteEntity(item.methodId);
				});
			}
			const selectCommonScrap = Aurora.methodObjects.filter(x => x.id === 'commonScrap');
			if (selectCommonScrap) {
				selectCommonScrap.forEach((item, i) => {
					Aurora.deleteEntity(item.methodId);
				});
			}
			const selectUnCommonScrap = Aurora.methodObjects.filter(x => x.id === 'unCommonScrap');
			if (selectUnCommonScrap) {
				selectUnCommonScrap.forEach((item, i) => {
					Aurora.deleteEntity(item.methodId);
				});
			}
			const selectUniqueScrap = Aurora.methodObjects.filter(x => x.id === 'uniqueScrap');
			if (selectUniqueScrap) {
				selectUniqueScrap.forEach((item, i) => {
					Aurora.deleteEntity(item.methodId);
				});
			}
			const selectIntriguingScrap = Aurora.methodObjects.filter(x => x.id === 'intriguingScrap');
			if (selectIntriguingScrap) {
				selectIntriguingScrap.forEach((item, i) => {
					Aurora.deleteEntity(item.methodId);
				});
			}
			const selectFacinatingScrap = Aurora.methodObjects.filter(x => x.id === 'facinatingScrap');
			if (selectFacinatingScrap) {
				selectFacinatingScrap.forEach((item, i) => {
					Aurora.deleteEntity(item.methodId);
				});
			}
			const selectMythicScrap = Aurora.methodObjects.filter(x => x.id === 'mythicScrap');
			if (selectMythicScrap) {
				selectMythicScrap.forEach((item, i) => {
					Aurora.deleteEntity(item.methodId);
				});
			}
			const selectExoticScrap = Aurora.methodObjects.filter(x => x.id === 'exoticScrap');
			if (selectExoticScrap) {
				selectExoticScrap.forEach((item, i) => {
					Aurora.deleteEntity(item.methodId);
				});
			}
			// clear the titles
			const factoryTitle = Aurora.methodObjects.filter(x => x.id === 'factory-title');
			if (factoryTitle) {
				factoryTitle.forEach((item, i) => {
					Aurora.deleteEntity(item.methodId);
				});
			}
			const statTitle = Aurora.methodObjects.filter(x => x.id === 'stat-title');
			if (statTitle) {
				statTitle.forEach((item, i) => {
					Aurora.deleteEntity(item.methodId);
				});
			}
			const selectAttStat = Aurora.methodObjects.filter(x => x.id === 'part-title');
			if (selectAttStat) {
				selectAttStat.forEach((item, i) => {
					Aurora.deleteEntity(item.methodId);
				});
			}
			const selectDefStat = Aurora.methodObjects.filter(x => x.id === 'count-title');
			if (selectDefStat) {
				selectDefStat.forEach((item, i) => {
					Aurora.deleteEntity(item.methodId);
				});
			}
			const selectSpdStat = Aurora.methodObjects.filter(x => x.id === 'scrap-title');
			if (selectSpdStat) {
				selectSpdStat.forEach((item, i) => {
					Aurora.deleteEntity(item.methodId);
				});
			}
			// redraw the title here
			Aurora.methodSetup = {
				method: function(id) {
					drawText({
						font: '2.3em serif',
						msg: 'Parts',
						posX: Aurora.placeEntityX(0.50),
						posY: Aurora.placeEntityY(0.085),
						color: 'darkgrey',
						align: 'center',
						props: {},
						id: 'factory-title',
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
		}
		function clearRobotPartPreviewHighlight() {
			const headHighlight = Aurora.methodObjects.find(item => item.id === 'robot-head-parts');
			headHighlight.btnColor = 'lightslategrey';
			headHighlight.txtColor = 'white';
			const chassisHighlight = Aurora.methodObjects.find(item => item.id === 'robot-body-parts');
			chassisHighlight.btnColor = 'lightslategrey';
			chassisHighlight.txtColor = 'white';
			const armRightHighlight = Aurora.methodObjects.find(x => x.id === 'robot-arm-parts');
			armRightHighlight.btnColor = 'lightslategrey';
			armRightHighlight.txtColor = 'white';
			const legRightHighlight = Aurora.methodObjects.find(x => x.id === 'robot-leg-parts');
			legRightHighlight.btnColor = 'lightslategrey';
			legRightHighlight.txtColor = 'white';
		}
		function displayDiscoveredPartParts(partsDiscovered) {
			gameObject.discoveredPartsList = [];
			let partCount = 0;
			let currentList = [];
			partsDiscovered.forEach((item, i) => { // this will organize all the parts
				if (partCount === 5) { // into five items per page
					gameObject.discoveredPartsList.push(currentList);
					partCount = 0;
					currentList = [];
				}
				currentList.push(item);
				partCount++;
				if (i === (partsDiscovered.length - 1)) {
					gameObject.discoveredPartsList.push(currentList);
				}
			});
			if (gameObject.partPageIndex >= gameObject.discoveredPartsList.length) {
				gameObject.partPageIndex = 0;
			}
			// display all the parts on each page
			for (let i = 0; i < gameObject.discoveredPartsList[gameObject.partPageIndex].length; i++) {
				const discoveredPart = gameObject.discoveredPartsList[gameObject.partPageIndex][i];
				Aurora.methodSetup = {
					method: function(id) {
						drawButton({
							posX: Aurora.placeEntityX(0.76, (Aurora.entitySize * 22.5)),
							posY: Aurora.placeEntityY(0.330 + (i * 0.125)),
							width: (Aurora.entitySize * 22),
							height: (Aurora.entitySize * 3),
							lineWidth: 1,
							btnColor: drawActiveParts(discoveredPart, false),
							txtColor: 'black',
							font: '0.8em serif',
							msg: discoveredPart.count,
							isFilled: true,
							id: 'part-count',
							action: { 
								method: function(id) {
									gameObject.buildButtonDisabled = false;
									displaySelectPartParts(discoveredPart);
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
							posX: Aurora.placeEntityX(0.76, (Aurora.entitySize * 22.5)),
							posY: Aurora.placeEntityY(0.241 + (i * 0.125)),
							width: (Aurora.entitySize * 22),
							height: (Aurora.entitySize * 9),
							lineWidth: 1,
							btnColor: drawActiveParts(discoveredPart, false),
							txtColor: 'black',
							font: '0.8em serif',
							msg: discoveredPart.name,
							isFilled: true,
							id: 'robot-' + discoveredPart.type + '-part',
							action: { 
								method: function(id) {
									gameObject.buildButtonDisabled = false;
									displaySelectPartParts(discoveredPart);
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
			drawNextPrevPartPartsList(partsDiscovered);
			
		}
		function drawNextPrevPartPartsList(partList) {
			// the part could be head, chassis, legs or arms
			Aurora.methodSetup = {
				method: function(id) {
					drawButton({ // the btnColor is css grey
						posX: Aurora.placeEntityX(0.76, (Aurora.entitySize * 22.5)),
						posY: Aurora.placeEntityY(0.135),
						width: (Aurora.entitySize * 22),
						height: (Aurora.entitySize * 7),
						lineWidth: 1,
						btnColor: partList.length < 5 ? '#C0C0C0' : '#808080',
						txtColor: 'white',
						font: '1.5em serif',
						msg: 'Next',
						isFilled: true,
						id: 'next-part',
						action: {
							method: function(id) {
								if (partList.length > 5) {
									gameObject.partPageIndex++; // go to the next part page
									clearRobotPartParts(); // clear the previous parts
									displayDiscoveredPartParts(partList);
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
					drawButton({ // the btnColor is css grey
						posX: Aurora.placeEntityX(0.76, (Aurora.entitySize * 22.5)),
						posY: Aurora.placeEntityY(0.90),
						width: (Aurora.entitySize * 22),
						height: (Aurora.entitySize * 7),
						lineWidth: 1,
						btnColor: partList.length < 5 ? '#C0C0C0' : '#808080',
						txtColor: 'white',
						font: '1.5em serif',
						msg: 'Previous',
						isFilled: true,
						id: 'last-part',
						action: {
							method: function(id) {
								if (partList.length > 5) {
									gameObject.partPageIndex--; // go back a page
									if (gameObject.partPageIndex < 0) { // if the page is at the beginning
										// go to the last page
										gameObject.partPageIndex = (gameObject.discoveredPartsList.length - 1);
									}
									clearRobotPartParts(); // clear the previous parts
									displayDiscoveredPartParts(partList);
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
		function displaySelectPartParts(part) {
			const partChanged = true;
			setTimeout(function() {
				Aurora.methodSetup = {
					method: function(id) {
						drawButton({
							posX: Aurora.placeEntityX(0.226, (Aurora.entitySize * 19.7)),
							posY: Aurora.placeEntityY(0.90),
							width: (Aurora.entitySize * 23),
							height: (Aurora.entitySize * 7),
							lineWidth: 1,
							btnColor: !gameObject.buildButtonDisabled ? 'grey' : '#C0C0C0',
							txtColor: 'white',
							font: '1.5em serif',
							msg: 'Build',
							isFilled: true,
							id: 'confirm-part',
							action: {
								method: function(id) {
									if (part.requires !== undefined && 
									part.requires.factoryLevel <= gameObject.factoryLevel && 
									part.requires.engineeringSkill <= gameObject.engineeringSkill) {
										if (!gameObject.buildButtonDisabled) {
											if (gameObject.gameSounds) {
												addScrapSound.cloneNode(true).play();
											}
											const scrapCosts = [];
											for (const scrap in part.scrapToBuild) {
												if (part.scrapToBuild[scrap] > 0) {
													const scrapObj = {
														type: scrap, 
														cost: part.scrapToBuild[scrap]
													};
													scrapCosts.push(scrapObj);
												}
											}
											// check to see if we have all the scrap we need
											let problems = 0;
											scrapCosts.forEach((scrap, i) => {
												if (scrap.type === 'commonScrap') {
													if (gameObject.commonScrap >= scrap.cost) {
														// got the scrap
													} else {
														problems++;
													}
												} else if (scrap.type === 'unCommonScrap') {
													if (gameObject.unCommonScrap >= scrap.cost) {
														// got the scrap
													} else {
														problems++;
													}
												} else if (scrap.type === 'uniqueScrap') {
													if (gameObject.uniqueScrap >= scrap.cost) {
														// got the scrap
													} else {
														problems++;
													}
												} else if (scrap.type === 'intriguingScrap') {
													if (gameObject.intriguingScrap >= scrap.cost) {
														// got the scrap
													} else {
														problems++;
													}
												} else if (scrap.type === 'facinatingScrap') {
													if (gameObject.facinatingScrap >= scrap.cost) {
														// got the scrap
													} else {
														problems++;
													}
												} else if (scrap.type === 'mythicScrap') {
													if (gameObject.mythicScrap >= scrap.cost) {
														// got the scrap
													} else {
														problems++;
													}
												} else if (scrap.type === 'exoticScrap') {
													if (gameObject.exoticScrap >= scrap.cost) {
														// got the scrap
													} else {
														problems++;
													}
												}
											});
											// if we don't, display a message
											if (problems > 0) {
												gameObject.buildButtonDisabled = true;
												setTimeout(function() {
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
																msgFont: '1.3em serif',
																msg: 'Not Enough Scrap',
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
																		if (gameObject.partsDisplayed === 'chassis') {
																			selectRobotPartChassis();
																		} else if (gameObject.partsDisplayed === 'head') {
																			selectRobotPartHead();
																		} else if (gameObject.partsDisplayed === 'arm') {
																			selectRobotPartArms();
																		} else if (gameObject.partsDisplayed === 'leg') {
																			selectRobotPartLegs();
																		}
																	 }
																},
																props: {},
																methodId: id
															});
														}
													};
													Aurora.addMethod(Aurora.methodSetup);
												},200);
					
											} else {
												// see if there is enough storage for the part first
												if (part.count < gameObject.partStorage) {
													// if we have enough scrap, go over the list again and subtract the scrap
													scrapCosts.forEach((scrap, i) => {
														if (scrap.type === 'commonScrap') {
															if (gameObject.commonScrap >= scrap.cost) {
																gameObject.commonScrap -= scrap.cost;
															}
														} else if (scrap.type === 'unCommonScrap') {
															if (gameObject.unCommonScrap >= scrap.cost) {
																	gameObject.unCommonScrap -= scrap.cost;
															}
														} else if (scrap.type === 'uniqueScrap') {
															if (gameObject.uniqueScrap >= scrap.cost) {
																gameObject.uniqueScrap -= scrap.cost;
															}
														} else if (scrap.type === 'intriguingScrap') {
															if (gameObject.intriguingScrap >= scrap.cost) {
																gameObject.intriguingScrap -= scrap.cost;
															}
														} else if (scrap.type === 'facinatingScrap') {
															if (gameObject.facinatingScrap >= scrap.cost) {
																gameObject.facinatingScrap -= scrap.cost;
															}
														} else if (scrap.type === 'mythicScrap') {
															if (gameObject.mythicScrap >= scrap.cost) {
																gameObject.mythicScrap -= scrap.cost;
															}
														} else if (scrap.type === 'exoticScrap') {
															if (gameObject.exoticScrap >= scrap.cost) {
																gameObject.exoticScrap -= scrap.cost;
															}
														}
													});
													part.count++;
													Particle.floatingText({
														font: '2rem serif',
														msg: '+          +',
														align: 'center',
														posX: Aurora.placeEntityX(0.259, (Aurora.entitySize * 0.7)),
														posY: Aurora.placeEntityY(0.69, (Aurora.entitySize * 0.7)),
														direction: 'top',
														color: 'green',
														ticks: 13,
														speed: 0.8,
													});
												} else {
													gameObject.buildButtonDisabled = true;
													setTimeout(function() {
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
																	msgFont: '1.3em serif',
																	msg: 'Not Enough Storage',
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
																			if (gameObject.partsDisplayed === 'chassis') {
																				selectRobotPartChassis();
																			} else if (gameObject.partsDisplayed === 'head') {
																				selectRobotPartHead();
																			} else if (gameObject.partsDisplayed === 'arm') {
																				selectRobotPartArms();
																			} else if (gameObject.partsDisplayed === 'leg') {
																				selectRobotPartLegs();
																			}
																		 }
																	},
																	props: {},
																	methodId: id
																});
															}
														};
														Aurora.addMethod(Aurora.methodSetup);
													},200);
												}
											}
											if (gameObject.partsDisplayed === 'chassis') {
												displayDiscoveredPartParts(gameObject.discoveredChassis);
											} else if (gameObject.partsDisplayed === 'head') {
												displayDiscoveredPartParts(gameObject.discoveredHeads);
											} else if (gameObject.partsDisplayed === 'arm') {
												displayDiscoveredPartParts(gameObject.discoveredArms);
											} else if (gameObject.partsDisplayed === 'leg') {
												displayDiscoveredPartParts(gameObject.discoveredLegs);
											}
										}
									} else {
										// display modal
										const msgs = ['Part Requires', 'Factory Level: ' + part.requires.factoryLevel, 'Engineering Level: ' + part.requires.engineeringSkill];
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
													msgDistance: (Aurora.entitySize * 10),
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
													posY: Aurora.placeEntityY(0.815, (Aurora.entitySize * 30)),
													width:(Aurora.entitySize * 45) - (Aurora.canvas.width * 0.04),
													height: (Aurora.entitySize * 7),
													lineWidth: 1,
													btnColor: 'grey',
													txtColor: 'white',
													font: '1.3em serif',
													msg: 'Ok...',
													isFilled: true,
													id: 'requires-parts',
													action: { 
														method: function(id) { 
															const modal = Aurora.methodObjects.find(build => build.id === Aurora.modalId);
															Aurora.deleteEntity(modal.methodId);
															const btn = Aurora.methodObjects.find(build => build.id === 'requires-parts');
															Aurora.deleteEntity(btn.methodId);
															if (gameObject.partsDisplayed === 'chassis') {
																selectRobotPartChassis();
															} else if (gameObject.partsDisplayed === 'head') {
																selectRobotPartHead();
															} else if (gameObject.partsDisplayed === 'arm') {
																selectRobotPartArms();
															} else if (gameObject.partsDisplayed === 'leg') {
																selectRobotPartLegs();
															}
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
									
									
								Particle.animComplete = {
									method: function() {
										displaySelectPartParts(part);					
									}
								};
									
							}
						},
						isModalBtn: false,
						props: {},
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			createFactoryTitleScraps(part);
				
			}, 0);
		}
	}
}

// global factory methods
function refreshFactoryBackgrounds() {
	if (Aurora.methodObjects.find(x => x.id === 'robot-stat-background')) {
		Aurora.methodObjects.find(x => x.id === 'robot-stat-background').isAnim = true;
	}
	if (Aurora.methodObjects.find(x => x.id === 'part-background')) {
		Aurora.methodObjects.find(x => x.id === 'part-background').isAnim = true;
	}
	if (Aurora.methodObjects.find(x => x.id === 'factory-background')) {
		Aurora.methodObjects.find(x => x.id === 'factory-background').isAnim = true;
	}
}
function drawActiveParts(discoveredPart, isRobotPage) {
	if (isRobotPage) {
		if (discoveredPart.count > 0 && 
		discoveredPart.requires.roboticSkill <= gameObject.roboticSkill) {
			return discoveredPart.img;
		} else {
			return '#C0C0C0'
		}
	} else {
		if (discoveredPart.count > 0 && 
		discoveredPart.requires.factoryLevel <= gameObject.factoryLevel &&
		discoveredPart.requires.engineeringSkill <= gameObject.engineeringSkill) {
			return discoveredPart.img;
		} else {
			return '#C0C0C0'
		}
	}
}


