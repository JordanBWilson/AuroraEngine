
// draws text to the stage and only redraws it if the stage has been resized
function drawText(incomingText) {
  let doesExist = doesMethodParamExist(incomingText.methodId);
  let index = -1;
  if (doesExist) {
    index = findMethodParamIndex(incomingText.methodId);
  }
  if (!doesExist) {
    let text = {
      font: incomingText.font,
      msg: incomingText.msg,
      posX: incomingText.posX,
      posY: incomingText.posY,
      color: incomingText.color,
      align: incomingText.align,
      isAnim: false,
      props: incomingText.props,
      id: incomingText.id,
      methodId: incomingText.methodId,
    }
    Game.methodObjects.push(text);
    redrawText(incomingText);
    const shadowText = Object.assign({}, text);
    Main.methodObjectShadows.push(shadowText);
  }
  if (doesExist && Main.isResizing) {
    Game.methodObjects[index].font = incomingText.font;
    Game.methodObjects[index].msg = incomingText.msg;
    Game.methodObjects[index].posX = incomingText.posX;
    Game.methodObjects[index].posY = incomingText.posY;
    Game.methodObjects[index].color = incomingText.color;
    Game.methodObjects[index].align = incomingText.align;
    Game.methodObjects[index].isAnim = false;
    Game.methodObjects[index].props = incomingText.props;
    Game.methodObjects[index].id = incomingText.id;
    Main.methodObjectShadows[index].font = incomingText.font;
    Main.methodObjectShadows[index].msg = incomingText.msg;
    Main.methodObjectShadows[index].posX = incomingText.posX;
    Main.methodObjectShadows[index].posY = incomingText.posY;
    Main.methodObjectShadows[index].color = incomingText.color;
    Main.methodObjectShadows[index].align = incomingText.align;
    Main.methodObjectShadows[index].isAnim = false;
    Main.methodObjectShadows[index].props = incomingText.props;
    Main.methodObjectShadows[index].id = incomingText.id;
    redrawText(incomingText);
  }
  // checking for animations
  if (doesExist && 
   (Game.methodObjects[index].posY !== Main.methodObjectShadows[index].posY || 
   Game.methodObjects[index].posX !== Main.methodObjectShadows[index].posX || 
   Game.methodObjects[index].font !== Main.methodObjectShadows[index].font || 
   Game.methodObjects[index].msg !== Main.methodObjectShadows[index].msg || 
   Game.methodObjects[index].color !== Main.methodObjectShadows[index].color || 
   Game.methodObjects[index].align !== Main.methodObjectShadows[index].align)
   ) {
     redrawText(
      Game.methodObjects[index]
      );
      const shadowText = Object.assign({}, Game.methodObjects[index]);
      Main.methodObjectShadows[index] = shadowText;
      Game.methodObjects[index].isAnim = true;
   } else if (doesExist && Game.methodObjects[index].isAnim) {
     redrawText(
      Game.methodObjects[index]
      );
      Game.methodObjects[index].isAnim = false;
   } else if (doesExist &&
    (Game.methodObjects[index].posY === Main.methodObjectShadows[index].posY || 
    Game.methodObjects[index].posX === Main.methodObjectShadows[index].posX || 
    Game.methodObjects[index].font === Main.methodObjectShadows[index].font || 
    Game.methodObjects[index].msg === Main.methodObjectShadows[index].msg || 
    Game.methodObjects[index].color === Main.methodObjectShadows[index].color || 
    Game.methodObjects[index].align === Main.methodObjectShadows[index].align)) {
      Game.methodObjects[index].isAnim = false;
   }
}
function redrawText(incomingText) {
  Main.stage.fillStyle = incomingText.color;
  Main.stage.font = incomingText.font;
  Main.stage.textAlign = incomingText.align;
  Main.stage.fillText(incomingText.msg, incomingText.posX, incomingText.posY);
}
// this will draw a rectangle to the screen
function drawRect(incomingRect) {
  let doesExist = doesMethodParamExist(incomingRect.methodId);
  let index = -1;
  if (doesExist) {
    index = findMethodParamIndex(incomingRect.methodId);
    // check to see if there is animations going on.
    if (Game.methodObjects[index].isBackground) {
      backgroundAnimationCheck(index);
    }
    
  }
  if (!doesExist) {
    let rect = {
      posX: incomingRect.posX,
      posY: incomingRect.posY,
      width: incomingRect.width,
      height: incomingRect.height,
      lineWidth: incomingRect.lineWidth,
      color: incomingRect.color,
      isFilled: incomingRect.isFilled,
      id: incomingRect.id,
      isSolid: incomingRect.isSolid,
      isAnim: false,
      isBackground: incomingRect.isBackground,
      props: incomingRect.props,
      methodId: incomingRect.methodId,
    }
    Game.methodObjects.push(rect);
    redrawRect(incomingRect);
    const shadowRect = Object.assign({}, rect);
    Main.methodObjectShadows.push(shadowRect);
  }
  if (doesExist && Main.isResizing) {
    Game.methodObjects[index].posX = incomingRect.posX;
    Game.methodObjects[index].posY = incomingRect.posY;
    Game.methodObjects[index].width = incomingRect.width;
    Game.methodObjects[index].height = incomingRect.height;
    Game.methodObjects[index].lineWidth = incomingRect.lineWidth;
    Game.methodObjects[index].color = incomingRect.color;
    Game.methodObjects[index].isFilled = incomingRect.isFilled;
    Game.methodObjects[index].isSolid = incomingRect.isSolid;
    Game.methodObjects[index].isAnim = false;
    Game.methodObjects[index].isBackground = incomingRect.isBackground;
    Game.methodObjects[index].props = incomingRect.props;
    Main.methodObjectShadows[index].posX = incomingRect.posX;
    Main.methodObjectShadows[index].posY = incomingRect.posY;
    Main.methodObjectShadows[index].width = incomingRect.width;
    Main.methodObjectShadows[index].height = incomingRect.height;
    Main.methodObjectShadows[index].lineWidth = incomingRect.lineWidth;
    Main.methodObjectShadows[index].color = incomingRect.color;
    Main.methodObjectShadows[index].isFilled = incomingRect.isFilled;
    Main.methodObjectShadows[index].isSolid = incomingRect.isSolid;
    Main.methodObjectShadows[index].isAnim = false;
    Main.methodObjectShadows[index].isBackground = incomingRect.isBackground;
    Main.methodObjectShadows[index].props = incomingRect.props;
    redrawRect(incomingRect);
  }
  if (doesExist && Game.methodObjects[index].isAnim && Game.methodObjects[index].isBackground) {
    redrawRect(incomingRect);
    Game.methodObjects[index].isAnim = false;
  }
  // checking for animations that isn't a background
  if (doesExist && !Game.methodObjects[index].isBackground &&
   (Game.methodObjects[index].posY !== Main.methodObjectShadows[index].posY || 
   Game.methodObjects[index].posX !== Main.methodObjectShadows[index].posX || 
   Game.methodObjects[index].width !== Main.methodObjectShadows[index].width || 
   Game.methodObjects[index].height !== Main.methodObjectShadows[index].height || 
   Game.methodObjects[index].lineWidth !== Main.methodObjectShadows[index].lineWidth || 
   Game.methodObjects[index].color !== Main.methodObjectShadows[index].color || 
   Game.methodObjects[index].isFilled !== Main.methodObjectShadows[index].isFilled)
   ) {
     redrawRect(
      Game.methodObjects[index]
      );
      const shadowRect = Object.assign({}, Game.methodObjects[index]);
      Main.methodObjectShadows[index] = shadowRect;
      Game.methodObjects[index].isAnim = true;
   } else if (doesExist && 
    !Game.methodObjects[index].isBackground && 
    Game.methodObjects[index].isAnim) {
      redrawRect(
        Game.methodObjects[index]
      );
   } else if (doesExist && 
    !Game.methodObjects[index].isBackground &&
    (Game.methodObjects[index].posY === Main.methodObjectShadows[index].posY || 
    Game.methodObjects[index].posX === Main.methodObjectShadows[index].posX || 
    Game.methodObjects[index].width === Main.methodObjectShadows[index].width || 
    Game.methodObjects[index].height === Main.methodObjectShadows[index].height || 
    Game.methodObjects[index].lineWidth === Main.methodObjectShadows[index].lineWidth || 
    Game.methodObjects[index].color === Main.methodObjectShadows[index].color || 
    Game.methodObjects[index].isFilled === Main.methodObjectShadows[index].isFilled)) {
      Game.methodObjects[index].isAnim = false;
   }
}
function redrawRect(incomingRect) {
  Main.stage.beginPath();
  if (!incomingRect.lineWidth) {
    Main.stage.lineWidth = '1';
  } else {
    Main.stage.lineWidth = incomingRect.lineWidth;
  }
  Main.stage.rect(incomingRect.posX, incomingRect.posY, incomingRect.width, incomingRect.height);
  if (incomingRect.isFilled) {
    Main.stage.fillStyle = incomingRect.color;
    Main.stage.fill();
  } else {
    Main.stage.strokeStyle = incomingRect.color;
    Main.stage.stroke();
  }
}
// this will draw a circle to the screen
function drawArc(incomingArc) {
  let doesExist = doesMethodParamExist(incomingArc.methodId);
  let index = -1;
  if (doesExist) {
    index = findMethodParamIndex(incomingArc.methodId);
  }
  if (!doesExist) {
    const arc = {
      posX: incomingArc.posX,
      posY: incomingArc.posY,
      width: incomingArc.width,
      aglStrt: incomingArc.aglStrt,
      aglEnd: incomingArc.aglEnd,
      lineWidth: incomingArc.lineWidth,
      color: incomingArc.color,
      isFilled: incomingArc.isFilled,
      id: incomingArc.id,
      isSolid: incomingArc.isSolid,
      isAnim: false,
      props: incomingArc.props,
      methodId: incomingArc.methodId,
    }
    Game.methodObjects.push(arc);
    redrawArc(incomingArc);
    const shadowArc = Object.assign({}, arc);
    Main.methodObjectShadows.push(shadowArc);
  }
  if (doesExist && Main.isResizing) {
    Game.methodObjects[index].posX = incomingArc.posX;
    Game.methodObjects[index].posY = incomingArc.posY;
    Game.methodObjects[index].width = incomingArc.width;
    Game.methodObjects[index].aglStrt = incomingArc.aglStrt;
    Game.methodObjects[index].aglEnd = incomingArc.aglEnd;
    Game.methodObjects[index].lineWidth = incomingArc.lineWidth;
    Game.methodObjects[index].color = incomingArc.color;
    Game.methodObjects[index].isFilled = incomingArc.isFilled;
    Game.methodObjects[index].isSolid = incomingArc.isSolid;
    Game.methodObjects[index].isAnim = false;
    Game.methodObjects[index].props = incomingArc.props;
    Main.methodObjectShadows[index].posX = incomingArc.posX;
    Main.methodObjectShadows[index].posY = incomingArc.posY;
    Main.methodObjectShadows[index].width = incomingArc.width;
    Main.methodObjectShadows[index].aglStrt = incomingArc.aglStrt;
    Main.methodObjectShadows[index].aglEnd = incomingArc.aglEnd;
    Main.methodObjectShadows[index].lineWidth = incomingArc.lineWidth;
    Main.methodObjectShadows[index].color = incomingArc.color;
    Main.methodObjectShadows[index].isFilled = incomingArc.isFilled;
    Main.methodObjectShadows[index].isSolid = incomingArc.isSolid;
    Main.methodObjectShadows[index].isAnim = false;
    Main.methodObjectShadows[index].props = incomingArc.props;
    redrawArc(incomingArc);
  }
  // checking for animations
  if (doesExist && 
   (Game.methodObjects[index].posY !== Main.methodObjectShadows[index].posY || 
   Game.methodObjects[index].posX !== Main.methodObjectShadows[index].posX || 
   Game.methodObjects[index].width !== Main.methodObjectShadows[index].width || 
   Game.methodObjects[index].aglStrt !== Main.methodObjectShadows[index].aglStrt || 
   Game.methodObjects[index].aglEnd !== Main.methodObjectShadows[index].aglEnd || 
   Game.methodObjects[index].lineWidth !== Main.methodObjectShadows[index].lineWidth || 
   Game.methodObjects[index].color !== Main.methodObjectShadows[index].color || 
   Game.methodObjects[index].isFilled !== Main.methodObjectShadows[index].isFilled)
   ) {
     redrawArc(
      Game.methodObjects[index]
      );
      const shadowArc = Object.assign({}, Game.methodObjects[index]);
      Main.methodObjectShadows[index] = shadowArc;
      Game.methodObjects[index].isAnim = true;
   } else if (doesExist && Game.methodObjects[index].isAnim) {
     redrawArc(
      Game.methodObjects[index]
      );
   } else if (doesExist &&
    (Game.methodObjects[index].posY === Main.methodObjectShadows[index].posY || 
    Game.methodObjects[index].posX === Main.methodObjectShadows[index].posX || 
    Game.methodObjects[index].width === Main.methodObjectShadows[index].width || 
    Game.methodObjects[index].aglStrt === Main.methodObjectShadows[index].aglStrt || 
    Game.methodObjects[index].aglEnd === Main.methodObjectShadows[index].aglEnd || 
    Game.methodObjects[index].lineWidth === Main.methodObjectShadows[index].lineWidth || 
    Game.methodObjects[index].color === Main.methodObjectShadows[index].color || 
    Game.methodObjects[index].isFilled === Main.methodObjectShadows[index].isFilled)) {
      Game.methodObjects[index].isAnim = false;
   }
}
function redrawArc(incomingArc) {
  Main.stage.beginPath();
  if (!incomingArc.lineWidth) {
    Main.stage.lineWidth = '1';
  } else {
    Main.stage.lineWidth = incomingArc.lineWidth;
  }
  Main.stage.arc(incomingArc.posX, incomingArc.posY, incomingArc.width, incomingArc.aglStrt, incomingArc.aglEnd);
  if (incomingArc.isFilled) {
    Main.stage.fillStyle = incomingArc.color;
    Main.stage.fill();
  } else {
    Main.stage.strokeStyle = incomingArc.color;
    Main.stage.stroke();
  }
}
function drawButton(incomingButton) {
  let doesExist = doesMethodParamExist(incomingButton.methodId);
  let index = -1;
  if (doesExist) {
    index = findMethodParamIndex(incomingButton.methodId);
  }
  if (!doesExist) {
    let button = {
      posX: incomingButton.posX,
      posY: incomingButton.posY,
      width: incomingButton.width,
      height: incomingButton.height,
      lineWidth: incomingButton.lineWidth,
      btnColor: incomingButton.btnColor,
      txtColor: incomingButton.txtColor,
      font: incomingButton.font,
      msg: incomingButton.msg,
      isFilled: incomingButton.isFilled,
      id: incomingButton.id,
      isSolid: incomingButton.isSolid,
      action: incomingButton.action,
      isBtn: true,
      isAnim: false,
      props: incomingButton.props,
      methodId: incomingButton.methodId,
    }
    Game.methodObjects.push(button);
    redrawButton(incomingButton);
    const shadowButton = Object.assign({}, button);
    Main.methodObjectShadows.push(shadowButton);
  }
  if (doesExist && Main.isResizing) {
    Game.methodObjects[index].posX = incomingButton.posX;
    Game.methodObjects[index].posY = incomingButton.posY;
    Game.methodObjects[index].width = incomingButton.width;
    Game.methodObjects[index].height = incomingButton.height;
    Game.methodObjects[index].lineWidth = incomingButton.lineWidth;
    Game.methodObjects[index].btnColor = incomingButton.btnColor;
    Game.methodObjects[index].txtColor = incomingButton.txtColor;
    Game.methodObjects[index].font = incomingButton.font;
    Game.methodObjects[index].msg = incomingButton.msg;
    Game.methodObjects[index].isFilled = incomingButton.isFilled;
    Game.methodObjects[index].isSolid = incomingButton.isSolid;
    Game.methodObjects[index].action = incomingButton.action;
    Game.methodObjects[index].isAnim = false;
    Game.methodObjects[index].props = incomingButton.props;
    Main.methodObjectShadows[index].posX = incomingButton.posX;
    Main.methodObjectShadows[index].posY = incomingButton.posY;
    Main.methodObjectShadows[index].width = incomingButton.width;
    Main.methodObjectShadows[index].height = incomingButton.height;
    Main.methodObjectShadows[index].lineWidth = incomingButton.lineWidth;
    Main.methodObjectShadows[index].btnColor = incomingButton.btnColor;
    Main.methodObjectShadows[index].txtColor = incomingButton.txtColor;
    Main.methodObjectShadows[index].font = incomingButton.font;
    Main.methodObjectShadows[index].msg = incomingButton.msg;
    Main.methodObjectShadows[index].isFilled = incomingButton.isFilled;
    Main.methodObjectShadows[index].isSolid = incomingButton.isSolid;
    Main.methodObjectShadows[index].action = incomingButton.action;
    Main.methodObjectShadows[index].isAnim = false;
    Main.methodObjectShadows[index].props = incomingButton.props;
    redrawButton(incomingButton);
  }
  // checking for animations
  if (doesExist && 
   (Game.methodObjects[index].posY !== Main.methodObjectShadows[index].posY || 
   Game.methodObjects[index].posX !== Main.methodObjectShadows[index].posX || 
   Game.methodObjects[index].width !== Main.methodObjectShadows[index].width || 
   Game.methodObjects[index].height !== Main.methodObjectShadows[index].height || 
   Game.methodObjects[index].lineWidth !== Main.methodObjectShadows[index].lineWidth || 
   Game.methodObjects[index].btnColor !== Main.methodObjectShadows[index].btnColor || 
   Game.methodObjects[index].txtColor !== Main.methodObjectShadows[index].txtColor ||
   Game.methodObjects[index].font !== Main.methodObjectShadows[index].font ||
   Game.methodObjects[index].msg !== Main.methodObjectShadows[index].font ||
   Game.methodObjects[index].isFilled !== Main.methodObjectShadows[index].isFilled)
   ) {
     redrawButton(
      Game.methodObjects[index]
      );
      const shadowButton = Object.assign({}, Game.methodObjects[index]);
      Main.methodObjectShadows[index] = shadowButton;
      Game.methodObjects[index].isAnim = true;
   } else if (doesExist && Game.methodObjects[index].isAnim) {
     redrawButton(
      Game.methodObjects[index]
      );
   } else if (doesExist &&
    (Game.methodObjects[index].posY === Main.methodObjectShadows[index].posY || 
    Game.methodObjects[index].posX === Main.methodObjectShadows[index].posX || 
    Game.methodObjects[index].width === Main.methodObjectShadows[index].width || 
    Game.methodObjects[index].height === Main.methodObjectShadows[index].height || 
    Game.methodObjects[index].lineWidth === Main.methodObjectShadows[index].lineWidth || 
    Game.methodObjects[index].btnColor === Main.methodObjectShadows[index].btnColor || 
    Game.methodObjects[index].txtColor === Main.methodObjectShadows[index].txtColor ||
    Game.methodObjects[index].font === Main.methodObjectShadows[index].font ||
    Game.methodObjects[index].msg === Main.methodObjectShadows[index].font ||
    Game.methodObjects[index].isFilled === Main.methodObjectShadows[index].isFilled)) {
      Game.methodObjects[index].isAnim = false;
   }
}

function redrawButton(incomingButton) {
  Main.stage.beginPath();
  if (!incomingButton.lineWidth) {
    Main.stage.lineWidth = '1';
  } else {
    Main.stage.lineWidth = incomingButton.lineWidth;
  }
  Main.stage.rect(incomingButton.posX, incomingButton.posY, incomingButton.width, incomingButton.height);
  if (incomingButton.isFilled) {
    Main.stage.fillStyle = incomingButton.btnColor;
    Main.stage.fill();
  } else {
    Main.stage.strokeStyle = incomingButton.btnColor;
    Main.stage.stroke();
  }
  Main.stage.fillStyle = incomingButton.txtColor;
  Main.stage.font = incomingButton.font;
  Main.stage.textAlign = 'center';
  Main.stage.fillText(incomingButton.msg, (incomingButton.posX + (incomingButton.width * 0.5)), (incomingButton.posY + (incomingButton.height * 0.65)));
}
