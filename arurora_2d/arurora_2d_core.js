// Copyright (C) 2022  Jordan Wilson
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, version 2.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.


// this will draw objects to the screen and only redraws them if the stage has been resized
// or an animation is happening on stage
// draws text to the stage
// method: function(id) {drawText({ font: '1em serif', msg: 'Test', posX: 0, posY: 0, color: 'green', align: 'center', props: {}, id: 'test', methodId: id });}
function drawText(incomingText) {
  drawTextMethod(incomingText);
}
// this will draw a rectangle to the screen
function drawRect(incomingRect) { // other objects can be drawn on top
  drawRectMethod(incomingRect);
}
// this will draw a circle to the screen
function drawArc(incomingArc) {
  drawArcMethod(incomingArc);
}
// this will draws an image to the screen
function drawImage(incomingImg) {
  drawImageMethod(incomingImg);
}
// this will draws an image pattern to the screen
function drawImagePattern(incomingImgPat) {
  drawImagePatternMethod(incomingImgPat);
}
// this will draw a button to the screen
function drawButton(incomingButton) { // other objects can't be layered
  drawButtonMethod(incomingButton);
}
// this will draw a clickable/tappable image to the screen
function drawButtonImage(incomingButtonImage) {
  drawButtonImageMethod(incomingButtonImage);
}
// this will draw a loading screen or message while resources are loaded
function drawLoadingScreen(incomingLoadingScreen) {
  drawLoadingScreenMethod(incomingLoadingScreen);
}
// this will draw a modal and display a message to the screen
function drawModal(incomingModal) {
  drawModalMethod(incomingModal);
}

// this is where all the work happens for the methods above

function drawTextMethod(incomingText) {
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
      redrawText(Game.methodObjects[index]);
      const shadowText = Object.assign({}, Game.methodObjects[index]);
      Main.methodObjectShadows[index] = shadowText;
      Game.methodObjects[index].isAnim = true;
   } else if (doesExist && Game.methodObjects[index].isAnim) {
      redrawText(Game.methodObjects[index]);
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
function drawRectMethod(incomingRect) {
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
      redrawRect(Game.methodObjects[index]);
      const shadowRect = Object.assign({}, Game.methodObjects[index]);
      Main.methodObjectShadows[index] = shadowRect;
      Game.methodObjects[index].isAnim = true;
   } else if (doesExist &&
    !Game.methodObjects[index].isBackground &&
    Game.methodObjects[index].isAnim) {
      Game.methodObjects[index].isAnim = true;
      redrawRect(Game.methodObjects[index]);
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
function drawArcMethod(incomingArc) {
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
    Main.methodObjectShadows[index].isAnim = false;
    Main.methodObjectShadows[index].props = incomingArc.props;
    redrawArc(incomingArc);
  }
  // checking for animation
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
     redrawArc(Game.methodObjects[index]);
      const shadowArc = Object.assign({}, Game.methodObjects[index]);
      Main.methodObjectShadows[index] = shadowArc;
      Game.methodObjects[index].isAnim = true;
   } else if (doesExist && Game.methodObjects[index].isAnim) {
     redrawArc(Game.methodObjects[index]);
     Game.methodObjects[index].isAnim = true;
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
function drawButtonMethod(incomingButton) {
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
     redrawButton(Game.methodObjects[index]);
      const shadowButton = Object.assign({}, Game.methodObjects[index]);
      Main.methodObjectShadows[index] = shadowButton;
      Game.methodObjects[index].isAnim = true;
   } else if (doesExist && Game.methodObjects[index].isAnim) {
      redrawButton(Game.methodObjects[index]);
      Game.methodObjects[index].isAnim = false;
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
  Main.stage.fillText(incomingButton.msg, (incomingButton.posX + (incomingButton.width * 0.5)), (incomingButton.posY + (incomingButton.height * 0.63)));
}
function drawImageMethod(incomingImg) {
  let doesExist = doesMethodParamExist(incomingImg.methodId);
  let index = -1;
  if (doesExist) {
    index = findMethodParamIndex(incomingImg.methodId);
    // check to see if there is animations going on.
    if (Game.methodObjects[index].isBackground) {
      backgroundAnimationCheck(index);
    }
  }
  if (!doesExist) {
    let img = {
      posX: incomingImg.posX,
      posY: incomingImg.posY,
      width: incomingImg.width,
      height: incomingImg.height,
      images: incomingImg.images,
      selectedImage: incomingImg.selectedImage,
      animTicks: incomingImg.animTicks,
      ticks: incomingImg.ticks,
      id: incomingImg.id,
      isAnim: false,
      isBackground: incomingImg.isBackground,
      props: incomingImg.props,
      methodId: incomingImg.methodId,
    }
    Game.methodObjects.push(img);
    redrawImage(incomingImg);
    const shadowImg = Object.assign({}, img);
    Main.methodObjectShadows.push(shadowImg);
  }
  if (doesExist && Main.isResizing) {
    Game.methodObjects[index].posX = incomingImg.posX;
    Game.methodObjects[index].posY = incomingImg.posY;
    Game.methodObjects[index].width = incomingImg.width;
    Game.methodObjects[index].height = incomingImg.height;
    Game.methodObjects[index].images = incomingImg.images;
    Game.methodObjects[index].selectedImage = incomingImg.selectedImage;
    Game.methodObjects[index].animTicks = incomingImg.animTicks;
    Game.methodObjects[index].ticks = incomingImg.ticks;
    Game.methodObjects[index].isAnim = false;
    Game.methodObjects[index].isBackground = incomingImg.isBackground;
    Game.methodObjects[index].props = incomingImg.props;
    Main.methodObjectShadows[index].posX = incomingImg.posX;
    Main.methodObjectShadows[index].posY = incomingImg.posY;
    Main.methodObjectShadows[index].width = incomingImg.width;
    Main.methodObjectShadows[index].height = incomingImg.height;
    Main.methodObjectShadows[index].images = incomingImg.images;
    Main.methodObjectShadows[index].selectedImage = incomingImg.selectedImage;
    Main.methodObjectShadows[index].animTicks = incomingImg.animTicks;
    Main.methodObjectShadows[index].ticks = incomingImg.ticks;
    Main.methodObjectShadows[index].isAnim = false;
    Main.methodObjectShadows[index].isBackground = incomingImg.isBackground;
    Main.methodObjectShadows[index].props = incomingImg.props;
    redrawImage(incomingImg);
  }
  if (doesExist && Game.methodObjects[index].isAnim && Game.methodObjects[index].isBackground) {
    redrawImage(incomingImg);
    Game.methodObjects[index].isAnim = false;
  }
  // checking for animations that isn't a background
  if (doesExist && !Game.methodObjects[index].isBackground &&
   (Game.methodObjects[index].posY !== Main.methodObjectShadows[index].posY ||
   Game.methodObjects[index].posX !== Main.methodObjectShadows[index].posX ||
   Game.methodObjects[index].width !== Main.methodObjectShadows[index].width ||
   Game.methodObjects[index].height !== Main.methodObjectShadows[index].height ||
   Game.methodObjects[index].images !== Main.methodObjectShadows[index].images ||
   Game.methodObjects[index].selectedImage !== Main.methodObjectShadows[index].selectedImage ||
   Game.methodObjects[index].animTicks !== Main.methodObjectShadows[index].animTicks ||
   Game.methodObjects[index].ticks !== Main.methodObjectShadows[index].ticks)
   ) {
      redrawImage(Game.methodObjects[index]);
      const shadowImage = Object.assign({}, Game.methodObjects[index]);
      Main.methodObjectShadows[index] = shadowImage;
      Game.methodObjects[index].isAnim = true;
   } else if (doesExist &&
    !Game.methodObjects[index].isBackground &&
    Game.methodObjects[index].isAnim) {
      Game.methodObjects[index].isAnim = true;
      redrawImage(Game.methodObjects[index]);
   } else if (doesExist &&
    !Game.methodObjects[index].isBackground &&
    (Game.methodObjects[index].posY === Main.methodObjectShadows[index].posY ||
    Game.methodObjects[index].posX === Main.methodObjectShadows[index].posX ||
    Game.methodObjects[index].width === Main.methodObjectShadows[index].width ||
    Game.methodObjects[index].height === Main.methodObjectShadows[index].height ||
    Game.methodObjects[index].images === Main.methodObjectShadows[index].images ||
    Game.methodObjects[index].selectedImage === Main.methodObjectShadows[index].selectedImage ||
    Game.methodObjects[index].animTicks === Main.methodObjectShadows[index].animTicks ||
    Game.methodObjects[index].ticks === Main.methodObjectShadows[index].ticks)) {
      Game.methodObjects[index].isAnim = false;
   }
}
function redrawImage(incomingImg) {
  if (incomingImg.images.length > 0) {
    Main.stage.drawImage(incomingImg.images[incomingImg.selectedImage], incomingImg.posX, incomingImg.posY, incomingImg.width, incomingImg.height);
  }

}
function drawImagePatternMethod(incomingImgPat) {
  let doesExist = doesMethodParamExist(incomingImgPat.methodId);
  let index = -1;
  if (doesExist) {
    index = findMethodParamIndex(incomingImgPat.methodId);
    // check to see if there is animations going on.
    if (Game.methodObjects[index].isBackground) {
      backgroundAnimationCheck(index);
    }
  }
  if (!doesExist) {
    let imgPat = {
      posX: incomingImgPat.posX,
      posY: incomingImgPat.posY,
      width: incomingImgPat.width,
      height: incomingImgPat.height,
      patternWidth: incomingImgPat.patternWidth,
      patternHeight: incomingImgPat.patternHeight,
      images: incomingImgPat.images,
      selectedImage: incomingImgPat.selectedImage,
      animTicks: incomingImgPat.animTicks,
      ticks: incomingImgPat.ticks,
      id: incomingImgPat.id,
      isAnim: false,
      isBackground: incomingImgPat.isBackground,
      props: incomingImgPat.props,
      methodId: incomingImgPat.methodId,
    }
    Game.methodObjects.push(imgPat);
    redrawImagePattern(incomingImgPat);
    const shadowImgPat = Object.assign({}, imgPat);
    Main.methodObjectShadows.push(shadowImgPat);
  }
  if (doesExist && Main.isResizing) {
    Game.methodObjects[index].posX = incomingImgPat.posX;
    Game.methodObjects[index].posY = incomingImgPat.posY;
    Game.methodObjects[index].width = incomingImgPat.width;
    Game.methodObjects[index].height = incomingImgPat.height;
    Game.methodObjects[index].patternWidth = incomingImgPat.patternWidth;
    Game.methodObjects[index].patternHeight = incomingImgPat.patternHeight;
    Game.methodObjects[index].images = incomingImgPat.images;
    Game.methodObjects[index].selectedImage = incomingImgPat.selectedImage;
    Game.methodObjects[index].animTicks = incomingImgPat.animTicks;
    Game.methodObjects[index].ticks = incomingImgPat.ticks;
    Game.methodObjects[index].isAnim = false;
    Game.methodObjects[index].isBackground = incomingImgPat.isBackground;
    Game.methodObjects[index].props = incomingImgPat.props;
    Main.methodObjectShadows[index].posX = incomingImgPat.posX;
    Main.methodObjectShadows[index].posY = incomingImgPat.posY;
    Main.methodObjectShadows[index].width = incomingImgPat.width;
    Main.methodObjectShadows[index].height = incomingImgPat.height;
    Main.methodObjectShadows[index].patternWidth = incomingImgPat.patternWidth;
    Main.methodObjectShadows[index].patternHeight = incomingImgPat.patternHeight;
    Main.methodObjectShadows[index].images = incomingImgPat.images;
    Main.methodObjectShadows[index].selectedImage = incomingImgPat.selectedImage;
    Main.methodObjectShadows[index].animTicks = incomingImgPat.animTicks;
    Main.methodObjectShadows[index].ticks = incomingImgPat.ticks;
    Main.methodObjectShadows[index].isAnim = false;
    Main.methodObjectShadows[index].isBackground = incomingImgPat.isBackground;
    Main.methodObjectShadows[index].props = incomingImgPat.props;
    redrawImagePattern(incomingImgPat);
  }
  if (doesExist && Game.methodObjects[index].isAnim && Game.methodObjects[index].isBackground) {
    redrawImagePattern(incomingImgPat);
    Game.methodObjects[index].isAnim = false;
  }
  // checking for animations that isn't a background
  if (doesExist && !Game.methodObjects[index].isBackground &&
   (Game.methodObjects[index].posY !== Main.methodObjectShadows[index].posY ||
   Game.methodObjects[index].posX !== Main.methodObjectShadows[index].posX ||
   Game.methodObjects[index].width !== Main.methodObjectShadows[index].width ||
   Game.methodObjects[index].height !== Main.methodObjectShadows[index].height ||
   Game.methodObjects[index].patternWidth !== Main.methodObjectShadows[index].patternWidth ||
   Game.methodObjects[index].patternHeight !== Main.methodObjectShadows[index].patternHeight ||
   Game.methodObjects[index].images !== Main.methodObjectShadows[index].images ||
   Game.methodObjects[index].selectedImage !== Main.methodObjectShadows[index].selectedImage ||
   Game.methodObjects[index].animTicks !== Main.methodObjectShadows[index].animTicks ||
   Game.methodObjects[index].ticks !== Main.methodObjectShadows[index].ticks)
   ) {
      redrawImagePattern(Game.methodObjects[index]);
      const shadowImagePat = Object.assign({}, Game.methodObjects[index]);
      Main.methodObjectShadows[index] = shadowImagePat;
      Game.methodObjects[index].isAnim = true;
   } else if (doesExist &&
    !Game.methodObjects[index].isBackground &&
    Game.methodObjects[index].isAnim) {
      Game.methodObjects[index].isAnim = true;
      redrawImagePattern(Game.methodObjects[index]);
   } else if (doesExist &&
    !Game.methodObjects[index].isBackground &&
    (Game.methodObjects[index].posY === Main.methodObjectShadows[index].posY ||
    Game.methodObjects[index].posX === Main.methodObjectShadows[index].posX ||
    Game.methodObjects[index].width === Main.methodObjectShadows[index].width ||
    Game.methodObjects[index].height === Main.methodObjectShadows[index].height ||
    Game.methodObjects[index].patternWidth === Main.methodObjectShadows[index].patternWidth ||
    Game.methodObjects[index].patternHeight === Main.methodObjectShadows[index].patternHeight ||
    Game.methodObjects[index].images === Main.methodObjectShadows[index].images ||
    Game.methodObjects[index].selectedImage === Main.methodObjectShadows[index].selectedImage ||
    Game.methodObjects[index].animTicks === Main.methodObjectShadows[index].animTicks ||
    Game.methodObjects[index].ticks === Main.methodObjectShadows[index].ticks)) {
      Game.methodObjects[index].isAnim = false;
   }
}
function redrawImagePattern(incomingImgPat) {
  if (incomingImgPat.images.length > 0) {
    if (Game.entitySize > 0) { // when the game is ready...
      for (let x = incomingImgPat.posX; x < incomingImgPat.width; x += incomingImgPat.patternWidth) {
        for (let y = incomingImgPat.posY; y < incomingImgPat.height; y += incomingImgPat.patternHeight) {
          Main.stage.drawImage(incomingImgPat.images[incomingImgPat.selectedImage], x, y, incomingImgPat.patternWidth, incomingImgPat.patternHeight);
        }
      }
    }
  }

}
function drawButtonImageMethod(incomingButtonImage) {
  let doesExist = doesMethodParamExist(incomingButtonImage.methodId);
  let index = -1;
  if (doesExist) {
    index = findMethodParamIndex(incomingButtonImage.methodId);
  }
  if (!doesExist) {
    let buttonImg = {
      posX: incomingButtonImage.posX,
      posY: incomingButtonImage.posY,
      width: incomingButtonImage.width,
      height: incomingButtonImage.height,
      images: incomingButtonImage.images,
      selectedImage: incomingButtonImage.selectedImage,
      animTicks: incomingButtonImage.animTicks,
      ticks: incomingButtonImage.ticks,
      id: incomingButtonImage.id,
      action: incomingButtonImage.action,
      isBtn: true,
      isAnim: false,
      props: incomingButtonImage.props,
      methodId: incomingButtonImage.methodId,
    }
    Game.methodObjects.push(buttonImg);
    redrawImage(incomingButtonImage);
    const shadowButtonImg = Object.assign({}, buttonImg);
    Main.methodObjectShadows.push(shadowButtonImg);
  }
  if (doesExist && Main.isResizing) {
    Game.methodObjects[index].posX = incomingButtonImage.posX;
    Game.methodObjects[index].posY = incomingButtonImage.posY;
    Game.methodObjects[index].width = incomingButtonImage.width;
    Game.methodObjects[index].height = incomingButtonImage.height;
    Game.methodObjects[index].images = incomingButtonImage.images;
    Game.methodObjects[index].selectedImage = incomingButtonImage.selectedImage;
    Game.methodObjects[index].animTicks = incomingButtonImage.animTicks;
    Game.methodObjects[index].ticks = incomingButtonImage.ticks;
    Game.methodObjects[index].action = incomingButtonImage.action;
    Game.methodObjects[index].isAnim = false;
    Game.methodObjects[index].props = incomingButtonImage.props;
    Main.methodObjectShadows[index].posX = incomingButtonImage.posX;
    Main.methodObjectShadows[index].posY = incomingButtonImage.posY;
    Main.methodObjectShadows[index].width = incomingButtonImage.width;
    Main.methodObjectShadows[index].height = incomingButtonImage.height;
    Main.methodObjectShadows[index].images = incomingButtonImage.images;
    Main.methodObjectShadows[index].selectedImage = incomingButtonImage.selectedImage;
    Main.methodObjectShadows[index].animTicks = incomingButtonImage.animTicks;
    Main.methodObjectShadows[index].ticks = incomingButtonImage.ticks;
    Main.methodObjectShadows[index].action = incomingButtonImage.action;
    Main.methodObjectShadows[index].isAnim = false;
    Main.methodObjectShadows[index].props = incomingButtonImage.props;
    redrawImage(incomingButtonImage);
  }
  // checking for animations
  if (doesExist &&
   (Game.methodObjects[index].posY !== Main.methodObjectShadows[index].posY ||
   Game.methodObjects[index].posX !== Main.methodObjectShadows[index].posX ||
   Game.methodObjects[index].width !== Main.methodObjectShadows[index].width ||
   Game.methodObjects[index].height !== Main.methodObjectShadows[index].height ||
   Game.methodObjects[index].images !== Main.methodObjectShadows[index].images ||
   Game.methodObjects[index].selectedImage !== Main.methodObjectShadows[index].selectedImage ||
   Game.methodObjects[index].animTicks !== Main.methodObjectShadows[index].animTicks ||
   Game.methodObjects[index].ticks !== Main.methodObjectShadows[index].ticks)
   ) {
     redrawImage(Game.methodObjects[index]);
      const shadowButtonImg = Object.assign({}, Game.methodObjects[index]);
      Main.methodObjectShadows[index] = shadowButtonImg;
      Game.methodObjects[index].isAnim = true;
   } else if (doesExist && Game.methodObjects[index].isAnim) {
      redrawImage(Game.methodObjects[index]);
      Game.methodObjects[index].isAnim = false;
   } else if (doesExist &&
    (Game.methodObjects[index].posY === Main.methodObjectShadows[index].posY ||
    Game.methodObjects[index].posX === Main.methodObjectShadows[index].posX ||
    Game.methodObjects[index].width === Main.methodObjectShadows[index].width ||
    Game.methodObjects[index].height === Main.methodObjectShadows[index].height ||
    Game.methodObjects[index].images === Main.methodObjectShadows[index].images ||
    Game.methodObjects[index].selectedImage === Main.methodObjectShadows[index].selectedImage ||
    Game.methodObjects[index].animTicks === Main.methodObjectShadows[index].animTicks ||
    Game.methodObjects[index].ticks === Main.methodObjectShadows[index].ticks)) {
      Game.methodObjects[index].isAnim = false;
   }
}
function drawModalMethod(incomingModal) {
  let doesExist = doesMethodParamExist(incomingModal.methodId);
  let index = -1;
  if (doesExist) {
    index = findMethodParamIndex(incomingModal.methodId);
  }
  if (!doesExist) {
    let button = {
      posX: incomingModal.posX,
      posY: incomingModal.posY,
      width: incomingModal.width,
      height: incomingModal.height,
      lineWidth: incomingModal.lineWidth,
      btnColor: incomingModal.btnColor,
      txtColor: incomingModal.txtColor,
      font: incomingModal.font,
      msg: incomingModal.msg,
      isFilled: incomingModal.isFilled,
      id: incomingModal.id,
      action: incomingModal.action,
      isBtn: true,
      isAnim: false,
      props: incomingModal.props,
      methodId: incomingModal.methodId,
    }
    Game.methodObjects.push(button);
    redrawModal(incomingModal);
    const shadowButton = Object.assign({}, button);
    Main.methodObjectShadows.push(shadowButton);
  }
  if (doesExist && Main.isResizing) {
    Game.methodObjects[index].posX = incomingModal.posX;
    Game.methodObjects[index].posY = incomingModal.posY;
    Game.methodObjects[index].width = incomingModal.width;
    Game.methodObjects[index].height = incomingModal.height;
    Game.methodObjects[index].lineWidth = incomingModal.lineWidth;
    Game.methodObjects[index].btnColor = incomingModal.btnColor;
    Game.methodObjects[index].txtColor = incomingModal.txtColor;
    Game.methodObjects[index].font = incomingModal.font;
    Game.methodObjects[index].msg = incomingModal.msg;
    Game.methodObjects[index].isFilled = incomingModal.isFilled;
    Game.methodObjects[index].action = incomingModal.action;
    Game.methodObjects[index].isAnim = false;
    Game.methodObjects[index].props = incomingModal.props;
    Main.methodObjectShadows[index].posX = incomingModal.posX;
    Main.methodObjectShadows[index].posY = incomingModal.posY;
    Main.methodObjectShadows[index].width = incomingModal.width;
    Main.methodObjectShadows[index].height = incomingModal.height;
    Main.methodObjectShadows[index].lineWidth = incomingModal.lineWidth;
    Main.methodObjectShadows[index].btnColor = incomingModal.btnColor;
    Main.methodObjectShadows[index].txtColor = incomingModal.txtColor;
    Main.methodObjectShadows[index].font = incomingModal.font;
    Main.methodObjectShadows[index].msg = incomingModal.msg;
    Main.methodObjectShadows[index].isFilled = incomingModal.isFilled;
    Main.methodObjectShadows[index].action = incomingModal.action;
    Main.methodObjectShadows[index].isAnim = false;
    Main.methodObjectShadows[index].props = incomingModal.props;
    redrawModal(incomingModal);
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
     redrawModal(Game.methodObjects[index]);
      const shadowModal = Object.assign({}, Game.methodObjects[index]);
      Main.methodObjectShadows[index] = shadowModal;
      Game.methodObjects[index].isAnim = true;
   } else if (doesExist && Game.methodObjects[index].isAnim) {
      redrawModal(Game.methodObjects[index]);
      Game.methodObjects[index].isAnim = false;
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
function redrawModal(incomingModal) {
	  Main.stage.beginPath();
	Main.stage.rect(0, 0, Game.canvas.width, Game.canvas.height);
	Main.stage.fillStyle = '#000000';
    Main.stage.fill();
  Main.stage.beginPath();
  if (!incomingModal.lineWidth) {
    Main.stage.lineWidth = '1';
  } else {
    Main.stage.lineWidth = incomingModal.lineWidth;
  }
  Main.stage.rect(incomingModal.posX, incomingModal.posY, incomingModal.width, incomingModal.height);
  if (incomingModal.isFilled) {
    Main.stage.fillStyle = incomingModal.btnColor;
    Main.stage.fill();
  } else {
    Main.stage.strokeStyle = incomingModal.btnColor;
    Main.stage.stroke();
  }
  Main.stage.fillStyle = incomingModal.txtColor;
  Main.stage.font = incomingModal.font;
  Main.stage.textAlign = 'center';
  Main.stage.fillText(incomingModal.msg, (incomingModal.posX + (incomingModal.width * 0.5)), (incomingModal.posY + (incomingModal.height * 0.63)));
  

}
