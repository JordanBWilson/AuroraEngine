// These are the core methods to create graphics to the page.

// Copyright (C) 2024  Jordan Wilson
//
// This library is free software; you can redistribute it and/or
// modify it under the terms of the GNU Lesser General Public
// License as published by the Free Software Foundation; either
// version 2.1 of the License.

// This library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
// Lesser General Public License for more details.
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
// this will draw a simple modal and display a message to the screen
function drawSimpleModal(incomingModal) {
  drawSimpleModalMethod(incomingModal);
}
// this will draw a modal using an image
function drawModalImage(incomingModalImage) {
  drawModalImageMethod(incomingModalImage);
}
// this will draw a dialogue modal with two buttons and display
// multiple messages to the screen
function drawDialogueModal(incomingModal) {
  drawDialogueModalMethod(incomingModal);
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
      layer: !incomingText.layer ? 0 : incomingText.layer,
      methodId: incomingText.methodId,
    }
    Aurora.methodObjects.push(text);
    redrawText(incomingText);
    const shadowText = Object.assign({}, text);
    Main.methodObjectShadows.push(shadowText);
  }
  if (doesExist && Main.isResizing) {
    Aurora.methodObjects[index].font = incomingText.font;
    Aurora.methodObjects[index].msg = incomingText.msg;
    Aurora.methodObjects[index].posX = incomingText.posX;
    Aurora.methodObjects[index].posY = incomingText.posY;
    Aurora.methodObjects[index].color = incomingText.color;
    Aurora.methodObjects[index].align = incomingText.align;
    Aurora.methodObjects[index].isAnim = false;
    Aurora.methodObjects[index].props = incomingText.props;
    Aurora.methodObjects[index].layer = !incomingText.layer ? 0 : incomingText.layer;
    Main.methodObjectShadows[index].font = incomingText.font;
    Main.methodObjectShadows[index].msg = incomingText.msg;
    Main.methodObjectShadows[index].posX = incomingText.posX;
    Main.methodObjectShadows[index].posY = incomingText.posY;
    Main.methodObjectShadows[index].color = incomingText.color;
    Main.methodObjectShadows[index].align = incomingText.align;
    Main.methodObjectShadows[index].isAnim = false;
    Main.methodObjectShadows[index].props = incomingText.props;
    Main.methodObjectShadows[index].id = incomingText.id;
    Main.methodObjectShadows[index].layer = !incomingText.layer ? 0 : incomingText.layer;
    redrawText(incomingText);
  }
  // checking for animations
  if (doesExist &&
   (Aurora.methodObjects[index].posY !== Main.methodObjectShadows[index].posY ||
   Aurora.methodObjects[index].posX !== Main.methodObjectShadows[index].posX ||
   Aurora.methodObjects[index].font !== Main.methodObjectShadows[index].font ||
   Aurora.methodObjects[index].msg !== Main.methodObjectShadows[index].msg ||
   Aurora.methodObjects[index].color !== Main.methodObjectShadows[index].color ||
   Aurora.methodObjects[index].align !== Main.methodObjectShadows[index].align || 
   Aurora.methodObjects[index].layer !== Main.methodObjectShadows[index].layer)
   ) {
      redrawText(Aurora.methodObjects[index]);
      const shadowText = Object.assign({}, Aurora.methodObjects[index]);
      Main.methodObjectShadows[index] = shadowText;
      Aurora.methodObjects[index].isAnim = true;
   } else if (doesExist && Aurora.methodObjects[index].isAnim) {
      redrawText(Aurora.methodObjects[index]);
   } else if (doesExist &&
    (Aurora.methodObjects[index].posY === Main.methodObjectShadows[index].posY ||
    Aurora.methodObjects[index].posX === Main.methodObjectShadows[index].posX ||
    Aurora.methodObjects[index].font === Main.methodObjectShadows[index].font ||
    Aurora.methodObjects[index].msg === Main.methodObjectShadows[index].msg ||
    Aurora.methodObjects[index].color === Main.methodObjectShadows[index].color ||
    Aurora.methodObjects[index].align === Main.methodObjectShadows[index].align ||
    Aurora.methodObjects[index].layer === Main.methodObjectShadows[index].layer)) {
      Aurora.methodObjects[index].isAnim = false;
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
    if (Aurora.methodObjects[index].isBackground) {
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
      layer: !incomingRect.layer ? 0 : incomingRect.layer,
      isAnim: false,
      isBackground: incomingRect.isBackground,
      props: incomingRect.props,
      methodId: incomingRect.methodId,
    }
    Aurora.methodObjects.push(rect);
    redrawRect(incomingRect);
    const shadowRect = Object.assign({}, rect);
    Main.methodObjectShadows.push(shadowRect);
  }
  if (doesExist && Main.isResizing) {
    Aurora.methodObjects[index].posX = incomingRect.posX;
    Aurora.methodObjects[index].posY = incomingRect.posY;
    Aurora.methodObjects[index].width = incomingRect.width;
    Aurora.methodObjects[index].height = incomingRect.height;
    Aurora.methodObjects[index].lineWidth = incomingRect.lineWidth;
    Aurora.methodObjects[index].color = incomingRect.color;
    Aurora.methodObjects[index].isFilled = incomingRect.isFilled;
    Aurora.methodObjects[index].isAnim = false;
    Aurora.methodObjects[index].isBackground = incomingRect.isBackground;
    Aurora.methodObjects[index].props = incomingRect.props;
    Aurora.methodObjects[index].layer = !incomingRect.layer ? 0 : incomingRect.layer;
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
    Main.methodObjectShadows[index].layer = !incomingRect.layer ? 0 : incomingRect.layer;
    redrawRect(incomingRect);
  }
  if (doesExist && Aurora.methodObjects[index].isAnim && Aurora.methodObjects[index].isBackground) {
    redrawRect(incomingRect);
    Aurora.methodObjects[index].isAnim = false;
  }
  // checking for animations that isn't a background
  if (doesExist && !Aurora.methodObjects[index].isBackground &&
   (Aurora.methodObjects[index].posY !== Main.methodObjectShadows[index].posY ||
   Aurora.methodObjects[index].posX !== Main.methodObjectShadows[index].posX ||
   Aurora.methodObjects[index].width !== Main.methodObjectShadows[index].width ||
   Aurora.methodObjects[index].height !== Main.methodObjectShadows[index].height ||
   Aurora.methodObjects[index].lineWidth !== Main.methodObjectShadows[index].lineWidth ||
   Aurora.methodObjects[index].color !== Main.methodObjectShadows[index].color ||
   Aurora.methodObjects[index].isFilled !== Main.methodObjectShadows[index].isFilled ||
   Aurora.methodObjects[index].layer !== Main.methodObjectShadows[index].layer)
   ) {
      redrawRect(Aurora.methodObjects[index]);
      const shadowRect = Object.assign({}, Aurora.methodObjects[index]);
      Main.methodObjectShadows[index] = shadowRect;
      Aurora.methodObjects[index].isAnim = true;
   } else if (doesExist &&
    !Aurora.methodObjects[index].isBackground &&
    Aurora.methodObjects[index].isAnim) {
      Aurora.methodObjects[index].isAnim = true;
      redrawRect(Aurora.methodObjects[index]);
   } else if (doesExist &&
    !Aurora.methodObjects[index].isBackground &&
    (Aurora.methodObjects[index].posY === Main.methodObjectShadows[index].posY ||
    Aurora.methodObjects[index].posX === Main.methodObjectShadows[index].posX ||
    Aurora.methodObjects[index].width === Main.methodObjectShadows[index].width ||
    Aurora.methodObjects[index].height === Main.methodObjectShadows[index].height ||
    Aurora.methodObjects[index].lineWidth === Main.methodObjectShadows[index].lineWidth ||
    Aurora.methodObjects[index].color === Main.methodObjectShadows[index].color ||
    Aurora.methodObjects[index].isFilled === Main.methodObjectShadows[index].isFilled || 
    Aurora.methodObjects[index].layer === Main.methodObjectShadows[index].layer)) {
      Aurora.methodObjects[index].isAnim = false;
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
      layer: !incomingArc.layer ? 0 : incomingArc.layer,
      isAnim: false,
      props: incomingArc.props,
      methodId: incomingArc.methodId,
    }
    Aurora.methodObjects.push(arc);
    redrawArc(incomingArc);
    const shadowArc = Object.assign({}, arc);
    Main.methodObjectShadows.push(shadowArc);
  }
  if (doesExist && Main.isResizing) {
    Aurora.methodObjects[index].posX = incomingArc.posX;
    Aurora.methodObjects[index].posY = incomingArc.posY;
    Aurora.methodObjects[index].width = incomingArc.width;
    Aurora.methodObjects[index].aglStrt = incomingArc.aglStrt;
    Aurora.methodObjects[index].aglEnd = incomingArc.aglEnd;
    Aurora.methodObjects[index].lineWidth = incomingArc.lineWidth;
    Aurora.methodObjects[index].color = incomingArc.color;
    Aurora.methodObjects[index].isFilled = incomingArc.isFilled;
    Aurora.methodObjects[index].isAnim = false;
    Aurora.methodObjects[index].props = incomingArc.props;
    Aurora.methodObjects[index].layer = !incomingArc.layer ? 0 : incomingArc.layer;
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
    Main.methodObjectShadows[index].layer = !incomingArc.layer ? 0 : incomingArc.layer;
    redrawArc(incomingArc);
  }
  // checking for animation
  if (doesExist &&
   (Aurora.methodObjects[index].posY !== Main.methodObjectShadows[index].posY ||
   Aurora.methodObjects[index].posX !== Main.methodObjectShadows[index].posX ||
   Aurora.methodObjects[index].width !== Main.methodObjectShadows[index].width ||
   Aurora.methodObjects[index].aglStrt !== Main.methodObjectShadows[index].aglStrt ||
   Aurora.methodObjects[index].aglEnd !== Main.methodObjectShadows[index].aglEnd ||
   Aurora.methodObjects[index].lineWidth !== Main.methodObjectShadows[index].lineWidth ||
   Aurora.methodObjects[index].color !== Main.methodObjectShadows[index].color ||
   Aurora.methodObjects[index].isFilled !== Main.methodObjectShadows[index].isFilled || 
   Aurora.methodObjects[index].layer !== Main.methodObjectShadows[index].layer)
   ) {
     redrawArc(Aurora.methodObjects[index]);
      const shadowArc = Object.assign({}, Aurora.methodObjects[index]);
      Main.methodObjectShadows[index] = shadowArc;
      Aurora.methodObjects[index].isAnim = true;
   } else if (doesExist && Aurora.methodObjects[index].isAnim) {
     redrawArc(Aurora.methodObjects[index]);
     Aurora.methodObjects[index].isAnim = true;
   } else if (doesExist &&
    (Aurora.methodObjects[index].posY === Main.methodObjectShadows[index].posY ||
    Aurora.methodObjects[index].posX === Main.methodObjectShadows[index].posX ||
    Aurora.methodObjects[index].width === Main.methodObjectShadows[index].width ||
    Aurora.methodObjects[index].aglStrt === Main.methodObjectShadows[index].aglStrt ||
    Aurora.methodObjects[index].aglEnd === Main.methodObjectShadows[index].aglEnd ||
    Aurora.methodObjects[index].lineWidth === Main.methodObjectShadows[index].lineWidth ||
    Aurora.methodObjects[index].color === Main.methodObjectShadows[index].color ||
    Aurora.methodObjects[index].isFilled === Main.methodObjectShadows[index].isFilled ||
    Aurora.methodObjects[index].layer === Main.methodObjectShadows[index].layer)) {
      Aurora.methodObjects[index].isAnim = false;
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
      layer: !incomingButton.layer ? 0 : incomingButton.layer,
      action: incomingButton.action,
      isModalBtn: incomingButton.isModalBtn,
      isBtn: true,
      isAnim: false,
      props: incomingButton.props,
      methodId: incomingButton.methodId,
    }
    Aurora.methodObjects.push(button);
    redrawButton(incomingButton);
    const shadowButton = Object.assign({}, button);
    Main.methodObjectShadows.push(shadowButton);
  }
  if (doesExist && Main.isResizing) {
    Aurora.methodObjects[index].posX = incomingButton.posX;
    Aurora.methodObjects[index].posY = incomingButton.posY;
    Aurora.methodObjects[index].width = incomingButton.width;
    Aurora.methodObjects[index].height = incomingButton.height;
    Aurora.methodObjects[index].lineWidth = incomingButton.lineWidth;
    Aurora.methodObjects[index].btnColor = incomingButton.btnColor;
    Aurora.methodObjects[index].txtColor = incomingButton.txtColor;
    Aurora.methodObjects[index].font = incomingButton.font;
    Aurora.methodObjects[index].msg = incomingButton.msg;
    Aurora.methodObjects[index].isFilled = incomingButton.isFilled;
    Aurora.methodObjects[index].action = incomingButton.action;
    Aurora.methodObjects[index].isAnim = false;
    Aurora.methodObjects[index].props = incomingButton.props;
    Aurora.methodObjects[index].layer = !incomingButton.layer ? 0 : incomingButton.layer;
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
    Main.methodObjectShadows[index].layer = !incomingButton.layer ? 0 : incomingButton.layer;
    redrawButton(incomingButton);
  }
  // checking for animations
  if (doesExist &&
   (Aurora.methodObjects[index].posY !== Main.methodObjectShadows[index].posY ||
   Aurora.methodObjects[index].posX !== Main.methodObjectShadows[index].posX ||
   Aurora.methodObjects[index].width !== Main.methodObjectShadows[index].width ||
   Aurora.methodObjects[index].height !== Main.methodObjectShadows[index].height ||
   Aurora.methodObjects[index].lineWidth !== Main.methodObjectShadows[index].lineWidth ||
   Aurora.methodObjects[index].btnColor !== Main.methodObjectShadows[index].btnColor ||
   Aurora.methodObjects[index].txtColor !== Main.methodObjectShadows[index].txtColor ||
   Aurora.methodObjects[index].font !== Main.methodObjectShadows[index].font ||
   Aurora.methodObjects[index].msg !== Main.methodObjectShadows[index].msg ||
   Aurora.methodObjects[index].isFilled !== Main.methodObjectShadows[index].isFilled || 
   Aurora.methodObjects[index].layer !== Main.methodObjectShadows[index].layer)
   ) {
     redrawButton(Aurora.methodObjects[index]);
      const shadowButton = Object.assign({}, Aurora.methodObjects[index]);
      Main.methodObjectShadows[index] = shadowButton;
      Aurora.methodObjects[index].isAnim = true;
   } else if (doesExist && Aurora.methodObjects[index].isAnim) {
      redrawButton(Aurora.methodObjects[index]);
      Aurora.methodObjects[index].isAnim = false;
   } else if (doesExist &&
    (Aurora.methodObjects[index].posY === Main.methodObjectShadows[index].posY ||
    Aurora.methodObjects[index].posX === Main.methodObjectShadows[index].posX ||
    Aurora.methodObjects[index].width === Main.methodObjectShadows[index].width ||
    Aurora.methodObjects[index].height === Main.methodObjectShadows[index].height ||
    Aurora.methodObjects[index].lineWidth === Main.methodObjectShadows[index].lineWidth ||
    Aurora.methodObjects[index].btnColor === Main.methodObjectShadows[index].btnColor ||
    Aurora.methodObjects[index].txtColor === Main.methodObjectShadows[index].txtColor ||
    Aurora.methodObjects[index].font === Main.methodObjectShadows[index].font ||
    Aurora.methodObjects[index].msg === Main.methodObjectShadows[index].msg ||
    Aurora.methodObjects[index].isFilled === Main.methodObjectShadows[index].isFilled || 
    Aurora.methodObjects[index].layer === Main.methodObjectShadows[index].layer)) {
      Aurora.methodObjects[index].isAnim = false;
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
    if (Aurora.methodObjects[index].isBackground) {
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
      layer: !incomingImg.layer ? 0 : incomingImg.layer,
      isAnim: false,
      isBackground: incomingImg.isBackground,
      props: incomingImg.props,
      methodId: incomingImg.methodId,
    }
    Aurora.methodObjects.push(img);
    redrawImage(incomingImg);
    const shadowImg = Object.assign({}, img);
    Main.methodObjectShadows.push(shadowImg);
  }
  if (doesExist && Main.isResizing) {
    Aurora.methodObjects[index].posX = incomingImg.posX;
    Aurora.methodObjects[index].posY = incomingImg.posY;
    Aurora.methodObjects[index].width = incomingImg.width;
    Aurora.methodObjects[index].height = incomingImg.height;
    Aurora.methodObjects[index].images = incomingImg.images;
    Aurora.methodObjects[index].selectedImage = incomingImg.selectedImage;
    Aurora.methodObjects[index].animTicks = incomingImg.animTicks;
    Aurora.methodObjects[index].ticks = incomingImg.ticks;
    Aurora.methodObjects[index].isAnim = false;
    Aurora.methodObjects[index].isBackground = incomingImg.isBackground;
    Aurora.methodObjects[index].props = incomingImg.props;
    Aurora.methodObjects[index].layer =  !incomingImg.layer ? 0 : incomingImg.layer;
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
    Main.methodObjectShadows[index].layer = !incomingImg.layer ? 0 : incomingImg.layer;
    redrawImage(incomingImg);
  }
  if (doesExist && Aurora.methodObjects[index].isAnim && Aurora.methodObjects[index].isBackground) {
    redrawImage(incomingImg);
    Aurora.methodObjects[index].isAnim = false;
  }
  // checking for animations that isn't a background
  if (doesExist && !Aurora.methodObjects[index].isBackground &&
   (Aurora.methodObjects[index].posY !== Main.methodObjectShadows[index].posY ||
   Aurora.methodObjects[index].posX !== Main.methodObjectShadows[index].posX ||
   Aurora.methodObjects[index].width !== Main.methodObjectShadows[index].width ||
   Aurora.methodObjects[index].height !== Main.methodObjectShadows[index].height ||
   Aurora.methodObjects[index].images !== Main.methodObjectShadows[index].images ||
   Aurora.methodObjects[index].selectedImage !== Main.methodObjectShadows[index].selectedImage ||
   Aurora.methodObjects[index].animTicks !== Main.methodObjectShadows[index].animTicks ||
   Aurora.methodObjects[index].ticks !== Main.methodObjectShadows[index].ticks || 
   Aurora.methodObjects[index].layer !== Main.methodObjectShadows[index].layer)
   ) {
      redrawImage(Aurora.methodObjects[index]);
      const shadowImage = Object.assign({}, Aurora.methodObjects[index]);
      Main.methodObjectShadows[index] = shadowImage;
      Aurora.methodObjects[index].isAnim = true;
   } else if (doesExist &&
    !Aurora.methodObjects[index].isBackground &&
    Aurora.methodObjects[index].isAnim) {
      Aurora.methodObjects[index].isAnim = true;
      redrawImage(Aurora.methodObjects[index]);
   } else if (doesExist &&
    !Aurora.methodObjects[index].isBackground &&
    (Aurora.methodObjects[index].posY === Main.methodObjectShadows[index].posY ||
    Aurora.methodObjects[index].posX === Main.methodObjectShadows[index].posX ||
    Aurora.methodObjects[index].width === Main.methodObjectShadows[index].width ||
    Aurora.methodObjects[index].height === Main.methodObjectShadows[index].height ||
    Aurora.methodObjects[index].images === Main.methodObjectShadows[index].images ||
    Aurora.methodObjects[index].selectedImage === Main.methodObjectShadows[index].selectedImage ||
    Aurora.methodObjects[index].animTicks === Main.methodObjectShadows[index].animTicks ||
    Aurora.methodObjects[index].ticks === Main.methodObjectShadows[index].ticks || 
    Aurora.methodObjects[index].layer === Main.methodObjectShadows[index].layer)) {
      Aurora.methodObjects[index].isAnim = false;
   }
}
function redrawImage(incomingImg) {
  if (incomingImg.images.length > 0 && incomingImg.selectedImage >= 0) {
    Main.stage.drawImage(incomingImg.images[incomingImg.selectedImage], incomingImg.posX, incomingImg.posY, incomingImg.width, incomingImg.height);
  }

}
function drawImagePatternMethod(incomingImgPat) {
  let doesExist = doesMethodParamExist(incomingImgPat.methodId);
  let index = -1;
  if (doesExist) {
    index = findMethodParamIndex(incomingImgPat.methodId);
    // check to see if there is animations going on.
    if (Aurora.methodObjects[index].isBackground) {
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
      layer: !incomingImgPat.layer ? 0 : incomingImgPat.layer,
      isAnim: false,
      isBackground: incomingImgPat.isBackground,
      props: incomingImgPat.props,
      methodId: incomingImgPat.methodId,
    }
    Aurora.methodObjects.push(imgPat);
    redrawImagePattern(incomingImgPat);
    const shadowImgPat = Object.assign({}, imgPat);
    Main.methodObjectShadows.push(shadowImgPat);
  }
  if (doesExist && Main.isResizing) {
    Aurora.methodObjects[index].posX = incomingImgPat.posX;
    Aurora.methodObjects[index].posY = incomingImgPat.posY;
    Aurora.methodObjects[index].width = incomingImgPat.width;
    Aurora.methodObjects[index].height = incomingImgPat.height;
    Aurora.methodObjects[index].patternWidth = incomingImgPat.patternWidth;
    Aurora.methodObjects[index].patternHeight = incomingImgPat.patternHeight;
    Aurora.methodObjects[index].images = incomingImgPat.images;
    Aurora.methodObjects[index].selectedImage = incomingImgPat.selectedImage;
    Aurora.methodObjects[index].animTicks = incomingImgPat.animTicks;
    Aurora.methodObjects[index].ticks = incomingImgPat.ticks;
    Aurora.methodObjects[index].isAnim = false;
    Aurora.methodObjects[index].isBackground = incomingImgPat.isBackground;
    Aurora.methodObjects[index].props = incomingImgPat.props;
    Aurora.methodObjects[index].layer = !incomingImgPat.layer ? 0 : incomingImgPat.layer;
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
    Main.methodObjectShadows[index].layer = !incomingImgPat.layer ? 0 : incomingImgPat.layer;
    redrawImagePattern(incomingImgPat);
  }
  if (doesExist && Aurora.methodObjects[index].isAnim && Aurora.methodObjects[index].isBackground) {
    redrawImagePattern(incomingImgPat);
    Aurora.methodObjects[index].isAnim = false;
  }
  // checking for animations that isn't a background
  if (doesExist && !Aurora.methodObjects[index].isBackground &&
   (Aurora.methodObjects[index].posY !== Main.methodObjectShadows[index].posY ||
   Aurora.methodObjects[index].posX !== Main.methodObjectShadows[index].posX ||
   Aurora.methodObjects[index].width !== Main.methodObjectShadows[index].width ||
   Aurora.methodObjects[index].height !== Main.methodObjectShadows[index].height ||
   Aurora.methodObjects[index].patternWidth !== Main.methodObjectShadows[index].patternWidth ||
   Aurora.methodObjects[index].patternHeight !== Main.methodObjectShadows[index].patternHeight ||
   Aurora.methodObjects[index].images !== Main.methodObjectShadows[index].images ||
   Aurora.methodObjects[index].selectedImage !== Main.methodObjectShadows[index].selectedImage ||
   Aurora.methodObjects[index].animTicks !== Main.methodObjectShadows[index].animTicks ||
   Aurora.methodObjects[index].ticks !== Main.methodObjectShadows[index].ticks || 
   Aurora.methodObjects[index].layer !== Main.methodObjectShadows[index].layer)
   ) {
      redrawImagePattern(Aurora.methodObjects[index]);
      const shadowImagePat = Object.assign({}, Aurora.methodObjects[index]);
      Main.methodObjectShadows[index] = shadowImagePat;
      Aurora.methodObjects[index].isAnim = true;
   } else if (doesExist &&
    !Aurora.methodObjects[index].isBackground &&
    Aurora.methodObjects[index].isAnim) {
      Aurora.methodObjects[index].isAnim = true;
      redrawImagePattern(Aurora.methodObjects[index]);
   } else if (doesExist &&
    !Aurora.methodObjects[index].isBackground &&
    (Aurora.methodObjects[index].posY === Main.methodObjectShadows[index].posY ||
    Aurora.methodObjects[index].posX === Main.methodObjectShadows[index].posX ||
    Aurora.methodObjects[index].width === Main.methodObjectShadows[index].width ||
    Aurora.methodObjects[index].height === Main.methodObjectShadows[index].height ||
    Aurora.methodObjects[index].patternWidth === Main.methodObjectShadows[index].patternWidth ||
    Aurora.methodObjects[index].patternHeight === Main.methodObjectShadows[index].patternHeight ||
    Aurora.methodObjects[index].images === Main.methodObjectShadows[index].images ||
    Aurora.methodObjects[index].selectedImage === Main.methodObjectShadows[index].selectedImage ||
    Aurora.methodObjects[index].animTicks === Main.methodObjectShadows[index].animTicks ||
    Aurora.methodObjects[index].ticks === Main.methodObjectShadows[index].ticks || 
    Aurora.methodObjects[index].layer === Main.methodObjectShadows[index].layer)) {
      Aurora.methodObjects[index].isAnim = false;
   }
}
function redrawImagePattern(incomingImgPat) {
  if (incomingImgPat.images.length > 0 && incomingImgPat.selectedImage >= 0) {
    if (Aurora.entitySize > 0) { // when the game is ready...
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
      txtColor: incomingButtonImage.txtColor,
      font: incomingButtonImage.font,
      msg: incomingButtonImage.msg,
      images: incomingButtonImage.images,
      selectedImage: incomingButtonImage.selectedImage,
      animTicks: incomingButtonImage.animTicks,
      ticks: incomingButtonImage.ticks,
      id: incomingButtonImage.id,
      layer: !incomingButtonImage.layer ? 0 : incomingButtonImage.layer,
      action: incomingButtonImage.action,
      isModalBtn: incomingButtonImage.isModalBtn,
      isBtn: true,
      isAnim: false,
      props: incomingButtonImage.props,
      methodId: incomingButtonImage.methodId,
    }
    Aurora.methodObjects.push(buttonImg);
    redrawButtonImage(incomingButtonImage);
    const shadowButtonImg = Object.assign({}, buttonImg);
    Main.methodObjectShadows.push(shadowButtonImg);
  }
  if (doesExist && Main.isResizing) {
    Aurora.methodObjects[index].posX = incomingButtonImage.posX;
    Aurora.methodObjects[index].posY = incomingButtonImage.posY;
    Aurora.methodObjects[index].width = incomingButtonImage.width;
    Aurora.methodObjects[index].height = incomingButtonImage.height;
    Aurora.methodObjects[index].txtColor = incomingButtonImage.txtColor;
    Aurora.methodObjects[index].font = incomingButtonImage.font;
    Aurora.methodObjects[index].msg = incomingButtonImage.msg;
    Aurora.methodObjects[index].images = incomingButtonImage.images;
    Aurora.methodObjects[index].selectedImage = incomingButtonImage.selectedImage;
    Aurora.methodObjects[index].animTicks = incomingButtonImage.animTicks;
    Aurora.methodObjects[index].ticks = incomingButtonImage.ticks;
    Aurora.methodObjects[index].action = incomingButtonImage.action;
    Aurora.methodObjects[index].isAnim = false;
    Aurora.methodObjects[index].props = incomingButtonImage.props;
    Aurora.methodObjects[index].layer = !incomingButtonImage.layer ? 0 : incomingButtonImage.layer;
    Main.methodObjectShadows[index].posX = incomingButtonImage.posX;
    Main.methodObjectShadows[index].posY = incomingButtonImage.posY;
    Main.methodObjectShadows[index].width = incomingButtonImage.width;
    Main.methodObjectShadows[index].height = incomingButtonImage.height;
    Main.methodObjectShadows[index].txtColor = incomingButtonImage.txtColor;
    Main.methodObjectShadows[index].font = incomingButtonImage.font;
    Main.methodObjectShadows[index].msg = incomingButtonImage.msg;
    Main.methodObjectShadows[index].images = incomingButtonImage.images;
    Main.methodObjectShadows[index].selectedImage = incomingButtonImage.selectedImage;
    Main.methodObjectShadows[index].animTicks = incomingButtonImage.animTicks;
    Main.methodObjectShadows[index].ticks = incomingButtonImage.ticks;
    Main.methodObjectShadows[index].action = incomingButtonImage.action;
    Main.methodObjectShadows[index].isAnim = false;
    Main.methodObjectShadows[index].props = incomingButtonImage.props;
    Main.methodObjectShadows[index].layer = !incomingButtonImage.layer ? 0 : incomingButtonImage.layer;
    redrawButtonImage(incomingButtonImage);
  }
  // checking for animations
  if (doesExist &&
   (Aurora.methodObjects[index].posY !== Main.methodObjectShadows[index].posY ||
   Aurora.methodObjects[index].posX !== Main.methodObjectShadows[index].posX ||
   Aurora.methodObjects[index].width !== Main.methodObjectShadows[index].width ||
   Aurora.methodObjects[index].height !== Main.methodObjectShadows[index].height ||
   Aurora.methodObjects[index].txtColor !== Main.methodObjectShadows[index].txtColor ||
   Aurora.methodObjects[index].font !== Main.methodObjectShadows[index].font ||
   Aurora.methodObjects[index].msg !== Main.methodObjectShadows[index].msg ||
   Aurora.methodObjects[index].images !== Main.methodObjectShadows[index].images ||
   Aurora.methodObjects[index].selectedImage !== Main.methodObjectShadows[index].selectedImage ||
   Aurora.methodObjects[index].animTicks !== Main.methodObjectShadows[index].animTicks ||
   Aurora.methodObjects[index].ticks !== Main.methodObjectShadows[index].ticks || 
   Aurora.methodObjects[index].layer !== Main.methodObjectShadows[index].layer)
   ) {
     redrawButtonImage(Aurora.methodObjects[index]);
      const shadowButtonImg = Object.assign({}, Aurora.methodObjects[index]);
      Main.methodObjectShadows[index] = shadowButtonImg;
      Aurora.methodObjects[index].isAnim = true;
   } else if (doesExist && Aurora.methodObjects[index].isAnim) {
      redrawButtonImage(Aurora.methodObjects[index]);
      Aurora.methodObjects[index].isAnim = false;
   } else if (doesExist &&
    (Aurora.methodObjects[index].posY === Main.methodObjectShadows[index].posY ||
    Aurora.methodObjects[index].posX === Main.methodObjectShadows[index].posX ||
    Aurora.methodObjects[index].width === Main.methodObjectShadows[index].width ||
    Aurora.methodObjects[index].height === Main.methodObjectShadows[index].height ||
    Aurora.methodObjects[index].txtColor === Main.methodObjectShadows[index].txtColor ||
    Aurora.methodObjects[index].font === Main.methodObjectShadows[index].font ||
    Aurora.methodObjects[index].msg === Main.methodObjectShadows[index].msg ||
    Aurora.methodObjects[index].images === Main.methodObjectShadows[index].images ||
    Aurora.methodObjects[index].selectedImage === Main.methodObjectShadows[index].selectedImage ||
    Aurora.methodObjects[index].animTicks === Main.methodObjectShadows[index].animTicks ||
    Aurora.methodObjects[index].ticks === Main.methodObjectShadows[index].ticks || 
    Aurora.methodObjects[index].layer === Main.methodObjectShadows[index].layer)) {
      Aurora.methodObjects[index].isAnim = false;
   }
}
function redrawButtonImage(incomingButtonImage) {
	redrawImage(incomingButtonImage);
	Main.stage.fillStyle = incomingButtonImage.txtColor;
	Main.stage.font = incomingButtonImage.font;
	Main.stage.textAlign = 'center';
	Main.stage.fillText(incomingButtonImage.msg, (incomingButtonImage.posX + (incomingButtonImage.width * 0.5)), (incomingButtonImage.posY + (incomingButtonImage.height * 0.63)));
}
function drawSimpleModalMethod(incomingModal) {
  let doesExist = doesMethodParamExist(incomingModal.methodId);
  let index = -1;
  if (doesExist) {
    index = findMethodParamIndex(incomingModal.methodId);
  }
  if (!doesExist) {
    let modal = {
      posX: incomingModal.posX,
      posY: incomingModal.posY,
      width: incomingModal.width,
      height: incomingModal.height,
      lineWidth: incomingModal.lineWidth,
      modalColor: incomingModal.modalColor,
      msgColor: incomingModal.msgColor,
      msgFont: incomingModal.msgFont,
      msg: incomingModal.msg,
      footerColor: incomingModal.footerColor,
      footerFont: incomingModal.footerFont,
      footerMsg: incomingModal.footerMsg,
      bgColor: incomingModal.bgColor,
      isModalFilled: incomingModal.isModalFilled,
      id: incomingModal.id,
      layer: !incomingModal.layer ? 0 : incomingModal.layer,
      action: incomingModal.action,
      isBtn: true,
      isModalBtn: true,
      isAnim: false,
      props: incomingModal.props,
      methodId: incomingModal.methodId,
    }
    Aurora.methodObjects.push(modal);
    redrawSimpleModal(incomingModal);
    const shadowModal = Object.assign({}, modal);
    Main.methodObjectShadows.push(shadowModal);
  }
  if (doesExist && Main.isResizing) {
    Aurora.methodObjects[index].posX = incomingModal.posX;
    Aurora.methodObjects[index].posY = incomingModal.posY;
    Aurora.methodObjects[index].width = incomingModal.width;
    Aurora.methodObjects[index].height = incomingModal.height;
    Aurora.methodObjects[index].lineWidth = incomingModal.lineWidth;
    Aurora.methodObjects[index].modalColor = incomingModal.modalColor;
    Aurora.methodObjects[index].msgColor = incomingModal.msgColor;
    Aurora.methodObjects[index].msgFont = incomingModal.msgFont;
    Aurora.methodObjects[index].msg = incomingModal.msg;
    Aurora.methodObjects[index].footerColor = incomingModal.footerColor;
    Aurora.methodObjects[index].footerFont = incomingModal.footerFont;
    Aurora.methodObjects[index].footerMsg = incomingModal.footerMsg;
    Aurora.methodObjects[index].bgColor = incomingModal.bgColor;
    Aurora.methodObjects[index].isModalFilled = incomingModal.isModalFilled;
    Aurora.methodObjects[index].action = incomingModal.action;
    Aurora.methodObjects[index].isAnim = false;
    Aurora.methodObjects[index].props = incomingModal.props;
    Aurora.methodObjects[index].layer = !incomingModal.layer ? 0 : incomingModal.layer;
    Main.methodObjectShadows[index].posX = incomingModal.posX;
    Main.methodObjectShadows[index].posY = incomingModal.posY;
    Main.methodObjectShadows[index].width = incomingModal.width;
    Main.methodObjectShadows[index].height = incomingModal.height;
    Main.methodObjectShadows[index].lineWidth = incomingModal.lineWidth;
    Main.methodObjectShadows[index].modalColor = incomingModal.modalColor;
    Main.methodObjectShadows[index].msgColor = incomingModal.msgColor;
    Main.methodObjectShadows[index].msgFont = incomingModal.msgFont;
    Main.methodObjectShadows[index].msg = incomingModal.msg;
    Main.methodObjectShadows[index].footerColor = incomingModal.footerColor;
    Main.methodObjectShadows[index].footerFont = incomingModal.footerFont;
    Main.methodObjectShadows[index].footerMsg = incomingModal.footerMsg;
    Main.methodObjectShadows[index].bgColor = incomingModal.bgColor;
    Main.methodObjectShadows[index].isModalFilled = incomingModal.isModalFilled;
    Main.methodObjectShadows[index].action = incomingModal.action;
    Main.methodObjectShadows[index].isAnim = false;
    Main.methodObjectShadows[index].props = incomingModal.props;
    Main.methodObjectShadows[index].layer = !incomingModal.layer ? 0 : incomingModal.layer;
    redrawSimpleModal(incomingModal);
  }
  // checking for animations
  if (doesExist &&
   (Aurora.methodObjects[index].posY !== Main.methodObjectShadows[index].posY ||
   Aurora.methodObjects[index].posX !== Main.methodObjectShadows[index].posX ||
   Aurora.methodObjects[index].width !== Main.methodObjectShadows[index].width ||
   Aurora.methodObjects[index].height !== Main.methodObjectShadows[index].height ||
   Aurora.methodObjects[index].lineWidth !== Main.methodObjectShadows[index].lineWidth ||
   Aurora.methodObjects[index].modalColor !== Main.methodObjectShadows[index].modalColor ||
   Aurora.methodObjects[index].msgColor !== Main.methodObjectShadows[index].msgColor ||
   Aurora.methodObjects[index].msgFont !== Main.methodObjectShadows[index].msgFont ||
   Aurora.methodObjects[index].msg !== Main.methodObjectShadows[index].msg ||
   Aurora.methodObjects[index].footerColor !== Main.methodObjectShadows[index].footerColor ||
   Aurora.methodObjects[index].footerFont !== Main.methodObjectShadows[index].footerFont ||
   Aurora.methodObjects[index].footerMsg !== Main.methodObjectShadows[index].footerMsg ||
   Aurora.methodObjects[index].bgColor !== Main.methodObjectShadows[index].bgColor ||
   Aurora.methodObjects[index].isModalFilled !== Main.methodObjectShadows[index].isModalFilled || 
   Aurora.methodObjects[index].layer !== Main.methodObjectShadows[index].layer)
   ) {
     redrawSimpleModal(Aurora.methodObjects[index]);
      const shadowModal = Object.assign({}, Aurora.methodObjects[index]);
      Main.methodObjectShadows[index] = shadowModal;
      Aurora.methodObjects[index].isAnim = true;
   } else if (doesExist && Aurora.methodObjects[index].isAnim) {
      redrawSimpleModal(Aurora.methodObjects[index]);
      Aurora.methodObjects[index].isAnim = false;
   } else if (doesExist &&
    (Aurora.methodObjects[index].posY === Main.methodObjectShadows[index].posY ||
    Aurora.methodObjects[index].posX === Main.methodObjectShadows[index].posX ||
    Aurora.methodObjects[index].width === Main.methodObjectShadows[index].width ||
    Aurora.methodObjects[index].height === Main.methodObjectShadows[index].height ||
    Aurora.methodObjects[index].lineWidth === Main.methodObjectShadows[index].lineWidth ||
    Aurora.methodObjects[index].modalColor === Main.methodObjectShadows[index].modalColor ||
    Aurora.methodObjects[index].msgColor === Main.methodObjectShadows[index].msgColor ||
    Aurora.methodObjects[index].msgFont === Main.methodObjectShadows[index].msgFont ||
    Aurora.methodObjects[index].msg === Main.methodObjectShadows[index].msg ||
    Aurora.methodObjects[index].footerColor === Main.methodObjectShadows[index].footerColor ||
    Aurora.methodObjects[index].footerFont === Main.methodObjectShadows[index].footerFont ||
    Aurora.methodObjects[index].footerMsg === Main.methodObjectShadows[index].footerMsg ||
    Aurora.methodObjects[index].bgColor === Main.methodObjectShadows[index].bgColor ||
    Aurora.methodObjects[index].isModalFilled === Main.methodObjectShadows[index].isModalFilled || 
    Aurora.methodObjects[index].layer === Main.methodObjectShadows[index].layer)) {
      Aurora.methodObjects[index].isAnim = false;
   }
}
function redrawSimpleModal(incomingModal) {
	if (incomingModal.bgColor.length > 0) {
		Main.stage.beginPath();
		Main.stage.rect(0, 0, Aurora.canvas.width, Aurora.canvas.height);
		Main.stage.fillStyle = incomingModal.bgColor;
		Main.stage.fill();
	}
	
	Main.stage.beginPath();
	if (!incomingModal.lineWidth) {
		Main.stage.lineWidth = '1';
	} else {
		Main.stage.lineWidth = incomingModal.lineWidth;
	}
	Main.stage.rect(incomingModal.posX, incomingModal.posY, incomingModal.width, incomingModal.height);
	if (incomingModal.isModalFilled) {
		Main.stage.fillStyle = incomingModal.modalColor;
		Main.stage.fill();
	} else {
		Main.stage.strokeStyle = incomingModal.modalColor;
		Main.stage.stroke();
  }
	Main.stage.fillStyle = incomingModal.msgColor;
	Main.stage.font = incomingModal.msgFont;
	Main.stage.textAlign = 'center';
	Main.stage.fillText(incomingModal.msg, (incomingModal.posX + (incomingModal.width * 0.5)), (incomingModal.posY + (incomingModal.height * 0.63)));
	Main.stage.fillStyle = incomingModal.footerColor;
	Main.stage.font = incomingModal.footerFont;
	Main.stage.fillText(incomingModal.footerMsg, (incomingModal.posX + (incomingModal.width * 0.5)), (incomingModal.posY + (incomingModal.height * 0.96)));
}
function drawModalImageMethod(incomingModalImage) {
  let doesExist = doesMethodParamExist(incomingModalImage.methodId);
  let index = -1;
  if (doesExist) {
    index = findMethodParamIndex(incomingModalImage.methodId);
  }
  if (!doesExist) {
    let buttonImg = {
      posX: incomingModalImage.posX,
      posY: incomingModalImage.posY,
      width: incomingModalImage.width,
      height: incomingModalImage.height,
      msgColor: incomingModalImage.msgColor,
      msgFont: incomingModalImage.msgFont,
      msgs: incomingModalImage.msgs,
      msgStart: incomingModalImage.msgStart,
      msgDistance: incomingModalImage.msgDistance,
      images: incomingModalImage.images,
      selectedImage: incomingModalImage.selectedImage,
      animTicks: incomingModalImage.animTicks,
      ticks: incomingModalImage.ticks,
      id: incomingModalImage.id,
      layer: !incomingModalImage.layer ? 0 : incomingModalImage.layer,
      action: incomingModalImage.action,
      isBtn: true,
      isModalBtn: incomingModalImage.incomingModalImage,
      isAnim: false,
      props: incomingModalImage.props,
      methodId: incomingModalImage.methodId,
    }
    Aurora.methodObjects.push(buttonImg);
    redrawModalImage(incomingModalImage);
    const shadowButtonImg = Object.assign({}, buttonImg);
    Main.methodObjectShadows.push(shadowButtonImg);
  }
  if (doesExist && Main.isResizing) {
    Aurora.methodObjects[index].posX = incomingModalImage.posX;
    Aurora.methodObjects[index].posY = incomingModalImage.posY;
    Aurora.methodObjects[index].width = incomingModalImage.width;
    Aurora.methodObjects[index].height = incomingModalImage.height;
    Aurora.methodObjects[index].msgColor = incomingModalImage.msgColor;
    Aurora.methodObjects[index].msgFont = incomingModalImage.msgFont;
    Aurora.methodObjects[index].msgs = incomingModalImage.msgs;
    Aurora.methodObjects[index].msgStart = incomingModalImage.msgStart;
    Aurora.methodObjects[index].msgDistance = incomingModalImage.msgDistance;
    Aurora.methodObjects[index].images = incomingModalImage.images;
    Aurora.methodObjects[index].selectedImage = incomingModalImage.selectedImage;
    Aurora.methodObjects[index].animTicks = incomingModalImage.animTicks;
    Aurora.methodObjects[index].ticks = incomingModalImage.ticks;
    Aurora.methodObjects[index].action = incomingModalImage.action;
    Aurora.methodObjects[index].isAnim = false;
    Aurora.methodObjects[index].props = incomingModalImage.props;
    Aurora.methodObjects[index].layer = !incomingModalImage.layer ? 0 : incomingModalImage.layer;
    Main.methodObjectShadows[index].posX = incomingModalImage.posX;
    Main.methodObjectShadows[index].posY = incomingModalImage.posY;
    Main.methodObjectShadows[index].width = incomingModalImage.width;
    Main.methodObjectShadows[index].height = incomingModalImage.height;
    Main.methodObjectShadows[index].images = incomingModalImage.images;
    Main.methodObjectShadows[index].selectedImage = incomingModalImage.selectedImage;
    Main.methodObjectShadows[index].animTicks = incomingModalImage.animTicks;
    Main.methodObjectShadows[index].ticks = incomingModalImage.ticks;
    Main.methodObjectShadows[index].action = incomingModalImage.action;
    Main.methodObjectShadows[index].isAnim = false;
    Main.methodObjectShadows[index].props = incomingModalImage.props;
    Main.methodObjectShadows[index].layer = !incomingModalImage.layer ? 0 : incomingModalImage.layer;
    redrawModalImage(incomingModalImage);
  }
  // checking for animations
  if (doesExist &&
   (Aurora.methodObjects[index].posY !== Main.methodObjectShadows[index].posY ||
   Aurora.methodObjects[index].posX !== Main.methodObjectShadows[index].posX ||
   Aurora.methodObjects[index].width !== Main.methodObjectShadows[index].width ||
   Aurora.methodObjects[index].height !== Main.methodObjectShadows[index].height ||
   Aurora.methodObjects[index].msgColor !== Main.methodObjectShadows[index].msgColor ||
   Aurora.methodObjects[index].msgFont !== Main.methodObjectShadows[index].msgFont ||
   Aurora.methodObjects[index].msgs !== Main.methodObjectShadows[index].msgs ||
   Aurora.methodObjects[index].msgStart !== Main.methodObjectShadows[index].msgStart ||
   Aurora.methodObjects[index].msgDistance !== Main.methodObjectShadows[index].msgDistance ||
   Aurora.methodObjects[index].images !== Main.methodObjectShadows[index].images ||
   Aurora.methodObjects[index].selectedImage !== Main.methodObjectShadows[index].selectedImage ||
   Aurora.methodObjects[index].animTicks !== Main.methodObjectShadows[index].animTicks ||
   Aurora.methodObjects[index].ticks !== Main.methodObjectShadows[index].ticks || 
   Aurora.methodObjects[index].layer !== Main.methodObjectShadows[index].layer)
   ) {
     redrawModalImage(Aurora.methodObjects[index]);
      const shadowButtonImg = Object.assign({}, Aurora.methodObjects[index]);
      Main.methodObjectShadows[index] = shadowButtonImg;
      Aurora.methodObjects[index].isAnim = true;
   } else if (doesExist && Aurora.methodObjects[index].isAnim) {
      redrawModalImage(Aurora.methodObjects[index]);
      Aurora.methodObjects[index].isAnim = false;
   } else if (doesExist &&
    (Aurora.methodObjects[index].posY === Main.methodObjectShadows[index].posY ||
    Aurora.methodObjects[index].posX === Main.methodObjectShadows[index].posX ||
    Aurora.methodObjects[index].width === Main.methodObjectShadows[index].width ||
    Aurora.methodObjects[index].height === Main.methodObjectShadows[index].height ||
    Aurora.methodObjects[index].msgColor === Main.methodObjectShadows[index].msgColor ||
    Aurora.methodObjects[index].msgFont === Main.methodObjectShadows[index].msgFont ||
    Aurora.methodObjects[index].msgs === Main.methodObjectShadows[index].msgs ||
    Aurora.methodObjects[index].msgStart === Main.methodObjectShadows[index].msgStart ||
    Aurora.methodObjects[index].msgDistance === Main.methodObjectShadows[index].msgDistance ||
    Aurora.methodObjects[index].images === Main.methodObjectShadows[index].images ||
    Aurora.methodObjects[index].selectedImage === Main.methodObjectShadows[index].selectedImage ||
    Aurora.methodObjects[index].animTicks === Main.methodObjectShadows[index].animTicks ||
    Aurora.methodObjects[index].ticks === Main.methodObjectShadows[index].ticks || 
    Aurora.methodObjects[index].layer === Main.methodObjectShadows[index].layer)) {
      Aurora.methodObjects[index].isAnim = false;
   }
}
function redrawModalImage(incomingModalImage) {
	redrawImage(incomingModalImage);
	Main.stage.fillStyle = incomingModalImage.msgColor;
	Main.stage.font = incomingModalImage.msgFont;
	Main.stage.textAlign = 'center';
	incomingModalImage.msgs.forEach((msg, i) => {
		Main.stage.fillText(msg, (incomingModalImage.posX + (incomingModalImage.width * 0.5)), (incomingModalImage.msgStart + (incomingModalImage.msgDistance * i)));
	});
}
function drawDialogueModalMethod(incomingModal) {
  let doesExist = doesMethodParamExist(incomingModal.methodId);
  let index = -1;
  if (doesExist) {
    index = findMethodParamIndex(incomingModal.methodId);
  }
  if (!doesExist) {
    let modal = {
      posX: incomingModal.posX,
      posY: incomingModal.posY,
      width: incomingModal.width,
      height: incomingModal.height,
      lineWidth: incomingModal.lineWidth,
      modalColor: incomingModal.modalColor,
      msgColor: incomingModal.msgColor,
      msgFont: incomingModal.msgFont,
      msgs: incomingModal.msgs,
      msgStart: incomingModal.msgStart,
      msgDistance: incomingModal.msgDistance,
      bgColor: incomingModal.bgColor,
      isModalFilled: incomingModal.isModalFilled,
      id: incomingModal.id,
      layer: !incomingModal.layer ? 0 : incomingModal.layer,
      action: incomingModal.action,
      isBtn: true,
      isModalBtn: incomingModal.isModalBtn,
      isAnim: false,
      props: incomingModal.props,
      methodId: incomingModal.methodId,
    }
    Aurora.methodObjects.push(modal);
    redrawDialogueModal(incomingModal);
    const shadowModal = Object.assign({}, modal);
    Main.methodObjectShadows.push(shadowModal);
  }
  if (doesExist && Main.isResizing) {
    Aurora.methodObjects[index].posX = incomingModal.posX;
    Aurora.methodObjects[index].posY = incomingModal.posY;
    Aurora.methodObjects[index].width = incomingModal.width;
    Aurora.methodObjects[index].height = incomingModal.height;
    Aurora.methodObjects[index].lineWidth = incomingModal.lineWidth;
    Aurora.methodObjects[index].modalColor = incomingModal.modalColor;
    Aurora.methodObjects[index].msgColor = incomingModal.msgColor;
    Aurora.methodObjects[index].msgFont = incomingModal.msgFont;
    Aurora.methodObjects[index].msgs = incomingModal.msgs;
    Aurora.methodObjects[index].msgStart = incomingModal.msgStart;
    Aurora.methodObjects[index].msgDistance = incomingModal.msgDistance;
    Aurora.methodObjects[index].bgColor = incomingModal.bgColor;
    Aurora.methodObjects[index].isModalFilled = incomingModal.isModalFilled;
    Aurora.methodObjects[index].action = incomingModal.action;
    Aurora.methodObjects[index].isAnim = false;
    Aurora.methodObjects[index].props = incomingModal.props;
    Aurora.methodObjects[index].layer = !incomingModal.layer ? 0 : incomingModal.layer;
    Main.methodObjectShadows[index].posX = incomingModal.posX;
    Main.methodObjectShadows[index].posY = incomingModal.posY;
    Main.methodObjectShadows[index].width = incomingModal.width;
    Main.methodObjectShadows[index].height = incomingModal.height;
    Main.methodObjectShadows[index].lineWidth = incomingModal.lineWidth;
    Main.methodObjectShadows[index].modalColor = incomingModal.modalColor;
    Main.methodObjectShadows[index].msgColor = incomingModal.msgColor;
    Main.methodObjectShadows[index].msgFont = incomingModal.msgFont;
    Main.methodObjectShadows[index].msgs = incomingModal.msgs;
    Main.methodObjectShadows[index].msgStart = incomingModal.msgStart;
    Main.methodObjectShadows[index].msgDistance = incomingModal.msgDistance;
    Main.methodObjectShadows[index].bgColor = incomingModal.bgColor;
    Main.methodObjectShadows[index].isModalFilled = incomingModal.isModalFilled;
    Main.methodObjectShadows[index].action = incomingModal.action;
    Main.methodObjectShadows[index].isAnim = false;
    Main.methodObjectShadows[index].props = incomingModal.props;
    Main.methodObjectShadows[index].layer = !incomingModal.layer ? 0 : incomingModal.layer;
    redrawDialogueModal(incomingModal);
  }
  // checking for animations
  if (doesExist &&
   (Aurora.methodObjects[index].posY !== Main.methodObjectShadows[index].posY ||
   Aurora.methodObjects[index].posX !== Main.methodObjectShadows[index].posX ||
   Aurora.methodObjects[index].width !== Main.methodObjectShadows[index].width ||
   Aurora.methodObjects[index].height !== Main.methodObjectShadows[index].height ||
   Aurora.methodObjects[index].lineWidth !== Main.methodObjectShadows[index].lineWidth ||
   Aurora.methodObjects[index].modalColor !== Main.methodObjectShadows[index].modalColor ||
   Aurora.methodObjects[index].msgColor !== Main.methodObjectShadows[index].msgColor ||
   Aurora.methodObjects[index].msgFont !== Main.methodObjectShadows[index].msgFont ||
   Aurora.methodObjects[index].msgs !== Main.methodObjectShadows[index].msgs ||
   Aurora.methodObjects[index].msgStart !== Main.methodObjectShadows[index].msgStart ||
   Aurora.methodObjects[index].msgDistance !== Main.methodObjectShadows[index].msgDistance ||
   Aurora.methodObjects[index].bgColor !== Main.methodObjectShadows[index].bgColor ||
   Aurora.methodObjects[index].isModalFilled !== Main.methodObjectShadows[index].isModalFilled ||
   Aurora.methodObjects[index].layer !== Main.methodObjectShadows[index].layer)
   ) {
     redrawDialogueModal(Aurora.methodObjects[index]);
      const shadowModal = Object.assign({}, Aurora.methodObjects[index]);
      Main.methodObjectShadows[index] = shadowModal;
      Aurora.methodObjects[index].isAnim = true;
   } else if (doesExist && Aurora.methodObjects[index].isAnim) {
      redrawDialogueModal(Aurora.methodObjects[index]);
      Aurora.methodObjects[index].isAnim = false;
   } else if (doesExist &&
    (Aurora.methodObjects[index].posY === Main.methodObjectShadows[index].posY ||
    Aurora.methodObjects[index].posX === Main.methodObjectShadows[index].posX ||
    Aurora.methodObjects[index].width === Main.methodObjectShadows[index].width ||
    Aurora.methodObjects[index].height === Main.methodObjectShadows[index].height ||
    Aurora.methodObjects[index].lineWidth === Main.methodObjectShadows[index].lineWidth ||
    Aurora.methodObjects[index].modalColor === Main.methodObjectShadows[index].modalColor ||
    Aurora.methodObjects[index].msgColor === Main.methodObjectShadows[index].msgColor ||
    Aurora.methodObjects[index].msgFont === Main.methodObjectShadows[index].msgFont ||
    Aurora.methodObjects[index].msgs === Main.methodObjectShadows[index].msgs ||
    Aurora.methodObjects[index].msgStart === Main.methodObjectShadows[index].msgStart ||
    Aurora.methodObjects[index].msgDistance === Main.methodObjectShadows[index].msgDistance ||
    Aurora.methodObjects[index].bgColor === Main.methodObjectShadows[index].bgColor ||
    Aurora.methodObjects[index].isModalFilled === Main.methodObjectShadows[index].isModalFilled || 
    Aurora.methodObjects[index].layer === Main.methodObjectShadows[index].layer)) {
      Aurora.methodObjects[index].isAnim = false;
   }
}
function redrawDialogueModal(incomingModal) {
	if (incomingModal.bgColor.length > 0) {
		Main.stage.beginPath();
		Main.stage.rect(0, 0, Aurora.canvas.width, Aurora.canvas.height);
		Main.stage.fillStyle = incomingModal.bgColor;
		Main.stage.fill();
	}
	
	Main.stage.beginPath();
	if (!incomingModal.lineWidth) {
		Main.stage.lineWidth = '1';
	} else {
		Main.stage.lineWidth = incomingModal.lineWidth;
	}
	Main.stage.rect(incomingModal.posX, incomingModal.posY, incomingModal.width, incomingModal.height);
	if (incomingModal.isModalFilled) {
		Main.stage.fillStyle = incomingModal.modalColor;
		Main.stage.fill();
	} else {
		Main.stage.strokeStyle = incomingModal.modalColor;
		Main.stage.stroke();
  }
	Main.stage.fillStyle = incomingModal.msgColor;
	Main.stage.font = incomingModal.msgFont;
	Main.stage.textAlign = 'center';
	incomingModal.msgs.forEach((msg, i) => {
		Main.stage.fillText(msg, (incomingModal.posX + (incomingModal.width * 0.5)), (incomingModal.msgStart + (incomingModal.msgDistance * i)));
	});
}
