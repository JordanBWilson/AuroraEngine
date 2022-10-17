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
 // start of the sell menus
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
						// future Jordan, it's time to work on the sell parts menu
						console.log('load up the sell parts menu');
						homeSellParts();
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

function homeSellParts() {
	// future Jordan, work on selecting the different parts to sell
	Game.clearStage();
	Particle.init();
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
				id: 'factory-background',
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
				id: 'part-background',
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
	drawSellPartButtons(); // draw the buttons in the top left
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
				id: 'sell-part-back-game',
				action: { method: function(id) {
					 homeSellSelect();
					 gameObject.buildButtonDisabled = false;
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
				msg: 'Sell Parts',
				posX: Game.placeEntityX(0.50),
				posY: Game.placeEntityY(0.085),
				color: 'darkgrey',
				align: 'center',
				props: {},
				id: 'factory-title',
				methodId: id
			});
		}
	};
	Game.addMethod(Game.methodSetup);
	
	Game.pageResized = {
		section: 'home-sell-parts',
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
			const modal = Game.methodObjects.find(build => build.id === Game.modalId);
			if (modal) {
				Game.deleteEntity(modal.methodId);
				setTimeout(function() {
					Game.methodSetup = {
						method: function(id) {
							drawModal({
								posX: Game.placeEntityX(0.50, (Game.entitySize * 40)),
								posY: Game.placeEntityY(0.50, (Game.entitySize * 30)),
								width: (Game.entitySize * 40),
								height: (Game.entitySize * 30),
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
								id: Game.modalId,
								action: modal.action,
								props: {},
								methodId: id
							});
						}
					};
					Game.addMethod(Game.methodSetup);
				}, 150);
			}
		}
	}
}

function drawSellPartButtons() {
	Game.methodSetup = {
		method: function(id) {
			drawButton({
				posX: Game.placeEntityX(0.2547, (Game.canvas.width * 0.44)),
				posY: Game.placeEntityY(0.36, (Game.canvas.height * 0.45)),
				width: (Game.canvas.width * 0.44),
				height: (Game.canvas.height * 0.1),
				lineWidth: 1,
				btnColor: 'lightslategrey',
				txtColor: 'white',
				font: '1.5em serif',
				msg: 'Chassis',
				isFilled: true,
				id: 'sell-body-parts',
				action: { method: function(id) {
					// selectRobotPartChassis();
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
				posY: Game.placeEntityY(0.47, (Game.canvas.height * 0.45)),
				width: (Game.canvas.width * 0.44),
				height: (Game.canvas.height * 0.1),
				lineWidth: 1,
				btnColor: 'lightslategrey',
				txtColor: 'white',
				font: '1.5em serif',
				msg: 'Heads',
				isFilled: true,
				id: 'sell-head-parts',
				action: { method: function(id) {
					// selectRobotPartHead();
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
				posY: Game.placeEntityY(0.58, (Game.canvas.height * 0.45)),
				width: (Game.canvas.width * 0.44),
				height: (Game.canvas.height * 0.1),
				lineWidth: 1,
				btnColor: 'lightslategrey',
				txtColor: 'white',
				font: '1.5em serif',
				msg: 'Arms',
				isFilled: true,
				id: 'sell-arm-parts',
				action: { method: function(id) {
					// selectRobotPartArms();
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
				posY: Game.placeEntityY(0.69, (Game.canvas.height * 0.45)),
				width: (Game.canvas.width * 0.44),
				height: (Game.canvas.height * 0.1),
				lineWidth: 1,
				btnColor: 'lightslategrey',
				txtColor: 'white',
				font: '1.5em serif',
				msg: 'Legs',
				isFilled: true,
				id: 'sell-leg-parts',
				action: { method: function(id) {
					// selectRobotPartLegs(); 
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
						gameObject.buildButtonDisabled = false;
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
	Particle.init();
	
	Game.pageResized = {
		section: 'home-sell-scrap',
		method: function() {
			if (gameObject.scrapToSell === 'common') {
				selectCommonScrap();
			}
			if (gameObject.scrapToSell === 'unCommon') {
				selectUnCommonScrap();
			}
			if (gameObject.scrapToSell === 'unique') {
				selectUniqueScrap();
			}
			if (gameObject.scrapToSell === 'intriguing') {
				selectIntriguingScrap();
			}
			if (gameObject.scrapToSell === 'facinating') {
				selectFacinatingScrap();
			}
			if (gameObject.scrapToSell === 'mythic') {
				selectMythicScrap();
			}
			if (gameObject.scrapToSell === 'exotic') {
				selectExoticScrap();
			}
			const modal = Game.methodObjects.find(build => build.id === Game.modalId);
			if (modal) {
				Game.deleteEntity(modal.methodId);
				setTimeout(function() {
					Game.methodSetup = {
						method: function(id) {
							drawModal({
								posX: Game.placeEntityX(0.50, (Game.entitySize * 40)),
								posY: Game.placeEntityY(0.50, (Game.entitySize * 30)),
								width: (Game.entitySize * 40),
								height: (Game.entitySize * 30),
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
								id: Game.modalId,
								action: modal.action,
								props: {},
								methodId: id
							});
						}
					};
					Game.addMethod(Game.methodSetup);
				}, 150);
			}
		}
	}
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
	gameObject.buildButtonDisabled = false;
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
	gameObject.buildButtonDisabled = false;
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
	gameObject.buildButtonDisabled = false;
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
	gameObject.buildButtonDisabled = false;
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
	gameObject.buildButtonDisabled = false;
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
	gameObject.buildButtonDisabled = false;
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
	gameObject.buildButtonDisabled = false;
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
	Game.methodSetup = {
		method: function(id) {
			drawButton({
				posX: Game.placeEntityX(0.73, (Game.canvas.width * 0.44)),
				posY: Game.placeEntityY(1.111, (Game.canvas.height * 0.45)),
				width: (Game.canvas.width * 0.44),
				height: (Game.canvas.height * 0.08),
				lineWidth: 1,
				btnColor: sellScrapBtnActivity(),
				txtColor: 'white',
				font: '1.1em serif',
				msg: 'Sell',
				isFilled: true,
				id: 'sell-scrap-btn',
				action: { 
					method: function(id) {
						const modal = Game.methodObjects.find(build => build.id === Game.modalId);
						let displayModal = false;
						if (gameObject.scrapToSell === 'common' && gameObject.commonScrap > 0 && !gameObject.buildButtonDisabled) {
							gameObject.commonScrap--;
							Particle.floatingText({
								font: '2rem serif',
								msg: '+          +',
								align: 'center',
								posX: Game.placeEntityX(0.719, (Game.entitySize * 0.7)),
								posY: Game.placeEntityY(0.21, (Game.entitySize * 0.7)),
								direction: 'top',
								color: 'green',
								ticks: 13,
								speed: 0.8,
							});
							addFunds(gameObject.commonScrapBase);
							if (gameObject.commonScrap === 0) {
								displayModal = true;
							}
						}
						if (gameObject.scrapToSell === 'unCommon' && gameObject.unCommonScrap > 0 && !modal) {
							gameObject.unCommonScrap--;
							Particle.floatingText({
								font: '2rem serif',
								msg: '+          +',
								align: 'center',
								posX: Game.placeEntityX(0.719, (Game.entitySize * 0.7)),
								posY: Game.placeEntityY(0.21, (Game.entitySize * 0.7)),
								direction: 'top',
								color: 'green',
								ticks: 13,
								speed: 0.8,
							});
							addFunds(gameObject.unCommonScrapBase);
							if (gameObject.unCommonScrap === 0) {
								displayModal = true;
							}
						}
						if (gameObject.scrapToSell === 'unique' && gameObject.uniqueScrap > 0 && !modal) {
							gameObject.uniqueScrap--;
							Particle.floatingText({
								font: '2rem serif',
								msg: '+          +',
								align: 'center',
								posX: Game.placeEntityX(0.719, (Game.entitySize * 0.7)),
								posY: Game.placeEntityY(0.21, (Game.entitySize * 0.7)),
								direction: 'top',
								color: 'green',
								ticks: 13,
								speed: 0.8,
							});
							addFunds(gameObject.uniqueScrapBase);
							if (gameObject.uniqueScrap === 0) {
								displayModal = true;
							}
						}
						if (gameObject.scrapToSell === 'intriguing' && gameObject.intriguingScrap > 0 && !modal) {
							gameObject.intriguingScrap--;
							Particle.floatingText({
								font: '2rem serif',
								msg: '+          +',
								align: 'center',
								posX: Game.placeEntityX(0.719, (Game.entitySize * 0.7)),
								posY: Game.placeEntityY(0.21, (Game.entitySize * 0.7)),
								direction: 'top',
								color: 'green',
								ticks: 13,
								speed: 0.8,
							});
							addFunds(gameObject.intriguingScrapBase);
							if (gameObject.intriguingScrap === 0) {
								displayModal = true;
							}
						}
						if (gameObject.scrapToSell === 'facinating' && gameObject.facinatingScrap > 0 && !modal) {
							gameObject.facinatingScrap--;
							Particle.floatingText({
								font: '2rem serif',
								msg: '+          +',
								align: 'center',
								posX: Game.placeEntityX(0.719, (Game.entitySize * 0.7)),
								posY: Game.placeEntityY(0.21, (Game.entitySize * 0.7)),
								direction: 'top',
								color: 'green',
								ticks: 13,
								speed: 0.8,
							});
							addFunds(gameObject.facinatingScrapBase);
							if (gameObject.facinatingScrap === 0) {
								displayModal = true;
							}
						}
						if (gameObject.scrapToSell === 'mythic' && gameObject.mythicScrap > 0 && !modal) {
							gameObject.mythicScrap--;
							Particle.floatingText({
								font: '2rem serif',
								msg: '+          +',
								align: 'center',
								posX: Game.placeEntityX(0.719, (Game.entitySize * 0.7)),
								posY: Game.placeEntityY(0.21, (Game.entitySize * 0.7)),
								direction: 'top',
								color: 'green',
								ticks: 13,
								speed: 0.8,
							});
							addFunds(gameObject.mythicScrapBase);
							if (gameObject.mythicScrap === 0) {
								displayModal = true;
							}
						}
						if (gameObject.scrapToSell === 'exotic' && gameObject.exoticScrap > 0 && !modal) {
							gameObject.exoticScrap--;
							Particle.floatingText({
								font: '2rem serif',
								msg: '+          +',
								align: 'center',
								posX: Game.placeEntityX(0.719, (Game.entitySize * 0.7)),
								posY: Game.placeEntityY(0.21, (Game.entitySize * 0.7)),
								direction: 'top',
								color: 'green',
								ticks: 13,
								speed: 0.8,
							});
							addFunds(gameObject.exoticScrapBase);
							if (gameObject.exoticScrap === 0) {
								displayModal = true;
							}
						}
						particleAnimationOver();
						
						clearSellScrapScreen();
						refreshSellScrapBackgrounds();
						setTimeout(function() {
							selectScrapPrice(gameObject.scrapToSell);
							if (gameObject.buildButtonDisabled && !modal) {
								setTimeout(function() {
									displayNotEnoughScrapModal();
								}, 0);
								
							}
							if (displayModal) {
								gameObject.buildButtonDisabled = true;
							}
						}, 0);
					}
				},
				props: {},
				methodId: id
			});
		}
	};
	Game.addMethod(Game.methodSetup);
}

function particleAnimationOver() {
	Particle.animComplete = {
		method: function() {
			const modal = Game.methodObjects.find(build => build.id === Game.modalId);
			setTimeout(function() {
				clearSellScrapScreen();
				refreshSellScrapBackgrounds();
				setTimeout(function() {
					selectScrapPrice(gameObject.scrapToSell);
					if (modal) {
						// future Jordan, will this work?
						// works for now at least
						setTimeout(function() {
							modal.modalColor = 'darkgray';
						}, 0);
					}
					console.log(modal);
					}, 0);
			}, 0);				
		}
	};
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

function sellScrapBtnActivity() {
	if (gameObject.scrapToSell === 'common') {
		return gameObject.commonScrap <= 0 ? '#C0C0C0' : 'grey';
	}
	if (gameObject.scrapToSell === 'unCommon') {
		return gameObject.unCommonScrap <= 0 ? '#C0C0C0' : 'grey';
	}
	if (gameObject.scrapToSell === 'unique') {
		return gameObject.uniqueScrap <= 0 ? '#C0C0C0' : 'grey';
	}
	if (gameObject.scrapToSell === 'intriguing') {
		return gameObject.intriguingScrap <= 0 ? '#C0C0C0' : 'grey';
	}
	if (gameObject.scrapToSell === 'facinating') {
		return gameObject.facinatingScrap <= 0 ? '#C0C0C0' : 'grey';
	}
	if (gameObject.scrapToSell === 'mythic') {
		return gameObject.mythicScrap <= 0 ? '#C0C0C0' : 'grey';
	}
	if (gameObject.scrapToSell === 'exotic') {
		return gameObject.exoticScrap <= 0 ? '#C0C0C0' : 'grey';
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
function displayNotEnoughScrapModal() {
	Game.methodSetup = {
		method: function(id) {
			drawModal({
				posX: Game.placeEntityX(0.50, (Game.entitySize * 40)),
				posY: Game.placeEntityY(0.50, (Game.entitySize * 30)),
				width: (Game.entitySize * 40),
				height: (Game.entitySize * 30),
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
				id: Game.modalId,
				action: { 
					method: function(id) {
						const modal = Game.methodObjects.find(build => build.id === Game.modalId);
						Game.deleteEntity(modal.methodId);
						clearSellScrapScreen();
						refreshSellScrapBackgrounds();
						setTimeout(function() {
							selectScrapPrice(gameObject.scrapToSell);
						}, 0);
					}
				},
				props: {},
				methodId: id
			});
		}
	};
	Game.addMethod(Game.methodSetup);
}
