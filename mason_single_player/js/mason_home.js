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

const homePage = {
	description: 'This is where the player can sell, upgrade and quest',
	loadPage: function() {
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
								mainPage.loadPage();
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
								homeSellMenus.loadPage();
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
		homeMenuSelect(); // draw the home page
	}
}

// *** Home Sell Menus Page ***

const homeSellMenus = {
	description: 'This is where the player can sell their scrap, parts and robots',
	loadPage: function() {
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
								homePage.loadPage();
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
								homeSellScrap.loadPage();
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
								homeSellParts.loadPage();
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
								homeSellRobots.loadPage();
							}
						},
						props: {},
						methodId: id
					});
				}
			};
			Game.addMethod(Game.methodSetup);
		}
		homeSellSelect(); // display the sell menu
	}
}

// *** Home Sell Scrap Page ***

const homeSellScrap = {
	description: 'This is where the player can sell their scrap',
	loadPage: function() {
		// start of sell scrap menu
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
								homeSellMenus.loadPage();
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
			displayCondensedFunds(0.715, 0.245, 0.715, 0.295, '1.2em serif', 'grey', 'center');
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
		homeSellScrap();
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
			displayCondensedFunds(0.715, 0.245, 0.715, 0.295, '1.2em serif', 'grey', 'center');
			
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
							posX: Game.placeEntityX(0.715),
							posY: Game.placeEntityY(0.635 + (i * 0.045)),
							color: 'green',
							align: 'center',
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
								modal.modalColor = 'darkgray';
								setTimeout(function() {
									modal.modalColor = 'darkgray';
								}, 150);
							}
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
	}	
}

// *** Home Sell Parts Page ***

const homeSellParts = {
	description: 'This is where the player can sell their parts',
	loadPage: function() {
		function homeSellParts() {
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
						id: 'sell-part-background',
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
							 homeSellMenus.loadPage();
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
						id: 'sell-part-title',
						methodId: id
					});
				}
			};
			Game.addMethod(Game.methodSetup);
			
			Game.pageResized = {
				section: 'home-sell-parts',
				method: function() {
					if (gameObject.partsDisplayed === 'leg') {
						selectSellPartLegs();
					}
					if (gameObject.partsDisplayed === 'arm') {
						selectSellPartArms();
					}
					if (gameObject.partsDisplayed === 'chassis') {
						selectSellPartChassis();
					}
					if (gameObject.partsDisplayed === 'head') {
						selectSellPartHead();
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
		homeSellParts(); // load up the page
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
							selectSellPartChassis();
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
							selectSellPartHead();
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
							selectSellPartArms();
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
							selectSellPartLegs();
							}
						},
						props: {},
						methodId: id
					});
				}
			};
			Game.addMethod(Game.methodSetup);
		}
		
		function selectSellPartChassis() {
			gameObject.partsDisplayed = 'chassis';
			// load up the robot parts the player has discovered...
			clearSellRobotPartParts();
			clearSelectedSellPartScrapDetails();
			refreshSellPartsBackgrounds();
			clearSellRobotPartPreviewHighlight();
			const highlight = Game.methodObjects.find(item => item.id === 'sell-body-parts');
			highlight.btnColor = 'yellow';
			highlight.txtColor = 'black';
			displayDiscoveredSellPartParts(gameObject.discoveredChassis);
		}
		
		function selectSellPartHead() {
			gameObject.partsDisplayed = 'head';
			// load up the robot parts the player has discovered...
			clearSellRobotPartParts();
			clearSelectedSellPartScrapDetails();
			refreshSellPartsBackgrounds();
			clearSellRobotPartPreviewHighlight();
			const highlight = Game.methodObjects.find(item => item.id === 'sell-head-parts');
			highlight.btnColor = 'yellow';
			highlight.txtColor = 'black';
			displayDiscoveredSellPartParts(gameObject.discoveredHeads);
		}

		function selectSellPartArms() {
			gameObject.partsDisplayed = 'arm';
			// load up the robot parts the player has discovered...
			clearSellRobotPartParts();
			clearSelectedSellPartScrapDetails();
			refreshSellPartsBackgrounds();
			clearSellRobotPartPreviewHighlight();
			const highlight = Game.methodObjects.find(item => item.id === 'sell-arm-parts');
			highlight.btnColor = 'yellow';
			highlight.txtColor = 'black';
			displayDiscoveredSellPartParts(gameObject.discoveredArms);
		}

		function selectSellPartLegs() {
			gameObject.partsDisplayed = 'leg';
			// load up the robot parts the player has discovered...
			clearSellRobotPartParts();
			clearSelectedSellPartScrapDetails();
			refreshSellPartsBackgrounds();
			clearSellRobotPartPreviewHighlight();
			const highlight = Game.methodObjects.find(item => item.id === 'sell-leg-parts');
			highlight.btnColor = 'yellow';
			highlight.txtColor = 'black';
			displayDiscoveredSellPartParts(gameObject.discoveredLegs);
		}

		function displayDiscoveredSellPartParts(partsDiscovered) {
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
				Game.methodSetup = {
					method: function(id) {
						drawButton({
							posX: Game.placeEntityX(0.76, (Game.entitySize * 22.5)),
							posY: Game.placeEntityY(0.330 + (i * 0.125)),
							width: (Game.entitySize * 22),
							height: (Game.entitySize * 3),
							lineWidth: 1,
							btnColor: drawActiveSellParts(discoveredPart.img, discoveredPart.count),
							txtColor: 'black',
							font: '0.8em serif',
							msg: discoveredPart.count,
							isFilled: true,
							id: 'part-count',
							action: { 
								method: function(id) {
									gameObject.buildButtonDisabled = false;
									displaySelectSellPartParts(discoveredPart);
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
							posX: Game.placeEntityX(0.76, (Game.entitySize * 22.5)),
							posY: Game.placeEntityY(0.241 + (i * 0.125)),
							width: (Game.entitySize * 22),
							height: (Game.entitySize * 9),
							lineWidth: 1,
							btnColor: drawActiveSellParts(discoveredPart.img, discoveredPart.count),
							txtColor: 'black',
							font: '0.8em serif',
							msg: discoveredPart.name,
							isFilled: true,
							id: 'robot-' + discoveredPart.type + '-part',
							action: { 
								method: function(id) {
									gameObject.buildButtonDisabled = false;
									displaySelectSellPartParts(discoveredPart);
								}
							},
							props: {},
							methodId: id
						});
					}
				};
				Game.addMethod(Game.methodSetup);
			}
			drawNextPrevSellPartPartsList(partsDiscovered);
		}
		function drawNextPrevSellPartPartsList(partList) {
			// the part could be head, chassis, legs or arms
			Game.methodSetup = {
				method: function(id) {
					drawButton({ // the btnColor is css grey
						posX: Game.placeEntityX(0.76, (Game.entitySize * 22.5)),
						posY: Game.placeEntityY(0.135),
						width: (Game.entitySize * 22),
						height: (Game.entitySize * 7),
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
									clearSellRobotPartParts(); // clear the previous parts
									displayDiscoveredSellPartParts(partList);
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
					drawButton({ // the btnColor is css grey
						posX: Game.placeEntityX(0.76, (Game.entitySize * 22.5)),
						posY: Game.placeEntityY(0.90),
						width: (Game.entitySize * 22),
						height: (Game.entitySize * 7),
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
									clearSellRobotPartParts(); // clear the previous parts
									displayDiscoveredSellPartParts(partList);
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

		function displaySelectSellPartParts(part) {
			const partChanged = true;
			setTimeout(function() {
				Game.methodSetup = {
					method: function(id) {
						drawButton({
							posX: Game.placeEntityX(0.226, (Game.entitySize * 19.7)),
							posY: Game.placeEntityY(0.90),
							width: (Game.entitySize * 23),
							height: (Game.entitySize * 7),
							lineWidth: 1,
							btnColor: !gameObject.buildButtonDisabled ? 'grey' : '#C0C0C0',
							txtColor: 'white',
							font: '1.5em serif',
							msg: 'Sell',
							isFilled: true,
							id: 'confirm-part',
							action: {
								method: function(id) {
									if (!gameObject.buildButtonDisabled) {
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
										// calculate how much we can sell the part for
										// add the funds and subtract the part
										if (part.count > 0) {
											const formatPartCost = calculatePartPrice(scrapCosts);
											const addPartCost = [
												{ money: 'mythryl', price: formatPartCost.mythryl },
												{ money: 'platinum', price: formatPartCost.platinum },
												{ money: 'gold', price: formatPartCost.gold },
												{ money: 'silver', price: formatPartCost.silver },
												{ money: 'bronze', price: formatPartCost.bronze },
												{ money: 'copper', price: formatPartCost.copper }
											];
											addFunds(addPartCost);
											part.count--;
											Particle.floatingText({
												font: '2rem serif',
												msg: '+          +',
												align: 'center',
												posX: Game.placeEntityX(0.259, (Game.entitySize * 0.7)),
												posY: Game.placeEntityY(0.72, (Game.entitySize * 0.7)),
												direction: 'top',
												color: 'green',
												ticks: 13,
												speed: 0.8,
											});
											clearSellRobotPartParts();
											refreshSellPartsBackgrounds();
											setTimeout(function() {
												displaySelectSellPartParts(part);
											}, 0);
										} else {
											gameObject.buildButtonDisabled = true;
											setTimeout(function() {
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
															msg: 'Not Enough Parts',
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
																	displaySelectSellPartParts(part);
																 }
															},
															props: {},
															methodId: id
														});
													}
												};
												Game.addMethod(Game.methodSetup);
											},200);
										}
										if (gameObject.partsDisplayed === 'chassis') {
											displayDiscoveredSellPartParts(gameObject.discoveredChassis);
										} else if (gameObject.partsDisplayed === 'head') {
											displayDiscoveredSellPartParts(gameObject.discoveredHeads);
										} else if (gameObject.partsDisplayed === 'arm') {
											displayDiscoveredSellPartParts(gameObject.discoveredArms);
										} else if (gameObject.partsDisplayed === 'leg') {
											displayDiscoveredSellPartParts(gameObject.discoveredLegs);
										}
									}
										
									Particle.animComplete = {
										method: function() {
											displaySelectSellPartParts(part);					
										}
									};
										
								}
							},
							props: {},
							methodId: id
						});
					}
				};
				Game.addMethod(Game.methodSetup);
				createSellPartTitleScraps(part);
			}, 0);
		}

		function drawActiveSellParts(activeColor, count) {
			if (count > 0) {
				return activeColor;
			} else {
				return '#C0C0C0'
			}
		}

		function clearSelectedSellPartScrapDetails() {
			// clear the stats and the buttons
			const selectPartBtn = Game.methodObjects.filter(x => x.id === 'confirm-part');
			if (selectPartBtn) {
				selectPartBtn.forEach((item, i) => {
					Game.deleteEntity(item.methodId);
				});
			}
			const selectCommonScrap = Game.methodObjects.filter(x => x.id === 'commonScrap');
			if (selectCommonScrap) {
				selectCommonScrap.forEach((item, i) => {
					Game.deleteEntity(item.methodId);
				});
			}
			const selectUnCommonScrap = Game.methodObjects.filter(x => x.id === 'unCommonScrap');
			if (selectUnCommonScrap) {
				selectUnCommonScrap.forEach((item, i) => {
					Game.deleteEntity(item.methodId);
				});
			}
			const selectUniqueScrap = Game.methodObjects.filter(x => x.id === 'uniqueScrap');
			if (selectUniqueScrap) {
				selectUniqueScrap.forEach((item, i) => {
					Game.deleteEntity(item.methodId);
				});
			}
			const selectIntriguingScrap = Game.methodObjects.filter(x => x.id === 'intriguingScrap');
			if (selectIntriguingScrap) {
				selectIntriguingScrap.forEach((item, i) => {
					Game.deleteEntity(item.methodId);
				});
			}
			const selectFacinatingScrap = Game.methodObjects.filter(x => x.id === 'facinatingScrap');
			if (selectFacinatingScrap) {
				selectFacinatingScrap.forEach((item, i) => {
					Game.deleteEntity(item.methodId);
				});
			}
			const selectMythicScrap = Game.methodObjects.filter(x => x.id === 'mythicScrap');
			if (selectMythicScrap) {
				selectMythicScrap.forEach((item, i) => {
					Game.deleteEntity(item.methodId);
				});
			}
			const selectExoticScrap = Game.methodObjects.filter(x => x.id === 'exoticScrap');
			if (selectExoticScrap) {
				selectExoticScrap.forEach((item, i) => {
					Game.deleteEntity(item.methodId);
				});
			}
			// clear the titles
			const factoryTitle = Game.methodObjects.filter(x => x.id === 'sell-part-title');
			if (factoryTitle) {
				factoryTitle.forEach((item, i) => {
					Game.deleteEntity(item.methodId);
				});
			}
			const statTitle = Game.methodObjects.filter(x => x.id === 'stat-title');
			if (statTitle) {
				statTitle.forEach((item, i) => {
					Game.deleteEntity(item.methodId);
				});
			}
			const selectPartTitle = Game.methodObjects.filter(x => x.id === 'part-title');
			if (selectPartTitle) {
				selectPartTitle.forEach((item, i) => {
					Game.deleteEntity(item.methodId);
				});
			}
			const selectCountTitle = Game.methodObjects.filter(x => x.id === 'count-title');
			if (selectCountTitle) {
				selectCountTitle.forEach((item, i) => {
					Game.deleteEntity(item.methodId);
				});
			}
			const selectFundTitle = Game.methodObjects.filter(x => x.id === 'fund-title');
			if (selectFundTitle) {
				selectFundTitle.forEach((item, i) => {
					Game.deleteEntity(item.methodId);
				});
			}
			const selectSellTitle = Game.methodObjects.filter(x => x.id === 'sell-title'); // sell-part-high
			if (selectSellTitle) {
				selectSellTitle.forEach((item, i) => {
					Game.deleteEntity(item.methodId);
				});
			}
			const selectMoneyHigh = Game.methodObjects.filter(x => x.id === 'player-funds-high');
			if (selectMoneyHigh) {
				selectMoneyHigh.forEach((item, i) => {
					Game.deleteEntity(item.methodId);
				});
			}
			const selectMoneyLow = Game.methodObjects.filter(x => x.id === 'player-funds-low');
			if (selectMoneyLow) {
				selectMoneyLow.forEach((item, i) => {
					Game.deleteEntity(item.methodId);
				});
			}
			const selectSellPartHigh = Game.methodObjects.filter(x => x.id === 'sell-part-high');
			if (selectSellPartHigh) {
				selectSellPartHigh.forEach((item, i) => {
					Game.deleteEntity(item.methodId);
				});
			}
			const selectSellPartLow = Game.methodObjects.filter(x => x.id === 'sell-part-low');
			if (selectSellPartLow) {
				selectSellPartLow.forEach((item, i) => {
					Game.deleteEntity(item.methodId);
				});
			}
			// redraw the title here
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
						id: 'sell-part-title',
						methodId: id
					});
				}
			};
			Game.addMethod(Game.methodSetup);
		}

		function clearSellRobotPartParts() {
			const chassisParts = Game.methodObjects.filter(x => x.id === 'robot-chassis-part');
			const headParts = Game.methodObjects.filter(x => x.id === 'robot-head-part');
			const legParts = Game.methodObjects.filter(x => x.id === 'robot-leg-part');
			const armParts = Game.methodObjects.filter(x => x.id === 'robot-arm-part');
			const nextBtn = Game.methodObjects.filter(x => x.id === 'next-part');
			const prevBtn = Game.methodObjects.filter(x => x.id === 'last-part');
			const partCount = Game.methodObjects.filter(x => x.id === 'part-count');
			if (chassisParts.length > 0) {
				chassisParts.forEach((item, i) => {
					Game.deleteEntity(chassisParts[i].methodId);
				});
			}
			if (headParts.length > 0) {
				headParts.forEach((item, i) => {
					Game.deleteEntity(headParts[i].methodId);
				});
			}
			if (legParts.length > 0) {
				legParts.forEach((item, i) => {
					Game.deleteEntity(legParts[i].methodId);
				});
			}
			if (armParts.length > 0) {
				armParts.forEach((item, i) => {
					Game.deleteEntity(armParts[i].methodId);
				});
			}
			if (nextBtn.length > 0) {
				nextBtn.forEach((item, i) => {
					Game.deleteEntity(nextBtn[i].methodId);
				});
			}
			if (prevBtn.length > 0) {
				prevBtn.forEach((item, i) => {
					Game.deleteEntity(prevBtn[i].methodId);
				});
			}
			if (partCount.length > 0) {
				partCount.forEach((item, i) => {
					Game.deleteEntity(partCount[i].methodId);
				});
			}
			setTimeout(function() {
				createSellPartTitleScraps(undefined);
			}, 0);
		}

		function clearSellRobotPartPreviewHighlight() {
			const headHighlight = Game.methodObjects.find(item => item.id === 'sell-head-parts');
			headHighlight.btnColor = 'lightslategrey';
			headHighlight.txtColor = 'white';
			const chassisHighlight = Game.methodObjects.find(item => item.id === 'sell-body-parts');
			chassisHighlight.btnColor = 'lightslategrey';
			chassisHighlight.txtColor = 'white';
			const armRightHighlight = Game.methodObjects.find(x => x.id === 'sell-arm-parts');
			armRightHighlight.btnColor = 'lightslategrey';
			armRightHighlight.txtColor = 'white';
			const legRightHighlight = Game.methodObjects.find(x => x.id === 'sell-leg-parts');
			legRightHighlight.btnColor = 'lightslategrey';
			legRightHighlight.txtColor = 'white';
		}

		function createSellPartTitleScraps(part) {
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
				Game.methodSetup = {
					method: function(id) {
						drawText({
							font: '0.9em serif',
							msg: part.name,
							posX: Game.placeEntityX(0.255),
							posY: Game.placeEntityY(0.62),
							color: 'grey',
							align: 'center',
							props: {},
							id: 'part-title',
							methodId: id
						});
					}
				};
				Game.addMethod(Game.methodSetup);
				Game.methodSetup = {
					method: function(id) {
						drawText({
							font: '0.9em serif',
							msg: 'Count: ' + part.count,
							posX: Game.placeEntityX(0.255),
							posY: Game.placeEntityY(0.655),
							color: 'grey',
							align: 'center',
							props: {},
							id: 'count-title',
							methodId: id
						});
					}
				};
				Game.addMethod(Game.methodSetup);
				Game.methodSetup = {
					method: function(id) {
						drawText({
							font: '1.3em serif',
							msg: 'Funds',
							posX: Game.placeEntityX(0.25),
							posY: Game.placeEntityY(0.69),
							color: 'grey',
							align: 'center',
							props: {},
							id: 'fund-title',
							methodId: id
						});
					}
				};
				Game.addMethod(Game.methodSetup);
				displayCondensedFunds(0.25, 0.72, 0.25, 0.755, '1em serif', 'grey', 'center');
				
				Game.methodSetup = {
					method: function(id) {
						drawText({
							font: '1.3em serif',
							msg: 'Sell Price',
							posX: Game.placeEntityX(0.25),
							posY: Game.placeEntityY(0.80),
							color: 'grey',
							align: 'center',
							props: {},
							id: 'sell-title',
							methodId: id
						});
					}
				};
				Game.addMethod(Game.methodSetup);
				const formatPartCost = calculatePartPrice(scrapCosts);
				// display the top two highest money type
				const displayPartValue = {
					highValue: {
						type: '',
						value: 0
					},
					lowValue: {
						type: '',
						value: 0
					}
				}
				if (formatPartCost.mythryl > 0) {
					displayPartValue.highValue = {
						type: 'Mythryl', 
						value: formatPartCost.mythryl
					}
					displayPartValue.lowValue = {
						type: 'Platinum', 
						value: formatPartCost.platinum
					}
				} else if (formatPartCost.platinum > 0) {
					displayPartValue.highValue = {
						type: 'Platinum', 
						value: formatPartCost.platinum
					}
					displayPartValue.lowValue = {
						type: 'Gold', 
						value: formatPartCost.gold
					}
				} else if (formatPartCost.gold > 0) {
					displayPartValue.highValue = {
						type: 'Gold', 
						value: formatPartCost.gold
					}
					displayPartValue.lowValue = {
						type: 'Silver', 
						value: formatPartCost.silver
					}
				} else if (formatPartCost.silver > 0) {
					displayPartValue.highValue = {
						type: 'Silver', 
						value: formatPartCost.silver
					}
					displayPartValue.lowValue = {
						type: 'Bronze', 
						value: formatPartCost.bronze
					}
				} else if (formatPartCost.bronze > 0) {
					displayPartValue.highValue = {
						type: 'Bronze', 
						value: formatPartCost.bronze
					}
					displayPartValue.lowValue = {
						type: 'Copper', 
						value: formatPartCost.copper
					}
				} else if (formatPartCost.copper > 0) {
					displayPartValue.highValue = {
						type: 'Copper', 
						value: formatPartCost.copper
					}
				}
				
				Game.methodSetup = {
					method: function(id) {
						drawText({
							font: '1em serif',
							msg: displayPartValue.highValue.type + ': ' + displayPartValue.highValue.value,
							posX: Game.placeEntityX(0.25),
							posY: Game.placeEntityY(0.83),
							color: 'green',
							align: 'center',
							props: {},
							id: 'sell-part-high',
							methodId: id
						});
					}
				};
				Game.addMethod(Game.methodSetup);
				if (displayPartValue.lowValue.value) {
					Game.methodSetup = {
						method: function(id) {
							drawText({
								font: '1em serif',
								msg: displayPartValue.lowValue.type + ': ' + displayPartValue.lowValue.value,
								posX: Game.placeEntityX(0.25),
								posY: Game.placeEntityY(0.865),
								color: 'green',
								align: 'center',
								props: {},
								id: 'sell-part-low',
								methodId: id
							});
						}
					};
					Game.addMethod(Game.methodSetup);
				}
			}

			clearSelectedSellPartScrapDetails();
			refreshSellPartsBackgrounds();
		}

		function refreshSellPartsBackgrounds() {
			if (Game.methodObjects.find(x => x.id === 'robot-stat-background')) {
				Game.methodObjects.find(x => x.id === 'robot-stat-background').isAnim = true;
			}
			if (Game.methodObjects.find(x => x.id === 'part-background')) {
				Game.methodObjects.find(x => x.id === 'part-background').isAnim = true;
			}
			if (Game.methodObjects.find(x => x.id === 'sell-part-background')) {
				Game.methodObjects.find(x => x.id === 'sell-part-background').isAnim = true;
			}
		}
	}
}

// *** Home Sell Robot Page ***

// future Jordan, break down the costs of each part on the right side
// of the robot sell details. in the sell robot select screen, we need
// to add navigation at the bottom for pagination. the sell robot select
// screen should only display 6 robots made in robotTeams per page
const homeSellRobots = {
	description: 'This is where the player can sell their robots',
	loadPage: function() {
		function sellRobotSelect() {
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
						id: 'factory-back-game',
						action: { 
							method: function(id) { 
								homeSellMenus.loadPage();
								gameObject.partsDisplayed = ''; 
								gameObject.selectedRobotDesign = -1;
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
						font: '2.1em serif',
						msg: 'Sell Robots',
						posX: Game.placeEntityX(0.525),
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
						id: 'robot-select-background',
						isBackground: true,
						props: {},
						methodId: id
					});
				}
			};
			Game.addMethod(Game.methodSetup);
			let robotCount = 0;
			let robotSelectRow = 1;
			for (let i = 0; i < gameObject.robotTeams.length; i++) {
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
					i
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

			Game.pageResized = {
				section: 'factory-robot-select',
				method: function() {
					homeSellRobots.loadPage();
				}
			}
		}
		sellRobotSelect(); // draw the sell robot page
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
			});
		}

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
								gameObject.selectedRobot = gameObject.robotTeams[index].robotParts;
								gameObject.selectedRobotDesign = index;
								factoryRobotDetails(); 
							}
						},
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
													gameObject.selectedRobot = gameObject.robotTeams[index].robotParts;
													gameObject.selectedRobotDesign = index;
													factoryRobotDetails(); 
												}
											},
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
													gameObject.selectedRobot = gameObject.robotTeams[index].robotParts;
													gameObject.selectedRobotDesign = index;
													factoryRobotDetails(); 
												}
											},
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
													gameObject.selectedRobot = gameObject.robotTeams[index].robotParts;
													gameObject.selectedRobotDesign = index;
													factoryRobotDetails(); 
												}
											},
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
													gameObject.selectedRobot = gameObject.robotTeams[index].robotParts;
													gameObject.selectedRobotDesign = index;
													factoryRobotDetails(); 
												}
											},
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
													gameObject.selectedRobot = gameObject.robotTeams[index].robotParts;
													gameObject.selectedRobotDesign = index;
													factoryRobotDetails(); 
												}
											},
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
		function factoryRobotDetails() {
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
			drawRobotPreview(); // draw the robot in the top left
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
						id: 'factory-back-game',
						action: { method: function(id) {
								homeSellRobots.loadPage();
								gameObject.partsDisplayed = ''; 
								gameObject.selectedRobotDesign = -1;
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
						font: '2.1em serif',
						msg: 'Sell Details',
						posX: Game.placeEntityX(0.525),
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
			Game.methodSetup = {
				method: function(id) {
					drawText({
						font: '2.3em serif',
						msg: 'Total',
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
			// display the build button when the robot parts are complete
			if (gameObject.selectedRobot.length === 6) {
				displaySelectPart({}, true);
			}
			
			Game.pageResized = {
				section: 'factory-robot-details',
				method: function() {
					const modal = Game.methodObjects.find(build => build.id === Game.modalId);
					clearRobotBuildMessage();
					//if (!modal && gameObject.partsDisplayed === 'leg-right') {
						//selectRobotLegs('right');
					//}
					//if (!modal && gameObject.partsDisplayed === 'leg-left') {
						//selectRobotLegs('left');
					//}
					//if (!modal && gameObject.partsDisplayed === 'arm-left') {
						//selectRobotArms('left');
					//}
					//if (!modal && gameObject.partsDisplayed === 'arm-right') {
						//selectRobotArms('right');
					//}
					//if (!modal && gameObject.partsDisplayed === 'chassis') {
						//selectRobotChassis();
					//}
					//if (!modal && gameObject.partsDisplayed === 'head') {
						//selectRobotHead();
					//}
				}
			}
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

		function drawRobotPreviewParts(partType) {
			if (partType === 'chassis') {
				if (gameObject.selectedRobot.length === 0) {
					return 'lightslategrey';
				} else if (gameObject.selectedRobot) {
					const part = gameObject.selectedRobot.find(partPos => partPos.type === 'chassis');
					if (part) {
						return part.img;
					} else {
						return 'lightslategrey';
					}
				}
			}
			if (partType === 'head') {
				if (gameObject.selectedRobot.length === 0) {
					return 'lightslategrey';
				} else if (gameObject.selectedRobot) {
					const part = gameObject.selectedRobot.find(partPos => partPos.type === 'head');
					if (part) {
						return part.img;
					} else {
						return 'lightslategrey';
					}
				}
			}
			if (partType === 'left-leg') {
				if (gameObject.selectedRobot.length === 0) {
					return 'lightslategrey';
				} else if (gameObject.selectedRobot) {
					const part = gameObject.selectedRobot.find(partPos => partPos.type === 'leg' && partPos.legPos === 'left');
					if (part) {
						return part.img;
					} else {
						return 'lightslategrey';
					}
				}
			}
			if (partType === 'right-leg') {
				if (gameObject.selectedRobot.length === 0) {
					return 'lightslategrey';
				} else if (gameObject.selectedRobot) {
					const part = gameObject.selectedRobot.find(partPos => partPos.type === 'leg' && partPos.legPos === 'right');
					if (part) {
						return part.img;
					} else {
						return 'lightslategrey';
					}
				}
			}
			if (partType === 'left-arm') {
				if (gameObject.selectedRobot.length === 0) {
					return 'lightslategrey';
				} else if (gameObject.selectedRobot) {
					const part = gameObject.selectedRobot.find(partPos => partPos.type === 'arm' && partPos.armPos === 'left');
					if (part) {
						return part.img;
					} else {
						return 'lightslategrey';
					}
				}
			}
			if (partType === 'right-arm') {
				if (gameObject.selectedRobot.length === 0) {
					return 'lightslategrey';
				} else if (gameObject.selectedRobot) {
					const part = gameObject.selectedRobot.find(partPos => partPos.type === 'arm' && partPos.armPos === 'right');
					if (part) {
						return part.img;
					} else {
						return 'lightslategrey';
					}
				}
			}
		}

		function drawRobotPreview() {
			Game.methodSetup = {
				method: function(id) {
					drawButton({
						posX: Game.placeEntityX(0.25, (Game.entitySize * 12)),
						posY: Game.placeEntityY(0.35, (Game.entitySize * 12)),
						width: (Game.entitySize * 12),
						height: (Game.entitySize * 12),
						lineWidth: 1,
						btnColor: drawRobotPreviewParts('chassis'),
						txtColor: 'white',
						font: '1.5em serif',
						msg: '',
						isFilled: true,
						id: 'robot-body',
						action: { method: function(id) { 
							// selectRobotChassis(); 
						}},
						props: {},
						methodId: id
					});
				}
			};
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				method: function(id) {
					drawButton({
						posX: Game.placeEntityX(0.249, (Game.entitySize * 10)),
						posY: Game.placeEntityY(0.22, (Game.entitySize * 10)),
						width: (Game.entitySize * 10),
						height: (Game.entitySize * 10),
						lineWidth: 1,
						btnColor: drawRobotPreviewParts('head'),
						txtColor: 'black',
						font: '1.5em serif',
						msg: '',
						isFilled: true,
						id: 'robot-head',
						action: { method: function(id) { 
							// selectRobotHead(); 
						}},
						props: {},
						methodId: id
					});
				}
			};
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				method: function(id) {
					drawButton({
						posX: Game.placeEntityX(0.20, (Game.entitySize * 15)),
						posY: Game.placeEntityY(0.35, (Game.entitySize * 12)),
						width: (Game.entitySize * 3),
						height: (Game.entitySize * 12),
						lineWidth: 1,
						btnColor: drawRobotPreviewParts('left-arm'),
						txtColor: 'black',
						font: '1em serif',
						msg: '',
						isFilled: true,
						id: 'robot-left-arm',
						action: { method: function(id) { 
							// selectRobotArms('left'); 
						}},
						props: {},
						methodId: id
					});
				}
			};
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				method: function(id) {
					drawButton({
						posX: Game.placeEntityX(0.31, (Game.entitySize * -8.3)),
						posY: Game.placeEntityY(0.35, (Game.entitySize * 12)),
						width: (Game.entitySize * 3),
						height: (Game.entitySize * 12),
						lineWidth: 1,
						btnColor: drawRobotPreviewParts('right-arm'),
						txtColor: 'black',
						font: '1em serif',
						msg: '',
						isFilled: true,
						id: 'robot-right-arm',
						action: { method: function(id) { 
							// selectRobotArms('right'); 
						}},
						props: {},
						methodId: id
					});
				}
			};
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				method: function(id) {
					drawButton({
						posX: Game.placeEntityX(0.246, (Game.entitySize * 9)),
						posY: Game.placeEntityY(0.49, (Game.entitySize * 12)),
						width: (Game.entitySize * 3),
						height: (Game.entitySize * 12),
						lineWidth: 1,
						btnColor: drawRobotPreviewParts('left-leg'),
						txtColor: 'black',
						font: '1em serif',
						msg: '',
						isFilled: true,
						id: 'robot-left-leg',
						action: { method: function(id) { 
							// selectRobotLegs('left'); 
						}},
						props: {},
						methodId: id
					});
				}
			};
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				method: function(id) {
					drawButton({
						posX: Game.placeEntityX(0.247, (Game.entitySize * -4.3)),
						posY: Game.placeEntityY(0.49, (Game.entitySize * 12)),
						width: (Game.entitySize * 3),
						height: (Game.entitySize * 12),
						lineWidth: 1,
						btnColor: drawRobotPreviewParts('right-leg'),
						txtColor: 'black',
						font: '1em serif',
						msg: '',
						isFilled: true,
						id: 'robot-right-leg',
						action: { method: function(id) { 
							// selectRobotLegs('right'); 
						}},
						props: {},
						methodId: id
					});
				}
			};
			Game.addMethod(Game.methodSetup);

			if (gameObject.selectedRobot.length > 0) {
				createFactoryTitleStats(undefined, undefined, undefined, undefined);
			}

		}
		function clearRobotParts() {
			const chassisParts = Game.methodObjects.filter(x => x.id === 'robot-chassis-part');
			const headParts = Game.methodObjects.filter(x => x.id === 'robot-head-part');
			const legLeftParts = Game.methodObjects.filter(x => x.id === 'robot-left-leg-part');
			const legRightParts = Game.methodObjects.filter(x => x.id === 'robot-right-leg-part');
			const armRightParts = Game.methodObjects.filter(x => x.id === 'robot-right-arm-part');
			const armLeftParts = Game.methodObjects.filter(x => x.id === 'robot-left-arm-part');
			const nextBtn = Game.methodObjects.filter(x => x.id === 'next-part');
			const prevBtn = Game.methodObjects.filter(x => x.id === 'last-part');
			const partCount = Game.methodObjects.filter(x => x.id === 'part-count');
			if (chassisParts.length > 0) {
				chassisParts.forEach((item, i) => {
					Game.deleteEntity(chassisParts[i].methodId);
				});
			}
			if (headParts.length > 0) {
				headParts.forEach((item, i) => {
					Game.deleteEntity(headParts[i].methodId);
				});
			}
			if (legLeftParts.length > 0) {
				legLeftParts.forEach((item, i) => {
					Game.deleteEntity(legLeftParts[i].methodId);
				});
			}
			if (legRightParts.length > 0) {
				legRightParts.forEach((item, i) => {
					Game.deleteEntity(legRightParts[i].methodId);
				});
			}
			if (armRightParts.length > 0) {
				armRightParts.forEach((item, i) => {
					Game.deleteEntity(armRightParts[i].methodId);
				});
			}
			if (armLeftParts.length > 0) {
				armLeftParts.forEach((item, i) => {
					Game.deleteEntity(armLeftParts[i].methodId);
				});
			}
			if (nextBtn.length > 0) {
				nextBtn.forEach((item, i) => {
					Game.deleteEntity(nextBtn[i].methodId);
				});
			}
			if (prevBtn.length > 0) {
				prevBtn.forEach((item, i) => {
					Game.deleteEntity(prevBtn[i].methodId);
				});
			}
			if (partCount.length > 0) {
				partCount.forEach((item, i) => {
					Game.deleteEntity(partCount[i].methodId);
				});
			}
			setTimeout(function() {
				createFactoryTitleStats(undefined, undefined, undefined, undefined);
			}, 0);
		}

		//function selectRobotArms(armPos) {
			//// the armPos could be left or right
			//gameObject.partsDisplayed = 'arm-' + armPos;
			//// load up the robot parts the player has discovered...
			//clearRobotParts(); // clear the previous parts
			//clearSelectedPartStatDetails(); // clear the stats
			//refreshFactoryBackgrounds(); // refresh the background
			//clearRobotPreviewHighlight();
			//const highlight = Game.methodObjects.find(item => item.id === 'robot-' + armPos + '-arm');
			//highlight.btnColor = 'yellow';
			//displayDiscoveredParts(gameObject.discoveredArms, armPos);
			//if (gameObject.selectedRobot.length === 6) {
				//gameObject.buildButtonDisabled = false;
				//displaySelectPart({}, true);
			//}
		//}

		//function selectRobotLegs(legPos) {
			//// the legPos could be left or right
			//gameObject.partsDisplayed = 'leg-' + legPos;
			//// load up the robot parts the player has discovered...
			//clearRobotParts(); // clear the previous parts
			//clearSelectedPartStatDetails(); // clear the stats
			//refreshFactoryBackgrounds(); // refresh the background
			//clearRobotPreviewHighlight();
			//const highlight = Game.methodObjects.find(item => item.id === 'robot-' + legPos + '-leg');
			//highlight.btnColor = 'yellow';
			//displayDiscoveredParts(gameObject.discoveredLegs, legPos);
			//if (gameObject.selectedRobot.length === 6) {
				//gameObject.buildButtonDisabled = false;
				//displaySelectPart({}, true);
			//}
		//}

		//function selectRobotChassis() {
			//gameObject.partsDisplayed = 'chassis';
			//// load up the robot parts the player has discovered...
			//clearRobotParts(); // clear the previous parts
			//clearSelectedPartStatDetails(); // clear the stats
			//refreshFactoryBackgrounds(); // refresh the background
			//clearRobotPreviewHighlight();
			//const highlight = Game.methodObjects.find(item => item.id === 'robot-body');
			//highlight.btnColor = 'yellow';
			//displayDiscoveredParts(gameObject.discoveredChassis, '');
			//if (gameObject.selectedRobot.length === 6) {
				//gameObject.buildButtonDisabled = false;
				//displaySelectPart({}, true);
			//}
		//}

		//function selectRobotHead() {
			//gameObject.partsDisplayed = 'head';
			//// load up the robot parts the player has discovered...
			//clearRobotParts(); // clear the previous parts
			//clearSelectedPartStatDetails(); // clear the stats
			//refreshFactoryBackgrounds(); // refresh the background
			//clearRobotPreviewHighlight();
			//const highlight = Game.methodObjects.find(item => item.id === 'robot-head');
			//highlight.btnColor = 'yellow';
			//displayDiscoveredParts(gameObject.discoveredHeads, '');
			//if (gameObject.selectedRobot.length === 6) {
				//gameObject.buildButtonDisabled = false;
				//displaySelectPart({}, true);
			//}
		//}

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
				Game.methodSetup = {
					method: function(id) {
						drawButton({
							posX: Game.placeEntityX(0.76, (Game.entitySize * 22.5)),
							posY: Game.placeEntityY(0.330 + (i * 0.125)),
							width: (Game.entitySize * 22),
							height: (Game.entitySize * 3),
							lineWidth: 1,
							btnColor: drawActiveParts(discoveredPart.img, discoveredPart.count),
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
							props: {},
							methodId: id
						});
					}
				};
				Game.addMethod(Game.methodSetup);
				Game.methodSetup = {
					method: function(id) {
						drawButton({
							posX: Game.placeEntityX(0.76, (Game.entitySize * 22.5)),
							posY: Game.placeEntityY(0.241 + (i * 0.125)),
							width: (Game.entitySize * 22),
							height: (Game.entitySize * 9),
							lineWidth: 1,
							btnColor: drawActiveParts(discoveredPart.img, discoveredPart.count),
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
							props: {},
							methodId: id
						});
					}
				};
				Game.addMethod(Game.methodSetup);
			}
			drawNextPrevPartList(partsDiscovered, limbPos);
		}

		function drawNextPrevPartList(partList, limbPos) {
			// the part could be head, chassis, legs or arms
			Game.methodSetup = {
				method: function(id) {
					drawButton({ // the btnColor is css grey
						posX: Game.placeEntityX(0.76, (Game.entitySize * 22.5)),
						posY: Game.placeEntityY(0.135),
						width: (Game.entitySize * 22),
						height: (Game.entitySize * 7),
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
						props: {},
						methodId: id
					});
				}
			};
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				method: function(id) {
					drawButton({ // the btnColor is css grey
						posX: Game.placeEntityX(0.76, (Game.entitySize * 22.5)),
						posY: Game.placeEntityY(0.90),
						width: (Game.entitySize * 22),
						height: (Game.entitySize * 7),
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
						props: {},
						methodId: id
					});
				}
			};
			Game.addMethod(Game.methodSetup);
		}
		function clearRobotPreviewHighlight() {
			const headHighlight = Game.methodObjects.find(item => item.id === 'robot-head');
			headHighlight.btnColor = drawRobotPreviewParts('head');
			const chassisHighlight = Game.methodObjects.find(item => item.id === 'robot-body');
			chassisHighlight.btnColor = drawRobotPreviewParts('chassis');
			const armRightHighlight = Game.methodObjects.find(x => x.id === 'robot-right-arm');
			armRightHighlight.btnColor = drawRobotPreviewParts('right-arm');
			const armLeftHighlight = Game.methodObjects.find(x => x.id === 'robot-left-arm');
			armLeftHighlight.btnColor = drawRobotPreviewParts('left-arm');
			const legRightHighlight = Game.methodObjects.find(x => x.id === 'robot-right-leg');
			legRightHighlight.btnColor = drawRobotPreviewParts('right-leg');
			const legLeftHighlight = Game.methodObjects.find(x => x.id === 'robot-left-leg');
			legLeftHighlight.btnColor = drawRobotPreviewParts('left-leg');
		}

		function clearSelectedPartStatDetails() {
			// clear the stats and the buttons
			const selectPartBtn = Game.methodObjects.filter(x => x.id === 'confirm-part');
			if (selectPartBtn) {
				selectPartBtn.forEach((item, i) => {
					Game.deleteEntity(item.methodId);
				});
			}
			const selectAttStat = Game.methodObjects.filter(x => x.id === 'att-stat');
			if (selectAttStat) {
				selectAttStat.forEach((item, i) => {
					Game.deleteEntity(item.methodId);
				});
			}
			const selectDefStat = Game.methodObjects.filter(x => x.id === 'def-stat');
			if (selectDefStat) {
				selectDefStat.forEach((item, i) => {
					Game.deleteEntity(item.methodId);
				});
			}
			const selectSpdStat = Game.methodObjects.filter(x => x.id === 'spd-stat');
			if (selectSpdStat) {
				selectSpdStat.forEach((item, i) => {
					Game.deleteEntity(item.methodId);
				});
			}
			const selectAiStat = Game.methodObjects.filter(x => x.id === 'ai-stat');
			if (selectAiStat) {
				selectAiStat.forEach((item, i) => {
					Game.deleteEntity(item.methodId);
				});
			}
			const selectStorageStat = Game.methodObjects.filter(x => x.id === 'storage-stat');
			if (selectStorageStat) {
				selectStorageStat.forEach((item, i) => {
					Game.deleteEntity(item.methodId);
				});
			}
			// clear the titles
			const factoryTitle = Game.methodObjects.filter(x => x.id === 'factory-title');
			if (factoryTitle) {
				factoryTitle.forEach((item, i) => {
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

		function totalSelectedRobotStats() {
			const stat = {
				stats: {
					att: 0,
					def: 0,
					spd: 0,
					ai: 0,
					storage: 0,
				}
			};
			gameObject.selectedRobot.forEach((part, i) => {
				stat.stats.att += part.stats.att;
				stat.stats.def += part.stats.def;
				stat.stats.spd += part.stats.spd;
				stat.stats.ai += part.stats.ai;
				stat.stats.storage += part.stats.storage;
			});

			return stat;
		}

		function createFactoryTitleStats(existingPart, part, confirmed, partChanged) {
			// when the existingPart and parts come in, then we are selecting different parts
			//let selectedPart = part;
			//if (!selectedPart || confirmed) {
				//selectedPart = totalSelectedRobotStats();
			//}
			console.log(gameObject.selectedRobot);
			Game.methodSetup = {
				method: function(id) {
					drawText({
						font: '2.3em serif',
						msg: 'Funds',
						posX: Game.placeEntityX(0.76),
						posY: Game.placeEntityY(0.19),
						color: 'grey',
						align: 'center',
						props: {},
						id: 'stat-title',
						methodId: id
					});
				}
			};
			Game.addMethod(Game.methodSetup);
			displayCondensedFunds(0.76, 0.245, 0.76, 0.295, '1.2em serif', 'grey', 'center');
			Game.methodSetup = {
				method: function(id) {
					drawText({
						font: '2.3em serif',
						msg: 'Total',
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
			//Game.methodSetup = {
				//method: function(id) {
					//drawText({
						//font: '2.1em serif',
						//msg: 'Sell Details',
						//posX: Game.placeEntityX(0.525),
						//posY: Game.placeEntityY(0.085),
						//color: 'darkgrey',
						//align: 'center',
						//props: {},
						//id: 'factory-title',
						//methodId: id
					//});
				//}
			//};
			//Game.addMethod(Game.methodSetup);
			//Game.methodSetup = {
				//method: function(id) {
					//drawText({
						//font: '1em serif',
						//msg: 'Attack: ' + returnStatValue(selectedPart?.stats?.att, 'att', confirmed, partChanged, existingPart?.stats?.att),
						//posX: Game.placeEntityX(0.09),
						//posY: Game.placeEntityY(0.69),
						//color: returnStatColor(existingPart?.stats?.att, selectedPart?.stats?.att, 'att', partChanged, confirmed),
						//align: 'left',
						//props: {},
						//id: 'att-stat',
						//methodId: id
					//});
				//}
			//};
			//Game.addMethod(Game.methodSetup);
			//Game.methodSetup = {
				//method: function(id) {
					//drawText({
						//font: '1em serif',
						//msg: 'Defense: ' + returnStatValue(selectedPart?.stats?.def, 'def', confirmed, partChanged, existingPart?.stats?.def),
						//posX: Game.placeEntityX(0.09),
						//posY: Game.placeEntityY(0.74),
						//color: returnStatColor(existingPart?.stats?.def, selectedPart?.stats?.def, 'def', partChanged, confirmed),
						//align: 'left',
						//props: {},
						//id: 'def-stat',
						//methodId: id
					//});
				//}
			//};
			//Game.addMethod(Game.methodSetup);
			//Game.methodSetup = {
				//method: function(id) {
					//drawText({
						//font: '1em serif',
						//msg: 'Speed: ' + returnStatValue(selectedPart?.stats?.spd, 'spd', confirmed, partChanged, existingPart?.stats?.spd),
						//posX: Game.placeEntityX(0.09),
						//posY: Game.placeEntityY(0.79),
						//color: returnStatColor(existingPart?.stats?.spd, selectedPart?.stats?.spd, 'spd', partChanged, confirmed),
						//align: 'left',
						//props: {},
						//id: 'spd-stat',
						//methodId: id
					//});
				//}
			//};
			//Game.addMethod(Game.methodSetup);
			//Game.methodSetup = {
				//method: function(id) {
					//drawText({
						//font: '1em serif',
						//msg: 'AI: ' + returnStatValue(selectedPart?.stats?.ai, 'ai', confirmed, partChanged, existingPart?.stats?.ai),
						//posX: Game.placeEntityX(0.09),
						//posY: Game.placeEntityY(0.84),
						//color: returnStatColor(existingPart?.stats?.ai, selectedPart?.stats?.ai, 'ai', partChanged, confirmed),
						//align: 'left',
						//props: {},
						//id: 'ai-stat',
						//methodId: id
					//});
				//}
			//};
			//Game.addMethod(Game.methodSetup);
			//Game.methodSetup = {
				//method: function(id) {
					//drawText({
						//font: '1em serif',
						//msg: 'Storage: ' + returnStatValue(selectedPart?.stats?.storage, 'storage', confirmed, partChanged, existingPart?.stats?.storage),
						//posX: Game.placeEntityX(0.09),
						//posY: Game.placeEntityY(0.88),
						//color: returnStatColor(existingPart?.stats?.storage, selectedPart?.stats?.storage, 'storage', partChanged, confirmed),
						//align: 'left',
						//props: {},
						//id: 'storage-stat',
						//methodId: id
					//});
				//}
			//};
			//Game.addMethod(Game.methodSetup);
			clearSelectedPartStatDetails();
			refreshFactoryBackgrounds();
		}
		function displaySelectPart(part, confirmed) {
			const partChanged = true;
			setTimeout(function() {
				Game.methodSetup = {
					method: function(id) {
						drawButton({
							posX: Game.placeEntityX(0.226, (Game.entitySize * 19.7)),
							posY: Game.placeEntityY(0.90),
							width: (Game.entitySize * 23),
							height: (Game.entitySize * 7),
							lineWidth: 1,
							btnColor: !gameObject.buildButtonDisabled ? 'grey' : '#C0C0C0',
							txtColor: 'white',
							font: '1.5em serif',
							msg: 'Sell',
							isFilled: true,
							id: 'confirm-part',
							action: { method: function(id) {
								if (confirmed && gameObject.selectedRobot.length === 6) {
									// future Jordan, sell robot parts here
									// buildRobot();
								} 
								//else {
									//equipPart(part);
								//}
							}},
							props: {},
							methodId: id
						});
					}
				};
				Game.addMethod(Game.methodSetup);
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
		//function equipPart(part) {
			//// clear the confirm button
			//if (part.type === 'chassis') {
				//const existingChassis = gameObject.selectedRobot.findIndex(partPos => partPos.type === 'chassis');
				//if (existingChassis > -1) {
					//gameObject.selectedRobot.splice(existingChassis, 1);
				//}
				//gameObject.selectedRobot.push(part);
				//Game.methodObjects.find(x => x.id === 'robot-body').btnColor = part.img; // change this to the actual image when availiable
			//} else if (part.type === 'head') {
				//const existingHead = gameObject.selectedRobot.findIndex(partPos => partPos.type === 'head');
				//if (existingHead > -1) {
					//gameObject.selectedRobot.splice(existingHead, 1);
				//}
				//gameObject.selectedRobot.push(part);
				//Game.methodObjects.find(x => x.id === 'robot-head').btnColor = part.img; // change this to the actual image when availiable
			//} else if (part.type === 'leg') {
				//const existingLeg = gameObject.selectedRobot.findIndex(partPos => partPos.type === 'leg' && partPos.legPos === part.legPos);
				//if (existingLeg > -1) {
					//gameObject.selectedRobot.splice(existingLeg, 1);
				//}
				//if (part.legPos === 'left') {
					//gameObject.selectedRobot.push(part);
					//Game.methodObjects.find(x => x.id === 'robot-left-leg').btnColor = part.img; // change this to the actual image when availiable
				//} else if (part.legPos === 'right') {
					//gameObject.selectedRobot.push(part);
					//Game.methodObjects.find(x => x.id === 'robot-right-leg').btnColor = part.img; // change this to the actual image when availiable
				//}
			//} else if (part.type === 'arm') {
				//const existingArm = gameObject.selectedRobot.findIndex(partPos => partPos.type === 'arm' && partPos.armPos === part.armPos);
				//if (existingArm > -1) {
					//gameObject.selectedRobot.splice(existingArm, 1);
				//}
				//if (part.armPos === 'left') {
					//gameObject.selectedRobot.push(part);
					//Game.methodObjects.find(x => x.id === 'robot-left-arm').btnColor = part.img; // change this to the actual image when availiable
				//} else if (part.armPos === 'right') {
					//gameObject.selectedRobot.push(part);
					//Game.methodObjects.find(x => x.id === 'robot-right-arm').btnColor = part.img; // change this to the actual image when availiable
				//}
			//}
			//gameObject.robotDesigns[gameObject.selectedRobotDesign].robotParts = gameObject.selectedRobot;
			//displaySelectPart(part, true);
		//}

		//function buildRobot() {
			//let problems = 0;
			//let head;
			//let chassis;
			//let leg1;
			//let leg2;
			//let arm1;
			//let arm2;
			//gameObject.selectedRobot.forEach(item => {
				//if (item.headId) {
					//head = robotHeads.find(part => part.headId === item.headId);	
				//}
				//if (item.chassisId) {
					//chassis = robotChassis.find(part => part.chassisId === item.chassisId);
				//}
				//if (item.legId && !leg1) {
					//leg1 = robotLegs.find(part => part.legId === item.legId);
				//}
				//if (item.legId && leg1) {
					//leg2 = robotLegs.find(part => part.legId === item.legId);
				//}
				//if (item.armId && !arm1) {
					//arm1 = robotArms.find(part => part.armId === item.armId);
				//}
				//if (item.armId && arm1) {
					//arm2 = robotArms.find(part => part.armId === item.armId);
				//}
			//});
			//if (head.count >= 1 && chassis.count >= 1 && 
				//leg1.count >= 1 && leg2.count >= 1 && 
				//arm1.count >= 1 && arm2.count >= 1) {
					//head.count -= 1;
					//chassis.count -= 1;
					//leg1.count -= 1;
					//leg2.count -= 1;
					//arm1.count -= 1;
					//arm2.count -= 1;
			//} else {
				//problems++;
			//}
			//if (problems === 0) {
				//if (gameObject.robotsMade < gameObject.robotStorage) {
					//gameObject.partsDisplayed = '';
					//// add the robot to the list
					//gameObject.robotsMade++;
					//gameObject.robotTeams.push(gameObject.robotDesigns[gameObject.selectedRobotDesign]);
					//// refresh the parts that are displayed
					//clearSelectedPartStatDetails();
					//clearRobotPreviewHighlight();

					//setTimeout(function() {
						//Game.methodSetup = {
							//method: function(id) {
								//drawRect({
									//posX: Game.placeEntityX(0.50, (Game.entitySize * 40)),
									//posY: Game.placeEntityY(0.50, (Game.entitySize * 30)),
									//width: (Game.entitySize * 40),
									//height: (Game.entitySize * 30),
									//lineWidth: 1,
									//color: 'lightslategrey',
									//isFilled: true,
									//id: 'robot-built-background',
									//isBackground: false,
									//props: {},
									//methodId: id
								//});
							//}
						//};
						//Game.addMethod(Game.methodSetup);
						//Game.methodSetup = {
							//method: function(id) {
								//drawText({
									//font: '2.3em serif',
									//msg: 'Robot Made',
									//posX: Game.placeEntityX(0.50),
									//posY: Game.placeEntityY(0.50),
									//color: 'white',
									//align: 'center',
									//props: {},
									//id: 'robot-built-title',
									//methodId: id
								//});
							//}
						//};
						//Game.addMethod(Game.methodSetup);
						//Game.methodSetup = {
							//method: function(id) {
								//drawText({
									//font: '1em serif',
									//msg: 'Robot Storage: ' + gameObject.robotsMade + '/' + gameObject.robotStorage,
									//posX: Game.placeEntityX(0.50),
									//posY: Game.placeEntityY(0.55),
									//color: 'white',
									//align: 'center',
									//props: {},
									//id: 'robot-storage-title',
									//methodId: id
								//});
							//}
						//};
						//Game.addMethod(Game.methodSetup);
						//const removeTitles = setInterval(function() {
							//clearInterval(removeTitles);
							//clearRobotBuildMessage();
							//clearSelectedPartStatDetails(); // clear the stats
							//refreshFactoryBackgrounds(); // refresh the background
							//createFactoryTitleStats(undefined, undefined, undefined, undefined);
							//const modal = Game.methodObjects.find(build => build.id === Game.modalId);
							//if (!modal) {
								//displaySelectPart({}, true);
							//}
							//if (modal) {
								//Game.deleteEntity(modal.methodId);
								//Game.methodSetup = {
									//method: function(id) {
										//drawModal({
											//posX: Game.placeEntityX(0.50, (Game.entitySize * 40)),
											//posY: Game.placeEntityY(0.50, (Game.entitySize * 30)),
											//width: (Game.entitySize * 40),
											//height: (Game.entitySize * 30),
											//lineWidth: modal.lineWidth,
											//modalColor: modal.modalColor,
											//msgColor: modal.msgColor,
											//msgFont: modal.msgFont,
											//msg: modal.msg,
											//footerColor: modal.footerColor,
											//footerFont: modal.footerFont,
											//footerMsg: modal.footerMsg,
											//bgColor: modal.bgColor,
											//isModalFilled: modal.isModalFilled,
											//id: Game.modalId,
											//action: modal.action,
											//props: {},
											//methodId: id
										//});
									//}
								//};
								//Game.addMethod(Game.methodSetup);
							//}
						//}, 1500);
					//}, 100);
					
				//} else {
					//// add the parts back when storage is full
					//head.count++;
					//chassis.count++;
					//leg1.count++;
					//leg2.count++;
					//arm1.count++;
					//arm2.count++;
					//setTimeout(function() {
						//Game.methodSetup = {
							//method: function(id) {
								//drawModal({
									//posX: Game.placeEntityX(0.50, (Game.entitySize * 40)),
									//posY: Game.placeEntityY(0.50, (Game.entitySize * 30)),
									//width: (Game.entitySize * 40),
									//height: (Game.entitySize * 30),
									//lineWidth: 1,
									//modalColor: 'darkgrey',
									//msgColor: 'white',
									//msgFont: '1.3em serif',
									//msg: 'Robot Storage Full',
									//footerColor: 'white',
									//footerFont: '1em serif',
									//footerMsg: 'Tap here to continue',
									//bgColor: '',
									//isModalFilled: true,
									//id: Game.modalId,
									//action: { 
										//method: function(id) {
											//const modal = Game.methodObjects.find(build => build.id === Game.modalId);
											//Game.deleteEntity(modal.methodId);
											//gameObject.buildButtonDisabled = true;
											//displaySelectPart({}, true);
											//setTimeout(function() {
												//createFactoryTitleStats(undefined, undefined, undefined, undefined);
											//},0);
											
										//}
									//},
									//props: {},
									//methodId: id
								//});
							//}
						//};
						//Game.addMethod(Game.methodSetup);
					//}, 100);
				//}
				
			//} else {
				//setTimeout(function() {
					//Game.methodSetup = {
						//method: function(id) {
							//drawModal({
								//posX: Game.placeEntityX(0.50, (Game.entitySize * 40)),
								//posY: Game.placeEntityY(0.50, (Game.entitySize * 30)),
								//width: (Game.entitySize * 40),
								//height: (Game.entitySize * 30),
								//lineWidth: 1,
								//modalColor: 'darkgrey',
								//msgColor: 'white',
								//msgFont: '1.3em serif',
								//msg: 'Missing Parts',
								//footerColor: 'white',
								//footerFont: '1em serif',
								//footerMsg: 'Tap here to continue',
								//bgColor: '',
								//isModalFilled: true,
								//id: Game.modalId,
								//action: { 
									//method: function(id) {
										//const modal = Game.methodObjects.find(build => build.id === Game.modalId);
										//Game.deleteEntity(modal.methodId);
										//gameObject.buildButtonDisabled = true;
										//displaySelectPart({}, true);
										//setTimeout(function() {
											//createFactoryTitleStats(undefined, undefined, undefined, undefined);
										//},0);
										
									//}
								//},
								//props: {},
								//methodId: id
							//});
						//}
					//};
					//Game.addMethod(Game.methodSetup);
				//}, 100);
			//}
			//clearRobotParts();
			//if (gameObject.partsDisplayed === 'leg-right') {
				//displayDiscoveredParts(gameObject.discoveredLegs, 'right');
			//}
			//if (gameObject.partsDisplayed === 'leg-left') {
				//displayDiscoveredParts(gameObject.discoveredLegs, 'left');
			//}
			//if (gameObject.partsDisplayed === 'arm-left') {
				//displayDiscoveredParts(gameObject.discoveredArms, 'left');
			//}
			//if (gameObject.partsDisplayed === 'arm-right') {
				//displayDiscoveredParts(gameObject.discoveredArms, 'right');
			//}
			//if (gameObject.partsDisplayed === 'chassis') {
				//displayDiscoveredParts(gameObject.discoveredChassis, '');
			//}
			//if (gameObject.partsDisplayed === 'head') {
				//displayDiscoveredParts(gameObject.discoveredHeads, '');
			//}
		//}

		function clearRobotBuildMessage() {
			const builtBg = Game.methodObjects.find(x => x.id === 'robot-built-background');
			if (builtBg) {
				Game.deleteEntity(builtBg.methodId);
			}
			const builtTitle = Game.methodObjects.find(x => x.id === 'robot-built-title');
			if (builtTitle) {
				Game.deleteEntity(builtTitle.methodId);
			}
			const storageTitle = Game.methodObjects.find(x => x.id === 'robot-storage-title');
			if (storageTitle) {
				Game.deleteEntity(storageTitle.methodId);
			}
		}
	}	
}
