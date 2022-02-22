const Particle = {
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

    if (drawParticle?.shape === this.enumShapes.circle) {
      console.log('made it');
      Game.methodSetup = {
        method: function(id) {
          drawArc({
            posX: 200,
            posY: 200,
            width: (Game.entitySize * 2),
            aglStrt: 0,
            aglEnd: (2 * Math.PI),
            lineWidth: 1,
            color: 'purple',
            isFilled: true,
            id: 'particle-effect',
            isSolid: false,
            props: {
              direction: 'top',
              collision: false
            },
            methodId: id
          });
        }
      }
      Game.addMethod(Game.methodSetup);
    }
    if (drawParticle?.shape === this.enumShapes.rect) {
      Game.methodSetup = {
    		method: function(id) {
    			drawRect({
    				posX: 0,
    				posY: 0,
    				width: Game.canvas.width * 0.10,
    				height: (Game.canvas.height) * 0.50,
    				lineWidth: 1,
    				color: 'purple',
    				isFilled: true,
    				id: 'particle-effect',
    				isSolid: false,
    				isBackground: false,
    				props: {},
    				methodId: id
    			});
    		}
    	};
    	Game.addMethod(Game.methodSetup);
    }

  },
  enumShapes: {
    circle: 0,
    rect: 1,
  }
}
