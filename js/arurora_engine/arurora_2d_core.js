
// draws text to the stage and only redraws it if the stage has been resized
// ex: '48px serif', 'Hello', 10, 50, 'black', 'start'
function drawText(font, msg, posX, posY, color, align, isAnim, props, methodId) {
  if (Game.methodParams[methodId] && (Game.methodParams[methodId].posX !== posX || Game.methodParams[methodId].posY !== posY)) {
    isAnim = true;
  }
  if (!Game.methodParams[methodId] || Main.isResizing ||
    Game.methodParams[methodId].font !== font ||
    Game.methodParams[methodId].msg !== msg ||
    Game.methodParams[methodId].posX !== posX ||
    Game.methodParams[methodId].posY !== posY ||
    Game.methodParams[methodId].color !== color ||
    Game.methodParams[methodId].align !== align
  ) {
    if (Game.methodParams[methodId]) {
      Main.stage.fillStyle = color;
      Main.stage.font = font;
      Main.stage.textAlign = align;
      Main.stage.fillText(msg, posX, posY);
    }
  }
  if (!Game.methodParams[methodId]) {
    let params = {
      font: font,
      msg: msg,
      posX: posX,
      posY: posY,
      color: color,
      align: align,
      isAnim: isAnim,
      props: props,
      isDeleted: false,
      methodId: methodId,
    }
    Game.methodParams.push(params);
  } else if (Game.methodParams[methodId] && Game.methodParams[methodId].posX !== posX || Game.methodParams[methodId].posY !== posY) {
    Game.methodParams[methodId].font = font;
    Game.methodParams[methodId].msg = msg;
    Game.methodParams[methodId].posX = posX;
    Game.methodParams[methodId].posY = posY;
    Game.methodParams[methodId].color = color;
    Game.methodParams[methodId].align = align;
    Game.methodParams[methodId].isAnim = isAnim;
    Game.methodParams[methodId].props = props;
  }
}
// this will draw a rectangle to the screen
// ex: 9, 51, 100, 100, 1, 'green', false
function drawRect(posX, posY, width, height, lineWidth, color, isFilled, id, isSolid, isAnim, isBackground, props, methodId) {
  // check to see if there is animations going on.
  backgroundAnimationCheck(methodId);
  // if (Game.methodParams[methodId] && (Game.methodParams[methodId].posX !== posX || Game.methodParams[methodId].posY !== posY)) {
  //   isAnim = true;
  // }
  if (!Game.methodParams[methodId] || Main.isResizing || Game.methodParams[methodId].isAnim ||
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
    if (Game.methodParams[methodId]) {
      Game.methodParams[methodId].isAnim = false;
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
      isAnim: isAnim,
      isBackground: isBackground,
      props: props,
      isDeleted: false,
      methodId: methodId,
    }
    Game.methodParams.push(params);
  } else {
    isAnim = false;
    Game.methodParams[methodId].posX = posX;
    Game.methodParams[methodId].posY = posY;
    Game.methodParams[methodId].width = width;
    Game.methodParams[methodId].height = height;
    Game.methodParams[methodId].lineWidth = lineWidth;
    Game.methodParams[methodId].color = color;
    Game.methodParams[methodId].isFilled = isFilled;
    Game.methodParams[methodId].id = id;
    Game.methodParams[methodId].isSolid = isSolid;
    Game.methodParams[methodId].isAnim = isAnim;
    Game.methodParams[methodId].isBackground = isBackground;
    Game.methodParams[methodId].props = props;
  }
}
// this will draw a circle to the screen
// ex: 9, 51, 100, 0, 2 * Math.PI, 1, 'green', false
function drawArc(posX, posY, width, aglStrt, aglEnd, lineWidth, color, isFilled, id, isSolid, isAnim, props, methodId) {
  let doesExist = doesMethodParamExist(methodId);
  let index = -1;
  if (doesExist) {
    index = findMethodParamIndex(methodId);
  }
  if (doesExist && Game.methodParams[index] && (Game.methodParams[index].posX !== posX || Game.methodParams[index].posY !== posY)) {
    isAnim = true;
  }
  if (!doesExist && !Game.methodParams[index] || Main.isResizing ||
    Game.methodParams[index].posX !== posX ||
    Game.methodParams[index].posY !== posY ||
    Game.methodParams[index].width !== width ||
    Game.methodParams[index].aglStrt !== aglStrt ||
    Game.methodParams[index].aglEnd !== aglEnd ||
    Game.methodParams[index].lineWidth !== lineWidth ||
    Game.methodParams[index].color !== color ||
    Game.methodParams[index].isFilled !== isFilled ||
    Game.methodParams[index].id !== id ||
    Game.methodParams[index].isSolid !== isSolid
  ) {
    if (Game.methodParams[index]) {
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

      Game.methodParams[index].isAnim = false;
    }

  }
  if (!doesExist && !Game.methodParams[index]) {
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
      isAnim: isAnim,
      props: props,
      isDeleted: false,
      methodId: methodId,
    }
    Game.methodParams.push(params);
  } else if (Game.methodParams[index] && Game.methodParams[index].posX !== posX || Game.methodParams[index].posY !== posY) {
    // console.log(true);
    Game.methodParams[index].posX = posX;
    Game.methodParams[index].posY = posY;
    Game.methodParams[index].width = width;
    Game.methodParams[index].aglStrt = aglStrt;
    Game.methodParams[index].aglEnd = aglEnd;
    Game.methodParams[index].lineWidth = lineWidth;
    Game.methodParams[index].color = color;
    Game.methodParams[index].isFilled = isFilled;
    Game.methodParams[index].id = id;
    Game.methodParams[index].isSolid = isSolid;
    Game.methodParams[index].isAnim = isAnim;
    Game.methodParams[index].props = props;
  }
}
function drawButton(posX, posY, width, height, lineWidth, btnColor, txtColor, font, msg, isFilled, action, isAnim, props, methodId) {
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
    if (Game.methodParams[methodId]) {
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
      isBtn: true,
      isAnim: isAnim,
      props: props,
      isDeleted: false,
      methodId: methodId,
    }
    Game.methodParams.push(params);
  } else if (Game.methodParams[methodId] && Game.methodParams[methodId].posX !== posX || Game.methodParams[methodId].posY !== posY) {
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
    Game.methodParams[methodId].isAnim = isAnim;
    Game.methodParams[methodId].props = props;
  }
}
