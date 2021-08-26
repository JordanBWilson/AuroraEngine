
// draws text to the stage and only redraws it if the stage has been resized
// ex: '48px serif', 'Hello', 10, 50, 'black', 'start'
function drawText(font, msg, posX, posY, color, align, isAnim, methodId) {
  if (!Game.methodParams[methodId] || Main.isResizing || // isAnim ||
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
      methodId: methodId,
    }
    Game.methodParams.push(params);
  } else {
    Game.methodParams[methodId].font = font;
    Game.methodParams[methodId].msg = msg;
    Game.methodParams[methodId].posX = posX;
    Game.methodParams[methodId].posY = posY;
    Game.methodParams[methodId].color = color;
    Game.methodParams[methodId].align = align;
    Game.methodParams[methodId].isAnim = isAnim;
    Game.methodParams[methodId].methodId = methodId;
  }
}
// this will draw a rectangle to the screen
// ex: 9, 51, 100, 100, 1, 'green', false
function drawRect(posX, posY, width, height, lineWidth, color, isFilled, id, isSolid, isAnim, isBackground, methodId) {
  if (Game.methodParams[methodId] && Game.methodParams[methodId].isBackground) {
    let animated = Game.methodParams.find(x => x.isAnim === true);
    // console.log(animated);
    if (animated) {
      for (let i = 0; i < animated.length; i++) {
        if (animated[i].posX >= Game.methodParams[methodId].posX && animated[i].posX <= Game.methodParams[methodId].posX + Game.methodParams[methodId].width) {
          let widthOrHeight = 0;
          // because we are dealing with arcs as well, you can't be too careful
          if (!Game.methodParams[methodId].height) {
            widthOrHeight = Game.methodParams[methodId].width;
          } else {
            widthOrHeight = Game.methodParams[methodId].height;
          }
          if (animated[i].posY >= targetMethods[k].posY && animated[i].posY <= Game.methodParams[methodId].posY + widthOrHeight) {
            // Game.collisions[i].method();
            isAnim = true;
            console.log(isAnim);
          }
      }
    }
  }
}
  if (!Game.methodParams[methodId] || Main.isResizing || isAnim ||
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
      isAnim: isAnim,
      isBackground: isBackground,
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
    Game.methodParams[methodId].methodId = methodId;
  }
}
// this will draw a circle to the screen
// ex: 9, 51, 100, 0, 2 * Math.PI, 1, 'green', false
function drawArc(posX, posY, width, aglStrt, aglEnd, lineWidth, color, isFilled, id, isSolid, isAnim, methodId) {
  if (Game.methodParams[methodId] && Game.methodParams[methodId].posX !== posX) {
    isAnim = true;
  }
  if (!Game.methodParams[methodId] || Main.isResizing || // isAnim ||
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
    if (Game.methodParams[methodId]) {
      // Main.stage.clearRect(Game.methodParams[methodId].posX, Game.methodParams[methodId].posY, Game.methodParams[methodId].width, Game.methodParams[methodId].width);
      // Main.stage.clearRect(0, 0, Game.canvas.width, Game.canvas.width);
      // console.log(Game.methodParams[methodId]);
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
      isAnim: isAnim,
      methodId: methodId,
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
    Game.methodParams[methodId].isAnim = isAnim;
    Game.methodParams[methodId].methodId = methodId;
  }
  // if (Game.methodParams[methodId]) {
  //   Main.stage.clearRect(Game.methodParams[methodId].posX, Game.methodParams[methodId].posY, Game.methodParams[methodId].width * 2, Game.methodParams[methodId].width * 2);
  // }
}
function drawButton(posX, posY, width, height, lineWidth, btnColor, txtColor, font, msg, isFilled, action, isAnim, methodId) {
  if (!Game.methodParams[methodId] || Main.isResizing || // isAnim ||
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
      methodId: methodId,
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
    Game.methodParams[methodId].isAnim = isAnim;
    Game.methodParams[methodId].methodId = methodId;
  }
}
