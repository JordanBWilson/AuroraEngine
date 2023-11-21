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

const homePage = {
	description: 'This is where the player can sell, upgrade and quest',
	loadPage: function() {
		function homeMenuSelect() {
			gameObject.canClick = true;
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
						id: 'home-background',
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
						id: 'home-back-game',
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
						msg: 'Home',
						posX: Aurora.placeEntityX(0.50),
						posY: Aurora.placeEntityY(0.085),
						color: 'darkgrey',
						align: 'center',
						props: {},
						id: 'home-title',
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
						id: 'home-select-background',
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
						posX: Aurora.placeEntityX(0.25, (Aurora.entitySize * 20)),
						posY: Aurora.placeEntityY(0.55, (Aurora.entitySize * 75)),
						width: (Aurora.entitySize * 20),
						height: (Aurora.entitySize * 75),
						lineWidth: 1,
						btnColor: 'brown',
						txtColor: 'white',
						font: '1.5em serif',
						msg: 'Map',
						isFilled: true,
						id: 'home-select-map',
						action: { 
							method: function(id) {
								// future Jordan, this isMobile variable could be a global thing.
								// it's being used in at lease two other places. Both are in mason_maul
								let isMobile = false;
								if (Aurora.canvas.height > Aurora.canvas.width) { // mobile
									isMobile = true;
								} else { // everything else
									isMobile = false;
								}
								const msgs = ['Are you ready to save your progress?'];
								Aurora.methodSetup = {
									layer: 1,
									method: function(id) {
										drawDialogueModal({
											posX: Aurora.placeEntityX(0.075),
											posY: Aurora.placeEntityY(0.35, (Aurora.entitySize * 30)),
											width: (Aurora.canvas.width * 0.85),
											height: (Aurora.entitySize * 45),
											lineWidth: 1,
											modalColor: 'grey',
											msgColor: 'white',
											msgFont: '1em serif',
											msgs: msgs,
											msgStart: Aurora.placeEntityY(0.40, (Aurora.entitySize * 30)),
											msgDistance: (Aurora.entitySize * 6),
											bgColor: '',
											isModalFilled: true,
											id: Aurora.modalId,
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
								Aurora.addMethod(Aurora.methodSetup);
								Aurora.methodSetup = {
									layer: 1,
									method: function(id) {
										drawButton({
											posX: isMobile ? Aurora.placeEntityX(0.47, (Aurora.entitySize * 40)) : Aurora.placeEntityX(0.50, (Aurora.entitySize * 40)),
											posY: Aurora.placeEntityY(0.60, (Aurora.entitySize * 30)),
											width: (Aurora.entitySize * 45) - (Aurora.canvas.width * 0.04),
											height: (Aurora.entitySize * 7),
											lineWidth: 1,
											btnColor: 'darkgrey',
											txtColor: 'white',
											font: '1.3em serif',
											msg: 'Save',
											isFilled: true,
											id: 'save-game-btn',
											layer: 1,
											action: { 
												method: function(id) {
													// save game
													localStorage.setItem('mason-game', JSON.stringify(gameObject));
													closeSaveAuroraModal();
													Aurora.methodSetup = {
														method: function(id) {
															drawSimpleModal({
																posX: Aurora.placeEntityX(0.50, (Aurora.entitySize * 40)),
																posY: Aurora.placeEntityY(0.40, (Aurora.entitySize * 30)),
																width: (Aurora.entitySize * 40),
																height: (Aurora.entitySize * 30),
																lineWidth: 1,
																modalColor: 'grey',
																msgColor: 'white',
																msgFont: '1.3em serif',
																msg: 'Aurora Saved',
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
																		homeMenuSelect();
																	}
																},
																props: {},
																methodId: id
															});
														}
													};
													Aurora.addMethod(Aurora.methodSetup);
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
									layer: 1,
									method: function(id) {
										drawButton({
											posX: isMobile ? Aurora.placeEntityX(0.47, (Aurora.entitySize * 40)) : Aurora.placeEntityX(0.50, (Aurora.entitySize * 40)),
											posY: Aurora.placeEntityY(0.70, (Aurora.entitySize * 30)),
											width: (Aurora.entitySize * 45) - (Aurora.canvas.width * 0.04),
											height: (Aurora.entitySize * 7),
											lineWidth: 1,
											btnColor: 'darkgrey',
											txtColor: 'white',
											font: '1.3em serif',
											msg: 'Cancel',
											isFilled: true,
											id: 'cancel-save-game-btn',
											layer: 1,
											action: { 
												method: function(id) {
													closeSaveAuroraModal();
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
						posX: Aurora.placeEntityX(0.75, (Aurora.entitySize * 20)),
						posY: Aurora.placeEntityY(0.36, (Aurora.entitySize * 37)),
						width: (Aurora.entitySize * 20),
						height: (Aurora.entitySize * 37),
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
						posX: Aurora.placeEntityX(0.75, (Aurora.entitySize * 20)),
						posY: Aurora.placeEntityY(0.74, (Aurora.entitySize * 37)),
						width: (Aurora.entitySize * 20),
						height: (Aurora.entitySize * 37),
						lineWidth: 1,
						btnColor: 'cadetblue',
						txtColor: 'white',
						font: '1.5em serif',
						msg: 'Upgrade',
						isFilled: true,
						id: 'home-select-upgrade',
						action: { 
							method: function(id) { 
								homePlayerUpgrades.loadPage();
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
		homeMenuSelect(); // draw the home page
		
		function closeSaveAuroraModal() {
			const modal = Aurora.methodObjects.find(build => build.id === Aurora.modalId);
			if (modal) {
				Aurora.deleteEntity(modal.methodId);
			}
			const saveBtn = Aurora.methodObjects.find(btn => btn.id === 'save-game-btn');
			if (saveBtn) {
				Aurora.deleteEntity(saveBtn.methodId);
			}
			const cancelBtn = Aurora.methodObjects.find(btn => btn.id === 'cancel-save-game-btn');
			if (cancelBtn) {
				Aurora.deleteEntity(cancelBtn.methodId);
			}
			homeMenuSelect();
		}
	}
}

// *** Home Sell Menus Page ***

const homeSellMenus = {
	description: 'This is where the player can sell their scrap, parts and robots',
	loadPage: function() {
		// start of the sell menus
		function homeSellSelect() {
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
						id: 'sell-background',
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
						id: 'sell-back-game',
						action: { 
							method: function(id) { 
								homePage.loadPage();
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
						msg: 'Sell',
						posX: Aurora.placeEntityX(0.50),
						posY: Aurora.placeEntityY(0.085),
						color: 'darkgrey',
						align: 'center',
						props: {},
						id: 'sell-title',
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
						id: 'sell-select-background',
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
						posX: Aurora.placeEntityX(0.50, (Aurora.entitySize * 45)),
						posY: Aurora.placeEntityY(0.30, (Aurora.entitySize * 20)),
						width: (Aurora.entitySize * 45),
						height: (Aurora.entitySize * 20),
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
						posX: Aurora.placeEntityX(0.50, (Aurora.entitySize * 45)),
						posY: Aurora.placeEntityY(0.55, (Aurora.entitySize * 20)),
						width: (Aurora.entitySize * 45),
						height: (Aurora.entitySize * 20),
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
						posX: Aurora.placeEntityX(0.50, (Aurora.entitySize * 45)),
						posY: Aurora.placeEntityY(0.80, (Aurora.entitySize * 20)),
						width: (Aurora.entitySize * 45),
						height: (Aurora.entitySize * 20),
						lineWidth: 1,
						btnColor: 'indigo',
						txtColor: 'white',
						font: '1.5em serif',
						msg: 'Robots',
						isFilled: true,
						id: 'sell-select-robots',
						action: { 
							method: function(id) {
								homeSellRobots.loadPage();
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
		homeSellSelect(); // display the sell menu
	}
}

// *** Home Sell Scrap Page ***
const homeSellScrap = {
	description: 'This is where the player can sell their scrap',
	loadPage: function() {
		// start of sell scrap menu
		function homeSellScrap() {
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
						id: 'sell-scrap-main-background',
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
						height: (Aurora.canvas.height * 0.855),
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
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawRect({
						posX: Aurora.placeEntityX(0.775, (Aurora.canvas.width * 0.57)),
						posY: Aurora.placeEntityY(0.725, (Aurora.canvas.height * 0.45)),
						width: (Aurora.canvas.width * 0.48),
						height: (Aurora.canvas.height * 0.48),
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
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawRect({
						posX: Aurora.placeEntityX(0.775, (Aurora.canvas.width * 0.57)),
						posY: Aurora.placeEntityY(0.35, (Aurora.canvas.height * 0.45)),
						width: (Aurora.canvas.width * 0.48),
						height: (Aurora.canvas.height * 0.365),
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
			Aurora.addMethod(Aurora.methodSetup);
			drawSellScrapButtons(); // draw the scrap buttons in the top left
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
						id: 'scrap-back-game',
						action: { method: function(id) {
								homeSellMenus.loadPage();
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
			createSellScrapTitles();
			displayCondensedFunds(0.715, 0.245, 0.715, 0.295, '1.2em serif', 'grey', 'center');
			Particle.init();
			Aurora.pageResized = {
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
					const modal = Aurora.methodObjects.find(build => build.id === Aurora.modalId);
					if (modal) {
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
					}
				}
			}
		}
		homeSellScrap();
		function createSellScrapTitles() {
			Aurora.methodSetup = {
				method: function(id) {
					drawText({
						font: '2em serif',
						msg: 'Sell Scrap',
						posX: Aurora.placeEntityX(0.50),
						posY: Aurora.placeEntityY(0.085),
						color: 'darkgrey',
						align: 'center',
						props: {},
						id: 'sell-scrap-title',
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawText({
						font: '2em serif',
						msg: 'Total',
						posX: Aurora.placeEntityX(0.715),
						posY: Aurora.placeEntityY(0.565),
						color: 'grey',
						align: 'center',
						props: {},
						id: 'total-scrap-price-title',
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawText({
						font: '2em serif',
						msg: 'Funds',
						posX: Aurora.placeEntityX(0.715),
						posY: Aurora.placeEntityY(0.185),
						color: 'grey',
						align: 'center',
						props: {},
						id: 'total-funds-title',
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawText({
						font: '2em serif',
						msg: 'Count',
						posX: Aurora.placeEntityX(0.715),
						posY: Aurora.placeEntityY(0.385),
						color: 'grey',
						align: 'center',
						props: {},
						id: 'total-scrap-count-title',
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
		}

		function drawSellScrapButtons() {
			Aurora.methodSetup = {
				method: function(id) {
					drawButton({
						posX: Aurora.placeEntityX(0.2547, (Aurora.canvas.width * 0.44)),
						posY: Aurora.placeEntityY(0.395, (Aurora.canvas.height * 0.45)),
						width: (Aurora.canvas.width * 0.44),
						height: (Aurora.canvas.height * 0.1),
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
						posY: Aurora.placeEntityY(0.505, (Aurora.canvas.height * 0.45)),
						width: (Aurora.canvas.width * 0.44),
						height: (Aurora.canvas.height * 0.1),
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
						posY: Aurora.placeEntityY(0.615, (Aurora.canvas.height * 0.45)),
						width: (Aurora.canvas.width * 0.44),
						height: (Aurora.canvas.height * 0.1),
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
						posY: Aurora.placeEntityY(0.725, (Aurora.canvas.height * 0.45)),
						width: (Aurora.canvas.width * 0.44),
						height: (Aurora.canvas.height * 0.1),
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
						posY: Aurora.placeEntityY(0.835, (Aurora.canvas.height * 0.45)),
						width: (Aurora.canvas.width * 0.44),
						height: (Aurora.canvas.height * 0.1),
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
						posY: Aurora.placeEntityY(0.945, (Aurora.canvas.height * 0.45)),
						width: (Aurora.canvas.width * 0.44),
						height: (Aurora.canvas.height * 0.1),
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
						posY: Aurora.placeEntityY(1.055, (Aurora.canvas.height * 0.45)),
						width: (Aurora.canvas.width * 0.44),
						height: (Aurora.canvas.height * 0.1),
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
						isModalBtn: false,
						props: {},
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
		}

		function selectCommonScrap() {
			gameObject.scrapToSell = 'common';
			clearSellScrapScreen();
			refreshSellScrapBackgrounds();
			clearSellScrapHighlight();
			const highlight = Aurora.methodObjects.find(item => item.id === 'sell-common-scrap');
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
			const highlight = Aurora.methodObjects.find(item => item.id === 'sell-uncommon-scrap');
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
			const highlight = Aurora.methodObjects.find(item => item.id === 'sell-unique-scrap');
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
			const highlight = Aurora.methodObjects.find(item => item.id === 'sell-intriguing-scrap');
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
			const highlight = Aurora.methodObjects.find(item => item.id === 'sell-facinating-scrap');
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
			const highlight = Aurora.methodObjects.find(item => item.id === 'sell-mythic-scrap');
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
			const highlight = Aurora.methodObjects.find(item => item.id === 'sell-exotic-scrap');
			highlight.btnColor = 'yellow';
			highlight.txtColor = 'black';
			gameObject.buildButtonDisabled = false;
			setTimeout(function() {
				selectScrapPrice(gameObject.scrapToSell);
			}, 0);
		}

		function selectScrapPrice(scrapType) {
			
			clearSellScrapScreen();
			refreshSellScrapBackgrounds();
			
			createSellScrapTitles();
			displayCondensedFunds(0.715, 0.245, 0.715, 0.295, '1.2em serif', 'grey', 'center');
			
			Aurora.methodSetup = {
				method: function(id) {
					drawText({
						font: '1.5em serif',
						msg: displayScrapCount(scrapType),
						posX: Aurora.placeEntityX(0.715),
						posY: Aurora.placeEntityY(0.445),
						color: 'grey',
						align: 'center',
						props: {},
						id: 'scrap-count',
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
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
				Aurora.methodSetup = {
					method: function(id) {
						drawText({
							font: '1.2em serif',
							msg: scrap.money.charAt(0).toUpperCase() + scrap.money.slice(1) + ': ' + scrap.price,
							posX: Aurora.placeEntityX(0.715),
							posY: Aurora.placeEntityY(0.635 + (i * 0.045)),
							color: 'green',
							align: 'center',
							props: {},
							id: 'scrap-price',
							methodId: id
						});
					}
				};
				Aurora.addMethod(Aurora.methodSetup);
			});
			Aurora.methodSetup = {
				method: function(id) {
					drawButton({
						posX: Aurora.placeEntityX(0.73, (Aurora.canvas.width * 0.44)),
						posY: Aurora.placeEntityY(1.111, (Aurora.canvas.height * 0.45)),
						width: (Aurora.canvas.width * 0.44),
						height: (Aurora.canvas.height * 0.08),
						lineWidth: 1,
						btnColor: sellScrapBtnActivity(),
						txtColor: 'white',
						font: '1.1em serif',
						msg: 'Sell',
						isFilled: true,
						id: 'sell-scrap-btn',
						action: { 
							method: function(id) {
								if (gameObject.canClick) {
									gameObject.canClick = false;
									if (!gameObject.buildButtonDisabled) {
										if (gameObject.gameSounds) {
											sellSound.cloneNode(true).play();
										}
										const modal = Aurora.methodObjects.find(build => build.id === Aurora.modalId);
										if (gameObject.scrapToSell === 'common' && gameObject.commonScrap > 0 && !gameObject.buildButtonDisabled) {
											gameObject.commonScrap--;
											
											addFunds(gameObject.commonScrapBase);
											if (gameObject.commonScrap === 0) {
												gameObject.buildButtonDisabled = true;
												
											}
										}
										if (gameObject.scrapToSell === 'unCommon' && gameObject.unCommonScrap > 0 && !modal) {
											gameObject.unCommonScrap--;
											
											addFunds(gameObject.unCommonScrapBase);
											if (gameObject.unCommonScrap === 0) {
												gameObject.buildButtonDisabled = true;
											}
										}
										if (gameObject.scrapToSell === 'unique' && gameObject.uniqueScrap > 0 && !modal) {
											gameObject.uniqueScrap--;
											
											addFunds(gameObject.uniqueScrapBase);
											if (gameObject.uniqueScrap === 0) {
												gameObject.buildButtonDisabled = true;
											}
										}
										if (gameObject.scrapToSell === 'intriguing' && gameObject.intriguingScrap > 0 && !modal) {
											gameObject.intriguingScrap--;
											
											addFunds(gameObject.intriguingScrapBase);
											if (gameObject.intriguingScrap === 0) {
												gameObject.buildButtonDisabled = true;
											}
										}
										if (gameObject.scrapToSell === 'facinating' && gameObject.facinatingScrap > 0 && !modal) {
											gameObject.facinatingScrap--;
											
											addFunds(gameObject.facinatingScrapBase);
											if (gameObject.facinatingScrap === 0) {
												gameObject.buildButtonDisabled = true;
											}
										}
										if (gameObject.scrapToSell === 'mythic' && gameObject.mythicScrap > 0 && !modal) {
											gameObject.mythicScrap--;
											
											addFunds(gameObject.mythicScrapBase);
											if (gameObject.mythicScrap === 0) {
												gameObject.buildButtonDisabled = true;
											}
										}
										if (gameObject.scrapToSell === 'exotic' && gameObject.exoticScrap > 0 && !modal) {
											gameObject.exoticScrap--;
											
											addFunds(gameObject.exoticScrapBase);
											if (gameObject.exoticScrap === 0) {
												gameObject.buildButtonDisabled = true;
											}
										}
										Particle.floatingText({
											font: '2rem serif',
											msg: '+          +',
											align: 'center',
											posX: Aurora.placeEntityX(0.719, (Aurora.entitySize * 0.7)),
											posY: Aurora.placeEntityY(0.21, (Aurora.entitySize * 0.7)),
											direction: 'top',
											color: 'green',
											ticks: 13,
											speed: 0.8,
										});
										particleAnimationOver();
									} else {
										clearSellScrapScreen();
										refreshSellScrapBackgrounds();
										setTimeout(function() {
											selectScrapPrice(gameObject.scrapToSell);
											setTimeout(function() {
												displayNotEnoughScrapModal();
											}, 0);
											
										}, 0);
										
										
									}
								}
								
								const sellRest = setInterval(function() {
									gameObject.canClick = true;
									clearInterval(sellRest);
								}, gameObject.clickSpeed);
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

		function particleAnimationOver() {
			Particle.animComplete = {
				method: function() {
					setTimeout(function() {
						clearSellScrapScreen();
						refreshSellScrapBackgrounds();
						selectScrapPrice(gameObject.scrapToSell);
						setTimeout(function() {
							const modal = Aurora.methodObjects.find(build => build.id === Aurora.modalId);
							if (modal) {
								displayNotEnoughScrapModal();
							}
						}, 0);
					},0);			
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
			const commonHighlight = Aurora.methodObjects.find(item => item.id === 'sell-common-scrap');
			commonHighlight.btnColor = gameObject.commonScrap <= 0 ? '#C0C0C0' : 'lightslategrey';
			commonHighlight.txtColor = 'white';
			const unCommonHighlight = Aurora.methodObjects.find(item => item.id === 'sell-uncommon-scrap');
			unCommonHighlight.btnColor = gameObject.unCommonScrap <= 0 ? '#C0C0C0' : 'lightslategrey';
			unCommonHighlight.txtColor = 'white';
			const uniqueHighlight = Aurora.methodObjects.find(x => x.id === 'sell-unique-scrap');
			uniqueHighlight.btnColor = gameObject.uniqueScrap <= 0 ? '#C0C0C0' : 'lightslategrey';
			uniqueHighlight.txtColor = 'white';
			const intriguingHighlight = Aurora.methodObjects.find(x => x.id === 'sell-intriguing-scrap');
			intriguingHighlight.btnColor = gameObject.intriguingScrap <= 0 ? '#C0C0C0' : 'lightslategrey';
			intriguingHighlight.txtColor = 'white';
			const facinatingHighlight = Aurora.methodObjects.find(x => x.id === 'sell-facinating-scrap');
			facinatingHighlight.btnColor = gameObject.facinatingScrap <= 0 ? '#C0C0C0' : 'lightslategrey';
			facinatingHighlight.txtColor = 'white';
			const mythicHighlight = Aurora.methodObjects.find(x => x.id === 'sell-mythic-scrap');
			mythicHighlight.btnColor = gameObject.mythicScrap <= 0 ? '#C0C0C0' : 'lightslategrey';
			mythicHighlight.txtColor = 'white';
			const exoticHighlight = Aurora.methodObjects.find(x => x.id === 'sell-exotic-scrap');
			exoticHighlight.btnColor = gameObject.exoticScrap <= 0 ? '#C0C0C0' : 'lightslategrey';
			exoticHighlight.txtColor = 'white';
		}

		function clearSellScrapScreen() {
			const scrapCount = Aurora.methodObjects.filter(x => x.id === 'scrap-count');
			const scrapPrice = Aurora.methodObjects.filter(x => x.id === 'scrap-price');
			const sellScrapBtn = Aurora.methodObjects.filter(x => x.id === 'sell-scrap-btn');
			const sellScrapTitle = Aurora.methodObjects.filter(x => x.id === 'sell-scrap-title');
			const scrapPriceTitle = Aurora.methodObjects.filter(x => x.id === 'total-scrap-price-title');
			const fundsTitle = Aurora.methodObjects.filter(x => x.id === 'total-funds-title');
			const scrapCountTitle = Aurora.methodObjects.filter(x => x.id === 'total-scrap-count-title');
			const fundsHigh = Aurora.methodObjects.filter(x => x.id === 'player-funds-high');
			const fundsLow = Aurora.methodObjects.filter(x => x.id === 'player-funds-low');
			if (scrapCount.length > 0) {
				scrapCount.forEach((item, i) => {
					Aurora.deleteEntity(item.methodId);
				});
			}
			if (scrapPrice.length > 0) {
				scrapPrice.forEach((item, i) => {
					Aurora.deleteEntity(item.methodId);
				});
			}
			if (sellScrapBtn.length > 0) {
				sellScrapBtn.forEach((item, i) => {
					Aurora.deleteEntity(item.methodId);
				});
			}
			if (sellScrapTitle.length > 0) {
				sellScrapTitle.forEach((item, i) => {
					Aurora.deleteEntity(item.methodId);
				});
			}
			if (scrapPriceTitle.length > 0) {
				scrapPriceTitle.forEach((item, i) => {
					Aurora.deleteEntity(item.methodId);
				});
			}
			if (fundsTitle.length > 0) {
				fundsTitle.forEach((item, i) => {
					Aurora.deleteEntity(item.methodId);
				});
			}
			if (scrapCountTitle.length > 0) {
				scrapCountTitle.forEach((item, i) => {
					Aurora.deleteEntity(item.methodId);
				});
			}
			if (fundsHigh.length > 0) {
				fundsHigh.forEach((item, i) => {
					Aurora.deleteEntity(item.methodId);
				});
			}
			if (fundsLow.length > 0) {
				fundsLow.forEach((item, i) => {
					Aurora.deleteEntity(item.methodId);
				});
			}
		}

		function refreshSellScrapBackgrounds() {
			if (Aurora.methodObjects.find(x => x.id === 'sell-scrap-main-background')) {
				Aurora.methodObjects.find(x => x.id === 'sell-scrap-main-background').isAnim = true;
			}
			if (Aurora.methodObjects.find(x => x.id === 'scrap-types-background')) {
				Aurora.methodObjects.find(x => x.id === 'scrap-types-background').isAnim = true;
			}
			if (Aurora.methodObjects.find(x => x.id === 'scrap-sell-background')) {
				Aurora.methodObjects.find(x => x.id === 'scrap-sell-background').isAnim = true;
			}
			if (Aurora.methodObjects.find(x => x.id === 'scrap-count-background')) {
				Aurora.methodObjects.find(x => x.id === 'scrap-count-background').isAnim = true;
			}
		}
		function displayNotEnoughScrapModal() {
			const modal = Aurora.methodObjects.find(build => build.id === Aurora.modalId);
			if (modal) {
				Aurora.deleteEntity(modal.methodId);
			}
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
			Aurora.addMethod(Aurora.methodSetup);
		}
	}	
}

// *** Home Sell Parts Page ***
const homeSellParts = {
	description: 'This is where the player can sell their parts',
	loadPage: function() {
		function homeSellParts() {
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
						id: 'sell-part-background',
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
			drawSellPartButtons(); // draw the buttons in the top left
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
						id: 'sell-part-back-game',
						action: { 
							method: function(id) {
								homeSellMenus.loadPage();
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
						msg: 'Sell Parts',
						posX: Aurora.placeEntityX(0.50),
						posY: Aurora.placeEntityY(0.085),
						color: 'darkgrey',
						align: 'center',
						props: {},
						id: 'sell-part-title',
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			
			Aurora.pageResized = {
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
					const modal = Aurora.methodObjects.find(build => build.id === Aurora.modalId);
					if (modal) {
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
					}
				}
			}
		}
		homeSellParts(); // load up the page
		function drawSellPartButtons() {
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
						id: 'sell-body-parts',
						action: { 
							method: function(id) {
								selectSellPartChassis();
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
						id: 'sell-head-parts',
						action: { 
							method: function(id) {
								selectSellPartHead();
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
						id: 'sell-arm-parts',
						action: { 
							method: function(id) {
								selectSellPartArms();
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
						id: 'sell-leg-parts',
						action: { 
							method: function(id) {
								selectSellPartLegs();
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
		
		function selectSellPartChassis() {
			gameObject.partsDisplayed = 'chassis';
			// load up the robot parts the player has discovered...
			clearSellRobotPartParts();
			clearSelectedSellPartScrapDetails();
			refreshSellPartsBackgrounds();
			clearSellRobotPartPreviewHighlight();
			const highlight = Aurora.methodObjects.find(item => item.id === 'sell-body-parts');
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
			const highlight = Aurora.methodObjects.find(item => item.id === 'sell-head-parts');
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
			const highlight = Aurora.methodObjects.find(item => item.id === 'sell-arm-parts');
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
			const highlight = Aurora.methodObjects.find(item => item.id === 'sell-leg-parts');
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
				Aurora.methodSetup = {
					method: function(id) {
						drawButton({
							posX: Aurora.placeEntityX(0.76, (Aurora.entitySize * 22.5)),
							posY: Aurora.placeEntityY(0.330 + (i * 0.125)),
							width: (Aurora.entitySize * 22),
							height: (Aurora.entitySize * 3),
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
							isModalBtn: false,
							props: {},
							methodId: id
						});
					}
				};
				Aurora.addMethod(Aurora.methodSetup);
			}
			drawNextPrevSellPartPartsList(partsDiscovered);
		}
		function drawNextPrevSellPartPartsList(partList) {
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
									clearSellRobotPartParts(); // clear the previous parts
									displayDiscoveredSellPartParts(partList);
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
									clearSellRobotPartParts(); // clear the previous parts
									displayDiscoveredSellPartParts(partList);
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

		function displaySelectSellPartParts(part) {
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
							msg: 'Sell',
							isFilled: true,
							id: 'confirm-part',
							action: {
								method: function(id) {
									if (gameObject.canClick) {
										gameObject.canClick = false;
										if (!gameObject.buildButtonDisabled) {
											const scrapCosts = gatherScrapCostFromPart(part);
											// calculate how much we can sell the part for
											// add the funds and subtract the part
											if (part.count > 0) {
												if (gameObject.gameSounds) {
													sellSound.cloneNode(true).play();
												}
												const formatPartCost = calculatePartPrice(scrapCosts);
												const addPartCost = formatPartsCostToFunds(formatPartCost);
												addFunds(addPartCost);
												part.count--;
												Particle.floatingText({
													font: '2rem serif',
													msg: '+          +',
													align: 'center',
													posX: Aurora.placeEntityX(0.259, (Aurora.entitySize * 0.7)),
													posY: Aurora.placeEntityY(0.72, (Aurora.entitySize * 0.7)),
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
																msg: 'Not Enough Parts',
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
																		displaySelectSellPartParts(part);
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
									}
									const sellRest = setInterval(function() {
										gameObject.canClick = true;
										clearInterval(sellRest);
									}, gameObject.clickSpeed);
									Particle.animComplete = {
										method: function() {
											displaySelectSellPartParts(part);					
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
			const factoryTitle = Aurora.methodObjects.filter(x => x.id === 'sell-part-title');
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
			const selectPartTitle = Aurora.methodObjects.filter(x => x.id === 'part-title');
			if (selectPartTitle) {
				selectPartTitle.forEach((item, i) => {
					Aurora.deleteEntity(item.methodId);
				});
			}
			const selectCountTitle = Aurora.methodObjects.filter(x => x.id === 'count-title');
			if (selectCountTitle) {
				selectCountTitle.forEach((item, i) => {
					Aurora.deleteEntity(item.methodId);
				});
			}
			const selectFundTitle = Aurora.methodObjects.filter(x => x.id === 'fund-title');
			if (selectFundTitle) {
				selectFundTitle.forEach((item, i) => {
					Aurora.deleteEntity(item.methodId);
				});
			}
			const selectSellTitle = Aurora.methodObjects.filter(x => x.id === 'sell-title'); // sell-part-high
			if (selectSellTitle) {
				selectSellTitle.forEach((item, i) => {
					Aurora.deleteEntity(item.methodId);
				});
			}
			const selectMoneyHigh = Aurora.methodObjects.filter(x => x.id === 'player-funds-high');
			if (selectMoneyHigh) {
				selectMoneyHigh.forEach((item, i) => {
					Aurora.deleteEntity(item.methodId);
				});
			}
			const selectMoneyLow = Aurora.methodObjects.filter(x => x.id === 'player-funds-low');
			if (selectMoneyLow) {
				selectMoneyLow.forEach((item, i) => {
					Aurora.deleteEntity(item.methodId);
				});
			}
			const selectSellPartHigh = Aurora.methodObjects.filter(x => x.id === 'sell-part-high');
			if (selectSellPartHigh) {
				selectSellPartHigh.forEach((item, i) => {
					Aurora.deleteEntity(item.methodId);
				});
			}
			const selectSellPartLow = Aurora.methodObjects.filter(x => x.id === 'sell-part-low');
			if (selectSellPartLow) {
				selectSellPartLow.forEach((item, i) => {
					Aurora.deleteEntity(item.methodId);
				});
			}
			// redraw the title here
			Aurora.methodSetup = {
				method: function(id) {
					drawText({
						font: '2.3em serif',
						msg: 'Sell Parts',
						posX: Aurora.placeEntityX(0.50),
						posY: Aurora.placeEntityY(0.085),
						color: 'darkgrey',
						align: 'center',
						props: {},
						id: 'sell-part-title',
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
		}

		function clearSellRobotPartParts() {
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
				createSellPartTitleScraps(undefined);
			}, 0);
		}

		function clearSellRobotPartPreviewHighlight() {
			const headHighlight = Aurora.methodObjects.find(item => item.id === 'sell-head-parts');
			headHighlight.btnColor = 'lightslategrey';
			headHighlight.txtColor = 'white';
			const chassisHighlight = Aurora.methodObjects.find(item => item.id === 'sell-body-parts');
			chassisHighlight.btnColor = 'lightslategrey';
			chassisHighlight.txtColor = 'white';
			const armRightHighlight = Aurora.methodObjects.find(x => x.id === 'sell-arm-parts');
			armRightHighlight.btnColor = 'lightslategrey';
			armRightHighlight.txtColor = 'white';
			const legRightHighlight = Aurora.methodObjects.find(x => x.id === 'sell-leg-parts');
			legRightHighlight.btnColor = 'lightslategrey';
			legRightHighlight.txtColor = 'white';
		}

		function createSellPartTitleScraps(part) {
			if (part) {
				const scrapCosts = gatherScrapCostFromPart(part);
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
							font: '1.3em serif',
							msg: 'Funds',
							posX: Aurora.placeEntityX(0.25),
							posY: Aurora.placeEntityY(0.69),
							color: 'grey',
							align: 'center',
							props: {},
							id: 'fund-title',
							methodId: id
						});
					}
				};
				Aurora.addMethod(Aurora.methodSetup);
				displayCondensedFunds(0.25, 0.72, 0.25, 0.755, '1em serif', 'grey', 'center');
				
				Aurora.methodSetup = {
					method: function(id) {
						drawText({
							font: '1.3em serif',
							msg: 'Sell Price',
							posX: Aurora.placeEntityX(0.25),
							posY: Aurora.placeEntityY(0.80),
							color: 'grey',
							align: 'center',
							props: {},
							id: 'sell-title',
							methodId: id
						});
					}
				};
				Aurora.addMethod(Aurora.methodSetup);
				const formatPartCost = calculatePartPrice(scrapCosts);
				// display the top two highest money type
				const displayPartValue = formatDisplayValue(formatPartCost);
				
				
				Aurora.methodSetup = {
					method: function(id) {
						drawText({
							font: '1em serif',
							msg: displayPartValue.highValue.type + ': ' + displayPartValue.highValue.value,
							posX: Aurora.placeEntityX(0.25),
							posY: Aurora.placeEntityY(0.83),
							color: 'green',
							align: 'center',
							props: {},
							id: 'sell-part-high',
							methodId: id
						});
					}
				};
				Aurora.addMethod(Aurora.methodSetup);
				if (displayPartValue.lowValue.value) {
					Aurora.methodSetup = {
						method: function(id) {
							drawText({
								font: '1em serif',
								msg: displayPartValue.lowValue.type + ': ' + displayPartValue.lowValue.value,
								posX: Aurora.placeEntityX(0.25),
								posY: Aurora.placeEntityY(0.865),
								color: 'green',
								align: 'center',
								props: {},
								id: 'sell-part-low',
								methodId: id
							});
						}
					};
					Aurora.addMethod(Aurora.methodSetup);
				}
			}

			clearSelectedSellPartScrapDetails();
			refreshSellPartsBackgrounds();
		}

		function refreshSellPartsBackgrounds() {
			if (Aurora.methodObjects.find(x => x.id === 'robot-stat-background')) {
				Aurora.methodObjects.find(x => x.id === 'robot-stat-background').isAnim = true;
			}
			if (Aurora.methodObjects.find(x => x.id === 'part-background')) {
				Aurora.methodObjects.find(x => x.id === 'part-background').isAnim = true;
			}
			if (Aurora.methodObjects.find(x => x.id === 'sell-part-background')) {
				Aurora.methodObjects.find(x => x.id === 'sell-part-background').isAnim = true;
			}
		}
	}
}

// *** Home Sell Robot Page ***
const homeSellRobots = {
	description: 'This is where the player can sell their robots',
	loadPage: function() {
		function sellRobotSelect() {
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
								homeSellMenus.loadPage();
								gameObject.partsDisplayed = '';
								gameObject.selectedRobotDesign = -1;
								gameObject.buildButtonDisabled = false;
								gameObject.partPageIndex = 0;
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
						font: '2.1em serif',
						msg: 'Sell Robots',
						posX: Aurora.placeEntityX(0.525),
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
						gameObject.selectedRobotDesign = i;
						factoryRobotDetails(); 
					}
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
			
			drawNextPrevRobotList(gameObject.robotTeams, sellRobotSelect);

			Aurora.pageResized = {
				section: 'factory-robot-select',
				method: function() {
					homeSellRobots.loadPage();
				}
			}
		}
		sellRobotSelect(); // draw the sell robot page
		function factoryRobotDetails() {
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
								gameObject.partPageIndex = 0;
								homeSellRobots.loadPage();
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
						font: '2.1em serif',
						msg: 'Sell Details',
						posX: Aurora.placeEntityX(0.525),
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
						font: '1.6em serif',
						msg: 'Barter Total',
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
			// display the build button when the robot parts are complete
			if (gameObject.selectedRobot.length === 6) {
				displaySelectPart({}, true);
			}
			
			Aurora.pageResized = {
				section: 'factory-robot-details',
				method: function() {

				}
			}
		}
		function clearSelectedRobotDetails() {
			// clear the stats and the buttons
			const selectPartBtn = Aurora.methodObjects.filter(x => x.id === 'confirm-part');
			if (selectPartBtn) {
				selectPartBtn.forEach((item, i) => {
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

		function createRobotTitleStats(existingPart, part, confirmed, partChanged) {
			Aurora.methodSetup = {
				method: function(id) {
					drawText({
						font: '2.3em serif',
						msg: 'Funds',
						posX: Aurora.placeEntityX(0.76),
						posY: Aurora.placeEntityY(0.20),
						color: 'grey',
						align: 'center',
						props: {},
						id: 'stat-title',
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			
			displayCondensedFunds(0.76, 0.245, 0.76, 0.28, '1.2em serif', 'grey', 'center');
			
			Aurora.methodSetup = {
				method: function(id) {
					drawText({
						font: '1.6em serif',
						msg: 'Head',
						posX: Aurora.placeEntityX(0.76),
						posY: Aurora.placeEntityY(0.33),
						color: 'grey',
						align: 'center',
						props: {},
						id: 'stat-head',
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			
			const headPart = gameObject.selectedRobot.find(part => part.type === 'head');
			const headScrapCosts = gatherScrapCostFromPart(headPart);
			const formatHeadPartCost = calculatePartPrice(headScrapCosts);
			// display the top two highest money type
			const displayHeadPartValue = formatDisplayValue(formatHeadPartCost);	
				
			Aurora.methodSetup = {
				method: function(id) {
					drawText({
						font: '1em serif',
						msg: displayHeadPartValue.highValue.type + ': ' + displayHeadPartValue.highValue.value,
						posX: Aurora.placeEntityX(0.76),
						posY: Aurora.placeEntityY(0.36),
						color: 'green',
						align: 'center',
						props: {},
						id: 'sell-part-high',
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			if (displayHeadPartValue.lowValue.value) {
				Aurora.methodSetup = {
					method: function(id) {
						drawText({
							font: '1em serif',
							msg: displayHeadPartValue.lowValue.type + ': ' + displayHeadPartValue.lowValue.value,
							posX: Aurora.placeEntityX(0.76),
							posY: Aurora.placeEntityY(0.39),
							color: 'green',
							align: 'center',
							props: {},
							id: 'sell-part-low',
							methodId: id
						});
					}
				};
				Aurora.addMethod(Aurora.methodSetup);
			}
			
			Aurora.methodSetup = {
				method: function(id) {
					drawText({
						font: '1.6em serif',
						msg: 'Chassis',
						posX: Aurora.placeEntityX(0.76),
						posY: Aurora.placeEntityY(0.435),
						color: 'grey',
						align: 'center',
						props: {},
						id: 'stat-chassis',
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			
			const chassisPart = gameObject.selectedRobot.find(part => part.type === 'chassis');
			const chassisScrapCosts = gatherScrapCostFromPart(chassisPart);
			const formatChassisPartCost = calculatePartPrice(chassisScrapCosts);
			// display the top two highest money type
			const displayChassisPartValue = formatDisplayValue(formatChassisPartCost);
			
			Aurora.methodSetup = {
				method: function(id) {
					drawText({
						font: '1em serif',
						msg: displayChassisPartValue.highValue.type + ': ' + displayChassisPartValue.highValue.value,
						posX: Aurora.placeEntityX(0.76),
						posY: Aurora.placeEntityY(0.465),
						color: 'green',
						align: 'center',
						props: {},
						id: 'sell-part-high',
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			if (displayChassisPartValue.lowValue.value) {
				Aurora.methodSetup = {
					method: function(id) {
						drawText({
							font: '1em serif',
							msg: displayChassisPartValue.lowValue.type + ': ' + displayChassisPartValue.lowValue.value,
							posX: Aurora.placeEntityX(0.76),
							posY: Aurora.placeEntityY(0.495),
							color: 'green',
							align: 'center',
							props: {},
							id: 'sell-part-low',
							methodId: id
						});
					}
				};
				Aurora.addMethod(Aurora.methodSetup);
			}
			
			Aurora.methodSetup = {
				method: function(id) {
					drawText({
						font: '1.6em serif',
						msg: 'Left Arm',
						posX: Aurora.placeEntityX(0.76),
						posY: Aurora.placeEntityY(0.54),
						color: 'grey',
						align: 'center',
						props: {},
						id: 'stat-left-arm',
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			
			const leftArmPart = gameObject.selectedRobot.find(part => part.type === 'arm' && part.armPos === 'left');
			const leftArmScrapCosts = gatherScrapCostFromPart(leftArmPart);
			const formatLeftArmPartCost = calculatePartPrice(leftArmScrapCosts);
			// display the top two highest money type
			const displayLeftArmPartValue = formatDisplayValue(formatLeftArmPartCost);
			
			Aurora.methodSetup = {
				method: function(id) {
					drawText({
						font: '1em serif',
						msg: displayLeftArmPartValue.highValue.type + ': ' + displayLeftArmPartValue.highValue.value,
						posX: Aurora.placeEntityX(0.76),
						posY: Aurora.placeEntityY(0.575),
						color: 'green',
						align: 'center',
						props: {},
						id: 'sell-part-high',
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			if (displayLeftArmPartValue.lowValue.value) {
				Aurora.methodSetup = {
					method: function(id) {
						drawText({
							font: '1em serif',
							msg: displayLeftArmPartValue.lowValue.type + ': ' + displayLeftArmPartValue.lowValue.value,
							posX: Aurora.placeEntityX(0.76),
							posY: Aurora.placeEntityY(0.605),
							color: 'green',
							align: 'center',
							props: {},
							id: 'sell-part-low',
							methodId: id
						});
					}
				};
				Aurora.addMethod(Aurora.methodSetup);
			}
			
			Aurora.methodSetup = {
				method: function(id) {
					drawText({
						font: '1.6em serif',
						msg: 'Right Arm',
						posX: Aurora.placeEntityX(0.76),
						posY: Aurora.placeEntityY(0.65),
						color: 'grey',
						align: 'center',
						props: {},
						id: 'stat-right-arm',
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			
			const rightArmPart = gameObject.selectedRobot.find(part => part.type === 'arm' && part.armPos === 'right');
			const rightArmScrapCosts = gatherScrapCostFromPart(rightArmPart);
			const formatRightArmPartCost = calculatePartPrice(rightArmScrapCosts);
			// display the top two highest money type
			const displayRightArmPartValue = formatDisplayValue(formatRightArmPartCost);
			
			Aurora.methodSetup = {
				method: function(id) {
					drawText({
						font: '1em serif',
						msg: displayRightArmPartValue.highValue.type + ': ' + displayRightArmPartValue.highValue.value,
						posX: Aurora.placeEntityX(0.76),
						posY: Aurora.placeEntityY(0.685),
						color: 'green',
						align: 'center',
						props: {},
						id: 'sell-part-high',
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			if (displayRightArmPartValue.lowValue.value) {
				Aurora.methodSetup = {
					method: function(id) {
						drawText({
							font: '1em serif',
							msg: displayRightArmPartValue.lowValue.type + ': ' + displayRightArmPartValue.lowValue.value,
							posX: Aurora.placeEntityX(0.76),
							posY: Aurora.placeEntityY(0.715),
							color: 'green',
							align: 'center',
							props: {},
							id: 'sell-part-low',
							methodId: id
						});
					}
				};
				Aurora.addMethod(Aurora.methodSetup);
			}
			
			Aurora.methodSetup = {
				method: function(id) {
					drawText({
						font: '1.6em serif',
						msg: 'Left Leg',
						posX: Aurora.placeEntityX(0.76),
						posY: Aurora.placeEntityY(0.76),
						color: 'grey',
						align: 'center',
						props: {},
						id: 'stat-left-leg',
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			
			const leftLegPart = gameObject.selectedRobot.find(part => part.type === 'leg' && part.legPos === 'left');
			const leftLegScrapCosts = gatherScrapCostFromPart(leftLegPart);
			const formatLeftLegPartCost = calculatePartPrice(leftLegScrapCosts);
			// display the top two highest money type
			const displayLeftLegPartValue = formatDisplayValue(formatLeftLegPartCost);
			
			Aurora.methodSetup = {
				method: function(id) {
					drawText({
						font: '1em serif',
						msg: displayLeftLegPartValue.highValue.type + ': ' + displayLeftLegPartValue.highValue.value,
						posX: Aurora.placeEntityX(0.76),
						posY: Aurora.placeEntityY(0.795),
						color: 'green',
						align: 'center',
						props: {},
						id: 'sell-part-high',
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			if (displayLeftLegPartValue.lowValue.value) {
				Aurora.methodSetup = {
					method: function(id) {
						drawText({
							font: '1em serif',
							msg: displayLeftLegPartValue.lowValue.type + ': ' + displayLeftLegPartValue.lowValue.value,
							posX: Aurora.placeEntityX(0.76),
							posY: Aurora.placeEntityY(0.825),
							color: 'green',
							align: 'center',
							props: {},
							id: 'sell-part-low',
							methodId: id
						});
					}
				};
				Aurora.addMethod(Aurora.methodSetup);
			}
			
			Aurora.methodSetup = {
				method: function(id) {
					drawText({
						font: '1.6em serif',
						msg: 'Right Leg',
						posX: Aurora.placeEntityX(0.76),
						posY: Aurora.placeEntityY(0.87),
						color: 'grey',
						align: 'center',
						props: {},
						id: 'stat-right-leg',
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			
			const rightLegPart = gameObject.selectedRobot.find(part => part.type === 'leg' && part.legPos === 'right');
			const rightLegScrapCosts = gatherScrapCostFromPart(rightLegPart);
			const formatRightLegPartCost = calculatePartPrice(rightLegScrapCosts);
			// display the top two highest money type
			const displayRightLegPartValue = formatDisplayValue(formatRightLegPartCost);
			
			Aurora.methodSetup = {
				method: function(id) {
					drawText({
						font: '1em serif',
						msg: displayRightLegPartValue.highValue.type + ': ' + displayRightLegPartValue.highValue.value,
						posX: Aurora.placeEntityX(0.76),
						posY: Aurora.placeEntityY(0.905),
						color: 'green',
						align: 'center',
						props: {},
						id: 'sell-part-high',
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			if (displayRightLegPartValue.lowValue.value) {
				Aurora.methodSetup = {
					method: function(id) {
						drawText({
							font: '1em serif',
							msg: displayRightLegPartValue.lowValue.type + ': ' + displayRightLegPartValue.lowValue.value,
							posX: Aurora.placeEntityX(0.76),
							posY: Aurora.placeEntityY(0.935),
							color: 'green',
							align: 'center',
							props: {},
							id: 'sell-part-low',
							methodId: id
						});
					}
				};
				Aurora.addMethod(Aurora.methodSetup);
			}	
			Aurora.methodSetup = {
				method: function(id) {
					drawText({
						font: '1.6em serif',
						msg: 'Barter Total',
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
			
			const totalRobotScrap = combineRobotParts(gameObject.selectedRobot);
			
			const totalScrapCosts = gatherScrapCostFromPart(totalRobotScrap);
			const formatTotalPartCost = calculatePartPrice(totalScrapCosts);
			
			// add the barter bonus // future Jordan, consolidate the barter costs
			formatTotalPartCost.copper += gameObject.barterBonusCost.copper;
			formatTotalPartCost.bronze += gameObject.barterBonusCost.bronze;
			formatTotalPartCost.nickel += gameObject.barterBonusCost.nickel;
			formatTotalPartCost.silver += gameObject.barterBonusCost.silver;
			formatTotalPartCost.gold += gameObject.barterBonusCost.gold;
			formatTotalPartCost.platinum += gameObject.barterBonusCost.platinum;
			formatTotalPartCost.iridium += gameObject.barterBonusCost.iridium;
			formatTotalPartCost.mythryl += gameObject.barterBonusCost.mythryl;
			
			// display the top two highest money type
			const displayTotalPartValue = formatDisplayValue(formatTotalPartCost);
			
			Aurora.methodSetup = {
				method: function(id) {
					drawText({
						font: '1.1em serif',
						msg: displayTotalPartValue.highValue.type + ': ' + displayTotalPartValue.highValue.value,
						posX: Aurora.placeEntityX(0.247),
						posY: Aurora.placeEntityY(0.71),
						color: 'green',
						align: 'center',
						props: {},
						id: 'sell-part-high',
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			if (displayTotalPartValue.lowValue.value) {
				Aurora.methodSetup = {
					method: function(id) {
						drawText({
							font: '1.1em serif',
							msg: displayTotalPartValue.lowValue.type + ': ' + displayTotalPartValue.lowValue.value,
							posX: Aurora.placeEntityX(0.247),
							posY: Aurora.placeEntityY(0.76),
							color: 'green',
							align: 'center',
							props: {},
							id: 'sell-part-low',
							methodId: id
						});
					}
				};
				Aurora.addMethod(Aurora.methodSetup);
			}
			clearSelectedRobotDetails();
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
							msg: 'Sell',
							isFilled: true,
							id: 'confirm-part',
							action: { method: function(id) {
								if (gameObject.canClick) {
									gameObject.canClick = false;
									if (gameObject.robotTeams.length > 0) {
										if (gameObject.gameSounds) {
											sellSound.cloneNode(true).play();
										}
										if (gameObject.selectedRobotDesign + 1 <= gameObject.robotTeams.length) {
											// remove the robot and add to the players funds
											gameObject.robotTeams.splice(gameObject.selectedRobotDesign, 1);
											gameObject.robotsMade--;
											const totalRobotScrap = combineRobotParts(gameObject.selectedRobot);
											const totalScrapCosts = gatherScrapCostFromPart(totalRobotScrap);
											const formatTotalPartCost = calculatePartPrice(totalScrapCosts);
											// add the barter bonus
											formatTotalPartCost.copper += gameObject.barterBonusCost.copper;
											formatTotalPartCost.bronze += gameObject.barterBonusCost.bronze;
											formatTotalPartCost.nickel += gameObject.barterBonusCost.nickel;
											formatTotalPartCost.silver += gameObject.barterBonusCost.silver;
											formatTotalPartCost.gold += gameObject.barterBonusCost.gold;
											formatTotalPartCost.platinum += gameObject.barterBonusCost.platinum;
											formatTotalPartCost.iridium += gameObject.barterBonusCost.iridium;
											formatTotalPartCost.mythryl += gameObject.barterBonusCost.mythryl;
											const addPartCost = formatPartsCostToFunds(formatTotalPartCost);
											addFunds(addPartCost);
											
											if (gameObject.selectedRobotDesign === gameObject.robotTeams.length) {
												// if we reach the end of the list, load up the last robot
												gameObject.selectedRobotDesign = gameObject.robotTeams.length - 1;
											}
											if (gameObject.robotTeams.length === 0 && gameObject.selectedRobotDesign === -1) {
												// no more robots to sell
												Particle.floatingText({
													font: '2rem serif',
													msg: '+            +',
													align: 'center',
													posX: Aurora.placeEntityX(0.763, (Aurora.entitySize * 0.7)),
													posY: Aurora.placeEntityY(0.25, (Aurora.entitySize * 0.7)),
													direction: 'top',
													color: 'green',
													ticks: 13,
													speed: 0.8,
												});
												Particle.animComplete = {
													method: function() {
														factoryRobotDetails();
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
																	msg: 'No Robots to Sell',
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
																			homeSellRobots.loadPage();
																		 }
																	},
																	props: {},
																	methodId: id
																});
															}
														};
														Aurora.addMethod(Aurora.methodSetup);
													}
												};
											}
											if (gameObject.robotTeams.length > 0) {
												// assign and load up the next robot to sell
												gameObject.selectedRobot = gameObject.robotTeams[gameObject.selectedRobotDesign].robotParts;
												Particle.floatingText({
													font: '2rem serif',
													msg: '+            +',
													align: 'center',
													posX: Aurora.placeEntityX(0.763, (Aurora.entitySize * 0.7)),
													posY: Aurora.placeEntityY(0.25, (Aurora.entitySize * 0.7)),
													direction: 'top',
													color: 'green',
													ticks: 13,
													speed: 0.8,
												});
												Particle.animComplete = {
													method: function() {
														factoryRobotDetails();					
													}
												};
												
											}
										}
									}	
								}
								const sellRest = setInterval(function() {
									gameObject.canClick = true;
									clearInterval(sellRest);
								}, gameObject.clickSpeed);
								
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
					createRobotTitleStats(existingPart, part, confirmed, partChanged);
				}
			}, 0);
		}
	}	
}
// *** Home Player Upgrades Page ***
const homePlayerUpgrades = {
	description: 'This is where the player can upgrade their stats',
	loadPage: function() {
		function upgradePlayer() {
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
						id: 'upgrade-background',
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
						id: 'upgrade-back-game',
						action: { 
							method: function(id) { 
								homePage.loadPage();
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
						font: '2.1em serif',
						msg: 'Upgrades',
						posX: Aurora.placeEntityX(0.525),
						posY: Aurora.placeEntityY(0.085),
						color: 'darkgrey',
						align: 'center',
						props: {},
						id: 'upgrade-title',
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
						id: 'upgrade-select-background',
						isBackground: true,
						props: {},
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			
			let upgradeCount = 0;
			let upgradeSelectRow = 1;
			for (let i = 0; i < 9; i++) {
				upgradeCount++;
				let posY = 0
				let posYoffset = 0;
				let posX = 0;
				let posXoffset = 0;
				if (upgradeSelectRow === 1) {
					posY = 0.14;
					posYoffset = -11;
				}
				if (upgradeSelectRow === 2) {
					posY = 0.34;
					posYoffset = -22;
				}
				if (upgradeSelectRow === 3) {
					posY = 0.54;
					posYoffset = -33;
				}
				if (upgradeCount === 1) {
					posX = 0.0365;
					posXoffset = -0.01;
				}
				if (upgradeCount === 2) {
					posX = 0.36;
					posXoffset = -0.05;
				}
				if (upgradeCount === 3) {
					posX = 0.68;
					posXoffset = -0.4;
				}	
				
				Aurora.methodSetup = {
					method: function(id) {
						const upgradeIndex = i;
						let upgradeTitle = '';
						if (upgradeIndex === 0) {
							upgradeTitle = 'Factory';
						}
						if (upgradeIndex === 1) {
							upgradeTitle = 'Engineering';
						}
						if (upgradeIndex === 2) {
							upgradeTitle = 'Robotics';
						}
						if (upgradeIndex === 3) {
							upgradeTitle = 'Scrapping';
						}
						if (upgradeIndex === 4) {
							upgradeTitle = 'Bartering';
						}
						if (upgradeIndex === 5) {
							upgradeTitle = 'Arena';
						}
						if (upgradeIndex === 6) {
							upgradeTitle = 'Scrap Space';
						}
						if (upgradeIndex === 7) {
							upgradeTitle = 'Part Space';
						}
						if (upgradeIndex === 8) {
							upgradeTitle = 'Robot Space';
						}
						drawButton({
							posX: Aurora.placeEntityX(posX, (Aurora.entitySize * posXoffset)),
							posY: Aurora.placeEntityY(posY, (Aurora.entitySize * posYoffset)),
							width: (Aurora.canvas.width * 0.28),
							height: (Aurora.entitySize * 20),
							lineWidth: 1,
							btnColor: 'darkgrey',
							txtColor: 'white',
							font: '1em serif',
							msg: upgradeTitle,
							isFilled: true,
							id: 'upgrade-stat-' + upgradeIndex,
							action: {
								method: function(id) {
									let msgs = [];
									if (upgradeIndex === 0) {
										const upgrade = formatDisplayValue(gameObject.factoryUpgradeCost);
										msgs = ['Level ' + gameObject.factoryLevel, 'Factory', 'Create Powerful Parts and Robots',
										 '- Cost -', upgrade.highValue.type + ': ' + upgrade.highValue.value, 
										 upgrade.lowValue.type.length > 0 ? upgrade.lowValue.type + ': ' + upgrade.lowValue.value : ''];
									}
									if (upgradeIndex === 1) {
										const upgrade = formatDisplayValue(gameObject.engineeringUpgradeCost);
										msgs = ['Level ' + gameObject.engineeringSkill, 'Engineering', 'Build Better Parts',
										'- Cost -', upgrade.highValue.type + ': ' + upgrade.highValue.value, 
										 upgrade.lowValue.type.length > 0 ? upgrade.lowValue.type + ': ' + upgrade.lowValue.value : ''];
									}
									if (upgradeIndex === 2) {
										const upgrade = formatDisplayValue(gameObject.roboticsUpgradeCost);
										msgs = ['Level ' + gameObject.roboticSkill, 'Robotics', 'Build Better Robots',
										'- Cost -', upgrade.highValue.type + ': ' + upgrade.highValue.value, 
										 upgrade.lowValue.type.length > 0 ? upgrade.lowValue.type + ': ' + upgrade.lowValue.value : ''];
									}
									if (upgradeIndex === 3) {
										const upgrade = formatDisplayValue(gameObject.scrappingUpgradeCost);
										msgs = ['Level ' + gameObject.scrapperSkill, 'Scrapping', 'Find Better Scrap Faster',
										'- Cost -', upgrade.highValue.type + ': ' + upgrade.highValue.value, 
										 upgrade.lowValue.type.length > 0 ? upgrade.lowValue.type + ': ' + upgrade.lowValue.value : ''];
									}
									if (upgradeIndex === 4) {
										const upgrade = formatDisplayValue(gameObject.barteringUpgradeCost);
										msgs = ['Level ' + gameObject.barterSkill, 'Bartering', 'Trade Robots For Better Prices',
										'- Cost -', upgrade.highValue.type + ': ' + upgrade.highValue.value, 
										 upgrade.lowValue.type.length > 0 ? upgrade.lowValue.type + ': ' + upgrade.lowValue.value : ''];
									}
									if (upgradeIndex === 5) {
										const upgrade = formatDisplayValue(gameObject.arenaUpgradeCost);
										msgs = ['Level ' + gameObject.arenaLevel, 'Arena', 'Unlock Better Towers and Prizes',
										'- Cost -', upgrade.highValue.type + ': ' + upgrade.highValue.value, 
										 upgrade.lowValue.type.length > 0 ? upgrade.lowValue.type + ': ' + upgrade.lowValue.value : ''];
									}
									if (upgradeIndex === 6) {
										const upgrade = formatDisplayValue(gameObject.scrapInvUpgradeCost);
										msgs = ['Level ' + gameObject.scrapInvintoryLevel, 'Scrap Space', 'Increase Scrap Storage By 5',
										'- Cost -', upgrade.highValue.type + ': ' + upgrade.highValue.value, 
										 upgrade.lowValue.type.length > 0 ? upgrade.lowValue.type + ': ' + upgrade.lowValue.value : ''];
									}
									if (upgradeIndex === 7) {
										const upgrade = formatDisplayValue(gameObject.partInvUpgradeCost);
										msgs = ['Level ' + gameObject.partStorageLevel, 'Part Space', 'Increase Robot Part Storage By 3',
										'- Cost -', upgrade.highValue.type + ': ' + upgrade.highValue.value, 
										 upgrade.lowValue.type.length > 0 ? upgrade.lowValue.type + ': ' + upgrade.lowValue.value : ''];
									}
									if (upgradeIndex === 8) {
										const upgrade = formatDisplayValue(gameObject.robotInvUpgradeCost);
										msgs = ['Level ' + gameObject.robotStorageLevel, 'Robot Space', 'Increase Robot Storage By 1',
										'- Cost -', upgrade.highValue.type + ': ' + upgrade.highValue.value, 
										 upgrade.lowValue.type.length > 0 ? upgrade.lowValue.type + ': ' + upgrade.lowValue.value : ''];
									}
									
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
												id: 'modal-background',
												isBackground: true,
												props: {},
												methodId: id
											});
										}
									};
									Aurora.addMethod(Aurora.methodSetup);
									
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
											drawText({
												font: '2.1em serif',
												msg: 'Funds',
												posX: Aurora.placeEntityX(0.466),
												posY: Aurora.placeEntityY(0.14),
												color: 'darkgrey',
												align: 'center',
												props: {},
												id: 'upgrade-fund-title',
												methodId: id
											});
										}
									};
									Aurora.addMethod(Aurora.methodSetup);
									
									displayCondensedFunds(0.465, 0.185, 0.465, 0.22, '1.2em serif', 'white', 'center');
									
									let upgradeMsg = 'Upgrade';
									
									let formatUpgradeCost;
									if (upgradeIndex === 0) {
										formatUpgradeCost = formatPartsCostToFunds(gameObject.factoryUpgradeCost);
										if (gameObject.factoryLevel === 0) {
											upgradeMsg = 'Build';
										}
									}
									if (upgradeIndex === 1) {
										formatUpgradeCost = formatPartsCostToFunds(gameObject.engineeringUpgradeCost);
									}
									if (upgradeIndex === 2) {
										formatUpgradeCost = formatPartsCostToFunds(gameObject.roboticsUpgradeCost);
									}
									if (upgradeIndex === 3) {
										formatUpgradeCost = formatPartsCostToFunds(gameObject.scrappingUpgradeCost);
									}
									if (upgradeIndex === 4) {
										formatUpgradeCost = formatPartsCostToFunds(gameObject.barteringUpgradeCost);
									}
									if (upgradeIndex === 5) {
										formatUpgradeCost = formatPartsCostToFunds(gameObject.arenaUpgradeCost);
										if (gameObject.arenaLevel === 0) {
											upgradeMsg = 'Build';
										}
									}
									if (upgradeIndex === 6) {
										formatUpgradeCost = formatPartsCostToFunds(gameObject.scrapInvUpgradeCost);
									}
									if (upgradeIndex === 7) {
										formatUpgradeCost = formatPartsCostToFunds(gameObject.partInvUpgradeCost);
									}
									if (upgradeIndex === 8) {
										formatUpgradeCost = formatPartsCostToFunds(gameObject.robotInvUpgradeCost);
									}

									const checkFunds = checkSubtractFunds(formatUpgradeCost);
									let upgrading = true;
									Aurora.methodSetup = {
										method: function(id) {
											drawButton({
												posX: Aurora.placeEntityX(0.47, (Aurora.entitySize * 40)),
												posY: Aurora.placeEntityY(0.72, (Aurora.entitySize * 30)),
												width: (Aurora.entitySize * 45) - (Aurora.canvas.width * 0.04),
												height: (Aurora.entitySize * 7),
												lineWidth: 1,
												btnColor: checkFunds ? 'grey' : '#C0C0C0',
												txtColor: 'white',
												font: '1.3em serif',
												msg: upgradeMsg,
												isFilled: true,
												id: 'upgrade-stat',
												action: { 
													method: function(id) {
														let upgradeMsgs = [];
														if (checkFunds && upgrading) {
															upgrading = false;
															if (gameObject.gameSounds) {
																selectSound.cloneNode(true).play();
															}
															if (upgradeIndex === 0) {
																gameObject.factoryLevel++;
																let designIncrease = false;
																
																if (gameObject.factoryLevel === 3 || gameObject.factoryLevel === 6 || gameObject.factoryLevel === 9) {
																	
																	gameObject.robotDesignCount += 3;
																	for (let i = 0; i < 3; i++) {
																		const robotDesign = {
																			robotId: gameObject.robotDesigns.length,
																			robotParts: [],
																		};
																		gameObject.robotDesigns.push(robotDesign);
																	}
																	
																	designIncrease = true;
																}
																// future Jordan, look into consolidating upgrade methods
																if (!gameObject.factoryUpgradeCost.bronze && 
																!gameObject.factoryUpgradeCost.nickel && 
																!gameObject.factoryUpgradeCost.silver && 
																!gameObject.factoryUpgradeCost.gold && 
																!gameObject.factoryUpgradeCost.platinum &&
																!gameObject.factoryUpgradeCost.iridium &&
																!gameObject.factoryUpgradeCost.mythryl) {
																	gameObject.factoryUpgradeCost.copper *= 2;
																} else if (gameObject.factoryUpgradeCost.bronze) {
																	gameObject.factoryUpgradeCost.copper = 0;
																	gameObject.factoryUpgradeCost.bronze *= 2;
																} else if (gameObject.factoryUpgradeCost.nickel) {
																	gameObject.factoryUpgradeCost.bronze = 0;
																	gameObject.factoryUpgradeCost.nickel *= 2;
																} else if (gameObject.factoryUpgradeCost.silver) {
																	gameObject.factoryUpgradeCost.nickel = 0;
																	gameObject.factoryUpgradeCost.silver *= 2;
																} else if (gameObject.factoryUpgradeCost.gold) {
																	gameObject.factoryUpgradeCost.silver = 0;
																	gameObject.factoryUpgradeCost.gold *= 2;
																} else if (gameObject.factoryUpgradeCost.platinum) {
																	gameObject.factoryUpgradeCost.gold = 0;
																	gameObject.factoryUpgradeCost.platinum *= 2;
																} else if (gameObject.factoryUpgradeCost.iridium) {
																	gameObject.factoryUpgradeCost.platinum = 0;
																	gameObject.factoryUpgradeCost.iridium *= 2;
																} else if (gameObject.factoryUpgradeCost.mythryl) {
																	gameObject.factoryUpgradeCost.iridium = 0;
																	gameObject.factoryUpgradeCost.mythryl *= 2;
																}																
																const formatUpgradeCost = formatPartCost(gameObject.factoryUpgradeCost);
																gameObject.factoryUpgradeCost = formatUpgradeCost;
																if (gameObject.factoryLevel === 1) {
																	gameObject.factoryBuilt = true;
																}
																upgradeMsgs = ['Level ' + gameObject.factoryLevel, gameObject.factoryLevel === 1 ? 'Factory Built!' : 'Factory Upgraded!', 
																designIncrease ? 'Robot Designs Upgraded +3!' : ''];
															}
															if (upgradeIndex === 1) {
																gameObject.engineeringSkill++;
																if (!gameObject.engineeringUpgradeCost.bronze && 
																!gameObject.engineeringUpgradeCost.nickel && 
																!gameObject.engineeringUpgradeCost.silver && 
																!gameObject.engineeringUpgradeCost.gold && 
																!gameObject.engineeringUpgradeCost.platinum &&
																!gameObject.engineeringUpgradeCost.iridium &&
																!gameObject.engineeringUpgradeCost.mythryl) {
																	gameObject.engineeringUpgradeCost.copper *= 2;
																} else if (gameObject.engineeringUpgradeCost.bronze) {
																	gameObject.engineeringUpgradeCost.copper = 0;
																	gameObject.engineeringUpgradeCost.bronze *= 2;
																} else if (gameObject.engineeringUpgradeCost.nickel) {
																	gameObject.engineeringUpgradeCost.bronze = 0;
																	gameObject.engineeringUpgradeCost.nickel *= 2;
																} else if (gameObject.engineeringUpgradeCost.silver) {
																	gameObject.engineeringUpgradeCost.nickel = 0;
																	gameObject.engineeringUpgradeCost.silver *= 2;
																} else if (gameObject.engineeringUpgradeCost.gold) {
																	gameObject.engineeringUpgradeCost.silver = 0;
																	gameObject.engineeringUpgradeCost.gold *= 2;
																} else if (gameObject.engineeringUpgradeCost.platinum) {
																	gameObject.engineeringUpgradeCost.gold = 0;
																	gameObject.engineeringUpgradeCost.platinum *= 2;
																} else if (gameObject.engineeringUpgradeCost.iridium) {
																	gameObject.engineeringUpgradeCost.platinum = 0;
																	gameObject.engineeringUpgradeCost.iridium *= 2;
																} else if (gameObject.engineeringUpgradeCost.mythryl) {
																	gameObject.engineeringUpgradeCost.iridium = 0;
																	gameObject.engineeringUpgradeCost.mythryl *= 2;
																}
																const formatUpgradeCost = formatPartCost(gameObject.engineeringUpgradeCost);
																gameObject.engineeringUpgradeCost = formatUpgradeCost;
																upgradeMsgs = ['Level ' + gameObject.engineeringSkill, 'Engineering Upgraded!'];
															}
															if (upgradeIndex === 2) {
																gameObject.roboticSkill++;
																if (!gameObject.roboticsUpgradeCost.bronze && 
																!gameObject.roboticsUpgradeCost.nickel && 
																!gameObject.roboticsUpgradeCost.silver && 
																!gameObject.roboticsUpgradeCost.gold && 
																!gameObject.roboticsUpgradeCost.platinum &&
																!gameObject.roboticsUpgradeCost.iridium &&
																!gameObject.roboticsUpgradeCost.mythryl) {
																	gameObject.roboticsUpgradeCost.copper *= 2;
																} else if (gameObject.roboticsUpgradeCost.bronze) {
																	gameObject.roboticsUpgradeCost.copper = 0;
																	gameObject.roboticsUpgradeCost.bronze *= 2;
																} else if (gameObject.roboticsUpgradeCost.nickel) {
																	gameObject.roboticsUpgradeCost.bronze = 0;
																	gameObject.roboticsUpgradeCost.nickel *= 2;
																} else if (gameObject.roboticsUpgradeCost.silver) {
																	gameObject.roboticsUpgradeCost.nickel = 0;
																	gameObject.roboticsUpgradeCost.silver *= 2;
																} else if (gameObject.roboticsUpgradeCost.gold) {
																	gameObject.roboticsUpgradeCost.silver = 0;
																	gameObject.roboticsUpgradeCost.gold *= 2;
																} else if (gameObject.roboticsUpgradeCost.platinum) {
																	gameObject.roboticsUpgradeCost.gold = 0;
																	gameObject.roboticsUpgradeCost.platinum *= 2;
																} else if (gameObject.roboticsUpgradeCost.iridium) {
																	gameObject.roboticsUpgradeCost.platinum = 0;
																	gameObject.roboticsUpgradeCost.iridium *= 2;
																} else if (gameObject.roboticsUpgradeCost.mythryl) {
																	gameObject.roboticsUpgradeCost.platinum = 0;
																	gameObject.roboticsUpgradeCost.mythryl *= 2;
																}
																const formatUpgradeCost = formatPartCost(gameObject.roboticsUpgradeCost);
																gameObject.roboticsUpgradeCost = formatUpgradeCost;
																upgradeMsgs = ['Level ' + gameObject.roboticSkill, 'Robotics Upgraded!'];
															}
															if (upgradeIndex === 3) {
																gameObject.scrapperSkill++;
																if (!gameObject.scrappingUpgradeCost.bronze && 
																!gameObject.scrappingUpgradeCost.nickel &&
																!gameObject.scrappingUpgradeCost.silver && 
																!gameObject.scrappingUpgradeCost.gold && 
																!gameObject.scrappingUpgradeCost.platinum &&
																!gameObject.scrappingUpgradeCost.iridium &&
																!gameObject.scrappingUpgradeCost.mythryl) {
																	gameObject.scrappingUpgradeCost.copper *= 2;
																} else if (gameObject.scrappingUpgradeCost.bronze) {
																	gameObject.scrappingUpgradeCost.copper = 0;
																	gameObject.scrappingUpgradeCost.bronze *= 2;
																} else if (gameObject.scrappingUpgradeCost.nickel) {
																	gameObject.scrappingUpgradeCost.bronze = 0;
																	gameObject.scrappingUpgradeCost.nickel *= 2;
																} else if (gameObject.scrappingUpgradeCost.silver) {
																	gameObject.scrappingUpgradeCost.nickel = 0;
																	gameObject.scrappingUpgradeCost.silver *= 2;
																} else if (gameObject.scrappingUpgradeCost.gold) {
																	gameObject.scrappingUpgradeCost.silver = 0;
																	gameObject.scrappingUpgradeCost.gold *= 2;
																} else if (gameObject.scrappingUpgradeCost.platinum) {
																	gameObject.scrappingUpgradeCost.gold = 0;
																	gameObject.scrappingUpgradeCost.platinum *= 2;
																} else if (gameObject.scrappingUpgradeCost.iridium) {
																	gameObject.scrappingUpgradeCost.platinum = 0;
																	gameObject.scrappingUpgradeCost.iridium *= 2;
																} else if (gameObject.scrappingUpgradeCost.mythryl) {
																	gameObject.scrappingUpgradeCost.iridium = 0;
																	gameObject.scrappingUpgradeCost.mythryl *= 2;
																}
																const formatUpgradeCost = formatPartCost(gameObject.scrappingUpgradeCost);
																gameObject.scrappingUpgradeCost = formatUpgradeCost;
																upgradeMsgs = ['Level ' + gameObject.scrapperSkill, 'Scrapping Upgraded!'];
															}
															if (upgradeIndex === 4) {
																gameObject.barterSkill++;
																if (!gameObject.barteringUpgradeCost.bronze && 
																!gameObject.barteringUpgradeCost.nickel &&
																!gameObject.barteringUpgradeCost.silver && 
																!gameObject.barteringUpgradeCost.gold && 
																!gameObject.barteringUpgradeCost.platinum &&
																!gameObject.barteringUpgradeCost.iridium &&
																!gameObject.barteringUpgradeCost.mythryl) {
																	gameObject.barteringUpgradeCost.copper *= 2;
																} else if (gameObject.barteringUpgradeCost.bronze) {
																	gameObject.barteringUpgradeCost.copper = 0;
																	gameObject.barteringUpgradeCost.bronze *= 2;
																} else if (gameObject.barteringUpgradeCost.nickel) {
																	gameObject.barteringUpgradeCost.bronze = 0;
																	gameObject.barteringUpgradeCost.nickel *= 2;
																} else if (gameObject.barteringUpgradeCost.silver) {
																	gameObject.barteringUpgradeCost.nickel = 0;
																	gameObject.barteringUpgradeCost.silver *= 2;
																} else if (gameObject.barteringUpgradeCost.gold) {
																	gameObject.barteringUpgradeCost.silver = 0;
																	gameObject.barteringUpgradeCost.gold *= 2;
																} else if (gameObject.barteringUpgradeCost.platinum) {
																	gameObject.barteringUpgradeCost.gold = 0;
																	gameObject.barteringUpgradeCost.platinum *= 2;
																} else if (gameObject.barteringUpgradeCost.iridium) {
																	gameObject.barteringUpgradeCost.platinum = 0;
																	gameObject.barteringUpgradeCost.iridium *= 2;
																} else if (gameObject.barteringUpgradeCost.mythryl) {
																	gameObject.barteringUpgradeCost.iridium = 0;
																	gameObject.barteringUpgradeCost.mythryl *= 2;
																}
																const formatUpgradeCost = formatPartCost(gameObject.barteringUpgradeCost);
																gameObject.barteringUpgradeCost = formatUpgradeCost;
																// calculate the barter bonus
																if (!gameObject.barterBonusCost.bronze && 
																!gameObject.barterBonusCost.nickel && 
																!gameObject.barterBonusCost.silver && 
																!gameObject.barterBonusCost.gold && 
																!gameObject.barterBonusCost.platinum &&
																!gameObject.barterBonusCost.iridium &&
																!gameObject.barterBonusCost.mythryl) {
																	if (gameObject.barterBonusCost.copper === 0) {
																		gameObject.barterBonusCost.copper += 5;
																	}
																	gameObject.barterBonusCost.copper *= 2;
																} else if (gameObject.barterBonusCost.bronze) {
																	gameObject.barterBonusCost.copper = 0;
																	gameObject.barterBonusCost.bronze *= 2;
																} else if (gameObject.barterBonusCost.nickel) {
																	gameObject.barterBonusCost.bronze = 0;
																	gameObject.barterBonusCost.nickel *= 2;
																} else if (gameObject.barterBonusCost.silver) {
																	gameObject.barterBonusCost.nickel = 0;
																	gameObject.barterBonusCost.silver *= 2;
																} else if (gameObject.barterBonusCost.gold) {
																	gameObject.barterBonusCost.silver = 0;
																	gameObject.barterBonusCost.gold *= 2;
																} else if (gameObject.barterBonusCost.platinum) {
																	gameObject.barterBonusCost.gold = 0;
																	gameObject.barterBonusCost.platinum *= 2;
																} else if (gameObject.barterBonusCost.iridium) {
																	gameObject.barterBonusCost.platinum = 0;
																	gameObject.barterBonusCost.iridium *= 2;
																} else if (gameObject.barterBonusCost.mythryl) {
																	gameObject.barterBonusCost.iridium = 0;
																	gameObject.barterBonusCost.mythryl *= 2;
																}
																
																const barterBonus = formatDisplayValue(gameObject.barterBonusCost);
																upgradeMsgs = ['Level ' + gameObject.barterSkill,
																 'Bartering Upgraded!', '-Barter Bonus-', barterBonus.highValue.type + ': ' + barterBonus.highValue.value, 
																 barterBonus.lowValue.type ? barterBonus.lowValue.type + ': ' + barterBonus.lowValue.value : ''];
															}
															if (upgradeIndex === 5) {
																gameObject.arenaLevel++;
																if (!gameObject.arenaUpgradeCost.bronze && 
																!gameObject.arenaUpgradeCost.nickel &&
																!gameObject.arenaUpgradeCost.silver && 
																!gameObject.arenaUpgradeCost.gold && 
																!gameObject.arenaUpgradeCost.platinum &&
																!gameObject.arenaUpgradeCost.iridium &&
																!gameObject.arenaUpgradeCost.mythryl) {
																	gameObject.arenaUpgradeCost.copper *= 2;
																} else if (gameObject.arenaUpgradeCost.bronze) {
																	gameObject.arenaUpgradeCost.copper = 0;
																	gameObject.arenaUpgradeCost.bronze *= 2;
																} else if (gameObject.arenaUpgradeCost.nickel) {
																	gameObject.arenaUpgradeCost.bronze = 0;
																	gameObject.arenaUpgradeCost.nickel *= 2;
																} else if (gameObject.arenaUpgradeCost.silver) {
																	gameObject.arenaUpgradeCost.nickel = 0;
																	gameObject.arenaUpgradeCost.silver *= 2;
																} else if (gameObject.arenaUpgradeCost.gold) {
																	gameObject.arenaUpgradeCost.silver = 0;
																	gameObject.arenaUpgradeCost.gold *= 2;
																} else if (gameObject.arenaUpgradeCost.platinum) {
																	gameObject.arenaUpgradeCost.gold = 0;
																	gameObject.arenaUpgradeCost.platinum *= 2;
																} else if (gameObject.arenaUpgradeCost.iridium) {
																	gameObject.arenaUpgradeCost.platinum = 0;
																	gameObject.arenaUpgradeCost.iridium *= 2;
																} else if (gameObject.arenaUpgradeCost.mythryl) {
																	gameObject.arenaUpgradeCost.iridium = 0;
																	gameObject.arenaUpgradeCost.mythryl *= 2;
																}
																const formatUpgradeCost = formatPartCost(gameObject.arenaUpgradeCost);
																gameObject.arenaUpgradeCost = formatUpgradeCost;
																
																if (gameObject.arenaLevel === 1) {
																	gameObject.arenaBuild = true;
																}
																upgradeMsgs = ['Level ' + gameObject.arenaLevel, gameObject.arenaLevel === 1 ? 'Arena Built!' : 'Arena Upgraded!'];
															}
															if (upgradeIndex === 6) {
																gameObject.scrapInvintoryLevel++;
																gameObject.scrapInvintory += 5;
																if (!gameObject.scrapInvUpgradeCost.bronze && 
																!gameObject.scrapInvUpgradeCost.nickel &&
																!gameObject.scrapInvUpgradeCost.silver && 
																!gameObject.scrapInvUpgradeCost.gold && 
																!gameObject.scrapInvUpgradeCost.platinum &&
																!gameObject.scrapInvUpgradeCost.iridium &&
																!gameObject.scrapInvUpgradeCost.mythryl) {
																	gameObject.scrapInvUpgradeCost.copper *= 2;
																} else if (gameObject.scrapInvUpgradeCost.bronze) {
																	gameObject.scrapInvUpgradeCost.copper = 0;
																	gameObject.scrapInvUpgradeCost.bronze *= 2;
																} else if (gameObject.scrapInvUpgradeCost.nickel) {
																	gameObject.scrapInvUpgradeCost.bronze = 0;
																	gameObject.scrapInvUpgradeCost.nickel *= 2;
																} else if (gameObject.scrapInvUpgradeCost.silver) {
																	gameObject.scrapInvUpgradeCost.nickel = 0;
																	gameObject.scrapInvUpgradeCost.silver *= 2;
																} else if (gameObject.scrapInvUpgradeCost.gold) {
																	gameObject.scrapInvUpgradeCost.silver = 0;
																	gameObject.scrapInvUpgradeCost.gold *= 2;
																} else if (gameObject.scrapInvUpgradeCost.platinum) {
																	gameObject.scrapInvUpgradeCost.gold = 0;
																	gameObject.scrapInvUpgradeCost.platinum *= 2;
																} else if (gameObject.scrapInvUpgradeCost.iridium) {
																	gameObject.scrapInvUpgradeCost.platinum = 0;
																	gameObject.scrapInvUpgradeCost.iridium *= 2;
																} else if (gameObject.scrapInvUpgradeCost.mythryl) {
																	gameObject.scrapInvUpgradeCost.iridium = 0;
																	gameObject.scrapInvUpgradeCost.mythryl *= 2;
																}
																const formatUpgradeCost = formatPartCost(gameObject.scrapInvUpgradeCost);
																gameObject.scrapInvUpgradeCost = formatUpgradeCost;
																upgradeMsgs = ['Level ' + gameObject.scrapInvintoryLevel, 'Scrap Space Upgraded +5!'];
															}
															if (upgradeIndex === 7) {
																gameObject.partStorageLevel++;
																gameObject.partStorage += 3;
																if (!gameObject.partInvUpgradeCost.bronze && 
																!gameObject.partInvUpgradeCost.nickel && 
																!gameObject.partInvUpgradeCost.silver && 
																!gameObject.partInvUpgradeCost.gold && 
																!gameObject.partInvUpgradeCost.platinum &&
																!gameObject.partInvUpgradeCost.iridium &&
																!gameObject.partInvUpgradeCost.mythryl) {
																	gameObject.partInvUpgradeCost.copper *= 2;
																} else if (gameObject.partInvUpgradeCost.bronze) {
																	gameObject.partInvUpgradeCost.copper = 0;
																	gameObject.partInvUpgradeCost.bronze *= 2;
																} else if (gameObject.partInvUpgradeCost.nickel) {
																	gameObject.partInvUpgradeCost.bronze = 0;
																	gameObject.partInvUpgradeCost.nickel *= 2;
																} else if (gameObject.partInvUpgradeCost.silver) {
																	gameObject.partInvUpgradeCost.nickel = 0;
																	gameObject.partInvUpgradeCost.silver *= 2;
																} else if (gameObject.partInvUpgradeCost.gold) {
																	gameObject.partInvUpgradeCost.silver = 0;
																	gameObject.partInvUpgradeCost.gold *= 2;
																} else if (gameObject.partInvUpgradeCost.platinum) {
																	gameObject.partInvUpgradeCost.gold = 0;
																	gameObject.partInvUpgradeCost.platinum *= 2;
																} else if (gameObject.partInvUpgradeCost.iridium) {
																	gameObject.partInvUpgradeCost.platinum = 0;
																	gameObject.partInvUpgradeCost.iridium *= 2;
																} else if (gameObject.partInvUpgradeCost.mythryl) {
																	gameObject.partInvUpgradeCost.iridium = 0;
																	gameObject.partInvUpgradeCost.mythryl *= 2;
																}
																const formatUpgradeCost = formatPartCost(gameObject.partInvUpgradeCost);
																gameObject.partInvUpgradeCost = formatUpgradeCost;
																upgradeMsgs = ['Level ' + gameObject.partStorageLevel, 'Part Space Upgraded +3!'];
															}
															if (upgradeIndex === 8) {
																gameObject.robotStorageLevel++;
																gameObject.robotStorage++;
																if (!gameObject.robotInvUpgradeCost.bronze && 
																!gameObject.robotInvUpgradeCost.nickel && 
																!gameObject.robotInvUpgradeCost.silver && 
																!gameObject.robotInvUpgradeCost.gold && 
																!gameObject.robotInvUpgradeCost.platinum &&
																!gameObject.robotInvUpgradeCost.iridium &&
																!gameObject.robotInvUpgradeCost.mythryl) {
																	gameObject.robotInvUpgradeCost.copper *= 2;
																} else if (gameObject.robotInvUpgradeCost.bronze) {
																	gameObject.robotInvUpgradeCost.copper = 0;
																	gameObject.robotInvUpgradeCost.bronze *= 2;
																} else if (gameObject.robotInvUpgradeCost.nickel) {
																	gameObject.robotInvUpgradeCost.bronze = 0;
																	gameObject.robotInvUpgradeCost.nickel *= 2;
																} else if (gameObject.robotInvUpgradeCost.silver) {
																	gameObject.robotInvUpgradeCost.nickel = 0;
																	gameObject.robotInvUpgradeCost.silver *= 2;
																} else if (gameObject.robotInvUpgradeCost.gold) {
																	gameObject.robotInvUpgradeCost.silver = 0;
																	gameObject.robotInvUpgradeCost.gold *= 2;
																} else if (gameObject.robotInvUpgradeCost.platinum) {
																	gameObject.robotInvUpgradeCost.gold = 0;
																	gameObject.robotInvUpgradeCost.platinum *= 2;
																} else if (gameObject.robotInvUpgradeCost.iridium) {
																	gameObject.robotInvUpgradeCost.platinum = 0;
																	gameObject.robotInvUpgradeCost.iridium *= 2;
																} else if (gameObject.robotInvUpgradeCost.mythryl) {
																	gameObject.robotInvUpgradeCost.iridium = 0;
																	gameObject.robotInvUpgradeCost.mythryl *= 2;
																}
																const formatUpgradeCost = formatPartCost(gameObject.robotInvUpgradeCost);
																gameObject.robotInvUpgradeCost = formatUpgradeCost;
																upgradeMsgs = ['Level ' + gameObject.robotStorageLevel, 'Robot Space Upgraded +1!'];
															}
															
															subtractFunds(formatUpgradeCost);

															Particle.floatingText({
																font: '2.3rem serif',
																msg: '+',
																align: 'center',
																posX: Aurora.placeEntityX(0.472),
																posY: Aurora.placeEntityY(0.29),
																direction: 'top',
																color: 'green',
																ticks: 13,
																speed: 0.8,
															});
															
															Particle.animComplete = {
																method: function() {
																	homePlayerUpgrades.loadPage();
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
																				id: 'modal-background',
																				isBackground: true,
																				props: {},
																				methodId: id
																			});
																		}
																	};
																	Aurora.addMethod(Aurora.methodSetup);
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
																				msgs: upgradeMsgs,
																				msgStart: Aurora.placeEntityY(0.45, (Aurora.entitySize * 30)),
																				msgDistance: (Aurora.entitySize * 8),
																				bgColor: 'grey',
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
																			drawText({
																				font: '2.1em serif',
																				msg: 'Funds',
																				posX: Aurora.placeEntityX(0.466),
																				posY: Aurora.placeEntityY(0.14),
																				color: 'darkgrey',
																				align: 'center',
																				props: {},
																				id: 'upgrade-fund-title',
																				methodId: id
																			});
																		}
																	};
																	Aurora.addMethod(Aurora.methodSetup);
																	displayCondensedFunds(0.465, 0.185, 0.465, 0.22, '1.2em serif', 'white', 'center');
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
																				msg: 'Nice!',
																				isFilled: true,
																				id: 'upgraded',
																				action: { 
																					method: function(id) { 
																						const modal = Aurora.methodObjects.find(build => build.id === Aurora.modalId);
																						Aurora.deleteEntity(modal.methodId);
																						homePlayerUpgrades.loadPage();
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
															};
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
												id: 'cancel-upgrade',
												action: { 
													method: function(id) { 
														const modal = Aurora.methodObjects.find(build => build.id === Aurora.modalId);
														Aurora.deleteEntity(modal.methodId);
														homePlayerUpgrades.loadPage();
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
							},
							isModalBtn: false,
							props: {},
							methodId: id
						});
					}
				};
				Aurora.addMethod(Aurora.methodSetup);
				
				if (i === 2) {
					upgradeSelectRow++;
				}
				if (i === 5) {
					upgradeSelectRow++;
				}
				if (upgradeCount === 3) {
					upgradeCount = 0;
				}
			}
		}
		upgradePlayer(); // draw the upgrade menu
	}
}
