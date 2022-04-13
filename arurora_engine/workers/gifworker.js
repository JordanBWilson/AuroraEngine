// Copyright (C) 2022  Jordan Wilson
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, version 3.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

onmessage = function(e) {
    var frameInfo = e.data.frameInfo;
    var cData = e.data.cData;
    var header = e.data.header;
    var id = e.data.id;

    if(frameInfo && cData && header) {
        plasterPixels(frameInfo, cData, header);
    }
    postMessage({id:id, response:cData});
}

function plasterPixels(
        frameInfo,
        cData,
        header
        ) {
    var img = frameInfo.img;
    var gce = frameInfo.gce;
    var transparency = gce.transparencyGiven ? gce.transparencyIndex : null;
    var disposalMethod = gce.disposalMethod;

    var ct = img.lctFlag ? img.lct : header.gct;

    img.pixels.forEach(function(pixel, i) {
        if (transparency !== pixel) { // This includes null, if no transparency was defined.
            cData.data[i * 4 + 0] = ct[pixel][0];
            cData.data[i * 4 + 1] = ct[pixel][1];
            cData.data[i * 4 + 2] = ct[pixel][2];
            cData.data[i * 4 + 3] = 255; // Opaque.
        } else if (disposalMethod === 2 || disposalMethod === 3) {
            cData.data[i * 4 + 3] = 0; // Transparent.
        }
    });
}
