const currentScript = getCurrentScript();
let gifWorker;
const gifWorkerCallbacks = {};

function createImagesFromGif(imageSrc, methodId) { // call this when you want to convert a gif to base64 pngs

  const img = new Image();
  img.src = imageSrc;
  let sendImage = true;
  img.onload = function() {
    newGifImg(img, sendImage, methodId);
    sendImage = false;
  }
} // completedCallback() is the method that returns the base64 pngs

function calculateBestSize(width, height, count) {
  let bestcols = 1,
    bestratio = Number.MAX_VALUE;
  for (let cols = 1; cols <= count; cols++) {
    const w = width;
    const h = Math.ceil(count / cols) * height;
    const ratio = w / h;
    if (Math.abs(ratio - 1) < bestratio) {
      bestratio = Math.abs(ratio - 1);
      bestcols = cols;
    }
  }
  return bestcols;
}
function handleFiles(e) {
  const reader = new FileReader;
  reader.onload = function(event) {
    const img = document.getElementById('image1');
    img.src = event.target.result;
  }
  reader.readAsDataURL(e.target.files[0]);
}
function newGifImg(img, banana, methodId) { // this is the main function
    const gif = createGif(img.src);
    gif.addEventListener('load', function readGif(e) {
        const width = gif.naturalWidth, height = gif.naturalHeight;
        const cols = calculateBestSize(width, gif.naturalHeight, gif.frameCount);
        const rows = Math.ceil(gif.frameCount / cols);
        const scale = 1;
        const finalColWidth = Math.round(width * scale);
        const finalRowWidth = Math.round(height * scale);
        const canvas = document.createElement('canvas');
        canvas.width = finalColWidth;
        canvas.height = rows * finalRowWidth;
        const ctx = canvas.getContext('2d');
        for (let i = 0; i < gif.frameCount; i++) {
            const c = i % cols;
            const r = Math.floor(i / cols);

            gif.putOnCanvas(
                ctx,
                canvas,
                0,0,
                finalColWidth,
                finalRowWidth,
                c * finalColWidth,
                r * finalColWidth,
                finalColWidth,
                finalRowWidth,
                i,
                completedCallback
            );
        }
        let count = 0;
        const gifImages = [];

        return count;

        function completedCallback() {
            count++;
            gifImages.push(canvas.toDataURL());
            if (count>=gif.frameCount) {
              if (methodId) { // if the current methodId is defined...
                // send the images to aruroa_main
                assignImages(gifImages, methodId); // when the images are ready, these are the raw base64 pngs
                gif.removeEventListener('load', readGif); // remove the old event listenter
              }
            }
        }
    });
}
function createGif(src) {
    const completeCallbacks = [];
    const sizeLoadedCallbacks = [];
    const frameReadyCallbacks = [];
    const frameRenderedCallbacks = [];
    let header;
    const frameInfos = [];
    let renderTime = 0;
    let currentFrame = 0;
    let totalAnimationTime = 0;

    const gifImage = {
        complete:false,
        addFrameReadyCallback: function(frameIndex, callback) {
            if (!frameReadyCallbacks[frameIndex]) {
                frameReadyCallbacks[frameIndex] = [];
            }
            frameReadyCallbacks[frameIndex].push(callback);
        },
        addFrameRenderedCallback: function(frameIndex, callback) {
            if (!frameRenderedCallbacks[frameIndex]) {
                frameRenderedCallbacks[frameIndex] = [];
            }
            frameRenderedCallbacks[frameIndex].push(callback);
        },
        addEventListener:function(type, callback) {
            if (type == 'load') {
                completeCallbacks.push(callback);
            } else if (type == 'sizeLoaded') {
                sizeLoadedCallbacks.push(callback);
            }
        },
        removeEventListener:function(type, callback) {
            const array = type == 'load' ? completeCallbacks : type == 'sizeLoaded' ? sizeLoadedCallbacks : null;
            if (array) {
                const index = array.indexOf(callback);
                array.splice(index,1);
            }
        },
        naturalWidth: 0,
        naturalHeight: 0,
        multiFrame: true,
        getFrame: function() {
            if (!gifImage.complete) return 0;
            if (new Date() > renderTime) {
                currentFrame = (currentFrame+1) % frameInfos.length;
                const totalAnimationTime = frameInfos[frameInfos.length-1].cycleTime;
                renderTime = Math.floor(new Date() / totalAnimationTime) * totalAnimationTime + frameInfos[currentFrame].cycleTime;
            }
            return currentFrame;
        },
        putOnCanvas: function(
                ctx,
                canvas,
                srcX, srcY, srcWidth, srcHeight,
                destX, destY, destWidth, destHeight,
                frameIndex,
                completedCallback
                ) {
            assert(srcWidth==destWidth && srcHeight==destHeight, 'source and dest must match dimensions');

            if (frameIndex === 0 || frameInfos[frameIndex-1].renderPosition) {
                plasterPixels(
                    srcX,srcY,srcWidth,srcHeight,
                    destX,destY,destWidth,destHeight,
                    frameIndex
                );
            } else {
                gifImage.addFrameRenderedCallback(frameIndex - 1,
                    function() {
                        plasterPixels(
                            srcX,srcY,srcWidth,srcHeight,
                            0,0,destWidth,destHeight,
                            frameIndex
                        );
                    }
                );
            }
            function plasterPixels(
                    srcX, srcY, srcWidth, srcHeight,
                    destX, destY, destWidth, destHeight,
                    frameIndex) {

                 if (frameIndex > 0) { //  copy previous frame. That's how gifs work
                    const previousFramePosition = frameInfos[frameIndex-1].renderPosition;
                    const cData = previousFramePosition.context.getImageData(
                        previousFramePosition.x,
                        previousFramePosition.y,
                        previousFramePosition.width,
                        previousFramePosition.height
                    );
                    ctx.putImageData(cData, destX, destY);
                 }

                 const frameInfo = frameInfos[frameIndex];
                 const img = frameInfo.img;
                 const cData = ctx.getImageData(destX + img.leftPos, destY + img.topPos, img.width, img.height);
                 const ct = img.lctFlag ? img.lct : header.gct;

                 sendToGifWorker(
                     frameInfo, cData,
                     header,
                     function(cData) {
                        ctx.putImageData(cData, destX + img.leftPos, destY + img.topPos);

                        frameInfos[frameIndex].renderPosition = {
                            context: ctx,
                            x: destX,
                            y: destY,
                            width: destWidth,
                            height: destHeight,
                        };
                        if (frameRenderedCallbacks[frameIndex]) {
                            frameRenderedCallbacks[frameIndex].forEach(
                               function(callback) { callback.call(); }
                            );
                        }
                        completedCallback();
                     }
                 );
            }
        },
        isFrameLoaded: function(frameIndex) {
            return frameInfos[frameIndex] && frameInfos[frameIndex].img && frameInfos[frameIndex].gce;
        },
        get frameCount() {
            return frameInfos.length;
        },
    };
    function checkComplete(frameIndex) {
        if (gifImage.isFrameLoaded(frameIndex) && frameReadyCallbacks[frameIndex]) {
            frameReadyCallbacks[frameIndex].forEach(
               function(callback) { callback.call(); }
            );
        }
    }
    const handler = {
      hdr: function (hdr) {
        header = hdr;
        gifImage.naturalWidth = header.width;
        gifImage.naturalHeight = header.height;
        sizeLoadedCallbacks.forEach(
            function(callback) { callback.call(); }
        );
      },
      gce: function (gce) {
        if (frameInfos.length==0 || frameInfos[frameInfos.length-1].gce) {
            frameInfos.push({});
        }
        const currentIndex = frameInfos.length - 1;
        frameInfos[currentIndex].gce = gce;
        if (!gce.delayTime) {
            gce.delayTime = 1;
        }
        frameInfos[currentIndex].cycleTime = gce.delayTime * 10
            + (currentIndex === 0 ? 0 : frameInfos[currentIndex-1].cycleTime);
        checkComplete(frameInfos.length-1);
      },
      img: function(img) {
        if (frameInfos.length==0 || frameInfos[frameInfos.length-1].img) {
            frameInfos.push({});
        }
        frameInfos[frameInfos.length-1].img = img;
        checkComplete(frameInfos.length-1);
      },
      eof: function(block) {
        gifImage.complete = true;
        completeCallbacks.forEach(
            function(callback) { callback.call(); }
        );
      }
    };
    loadAsync(src,
        function(content) {
            const stream = new Stream(content);
            parseGIF(stream, handler);
        },
        true
    );
    return gifImage;
}
function initializeGifWorker() {
    gifWorker = new Worker(currentScript.path + 'workers/gifworker.js');
    gifWorker.onmessage = function(e) {
       gifWorkerCallbacks[e.data.id] (e.data.response);
       delete gifWorkerCallbacks[e.data.id];
    }
}
function sendToGifWorker(frameInfo, cData, header, callback) {
    if (!gifWorker) {
        initializeGifWorker();
    }
    const id = Math.floor(Math.random() * 1000 + 1) + '-' + Math.floor(Math.random() * 1000 + 1) + '-' + Math.floor(Math.random() * 1000 + 1);
    gifWorkerCallbacks[id] = callback;
    gifWorker.postMessage({
        frameInfo: frameInfo,
        cData: cData,
        header: header,
        id: id
    });
}
function destroyEverything() {
    if (gifWorker) {
        gifWorker.terminate();
    }
    gifWorker = null;
    gifWorkerCallbacks = null;
}
function loadAsync(src, callback, binary, method, data) {
     const xhr = new XMLHttpRequest();
     xhr.overrideMimeType(binary ? 'text/plain; charset=x-user-defined' : 'text/plain; charset=UTF-8');
     xhr.open(method?method:'GET', src, true);
     xhr.addEventListener('load',
         function (e) {
           if (xhr.readyState === 4) {
             if (xhr.status === 200) {
                 callback(xhr.responseText);
             } else {
                 handleError(xhr.responseText);
             }
           }
         }
     );
     xhr.addEventListener('error',
         function (e) {
             handleError(e);
         }
     );
     xhr.send(data);
}
function assert(condition, message) {
     if (!condition) {
         handleError(message ? message: 'Assert failed: condition not met.');
     }
}
function getCurrentScript() {
     const currentScript = document.currentScript.src;
     const regex = /[a-zA-Z-]*:\/\/[^/]+(\/([^/]+\/)+)(.+)/g;
     const match = regex.exec(currentScript);
     return {
         filename: match[3],
         path: match[1],
         src: match[0],
     };
}
function handleError(error, soft) {
     if (Array.isArray(error)) {
         const array = [];
         for (let i = 0; i < error.length; i++) {
             array.push(error[i]);
             array.push('\n ');
         }
         console.error.apply(null, array);
     } else {
         console.error(error);
     }
     if (!soft) {
         throw new Error('Last error terminated the process.');
     }
}
// *** gif.js begins ***
// *** this reads the gif file... ***

// Generic functions
const bitsToNum = function(ba) {
  return ba.reduce(function(s, n) { return s * 2 + n; }, 0);
};

const byteToBitArr = function(bite) {
  const a = [];
  for (var i = 7; i >= 0; i--) {
    a.push(!!(bite & (1 << i)));
  }
  return a;
};

// Stream
/**
 * @constructor
 */ // Make compiler happy.
const Stream = function(data) {
  this.data = data;
  this.len = this.data.length;
  this.pos = 0;

  this.readByte = function() {
    if (this.pos >= this.data.length) {
      throw new Error('Attempted to read past end of stream.');
    }
    return data.charCodeAt(this.pos++) & 0xFF;
  };

  this.readBytes = function(n) {
    const bytes = [];
    for (let i = 0; i < n; i++) {
      bytes.push(this.readByte());
    }
    return bytes;
  };

  this.read = function(n) {
    let s = '';
    for (let i = 0; i < n; i++) {
      s += String.fromCharCode(this.readByte());
    }
    return s;
  };

  this.readUnsigned = function() { // Little-endian.
    const a = this.readBytes(2);
    return (a[1] << 8) + a[0];
  };
};

const lzwDecode = function(minCodeSize, data) {
  // TODO: Now that the GIF parser is a bit different, maybe this should get an array of bytes instead of a String?
  let pos = 0; // Maybe this streaming thing should be merged with the Stream?

  const readCode = function(size) {
    let code = 0;
    for (let i = 0; i < size; i++) {
      if (data.charCodeAt(pos >> 3) & (1 << (pos & 7))) {
        code |= 1 << i;
      }
      pos++;
    }
    return code;
  };

  const output = [];

  const clearCode = 1 << minCodeSize;
  const eoiCode = clearCode + 1;

  let codeSize = minCodeSize + 1;

  let dict = [];

  const clear = function() {
    dict = [];
    codeSize = minCodeSize + 1;
    for (let i = 0; i < clearCode; i++) {
      dict[i] = [i];
    }
    dict[clearCode] = [];
    dict[eoiCode] = null;

  };

  let code;
  let last;

  while (true) {
    last = code;
    code = readCode(codeSize);

    if (code === clearCode) {
      clear();
      continue;
    }
    if (code === eoiCode) break;

    if (code < dict.length) {
      if (last !== clearCode) {
        dict.push(dict[last].concat(dict[code][0]));
      }
    } else {
      if (code !== dict.length) throw new Error('Invalid LZW code.');
      dict.push(dict[last].concat(dict[last][0]));
    }
    output.push.apply(output, dict[code]);

    if (dict.length === (1 << codeSize) && codeSize < 12) {
      // If we're at the last code and codeSize is 12, the next code will be a clearCode, and it'll be 12 bits long.
      codeSize++;
    }
  }

  // I don't know if this is technically an error, but some GIFs do it.
  //if (Math.ceil(pos / 8) !== data.length) throw new Error('Extraneous LZW bytes.');
  return output;
};

// The actual parsing; returns an object with properties.
const parseGIF = function(st, handler) {
  handler || (handler = {});

  // LZW (GIF-specific)
  const parseCT = function(entries) { // Each entry is 3 bytes, for RGB.
    const ct = [];
    for (let i = 0; i < entries; i++) {
      ct.push(st.readBytes(3));
    }
    return ct;
  };

  const readSubBlocks = function() {
      let size, data;
      data = '';
      do {
        size = st.readByte();
        data += st.read(size);
      } while (size !== 0);
      return data;
  };

  const parseHeader = function() {
    const hdr = {};
    hdr.sig = st.read(3);
    hdr.ver = st.read(3);
    if (hdr.sig !== 'GIF') throw new Error('Not a GIF file.'); // XXX: This should probably be handled more nicely.

    hdr.width = st.readUnsigned();
    hdr.height = st.readUnsigned();

    const bits = byteToBitArr(st.readByte());
    hdr.gctFlag = bits.shift();
    hdr.colorRes = bitsToNum(bits.splice(0, 3));
    hdr.sorted = bits.shift();
    hdr.gctSize = bitsToNum(bits.splice(0, 3));

    hdr.bgColor = st.readByte();
    hdr.pixelAspectRatio = st.readByte(); // if not 0, aspectRatio = (pixelAspectRatio + 15) / 64

    if (hdr.gctFlag) {
      hdr.gct = parseCT(1 << (hdr.gctSize + 1));
    }
    handler.hdr && handler.hdr(hdr);
  };

  const parseExt = function(block) {
    const parseGCExt = function(block) {
      const blockSize = st.readByte(); // Always 4

      const bits = byteToBitArr(st.readByte());
      block.reserved = bits.splice(0, 3); // Reserved; should be 000.
      block.disposalMethod = bitsToNum(bits.splice(0, 3));
      block.userInput = bits.shift();
      block.transparencyGiven = bits.shift();

      block.delayTime = st.readUnsigned();

      block.transparencyIndex = st.readByte();

      block.terminator = st.readByte();

      handler.gce && handler.gce(block);
    };

    const parseComExt = function(block) {
      block.comment = readSubBlocks();
      handler.com && handler.com(block);
    };

    const parsePTExt = function(block) {
      // No one *ever* uses this. If you use it, deal with parsing it yourself.
      const blockSize = st.readByte(); // Always 12
      block.ptHeader = st.readBytes(12);
      block.ptData = readSubBlocks();
      handler.pte && handler.pte(block);
    };

    const parseAppExt = function(block) {
      const parseNetscapeExt = function(block) {
        const blockSize = st.readByte(); // Always 3
        block.unknown = st.readByte(); // ??? Always 1? What is this?
        block.iterations = st.readUnsigned();
        block.terminator = st.readByte();
        handler.app && handler.app.NETSCAPE && handler.app.NETSCAPE(block);
      };

      const parseUnknownAppExt = function(block) {
          block.appData = readSubBlocks();
          // FIXME: This won't work if a handler wants to match on any identifier.
          handler.app && handler.app[block.identifier] && handler.app[block.identifier](block);
      };

      const blockSize = st.readByte(); // Always 11
      block.identifier = st.read(8);
      block.authCode = st.read(3);
      switch (block.identifier) {
        case 'NETSCAPE':
          parseNetscapeExt(block);
          break;
        default:
          parseUnknownAppExt(block);
          break;
      }
    };

    const parseUnknownExt = function(block) {
        block.data = readSubBlocks();
        handler.unknown && handler.unknown(block);
    };

    block.label = st.readByte();
    switch (block.label) {
      case 0xF9:
        block.extType = 'gce';
        parseGCExt(block);
        break;
      case 0xFE:
        block.extType = 'com';
        parseComExt(block);
        break;
      case 0x01:
        block.extType = 'pte';
        parsePTExt(block);
        break;
      case 0xFF:
        block.extType = 'app';
        parseAppExt(block);
        break;
      default:
        block.extType = 'unknown';
        parseUnknownExt(block);
        break;
    }
  };

  const parseImg = function(img) {
    const deinterlace = function(pixels, width) {
      // Of course this defeats the purpose of interlacing. And it's *probably*
      // the least efficient way it's ever been implemented. But nevertheless...
      const newPixels = new Array(pixels.length);
      const rows = pixels.length / width;
      const cpRow = function(toRow, fromRow) {
        const fromPixels = pixels.slice(fromRow * width, (fromRow + 1) * width);
        newPixels.splice.apply(newPixels, [toRow * width, width].concat(fromPixels));
      };

      // See appendix E.
      const offsets = [0,4,2,1];
      const steps   = [8,8,4,2];

      let fromRow = 0;
      for (let pass = 0; pass < 4; pass++) {
        for (let toRow = offsets[pass]; toRow < rows; toRow += steps[pass]) {
          cpRow(toRow, fromRow)
          fromRow++;
        }
      }

      return newPixels;
    };

    img.leftPos = st.readUnsigned();
    img.topPos = st.readUnsigned();
    img.width = st.readUnsigned();
    img.height = st.readUnsigned();

    var bits = byteToBitArr(st.readByte());
    img.lctFlag = bits.shift();
    img.interlaced = bits.shift();
    img.sorted = bits.shift();
    img.reserved = bits.splice(0, 2);
    img.lctSize = bitsToNum(bits.splice(0, 3));

    if (img.lctFlag) {
      img.lct = parseCT(1 << (img.lctSize + 1));
    }

    img.lzwMinCodeSize = st.readByte();

    var lzwData = readSubBlocks();

    img.pixels = lzwDecode(img.lzwMinCodeSize, lzwData);

    if (img.interlaced) { // Move
      img.pixels = deinterlace(img.pixels, img.width);
    }

    handler.img && handler.img(img);
  };

  const parseBlock = function() {
    const block = {};
    block.sentinel = st.readByte();

    switch (String.fromCharCode(block.sentinel)) { // For ease of matching
      case '!':
        block.type = 'ext';
        parseExt(block);
        break;
      case ',':
        block.type = 'img';
        parseImg(block);
        break;
      case ';':
        block.type = 'eof';
        handler.eof && handler.eof(block);
        break;
      default:
        throw new Error('Unknown block: 0x' + block.sentinel.toString(16)); // TODO: Pad this with a 0.
    }

    if (block.type !== 'eof') setTimeout(parseBlock, 0);
  };

  var parse = function() {
    parseHeader();
    setTimeout(parseBlock, 0);
  };

  parse();
};

// BEGIN_NON_BOOKMARKLET_CODE
if (typeof exports !== 'undefined') {
  exports.Stream = Stream;
  exports.parseGIF = parseGIF;
}
// END_NON_BOOKMARKLET_CODE
