
(function() {
  Game.canvas = document.getElementById('Stage');

  let method = {method: function(id) {drawText('48px serif', 'Hello world', 10, 50, 'black', id);}}
  let method1 = {method: function(id) {drawText('48px serif', 'Hello world', 10, 100, 'green', id);}}
  Game.methodsToRun.push(method);
  Game.methodsToRun.push(method1);
})();
