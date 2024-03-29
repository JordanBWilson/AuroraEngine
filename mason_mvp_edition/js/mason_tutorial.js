// Copyright (C) 2024  Jordan Wilson
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

function removeModal() {
	const modal = Aurora.methodObjects.find(build => build.id === Aurora.modalId);
	if (modal) {
		Aurora.deleteEntity(modal.methodId);
	}
}
// future Jordan, time to work on the cut scenes
function tutorialIntro() {
	let msgs = ['***INCOMING TRANSMISSION***', '', '', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.465, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: Aurora.entitySize * 2.9 + 'px terminal',
				msgs: msgs,
				msgStart: Aurora.placeEntityY(0.61, (Aurora.entitySize * 30)),
				msgDistance: (Aurora.entitySize * 5),
				bgColor: '',
				isModalFilled: true,
				id: Aurora.modalId,
				layer: 1,
				action: {
					method: function(id) {
						removeModal();
						tutorialIntro1();
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
function tutorialIntro1() {
	let msgs = ['Finally someone answered! Listen,', 'you are not out of this yet.', 'My scanners detect unknown', ' entities all around you.', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.465, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: Aurora.entitySize * 2.9 + 'px terminal',
				msgs: msgs,
				msgStart: Aurora.placeEntityY(0.55, (Aurora.entitySize * 30)),
				msgDistance: (Aurora.entitySize * 5),
				bgColor: '',
				isModalFilled: true,
				id: Aurora.modalId,
				layer: 1,
				action: {
					method: function(id) {
						removeModal();
						tutorialIntro2();
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
function tutorialIntro2() {
	let msgs = ['If you are going to survive', 'you need to start building', 'some Defenders to keep you safe.', '', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.465, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: Aurora.entitySize * 2.9 + 'px terminal',
				msgs: msgs,
				msgStart: Aurora.placeEntityY(0.55, (Aurora.entitySize * 30)),
				msgDistance: (Aurora.entitySize * 5),
				bgColor: '',
				isModalFilled: true,
				id: Aurora.modalId,
				layer: 1,
				action: {
					method: function(id) {
						removeModal();
						tutorialIntro3();
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
function tutorialIntro3() {
	let msgs = ['Before you can do that I would', 'suggest looking around for some', 'scrap metal in your area.', 'There has to be some close by.', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.465, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: Aurora.entitySize * 2.9 + 'px terminal',
				msgs: msgs,
				msgStart: Aurora.placeEntityY(0.55, (Aurora.entitySize * 30)),
				msgDistance: (Aurora.entitySize * 5),
				bgColor: '',
				isModalFilled: true,
				id: Aurora.modalId,
				layer: 1,
				action: {
					method: function(id) {
						removeModal();
						tutorialIntro4();
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
function tutorialIntro4() {
	let msgs = ['Tap on the scrap pile till', 'you find some usable pieces.', 'You will need 10 pieces.', '', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.465, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: Aurora.entitySize * 2.9 + 'px terminal',
				msgs: msgs,
				msgStart: Aurora.placeEntityY(0.55, (Aurora.entitySize * 30)),
				msgDistance: (Aurora.entitySize * 5),
				bgColor: '',
				isModalFilled: true,
				id: Aurora.modalId,
				layer: 1,
				action: {
					method: function(id) {
						gameObject.tutorialStep++; // step 1
						removeModal();
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
function tutorialSellScrapIntro() {
	let msgs = ['Now that you have some scrap,', 'sell it for some money. Different', 'scrap goes for various amounts', 'of money.', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.465, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: Aurora.entitySize * 2.9 + 'px terminal',
				msgs: msgs,
				msgStart: Aurora.placeEntityY(0.55, (Aurora.entitySize * 30)),
				msgDistance: (Aurora.entitySize * 5),
				bgColor: '',
				isModalFilled: true,
				id: Aurora.modalId,
				layer: 1,
				action: {
					method: function(id) {
						removeModal();
						tutorialSellScrapIntro1();
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
function tutorialSellScrapIntro1() {
	let msgs = ['Let us sell what you found.', 'Tap on your home.', '', '', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.465, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: Aurora.entitySize * 2.9 + 'px terminal',
				msgs: msgs,
				msgStart: Aurora.placeEntityY(0.55, (Aurora.entitySize * 30)),
				msgDistance: (Aurora.entitySize * 5),
				bgColor: '',
				isModalFilled: true,
				id: Aurora.modalId,
				layer: 1,
				action: {
					method: function(id) {
						gameObject.tutorialStep++; // step 2
						removeModal();
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
function tutorialSellScrapHome() {
	let msgs = ['This is your base of operations.', 'Here you can use the Map to save', 'your game, Upgrade your Skills', ' and Sell Scrap, Robot Parts', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.465, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: Aurora.entitySize * 2.9 + 'px terminal',
				msgs: msgs,
				msgStart: Aurora.placeEntityY(0.55, (Aurora.entitySize * 30)),
				msgDistance: (Aurora.entitySize * 5),
				bgColor: '',
				isModalFilled: true,
				id: Aurora.modalId,
				layer: 1,
				action: {
					method: function(id) {
						tutorialSellScrapHome1();
						removeModal();
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
function tutorialSellScrapHome1() {
	let msgs = ['or Completed Robots.', '', '', '', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.465, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: Aurora.entitySize * 2.9 + 'px terminal',
				msgs: msgs,
				msgStart: Aurora.placeEntityY(0.55, (Aurora.entitySize * 30)),
				msgDistance: (Aurora.entitySize * 5),
				bgColor: '',
				isModalFilled: true,
				id: Aurora.modalId,
				layer: 1,
				action: {
					method: function(id) {
						tutorialSellScrapHome2();
						removeModal();
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
function tutorialSellScrapHome2() {
	let msgs = ['Right now you need some money.', 'Tap the Sell button.', '', '', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.465, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: Aurora.entitySize * 2.9 + 'px terminal',
				msgs: msgs,
				msgStart: Aurora.placeEntityY(0.55, (Aurora.entitySize * 30)),
				msgDistance: (Aurora.entitySize * 5),
				bgColor: '',
				isModalFilled: true,
				id: Aurora.modalId,
				layer: 1,
				action: {
					method: function(id) {
						gameObject.tutorialStep++; // step 3
						removeModal();
						homePage.loadPage();
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
function tutorialSellScrapSellBtn() {
	let msgs = ['Now tap the Scrap button.', '', '', '', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.465, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: Aurora.entitySize * 2.9 + 'px terminal',
				msgs: msgs,
				msgStart: Aurora.placeEntityY(0.55, (Aurora.entitySize * 30)),
				msgDistance: (Aurora.entitySize * 5),
				bgColor: '',
				isModalFilled: true,
				id: Aurora.modalId,
				layer: 1,
				action: {
					method: function(id) {
						gameObject.tutorialStep++; // step 4
						removeModal();
						homeSellMenus.loadPage();
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
function tutorialSellAllScrap() {
	let msgs = ['Go ahead and sell all of your', 'scrap. Tap Common Scrap and then', 'tap the Sell button.', '', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.465, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: Aurora.entitySize * 2.9 + 'px terminal',
				msgs: msgs,
				msgStart: Aurora.placeEntityY(0.55, (Aurora.entitySize * 30)),
				msgDistance: (Aurora.entitySize * 5),
				bgColor: '',
				isModalFilled: true,
				id: Aurora.modalId,
				layer: 1,
				action: {
					method: function(id) {
						gameObject.tutorialStep++; // step 5
						removeModal();
						homeSellScrap.loadPage();
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
function tutorialSellScrapSold() {
	let msgs = ['Great! Now that you have some', 'money, you can now afford to build', 'a Factory. The Factory is where', 'you build Robot Defenders.', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.465, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: Aurora.entitySize * 2.9 + 'px terminal',
				msgs: msgs,
				msgStart: Aurora.placeEntityY(0.55, (Aurora.entitySize * 30)),
				msgDistance: (Aurora.entitySize * 5),
				bgColor: '',
				isModalFilled: true,
				id: Aurora.modalId,
				layer: 1,
				action: {
					method: function(id) {
						removeModal();
						homeSellScrap.loadPage();
						tutorialSellScrapSold1();
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
function tutorialSellScrapSold1() {
	let msgs = ['You should build that next.', 'Tap the Back button twice to', 'get back Home.', '', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.465, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: Aurora.entitySize * 2.9 + 'px terminal',
				msgs: msgs,
				msgStart: Aurora.placeEntityY(0.55, (Aurora.entitySize * 30)),
				msgDistance: (Aurora.entitySize * 5),
				bgColor: '',
				isModalFilled: true,
				id: Aurora.modalId,
				layer: 1,
				action: {
					method: function(id) {
						gameObject.tutorialStep++; // step 6
						removeModal();
						homeSellScrap.loadPage();
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
function tutorialCreateFactory() {
	let msgs = ['Now that you are back Home,', 'Tap the Upgrade Button.', '', '', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.465, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: Aurora.entitySize * 2.9 + 'px terminal',
				msgs: msgs,
				msgStart: Aurora.placeEntityY(0.55, (Aurora.entitySize * 30)),
				msgDistance: (Aurora.entitySize * 5),
				bgColor: '',
				isModalFilled: true,
				id: Aurora.modalId,
				layer: 1,
				action: {
					method: function(id) {
						gameObject.tutorialStep++; // step 7
						removeModal();
						homePage.loadPage();
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
function tutorialBuildFactory() {
	let msgs = ['Tap the Factory button and Build', 'it with the money you earned.', '', '', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.465, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: Aurora.entitySize * 2.9 + 'px terminal',
				msgs: msgs,
				msgStart: Aurora.placeEntityY(0.55, (Aurora.entitySize * 30)),
				msgDistance: (Aurora.entitySize * 5),
				bgColor: '',
				isModalFilled: true,
				id: Aurora.modalId,
				layer: 1,
				action: {
					method: function(id) {
						gameObject.tutorialStep++; // step 8
						removeModal();
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
function tutorialBuildArena() {
	let msgs = ['Nice going! Now you can build', 'Robot Defenders.', '', '', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.465, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: Aurora.entitySize * 2.9 + 'px terminal',
				msgs: msgs,
				msgStart: Aurora.placeEntityY(0.55, (Aurora.entitySize * 30)),
				msgDistance: (Aurora.entitySize * 5),
				bgColor: '',
				isModalFilled: true,
				id: Aurora.modalId,
				layer: 1,
				action: {
					method: function(id) {
						removeModal();
						homePlayerUpgrades.loadPage();
						tutorialBuildArena1();
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
function tutorialBuildArena1() {
	let msgs = ['While you are here... Go ahead', 'and spend the rest of your money', 'on the Arena. It will be good to', 'test your Robots out.', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.465, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: Aurora.entitySize * 2.9 + 'px terminal',
				msgs: msgs,
				msgStart: Aurora.placeEntityY(0.55, (Aurora.entitySize * 30)),
				msgDistance: (Aurora.entitySize * 5),
				bgColor: '',
				isModalFilled: true,
				id: Aurora.modalId,
				layer: 1,
				action: {
					method: function(id) {
						gameObject.tutorialStep++; // step 9
						removeModal();
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
function tutorialBuildRobotParts() {
	let msgs = ['Nice! Now you will be able to', 'see what your Robots can do', 'in battle.', '', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.465, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: Aurora.entitySize * 2.9 + 'px terminal',
				msgs: msgs,
				msgStart: Aurora.placeEntityY(0.55, (Aurora.entitySize * 30)),
				msgDistance: (Aurora.entitySize * 5),
				bgColor: '',
				isModalFilled: true,
				id: Aurora.modalId,
				layer: 1,
				action: {
					method: function(id) {
						removeModal();
						homePlayerUpgrades.loadPage();
						tutorialBuildRobotParts1();
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
function tutorialBuildRobotParts1() {
	let msgs = ['Next comes the tricky part. It is', 'time to build some robot parts.', 'Before you can build any parts,', 'you will have to level up', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.465, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: Aurora.entitySize * 2.9 + 'px terminal',
				msgs: msgs,
				msgStart: Aurora.placeEntityY(0.55, (Aurora.entitySize * 30)),
				msgDistance: (Aurora.entitySize * 5),
				bgColor: '',
				isModalFilled: true,
				id: Aurora.modalId,
				layer: 1,
				action: {
					method: function(id) {
						removeModal();
						homePlayerUpgrades.loadPage();
						tutorialBuildRobotParts2();
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
function tutorialBuildRobotParts2() {
	let msgs = ['your Engineering skill.', '', '', '', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.465, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: Aurora.entitySize * 2.9 + 'px terminal',
				msgs: msgs,
				msgStart: Aurora.placeEntityY(0.55, (Aurora.entitySize * 30)),
				msgDistance: (Aurora.entitySize * 5),
				bgColor: '',
				isModalFilled: true,
				id: Aurora.modalId,
				layer: 1,
				action: {
					method: function(id) {
						removeModal();
						homePlayerUpgrades.loadPage();
						tutorialBuildRobotParts3();
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
function tutorialBuildRobotParts3() {
	let msgs = ['Before you can level up your', 'Engineering skill, you will have', 'to sell more Scrap. Then', 'you will need even more scrap', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.465, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: Aurora.entitySize * 2.9 + 'px terminal',
				msgs: msgs,
				msgStart: Aurora.placeEntityY(0.55, (Aurora.entitySize * 30)),
				msgDistance: (Aurora.entitySize * 5),
				bgColor: '',
				isModalFilled: true,
				id: Aurora.modalId,
				layer: 1,
				action: {
					method: function(id) {
						removeModal();
						homePlayerUpgrades.loadPage();
						tutorialBuildRobotParts4();
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
function tutorialBuildRobotParts4() {
	let msgs = ['to build all the parts that you ', 'will need to put together', 'a Robot.', '', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.465, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: Aurora.entitySize * 2.9 + 'px terminal',
				msgs: msgs,
				msgStart: Aurora.placeEntityY(0.55, (Aurora.entitySize * 30)),
				msgDistance: (Aurora.entitySize * 5),
				bgColor: '',
				isModalFilled: true,
				id: Aurora.modalId,
				layer: 1,
				action: {
					method: function(id) {
						removeModal();
						homePlayerUpgrades.loadPage();
						tutorialBuildRobotParts5();
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
function tutorialBuildRobotParts5() {
	let msgs = ['To build a complete robot you', 'will need: One Chassis, One Head,', 'Two Arms and Two Legs. Now', 'go outside and let us check out', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.465, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: Aurora.entitySize * 2.9 + 'px terminal',
				msgs: msgs,
				msgStart: Aurora.placeEntityY(0.55, (Aurora.entitySize * 30)),
				msgDistance: (Aurora.entitySize * 5),
				bgColor: '',
				isModalFilled: true,
				id: Aurora.modalId,
				layer: 1,
				action: {
					method: function(id) {
						removeModal();
						homePlayerUpgrades.loadPage();
						tutorialBuildRobotParts6();
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
function tutorialBuildRobotParts6() {
	let msgs = ['your new Factory. Go back', 'outside and tap on your', 'Factory', '', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.465, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: Aurora.entitySize * 2.9 + 'px terminal',
				msgs: msgs,
				msgStart: Aurora.placeEntityY(0.55, (Aurora.entitySize * 30)),
				msgDistance: (Aurora.entitySize * 5),
				bgColor: '',
				isModalFilled: true,
				id: Aurora.modalId,
				layer: 1,
				action: {
					method: function(id) {
						gameObject.tutorialStep++; // step 10
						removeModal();
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
function tutorialFactoryMenu() {
	let msgs = ['In the Factory, you can tap the', 'Parts button to build robot parts', 'or you can select a robot', 'design to create a new robot. Tap', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.465, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: Aurora.entitySize * 2.9 + 'px terminal',
				msgs: msgs,
				msgStart: Aurora.placeEntityY(0.55, (Aurora.entitySize * 30)),
				msgDistance: (Aurora.entitySize * 5),
				bgColor: '',
				isModalFilled: true,
				id: Aurora.modalId,
				layer: 1,
				action: {
					method: function(id) {
						removeModal();
						tutorialFactoryMenu1();
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
function tutorialFactoryMenu1() {
	let msgs = ['on the Parts button.', '', '', '', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.465, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: Aurora.entitySize * 2.9 + 'px terminal',
				msgs: msgs,
				msgStart: Aurora.placeEntityY(0.55, (Aurora.entitySize * 30)),
				msgDistance: (Aurora.entitySize * 5),
				bgColor: '',
				isModalFilled: true,
				id: Aurora.modalId,
				layer: 1,
				action: {
					method: function(id) {
						gameObject.tutorialStep++; // step 11
						removeModal();
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
function tutorialFactoryParts() {
	let msgs = ['This is where you can build parts', 'for your Robots. Choose what type', 'of part you would like to make', 'and then choose the design.', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.465, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: Aurora.entitySize * 2.9 + 'px terminal',
				msgs: msgs,
				msgStart: Aurora.placeEntityY(0.55, (Aurora.entitySize * 30)),
				msgDistance: (Aurora.entitySize * 5),
				bgColor: '',
				isModalFilled: true,
				id: Aurora.modalId,
				layer: 1,
				action: {
					method: function(id) {
						removeModal();
						setTimeout(function() {
							tutorialFactoryParts1();
						}, 0);
						
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
function tutorialFactoryParts1() {
	let msgs = ['Finally, tap the Build button.', 'Remember, more advanced parts', 'will require you to upgrade your', 'Engineering skill. The better the', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.465, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: Aurora.entitySize * 2.9 + 'px terminal',
				msgs: msgs,
				msgStart: Aurora.placeEntityY(0.55, (Aurora.entitySize * 30)),
				msgDistance: (Aurora.entitySize * 5),
				bgColor: '',
				isModalFilled: true,
				id: Aurora.modalId,
				layer: 1,
				action: {
					method: function(id) {
						removeModal();
						setTimeout(function() {
							tutorialFactoryParts2();
						}, 0);
						
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
function tutorialFactoryParts2() {
	let msgs = ['part the better your skill', 'will need to be. Now tap the back', 'button and select one of your', 'empty Robot Designs.', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.465, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: Aurora.entitySize * 2.9 + 'px terminal',
				msgs: msgs,
				msgStart: Aurora.placeEntityY(0.55, (Aurora.entitySize * 30)),
				msgDistance: (Aurora.entitySize * 5),
				bgColor: '',
				isModalFilled: true,
				id: Aurora.modalId,
				layer: 1,
				action: {
					method: function(id) {
						gameObject.tutorialStep++; // step 12
						removeModal();
						factoryParts.loadPage();
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
function tutorialFactoryRobots() {
	let msgs = ['This is where you can take the', 'parts you have made and put', 'together a robot. Before you can', 'begin, you will have to upgrade', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.465, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: Aurora.entitySize * 2.9 + 'px terminal',
				msgs: msgs,
				msgStart: Aurora.placeEntityY(0.55, (Aurora.entitySize * 30)),
				msgDistance: (Aurora.entitySize * 5),
				bgColor: '',
				isModalFilled: true,
				id: Aurora.modalId,
				layer: 1,
				action: {
					method: function(id) {
						removeModal();
						tutorialFactoryRobots1();
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
function tutorialFactoryRobots1() {
	let msgs = ['your Robotics skill. Once you', 'have upgraded your Robotics skill', 'and made all of the required', 'parts, then you can start', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.465, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: Aurora.entitySize * 2.9 + 'px terminal',
				msgs: msgs,
				msgStart: Aurora.placeEntityY(0.55, (Aurora.entitySize * 30)),
				msgDistance: (Aurora.entitySize * 5),
				bgColor: '',
				isModalFilled: true,
				id: Aurora.modalId,
				layer: 1,
				action: {
					method: function(id) {
						removeModal();
						tutorialFactoryRobots2();
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
function tutorialFactoryRobots2() {
	let msgs = ['building Robots. To build a Robot,', 'tap on a section of the robot to', 'bring up all the parts for that', 'section. Tap on a part. Some', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.465, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: Aurora.entitySize * 2.9 + 'px terminal',
				msgs: msgs,
				msgStart: Aurora.placeEntityY(0.55, (Aurora.entitySize * 30)),
				msgDistance: (Aurora.entitySize * 5),
				bgColor: '',
				isModalFilled: true,
				id: Aurora.modalId,
				layer: 1,
				action: {
					method: function(id) {
						removeModal();
						tutorialFactoryRobots3();
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
function tutorialFactoryRobots3() {
	let msgs = ['parts are better than others so', 'make sure to look at the Stats', 'each part is contributing. When', 'you are ready to add a part, tap', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.465, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: Aurora.entitySize * 2.9 + 'px terminal',
				msgs: msgs,
				msgStart: Aurora.placeEntityY(0.55, (Aurora.entitySize * 30)),
				msgDistance: (Aurora.entitySize * 5),
				bgColor: '',
				isModalFilled: true,
				id: Aurora.modalId,
				layer: 1,
				action: {
					method: function(id) {
						removeModal();
						tutorialFactoryRobots4();
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
function tutorialFactoryRobots4() {
	let msgs = ['the Confirm button at the botton', 'of the Stats. Do that for each', 'section of the robot. When all', 'the parts have been added to the', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.465, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: Aurora.entitySize * 2.9 + 'px terminal',
				msgs: msgs,
				msgStart: Aurora.placeEntityY(0.55, (Aurora.entitySize * 30)),
				msgDistance: (Aurora.entitySize * 5),
				bgColor: '',
				isModalFilled: true,
				id: Aurora.modalId,
				layer: 1,
				action: {
					method: function(id) {
						removeModal();
						tutorialFactoryRobots5();
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
function tutorialFactoryRobots5() {
	let msgs = ['Robot, tap the Build button to', 'create the Robot. Feel free to', 'edit any Robot after you find', 'more parts.', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.465, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: Aurora.entitySize * 2.9 + 'px terminal',
				msgs: msgs,
				msgStart: Aurora.placeEntityY(0.55, (Aurora.entitySize * 30)),
				msgDistance: (Aurora.entitySize * 5),
				bgColor: '',
				isModalFilled: true,
				id: Aurora.modalId,
				layer: 1,
				action: {
					method: function(id) {
						removeModal();
						tutorialFactoryRobots6();
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
function tutorialFactoryRobots6() {
	let msgs = ['When you are ready, go outside', 'and let us checkout the Arena', 'next.', '', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.465, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: Aurora.entitySize * 2.9 + 'px terminal',
				msgs: msgs,
				msgStart: Aurora.placeEntityY(0.55, (Aurora.entitySize * 30)),
				msgDistance: (Aurora.entitySize * 5),
				bgColor: '',
				isModalFilled: true,
				id: Aurora.modalId,
				layer: 1,
				action: {
					method: function(id) {
						gameObject.tutorialStep++; // step 13
						removeModal();
						factoryPage.loadPage();
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
function tutorialArena() {
	let msgs = ['This is where you can test out', 'the new Robots that you have', 'made. Select a Robot that you', 'have built to upload it. After', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.465, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: Aurora.entitySize * 2.9 + 'px terminal',
				msgs: msgs,
				msgStart: Aurora.placeEntityY(0.55, (Aurora.entitySize * 30)),
				msgDistance: (Aurora.entitySize * 5),
				bgColor: '',
				isModalFilled: true,
				id: Aurora.modalId,
				layer: 1,
				action: {
					method: function(id) {
						removeModal();
						tutorialArena1();
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
function tutorialArena1() {
	let msgs = ['you have made your selection,', 'select how you would like your', 'robot to behave with the', 'Directives. Next select a Tower', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.465, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: Aurora.entitySize * 2.9 + 'px terminal',
				msgs: msgs,
				msgStart: Aurora.placeEntityY(0.55, (Aurora.entitySize * 30)),
				msgDistance: (Aurora.entitySize * 5),
				bgColor: '',
				isModalFilled: true,
				id: Aurora.modalId,
				layer: 1,
				action: {
					method: function(id) {
						removeModal();
						tutorialArena2();
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
function tutorialArena2() {
	let msgs = ['and then choose how it shoots', 'with the Directives. When you', 'have at least one Robot and one', 'Tower you are ready to tap the', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.465, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: Aurora.entitySize * 2.9 + 'px terminal',
				msgs: msgs,
				msgStart: Aurora.placeEntityY(0.55, (Aurora.entitySize * 30)),
				msgDistance: (Aurora.entitySize * 5),
				bgColor: '',
				isModalFilled: true,
				id: Aurora.modalId,
				layer: 1,
				action: {
					method: function(id) {
						removeModal();
						tutorialArena3();
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
function tutorialArena3() {
	let msgs = ['Play button.', '', '', '', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.465, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: Aurora.entitySize * 2.9 + 'px terminal',
				msgs: msgs,
				msgStart: Aurora.placeEntityY(0.55, (Aurora.entitySize * 30)),
				msgDistance: (Aurora.entitySize * 5),
				bgColor: '',
				isModalFilled: true,
				id: Aurora.modalId,
				layer: 1,
				action: {
					method: function(id) {
						gameObject.tutorialStep++; // step 14
						removeModal();
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
function tutorialMaul() {
	let msgs = ['So it looks like you are ready to', 'compete. Here is a quick summary', 'of the game you will be playing.', '', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.465, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: Aurora.entitySize * 2.9 + 'px terminal',
				msgs: msgs,
				msgStart: Aurora.placeEntityY(0.55, (Aurora.entitySize * 30)),
				msgDistance: (Aurora.entitySize * 5),
				bgColor: '',
				isModalFilled: true,
				id: Aurora.modalId,
				layer: 1,
				action: {
					method: function(id) {
						removeModal();
						tutorialMaul1();
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
function tutorialMaul1() {
	let msgs = ['Protect your base. Build and', 'upgrade the towers on your side.', 'Send Robots to attack your', 'opponent. Cast spells to slow', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.465, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: Aurora.entitySize * 2.9 + 'px terminal',
				msgs: msgs,
				msgStart: Aurora.placeEntityY(0.55, (Aurora.entitySize * 30)),
				msgDistance: (Aurora.entitySize * 5),
				bgColor: '',
				isModalFilled: true,
				id: Aurora.modalId,
				layer: 1,
				action: {
					method: function(id) {
						removeModal();
						tutorialMaul2();
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
function tutorialMaul2() {
	let msgs = ['down or destroy enemy Robots.', 'Did I mention protect your base?', 'First objective is to build', 'towers. There are spots you can', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.465, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: Aurora.entitySize * 2.9 + 'px terminal',
				msgs: msgs,
				msgStart: Aurora.placeEntityY(0.55, (Aurora.entitySize * 30)),
				msgDistance: (Aurora.entitySize * 5),
				bgColor: '',
				isModalFilled: true,
				id: Aurora.modalId,
				layer: 1,
				action: {
					method: function(id) {
						removeModal();
						tutorialMaul3();
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
function tutorialMaul3() {
	let msgs = ['build on. They are marked as', 'such. Tap on a spot to build and', 'then select the tower to build.', 'Tapping a built tower once will', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.465, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: Aurora.entitySize * 2.9 + 'px terminal',
				msgs: msgs,
				msgStart: Aurora.placeEntityY(0.55, (Aurora.entitySize * 30)),
				msgDistance: (Aurora.entitySize * 5),
				bgColor: '',
				isModalFilled: true,
				id: Aurora.modalId,
				layer: 1,
				action: {
					method: function(id) {
						removeModal();
						tutorialMaul4();
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
function tutorialMaul4() {
	let msgs = ['show the towers range. Tapping', 'the same tower again will bring', 'up the upgrade menu for that', 'tower. You may have to upgrade', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.465, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: Aurora.entitySize * 2.9 + 'px terminal',
				msgs: msgs,
				msgStart: Aurora.placeEntityY(0.55, (Aurora.entitySize * 30)),
				msgDistance: (Aurora.entitySize * 5),
				bgColor: '',
				isModalFilled: true,
				id: Aurora.modalId,
				layer: 1,
				action: {
					method: function(id) {
						removeModal();
						tutorialMaul5();
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
function tutorialMaul5() {
	let msgs = ['your Arena to upgrade your', 'tower in game. Next you need to', 'worry about sending Robots.', 'Select one of the robots you', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.465, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: Aurora.entitySize * 2.9 + 'px terminal',
				msgs: msgs,
				msgStart: Aurora.placeEntityY(0.55, (Aurora.entitySize * 30)),
				msgDistance: (Aurora.entitySize * 5),
				bgColor: '',
				isModalFilled: true,
				id: Aurora.modalId,
				layer: 1,
				action: {
					method: function(id) {
						removeModal();
						tutorialMaul6();
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
function tutorialMaul6() {
	let msgs = ['uploaded and then tap one of the', 'Send buttons on the side you', 'would like to send it. Lastly let', 'us review Spells. Spells can', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.465, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: Aurora.entitySize * 2.9 + 'px terminal',
				msgs: msgs,
				msgStart: Aurora.placeEntityY(0.55, (Aurora.entitySize * 30)),
				msgDistance: (Aurora.entitySize * 5),
				bgColor: '',
				isModalFilled: true,
				id: Aurora.modalId,
				layer: 1,
				action: {
					method: function(id) {
						removeModal();
						tutorialMaul7();
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
function tutorialMaul7() {
	let msgs = ['change the tide of the game.', 'You have two spells, one is a', 'Wall and the other is an EMP.', 'The wall stops the enemy robots', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.465, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: Aurora.entitySize * 2.9 + 'px terminal',
				msgs: msgs,
				msgStart: Aurora.placeEntityY(0.55, (Aurora.entitySize * 30)),
				msgDistance: (Aurora.entitySize * 5),
				bgColor: '',
				isModalFilled: true,
				id: Aurora.modalId,
				layer: 1,
				action: {
					method: function(id) {
						removeModal();
						tutorialMaul8();
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
function tutorialMaul8() {
	let msgs = ['from moving. The EMP destroys', 'robots on contact. Place Spells', 'on the walkway closest to you.', '', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.465, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: Aurora.entitySize * 2.9 + 'px terminal',
				msgs: msgs,
				msgStart: Aurora.placeEntityY(0.55, (Aurora.entitySize * 30)),
				msgDistance: (Aurora.entitySize * 5),
				bgColor: '',
				isModalFilled: true,
				id: Aurora.modalId,
				layer: 1,
				action: {
					method: function(id) {
						removeModal();
						tutorialMaul9();
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
function tutorialMaul9() {
	let msgs = ['Do not worry about winning your', 'first game. The first few games', 'are slow so you can get aquanted', 'with the gameplay.', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.465, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: Aurora.entitySize * 2.9 + 'px terminal',
				msgs: msgs,
				msgStart: Aurora.placeEntityY(0.55, (Aurora.entitySize * 30)),
				msgDistance: (Aurora.entitySize * 5),
				bgColor: '',
				isModalFilled: true,
				id: Aurora.modalId,
				layer: 1,
				action: {
					method: function(id) {
						removeModal();
						tutorialMaul10();
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
function tutorialMaul10() {
	let msgs = ['If you do win, you will get', 'prizes like money and new Robot', 'Parts. Keep in mind that every', 'win will', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.465, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: Aurora.entitySize * 2.9 + 'px terminal',
				msgs: msgs,
				msgStart: Aurora.placeEntityY(0.55, (Aurora.entitySize * 30)),
				msgDistance: (Aurora.entitySize * 5),
				bgColor: '',
				isModalFilled: true,
				id: Aurora.modalId,
				layer: 1,
				action: {
					method: function(id) {
						removeModal();
						tutorialMaul11();
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
function tutorialMaul11() {
	let msgs = ['increase the difficulty of the', 'next game. When you are ready,', 'tap the Play button one more', 'time. Good luck out there!', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.465, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: Aurora.entitySize * 2.9 + 'px terminal',
				msgs: msgs,
				msgStart: Aurora.placeEntityY(0.55, (Aurora.entitySize * 30)),
				msgDistance: (Aurora.entitySize * 5),
				bgColor: '',
				isModalFilled: true,
				id: Aurora.modalId,
				layer: 1,
				action: {
					method: function(id) {
						removeModal();
						tutorialMaul12();
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
function tutorialMaul12() {
	let msgs = ['***TRANSMISSION LOST***', '', '', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.465, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: Aurora.entitySize * 2.9 + 'px terminal',
				msgs: msgs,
				msgStart: Aurora.placeEntityY(0.55, (Aurora.entitySize * 30)),
				msgDistance: (Aurora.entitySize * 5),
				bgColor: '',
				isModalFilled: true,
				id: Aurora.modalId,
				layer: 1,
				action: {
					method: function(id) {
						gameObject.tutorialStep++; // step 15
						removeModal();
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
