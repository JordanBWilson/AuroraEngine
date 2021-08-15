
(function() {

  Game.canvas = document.getElementById('Stage');
  drawMainMenu();
})();

function drawMainMenu() {

  let backgroundColor = {method: function(id) {drawRect(0, 0, Game.canvas.width, Game.canvas.height, 1, 'black', true, id);}}
  Game.methodsToRun.push(backgroundColor);
  let majorTitle = {method: function(id) {drawText('250% serif', 'Breakout', (Game.canvas.width * .5), (Game.canvas.height * 0.1), 'green', 'center', id);}}
  let minorTitle = {method: function(id) {drawText('16px serif', 'An Arurora Engine Demo', (Game.canvas.width * .5), (Game.canvas.height * 0.14), 'green', 'center', id);}}
  Game.methodsToRun.push(majorTitle);
  Game.methodsToRun.push(minorTitle);
}
