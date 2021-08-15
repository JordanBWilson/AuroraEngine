
// draws text to the stage and only redraws it if the stage has been resized
function drawText(font, msg, posX, posY, color, methodId) { // ex: '48px serif', 'Hello', 10, 50, black
  if (!Main.methodParams[methodId] || Main.isResizing ||
    Main.methodParams[methodId].font !== font ||
    Main.methodParams[methodId].msg !== msg ||
    Main.methodParams[methodId].posX !== posX ||
    Main.methodParams[methodId].posY !== posY ||
    Main.methodParams[methodId].color !== color
  ) {
    console.log(Main.isResizing);
    Main.stage.fillStyle = color;
    Main.stage.font = font;
    Main.stage.fillText(msg, posX, posY);
  }

  if (!Main.methodParams[methodId]) {
    let params = {
      font: font,
      msg: msg,
      posX: posX,
      posY: posY,
      color: color
    }
    Main.methodParams.push(params);
  } else {
    Main.methodParams[methodId].font = font;
    Main.methodParams[methodId].msg = msg;
    Main.methodParams[methodId].posX = posX;
    Main.methodParams[methodId].posY = posY;
    Main.methodParams[methodId].color = color;
  }
}
