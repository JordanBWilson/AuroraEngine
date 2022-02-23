const Particle = {
  initParticles: function() {
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
    //   duration: 0, // in milliseconds,
    //   isSolid: false,
    //   size: 0, // width and height
    // }

    if (drawParticle?.shape === this.enumShapes.arc) {
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
              collision: false
            },
            methodId: undefined
          });
        }
      }
      Game.addMethod(Game.methodSetup);
    }
    if (drawParticle?.shape === this.enumShapes.rect) {
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
                        collision: false
                    },
    				methodId: undefined
    			});
    		}
    	};
    	Game.addMethod(Game.methodSetup);
    }

  },
  enumShapes: {
    arc: 0,
    rect: 1,
  }
}

function moveParticles() {
	const particles = Game.methodObjects.filter(x => x.id === 'particle-effect');
	// move the particles
	particles.forEach((particle, i) => {
		if (particle.props.direction === 'right') {
			particles[i].posX += Game.moveEntity(0.15, Game.enumDirections.leftRight);
		}
		if (particle.props.direction === 'left') {
			particles[i].posX -= Game.moveEntity(0.15, Game.enumDirections.leftRight);
		}
	});
}

