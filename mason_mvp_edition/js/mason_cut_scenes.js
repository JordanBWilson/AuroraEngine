let stopMovement = false;
let blackFilterValue = 0.45;

function cutSceneIntro() {
	Aurora.clearStage();
	drawIntroBackground();
	Aurora.methodSetup = { method: function(id) { moveEntityLeftRight('grass-background-pattern', true, 0.025); }};
	Aurora.addMethod(Aurora.methodSetup);
	Aurora.methodSetup = { method: function(id) { moveEntityLeftRight('wild-tree-1', true, 0.025); }};
	Aurora.addMethod(Aurora.methodSetup);
	Aurora.methodSetup = { method: function(id) { wildTree1Check('wild-tree-1'); }};
	Aurora.addMethod(Aurora.methodSetup);
	// future Jordan, this will fade the black filter
	//setTimeout(function() {
		//fadeBlackFilter();
	//}, 5000);
	
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
			 	posY: Aurora.placeEntityY(0.28, (Aurora.entitySize * -35)),
			 	width: (Aurora.canvas.height * 0.53),
			 	height: (Aurora.canvas.height * 0.53),
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
	// future Jordan, figure out why two trees don't work correctly
	//Aurora.methodSetup = {
		//method: function(id) {
			//drawImage({
			 	//posX: Aurora.placeEntityX(0.55),
			 	//posY: Aurora.placeEntityY(0.28, (Aurora.entitySize * -35)),
			 	//width: (Aurora.canvas.height * 0.53),
			 	//height: (Aurora.canvas.height * 0.53),
			 	//images: [treeImg],
			 	//selectedImage: 0,
			 	//animTicks: 0,
			 	//ticks: 0,
			 	//id: 'wild-tree-1',
			 	//isBackground: false,
			 	//props: {},
			 	//methodId: id
			 //});
			//}
	//};
	//Aurora.addMethod(Aurora.methodSetup);
}
function wildTree1Check(id) {
	if (!stopMovement) {
		const item = Aurora.methodObjects.find(x => x.id === id);
		if (item && item.posX < -450) {
			console.log('removed');
			Aurora.deleteEntity(item.methodId);
		}
	}
}
// *** These methods are more for utility and not cut scene specific ***
function moveEntityLeftRight(id, moveLeft, speed) {
	if (!stopMovement) {
		const item = Aurora.methodObjects.find(x => x.id === id);
		if (item) {
			if (moveLeft) {
				item.posX -= Aurora.moveEntity((speed), Aurora.enumDirections.leftRight);
			} else {
				item.posX += Aurora.moveEntity((speed), Aurora.enumDirections.leftRight);
			}
		}
	}
}
function fadeBlackFilter() {
	const fade = setInterval(function() {
		blackFilterValue -= 0.1;
		if (blackFilterValue <= 0) {
			clearInterval(fade);
		}
	}, 200);
}
