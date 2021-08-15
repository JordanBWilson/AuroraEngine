
// draws text to the stage
function drawText(font, msg, posX, posY, methodId) { // ex: '48px serif', 'Hello', 10, 50
  // console.log(methodId);
  if (!Main.methodParams[methodId] ||
    Main.methodParams[methodId].font !== font ||
    Main.methodParams[methodId].msg !== msg ||
    Main.methodParams[methodId].posX !== posX ||
    Main.methodParams[methodId].posY !== posY
  ) {
    Main.stage.font = font;
    Main.stage.fillText(msg, posX, posY);
  }


  // if (!Main.methodParams[methodId]) {
  //   let params = {
  //     font: font,
  //     msg: msg,
  //     posX: posX,
  //     posY: posY,
  //   }
  //   Main.methodParams[methodId].push(params);
  // }
}
