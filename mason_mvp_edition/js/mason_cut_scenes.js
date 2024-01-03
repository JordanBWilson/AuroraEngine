let stopMovement = false;
let blackFilterValue = 0.3; // 0.87
let addWildTree1 = false;
let addwildTree2 = false;
let addwildTree3 = false;
let addwildTree4 = false;
let sceneScrollSpeed = 0.055;

const cutSceneIntroduction = {
	description: 'The first scene in Mason',
	loadPage: function() {
		function cutSceneIntro() {
			Aurora.keepPreviousSize = true;
			Aurora.clearStage();
			drawIntroBackground();
			// future Jordan, test out the final layer of trees. See how it looks.
			// make sure the black filter is above the tree layers
			// start adding the dialog...
			
			//Aurora.methodSetup = { method: function(id) { moveEntityLeftRight('grass-background-pattern', true, sceneScrollSpeed); }};
			//Aurora.addMethod(Aurora.methodSetup);
			//Aurora.methodSetup = { method: function(id) { moveEntityLeftRight('wild-tree-4', true, sceneScrollSpeed); }};
			//Aurora.addMethod(Aurora.methodSetup);
			//Aurora.methodSetup = { method: function(id) { moveEntityLeftRight('wild-tree-3', true, sceneScrollSpeed); }};
			//Aurora.addMethod(Aurora.methodSetup);
			//Aurora.methodSetup = { method: function(id) { moveEntityLeftRight('wild-tree-2', true, sceneScrollSpeed); }};
			//Aurora.addMethod(Aurora.methodSetup);
			//Aurora.methodSetup = { method: function(id) { moveEntityLeftRight('wild-tree-1', true, sceneScrollSpeed); }};
			//Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = { method: function(id) { wildTreeCheck('wild-tree-4'); }};
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = { method: function(id) { wildTreeCheck('wild-tree-3'); }};
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = { method: function(id) { wildTreeCheck('wild-tree-2'); }};
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = { method: function(id) { wildTreeCheck('wild-tree-1'); }};
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
			Aurora.methodSetup = {
				method: function(id) {
					drawImage({
						posX: Aurora.placeEntityX(0.45),
						posY: Aurora.placeEntityY(0.001),
						width: (Aurora.canvas.height * 0.20),
						height: (Aurora.canvas.height * 0.20),
						images: [cityImg],
						selectedImage: 0,
						animTicks: 0,
						ticks: 0,
						id: 'lost-city',
						isBackground: false,
						props: {},
						methodId: id
					 });
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			drawLayer4Trees();
			drawLayer3Trees();
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
						posX: Aurora.placeEntityX(1.15),
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
						posX: Aurora.placeEntityX(0.65),
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
						posX: Aurora.placeEntityX(0.15),
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
		function drawLayer3Trees() {
			Aurora.methodSetup = {
				method: function(id) {
					drawImage({
						posX: Aurora.placeEntityX(0.87),
						posY: Aurora.placeEntityY(0.15, (Aurora.entitySize * -35)),
						width: (Aurora.canvas.height * 0.23),
						height: (Aurora.canvas.height * 0.23),
						images: [treeImg],
						selectedImage: 0,
						animTicks: 0,
						ticks: 0,
						id: 'wild-tree-3',
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
						posX: Aurora.placeEntityX(0.45),
						posY: Aurora.placeEntityY(0.15, (Aurora.entitySize * -35)),
						width: (Aurora.canvas.height * 0.23),
						height: (Aurora.canvas.height * 0.23),
						images: [treeImg],
						selectedImage: 0,
						animTicks: 0,
						ticks: 0,
						id: 'wild-tree-3',
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
						posX: Aurora.placeEntityX(0.02),
						posY: Aurora.placeEntityY(0.15, (Aurora.entitySize * -35)),
						width: (Aurora.canvas.height * 0.23),
						height: (Aurora.canvas.height * 0.23),
						images: [treeImg],
						selectedImage: 0,
						animTicks: 0,
						ticks: 0,
						id: 'wild-tree-3',
						isBackground: false,
						props: {},
						methodId: id
					 });
					}
			};
			Aurora.addMethod(Aurora.methodSetup);
		}
		function drawLayer4Trees() {
			Aurora.methodSetup = {
				method: function(id) {
					drawImage({
						posX: Aurora.placeEntityX(0.77),
						posY: Aurora.placeEntityY(0.02, (Aurora.entitySize * -35)),
						width: (Aurora.canvas.height * 0.13),
						height: (Aurora.canvas.height * 0.13),
						images: [treeImg],
						selectedImage: 0,
						animTicks: 0,
						ticks: 0,
						id: 'wild-tree-4',
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
						posY: Aurora.placeEntityY(0.02, (Aurora.entitySize * -35)),
						width: (Aurora.canvas.height * 0.13),
						height: (Aurora.canvas.height * 0.13),
						images: [treeImg],
						selectedImage: 0,
						animTicks: 0,
						ticks: 0,
						id: 'wild-tree-4',
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
						posX: Aurora.placeEntityX(-0.03),
						posY: Aurora.placeEntityY(0.02, (Aurora.entitySize * -35)),
						width: (Aurora.canvas.height * 0.13),
						height: (Aurora.canvas.height * 0.13),
						images: [treeImg],
						selectedImage: 0,
						animTicks: 0,
						ticks: 0,
						id: 'wild-tree-4',
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
			if (addwildTree4) {
				Aurora.methodSetup = {
					method: function(id) {
						drawImage({
							posX: Aurora.placeEntityX(1.85),
							posY: Aurora.placeEntityY(0.15, (Aurora.entitySize * -35)),
							width: (Aurora.canvas.height * 0.23),
							height: (Aurora.canvas.height * 0.23),
							images: [treeImg],
							selectedImage: 0,
							animTicks: 0,
							ticks: 0,
							id: 'wild-tree-4',
							isBackground: false,
							props: {},
							methodId: id
						 });
					}
				};
				Aurora.addMethod(Aurora.methodSetup);
				addwildTree4 = false;
			}
			if (addwildTree3) {
				Aurora.methodSetup = {
					method: function(id) {
						drawImage({
							posX: Aurora.placeEntityX(1.55),
							posY: Aurora.placeEntityY(0.15, (Aurora.entitySize * -35)),
							width: (Aurora.canvas.height * 0.23),
							height: (Aurora.canvas.height * 0.23),
							images: [treeImg],
							selectedImage: 0,
							animTicks: 0,
							ticks: 0,
							id: 'wild-tree-3',
							isBackground: false,
							props: {},
							methodId: id
						 });
					}
				};
				Aurora.addMethod(Aurora.methodSetup);
				addwildTree3 = false;
			}
			if (addwildTree2) {
				Aurora.methodSetup = {
					method: function(id) {
						drawImage({
							posX: Aurora.placeEntityX(1.25),
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
				addwildTree2 = false;
			}
			if (addWildTree1) {
				Aurora.methodSetup = {
					method: function(id) {
						drawImage({
							posX: Aurora.placeEntityX(0.95),
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
		function wildTreeCheck(id) {
			if (!stopMovement) {
				const item = Aurora.methodObjects.filter(x => x.id === id);
				if (item.length > 0) {
					item.forEach(entity => {
						if (entity.posX <= (entity.width * -1)) {
							console.log('removed');
							Aurora.deleteEntity(entity.methodId);
							if (id === 'wild-tree-1') {
								addWildTree1 = true;
							} 
							if (id === 'wild-tree-2') {
								addwildTree2 = true;
							}
							if (id === 'wild-tree-3') {
								addwildTree3 = true;
							}
							if (id === 'wild-tree-4') {
								addwildTree4 = true;
							}
						}
					});
					
				}
			}
		}
		cutSceneIntro();
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
