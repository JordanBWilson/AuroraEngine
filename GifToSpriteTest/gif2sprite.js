
function calculateBestSize(width, height, count) {
  var bestcols = 1,
    bestratio = Number.MAX_VALUE;
  for (var cols = 1; cols <= count; cols++) {
    var w = width;//cols * width;
    var h = Math.ceil(count / cols) * height;
    var ratio = w / h;
    if (Math.abs(ratio - 1) < bestratio) {
      bestratio = Math.abs(ratio - 1);
      bestcols = cols;
    }
  }
  return bestcols;
}

function handleFiles(e) {
  var reader = new FileReader;
  reader.onload = function(event) {
    var img = document.getElementById('image1');
    img.src = event.target.result;
  }
  reader.readAsDataURL(e.target.files[0]);
}
function sampleImg(img, banana) {
    // var gif = DOK.createGif(img.src); // original call
    var gif = createGif(img.src);
    gif.addEventListener("load", function(e) {
        var width = gif.naturalWidth, height = gif.naturalHeight;
        var cols = calculateBestSize(width, gif.naturalHeight, gif.frameCount);
        var rows = Math.ceil(gif.frameCount / cols);
        var scale = 1;
        var finalColWidth = Math.round(width * scale);
        var finalRowWidth = Math.round(height * scale);
        var canvas = document.createElement('canvas');
        canvas.width = finalColWidth;
        canvas.height = rows * finalRowWidth;

        var ctx = canvas.getContext("2d");
        for (var i = 0; i < gif.frameCount; i++) {
            var c = i % cols;
            var r = Math.floor(i / cols);

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

        var count = 0;
        function completedCallback() {
            count++;
            if(count>=gif.frameCount) {
              var imagetype = document.getElementById('imagetype').value;
              var url = canvas.toDataURL(imagetype);
              document.getElementById('result').src = url;
              var link = document.getElementById('link');
              link.href = url;
            }
        }
    });
}

var currentScript = getCurrentScript();
var gifWorker;
var gifWorkerCallbacks = {};


/**
 *  FUNCTION DEFINITIONS
 */
function createGif(src) {
    var completeCallbacks = [];
    var sizeLoadedCallbacks = [];
    var frameReadyCallbacks = [];
    var frameRenderedCallbacks = [];
    var header;
    var frameInfos = [];
    var renderTime = 0;
    var currentFrame = 0;
    var totalAnimationTime = 0;

    var gifImage = {
        complete:false,
        addFrameReadyCallback: function(frameIndex, callback) {
            if(!frameReadyCallbacks[frameIndex]) {
                frameReadyCallbacks[frameIndex] = [];
            }
            frameReadyCallbacks[frameIndex].push(callback);
        },
        addFrameRenderedCallback: function(frameIndex, callback) {
            if(!frameRenderedCallbacks[frameIndex]) {
                frameRenderedCallbacks[frameIndex] = [];
            }
            frameRenderedCallbacks[frameIndex].push(callback);
        },
        addEventListener:function(type, callback) {
            if(type=="load") {
                completeCallbacks.push(callback);
            } else if(type=="sizeLoaded") {
                sizeLoadedCallbacks.push(callback);
            }
        },
        removeEventListener:function(type, callback) {
            var array = type=="load" ? completeCallbacks : type=="sizeLoaded" ? sizeLoadedCallbacks : null;
            if(array) {
                var index = array.indexOf(callback);
                array.splice(index,1);
            }
        },
        naturalWidth: 0,
        naturalHeight: 0,
        multiFrame: true,
        getFrame: function() {
            if(!gifImage.complete) return 0;
            if(new Date() > renderTime) {
                currentFrame = (currentFrame+1) % frameInfos.length;
                var totalAnimationTime = frameInfos[frameInfos.length-1].cycleTime;
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
            console.log(srcWidth, destWidth, srcHeight, destHeight);
            assert(srcWidth==destWidth && srcHeight==destHeight, "source and dest must match dimensions");

            if(frameIndex===0 || frameInfos[frameIndex-1].renderPosition) {
                plasterPixels(
                    srcX,srcY,srcWidth,srcHeight,
                    destX,destY,destWidth,destHeight,
                    frameIndex
                );
            } else {
                gifImage.addFrameRenderedCallback(frameIndex-1,
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

                 if(frameIndex>0) { //  copy previous frame. That's how gifs work
                    var previousFramePosition = frameInfos[frameIndex-1].renderPosition;
                    var cData = previousFramePosition.context.getImageData(
                        previousFramePosition.x,
                        previousFramePosition.y,
                        previousFramePosition.width,
                        previousFramePosition.height
                    );
                    ctx.putImageData(cData, destX, destY);
                 }

                 var frameInfo = frameInfos[frameIndex];
                 var img = frameInfo.img;
                 var cData = ctx.getImageData(destX + img.leftPos, destY + img.topPos, img.width, img.height);
                 var ct = img.lctFlag ? img.lct : header.gct;

                 sendToGifWorker(
                     frameInfo, cData,
                     header,
                     function(cData) {
                        // this is where each piece of the gif are copied to the canvas
                        // try scaling the image here
                        // ctx.clearRect(0, 0, canvas.width, canvas.height); // clears the last image
                        ctx.putImageData(cData, destX + img.leftPos, destY + img.topPos); // old method
                        // ctx.putImageData(cData, img.leftPos, img.topPos); // this will keep the image in one spot

                        console.log(canvas.toDataURL()); // when the image is ready, this is the raw base64 png
                        frameInfos[frameIndex].renderPosition = {
                            context: ctx,
                            x: destX,
                            y: destY,
                            width: destWidth,
                            height: destHeight,
                        };
                        if(frameRenderedCallbacks[frameIndex]) {
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
        if(gifImage.isFrameLoaded(frameIndex) && frameReadyCallbacks[frameIndex]) {
            frameReadyCallbacks[frameIndex].forEach(
               function(callback) { callback.call(); }
            );
        }
    }

    var handler = {
      hdr: function (hdr) {
        header = hdr;
        gifImage.naturalWidth = header.width;
        gifImage.naturalHeight = header.height;
        sizeLoadedCallbacks.forEach(
            function(callback) { callback.call(); }
        );
      },
      gce: function (gce) {
        if(frameInfos.length==0 || frameInfos[frameInfos.length-1].gce) {
            frameInfos.push({});
        }
        var currentIndex = frameInfos.length-1;
        frameInfos[currentIndex].gce = gce;
        if(!gce.delayTime) {
            gce.delayTime = 1;
        }
        frameInfos[currentIndex].cycleTime = gce.delayTime * 10
            + (currentIndex === 0 ? 0 : frameInfos[currentIndex-1].cycleTime);
        checkComplete(frameInfos.length-1);
      },
      img: function(img) {
        if(frameInfos.length==0 || frameInfos[frameInfos.length-1].img) {
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
        console.log(frameInfos);
      }
    };

    loadAsync(src,
        function(content) {
            var stream = new Stream(content);
            parseGIF(stream, handler);
        },
        true
    );
    return gifImage;
}

function initializeGifWorker() {
    gifWorker = new Worker(currentScript.path + "workers/gifworker.js");
    gifWorker.onmessage = function(e) {
       gifWorkerCallbacks[e.data.id] (e.data.response);
       delete gifWorkerCallbacks[e.data.id];
    }
}

function sendToGifWorker(frameInfo, cData, header, callback) {
    if(!gifWorker) {
        initializeGifWorker();
    }
    var id = md5(Math.random()+""+ new Date());
    gifWorkerCallbacks[id] = callback;
    gifWorker.postMessage({
        frameInfo: frameInfo,
        cData: cData,
        header: header,
        id: id
    });
}

function destroyEverything() {
    if(gifWorker) {
        gifWorker.terminate();
    }
    gifWorker = null;
    gifWorkerCallbacks = null;
}

function loadAsync(src, callback, binary, method, data) {
     var xhr = new XMLHttpRequest();
     xhr.overrideMimeType(binary ? "text/plain; charset=x-user-defined" : "text/plain; charset=UTF-8");
     xhr.open(method?method:"GET", src, true);
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
     if(!condition) {
         handleError(message ? message: "Assert failed: condition not met.");
     }
}

function getCurrentScript() {
     var currentScript = document.currentScript.src;
     var regex = /[a-zA-Z-]*:\/\/[^/]+(\/([^/]+\/)+)(.+)/g;
     var match = regex.exec(currentScript);
     return {
         filename: match[3],
         path: match[1],
         src: match[0],
     };
}

function handleError(error, soft) {
     if(Array.isArray(error)) {
         var array = [];
         for(var i=0;i<error.length;i++) {
             array.push(error[i]);
             array.push("\n ");
         }
         console.error.apply(null, array);
     } else {
         console.error(error);
     }
     if(!soft) {
         throw new Error("Last error terminated the process.");
     }
}

document.addEventListener("DOMContentLoaded",
    function() {
      var input = document.getElementById('input');
      input.addEventListener('change', handleFiles);
      var img = document.getElementById('image1');
      var banana = true;
      img.onload = function() {
        sampleImg(img, banana);
        banana = false;
      }
    }
);
