const Particle = {
  init: function() {
    Game.methodSetup = { method: function(id) { moveParticles(); }};
    Game.addMethod(Game.methodSetup);
  },
  drawSpark: function(drawParticle) {
    // const particle = {
    //   posX:0,
    //   posY:0,
    //   shape:0,
    //   count:0,
    //   speed:0,
    //   color:'#fff',
    //   ticks: 0, // in milliseconds,
    //   isSolid: false,
    //   size: 0, // width and height
    // }

    if (drawParticle?.shape === this.enumShapes.arc) {
      console.log(drawParticle.count);
      for (let i = 0; i < drawParticle.count; i++) {
        Game.methodSetup = {
          method: function(id) {
            drawArc({
                posX: drawParticle.posX,
                posY: drawParticle.posY,
                width: drawParticle.size,
                aglStrt: 0,
                aglEnd: (2 * Math.PI),
                lineWidth: 1,
                color: drawParticle.color,
                isFilled: true,
                id: 'particle-effect',
                isSolid: drawParticle.isSolid,
                props: {
                    direction: 'left',
                    collision: false,
                    ticks: drawParticle.ticks,
                    speed: drawParticle.speed,
                },
                methodId: id
            });
          }
        }
        Game.addMethod(Game.methodSetup);
      }
    }
    if (drawParticle?.shape === this.enumShapes.rect) {
      for (let i = 0; i < drawParticle.count; i++) {
          Game.methodSetup = {
        		method: function(id) {
        			drawRect({
        				posX: drawParticle.posX,
        				posY: drawParticle.posY,
        				width: drawParticle.size,
        				height: drawParticle.size,
        				lineWidth: 1,
        				color: drawParticle.color,
        				isFilled: true,
        				id: 'particle-effect',
        				isSolid: drawParticle.isSolid,
        				isBackground: false,
        				props: {
                  direction: 'right',
                  collision: false,
                  ticks: drawParticle.ticks,
                  speed: drawParticle.speed,
                },
        				methodId: id
        			});
        		}
  	       };
           Game.addMethod(Game.methodSetup);
         }
       }
    },
    enumShapes: {
      arc: 0,
      rect: 1,
    }
}

function moveParticles() {
	const particles = Game.methodObjects.filter(x => x.id === 'particle-effect');
  // console.log(particles);
	// move the particles
  for (let i = 0; i < particles.length; i++) {
    if (particles[i].props.direction === 'right') {
      particles[i].posX += Game.moveEntity(particles[i].props.speed, Game.enumDirections.leftRight);
    }
    if (particles[i].props.direction === 'left') {
      particles[i].posX -= Game.moveEntity(particles[i].props.speed, Game.enumDirections.leftRight);
    }
    if (particles[i].props.ticks <= 1) {
      // particles.splice(i, 1);
      // break;
      Game.deleteEntity(particles[i].methodId);
    }
    if (Game.selectedSetting === Game.enumSettings.high) {
  		particles[i].props.ticks--;
  	} else if (Game.selectedSetting === Game.enumSettings.med) {
  		particles[i].props.ticks -= 2;
  	} else if (Game.selectedSetting === Game.enumSettings.low) {
  		particles[i].props.ticks -= 4;
  	} else {
      particles[i].props.ticks--;
    }

  }
}
