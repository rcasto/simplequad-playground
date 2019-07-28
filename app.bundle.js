/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/animation.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/worker-loader/dist/cjs.js!./src/quad.worker.ts":
/*!*********************************************************************!*\
  !*** ./node_modules/worker-loader/dist/cjs.js!./src/quad.worker.ts ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = function() {
  return new Worker(__webpack_require__.p + "2f6ce4fb183ef908b5cf.worker.js");
};

/***/ }),

/***/ "./src/animation.ts":
/*!**************************!*\
  !*** ./src/animation.ts ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./src/util.ts");
/* harmony import */ var worker_loader_quad_worker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! worker-loader!./quad.worker */ "./node_modules/worker-loader/dist/cjs.js!./src/quad.worker.ts");
/* harmony import */ var worker_loader_quad_worker__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(worker_loader_quad_worker__WEBPACK_IMPORTED_MODULE_1__);


var canvas;
var context;
var imageInput;
var quadWorker;
var frames = [];
var offlineAnimateId;

function draw(imageData) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.putImageData(imageData, 0, 0);
}

function offlineAnimate(offlineFrames) {
  var animateIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var currFrameIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var numFramesEach = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 20;
  var nextFrameIndex = currFrameIndex + 1;
  var nextAnimateIndex = animateIndex;

  if (nextFrameIndex > numFramesEach) {
    nextAnimateIndex = animateIndex + 1 >= offlineFrames.length ? 0 : animateIndex + 1;
    nextFrameIndex = 0;
  }

  offlineAnimateId = window.requestAnimationFrame(function () {
    return offlineAnimate(offlineFrames, nextAnimateIndex, nextFrameIndex, numFramesEach);
  });
  draw(offlineFrames[nextAnimateIndex]);
}

function processImage(imageFile) {
  window.cancelAnimationFrame(offlineAnimateId);
  Object(_util__WEBPACK_IMPORTED_MODULE_0__["loadImage"])(imageFile).then(function (imageElem) {
    return Object(_util__WEBPACK_IMPORTED_MODULE_0__["getImageDataOffScreen"])(imageElem, canvas.width, canvas.height);
  }).then(function (imageData) {
    var message = {
      type: 'new-image',
      data: imageData
    };
    quadWorker.postMessage(message);
  });
}

function onImageChange(event) {
  var imageInput = event.target;

  if (!imageInput || !imageInput.files || !imageInput.files.length) {
    return;
  }

  var firstImage = imageInput.files[0];
  processImage(firstImage);
}

function resizeCanvas() {
  var computedStyle = window.getComputedStyle(canvas);
  var width = parseInt(computedStyle.getPropertyValue('width'), 10);
  var height = parseInt(computedStyle.getPropertyValue('height'), 10);
  canvas.width = width;
  canvas.height = height;
}

function onWorkerMessage(event) {
  var message = event.data;

  switch (message.type) {
    case 'draw':
      if (message.data) {
        frames.push(message.data);
        window.requestAnimationFrame(function (timestamp) {
          return draw(message.data);
        });
      }

      break;

    case 'processed':
      offlineAnimateId = window.requestAnimationFrame(function () {
        return offlineAnimate(frames);
      });
      break;

    default:
      console.error("Unknown message type: ".concat(message));
      return;
  }
}

function main() {
  canvas = document.getElementById('canvas');
  context = canvas.getContext('2d');
  imageInput = document.getElementById('image-input');
  imageInput.addEventListener('change', onImageChange);
  window.addEventListener('resize', resizeCanvas); // Web worker logic

  quadWorker = new worker_loader_quad_worker__WEBPACK_IMPORTED_MODULE_1___default.a();
  quadWorker.addEventListener('message', onWorkerMessage);
  resizeCanvas();
}

main();

/***/ }),

/***/ "./src/util.ts":
/*!*********************!*\
  !*** ./src/util.ts ***!
  \*********************/
/*! exports provided: PIXEL_WIDTH, WHITE_COLOR, loadImage, getAverageColor, createPixels, fillPixelInImageData, getImageDataOffScreen */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PIXEL_WIDTH", function() { return PIXEL_WIDTH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WHITE_COLOR", function() { return WHITE_COLOR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadImage", function() { return loadImage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAverageColor", function() { return getAverageColor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createPixels", function() { return createPixels; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fillPixelInImageData", function() { return fillPixelInImageData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getImageDataOffScreen", function() { return getImageDataOffScreen; });
var PIXEL_WIDTH = 4;
var WHITE_COLOR = {
  r: 255,
  g: 255,
  b: 255,
  a: 255
};
function loadImage(imageFile) {
  return new Promise(function (resolve, reject) {
    var imageFileDataUrl = window.URL.createObjectURL(imageFile);
    var image = new Image();

    image.onload = function () {
      window.URL.revokeObjectURL(imageFileDataUrl);
      resolve(image);
    };

    image.onerror = function (err) {
      window.URL.revokeObjectURL(imageFileDataUrl);
      reject(err);
    };

    image.src = imageFileDataUrl;
  });
}
function getAverageColor(pixels) {
  var squaredSumR;
  var squaredSumG;
  var squaredSumB;
  var squaredSumA;
  var averageColor = pixels[0] || WHITE_COLOR;

  if (pixels.length > 1) {
    return pixels.slice(1).reduce(function (prevAverage, currPixel) {
      squaredSumR = Math.pow(prevAverage.r, 2) + Math.pow(currPixel.r, 2);
      squaredSumG = Math.pow(prevAverage.g, 2) + Math.pow(currPixel.g, 2);
      squaredSumB = Math.pow(prevAverage.b, 2) + Math.pow(currPixel.b, 2);
      squaredSumA = Math.pow(prevAverage.a, 2) + Math.pow(currPixel.a, 2);
      return {
        r: Math.sqrt(squaredSumR / 2),
        g: Math.sqrt(squaredSumG / 2),
        b: Math.sqrt(squaredSumB / 2),
        a: Math.sqrt(squaredSumA / 2)
      };
    }, averageColor);
  }

  return averageColor;
}

function createPixel(x, y, r, g, b, a) {
  return {
    x: x,
    y: y,
    r: r,
    g: g,
    b: b,
    a: a,
    getBounds: function getBounds() {
      return {
        x: this.x,
        y: this.y
      };
    }
  };
}

function createPixels(imageData) {
  var pixels = [];
  processImageData(imageData, function (pixel) {
    return pixels.push(pixel);
  });
  return pixels;
}
function fillPixelInImageData(imageData, pixel) {
  var pixelOffset = (pixel.x + pixel.y * imageData.width) * PIXEL_WIDTH;

  if (pixelOffset < 0 || pixelOffset + PIXEL_WIDTH >= imageData.data.length) {
    return;
  }

  imageData.data[pixelOffset] = pixel.r;
  imageData.data[pixelOffset + 1] = pixel.g;
  imageData.data[pixelOffset + 2] = pixel.b;
  imageData.data[pixelOffset + 3] = pixel.a;
}
function getImageDataOffScreen(image, width, height) {
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');
  canvas.width = width;
  canvas.height = height;
  context.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);
  var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  return imageData;
}

function processImageData(imageData, processFunc) {
  var initPixelX = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var initPixelY = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  var r;
  var g;
  var b;
  var a;
  var offsetX;
  var offsetY;
  var pixel;

  for (var x = initPixelX; x < imageData.width; x++) {
    offsetX = x * PIXEL_WIDTH;

    for (var y = initPixelY; y < imageData.height; y++) {
      offsetY = imageData.width * y * PIXEL_WIDTH;
      r = imageData.data[offsetX + offsetY];
      g = imageData.data[offsetX + offsetY + 1];
      b = imageData.data[offsetX + offsetY + 2];
      a = imageData.data[offsetX + offsetY + 3];
      pixel = createPixel(x, y, r, g, b, a);
      processFunc(pixel);
    }
  }
}

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1YWQud29ya2VyLnRzIiwid2VicGFjazovLy8uL3NyYy9hbmltYXRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwudHMiXSwibmFtZXMiOlsiY2FudmFzIiwiY29udGV4dCIsImltYWdlSW5wdXQiLCJxdWFkV29ya2VyIiwiZnJhbWVzIiwib2ZmbGluZUFuaW1hdGVJZCIsImRyYXciLCJpbWFnZURhdGEiLCJjbGVhclJlY3QiLCJ3aWR0aCIsImhlaWdodCIsInB1dEltYWdlRGF0YSIsIm9mZmxpbmVBbmltYXRlIiwib2ZmbGluZUZyYW1lcyIsImFuaW1hdGVJbmRleCIsImN1cnJGcmFtZUluZGV4IiwibnVtRnJhbWVzRWFjaCIsIm5leHRGcmFtZUluZGV4IiwibmV4dEFuaW1hdGVJbmRleCIsImxlbmd0aCIsIndpbmRvdyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsInByb2Nlc3NJbWFnZSIsImltYWdlRmlsZSIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwibG9hZEltYWdlIiwidGhlbiIsImltYWdlRWxlbSIsImdldEltYWdlRGF0YU9mZlNjcmVlbiIsIm1lc3NhZ2UiLCJ0eXBlIiwiZGF0YSIsInBvc3RNZXNzYWdlIiwib25JbWFnZUNoYW5nZSIsImV2ZW50IiwidGFyZ2V0IiwiZmlsZXMiLCJmaXJzdEltYWdlIiwicmVzaXplQ2FudmFzIiwiY29tcHV0ZWRTdHlsZSIsImdldENvbXB1dGVkU3R5bGUiLCJwYXJzZUludCIsImdldFByb3BlcnR5VmFsdWUiLCJvbldvcmtlck1lc3NhZ2UiLCJwdXNoIiwidGltZXN0YW1wIiwiY29uc29sZSIsImVycm9yIiwibWFpbiIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJnZXRDb250ZXh0IiwiYWRkRXZlbnRMaXN0ZW5lciIsIlF1YWRXb3JrZXIiLCJQSVhFTF9XSURUSCIsIldISVRFX0NPTE9SIiwiciIsImciLCJiIiwiYSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiaW1hZ2VGaWxlRGF0YVVybCIsIlVSTCIsImNyZWF0ZU9iamVjdFVSTCIsImltYWdlIiwiSW1hZ2UiLCJvbmxvYWQiLCJyZXZva2VPYmplY3RVUkwiLCJvbmVycm9yIiwiZXJyIiwic3JjIiwiZ2V0QXZlcmFnZUNvbG9yIiwicGl4ZWxzIiwic3F1YXJlZFN1bVIiLCJzcXVhcmVkU3VtRyIsInNxdWFyZWRTdW1CIiwic3F1YXJlZFN1bUEiLCJhdmVyYWdlQ29sb3IiLCJzbGljZSIsInJlZHVjZSIsInByZXZBdmVyYWdlIiwiY3VyclBpeGVsIiwiTWF0aCIsInBvdyIsInNxcnQiLCJjcmVhdGVQaXhlbCIsIngiLCJ5IiwiZ2V0Qm91bmRzIiwiY3JlYXRlUGl4ZWxzIiwicHJvY2Vzc0ltYWdlRGF0YSIsInBpeGVsIiwiZmlsbFBpeGVsSW5JbWFnZURhdGEiLCJwaXhlbE9mZnNldCIsImNyZWF0ZUVsZW1lbnQiLCJkcmF3SW1hZ2UiLCJnZXRJbWFnZURhdGEiLCJwcm9jZXNzRnVuYyIsImluaXRQaXhlbFgiLCJpbml0UGl4ZWxZIiwib2Zmc2V0WCIsIm9mZnNldFkiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBLG9CQUFvQixxQkFBdUI7QUFDM0MsRTs7Ozs7Ozs7Ozs7O0FDREE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBRUEsSUFBSUEsTUFBSjtBQUNBLElBQUlDLE9BQUo7QUFDQSxJQUFJQyxVQUFKO0FBQ0EsSUFBSUMsVUFBSjtBQUNBLElBQU1DLE1BQW1CLEdBQUcsRUFBNUI7QUFDQSxJQUFJQyxnQkFBSjs7QUFFQSxTQUFTQyxJQUFULENBQWNDLFNBQWQsRUFBb0M7QUFDaENOLFNBQU8sQ0FBQ08sU0FBUixDQUFrQixDQUFsQixFQUFxQixDQUFyQixFQUF3QlIsTUFBTSxDQUFDUyxLQUEvQixFQUFzQ1QsTUFBTSxDQUFDVSxNQUE3QztBQUNBVCxTQUFPLENBQUNVLFlBQVIsQ0FBcUJKLFNBQXJCLEVBQWdDLENBQWhDLEVBQW1DLENBQW5DO0FBQ0g7O0FBRUQsU0FBU0ssY0FBVCxDQUF3QkMsYUFBeEIsRUFBNEk7QUFBQSxNQUF4RkMsWUFBd0YsdUVBQWpFLENBQWlFO0FBQUEsTUFBOURDLGNBQThELHVFQUFyQyxDQUFxQztBQUFBLE1BQWxDQyxhQUFrQyx1RUFBVixFQUFVO0FBQ3hJLE1BQUlDLGNBQXNCLEdBQUdGLGNBQWMsR0FBRyxDQUE5QztBQUNBLE1BQUlHLGdCQUF3QixHQUFHSixZQUEvQjs7QUFFQSxNQUFJRyxjQUFjLEdBQUdELGFBQXJCLEVBQW9DO0FBQ2hDRSxvQkFBZ0IsR0FBR0osWUFBWSxHQUFHLENBQWYsSUFBb0JELGFBQWEsQ0FBQ00sTUFBbEMsR0FBMkMsQ0FBM0MsR0FBK0NMLFlBQVksR0FBRyxDQUFqRjtBQUNBRyxrQkFBYyxHQUFHLENBQWpCO0FBQ0g7O0FBRURaLGtCQUFnQixHQUFHZSxNQUFNLENBQUNDLHFCQUFQLENBQTZCO0FBQUEsV0FBTVQsY0FBYyxDQUFDQyxhQUFELEVBQWdCSyxnQkFBaEIsRUFBa0NELGNBQWxDLEVBQWtERCxhQUFsRCxDQUFwQjtBQUFBLEdBQTdCLENBQW5CO0FBRUFWLE1BQUksQ0FBQ08sYUFBYSxDQUFDSyxnQkFBRCxDQUFkLENBQUo7QUFDSDs7QUFFRCxTQUFTSSxZQUFULENBQXNCQyxTQUF0QixFQUE2QztBQUN6Q0gsUUFBTSxDQUFDSSxvQkFBUCxDQUE0Qm5CLGdCQUE1QjtBQUVBb0IseURBQVMsQ0FBQ0YsU0FBRCxDQUFULENBQ0tHLElBREwsQ0FDVSxVQUFBQyxTQUFTO0FBQUEsV0FBSUMsbUVBQXFCLENBQUNELFNBQUQsRUFBWTNCLE1BQU0sQ0FBQ1MsS0FBbkIsRUFBMEJULE1BQU0sQ0FBQ1UsTUFBakMsQ0FBekI7QUFBQSxHQURuQixFQUVLZ0IsSUFGTCxDQUVVLFVBQUNuQixTQUFELEVBQTBCO0FBQzVCLFFBQU1zQixPQUE4QixHQUFHO0FBQ25DQyxVQUFJLEVBQUUsV0FENkI7QUFFbkNDLFVBQUksRUFBRXhCO0FBRjZCLEtBQXZDO0FBSUFKLGNBQVUsQ0FBQzZCLFdBQVgsQ0FBdUJILE9BQXZCO0FBQ0gsR0FSTDtBQVNIOztBQUVELFNBQVNJLGFBQVQsQ0FBdUJDLEtBQXZCLEVBQXFDO0FBQ2pDLE1BQU1oQyxVQUE0QixHQUFHZ0MsS0FBSyxDQUFDQyxNQUEzQzs7QUFDQSxNQUFJLENBQUNqQyxVQUFELElBQ0EsQ0FBQ0EsVUFBVSxDQUFDa0MsS0FEWixJQUVBLENBQUNsQyxVQUFVLENBQUNrQyxLQUFYLENBQWlCakIsTUFGdEIsRUFFOEI7QUFDMUI7QUFDSDs7QUFDRCxNQUFNa0IsVUFBVSxHQUFHbkMsVUFBVSxDQUFDa0MsS0FBWCxDQUFpQixDQUFqQixDQUFuQjtBQUNBZCxjQUFZLENBQUNlLFVBQUQsQ0FBWjtBQUNIOztBQUVELFNBQVNDLFlBQVQsR0FBd0I7QUFDcEIsTUFBTUMsYUFBYSxHQUFHbkIsTUFBTSxDQUFDb0IsZ0JBQVAsQ0FBd0J4QyxNQUF4QixDQUF0QjtBQUNBLE1BQU1TLEtBQUssR0FBR2dDLFFBQVEsQ0FBQ0YsYUFBYSxDQUFDRyxnQkFBZCxDQUErQixPQUEvQixDQUFELEVBQTBDLEVBQTFDLENBQXRCO0FBQ0EsTUFBTWhDLE1BQU0sR0FBRytCLFFBQVEsQ0FBQ0YsYUFBYSxDQUFDRyxnQkFBZCxDQUErQixRQUEvQixDQUFELEVBQTJDLEVBQTNDLENBQXZCO0FBQ0ExQyxRQUFNLENBQUNTLEtBQVAsR0FBZUEsS0FBZjtBQUNBVCxRQUFNLENBQUNVLE1BQVAsR0FBZ0JBLE1BQWhCO0FBQ0g7O0FBRUQsU0FBU2lDLGVBQVQsQ0FBeUJULEtBQXpCLEVBQW9EO0FBQ2hELE1BQU1MLE9BQThCLEdBQUdLLEtBQUssQ0FBQ0gsSUFBN0M7O0FBQ0EsVUFBUUYsT0FBTyxDQUFDQyxJQUFoQjtBQUNJLFNBQUssTUFBTDtBQUNJLFVBQUlELE9BQU8sQ0FBQ0UsSUFBWixFQUFrQjtBQUNkM0IsY0FBTSxDQUFDd0MsSUFBUCxDQUFZZixPQUFPLENBQUNFLElBQXBCO0FBQ0FYLGNBQU0sQ0FBQ0MscUJBQVAsQ0FBNkIsVUFBQXdCLFNBQVM7QUFBQSxpQkFBSXZDLElBQUksQ0FBQ3VCLE9BQU8sQ0FBQ0UsSUFBVCxDQUFSO0FBQUEsU0FBdEM7QUFDSDs7QUFDRDs7QUFDSixTQUFLLFdBQUw7QUFDSTFCLHNCQUFnQixHQUFHZSxNQUFNLENBQUNDLHFCQUFQLENBQTZCO0FBQUEsZUFBTVQsY0FBYyxDQUFDUixNQUFELENBQXBCO0FBQUEsT0FBN0IsQ0FBbkI7QUFDQTs7QUFDSjtBQUNJMEMsYUFBTyxDQUFDQyxLQUFSLGlDQUF1Q2xCLE9BQXZDO0FBQ0E7QUFaUjtBQWNIOztBQUVELFNBQVNtQixJQUFULEdBQWdCO0FBQ1poRCxRQUFNLEdBQUdpRCxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsUUFBeEIsQ0FBVDtBQUNBakQsU0FBTyxHQUFHRCxNQUFNLENBQUNtRCxVQUFQLENBQWtCLElBQWxCLENBQVY7QUFDQWpELFlBQVUsR0FBRytDLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixhQUF4QixDQUFiO0FBRUFoRCxZQUFVLENBQUNrRCxnQkFBWCxDQUE0QixRQUE1QixFQUFzQ25CLGFBQXRDO0FBQ0FiLFFBQU0sQ0FBQ2dDLGdCQUFQLENBQXdCLFFBQXhCLEVBQWtDZCxZQUFsQyxFQU5ZLENBUVo7O0FBQ0FuQyxZQUFVLEdBQUcsSUFBSWtELGdFQUFKLEVBQWI7QUFDQWxELFlBQVUsQ0FBQ2lELGdCQUFYLENBQTRCLFNBQTVCLEVBQXVDVCxlQUF2QztBQUVBTCxjQUFZO0FBQ2Y7O0FBRURVLElBQUksRzs7Ozs7Ozs7Ozs7O0FDOUZKO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBTyxJQUFNTSxXQUFtQixHQUFHLENBQTVCO0FBQ0EsSUFBTUMsV0FBa0IsR0FBRztBQUM5QkMsR0FBQyxFQUFFLEdBRDJCO0FBRTlCQyxHQUFDLEVBQUUsR0FGMkI7QUFHOUJDLEdBQUMsRUFBRSxHQUgyQjtBQUk5QkMsR0FBQyxFQUFFO0FBSjJCLENBQTNCO0FBT0EsU0FBU2xDLFNBQVQsQ0FBbUJGLFNBQW5CLEVBQStEO0FBQ2xFLFNBQU8sSUFBSXFDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDcEMsUUFBTUMsZ0JBQWdCLEdBQUczQyxNQUFNLENBQUM0QyxHQUFQLENBQVdDLGVBQVgsQ0FBMkIxQyxTQUEzQixDQUF6QjtBQUNBLFFBQU0yQyxLQUFLLEdBQUcsSUFBSUMsS0FBSixFQUFkOztBQUVBRCxTQUFLLENBQUNFLE1BQU4sR0FBZSxZQUFNO0FBQ2pCaEQsWUFBTSxDQUFDNEMsR0FBUCxDQUFXSyxlQUFYLENBQTJCTixnQkFBM0I7QUFDQUYsYUFBTyxDQUFDSyxLQUFELENBQVA7QUFDSCxLQUhEOztBQUlBQSxTQUFLLENBQUNJLE9BQU4sR0FBZ0IsVUFBQ0MsR0FBRCxFQUFTO0FBQ3JCbkQsWUFBTSxDQUFDNEMsR0FBUCxDQUFXSyxlQUFYLENBQTJCTixnQkFBM0I7QUFDQUQsWUFBTSxDQUFDUyxHQUFELENBQU47QUFDSCxLQUhEOztBQUlBTCxTQUFLLENBQUNNLEdBQU4sR0FBWVQsZ0JBQVo7QUFDSCxHQWJNLENBQVA7QUFjSDtBQUVNLFNBQVNVLGVBQVQsQ0FBeUJDLE1BQXpCLEVBQWlEO0FBQ3BELE1BQUlDLFdBQUo7QUFDQSxNQUFJQyxXQUFKO0FBQ0EsTUFBSUMsV0FBSjtBQUNBLE1BQUlDLFdBQUo7QUFDQSxNQUFJQyxZQUFtQixHQUFHTCxNQUFNLENBQUMsQ0FBRCxDQUFOLElBQWFuQixXQUF2Qzs7QUFFQSxNQUFJbUIsTUFBTSxDQUFDdkQsTUFBUCxHQUFnQixDQUFwQixFQUF1QjtBQUNuQixXQUFPdUQsTUFBTSxDQUFDTSxLQUFQLENBQWEsQ0FBYixFQUNGQyxNQURFLENBQ0ssVUFBQ0MsV0FBRCxFQUFxQkMsU0FBckIsRUFBMEM7QUFDOUNSLGlCQUFXLEdBQUdTLElBQUksQ0FBQ0MsR0FBTCxDQUFTSCxXQUFXLENBQUMxQixDQUFyQixFQUF3QixDQUF4QixJQUE2QjRCLElBQUksQ0FBQ0MsR0FBTCxDQUFTRixTQUFTLENBQUMzQixDQUFuQixFQUFzQixDQUF0QixDQUEzQztBQUNBb0IsaUJBQVcsR0FBR1EsSUFBSSxDQUFDQyxHQUFMLENBQVNILFdBQVcsQ0FBQ3pCLENBQXJCLEVBQXdCLENBQXhCLElBQTZCMkIsSUFBSSxDQUFDQyxHQUFMLENBQVNGLFNBQVMsQ0FBQzFCLENBQW5CLEVBQXNCLENBQXRCLENBQTNDO0FBQ0FvQixpQkFBVyxHQUFHTyxJQUFJLENBQUNDLEdBQUwsQ0FBU0gsV0FBVyxDQUFDeEIsQ0FBckIsRUFBd0IsQ0FBeEIsSUFBNkIwQixJQUFJLENBQUNDLEdBQUwsQ0FBU0YsU0FBUyxDQUFDekIsQ0FBbkIsRUFBc0IsQ0FBdEIsQ0FBM0M7QUFDQW9CLGlCQUFXLEdBQUdNLElBQUksQ0FBQ0MsR0FBTCxDQUFTSCxXQUFXLENBQUN2QixDQUFyQixFQUF3QixDQUF4QixJQUE2QnlCLElBQUksQ0FBQ0MsR0FBTCxDQUFTRixTQUFTLENBQUN4QixDQUFuQixFQUFzQixDQUF0QixDQUEzQztBQUNBLGFBQU87QUFDSEgsU0FBQyxFQUFFNEIsSUFBSSxDQUFDRSxJQUFMLENBQVVYLFdBQVcsR0FBRyxDQUF4QixDQURBO0FBRUhsQixTQUFDLEVBQUUyQixJQUFJLENBQUNFLElBQUwsQ0FBVVYsV0FBVyxHQUFHLENBQXhCLENBRkE7QUFHSGxCLFNBQUMsRUFBRTBCLElBQUksQ0FBQ0UsSUFBTCxDQUFVVCxXQUFXLEdBQUcsQ0FBeEIsQ0FIQTtBQUlIbEIsU0FBQyxFQUFFeUIsSUFBSSxDQUFDRSxJQUFMLENBQVVSLFdBQVcsR0FBRyxDQUF4QjtBQUpBLE9BQVA7QUFNSCxLQVpFLEVBWUFDLFlBWkEsQ0FBUDtBQWFIOztBQUVELFNBQU9BLFlBQVA7QUFDSDs7QUFFRCxTQUFTUSxXQUFULENBQXFCQyxDQUFyQixFQUFnQ0MsQ0FBaEMsRUFBMkNqQyxDQUEzQyxFQUFzREMsQ0FBdEQsRUFBaUVDLENBQWpFLEVBQTRFQyxDQUE1RSxFQUE4RjtBQUMxRixTQUFPO0FBQ0g2QixLQUFDLEVBQURBLENBREc7QUFFSEMsS0FBQyxFQUFEQSxDQUZHO0FBR0hqQyxLQUFDLEVBQURBLENBSEc7QUFJSEMsS0FBQyxFQUFEQSxDQUpHO0FBS0hDLEtBQUMsRUFBREEsQ0FMRztBQU1IQyxLQUFDLEVBQURBLENBTkc7QUFPSCtCLGFBUEcsdUJBT1M7QUFDUixhQUFPO0FBQ0hGLFNBQUMsRUFBRSxLQUFLQSxDQURMO0FBRUhDLFNBQUMsRUFBRSxLQUFLQTtBQUZMLE9BQVA7QUFJSDtBQVpFLEdBQVA7QUFjSDs7QUFFTSxTQUFTRSxZQUFULENBQXNCcEYsU0FBdEIsRUFBcUQ7QUFDeEQsTUFBSW1FLE1BQWUsR0FBRyxFQUF0QjtBQUNBa0Isa0JBQWdCLENBQUNyRixTQUFELEVBQVksVUFBQXNGLEtBQUs7QUFBQSxXQUFJbkIsTUFBTSxDQUFDOUIsSUFBUCxDQUFZaUQsS0FBWixDQUFKO0FBQUEsR0FBakIsQ0FBaEI7QUFDQSxTQUFPbkIsTUFBUDtBQUNIO0FBRU0sU0FBU29CLG9CQUFULENBQThCdkYsU0FBOUIsRUFBb0RzRixLQUFwRCxFQUF3RTtBQUMzRSxNQUFNRSxXQUFtQixHQUFHLENBQUNGLEtBQUssQ0FBQ0wsQ0FBTixHQUFVSyxLQUFLLENBQUNKLENBQU4sR0FBVWxGLFNBQVMsQ0FBQ0UsS0FBL0IsSUFBd0M2QyxXQUFwRTs7QUFDQSxNQUFJeUMsV0FBVyxHQUFHLENBQWQsSUFBbUJBLFdBQVcsR0FBR3pDLFdBQWQsSUFBNkIvQyxTQUFTLENBQUN3QixJQUFWLENBQWVaLE1BQW5FLEVBQTJFO0FBQ3ZFO0FBQ0g7O0FBQ0RaLFdBQVMsQ0FBQ3dCLElBQVYsQ0FBZWdFLFdBQWYsSUFBOEJGLEtBQUssQ0FBQ3JDLENBQXBDO0FBQ0FqRCxXQUFTLENBQUN3QixJQUFWLENBQWVnRSxXQUFXLEdBQUcsQ0FBN0IsSUFBa0NGLEtBQUssQ0FBQ3BDLENBQXhDO0FBQ0FsRCxXQUFTLENBQUN3QixJQUFWLENBQWVnRSxXQUFXLEdBQUcsQ0FBN0IsSUFBa0NGLEtBQUssQ0FBQ25DLENBQXhDO0FBQ0FuRCxXQUFTLENBQUN3QixJQUFWLENBQWVnRSxXQUFXLEdBQUcsQ0FBN0IsSUFBa0NGLEtBQUssQ0FBQ2xDLENBQXhDO0FBQ0g7QUFFTSxTQUFTL0IscUJBQVQsQ0FBK0JzQyxLQUEvQixFQUF3RHpELEtBQXhELEVBQXVFQyxNQUF2RSxFQUFrRztBQUNyRyxNQUFNVixNQUF5QixHQUFHaUQsUUFBUSxDQUFDK0MsYUFBVCxDQUF1QixRQUF2QixDQUFsQztBQUNBLE1BQU0vRixPQUFpQyxHQUFHRCxNQUFNLENBQUNtRCxVQUFQLENBQWtCLElBQWxCLENBQTFDO0FBRUFuRCxRQUFNLENBQUNTLEtBQVAsR0FBZUEsS0FBZjtBQUNBVCxRQUFNLENBQUNVLE1BQVAsR0FBZ0JBLE1BQWhCO0FBRUFULFNBQU8sQ0FBQ2dHLFNBQVIsQ0FBa0IvQixLQUFsQixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQkEsS0FBSyxDQUFDekQsS0FBckMsRUFBNEN5RCxLQUFLLENBQUN4RCxNQUFsRCxFQUEwRCxDQUExRCxFQUE2RCxDQUE3RCxFQUFnRVYsTUFBTSxDQUFDUyxLQUF2RSxFQUE4RVQsTUFBTSxDQUFDVSxNQUFyRjtBQUVBLE1BQU1ILFNBQW9CLEdBQUdOLE9BQU8sQ0FBQ2lHLFlBQVIsQ0FBcUIsQ0FBckIsRUFBd0IsQ0FBeEIsRUFBMkJsRyxNQUFNLENBQUNTLEtBQWxDLEVBQXlDVCxNQUFNLENBQUNVLE1BQWhELENBQTdCO0FBQ0EsU0FBT0gsU0FBUDtBQUNIOztBQUVELFNBQVNxRixnQkFBVCxDQUEwQnJGLFNBQTFCLEVBQWdENEYsV0FBaEQsRUFBMkk7QUFBQSxNQUF0REMsVUFBc0QsdUVBQWpDLENBQWlDO0FBQUEsTUFBOUJDLFVBQThCLHVFQUFULENBQVM7QUFDdkksTUFBSTdDLENBQUo7QUFDQSxNQUFJQyxDQUFKO0FBQ0EsTUFBSUMsQ0FBSjtBQUNBLE1BQUlDLENBQUo7QUFDQSxNQUFJMkMsT0FBSjtBQUNBLE1BQUlDLE9BQUo7QUFDQSxNQUFJVixLQUFKOztBQUVBLE9BQUssSUFBSUwsQ0FBQyxHQUFHWSxVQUFiLEVBQXlCWixDQUFDLEdBQUdqRixTQUFTLENBQUNFLEtBQXZDLEVBQThDK0UsQ0FBQyxFQUEvQyxFQUFtRDtBQUMvQ2MsV0FBTyxHQUFHZCxDQUFDLEdBQUdsQyxXQUFkOztBQUVBLFNBQUssSUFBSW1DLENBQUMsR0FBR1ksVUFBYixFQUF5QlosQ0FBQyxHQUFHbEYsU0FBUyxDQUFDRyxNQUF2QyxFQUErQytFLENBQUMsRUFBaEQsRUFBb0Q7QUFDaERjLGFBQU8sR0FBR2hHLFNBQVMsQ0FBQ0UsS0FBVixHQUFrQmdGLENBQWxCLEdBQXNCbkMsV0FBaEM7QUFFQUUsT0FBQyxHQUFHakQsU0FBUyxDQUFDd0IsSUFBVixDQUFldUUsT0FBTyxHQUFHQyxPQUF6QixDQUFKO0FBQ0E5QyxPQUFDLEdBQUdsRCxTQUFTLENBQUN3QixJQUFWLENBQWV1RSxPQUFPLEdBQUdDLE9BQVYsR0FBb0IsQ0FBbkMsQ0FBSjtBQUNBN0MsT0FBQyxHQUFHbkQsU0FBUyxDQUFDd0IsSUFBVixDQUFldUUsT0FBTyxHQUFHQyxPQUFWLEdBQW9CLENBQW5DLENBQUo7QUFDQTVDLE9BQUMsR0FBR3BELFNBQVMsQ0FBQ3dCLElBQVYsQ0FBZXVFLE9BQU8sR0FBR0MsT0FBVixHQUFvQixDQUFuQyxDQUFKO0FBRUFWLFdBQUssR0FBR04sV0FBVyxDQUFDQyxDQUFELEVBQUlDLENBQUosRUFBT2pDLENBQVAsRUFBVUMsQ0FBVixFQUFhQyxDQUFiLEVBQWdCQyxDQUFoQixDQUFuQjtBQUNBd0MsaUJBQVcsQ0FBQ04sS0FBRCxDQUFYO0FBQ0g7QUFDSjtBQUNKLEMiLCJmaWxlIjoiYXBwLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2FuaW1hdGlvbi50c1wiKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgV29ya2VyKF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCIyZjZjZTRmYjE4M2VmOTA4YjVjZi53b3JrZXIuanNcIik7XG59OyIsImltcG9ydCB7IFF1YWRXb3JrZXJEYXRhTWVzc2FnZSB9IGZyb20gJy4vc2NoZW1hJztcbmltcG9ydCB7IGxvYWRJbWFnZSwgZ2V0SW1hZ2VEYXRhT2ZmU2NyZWVuIH0gZnJvbSAnLi91dGlsJztcbmltcG9ydCBRdWFkV29ya2VyIGZyb20gJ3dvcmtlci1sb2FkZXIhLi9xdWFkLndvcmtlcic7XG5cbmxldCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xubGV0IGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcbmxldCBpbWFnZUlucHV0OiBIVE1MSW5wdXRFbGVtZW50O1xubGV0IHF1YWRXb3JrZXI6IFF1YWRXb3JrZXI7XG5jb25zdCBmcmFtZXM6IEltYWdlRGF0YVtdID0gW107XG5sZXQgb2ZmbGluZUFuaW1hdGVJZDogbnVtYmVyO1xuXG5mdW5jdGlvbiBkcmF3KGltYWdlRGF0YTogSW1hZ2VEYXRhKSB7XG4gICAgY29udGV4dC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgICBjb250ZXh0LnB1dEltYWdlRGF0YShpbWFnZURhdGEsIDAsIDApO1xufVxuXG5mdW5jdGlvbiBvZmZsaW5lQW5pbWF0ZShvZmZsaW5lRnJhbWVzOiBJbWFnZURhdGFbXSwgYW5pbWF0ZUluZGV4OiBudW1iZXIgPSAwLCBjdXJyRnJhbWVJbmRleDogbnVtYmVyID0gMCwgbnVtRnJhbWVzRWFjaDogbnVtYmVyID0gMjApOiB2b2lkIHtcbiAgICBsZXQgbmV4dEZyYW1lSW5kZXg6IG51bWJlciA9IGN1cnJGcmFtZUluZGV4ICsgMTtcbiAgICBsZXQgbmV4dEFuaW1hdGVJbmRleDogbnVtYmVyID0gYW5pbWF0ZUluZGV4O1xuXG4gICAgaWYgKG5leHRGcmFtZUluZGV4ID4gbnVtRnJhbWVzRWFjaCkge1xuICAgICAgICBuZXh0QW5pbWF0ZUluZGV4ID0gYW5pbWF0ZUluZGV4ICsgMSA+PSBvZmZsaW5lRnJhbWVzLmxlbmd0aCA/IDAgOiBhbmltYXRlSW5kZXggKyAxO1xuICAgICAgICBuZXh0RnJhbWVJbmRleCA9IDA7XG4gICAgfVxuXG4gICAgb2ZmbGluZUFuaW1hdGVJZCA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gb2ZmbGluZUFuaW1hdGUob2ZmbGluZUZyYW1lcywgbmV4dEFuaW1hdGVJbmRleCwgbmV4dEZyYW1lSW5kZXgsIG51bUZyYW1lc0VhY2gpKTtcblxuICAgIGRyYXcob2ZmbGluZUZyYW1lc1tuZXh0QW5pbWF0ZUluZGV4XSk7XG59XG5cbmZ1bmN0aW9uIHByb2Nlc3NJbWFnZShpbWFnZUZpbGU6IEZpbGUpOiB2b2lkIHtcbiAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUob2ZmbGluZUFuaW1hdGVJZCk7XG5cbiAgICBsb2FkSW1hZ2UoaW1hZ2VGaWxlKVxuICAgICAgICAudGhlbihpbWFnZUVsZW0gPT4gZ2V0SW1hZ2VEYXRhT2ZmU2NyZWVuKGltYWdlRWxlbSwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KSlcbiAgICAgICAgLnRoZW4oKGltYWdlRGF0YTogSW1hZ2VEYXRhKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBtZXNzYWdlOiBRdWFkV29ya2VyRGF0YU1lc3NhZ2UgPSB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ25ldy1pbWFnZScsXG4gICAgICAgICAgICAgICAgZGF0YTogaW1hZ2VEYXRhXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcXVhZFdvcmtlci5wb3N0TWVzc2FnZShtZXNzYWdlKTtcbiAgICAgICAgfSk7XG59XG5cbmZ1bmN0aW9uIG9uSW1hZ2VDaGFuZ2UoZXZlbnQ6IEV2ZW50KSB7XG4gICAgY29uc3QgaW1hZ2VJbnB1dDogSFRNTElucHV0RWxlbWVudCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICAgIGlmICghaW1hZ2VJbnB1dCB8fFxuICAgICAgICAhaW1hZ2VJbnB1dC5maWxlcyB8fFxuICAgICAgICAhaW1hZ2VJbnB1dC5maWxlcy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBmaXJzdEltYWdlID0gaW1hZ2VJbnB1dC5maWxlc1swXTtcbiAgICBwcm9jZXNzSW1hZ2UoZmlyc3RJbWFnZSk7XG59XG5cbmZ1bmN0aW9uIHJlc2l6ZUNhbnZhcygpIHtcbiAgICBjb25zdCBjb21wdXRlZFN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoY2FudmFzKTtcbiAgICBjb25zdCB3aWR0aCA9IHBhcnNlSW50KGNvbXB1dGVkU3R5bGUuZ2V0UHJvcGVydHlWYWx1ZSgnd2lkdGgnKSwgMTApO1xuICAgIGNvbnN0IGhlaWdodCA9IHBhcnNlSW50KGNvbXB1dGVkU3R5bGUuZ2V0UHJvcGVydHlWYWx1ZSgnaGVpZ2h0JyksIDEwKTtcbiAgICBjYW52YXMud2lkdGggPSB3aWR0aDtcbiAgICBjYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xufVxuXG5mdW5jdGlvbiBvbldvcmtlck1lc3NhZ2UoZXZlbnQ6IE1lc3NhZ2VFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IG1lc3NhZ2U6IFF1YWRXb3JrZXJEYXRhTWVzc2FnZSA9IGV2ZW50LmRhdGE7XG4gICAgc3dpdGNoIChtZXNzYWdlLnR5cGUpIHtcbiAgICAgICAgY2FzZSAnZHJhdyc6XG4gICAgICAgICAgICBpZiAobWVzc2FnZS5kYXRhKSB7XG4gICAgICAgICAgICAgICAgZnJhbWVzLnB1c2gobWVzc2FnZS5kYXRhKTtcbiAgICAgICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRpbWVzdGFtcCA9PiBkcmF3KG1lc3NhZ2UuZGF0YSkpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAncHJvY2Vzc2VkJzpcbiAgICAgICAgICAgIG9mZmxpbmVBbmltYXRlSWQgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IG9mZmxpbmVBbmltYXRlKGZyYW1lcykpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBVbmtub3duIG1lc3NhZ2UgdHlwZTogJHttZXNzYWdlfWApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gbWFpbigpIHtcbiAgICBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJykgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG4gICAgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpIGFzIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcbiAgICBpbWFnZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ltYWdlLWlucHV0JykgYXMgSFRNTElucHV0RWxlbWVudDtcblxuICAgIGltYWdlSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgb25JbWFnZUNoYW5nZSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHJlc2l6ZUNhbnZhcyk7XG5cbiAgICAvLyBXZWIgd29ya2VyIGxvZ2ljXG4gICAgcXVhZFdvcmtlciA9IG5ldyBRdWFkV29ya2VyKCk7XG4gICAgcXVhZFdvcmtlci5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgb25Xb3JrZXJNZXNzYWdlKTtcblxuICAgIHJlc2l6ZUNhbnZhcygpO1xufVxuXG5tYWluKCk7IiwiaW1wb3J0IHsgUGl4ZWwsIENvbG9yIH0gZnJvbSAnLi9zY2hlbWEnO1xuXG5leHBvcnQgY29uc3QgUElYRUxfV0lEVEg6IG51bWJlciA9IDQ7XG5leHBvcnQgY29uc3QgV0hJVEVfQ09MT1I6IENvbG9yID0ge1xuICAgIHI6IDI1NSxcbiAgICBnOiAyNTUsXG4gICAgYjogMjU1LFxuICAgIGE6IDI1NSxcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2FkSW1hZ2UoaW1hZ2VGaWxlOiBGaWxlKTogUHJvbWlzZTxIVE1MSW1hZ2VFbGVtZW50PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgY29uc3QgaW1hZ2VGaWxlRGF0YVVybCA9IHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKGltYWdlRmlsZSk7XG4gICAgICAgIGNvbnN0IGltYWdlID0gbmV3IEltYWdlKCk7XG5cbiAgICAgICAgaW1hZ2Uub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgd2luZG93LlVSTC5yZXZva2VPYmplY3RVUkwoaW1hZ2VGaWxlRGF0YVVybCk7XG4gICAgICAgICAgICByZXNvbHZlKGltYWdlKVxuICAgICAgICB9O1xuICAgICAgICBpbWFnZS5vbmVycm9yID0gKGVycikgPT4ge1xuICAgICAgICAgICAgd2luZG93LlVSTC5yZXZva2VPYmplY3RVUkwoaW1hZ2VGaWxlRGF0YVVybCk7XG4gICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfTtcbiAgICAgICAgaW1hZ2Uuc3JjID0gaW1hZ2VGaWxlRGF0YVVybDtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEF2ZXJhZ2VDb2xvcihwaXhlbHM6IFBpeGVsW10pOiBDb2xvciB7XG4gICAgbGV0IHNxdWFyZWRTdW1SOiBudW1iZXI7XG4gICAgbGV0IHNxdWFyZWRTdW1HOiBudW1iZXI7XG4gICAgbGV0IHNxdWFyZWRTdW1COiBudW1iZXI7XG4gICAgbGV0IHNxdWFyZWRTdW1BOiBudW1iZXI7XG4gICAgbGV0IGF2ZXJhZ2VDb2xvcjogQ29sb3IgPSBwaXhlbHNbMF0gfHwgV0hJVEVfQ09MT1I7XG5cbiAgICBpZiAocGl4ZWxzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgcmV0dXJuIHBpeGVscy5zbGljZSgxKVxuICAgICAgICAgICAgLnJlZHVjZSgocHJldkF2ZXJhZ2U6IENvbG9yLCBjdXJyUGl4ZWw6IFBpeGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgc3F1YXJlZFN1bVIgPSBNYXRoLnBvdyhwcmV2QXZlcmFnZS5yLCAyKSArIE1hdGgucG93KGN1cnJQaXhlbC5yLCAyKTtcbiAgICAgICAgICAgICAgICBzcXVhcmVkU3VtRyA9IE1hdGgucG93KHByZXZBdmVyYWdlLmcsIDIpICsgTWF0aC5wb3coY3VyclBpeGVsLmcsIDIpO1xuICAgICAgICAgICAgICAgIHNxdWFyZWRTdW1CID0gTWF0aC5wb3cocHJldkF2ZXJhZ2UuYiwgMikgKyBNYXRoLnBvdyhjdXJyUGl4ZWwuYiwgMik7XG4gICAgICAgICAgICAgICAgc3F1YXJlZFN1bUEgPSBNYXRoLnBvdyhwcmV2QXZlcmFnZS5hLCAyKSArIE1hdGgucG93KGN1cnJQaXhlbC5hLCAyKTtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICByOiBNYXRoLnNxcnQoc3F1YXJlZFN1bVIgLyAyKSxcbiAgICAgICAgICAgICAgICAgICAgZzogTWF0aC5zcXJ0KHNxdWFyZWRTdW1HIC8gMiksXG4gICAgICAgICAgICAgICAgICAgIGI6IE1hdGguc3FydChzcXVhcmVkU3VtQiAvIDIpLFxuICAgICAgICAgICAgICAgICAgICBhOiBNYXRoLnNxcnQoc3F1YXJlZFN1bUEgLyAyKSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSwgYXZlcmFnZUNvbG9yKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXZlcmFnZUNvbG9yO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVQaXhlbCh4OiBudW1iZXIsIHk6IG51bWJlciwgcjogbnVtYmVyLCBnOiBudW1iZXIsIGI6IG51bWJlciwgYTogbnVtYmVyKTogUGl4ZWwge1xuICAgIHJldHVybiB7XG4gICAgICAgIHgsXG4gICAgICAgIHksXG4gICAgICAgIHIsXG4gICAgICAgIGcsXG4gICAgICAgIGIsXG4gICAgICAgIGEsXG4gICAgICAgIGdldEJvdW5kcygpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgeDogdGhpcy54LFxuICAgICAgICAgICAgICAgIHk6IHRoaXMueSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQaXhlbHMoaW1hZ2VEYXRhOiBJbWFnZURhdGEpOiBQaXhlbFtdIHtcbiAgICBsZXQgcGl4ZWxzOiBQaXhlbFtdID0gW107XG4gICAgcHJvY2Vzc0ltYWdlRGF0YShpbWFnZURhdGEsIHBpeGVsID0+IHBpeGVscy5wdXNoKHBpeGVsKSk7XG4gICAgcmV0dXJuIHBpeGVscztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbGxQaXhlbEluSW1hZ2VEYXRhKGltYWdlRGF0YTogSW1hZ2VEYXRhLCBwaXhlbDogUGl4ZWwpOiB2b2lkIHtcbiAgICBjb25zdCBwaXhlbE9mZnNldDogbnVtYmVyID0gKHBpeGVsLnggKyBwaXhlbC55ICogaW1hZ2VEYXRhLndpZHRoKSAqIFBJWEVMX1dJRFRIO1xuICAgIGlmIChwaXhlbE9mZnNldCA8IDAgfHwgcGl4ZWxPZmZzZXQgKyBQSVhFTF9XSURUSCA+PSBpbWFnZURhdGEuZGF0YS5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpbWFnZURhdGEuZGF0YVtwaXhlbE9mZnNldF0gPSBwaXhlbC5yO1xuICAgIGltYWdlRGF0YS5kYXRhW3BpeGVsT2Zmc2V0ICsgMV0gPSBwaXhlbC5nO1xuICAgIGltYWdlRGF0YS5kYXRhW3BpeGVsT2Zmc2V0ICsgMl0gPSBwaXhlbC5iO1xuICAgIGltYWdlRGF0YS5kYXRhW3BpeGVsT2Zmc2V0ICsgM10gPSBwaXhlbC5hO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SW1hZ2VEYXRhT2ZmU2NyZWVuKGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50LCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcik6IEltYWdlRGF0YSB7XG4gICAgY29uc3QgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgIGNvbnN0IGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpIGFzIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcblxuICAgIGNhbnZhcy53aWR0aCA9IHdpZHRoO1xuICAgIGNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XG5cbiAgICBjb250ZXh0LmRyYXdJbWFnZShpbWFnZSwgMCwgMCwgaW1hZ2Uud2lkdGgsIGltYWdlLmhlaWdodCwgMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcblxuICAgIGNvbnN0IGltYWdlRGF0YTogSW1hZ2VEYXRhID0gY29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgICByZXR1cm4gaW1hZ2VEYXRhO1xufVxuXG5mdW5jdGlvbiBwcm9jZXNzSW1hZ2VEYXRhKGltYWdlRGF0YTogSW1hZ2VEYXRhLCBwcm9jZXNzRnVuYzogKHBpeGVsOiBQaXhlbCkgPT4gdm9pZCwgaW5pdFBpeGVsWDogbnVtYmVyID0gMCwgaW5pdFBpeGVsWTogbnVtYmVyID0gMCk6IHZvaWQge1xuICAgIGxldCByOiBudW1iZXI7XG4gICAgbGV0IGc6IG51bWJlcjtcbiAgICBsZXQgYjogbnVtYmVyO1xuICAgIGxldCBhOiBudW1iZXI7XG4gICAgbGV0IG9mZnNldFg6IG51bWJlcjtcbiAgICBsZXQgb2Zmc2V0WTogbnVtYmVyO1xuICAgIGxldCBwaXhlbDogUGl4ZWw7XG5cbiAgICBmb3IgKGxldCB4ID0gaW5pdFBpeGVsWDsgeCA8IGltYWdlRGF0YS53aWR0aDsgeCsrKSB7XG4gICAgICAgIG9mZnNldFggPSB4ICogUElYRUxfV0lEVEg7XG5cbiAgICAgICAgZm9yIChsZXQgeSA9IGluaXRQaXhlbFk7IHkgPCBpbWFnZURhdGEuaGVpZ2h0OyB5KyspIHtcbiAgICAgICAgICAgIG9mZnNldFkgPSBpbWFnZURhdGEud2lkdGggKiB5ICogUElYRUxfV0lEVEg7XG5cbiAgICAgICAgICAgIHIgPSBpbWFnZURhdGEuZGF0YVtvZmZzZXRYICsgb2Zmc2V0WV07XG4gICAgICAgICAgICBnID0gaW1hZ2VEYXRhLmRhdGFbb2Zmc2V0WCArIG9mZnNldFkgKyAxXTtcbiAgICAgICAgICAgIGIgPSBpbWFnZURhdGEuZGF0YVtvZmZzZXRYICsgb2Zmc2V0WSArIDJdO1xuICAgICAgICAgICAgYSA9IGltYWdlRGF0YS5kYXRhW29mZnNldFggKyBvZmZzZXRZICsgM107XG5cbiAgICAgICAgICAgIHBpeGVsID0gY3JlYXRlUGl4ZWwoeCwgeSwgciwgZywgYiwgYSk7XG4gICAgICAgICAgICBwcm9jZXNzRnVuYyhwaXhlbCk7XG4gICAgICAgIH1cbiAgICB9XG59Il0sInNvdXJjZVJvb3QiOiIifQ==