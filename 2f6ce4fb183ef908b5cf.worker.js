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
/******/ 	return __webpack_require__(__webpack_require__.s = "./node_modules/babel-loader/lib/index.js!./src/quad.worker.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/babel-loader/lib/index.js!./src/quad.worker.ts":
/*!************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./src/quad.worker.ts ***!
  \************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var simplequad__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! simplequad */ "./node_modules/simplequad/dist/simplequad.esm.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./src/util.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var processedMessage = {
  type: 'processed'
};

function buildQuadTreeFromPixels(imageData, bounds, capacity) {
  var pixels = Object(_util__WEBPACK_IMPORTED_MODULE_1__["createPixels"])(imageData);
  var quadTree = Object(simplequad__WEBPACK_IMPORTED_MODULE_0__["createQuadTree"])(bounds, capacity); // Build quadtree with this capacity from pixels

  pixels.forEach(function (pixel) {
    return quadTree.add(pixel);
  });
  return quadTree;
}

function fillImageDataFromQuadTree(imageData, quadTree) {
  if (quadTree.quadrants.length) {
    quadTree.quadrants.forEach(function (quadrant) {
      return fillImageDataFromQuadTree(imageData, quadrant);
    });
  } else {
    var pixels = quadTree.getData();
    var averageColor = Object(_util__WEBPACK_IMPORTED_MODULE_1__["getAverageColor"])(pixels);
    pixels.forEach(function (pixel) {
      return Object(_util__WEBPACK_IMPORTED_MODULE_1__["fillPixelInImageData"])(imageData, _objectSpread({}, pixel, {}, averageColor));
    });
  }

  return imageData;
}

function requestDraw(imageData, capacity) {
  var message = {
    type: 'draw',
    data: createImage(imageData, capacity)
  };
  postMessage(message);
}

function processImage(imageData) {
  var capacity = imageData.width * imageData.height;

  while (capacity > 1) {
    requestDraw(imageData, capacity);
    capacity /= 2;
  }

  requestDraw(imageData, 1);
  postMessage(processedMessage);
}

function createImage(imageData, capacity) {
  var newImageData = new ImageData(imageData.width, imageData.height);
  var quadTree = buildQuadTreeFromPixels(imageData, {
    x: 0,
    y: 0,
    width: imageData.width,
    height: imageData.height
  }, capacity);
  fillImageDataFromQuadTree(newImageData, quadTree);
  return newImageData;
} // Setting up the worker


var worker = self;
worker.addEventListener('message', function (event) {
  var message = event.data;
  var imageData = message.data;

  switch (message.type) {
    case 'new-image':
      if (imageData) {
        processImage(imageData);
      }

      break;

    default:
      console.error("Unknown message type: ".concat(message));
      return;
  }
});

/***/ }),

/***/ "./node_modules/simplequad/dist/simplequad.esm.js":
/*!********************************************************!*\
  !*** ./node_modules/simplequad/dist/simplequad.esm.js ***!
  \********************************************************/
/*! exports provided: createQuadTree */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createQuadTree", function() { return createQuadTree; });
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

// The # of combinations between these 3 bounds is as follows:
// - Circle and Circle
// - Circle and Point
// - Circle and BoundingBox
// - BoundingBox and BoundingBox
// - BoundingBox and Point
// - Point and Point
function isCircle(bound) {
  return bound.r !== undefined;
}

function isBoundingBox(bound) {
  return bound.width !== undefined;
}

function isPoint(bound) {
  return !isCircle(bound) && !isBoundingBox(bound);
}

function doPointsIntersect(point1, point2) {
  return point1.x === point2.x && point1.y === point2.y;
}

function doBoundingBoxPointIntersect(bounds, point) {
  return doBoundingBoxesIntersect(bounds, {
    x: point.x,
    y: point.y,
    width: 0,
    height: 0
  });
}

function doCirclePointIntersect(circle, point) {
  return doCirclesIntersect(circle, {
    x: point.x,
    y: point.y,
    r: 0
  });
} // https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection#Axis-Aligned_Bounding_Box


function doBoundingBoxesIntersect(box1, box2) {
  return box1.x <= box2.x + box2.width && box1.x + box1.width >= box2.x && box1.y <= box2.y + box2.height && box1.y + box1.height >= box2.y;
} // https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection#Circle_Collision


function doCirclesIntersect(circle1, circle2) {
  var dx = circle1.x - circle2.x;
  var dy = circle1.y - circle2.y;
  var distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
  return distance <= circle1.r + circle2.r;
} // https://yal.cc/rectangle-circle-intersection-test/


function doCircleBoundingBoxIntersect(circle, box) {
  var dx = circle.x - Math.max(box.x, Math.min(circle.x, box.x + box.width));
  var dy = circle.y - Math.max(box.y, Math.min(circle.y, box.y + box.height));
  return Math.pow(dx, 2) + Math.pow(dy, 2) <= Math.pow(circle.r, 2);
}

function doBoundsIntersect(bound1, bound2) {
  var isBound1Circle = isCircle(bound1);
  var isBound2Circle = isCircle(bound2);
  var isBound1BoundingBox = isBoundingBox(bound1);
  var isBound2BoundingBox = isBoundingBox(bound2);
  var isBound1Point = isPoint(bound1);
  var isBound2Point = isPoint(bound2); // They are both circles

  if (isBound1Circle && isBound2Circle) {
    return doCirclesIntersect(bound1, bound2);
  } // They are both bounding boxes


  if (isBound1BoundingBox && isBound2BoundingBox) {
    return doBoundingBoxesIntersect(bound1, bound2);
  } // They are both points


  if (isBound1Point && isBound2Point) {
    return doPointsIntersect(bound1, bound2);
  } // 1 is circle, 2 is bounding box


  if (isBound1Circle && isBound2BoundingBox) {
    return doCircleBoundingBoxIntersect(bound1, bound2);
  } // 1 is circle, 2 is point


  if (isBound1Circle && isBound2Point) {
    return doCirclePointIntersect(bound1, bound2);
  } // 1 is bounding box, 2 is circle


  if (isBound1BoundingBox && isBound2Circle) {
    return doCircleBoundingBoxIntersect(bound2, bound1);
  } // 1 is bounding box, 2 is point


  if (isBound1BoundingBox && isBound2Point) {
    return doBoundingBoxPointIntersect(bound1, bound2);
  } // 1 is point, 2 is 2 is circle


  if (isBound1Point && isBound2Circle) {
    return doCirclePointIntersect(bound2, bound1);
  } // 1 is point, 2 is bounding box


  return doBoundingBoxPointIntersect(bound2, bound1);
}
function divideBoundingBox(bounds) {
  var quadWidth = bounds.width / 2;
  var quadHeight = bounds.height / 2;
  var offsetX = bounds.x + quadWidth;
  var offsetY = bounds.y + quadHeight;
  var nwBoundingBox = {
    x: bounds.x,
    y: bounds.y,
    width: quadWidth,
    height: quadHeight
  };
  var neBoundingBox = {
    x: offsetX,
    y: bounds.y,
    width: quadWidth,
    height: quadHeight
  };
  var swBoundingBox = {
    x: bounds.x,
    y: offsetY,
    width: quadWidth,
    height: quadHeight
  };
  var seBoundingBox = {
    x: offsetX,
    y: offsetY,
    width: quadWidth,
    height: quadHeight
  };
  return [nwBoundingBox, neBoundingBox, swBoundingBox, seBoundingBox];
}
function createPointKey(point) {
  return "(".concat(point.x, ",").concat(point.y, ")");
}
function flattenSets(sets) {
  var flattenedSet = new Set();
  (sets || []).forEach(function (set) {
    if (set.size === 0) {
      return;
    }

    set.forEach(function (setItem) {
      return flattenedSet.add(setItem);
    });
  });
  return flattenedSet;
}

function addToQuadTree(quadTree, object) {
  var objectBound = object.getBounds(); // Let's first check if the point this object occupies is within
  // the bounds of the bucket

  if (!doBoundsIntersect(quadTree.bounds, objectBound)) {
    return false;
  } // Checking children, if this node is a "Container" (No data)


  if ((quadTree.quadrants || []).length > 0) {
    // Run through all children checking if the object can be added
    // At the first successful add, we can bail out, only needs to be stored once
    var wasAddedToChild = quadTree.quadrants.some(function (quadrant) {
      return addToQuadTree(quadrant, object);
    }); // Only leaf nodes should have data (We are a "Container node")
    // If it didn't intersect with any child, it won't intersect with us

    return wasAddedToChild;
  } // Let's get the data already associated with this bucket


  var objectPointKey = createPointKey(objectBound);
  var objectPointSet = quadTree.data.get(objectPointKey) || new Set(); // Let's check if the object is already in the bucket

  if (objectPointSet.has(object)) {
    return false;
  } // Let's see if this quadrant has any capacity
  // If it does, we can go ahead and store the current object
  //
  // We also wanna go ahead and add, if this point (x, y) has already
  // had an object added, we'll chain it on to the list of objects 
  // associated with this point


  if (objectPointSet.size > 0 || quadTree.data.size + 1 <= quadTree.capacity) {
    quadTree.data.set(objectPointKey, new Set([].concat(_toConsumableArray(objectPointSet), [object])));
    return true;
  } // The current node fits the current object, but
  // There isn't any capacity
  // We need to split this bucket up
  // Let's first build the child quadrants
  // Let's create the child QuadTree's from the divided quadrant bounds


  var quadBoxes = divideBoundingBox(quadTree.bounds);
  var quadrants = quadBoxes.map(function (quadBox) {
    return createQuadTree(quadBox, quadTree.capacity);
  });
  var quadObjects = [].concat(_toConsumableArray(flattenSets(_toConsumableArray(quadTree.data.values()))), [object]); // adjust current quadtree settings
  // May need to adjust these in-place instead of creating new references

  clearQuadTree(quadTree);
  quadTree.quadrants = quadrants; // add objects from this quad node back to it's own subtree
  // children will be attempted to be added to first

  return quadObjects.every(function (quadObject) {
    return addToQuadTree(quadTree, quadObject);
  });
}

function removeFromQuadTree(quadTree, object) {
  var objectBound = object.getBounds();
  var objectPointKey = createPointKey(objectBound);
  var objectPointSet = quadTree.data.get(objectPointKey) || new Set(); // If object is found, let's remove it

  if (objectPointSet.has(object)) {
    objectPointSet["delete"](object); // If there were multiple objects at this point
    // we don't need to remove this point key

    if (objectPointSet.size > 0) {
      quadTree.data.set(objectPointKey, objectPointSet);
    } else {
      quadTree.data["delete"](objectPointKey);
    }

    return true;
  } // Check children to find object and remove if found


  var wasRemoved = quadTree.quadrants.some(function (quadrant) {
    return removeFromQuadTree(quadrant, object);
  }); // If one of the children contained the object we just removed
  // Let's query the bounding box of us (the parent) to see if we 
  // can collapse or consume our children. Meaning the child subtree
  // contains less elements than our individual bucket capacity.

  if (wasRemoved) {
    var childObjectSet = queryQuadTree(quadTree, quadTree.bounds);

    if (childObjectSet.size <= quadTree.capacity) {
      clearQuadTree(quadTree);
      childObjectSet.forEach(function (childObject) {
        return addToQuadTree(quadTree, childObject);
      });
    }
  }

  return wasRemoved;
}

function clearQuadTree(quadTree) {
  quadTree.data = new Map();
  quadTree.quadrants = [];
}

function queryQuadTree(quadTree, bounds) {
  // Check first if the query bounds intersect with the bounds
  // of the bucket, if it doesn't we can bail immediately with an empty list
  if (!doBoundsIntersect(quadTree.bounds, bounds)) {
    return new Set();
  } // Check if current node has children


  if ((quadTree.quadrants || []).length === 0) {
    // Let's iterate over the data in the bucket to see
    // if the objects themselves intersect with the query bounds
    return new Set(_toConsumableArray(flattenSets(_toConsumableArray(quadTree.data.values()))).filter(function (quadObject) {
      return doBoundsIntersect(quadObject.getBounds(), bounds);
    }));
  } // Check the current nodes children
  // querying them for the same info and collecting
  // the results


  var childQueryResultSet = flattenSets(quadTree.quadrants.map(function (quadrant) {
    return queryQuadTree(quadrant, bounds);
  }));
  return childQueryResultSet;
}

function getQuadTreeData(quadTree) {
  return _toConsumableArray(flattenSets(_toConsumableArray(quadTree.data.values())));
}
/**
 * Creates a quadtree "managing" the input bounds with input node capacity.
 * 
 * All collision objects should intersect or be contained within these "managed" bounds.
 * @param {BoundingBox} bounds - The bounding box with which the quadtree "manages".
 * @param {number} [capacity=3] - The # of collision objects a node can contain before subdividing.
 * @return {QuadTree} The created quadtree "managing" the input bounds.
 */


function createQuadTree(bounds) {
  var capacity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
  var quadTree = {
    bounds: bounds,
    data: new Map(),
    capacity: capacity,
    quadrants: [],
    add: function add(object) {
      return addToQuadTree(quadTree, object);
    },
    remove: function remove(object) {
      return removeFromQuadTree(quadTree, object);
    },
    clear: function clear() {
      return clearQuadTree(quadTree);
    },
    query: function query(bounds) {
      return queryQuadTree(quadTree, bounds);
    },
    getData: function getData() {
      return getQuadTreeData(quadTree);
    }
  };
  return quadTree;
}




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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1YWQud29ya2VyLnRzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zaW1wbGVxdWFkL2Rpc3Qvc2ltcGxlcXVhZC5lc20uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwudHMiXSwibmFtZXMiOlsicHJvY2Vzc2VkTWVzc2FnZSIsInR5cGUiLCJidWlsZFF1YWRUcmVlRnJvbVBpeGVscyIsImltYWdlRGF0YSIsImJvdW5kcyIsImNhcGFjaXR5IiwicGl4ZWxzIiwiY3JlYXRlUGl4ZWxzIiwicXVhZFRyZWUiLCJjcmVhdGVRdWFkVHJlZSIsImZvckVhY2giLCJwaXhlbCIsImFkZCIsImZpbGxJbWFnZURhdGFGcm9tUXVhZFRyZWUiLCJxdWFkcmFudHMiLCJsZW5ndGgiLCJxdWFkcmFudCIsImdldERhdGEiLCJhdmVyYWdlQ29sb3IiLCJnZXRBdmVyYWdlQ29sb3IiLCJmaWxsUGl4ZWxJbkltYWdlRGF0YSIsInJlcXVlc3REcmF3IiwibWVzc2FnZSIsImRhdGEiLCJjcmVhdGVJbWFnZSIsInBvc3RNZXNzYWdlIiwicHJvY2Vzc0ltYWdlIiwid2lkdGgiLCJoZWlnaHQiLCJuZXdJbWFnZURhdGEiLCJJbWFnZURhdGEiLCJ4IiwieSIsIndvcmtlciIsInNlbGYiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJjb25zb2xlIiwiZXJyb3IiLCJQSVhFTF9XSURUSCIsIldISVRFX0NPTE9SIiwiciIsImciLCJiIiwiYSIsImxvYWRJbWFnZSIsImltYWdlRmlsZSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiaW1hZ2VGaWxlRGF0YVVybCIsIndpbmRvdyIsIlVSTCIsImNyZWF0ZU9iamVjdFVSTCIsImltYWdlIiwiSW1hZ2UiLCJvbmxvYWQiLCJyZXZva2VPYmplY3RVUkwiLCJvbmVycm9yIiwiZXJyIiwic3JjIiwic3F1YXJlZFN1bVIiLCJzcXVhcmVkU3VtRyIsInNxdWFyZWRTdW1CIiwic3F1YXJlZFN1bUEiLCJzbGljZSIsInJlZHVjZSIsInByZXZBdmVyYWdlIiwiY3VyclBpeGVsIiwiTWF0aCIsInBvdyIsInNxcnQiLCJjcmVhdGVQaXhlbCIsImdldEJvdW5kcyIsInByb2Nlc3NJbWFnZURhdGEiLCJwdXNoIiwicGl4ZWxPZmZzZXQiLCJnZXRJbWFnZURhdGFPZmZTY3JlZW4iLCJjYW52YXMiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJjb250ZXh0IiwiZ2V0Q29udGV4dCIsImRyYXdJbWFnZSIsImdldEltYWdlRGF0YSIsInByb2Nlc3NGdW5jIiwiaW5pdFBpeGVsWCIsImluaXRQaXhlbFkiLCJvZmZzZXRYIiwib2Zmc2V0WSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pGQTtBQUNBO0FBRUEsSUFBTUEsZ0JBQW1DLEdBQUc7QUFDeENDLE1BQUksRUFBRTtBQURrQyxD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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQSx1Q0FBdUM7QUFDdkM7O0FBRUE7QUFDQTtBQUNBLEdBQUc7OztBQUdIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLLEVBQUU7QUFDUDs7QUFFQTtBQUNBLEdBQUc7OztBQUdIO0FBQ0Esc0VBQXNFOztBQUV0RTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILHFIQUFxSDtBQUNySDs7QUFFQTtBQUNBLGlDQUFpQztBQUNqQzs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHNFQUFzRTs7QUFFdEU7QUFDQSxxQ0FBcUM7QUFDckM7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0EsR0FBRzs7O0FBR0g7QUFDQTtBQUNBLEdBQUcsRUFBRTtBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7O0FBR0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTs7O0FBR0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxZQUFZO0FBQ3ZCLFdBQVcsT0FBTztBQUNsQixZQUFZLFNBQVM7QUFDckI7OztBQUdBO0FBQ0E7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LFdBQUssR0FBRzZELFdBQVcsQ0FBQ3pDLENBQUQsRUFBSUMsQ0FBSixFQUFPUyxDQUFQLEVBQVVDLENBQVYsRUFBYUMsQ0FBYixFQUFnQkMsQ0FBaEIsQ0FBbkI7QUFDQXlDLGlCQUFXLENBQUMxRSxLQUFELENBQVg7QUFDSDtBQUNKO0FBQ0osQyIsImZpbGUiOiIyZjZjZTRmYjE4M2VmOTA4YjVjZi53b3JrZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4vc3JjL3F1YWQud29ya2VyLnRzXCIpO1xuIiwiaW1wb3J0IHsgUXVhZFdvcmtlckRhdGFNZXNzYWdlLCBQaXhlbCwgQ29sb3IsIFF1YWRXb3JrZXJNZXNzYWdlIH0gZnJvbSAnLi9zY2hlbWEnO1xuaW1wb3J0IHsgUXVhZFRyZWUsIGNyZWF0ZVF1YWRUcmVlLCBCb3VuZGluZ0JveCB9IGZyb20gJ3NpbXBsZXF1YWQnO1xuaW1wb3J0IHsgY3JlYXRlUGl4ZWxzLCBnZXRBdmVyYWdlQ29sb3IsIGZpbGxQaXhlbEluSW1hZ2VEYXRhIH0gZnJvbSAnLi91dGlsJztcblxuY29uc3QgcHJvY2Vzc2VkTWVzc2FnZTogUXVhZFdvcmtlck1lc3NhZ2UgPSB7XG4gICAgdHlwZTogJ3Byb2Nlc3NlZCcsXG59O1xuXG5mdW5jdGlvbiBidWlsZFF1YWRUcmVlRnJvbVBpeGVscyhpbWFnZURhdGE6IEltYWdlRGF0YSwgYm91bmRzOiBCb3VuZGluZ0JveCwgY2FwYWNpdHk6IG51bWJlcik6IFF1YWRUcmVlPFBpeGVsPiB7XG4gICAgY29uc3QgcGl4ZWxzOiBQaXhlbFtdID0gY3JlYXRlUGl4ZWxzKGltYWdlRGF0YSk7XG4gICAgY29uc3QgcXVhZFRyZWU6IFF1YWRUcmVlPFBpeGVsPiA9IGNyZWF0ZVF1YWRUcmVlKGJvdW5kcywgY2FwYWNpdHkpO1xuXG4gICAgLy8gQnVpbGQgcXVhZHRyZWUgd2l0aCB0aGlzIGNhcGFjaXR5IGZyb20gcGl4ZWxzXG4gICAgcGl4ZWxzLmZvckVhY2gocGl4ZWwgPT4gcXVhZFRyZWUuYWRkKHBpeGVsKSk7XG5cbiAgICByZXR1cm4gcXVhZFRyZWU7XG59XG5cbmZ1bmN0aW9uIGZpbGxJbWFnZURhdGFGcm9tUXVhZFRyZWUoaW1hZ2VEYXRhOiBJbWFnZURhdGEsIHF1YWRUcmVlOiBRdWFkVHJlZTxQaXhlbD4pOiBJbWFnZURhdGEgeyAgICBcbiAgICBpZiAocXVhZFRyZWUucXVhZHJhbnRzLmxlbmd0aCkge1xuICAgICAgICBxdWFkVHJlZS5xdWFkcmFudHNcbiAgICAgICAgICAgIC5mb3JFYWNoKHF1YWRyYW50ID0+XG4gICAgICAgICAgICAgICAgZmlsbEltYWdlRGF0YUZyb21RdWFkVHJlZShpbWFnZURhdGEsIHF1YWRyYW50KSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgcGl4ZWxzOiBQaXhlbFtdID0gcXVhZFRyZWUuZ2V0RGF0YSgpO1xuICAgICAgICBjb25zdCBhdmVyYWdlQ29sb3I6IENvbG9yID0gZ2V0QXZlcmFnZUNvbG9yKHBpeGVscyk7XG4gICAgICAgIHBpeGVscy5mb3JFYWNoKHBpeGVsID0+IGZpbGxQaXhlbEluSW1hZ2VEYXRhKGltYWdlRGF0YSwge1xuICAgICAgICAgICAgLi4ucGl4ZWwsXG4gICAgICAgICAgICAuLi5hdmVyYWdlQ29sb3IsXG4gICAgICAgIH0pKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaW1hZ2VEYXRhO1xufVxuXG5mdW5jdGlvbiByZXF1ZXN0RHJhdyhpbWFnZURhdGE6IEltYWdlRGF0YSwgY2FwYWNpdHk6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IG1lc3NhZ2U6IFF1YWRXb3JrZXJEYXRhTWVzc2FnZSA9IHtcbiAgICAgICAgdHlwZTogJ2RyYXcnLFxuICAgICAgICBkYXRhOiBjcmVhdGVJbWFnZShpbWFnZURhdGEsIGNhcGFjaXR5KSxcbiAgICB9O1xuICAgIHBvc3RNZXNzYWdlKG1lc3NhZ2UpO1xufVxuXG5mdW5jdGlvbiBwcm9jZXNzSW1hZ2UoaW1hZ2VEYXRhOiBJbWFnZURhdGEpOiB2b2lkIHtcbiAgICBsZXQgY2FwYWNpdHk6IG51bWJlciA9IGltYWdlRGF0YS53aWR0aCAqIGltYWdlRGF0YS5oZWlnaHQ7XG5cbiAgICB3aGlsZSAoY2FwYWNpdHkgPiAxKSB7XG4gICAgICAgIHJlcXVlc3REcmF3KGltYWdlRGF0YSwgY2FwYWNpdHkpO1xuICAgICAgICBjYXBhY2l0eSAvPSAyO1xuICAgIH1cblxuICAgIHJlcXVlc3REcmF3KGltYWdlRGF0YSwgMSk7XG4gICAgcG9zdE1lc3NhZ2UocHJvY2Vzc2VkTWVzc2FnZSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUltYWdlKGltYWdlRGF0YTogSW1hZ2VEYXRhLCBjYXBhY2l0eTogbnVtYmVyKTogSW1hZ2VEYXRhIHtcbiAgICBjb25zdCBuZXdJbWFnZURhdGE6IEltYWdlRGF0YSA9IG5ldyBJbWFnZURhdGEoaW1hZ2VEYXRhLndpZHRoLCBpbWFnZURhdGEuaGVpZ2h0KTtcbiAgICBjb25zdCBxdWFkVHJlZTogUXVhZFRyZWU8UGl4ZWw+ID0gYnVpbGRRdWFkVHJlZUZyb21QaXhlbHMoaW1hZ2VEYXRhLCB7XG4gICAgICAgIHg6IDAsXG4gICAgICAgIHk6IDAsXG4gICAgICAgIHdpZHRoOiBpbWFnZURhdGEud2lkdGgsXG4gICAgICAgIGhlaWdodDogaW1hZ2VEYXRhLmhlaWdodCxcbiAgICB9LCBjYXBhY2l0eSk7XG4gICAgZmlsbEltYWdlRGF0YUZyb21RdWFkVHJlZShuZXdJbWFnZURhdGEsIHF1YWRUcmVlKTtcbiAgICByZXR1cm4gbmV3SW1hZ2VEYXRhO1xufVxuXG4vLyBTZXR0aW5nIHVwIHRoZSB3b3JrZXJcbmNvbnN0IHdvcmtlcjogV29ya2VyID0gc2VsZiBhcyBhbnk7XG53b3JrZXIuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIChldmVudCkgPT4ge1xuICAgIGNvbnN0IG1lc3NhZ2U6IFF1YWRXb3JrZXJEYXRhTWVzc2FnZSA9IGV2ZW50LmRhdGE7XG4gICAgY29uc3QgaW1hZ2VEYXRhOiBJbWFnZURhdGEgPSBtZXNzYWdlLmRhdGE7XG5cbiAgICBzd2l0Y2ggKG1lc3NhZ2UudHlwZSkge1xuICAgICAgICBjYXNlICduZXctaW1hZ2UnOlxuICAgICAgICAgICAgaWYgKGltYWdlRGF0YSkge1xuICAgICAgICAgICAgICAgIHByb2Nlc3NJbWFnZShpbWFnZURhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBVbmtub3duIG1lc3NhZ2UgdHlwZTogJHttZXNzYWdlfWApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgIH1cbn0pOyIsImZ1bmN0aW9uIF90b0NvbnN1bWFibGVBcnJheShhcnIpIHtcbiAgcmV0dXJuIF9hcnJheVdpdGhvdXRIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXkoYXJyKSB8fCBfbm9uSXRlcmFibGVTcHJlYWQoKTtcbn1cblxuZnVuY3Rpb24gX2FycmF5V2l0aG91dEhvbGVzKGFycikge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkoYXJyLmxlbmd0aCk7IGkgPCBhcnIubGVuZ3RoOyBpKyspIGFycjJbaV0gPSBhcnJbaV07XG5cbiAgICByZXR1cm4gYXJyMjtcbiAgfVxufVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5KGl0ZXIpIHtcbiAgaWYgKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoaXRlcikgfHwgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGl0ZXIpID09PSBcIltvYmplY3QgQXJndW1lbnRzXVwiKSByZXR1cm4gQXJyYXkuZnJvbShpdGVyKTtcbn1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlU3ByZWFkKCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIHNwcmVhZCBub24taXRlcmFibGUgaW5zdGFuY2VcIik7XG59XG5cbi8vIFRoZSAjIG9mIGNvbWJpbmF0aW9ucyBiZXR3ZWVuIHRoZXNlIDMgYm91bmRzIGlzIGFzIGZvbGxvd3M6XG4vLyAtIENpcmNsZSBhbmQgQ2lyY2xlXG4vLyAtIENpcmNsZSBhbmQgUG9pbnRcbi8vIC0gQ2lyY2xlIGFuZCBCb3VuZGluZ0JveFxuLy8gLSBCb3VuZGluZ0JveCBhbmQgQm91bmRpbmdCb3hcbi8vIC0gQm91bmRpbmdCb3ggYW5kIFBvaW50XG4vLyAtIFBvaW50IGFuZCBQb2ludFxuZnVuY3Rpb24gaXNDaXJjbGUoYm91bmQpIHtcbiAgcmV0dXJuIGJvdW5kLnIgIT09IHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gaXNCb3VuZGluZ0JveChib3VuZCkge1xuICByZXR1cm4gYm91bmQud2lkdGggIT09IHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gaXNQb2ludChib3VuZCkge1xuICByZXR1cm4gIWlzQ2lyY2xlKGJvdW5kKSAmJiAhaXNCb3VuZGluZ0JveChib3VuZCk7XG59XG5cbmZ1bmN0aW9uIGRvUG9pbnRzSW50ZXJzZWN0KHBvaW50MSwgcG9pbnQyKSB7XG4gIHJldHVybiBwb2ludDEueCA9PT0gcG9pbnQyLnggJiYgcG9pbnQxLnkgPT09IHBvaW50Mi55O1xufVxuXG5mdW5jdGlvbiBkb0JvdW5kaW5nQm94UG9pbnRJbnRlcnNlY3QoYm91bmRzLCBwb2ludCkge1xuICByZXR1cm4gZG9Cb3VuZGluZ0JveGVzSW50ZXJzZWN0KGJvdW5kcywge1xuICAgIHg6IHBvaW50LngsXG4gICAgeTogcG9pbnQueSxcbiAgICB3aWR0aDogMCxcbiAgICBoZWlnaHQ6IDBcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGRvQ2lyY2xlUG9pbnRJbnRlcnNlY3QoY2lyY2xlLCBwb2ludCkge1xuICByZXR1cm4gZG9DaXJjbGVzSW50ZXJzZWN0KGNpcmNsZSwge1xuICAgIHg6IHBvaW50LngsXG4gICAgeTogcG9pbnQueSxcbiAgICByOiAwXG4gIH0pO1xufSAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL0dhbWVzL1RlY2huaXF1ZXMvMkRfY29sbGlzaW9uX2RldGVjdGlvbiNBeGlzLUFsaWduZWRfQm91bmRpbmdfQm94XG5cblxuZnVuY3Rpb24gZG9Cb3VuZGluZ0JveGVzSW50ZXJzZWN0KGJveDEsIGJveDIpIHtcbiAgcmV0dXJuIGJveDEueCA8PSBib3gyLnggKyBib3gyLndpZHRoICYmIGJveDEueCArIGJveDEud2lkdGggPj0gYm94Mi54ICYmIGJveDEueSA8PSBib3gyLnkgKyBib3gyLmhlaWdodCAmJiBib3gxLnkgKyBib3gxLmhlaWdodCA+PSBib3gyLnk7XG59IC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvR2FtZXMvVGVjaG5pcXVlcy8yRF9jb2xsaXNpb25fZGV0ZWN0aW9uI0NpcmNsZV9Db2xsaXNpb25cblxuXG5mdW5jdGlvbiBkb0NpcmNsZXNJbnRlcnNlY3QoY2lyY2xlMSwgY2lyY2xlMikge1xuICB2YXIgZHggPSBjaXJjbGUxLnggLSBjaXJjbGUyLng7XG4gIHZhciBkeSA9IGNpcmNsZTEueSAtIGNpcmNsZTIueTtcbiAgdmFyIGRpc3RhbmNlID0gTWF0aC5zcXJ0KE1hdGgucG93KGR4LCAyKSArIE1hdGgucG93KGR5LCAyKSk7XG4gIHJldHVybiBkaXN0YW5jZSA8PSBjaXJjbGUxLnIgKyBjaXJjbGUyLnI7XG59IC8vIGh0dHBzOi8veWFsLmNjL3JlY3RhbmdsZS1jaXJjbGUtaW50ZXJzZWN0aW9uLXRlc3QvXG5cblxuZnVuY3Rpb24gZG9DaXJjbGVCb3VuZGluZ0JveEludGVyc2VjdChjaXJjbGUsIGJveCkge1xuICB2YXIgZHggPSBjaXJjbGUueCAtIE1hdGgubWF4KGJveC54LCBNYXRoLm1pbihjaXJjbGUueCwgYm94LnggKyBib3gud2lkdGgpKTtcbiAgdmFyIGR5ID0gY2lyY2xlLnkgLSBNYXRoLm1heChib3gueSwgTWF0aC5taW4oY2lyY2xlLnksIGJveC55ICsgYm94LmhlaWdodCkpO1xuICByZXR1cm4gTWF0aC5wb3coZHgsIDIpICsgTWF0aC5wb3coZHksIDIpIDw9IE1hdGgucG93KGNpcmNsZS5yLCAyKTtcbn1cblxuZnVuY3Rpb24gZG9Cb3VuZHNJbnRlcnNlY3QoYm91bmQxLCBib3VuZDIpIHtcbiAgdmFyIGlzQm91bmQxQ2lyY2xlID0gaXNDaXJjbGUoYm91bmQxKTtcbiAgdmFyIGlzQm91bmQyQ2lyY2xlID0gaXNDaXJjbGUoYm91bmQyKTtcbiAgdmFyIGlzQm91bmQxQm91bmRpbmdCb3ggPSBpc0JvdW5kaW5nQm94KGJvdW5kMSk7XG4gIHZhciBpc0JvdW5kMkJvdW5kaW5nQm94ID0gaXNCb3VuZGluZ0JveChib3VuZDIpO1xuICB2YXIgaXNCb3VuZDFQb2ludCA9IGlzUG9pbnQoYm91bmQxKTtcbiAgdmFyIGlzQm91bmQyUG9pbnQgPSBpc1BvaW50KGJvdW5kMik7IC8vIFRoZXkgYXJlIGJvdGggY2lyY2xlc1xuXG4gIGlmIChpc0JvdW5kMUNpcmNsZSAmJiBpc0JvdW5kMkNpcmNsZSkge1xuICAgIHJldHVybiBkb0NpcmNsZXNJbnRlcnNlY3QoYm91bmQxLCBib3VuZDIpO1xuICB9IC8vIFRoZXkgYXJlIGJvdGggYm91bmRpbmcgYm94ZXNcblxuXG4gIGlmIChpc0JvdW5kMUJvdW5kaW5nQm94ICYmIGlzQm91bmQyQm91bmRpbmdCb3gpIHtcbiAgICByZXR1cm4gZG9Cb3VuZGluZ0JveGVzSW50ZXJzZWN0KGJvdW5kMSwgYm91bmQyKTtcbiAgfSAvLyBUaGV5IGFyZSBib3RoIHBvaW50c1xuXG5cbiAgaWYgKGlzQm91bmQxUG9pbnQgJiYgaXNCb3VuZDJQb2ludCkge1xuICAgIHJldHVybiBkb1BvaW50c0ludGVyc2VjdChib3VuZDEsIGJvdW5kMik7XG4gIH0gLy8gMSBpcyBjaXJjbGUsIDIgaXMgYm91bmRpbmcgYm94XG5cblxuICBpZiAoaXNCb3VuZDFDaXJjbGUgJiYgaXNCb3VuZDJCb3VuZGluZ0JveCkge1xuICAgIHJldHVybiBkb0NpcmNsZUJvdW5kaW5nQm94SW50ZXJzZWN0KGJvdW5kMSwgYm91bmQyKTtcbiAgfSAvLyAxIGlzIGNpcmNsZSwgMiBpcyBwb2ludFxuXG5cbiAgaWYgKGlzQm91bmQxQ2lyY2xlICYmIGlzQm91bmQyUG9pbnQpIHtcbiAgICByZXR1cm4gZG9DaXJjbGVQb2ludEludGVyc2VjdChib3VuZDEsIGJvdW5kMik7XG4gIH0gLy8gMSBpcyBib3VuZGluZyBib3gsIDIgaXMgY2lyY2xlXG5cblxuICBpZiAoaXNCb3VuZDFCb3VuZGluZ0JveCAmJiBpc0JvdW5kMkNpcmNsZSkge1xuICAgIHJldHVybiBkb0NpcmNsZUJvdW5kaW5nQm94SW50ZXJzZWN0KGJvdW5kMiwgYm91bmQxKTtcbiAgfSAvLyAxIGlzIGJvdW5kaW5nIGJveCwgMiBpcyBwb2ludFxuXG5cbiAgaWYgKGlzQm91bmQxQm91bmRpbmdCb3ggJiYgaXNCb3VuZDJQb2ludCkge1xuICAgIHJldHVybiBkb0JvdW5kaW5nQm94UG9pbnRJbnRlcnNlY3QoYm91bmQxLCBib3VuZDIpO1xuICB9IC8vIDEgaXMgcG9pbnQsIDIgaXMgMiBpcyBjaXJjbGVcblxuXG4gIGlmIChpc0JvdW5kMVBvaW50ICYmIGlzQm91bmQyQ2lyY2xlKSB7XG4gICAgcmV0dXJuIGRvQ2lyY2xlUG9pbnRJbnRlcnNlY3QoYm91bmQyLCBib3VuZDEpO1xuICB9IC8vIDEgaXMgcG9pbnQsIDIgaXMgYm91bmRpbmcgYm94XG5cblxuICByZXR1cm4gZG9Cb3VuZGluZ0JveFBvaW50SW50ZXJzZWN0KGJvdW5kMiwgYm91bmQxKTtcbn1cbmZ1bmN0aW9uIGRpdmlkZUJvdW5kaW5nQm94KGJvdW5kcykge1xuICB2YXIgcXVhZFdpZHRoID0gYm91bmRzLndpZHRoIC8gMjtcbiAgdmFyIHF1YWRIZWlnaHQgPSBib3VuZHMuaGVpZ2h0IC8gMjtcbiAgdmFyIG9mZnNldFggPSBib3VuZHMueCArIHF1YWRXaWR0aDtcbiAgdmFyIG9mZnNldFkgPSBib3VuZHMueSArIHF1YWRIZWlnaHQ7XG4gIHZhciBud0JvdW5kaW5nQm94ID0ge1xuICAgIHg6IGJvdW5kcy54LFxuICAgIHk6IGJvdW5kcy55LFxuICAgIHdpZHRoOiBxdWFkV2lkdGgsXG4gICAgaGVpZ2h0OiBxdWFkSGVpZ2h0XG4gIH07XG4gIHZhciBuZUJvdW5kaW5nQm94ID0ge1xuICAgIHg6IG9mZnNldFgsXG4gICAgeTogYm91bmRzLnksXG4gICAgd2lkdGg6IHF1YWRXaWR0aCxcbiAgICBoZWlnaHQ6IHF1YWRIZWlnaHRcbiAgfTtcbiAgdmFyIHN3Qm91bmRpbmdCb3ggPSB7XG4gICAgeDogYm91bmRzLngsXG4gICAgeTogb2Zmc2V0WSxcbiAgICB3aWR0aDogcXVhZFdpZHRoLFxuICAgIGhlaWdodDogcXVhZEhlaWdodFxuICB9O1xuICB2YXIgc2VCb3VuZGluZ0JveCA9IHtcbiAgICB4OiBvZmZzZXRYLFxuICAgIHk6IG9mZnNldFksXG4gICAgd2lkdGg6IHF1YWRXaWR0aCxcbiAgICBoZWlnaHQ6IHF1YWRIZWlnaHRcbiAgfTtcbiAgcmV0dXJuIFtud0JvdW5kaW5nQm94LCBuZUJvdW5kaW5nQm94LCBzd0JvdW5kaW5nQm94LCBzZUJvdW5kaW5nQm94XTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZVBvaW50S2V5KHBvaW50KSB7XG4gIHJldHVybiBcIihcIi5jb25jYXQocG9pbnQueCwgXCIsXCIpLmNvbmNhdChwb2ludC55LCBcIilcIik7XG59XG5mdW5jdGlvbiBmbGF0dGVuU2V0cyhzZXRzKSB7XG4gIHZhciBmbGF0dGVuZWRTZXQgPSBuZXcgU2V0KCk7XG4gIChzZXRzIHx8IFtdKS5mb3JFYWNoKGZ1bmN0aW9uIChzZXQpIHtcbiAgICBpZiAoc2V0LnNpemUgPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzZXQuZm9yRWFjaChmdW5jdGlvbiAoc2V0SXRlbSkge1xuICAgICAgcmV0dXJuIGZsYXR0ZW5lZFNldC5hZGQoc2V0SXRlbSk7XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gZmxhdHRlbmVkU2V0O1xufVxuXG5mdW5jdGlvbiBhZGRUb1F1YWRUcmVlKHF1YWRUcmVlLCBvYmplY3QpIHtcbiAgdmFyIG9iamVjdEJvdW5kID0gb2JqZWN0LmdldEJvdW5kcygpOyAvLyBMZXQncyBmaXJzdCBjaGVjayBpZiB0aGUgcG9pbnQgdGhpcyBvYmplY3Qgb2NjdXBpZXMgaXMgd2l0aGluXG4gIC8vIHRoZSBib3VuZHMgb2YgdGhlIGJ1Y2tldFxuXG4gIGlmICghZG9Cb3VuZHNJbnRlcnNlY3QocXVhZFRyZWUuYm91bmRzLCBvYmplY3RCb3VuZCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0gLy8gQ2hlY2tpbmcgY2hpbGRyZW4sIGlmIHRoaXMgbm9kZSBpcyBhIFwiQ29udGFpbmVyXCIgKE5vIGRhdGEpXG5cblxuICBpZiAoKHF1YWRUcmVlLnF1YWRyYW50cyB8fCBbXSkubGVuZ3RoID4gMCkge1xuICAgIC8vIFJ1biB0aHJvdWdoIGFsbCBjaGlsZHJlbiBjaGVja2luZyBpZiB0aGUgb2JqZWN0IGNhbiBiZSBhZGRlZFxuICAgIC8vIEF0IHRoZSBmaXJzdCBzdWNjZXNzZnVsIGFkZCwgd2UgY2FuIGJhaWwgb3V0LCBvbmx5IG5lZWRzIHRvIGJlIHN0b3JlZCBvbmNlXG4gICAgdmFyIHdhc0FkZGVkVG9DaGlsZCA9IHF1YWRUcmVlLnF1YWRyYW50cy5zb21lKGZ1bmN0aW9uIChxdWFkcmFudCkge1xuICAgICAgcmV0dXJuIGFkZFRvUXVhZFRyZWUocXVhZHJhbnQsIG9iamVjdCk7XG4gICAgfSk7IC8vIE9ubHkgbGVhZiBub2RlcyBzaG91bGQgaGF2ZSBkYXRhIChXZSBhcmUgYSBcIkNvbnRhaW5lciBub2RlXCIpXG4gICAgLy8gSWYgaXQgZGlkbid0IGludGVyc2VjdCB3aXRoIGFueSBjaGlsZCwgaXQgd29uJ3QgaW50ZXJzZWN0IHdpdGggdXNcblxuICAgIHJldHVybiB3YXNBZGRlZFRvQ2hpbGQ7XG4gIH0gLy8gTGV0J3MgZ2V0IHRoZSBkYXRhIGFscmVhZHkgYXNzb2NpYXRlZCB3aXRoIHRoaXMgYnVja2V0XG5cblxuICB2YXIgb2JqZWN0UG9pbnRLZXkgPSBjcmVhdGVQb2ludEtleShvYmplY3RCb3VuZCk7XG4gIHZhciBvYmplY3RQb2ludFNldCA9IHF1YWRUcmVlLmRhdGEuZ2V0KG9iamVjdFBvaW50S2V5KSB8fCBuZXcgU2V0KCk7IC8vIExldCdzIGNoZWNrIGlmIHRoZSBvYmplY3QgaXMgYWxyZWFkeSBpbiB0aGUgYnVja2V0XG5cbiAgaWYgKG9iamVjdFBvaW50U2V0LmhhcyhvYmplY3QpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9IC8vIExldCdzIHNlZSBpZiB0aGlzIHF1YWRyYW50IGhhcyBhbnkgY2FwYWNpdHlcbiAgLy8gSWYgaXQgZG9lcywgd2UgY2FuIGdvIGFoZWFkIGFuZCBzdG9yZSB0aGUgY3VycmVudCBvYmplY3RcbiAgLy9cbiAgLy8gV2UgYWxzbyB3YW5uYSBnbyBhaGVhZCBhbmQgYWRkLCBpZiB0aGlzIHBvaW50ICh4LCB5KSBoYXMgYWxyZWFkeVxuICAvLyBoYWQgYW4gb2JqZWN0IGFkZGVkLCB3ZSdsbCBjaGFpbiBpdCBvbiB0byB0aGUgbGlzdCBvZiBvYmplY3RzIFxuICAvLyBhc3NvY2lhdGVkIHdpdGggdGhpcyBwb2ludFxuXG5cbiAgaWYgKG9iamVjdFBvaW50U2V0LnNpemUgPiAwIHx8IHF1YWRUcmVlLmRhdGEuc2l6ZSArIDEgPD0gcXVhZFRyZWUuY2FwYWNpdHkpIHtcbiAgICBxdWFkVHJlZS5kYXRhLnNldChvYmplY3RQb2ludEtleSwgbmV3IFNldChbXS5jb25jYXQoX3RvQ29uc3VtYWJsZUFycmF5KG9iamVjdFBvaW50U2V0KSwgW29iamVjdF0pKSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gLy8gVGhlIGN1cnJlbnQgbm9kZSBmaXRzIHRoZSBjdXJyZW50IG9iamVjdCwgYnV0XG4gIC8vIFRoZXJlIGlzbid0IGFueSBjYXBhY2l0eVxuICAvLyBXZSBuZWVkIHRvIHNwbGl0IHRoaXMgYnVja2V0IHVwXG4gIC8vIExldCdzIGZpcnN0IGJ1aWxkIHRoZSBjaGlsZCBxdWFkcmFudHNcbiAgLy8gTGV0J3MgY3JlYXRlIHRoZSBjaGlsZCBRdWFkVHJlZSdzIGZyb20gdGhlIGRpdmlkZWQgcXVhZHJhbnQgYm91bmRzXG5cblxuICB2YXIgcXVhZEJveGVzID0gZGl2aWRlQm91bmRpbmdCb3gocXVhZFRyZWUuYm91bmRzKTtcbiAgdmFyIHF1YWRyYW50cyA9IHF1YWRCb3hlcy5tYXAoZnVuY3Rpb24gKHF1YWRCb3gpIHtcbiAgICByZXR1cm4gY3JlYXRlUXVhZFRyZWUocXVhZEJveCwgcXVhZFRyZWUuY2FwYWNpdHkpO1xuICB9KTtcbiAgdmFyIHF1YWRPYmplY3RzID0gW10uY29uY2F0KF90b0NvbnN1bWFibGVBcnJheShmbGF0dGVuU2V0cyhfdG9Db25zdW1hYmxlQXJyYXkocXVhZFRyZWUuZGF0YS52YWx1ZXMoKSkpKSwgW29iamVjdF0pOyAvLyBhZGp1c3QgY3VycmVudCBxdWFkdHJlZSBzZXR0aW5nc1xuICAvLyBNYXkgbmVlZCB0byBhZGp1c3QgdGhlc2UgaW4tcGxhY2UgaW5zdGVhZCBvZiBjcmVhdGluZyBuZXcgcmVmZXJlbmNlc1xuXG4gIGNsZWFyUXVhZFRyZWUocXVhZFRyZWUpO1xuICBxdWFkVHJlZS5xdWFkcmFudHMgPSBxdWFkcmFudHM7IC8vIGFkZCBvYmplY3RzIGZyb20gdGhpcyBxdWFkIG5vZGUgYmFjayB0byBpdCdzIG93biBzdWJ0cmVlXG4gIC8vIGNoaWxkcmVuIHdpbGwgYmUgYXR0ZW1wdGVkIHRvIGJlIGFkZGVkIHRvIGZpcnN0XG5cbiAgcmV0dXJuIHF1YWRPYmplY3RzLmV2ZXJ5KGZ1bmN0aW9uIChxdWFkT2JqZWN0KSB7XG4gICAgcmV0dXJuIGFkZFRvUXVhZFRyZWUocXVhZFRyZWUsIHF1YWRPYmplY3QpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlRnJvbVF1YWRUcmVlKHF1YWRUcmVlLCBvYmplY3QpIHtcbiAgdmFyIG9iamVjdEJvdW5kID0gb2JqZWN0LmdldEJvdW5kcygpO1xuICB2YXIgb2JqZWN0UG9pbnRLZXkgPSBjcmVhdGVQb2ludEtleShvYmplY3RCb3VuZCk7XG4gIHZhciBvYmplY3RQb2ludFNldCA9IHF1YWRUcmVlLmRhdGEuZ2V0KG9iamVjdFBvaW50S2V5KSB8fCBuZXcgU2V0KCk7IC8vIElmIG9iamVjdCBpcyBmb3VuZCwgbGV0J3MgcmVtb3ZlIGl0XG5cbiAgaWYgKG9iamVjdFBvaW50U2V0LmhhcyhvYmplY3QpKSB7XG4gICAgb2JqZWN0UG9pbnRTZXRbXCJkZWxldGVcIl0ob2JqZWN0KTsgLy8gSWYgdGhlcmUgd2VyZSBtdWx0aXBsZSBvYmplY3RzIGF0IHRoaXMgcG9pbnRcbiAgICAvLyB3ZSBkb24ndCBuZWVkIHRvIHJlbW92ZSB0aGlzIHBvaW50IGtleVxuXG4gICAgaWYgKG9iamVjdFBvaW50U2V0LnNpemUgPiAwKSB7XG4gICAgICBxdWFkVHJlZS5kYXRhLnNldChvYmplY3RQb2ludEtleSwgb2JqZWN0UG9pbnRTZXQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBxdWFkVHJlZS5kYXRhW1wiZGVsZXRlXCJdKG9iamVjdFBvaW50S2V5KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSAvLyBDaGVjayBjaGlsZHJlbiB0byBmaW5kIG9iamVjdCBhbmQgcmVtb3ZlIGlmIGZvdW5kXG5cblxuICB2YXIgd2FzUmVtb3ZlZCA9IHF1YWRUcmVlLnF1YWRyYW50cy5zb21lKGZ1bmN0aW9uIChxdWFkcmFudCkge1xuICAgIHJldHVybiByZW1vdmVGcm9tUXVhZFRyZWUocXVhZHJhbnQsIG9iamVjdCk7XG4gIH0pOyAvLyBJZiBvbmUgb2YgdGhlIGNoaWxkcmVuIGNvbnRhaW5lZCB0aGUgb2JqZWN0IHdlIGp1c3QgcmVtb3ZlZFxuICAvLyBMZXQncyBxdWVyeSB0aGUgYm91bmRpbmcgYm94IG9mIHVzICh0aGUgcGFyZW50KSB0byBzZWUgaWYgd2UgXG4gIC8vIGNhbiBjb2xsYXBzZSBvciBjb25zdW1lIG91ciBjaGlsZHJlbi4gTWVhbmluZyB0aGUgY2hpbGQgc3VidHJlZVxuICAvLyBjb250YWlucyBsZXNzIGVsZW1lbnRzIHRoYW4gb3VyIGluZGl2aWR1YWwgYnVja2V0IGNhcGFjaXR5LlxuXG4gIGlmICh3YXNSZW1vdmVkKSB7XG4gICAgdmFyIGNoaWxkT2JqZWN0U2V0ID0gcXVlcnlRdWFkVHJlZShxdWFkVHJlZSwgcXVhZFRyZWUuYm91bmRzKTtcblxuICAgIGlmIChjaGlsZE9iamVjdFNldC5zaXplIDw9IHF1YWRUcmVlLmNhcGFjaXR5KSB7XG4gICAgICBjbGVhclF1YWRUcmVlKHF1YWRUcmVlKTtcbiAgICAgIGNoaWxkT2JqZWN0U2V0LmZvckVhY2goZnVuY3Rpb24gKGNoaWxkT2JqZWN0KSB7XG4gICAgICAgIHJldHVybiBhZGRUb1F1YWRUcmVlKHF1YWRUcmVlLCBjaGlsZE9iamVjdCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gd2FzUmVtb3ZlZDtcbn1cblxuZnVuY3Rpb24gY2xlYXJRdWFkVHJlZShxdWFkVHJlZSkge1xuICBxdWFkVHJlZS5kYXRhID0gbmV3IE1hcCgpO1xuICBxdWFkVHJlZS5xdWFkcmFudHMgPSBbXTtcbn1cblxuZnVuY3Rpb24gcXVlcnlRdWFkVHJlZShxdWFkVHJlZSwgYm91bmRzKSB7XG4gIC8vIENoZWNrIGZpcnN0IGlmIHRoZSBxdWVyeSBib3VuZHMgaW50ZXJzZWN0IHdpdGggdGhlIGJvdW5kc1xuICAvLyBvZiB0aGUgYnVja2V0LCBpZiBpdCBkb2Vzbid0IHdlIGNhbiBiYWlsIGltbWVkaWF0ZWx5IHdpdGggYW4gZW1wdHkgbGlzdFxuICBpZiAoIWRvQm91bmRzSW50ZXJzZWN0KHF1YWRUcmVlLmJvdW5kcywgYm91bmRzKSkge1xuICAgIHJldHVybiBuZXcgU2V0KCk7XG4gIH0gLy8gQ2hlY2sgaWYgY3VycmVudCBub2RlIGhhcyBjaGlsZHJlblxuXG5cbiAgaWYgKChxdWFkVHJlZS5xdWFkcmFudHMgfHwgW10pLmxlbmd0aCA9PT0gMCkge1xuICAgIC8vIExldCdzIGl0ZXJhdGUgb3ZlciB0aGUgZGF0YSBpbiB0aGUgYnVja2V0IHRvIHNlZVxuICAgIC8vIGlmIHRoZSBvYmplY3RzIHRoZW1zZWx2ZXMgaW50ZXJzZWN0IHdpdGggdGhlIHF1ZXJ5IGJvdW5kc1xuICAgIHJldHVybiBuZXcgU2V0KF90b0NvbnN1bWFibGVBcnJheShmbGF0dGVuU2V0cyhfdG9Db25zdW1hYmxlQXJyYXkocXVhZFRyZWUuZGF0YS52YWx1ZXMoKSkpKS5maWx0ZXIoZnVuY3Rpb24gKHF1YWRPYmplY3QpIHtcbiAgICAgIHJldHVybiBkb0JvdW5kc0ludGVyc2VjdChxdWFkT2JqZWN0LmdldEJvdW5kcygpLCBib3VuZHMpO1xuICAgIH0pKTtcbiAgfSAvLyBDaGVjayB0aGUgY3VycmVudCBub2RlcyBjaGlsZHJlblxuICAvLyBxdWVyeWluZyB0aGVtIGZvciB0aGUgc2FtZSBpbmZvIGFuZCBjb2xsZWN0aW5nXG4gIC8vIHRoZSByZXN1bHRzXG5cblxuICB2YXIgY2hpbGRRdWVyeVJlc3VsdFNldCA9IGZsYXR0ZW5TZXRzKHF1YWRUcmVlLnF1YWRyYW50cy5tYXAoZnVuY3Rpb24gKHF1YWRyYW50KSB7XG4gICAgcmV0dXJuIHF1ZXJ5UXVhZFRyZWUocXVhZHJhbnQsIGJvdW5kcyk7XG4gIH0pKTtcbiAgcmV0dXJuIGNoaWxkUXVlcnlSZXN1bHRTZXQ7XG59XG5cbmZ1bmN0aW9uIGdldFF1YWRUcmVlRGF0YShxdWFkVHJlZSkge1xuICByZXR1cm4gX3RvQ29uc3VtYWJsZUFycmF5KGZsYXR0ZW5TZXRzKF90b0NvbnN1bWFibGVBcnJheShxdWFkVHJlZS5kYXRhLnZhbHVlcygpKSkpO1xufVxuLyoqXG4gKiBDcmVhdGVzIGEgcXVhZHRyZWUgXCJtYW5hZ2luZ1wiIHRoZSBpbnB1dCBib3VuZHMgd2l0aCBpbnB1dCBub2RlIGNhcGFjaXR5LlxuICogXG4gKiBBbGwgY29sbGlzaW9uIG9iamVjdHMgc2hvdWxkIGludGVyc2VjdCBvciBiZSBjb250YWluZWQgd2l0aGluIHRoZXNlIFwibWFuYWdlZFwiIGJvdW5kcy5cbiAqIEBwYXJhbSB7Qm91bmRpbmdCb3h9IGJvdW5kcyAtIFRoZSBib3VuZGluZyBib3ggd2l0aCB3aGljaCB0aGUgcXVhZHRyZWUgXCJtYW5hZ2VzXCIuXG4gKiBAcGFyYW0ge251bWJlcn0gW2NhcGFjaXR5PTNdIC0gVGhlICMgb2YgY29sbGlzaW9uIG9iamVjdHMgYSBub2RlIGNhbiBjb250YWluIGJlZm9yZSBzdWJkaXZpZGluZy5cbiAqIEByZXR1cm4ge1F1YWRUcmVlfSBUaGUgY3JlYXRlZCBxdWFkdHJlZSBcIm1hbmFnaW5nXCIgdGhlIGlucHV0IGJvdW5kcy5cbiAqL1xuXG5cbmZ1bmN0aW9uIGNyZWF0ZVF1YWRUcmVlKGJvdW5kcykge1xuICB2YXIgY2FwYWNpdHkgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IDM7XG4gIHZhciBxdWFkVHJlZSA9IHtcbiAgICBib3VuZHM6IGJvdW5kcyxcbiAgICBkYXRhOiBuZXcgTWFwKCksXG4gICAgY2FwYWNpdHk6IGNhcGFjaXR5LFxuICAgIHF1YWRyYW50czogW10sXG4gICAgYWRkOiBmdW5jdGlvbiBhZGQob2JqZWN0KSB7XG4gICAgICByZXR1cm4gYWRkVG9RdWFkVHJlZShxdWFkVHJlZSwgb2JqZWN0KTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKG9iamVjdCkge1xuICAgICAgcmV0dXJuIHJlbW92ZUZyb21RdWFkVHJlZShxdWFkVHJlZSwgb2JqZWN0KTtcbiAgICB9LFxuICAgIGNsZWFyOiBmdW5jdGlvbiBjbGVhcigpIHtcbiAgICAgIHJldHVybiBjbGVhclF1YWRUcmVlKHF1YWRUcmVlKTtcbiAgICB9LFxuICAgIHF1ZXJ5OiBmdW5jdGlvbiBxdWVyeShib3VuZHMpIHtcbiAgICAgIHJldHVybiBxdWVyeVF1YWRUcmVlKHF1YWRUcmVlLCBib3VuZHMpO1xuICAgIH0sXG4gICAgZ2V0RGF0YTogZnVuY3Rpb24gZ2V0RGF0YSgpIHtcbiAgICAgIHJldHVybiBnZXRRdWFkVHJlZURhdGEocXVhZFRyZWUpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHF1YWRUcmVlO1xufVxuXG5leHBvcnQgeyBjcmVhdGVRdWFkVHJlZSB9O1xuIiwiaW1wb3J0IHsgUGl4ZWwsIENvbG9yIH0gZnJvbSAnLi9zY2hlbWEnO1xuXG5leHBvcnQgY29uc3QgUElYRUxfV0lEVEg6IG51bWJlciA9IDQ7XG5leHBvcnQgY29uc3QgV0hJVEVfQ09MT1I6IENvbG9yID0ge1xuICAgIHI6IDI1NSxcbiAgICBnOiAyNTUsXG4gICAgYjogMjU1LFxuICAgIGE6IDI1NSxcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2FkSW1hZ2UoaW1hZ2VGaWxlOiBGaWxlKTogUHJvbWlzZTxIVE1MSW1hZ2VFbGVtZW50PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgY29uc3QgaW1hZ2VGaWxlRGF0YVVybCA9IHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKGltYWdlRmlsZSk7XG4gICAgICAgIGNvbnN0IGltYWdlID0gbmV3IEltYWdlKCk7XG5cbiAgICAgICAgaW1hZ2Uub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgd2luZG93LlVSTC5yZXZva2VPYmplY3RVUkwoaW1hZ2VGaWxlRGF0YVVybCk7XG4gICAgICAgICAgICByZXNvbHZlKGltYWdlKVxuICAgICAgICB9O1xuICAgICAgICBpbWFnZS5vbmVycm9yID0gKGVycikgPT4ge1xuICAgICAgICAgICAgd2luZG93LlVSTC5yZXZva2VPYmplY3RVUkwoaW1hZ2VGaWxlRGF0YVVybCk7XG4gICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfTtcbiAgICAgICAgaW1hZ2Uuc3JjID0gaW1hZ2VGaWxlRGF0YVVybDtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEF2ZXJhZ2VDb2xvcihwaXhlbHM6IFBpeGVsW10pOiBDb2xvciB7XG4gICAgbGV0IHNxdWFyZWRTdW1SOiBudW1iZXI7XG4gICAgbGV0IHNxdWFyZWRTdW1HOiBudW1iZXI7XG4gICAgbGV0IHNxdWFyZWRTdW1COiBudW1iZXI7XG4gICAgbGV0IHNxdWFyZWRTdW1BOiBudW1iZXI7XG4gICAgbGV0IGF2ZXJhZ2VDb2xvcjogQ29sb3IgPSBwaXhlbHNbMF0gfHwgV0hJVEVfQ09MT1I7XG5cbiAgICBpZiAocGl4ZWxzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgcmV0dXJuIHBpeGVscy5zbGljZSgxKVxuICAgICAgICAgICAgLnJlZHVjZSgocHJldkF2ZXJhZ2U6IENvbG9yLCBjdXJyUGl4ZWw6IFBpeGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgc3F1YXJlZFN1bVIgPSBNYXRoLnBvdyhwcmV2QXZlcmFnZS5yLCAyKSArIE1hdGgucG93KGN1cnJQaXhlbC5yLCAyKTtcbiAgICAgICAgICAgICAgICBzcXVhcmVkU3VtRyA9IE1hdGgucG93KHByZXZBdmVyYWdlLmcsIDIpICsgTWF0aC5wb3coY3VyclBpeGVsLmcsIDIpO1xuICAgICAgICAgICAgICAgIHNxdWFyZWRTdW1CID0gTWF0aC5wb3cocHJldkF2ZXJhZ2UuYiwgMikgKyBNYXRoLnBvdyhjdXJyUGl4ZWwuYiwgMik7XG4gICAgICAgICAgICAgICAgc3F1YXJlZFN1bUEgPSBNYXRoLnBvdyhwcmV2QXZlcmFnZS5hLCAyKSArIE1hdGgucG93KGN1cnJQaXhlbC5hLCAyKTtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICByOiBNYXRoLnNxcnQoc3F1YXJlZFN1bVIgLyAyKSxcbiAgICAgICAgICAgICAgICAgICAgZzogTWF0aC5zcXJ0KHNxdWFyZWRTdW1HIC8gMiksXG4gICAgICAgICAgICAgICAgICAgIGI6IE1hdGguc3FydChzcXVhcmVkU3VtQiAvIDIpLFxuICAgICAgICAgICAgICAgICAgICBhOiBNYXRoLnNxcnQoc3F1YXJlZFN1bUEgLyAyKSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSwgYXZlcmFnZUNvbG9yKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXZlcmFnZUNvbG9yO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVQaXhlbCh4OiBudW1iZXIsIHk6IG51bWJlciwgcjogbnVtYmVyLCBnOiBudW1iZXIsIGI6IG51bWJlciwgYTogbnVtYmVyKTogUGl4ZWwge1xuICAgIHJldHVybiB7XG4gICAgICAgIHgsXG4gICAgICAgIHksXG4gICAgICAgIHIsXG4gICAgICAgIGcsXG4gICAgICAgIGIsXG4gICAgICAgIGEsXG4gICAgICAgIGdldEJvdW5kcygpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgeDogdGhpcy54LFxuICAgICAgICAgICAgICAgIHk6IHRoaXMueSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQaXhlbHMoaW1hZ2VEYXRhOiBJbWFnZURhdGEpOiBQaXhlbFtdIHtcbiAgICBsZXQgcGl4ZWxzOiBQaXhlbFtdID0gW107XG4gICAgcHJvY2Vzc0ltYWdlRGF0YShpbWFnZURhdGEsIHBpeGVsID0+IHBpeGVscy5wdXNoKHBpeGVsKSk7XG4gICAgcmV0dXJuIHBpeGVscztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbGxQaXhlbEluSW1hZ2VEYXRhKGltYWdlRGF0YTogSW1hZ2VEYXRhLCBwaXhlbDogUGl4ZWwpOiB2b2lkIHtcbiAgICBjb25zdCBwaXhlbE9mZnNldDogbnVtYmVyID0gKHBpeGVsLnggKyBwaXhlbC55ICogaW1hZ2VEYXRhLndpZHRoKSAqIFBJWEVMX1dJRFRIO1xuICAgIGlmIChwaXhlbE9mZnNldCA8IDAgfHwgcGl4ZWxPZmZzZXQgKyBQSVhFTF9XSURUSCA+PSBpbWFnZURhdGEuZGF0YS5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpbWFnZURhdGEuZGF0YVtwaXhlbE9mZnNldF0gPSBwaXhlbC5yO1xuICAgIGltYWdlRGF0YS5kYXRhW3BpeGVsT2Zmc2V0ICsgMV0gPSBwaXhlbC5nO1xuICAgIGltYWdlRGF0YS5kYXRhW3BpeGVsT2Zmc2V0ICsgMl0gPSBwaXhlbC5iO1xuICAgIGltYWdlRGF0YS5kYXRhW3BpeGVsT2Zmc2V0ICsgM10gPSBwaXhlbC5hO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SW1hZ2VEYXRhT2ZmU2NyZWVuKGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50LCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcik6IEltYWdlRGF0YSB7XG4gICAgY29uc3QgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgIGNvbnN0IGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpIGFzIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcblxuICAgIGNhbnZhcy53aWR0aCA9IHdpZHRoO1xuICAgIGNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XG5cbiAgICBjb250ZXh0LmRyYXdJbWFnZShpbWFnZSwgMCwgMCwgaW1hZ2Uud2lkdGgsIGltYWdlLmhlaWdodCwgMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcblxuICAgIGNvbnN0IGltYWdlRGF0YTogSW1hZ2VEYXRhID0gY29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgICByZXR1cm4gaW1hZ2VEYXRhO1xufVxuXG5mdW5jdGlvbiBwcm9jZXNzSW1hZ2VEYXRhKGltYWdlRGF0YTogSW1hZ2VEYXRhLCBwcm9jZXNzRnVuYzogKHBpeGVsOiBQaXhlbCkgPT4gdm9pZCwgaW5pdFBpeGVsWDogbnVtYmVyID0gMCwgaW5pdFBpeGVsWTogbnVtYmVyID0gMCk6IHZvaWQge1xuICAgIGxldCByOiBudW1iZXI7XG4gICAgbGV0IGc6IG51bWJlcjtcbiAgICBsZXQgYjogbnVtYmVyO1xuICAgIGxldCBhOiBudW1iZXI7XG4gICAgbGV0IG9mZnNldFg6IG51bWJlcjtcbiAgICBsZXQgb2Zmc2V0WTogbnVtYmVyO1xuICAgIGxldCBwaXhlbDogUGl4ZWw7XG5cbiAgICBmb3IgKGxldCB4ID0gaW5pdFBpeGVsWDsgeCA8IGltYWdlRGF0YS53aWR0aDsgeCsrKSB7XG4gICAgICAgIG9mZnNldFggPSB4ICogUElYRUxfV0lEVEg7XG5cbiAgICAgICAgZm9yIChsZXQgeSA9IGluaXRQaXhlbFk7IHkgPCBpbWFnZURhdGEuaGVpZ2h0OyB5KyspIHtcbiAgICAgICAgICAgIG9mZnNldFkgPSBpbWFnZURhdGEud2lkdGggKiB5ICogUElYRUxfV0lEVEg7XG5cbiAgICAgICAgICAgIHIgPSBpbWFnZURhdGEuZGF0YVtvZmZzZXRYICsgb2Zmc2V0WV07XG4gICAgICAgICAgICBnID0gaW1hZ2VEYXRhLmRhdGFbb2Zmc2V0WCArIG9mZnNldFkgKyAxXTtcbiAgICAgICAgICAgIGIgPSBpbWFnZURhdGEuZGF0YVtvZmZzZXRYICsgb2Zmc2V0WSArIDJdO1xuICAgICAgICAgICAgYSA9IGltYWdlRGF0YS5kYXRhW29mZnNldFggKyBvZmZzZXRZICsgM107XG5cbiAgICAgICAgICAgIHBpeGVsID0gY3JlYXRlUGl4ZWwoeCwgeSwgciwgZywgYiwgYSk7XG4gICAgICAgICAgICBwcm9jZXNzRnVuYyhwaXhlbCk7XG4gICAgICAgIH1cbiAgICB9XG59Il0sInNvdXJjZVJvb3QiOiIifQ==