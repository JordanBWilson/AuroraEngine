// These are the methods to interact with a game.

// Copyright (C) 2024  Jordan Wilson
//
// This library is free software; you can redistribute it and/or
// modify it under the terms of the GNU Lesser General Public
// License as published by the Free Software Foundation; either
// version 2.1 of the License.

// This library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
// Lesser General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

const Aurora = { // the user will want to use this object
	frameRate: 1000 / 60, // how fast the game is running
    methodObjects: [], // this holds all the current param values
    canvas: undefined, // the game stage
	stageWidthPrct: 1, // how much of the screen width will it take up. use a percent
	stageHeightPrct: 1, // how much of the screen height will it take up. use a percent
	entitySize: (window.innerHeight * this.stageHeightPrct) * 0.01,
	entityWidth: (window.innerWidth * this.stageWidthPrct) * 0.01,
	clearStage: function() { // clear the game stage
		Main.clearStage = true;
		Main.stage?.clearRect(0, 0, this.canvas.width, this.canvas.height);
		Main.collisions = [];
		Main.methodsToRun = [];
		this.methodObjects = [];
		this.pageResized.section = '';
		Main.methodObjectShadows = [];
		Main.globalId = '';
		Main.isModalVisible = false;
		if (typeof Particle !== 'undefined') {
			Particle.animComplete = {
				method: function() {}
			};
		}
	},
	collisionSetup: { // use this to create collisions
		// collisions are cleaned when deleteEntity is called
		// based on the primary property
		primary: '', // the id that's waiting for a collision
		target: '', // the id that did the colliding
		method: function(id) {/*put your method here*/},
		methodId: undefined, // this will return the id of the targetId
	},
	addCollision: function(collision) { // pass the collision setup
		Main.collisions.push(collision);
		this.collisionSetup = {
		  primary: '',
		  target: '',
		  method: function(id) {},
		  methodId: undefined,
		}
	},
	methodSetup: {
		method: function(id) {/*put your method here*/}
	},
	addMethod: function(method) {
		if (method?.layer === undefined) {
			method.layer = 0;
		}
		Main.methodsToRun.push(method);
		this.methodSetup = {
			method: function(id) {},
		}
	},
	placeEntityX: function(pos, size) {
		if (size) { // this will help center the entity X coord before placing
			return (Aurora.canvas.width * pos) - (size / 2);
		} else {
			return (Aurora.canvas.width * pos);
		}
	},
	placeEntityY: function(pos, size) {
		if (size) { // this will help center the entity Y coord before placing
			return (Aurora.canvas.height * pos) - (size / 2);
		} else {
			return (Aurora.canvas.height * pos);
		}
	},
	deleteEntity: function(id) { // delete an object in the MethodObjects using the methodId
		for (let i = 0; i < this.methodObjects.length; i++) {
		  if (this.methodObjects[i].methodId === id) {
			  // clean up collisions
			const findPrimary = Main.collisions.filter(x => x.primary === this.methodObjects[i].id);
			if (findPrimary.length > 0) {
				findPrimary.forEach(item => {
					const index = Main.collisions.findIndex(x => x.primary === item.primary && x.target === item.target);
					if (index >= 0) {
						Main.collisions.splice(index, 1);
					}   
				});
			  }
			for (let j = 0; j < Main.methodsToRun.length; j++) {
				if (this.methodObjects[i]?.methodId === Main.methodsToRun[j]?.methodId) {
					if (this.methodObjects[i].isModalBtn) {
						Main.isModalVisible = false;
					}
					this.methodObjects.splice(i, 1);
					Main.methodObjectShadows.splice(i, 1);
					Main.methodsToRun.splice(j, 1);
					break;
				}
			}
		  }
		}
		// refresh backgrounds
		for (let i = 0; i < this.methodObjects.length; i++) {
			if (!this.methodObjects[i]?.isBackground) {
				this.methodObjects[i].isAnim = true;
			}
		}
	},
	removeCollision: function(primaryId, targetId) {
		const index = Main.collisions.findIndex(x => x.primary === primaryId && x.target === targetId);
		if (index !== -1) {
			Main.collisions.splice(index, 1);
			return true;
		} else {
			return false;
		}
	},
  // these settings will make the game run faster or slower
	setSettingsLow: function() {
		this.selectedSetting = Aurora.enumSettings.low;
		this.frameRate = 1000 / 15; // 15 frames a second
		setTimeout(function() {
			clearInterval(Main.interval);
			cancelAnimationFrame(Main.intervalAnimateId);
			Main.intervalAnimateId = requestAnimationFrame(function() {
				if (typeof mainLoop !== 'undefined') {
					mainLoop();
				}
			});
		},0);
    },
    setSettingsMed: function() {
		this.selectedSetting = Aurora.enumSettings.med;
		this.frameRate = 1000 / 30; // 30 frames a second
		setTimeout(function() {
			clearInterval(Main.interval);
			cancelAnimationFrame(Main.intervalAnimateId);
			Main.intervalAnimateId = requestAnimationFrame(function() {
				if (typeof mainLoop !== 'undefined') {
					mainLoop();
				}
			});
		},0);
	},
	setSettingsHigh: function() {
		this.selectedSetting = Aurora.enumSettings.high;
		this.frameRate = 1000 / 60; // 60 frames a second
		setTimeout(function() {
			clearInterval(Main.interval);
			cancelAnimationFrame(Main.intervalAnimateId);
			Main.intervalAnimateId = requestAnimationFrame(function() {
				if (typeof mainLoop !== 'undefined') {
					mainLoop();
				}
			});
		},0);

	}, // give your game a default setting for the smoothest frames
	selectedSetting: undefined, // the selected game setting
	enumSettings: {
		high: 0,
		med: 1,
		low: 2,
	},
	enumDirections: { // this is the x and y directions
		topDown: 0,
		leftRight: 1
	},
	// this will calculate the speed based on the direction and settings
	moveEntity: function(speed, direction) {
		const speedPerc = speed * 0.01;
		if (direction === this.enumDirections.topDown) {
			if (this.selectedSetting === Aurora.enumSettings.high) {
				return (Aurora.canvas.height * speedPerc);
			}
			if (this.selectedSetting === Aurora.enumSettings.med) {
				return (Aurora.canvas.height * speedPerc) * 2;
			}
			if (this.selectedSetting === Aurora.enumSettings.low) {
				return (Aurora.canvas.height * speedPerc) * 4;
			}
			if (!this.selectedSetting) {
				return (Aurora.canvas.height * speedPerc);
			}
		}
		if (direction === this.enumDirections.leftRight) {
			if (this.selectedSetting === Aurora.enumSettings.high) {
				return (Aurora.canvas.width * speedPerc);
			}
			if (this.selectedSetting === Aurora.enumSettings.med) {
				return (Aurora.canvas.width * speedPerc) * 2;
			}
			if (this.selectedSetting === Aurora.enumSettings.low) {
				return (Aurora.canvas.width * speedPerc) * 4;
			}
			if (!this.selectedSetting) {
				return (Aurora.canvas.width * speedPerc);
			}
		}
	},
	enumEvents: { // ways to interact with the game
		touchDown: 'touchstart',
		touchUp: 'touchend',
		touchMove: 'touchmove',
		mouseDown: 'mousedown',
		mouseUp: 'mouseup',
		mouseMove: 'mousemove',
	},
	addCanvasEvent: function(enumEvent, method) { // add game stage events
		return this.canvas.addEventListener(enumEvent, function(event) {
			method(event);
		}, false);
	},
	createImageListFromGif: function(gifLocation, id) {
		// this method is dependent on arurora_gifs.js
		if (gifLocation.length > 0 && id) {
			createImagesFromGif(gifLocation, id);
		}
	},
	gifImageList: [],
	createAudioList: function(audioFiles) {
		audioFiles.forEach(obj => {
			const gainNode = Main.audioContext.createGain();
			gainNode.gain.value = 1; // set volume to 100%
			let audioBuffer = void 0;

			// The Promise-based syntax for BaseAudioContext.decodeAudioData() is not supported in Safari(Webkit).
			window.fetch(obj.url)
				.then(response => response.arrayBuffer())
				.then(arrayBuffer => Main.audioContext.decodeAudioData(arrayBuffer,
					audioBuffer => {
						audioBuffer = audioBuffer;
						Main.audioList.push({name: obj.name, url: obj.url, buffer: audioBuffer});
					},
					error =>
						console.error(error)
			));
		});
	},
	playAudioFile: function(name) {
		const findFile = Main.audioList.find(x => x.name === name);
		if (findFile) {
			const source = Main.audioContext.createBufferSource();
			source.buffer = findFile.buffer;
			source.connect(Main.audioContext.destination);
			source.start();
		}
	},
	nextTick: function(entity) {
		// this will animate an entity based on the frame rate
		if (this.selectedSetting === this.enumSettings.high) {
			entity.animTicks--;
		} else if (this.selectedSetting === this.enumSettings.med) {
			entity.animTicks -= 2;
		} else if (this.selectedSetting === this.enumSettings.low) {
			entity.animTicks -= 4;
		} else {
			entity.animTicks--;
		}
		if (entity.animTicks <= 0) {
			entity.animTicks = entity.ticks;
		}
		return entity;
	},
	loadingId: 'loading-message',
	modalId: 'modal-view',
	isLoaded: false, // wait for assets to load before starting the game
	pageResized: { // this is used when the screen resizes
		section: '', // this is the page you're on. Has to be filled out
		method: function() {/*put the methods you want fired here*/}
	},
	keepPreviousSize: false, // whatever the size of the client is, leave it alone when page resizes
};

const Main = { // global variables to keep the game running nicely
	intervalAnimateId: undefined, // this keeps track of the animations
	interval: undefined, // the main loop running
	stage: undefined, // the 2D game stage
	resizeWindow: undefined, // when the browser window gets resized in the timeout
	isResizing: false, // is the game resizing
	resizeWindowTime: 250, // how long to wait for the browser to resize
	isStageTapped: false, // is the stage tapped
	tappedX: 0, // where the user tapped on the stage last on the X axis
	tappedY: 0, // where the user tapped on the stage last on the Y axis
	globalId: '', // makes all the objects easier to find
	methodObjectShadows: [], // this is all the param values recorded previously
	clearStage: false,
	collisions: [], // all the collisions in the game to look for
	methodsToRun: [], // all the methods to make the game run
	isModalVisible: false,
	audioList: [],
	audioContext: new AudioContext(),
};
