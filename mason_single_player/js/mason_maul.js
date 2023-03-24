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

const maulPage = {
	description: 'The multiplayer game',
	loadPage: function() {
		Game.clearStage();
		// future Jordan, work on double tapping towers.
		// one to build/display range and health under and one more tap to bring up a menu to upgrade or switch tower
		// finally the robots will need to be selectable and sendable
		
		const roadImg = new Image();
		const roadPath = './assets/images/brick.png';
		roadImg.src = roadPath;
		Particle.init();
		setupGame();
		
		function setupGame() {
			drawGrassBackGround();
			drawRobotSelection();
			drawBlueRoads();
			drawRedRoads();
			drawBasesAndSends();
			drawBlueTowerSpawns();
			drawRedTowerSpawns();
			drawPlayerMoney();
			drawRoundTime();
			readySetGoGame();
		}
		
		function drawGrassBackGround() {
			const grassImg = new Image();
			const grassPath = './assets/images/grass.png';
			grassImg.src = grassPath;
			
			Game.methodSetup = {
				method: function(id) {
					drawRect({
						posX: Game.placeEntityX(0),
						posY: Game.placeEntityY(0),
						width: Game.canvas.width,
						height: Game.canvas.height,
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
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				method: function(id) {
					drawImagePattern({
						posX: Game.placeEntityX(0),
						posY: Game.placeEntityY(0),
						width: (Game.canvas.width),
						height: (Game.canvas.height),
						patternWidth: (Game.canvas.height * 0.2),
						patternHeight: (Game.canvas.height * 0.2),
						images: [grassImg],
						selectedImage: 0,
						animTicks: 0,
						ticks: 0,
						id: 'grass-background',
						isBackground: true,
						props: {},
						methodId: id
					});
				}
			};
			Game.addMethod(Game.methodSetup);
		}
		
		function drawRobotSelection() {
			Game.methodSetup = {
				method: function(id) {
					drawRect({
						posX: Game.placeEntityX(0),
						posY: Game.placeEntityY(0.90),
						width: Game.canvas.width,
						height: (Game.canvas.height * 0.10),
						lineWidth: 1,
						color: 'brown',
						isFilled: true,
						id: 'robot-bar-background',
						isBackground: true,
						props: {},
						methodId: id
					});
				}
			};
			Game.addMethod(Game.methodSetup);
			let robotCount = 0;
			let robotSelectRow = 1;
			for (let i = 0; i < gameObject.robotArenaDesignCount; i++) {
				robotCount++;
				let posY = 0
				let posYoffset = 0;
				let posX = 0;
				let posXoffset = 0;
				if (robotSelectRow === 1) {
					posY = 0.84;
					posYoffset = -11;
				}
				if (robotCount === 1) {
					posX = 0.11;
					posXoffset = -0.01;
				}
				if (robotCount === 2) {
					posX = 0.43;
					posXoffset = 1.99;
				}
				if (robotCount === 3) {
					posX = 0.739;
					posXoffset = 1;
				}	
					
				Game.methodSetup = {
					method: function(id) {
						drawRect({
							posX: Game.placeEntityX(posX, (Game.entitySize * posXoffset)),
							posY: Game.placeEntityY(posY, (Game.entitySize * posYoffset)),
							width: (Game.canvas.width * 0.15),
							height: (Game.entitySize * 10),
							lineWidth: 1,
							color: 'darkgrey',
							isBackground: false,
							isFilled: true,
							id: 'arena-robot-details-btn',
							props: {},
							methodId: id
						});
					}
				};
				Game.addMethod(Game.methodSetup);
			}
		}
		function drawBasesAndSends() {
			Game.methodSetup = {
				method: function(id) {
					drawRect({
						posX: Game.placeEntityX(0.49, (Game.entitySize * 9)),
						posY: Game.placeEntityY(0.78),
						width: (Game.entitySize * 10),
						height: (Game.entitySize * 10),
						lineWidth: 1,
						color: 'darkblue',
						isFilled: true,
						id: 'blue-base',
						isBackground: false,
						props: {
							hp: 20
						},
						methodId: id
					});
				}
			};
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				method: function(id) {
					drawRect({
						posX: Game.placeEntityX(0.49, (Game.entitySize * 9)),
						posY: Game.placeEntityY(0.03),
						width: (Game.entitySize * 10),
						height: (Game.entitySize * 10),
						lineWidth: 1,
						color: 'darkred',
						isFilled: true,
						id: 'red-base',
						isBackground: false,
						props: {
							hp: 20
						},
						methodId: id
					});
				}
			};
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				method: function(id) {
					drawButton({
						posX: Game.placeEntityX(0.19, (Game.entitySize * 9)),
						posY: Game.placeEntityY(0.78),
						width: (Game.entitySize * 10),
						height: (Game.entitySize * 10),
						lineWidth: 1,
						btnColor: 'grey',
						txtColor: 'white',
						font: '1em serif',
						msg: 'Send',
						isFilled: true,
						id: 'send-robots-left',
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
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				method: function(id) {
					drawButton({
						posX: Game.placeEntityX(0.81, (Game.entitySize * 9)),
						posY: Game.placeEntityY(0.78),
						width: (Game.entitySize * 10),
						height: (Game.entitySize * 10),
						lineWidth: 1,
						btnColor: 'grey',
						txtColor: 'white',
						font: '1em serif',
						msg: 'Send',
						isFilled: true,
						id: 'send-robots-right',
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
			Game.addMethod(Game.methodSetup);
		}
		
		function drawBlueRoads() {
			Game.methodSetup = {
				method: function(id) {
					drawImage({
			 			posX: Game.placeEntityX(0.10, (Game.entitySize * 4.3)),
			 			posY: Game.placeEntityY(0.46),
			 			width: (Game.canvas.width * 0.50),
			 			height: (Game.entitySize * 7),
			 			images: [roadImg],
			 			selectedImage: 0,
			 			animTicks: 0,
			 			ticks: 0,
			 			id: 'blue-left-base-road-1',
			 			isBackground: false,
			 			props: {
			 				
			 			},
			 			methodId: id
			 		});
			 	}
			};
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				method: function(id) {
					drawImage({
			 			posX: Game.placeEntityX(0.48, (Game.entitySize * 5.5)),
			 			posY: Game.placeEntityY(0.46),
			 			width: (Game.canvas.width * 0.50),
			 			height: (Game.entitySize * 7),
			 			images: [roadImg],
			 			selectedImage: 0,
			 			animTicks: 0,
			 			ticks: 0,
			 			id: 'blue-right-base-road-1',
			 			isBackground: false,
			 			props: {
			 				
			 			},
			 			methodId: id
			 		});
			 	}
			};
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				method: function(id) {
					drawImage({
			 			posX: Game.placeEntityX(0.93, (Game.entitySize * 5.5)),
			 			posY: Game.placeEntityY(0.59),
			 			width: (Game.entitySize * 20),
			 			height: (Game.entitySize * 7),
			 			images: [roadImg],
			 			selectedImage: 0,
			 			animTicks: 0,
			 			ticks: 0,
			 			id: 'blue-right-road-spawn',
			 			isBackground: false,
			 			props: {
			 				
			 			},
			 			methodId: id
			 		});
			 	}
			};
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				method: function(id) {
					drawImage({
			 			posX: Game.placeEntityX(0.05, (Game.entitySize * 24)),
			 			posY: Game.placeEntityY(0.59),
			 			width: (Game.entitySize * 20),
			 			height: (Game.entitySize * 7),
			 			images: [roadImg],
			 			selectedImage: 0,
			 			animTicks: 0,
			 			ticks: 0,
			 			id: 'blue-left-road-spawn',
			 			isBackground: false,
			 			props: {
			 				
			 			},
			 			methodId: id
			 		});
			 	}
			};
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				method: function(id) {
					drawImage({
			 			posX: Game.placeEntityX(0.95, (Game.entitySize * 15)),
			 			posY: Game.placeEntityY(0.46),
			 			width: (Game.entitySize * 7),
			 			height: (Game.entitySize * 20),
			 			images: [roadImg],
			 			selectedImage: 0,
			 			animTicks: 0,
			 			ticks: 0,
			 			id: 'blue-right-base-road-2',
			 			isBackground: false,
			 			props: {
			 				
			 			},
			 			methodId: id
			 		});
			 	}
			};
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				method: function(id) {
					drawImage({
			 			posX: Game.placeEntityX(0.09, (Game.entitySize * 3)),
			 			posY: Game.placeEntityY(0.46),
			 			width: (Game.entitySize * 7),
			 			height: (Game.entitySize * 20),
			 			images: [roadImg],
			 			selectedImage: 0,
			 			animTicks: 0,
			 			ticks: 0,
			 			id: 'blue-left-base-road-2',
			 			isBackground: false,
			 			props: {
			 				
			 			},
			 			methodId: id
			 		});
			 	}
			};
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				method: function(id) {
					drawImage({
			 			posX: Game.placeEntityX(0.49, (Game.entitySize * 5.5)),
			 			posY: Game.placeEntityY(0.46),
			 			width: (Game.entitySize * 7),
			 			height: (Game.entitySize * 33),
			 			images: [roadImg],
			 			selectedImage: 0,
			 			animTicks: 0,
			 			ticks: 0,
			 			id: 'blue-base-road',
			 			isBackground: false,
			 			props: {
			 				
			 			},
			 			methodId: id
			 		});
			 	}
			};
			Game.addMethod(Game.methodSetup);
		}
		
		function drawRedRoads() {
			Game.methodSetup = {
				method: function(id) {
					drawImage({
			 			posX: Game.placeEntityX(0.10, (Game.entitySize * 4.3)),
			 			posY: Game.placeEntityY(0.37),
			 			width: (Game.canvas.width * 0.50),
			 			height: (Game.entitySize * 7),
			 			images: [roadImg],
			 			selectedImage: 0,
			 			animTicks: 0,
			 			ticks: 0,
			 			id: 'red-left-base-road-1',
			 			isBackground: false,
			 			props: {
			 				
			 			},
			 			methodId: id
			 		});
			 	}
			};
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				method: function(id) {
					drawImage({
			 			posX: Game.placeEntityX(0.48, (Game.entitySize * 5.5)),
			 			posY: Game.placeEntityY(0.37),
			 			width: (Game.canvas.width * 0.50),
			 			height: (Game.entitySize * 7),
			 			images: [roadImg],
			 			selectedImage: 0,
			 			animTicks: 0,
			 			ticks: 0,
			 			id: 'red-right-base-road-1',
			 			isBackground: false,
			 			props: {
			 				
			 			},
			 			methodId: id
			 		});
			 	}
			};
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				method: function(id) {
					drawImage({
			 			posX: Game.placeEntityX(0.93, (Game.entitySize * 5.5)),
			 			posY: Game.placeEntityY(0.24),
			 			width: (Game.entitySize * 20),
			 			height: (Game.entitySize * 7),
			 			images: [roadImg],
			 			selectedImage: 0,
			 			animTicks: 0,
			 			ticks: 0,
			 			id: 'red-right-road-spawn',
			 			isBackground: false,
			 			props: {
			 				
			 			},
			 			methodId: id
			 		});
			 	}
			};
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				method: function(id) {
					drawImage({
			 			posX: Game.placeEntityX(0.05, (Game.entitySize * 24)),
			 			posY: Game.placeEntityY(0.24),
			 			width: (Game.entitySize * 20),
			 			height: (Game.entitySize * 7),
			 			images: [roadImg],
			 			selectedImage: 0,
			 			animTicks: 0,
			 			ticks: 0,
			 			id: 'red-left-road-spawn',
			 			isBackground: false,
			 			props: {
			 				
			 			},
			 			methodId: id
			 		});
			 	}
			};
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				method: function(id) {
					drawImage({
			 			posX: Game.placeEntityX(0.95, (Game.entitySize * 15)),
			 			posY: Game.placeEntityY(0.24),
			 			width: (Game.entitySize * 7),
			 			height: (Game.entitySize * 20),
			 			images: [roadImg],
			 			selectedImage: 0,
			 			animTicks: 0,
			 			ticks: 0,
			 			id: 'red-right-base-road-2',
			 			isBackground: false,
			 			props: {
			 				
			 			},
			 			methodId: id
			 		});
			 	}
			};
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				method: function(id) {
					drawImage({
			 			posX: Game.placeEntityX(0.09, (Game.entitySize * 3)),
			 			posY: Game.placeEntityY(0.24),
			 			width: (Game.entitySize * 7),
			 			height: (Game.entitySize * 20),
			 			images: [roadImg],
			 			selectedImage: 0,
			 			animTicks: 0,
			 			ticks: 0,
			 			id: 'red-left-base-road-2',
			 			isBackground: false,
			 			props: {
			 				
			 			},
			 			methodId: id
			 		});
			 	}
			};
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				method: function(id) {
					drawImage({
			 			posX: Game.placeEntityX(0.49, (Game.entitySize * 5.5)),
			 			posY: Game.placeEntityY(0.113),
			 			width: (Game.entitySize * 7),
			 			height: (Game.entitySize * 33),
			 			images: [roadImg],
			 			selectedImage: 0,
			 			animTicks: 0,
			 			ticks: 0,
			 			id: 'red-base-road',
			 			isBackground: false,
			 			props: {
			 				
			 			},
			 			methodId: id
			 		});
			 	}
			};
			Game.addMethod(Game.methodSetup);
		}
		function drawBlueTowerSpawns() {
			Game.methodSetup = {
				method: function(id) {
					drawButton({
						posX: Game.placeEntityX(0.11, (Game.entitySize * 9)),
						posY: Game.placeEntityY(0.66),
						width: (Game.entitySize * 6),
						height: (Game.entitySize * 6),
						lineWidth: 1,
						btnColor: 'orange',
						txtColor: 'white',
						font: '0.8em serif',
						msg: 'Tower',
						isFilled: true,
						id: 'blue-right-tower-spawn-1',
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
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				method: function(id) {
					drawButton({
						posX: Game.placeEntityX(0.195, (Game.entitySize * 1)),
						posY: Game.placeEntityY(0.53),
						width: (Game.entitySize * 6),
						height: (Game.entitySize * 6),
						lineWidth: 1,
						btnColor: 'orange',
						txtColor: 'white',
						font: '0.8em serif',
						msg: 'Tower',
						isFilled: true,
						id: 'blue-right-tower-spawn-2',
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
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				method: function(id) {
					drawButton({
						posX: Game.placeEntityX(0.345, (Game.entitySize * 1)),
						posY: Game.placeEntityY(0.53),
						width: (Game.entitySize * 6),
						height: (Game.entitySize * 6),
						lineWidth: 1,
						btnColor: 'orange',
						txtColor: 'white',
						font: '0.8em serif',
						msg: 'Tower',
						isFilled: true,
						id: 'blue-right-tower-spawn-3',
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
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				method: function(id) {
					drawButton({
						posX: Game.placeEntityX(0.49, (Game.entitySize * 17.5)),
						posY: Game.placeEntityY(0.67),
						width: (Game.entitySize * 6),
						height: (Game.entitySize * 6),
						lineWidth: 1,
						btnColor: 'orange',
						txtColor: 'white',
						font: '0.8em serif',
						msg: 'Tower',
						isFilled: true,
						id: 'blue-right-tower-spawn-4',
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
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				method: function(id) {
					drawButton({
						posX: Game.placeEntityX(0.49, (Game.entitySize * -8.5)),
						posY: Game.placeEntityY(0.67),
						width: (Game.entitySize * 6),
						height: (Game.entitySize * 6),
						lineWidth: 1,
						btnColor: 'orange',
						txtColor: 'white',
						font: '0.8em serif',
						msg: 'Tower',
						isFilled: true,
						id: 'blue-right-tower-spawn-5',
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
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				method: function(id) {
					drawButton({
						posX: Game.placeEntityX(0.65, (Game.entitySize * 9.5)),
						posY: Game.placeEntityY(0.53),
						width: (Game.entitySize * 6),
						height: (Game.entitySize * 6),
						lineWidth: 1,
						btnColor: 'orange',
						txtColor: 'white',
						font: '0.8em serif',
						msg: 'Tower',
						isFilled: true,
						id: 'blue-right-tower-spawn-6',
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
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				method: function(id) {
					drawButton({
						posX: Game.placeEntityX(0.85, (Game.entitySize * 15.5)),
						posY: Game.placeEntityY(0.53),
						width: (Game.entitySize * 6),
						height: (Game.entitySize * 6),
						lineWidth: 1,
						btnColor: 'orange',
						txtColor: 'white',
						font: '0.8em serif',
						msg: 'Tower',
						isFilled: true,
						id: 'blue-right-tower-spawn-7',
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
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				method: function(id) {
					drawButton({
						posX: Game.placeEntityX(0.94, (Game.entitySize * 9.6)),
						posY: Game.placeEntityY(0.66),
						width: (Game.entitySize * 6),
						height: (Game.entitySize * 6),
						lineWidth: 1,
						btnColor: 'orange',
						txtColor: 'white',
						font: '0.8em serif',
						msg: 'Tower',
						isFilled: true,
						id: 'blue-right-tower-spawn-8',
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
			Game.addMethod(Game.methodSetup);
		}
		function drawRedTowerSpawns() {
			Game.methodSetup = {
				method: function(id) {
					drawRect({
						posX: Game.placeEntityX(0.11, (Game.entitySize * 9)),
						posY: Game.placeEntityY(0.18),
						width: (Game.entitySize * 6),
						height: (Game.entitySize * 6),
						lineWidth: 1,
						color: 'darkorange',
						isFilled: true,
						id: 'red-tower-spawn-1',
						isBackground: false,
						props: {},
						methodId: id
					});
				}
			};
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				method: function(id) {
					drawRect({
						posX: Game.placeEntityX(0.195, (Game.entitySize * 1)),
						posY: Game.placeEntityY(0.311),
						width: (Game.entitySize * 6),
						height: (Game.entitySize * 6),
						lineWidth: 1,
						color: 'darkorange',
						isFilled: true,
						id: 'red-tower-spawn-2',
						isBackground: false,
						props: {},
						methodId: id
					});
				}
			};
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				method: function(id) {
					drawRect({
						posX: Game.placeEntityX(0.345, (Game.entitySize * 1)),
						posY: Game.placeEntityY(0.311),
						width: (Game.entitySize * 6),
						height: (Game.entitySize * 6),
						lineWidth: 1,
						color: 'darkorange',
						isFilled: true,
						id: 'red-tower-spawn-3',
						isBackground: false,
						props: {},
						methodId: id
					});
				}
			};
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				method: function(id) {
					drawRect({
						posX: Game.placeEntityX(0.49, (Game.entitySize * 17.5)),
						posY: Game.placeEntityY(0.18),
						width: (Game.entitySize * 6),
						height: (Game.entitySize * 6),
						lineWidth: 1,
						color: 'darkorange',
						isFilled: true,
						id: 'red-tower-spawn-4',
						isBackground: false,
						props: {},
						methodId: id
					});
				}
			};
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				method: function(id) {
					drawRect({
						posX: Game.placeEntityX(0.49, (Game.entitySize * -8.5)),
						posY: Game.placeEntityY(0.18),
						width: (Game.entitySize * 6),
						height: (Game.entitySize * 6),
						lineWidth: 1,
						color: 'darkorange',
						isFilled: true,
						id: 'red-tower-spawn-5',
						isBackground: false,
						props: {},
						methodId: id
					});
				}
			};
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				method: function(id) {
					drawRect({
						posX: Game.placeEntityX(0.65, (Game.entitySize * 9.5)),
						posY: Game.placeEntityY(0.311),
						width: (Game.entitySize * 6),
						height: (Game.entitySize * 6),
						lineWidth: 1,
						color: 'darkorange',
						isFilled: true,
						id: 'red-tower-spawn-6',
						isBackground: false,
						props: {},
						methodId: id
					});
				}
			};
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				method: function(id) {
					drawRect({
						posX: Game.placeEntityX(0.85, (Game.entitySize * 15.5)),
						posY: Game.placeEntityY(0.311),
						width: (Game.entitySize * 6),
						height: (Game.entitySize * 6),
						lineWidth: 1,
						color: 'darkorange',
						isFilled: true,
						id: 'red-tower-spawn-7',
						isBackground: false,
						props: {},
						methodId: id
					});
				}
			};
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				method: function(id) {
					drawRect({
						posX: Game.placeEntityX(0.94, (Game.entitySize * 9.6)),
						posY: Game.placeEntityY(0.18),
						width: (Game.entitySize * 6),
						height: (Game.entitySize * 6),
						lineWidth: 1,
						color: 'darkorange',
						isFilled: true,
						id: 'red-tower-spawn-8',
						isBackground: false,
						props: {},
						methodId: id
					});
				}
			};
			Game.addMethod(Game.methodSetup);
		}
		function drawPlayerMoney() {
			Game.methodSetup = {
				method: function(id) {
					drawRect({
						posX: Game.placeEntityX(0.05),
						posY: Game.placeEntityY(0),
						width: (Game.entitySize * 18),
						height: (Game.canvas.height * 0.10),
						lineWidth: 1,
						color: 'brown',
						isFilled: true,
						id: 'money-bar-background',
						isBackground: true,
						props: {},
						methodId: id
					});
				}
			};
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				method: function(id) {
					drawText({
						font: '1em serif',
						msg: 'Money',
						posX: Game.placeEntityX(0.08),
						posY: Game.placeEntityY(0.03),
						color: 'white',
						align: 'left',
						props: {},
						id: 'player-money-title',
						methodId: id
					});
				}
			};
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				method: function(id) {
					drawText({
						font: '1.5em serif',
						msg: '$' + gameObject.arenaBlueGameMoney,
						posX: Game.placeEntityX(0.08),
						posY: Game.placeEntityY(0.07),
						color: 'white',
						align: 'left',
						props: {},
						id: 'player-money-amount-title',
						methodId: id
					});
				}
			};
			Game.addMethod(Game.methodSetup);
		}
		function drawRoundTime() {
			Game.methodSetup = {
				method: function(id) {
					drawRect({
						posX: Game.placeEntityX(0.98, (Game.entitySize * 40.5)),
						posY: Game.placeEntityY(0),
						width: (Game.entitySize * 18),
						height: (Game.canvas.height * 0.10),
						lineWidth: 1,
						color: 'brown',
						isFilled: true,
						id: 'round-bar-background',
						isBackground: true,
						props: {},
						methodId: id
					});
				}
			};
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				method: function(id) {
					drawText({
						font: '1.5em serif',
						msg: gameObject.arenaRoundSeconds + 's',
						posX: Game.placeEntityX(0.98, (Game.entitySize * 38.5)),
						posY: Game.placeEntityY(0.04),
						color: 'white',
						align: 'left',
						props: {},
						id: 'player-round-time-title',
						methodId: id
					});
				}
			};
			Game.addMethod(Game.methodSetup);
			Game.methodSetup = {
				method: function(id) {
					drawText({
						font: '1em serif',
						msg: 'Round: ' + gameObject.arenaGameRound + '/' + gameObject.arenaGameMaxRounds,
						posX: Game.placeEntityX(0.98, (Game.entitySize * 38.5)),
						posY: Game.placeEntityY(0.08),
						color: 'white',
						align: 'left',
						props: {},
						id: 'player-round-number-title',
						methodId: id
					});
				}
			};
			Game.addMethod(Game.methodSetup);
		}
		function readySetGoGame() {
			Game.methodSetup = {
				method: function(id) {
					drawRect({
						posX: Game.placeEntityX(0.50, (Game.entitySize * 40)),
						posY: Game.placeEntityY(0.50, (Game.entitySize * 30)),
						width: (Game.entitySize * 40),
						height: (Game.entitySize * 30),
						lineWidth: 1,
						color: 'lightslategrey',
						isFilled: true,
						id: 'arena-game-ready-background',
						isBackground: false,
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
						msg: 'Battle Stations!',
						posX: Game.placeEntityX(0.50),
						posY: Game.placeEntityY(0.52),
						color: 'white',
						align: 'center',
						props: {},
						id: 'arena-game-ready-title',
						methodId: id
					});
				}
			};
			Game.addMethod(Game.methodSetup);
			setTimeout(function() {
				const gameStartBackground = Game.methodObjects.find(bg => bg.id === 'arena-game-ready-background');
				const gameStartTitle = Game.methodObjects.find(title => title.id === 'arena-game-ready-title');
				if (gameStartTitle) {
					gameStartBackground.isAnim = true;
					gameStartTitle.msg = 'Get Ready';
				}
			}, 2000);
			setTimeout(function() {
				const gameStartBackground = Game.methodObjects.find(bg => bg.id === 'arena-game-ready-background');
				const gameStartTitle = Game.methodObjects.find(title => title.id === 'arena-game-ready-title');
				if (gameStartTitle) {
					gameStartBackground.isAnim = true;
					gameStartTitle.msg = 'Fight!';
				}
			}, 4500);
			setTimeout(function() {
				const gameStartBackground = Game.methodObjects.find(bg => bg.id === 'arena-game-ready-background');
				const gameStartTitle = Game.methodObjects.find(title => title.id === 'arena-game-ready-title');
				Game.deleteEntity(gameStartBackground.methodId);
				Game.deleteEntity(gameStartTitle.methodId);
				// start the game round timer and round numbers
				if (!gameObject.arenaGameStarted) {
					console.log('start');
					startGameRounds();
				}
			}, 5500);
			
		}
		function startGameRounds() {
			gameObject.arenaGameStarted = true;
			const gameTimer = setInterval(function() {
				if (gameObject.arenaRoundSeconds > 0) {
					gameObject.arenaRoundSeconds--;
					drawRoundTime();
				} else if(gameObject.arenaRoundSeconds === 0) {
					// add to the players money
					gameObject.arenaBlueGameMoney += 50;
					gameObject.arenaBlueGameMoney += (gameObject.arenaBlueSendCound * 2);
					gameObject.arenaRedGameMoney += 50;
					gameObject.arenaRedGameMoney += (gameObject.arenaBlueSendCound * 2);
					gameObject.arenaGameRound++;
					gameObject.arenaRoundSeconds = 15;
					drawPlayerMoney();
					// future Jordan, fugure out why the particle effects slow down by round 4
					// perhaps we can update the money directly without reloading the whole thing?
					// perhaps the interval needs to be replaced with something else?
					// try displaying just the particle and see if it still slows down
					Particle.floatingText({
						font: '2rem serif',
						msg: '+      +',
						align: 'left',
						posX: Game.placeEntityX(0.065),
						posY: Game.placeEntityY(0.07),
						direction: 'top',
						color: 'green',
						ticks: 33,
						speed: 0.1,
					});
					if (gameObject.arenaGameRound === 13) {
						// future Jordan, see who won the game
						// show a modal showing the winner
						// go back to the arena page
						clearInterval(gameTimer);
						setTimeout(function() {
							arenaPage.loadPage();
						}, 2000);
						
					}
					
				}
				
			}, 1000);
		}
	}
}
