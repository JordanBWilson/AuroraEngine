
// draws text to the stage and only redraws it if the stage has been resized
// ex: '48px serif', 'Hello', 10, 50, 'black', 'start'
function drawText(font, msg, posX, posY, color, align, methodId) {
  if (!Main.methodParams[methodId] || Main.isResizing ||
    Main.methodParams[methodId].font !== font ||
    Main.methodParams[methodId].msg !== msg ||
    Main.methodParams[methodId].posX !== posX ||
    Main.methodParams[methodId].posY !== posY ||
    Main.methodParams[methodId].color !== color ||
    Main.methodParams[methodId].align !== align
  ) {
    Main.stage.fillStyle = color;
    Main.stage.font = font;
    Main.stage.textAlign = align;
    Main.stage.fillText(msg, posX, posY);
  }
  if (!Main.methodParams[methodId]) {
    let params = {
      font: font,
      msg: msg,
      posX: posX,
      posY: posY,
      color: color,
      align: align
    }
    Main.methodParams.push(params);
  } else {
    Main.methodParams[methodId].font = font;
    Main.methodParams[methodId].msg = msg;
    Main.methodParams[methodId].posX = posX;
    Main.methodParams[methodId].posY = posY;
    Main.methodParams[methodId].color = color;
    Main.methodParams[methodId].align = align;
  }
}
// this will draw a rectangle to the screen
// ex: 9, 51, 100, 100, 1, 'green', false
function drawRect(posX, posY, width, height, lineWidth, color, isFilled, methodId) {
  if (!Main.methodParams[methodId] || Main.isResizing ||
    Main.methodParams[methodId].posX !== posX ||
    Main.methodParams[methodId].posY !== posY ||
    Main.methodParams[methodId].width !== width ||
    Main.methodParams[methodId].height !== height ||
    Main.methodParams[methodId].lineWidth !== lineWidth ||
    Main.methodParams[methodId].color !== color ||
    Main.methodParams[methodId].isFilled !== isFilled
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
  if (!Main.methodParams[methodId]) {
    let params = {
      posX: posX,
      posY: posY,
      width: width,
      height: height,
      lineWidth: lineWidth,
      color: color,
      isFilled: isFilled,
    }
    Main.methodParams.push(params);
  } else {
    Main.methodParams[methodId].posX = posX;
    Main.methodParams[methodId].posY = posY;
    Main.methodParams[methodId].width = width;
    Main.methodParams[methodId].height = height;
    Main.methodParams[methodId].lineWidth = lineWidth;
    Main.methodParams[methodId].color = color;
    Main.methodParams[methodId].isFilled = isFilled;
  }
}
// this will draw a circle to the screen
// ex: 9, 51, 100, 0, 2 * Math.PI, 1, 'green', false
function drawArc(posX, posY, radius, aglStrt, aglEnd, lineWidth, color, isFilled, methodId) {
  if (!Main.methodParams[methodId] || Main.isResizing ||
    Main.methodParams[methodId].posX !== posX ||
    Main.methodParams[methodId].posY !== posY ||
    Main.methodParams[methodId].radius !== radius ||
    Main.methodParams[methodId].aglStrt !== aglStrt ||
    Main.methodParams[methodId].aglEnd !== aglEnd ||
    Main.methodParams[methodId].lineWidth !== lineWidth ||
    Main.methodParams[methodId].color !== color ||
    Main.methodParams[methodId].isFilled !== isFilled
  ) {
    Main.stage.beginPath();
    if (!lineWidth) {
      Main.stage.lineWidth = '1';
    } else {
      Main.stage.lineWidth = lineWidth;
    }
    Main.stage.arc(posX, posY, radius, aglStrt, aglEnd);
    if (isFilled) {
      Main.stage.fillStyle = color;
      Main.stage.fill();
    } else {
      Main.stage.strokeStyle = color;
      Main.stage.stroke();
    }
  }
  if (!Main.methodParams[methodId]) {
    let params = {
      posX: posX,
      posY: posY,
      radius: radius,
      aglStrt: aglStrt,
      aglEnd: aglEnd,
      lineWidth: lineWidth,
      color: color,
      isFilled: isFilled,
    }
    Main.methodParams.push(params);
  } else {
    Main.methodParams[methodId].posX = posX;
    Main.methodParams[methodId].posY = posY;
    Main.methodParams[methodId].radius = radius;
    Main.methodParams[methodId].aglStrt = aglStrt;
    Main.methodParams[methodId].aglEnd = aglEnd;
    Main.methodParams[methodId].lineWidth = lineWidth;
    Main.methodParams[methodId].color = color;
    Main.methodParams[methodId].isFilled = isFilled;
  }
}
function drawButton(posX, posY, width, height, lineWidth, btnColor, txtColor, font, msg, isFilled, action, methodId) {
  if (!Main.methodParams[methodId] || Main.isResizing ||
    Main.methodParams[methodId].posX !== posX ||
    Main.methodParams[methodId].posY !== posY ||
    Main.methodParams[methodId].width !== width ||
    Main.methodParams[methodId].height !== height ||
    Main.methodParams[methodId].lineWidth !== lineWidth ||
    Main.methodParams[methodId].btnColor !== btnColor ||
    Main.methodParams[methodId].txtColor !== txtColor ||
    Main.methodParams[methodId].font !== font ||
    Main.methodParams[methodId].msg !== msg ||
    Main.methodParams[methodId].isFilled !== isFilled ||
    Main.methodParams[methodId].action !== action
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
  if (!Main.methodParams[methodId]) {
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
    Main.methodParams.push(params);
  } else {
    Main.methodParams[methodId].posX = posX;
    Main.methodParams[methodId].posY = posY;
    Main.methodParams[methodId].width = width;
    Main.methodParams[methodId].height = height;
    Main.methodParams[methodId].lineWidth = lineWidth;
    Main.methodParams[methodId].btnColor = btnColor;
    Main.methodParams[methodId].txtColor = txtColor;
    Main.methodParams[methodId].font = font;
    Main.methodParams[methodId].msg = msg;
    Main.methodParams[methodId].isFilled = isFilled;
    Main.methodParams[methodId].action = action;
  }
}
