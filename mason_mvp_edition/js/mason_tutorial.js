function removeModal() {
	const modal = Aurora.methodObjects.find(build => build.id === Aurora.modalId);
	if (modal) {
		Aurora.deleteEntity(modal.methodId);
	}
}
function tutorialIntro() {
	let msgs = ['***INCOMING TRANSMISSION***', '', '', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.50, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: '1em serif',
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
	let msgs = ['Finally someone answered!', 'Listen, you are not out of this yet.', 'My scanners detects unknown', ' entities all around you', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.50, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: '1em serif',
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
				posX: Aurora.placeEntityX(0.50, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: '1em serif',
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
				posX: Aurora.placeEntityX(0.50, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: '1em serif',
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
	let msgs = ['Tap on the scrap pile till', 'you find some usable pieces.', '', '', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.50, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: '1em serif',
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
	let msgs = ['Now that you have some scrap', 'sell it for some money. Different', 'scrap goes for various amounts', 'of money.', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.50, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: '1em serif',
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
				posX: Aurora.placeEntityX(0.50, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: '1em serif',
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
	let msgs = ['This is your base of operations.', 'Here you can use the Map to save your game,', 'Upgrade your skills and Sell scrap, robot', 'parts or completed robots.', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.50, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: '1em serif',
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
	let msgs = ['Right now you need some money.', 'Tap the Sell button.', '', '', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.50, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: '1em serif',
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
				posX: Aurora.placeEntityX(0.50, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: '1em serif',
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
	let msgs = ['Go ahead and sell all of your scrap.', 'Tap Common Scrap and then tap the', 'Sell button.', '', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.50, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: '1em serif',
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
	let msgs = ['Great! Now that you have some money,', 'you can now afford to build a Factory.', 'The Factory is where you build Robot Defenders.', '', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.50, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: '1em serif',
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
				posX: Aurora.placeEntityX(0.50, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: '1em serif',
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
				posX: Aurora.placeEntityX(0.50, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: '1em serif',
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
				posX: Aurora.placeEntityX(0.50, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: '1em serif',
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
	let msgs = ['Nice going! Now you can build Robot Defenders.', '', '', '', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.50, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: '1em serif',
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
	let msgs = ['While you are here...', 'Go ahead and spend the rest of your money', 'on the Arena. It will be good to see what your', 'Robots are made of.', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.50, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: '1em serif',
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
	let msgs = ['Nice! Now you will be able to see what', 'your Robots are made of in battle.', '', '', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.50, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: '1em serif',
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
	let msgs = ['Next comes the tricky part. It is time to build', 'some robot parts. Before you can build any parts,', 'you will have to level up your Engineering skill.', '', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.50, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: '1em serif',
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
	let msgs = ['Before you can level up your Engineering skill,', ' you will have to sell more Scrap.', 'Then you will need even more scrap to build', 'all the parts that you will need.', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.50, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: '1em serif',
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
	let msgs = ['To build a complete robot you will need:', 'One Chassis, One Head, Two Arms and Two Legs.', 'Now go outside and let us check out your', 'new Factory.', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.50, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: '1em serif',
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
	let msgs = ['In the Factory, you can tap the Parts button to', 'build robot parts or you can select a robot design', 'to create a new robot.', 'Tap on the Parts button.', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.50, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: '1em serif',
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
	let msgs = ['This is where you can build parts for your Robots.', 'Choose what type of part you would like to make', 'and then choose the design.', 'Finally, tap the Build button.', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.50, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: '1em serif',
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
						tutorialFactoryParts1();
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
	let msgs = ['Remember, more advanced parts will need', 'you to upgrade your Engineering skill.', 'The better the part the better', 'your skill will need to be.', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.50, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: '1em serif',
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
	let msgs = ['This is where you can take the parts', 'you have made and put together a robot.', 'Before you can begin, you will have to upgrade', 'your Robotics skill.', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.50, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: '1em serif',
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
	let msgs = ['Once you have upgraded your Robotics skill and', 'made all of the required parts, then you', 'can start building Robots.', '', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.50, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: '1em serif',
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
	let msgs = ['To build a Robot, tap on a section of the robot', 'to bring up all the parts for that section. Tap on', 'a part. Some parts are better than others so make sure', 'to look at the Stats each part is contributing.', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.50, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: '1em serif',
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
	let msgs = ['When you are ready to add a part, tap the', 'Confirm button at the botton of the Stats.', 'Do that for each section of the robot.', '', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.50, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: '1em serif',
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
	let msgs = ['When all the parts have been added to the Robot,', 'tap the Build button to create the Robot. Feel free', 'to edit any Robot after you find more parts.', '', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.50, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: '1em serif',
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
	let msgs = ['When you are ready, go outside and let us', 'checkout the Arena next.', '', '', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.50, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: '1em serif',
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
	let msgs = ['This is where you can test out the new Robots', 'that you have made. Select a Robot that you have', 'built. After you have made your selection, select how you', 'would like your robot to behave with the Directives.', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.50, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: '1em serif',
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
	let msgs = ['Next select a Tower and then choose how it', 'shoots with the Directives.', '', '', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.50, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: '1em serif',
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
	let msgs = ['When you have at least one Robot and one Tower', 'you are ready to tap the Play button.', '', '', '- Tap here to continue -'];
	Aurora.methodSetup = {
		layer: 1,
		method: function(id) {
			drawDialogueModal({
				posX: Aurora.placeEntityX(0.50, (Aurora.entitySize * 40)),
				posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
				width: (Aurora.entitySize * 45),
				height: (Aurora.entitySize * 28),
				lineWidth: 1,
				modalColor: 'grey',
				msgColor: 'white',
				msgFont: '1em serif',
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
