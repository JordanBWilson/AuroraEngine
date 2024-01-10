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

const maulPage = {
	description: 'The multiplayer game',
	loadPage: function() {
		gameObject.selectedRobot = [];
		Aurora.keepPreviousSize = true;
		Aurora.clearStage();
		let selectBuildTowerIndex = 0;
		let selectedSpellBtn = undefined;
		const baseRobotAttack = 3;
		const baseTowerAttack = 3;
		const upgradeTowerStats = {
			att: 2,
			def: 2,
			hp: 5,
			spd: 2,
			splash: 0,
			lvl: 1,
			arenaLvlToUpgrade: 3,
		};
		const spellTimeOut = {
			wall: 5,
			emp: 8,
		};
		const robotMoneyGained = {
			leeRoy: 3,
			tank: 5,
		};
		const spellWallCollisions = {
			teamBlueIds: [],
			teamRedIds: [],
		}
		let redAIThinkTimer = 800;
		if (gameObject.gamesWon === 0) {
			redAIThinkTimer = 2500;
		} else if (gameObject.gamesWon === 1) {
			redAIThinkTimer = 1300;
		}
		const tutorialGames = 2;
		let aiThinking = true;
		let gameTimer;
		Particle.init();
		setupGame();
		Aurora.pageResized = {
			section: 'arena-game',
			method: function() {
				if (gameObject.selectedRobotDesign !== -1) {
					selectArenaRobot(gameObject.selectedRobotDesign);
				}
			}
		}
		// future Jordan, it's time to work on the tutorial
		function setupGame() {
			gameObject.arenaGameStarted = true; // testing here
			//generateRedArenaRobots(); // testing here
			//generateRedArenaTowers(); // testing here
			drawGrassBackGround();
			drawRobotSelection(); // testing here
			drawBlueRoads();
			drawRedRoads();
			drawBasesAndSends();
			drawBlueTowerSpawns();
			drawRedTowerSpawns();
			drawBlueRobotRoadNavigation();
			drawRedRobotRoadNavigation();
			drawPlayerMoney();
			drawRoundTime();
			// readySetGoGame();
			//setTimeout(function() { // testing here
				//startGameRounds();
			//}, 150);
			
			// testing here as well
			//Aurora.methodSetup = { method: function(id) { moveBlueRobots(); }};
			//Aurora.addMethod(Aurora.methodSetup);
			//Aurora.methodSetup = { method: function(id) { moveRedRobots(); }};
			//Aurora.addMethod(Aurora.methodSetup);
			//Aurora.methodSetup = { method: function(id) { towerBulletFindRobot('blue'); }};
			//Aurora.addMethod(Aurora.methodSetup);
			//Aurora.methodSetup = { method: function(id) { towerBulletFindRobot('red'); }};
			//Aurora.addMethod(Aurora.methodSetup);
			//Aurora.methodSetup = {
				//method: function(id) {
					//if (aiThinking === true) {
						//redAiMind(); 
					//}
					//if (aiThinking === false) {
						//aiThinking = undefined;
						//setTimeout(function() { // this is how fast the ai makes it's moves
							//aiThinking = true;
						//}, redAIThinkTimer); // 1300
					//}
				//}
			//};
			//Aurora.addMethod(Aurora.methodSetup);
			if (gameObject.gamesWon > tutorialGames) { // give the player a few 'easy' games
				gameObject.redMaxTowerLevel = Math.floor((Math.random() * 5) + 1);
			} else {
				gameObject.redMaxTowerLevel = 1;
			}
			
			gameObject.gamesPlayed += 1;
		}
		function setBlueRightRoadNavCollisions() {
			Aurora.collisionSetup = {
				primary: 'arena-blue-att-robot-right-' + gameObject.arenaBlueSendCount,
				target: 'blue-right-stop-1',
				method: function(id) {
					const robot = Aurora.methodObjects.find(bg => bg.id === this.primary);
					const robotPasser = gameObject.arenaBlueAttackers.find(bg => bg.id === this.primary); 
					if (robotPasser?.stop === 0) { // moving down the road now
						robotPasser.stop++;
					}
				},
				methodId: undefined,
			}
			Aurora.addCollision(Aurora.collisionSetup);
			Aurora.collisionSetup = {
				primary: 'arena-blue-att-robot-right-' + gameObject.arenaBlueSendCount,
				target: 'blue-right-stop-2',
				method: function(id) {
					const robot = Aurora.methodObjects.find(bg => bg.id === this.primary);
					const robotPasser = gameObject.arenaBlueAttackers.find(bg => bg.id === this.primary); 
					if (robotPasser?.stop === 1) { // moving left on the road
						robotPasser.stop++;
					}
				},
				methodId: undefined,
			}
			Aurora.addCollision(Aurora.collisionSetup);
			Aurora.collisionSetup = {
				primary: 'arena-blue-att-robot-right-' + gameObject.arenaBlueSendCount,
				target: 'blue-stop-3',
				method: function(id) {
					const robot = Aurora.methodObjects.find(bg => bg.id === this.primary);
					const robotPasser = gameObject.arenaBlueAttackers.find(bg => bg.id === this.primary); 
					if (robotPasser?.stop === 2) { // moving up the road
						robotPasser.stop++;
					}
				},
				methodId: undefined,
			}
			Aurora.addCollision(Aurora.collisionSetup);
			Aurora.collisionSetup = {
				primary: 'arena-blue-att-robot-right-' + gameObject.arenaBlueSendCount,
				target: 'red-base',
				method: function(id) {
					const robot = Aurora.methodObjects.find(bg => bg.id === this.primary);
					const robotPasser = gameObject.arenaBlueAttackers.find(bg => bg.id === this.primary); 
					if (robotPasser?.stop === 3) { // attack the red base
						robotPasser.stop++;
					}
				},
				methodId: undefined,
			}
			Aurora.addCollision(Aurora.collisionSetup);
		}
		function setRedRightRoadNavCollisions() {
			Aurora.collisionSetup = {
				primary: 'arena-red-att-robot-right-' + gameObject.arenaRedSendCount,
				target: 'red-right-stop-1',
				method: function(id) {
					const robot = Aurora.methodObjects.find(bg => bg.id === this.primary);
					const robotPasser = gameObject.arenaRedAttackers.find(bg => bg.id === this.primary); 
					if (robotPasser?.stop === 0) { // moving down the road now
						robotPasser.stop++;
					}
				},
				methodId: undefined,
			}
			Aurora.addCollision(Aurora.collisionSetup);
			Aurora.collisionSetup = {
				primary: 'arena-red-att-robot-right-' + gameObject.arenaRedSendCount,
				target: 'red-right-stop-2',
				method: function(id) {
					const robot = Aurora.methodObjects.find(bg => bg.id === this.primary);
					const robotPasser = gameObject.arenaRedAttackers.find(bg => bg.id === this.primary); 
					if (robotPasser?.stop === 1) { // moving left on the road
						robotPasser.stop++;
					}
				},
				methodId: undefined,
			}
			Aurora.addCollision(Aurora.collisionSetup);
			Aurora.collisionSetup = {
				primary: 'arena-red-att-robot-right-' + gameObject.arenaRedSendCount,
				target: 'red-stop-3',
				method: function(id) {
					const robot = Aurora.methodObjects.find(bg => bg.id === this.primary);
					const robotPasser = gameObject.arenaRedAttackers.find(bg => bg.id === this.primary); 
					if (robotPasser?.stop === 2) { // moving up the road
						robotPasser.stop++;
					}
				},
				methodId: undefined,
			}
			Aurora.addCollision(Aurora.collisionSetup);
			Aurora.collisionSetup = {
				primary: 'arena-red-att-robot-right-' + gameObject.arenaRedSendCount,
				target: 'blue-base',
				method: function(id) {
					const robot = Aurora.methodObjects.find(bg => bg.id === this.primary);
					const robotPasser = gameObject.arenaRedAttackers.find(bg => bg.id === this.primary); 
					if (robotPasser?.stop === 3) { // attack the blue base
						robotPasser.stop++;
					}
				},
				methodId: undefined,
			}
			Aurora.addCollision(Aurora.collisionSetup);
		}
		function setBlueLeftRoadNavCollisions() {
			Aurora.collisionSetup = {
				primary: 'arena-blue-att-robot-left-' + gameObject.arenaBlueSendCount,
				target: 'blue-left-stop-1',
				method: function(id) {
					const robot = Aurora.methodObjects.find(bg => bg.id === this.primary);
					const robotPasser = gameObject.arenaBlueAttackers.find(bg => bg.id === this.primary); 
					if (robotPasser?.stop === 0) { // moving down the road now
						robotPasser.stop++;
					}
				},
				methodId: undefined,
			}
			Aurora.addCollision(Aurora.collisionSetup);
			Aurora.collisionSetup = {
				primary: 'arena-blue-att-robot-left-' + gameObject.arenaBlueSendCount,
				target: 'blue-left-stop-2',
				method: function(id) {
					const robot = Aurora.methodObjects.find(bg => bg.id === this.primary);
					const robotPasser = gameObject.arenaBlueAttackers.find(bg => bg.id === this.primary); 
					if (robotPasser?.stop === 1) { // moving right on the road
						robotPasser.stop++;
					}
				},
				methodId: undefined,
			}
			Aurora.addCollision(Aurora.collisionSetup);
			Aurora.collisionSetup = {
				primary: 'arena-blue-att-robot-left-' + gameObject.arenaBlueSendCount,
				target: 'blue-stop-3',
				method: function(id) {
					const robot = Aurora.methodObjects.find(bg => bg.id === this.primary);
					const robotPasser = gameObject.arenaBlueAttackers.find(bg => bg.id === this.primary); 
					if (robotPasser?.stop === 2) { // moving up the road
						robotPasser.stop++;
					}
				},
				methodId: undefined,
			}
			Aurora.addCollision(Aurora.collisionSetup);
			Aurora.collisionSetup = {
				primary: 'arena-blue-att-robot-left-' + gameObject.arenaBlueSendCount,
				target: 'red-base',
				method: function(id) {
					const robot = Aurora.methodObjects.find(bg => bg.id === this.primary);
					const robotPasser = gameObject.arenaBlueAttackers.find(bg => bg.id === this.primary); 
					if (robotPasser?.stop === 3) { // attack the red base
						robotPasser.stop++;
					}
				},
				methodId: undefined,
			}
			Aurora.addCollision(Aurora.collisionSetup);
		}
		function towerBulletFindRobot(teamColor) {
			const bullets = Aurora.methodObjects.filter(x => x.id === teamColor + '-tower-bullet');
			if (bullets.length > 0) {
				bullets.forEach((bullet, i) => {
					if (bullet) {
						const robot = Aurora.methodObjects.find(x => x.id === bullet.props.target);
						if (robot) {
							// check the left and right of the bullet first
							if (bullet.posX >= robot.posX) {
								bullet.posX -= Aurora.moveEntity(0.3, Aurora.enumDirections.leftRight);
								if (bullet.posY >= robot.posY) {
									bullet.posY -= Aurora.moveEntity(0.3, Aurora.enumDirections.topDown);
								}
								if (bullet.posY <= robot.posY) {
									bullet.posY += Aurora.moveEntity(0.3, Aurora.enumDirections.topDown);
								}
							}
							if (bullet.posX <= robot.posX) {
								bullet.posX += Aurora.moveEntity(0.3, Aurora.enumDirections.leftRight);
								if (bullet.posY >= robot.posY) {
									bullet.posY -= Aurora.moveEntity(0.3, Aurora.enumDirections.topDown);
								}
								if (bullet.posY <= robot.posY) {
									bullet.posY += Aurora.moveEntity(0.3, Aurora.enumDirections.topDown);
								}
							}
							// check above and below the bullet next
							if (bullet.posY >= robot.posY) {
								bullet.posY -= Aurora.moveEntity(0.3, Aurora.enumDirections.topDown);
								if (bullet.posX >= robot.posX) {
									bullet.posX -= Aurora.moveEntity(0.3, Aurora.enumDirections.leftRight);
								}
								if (bullet.posX <= robot.posX) {
									bullet.posX += Aurora.moveEntity(0.3, Aurora.enumDirections.leftRight);
								}
							}
							if (bullet.posY <= robot.posY) {
								bullet.posY += Aurora.moveEntity(0.3, Aurora.enumDirections.topDown);
								if (bullet.posX >= robot.posX) {
									bullet.posX -= Aurora.moveEntity(0.3, Aurora.enumDirections.leftRight);
								}
								if (bullet.posX <= robot.posX) {
									bullet.posX += Aurora.moveEntity(0.3, Aurora.enumDirections.leftRight);
								}
							}
						} else {
							// if the robot doesn't exist anymore, remove the bullet
							Aurora.deleteEntity(bullet.methodId);
						}
					}
				});
			}
		}
		function blueTowerShootRobot(towerStats, primaryId) {
			Aurora.methodSetup = {
				method: function(id) {
					drawRect({
						posX: towerStats.posX + (towerStats.width / 2),
						posY: towerStats.posY,
						width: Aurora.entitySize * 1,
						height: Aurora.entitySize * 1,
						lineWidth: 1,
						color: 'gold',
						isFilled: true,
						id: 'blue-tower-bullet',
						isBackground: false,
						props: {
							target: primaryId,
							tower: towerStats.id,
						},
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
		}
		function redTowerShootRobot(towerStats, primaryId) {
			Aurora.methodSetup = {
				method: function(id) {
					drawRect({
						posX: towerStats.posX + (towerStats.width / 2),
						posY: towerStats.posY,
						width: Aurora.entitySize * 1,
						height: Aurora.entitySize * 1,
						lineWidth: 1,
						color: 'gold',
						isFilled: true,
						id: 'red-tower-bullet',
						isBackground: false,
						props: {
							target: primaryId,
							tower: towerStats.id,
						},
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
		}
		function robotTankAttackTower(primary, target, robotPasser, towerStats, teamColor) {
			if (robotPasser.attackTower && robotPasser.towerTargePosX === undefined && robotPasser.towerTargePosY === undefined) {
				robotPasser.towerTargePosX = towerStats.posX;
				robotPasser.towerTargePosY = towerStats.posY;
				Aurora.collisionSetup = {
					primary: robotPasser.id, 
					target: target,
					method: function(id) {
						robotPasser.towerHitCount++;
						if (robotPasser.towerHitCount === 1) {
							if (gameObject.gameSounds) {
								towerExplosionSound.cloneNode(true).play();
							}
							Aurora.removeCollision(robotPasser.id, target);
							robotPasser.attackTower = false;
							robotPasser.towerTargePosX = undefined;
							robotPasser.towerTargePosY = undefined;
							Particle.drawSpark({
								posX: towerStats.posX,
								posY: towerStats.posY,
								shape: Particle.enumShapes.rect,
								color: 'yellow',
								ticks: 11,
								count: 8,
								size: (Aurora.entitySize),
								speed: 1.3,
							});
							const robotAttack = baseRobotAttack + robotPasser.totalStats.att;
							towerStats.props.stats.hp -= robotAttack;
							towerStats.msg = 'HP: ' + towerStats.props.stats.hp;
							const towerAttack = baseTowerAttack + towerStats.props.stats.att;
							robotPasser.hp -= towerAttack;
							if (towerStats.props.stats.hp <= 0) {
								towerStats.font = '0.8em serif';
								if (teamColor === 'blue') {
									towerStats.btnColor = 'orange';
									towerStats.msg = 'Build';
								} else if (teamColor === 'red') {
									towerStats.btnColor = 'darkorange';
									towerStats.msg = '';
								}
								if (towerStats.props.towerId === 1) {
									towerStats.props.requires.arenaLvlToUpgrade = 5;
									towerStats.props.towerId = 0;
								}
								towerStats.props.stats.att = 0;
								towerStats.props.stats.def = 0;
								towerStats.props.stats.hp = 0;
								towerStats.props.stats.lvl = 0;
								towerStats.props.stats.spd = 0;
								towerStats.props.stats.splash = 0;
								const robotHitMethodObject = Aurora.methodObjects.filter(bg => bg.id === primary);
								deleteRobotMethodObject(robotHitMethodObject, 1);
								if (teamColor === 'blue') {
									Particle.floatingText({
										font: '1rem serif',
										msg: '+' + robotMoneyGained.tank,
										align: 'center',
										posX: robotPasser.posX,
										posY: robotPasser.posY,
										direction: 'top',
										color: 'gold',
										ticks: 33,
										speed: 0.1,
									});
								}
								if (teamColor === 'blue') {
									gameObject.arenaBlueGameMoney += robotMoneyGained.tank;
								} else if (teamColor === 'red') {
									gameObject.arenaRedGameMoney += robotMoneyGained.tank;
								}			
							}
						}
					},
					methodId: undefined,
				}
				Aurora.addCollision(Aurora.collisionSetup);
			}
		}
		function towerTargetRange(primary, target, teamColor) {
			if (gameObject.arenaGameStarted) {
				let shootSpeed;
				const tower = Aurora.methodObjects.find(x => x.id === target);
				const towerStats = Aurora.methodObjects.find(x => x.id === tower.props.towerId);
				const robot = Aurora.methodObjects.find(bg => bg.id === primary);
				let robotPasser;
				const robotFinder = gameObject.arenaRedAttackers.find(bg => bg.id === primary);
				if (robotFinder) {
					robotPasser = robotFinder;
				} else {
					robotPasser = gameObject.arenaBlueAttackers.find(bg => bg.id === primary);
				}
				if (tower.props.targetId === '' && tower.props.canShoot) {
					tower.props.targetId = primary;
					tower.props.canShoot = false;
				}
				if (!tower.props.canShoot && tower.props.targetId) {
					tower.props.targetId = '';
					if (towerStats.props.towerId > 0) {
						if (gameObject.gameSounds) {
							towerShootSound.cloneNode(true).play();
						}
						if (teamColor === 'blue') {
							robotTankAttackTower(primary, target, robotPasser, towerStats, teamColor);
							blueTowerShootRobot(towerStats, primary);
						} else if (teamColor === 'red') {
							robotTankAttackTower(primary, target, robotPasser, towerStats, teamColor);
							redTowerShootRobot(towerStats, primary);
						}
					}
					let towerShootSPeed = 2000 - (towerStats.props.stats.spd * 100);
					if (towerShootSPeed <= 50) {
						towerShootSPeed = 50;
					}
					shootSpeed = setTimeout(function() {
						tower.props.canShoot = true;
					}, towerShootSPeed);
				}
			}
		}
		function getRedSpellPosition(primaryId) {
			const blueBot = gameObject.arenaBlueAttackers.find(x => x.id === primaryId);
			if (blueBot) {
				gameObject.redSpellTarget = {
					tappedX: blueBot.posX,
					tappedY: blueBot.posY
				};
			}
		}
		function setBlueRightTowerRangeCollisions(robotId) {
			Aurora.collisionSetup = {
				primary: robotId, 
				target: 'blue-tower-range-5', 
				method: function(id) {
					towerTargetRange(this.primary, this.target, 'blue');
				},
				methodId: undefined,
			}
			Aurora.addCollision(Aurora.collisionSetup);
			Aurora.collisionSetup = {
				primary: robotId, 
				target: 'blue-tower-range-6', 
				method: function(id) {
					towerTargetRange(this.primary, this.target, 'blue');
				},
				methodId: undefined,
			}
			Aurora.addCollision(Aurora.collisionSetup);
			Aurora.collisionSetup = {
				primary: robotId, 
				target: 'blue-tower-range-7', 
				method: function(id) {
					towerTargetRange(this.primary, this.target, 'blue');
				},
				methodId: undefined,
			}
			Aurora.addCollision(Aurora.collisionSetup);
			Aurora.collisionSetup = {
				primary: robotId, 
				target: 'blue-tower-range-8', 
				method: function(id) {
					towerTargetRange(this.primary, this.target, 'blue');
				},
				methodId: undefined,
			}
			Aurora.addCollision(Aurora.collisionSetup);
		}
		function setRedRightTowerRangeCollisions(robotId) {
			Aurora.collisionSetup = {
				primary: robotId, 
				target: 'red-tower-range-5', 
				method: function(targetMethodId, primaryId) {
					getRedSpellPosition(primaryId);
					towerTargetRange(this.primary, this.target, 'red');
				},
				methodId: undefined,
			}
			Aurora.addCollision(Aurora.collisionSetup);
			Aurora.collisionSetup = {
				primary: robotId, 
				target: 'red-tower-range-6', 
				method: function(targetMethodId, primaryId) {
					getRedSpellPosition(primaryId);
					towerTargetRange(this.primary, this.target, 'red');
				},
				methodId: undefined,
			}
			Aurora.addCollision(Aurora.collisionSetup);
			Aurora.collisionSetup = {
				primary: robotId, 
				target: 'red-tower-range-7', 
				method: function(targetMethodId, primaryId) {
					getRedSpellPosition(primaryId);
					towerTargetRange(this.primary, this.target, 'red');
				},
				methodId: undefined,
			}
			Aurora.addCollision(Aurora.collisionSetup);
			Aurora.collisionSetup = {
				primary: robotId, 
				target: 'red-tower-range-8', 
				method: function(targetMethodId, primaryId) {
					getRedSpellPosition(primaryId);
					towerTargetRange(this.primary, this.target, 'red');
				},
				methodId: undefined,
			}
			Aurora.addCollision(Aurora.collisionSetup);
		}
		function setBlueLeftTowerRangeCollisions(robotId) {
			Aurora.collisionSetup = {
				primary: robotId, 
				target: 'blue-tower-range-1', 
				method: function(id) {
					towerTargetRange(this.primary, this.target, 'blue');
				},
				methodId: undefined,
			}
			Aurora.addCollision(Aurora.collisionSetup);
			Aurora.collisionSetup = {
				primary: robotId, 
				target: 'blue-tower-range-2', 
				method: function(id) {
					towerTargetRange(this.primary, this.target, 'blue');
				},
				methodId: undefined,
			}
			Aurora.addCollision(Aurora.collisionSetup);
			Aurora.collisionSetup = {
				primary: robotId, 
				target: 'blue-tower-range-3', 
				method: function(id) {
					towerTargetRange(this.primary, this.target, 'blue');
				},
				methodId: undefined,
			}
			Aurora.addCollision(Aurora.collisionSetup);
			Aurora.collisionSetup = {
				primary: robotId, 
				target: 'blue-tower-range-4', 
				method: function(id) {
					towerTargetRange(this.primary, this.target, 'blue');
				},
				methodId: undefined,
			}
			Aurora.addCollision(Aurora.collisionSetup);
		}
		function setRedLeftTowerRangeCollisions(robotId) {
			Aurora.collisionSetup = {
				primary: robotId, 
				target: 'red-tower-range-1', 
				method: function(targetMethodId, primaryId) {
					getRedSpellPosition(primaryId);
					towerTargetRange(this.primary, this.target, 'red');
				},
				methodId: undefined,
			}
			Aurora.addCollision(Aurora.collisionSetup);
			Aurora.collisionSetup = {
				primary: robotId, 
				target: 'red-tower-range-2', 
				method: function(targetMethodId, primaryId) {
					getRedSpellPosition(primaryId);
					towerTargetRange(this.primary, this.target, 'red');
				},
				methodId: undefined,
			}
			Aurora.addCollision(Aurora.collisionSetup);
			Aurora.collisionSetup = {
				primary: robotId, 
				target: 'red-tower-range-3', 
				method: function(targetMethodId, primaryId) {
					getRedSpellPosition(primaryId);
					towerTargetRange(this.primary, this.target, 'red');
				},
				methodId: undefined,
			}
			Aurora.addCollision(Aurora.collisionSetup);
			Aurora.collisionSetup = {
				primary: robotId, 
				target: 'red-tower-range-4', 
				method: function(targetMethodId, primaryId) {
					getRedSpellPosition(primaryId);
					towerTargetRange(this.primary, this.target, 'red');
				},
				methodId: undefined,
			}
			Aurora.addCollision(Aurora.collisionSetup);
		}
		function setRedLeftRoadNavCollisions() {
			Aurora.collisionSetup = {
				primary: 'arena-red-att-robot-left-' + gameObject.arenaRedSendCount,
				target: 'red-left-stop-1',
				method: function(id) {
					const robot = Aurora.methodObjects.find(bg => bg.id === this.primary);
					const robotPasser = gameObject.arenaRedAttackers.find(bg => bg.id === this.primary); 
					if (robotPasser?.stop === 0) { // moving down the road now
						robotPasser.stop++;
					}
				},
				methodId: undefined,
			}
			Aurora.addCollision(Aurora.collisionSetup);
			Aurora.collisionSetup = {
				primary: 'arena-red-att-robot-left-' + gameObject.arenaRedSendCount,
				target: 'red-left-stop-2',
				method: function(id) {
					const robot = Aurora.methodObjects.find(bg => bg.id === this.primary);
					const robotPasser = gameObject.arenaRedAttackers.find(bg => bg.id === this.primary); 
					if (robotPasser?.stop === 1) { // moving right on the road
						robotPasser.stop++;
					}
				},
				methodId: undefined,
			}
			Aurora.addCollision(Aurora.collisionSetup);
			Aurora.collisionSetup = {
				primary: 'arena-red-att-robot-left-' + gameObject.arenaRedSendCount,
				target: 'red-stop-3',
				method: function(id) {
					const robot = Aurora.methodObjects.find(bg => bg.id === this.primary);
					const robotPasser = gameObject.arenaRedAttackers.find(bg => bg.id === this.primary); 
					if (robotPasser?.stop === 2) { // moving up the road
						robotPasser.stop++;
					}
				},
				methodId: undefined,
			}
			Aurora.addCollision(Aurora.collisionSetup);
			Aurora.collisionSetup = {
				primary: 'arena-red-att-robot-left-' + gameObject.arenaRedSendCount,
				target: 'blue-base',
				method: function(id) {
					const robot = Aurora.methodObjects.find(bg => bg.id === this.primary);
					const robotPasser = gameObject.arenaRedAttackers.find(bg => bg.id === this.primary); 
					if (robotPasser?.stop === 3) { // attack the blue base
						robotPasser.stop++;
					}
				},
				methodId: undefined,
			}
			Aurora.addCollision(Aurora.collisionSetup);
		}
		function drawGrassBackGround() {
			Aurora.methodSetup = {
				method: function(id) {
					drawRect({
						posX: Aurora.placeEntityX(0),
						posY: Aurora.placeEntityY(0),
						width: Aurora.canvas.width,
						height: Aurora.canvas.height,
						lineWidth: 1,
						color: '#3C7521',
						isFilled: true,
						id: 'grass-background',
						isBackground: true,
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
						posY: Aurora.placeEntityY(0),
						width: (Aurora.canvas.width),
						height: (Aurora.canvas.height),
						patternWidth: (Aurora.canvas.height * 0.2),
						patternHeight: (Aurora.canvas.height * 0.2),
						images: [grassImg],
						selectedImage: 0,
						animTicks: 0,
						ticks: 0,
						id: 'grass',
						isBackground: false,
						props: {},
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
		}
		function resetRobotSpellSelection() {
			const allBackgrounds = Aurora.methodObjects.filter(bg => bg.id.includes('arena-robot-details-btn-'));
			allBackgrounds.forEach(bg => {
				bg.btnColor = 'darkgrey';	
			});
			const spellBackgrounds = Aurora.methodObjects.filter(bg => bg.id.includes('arena-spell-btn-'));
			spellBackgrounds.forEach(bg => {
				bg.btnColor = 'darkgrey';
				bg.txtColor = 'white';
			});
		}
		function selectArenaRobot(index) {
			if (gameObject.arenaGameStarted && gameObject.robotArenaDesigns[index].robotParts.length === 6) {
				selectedSpellBtn = undefined;
				resetRobotSpellSelection();
				const selectRobotBG = Aurora.methodObjects.find(bg => bg.id === 'arena-robot-details-btn-' + index);
				selectRobotBG.btnColor = 'yellow';
				gameObject.selectedRobot = gameObject.robotArenaDesigns[index].robotParts;
				gameObject.selectedRobotDesign = index;
				// reset the send button colors
				const sendRobotsLeft = Aurora.methodObjects.find(bs => bs.id === 'send-robots-left');
				sendRobotsLeft.btnColor = 'grey';
				const sendRobotsRight = Aurora.methodObjects.find(bs => bs.id === 'send-robots-right');
				sendRobotsRight.btnColor = 'grey';
				gameObject.wallReady = false;
				gameObject.empReady = false;
			}
		}
		function selectArenaSpell(spellId) {
			if (gameObject.arenaGameStarted) {
				resetRobotSpellSelection();
				gameObject.selectedRobotDesign = -1;
				gameObject.selectedRobot = [];
				const selectSpellBG = Aurora.methodObjects.find(bg => bg.id === spellId);
				selectSpellBG.btnColor = 'yellow';
				selectSpellBG.txtColor = 'black';
			}
		}
		function findRobotDirectiveCost(robotDirective) {
			let robotCost = 0;
			if (robotDirective === 1) {
				robotCost = gameObject.robotDirectiveCost.d1;
			} else if (robotDirective === 2) {
				robotCost = gameObject.robotDirectiveCost.d2;
			} else if (robotDirective === 3) {
				robotCost = gameObject.robotDirectiveCost.d3;
			} else if (robotDirective === 4) {
				robotCost = gameObject.robotDirectiveCost.d4;
			}
			return robotCost;
		}
		function findTowerDirectiveCost(towerDirective) {
			let towerCost = 0;
			if (towerDirective === 1) {
				towerCost = gameObject.towerDirectiveCost.d1;
			} else if (towerDirective === 2) {
				towerCost = gameObject.towerDirectiveCost.d2;
			} else if (towerDirective === 3) {
				towerCost = gameObject.towerDirectiveCost.d3;
			} else if (towerDirective === 4) {
				towerCost = gameObject.towerDirectiveCost.d4;
			}
			return towerCost;
		}
		function drawRobotSelection() {
			Aurora.methodSetup = {
				method: function(id) {
					drawRect({
						posX: Aurora.placeEntityX(0),
						posY: Aurora.placeEntityY(0.90),
						width: Aurora.canvas.width,
						height: (Aurora.canvas.height * 0.10),
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
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawButton({
						posX: Aurora.placeEntityX(0.01, (Aurora.entitySize * -0.01)),
						posY: Aurora.placeEntityY(0.84, (Aurora.entitySize * -11)),
						width: (Aurora.canvas.width * 0.15),
						height: (Aurora.entitySize * 10),
						lineWidth: 1,
						btnColor: 'darkgrey',
						txtColor: 'white',
						font: '1.2em serif',
						msg: 'Wall',
						isFilled: true,
						id: 'arena-spell-btn-1',
						action: {
							method: function(id) {
								const spellId = 'arena-spell-btn-1';
								selectedSpellBtn = Aurora.methodObjects.find(sp => sp.id === spellId);
								if (selectedSpellBtn.props.readyTime === 0) {
									gameObject.wallReady = true;
									gameObject.empReady = false;
									selectArenaSpell(spellId);
									// this method is what casts the spell: function castSpell
								}
							}
						},
						isModalBtn: false,
						props: {
							reloadTime: gameObject.spellWallTimer, // 25 seconds
							readyTime: 0, // ready to go
						},
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
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
					posX = 0.21;
					posXoffset = -0.01;
				}
				if (robotCount === 2) {
					posX = 0.43;
					posXoffset = 1.99;
				}
				if (robotCount === 3) {
					posX = 0.639;
					posXoffset = 1;
				}
				Aurora.methodSetup = {
					method: function(id) {
						drawButton({
							posX: Aurora.placeEntityX(posX, (Aurora.entitySize * posXoffset)),
							posY: Aurora.placeEntityY(posY, (Aurora.entitySize * posYoffset)),
							width: (Aurora.canvas.width * 0.15),
							height: (Aurora.entitySize * 10),
							lineWidth: 1,
							btnColor: 'darkgrey',
							txtColor: 'white',
							font: '1.5em serif',
							msg: '',
							isFilled: true,
							id: 'arena-robot-details-btn-' + i,
							action: {
								method: function(id) {
									selectArenaRobot(i);
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
							posX: Aurora.placeEntityX(posX + (0.07), (Aurora.entitySize * (posXoffset + 2))),
							posY: Aurora.placeEntityY(posY + (0.033), (Aurora.entitySize * posYoffset)),
							width: (Aurora.entitySize * 3),
							height: (Aurora.entitySize * 3),
							lineWidth: 1,
							btnColor: drawRobotSelectPreviewParts('chassis', gameObject.robotArenaDesigns[i].robotParts),
							txtColor: 'white',
							font: '1.5em serif',
							msg: '',
							isFilled: true,
							id: 'arena-robot-' + i,
							action: {
								method: function(id) {
									selectArenaRobot(i);
								}
							},
							isModalBtn: false,
							props: {
								drawHead: function(parent) {
									Aurora.methodSetup = {
										method: function(id) {
											drawButton({
												posX: parent.posX + (Aurora.entitySize * 0.3),
												posY: parent.posY - (Aurora.entitySize * 2.5),
												width: (Aurora.entitySize * 2.5),
												height: (Aurora.entitySize * 2.5),
												lineWidth: 1,
												btnColor: drawRobotSelectPreviewParts('head', gameObject.robotArenaDesigns[i].robotParts),
												txtColor: 'white',
												font: '1.5em serif',
												msg: '',
												isFilled: true,
												id: parent.id,
												action: {
													method: function(id) {
														selectArenaRobot(i);
													}
												},
												isModalBtn: false,
												props: {},
												methodId: id
											});
										}
									};
									Aurora.addMethod(Aurora.methodSetup);
								},
								drawLeftArm: function(parent) {
									Aurora.methodSetup = {
										method: function(id) {
											drawButton({
												posX: parent.posX - (Aurora.entitySize * 0.75),
												posY: parent.posY,
												width: (Aurora.entitySize * 0.75),
												height: (Aurora.entitySize * 3),
												lineWidth: 1,
												btnColor: drawRobotSelectPreviewParts('left-arm', gameObject.robotArenaDesigns[i].robotParts),
												txtColor: 'white',
												font: '1.5em serif',
												msg: '',
												isFilled: true,
												id: parent.id,
												action: {
													method: function(id) {
														selectArenaRobot(i);
													}
												},
												isModalBtn: false,
												props: {},
												methodId: id
											});
										}
									};
									Aurora.addMethod(Aurora.methodSetup);
								},
								drawRightArm: function(parent) {
									Aurora.methodSetup = {
										method: function(id) {
											drawButton({
												posX: parent.posX + (Aurora.entitySize * 3),
												posY: parent.posY,
												width: (Aurora.entitySize * 0.75),
												height: (Aurora.entitySize * 3),
												lineWidth: 1,
												btnColor: drawRobotSelectPreviewParts('right-arm', gameObject.robotArenaDesigns[i].robotParts),
												txtColor: 'white',
												font: '1.5em serif',
												msg: '',
												isFilled: true,
												id: parent.id,
												action: {
													method: function(id) {
														selectArenaRobot(i);
													}
												},
												isModalBtn: false,
												props: {},
												methodId: id
											});
										}
									};
									Aurora.addMethod(Aurora.methodSetup);
								},
								drawLeftLeg: function(parent) {
									Aurora.methodSetup = {
										method: function(id) {
											drawButton({
												posX: parent.posX + (Aurora.entitySize * 0.25),
												posY: parent.posY + (Aurora.entitySize * 3),
												width: (Aurora.entitySize * 0.75),
												height: (Aurora.entitySize * 3),
												lineWidth: 1,
												btnColor: drawRobotSelectPreviewParts('left-leg', gameObject.robotArenaDesigns[i].robotParts),
												txtColor: 'white',
												font: '1.5em serif',
												msg: '',
												isFilled: true,
												id: parent.id,
												action: {
													method: function(id) {
														selectArenaRobot(i);
													}
												},
												isModalBtn: false,
												props: {},
												methodId: id
											});
										}
									};
									Aurora.addMethod(Aurora.methodSetup);
								},
								drawRightLeg: function(parent) {
									Aurora.methodSetup = {
										method: function(id) {
											drawButton({
												posX: parent.posX + (Aurora.entitySize * 2.15),
												posY: parent.posY + (Aurora.entitySize * 3),
												width: (Aurora.entitySize * 0.75),
												height: (Aurora.entitySize * 3),
												lineWidth: 1,
												btnColor: drawRobotSelectPreviewParts('right-leg', gameObject.robotArenaDesigns[i].robotParts),
												txtColor: 'white',
												font: '1.5em serif',
												msg: '',
												isFilled: true,
												id: parent.id,
												action: {
													method: function(id) {
														selectArenaRobot(i);
													}
												},
												isModalBtn: false,
												props: {},
												methodId: id
											});
										}
									};
									Aurora.addMethod(Aurora.methodSetup);
								},
							},
							methodId: id
						});
					}
				};
				Aurora.addMethod(Aurora.methodSetup);
				drawRobotSelectParts('arena-robot-' + i);
				if (gameObject.robotArenaDesigns[i].robotParts.length === 6) {
					setTimeout(function() {
						const robotCost = findRobotDirectiveCost(gameObject.robotArenaDesigns[i].directive);
						Aurora.methodSetup = {
							layer: 1,
							method: function(id) {
								drawText({
									font: '1em serif',
									msg: '$' + robotCost,
									posX: Aurora.placeEntityX(posX + (0.04), (Aurora.entitySize * (posXoffset + 2))),
									posY: Aurora.placeEntityY(posY + (0.033), (Aurora.entitySize * posYoffset)),
									color: 'black',
									align: 'center',
									props: {},
									id: 'robot-cost-' + i,
									layer: 1,
									methodId: id
								});
							}
						};
						Aurora.addMethod(Aurora.methodSetup);
					}, 2000);
				}
			}
			Aurora.methodSetup = {
				method: function(id) {
					drawButton({
						posX: Aurora.placeEntityX(0.839, (Aurora.entitySize * 1)),
						posY: Aurora.placeEntityY(0.84, (Aurora.entitySize * -11)),
						width: (Aurora.canvas.width * 0.15),
						height: (Aurora.entitySize * 10),
						lineWidth: 1,
						btnColor: 'darkgrey',
						txtColor: 'white',
						font: '1.2em serif',
						msg: 'EMP',
						isFilled: true,
						id: 'arena-spell-btn-2',
						action: {
							method: function(id) {
								const spellId = 'arena-spell-btn-2';
								selectedSpellBtn = Aurora.methodObjects.find(sp => sp.id === spellId);
								if (selectedSpellBtn.props.readyTime === 0) {
									gameObject.wallReady = false;
									gameObject.empReady = true;
									selectArenaSpell(spellId);
									// this method is what casts the spell: function castSpell
								}
							}
						},
						isModalBtn: false,
						props: {
							reloadTime: gameObject.spellEmpTimer, // 50 seconds
							readyTime: 0, // ready to go
						},
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
		}
		function moveRobotsForward(robotCountId, teamColor, direction) {
			if (teamColor === 'blue') {
				let attackerIndex = 0;
				const moveRedBots = gameObject.arenaRedAttackers.filter(bot => bot.direction === direction && bot.halted);
				if (moveRedBots.length > 0) {
					const moveHaltedRobot = setInterval(function() {
						const checkCount = moveRedBots[attackerIndex].robotCount;
						if (checkCount > robotCountId) {
							moveRedBots[attackerIndex].halted = false;
							
						}
						if (attackerIndex >= (moveRedBots.length-1)) {
							attackerIndex = 0;
							clearInterval(moveHaltedRobot);
						}
						attackerIndex++;
					}, 100);
				}
			} else if (teamColor === 'red') {
				let attackerIndex = 0;
				const moveBlueBots = gameObject.arenaBlueAttackers.filter(bot => bot.direction === direction && bot.halted);
				if (moveBlueBots.length > 0) {
					const moveHaltedRobot = setInterval(function() {
						const checkCount = moveBlueBots[attackerIndex].robotCount;
						if (checkCount > robotCountId) {
							moveBlueBots[attackerIndex].halted = false;
							
						}
						if (attackerIndex >= (moveBlueBots.length-1)) {
							attackerIndex = 0;
							clearInterval(moveHaltedRobot);
						}
						attackerIndex++;
					}, 100);
				}
			}
		}
		function robotBulletCollision(bulletId, robotDirective, teamColor, displayMoneyWon) {
			const bullet = Aurora.methodObjects.find(bg => bg.methodId === bulletId);
			if (bullet) {
				const tower = Aurora.methodObjects.find(bg => bg.id === bullet.props.tower);
				const towerAtt = tower.props.stats.att;
				let robotHitStats = {};
				if (teamColor === 'blue') {
					robotHitStats = gameObject.arenaRedAttackers.find(bg => bg.id === bullet.props.target);
				} else if (teamColor === 'red') {
					robotHitStats = gameObject.arenaBlueAttackers.find(bg => bg.id === bullet.props.target);
				}
				if (robotHitStats) {
					robotHitStats.hp -= (baseTowerAttack + towerAtt);
					Particle.drawSpark({
						posX: robotHitStats.posX,
						posY: robotHitStats.posY,
						shape: Particle.enumShapes.rect,
						color: 'yellow',
						ticks: 6,
						count: 8,
						size: (Aurora.entitySize * 0.3),
						speed: 1.3,
					});
				}
				Aurora.deleteEntity(bullet.methodId);
				if (robotHitStats?.hp <= 0) {
					if (gameObject.gameSounds) {
						robotHitSound.cloneNode(true).play();
					}
					const robotHitMethodObject = Aurora.methodObjects.filter(bg => bg.id === bullet.props.target);
					let moneyGained = 0;
					if (robotDirective === 4) { // lee-roy
						moneyGained = robotMoneyGained.leeRoy;
					} else if (robotDirective === 1) { // tank
						moneyGained = robotMoneyGained.tank;
					}
					deleteRobotMethodObject(robotHitMethodObject, 1);
					if (teamColor === 'blue') {
						gameObject.arenaBlueGameMoney += moneyGained;
					} else if (teamColor === 'red') {
						gameObject.arenaRedGameMoney += moneyGained;
					}
					if (displayMoneyWon) {
						Particle.floatingText({
							font: '1rem serif',
							msg: '+' + moneyGained,
							align: 'center',
							posX: robotHitStats.posX,
							posY: robotHitStats.posY,
							direction: 'top',
							color: 'gold',
							ticks: 33,
							speed: 0.1,
						});
						updateMoneyBackground();
					}
					moveRobotsForward(robotHitStats.robotCount, teamColor, robotHitStats.direction);
				}
			}
		}
		function createRobot(x, y, robotId, count, robotStats, selectedRobot, moveDirection, robotDirective) {
			const newRobot = {
				posX: Aurora.placeEntityX(x),
				posY: Aurora.placeEntityY(y),
				width: (Aurora.entitySize * 1.5),
				height: (Aurora.entitySize * 1.5),
				id: robotId + count,
				hp: 10 + robotStats.stats.def,
				robotParts: selectedRobot,
				direction: moveDirection,
				stop: 0,
				halted: false,
				attackTower: robotDirective === 1 ? true : false, // tanks attack towers
				towerTargePosX: undefined,
				towerTargePosY: undefined,
				towerHitCount: 0,
				totalStats: robotStats.stats,
				directive: robotDirective,
				robotCount: count,
			}
			return newRobot;
		}
		function drawBasesAndSends() {
			Aurora.methodSetup = {
				method: function(id) {
					drawButton({
						posX: Aurora.placeEntityX(0.49, (Aurora.entitySize * 9)),
						posY: Aurora.placeEntityY(0.78),
						width: (Aurora.entitySize * 10),
						height: (Aurora.entitySize * 10),
						lineWidth: 1,
						btnColor: 'darkblue',
						txtColor: 'white',
						font: '1em serif',
						msg: 'HP: 20',
						isFilled: true,
						id: 'blue-base',
						action: { 
							method: function(id) {
								
							}
						},
						isModalBtn: false,
						props: {
							hp: 20
						},
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawButton({
						posX: Aurora.placeEntityX(0.49, (Aurora.entitySize * 9)),
						posY: Aurora.placeEntityY(0.03),
						width: (Aurora.entitySize * 10),
						height: (Aurora.entitySize * 10),
						lineWidth: 1,
						btnColor: 'darkred',
						txtColor: 'white',
						font: '1em serif',
						msg: 'HP: 20',
						isFilled: true,
						id: 'red-base',
						action: { 
							method: function(id) {
								
							}
						},
						isModalBtn: false,
						props: {
							hp: 20
						},
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawButton({
						posX: Aurora.placeEntityX(0.19, (Aurora.entitySize * 9)),
						posY: Aurora.placeEntityY(0.78),
						width: (Aurora.entitySize * 10),
						height: (Aurora.entitySize * 10),
						lineWidth: 1,
						btnColor: 'grey',
						txtColor: 'white',
						font: '1em serif',
						msg: 'Send',
						isFilled: true,
						id: 'send-robots-left',
						action: { 
							method: function(id) {
								const robotDirective = gameObject.robotArenaDesigns[gameObject.selectedRobotDesign]?.directive;
								const robotCost = findRobotDirectiveCost(robotDirective);
								if (gameObject.arenaGameStarted && gameObject.arenaBlueGameMoney >= robotCost && gameObject.selectedRobot.length === 6) {
									if (gameObject.canClick) {
										gameObject.canClick = false;
										blueRobotSendMoneyUpdate(robotCost);
										setBlueLeftRoadNavCollisions();
										Aurora.collisionSetup = {
											primary: 'arena-blue-att-robot-left-' + gameObject.arenaBlueSendCount,
											target: 'red-tower-bullet',
											method: function(id) {
												robotBulletCollision(id, robotDirective, 'red', false);
											},
											methodId: undefined,
										}
										Aurora.addCollision(Aurora.collisionSetup);
										const allBluesLeft = gameObject.arenaBlueAttackers.filter(x => x.id.includes('arena-blue-att-robot-left-'));
										allBluesLeft.forEach(robot => {
											Aurora.collisionSetup = {
												primary: 'arena-blue-att-robot-left-' + gameObject.arenaBlueSendCount,
												target: robot.id,
												method: function(targetMethodId, primaryId) {
													const blueBot = gameObject.arenaBlueAttackers.find(x => x.id === primaryId);
													if (blueBot) {
														blueBot.halted = true;
													}
												},
												methodId: undefined,
											}
											Aurora.addCollision(Aurora.collisionSetup);
										});
										Aurora.collisionSetup = {
											primary: 'arena-blue-att-robot-left-' + gameObject.arenaBlueSendCount,
											target: 'red-spell-wall',
											method: function(targetMethodId, primaryId) {
												const blueBot = gameObject.arenaBlueAttackers.find(x => x.id === primaryId);
												if (blueBot) {
													const findId = spellWallCollisions.teamBlueIds.find(team => team.countId === blueBot.robotCount);
													if (findId === undefined) {
														const teamBlue = {
															countId: blueBot.robotCount,
															direction: blueBot.direction,
														}
														spellWallCollisions.teamBlueIds.push(teamBlue);
													}
													blueBot.halted = true;
												}
											},
											methodId: undefined,
										}
										Aurora.addCollision(Aurora.collisionSetup);
										Aurora.collisionSetup = {
											primary: 'arena-blue-att-robot-left-' + gameObject.arenaBlueSendCount,
											target: 'red-spell-emp',
											method: function(targetMethodId, primaryId) {
												const blueBot = gameObject.arenaBlueAttackers.find(x => x.id === primaryId);
												let moneyGained = 0;
												if (blueBot.directive === 4) {
													moneyGained = robotMoneyGained.leeRoy;
												} else if (blueBot.directive === 1) {
													moneyGained = robotMoneyGained.tank;
												}
												const robotHitMethodObject = Aurora.methodObjects.filter(bg => bg.id === primaryId);
												deleteRobotMethodObject(robotHitMethodObject, 1);
												Particle.drawSpark({
													posX: blueBot.posX,
													posY: blueBot.posY,
													shape: Particle.enumShapes.arc,
													color: 'blue',
													ticks: 11,
													count: 8,
													size: (Aurora.entitySize * 1),
													speed: 1.3,
												});
												gameObject.arenaRedGameMoney += moneyGained;
												if (gameObject.gameSounds) {
													robotHitSound.cloneNode(true).play();
												}
											},
											methodId: undefined,
										}
										Aurora.addCollision(Aurora.collisionSetup);
										const robotStats = totalSelectedRobotStats();
										const blueRobotId = 'arena-blue-att-robot-left-';
										const blueRobot = createRobot(0, 0.265, blueRobotId, gameObject.arenaBlueSendCount, robotStats, gameObject.selectedRobot, 'lt', robotDirective);
										sendBlueRobot(blueRobot, robotDirective);
										setRedLeftTowerRangeCollisions(blueRobot.id);
										setTimeout(function() {
											gameObject.canClick = true;
										}, 800);
									}
								} else {
									const sendRobotsLeft = Aurora.methodObjects.find(bs => bs.id === 'send-robots-left');
									sendRobotsLeft.btnColor = '#C0C0C0';
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
						posX: Aurora.placeEntityX(0.81, (Aurora.entitySize * 9)),
						posY: Aurora.placeEntityY(0.78),
						width: (Aurora.entitySize * 10),
						height: (Aurora.entitySize * 10),
						lineWidth: 1,
						btnColor: 'grey',
						txtColor: 'white',
						font: '1em serif',
						msg: 'Send',
						isFilled: true,
						id: 'send-robots-right',
						action: {
							method: function(id) {
								const robotDirective = gameObject.robotArenaDesigns[gameObject.selectedRobotDesign]?.directive;
								const robotCost = findRobotDirectiveCost(robotDirective);
								if (gameObject.arenaGameStarted && gameObject.arenaBlueGameMoney >= robotCost && gameObject.selectedRobot.length === 6 ) {
									if (gameObject.canClick) {
										gameObject.canClick = false;
										blueRobotSendMoneyUpdate(robotCost);
										//setBlueRightRoadNavCollisions();
										//Aurora.collisionSetup = {
											//primary: 'arena-blue-att-robot-right-' + gameObject.arenaBlueSendCount,
											//target: 'red-tower-bullet',
											//method: function(id) {
												//robotBulletCollision(id, robotDirective, 'red', false);
											//},
											//methodId: undefined,
										//}
										//Aurora.addCollision(Aurora.collisionSetup);
										//const allBluesRight = gameObject.arenaBlueAttackers.filter(x => x.id.includes('arena-blue-att-robot-right-'));
										//allBluesRight.forEach(robot => {
											//Aurora.collisionSetup = {
												//primary: 'arena-blue-att-robot-right-' + gameObject.arenaBlueSendCount,
												//target: robot.id,
												//method: function(targetMethodId, primaryId) {
													//const blueBot = gameObject.arenaBlueAttackers.find(x => x.id === primaryId);
													//if (blueBot) {
														//blueBot.halted = true;
													//}
												//},
												//methodId: undefined,
											//}
											//Aurora.addCollision(Aurora.collisionSetup);
										//});
										//Aurora.collisionSetup = {
											//primary: 'arena-blue-att-robot-right-' + gameObject.arenaBlueSendCount,
											//target: 'red-spell-wall',
											//method: function(targetMethodId, primaryId) {
												//const blueBot = gameObject.arenaBlueAttackers.find(x => x.id === primaryId);
												//if (blueBot) {
													//const findId = spellWallCollisions.teamBlueIds.find(team => team.countId === blueBot.robotCount);
													//if (findId === undefined) {
														//const teamBlue = {
															//countId: blueBot.robotCount,
															//direction: blueBot.direction,
														//}
														//spellWallCollisions.teamBlueIds.push(teamBlue);
													//}
													//blueBot.halted = true;
												//}
											//},
											//methodId: undefined,
										//}
										//Aurora.addCollision(Aurora.collisionSetup);
										//Aurora.collisionSetup = {
											//primary: 'arena-blue-att-robot-right-' + gameObject.arenaBlueSendCount,
											//target: 'red-spell-emp',
											//method: function(targetMethodId, primaryId) {
												//const blueBot = gameObject.arenaBlueAttackers.find(x => x.id === primaryId);
												//let moneyGained = 0;
												//if (blueBot.directive === 4) {
													//moneyGained = robotMoneyGained.leeRoy;
												//} else if (blueBot.directive === 1) {
													//moneyGained = robotMoneyGained.tank;
												//}
												//const robotHitMethodObject = Aurora.methodObjects.filter(bg => bg.id === primaryId);
												//deleteRobotMethodObject(robotHitMethodObject, 1);
												//Particle.drawSpark({
													//posX: blueBot.posX,
													//posY: blueBot.posY,
													//shape: Particle.enumShapes.arc,
													//color: 'blue',
													//ticks: 11,
													//count: 8,
													//size: (Aurora.entitySize * 1),
													//speed: 1.3,
												//});
												//gameObject.arenaRedGameMoney += moneyGained;
												//if (gameObject.gameSounds) {
													//robotHitSound.cloneNode(true).play();
												//}
											//},
											//methodId: undefined,
										//}
										//Aurora.addCollision(Aurora.collisionSetup);
										const robotStats = totalSelectedRobotStats();
										const blueRobotId = 'arena-blue-att-robot-right-';
										const blueRobot = createRobot(1, 0.265, blueRobotId, gameObject.arenaBlueSendCount, robotStats, gameObject.selectedRobot, 'rt', robotDirective);
										sendBlueRobot(blueRobot, robotDirective);
										//setRedRightTowerRangeCollisions(blueRobot.id);
										setTimeout(function() {
											gameObject.canClick = true;
										}, 800);
									}
								} else {
									const sendRobotsRight = Aurora.methodObjects.find(bs => bs.id === 'send-robots-right');
									sendRobotsRight.btnColor = '#C0C0C0';
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
		function sendRedRobotLeft(robot) {
			const robotDirective = robot.directive;
			const robotCost = findRobotDirectiveCost(robotDirective);
			gameObject.arenaRedGameMoney -= robotCost;
			setRedLeftRoadNavCollisions();
			Aurora.collisionSetup = {
				primary: 'arena-red-att-robot-left-' + gameObject.arenaRedSendCount,
				target: 'blue-tower-bullet',
				method: function(id) {
					robotBulletCollision(id, robotDirective, 'blue', true);
				},
				methodId: undefined,
			}
			Aurora.addCollision(Aurora.collisionSetup);
			const allRedsLeft = gameObject.arenaRedAttackers.filter(x => x.id.includes('arena-red-att-robot-left-'));
			allRedsLeft.forEach(robot => {
				Aurora.collisionSetup = {
					primary: 'arena-red-att-robot-left-' + gameObject.arenaRedSendCount,
					target: robot.id,
					method: function(targetMethodId, primaryId) {
						const redBot = gameObject.arenaRedAttackers.find(x => x.id === primaryId);
						if (redBot) {
							redBot.halted = true;
						}
					},
					methodId: undefined,
				}
				Aurora.addCollision(Aurora.collisionSetup);
			});
			Aurora.collisionSetup = {
				primary: 'arena-red-att-robot-left-' + gameObject.arenaRedSendCount,
				target: 'blue-spell-wall',
				method: function(targetMethodId, primaryId) {
					const redBot = gameObject.arenaRedAttackers.find(x => x.id === primaryId);
					if (redBot) {
						const findId = spellWallCollisions.teamRedIds.find(team => team.countId === redBot.robotCount);
						if (findId === undefined) {
							const teamRed = {
								countId: redBot.robotCount,
								direction: redBot.direction
							}
							spellWallCollisions.teamRedIds.push(teamRed);
						}
						redBot.halted = true;
					}
				},
				methodId: undefined,
			}
			Aurora.addCollision(Aurora.collisionSetup);
			Aurora.collisionSetup = {
				primary: 'arena-red-att-robot-left-' + gameObject.arenaRedSendCount,
				target: 'blue-spell-emp',
				method: function(targetMethodId, primaryId) {
					const redBot = gameObject.arenaRedAttackers.find(x => x.id === primaryId);
					let moneyGained = 0;
					if (redBot.directive === 4) {
						moneyGained = robotMoneyGained.leeRoy;
					} else if (redBot.directive === 1) {
						moneyGained = robotMoneyGained.tank;
					}
					const robotHitMethodObject = Aurora.methodObjects.filter(bg => bg.id === primaryId);
					deleteRobotMethodObject(robotHitMethodObject, 1);
					Particle.drawSpark({
						posX: redBot.posX,
						posY: redBot.posY,
						shape: Particle.enumShapes.arc,
						color: 'blue',
						ticks: 11,
						count: 8,
						size: (Aurora.entitySize * 1),
						speed: 1.3,
					});
					Particle.floatingText({
						font: '1rem serif',
						msg: '+' + moneyGained,
						align: 'center',
						posX: redBot.posX,
						posY: redBot.posY,
						direction: 'top',
						color: 'gold',
						ticks: 33,
						speed: 0.1,
					});
					gameObject.arenaBlueGameMoney += moneyGained;
					if (gameObject.gameSounds) {
						robotHitSound.cloneNode(true).play();
					}
				},
				methodId: undefined,
			}
			Aurora.addCollision(Aurora.collisionSetup);
			const robotStats = totalRobotStats(robot);
			const redRobotId = 'arena-red-att-robot-left-';
			const redRobot = createRobot(0, 0.615, redRobotId, gameObject.arenaRedSendCount, robotStats, robot.robotParts, 'lt', robotDirective);
			sendRedRobot(redRobot, robotDirective);
			setBlueLeftTowerRangeCollisions(redRobot.id);
		}
		function sendRedRobotRight(robot) {
			const robotDirective = robot.directive;
			const robotCost = findRobotDirectiveCost(robotDirective);
			gameObject.arenaRedGameMoney -= robotCost;
			setRedRightRoadNavCollisions();
			Aurora.collisionSetup = {
				primary: 'arena-red-att-robot-right-' + gameObject.arenaRedSendCount,
				target: 'blue-tower-bullet',
				method: function(id) {
					robotBulletCollision(id, robotDirective, 'blue', true);
				},
				methodId: undefined,
			}
			Aurora.addCollision(Aurora.collisionSetup);
			const allRedsRight = gameObject.arenaRedAttackers.filter(x => x.id.includes('arena-red-att-robot-right-'));
			allRedsRight.forEach(robot => {
				Aurora.collisionSetup = {
					primary: 'arena-red-att-robot-right-' + gameObject.arenaRedSendCount,
					target: robot.id,
					method: function(targetMethodId, primaryId) {
						const redBot = gameObject.arenaRedAttackers.find(x => x.id === primaryId);
						if (redBot) {
							redBot.halted = true;
						}
					},
					methodId: undefined,
				}
				Aurora.addCollision(Aurora.collisionSetup);
			});
			Aurora.collisionSetup = {
				primary: 'arena-red-att-robot-right-' + gameObject.arenaRedSendCount,
				target: 'blue-spell-wall',
				method: function(targetMethodId, primaryId) {
					const redBot = gameObject.arenaRedAttackers.find(x => x.id === primaryId);
					if (redBot) {
						const findId = spellWallCollisions.teamRedIds.find(team => team.countId === redBot.robotCount);
						if (findId === undefined) {
							const teamRed = {
								countId: redBot.robotCount,
								direction: redBot.direction,
							}
							spellWallCollisions.teamRedIds.push(teamRed);
						}
						redBot.halted = true;
					}
				},
				methodId: undefined,
			}
			Aurora.addCollision(Aurora.collisionSetup);
			Aurora.collisionSetup = {
				primary: 'arena-red-att-robot-right-' + gameObject.arenaRedSendCount,
				target: 'blue-spell-emp',
				method: function(targetMethodId, primaryId) {
					const redBot = gameObject.arenaRedAttackers.find(x => x.id === primaryId);
					let moneyGained = 0;
					if (redBot.directive === 4) {
						moneyGained = robotMoneyGained.leeRoy;
					} else if (redBot.directive === 1) {
						moneyGained = robotMoneyGained.tank;
					}
					const robotHitMethodObject = Aurora.methodObjects.filter(bg => bg.id === primaryId);
					deleteRobotMethodObject(robotHitMethodObject, 1);
					Particle.drawSpark({
						posX: redBot.posX,
						posY: redBot.posY,
						shape: Particle.enumShapes.arc,
						color: 'blue',
						ticks: 11,
						count: 8,
						size: (Aurora.entitySize * 1),
						speed: 1.3,
					});
					Particle.floatingText({
						font: '1rem serif',
						msg: '+' + moneyGained,
						align: 'center',
						posX: redBot.posX,
						posY: redBot.posY,
						direction: 'top',
						color: 'gold',
						ticks: 33,
						speed: 0.1,
					});
					gameObject.arenaBlueGameMoney += moneyGained;
					if (gameObject.gameSounds) {
						robotHitSound.cloneNode(true).play();
					}
				},
				methodId: undefined,
			}
			Aurora.addCollision(Aurora.collisionSetup);
			const robotStats = totalRobotStats(robot);
			const redRobotId = 'arena-red-att-robot-right-';
			const redRobot = createRobot(1, 0.615, redRobotId, gameObject.arenaRedSendCount, robotStats, robot.robotParts, 'rt', robotDirective);
			sendRedRobot(redRobot, robotDirective);
			setBlueRightTowerRangeCollisions(redRobot.id);
			
		}
		function updateMoneyBackground() {
			const moneyBackground = Aurora.methodObjects.find(bg => bg.id === 'money-bar-background');
			const moneyCounter = Aurora.methodObjects.find(bg => bg.id === 'player-money-amount-title');
			if (moneyCounter) {
				moneyCounter.msg = '$' + gameObject.arenaBlueGameMoney;
				moneyBackground.isAnim = true;
			}
		}
		function blueRobotSendMoneyUpdate(cost) {
			gameObject.arenaBlueGameMoney -= cost;
			updateMoneyBackground();
		}
		function generateRedArenaRobots() {
			for (let i = 0; i < gameObject.robotArenaDesignCount; i++) {
				// future Jordan remove the random directive and put this here instead: Math.floor((Math.random() * 4) + 1)
				// we need to make the rest of the directives work first
				let randomDirective = Math.floor((Math.random() * 2) + 1);
				if (gameObject.gamesWon === 0) { // give the player an 'easy' first round
					randomDirective = 1;
				}
				let directive = 0;
				if (randomDirective === 1) {
					directive = 4; // lee-roy
				} else {
					directive = 1 // tank
				}
				const robotDesign = {
					robotId: i,
					robotParts: [],
					directive: directive,
				};
				let headIndex = 0;
				let chassisIndex = 0;
				let leftArmIndex = 0;
				let rightArmIndex = 0;
				let leftLegIndex = 0;
				let rightLegIndex = 0;
				if (gameObject.gamesWon > tutorialGames) { // give the player a few 'easy' games
					headIndex = Math.floor((Math.random() * robotHeads.length));
					chassisIndex = Math.floor((Math.random() * robotChassis.length));
					leftArmIndex = Math.floor((Math.random() * robotArms.length));
					rightArmIndex = Math.floor((Math.random() * robotArms.length));
					leftLegIndex = Math.floor((Math.random() * robotLegs.length));
					rightLegIndex = Math.floor((Math.random() * robotLegs.length));
				}
				const randomHead = Object.assign({}, robotHeads[headIndex]);
				robotDesign.robotParts.push(randomHead);
				const randomChassis = Object.assign({}, robotChassis[chassisIndex]);
				robotDesign.robotParts.push(randomChassis);
				const randomLeftArm = Object.assign({}, robotArms[leftArmIndex]);
				randomLeftArm.armPos = 'left';
				robotDesign.robotParts.push(randomLeftArm);
				const randomRightArm = Object.assign({}, robotArms[rightArmIndex]);
				randomRightArm.armPos = 'right';
				robotDesign.robotParts.push(randomRightArm);
				const randomLeftLeg = Object.assign({}, robotLegs[leftLegIndex]);
				randomLeftLeg.legPos = 'left';
				robotDesign.robotParts.push(randomLeftLeg);
				const randomRightLeg = Object.assign({}, robotLegs[rightLegIndex]);
				randomRightLeg.legPos = 'right';
				robotDesign.robotParts.push(randomRightLeg);
				
				gameObject.redRobotArenaDesigns.push(robotDesign);
			}
		}
		function generateRedArenaTowers() {
			// there is only one tower right now
			for (let i = 0; i < gameObject.towerArenaDesignCount; i++) {
				const cloneTower = Object.assign({}, arenaTowers[0]);
				cloneTower.stats = Object.assign({}, arenaTowers[0].stats);
				cloneTower.requires = Object.assign({}, arenaTowers[0].requires);
				const randomDirective = Math.floor((Math.random() * 2) + 1);
				let directive;
				if (randomDirective === 1) {
					directive = 3; // rapid-shot
					cloneTower.stats.spd += 3;
					cloneTower.stats.att -= 2;
					cloneTower.stats.hp -= 5;
				} else {
					directive = 1
					// use default tower stats
				}
				const towerDesign = {
					arenaTowerId: i,
					arenaTower: cloneTower,
					robotParts: [], // if the tower is a bunker, this is the selected robot
					directive: directive, // will the tower be standard, splash-shot, rapid-shot or ram-shot
					// each directive will alter the tower stats. standard will be default
				}
				gameObject.redTowerArenaDesigns.push(towerDesign);
			}
		}
		
		function sendRobot(robot) {
			// const chassis = drawRobotSelectPreviewParts('chassis', robot.robotParts, true);
			alert(robotChassis.imgs.length);
			//Aurora.methodSetup = {
				//method: function(id) {
					//drawImage({
						//posX: robot.posX,
						//posY: robot.posY,
						//width: robot.width,
						//height: robot.height, // future Jordan, checkout this method here. Make sure it's returning an array with one item in it
						//images: chassis, // testing here
						//selectedImage: 0,
						//animTicks: 15,
						//ticks: 15,
						//id: robot.id,
						//isBackground: false,
						//props: {
							////animate: (function(parent) { // testing here
								////if (gameObject.arenaGameStarted) {
									////const animateRobot = Aurora.methodObjects.filter(bg => bg.id === robot.id);
									////animateRobot.forEach(part => {
										////if (!robot.halted) { // the robot is moving
											////if (part.animTicks <= 1) {
												////if (part.selectedImage >= (part.images.length - 1)) {
													////part.selectedImage = 0;
												////} else {
													////part.selectedImage += 1;
												////}
											////}
											////part = Aurora.nextTick(part);
										////} else { // the robot is holding still
											////part.selectedImage = 0;
										////}
									////});
								////}
							////})(),
							//drawHead: function(parent) {
								//Aurora.methodSetup = {
									//method: function(id) {
								 		//drawImage({
								 			//posX: parent.posX + (Aurora.entitySize * 0.15),
								 			//posY: parent.posY - (Aurora.entitySize * 1.25),
								 			//width: (Aurora.entitySize * 1.25),
											//height: (Aurora.entitySize * 1.25),
								 			//images: [], // drawRobotSelectPreviewParts('head', robot?.robotParts, true), // testing here
								 			//selectedImage: 0,
								 			//animTicks: 3,
								 			//ticks: 3,
								 			//id: parent.id,
								 			//isBackground: false,
								 			//props: {},
								 			//methodId: id
								 		//});
									//}
								//};
								//Aurora.addMethod(Aurora.methodSetup);
							//},
							//drawLeftArm: function(parent) {
								//Aurora.methodSetup = {
									//method: function(id) {
										//drawImage({
								 			//posX: parent.posX - (Aurora.entitySize * 1),
											//posY: parent.posY,
											//width: (Aurora.entitySize * 2),
											//height: (Aurora.entitySize * 1.5),
								 			//images: [], // drawRobotSelectPreviewParts('left-arm', robot?.robotParts, true), // testing here
								 			//selectedImage: 0,
								 			//animTicks: 5,
								 			//ticks: 5,
								 			//id: parent.id,
								 			//isBackground: false,
								 			//props: {},
								 			//methodId: id
								 		//});
									//}
								//};
								//Aurora.addMethod(Aurora.methodSetup);
							//},
							//drawRightArm: function(parent) {
								//Aurora.methodSetup = {
									//method: function(id) {
										//drawImage({
								 			//posX: parent.posX + (Aurora.entitySize * 0.5),
											//posY: parent.posY,
											//width: (Aurora.entitySize * 2),
											//height: (Aurora.entitySize * 1.5),
								 			//images: [], // drawRobotSelectPreviewParts('right-arm', robot?.robotParts, true), // testing here
								 			//selectedImage: 0,
								 			//animTicks: 5,
								 			//ticks: 5,
								 			//id: parent.id,
								 			//isBackground: false,
								 			//props: {},
								 			//methodId: id
								 		//});
									//}
								//};
								//Aurora.addMethod(Aurora.methodSetup);
							//},
							//drawLeftLeg: function(parent) {
								//Aurora.methodSetup = {
									//method: function(id) {
										//drawImage({
								 			//posX: parent.posX - (Aurora.entitySize * 0.3),
											//posY: parent.posY + (Aurora.entitySize * 1.09),
											//width: (Aurora.entitySize * 0.975),
											//height: (Aurora.entitySize * 1.5),
								 			//images: [], // drawRobotSelectPreviewParts('left-leg', robot?.robotParts, true), // testing here
								 			//selectedImage: 0,
								 			//animTicks: 3,
								 			//ticks: 3,
								 			//id: parent.id,
								 			//isBackground: false,
								 			//props: {},
								 			//methodId: id
								 		//});
									//}
								//};
								//Aurora.addMethod(Aurora.methodSetup);
							//},
							//drawRightLeg: function(parent) {
								//Aurora.methodSetup = {
									//method: function(id) {
										//drawImage({
								 			//posX: parent.posX + (Aurora.entitySize * 0.85),
											//posY: parent.posY + (Aurora.entitySize * 1.09),
											//width: (Aurora.entitySize * 0.975),
											//height: (Aurora.entitySize * 1.5),
								 			//images: [], // drawRobotSelectPreviewParts('right-leg', robot?.robotParts, true), // testing here
								 			//selectedImage: 0,
								 			//animTicks: 3,
								 			//ticks: 3,
								 			//id: parent.id,
								 			//isBackground: false,
								 			//props: {},
								 			//methodId: id
								 		//});
									//}
								//};
								//Aurora.addMethod(Aurora.methodSetup);
							//},
						//},
						//methodId: id
					//});
				//}
			//};
			//Aurora.addMethod(Aurora.methodSetup);
		}
		function sendBlueRobot(blueRobot, robotDirective) {
			sendRobot(blueRobot); // testing here
			drawRobotSelectParts(blueRobot.id); // testing here
			gameObject.arenaBlueAttackers.push(blueRobot);
			gameObject.arenaBlueSendCount++;
			if (robotDirective === 4) { // lee-roy
				gameObject.arenaBlueSendLeeRoyCount++;
			} else if (robotDirective === 1) { // tank
				gameObject.arenaBlueSendTankCount++;
			}
		}
		function sendRedRobot(redRobot, robotDirective) {
			sendRobot(redRobot);
			drawRobotSelectParts(redRobot.id);
			gameObject.arenaRedAttackers.push(redRobot);
			gameObject.arenaRedSendCount++;
			if (robotDirective === 4) { // lee-roy
				gameObject.arenaRedSendLeeRoyCount++;
			} else if (robotDirective === 1) { // tank
				gameObject.arenaRedSendTankCount++;
			}
		}
		function drawBlueRoads() {
			Aurora.methodSetup = {
				method: function(id) {
					drawButtonImage({
			 			posX: Aurora.placeEntityX(0.10, (Aurora.entitySize * 4.3)),
			 			posY: Aurora.placeEntityY(0.46),
			 			width: (Aurora.canvas.width * 0.50),
			 			height: (Aurora.entitySize * 7),
			 			txtColor: 'white',
						font: '0.8em serif',
						msg: '',
			 			images: [roadImg],
			 			selectedImage: 0,
			 			animTicks: 0,
			 			ticks: 0,
			 			id: 'blue-left-base-road-1',
			 			action: {
							method: function(id, pos) {
								if (gameObject.wallReady || gameObject.empReady) {
									const spellType = gameObject.wallReady ? 'wall' : 'emp';
									castSpell(pos, spellType, selectedSpellBtn.id, 'blue');
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
					drawButtonImage({
			 			posX: Aurora.placeEntityX(0.48, (Aurora.entitySize * 5.5)),
			 			posY: Aurora.placeEntityY(0.46),
			 			width: (Aurora.canvas.width * 0.50),
			 			height: (Aurora.entitySize * 7),
			 			txtColor: 'white',
						font: '0.8em serif',
						msg: '',
			 			images: [roadImg],
			 			selectedImage: 0,
			 			animTicks: 0,
			 			ticks: 0,
			 			id: 'blue-right-base-road-1',
			 			action: {
							method: function(id, pos) {
								if (gameObject.wallReady || gameObject.empReady) {
									const spellType = gameObject.wallReady ? 'wall' : 'emp';
									castSpell(pos, spellType, selectedSpellBtn.id, 'blue');
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
					drawButtonImage({
			 			posX: Aurora.placeEntityX(0.93, (Aurora.entitySize * 5.5)),
			 			posY: Aurora.placeEntityY(0.59),
			 			width: (Aurora.entitySize * 20),
			 			height: (Aurora.entitySize * 7),
			 			txtColor: 'white',
						font: '0.8em serif',
						msg: '',
			 			images: [roadImg],
			 			selectedImage: 0,
			 			animTicks: 0,
			 			ticks: 0,
			 			id: 'blue-right-road-spawn',
			 			action: {
							method: function(id, pos) {
								if (gameObject.wallReady || gameObject.empReady) {
									const spellType = gameObject.wallReady ? 'wall' : 'emp';
									castSpell(pos, spellType, selectedSpellBtn.id, 'blue');
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
					drawButtonImage({
			 			posX: Aurora.placeEntityX(0.05, (Aurora.entitySize * 24)),
			 			posY: Aurora.placeEntityY(0.59),
			 			width: (Aurora.entitySize * 20),
			 			height: (Aurora.entitySize * 7),
			 			txtColor: 'white',
						font: '0.8em serif',
						msg: '',
			 			images: [roadImg],
			 			selectedImage: 0,
			 			animTicks: 0,
			 			ticks: 0,
			 			id: 'blue-left-road-spawn',
			 			action: {
							method: function(id, pos) {
								if (gameObject.wallReady || gameObject.empReady) {
									const spellType = gameObject.wallReady ? 'wall' : 'emp';
									castSpell(pos, spellType, selectedSpellBtn.id, 'blue');
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
					drawButtonImage({
			 			posX: Aurora.placeEntityX(0.95, (Aurora.entitySize * 15)),
			 			posY: Aurora.placeEntityY(0.46),
			 			width: (Aurora.entitySize * 7),
			 			height: (Aurora.entitySize * 20),
			 			txtColor: 'white',
						font: '0.8em serif',
						msg: '',
			 			images: [roadImg],
			 			selectedImage: 0,
			 			animTicks: 0,
			 			ticks: 0,
			 			id: 'blue-right-base-road-2',
			 			action: {
							method: function(id, pos) {
								if (gameObject.wallReady || gameObject.empReady) {
									const spellType = gameObject.wallReady ? 'wall' : 'emp';
									castSpell(pos, spellType, selectedSpellBtn.id, 'blue');
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
					drawButtonImage({
			 			posX: Aurora.placeEntityX(0.09, (Aurora.entitySize * 3)),
			 			posY: Aurora.placeEntityY(0.46),
			 			width: (Aurora.entitySize * 7),
			 			height: (Aurora.entitySize * 20),
			 			txtColor: 'white',
						font: '0.8em serif',
						msg: '',
			 			images: [roadImg],
			 			selectedImage: 0,
			 			animTicks: 0,
			 			ticks: 0,
			 			id: 'blue-left-base-road-2',
			 			action: {
							method: function(id, pos) {
								if (gameObject.wallReady || gameObject.empReady) {
									const spellType = gameObject.wallReady ? 'wall' : 'emp';
									castSpell(pos, spellType, selectedSpellBtn.id, 'blue');
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
					drawButtonImage({
			 			posX: Aurora.placeEntityX(0.49, (Aurora.entitySize * 5.5)),
			 			posY: Aurora.placeEntityY(0.46),
			 			width: (Aurora.entitySize * 7),
			 			height: (Aurora.entitySize * 33),
			 			txtColor: 'white',
						font: '0.8em serif',
						msg: '',
			 			images: [roadImg],
			 			selectedImage: 0,
			 			animTicks: 0,
			 			ticks: 0,
			 			id: 'blue-base-road',
			 			action: {
							method: function(id, pos) {
								if (gameObject.wallReady || gameObject.empReady) {
									const spellType = gameObject.wallReady ? 'wall' : 'emp';
									castSpell(pos, spellType, selectedSpellBtn.id, 'blue');
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
		function drawRedRoads() {
			Aurora.methodSetup = {
				method: function(id) {
					drawImage({
			 			posX: Aurora.placeEntityX(0.10, (Aurora.entitySize * 4.3)),
			 			posY: Aurora.placeEntityY(0.37),
			 			width: (Aurora.canvas.width * 0.50),
			 			height: (Aurora.entitySize * 7),
			 			images: [roadImg],
			 			selectedImage: 0,
			 			animTicks: 0,
			 			ticks: 0,
			 			id: 'red-left-base-road-1',
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
			 			posX: Aurora.placeEntityX(0.48, (Aurora.entitySize * 5.5)),
			 			posY: Aurora.placeEntityY(0.37),
			 			width: (Aurora.canvas.width * 0.50),
			 			height: (Aurora.entitySize * 7),
			 			images: [roadImg],
			 			selectedImage: 0,
			 			animTicks: 0,
			 			ticks: 0,
			 			id: 'red-right-base-road-1',
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
			 			posX: Aurora.placeEntityX(0.93, (Aurora.entitySize * 5.5)),
			 			posY: Aurora.placeEntityY(0.24),
			 			width: (Aurora.entitySize * 20),
			 			height: (Aurora.entitySize * 7),
			 			images: [roadImg],
			 			selectedImage: 0,
			 			animTicks: 0,
			 			ticks: 0,
			 			id: 'red-right-road-spawn',
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
			 			posX: Aurora.placeEntityX(0.05, (Aurora.entitySize * 24)),
			 			posY: Aurora.placeEntityY(0.24),
			 			width: (Aurora.entitySize * 20),
			 			height: (Aurora.entitySize * 7),
			 			images: [roadImg],
			 			selectedImage: 0,
			 			animTicks: 0,
			 			ticks: 0,
			 			id: 'red-left-road-spawn',
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
			 			posX: Aurora.placeEntityX(0.95, (Aurora.entitySize * 15)),
			 			posY: Aurora.placeEntityY(0.24),
			 			width: (Aurora.entitySize * 7),
			 			height: (Aurora.entitySize * 20),
			 			images: [roadImg],
			 			selectedImage: 0,
			 			animTicks: 0,
			 			ticks: 0,
			 			id: 'red-right-base-road-2',
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
			 			posX: Aurora.placeEntityX(0.09, (Aurora.entitySize * 3)),
			 			posY: Aurora.placeEntityY(0.24),
			 			width: (Aurora.entitySize * 7),
			 			height: (Aurora.entitySize * 20),
			 			images: [roadImg],
			 			selectedImage: 0,
			 			animTicks: 0,
			 			ticks: 0,
			 			id: 'red-left-base-road-2',
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
			 			posX: Aurora.placeEntityX(0.49, (Aurora.entitySize * 5.5)),
			 			posY: Aurora.placeEntityY(0.113),
			 			width: (Aurora.entitySize * 7),
			 			height: (Aurora.entitySize * 33),
			 			images: [roadImg],
			 			selectedImage: 0,
			 			animTicks: 0,
			 			ticks: 0,
			 			id: 'red-base-road',
			 			isBackground: false,
			 			props: {},
			 			methodId: id
			 		});
			 	}
			};
			Aurora.addMethod(Aurora.methodSetup);
		}
		function castSpell(pos, spellType, spellBtnId, teamColor) {
			let spellX = pos.tappedX / Aurora.canvas.width;
			let spellY = pos.tappedY / Aurora.canvas.height;
			let spellWidth = (Aurora.entitySize * 1) + (Aurora.canvas.height * 0.025);
			let spellArcWidth = spellWidth;
			if (spellType === 'wall') {
				Aurora.methodSetup = {
					method: function(id) {
						drawRect({
							posX: Aurora.placeEntityX(spellX, (Aurora.entitySize * 9)) + (spellWidth / 2),
							posY: Aurora.placeEntityY(spellY) - (spellWidth / 2),
							width: spellWidth,
							height: spellWidth,
							lineWidth: 3,
							color: 'lightblue',
							isFilled: false,
							isBackground: false,
							id: teamColor + '-spell-wall',
							props: {
								timeOut: spellTimeOut.wall, // how many seconds the wall will stay
							},
							methodId: id
						});
					}
				}
				Aurora.addMethod(Aurora.methodSetup);
				Particle.drawSpark({
					posX: Aurora.placeEntityX(spellX, (Aurora.entitySize * 9)) + (spellWidth / 2),
					posY: Aurora.placeEntityY(spellY) - (spellWidth / 2),
					shape: Particle.enumShapes.arc,
					color: 'lightblue',
					ticks: 11,
					count: 8,
					size: (Aurora.entitySize * 0.5),
					speed: 1.3,
				});
				if (gameObject.gameSounds) {
					wallDropSound.cloneNode(true).play();
				}
			} else if (spellType === 'emp') {
				Aurora.methodSetup = {
					method: function(id) {
						drawRect({
							posX: Aurora.placeEntityX(spellX, (Aurora.entitySize * 9)) + (spellWidth / 2),
							posY: Aurora.placeEntityY(spellY) - (spellWidth / 2),
							width: spellWidth,
							height: spellWidth,
							lineWidth: 1,
							color: 'rgba(0, 0, 200, 0)', // transparant
							isFilled: true,
							isBackground: false,
							id: teamColor + '-spell-emp',
							props: {
								timeOut: spellTimeOut.emp, // how many seconds the emp will stay
							},
							methodId: id
						});
					}
				}
				Aurora.addMethod(Aurora.methodSetup);
				Aurora.methodSetup = {
					method: function(id) {
						drawArc({
							posX: Aurora.placeEntityX(spellX, (Aurora.entitySize * 9)) + (spellWidth),
							posY: Aurora.placeEntityY(spellY) - (spellWidth / 2),
							width: spellWidth,
							aglStrt: 0,
							aglEnd: (2 * Math.PI),
							lineWidth: 3,
							color: 'blue',
							isFilled: false,
							id: teamColor + '-spell-emp-arc',
							props: {
								timeOut: 8, // how many seconds the emp will stay
							},
							methodId: id
						});
					}
				}
				Aurora.addMethod(Aurora.methodSetup);
				if (gameObject.gameSounds) {
					empExplosionSound.cloneNode(true).play();
				}
				Particle.drawSpark({
					posX: Aurora.placeEntityX(spellX, (Aurora.entitySize * 9)) + (spellWidth / 2),
					posY: Aurora.placeEntityY(spellY) - (spellWidth / 2),
					shape: Particle.enumShapes.arc,
					color: 'blue',
					ticks: 11,
					count: 8,
					size: (Aurora.entitySize * 1),
					speed: 1.3,
				});
				setTimeout(function() {
					empArcEffect(teamColor + '-spell-emp-arc');
				}, 0);
			}
			if (spellBtnId) { // only refresh the spell buttons for players
				spellReload(spellBtnId, spellType);
				resetRobotSpellSelection();
			} else {
				redSpellReload(spellType);
			}
			setTimeout(function() {
				spellDuration(spellType, teamColor);
			}, 0);
		}
		function spellReload(spellBtnId, spellType) {
			const spellBtn = Aurora.methodObjects.find(sp => sp.id === spellBtnId);
			spellBtn.props.readyTime = spellBtn.props.reloadTime;
			spellBtn.msg = spellBtn.props.readyTime;
			const reload = setInterval(function() {
				spellBtn.props.readyTime--;
				spellBtn.msg = spellBtn.props.readyTime;
				if (spellBtn.props.readyTime <= 0) {
					spellBtn.props.readyTime = 0;
					let spellName = '';
					if (spellType === 'wall') {
						spellName = 'Wall';
					} else {
						spellName = 'EMP';
					}
					spellBtn.msg = spellName;
					clearInterval(reload);
				}
			}, 1000);
		}
		function redSpellReload(spellType) {
			if (spellType === 'wall') {
				gameObject.canRedCastWall = false;
			} else if (spellType === 'emp') {
				gameObject.canRedCastEmp = false;
			}
			let spellSeconds = 0;
			const reload = setInterval(function() {
				spellSeconds++;
				if (spellType === 'wall') {
					if (spellSeconds >= gameObject.spellWallTimer) {
						spellSeconds = 0;
						gameObject.canRedCastWall = true;
						clearInterval(reload);
					}
				} else if (spellType === 'emp') {
					if (spellSeconds >= gameObject.spellEmpTimer) {
						spellSeconds = 0;
						gameObject.canRedCastEmp = true;
						clearInterval(reload);
					}
				}
			}, 1000);
		}
		function spellDuration(spellType, teamColor) {
			const spells = Aurora.methodObjects.filter(x => x.id.includes(teamColor + '-spell-' + spellType));
			if (spells.length > 0) {
				spells.forEach(spell => {
					const spellTime = setTimeout(function() {
						if (teamColor === 'red') {
							spellWallCollisions.teamBlueIds = [];
						}
						if (teamColor === 'blue') {
							
							spellWallCollisions.teamRedIds = [];
						}
						Aurora.deleteEntity(spell.methodId);
						clearTimeout(spellTime);
					}, 1000 * spell.props.timeOut);
				});
			}
		}
		function empArcEffect(arcId) {
			const empArc = !!Aurora.methodObjects.find(sp => sp.id === arcId);
			if (empArc) {
				const arcBlink = setInterval(function() {
					const checkEmp = Aurora.methodObjects.find(sp => sp.id === arcId);
					if (checkEmp) {
						if (checkEmp.color === 'blue') {
							checkEmp.color = 'rgba(0, 0, 200, 0)'; // transparant
						} else {
							checkEmp.color = 'blue';
						}
					} else {
						clearInterval(arcBlink);
					}
				}, 125);
			}
		}
		function selectTower(methodId, towerIndex) {
			let tower = Aurora.methodObjects.find(bg => bg.methodId === methodId);
			const range = Aurora.methodObjects.find(bg => bg.id === tower.props.arcId);
			if (tower.props.towerId === 0) { // no tower built here
				selectBuildTowerMenu(tower, towerIndex);
			} else if (tower.props.towerId !== 0 && !tower.props.selected) { // tower is built but not yet selected
				range.color = 'blue';
				tower.props.selected = true;
				tower.msg = 'upgd';
			} else if (tower.props.towerId !== 0 && tower.props.selected) { // tower is selected ready to upgrade
				// open up the upgrade menu
				selectUpgradeTowerMenu(tower, towerIndex);
				range.color = 'rgba(0, 0, 200, 0)';
				tower.props.selected = false;
				tower.msg = 'HP: ' + tower.props.stats.hp;
			}
		}
		function drawBlueTowerSpawns() {
			let rangeWidth = 0;
			let arcWidth = 0;
			let isMobile = false;
			if (Aurora.canvas.height > Aurora.canvas.width) { // mobile
				rangeWidth = (Aurora.entitySize * 1) + (Aurora.canvas.height * 0.025);
				arcWidth = rangeWidth;
				isMobile = true;
			} else { // everything else
				rangeWidth = (Aurora.entitySize * 1) + (Aurora.canvas.width * 0.075);
				arcWidth = (Aurora.entitySize * 1) + (Aurora.canvas.width * 0.04);
				isMobile = false;
			}
			Aurora.methodSetup = {
				method: function(id) {
					drawRect({
						posX: !isMobile ? Aurora.placeEntityX(0.08, (Aurora.entitySize * 9)) : Aurora.placeEntityX(0.11, (Aurora.entitySize * 9)),
						posY: Aurora.placeEntityY(0.619),
						width: rangeWidth,
						height: rangeWidth,
						lineWidth: 1,
						color: 'rgba(0, 0, 200, 0)', // transparant
						isFilled: true,
						isBackground: false,
						id: 'blue-tower-range-1',
						props: {
							targetId: '',
							canShoot: true,
							towerId: 'blue-left-tower-spawn-1',
						},
						methodId: id
					});
				}
			}
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawArc({
						posX: Aurora.placeEntityX(0.11, (Aurora.entitySize * 9)) + ((Aurora.entitySize * 6) / 2),
						posY: isMobile ? Aurora.placeEntityY(0.66) : Aurora.placeEntityY(0.68),
						width: arcWidth,
						aglStrt: 0,
						aglEnd: (2 * Math.PI),
						lineWidth: 3,
						color: 'rgba(0, 0, 200, 0)', // transparant
						isFilled: false,
						id: 'blue-tower-range-arc-1',
						props: {},
						methodId: id
					});
				}
			}
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawButton({
						posX: Aurora.placeEntityX(0.11, (Aurora.entitySize * 9)),
						posY: Aurora.placeEntityY(0.66),
						width: (Aurora.entitySize * 6),
						height: (Aurora.entitySize * 6),
						lineWidth: 1,
						btnColor: 'orange',
						txtColor: 'white',
						font: '0.8em serif',
						msg: 'Build',
						isFilled: true,
						id: 'blue-left-tower-spawn-1',
						action: {
							methodId: id,
							method: function(id) {
								if (gameObject.arenaGameStarted) {
									selectTower(this.methodId, 1);
								}
							}
						},
						isModalBtn: false,
						props: {
							arcId: 'blue-tower-range-arc-1',
							selected: false,
							towerId: 0,
							type: '',
							name: '',
							stats: {
								att: 0,
								def: 0,
								spd: 0,
								hp: 0,
								lvl: 0,
								splash: 0,
							},
							robotParts: [],
							requires: {
								arenaLvlToBuild: 0,
								arenaLvlToUpgrade: 0,
							},
							directive: 0,
						},
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawRect({
						posX: !isMobile ? Aurora.placeEntityX(0.165, (Aurora.entitySize * 1)) : Aurora.placeEntityX(0.195, (Aurora.entitySize * 1)),
						posY: Aurora.placeEntityY(0.49),
						width: !isMobile ? rangeWidth : rangeWidth - (Aurora.entitySize * 1),
						height: rangeWidth,
						lineWidth: 1,
						color: 'rgba(0, 0, 200, 0)', // transparant
						isFilled: true,
						isBackground: false,
						id: 'blue-tower-range-2',
						props: {
							targetId: '',
							canShoot: true,
							towerId: 'blue-left-tower-spawn-2',
						},
						methodId: id
					});
				}
			}
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawArc({
						posX: Aurora.placeEntityX(0.195, (Aurora.entitySize * 1)) + ((Aurora.entitySize * 6) / 2),
						posY: isMobile ? Aurora.placeEntityY(0.53) : Aurora.placeEntityY(0.55),
						width: arcWidth,
						aglStrt: 0,
						aglEnd: (2 * Math.PI),
						lineWidth: 3,
						color: 'rgba(0, 0, 200, 0)', // transparant
						isFilled: false,
						id: 'blue-tower-range-arc-2',
						props: {},
						methodId: id
					});
				}
			}
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawButton({
						posX: Aurora.placeEntityX(0.195, (Aurora.entitySize * 1)),
						posY: Aurora.placeEntityY(0.53),
						width: (Aurora.entitySize * 6),
						height: (Aurora.entitySize * 6),
						lineWidth: 1,
						btnColor: 'orange',
						txtColor: 'white',
						font: '0.8em serif',
						msg: 'Build',
						isFilled: true,
						id: 'blue-left-tower-spawn-2',
						action: {
							methodId: id,
							method: function(id) {
								if (gameObject.arenaGameStarted) {
									selectTower(this.methodId, 2);
								}
							}
						},
						isModalBtn: false,
						props: {
							arcId: 'blue-tower-range-arc-2',
							selected: false,
							towerId: 0,
							type: '',
							name: '',
							stats: {
								att: 0,
								def: 0,
								spd: 0,
								hp: 0,
								lvl: 0,
								splash: 0,
							},
							robotParts: [],
							requires: {
								arenaLvlToBuild: 0,
								arenaLvlToUpgrade: 0,
							},
							directive: 0,
						},
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawRect({
						posX: !isMobile ? Aurora.placeEntityX(0.315, (Aurora.entitySize * 1)) : Aurora.placeEntityX(0.345, (Aurora.entitySize * 1)),
						posY: Aurora.placeEntityY(0.49),
						width: !isMobile ? rangeWidth : rangeWidth - (Aurora.entitySize * 1),
						height: rangeWidth,
						lineWidth: 1,
						color: 'rgba(0, 0, 200, 0)', // transparant
						isFilled: true,
						isBackground: false,
						id: 'blue-tower-range-3',
						props: {
							targetId: '',
							canShoot: true,
							towerId: 'blue-left-tower-spawn-3',
						},
						methodId: id
					});
				}
			}
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawArc({
						posX: Aurora.placeEntityX(0.345, (Aurora.entitySize * 1)) + ((Aurora.entitySize * 6) / 2),
						posY: isMobile ? Aurora.placeEntityY(0.53) : Aurora.placeEntityY(0.55),
						width: arcWidth,
						aglStrt: 0,
						aglEnd: (2 * Math.PI),
						lineWidth: 3,
						color: 'rgba(0, 0, 200, 0)', // transparant
						isFilled: false,
						id: 'blue-tower-range-arc-3',
						props: {},
						methodId: id
					});
				}
			}
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawButton({
						posX: Aurora.placeEntityX(0.345, (Aurora.entitySize * 1)),
						posY: Aurora.placeEntityY(0.53),
						width: (Aurora.entitySize * 6),
						height: (Aurora.entitySize * 6),
						lineWidth: 1,
						btnColor: 'orange',
						txtColor: 'white',
						font: '0.8em serif',
						msg: 'Build',
						isFilled: true,
						id: 'blue-left-tower-spawn-3',
						action: {
							methodId: id,
							method: function(id) {
								if (gameObject.arenaGameStarted) {
									selectTower(this.methodId, 3);
								}
							}
						},
						isModalBtn: false,
						props: {
							arcId: 'blue-tower-range-arc-3',
							selected: false,
							towerId: 0,
							type: '',
							name: '',
							stats: {
								att: 0,
								def: 0,
								spd: 0,
								hp: 0,
								lvl: 0,
								splash: 0,
							},
							robotParts: [],
							requires: {
								arenaLvlToBuild: 0,
								arenaLvlToUpgrade: 0,
							},
							directive: 0,
						},
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawRect({
						posX: !isMobile ? Aurora.placeEntityX(0.435, (Aurora.entitySize * 1)) : Aurora.placeEntityX(0.605, (Aurora.entitySize * 17.5)),
						posY: Aurora.placeEntityY(0.67),
						width: rangeWidth,
						height: !isMobile ? rangeWidth : rangeWidth + (Aurora.entitySize * 3),
						lineWidth: 1,
						color: 'rgba(0, 0, 200, 0)', // transparant
						isFilled: true,
						isBackground: false,
						id: 'blue-tower-range-4',
						props: {
							targetId: '',
							canShoot: true,
							towerId: 'blue-left-tower-spawn-4',
						},
						methodId: id
					});
				}
			}
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawArc({
						posX: isMobile ? Aurora.placeEntityX(0.49, (Aurora.entitySize * 17.5))  + (Aurora.entitySize * 6) : Aurora.placeEntityX(0.47, (Aurora.entitySize * 17.5))  + (Aurora.entitySize * 6),
						posY: Aurora.placeEntityY(0.67) + ((Aurora.entitySize * 6) / 2),
						width: arcWidth,
						aglStrt: 0,
						aglEnd: (2 * Math.PI),
						lineWidth: 3,
						color: 'rgba(0, 0, 200, 0)', // transparant
						isFilled: false,
						id: 'blue-tower-range-arc-4',
						props: {},
						methodId: id
					});
				}
			}
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawButton({
						posX: Aurora.placeEntityX(0.49, (Aurora.entitySize * 17.5)),
						posY: Aurora.placeEntityY(0.67),
						width: (Aurora.entitySize * 6),
						height: (Aurora.entitySize * 6),
						lineWidth: 1,
						btnColor: 'orange',
						txtColor: 'white',
						font: '0.8em serif',
						msg: 'Build',
						isFilled: true,
						id: 'blue-left-tower-spawn-4',
						action: {
							methodId: id,
							method: function(id) {
								if (gameObject.arenaGameStarted) {
									selectTower(this.methodId, 4);
								}
							}
						},
						isModalBtn: false,
						props: {
							arcId: 'blue-tower-range-arc-4',
							selected: false,
							towerId: 0,
							type: '',
							name: '',
							stats: {
								att: 0,
								def: 0,
								spd: 0,
								hp: 0,
								lvl: 0,
								splash: 0,
							},
							robotParts: [],
							requires: {
								arenaLvlToBuild: 0,
								arenaLvlToUpgrade: 0,
							},
							directive: 0,
						},
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawRect({
						posX: !isMobile ? Aurora.placeEntityX(0.465, (Aurora.entitySize * -8.5)) : Aurora.placeEntityX(0.419, (Aurora.entitySize * -8.5)),
						posY: Aurora.placeEntityY(0.67),
						width: rangeWidth,
						height: !isMobile ? rangeWidth : rangeWidth + (Aurora.entitySize * 3),
						lineWidth: 1,
						color: 'rgba(0, 0, 200, 0)', // transparant
						isFilled: true,
						isBackground: false,
						id: 'blue-tower-range-5',
						props: {
							targetId: '',
							canShoot: true,
							towerId: 'blue-right-tower-spawn-5',
						},
						methodId: id
					});
				}
			}
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawArc({
						posX: isMobile ? Aurora.placeEntityX(0.39, (Aurora.entitySize * -8.5))  + (Aurora.entitySize * 6) : Aurora.placeEntityX(0.47, (Aurora.entitySize * -8.5))  + (Aurora.entitySize * 6),
						posY: Aurora.placeEntityY(0.67) + ((Aurora.entitySize * 6) / 2),
						width: arcWidth,
						aglStrt: 0,
						aglEnd: (2 * Math.PI),
						lineWidth: 3,
						color: 'rgba(0, 0, 200, 0)', // transparant
						isFilled: false,
						id: 'blue-tower-range-arc-5',
						props: {},
						methodId: id
					});
				}
			}
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawButton({
						posX: Aurora.placeEntityX(0.49, (Aurora.entitySize * -8.5)),
						posY: Aurora.placeEntityY(0.67),
						width: (Aurora.entitySize * 6),
						height: (Aurora.entitySize * 6),
						lineWidth: 1,
						btnColor: 'orange',
						txtColor: 'white',
						font: '0.8em serif',
						msg: 'Build',
						isFilled: true,
						id: 'blue-right-tower-spawn-5',
						action: {
							methodId: id,
							method: function(id) {
								if (gameObject.arenaGameStarted) {
									selectTower(this.methodId, 5);
								}
							}
						},
						isModalBtn: false,
						props: {
							arcId: 'blue-tower-range-arc-5',
							selected: false,
							towerId: 0,
							type: '',
							name: '',
							stats: {
								att: 0,
								def: 0,
								spd: 0,
								hp: 0,
								lvl: 0,
								splash: 0,
							},
							robotParts: [],
							requires: {
								arenaLvlToBuild: 0,
								arenaLvlToUpgrade: 0,
							},
							directive: 0,
						},
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawRect({
						posX: !isMobile ? Aurora.placeEntityX(0.625, (Aurora.entitySize * 1)) : Aurora.placeEntityX(0.579, (Aurora.entitySize * 1)),
						posY: Aurora.placeEntityY(0.49),
						width: !isMobile ? rangeWidth : rangeWidth - (Aurora.entitySize * 1),
						height: rangeWidth,
						lineWidth: 1,
						color: 'rgba(0, 0, 200, 0)', // transparant
						isFilled: true,
						isBackground: false,
						id: 'blue-tower-range-6',
						props: {
							targetId: '',
							canShoot: true,
							towerId: 'blue-right-tower-spawn-6',
						},
						methodId: id
					});
				}
			}
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawArc({
						posX: Aurora.placeEntityX(0.65, (Aurora.entitySize * 9.5)) + ((Aurora.entitySize * 6) / 2),
						posY: isMobile ? Aurora.placeEntityY(0.53) : Aurora.placeEntityY(0.55),
						width: arcWidth,
						aglStrt: 0,
						aglEnd: (2 * Math.PI),
						lineWidth: 3,
						color: 'rgba(0, 0, 200, 0)', // transparant
						isFilled: false,
						id: 'blue-tower-range-arc-6',
						props: {},
						methodId: id
					});
				}
			}
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawButton({
						posX: Aurora.placeEntityX(0.65, (Aurora.entitySize * 9.5)),
						posY: Aurora.placeEntityY(0.53),
						width: (Aurora.entitySize * 6),
						height: (Aurora.entitySize * 6),
						lineWidth: 1,
						btnColor: 'orange',
						txtColor: 'white',
						font: '0.8em serif',
						msg: 'Build',
						isFilled: true,
						id: 'blue-right-tower-spawn-6',
						action: {
							methodId: id,
							method: function(id) {
								if (gameObject.arenaGameStarted) {
									selectTower(this.methodId, 6);
								}
							}
						},
						isModalBtn: false,
						props: {
							arcId: 'blue-tower-range-arc-6',
							selected: false,
							towerId: 0,
							type: '',
							name: '',
							stats: {
								att: 0,
								def: 0,
								spd: 0,
								hp: 0,
								lvl: 0,
								splash: 0,
							},
							robotParts: [],
							requires: {
								arenaLvlToBuild: 0,
								arenaLvlToUpgrade: 0,
							},
							directive: 0,
						},
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawRect({
						posX: !isMobile ? Aurora.placeEntityX(0.82, (Aurora.entitySize * 15.5)) : Aurora.placeEntityX(0.85, (Aurora.entitySize * 15.5)),
						posY: Aurora.placeEntityY(0.49),
						width: !isMobile ? rangeWidth : rangeWidth - (Aurora.entitySize * 1),
						height: rangeWidth,
						lineWidth: 1,
						color: 'rgba(0, 0, 200, 0)', // transparant
						isFilled: true,
						isBackground: false,
						id: 'blue-tower-range-7',
						props: {
							targetId: '',
							canShoot: true,
							towerId: 'blue-right-tower-spawn-7',
						},
						methodId: id
					});
				}
			}
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawArc({
						posX: Aurora.placeEntityX(0.85, (Aurora.entitySize * 15.5)) + ((Aurora.entitySize * 6) / 2),
						posY: isMobile ? Aurora.placeEntityY(0.53) : Aurora.placeEntityY(0.55),
						width: arcWidth,
						aglStrt: 0,
						aglEnd: (2 * Math.PI),
						lineWidth: 3,
						color: 'rgba(0, 0, 200, 0)', // transparant
						isFilled: false,
						id: 'blue-tower-range-arc-7',
						props: {},
						methodId: id
					});
				}
			}
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawButton({
						posX: Aurora.placeEntityX(0.85, (Aurora.entitySize * 15.5)),
						posY: Aurora.placeEntityY(0.53),
						width: (Aurora.entitySize * 6),
						height: (Aurora.entitySize * 6),
						lineWidth: 1,
						btnColor: 'orange',
						txtColor: 'white',
						font: '0.8em serif',
						msg: 'Build',
						isFilled: true,
						id: 'blue-right-tower-spawn-7',
						action: {
							methodId: id,
							method: function(id) {
								if (gameObject.arenaGameStarted) {
									selectTower(this.methodId, 7);
								}
							}
						},
						isModalBtn: false,
						props: {
							arcId: 'blue-tower-range-arc-7',
							selected: false,
							towerId: 0,
							type: '',
							name: '',
							stats: {
								att: 0,
								def: 0,
								spd: 0,
								hp: 0,
								lvl: 0,
								splash: 0,
							},
							robotParts: [],
							requires: {
								arenaLvlToBuild: 0,
								arenaLvlToUpgrade: 0,
							},
							directive: 0,
						},
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawRect({
						posX: !isMobile ? Aurora.placeEntityX(0.94, (Aurora.entitySize * 9.6)) : Aurora.placeEntityX(0.97, (Aurora.entitySize * 9.6)),
						posY: Aurora.placeEntityY(0.619),
						width: rangeWidth,
						height: rangeWidth,
						lineWidth: 1,
						color: 'rgba(0, 0, 200, 0)', // transparant
						isFilled: true,
						isBackground: false,
						id: 'blue-tower-range-8',
						props: {
							targetId: '',
							canShoot: true,
							towerId: 'blue-right-tower-spawn-8',
						},
						methodId: id
					});
				}
			}
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawArc({
						posX: Aurora.placeEntityX(0.94, (Aurora.entitySize * 9.6)) + ((Aurora.entitySize * 6) / 2),
						posY: isMobile ? Aurora.placeEntityY(0.66) : Aurora.placeEntityY(0.68),
						width: arcWidth,
						aglStrt: 0,
						aglEnd: (2 * Math.PI),
						lineWidth: 3,
						color: 'rgba(0, 0, 200, 0)', // transparant
						isFilled: false,
						id: 'blue-tower-range-arc-8',
						props: {},
						methodId: id
					});
				}
			}
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawButton({
						posX: Aurora.placeEntityX(0.94, (Aurora.entitySize * 9.6)),
						posY: Aurora.placeEntityY(0.66),
						width: (Aurora.entitySize * 6),
						height: (Aurora.entitySize * 6),
						lineWidth: 1,
						btnColor: 'orange',
						txtColor: 'white',
						font: '0.8em serif',
						msg: 'Build',
						isFilled: true,
						id: 'blue-right-tower-spawn-8',
						action: {
							methodId: id,
							method: function(id) {
								if (gameObject.arenaGameStarted) {
									selectTower(this.methodId, 8);
								}
							}
						},
						isModalBtn: false,
						props: {
							arcId: 'blue-tower-range-arc-8',
							selected: false,
							towerId: 0,
							type: '',
							name: '',
							stats: {
								att: 0,
								def: 0,
								spd: 0,
								hp: 0,
								lvl: 0,
								splash: 0,
							},
							robotParts: [],
							requires: {
								arenaLvlToBuild: 0,
								arenaLvlToUpgrade: 0,
							},
							directive: 0,
						},
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
		}
		function drawRedTowerSpawns() {
			let rangeWidth = 0;
			let isMobile = false;
			if (Aurora.canvas.height > Aurora.canvas.width) { // mobile
				rangeWidth = (Aurora.entitySize * 1) + (Aurora.canvas.height * 0.025);
				isMobile = true;
			} else { // everything else
				rangeWidth = (Aurora.entitySize * 1) + (Aurora.canvas.width * 0.075);
				isMobile = false;
			}
			Aurora.methodSetup = {
				method: function(id) {
					drawRect({
						posX: !isMobile ? Aurora.placeEntityX(0.08, (Aurora.entitySize * 9)) : Aurora.placeEntityX(0.11, (Aurora.entitySize * 9)),
						posY: !isMobile ? Aurora.placeEntityY(0.18) : Aurora.placeEntityY(0.25),
						width: rangeWidth,
						height: rangeWidth,
						lineWidth: 1,
						color: 'rgba(0, 0, 200, 0)', // transparant
						isFilled: true,
						isBackground: false,
						id: 'red-tower-range-1',
						props: {
							targetId: '',
							canShoot: true,
							towerId: 'red-left-tower-spawn-1',
						},
						methodId: id
					});
				}
			}
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawButton({
						posX: Aurora.placeEntityX(0.11, (Aurora.entitySize * 9)),
						posY: Aurora.placeEntityY(0.18),
						width: (Aurora.entitySize * 6),
						height: (Aurora.entitySize * 6),
						lineWidth: 1,
						btnColor: 'darkorange',
						txtColor: 'white',
						font: '0.8em serif',
						msg: '',
						isFilled: true,
						id: 'red-left-tower-spawn-1',
						action: {method: function(id) {}},
						isModalBtn: false,
						props: {
							towerId: 0,
							type: '',
							stats: {
								att: 0,
								def: 0,
								spd: 0,
								hp: 0,
								lvl: 0,
								splash: 0,
							},
							robotParts: [],
							directive: 0,
						},
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawRect({
						posX: !isMobile ? Aurora.placeEntityX(0.165, (Aurora.entitySize * 1)) : Aurora.placeEntityX(0.195, (Aurora.entitySize * 1)),
						posY: !isMobile ? Aurora.placeEntityY(0.311) : Aurora.placeEntityY(0.381),
						width: !isMobile ? rangeWidth : rangeWidth - (Aurora.entitySize * 1),
						height: rangeWidth,
						lineWidth: 1,
						color: 'rgba(0, 0, 200, 0)', // transparant
						isFilled: true,
						isBackground: false,
						id: 'red-tower-range-2',
						props: {
							targetId: '',
							canShoot: true,
							towerId: 'red-left-tower-spawn-2',
						},
						methodId: id
					});
				}
			}
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawButton({
						posX: Aurora.placeEntityX(0.195, (Aurora.entitySize * 1)),
						posY: Aurora.placeEntityY(0.311),
						width: (Aurora.entitySize * 6),
						height: (Aurora.entitySize * 6),
						lineWidth: 1,
						btnColor: 'darkorange',
						txtColor: 'white',
						font: '0.8em serif',
						msg: '',
						isFilled: true,
						id: 'red-left-tower-spawn-2',
						action: {method: function(id) {}},
						isModalBtn: false,
						props: {
							towerId: 0,
							type: '',
							stats: {
								att: 0,
								def: 0,
								spd: 0,
								hp: 0,
								lvl: 0,
								splash: 0,
							},
							robotParts: [],
							directive: 0,
						},
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawRect({
						posX: !isMobile ? Aurora.placeEntityX(0.315, (Aurora.entitySize * 1)) : Aurora.placeEntityX(0.345, (Aurora.entitySize * 1)),
						posY: !isMobile ? Aurora.placeEntityY(0.311) : Aurora.placeEntityY(0.381),
						width: !isMobile ? rangeWidth : rangeWidth - (Aurora.entitySize * 1),
						height: rangeWidth,
						lineWidth: 1,
						color: 'rgba(0, 0, 200, 0)', // transparant
						isFilled: true,
						isBackground: false,
						id: 'red-tower-range-3',
						props: {
							targetId: '',
							canShoot: true,
							towerId: 'red-left-tower-spawn-3',
						},
						methodId: id
					});
				}
			}
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawButton({
						posX: Aurora.placeEntityX(0.345, (Aurora.entitySize * 1)),
						posY: Aurora.placeEntityY(0.311),
						width: (Aurora.entitySize * 6),
						height: (Aurora.entitySize * 6),
						lineWidth: 1,
						btnColor: 'darkorange',
						txtColor: 'white',
						font: '0.8em serif',
						msg: '',
						isFilled: true,
						id: 'red-left-tower-spawn-3',
						action: {method: function(id) {}},
						isModalBtn: false,
						props: {
							towerId: 0,
							type: '',
							stats: {
								att: 0,
								def: 0,
								spd: 0,
								hp: 0,
								lvl: 0,
								splash: 0,
							},
							robotParts: [],
							directive: 0,
						},
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawRect({
						posX: !isMobile ? Aurora.placeEntityX(0.435, (Aurora.entitySize * 1)) : Aurora.placeEntityX(0.605, (Aurora.entitySize * 17.5)),
						posY: Aurora.placeEntityY(0.18),
						width: rangeWidth,
						height: !isMobile ? rangeWidth : rangeWidth + (Aurora.entitySize * 3),
						lineWidth: 1,
						color: 'rgba(0, 0, 200, 0)', // transparant
						isFilled: true,
						isBackground: false,
						id: 'red-tower-range-4',
						props: {
							targetId: '',
							canShoot: true,
							towerId: 'red-left-tower-spawn-4',
						},
						methodId: id
					});
				}
			}
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawButton({
						posX: Aurora.placeEntityX(0.49, (Aurora.entitySize * 17.5)),
						posY: Aurora.placeEntityY(0.18),
						width: (Aurora.entitySize * 6),
						height: (Aurora.entitySize * 6),
						lineWidth: 1,
						btnColor: 'darkorange',
						txtColor: 'white',
						font: '0.8em serif',
						msg: '',
						isFilled: true,
						id: 'red-left-tower-spawn-4',
						action: {method: function(id) {}},
						isModalBtn: false,
						props: {
							towerId: 0,
							type: '',
							stats: {
								att: 0,
								def: 0,
								spd: 0,
								hp: 0,
								lvl: 0,
								splash: 0,
							},
							robotParts: [],
							directive: 0,
						},
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawRect({
						posX: !isMobile ? Aurora.placeEntityX(0.465, (Aurora.entitySize * -8.5)) : Aurora.placeEntityX(0.419, (Aurora.entitySize * -8.5)),
						posY: Aurora.placeEntityY(0.18),
						width: rangeWidth,
						height: !isMobile ? rangeWidth : rangeWidth + (Aurora.entitySize * 3),
						lineWidth: 1,
						color: 'rgba(0, 0, 200, 0)', // transparant
						isFilled: true,
						isBackground: false,
						id: 'red-tower-range-5',
						props: {
							targetId: '',
							canShoot: true,
							towerId: 'red-right-tower-spawn-5',
						},
						methodId: id
					});
				}
			}
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawButton({
						posX: Aurora.placeEntityX(0.49, (Aurora.entitySize * -8.5)),
						posY: Aurora.placeEntityY(0.18),
						width: (Aurora.entitySize * 6),
						height: (Aurora.entitySize * 6),
						lineWidth: 1,
						btnColor: 'darkorange',
						txtColor: 'white',
						font: '0.8em serif',
						msg: '',
						isFilled: true,
						id: 'red-right-tower-spawn-5',
						action: {method: function(id) {}},
						isModalBtn: false,
						props: {
							towerId: 0,
							type: '',
							stats: {
								att: 0,
								def: 0,
								spd: 0,
								hp: 0,
								lvl: 0,
								splash: 0,
							},
							robotParts: [],
							directive: 0,
						},
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawRect({
						posX: !isMobile ? Aurora.placeEntityX(0.625, (Aurora.entitySize * 1)) : Aurora.placeEntityX(0.579, (Aurora.entitySize * 1)),
						posY: !isMobile ? Aurora.placeEntityY(0.311) : Aurora.placeEntityY(0.381),
						width: !isMobile ? rangeWidth : rangeWidth - (Aurora.entitySize * 1),
						height: rangeWidth,
						lineWidth: 1,
						color: 'rgba(0, 0, 200, 0)', // transparant
						isFilled: true,
						isBackground: false,
						id: 'red-tower-range-6',
						props: {
							targetId: '',
							canShoot: true,
							towerId: 'red-right-tower-spawn-6',
						},
						methodId: id
					});
				}
			}
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawButton({
						posX: Aurora.placeEntityX(0.65, (Aurora.entitySize * 9.5)),
						posY: Aurora.placeEntityY(0.311),
						width: (Aurora.entitySize * 6),
						height: (Aurora.entitySize * 6),
						lineWidth: 1,
						btnColor: 'darkorange',
						txtColor: 'white',
						font: '0.8em serif',
						msg: '',
						isFilled: true,
						id: 'red-right-tower-spawn-6',
						action: {method: function(id) {}},
						isModalBtn: false,
						props: {
							towerId: 0,
							type: '',
							stats: {
								att: 0,
								def: 0,
								spd: 0,
								hp: 0,
								lvl: 0,
								splash: 0,
							},
							robotParts: [],
							directive: 0,
						},
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawRect({
						posX: !isMobile ? Aurora.placeEntityX(0.82, (Aurora.entitySize * 15.5)) : Aurora.placeEntityX(0.85, (Aurora.entitySize * 15.5)),
						posY: !isMobile ? Aurora.placeEntityY(0.311) : Aurora.placeEntityY(0.381),
						width: !isMobile ? rangeWidth : rangeWidth - (Aurora.entitySize * 1),
						height: rangeWidth,
						lineWidth: 1,
						color: 'rgba(0, 0, 200, 0)', // transparant
						isFilled: true,
						isBackground: false,
						id: 'red-tower-range-7',
						props: {
							targetId: '',
							canShoot: true,
							towerId: 'red-right-tower-spawn-7',
						},
						methodId: id
					});
				}
			}
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawButton({
						posX: Aurora.placeEntityX(0.85, (Aurora.entitySize * 15.5)),
						posY: Aurora.placeEntityY(0.311),
						width: (Aurora.entitySize * 6),
						height: (Aurora.entitySize * 6),
						lineWidth: 1,
						btnColor: 'darkorange',
						txtColor: 'white',
						font: '0.8em serif',
						msg: '',
						isFilled: true,
						id: 'red-right-tower-spawn-7',
						action: {method: function(id) {}},
						isModalBtn: false,
						props: {
							towerId: 0,
							type: '',
							stats: {
								att: 0,
								def: 0,
								spd: 0,
								hp: 0,
								lvl: 0,
								splash: 0,
							},
							robotParts: [],
							directive: 0,
						},
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawRect({
						posX: !isMobile ? Aurora.placeEntityX(0.94, (Aurora.entitySize * 9.6)) : Aurora.placeEntityX(0.97, (Aurora.entitySize * 9.6)),
						posY: !isMobile ? Aurora.placeEntityY(0.18) : Aurora.placeEntityY(0.25),
						width: rangeWidth,
						height: rangeWidth,
						lineWidth: 1,
						color: 'rgba(0, 0, 200, 0)', // transparant
						isFilled: true,
						isBackground: false,
						id: 'red-tower-range-8',
						props: {
							targetId: '',
							canShoot: true,
							towerId: 'red-right-tower-spawn-8',
						},
						methodId: id
					});
				}
			}
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawButton({
						posX: Aurora.placeEntityX(0.94, (Aurora.entitySize * 9.6)),
						posY: Aurora.placeEntityY(0.18),
						width: (Aurora.entitySize * 6),
						height: (Aurora.entitySize * 6),
						lineWidth: 1,
						btnColor: 'darkorange',
						txtColor: 'white',
						font: '0.8em serif',
						msg: '',
						isFilled: true,
						id: 'red-right-tower-spawn-8',
						action: {method: function(id) {}},
						isModalBtn: false,
						props: {
							towerId: 0,
							type: '',
							stats: {
								att: 0,
								def: 0,
								spd: 0,
								hp: 0,
								lvl: 0,
								splash: 0,
							},
							robotParts: [],
							directive: 0,
						},
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
		}
		function drawBlueRobotRoadNavigation() {
			Aurora.methodSetup = {
				method: function(id) {
					drawRect({
						posX: Aurora.placeEntityX(0.928, (Aurora.entitySize * 9.6)),
						posY: Aurora.placeEntityY(0.26),
						width: (Aurora.entitySize * 2),
						height: (Aurora.entitySize * 2),
						lineWidth: 1,
						color: 'rgba(0, 0, 200, 0)', // transparant
						isFilled: false,
						id: 'blue-right-stop-1', // start moving down
						isBackground: false,
						props: {},
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawRect({
						posX: Aurora.placeEntityX(0.08, (Aurora.entitySize * -9.6)),
						posY: Aurora.placeEntityY(0.26),
						width: (Aurora.entitySize * 2),
						height: (Aurora.entitySize * 2),
						lineWidth: 1,
						color: 'rgba(0, 0, 200, 0)', // transparant
						isFilled: false,
						id: 'blue-left-stop-1', // start moving down
						isBackground: false,
						props: {},
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawRect({
						posX: Aurora.placeEntityX(0.928, (Aurora.entitySize * 9.6)),
						posY: Aurora.placeEntityY(0.42),
						width: (Aurora.entitySize * 4),
						height: (Aurora.entitySize * 2),
						lineWidth: 1,
						color: 'rgba(0, 0, 200, 0)', // transparant
						isFilled: false,
						id: 'blue-right-stop-2', // start moving left
						isBackground: false,
						props: {},
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawRect({
						posX: Aurora.placeEntityX(0.06, (Aurora.entitySize * -9.6)),
						posY: Aurora.placeEntityY(0.42),
						width: (Aurora.entitySize * 4),
						height: (Aurora.entitySize * 2),
						lineWidth: 1,
						color: 'rgba(0, 0, 200, 0)', // transparant
						isFilled: false,
						id: 'blue-left-stop-2', // start moving right
						isBackground: false,
						props: {},
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawRect({
						posX: Aurora.placeEntityX(0.495),
						posY: Aurora.placeEntityY(0.42),
						width: (Aurora.entitySize * 1),
						height: (Aurora.entitySize * 2),
						lineWidth: 1,
						color: 'rgba(0, 0, 200, 0)', // transparant
						isFilled: false,
						id: 'blue-stop-3', // start moving up
						isBackground: false,
						props: {},
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
		}
		function drawRedRobotRoadNavigation() {
			Aurora.methodSetup = {
				method: function(id) {
					drawRect({
						posX: Aurora.placeEntityX(0.928, (Aurora.entitySize * 9.6)),
						posY: Aurora.placeEntityY(0.62),
						width: (Aurora.entitySize * 2),
						height: (Aurora.entitySize * 2),
						lineWidth: 1,
						color: 'rgba(0, 0, 200, 0)', // transparant
						isFilled: false,
						id: 'red-right-stop-1', // start moving down
						isBackground: false,
						props: {},
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawRect({
						posX: Aurora.placeEntityX(0.08, (Aurora.entitySize * -9.6)),
						posY: Aurora.placeEntityY(0.62),
						width: (Aurora.entitySize * 2),
						height: (Aurora.entitySize * 2),
						lineWidth: 1,
						color: 'rgba(0, 0, 200, 0)', // transparant
						isFilled: false,
						id: 'red-left-stop-1', // start moving down
						isBackground: false,
						props: {},
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawRect({
						posX: Aurora.placeEntityX(0.928, (Aurora.entitySize * 9.6)),
						posY: Aurora.placeEntityY(0.46),
						width: (Aurora.entitySize * 4),
						height: (Aurora.entitySize * 2),
						lineWidth: 1,
						color: 'rgba(0, 0, 200, 0)', // transparant
						isFilled: false,
						id: 'red-right-stop-2', // start moving left
						isBackground: false,
						props: {},
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawRect({
						posX: Aurora.placeEntityX(0.06, (Aurora.entitySize * -9.6)),
						posY: Aurora.placeEntityY(0.46),
						width: (Aurora.entitySize * 4),
						height: (Aurora.entitySize * 2),
						lineWidth: 1,
						color: 'rgba(0, 0, 200, 0)', // transparant
						isFilled: false,
						id: 'red-left-stop-2', // start moving right
						isBackground: false,
						props: {},
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawRect({
						posX: Aurora.placeEntityX(0.495),
						posY: Aurora.placeEntityY(0.46),
						width: (Aurora.entitySize * 1),
						height: (Aurora.entitySize * 2),
						lineWidth: 1,
						color: 'rgba(0, 0, 200, 0)', // transparant
						isFilled: false,
						id: 'red-stop-3', // start moving down
						isBackground: false,
						props: {},
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
		}
		function drawPlayerMoney() {
			Aurora.methodSetup = {
				method: function(id) {
					drawRect({
						posX: Aurora.placeEntityX(0.01),
						posY: Aurora.placeEntityY(0),
						width: (Aurora.entitySize * 18),
						height: (Aurora.canvas.height * 0.10),
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
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawText({
						font: '1em serif',
						msg: 'Funds',
						posX: Aurora.placeEntityX(0.04),
						posY: Aurora.placeEntityY(0.03),
						color: 'white',
						align: 'left',
						props: {},
						id: 'player-money-title',
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawText({
						font: '1.5em serif',
						msg: '$' + gameObject.arenaBlueGameMoney,
						posX: Aurora.placeEntityX(0.04),
						posY: Aurora.placeEntityY(0.07),
						color: 'white',
						align: 'left',
						props: {},
						id: 'player-money-amount-title',
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
		}
		function drawRoundTime() {
			Aurora.methodSetup = {
				method: function(id) {
					drawRect({
						posX: Aurora.placeEntityX(0.99, (Aurora.entitySize * 36)),
						posY: Aurora.placeEntityY(0),
						width: (Aurora.entitySize * 18),
						height: (Aurora.canvas.height * 0.10),
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
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawText({
						font: '1.5em serif',
						msg: gameObject.arenaRoundSeconds + 's',
						posX: Aurora.placeEntityX(0.99, (Aurora.entitySize * 34)),
						posY: Aurora.placeEntityY(0.04),
						color: 'white',
						align: 'left',
						props: {},
						id: 'player-round-time-title',
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawText({
						font: '1em serif',
						msg: 'Turn: ' + gameObject.arenaGameRound + '/' + gameObject.arenaGameMaxRounds,
						posX: Aurora.placeEntityX(0.99, (Aurora.entitySize * 34)),
						posY: Aurora.placeEntityY(0.08),
						color: 'white',
						align: 'left',
						props: {},
						id: 'player-round-number-title',
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
		}
		function readySetGoGame() {
			if (gameObject.gameSounds) {
				arenaReadySound.play();
			}
			Aurora.methodSetup = {
				method: function(id) {
					drawRect({
						posX: Aurora.placeEntityX(0.50, (Aurora.entitySize * 40)),
						posY: Aurora.placeEntityY(0.50, (Aurora.entitySize * 30)),
						width: (Aurora.entitySize * 40),
						height: (Aurora.entitySize * 30),
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
			Aurora.addMethod(Aurora.methodSetup);
			Aurora.methodSetup = {
				method: function(id) {
					drawText({
						font: '2em serif',
						msg: 'Battle Stations!',
						posX: Aurora.placeEntityX(0.50),
						posY: Aurora.placeEntityY(0.52),
						color: 'white',
						align: 'center',
						props: {},
						id: 'arena-game-ready-title',
						methodId: id
					});
				}
			};
			Aurora.addMethod(Aurora.methodSetup);
			setTimeout(function() {
				const gameStartBackground = Aurora.methodObjects.find(bg => bg.id === 'arena-game-ready-background');
				const gameStartTitle = Aurora.methodObjects.find(title => title.id === 'arena-game-ready-title');
				if (gameStartTitle) {
					gameStartBackground.isAnim = true;
					gameStartTitle.msg = 'Get Ready';
				}
			}, 2000);
			setTimeout(function() {
				const gameStartBackground = Aurora.methodObjects.find(bg => bg.id === 'arena-game-ready-background');
				const gameStartTitle = Aurora.methodObjects.find(title => title.id === 'arena-game-ready-title');
				if (gameStartTitle) {
					gameStartBackground.isAnim = true;
					gameStartTitle.msg = 'Fight!';
				}
			}, 4500);
			setTimeout(function() {
				const gameStartBackground = Aurora.methodObjects.find(bg => bg.id === 'arena-game-ready-background');
				const gameStartTitle = Aurora.methodObjects.find(title => title.id === 'arena-game-ready-title');
				Aurora.deleteEntity(gameStartBackground.methodId);
				Aurora.deleteEntity(gameStartTitle.methodId);
				// start the game round timer and round numbers
				if (!gameObject.arenaGameStarted) {
					startGameRounds();
				}
			}, 5500);
			
		}
		function startGameRounds() {
			gameObject.arenaGameStarted = true;
			const roundTimer = Aurora.methodObjects.find(bg => bg.id === 'player-round-time-title');
			const roundBackground = Aurora.methodObjects.find(bg => bg.id === 'round-bar-background');
			const roundCounter = Aurora.methodObjects.find(bg => bg.id === 'player-round-number-title');
			gameTimer = setInterval(function() {
				if (gameObject.arenaRoundSeconds > 0) {
					gameObject.arenaRoundSeconds--;
					roundTimer.msg = gameObject.arenaRoundSeconds + 's';
					roundCounter.msg = 'Turn: ' + gameObject.arenaGameRound + '/' + gameObject.arenaGameMaxRounds;
				} else if(gameObject.arenaRoundSeconds === 0) {
					// add to the players money
					gameObject.arenaBlueGameMoney += (gameObject.arenaBlueSendLeeRoyCount * robotMoneyGained.leeRoy);
					gameObject.arenaBlueGameMoney += (gameObject.arenaBlueSendTankCount * robotMoneyGained.tank);
					gameObject.arenaBlueGameMoney += (gameObject.arenaBlueSendCount * 2);
					// add to the COMs money
					gameObject.arenaRedGameMoney += (gameObject.arenaRedSendLeeRoyCount * robotMoneyGained.leeRoy);
					gameObject.arenaRedGameMoney += (gameObject.arenaRedSendTankCount * robotMoneyGained.tank);
					gameObject.arenaRedGameMoney += (gameObject.arenaRedSendCount * 2);
					gameObject.arenaGameRound++;
					gameObject.arenaRoundSeconds = 15;
					const blueMoney = Aurora.methodObjects.find(bg => bg.id === 'player-money-amount-title');
					// reset send robot buttons
					const sendRobotsLeft = Aurora.methodObjects.find(bs => bs.id === 'send-robots-left');
					sendRobotsLeft.btnColor = 'grey';
					const sendRobotsRight = Aurora.methodObjects.find(bs => bs.id === 'send-robots-right');
					sendRobotsRight.btnColor = 'grey';
					// every turn except the last turn
					if (gameObject.arenaGameRound <= 12) {
						roundTimer.msg = gameObject.arenaRoundSeconds + 's';
						roundCounter.msg = 'Turn: ' + gameObject.arenaGameRound + '/' + gameObject.arenaGameMaxRounds;
						blueMoney.msg = '$' + gameObject.arenaBlueGameMoney;
						Particle.floatingText({
							font: '2rem serif',
							msg: '+      +',
							align: 'left',
							posX: Aurora.placeEntityX(0.023),
							posY: Aurora.placeEntityY(0.07),
							direction: 'top',
							color: 'green',
							ticks: 33,
							speed: 0.1,
						});
					}
					// the very last turn. End game
					if (gameObject.arenaGameRound === 13) {
						const redBase = Aurora.methodObjects.find(bs => bs.id === 'red-base');
						const blueBase = Aurora.methodObjects.find(bs => bs.id === 'blue-base');
						let winningTeam = '';
						if (redBase.props.hp > blueBase.props.hp) {
							winningTeam = 'red';
						} else if (blueBase.props.hp > redBase.props.hp) {
							winningTeam = 'blue';
						} else {
							winningTeam = 'draw';
						}
						endGame(winningTeam);
					}
				}
				roundBackground.isAnim = true;
			}, 1000);
		}
		function moveRobotSpellWallCheck(br, teamColor) {
			// if there's a wall, see if the robot is behind the wall of in front of it
			if (teamColor === 'blue' && br.halted && spellWallCollisions.teamBlueIds.length > 0) {
				const lessThan = !!spellWallCollisions.teamBlueIds.filter(team => team.countId > br.robotCount && team.direction === br.direction).length;
				if (lessThan) {
					br.halted = false;
				}
			} else if (teamColor === 'red' && br.halted && spellWallCollisions.teamRedIds.length > 0) {
				const lessThan = !!spellWallCollisions.teamRedIds.filter(team => team.countId > br.robotCount && team.direction === br.direction).length;
				if (lessThan) {
					br.halted = false;
				}
			} else {
				// if there is no wall, move all the halted robots
				if (teamColor === 'blue' && br.halted && spellWallCollisions.teamBlueIds.length === 0) {
					br.halted = false;
				} else if (teamColor === 'red' && br.halted && spellWallCollisions.teamRedIds.length === 0) {
					br.halted = false;
				}
			}
		}
		function moveBlueRobots() {
			gameObject.arenaBlueAttackers.forEach((battleRobot, i) => {
				const robot = Aurora.methodObjects.filter(rob => rob.id === battleRobot.id);
				moveRightRobots(battleRobot, robot, 'blue', i);
				moveLeftRobots(battleRobot, robot, 'blue', i);
				moveRobotSpellWallCheck(battleRobot, 'blue');
			});
		}
		function moveRedRobots() {
			gameObject.arenaRedAttackers.forEach((battleRobot, i) => {
				const robot = Aurora.methodObjects.filter(rob => rob.id === battleRobot.id);
				moveRightRobots(battleRobot, robot, 'red', i);
				moveLeftRobots(battleRobot, robot, 'red', i);
				moveRobotSpellWallCheck(battleRobot, 'red');
			});
		}
		function deleteRobotMethodObject(robot, entitySize) {
			for (let i = 0; i < robot.length; i++) {
				// make the robot explode where the body is
				if (i === 0) {
					Particle.drawSpark({
						posX: robot[i].posX,
						posY: robot[i].posY,
						shape: Particle.enumShapes.rect,
						color: 'yellow',
						ticks: 11,
						count: 8,
						size: (Aurora.entitySize * entitySize),
						speed: 1.3,
					});
				}
				Aurora.deleteEntity(robot[i].methodId);
			}
		}
		function robotAttackBase(base, robot, i, color) {
			if (base) {
				if (gameObject.gameSounds) {
					towerExplosionSound.cloneNode(true).play();
				}
				base.props.hp--;
				base.msg = 'HP: ' + base.props.hp;
				// remove the robot and all of its parts
				deleteRobotMethodObject(robot, 1);
				if (color === 'blue') {
					gameObject.arenaBlueAttackers.splice(i, 1);
				} else if (color === 'red') {
					gameObject.arenaRedAttackers.splice(i, 1);
				}
			}
		}
		function moveRightRobots(br, robot, teamColor, i) {
			if (!br.halted) {
				const robotSpeed = (br.totalStats.spd) * 0.01;
				if (br.direction === 'rt' && br.stop === 0) {
					robot.forEach((rob, j) => {
						rob.posX -= Aurora.moveEntity((0.11 + robotSpeed), Aurora.enumDirections.leftRight);
						br.posX = rob.posX;
					});
				}
				if (br.direction === 'rt' && br.stop === 1) {
					robot.forEach((rob, j) => {
						if (teamColor === 'blue') {
							rob.posY += Aurora.moveEntity((0.05 + robotSpeed), Aurora.enumDirections.topDown);
							br.posY = rob.posY;
						} else if (teamColor === 'red') {
							rob.posY -= Aurora.moveEntity((0.05 + robotSpeed), Aurora.enumDirections.topDown);
							br.posY = rob.posY;
						}
					});
				}
				if (br.direction === 'rt' && br.stop === 2) {
					robot.forEach((rob, j) => {
						rob.posX -= Aurora.moveEntity((0.11 + robotSpeed), Aurora.enumDirections.leftRight);
						br.posX = rob.posX;
					});
				}
				if (br.direction === 'rt' && br.stop === 3) {
					robot.forEach((rob, j) => {
						if (teamColor === 'blue') {
							rob.posY -= Aurora.moveEntity((0.05 + robotSpeed), Aurora.enumDirections.topDown);
							br.posY = rob.posY;
						} else if (teamColor === 'red') {
							rob.posY += Aurora.moveEntity((0.05 + robotSpeed), Aurora.enumDirections.topDown);
							br.posY = rob.posY;
						}
						
					});
				}
				if (br.direction === 'rt' && br.stop === 4) {
					// start attacking red or blue base
					
					// future Jordan, look into some of the buttons and backrounds that use "Aurora.entitySize"
					// some of the styles look a little off when switching between some of the different IOS and Android mobile screens
					if (teamColor === 'blue') {
						const redBase = Aurora.methodObjects.find(bs => bs.id === 'red-base');
						robotAttackBase(redBase, robot, i, teamColor);
						if (redBase.props.hp <= 0) {
							endGame('blue');
						}
					} else if (teamColor === 'red') {
						const blueBase = Aurora.methodObjects.find(bg => bg.id === 'blue-base');
						robotAttackBase(blueBase, robot, i, teamColor);
						if (blueBase.props.hp <= 0) {
							endGame('red');
						}
					}
				}
			}
		}
		function moveLeftRobots(br, robot, teamColor, i) {
			if (!br.halted) {
				const robotSpeed = (br.totalStats.spd) * 0.01;
				if (br.direction === 'lt' && br.stop === 0) {
					robot.forEach((rob, j) => {
						rob.posX += Aurora.moveEntity((0.11 + robotSpeed), Aurora.enumDirections.leftRight);
						br.posX = rob.posX;
					});
				}
				if (br.direction === 'lt' && br.stop === 1) {
					robot.forEach((rob, j) => {
						if (teamColor === 'blue') {
							rob.posY += Aurora.moveEntity((0.05 + robotSpeed), Aurora.enumDirections.topDown);
							br.posY = rob.posY;
						} else if (teamColor === 'red') {
							rob.posY -= Aurora.moveEntity((0.05 + robotSpeed), Aurora.enumDirections.topDown);
							br.posY = rob.posY;
						}
					});
				}
				if (br.direction === 'lt' && br.stop === 2) {
					robot.forEach((rob, j) => {
						rob.posX += Aurora.moveEntity((0.11 + robotSpeed), Aurora.enumDirections.leftRight);
						br.posX = rob.posX;
					});
				}
				if (br.direction === 'lt' && br.stop === 3) {
					robot.forEach((rob, j) => {
						if (teamColor === 'blue') {
							rob.posY -= Aurora.moveEntity((0.05 + robotSpeed), Aurora.enumDirections.topDown);
							br.posY = rob.posY;
						} else if (teamColor === 'red') {
							rob.posY += Aurora.moveEntity((0.05 + robotSpeed), Aurora.enumDirections.topDown);
							br.posY = rob.posY;
						}
					});
				}
				if (br.direction === 'lt' && br.stop === 4) {
					// start attacking red or blue base
					if (teamColor === 'blue') {
						const redBase = Aurora.methodObjects.find(bs => bs.id === 'red-base');
						robotAttackBase(redBase, robot, i, teamColor);
						if (redBase.props.hp <= 0) {
							endGame('blue');
						}
					} else if (teamColor === 'red') {
						const blueBase = Aurora.methodObjects.find(bg => bg.id === 'blue-base');
						robotAttackBase(blueBase, robot, i, teamColor);
						if (blueBase.props.hp <= 0) {
							endGame('red');
						}
					}
				}
			}
		}
		function castRedSpell(spellType) {
			castSpell(gameObject.redSpellTarget, spellType, undefined, 'red');
			gameObject.redSpellTarget.tappedX = 0;
			gameObject.redSpellTarget.tappedY = 0;
		}
		function redAiMind() {
			if (gameObject.arenaGameStarted) {
				let whatToDo = Math.floor((Math.random() * 3) + 1);
				// select a robot to send
				const redBotIndex = Math.floor((Math.random() * gameObject.redRobotArenaDesigns.length));
				const redBot = Object.assign({}, gameObject.redRobotArenaDesigns[redBotIndex]);
				const robotDirective = redBot.directive;
				const robotCost = findRobotDirectiveCost(robotDirective);
				// select a tower to build
				const redTowerIndex = Math.floor((Math.random() * gameObject.redTowerArenaDesigns.length));
				let redTower = Object.assign({}, gameObject.redTowerArenaDesigns[redTowerIndex]);
				const arenaTower = Object.assign({}, gameObject.redTowerArenaDesigns[redTowerIndex].arenaTower);
				const towerRequires = Object.assign({}, gameObject.redTowerArenaDesigns[redTowerIndex].arenaTower.requires);
				const towerStats = Object.assign({}, gameObject.redTowerArenaDesigns[redTowerIndex].arenaTower.stats);
				arenaTower.stats = towerStats;
				arenaTower.requires = towerRequires;
				redTower.arenaTower = arenaTower;
				// we will need a robotParts here as well one day
				// we need a requires here
				const towerDirective = redTower.directive;
				const towerCost = findTowerDirectiveCost(towerDirective);
				if (whatToDo === 1 && gameObject.arenaRedGameMoney >= towerCost) {
					// build a tower
					const redLeftTowers = Aurora.methodObjects.filter(x => x.id.includes('red-left-tower-spawn'));
					const redRightTowers = Aurora.methodObjects.filter(x => x.id.includes('red-right-tower-spawn'));
					const availableRedLeftTowers = redLeftTowers.filter(x => x.props.towerId === 0);
					const availableRedRightTowers = redRightTowers.filter(x => x.props.towerId === 0);
					let whereToBuild = Math.floor((Math.random() * 2) + 1);
					if (availableRedLeftTowers.length > 0 && whereToBuild === 1) {
						// build left
						const redBuildTowerIndex = Math.floor((Math.random() * availableRedLeftTowers.length));
						const selectedRedTower = availableRedLeftTowers[redBuildTowerIndex];
						gameObject.arenaRedGameMoney -= towerCost;
						selectedRedTower.btnColor = redTower.arenaTower.img;
						selectedRedTower.props.robotParts = redTower.arenaTower.robotParts;
						selectedRedTower.props.stats = redTower.arenaTower.stats;
						selectedRedTower.props.towerId = redTower.arenaTower.towerId;
						selectedRedTower.props.type = redTower.arenaTower.type;
						selectedRedTower.props.directive = redTower.directive;
						selectedRedTower.props.requires = redTower.arenaTower.requires;
						selectedRedTower.msg = 'HP: ' + redTower.arenaTower.stats.hp;
						selectedRedTower.font = '0.7em serif';
					} else if (availableRedRightTowers.length > 0 && whereToBuild === 2) {
						// build right
						const redBuildTowerIndex = Math.floor((Math.random() * availableRedRightTowers.length));
						const selectedRedTower = availableRedRightTowers[redBuildTowerIndex];
						gameObject.arenaRedGameMoney -= towerCost;
						selectedRedTower.btnColor = redTower.arenaTower.img;
						selectedRedTower.props.robotParts = redTower.arenaTower.robotParts;
						selectedRedTower.props.stats = redTower.arenaTower.stats;
						selectedRedTower.props.towerId = redTower.arenaTower.towerId;
						selectedRedTower.props.type = redTower.arenaTower.type;
						selectedRedTower.props.directive = redTower.directive;
						selectedRedTower.props.requires = redTower.arenaTower.requires;
						selectedRedTower.msg = 'HP: ' + redTower.arenaTower.stats.hp;
						selectedRedTower.font = '0.7em serif';
					} else if (availableRedRightTowers.length === 0 && availableRedLeftTowers.length === 0) {
						// upgrade a tower
						let whereToUpgrade = Math.floor((Math.random() * 2) + 1);
						let redUpgradeTowerIndex;
						let selectedRedTower;
						if (whereToUpgrade === 1) {
							redUpgradeTowerIndex = Math.floor((Math.random() * redLeftTowers.length));
							selectedRedTower = redLeftTowers[redUpgradeTowerIndex];
							const upgradeCost = findTowerDirectiveCost(selectedRedTower.props.directive);
							gameObject.arenaRedGameMoney -= upgradeCost * (selectedRedTower.props.stats.lvl);
						} else if (whereToUpgrade === 2) {
							redUpgradeTowerIndex = Math.floor((Math.random() * redRightTowers.length));
							selectedRedTower = redRightTowers[redUpgradeTowerIndex];
							const upgradeCost = findTowerDirectiveCost(selectedRedTower.props.directive);
							gameObject.arenaRedGameMoney -= upgradeCost * (selectedRedTower.props.stats.lvl);
						}
						if (selectedRedTower.props.stats.lvl < gameObject.redMaxTowerLevel) {
							selectedRedTower.props.stats.att += upgradeTowerStats.att;
							selectedRedTower.props.stats.def += upgradeTowerStats.def;
							selectedRedTower.props.stats.hp += upgradeTowerStats.hp;
							selectedRedTower.props.stats.spd += upgradeTowerStats.spd;
							selectedRedTower.props.stats.splash += upgradeTowerStats.splash;
							selectedRedTower.props.stats.lvl += upgradeTowerStats.lvl;
							selectedRedTower.msg = 'HP: ' + selectedRedTower.props.stats.hp;
						} else {
							// send a robot
							whatToDo = 2;
						}
					}
				} else {
					// send a robot
					whatToDo = 2;
				}
				if (whatToDo === 2 && gameObject.arenaRedGameMoney >= robotCost || 
					whatToDo === 3 && gameObject.arenaRedGameMoney >= robotCost) {
					// send a robot
					const whereToSend = Math.floor((Math.random() * 2) + 1);
					if (whereToSend === 1) {
						sendRedRobotLeft(redBot);
					} else if (whereToSend === 2) {
						sendRedRobotRight(redBot);
					}
				}
				// see if red will cast a spell
				if (gameObject.gamesWon >= 1) {
					let canRedCast = Math.floor((Math.random() * 3) + 1);
					if (canRedCast === 1 && (gameObject.canRedCastWall || gameObject.canRedCastEmp)) { // 1 and 3 chance of casting a spell
						let whatToCast = Math.floor((Math.random() * 2) + 1);
						let spellType = '';
						if (gameObject.redSpellTarget.tappedX !== 0 && gameObject.redSpellTarget.tappedY !== 0) {
							if (whatToCast === 1 && gameObject.canRedCastWall) {
								spellType = 'wall';
								castRedSpell(spellType);
							} else if (whatToCast === 2 && gameObject.canRedCastEmp) {
								spellType = 'emp';
								castRedSpell(spellType);
							}
						}
					}
				}
				aiThinking = false;
			}
		}
		function endGame(winningTeam) {
			if (gameTimer) {
				clearInterval(gameTimer);
			}
			setTimeout(function() {
				gameObject.selectedRobot = [];
				gameObject.arenaBlueAttackers = [];
				gameObject.arenaRedAttackers = [];
				gameObject.redRobotArenaDesigns = [];
				gameObject.redTowerArenaDesigns = [];
				gameObject.selectedRobotDesign = -1;
				gameObject.arenaGameRound = 1;
				gameObject.redMaxTowerLevel = 1;
				gameObject.arenaRoundSeconds = 15;
				gameObject.arenaBlueGameMoney = 160;
				gameObject.arenaRedGameMoney = 160;
				gameObject.arenaBlueSendCount = 0;
				gameObject.arenaBlueSendLeeRoyCount = 0;
				gameObject.arenaBlueSendTankCount = 0;
				gameObject.arenaRedSendCount = 0;
				gameObject.arenaRedSendLeeRoyCount = 0;
				gameObject.arenaRedSendTankCount = 0;
				gameObject.arenaGameStarted = false;
				gameObject.canClick = true;
				gameObject.wallReady = false;
				gameObject.empReady = false;
				gameObject.spellEmpTimer = 50;
				gameObject.spellWallTimer = 25;
				gameObject.redSpellTarget = {
					tappedX: 0,
					tappedY: 0,
				};
				gameObject.canRedCastWall = true;
				gameObject.canRedCastEmp = true;
				Aurora.canvas.width = window.innerWidth * Aurora.stageWidthPrct;
				Aurora.canvas.height = window.innerHeight * Aurora.stageHeightPrct;
				Aurora.entitySize = (Aurora.canvas.height * 0.01);
				Aurora.entityWidth = (Aurora.canvas.width * 0.01);
				drawWinnerModal(winningTeam);
			}, 0);
		}
		function drawWinnerModal(winningTeam) { // winningTeam can be red, blue or draw
			closeBuildTowerModal();
			closeUpdateTowerModal();
			let msgs = [];
			if (winningTeam === 'red') {
				msgs = ['Red Team Wins!', '', '', '', '- Tap here to continue -'];
				gameObject.gamesLost += 1;
			} else if (winningTeam === 'draw') {
				msgs = ['Draw!', '', '', '', '- Tap here to continue -'];
			} else if (winningTeam === 'blue') {
				const newPart = Math.floor((Math.random() * 4) + 1);
				let unlockPart = '';
				if (newPart === 4) { // 1 and 4 chance to unlock a part
					unlockPart = unlockRobotPart();
				}
				const prizeMoney = gameObject.arenaLevel * 25;
				const prizePool = [
					{ money: 'mythryl', price: 0 },
					{ money: 'iridium', price: 0 },
					{ money: 'platinum', price: 0 },
					{ money: 'gold', price: 0 },
					{ money: 'silver', price: 0 },
					{ money: 'nickel', price: 0 },
					{ money: 'bronze', price: 0 },
					{ money: 'copper', price: prizeMoney }
				];
				const formatPrizePool = addUpPrizePool(prizePool);
				addFunds(formatPrizePool.funds);
				const displayPool = formatDisplayValue(formatPrizePool.display);
				
				const highValueDisplay = displayPool.highValue.type !== '' ? displayPool.highValue.type + ': +' + displayPool.highValue.value : '';
				const lowValueDisplay = displayPool.lowValue.type !== '' ? displayPool.lowValue.type + ': +' + displayPool.lowValue.value : '';
				
				msgs = ['Blue Team Wins!', highValueDisplay, lowValueDisplay, unlockPart, '- Tap here to continue -'];
				gameObject.gamesWon += 1;
			}
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
								Aurora.keepPreviousSize = false;
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
		function unlockRobotPart() {
			let partSelection = '';
			// check to see if all the parts are maxed out
			if (gameObject.discoveredChassis.length >= robotChassis.length &&
			gameObject.discoveredHeads.length >= robotHeads.length &&
			gameObject.discoveredLegs.length >= robotLegs.length &&
			gameObject.discoveredArms >= robotArms.length) {
				return partSelection;
			} else { // find a robot part
				let foundPart = false;
				while(!foundPart) { // future Jordan, this will need to be looked at again...
					const selectSection = Math.floor((Math.random() * 4) + 1); // chassis, heads, arms or legs
					if (selectSection === 1 && gameObject.discoveredChassis.length < robotChassis.length) {
						const findChassis = Math.floor((Math.random() * robotChassis.length));
						const unlockChassis = gameObject.discoveredChassis.find(x => x.chassisId === robotChassis[findChassis].chassisId);
						if (!unlockChassis) {
							const newChassis = Object.assign({}, robotChassis[findChassis]);
							gameObject.discoveredChassis.push(newChassis);
							partSelection += 'New Chassis Part Discovered!';
							foundPart = true;
							return partSelection;
						} else {
							foundPart = false;
						}
					} else if (selectSection === 2 && gameObject.discoveredHeads.length < robotHeads.length) {
						const findHead = Math.floor((Math.random() * robotHeads.length));
						const unlockHead = gameObject.discoveredHeads.find(x => x.headId === robotHeads[findHead].headId);
						if (!unlockHead) {
							const newHead = Object.assign({}, robotHeads[findHead]);
							gameObject.discoveredHeads.push(newHead);
							partSelection += 'New Head Part Discovered!';
							foundPart = true;
							return partSelection;
						} else {
							foundPart = false;
						}
					} else if (selectSection === 3 && gameObject.discoveredLegs.length < robotLegs.length) {
						const findLeg = Math.floor((Math.random() * robotLegs.length));
						const unlockLeg = gameObject.discoveredLegs.find(x => x.legId === robotLegs[findLeg].legId);
						if (!unlockLeg) {
							const newLeg = Object.assign({}, robotLegs[findLeg]);
							gameObject.discoveredLegs.push(newLeg);
							partSelection += 'New Leg Part Discovered!';
							foundPart = true;
							return partSelection;
						} else {
							foundPart = false;
						}
					} else if (selectSection === 4 && gameObject.discoveredArms.length < robotArms.length) {
						const findArm = Math.floor((Math.random() * robotArms.length));
						const unlockArm = gameObject.discoveredArms.find(x => x.armId === robotArms[findArm].armId);
						if (!unlockArm) {
							const newArm = Object.assign({}, robotArms[findArm]);
							gameObject.discoveredArms.push(newArm);
							partSelection += 'New Arm Part Discovered!';
							foundPart = true;
							return partSelection;
						} else {
							foundPart = false;
						}
					}
				}
			}
		}
		function findTowerDirectiveName(index) {
			let directiveName = '';
			if (gameObject.towerArenaDesigns[index].directive === 1 && gameObject.towerArenaDesigns[index].arenaTower.type !== 'bunker') {
				directiveName = 'Standard';
			}
			if (gameObject.towerArenaDesigns[index].directive === 2 && gameObject.towerArenaDesigns[index].arenaTower.type !== 'bunker') {
				directiveName = 'Splash-Shot';
			} else if (gameObject.towerArenaDesigns[index].directive === 2 && gameObject.towerArenaDesigns[index].arenaTower.type === 'bunker') {
				directiveName = 'Standard';
			}
			if (gameObject.towerArenaDesigns[index].directive === 3 && gameObject.towerArenaDesigns[index].arenaTower.type !== 'bunker') {
				directiveName = 'Rapid-Shot';
			} else if (gameObject.towerArenaDesigns[index].directive === 3 && gameObject.towerArenaDesigns[index].arenaTower.type === 'bunker') {
				directiveName = 'Rapid';
			}
			if (gameObject.towerArenaDesigns[index].directive === 4 && gameObject.towerArenaDesigns[index].arenaTower.type !== 'bunker') {
				directiveName = 'Ram-Shot';
			} else if (gameObject.towerArenaDesigns[index].directive === 4 && gameObject.towerArenaDesigns[index].arenaTower.type === 'bunker') {
				directiveName = 'Defense';
			} 
			
			return directiveName;
		}
		function resetTowerSelect() {
			const towerOne = Aurora.methodObjects.find(bg => bg.id === 'arena-tower-bg-1');
			if (towerOne) {
				towerOne.color = 'darkgrey';
			}
			const towerTwo = Aurora.methodObjects.find(bg => bg.id === 'arena-tower-bg-2');
			if (towerTwo) {
				towerTwo.color = 'darkgrey';
			}
			const towerThree = Aurora.methodObjects.find(bg => bg.id === 'arena-tower-bg-3');
			if (towerThree) {
				towerThree.color = 'darkgrey';
			}
		}
		function selectBuildTower(tower, index) {
			const directiveName = findTowerDirectiveName(index);
			const selectedTowerDesign = gameObject.towerArenaDesigns[index];
			const towerCost = findTowerDirectiveCost(selectedTowerDesign.directive);
			selectBuildTowerIndex = index;
			msgs = [selectedTowerDesign.arenaTower.name ? selectedTowerDesign.arenaTower.name : 'Nothing Selected', directiveName + ': $' + towerCost];
			const modal = Aurora.methodObjects.find(bg => bg.id === Aurora.modalId);
			if (modal) {
				modal.msgs = msgs;
			}
			resetTowerSelect();
			const towerBg = Aurora.methodObjects.find(bg => bg.id === 'arena-tower-bg-' + (index + 1));
			if (towerBg) {
				towerBg.color = 'yellow';
			}
			const returnTower = {
				directiveName: directiveName,
				selectedTowerDesign: selectedTowerDesign
			}
			return returnTower;
		}
		function selectUpgradeTowerMenu(tower, towerIndex) {
			let msgs = [];
			const towerLevel = tower.props.stats.lvl + 1;
			const towerCost = findTowerDirectiveCost(tower.props.directive);
			let upgradeIssue = false;
			if (gameObject.arenaLevel >= tower.props.requires.arenaLvlToUpgrade) {
				msgs = ['Upgrade To Level ' + towerLevel,
						'Cost: $' + towerCost * (towerLevel),
						'Attack: ' + tower.props.stats.att + '| +' + upgradeTowerStats.att,
						'Defense: ' + tower.props.stats.def + '| +' + upgradeTowerStats.def,
						'Health: ' + tower.props.stats.hp + '| +' + upgradeTowerStats.hp,
						'Speed: ' + tower.props.stats.spd + '| +' + upgradeTowerStats.spd,
						'Splash: ' + tower.props.stats.splash + '| +' + upgradeTowerStats.splash,
						];
			} else if (towerLevel > 5) {
				msgs = ['This Towers Level is maxed out!', 'No further upgrades can be made'];
				upgradeIssue = true;
			} else if (gameObject.arenaLevel < tower.props.requires.arenaLvlToUpgrade) {
				msgs = ['Upgrade To Level ' + towerLevel, 'To upgrade this tower, your arena', 'needs to be level: ' + tower.props.requires.arenaLvlToUpgrade];
				upgradeIssue = true;
			}
			Aurora.methodSetup = {
				layer: 1,
				method: function(id) {
					drawDialogueModal({
						posX: Aurora.placeEntityX(0.07),
						posY: Aurora.placeEntityY(0.25, (Aurora.entitySize * 30)),
						width: (Aurora.canvas.width * 0.85),
						height: (Aurora.entitySize * 65),
						lineWidth: 1,
						modalColor: 'grey',
						msgColor: 'white',
						msgFont: '1em serif',
						msgs: msgs,
						msgStart: Aurora.placeEntityY(0.30, (Aurora.entitySize * 30)),
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
			if (gameObject.arenaLevel >= tower.props.requires.arenaLvlToUpgrade && towerLevel < 6 && !upgradeIssue) {
				Aurora.methodSetup = {
					layer: 1,
					method: function(id) {
						drawButton({
							posX: Aurora.placeEntityX(0.47, (Aurora.entitySize * 40)),
							posY: Aurora.placeEntityY(0.70, (Aurora.entitySize * 30)),
							width: (Aurora.entitySize * 45) - (Aurora.canvas.width * 0.04),
							height: (Aurora.entitySize * 7),
							lineWidth: 1,
							btnColor: 'darkgrey',
							txtColor: 'white',
							font: '1.3em serif',
							msg: 'Upgrade',
							isFilled: true,
							id: 'upgrade-tower',
							layer: 1,
							action: { 
								method: function(id) {
									if (tower.props.towerId > 0) {
										if (gameObject.arenaBlueGameMoney >= towerCost * (towerLevel)) {
											if (gameObject.gameSounds) {
												selectSound.play();
											}
											gameObject.arenaBlueGameMoney -= towerCost * (towerLevel);
											updateMoneyBackground();
											tower.props.stats.att += upgradeTowerStats.att;
											tower.props.stats.def += upgradeTowerStats.def;
											tower.props.stats.hp += upgradeTowerStats.hp;
											tower.props.stats.spd += upgradeTowerStats.spd;
											tower.props.stats.splash += upgradeTowerStats.splash;
											tower.props.stats.lvl += upgradeTowerStats.lvl;
											tower.props.requires.arenaLvlToUpgrade += upgradeTowerStats.arenaLvlToUpgrade;
											tower.msg = 'HP: ' + tower.props.stats.hp;
											closeUpdateTowerModal();
										} else {
											const upgradeButton = Aurora.methodObjects.find(bs => bs.id === 'upgrade-tower');
											upgradeButton.btnColor = '#C0C0C0';
										}
									} else {
										closeUpdateTowerModal();
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
			}
			Aurora.methodSetup = {
				layer: 1,
				method: function(id) {
					drawButton({
						posX: Aurora.placeEntityX(0.47, (Aurora.entitySize * 40)),
						posY: Aurora.placeEntityY(0.80, (Aurora.entitySize * 30)),
						width: (Aurora.entitySize * 45) - (Aurora.canvas.width * 0.04),
						height: (Aurora.entitySize * 7),
						lineWidth: 1,
						btnColor: 'darkgrey',
						txtColor: 'white',
						font: '1.3em serif',
						msg: 'Cancel',
						isFilled: true,
						id: 'cancel-upgrade-tower',
						layer: 1,
						action: { 
							method: function(id) {
								closeUpdateTowerModal();
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
		function selectBuildTowerMenu(tower, towerIndex) {
			let directiveName = findTowerDirectiveName(selectBuildTowerIndex);
			let selectedTowerDesign = Object.assign({}, gameObject.towerArenaDesigns[selectBuildTowerIndex]);
			const arenaTower = Object.assign({}, gameObject.towerArenaDesigns[selectBuildTowerIndex].arenaTower);
			const towerRequires = Object.assign({}, gameObject.towerArenaDesigns[selectBuildTowerIndex].arenaTower.requires);
			const towerStats = Object.assign({}, gameObject.towerArenaDesigns[selectBuildTowerIndex].arenaTower.stats);
			let towerCost = findTowerDirectiveCost(selectedTowerDesign.directive);
			arenaTower.stats = towerStats;
			arenaTower.requires = towerRequires;
			selectedTowerDesign.arenaTower = arenaTower;
			let msgs = [selectedTowerDesign.arenaTower.name, directiveName + ': $' + towerCost];
			// future Jordan, this isMobile variable could be a global thing.
			// it's being used in at lease one other place
			let isMobile = false;
			if (Aurora.canvas.height > Aurora.canvas.width) { // mobile
				isMobile = true;
			} else { // everything else
				isMobile = false;
			}
			Aurora.methodSetup = {
				layer: 1,
				method: function(id) {
					drawDialogueModal({
						posX: Aurora.placeEntityX(0.07),
						posY: Aurora.placeEntityY(0.40, (Aurora.entitySize * 30)),
						width: (Aurora.canvas.width * 0.85),
						height: (Aurora.entitySize * 50),
						lineWidth: 1,
						modalColor: 'grey',
						msgColor: 'white',
						msgFont: '1em serif',
						msgs: msgs,
						msgStart: Aurora.placeEntityY(0.58, (Aurora.entitySize * 30)),
						msgDistance: (Aurora.entitySize * 7),
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
					drawRect({
						posX: Aurora.placeEntityX(0.11, (Aurora.entitySize * -0.01)),
						posY: Aurora.placeEntityY(0.43, (Aurora.entitySize * 30)),
						width: (Aurora.entityWidth * 15),
						height: (Aurora.entitySize * 10),
						lineWidth: 1,
						color: selectBuildTowerIndex === 0 ? 'yellow' : 'darkgrey',
						isBackground: false,
						isFilled: true,
						id: 'arena-tower-bg-1',
						layer: 1,
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
						posX: Aurora.placeEntityX(0.136, isMobile ? (Aurora.entityWidth * 0.7) : (Aurora.entityWidth * -5.6)),
						posY: Aurora.placeEntityY(0.435, (Aurora.entitySize * 30)),
						width: (Aurora.entitySize * 6),
						height: (Aurora.entitySize * 9),
						lineWidth: 1,
						btnColor: gameObject.towerArenaDesigns[0].arenaTower.img ? gameObject.towerArenaDesigns[0].arenaTower.img : 'lightslategrey',
						txtColor: 'white',
						font: '0.8em serif',
						msg: '',
						isFilled: true,
						id: 'blue-tower-1',
						layer: 1,
						action: {
							methodId: id,
							method: function(id) {
								const selectTower = selectBuildTower(tower, 0);
								directiveName = selectTower.directiveName;
								selectedTowerDesign = selectTower.selectedTowerDesign;
								towerCost = findTowerDirectiveCost(selectedTowerDesign.directive);
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
					drawRect({
						posX: Aurora.placeEntityX(0.43, (Aurora.entitySize * 1.99)),
						posY: Aurora.placeEntityY(0.43, (Aurora.entitySize * 30)),
						width: (Aurora.entityWidth * 15),
						height: (Aurora.entitySize * 10),
						lineWidth: 1,
						color: selectBuildTowerIndex === 1 ? 'yellow' : 'darkgrey',
						isBackground: false,
						isFilled: true,
						id: 'arena-tower-bg-2',
						layer: 1,
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
						posX: Aurora.placeEntityX(0.456, isMobile ? (Aurora.entitySize * 2.3) : (Aurora.entitySize * -5.6)),
						posY: Aurora.placeEntityY(0.435, (Aurora.entitySize * 30)),
						width: (Aurora.entitySize * 6),
						height: (Aurora.entitySize * 9),
						lineWidth: 1,
						btnColor: gameObject.towerArenaDesigns[1].arenaTower.img ? gameObject.towerArenaDesigns[1].arenaTower.img : 'lightslategrey',
						txtColor: 'white',
						font: '0.8em serif',
						msg: '',
						isFilled: true,
						id: 'blue-tower-2',
						layer: 1,
						action: {
							methodId: id,
							method: function(id) {
								const selectTower = selectBuildTower(tower, 1);
								directiveName = selectTower.directiveName;
								selectedTowerDesign = selectTower.selectedTowerDesign;
								towerCost = findTowerDirectiveCost(selectedTowerDesign.directive);
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
					drawRect({
						posX: Aurora.placeEntityX(0.739, (Aurora.entitySize * 1)),
						posY: Aurora.placeEntityY(0.43, (Aurora.entitySize * 30)),
						width: (Aurora.entityWidth * 15),
						height: (Aurora.entitySize * 10),
						lineWidth: 1,
						color: selectBuildTowerIndex === 2 ? 'yellow' : 'darkgrey',
						isBackground: false,
						isFilled: true,
						id: 'arena-tower-bg-3',
						layer: 1,
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
						posX: Aurora.placeEntityX(0.765, isMobile ? (Aurora.entitySize * 1.3) : (Aurora.entitySize * -7.7)),
						posY: Aurora.placeEntityY(0.435, (Aurora.entitySize * 30)),
						width: (Aurora.entitySize * 6),
						height: (Aurora.entitySize * 9),
						lineWidth: 1,
						btnColor: gameObject.towerArenaDesigns[2].arenaTower.img ? gameObject.towerArenaDesigns[2].arenaTower.img : 'lightslategrey',
						txtColor: 'white',
						font: '0.8em serif',
						msg: '',
						isFilled: true,
						id: 'blue-tower-3',
						layer: 1,
						action: {
							methodId: id,
							method: function(id) {
								const selectTower = selectBuildTower(tower, 2);
								directiveName = selectTower.directiveName;
								selectedTowerDesign = selectTower.selectedTowerDesign;
								towerCost = findTowerDirectiveCost(selectedTowerDesign.directive);
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
						posX: Aurora.placeEntityX(0.47, isMobile ? (Aurora.entitySize * 40) : (Aurora.entitySize * 33)),
						posY: Aurora.placeEntityY(0.70, (Aurora.entitySize * 30)),
						width: (Aurora.entitySize * 45) - (Aurora.canvas.width * 0.04),
						height: (Aurora.entitySize * 7),
						lineWidth: 1,
						btnColor: 'darkgrey',
						txtColor: 'white',
						font: '1.3em serif',
						msg: 'Build',
						isFilled: true,
						id: 'build-tower',
						layer: 1,
						action: { 
							method: function(id) {
								if (selectedTowerDesign.arenaTower.towerId) {
									if (gameObject.arenaBlueGameMoney >= towerCost) {
										if (gameObject.gameSounds) {
											buildTowerSound.play();
										}
										gameObject.arenaBlueGameMoney -= towerCost;
										updateMoneyBackground();
										tower.btnColor = selectedTowerDesign.arenaTower.img;
										tower.props.name = selectedTowerDesign.arenaTower.name;
										tower.props.requires = selectedTowerDesign.arenaTower.requires;
										tower.props.robotParts = selectedTowerDesign.arenaTower.robotParts;
										tower.props.stats = selectedTowerDesign.arenaTower.stats;
										tower.props.towerId = selectedTowerDesign.arenaTower.towerId;
										tower.props.type = selectedTowerDesign.arenaTower.type;
										tower.props.directive = selectedTowerDesign.directive;
										tower.msg = 'HP: ' + selectedTowerDesign.arenaTower.stats.hp;
										tower.font = '0.7em serif';
										closeBuildTowerModal();
									} else {
										const buildButton = Aurora.methodObjects.find(bs => bs.id === 'build-tower');
										buildButton.btnColor = '#C0C0C0';
									}
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
				layer: 1,
				method: function(id) {
					drawButton({
						posX: Aurora.placeEntityX(0.47, isMobile ? (Aurora.entitySize * 40) : (Aurora.entitySize * 33)),
						posY: Aurora.placeEntityY(0.80, (Aurora.entitySize * 30)),
						width: (Aurora.entitySize * 45) - (Aurora.canvas.width * 0.04),
						height: (Aurora.entitySize * 7),
						lineWidth: 1,
						btnColor: 'darkgrey',
						txtColor: 'white',
						font: '1.3em serif',
						msg: 'Cancel',
						isFilled: true,
						id: 'cancel-build-tower',
						layer: 1,
						action: { 
							method: function(id) {
								closeBuildTowerModal();
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
		function closeBuildTowerModal() {
			const modal = Aurora.methodObjects.find(build => build.id === Aurora.modalId);
			if (modal) {
				Aurora.deleteEntity(modal.methodId);
			}
			removeTowerSelect();
			const buildBtn = Aurora.methodObjects.find(btn => btn.id === 'build-tower');
			if (buildBtn) {
				Aurora.deleteEntity(buildBtn.methodId);
			}
			const cancelBtn = Aurora.methodObjects.find(btn => btn.id === 'cancel-build-tower');
			if (cancelBtn) {
				Aurora.deleteEntity(cancelBtn.methodId);
			}
		}
		function closeUpdateTowerModal() {
			const modal = Aurora.methodObjects.find(build => build.id === Aurora.modalId);
			if (modal) {
				Aurora.deleteEntity(modal.methodId);
			}
			removeTowerSelect();
			const buildBtn = Aurora.methodObjects.find(btn => btn.id === 'upgrade-tower');
			if (buildBtn) {
				Aurora.deleteEntity(buildBtn.methodId);
			}
			const cancelBtn = Aurora.methodObjects.find(btn => btn.id === 'cancel-upgrade-tower');
			if (cancelBtn) {
				Aurora.deleteEntity(cancelBtn.methodId);
			}
		}
		function removeTowerSelect() {
			const towerSelect1 = Aurora.methodObjects.find(tower => tower.id === 'blue-tower-1');
			if (towerSelect1) {
				Aurora.deleteEntity(towerSelect1.methodId);
			}
			const towerSelect2 = Aurora.methodObjects.find(tower => tower.id === 'blue-tower-2');
			if (towerSelect2) {
				Aurora.deleteEntity(towerSelect2.methodId);
			}
			const towerSelect3 = Aurora.methodObjects.find(tower => tower.id === 'blue-tower-3');
			if (towerSelect3) {
				Aurora.deleteEntity(towerSelect3.methodId);
			}
			const towerSelectBg1 = Aurora.methodObjects.find(tower => tower.id === 'arena-tower-bg-1');
			if (towerSelectBg1) {
				Aurora.deleteEntity(towerSelectBg1.methodId);
			}
			const towerSelectBg2 = Aurora.methodObjects.find(tower => tower.id === 'arena-tower-bg-2');
			if (towerSelectBg2) {
				Aurora.deleteEntity(towerSelectBg2.methodId);
			}
			const towerSelectBg3 = Aurora.methodObjects.find(tower => tower.id === 'arena-tower-bg-3');
			if (towerSelectBg3) {
				Aurora.deleteEntity(towerSelectBg3.methodId);
			}
		}
	}
}
