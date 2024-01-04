let blackFilterValue = 1; // 0.87
let stopMovement = false;


const cutSceneIntroduction = {
	description: 'The first scene in Mason',
	loadPage: function() {
		let addWildTree1 = false;
		let addwildTree2 = false;
		let addwildTree3 = false;
		let addwildTree4 = false;
		let sceneScrollSpeed = 0.055;
		let isLostCityMoving = false;
		let whiteTextTransition = 0;
		
		function cutSceneIntro() {
			Aurora.keepPreviousSize = true;
			stopMovement = true;
			Aurora.clearStage();
			drawIntroBackground();
			// future Jordan, test out the final layer of trees. See how it looks.
			// make sure the black filter is above the tree layers
			// start adding the dialog...
			
			Aurora.methodSetup = { method: function(id) { moveEntityLeftRight('grass-background-pattern', true, sceneScrollSpeed, undefined); }};
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = { method: function(id) { moveEntityLeftRight('wild-tree-4', true, sceneScrollSpeed, undefined); }};
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = { method: function(id) { moveEntityLeftRight('wild-tree-3', true, sceneScrollSpeed, undefined); }};
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = { method: function(id) { moveEntityLeftRight('wild-tree-2', true, sceneScrollSpeed, undefined); }};
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = { method: function(id) { moveEntityLeftRight('wild-tree-1', true, sceneScrollSpeed, undefined); }};
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = { method: function(id) { moveLostCity('lost-city', true, sceneScrollSpeed); }};
			Aurora.addMethod(Aurora.methodSetup);
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
			//setTimeout(function() {
				//fadeBlackFilterComplete();
			//}, 5000);
			// future Jordan, continue with the transitions
			setTimeout(function() {
				dialog1();
			}, 1500);
			
			
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
						posX: Aurora.placeEntityX(1.00), // 0.45
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
						color: 'rgba(0, 0, 0,' + blackFilterValue +')',
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
						posY: Aurora.placeEntityY(0.10, (Aurora.entitySize * -35)),
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
						posY: Aurora.placeEntityY(0.10, (Aurora.entitySize * -35)),
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
						posY: Aurora.placeEntityY(0.10, (Aurora.entitySize * -35)),
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
		// future Jordan, make sure the lost city moves correctly
		function moveLostCity(id, moveLeft, speed) {
			if (isLostCityMoving) {
				const item = Aurora.methodObjects.filter(x => x.id === id);
				if (item[0].posX >= Aurora.placeEntityX(0.45)) {
					moveEntityLeftRight(id, moveLeft, speed, item);
				}
			}
		}
		function creatorTextTransition() {
			let fadeIn = true;
			const whiteTransitions = setInterval(function() {
				const title = Aurora.methodObjects.find(x => x.id === 'creator-title');
				if (whiteTextTransition <= 1 && fadeIn) {
					whiteTextTransition += 0.05;
					if (title) {
						Aurora.deleteEntity(title.methodId);
						displayCreator();
					}
				} else if (whiteTextTransition >= 1 && fadeIn) {
					setTimeout(function() {
						fadeIn = false;
					}, 2500);
				} else if (!fadeIn) {
					whiteTextTransition -= 0.05;
					if (title) {
						Aurora.deleteEntity(title.methodId);
						displayCreator();
					}
					if (whiteTextTransition <= 0) {
						clearInterval(whiteTransitions);
						setTimeout(function() {
							dialog2();
						}, 500);
						
					}
				}
			}, 100);
			displayCreator();
		}
		function displayCreator() {
			Aurora.methodSetup = {
				method: function(id) {
					drawText({
						font: '2.1em serif',
						msg: 'JDubs Presents...',
						posX: Aurora.placeEntityX(0.525),
						posY: Aurora.placeEntityY(0.45),
						color: 'rgba(255, 255, 255,' + whiteTextTransition +')',
						align: 'center',
						props: {},
						id: 'creator-title',
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
		}
		function dialog1() {
			let msgs = ["I don't know how we didn't see", 'this coming.', '- Tap here to continue -'];
			Aurora.methodSetup = {
				layer: 1,
				method: function(id) {
					drawDialogueModal({
						posX: Aurora.placeEntityX(0.465, (Aurora.entitySize * 40)),
						posY: Aurora.placeEntityY(0.80, (Aurora.entitySize * 30)),
						width: (Aurora.entitySize * 45),
						height: (Aurora.entitySize * 18),
						lineWidth: 1,
						modalColor: 'grey',
						msgColor: 'white',
						msgFont: '1em serif',
						msgs: msgs,
						msgStart: Aurora.placeEntityY(0.85, (Aurora.entitySize * 30)),
						msgDistance: (Aurora.entitySize * 5),
						bgColor: '',
						isModalFilled: true,
						id: Aurora.modalId,
						layer: 1,
						action: {
							method: function(id) {
								// consider making this method part of the api
								removeModal(); // this method comes from the tutorial
								setTimeout(function() {
									creatorTextTransition();
								}, 500);
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
		function dialog2() {
			let msgs = ['We ignored the warnings.', 'We let history repeat itself.', '- Tap here to continue -'];
			Aurora.methodSetup = {
				layer: 1,
				method: function(id) {
					drawDialogueModal({
						posX: Aurora.placeEntityX(0.465, (Aurora.entitySize * 40)),
						posY: Aurora.placeEntityY(0.80, (Aurora.entitySize * 30)),
						width: (Aurora.entitySize * 45),
						height: (Aurora.entitySize * 18),
						lineWidth: 1,
						modalColor: 'grey',
						msgColor: 'white',
						msgFont: '1em serif',
						msgs: msgs,
						msgStart: Aurora.placeEntityY(0.85, (Aurora.entitySize * 30)),
						msgDistance: (Aurora.entitySize * 5),
						bgColor: '',
						isModalFilled: true,
						id: Aurora.modalId,
						layer: 1,
						action: {
							method: function(id) {
								// consider making this method part of the api
								removeModal(); // this method comes from the tutorial
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
		cutSceneIntro();
	}
}
// *** These methods are more for utility and not cut scene specific ***
function moveEntityLeftRight(id, moveLeft, speed, entities) {
	if (!stopMovement) {
		let item = [];
		if (!entities) {
			item = Aurora.methodObjects.filter(x => x.id === id);
		} else {
			item = entities
		}
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
function fadeBlackFilterComplete() {
	const fade = setInterval(function() {
		blackFilterValue -= 0.05;
		if (blackFilterValue <= 0) {
			clearInterval(fade);
		}
	}, 100);
}
function fadeBlackFilterToValue(value) {
	const fade = setInterval(function() {
		blackFilterValue -= 0.05;
		if (blackFilterValue <= value) {
			clearInterval(fade);
		}
	}, 100);
}
//function removeModal() {
	//const modal = Aurora.methodObjects.find(build => build.id === Aurora.modalId);
	//if (modal) {
		//Aurora.deleteEntity(modal.methodId);
	//}
//}
