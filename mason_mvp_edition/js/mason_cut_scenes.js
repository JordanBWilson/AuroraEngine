let stopMovement = false;
let blackFilterValue = 0.3; // 0.87
let addWildTree1 = false;
let addwildTree2 = false;

function cutSceneIntro() {
	Aurora.clearStage();
	drawIntroBackground();
	Aurora.methodSetup = { method: function(id) { moveEntityLeftRight('grass-background-pattern', true, 0.055); }};
	Aurora.addMethod(Aurora.methodSetup);
	Aurora.methodSetup = { method: function(id) { moveEntityLeftRight('wild-tree-2', true, 0.055); }};
	Aurora.addMethod(Aurora.methodSetup)
	Aurora.methodSetup = { method: function(id) { moveEntityLeftRight('wild-tree-1', true, 0.055); }};
	Aurora.addMethod(Aurora.methodSetup);
	Aurora.methodSetup = { method: function(id) { wildTree1Check('wild-tree-2'); }};
	Aurora.addMethod(Aurora.methodSetup);
	Aurora.methodSetup = { method: function(id) { wildTree1Check('wild-tree-1'); }};
	Aurora.addMethod(Aurora.methodSetup);
	Aurora.methodSetup = { method: function(id) { addNextTrees(); }};
	Aurora.addMethod(Aurora.methodSetup);
	// future Jordan, this will fade the black filter
	setTimeout(function() {
		fadeBlackFilter();
	}, 5000);
	
	// future Jordan, this will stop the grass from moving
	//setTimeout(function() {
		//stopMovement = true;
	//},5000);
	
	// future Jordan, when the cut scene ends, do the thing below
	// gameObject.cutSceneStep++;
	// mainPage.loadPage();
}
function drawIntroBackground() {
	Aurora.methodSetup = {
		method: function(id) {
			drawRect({
				posX: Aurora.placeEntityX(0),
				posY: Aurora.placeEntityY(0),
				width: Aurora.canvas.width,
				height: (Aurora.canvas.height * 0.20),
				lineWidth: 1,
				color: '#0000FF',
				isFilled: true,
				id: 'sky-background',
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
					posX: Aurora.placeEntityX(0),
					posY: Aurora.placeEntityY(0.20),
					width: Aurora.canvas.width,
					height: Aurora.canvas.height,
					lineWidth: 1,
					color: '#3C7521',
					isFilled: true,
					id: 'grass-background',
					isBackground: false,
					props: {},
					methodId: id
				});
			}
		};
	Aurora.addMethod(Aurora.methodSetup);
	Aurora.methodSetup = {
		method: function(id) {
			drawImagePattern({
				posX: Aurora.placeEntityX(0),
				posY: Aurora.placeEntityY(0.20),
				width: (Aurora.canvas.width),
				height: (Aurora.canvas.height),
				patternWidth: (Aurora.canvas.height * 0.2),
				patternHeight: (Aurora.canvas.height * 0.2),
				images: [grassImg],
				selectedImage: 0,
				animTicks: 0,
				ticks: 0,
				id: 'grass-background-pattern',
				isBackground: false,
				props: {},
				methodId: id
			});
		}
	};
	Aurora.addMethod(Aurora.methodSetup);
	drawLayer2Trees();
	drawLayer1Trees();
	Aurora.methodSetup = {
		method: function(id) {
			drawRect({
				posX: Aurora.placeEntityX(0),
				posY: Aurora.placeEntityY(0),
				width: Aurora.canvas.width,
				height: Aurora.canvas.height,
				lineWidth: 1,
				color: 'rgba(0, 0, 0,' + blackFilterValue +')', // transparant
				isFilled: true,
				isBackground: true,
				id: 'black-filter',
				props: {},
				methodId: id
			});
		}
	}
	Aurora.addMethod(Aurora.methodSetup);
}
function drawLayer1Trees() {
	Aurora.methodSetup = {
		method: function(id) {
			drawImage({
			 	posX: Aurora.placeEntityX(0.90),
			 	posY: Aurora.placeEntityY(0.38, (Aurora.entitySize * -35)),
			 	width: (Aurora.canvas.height * 0.63),
			 	height: (Aurora.canvas.height * 0.63),
			 	images: [treeImg],
			 	selectedImage: 0,
			 	animTicks: 0,
			 	ticks: 0,
			 	id: 'wild-tree-1',
			 	isBackground: false,
			 	props: {},
			 	methodId: id
			 });
		}
	};
	Aurora.addMethod(Aurora.methodSetup);
	Aurora.methodSetup = {
		method: function(id) {
			drawImage({
			 	posX: Aurora.placeEntityX(0.35),
			 	posY: Aurora.placeEntityY(0.38, (Aurora.entitySize * -35)),
			 	width: (Aurora.canvas.height * 0.63),
			 	height: (Aurora.canvas.height * 0.63),
			 	images: [treeImg],
			 	selectedImage: 0,
			 	animTicks: 0,
			 	ticks: 0,
			 	id: 'wild-tree-1',
			 	isBackground: false,
			 	props: {},
			 	methodId: id
			 });
			}
	};
	Aurora.addMethod(Aurora.methodSetup);
	Aurora.methodSetup = {
		method: function(id) {
			drawImage({
			 	posX: Aurora.placeEntityX(-0.15),
			 	posY: Aurora.placeEntityY(0.38, (Aurora.entitySize * -35)),
			 	width: (Aurora.canvas.height * 0.63),
			 	height: (Aurora.canvas.height * 0.63),
			 	images: [treeImg],
			 	selectedImage: 0,
			 	animTicks: 0,
			 	ticks: 0,
			 	id: 'wild-tree-1',
			 	isBackground: false,
			 	props: {},
			 	methodId: id
			 });
			}
	};
	Aurora.addMethod(Aurora.methodSetup);
}
function drawLayer2Trees() {
	Aurora.methodSetup = {
		method: function(id) {
			drawImage({
			 	posX: Aurora.placeEntityX(0.70),
			 	posY: Aurora.placeEntityY(0.28, (Aurora.entitySize * -35)),
			 	width: (Aurora.canvas.height * 0.43),
			 	height: (Aurora.canvas.height * 0.43),
			 	images: [treeImg],
			 	selectedImage: 0,
			 	animTicks: 0,
			 	ticks: 0,
			 	id: 'wild-tree-2',
			 	isBackground: false,
			 	props: {},
			 	methodId: id
			 });
		}
	};
	Aurora.addMethod(Aurora.methodSetup);
	Aurora.methodSetup = {
		method: function(id) {
			drawImage({
			 	posX: Aurora.placeEntityX(0.35),
			 	posY: Aurora.placeEntityY(0.28, (Aurora.entitySize * -35)),
			 	width: (Aurora.canvas.height * 0.43),
			 	height: (Aurora.canvas.height * 0.43),
			 	images: [treeImg],
			 	selectedImage: 0,
			 	animTicks: 0,
			 	ticks: 0,
			 	id: 'wild-tree-2',
			 	isBackground: false,
			 	props: {},
			 	methodId: id
			 });
			}
	};
	Aurora.addMethod(Aurora.methodSetup);
	Aurora.methodSetup = {
		method: function(id) {
			drawImage({
			 	posX: Aurora.placeEntityX(0.0),
			 	posY: Aurora.placeEntityY(0.28, (Aurora.entitySize * -35)),
			 	width: (Aurora.canvas.height * 0.43),
			 	height: (Aurora.canvas.height * 0.43),
			 	images: [treeImg],
			 	selectedImage: 0,
			 	animTicks: 0,
			 	ticks: 0,
			 	id: 'wild-tree-2',
			 	isBackground: false,
			 	props: {},
			 	methodId: id
			 });
			}
	};
	Aurora.addMethod(Aurora.methodSetup);
}
// future Jordan, get the layers looking good
function addNextTrees() {
	// higher layers goes on top
	if (addwildTree2) {
		Aurora.methodSetup = {
			method: function(id) {
				drawImage({
					posX: Aurora.placeEntityX(0.89),
					posY: Aurora.placeEntityY(0.28, (Aurora.entitySize * -35)),
					width: (Aurora.canvas.height * 0.63),
					height: (Aurora.canvas.height * 0.63),
					images: [treeImg],
					selectedImage: 0,
					animTicks: 0,
					ticks: 0,
					id: 'wild-tree-2',
					isBackground: false,
					props: {},
					methodId: id
				 });
			}
		};
		Aurora.addMethod(Aurora.methodSetup);
		addwildTree2 = false;
	}
	if (addWildTree1) {
		Aurora.methodSetup = {
			method: function(id) {
				drawImage({
					posX: Aurora.placeEntityX(0.99),
					posY: Aurora.placeEntityY(0.38, (Aurora.entitySize * -35)),
					width: (Aurora.canvas.height * 0.63),
					height: (Aurora.canvas.height * 0.63),
					images: [treeImg],
					selectedImage: 0,
					animTicks: 0,
					ticks: 0,
					id: 'wild-tree-1',
					isBackground: false,
					props: {},
					methodId: id
				 });
			}
		};
		Aurora.addMethod(Aurora.methodSetup);
		addWildTree1 = false;
	}
}
function wildTree1Check(id) {
	if (!stopMovement) {
		const item = Aurora.methodObjects.filter(x => x.id === id);
		if (item.length > 0) {
			item.forEach(entity => {
				if (entity.posX <= (entity.width * -1)) {
					console.log('removed');
					Aurora.deleteEntity(entity.methodId);
					if (id === 'wild-tree-1') {
						addWildTree1 = true;
					} else if (id === 'wild-tree-2') {
						addwildTree2 = true;
					}
				}
			});
			
		}
	}
}
// *** These methods are more for utility and not cut scene specific ***
function moveEntityLeftRight(id, moveLeft, speed) {
	if (!stopMovement) {
		const item = Aurora.methodObjects.filter(x => x.id === id);
		if (item.length > 0) {
			if (moveLeft) {
				item.forEach(entity => {
					entity.posX -= Aurora.moveEntity((speed), Aurora.enumDirections.leftRight);
				});
			} else {
				item.forEach(entity => {
					entity.posX += Aurora.moveEntity((speed), Aurora.enumDirections.leftRight);
				});
			}
		}
	}
}
function fadeBlackFilter() {
	const fade = setInterval(function() {
		blackFilterValue -= 0.05;
		if (blackFilterValue <= 0) {
			clearInterval(fade);
		}
	}, 100);
}
