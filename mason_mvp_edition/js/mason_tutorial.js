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
	let msgs = ['If you are going to survive', 'you need to start building', 'some defenders to keep you safe.', '', '- Tap here to continue -'];
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
	
}
function tutorialSellScrapSold() {
	
}
function tutorialCreateFactoryArena() {
	
}
