
// draws text to the stage and only redraws it if the stage has been resized
// ex: '48px serif', 'Hello', 10, 50, 'black', 'start'
function drawText(font, msg, posX, posY, color, align, methodId) {
  if (!Game.methodParams[methodId] || Main.isResizing ||
    Game.methodParams[methodId].font !== font ||
    Game.methodParams[methodId].msg !== msg ||
    Game.methodParams[methodId].posX !== posX ||
    Game.methodParams[methodId].posY !== posY ||
    Game.methodParams[methodId].color !== color ||
    Game.methodParams[methodId].align !== align
  ) {
    Main.stage.fillStyle = color;
    Main.stage.font = font;
    Main.stage.textAlign = align;
    Main.stage.fillText(msg, posX, posY);
  }
  if (!Game.methodParams[methodId]) {
    let params = {
      font: font,
      msg: msg,
      posX: posX,
      posY: posY,
      color: color,
      align: align
    }
    Game.methodParams.push(params);
  } else {
    Game.methodParams[methodId].font = font;
    Game.methodParams[methodId].msg = msg;
    Game.methodParams[methodId].posX = posX;
    Game.methodParams[methodId].posY = posY;
    Game.methodParams[methodId].color = color;
    Game.methodParams[methodId].align = align;
  }
}
// this will draw a rectangle to the screen
// ex: 9, 51, 100, 100, 1, 'green', false
function drawRect(posX, posY, width, height, lineWidth, color, isFilled, id, isSolid, methodId) {
  if (!Game.methodParams[methodId] || Main.isResizing ||
    Game.methodParams[methodId].posX !== posX ||
    Game.methodParams[methodId].posY !== posY ||
    Game.methodParams[methodId].width !== width ||
    Game.methodParams[methodId].height !== height ||
    Game.methodParams[methodId].lineWidth !== lineWidth ||
    Game.methodParams[methodId].color !== color ||
    Game.methodParams[methodId].isFilled !== isFilled ||
    Game.methodParams[methodId].id !== id ||
    Game.methodParams[methodId].isSolid !== isSolid
  ) {
    Main.stage.beginPath();
    if (!lineWidth) {
      Main.stage.lineWidth = '1';
    } else {
      Main.stage.lineWidth = lineWidth;
    }
    Main.stage.rect(posX, posY, width, height);
    if (isFilled) {
      Main.stage.fillStyle = color;
      Main.stage.fill();
    } else {
      Main.stage.strokeStyle = color;
      Main.stage.stroke();
    }
  }
  if (!Game.methodParams[methodId]) {
    let params = {
      posX: posX,
      posY: posY,
      width: width,
      height: height,
      lineWidth: lineWidth,
      color: color,
      isFilled: isFilled,
      id: id,
      isSolid: isSolid,
    }
    Game.methodParams.push(params);
  } else {
    Game.methodParams[methodId].posX = posX;
    Game.methodParams[methodId].posY = posY;
    Game.methodParams[methodId].width = width;
    Game.methodParams[methodId].height = height;
    Game.methodParams[methodId].lineWidth = lineWidth;
    Game.methodParams[methodId].color = color;
    Game.methodParams[methodId].isFilled = isFilled;
    Game.methodParams[methodId].id = id;
    Game.methodParams[methodId].isSolid = isSolid;
  }
}
// this will draw a circle to the screen
// ex: 9, 51, 100, 0, 2 * Math.PI, 1, 'green', false
function drawArc(posX, posY, width, aglStrt, aglEnd, lineWidth, color, isFilled, id, isSolid, methodId) {
  if (!Game.methodParams[methodId] || Main.isResizing ||
    Game.methodParams[methodId].posX !== posX ||
    Game.methodParams[methodId].posY !== posY ||
    Game.methodParams[methodId].width !== width ||
    Game.methodParams[methodId].aglStrt !== aglStrt ||
    Game.methodParams[methodId].aglEnd !== aglEnd ||
    Game.methodParams[methodId].lineWidth !== lineWidth ||
    Game.methodParams[methodId].color !== color ||
    Game.methodParams[methodId].isFilled !== isFilled ||
    Game.methodParams[methodId].id !== id ||
    Game.methodParams[methodId].isSolid !== isSolid
  ) {
    Main.stage.beginPath();
    if (!lineWidth) {
      Main.stage.lineWidth = '1';
    } else {
      Main.stage.lineWidth = lineWidth;
    }
    Main.stage.arc(posX, posY, width, aglStrt, aglEnd);
    if (isFilled) {
      Main.stage.fillStyle = color;
      Main.stage.fill();
    } else {
      Main.stage.strokeStyle = color;
      Main.stage.stroke();
    }
  }
  if (!Game.methodParams[methodId]) {
    let params = {
      posX: posX,
      posY: posY,
      width: width,
      aglStrt: aglStrt,
      aglEnd: aglEnd,
      lineWidth: lineWidth,
      color: color,
      isFilled: isFilled,
      id: id,
      isSolid: isSolid,
    }
    Game.methodParams.push(params);
  } else {
    Game.methodParams[methodId].posX = posX;
    Game.methodParams[methodId].posY = posY;
    Game.methodParams[methodId].width = width;
    Game.methodParams[methodId].aglStrt = aglStrt;
    Game.methodParams[methodId].aglEnd = aglEnd;
    Game.methodParams[methodId].lineWidth = lineWidth;
    Game.methodParams[methodId].color = color;
    Game.methodParams[methodId].isFilled = isFilled;
    Game.methodParams[methodId].id = id;
    Game.methodParams[methodId].isSolid = isSolid;
  }
}
function drawButton(posX, posY, width, height, lineWidth, btnColor, txtColor, font, msg, isFilled, action, methodId) {
  if (!Game.methodParams[methodId] || Main.isResizing ||
    Game.methodParams[methodId].posX !== posX ||
    Game.methodParams[methodId].posY !== posY ||
    Game.methodParams[methodId].width !== width ||
    Game.methodParams[methodId].height !== height ||
    Game.methodParams[methodId].lineWidth !== lineWidth ||
    Game.methodParams[methodId].btnColor !== btnColor ||
    Game.methodParams[methodId].txtColor !== txtColor ||
    Game.methodParams[methodId].font !== font ||
    Game.methodParams[methodId].msg !== msg ||
    Game.methodParams[methodId].isFilled !== isFilled ||
    Game.methodParams[methodId].action !== action
  ) {
    Main.stage.beginPath();
    if (!lineWidth) {
      Main.stage.lineWidth = '1';
    } else {
      Main.stage.lineWidth = lineWidth;
    }
    Main.stage.rect(posX, posY, width, height);
    if (isFilled) {
      Main.stage.fillStyle = btnColor;
      Main.stage.fill();
    } else {
      Main.stage.strokeStyle = btnColor;
      Main.stage.stroke();
    }

    Main.stage.fillStyle = txtColor;
    Main.stage.font = font;
    Main.stage.textAlign = 'center';
    Main.stage.fillText(msg, (posX + (width * 0.5)), (posY + (height * 0.65)));
  }
  if (!Game.methodParams[methodId]) {
    let params = {
      posX: posX,
      posY: posY,
      width: width,
      height: height,
      lineWidth: lineWidth,
      btnColor: btnColor,
      txtColor: txtColor,
      font: font,
      msg: msg,
      isFilled: isFilled,
      action: action,
      isBtn: true
    }
    Game.methodParams.push(params);
  } else {
    Game.methodParams[methodId].posX = posX;
    Game.methodParams[methodId].posY = posY;
    Game.methodParams[methodId].width = width;
    Game.methodParams[methodId].height = height;
    Game.methodParams[methodId].lineWidth = lineWidth;
    Game.methodParams[methodId].btnColor = btnColor;
    Game.methodParams[methodId].txtColor = txtColor;
    Game.methodParams[methodId].font = font;
    Game.methodParams[methodId].msg = msg;
    Game.methodParams[methodId].isFilled = isFilled;
    Game.methodParams[methodId].action = action;
  }
}
