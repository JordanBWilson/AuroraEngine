
// draws text to the stage and only redraws it if the stage has been resized
// ex: '48px serif', 'Hello', 10, 50, 'black', 'start'
function drawText(font, msg, posX, posY, color, align, props, methodId) {
  let doesExist = doesMethodParamExist(methodId);
  let index = -1;
  if (doesExist) {
    index = findMethodParamIndex(methodId);
  }
  // if (doesExist && Game.methodObjects[index] && (Game.methodObjects[index].posX !== posX || Game.methodObjects[index].posY !== posY)) {
    // isAnim = true;
  // }
  if (!doesExist) {
    let text = {
      font: font,
      msg: msg,
      posX: posX,
      posY: posY,
      color: color,
      align: align,
      isAnim: false,
      props: props,
      methodId: methodId,
    }
    Game.methodObjects.push(text);
    redrawText(font, msg, posX, posY, color, align);
    const shadowText = Object.assign({}, text);
    Main.methodObjectShadows.push(shadowText);
  }
  if (doesExist && Main.isResizing) {
    Game.methodObjects[index].font = font;
    Game.methodObjects[index].msg = msg;
    Game.methodObjects[index].posX = posX;
    Game.methodObjects[index].posY = posY;
    Game.methodObjects[index].color = color;
    Game.methodObjects[index].align = align;
    Game.methodObjects[index].isAnim = false;
    Game.methodObjects[index].props = props;
    Main.methodObjectShadows[index].font = font;
    Main.methodObjectShadows[index].msg = msg;
    Main.methodObjectShadows[index].posX = posX;
    Main.methodObjectShadows[index].posY = posY;
    Main.methodObjectShadows[index].color = color;
    Main.methodObjectShadows[index].align = align;
    Main.methodObjectShadows[index].isAnim = false;
    Main.methodObjectShadows[index].props = props;
    redrawText(font, msg, posX, posY, color, align);
  }
  // checking for animations
  if (doesExist && 
   (Game.methodObjects[index].posY !== Main.methodObjectShadows[index].posY || 
   Game.methodObjects[index].posX !== Main.methodObjectShadows[index].posX)
   ) {
     redrawText(
      Game.methodObjects[index].font,
      Game.methodObjects[index].msg,
      Game.methodObjects[index].posX,
      Game.methodObjects[index].posY,
      Game.methodObjects[index].color,
      Game.methodObjects[index].align,
      );
      const shadowText = Object.assign({}, Game.methodObjects[index]);
      Main.methodObjectShadows[index] = shadowText;
      Game.methodObjects[index].isAnim = true;
   } else if (doesExist && Game.methodObjects[index].isAnim) {
     redrawText(
      Game.methodObjects[index].font,
      Game.methodObjects[index].msg,
      Game.methodObjects[index].posX,
      Game.methodObjects[index].posY,
      Game.methodObjects[index].color,
      Game.methodObjects[index].align,
      );
   } else if (doesExist &&
    (Game.methodObjects[index].posY === Main.methodObjectShadows[index].posY || 
    Game.methodObjects[index].posX === Main.methodObjectShadows[index].posX)) {
      Game.methodObjects[index].isAnim = false;
   }
}
function redrawText(font, msg, posX, posY, color, align) {
  Main.stage.fillStyle = color;
  Main.stage.font = font;
  Main.stage.textAlign = align;
  Main.stage.fillText(msg, posX, posY);
}
// this will draw a rectangle to the screen
// ex: 9, 51, 100, 100, 1, 'green', false
function drawRect(posX, posY, width, height, lineWidth, color, isFilled, id, isSolid, isBackground, props, methodId) {
  let doesExist = doesMethodParamExist(methodId);
  let index = -1;
  if (doesExist) {
    index = findMethodParamIndex(methodId);
    // check to see if there is animations going on.
    if (Game.methodObjects[index].isBackground) {
      backgroundAnimationCheck(index);
    }
    
  }
  if (!doesExist) {
    let rect = {
      posX: posX,
      posY: posY,
      width: width,
      height: height,
      lineWidth: lineWidth,
      color: color,
      isFilled: isFilled,
      id: id,
      isSolid: isSolid,
      isAnim: false,
      isBackground: isBackground,
      props: props,
      methodId: methodId,
    }
    Game.methodObjects.push(rect);
    redrawRect(posX, posY, width, height, lineWidth, color, isFilled);
    const shadowRect = Object.assign({}, rect);
    Main.methodObjectShadows.push(shadowRect);
  }
  if (doesExist && Main.isResizing) {
    Game.methodObjects[index].posX = posX;
    Game.methodObjects[index].posY = posY;
    Game.methodObjects[index].width = width;
    Game.methodObjects[index].height = height;
    Game.methodObjects[index].lineWidth = lineWidth;
    Game.methodObjects[index].color = color;
    Game.methodObjects[index].isFilled = isFilled;
    Game.methodObjects[index].isSolid = isSolid;
    Game.methodObjects[index].isAnim = false;
    Game.methodObjects[index].isBackground = isBackground;
    Game.methodObjects[index].props = props;
    Main.methodObjectShadows[index].posX = posX;
    Main.methodObjectShadows[index].posY = posY;
    Main.methodObjectShadows[index].width = width;
    Main.methodObjectShadows[index].height = height;
    Main.methodObjectShadows[index].lineWidth = lineWidth;
    Main.methodObjectShadows[index].color = color;
    Main.methodObjectShadows[index].isFilled = isFilled;
    Main.methodObjectShadows[index].isSolid = isSolid;
    Main.methodObjectShadows[index].isAnim = false;
    Main.methodObjectShadows[index].isBackground = isBackground;
    Main.methodObjectShadows[index].props = props;
    redrawRect(posX, posY, width, height, lineWidth, color, isFilled);
  }
  if (doesExist && Game.methodObjects[index].isAnim && Game.methodObjects[index].isBackground) {
    redrawRect(posX, posY, width, height, lineWidth, color, isFilled);
    Game.methodObjects[index].isAnim = false;
  }
  // checking for animations that isn't a background
  if (doesExist && !Game.methodObjects[index].isBackground &&
   (Game.methodObjects[index].posY !== Main.methodObjectShadows[index].posY || 
   Game.methodObjects[index].posX !== Main.methodObjectShadows[index].posX)
   ) {
     redrawRect(
      Game.methodObjects[index].posX,
      Game.methodObjects[index].posY,
      Game.methodObjects[index].width,
      Game.methodObjects[index].height,
      Game.methodObjects[index].lineWidth,
      Game.methodObjects[index].color,
      Game.methodObjects[index].isFilled,
      );
      const shadowRect = Object.assign({}, Game.methodObjects[index]);
      Main.methodObjectShadows[index] = shadowRect;
      Game.methodObjects[index].isAnim = true;
   } else if (doesExist && 
    !Game.methodObjects[index].isBackground && 
    Game.methodObjects[index].isAnim) {
      redrawRect(
        Game.methodObjects[index].posX,
        Game.methodObjects[index].posY,
        Game.methodObjects[index].width,
        Game.methodObjects[index].height,
        Game.methodObjects[index].lineWidth,
        Game.methodObjects[index].color,
        Game.methodObjects[index].isFilled,
      );
   } else if (doesExist && 
    !Game.methodObjects[index].isBackground &&
    (Game.methodObjects[index].posY === Main.methodObjectShadows[index].posY || 
    Game.methodObjects[index].posX === Main.methodObjectShadows[index].posX)) {
      Game.methodObjects[index].isAnim = false;
   }
}
function redrawRect(posX, posY, width, height, lineWidth, color, isFilled) {
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
// this will draw a circle to the screen
// ex: 9, 51, 100, 0, 2 * Math.PI, 1, 'green', false
function drawArc(posX, posY, width, aglStrt, aglEnd, lineWidth, color, isFilled, id, isSolid, props, methodId) {
  let doesExist = doesMethodParamExist(methodId);
  let index = -1;
  if (doesExist) {
    index = findMethodParamIndex(methodId);
  }
  if (!doesExist) {
    const arc = {
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
      isAnim: false,
      props: props,
      methodId: methodId,
    }
    Game.methodObjects.push(arc);
    redrawArc(posX, posY, width, aglStrt, aglEnd, lineWidth, color, isFilled);
    const shadowArc = Object.assign({}, arc);
    Main.methodObjectShadows.push(shadowArc);
  }
  if (doesExist && Main.isResizing) {
    Game.methodObjects[index].posX = posX;
    Game.methodObjects[index].posY = posY;
    Game.methodObjects[index].width = width;
    Game.methodObjects[index].aglStrt = aglStrt;
    Game.methodObjects[index].aglEnd = aglEnd;
    Game.methodObjects[index].lineWidth = lineWidth;
    Game.methodObjects[index].color = color;
    Game.methodObjects[index].isFilled = isFilled;
    Game.methodObjects[index].isSolid = isSolid;
    Game.methodObjects[index].isAnim = false;
    Game.methodObjects[index].props = props;
    Main.methodObjectShadows[index].posX = posX;
    Main.methodObjectShadows[index].posY = posY;
    Main.methodObjectShadows[index].width = width;
    Main.methodObjectShadows[index].aglStrt = aglStrt;
    Main.methodObjectShadows[index].aglEnd = aglEnd;
    Main.methodObjectShadows[index].lineWidth = lineWidth;
    Main.methodObjectShadows[index].color = color;
    Main.methodObjectShadows[index].isFilled = isFilled;
    Main.methodObjectShadows[index].isSolid = isSolid;
    Main.methodObjectShadows[index].isAnim = false;
    Main.methodObjectShadows[index].props = props;
    redrawArc(posX, posY, width, aglStrt, aglEnd, lineWidth, color, isFilled);
  }
  // checking for animations
  if (doesExist && 
   (Game.methodObjects[index].posY !== Main.methodObjectShadows[index].posY || 
   Game.methodObjects[index].posX !== Main.methodObjectShadows[index].posX)
   ) {
     redrawArc(
      Game.methodObjects[index].posX,
      Game.methodObjects[index].posY,
      Game.methodObjects[index].width,
      Game.methodObjects[index].aglStrt,
      Game.methodObjects[index].aglEnd,
      Game.methodObjects[index].lineWidth,
      Game.methodObjects[index].color,
      Game.methodObjects[index].isFilled,
      );
      const shadowArc = Object.assign({}, Game.methodObjects[index]);
      Main.methodObjectShadows[index] = shadowArc;
      Game.methodObjects[index].isAnim = true;
   } else if (doesExist && Game.methodObjects[index].isAnim) {
     redrawArc(
      Game.methodObjects[index].posX,
      Game.methodObjects[index].posY,
      Game.methodObjects[index].width,
      Game.methodObjects[index].aglStrt,
      Game.methodObjects[index].aglEnd,
      Game.methodObjects[index].lineWidth,
      Game.methodObjects[index].color,
      Game.methodObjects[index].isFilled,
      );
   } else if (doesExist &&
    (Game.methodObjects[index].posY === Main.methodObjectShadows[index].posY || 
    Game.methodObjects[index].posX === Main.methodObjectShadows[index].posX)) {
      Game.methodObjects[index].isAnim = false;
   }
}
function redrawArc(posX, posY, width, aglStrt, aglEnd, lineWidth, color, isFilled) {
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
function drawButton(posX, posY, width, height, lineWidth, btnColor, txtColor, font, msg, isFilled, action, props, methodId) {
  let doesExist = doesMethodParamExist(methodId);
  let index = -1;
  if (doesExist) {
    index = findMethodParamIndex(methodId);
  }
  if (!doesExist) {
    let button = {
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
      isAnim: false,
      props: props,
      methodId: methodId,
    }
    Game.methodObjects.push(button);
    redrawButton(posX, posY, width, height, lineWidth, btnColor, txtColor, font, msg, isFilled);
    const shadowButton = Object.assign({}, button);
    Main.methodObjectShadows.push(shadowButton);
  }
  if (doesExist && Main.isResizing) {
    Game.methodObjects[index].posX = posX;
    Game.methodObjects[index].posY = posY;
    Game.methodObjects[index].width = width;
    Game.methodObjects[index].height = height;
    Game.methodObjects[index].lineWidth = lineWidth;
    Game.methodObjects[index].btnColor = btnColor;
    Game.methodObjects[index].txtColor = txtColor;
    Game.methodObjects[index].font = font;
    Game.methodObjects[index].msg = msg;
    Game.methodObjects[index].isFilled = isFilled;
    Game.methodObjects[index].action = action;
    Game.methodObjects[index].isAnim = false;
    Game.methodObjects[index].props = props;
    Main.methodObjectShadows[index].posX = posX;
    Main.methodObjectShadows[index].posY = posY;
    Main.methodObjectShadows[index].width = width;
    Main.methodObjectShadows[index].height = height;
    Main.methodObjectShadows[index].lineWidth = lineWidth;
    Main.methodObjectShadows[index].btnColor = btnColor;
    Main.methodObjectShadows[index].txtColor = txtColor;
    Main.methodObjectShadows[index].font = font;
    Main.methodObjectShadows[index].msg = msg;
    Main.methodObjectShadows[index].isFilled = isFilled;
    Main.methodObjectShadows[index].action = action;
    Main.methodObjectShadows[index].isAnim = false;
    Main.methodObjectShadows[index].props = props;
    redrawButton(posX, posY, width, height, lineWidth, btnColor, txtColor, font, msg, isFilled);
  }
  // checking for animations
  if (doesExist && 
   (Game.methodObjects[index].posY !== Main.methodObjectShadows[index].posY || 
   Game.methodObjects[index].posX !== Main.methodObjectShadows[index].posX)
   ) {
     redrawButton(
      Game.methodObjects[index].posX,
      Game.methodObjects[index].posY,
      Game.methodObjects[index].width,
      Game.methodObjects[index].height,
      Game.methodObjects[index].lineWidth,
      Game.methodObjects[index].btnColor,
      Game.methodObjects[index].txtColor,
      Game.methodObjects[index].font,
      Game.methodObjects[index].msg,
      Game.methodObjects[index].isFilled,
      );
      const shadowButton = Object.assign({}, Game.methodObjects[index]);
      Main.methodObjectShadows[index] = shadowButton;
      Game.methodObjects[index].isAnim = true;
   } else if (doesExist && Game.methodObjects[index].isAnim) {
     redrawButton(
      Game.methodObjects[index].posX,
      Game.methodObjects[index].posY,
      Game.methodObjects[index].width,
      Game.methodObjects[index].height,
      Game.methodObjects[index].lineWidth,
      Game.methodObjects[index].btnColor,
      Game.methodObjects[index].txtColor,
      Game.methodObjects[index].font,
      Game.methodObjects[index].msg,
      Game.methodObjects[index].isFilled,
      );
   } else if (doesExist &&
    (Game.methodObjects[index].posY === Main.methodObjectShadows[index].posY || 
    Game.methodObjects[index].posX === Main.methodObjectShadows[index].posX)) {
      Game.methodObjects[index].isAnim = false;
   }
}

function redrawButton(posX, posY, width, height, lineWidth, btnColor, txtColor, font, msg, isFilled) {
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
