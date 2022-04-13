// Copyright (C) 2022  Jordan Wilson
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, version 3.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

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
    //   size: 0, // width and height
    // }

    if (drawParticle?.shape === this.enumShapes.arc) {
      for (let i = 0; i < drawParticle.count; i++) {
        const direction = chooseDirection();
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
                props: {
                    direction: direction,
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
        const direction = chooseDirection();
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
        				isBackground: false,
        				props: {
                  direction: direction,
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
    },
    drawStars: function() {
      // this is from the original Mason. Convert this
      // export interface StarModel {
      //   x: number;
      //   y: number;
      //   radius: number;
      //   starLight: number;
      // }
    //   public drawStars(ctx: CanvasRenderingContext2D, starCount: number, stars: StarModel[], playerResourcesTemp: PlayerModel) {
    //   const sparkleStars = [];
    //   let starLight = 0;
    //   for (let i = 0; i < starCount; i++) {
    //     sparkleStars.push(new sparkleStar(i));
    //   }
    //   function sparkleStar(i: number) {
    //     this.x = stars[i].x;
    //     this.y = stars[i].y;
    //     this.radius = (Math.random() * .5) + 1;
    //
    //     this.draw = function(i) {
    //       // this changes the brightness of the stars based on the time of day
    //       if (playerResourcesTemp.dayCounter >= 78 && playerResourcesTemp.dayCounter <= 79) {
    //         starLight += 0.01;
    //         if (starLight >= stars[i].starLight) {
    //           starLight = stars[i].starLight;
    //         }
    //       } else if (playerResourcesTemp.dayCounter <= 115) {
    //         starLight = stars[i].starLight;
    //       } else if (playerResourcesTemp.dayCounter >= 116 && playerResourcesTemp.dayCounter <= 117) {
    //         if (starLight === 0) {
    //           starLight = stars[i].starLight;
    //         }
    //         starLight -= 0.01;
    //         if (starLight <= 0.1) {
    //           starLight = 0;
    //         }
    //       }
    //       ctx.save();
    //       ctx.beginPath();
    //         ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    //       ctx.fillStyle = 'rgba(255, 255, 255, ' + starLight + ')'; // white
    //         ctx.shadowColor = '#E3EAEF';
    //       ctx.shadowBlur = (Math.random() * 10) + 10;
    //       ctx.shadowOffsetX = 0;
    //       ctx.shadowOffsetY = 0;
    //         ctx.fill();
    //         ctx.closePath();
    //       ctx.restore();
    //     }
    //   }
    //   function animateStars() {
    //     for (let i = 0; i < sparkleStars.length; i++) {
    //       sparkleStars[i].draw(i);
    //     }
    //   }
    //   animateStars();
    // }

    },
}

function moveParticles() {
	const particles = Game.methodObjects.filter(x => x.id === 'particle-effect');
	// move the particles
  for (let i = 0; i < particles.length; i++) {
    if (particles[i].props.direction === 'rt') {
      particles[i].posX += Game.moveEntity(particles[i].props.speed, Game.enumDirections.leftRight);
    }
    if (particles[i].props.direction === 'lt') {
      particles[i].posX -= Game.moveEntity(particles[i].props.speed, Game.enumDirections.leftRight);
    }
    if (particles[i].props.direction === 'top') {
      particles[i].posX -= Game.moveEntity(particles[i].props.speed, Game.enumDirections.topDown);
    }
    if (particles[i].props.direction === 'bot') {
      particles[i].posX += Game.moveEntity(particles[i].props.speed, Game.enumDirections.topDown);
    }
    if (particles[i].props.direction === 'toprt') {
      particles[i].posY -= Game.moveEntity(particles[i].props.speed, Game.enumDirections.topDown);
      particles[i].posX += Game.moveEntity(particles[i].props.speed, Game.enumDirections.leftRight);
    }
    if (particles[i].props.direction === 'toplt') {
      particles[i].posY -= Game.moveEntity(particles[i].props.speed, Game.enumDirections.topDown);
      particles[i].posX -= Game.moveEntity(particles[i].props.speed, Game.enumDirections.leftRight);
    }
    if (particles[i].props.direction === 'botrt') {
      particles[i].posY += Game.moveEntity(particles[i].props.speed, Game.enumDirections.topDown);
      particles[i].posX += Game.moveEntity(particles[i].props.speed, Game.enumDirections.leftRight);
    }
    if (particles[i].props.direction === 'botlt') {
      particles[i].posY += Game.moveEntity(particles[i].props.speed, Game.enumDirections.topDown);
      particles[i].posX -= Game.moveEntity(particles[i].props.speed, Game.enumDirections.leftRight);
    }
    if (particles[i].props.ticks <= 1) {
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

function chooseDirection() {
  const random = Math.floor((Math.random() * 8) + 1);
  if (random === 1) {
    return 'top';
  } else if (random === 2) {
    return 'bot';
  } else if (random === 3) {
    return 'lt';
  } else if (random === 4) {
    return 'rt';
  } else if (random === 5) {
    return 'toprt';
  } else if (random === 6) {
    return 'toplt';
  } else if (random === 7) {
    return 'botrt';
  } else if (random === 8) {
    return 'botlt';
  }
}
