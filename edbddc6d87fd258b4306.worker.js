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

/***/ "./node_modules/gif.js/dist/gif.js":
/*!*****************************************!*\
  !*** ./node_modules/gif.js/dist/gif.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var require;var require;// gif.js 0.2.0 - https://github.com/jnordberg/gif.js
(function(f){if(true){module.exports=f()}else { var g; }})(function(){var define,module,exports;return function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return require(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}({1:[function(require,module,exports){function EventEmitter(){this._events=this._events||{};this._maxListeners=this._maxListeners||undefined}module.exports=EventEmitter;EventEmitter.EventEmitter=EventEmitter;EventEmitter.prototype._events=undefined;EventEmitter.prototype._maxListeners=undefined;EventEmitter.defaultMaxListeners=10;EventEmitter.prototype.setMaxListeners=function(n){if(!isNumber(n)||n<0||isNaN(n))throw TypeError("n must be a positive number");this._maxListeners=n;return this};EventEmitter.prototype.emit=function(type){var er,handler,len,args,i,listeners;if(!this._events)this._events={};if(type==="error"){if(!this._events.error||isObject(this._events.error)&&!this._events.error.length){er=arguments[1];if(er instanceof Error){throw er}else{var err=new Error('Uncaught, unspecified "error" event. ('+er+")");err.context=er;throw err}}}handler=this._events[type];if(isUndefined(handler))return false;if(isFunction(handler)){switch(arguments.length){case 1:handler.call(this);break;case 2:handler.call(this,arguments[1]);break;case 3:handler.call(this,arguments[1],arguments[2]);break;default:args=Array.prototype.slice.call(arguments,1);handler.apply(this,args)}}else if(isObject(handler)){args=Array.prototype.slice.call(arguments,1);listeners=handler.slice();len=listeners.length;for(i=0;i<len;i++)listeners[i].apply(this,args)}return true};EventEmitter.prototype.addListener=function(type,listener){var m;if(!isFunction(listener))throw TypeError("listener must be a function");if(!this._events)this._events={};if(this._events.newListener)this.emit("newListener",type,isFunction(listener.listener)?listener.listener:listener);if(!this._events[type])this._events[type]=listener;else if(isObject(this._events[type]))this._events[type].push(listener);else this._events[type]=[this._events[type],listener];if(isObject(this._events[type])&&!this._events[type].warned){if(!isUndefined(this._maxListeners)){m=this._maxListeners}else{m=EventEmitter.defaultMaxListeners}if(m&&m>0&&this._events[type].length>m){this._events[type].warned=true;console.error("(node) warning: possible EventEmitter memory "+"leak detected. %d listeners added. "+"Use emitter.setMaxListeners() to increase limit.",this._events[type].length);if(typeof console.trace==="function"){console.trace()}}}return this};EventEmitter.prototype.on=EventEmitter.prototype.addListener;EventEmitter.prototype.once=function(type,listener){if(!isFunction(listener))throw TypeError("listener must be a function");var fired=false;function g(){this.removeListener(type,g);if(!fired){fired=true;listener.apply(this,arguments)}}g.listener=listener;this.on(type,g);return this};EventEmitter.prototype.removeListener=function(type,listener){var list,position,length,i;if(!isFunction(listener))throw TypeError("listener must be a function");if(!this._events||!this._events[type])return this;list=this._events[type];length=list.length;position=-1;if(list===listener||isFunction(list.listener)&&list.listener===listener){delete this._events[type];if(this._events.removeListener)this.emit("removeListener",type,listener)}else if(isObject(list)){for(i=length;i-- >0;){if(list[i]===listener||list[i].listener&&list[i].listener===listener){position=i;break}}if(position<0)return this;if(list.length===1){list.length=0;delete this._events[type]}else{list.splice(position,1)}if(this._events.removeListener)this.emit("removeListener",type,listener)}return this};EventEmitter.prototype.removeAllListeners=function(type){var key,listeners;if(!this._events)return this;if(!this._events.removeListener){if(arguments.length===0)this._events={};else if(this._events[type])delete this._events[type];return this}if(arguments.length===0){for(key in this._events){if(key==="removeListener")continue;this.removeAllListeners(key)}this.removeAllListeners("removeListener");this._events={};return this}listeners=this._events[type];if(isFunction(listeners)){this.removeListener(type,listeners)}else if(listeners){while(listeners.length)this.removeListener(type,listeners[listeners.length-1])}delete this._events[type];return this};EventEmitter.prototype.listeners=function(type){var ret;if(!this._events||!this._events[type])ret=[];else if(isFunction(this._events[type]))ret=[this._events[type]];else ret=this._events[type].slice();return ret};EventEmitter.prototype.listenerCount=function(type){if(this._events){var evlistener=this._events[type];if(isFunction(evlistener))return 1;else if(evlistener)return evlistener.length}return 0};EventEmitter.listenerCount=function(emitter,type){return emitter.listenerCount(type)};function isFunction(arg){return typeof arg==="function"}function isNumber(arg){return typeof arg==="number"}function isObject(arg){return typeof arg==="object"&&arg!==null}function isUndefined(arg){return arg===void 0}},{}],2:[function(require,module,exports){var UA,browser,mode,platform,ua;ua=navigator.userAgent.toLowerCase();platform=navigator.platform.toLowerCase();UA=ua.match(/(opera|ie|firefox|chrome|version)[\s\/:]([\w\d\.]+)?.*?(safari|version[\s\/:]([\w\d\.]+)|$)/)||[null,"unknown",0];mode=UA[1]==="ie"&&document.documentMode;browser={name:UA[1]==="version"?UA[3]:UA[1],version:mode||parseFloat(UA[1]==="opera"&&UA[4]?UA[4]:UA[2]),platform:{name:ua.match(/ip(?:ad|od|hone)/)?"ios":(ua.match(/(?:webos|android)/)||platform.match(/mac|win|linux/)||["other"])[0]}};browser[browser.name]=true;browser[browser.name+parseInt(browser.version,10)]=true;browser.platform[browser.platform.name]=true;module.exports=browser},{}],3:[function(require,module,exports){var EventEmitter,GIF,browser,extend=function(child,parent){for(var key in parent){if(hasProp.call(parent,key))child[key]=parent[key]}function ctor(){this.constructor=child}ctor.prototype=parent.prototype;child.prototype=new ctor;child.__super__=parent.prototype;return child},hasProp={}.hasOwnProperty,indexOf=[].indexOf||function(item){for(var i=0,l=this.length;i<l;i++){if(i in this&&this[i]===item)return i}return-1},slice=[].slice;EventEmitter=require("events").EventEmitter;browser=require("./browser.coffee");GIF=function(superClass){var defaults,frameDefaults;extend(GIF,superClass);defaults={workerScript:"gif.worker.js",workers:2,repeat:0,background:"#fff",quality:10,width:null,height:null,transparent:null,debug:false,dither:false};frameDefaults={delay:500,copy:false};function GIF(options){var base,key,value;this.running=false;this.options={};this.frames=[];this.freeWorkers=[];this.activeWorkers=[];this.setOptions(options);for(key in defaults){value=defaults[key];if((base=this.options)[key]==null){base[key]=value}}}GIF.prototype.setOption=function(key,value){this.options[key]=value;if(this._canvas!=null&&(key==="width"||key==="height")){return this._canvas[key]=value}};GIF.prototype.setOptions=function(options){var key,results,value;results=[];for(key in options){if(!hasProp.call(options,key))continue;value=options[key];results.push(this.setOption(key,value))}return results};GIF.prototype.addFrame=function(image,options){var frame,key;if(options==null){options={}}frame={};frame.transparent=this.options.transparent;for(key in frameDefaults){frame[key]=options[key]||frameDefaults[key]}if(this.options.width==null){this.setOption("width",image.width)}if(this.options.height==null){this.setOption("height",image.height)}if(typeof ImageData!=="undefined"&&ImageData!==null&&image instanceof ImageData){frame.data=image.data}else if(typeof CanvasRenderingContext2D!=="undefined"&&CanvasRenderingContext2D!==null&&image instanceof CanvasRenderingContext2D||typeof WebGLRenderingContext!=="undefined"&&WebGLRenderingContext!==null&&image instanceof WebGLRenderingContext){if(options.copy){frame.data=this.getContextData(image)}else{frame.context=image}}else if(image.childNodes!=null){if(options.copy){frame.data=this.getImageData(image)}else{frame.image=image}}else{throw new Error("Invalid image")}return this.frames.push(frame)};GIF.prototype.render=function(){var i,j,numWorkers,ref;if(this.running){throw new Error("Already running")}if(this.options.width==null||this.options.height==null){throw new Error("Width and height must be set prior to rendering")}this.running=true;this.nextFrame=0;this.finishedFrames=0;this.imageParts=function(){var j,ref,results;results=[];for(i=j=0,ref=this.frames.length;0<=ref?j<ref:j>ref;i=0<=ref?++j:--j){results.push(null)}return results}.call(this);numWorkers=this.spawnWorkers();if(this.options.globalPalette===true){this.renderNextFrame()}else{for(i=j=0,ref=numWorkers;0<=ref?j<ref:j>ref;i=0<=ref?++j:--j){this.renderNextFrame()}}this.emit("start");return this.emit("progress",0)};GIF.prototype.abort=function(){var worker;while(true){worker=this.activeWorkers.shift();if(worker==null){break}this.log("killing active worker");worker.terminate()}this.running=false;return this.emit("abort")};GIF.prototype.spawnWorkers=function(){var j,numWorkers,ref,results;numWorkers=Math.min(this.options.workers,this.frames.length);(function(){results=[];for(var j=ref=this.freeWorkers.length;ref<=numWorkers?j<numWorkers:j>numWorkers;ref<=numWorkers?j++:j--){results.push(j)}return results}).apply(this).forEach(function(_this){return function(i){var worker;_this.log("spawning worker "+i);worker=new Worker(_this.options.workerScript);worker.onmessage=function(event){_this.activeWorkers.splice(_this.activeWorkers.indexOf(worker),1);_this.freeWorkers.push(worker);return _this.frameFinished(event.data)};return _this.freeWorkers.push(worker)}}(this));return numWorkers};GIF.prototype.frameFinished=function(frame){var i,j,ref;this.log("frame "+frame.index+" finished - "+this.activeWorkers.length+" active");this.finishedFrames++;this.emit("progress",this.finishedFrames/this.frames.length);this.imageParts[frame.index]=frame;if(this.options.globalPalette===true){this.options.globalPalette=frame.globalPalette;this.log("global palette analyzed");if(this.frames.length>2){for(i=j=1,ref=this.freeWorkers.length;1<=ref?j<ref:j>ref;i=1<=ref?++j:--j){this.renderNextFrame()}}}if(indexOf.call(this.imageParts,null)>=0){return this.renderNextFrame()}else{return this.finishRendering()}};GIF.prototype.finishRendering=function(){var data,frame,i,image,j,k,l,len,len1,len2,len3,offset,page,ref,ref1,ref2;len=0;ref=this.imageParts;for(j=0,len1=ref.length;j<len1;j++){frame=ref[j];len+=(frame.data.length-1)*frame.pageSize+frame.cursor}len+=frame.pageSize-frame.cursor;this.log("rendering finished - filesize "+Math.round(len/1e3)+"kb");data=new Uint8Array(len);offset=0;ref1=this.imageParts;for(k=0,len2=ref1.length;k<len2;k++){frame=ref1[k];ref2=frame.data;for(i=l=0,len3=ref2.length;l<len3;i=++l){page=ref2[i];data.set(page,offset);if(i===frame.data.length-1){offset+=frame.cursor}else{offset+=frame.pageSize}}}image=new Blob([data],{type:"image/gif"});return this.emit("finished",image,data)};GIF.prototype.renderNextFrame=function(){var frame,task,worker;if(this.freeWorkers.length===0){throw new Error("No free workers")}if(this.nextFrame>=this.frames.length){return}frame=this.frames[this.nextFrame++];worker=this.freeWorkers.shift();task=this.getTask(frame);this.log("starting frame "+(task.index+1)+" of "+this.frames.length);this.activeWorkers.push(worker);return worker.postMessage(task)};GIF.prototype.getContextData=function(ctx){return ctx.getImageData(0,0,this.options.width,this.options.height).data};GIF.prototype.getImageData=function(image){var ctx;if(this._canvas==null){this._canvas=document.createElement("canvas");this._canvas.width=this.options.width;this._canvas.height=this.options.height}ctx=this._canvas.getContext("2d");ctx.setFill=this.options.background;ctx.fillRect(0,0,this.options.width,this.options.height);ctx.drawImage(image,0,0);return this.getContextData(ctx)};GIF.prototype.getTask=function(frame){var index,task;index=this.frames.indexOf(frame);task={index:index,last:index===this.frames.length-1,delay:frame.delay,transparent:frame.transparent,width:this.options.width,height:this.options.height,quality:this.options.quality,dither:this.options.dither,globalPalette:this.options.globalPalette,repeat:this.options.repeat,canTransfer:browser.name==="chrome"};if(frame.data!=null){task.data=frame.data}else if(frame.context!=null){task.data=this.getContextData(frame.context)}else if(frame.image!=null){task.data=this.getImageData(frame.image)}else{throw new Error("Invalid frame")}return task};GIF.prototype.log=function(){var args;args=1<=arguments.length?slice.call(arguments,0):[];if(!this.options.debug){return}return console.log.apply(console,args)};return GIF}(EventEmitter);module.exports=GIF},{"./browser.coffee":2,events:1}]},{},[3])(3)});
//# sourceMappingURL=gif.js.map


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
function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function getVectorBetweenPoints(point1, point2) {
  return {
    x: point2.x - point1.x,
    y: point2.y - point1.y
  };
}

function getPoints(boundingBox) {
  var maxX = boundingBox.x + boundingBox.width;
  var maxY = boundingBox.y + boundingBox.height;
  var topLeftPoint = {
    x: boundingBox.x,
    y: boundingBox.y
  };
  var topRightPoint = {
    x: maxX,
    y: boundingBox.y
  };
  var bottomRightPoint = {
    x: maxX,
    y: maxY
  };
  var bottomLeftPoint = {
    x: boundingBox.x,
    y: maxY
  };
  return [topLeftPoint, topRightPoint, bottomRightPoint, bottomLeftPoint];
}

function getSideVectors(boundingBox) {
  var points = getPoints(boundingBox);
  return [getVectorBetweenPoints(points[0], points[1]), getVectorBetweenPoints(points[1], points[2])];
}

function getNormal(vector) {
  return {
    x: -vector.y,
    y: vector.x
  };
} // function normalize(vector: Point): Point {
//     const magnitude: number = getMagnitude(vector);
//     return {
//         x: magnitude > 0 ? vector.x / magnitude : 0,
//         y: magnitude > 0 ? vector.y / magnitude : 0,
//     };
// }


function getDot(vector1, vector2) {
  return vector1.x * vector2.x + vector1.y * vector2.y;
}

function getMagnitude(vector) {
  return Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
}

function closestToPoint(targetPoint, points) {
  var closestPoint = points[0];
  var closestDistance = Number.POSITIVE_INFINITY;
  var currentDistance;
  points.forEach(function (point) {
    currentDistance = getMagnitude(getVectorBetweenPoints(targetPoint, point));

    if (currentDistance < closestDistance) {
      closestDistance = currentDistance;
      closestPoint = point;
    }
  });
  return closestPoint;
}

function doIntersectBoundingBoxCircleSAT(box, circle) {
  var sat1 = getSATInfoForBoundingBox(box);
  var sat2 = getSATInfoForCircle(circle);
  var boxPoints = getPoints(box);
  var closestPoint = closestToPoint(circle, boxPoints);
  sat2.axes.push(getVectorBetweenPoints(closestPoint, circle));
  return doIntersectSAT(sat1, sat2);
}
function doIntersectBoundingBoxesSAT(box1, box2) {
  var sat1 = getSATInfoForBoundingBox(box1);
  var sat2 = getSATInfoForBoundingBox(box2);
  return doIntersectSAT(sat1, sat2);
}

function getSATInfoForCircle(circle) {
  return {
    axes: [],
    points: [circle]
  };
}

function getSATInfoForBoundingBox(box) {
  var points = getPoints(box);
  var sides = getSideVectors(box);
  var axes = sides.map(function (side) {
    return getNormal(side);
  });
  return {
    axes: axes,
    points: points
  };
}

function doIntersectSAT(sat1, sat2) {
  var scalarProjection;
  var maxBox1;
  var minBox1;
  var maxBox2;
  var minBox2; // let overlap1: number;
  // let overlap2: number;
  // let minTranslationDistance: number = Number.POSITIVE_INFINITY;
  // let minTranslationVector: Point | null = null;

  var axes = sat1.axes.concat(sat2.axes); // .map(axis => normalize(axis));

  var numAxes = axes.length;

  var _loop = function _loop(axesIndex) {
    maxBox1 = Number.NEGATIVE_INFINITY;
    minBox1 = Number.POSITIVE_INFINITY;
    maxBox2 = Number.NEGATIVE_INFINITY;
    minBox2 = Number.POSITIVE_INFINITY; // project all sides of box1 onto normal (separating axis)
    // We want to record the minimum and maximum scalar projections
    // This will be done for both boxes

    sat1.points.forEach(function (pointIn1) {
      scalarProjection = getDot(pointIn1, axes[axesIndex]);

      if (scalarProjection < minBox1) {
        minBox1 = scalarProjection;
      }

      if (scalarProjection > maxBox1) {
        maxBox1 = scalarProjection;
      }
    });
    sat2.points.forEach(function (pointIn2) {
      scalarProjection = getDot(pointIn2, axes[axesIndex]);

      if (scalarProjection < minBox2) {
        minBox2 = scalarProjection;
      }

      if (scalarProjection > maxBox2) {
        maxBox2 = scalarProjection;
      }
    }); // Must intersect (overlap) on all separating axes
    // Can bail early, or on the first time not overlapping

    if (maxBox1 < minBox2 || maxBox2 < minBox1) {
      return {
        v: false
      };
    } // compute overlap
    // overlap1 = maxBox1 - minBox2;
    // overlap2 = maxBox2 - minBox1;
    // if (overlap1 < minTranslationDistance) {
    //     minTranslationDistance = overlap1;
    //     minTranslationVector = axes[axesIndex];
    // }
    // if (overlap2 < minTranslationDistance) {
    //     minTranslationDistance = overlap2;
    //     minTranslationVector = axes[axesIndex];
    // }

  };

  for (var axesIndex = 0; axesIndex < numAxes; axesIndex++) {
    var _ret = _loop(axesIndex);

    if (_typeof(_ret) === "object") return _ret.v;
  }

  return true;
}

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

function toCircleFromPoint(point) {
  return {
    x: point.x,
    y: point.y,
    r: 0
  };
} // This also handles point to point collisions
// https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection#Circle_Collision


function doIntersectCircles(circle1, circle2) {
  var dx = circle1.x - circle2.x;
  var dy = circle1.y - circle2.y;
  var distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
  return distance <= circle1.r + circle2.r;
}

function doBoundsIntersect(bound1, bound2) {
  var isBound1Circle = isCircle(bound1);
  var isBound2Circle = isCircle(bound2);
  var isBound1BoundingBox = isBoundingBox(bound1);
  var isBound2BoundingBox = isBoundingBox(bound2);
  var isBound1Point = isPoint(bound1);
  var isBound2Point = isPoint(bound2); // They are both circles

  if (isBound1Circle && isBound2Circle) {
    return doIntersectCircles(bound1, bound2);
  } // They are both bounding boxes


  if (isBound1BoundingBox && isBound2BoundingBox) {
    return doIntersectBoundingBoxesSAT(bound1, bound2);
  } // They are both points


  if (isBound1Point && isBound2Point) {
    var _point1Circle = toCircleFromPoint(bound1);

    var point2Circle = toCircleFromPoint(bound2);
    return doIntersectCircles(_point1Circle, point2Circle);
  } // 1 is circle, 2 is bounding box


  if (isBound1Circle && isBound2BoundingBox) {
    return doIntersectBoundingBoxCircleSAT(bound2, bound1);
  } // 1 is bounding box, 2 is circle


  if (isBound1BoundingBox && isBound2Circle) {
    return doIntersectBoundingBoxCircleSAT(bound1, bound2);
  } // 1 is circle, 2 is point


  if (isBound1Circle && isBound2Point) {
    var _point2Circle = toCircleFromPoint(bound2);

    return doIntersectCircles(bound1, _point2Circle);
  } // 1 is point, 2 is 2 is circle


  if (isBound1Point && isBound2Circle) {
    var _point1Circle2 = toCircleFromPoint(bound1);

    return doIntersectCircles(_point1Circle2, bound2);
  } // 1 is bounding box, 2 is point


  if (isBound1BoundingBox && isBound2Point) {
    var _point2Circle2 = toCircleFromPoint(bound2);

    return doIntersectBoundingBoxCircleSAT(bound1, _point2Circle2);
  } // 1 is point, 2 is bounding box


  var point1Circle = toCircleFromPoint(bound1);
  return doIntersectBoundingBoxCircleSAT(bound2, point1Circle);
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
  return sets.reduce(function (flattenedSet, currSet) {
    currSet.forEach(function (setItem) {
      return flattenedSet.add(setItem);
    });
    return flattenedSet;
  }, new Set());
}

function addToQuadTree(quadTree, object) {
  var objectBound = object.getBounds();
  var objectPoint = {
    x: objectBound.x,
    y: objectBound.y
  }; // Let's first check if the point this object occupies is within
  // the bounds of the bucket

  if (!doBoundsIntersect(quadTree.bounds, objectPoint)) {
    return false;
  } // Checking children, if this node is a "Container" (No data)


  if ((quadTree.quadrants || []).length) {
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
    objectPointSet.add(object);
    quadTree.data.set(objectPointKey, objectPointSet);
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
  var quadObjects = getQuadTreeData(quadTree).concat(object); // adjust current quadtree settings
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
    return new Set(getQuadTreeData(quadTree).filter(function (quadObject) {
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
  return Array.from(flattenSets(Array.from(quadTree.data.values())));
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
/*! exports provided: PIXEL_WIDTH, WHITE_COLOR, loadImage, getAverageColor, createPixels, fillPixelInImageData, getImageDataOffScreen, toGif */
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toGif", function() { return toGif; });
/* harmony import */ var gif_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gif.js */ "./node_modules/gif.js/dist/gif.js");
/* harmony import */ var gif_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(gif_js__WEBPACK_IMPORTED_MODULE_0__);

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

function toGif(imageFrames) {
  var gif = new gif_js__WEBPACK_IMPORTED_MODULE_0___default.a({
    workers: 2,
    quality: 10
  });
  imageFrames.forEach(function (imageFrame) {
    return gif.addFrame(imageFrame, {
      delay: 200
    });
  });
  gif.on('finished', function (blob) {
    saveBlob('simplequad.export.gif', blob);
  });
  gif.render();
}

function saveBlob(fileName, blob) {
  var a = document.createElement("a");
  var url = window.URL.createObjectURL(blob);
  a.style.display = "none";
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1YWQud29ya2VyLnRzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9naWYuanMvZGlzdC9naWYuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NpbXBsZXF1YWQvZGlzdC9zaW1wbGVxdWFkLmVzbS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC50cyJdLCJuYW1lcyI6WyJwcm9jZXNzZWRNZXNzYWdlIiwidHlwZSIsImJ1aWxkUXVhZFRyZWVGcm9tUGl4ZWxzIiwiaW1hZ2VEYXRhIiwiYm91bmRzIiwiY2FwYWNpdHkiLCJwaXhlbHMiLCJjcmVhdGVQaXhlbHMiLCJxdWFkVHJlZSIsImNyZWF0ZVF1YWRUcmVlIiwiZm9yRWFjaCIsInBpeGVsIiwiYWRkIiwiZmlsbEltYWdlRGF0YUZyb21RdWFkVHJlZSIsInF1YWRyYW50cyIsImxlbmd0aCIsInF1YWRyYW50IiwiZ2V0RGF0YSIsImF2ZXJhZ2VDb2xvciIsImdldEF2ZXJhZ2VDb2xvciIsImZpbGxQaXhlbEluSW1hZ2VEYXRhIiwicmVxdWVzdERyYXciLCJtZXNzYWdlIiwiZGF0YSIsImNyZWF0ZUltYWdlIiwicG9zdE1lc3NhZ2UiLCJwcm9jZXNzSW1hZ2UiLCJ3aWR0aCIsImhlaWdodCIsIm5ld0ltYWdlRGF0YSIsIkltYWdlRGF0YSIsIngiLCJ5Iiwid29ya2VyIiwic2VsZiIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsImNvbnNvbGUiLCJlcnJvciIsIlBJWEVMX1dJRFRIIiwiV0hJVEVfQ09MT1IiLCJyIiwiZyIsImIiLCJhIiwibG9hZEltYWdlIiwiaW1hZ2VGaWxlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJpbWFnZUZpbGVEYXRhVXJsIiwid2luZG93IiwiVVJMIiwiY3JlYXRlT2JqZWN0VVJMIiwiaW1hZ2UiLCJJbWFnZSIsIm9ubG9hZCIsInJldm9rZU9iamVjdFVSTCIsIm9uZXJyb3IiLCJlcnIiLCJzcmMiLCJzcXVhcmVkU3VtUiIsInNxdWFyZWRTdW1HIiwic3F1YXJlZFN1bUIiLCJzcXVhcmVkU3VtQSIsInNsaWNlIiwicmVkdWNlIiwicHJldkF2ZXJhZ2UiLCJjdXJyUGl4ZWwiLCJNYXRoIiwicG93Iiwic3FydCIsImNyZWF0ZVBpeGVsIiwiZ2V0Qm91bmRzIiwicHJvY2Vzc0ltYWdlRGF0YSIsInB1c2giLCJwaXhlbE9mZnNldCIsImdldEltYWdlRGF0YU9mZlNjcmVlbiIsImNhbnZhcyIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImNvbnRleHQiLCJnZXRDb250ZXh0IiwiZHJhd0ltYWdlIiwiZ2V0SW1hZ2VEYXRhIiwicHJvY2Vzc0Z1bmMiLCJpbml0UGl4ZWxYIiwiaW5pdFBpeGVsWSIsIm9mZnNldFgiLCJvZmZzZXRZIiwidG9HaWYiLCJpbWFnZUZyYW1lcyIsImdpZiIsIkdJRiIsIndvcmtlcnMiLCJxdWFsaXR5IiwiaW1hZ2VGcmFtZSIsImFkZEZyYW1lIiwiZGVsYXkiLCJvbiIsImJsb2IiLCJzYXZlQmxvYiIsInJlbmRlciIsImZpbGVOYW1lIiwidXJsIiwic3R5bGUiLCJkaXNwbGF5IiwiaHJlZiIsImRvd25sb2FkIiwiYm9keSIsImFwcGVuZENoaWxkIiwiY2xpY2siLCJyZW1vdmVDaGlsZCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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Q0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7O0FBRUEseUNBQXlDOztBQUV6Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QztBQUN2QztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLLEVBQUU7QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSx5QkFBeUIscUJBQXFCO0FBQzlDOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDOztBQUV0QztBQUNBO0FBQ0EsR0FBRzs7O0FBR0g7QUFDQTtBQUNBLEdBQUc7OztBQUdIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7OztBQUdIO0FBQ0E7QUFDQSxHQUFHOzs7QUFHSDtBQUNBO0FBQ0EsR0FBRzs7O0FBR0g7QUFDQTs7QUFFQTtBQUNBLEdBQUc7OztBQUdIO0FBQ0E7O0FBRUE7QUFDQSxHQUFHOzs7QUFHSDtBQUNBOztBQUVBO0FBQ0EsR0FBRzs7O0FBR0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQSxHQUFHOzs7QUFHSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSyxFQUFFO0FBQ1A7O0FBRUE7QUFDQSxHQUFHOzs7QUFHSDtBQUNBLHNFQUFzRTs7QUFFdEU7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILDZEQUE2RDtBQUM3RDs7QUFFQTtBQUNBLGlDQUFpQztBQUNqQzs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHNFQUFzRTs7QUFFdEU7QUFDQSxxQ0FBcUM7QUFDckM7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0EsR0FBRzs7O0FBR0g7QUFDQTtBQUNBLEdBQUcsRUFBRTtBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTs7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QUFDQSxNQUFNd0IsR0FBRyxHQUFHckQsTUFBTSxDQUFDQyxHQUFQLENBQVdDLGVBQVgsQ0FBMkIrQyxJQUEzQixDQUFaO0FBRUF4RCxHQUFDLENBQUM2RCxLQUFGLENBQVFDLE9BQVIsR0FBa0IsTUFBbEI7QUFDQTlELEdBQUMsQ0FBQytELElBQUYsR0FBU0gsR0FBVDtBQUNBNUQsR0FBQyxDQUFDZ0UsUUFBRixHQUFhTCxRQUFiO0FBRUF4QixVQUFRLENBQUM4QixJQUFULENBQWNDLFdBQWQsQ0FBMEJsRSxDQUExQjtBQUNBQSxHQUFDLENBQUNtRSxLQUFGO0FBRUFoQyxVQUFRLENBQUM4QixJQUFULENBQWNHLFdBQWQsQ0FBMEJwRSxDQUExQjtBQUNBTyxRQUFNLENBQUNDLEdBQVAsQ0FBV0ssZUFBWCxDQUEyQitDLEdBQTNCO0FBQ0gsQyIsImZpbGUiOiJlZGJkZGM2ZDg3ZmQyNThiNDMwNi53b3JrZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4vc3JjL3F1YWQud29ya2VyLnRzXCIpO1xuIiwiaW1wb3J0IHsgUXVhZFdvcmtlckRhdGFNZXNzYWdlLCBQaXhlbCwgQ29sb3IsIFF1YWRXb3JrZXJNZXNzYWdlIH0gZnJvbSAnLi9zY2hlbWEnO1xuaW1wb3J0IHsgUXVhZFRyZWUsIGNyZWF0ZVF1YWRUcmVlLCBCb3VuZGluZ0JveCB9IGZyb20gJ3NpbXBsZXF1YWQnO1xuaW1wb3J0IHsgY3JlYXRlUGl4ZWxzLCBnZXRBdmVyYWdlQ29sb3IsIGZpbGxQaXhlbEluSW1hZ2VEYXRhIH0gZnJvbSAnLi91dGlsJztcblxuY29uc3QgcHJvY2Vzc2VkTWVzc2FnZTogUXVhZFdvcmtlck1lc3NhZ2UgPSB7XG4gICAgdHlwZTogJ3Byb2Nlc3NlZCcsXG59O1xuXG5mdW5jdGlvbiBidWlsZFF1YWRUcmVlRnJvbVBpeGVscyhpbWFnZURhdGE6IEltYWdlRGF0YSwgYm91bmRzOiBCb3VuZGluZ0JveCwgY2FwYWNpdHk6IG51bWJlcik6IFF1YWRUcmVlPFBpeGVsPiB7XG4gICAgY29uc3QgcGl4ZWxzOiBQaXhlbFtdID0gY3JlYXRlUGl4ZWxzKGltYWdlRGF0YSk7XG4gICAgY29uc3QgcXVhZFRyZWU6IFF1YWRUcmVlPFBpeGVsPiA9IGNyZWF0ZVF1YWRUcmVlKGJvdW5kcywgY2FwYWNpdHkpO1xuXG4gICAgLy8gQnVpbGQgcXVhZHRyZWUgd2l0aCB0aGlzIGNhcGFjaXR5IGZyb20gcGl4ZWxzXG4gICAgcGl4ZWxzLmZvckVhY2gocGl4ZWwgPT4gcXVhZFRyZWUuYWRkKHBpeGVsKSk7XG5cbiAgICByZXR1cm4gcXVhZFRyZWU7XG59XG5cbmZ1bmN0aW9uIGZpbGxJbWFnZURhdGFGcm9tUXVhZFRyZWUoaW1hZ2VEYXRhOiBJbWFnZURhdGEsIHF1YWRUcmVlOiBRdWFkVHJlZTxQaXhlbD4pOiBJbWFnZURhdGEgeyAgICBcbiAgICBpZiAocXVhZFRyZWUucXVhZHJhbnRzLmxlbmd0aCkge1xuICAgICAgICBxdWFkVHJlZS5xdWFkcmFudHNcbiAgICAgICAgICAgIC5mb3JFYWNoKHF1YWRyYW50ID0+XG4gICAgICAgICAgICAgICAgZmlsbEltYWdlRGF0YUZyb21RdWFkVHJlZShpbWFnZURhdGEsIHF1YWRyYW50KSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgcGl4ZWxzOiBQaXhlbFtdID0gcXVhZFRyZWUuZ2V0RGF0YSgpO1xuICAgICAgICBjb25zdCBhdmVyYWdlQ29sb3I6IENvbG9yID0gZ2V0QXZlcmFnZUNvbG9yKHBpeGVscyk7XG4gICAgICAgIHBpeGVscy5mb3JFYWNoKHBpeGVsID0+IGZpbGxQaXhlbEluSW1hZ2VEYXRhKGltYWdlRGF0YSwge1xuICAgICAgICAgICAgLi4ucGl4ZWwsXG4gICAgICAgICAgICAuLi5hdmVyYWdlQ29sb3IsXG4gICAgICAgIH0pKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaW1hZ2VEYXRhO1xufVxuXG5mdW5jdGlvbiByZXF1ZXN0RHJhdyhpbWFnZURhdGE6IEltYWdlRGF0YSwgY2FwYWNpdHk6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IG1lc3NhZ2U6IFF1YWRXb3JrZXJEYXRhTWVzc2FnZSA9IHtcbiAgICAgICAgdHlwZTogJ2RyYXcnLFxuICAgICAgICBkYXRhOiBjcmVhdGVJbWFnZShpbWFnZURhdGEsIGNhcGFjaXR5KSxcbiAgICB9O1xuICAgIHBvc3RNZXNzYWdlKG1lc3NhZ2UpO1xufVxuXG5mdW5jdGlvbiBwcm9jZXNzSW1hZ2UoaW1hZ2VEYXRhOiBJbWFnZURhdGEpOiB2b2lkIHtcbiAgICBsZXQgY2FwYWNpdHk6IG51bWJlciA9IGltYWdlRGF0YS53aWR0aCAqIGltYWdlRGF0YS5oZWlnaHQ7XG5cbiAgICB3aGlsZSAoY2FwYWNpdHkgPiAxKSB7XG4gICAgICAgIHJlcXVlc3REcmF3KGltYWdlRGF0YSwgY2FwYWNpdHkpO1xuICAgICAgICBjYXBhY2l0eSAvPSAyO1xuICAgIH1cblxuICAgIHJlcXVlc3REcmF3KGltYWdlRGF0YSwgMSk7XG4gICAgcG9zdE1lc3NhZ2UocHJvY2Vzc2VkTWVzc2FnZSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUltYWdlKGltYWdlRGF0YTogSW1hZ2VEYXRhLCBjYXBhY2l0eTogbnVtYmVyKTogSW1hZ2VEYXRhIHtcbiAgICBjb25zdCBuZXdJbWFnZURhdGE6IEltYWdlRGF0YSA9IG5ldyBJbWFnZURhdGEoaW1hZ2VEYXRhLndpZHRoLCBpbWFnZURhdGEuaGVpZ2h0KTtcbiAgICBjb25zdCBxdWFkVHJlZTogUXVhZFRyZWU8UGl4ZWw+ID0gYnVpbGRRdWFkVHJlZUZyb21QaXhlbHMoaW1hZ2VEYXRhLCB7XG4gICAgICAgIHg6IDAsXG4gICAgICAgIHk6IDAsXG4gICAgICAgIHdpZHRoOiBpbWFnZURhdGEud2lkdGgsXG4gICAgICAgIGhlaWdodDogaW1hZ2VEYXRhLmhlaWdodCxcbiAgICB9LCBjYXBhY2l0eSk7XG4gICAgZmlsbEltYWdlRGF0YUZyb21RdWFkVHJlZShuZXdJbWFnZURhdGEsIHF1YWRUcmVlKTtcbiAgICByZXR1cm4gbmV3SW1hZ2VEYXRhO1xufVxuXG4vLyBTZXR0aW5nIHVwIHRoZSB3b3JrZXJcbmNvbnN0IHdvcmtlcjogV29ya2VyID0gc2VsZiBhcyBhbnk7XG53b3JrZXIuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIChldmVudCkgPT4ge1xuICAgIGNvbnN0IG1lc3NhZ2U6IFF1YWRXb3JrZXJEYXRhTWVzc2FnZSA9IGV2ZW50LmRhdGE7XG4gICAgY29uc3QgaW1hZ2VEYXRhOiBJbWFnZURhdGEgPSBtZXNzYWdlLmRhdGE7XG5cbiAgICBzd2l0Y2ggKG1lc3NhZ2UudHlwZSkge1xuICAgICAgICBjYXNlICduZXctaW1hZ2UnOlxuICAgICAgICAgICAgaWYgKGltYWdlRGF0YSkge1xuICAgICAgICAgICAgICAgIHByb2Nlc3NJbWFnZShpbWFnZURhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBVbmtub3duIG1lc3NhZ2UgdHlwZTogJHttZXNzYWdlfWApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgIH1cbn0pOyIsIi8vIGdpZi5qcyAwLjIuMCAtIGh0dHBzOi8vZ2l0aHViLmNvbS9qbm9yZGJlcmcvZ2lmLmpzXG4oZnVuY3Rpb24oZil7aWYodHlwZW9mIGV4cG9ydHM9PT1cIm9iamVjdFwiJiZ0eXBlb2YgbW9kdWxlIT09XCJ1bmRlZmluZWRcIil7bW9kdWxlLmV4cG9ydHM9ZigpfWVsc2UgaWYodHlwZW9mIGRlZmluZT09PVwiZnVuY3Rpb25cIiYmZGVmaW5lLmFtZCl7ZGVmaW5lKFtdLGYpfWVsc2V7dmFyIGc7aWYodHlwZW9mIHdpbmRvdyE9PVwidW5kZWZpbmVkXCIpe2c9d2luZG93fWVsc2UgaWYodHlwZW9mIGdsb2JhbCE9PVwidW5kZWZpbmVkXCIpe2c9Z2xvYmFsfWVsc2UgaWYodHlwZW9mIHNlbGYhPT1cInVuZGVmaW5lZFwiKXtnPXNlbGZ9ZWxzZXtnPXRoaXN9Zy5HSUY9ZigpfX0pKGZ1bmN0aW9uKCl7dmFyIGRlZmluZSxtb2R1bGUsZXhwb3J0cztyZXR1cm4gZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KHsxOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtmdW5jdGlvbiBFdmVudEVtaXR0ZXIoKXt0aGlzLl9ldmVudHM9dGhpcy5fZXZlbnRzfHx7fTt0aGlzLl9tYXhMaXN0ZW5lcnM9dGhpcy5fbWF4TGlzdGVuZXJzfHx1bmRlZmluZWR9bW9kdWxlLmV4cG9ydHM9RXZlbnRFbWl0dGVyO0V2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXI9RXZlbnRFbWl0dGVyO0V2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50cz11bmRlZmluZWQ7RXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fbWF4TGlzdGVuZXJzPXVuZGVmaW5lZDtFdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycz0xMDtFdmVudEVtaXR0ZXIucHJvdG90eXBlLnNldE1heExpc3RlbmVycz1mdW5jdGlvbihuKXtpZighaXNOdW1iZXIobil8fG48MHx8aXNOYU4obikpdGhyb3cgVHlwZUVycm9yKFwibiBtdXN0IGJlIGEgcG9zaXRpdmUgbnVtYmVyXCIpO3RoaXMuX21heExpc3RlbmVycz1uO3JldHVybiB0aGlzfTtFdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQ9ZnVuY3Rpb24odHlwZSl7dmFyIGVyLGhhbmRsZXIsbGVuLGFyZ3MsaSxsaXN0ZW5lcnM7aWYoIXRoaXMuX2V2ZW50cyl0aGlzLl9ldmVudHM9e307aWYodHlwZT09PVwiZXJyb3JcIil7aWYoIXRoaXMuX2V2ZW50cy5lcnJvcnx8aXNPYmplY3QodGhpcy5fZXZlbnRzLmVycm9yKSYmIXRoaXMuX2V2ZW50cy5lcnJvci5sZW5ndGgpe2VyPWFyZ3VtZW50c1sxXTtpZihlciBpbnN0YW5jZW9mIEVycm9yKXt0aHJvdyBlcn1lbHNle3ZhciBlcnI9bmV3IEVycm9yKCdVbmNhdWdodCwgdW5zcGVjaWZpZWQgXCJlcnJvclwiIGV2ZW50LiAoJytlcitcIilcIik7ZXJyLmNvbnRleHQ9ZXI7dGhyb3cgZXJyfX19aGFuZGxlcj10aGlzLl9ldmVudHNbdHlwZV07aWYoaXNVbmRlZmluZWQoaGFuZGxlcikpcmV0dXJuIGZhbHNlO2lmKGlzRnVuY3Rpb24oaGFuZGxlcikpe3N3aXRjaChhcmd1bWVudHMubGVuZ3RoKXtjYXNlIDE6aGFuZGxlci5jYWxsKHRoaXMpO2JyZWFrO2Nhc2UgMjpoYW5kbGVyLmNhbGwodGhpcyxhcmd1bWVudHNbMV0pO2JyZWFrO2Nhc2UgMzpoYW5kbGVyLmNhbGwodGhpcyxhcmd1bWVudHNbMV0sYXJndW1lbnRzWzJdKTticmVhaztkZWZhdWx0OmFyZ3M9QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLDEpO2hhbmRsZXIuYXBwbHkodGhpcyxhcmdzKX19ZWxzZSBpZihpc09iamVjdChoYW5kbGVyKSl7YXJncz1BcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsMSk7bGlzdGVuZXJzPWhhbmRsZXIuc2xpY2UoKTtsZW49bGlzdGVuZXJzLmxlbmd0aDtmb3IoaT0wO2k8bGVuO2krKylsaXN0ZW5lcnNbaV0uYXBwbHkodGhpcyxhcmdzKX1yZXR1cm4gdHJ1ZX07RXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lcj1mdW5jdGlvbih0eXBlLGxpc3RlbmVyKXt2YXIgbTtpZighaXNGdW5jdGlvbihsaXN0ZW5lcikpdGhyb3cgVHlwZUVycm9yKFwibGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uXCIpO2lmKCF0aGlzLl9ldmVudHMpdGhpcy5fZXZlbnRzPXt9O2lmKHRoaXMuX2V2ZW50cy5uZXdMaXN0ZW5lcil0aGlzLmVtaXQoXCJuZXdMaXN0ZW5lclwiLHR5cGUsaXNGdW5jdGlvbihsaXN0ZW5lci5saXN0ZW5lcik/bGlzdGVuZXIubGlzdGVuZXI6bGlzdGVuZXIpO2lmKCF0aGlzLl9ldmVudHNbdHlwZV0pdGhpcy5fZXZlbnRzW3R5cGVdPWxpc3RlbmVyO2Vsc2UgaWYoaXNPYmplY3QodGhpcy5fZXZlbnRzW3R5cGVdKSl0aGlzLl9ldmVudHNbdHlwZV0ucHVzaChsaXN0ZW5lcik7ZWxzZSB0aGlzLl9ldmVudHNbdHlwZV09W3RoaXMuX2V2ZW50c1t0eXBlXSxsaXN0ZW5lcl07aWYoaXNPYmplY3QodGhpcy5fZXZlbnRzW3R5cGVdKSYmIXRoaXMuX2V2ZW50c1t0eXBlXS53YXJuZWQpe2lmKCFpc1VuZGVmaW5lZCh0aGlzLl9tYXhMaXN0ZW5lcnMpKXttPXRoaXMuX21heExpc3RlbmVyc31lbHNle209RXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnN9aWYobSYmbT4wJiZ0aGlzLl9ldmVudHNbdHlwZV0ubGVuZ3RoPm0pe3RoaXMuX2V2ZW50c1t0eXBlXS53YXJuZWQ9dHJ1ZTtjb25zb2xlLmVycm9yKFwiKG5vZGUpIHdhcm5pbmc6IHBvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgXCIrXCJsZWFrIGRldGVjdGVkLiAlZCBsaXN0ZW5lcnMgYWRkZWQuIFwiK1wiVXNlIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKCkgdG8gaW5jcmVhc2UgbGltaXQuXCIsdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCk7aWYodHlwZW9mIGNvbnNvbGUudHJhY2U9PT1cImZ1bmN0aW9uXCIpe2NvbnNvbGUudHJhY2UoKX19fXJldHVybiB0aGlzfTtFdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uPUV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXI7RXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlPWZ1bmN0aW9uKHR5cGUsbGlzdGVuZXIpe2lmKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSl0aHJvdyBUeXBlRXJyb3IoXCJsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb25cIik7dmFyIGZpcmVkPWZhbHNlO2Z1bmN0aW9uIGcoKXt0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsZyk7aWYoIWZpcmVkKXtmaXJlZD10cnVlO2xpc3RlbmVyLmFwcGx5KHRoaXMsYXJndW1lbnRzKX19Zy5saXN0ZW5lcj1saXN0ZW5lcjt0aGlzLm9uKHR5cGUsZyk7cmV0dXJuIHRoaXN9O0V2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXI9ZnVuY3Rpb24odHlwZSxsaXN0ZW5lcil7dmFyIGxpc3QscG9zaXRpb24sbGVuZ3RoLGk7aWYoIWlzRnVuY3Rpb24obGlzdGVuZXIpKXRocm93IFR5cGVFcnJvcihcImxpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvblwiKTtpZighdGhpcy5fZXZlbnRzfHwhdGhpcy5fZXZlbnRzW3R5cGVdKXJldHVybiB0aGlzO2xpc3Q9dGhpcy5fZXZlbnRzW3R5cGVdO2xlbmd0aD1saXN0Lmxlbmd0aDtwb3NpdGlvbj0tMTtpZihsaXN0PT09bGlzdGVuZXJ8fGlzRnVuY3Rpb24obGlzdC5saXN0ZW5lcikmJmxpc3QubGlzdGVuZXI9PT1saXN0ZW5lcil7ZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtpZih0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpdGhpcy5lbWl0KFwicmVtb3ZlTGlzdGVuZXJcIix0eXBlLGxpc3RlbmVyKX1lbHNlIGlmKGlzT2JqZWN0KGxpc3QpKXtmb3IoaT1sZW5ndGg7aS0tID4wOyl7aWYobGlzdFtpXT09PWxpc3RlbmVyfHxsaXN0W2ldLmxpc3RlbmVyJiZsaXN0W2ldLmxpc3RlbmVyPT09bGlzdGVuZXIpe3Bvc2l0aW9uPWk7YnJlYWt9fWlmKHBvc2l0aW9uPDApcmV0dXJuIHRoaXM7aWYobGlzdC5sZW5ndGg9PT0xKXtsaXN0Lmxlbmd0aD0wO2RlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV19ZWxzZXtsaXN0LnNwbGljZShwb3NpdGlvbiwxKX1pZih0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpdGhpcy5lbWl0KFwicmVtb3ZlTGlzdGVuZXJcIix0eXBlLGxpc3RlbmVyKX1yZXR1cm4gdGhpc307RXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnM9ZnVuY3Rpb24odHlwZSl7dmFyIGtleSxsaXN0ZW5lcnM7aWYoIXRoaXMuX2V2ZW50cylyZXR1cm4gdGhpcztpZighdGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKXtpZihhcmd1bWVudHMubGVuZ3RoPT09MCl0aGlzLl9ldmVudHM9e307ZWxzZSBpZih0aGlzLl9ldmVudHNbdHlwZV0pZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtyZXR1cm4gdGhpc31pZihhcmd1bWVudHMubGVuZ3RoPT09MCl7Zm9yKGtleSBpbiB0aGlzLl9ldmVudHMpe2lmKGtleT09PVwicmVtb3ZlTGlzdGVuZXJcIiljb250aW51ZTt0aGlzLnJlbW92ZUFsbExpc3RlbmVycyhrZXkpfXRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKFwicmVtb3ZlTGlzdGVuZXJcIik7dGhpcy5fZXZlbnRzPXt9O3JldHVybiB0aGlzfWxpc3RlbmVycz10aGlzLl9ldmVudHNbdHlwZV07aWYoaXNGdW5jdGlvbihsaXN0ZW5lcnMpKXt0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsbGlzdGVuZXJzKX1lbHNlIGlmKGxpc3RlbmVycyl7d2hpbGUobGlzdGVuZXJzLmxlbmd0aCl0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsbGlzdGVuZXJzW2xpc3RlbmVycy5sZW5ndGgtMV0pfWRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07cmV0dXJuIHRoaXN9O0V2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzPWZ1bmN0aW9uKHR5cGUpe3ZhciByZXQ7aWYoIXRoaXMuX2V2ZW50c3x8IXRoaXMuX2V2ZW50c1t0eXBlXSlyZXQ9W107ZWxzZSBpZihpc0Z1bmN0aW9uKHRoaXMuX2V2ZW50c1t0eXBlXSkpcmV0PVt0aGlzLl9ldmVudHNbdHlwZV1dO2Vsc2UgcmV0PXRoaXMuX2V2ZW50c1t0eXBlXS5zbGljZSgpO3JldHVybiByZXR9O0V2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJDb3VudD1mdW5jdGlvbih0eXBlKXtpZih0aGlzLl9ldmVudHMpe3ZhciBldmxpc3RlbmVyPXRoaXMuX2V2ZW50c1t0eXBlXTtpZihpc0Z1bmN0aW9uKGV2bGlzdGVuZXIpKXJldHVybiAxO2Vsc2UgaWYoZXZsaXN0ZW5lcilyZXR1cm4gZXZsaXN0ZW5lci5sZW5ndGh9cmV0dXJuIDB9O0V2ZW50RW1pdHRlci5saXN0ZW5lckNvdW50PWZ1bmN0aW9uKGVtaXR0ZXIsdHlwZSl7cmV0dXJuIGVtaXR0ZXIubGlzdGVuZXJDb3VudCh0eXBlKX07ZnVuY3Rpb24gaXNGdW5jdGlvbihhcmcpe3JldHVybiB0eXBlb2YgYXJnPT09XCJmdW5jdGlvblwifWZ1bmN0aW9uIGlzTnVtYmVyKGFyZyl7cmV0dXJuIHR5cGVvZiBhcmc9PT1cIm51bWJlclwifWZ1bmN0aW9uIGlzT2JqZWN0KGFyZyl7cmV0dXJuIHR5cGVvZiBhcmc9PT1cIm9iamVjdFwiJiZhcmchPT1udWxsfWZ1bmN0aW9uIGlzVW5kZWZpbmVkKGFyZyl7cmV0dXJuIGFyZz09PXZvaWQgMH19LHt9XSwyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXt2YXIgVUEsYnJvd3Nlcixtb2RlLHBsYXRmb3JtLHVhO3VhPW5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKTtwbGF0Zm9ybT1uYXZpZ2F0b3IucGxhdGZvcm0udG9Mb3dlckNhc2UoKTtVQT11YS5tYXRjaCgvKG9wZXJhfGllfGZpcmVmb3h8Y2hyb21lfHZlcnNpb24pW1xcc1xcLzpdKFtcXHdcXGRcXC5dKyk/Lio/KHNhZmFyaXx2ZXJzaW9uW1xcc1xcLzpdKFtcXHdcXGRcXC5dKyl8JCkvKXx8W251bGwsXCJ1bmtub3duXCIsMF07bW9kZT1VQVsxXT09PVwiaWVcIiYmZG9jdW1lbnQuZG9jdW1lbnRNb2RlO2Jyb3dzZXI9e25hbWU6VUFbMV09PT1cInZlcnNpb25cIj9VQVszXTpVQVsxXSx2ZXJzaW9uOm1vZGV8fHBhcnNlRmxvYXQoVUFbMV09PT1cIm9wZXJhXCImJlVBWzRdP1VBWzRdOlVBWzJdKSxwbGF0Zm9ybTp7bmFtZTp1YS5tYXRjaCgvaXAoPzphZHxvZHxob25lKS8pP1wiaW9zXCI6KHVhLm1hdGNoKC8oPzp3ZWJvc3xhbmRyb2lkKS8pfHxwbGF0Zm9ybS5tYXRjaCgvbWFjfHdpbnxsaW51eC8pfHxbXCJvdGhlclwiXSlbMF19fTticm93c2VyW2Jyb3dzZXIubmFtZV09dHJ1ZTticm93c2VyW2Jyb3dzZXIubmFtZStwYXJzZUludChicm93c2VyLnZlcnNpb24sMTApXT10cnVlO2Jyb3dzZXIucGxhdGZvcm1bYnJvd3Nlci5wbGF0Zm9ybS5uYW1lXT10cnVlO21vZHVsZS5leHBvcnRzPWJyb3dzZXJ9LHt9XSwzOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXt2YXIgRXZlbnRFbWl0dGVyLEdJRixicm93c2VyLGV4dGVuZD1mdW5jdGlvbihjaGlsZCxwYXJlbnQpe2Zvcih2YXIga2V5IGluIHBhcmVudCl7aWYoaGFzUHJvcC5jYWxsKHBhcmVudCxrZXkpKWNoaWxkW2tleV09cGFyZW50W2tleV19ZnVuY3Rpb24gY3Rvcigpe3RoaXMuY29uc3RydWN0b3I9Y2hpbGR9Y3Rvci5wcm90b3R5cGU9cGFyZW50LnByb3RvdHlwZTtjaGlsZC5wcm90b3R5cGU9bmV3IGN0b3I7Y2hpbGQuX19zdXBlcl9fPXBhcmVudC5wcm90b3R5cGU7cmV0dXJuIGNoaWxkfSxoYXNQcm9wPXt9Lmhhc093blByb3BlcnR5LGluZGV4T2Y9W10uaW5kZXhPZnx8ZnVuY3Rpb24oaXRlbSl7Zm9yKHZhciBpPTAsbD10aGlzLmxlbmd0aDtpPGw7aSsrKXtpZihpIGluIHRoaXMmJnRoaXNbaV09PT1pdGVtKXJldHVybiBpfXJldHVybi0xfSxzbGljZT1bXS5zbGljZTtFdmVudEVtaXR0ZXI9cmVxdWlyZShcImV2ZW50c1wiKS5FdmVudEVtaXR0ZXI7YnJvd3Nlcj1yZXF1aXJlKFwiLi9icm93c2VyLmNvZmZlZVwiKTtHSUY9ZnVuY3Rpb24oc3VwZXJDbGFzcyl7dmFyIGRlZmF1bHRzLGZyYW1lRGVmYXVsdHM7ZXh0ZW5kKEdJRixzdXBlckNsYXNzKTtkZWZhdWx0cz17d29ya2VyU2NyaXB0OlwiZ2lmLndvcmtlci5qc1wiLHdvcmtlcnM6MixyZXBlYXQ6MCxiYWNrZ3JvdW5kOlwiI2ZmZlwiLHF1YWxpdHk6MTAsd2lkdGg6bnVsbCxoZWlnaHQ6bnVsbCx0cmFuc3BhcmVudDpudWxsLGRlYnVnOmZhbHNlLGRpdGhlcjpmYWxzZX07ZnJhbWVEZWZhdWx0cz17ZGVsYXk6NTAwLGNvcHk6ZmFsc2V9O2Z1bmN0aW9uIEdJRihvcHRpb25zKXt2YXIgYmFzZSxrZXksdmFsdWU7dGhpcy5ydW5uaW5nPWZhbHNlO3RoaXMub3B0aW9ucz17fTt0aGlzLmZyYW1lcz1bXTt0aGlzLmZyZWVXb3JrZXJzPVtdO3RoaXMuYWN0aXZlV29ya2Vycz1bXTt0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7Zm9yKGtleSBpbiBkZWZhdWx0cyl7dmFsdWU9ZGVmYXVsdHNba2V5XTtpZigoYmFzZT10aGlzLm9wdGlvbnMpW2tleV09PW51bGwpe2Jhc2Vba2V5XT12YWx1ZX19fUdJRi5wcm90b3R5cGUuc2V0T3B0aW9uPWZ1bmN0aW9uKGtleSx2YWx1ZSl7dGhpcy5vcHRpb25zW2tleV09dmFsdWU7aWYodGhpcy5fY2FudmFzIT1udWxsJiYoa2V5PT09XCJ3aWR0aFwifHxrZXk9PT1cImhlaWdodFwiKSl7cmV0dXJuIHRoaXMuX2NhbnZhc1trZXldPXZhbHVlfX07R0lGLnByb3RvdHlwZS5zZXRPcHRpb25zPWZ1bmN0aW9uKG9wdGlvbnMpe3ZhciBrZXkscmVzdWx0cyx2YWx1ZTtyZXN1bHRzPVtdO2ZvcihrZXkgaW4gb3B0aW9ucyl7aWYoIWhhc1Byb3AuY2FsbChvcHRpb25zLGtleSkpY29udGludWU7dmFsdWU9b3B0aW9uc1trZXldO3Jlc3VsdHMucHVzaCh0aGlzLnNldE9wdGlvbihrZXksdmFsdWUpKX1yZXR1cm4gcmVzdWx0c307R0lGLnByb3RvdHlwZS5hZGRGcmFtZT1mdW5jdGlvbihpbWFnZSxvcHRpb25zKXt2YXIgZnJhbWUsa2V5O2lmKG9wdGlvbnM9PW51bGwpe29wdGlvbnM9e319ZnJhbWU9e307ZnJhbWUudHJhbnNwYXJlbnQ9dGhpcy5vcHRpb25zLnRyYW5zcGFyZW50O2ZvcihrZXkgaW4gZnJhbWVEZWZhdWx0cyl7ZnJhbWVba2V5XT1vcHRpb25zW2tleV18fGZyYW1lRGVmYXVsdHNba2V5XX1pZih0aGlzLm9wdGlvbnMud2lkdGg9PW51bGwpe3RoaXMuc2V0T3B0aW9uKFwid2lkdGhcIixpbWFnZS53aWR0aCl9aWYodGhpcy5vcHRpb25zLmhlaWdodD09bnVsbCl7dGhpcy5zZXRPcHRpb24oXCJoZWlnaHRcIixpbWFnZS5oZWlnaHQpfWlmKHR5cGVvZiBJbWFnZURhdGEhPT1cInVuZGVmaW5lZFwiJiZJbWFnZURhdGEhPT1udWxsJiZpbWFnZSBpbnN0YW5jZW9mIEltYWdlRGF0YSl7ZnJhbWUuZGF0YT1pbWFnZS5kYXRhfWVsc2UgaWYodHlwZW9mIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCE9PVwidW5kZWZpbmVkXCImJkNhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCE9PW51bGwmJmltYWdlIGluc3RhbmNlb2YgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEfHx0eXBlb2YgV2ViR0xSZW5kZXJpbmdDb250ZXh0IT09XCJ1bmRlZmluZWRcIiYmV2ViR0xSZW5kZXJpbmdDb250ZXh0IT09bnVsbCYmaW1hZ2UgaW5zdGFuY2VvZiBXZWJHTFJlbmRlcmluZ0NvbnRleHQpe2lmKG9wdGlvbnMuY29weSl7ZnJhbWUuZGF0YT10aGlzLmdldENvbnRleHREYXRhKGltYWdlKX1lbHNle2ZyYW1lLmNvbnRleHQ9aW1hZ2V9fWVsc2UgaWYoaW1hZ2UuY2hpbGROb2RlcyE9bnVsbCl7aWYob3B0aW9ucy5jb3B5KXtmcmFtZS5kYXRhPXRoaXMuZ2V0SW1hZ2VEYXRhKGltYWdlKX1lbHNle2ZyYW1lLmltYWdlPWltYWdlfX1lbHNle3Rocm93IG5ldyBFcnJvcihcIkludmFsaWQgaW1hZ2VcIil9cmV0dXJuIHRoaXMuZnJhbWVzLnB1c2goZnJhbWUpfTtHSUYucHJvdG90eXBlLnJlbmRlcj1mdW5jdGlvbigpe3ZhciBpLGosbnVtV29ya2VycyxyZWY7aWYodGhpcy5ydW5uaW5nKXt0aHJvdyBuZXcgRXJyb3IoXCJBbHJlYWR5IHJ1bm5pbmdcIil9aWYodGhpcy5vcHRpb25zLndpZHRoPT1udWxsfHx0aGlzLm9wdGlvbnMuaGVpZ2h0PT1udWxsKXt0aHJvdyBuZXcgRXJyb3IoXCJXaWR0aCBhbmQgaGVpZ2h0IG11c3QgYmUgc2V0IHByaW9yIHRvIHJlbmRlcmluZ1wiKX10aGlzLnJ1bm5pbmc9dHJ1ZTt0aGlzLm5leHRGcmFtZT0wO3RoaXMuZmluaXNoZWRGcmFtZXM9MDt0aGlzLmltYWdlUGFydHM9ZnVuY3Rpb24oKXt2YXIgaixyZWYscmVzdWx0cztyZXN1bHRzPVtdO2ZvcihpPWo9MCxyZWY9dGhpcy5mcmFtZXMubGVuZ3RoOzA8PXJlZj9qPHJlZjpqPnJlZjtpPTA8PXJlZj8rK2o6LS1qKXtyZXN1bHRzLnB1c2gobnVsbCl9cmV0dXJuIHJlc3VsdHN9LmNhbGwodGhpcyk7bnVtV29ya2Vycz10aGlzLnNwYXduV29ya2VycygpO2lmKHRoaXMub3B0aW9ucy5nbG9iYWxQYWxldHRlPT09dHJ1ZSl7dGhpcy5yZW5kZXJOZXh0RnJhbWUoKX1lbHNle2ZvcihpPWo9MCxyZWY9bnVtV29ya2VyczswPD1yZWY/ajxyZWY6aj5yZWY7aT0wPD1yZWY/KytqOi0tail7dGhpcy5yZW5kZXJOZXh0RnJhbWUoKX19dGhpcy5lbWl0KFwic3RhcnRcIik7cmV0dXJuIHRoaXMuZW1pdChcInByb2dyZXNzXCIsMCl9O0dJRi5wcm90b3R5cGUuYWJvcnQ9ZnVuY3Rpb24oKXt2YXIgd29ya2VyO3doaWxlKHRydWUpe3dvcmtlcj10aGlzLmFjdGl2ZVdvcmtlcnMuc2hpZnQoKTtpZih3b3JrZXI9PW51bGwpe2JyZWFrfXRoaXMubG9nKFwia2lsbGluZyBhY3RpdmUgd29ya2VyXCIpO3dvcmtlci50ZXJtaW5hdGUoKX10aGlzLnJ1bm5pbmc9ZmFsc2U7cmV0dXJuIHRoaXMuZW1pdChcImFib3J0XCIpfTtHSUYucHJvdG90eXBlLnNwYXduV29ya2Vycz1mdW5jdGlvbigpe3ZhciBqLG51bVdvcmtlcnMscmVmLHJlc3VsdHM7bnVtV29ya2Vycz1NYXRoLm1pbih0aGlzLm9wdGlvbnMud29ya2Vycyx0aGlzLmZyYW1lcy5sZW5ndGgpOyhmdW5jdGlvbigpe3Jlc3VsdHM9W107Zm9yKHZhciBqPXJlZj10aGlzLmZyZWVXb3JrZXJzLmxlbmd0aDtyZWY8PW51bVdvcmtlcnM/ajxudW1Xb3JrZXJzOmo+bnVtV29ya2VycztyZWY8PW51bVdvcmtlcnM/aisrOmotLSl7cmVzdWx0cy5wdXNoKGopfXJldHVybiByZXN1bHRzfSkuYXBwbHkodGhpcykuZm9yRWFjaChmdW5jdGlvbihfdGhpcyl7cmV0dXJuIGZ1bmN0aW9uKGkpe3ZhciB3b3JrZXI7X3RoaXMubG9nKFwic3Bhd25pbmcgd29ya2VyIFwiK2kpO3dvcmtlcj1uZXcgV29ya2VyKF90aGlzLm9wdGlvbnMud29ya2VyU2NyaXB0KTt3b3JrZXIub25tZXNzYWdlPWZ1bmN0aW9uKGV2ZW50KXtfdGhpcy5hY3RpdmVXb3JrZXJzLnNwbGljZShfdGhpcy5hY3RpdmVXb3JrZXJzLmluZGV4T2Yod29ya2VyKSwxKTtfdGhpcy5mcmVlV29ya2Vycy5wdXNoKHdvcmtlcik7cmV0dXJuIF90aGlzLmZyYW1lRmluaXNoZWQoZXZlbnQuZGF0YSl9O3JldHVybiBfdGhpcy5mcmVlV29ya2Vycy5wdXNoKHdvcmtlcil9fSh0aGlzKSk7cmV0dXJuIG51bVdvcmtlcnN9O0dJRi5wcm90b3R5cGUuZnJhbWVGaW5pc2hlZD1mdW5jdGlvbihmcmFtZSl7dmFyIGksaixyZWY7dGhpcy5sb2coXCJmcmFtZSBcIitmcmFtZS5pbmRleCtcIiBmaW5pc2hlZCAtIFwiK3RoaXMuYWN0aXZlV29ya2Vycy5sZW5ndGgrXCIgYWN0aXZlXCIpO3RoaXMuZmluaXNoZWRGcmFtZXMrKzt0aGlzLmVtaXQoXCJwcm9ncmVzc1wiLHRoaXMuZmluaXNoZWRGcmFtZXMvdGhpcy5mcmFtZXMubGVuZ3RoKTt0aGlzLmltYWdlUGFydHNbZnJhbWUuaW5kZXhdPWZyYW1lO2lmKHRoaXMub3B0aW9ucy5nbG9iYWxQYWxldHRlPT09dHJ1ZSl7dGhpcy5vcHRpb25zLmdsb2JhbFBhbGV0dGU9ZnJhbWUuZ2xvYmFsUGFsZXR0ZTt0aGlzLmxvZyhcImdsb2JhbCBwYWxldHRlIGFuYWx5emVkXCIpO2lmKHRoaXMuZnJhbWVzLmxlbmd0aD4yKXtmb3IoaT1qPTEscmVmPXRoaXMuZnJlZVdvcmtlcnMubGVuZ3RoOzE8PXJlZj9qPHJlZjpqPnJlZjtpPTE8PXJlZj8rK2o6LS1qKXt0aGlzLnJlbmRlck5leHRGcmFtZSgpfX19aWYoaW5kZXhPZi5jYWxsKHRoaXMuaW1hZ2VQYXJ0cyxudWxsKT49MCl7cmV0dXJuIHRoaXMucmVuZGVyTmV4dEZyYW1lKCl9ZWxzZXtyZXR1cm4gdGhpcy5maW5pc2hSZW5kZXJpbmcoKX19O0dJRi5wcm90b3R5cGUuZmluaXNoUmVuZGVyaW5nPWZ1bmN0aW9uKCl7dmFyIGRhdGEsZnJhbWUsaSxpbWFnZSxqLGssbCxsZW4sbGVuMSxsZW4yLGxlbjMsb2Zmc2V0LHBhZ2UscmVmLHJlZjEscmVmMjtsZW49MDtyZWY9dGhpcy5pbWFnZVBhcnRzO2ZvcihqPTAsbGVuMT1yZWYubGVuZ3RoO2o8bGVuMTtqKyspe2ZyYW1lPXJlZltqXTtsZW4rPShmcmFtZS5kYXRhLmxlbmd0aC0xKSpmcmFtZS5wYWdlU2l6ZStmcmFtZS5jdXJzb3J9bGVuKz1mcmFtZS5wYWdlU2l6ZS1mcmFtZS5jdXJzb3I7dGhpcy5sb2coXCJyZW5kZXJpbmcgZmluaXNoZWQgLSBmaWxlc2l6ZSBcIitNYXRoLnJvdW5kKGxlbi8xZTMpK1wia2JcIik7ZGF0YT1uZXcgVWludDhBcnJheShsZW4pO29mZnNldD0wO3JlZjE9dGhpcy5pbWFnZVBhcnRzO2ZvcihrPTAsbGVuMj1yZWYxLmxlbmd0aDtrPGxlbjI7aysrKXtmcmFtZT1yZWYxW2tdO3JlZjI9ZnJhbWUuZGF0YTtmb3IoaT1sPTAsbGVuMz1yZWYyLmxlbmd0aDtsPGxlbjM7aT0rK2wpe3BhZ2U9cmVmMltpXTtkYXRhLnNldChwYWdlLG9mZnNldCk7aWYoaT09PWZyYW1lLmRhdGEubGVuZ3RoLTEpe29mZnNldCs9ZnJhbWUuY3Vyc29yfWVsc2V7b2Zmc2V0Kz1mcmFtZS5wYWdlU2l6ZX19fWltYWdlPW5ldyBCbG9iKFtkYXRhXSx7dHlwZTpcImltYWdlL2dpZlwifSk7cmV0dXJuIHRoaXMuZW1pdChcImZpbmlzaGVkXCIsaW1hZ2UsZGF0YSl9O0dJRi5wcm90b3R5cGUucmVuZGVyTmV4dEZyYW1lPWZ1bmN0aW9uKCl7dmFyIGZyYW1lLHRhc2ssd29ya2VyO2lmKHRoaXMuZnJlZVdvcmtlcnMubGVuZ3RoPT09MCl7dGhyb3cgbmV3IEVycm9yKFwiTm8gZnJlZSB3b3JrZXJzXCIpfWlmKHRoaXMubmV4dEZyYW1lPj10aGlzLmZyYW1lcy5sZW5ndGgpe3JldHVybn1mcmFtZT10aGlzLmZyYW1lc1t0aGlzLm5leHRGcmFtZSsrXTt3b3JrZXI9dGhpcy5mcmVlV29ya2Vycy5zaGlmdCgpO3Rhc2s9dGhpcy5nZXRUYXNrKGZyYW1lKTt0aGlzLmxvZyhcInN0YXJ0aW5nIGZyYW1lIFwiKyh0YXNrLmluZGV4KzEpK1wiIG9mIFwiK3RoaXMuZnJhbWVzLmxlbmd0aCk7dGhpcy5hY3RpdmVXb3JrZXJzLnB1c2god29ya2VyKTtyZXR1cm4gd29ya2VyLnBvc3RNZXNzYWdlKHRhc2spfTtHSUYucHJvdG90eXBlLmdldENvbnRleHREYXRhPWZ1bmN0aW9uKGN0eCl7cmV0dXJuIGN0eC5nZXRJbWFnZURhdGEoMCwwLHRoaXMub3B0aW9ucy53aWR0aCx0aGlzLm9wdGlvbnMuaGVpZ2h0KS5kYXRhfTtHSUYucHJvdG90eXBlLmdldEltYWdlRGF0YT1mdW5jdGlvbihpbWFnZSl7dmFyIGN0eDtpZih0aGlzLl9jYW52YXM9PW51bGwpe3RoaXMuX2NhbnZhcz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO3RoaXMuX2NhbnZhcy53aWR0aD10aGlzLm9wdGlvbnMud2lkdGg7dGhpcy5fY2FudmFzLmhlaWdodD10aGlzLm9wdGlvbnMuaGVpZ2h0fWN0eD10aGlzLl9jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO2N0eC5zZXRGaWxsPXRoaXMub3B0aW9ucy5iYWNrZ3JvdW5kO2N0eC5maWxsUmVjdCgwLDAsdGhpcy5vcHRpb25zLndpZHRoLHRoaXMub3B0aW9ucy5oZWlnaHQpO2N0eC5kcmF3SW1hZ2UoaW1hZ2UsMCwwKTtyZXR1cm4gdGhpcy5nZXRDb250ZXh0RGF0YShjdHgpfTtHSUYucHJvdG90eXBlLmdldFRhc2s9ZnVuY3Rpb24oZnJhbWUpe3ZhciBpbmRleCx0YXNrO2luZGV4PXRoaXMuZnJhbWVzLmluZGV4T2YoZnJhbWUpO3Rhc2s9e2luZGV4OmluZGV4LGxhc3Q6aW5kZXg9PT10aGlzLmZyYW1lcy5sZW5ndGgtMSxkZWxheTpmcmFtZS5kZWxheSx0cmFuc3BhcmVudDpmcmFtZS50cmFuc3BhcmVudCx3aWR0aDp0aGlzLm9wdGlvbnMud2lkdGgsaGVpZ2h0OnRoaXMub3B0aW9ucy5oZWlnaHQscXVhbGl0eTp0aGlzLm9wdGlvbnMucXVhbGl0eSxkaXRoZXI6dGhpcy5vcHRpb25zLmRpdGhlcixnbG9iYWxQYWxldHRlOnRoaXMub3B0aW9ucy5nbG9iYWxQYWxldHRlLHJlcGVhdDp0aGlzLm9wdGlvbnMucmVwZWF0LGNhblRyYW5zZmVyOmJyb3dzZXIubmFtZT09PVwiY2hyb21lXCJ9O2lmKGZyYW1lLmRhdGEhPW51bGwpe3Rhc2suZGF0YT1mcmFtZS5kYXRhfWVsc2UgaWYoZnJhbWUuY29udGV4dCE9bnVsbCl7dGFzay5kYXRhPXRoaXMuZ2V0Q29udGV4dERhdGEoZnJhbWUuY29udGV4dCl9ZWxzZSBpZihmcmFtZS5pbWFnZSE9bnVsbCl7dGFzay5kYXRhPXRoaXMuZ2V0SW1hZ2VEYXRhKGZyYW1lLmltYWdlKX1lbHNle3Rocm93IG5ldyBFcnJvcihcIkludmFsaWQgZnJhbWVcIil9cmV0dXJuIHRhc2t9O0dJRi5wcm90b3R5cGUubG9nPWZ1bmN0aW9uKCl7dmFyIGFyZ3M7YXJncz0xPD1hcmd1bWVudHMubGVuZ3RoP3NsaWNlLmNhbGwoYXJndW1lbnRzLDApOltdO2lmKCF0aGlzLm9wdGlvbnMuZGVidWcpe3JldHVybn1yZXR1cm4gY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSxhcmdzKX07cmV0dXJuIEdJRn0oRXZlbnRFbWl0dGVyKTttb2R1bGUuZXhwb3J0cz1HSUZ9LHtcIi4vYnJvd3Nlci5jb2ZmZWVcIjoyLGV2ZW50czoxfV19LHt9LFszXSkoMyl9KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWdpZi5qcy5tYXBcbiIsImZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gIGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIikge1xuICAgIF90eXBlb2YgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIG9iajtcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIF90eXBlb2YgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgICByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajtcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIF90eXBlb2Yob2JqKTtcbn1cblxuZnVuY3Rpb24gZ2V0VmVjdG9yQmV0d2VlblBvaW50cyhwb2ludDEsIHBvaW50Mikge1xuICByZXR1cm4ge1xuICAgIHg6IHBvaW50Mi54IC0gcG9pbnQxLngsXG4gICAgeTogcG9pbnQyLnkgLSBwb2ludDEueVxuICB9O1xufVxuXG5mdW5jdGlvbiBnZXRQb2ludHMoYm91bmRpbmdCb3gpIHtcbiAgdmFyIG1heFggPSBib3VuZGluZ0JveC54ICsgYm91bmRpbmdCb3gud2lkdGg7XG4gIHZhciBtYXhZID0gYm91bmRpbmdCb3gueSArIGJvdW5kaW5nQm94LmhlaWdodDtcbiAgdmFyIHRvcExlZnRQb2ludCA9IHtcbiAgICB4OiBib3VuZGluZ0JveC54LFxuICAgIHk6IGJvdW5kaW5nQm94LnlcbiAgfTtcbiAgdmFyIHRvcFJpZ2h0UG9pbnQgPSB7XG4gICAgeDogbWF4WCxcbiAgICB5OiBib3VuZGluZ0JveC55XG4gIH07XG4gIHZhciBib3R0b21SaWdodFBvaW50ID0ge1xuICAgIHg6IG1heFgsXG4gICAgeTogbWF4WVxuICB9O1xuICB2YXIgYm90dG9tTGVmdFBvaW50ID0ge1xuICAgIHg6IGJvdW5kaW5nQm94LngsXG4gICAgeTogbWF4WVxuICB9O1xuICByZXR1cm4gW3RvcExlZnRQb2ludCwgdG9wUmlnaHRQb2ludCwgYm90dG9tUmlnaHRQb2ludCwgYm90dG9tTGVmdFBvaW50XTtcbn1cblxuZnVuY3Rpb24gZ2V0U2lkZVZlY3RvcnMoYm91bmRpbmdCb3gpIHtcbiAgdmFyIHBvaW50cyA9IGdldFBvaW50cyhib3VuZGluZ0JveCk7XG4gIHJldHVybiBbZ2V0VmVjdG9yQmV0d2VlblBvaW50cyhwb2ludHNbMF0sIHBvaW50c1sxXSksIGdldFZlY3RvckJldHdlZW5Qb2ludHMocG9pbnRzWzFdLCBwb2ludHNbMl0pXTtcbn1cblxuZnVuY3Rpb24gZ2V0Tm9ybWFsKHZlY3Rvcikge1xuICByZXR1cm4ge1xuICAgIHg6IC12ZWN0b3IueSxcbiAgICB5OiB2ZWN0b3IueFxuICB9O1xufSAvLyBmdW5jdGlvbiBub3JtYWxpemUodmVjdG9yOiBQb2ludCk6IFBvaW50IHtcbi8vICAgICBjb25zdCBtYWduaXR1ZGU6IG51bWJlciA9IGdldE1hZ25pdHVkZSh2ZWN0b3IpO1xuLy8gICAgIHJldHVybiB7XG4vLyAgICAgICAgIHg6IG1hZ25pdHVkZSA+IDAgPyB2ZWN0b3IueCAvIG1hZ25pdHVkZSA6IDAsXG4vLyAgICAgICAgIHk6IG1hZ25pdHVkZSA+IDAgPyB2ZWN0b3IueSAvIG1hZ25pdHVkZSA6IDAsXG4vLyAgICAgfTtcbi8vIH1cblxuXG5mdW5jdGlvbiBnZXREb3QodmVjdG9yMSwgdmVjdG9yMikge1xuICByZXR1cm4gdmVjdG9yMS54ICogdmVjdG9yMi54ICsgdmVjdG9yMS55ICogdmVjdG9yMi55O1xufVxuXG5mdW5jdGlvbiBnZXRNYWduaXR1ZGUodmVjdG9yKSB7XG4gIHJldHVybiBNYXRoLnNxcnQoTWF0aC5wb3codmVjdG9yLngsIDIpICsgTWF0aC5wb3codmVjdG9yLnksIDIpKTtcbn1cblxuZnVuY3Rpb24gY2xvc2VzdFRvUG9pbnQodGFyZ2V0UG9pbnQsIHBvaW50cykge1xuICB2YXIgY2xvc2VzdFBvaW50ID0gcG9pbnRzWzBdO1xuICB2YXIgY2xvc2VzdERpc3RhbmNlID0gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZO1xuICB2YXIgY3VycmVudERpc3RhbmNlO1xuICBwb2ludHMuZm9yRWFjaChmdW5jdGlvbiAocG9pbnQpIHtcbiAgICBjdXJyZW50RGlzdGFuY2UgPSBnZXRNYWduaXR1ZGUoZ2V0VmVjdG9yQmV0d2VlblBvaW50cyh0YXJnZXRQb2ludCwgcG9pbnQpKTtcblxuICAgIGlmIChjdXJyZW50RGlzdGFuY2UgPCBjbG9zZXN0RGlzdGFuY2UpIHtcbiAgICAgIGNsb3Nlc3REaXN0YW5jZSA9IGN1cnJlbnREaXN0YW5jZTtcbiAgICAgIGNsb3Nlc3RQb2ludCA9IHBvaW50O1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBjbG9zZXN0UG9pbnQ7XG59XG5cbmZ1bmN0aW9uIGRvSW50ZXJzZWN0Qm91bmRpbmdCb3hDaXJjbGVTQVQoYm94LCBjaXJjbGUpIHtcbiAgdmFyIHNhdDEgPSBnZXRTQVRJbmZvRm9yQm91bmRpbmdCb3goYm94KTtcbiAgdmFyIHNhdDIgPSBnZXRTQVRJbmZvRm9yQ2lyY2xlKGNpcmNsZSk7XG4gIHZhciBib3hQb2ludHMgPSBnZXRQb2ludHMoYm94KTtcbiAgdmFyIGNsb3Nlc3RQb2ludCA9IGNsb3Nlc3RUb1BvaW50KGNpcmNsZSwgYm94UG9pbnRzKTtcbiAgc2F0Mi5heGVzLnB1c2goZ2V0VmVjdG9yQmV0d2VlblBvaW50cyhjbG9zZXN0UG9pbnQsIGNpcmNsZSkpO1xuICByZXR1cm4gZG9JbnRlcnNlY3RTQVQoc2F0MSwgc2F0Mik7XG59XG5mdW5jdGlvbiBkb0ludGVyc2VjdEJvdW5kaW5nQm94ZXNTQVQoYm94MSwgYm94Mikge1xuICB2YXIgc2F0MSA9IGdldFNBVEluZm9Gb3JCb3VuZGluZ0JveChib3gxKTtcbiAgdmFyIHNhdDIgPSBnZXRTQVRJbmZvRm9yQm91bmRpbmdCb3goYm94Mik7XG4gIHJldHVybiBkb0ludGVyc2VjdFNBVChzYXQxLCBzYXQyKTtcbn1cblxuZnVuY3Rpb24gZ2V0U0FUSW5mb0ZvckNpcmNsZShjaXJjbGUpIHtcbiAgcmV0dXJuIHtcbiAgICBheGVzOiBbXSxcbiAgICBwb2ludHM6IFtjaXJjbGVdXG4gIH07XG59XG5cbmZ1bmN0aW9uIGdldFNBVEluZm9Gb3JCb3VuZGluZ0JveChib3gpIHtcbiAgdmFyIHBvaW50cyA9IGdldFBvaW50cyhib3gpO1xuICB2YXIgc2lkZXMgPSBnZXRTaWRlVmVjdG9ycyhib3gpO1xuICB2YXIgYXhlcyA9IHNpZGVzLm1hcChmdW5jdGlvbiAoc2lkZSkge1xuICAgIHJldHVybiBnZXROb3JtYWwoc2lkZSk7XG4gIH0pO1xuICByZXR1cm4ge1xuICAgIGF4ZXM6IGF4ZXMsXG4gICAgcG9pbnRzOiBwb2ludHNcbiAgfTtcbn1cblxuZnVuY3Rpb24gZG9JbnRlcnNlY3RTQVQoc2F0MSwgc2F0Mikge1xuICB2YXIgc2NhbGFyUHJvamVjdGlvbjtcbiAgdmFyIG1heEJveDE7XG4gIHZhciBtaW5Cb3gxO1xuICB2YXIgbWF4Qm94MjtcbiAgdmFyIG1pbkJveDI7IC8vIGxldCBvdmVybGFwMTogbnVtYmVyO1xuICAvLyBsZXQgb3ZlcmxhcDI6IG51bWJlcjtcbiAgLy8gbGV0IG1pblRyYW5zbGF0aW9uRGlzdGFuY2U6IG51bWJlciA9IE51bWJlci5QT1NJVElWRV9JTkZJTklUWTtcbiAgLy8gbGV0IG1pblRyYW5zbGF0aW9uVmVjdG9yOiBQb2ludCB8IG51bGwgPSBudWxsO1xuXG4gIHZhciBheGVzID0gc2F0MS5heGVzLmNvbmNhdChzYXQyLmF4ZXMpOyAvLyAubWFwKGF4aXMgPT4gbm9ybWFsaXplKGF4aXMpKTtcblxuICB2YXIgbnVtQXhlcyA9IGF4ZXMubGVuZ3RoO1xuXG4gIHZhciBfbG9vcCA9IGZ1bmN0aW9uIF9sb29wKGF4ZXNJbmRleCkge1xuICAgIG1heEJveDEgPSBOdW1iZXIuTkVHQVRJVkVfSU5GSU5JVFk7XG4gICAgbWluQm94MSA9IE51bWJlci5QT1NJVElWRV9JTkZJTklUWTtcbiAgICBtYXhCb3gyID0gTnVtYmVyLk5FR0FUSVZFX0lORklOSVRZO1xuICAgIG1pbkJveDIgPSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFk7IC8vIHByb2plY3QgYWxsIHNpZGVzIG9mIGJveDEgb250byBub3JtYWwgKHNlcGFyYXRpbmcgYXhpcylcbiAgICAvLyBXZSB3YW50IHRvIHJlY29yZCB0aGUgbWluaW11bSBhbmQgbWF4aW11bSBzY2FsYXIgcHJvamVjdGlvbnNcbiAgICAvLyBUaGlzIHdpbGwgYmUgZG9uZSBmb3IgYm90aCBib3hlc1xuXG4gICAgc2F0MS5wb2ludHMuZm9yRWFjaChmdW5jdGlvbiAocG9pbnRJbjEpIHtcbiAgICAgIHNjYWxhclByb2plY3Rpb24gPSBnZXREb3QocG9pbnRJbjEsIGF4ZXNbYXhlc0luZGV4XSk7XG5cbiAgICAgIGlmIChzY2FsYXJQcm9qZWN0aW9uIDwgbWluQm94MSkge1xuICAgICAgICBtaW5Cb3gxID0gc2NhbGFyUHJvamVjdGlvbjtcbiAgICAgIH1cblxuICAgICAgaWYgKHNjYWxhclByb2plY3Rpb24gPiBtYXhCb3gxKSB7XG4gICAgICAgIG1heEJveDEgPSBzY2FsYXJQcm9qZWN0aW9uO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHNhdDIucG9pbnRzLmZvckVhY2goZnVuY3Rpb24gKHBvaW50SW4yKSB7XG4gICAgICBzY2FsYXJQcm9qZWN0aW9uID0gZ2V0RG90KHBvaW50SW4yLCBheGVzW2F4ZXNJbmRleF0pO1xuXG4gICAgICBpZiAoc2NhbGFyUHJvamVjdGlvbiA8IG1pbkJveDIpIHtcbiAgICAgICAgbWluQm94MiA9IHNjYWxhclByb2plY3Rpb247XG4gICAgICB9XG5cbiAgICAgIGlmIChzY2FsYXJQcm9qZWN0aW9uID4gbWF4Qm94Mikge1xuICAgICAgICBtYXhCb3gyID0gc2NhbGFyUHJvamVjdGlvbjtcbiAgICAgIH1cbiAgICB9KTsgLy8gTXVzdCBpbnRlcnNlY3QgKG92ZXJsYXApIG9uIGFsbCBzZXBhcmF0aW5nIGF4ZXNcbiAgICAvLyBDYW4gYmFpbCBlYXJseSwgb3Igb24gdGhlIGZpcnN0IHRpbWUgbm90IG92ZXJsYXBwaW5nXG5cbiAgICBpZiAobWF4Qm94MSA8IG1pbkJveDIgfHwgbWF4Qm94MiA8IG1pbkJveDEpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHY6IGZhbHNlXG4gICAgICB9O1xuICAgIH0gLy8gY29tcHV0ZSBvdmVybGFwXG4gICAgLy8gb3ZlcmxhcDEgPSBtYXhCb3gxIC0gbWluQm94MjtcbiAgICAvLyBvdmVybGFwMiA9IG1heEJveDIgLSBtaW5Cb3gxO1xuICAgIC8vIGlmIChvdmVybGFwMSA8IG1pblRyYW5zbGF0aW9uRGlzdGFuY2UpIHtcbiAgICAvLyAgICAgbWluVHJhbnNsYXRpb25EaXN0YW5jZSA9IG92ZXJsYXAxO1xuICAgIC8vICAgICBtaW5UcmFuc2xhdGlvblZlY3RvciA9IGF4ZXNbYXhlc0luZGV4XTtcbiAgICAvLyB9XG4gICAgLy8gaWYgKG92ZXJsYXAyIDwgbWluVHJhbnNsYXRpb25EaXN0YW5jZSkge1xuICAgIC8vICAgICBtaW5UcmFuc2xhdGlvbkRpc3RhbmNlID0gb3ZlcmxhcDI7XG4gICAgLy8gICAgIG1pblRyYW5zbGF0aW9uVmVjdG9yID0gYXhlc1theGVzSW5kZXhdO1xuICAgIC8vIH1cblxuICB9O1xuXG4gIGZvciAodmFyIGF4ZXNJbmRleCA9IDA7IGF4ZXNJbmRleCA8IG51bUF4ZXM7IGF4ZXNJbmRleCsrKSB7XG4gICAgdmFyIF9yZXQgPSBfbG9vcChheGVzSW5kZXgpO1xuXG4gICAgaWYgKF90eXBlb2YoX3JldCkgPT09IFwib2JqZWN0XCIpIHJldHVybiBfcmV0LnY7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuLy8gLSBDaXJjbGUgYW5kIENpcmNsZVxuLy8gLSBDaXJjbGUgYW5kIFBvaW50XG4vLyAtIENpcmNsZSBhbmQgQm91bmRpbmdCb3hcbi8vIC0gQm91bmRpbmdCb3ggYW5kIEJvdW5kaW5nQm94XG4vLyAtIEJvdW5kaW5nQm94IGFuZCBQb2ludFxuLy8gLSBQb2ludCBhbmQgUG9pbnRcblxuZnVuY3Rpb24gaXNDaXJjbGUoYm91bmQpIHtcbiAgcmV0dXJuIGJvdW5kLnIgIT09IHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gaXNCb3VuZGluZ0JveChib3VuZCkge1xuICByZXR1cm4gYm91bmQud2lkdGggIT09IHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gaXNQb2ludChib3VuZCkge1xuICByZXR1cm4gIWlzQ2lyY2xlKGJvdW5kKSAmJiAhaXNCb3VuZGluZ0JveChib3VuZCk7XG59XG5cbmZ1bmN0aW9uIHRvQ2lyY2xlRnJvbVBvaW50KHBvaW50KSB7XG4gIHJldHVybiB7XG4gICAgeDogcG9pbnQueCxcbiAgICB5OiBwb2ludC55LFxuICAgIHI6IDBcbiAgfTtcbn0gLy8gVGhpcyBhbHNvIGhhbmRsZXMgcG9pbnQgdG8gcG9pbnQgY29sbGlzaW9uc1xuLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9HYW1lcy9UZWNobmlxdWVzLzJEX2NvbGxpc2lvbl9kZXRlY3Rpb24jQ2lyY2xlX0NvbGxpc2lvblxuXG5cbmZ1bmN0aW9uIGRvSW50ZXJzZWN0Q2lyY2xlcyhjaXJjbGUxLCBjaXJjbGUyKSB7XG4gIHZhciBkeCA9IGNpcmNsZTEueCAtIGNpcmNsZTIueDtcbiAgdmFyIGR5ID0gY2lyY2xlMS55IC0gY2lyY2xlMi55O1xuICB2YXIgZGlzdGFuY2UgPSBNYXRoLnNxcnQoTWF0aC5wb3coZHgsIDIpICsgTWF0aC5wb3coZHksIDIpKTtcbiAgcmV0dXJuIGRpc3RhbmNlIDw9IGNpcmNsZTEuciArIGNpcmNsZTIucjtcbn1cblxuZnVuY3Rpb24gZG9Cb3VuZHNJbnRlcnNlY3QoYm91bmQxLCBib3VuZDIpIHtcbiAgdmFyIGlzQm91bmQxQ2lyY2xlID0gaXNDaXJjbGUoYm91bmQxKTtcbiAgdmFyIGlzQm91bmQyQ2lyY2xlID0gaXNDaXJjbGUoYm91bmQyKTtcbiAgdmFyIGlzQm91bmQxQm91bmRpbmdCb3ggPSBpc0JvdW5kaW5nQm94KGJvdW5kMSk7XG4gIHZhciBpc0JvdW5kMkJvdW5kaW5nQm94ID0gaXNCb3VuZGluZ0JveChib3VuZDIpO1xuICB2YXIgaXNCb3VuZDFQb2ludCA9IGlzUG9pbnQoYm91bmQxKTtcbiAgdmFyIGlzQm91bmQyUG9pbnQgPSBpc1BvaW50KGJvdW5kMik7IC8vIFRoZXkgYXJlIGJvdGggY2lyY2xlc1xuXG4gIGlmIChpc0JvdW5kMUNpcmNsZSAmJiBpc0JvdW5kMkNpcmNsZSkge1xuICAgIHJldHVybiBkb0ludGVyc2VjdENpcmNsZXMoYm91bmQxLCBib3VuZDIpO1xuICB9IC8vIFRoZXkgYXJlIGJvdGggYm91bmRpbmcgYm94ZXNcblxuXG4gIGlmIChpc0JvdW5kMUJvdW5kaW5nQm94ICYmIGlzQm91bmQyQm91bmRpbmdCb3gpIHtcbiAgICByZXR1cm4gZG9JbnRlcnNlY3RCb3VuZGluZ0JveGVzU0FUKGJvdW5kMSwgYm91bmQyKTtcbiAgfSAvLyBUaGV5IGFyZSBib3RoIHBvaW50c1xuXG5cbiAgaWYgKGlzQm91bmQxUG9pbnQgJiYgaXNCb3VuZDJQb2ludCkge1xuICAgIHZhciBfcG9pbnQxQ2lyY2xlID0gdG9DaXJjbGVGcm9tUG9pbnQoYm91bmQxKTtcblxuICAgIHZhciBwb2ludDJDaXJjbGUgPSB0b0NpcmNsZUZyb21Qb2ludChib3VuZDIpO1xuICAgIHJldHVybiBkb0ludGVyc2VjdENpcmNsZXMoX3BvaW50MUNpcmNsZSwgcG9pbnQyQ2lyY2xlKTtcbiAgfSAvLyAxIGlzIGNpcmNsZSwgMiBpcyBib3VuZGluZyBib3hcblxuXG4gIGlmIChpc0JvdW5kMUNpcmNsZSAmJiBpc0JvdW5kMkJvdW5kaW5nQm94KSB7XG4gICAgcmV0dXJuIGRvSW50ZXJzZWN0Qm91bmRpbmdCb3hDaXJjbGVTQVQoYm91bmQyLCBib3VuZDEpO1xuICB9IC8vIDEgaXMgYm91bmRpbmcgYm94LCAyIGlzIGNpcmNsZVxuXG5cbiAgaWYgKGlzQm91bmQxQm91bmRpbmdCb3ggJiYgaXNCb3VuZDJDaXJjbGUpIHtcbiAgICByZXR1cm4gZG9JbnRlcnNlY3RCb3VuZGluZ0JveENpcmNsZVNBVChib3VuZDEsIGJvdW5kMik7XG4gIH0gLy8gMSBpcyBjaXJjbGUsIDIgaXMgcG9pbnRcblxuXG4gIGlmIChpc0JvdW5kMUNpcmNsZSAmJiBpc0JvdW5kMlBvaW50KSB7XG4gICAgdmFyIF9wb2ludDJDaXJjbGUgPSB0b0NpcmNsZUZyb21Qb2ludChib3VuZDIpO1xuXG4gICAgcmV0dXJuIGRvSW50ZXJzZWN0Q2lyY2xlcyhib3VuZDEsIF9wb2ludDJDaXJjbGUpO1xuICB9IC8vIDEgaXMgcG9pbnQsIDIgaXMgMiBpcyBjaXJjbGVcblxuXG4gIGlmIChpc0JvdW5kMVBvaW50ICYmIGlzQm91bmQyQ2lyY2xlKSB7XG4gICAgdmFyIF9wb2ludDFDaXJjbGUyID0gdG9DaXJjbGVGcm9tUG9pbnQoYm91bmQxKTtcblxuICAgIHJldHVybiBkb0ludGVyc2VjdENpcmNsZXMoX3BvaW50MUNpcmNsZTIsIGJvdW5kMik7XG4gIH0gLy8gMSBpcyBib3VuZGluZyBib3gsIDIgaXMgcG9pbnRcblxuXG4gIGlmIChpc0JvdW5kMUJvdW5kaW5nQm94ICYmIGlzQm91bmQyUG9pbnQpIHtcbiAgICB2YXIgX3BvaW50MkNpcmNsZTIgPSB0b0NpcmNsZUZyb21Qb2ludChib3VuZDIpO1xuXG4gICAgcmV0dXJuIGRvSW50ZXJzZWN0Qm91bmRpbmdCb3hDaXJjbGVTQVQoYm91bmQxLCBfcG9pbnQyQ2lyY2xlMik7XG4gIH0gLy8gMSBpcyBwb2ludCwgMiBpcyBib3VuZGluZyBib3hcblxuXG4gIHZhciBwb2ludDFDaXJjbGUgPSB0b0NpcmNsZUZyb21Qb2ludChib3VuZDEpO1xuICByZXR1cm4gZG9JbnRlcnNlY3RCb3VuZGluZ0JveENpcmNsZVNBVChib3VuZDIsIHBvaW50MUNpcmNsZSk7XG59XG5mdW5jdGlvbiBkaXZpZGVCb3VuZGluZ0JveChib3VuZHMpIHtcbiAgdmFyIHF1YWRXaWR0aCA9IGJvdW5kcy53aWR0aCAvIDI7XG4gIHZhciBxdWFkSGVpZ2h0ID0gYm91bmRzLmhlaWdodCAvIDI7XG4gIHZhciBvZmZzZXRYID0gYm91bmRzLnggKyBxdWFkV2lkdGg7XG4gIHZhciBvZmZzZXRZID0gYm91bmRzLnkgKyBxdWFkSGVpZ2h0O1xuICB2YXIgbndCb3VuZGluZ0JveCA9IHtcbiAgICB4OiBib3VuZHMueCxcbiAgICB5OiBib3VuZHMueSxcbiAgICB3aWR0aDogcXVhZFdpZHRoLFxuICAgIGhlaWdodDogcXVhZEhlaWdodFxuICB9O1xuICB2YXIgbmVCb3VuZGluZ0JveCA9IHtcbiAgICB4OiBvZmZzZXRYLFxuICAgIHk6IGJvdW5kcy55LFxuICAgIHdpZHRoOiBxdWFkV2lkdGgsXG4gICAgaGVpZ2h0OiBxdWFkSGVpZ2h0XG4gIH07XG4gIHZhciBzd0JvdW5kaW5nQm94ID0ge1xuICAgIHg6IGJvdW5kcy54LFxuICAgIHk6IG9mZnNldFksXG4gICAgd2lkdGg6IHF1YWRXaWR0aCxcbiAgICBoZWlnaHQ6IHF1YWRIZWlnaHRcbiAgfTtcbiAgdmFyIHNlQm91bmRpbmdCb3ggPSB7XG4gICAgeDogb2Zmc2V0WCxcbiAgICB5OiBvZmZzZXRZLFxuICAgIHdpZHRoOiBxdWFkV2lkdGgsXG4gICAgaGVpZ2h0OiBxdWFkSGVpZ2h0XG4gIH07XG4gIHJldHVybiBbbndCb3VuZGluZ0JveCwgbmVCb3VuZGluZ0JveCwgc3dCb3VuZGluZ0JveCwgc2VCb3VuZGluZ0JveF07XG59XG5mdW5jdGlvbiBjcmVhdGVQb2ludEtleShwb2ludCkge1xuICByZXR1cm4gXCIoXCIuY29uY2F0KHBvaW50LngsIFwiLFwiKS5jb25jYXQocG9pbnQueSwgXCIpXCIpO1xufVxuZnVuY3Rpb24gZmxhdHRlblNldHMoc2V0cykge1xuICByZXR1cm4gc2V0cy5yZWR1Y2UoZnVuY3Rpb24gKGZsYXR0ZW5lZFNldCwgY3VyclNldCkge1xuICAgIGN1cnJTZXQuZm9yRWFjaChmdW5jdGlvbiAoc2V0SXRlbSkge1xuICAgICAgcmV0dXJuIGZsYXR0ZW5lZFNldC5hZGQoc2V0SXRlbSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGZsYXR0ZW5lZFNldDtcbiAgfSwgbmV3IFNldCgpKTtcbn1cblxuZnVuY3Rpb24gYWRkVG9RdWFkVHJlZShxdWFkVHJlZSwgb2JqZWN0KSB7XG4gIHZhciBvYmplY3RCb3VuZCA9IG9iamVjdC5nZXRCb3VuZHMoKTtcbiAgdmFyIG9iamVjdFBvaW50ID0ge1xuICAgIHg6IG9iamVjdEJvdW5kLngsXG4gICAgeTogb2JqZWN0Qm91bmQueVxuICB9OyAvLyBMZXQncyBmaXJzdCBjaGVjayBpZiB0aGUgcG9pbnQgdGhpcyBvYmplY3Qgb2NjdXBpZXMgaXMgd2l0aGluXG4gIC8vIHRoZSBib3VuZHMgb2YgdGhlIGJ1Y2tldFxuXG4gIGlmICghZG9Cb3VuZHNJbnRlcnNlY3QocXVhZFRyZWUuYm91bmRzLCBvYmplY3RQb2ludCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0gLy8gQ2hlY2tpbmcgY2hpbGRyZW4sIGlmIHRoaXMgbm9kZSBpcyBhIFwiQ29udGFpbmVyXCIgKE5vIGRhdGEpXG5cblxuICBpZiAoKHF1YWRUcmVlLnF1YWRyYW50cyB8fCBbXSkubGVuZ3RoKSB7XG4gICAgLy8gUnVuIHRocm91Z2ggYWxsIGNoaWxkcmVuIGNoZWNraW5nIGlmIHRoZSBvYmplY3QgY2FuIGJlIGFkZGVkXG4gICAgLy8gQXQgdGhlIGZpcnN0IHN1Y2Nlc3NmdWwgYWRkLCB3ZSBjYW4gYmFpbCBvdXQsIG9ubHkgbmVlZHMgdG8gYmUgc3RvcmVkIG9uY2VcbiAgICB2YXIgd2FzQWRkZWRUb0NoaWxkID0gcXVhZFRyZWUucXVhZHJhbnRzLnNvbWUoZnVuY3Rpb24gKHF1YWRyYW50KSB7XG4gICAgICByZXR1cm4gYWRkVG9RdWFkVHJlZShxdWFkcmFudCwgb2JqZWN0KTtcbiAgICB9KTsgLy8gT25seSBsZWFmIG5vZGVzIHNob3VsZCBoYXZlIGRhdGEgKFdlIGFyZSBhIFwiQ29udGFpbmVyIG5vZGVcIilcbiAgICAvLyBJZiBpdCBkaWRuJ3QgaW50ZXJzZWN0IHdpdGggYW55IGNoaWxkLCBpdCB3b24ndCBpbnRlcnNlY3Qgd2l0aCB1c1xuXG4gICAgcmV0dXJuIHdhc0FkZGVkVG9DaGlsZDtcbiAgfSAvLyBMZXQncyBnZXQgdGhlIGRhdGEgYWxyZWFkeSBhc3NvY2lhdGVkIHdpdGggdGhpcyBidWNrZXRcblxuXG4gIHZhciBvYmplY3RQb2ludEtleSA9IGNyZWF0ZVBvaW50S2V5KG9iamVjdEJvdW5kKTtcbiAgdmFyIG9iamVjdFBvaW50U2V0ID0gcXVhZFRyZWUuZGF0YS5nZXQob2JqZWN0UG9pbnRLZXkpIHx8IG5ldyBTZXQoKTsgLy8gTGV0J3MgY2hlY2sgaWYgdGhlIG9iamVjdCBpcyBhbHJlYWR5IGluIHRoZSBidWNrZXRcblxuICBpZiAob2JqZWN0UG9pbnRTZXQuaGFzKG9iamVjdCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0gLy8gTGV0J3Mgc2VlIGlmIHRoaXMgcXVhZHJhbnQgaGFzIGFueSBjYXBhY2l0eVxuICAvLyBJZiBpdCBkb2VzLCB3ZSBjYW4gZ28gYWhlYWQgYW5kIHN0b3JlIHRoZSBjdXJyZW50IG9iamVjdFxuICAvL1xuICAvLyBXZSBhbHNvIHdhbm5hIGdvIGFoZWFkIGFuZCBhZGQsIGlmIHRoaXMgcG9pbnQgKHgsIHkpIGhhcyBhbHJlYWR5XG4gIC8vIGhhZCBhbiBvYmplY3QgYWRkZWQsIHdlJ2xsIGNoYWluIGl0IG9uIHRvIHRoZSBsaXN0IG9mIG9iamVjdHMgXG4gIC8vIGFzc29jaWF0ZWQgd2l0aCB0aGlzIHBvaW50XG5cblxuICBpZiAob2JqZWN0UG9pbnRTZXQuc2l6ZSA+IDAgfHwgcXVhZFRyZWUuZGF0YS5zaXplICsgMSA8PSBxdWFkVHJlZS5jYXBhY2l0eSkge1xuICAgIG9iamVjdFBvaW50U2V0LmFkZChvYmplY3QpO1xuICAgIHF1YWRUcmVlLmRhdGEuc2V0KG9iamVjdFBvaW50S2V5LCBvYmplY3RQb2ludFNldCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gLy8gVGhlIGN1cnJlbnQgbm9kZSBmaXRzIHRoZSBjdXJyZW50IG9iamVjdCwgYnV0XG4gIC8vIFRoZXJlIGlzbid0IGFueSBjYXBhY2l0eVxuICAvLyBXZSBuZWVkIHRvIHNwbGl0IHRoaXMgYnVja2V0IHVwXG4gIC8vIExldCdzIGZpcnN0IGJ1aWxkIHRoZSBjaGlsZCBxdWFkcmFudHNcbiAgLy8gTGV0J3MgY3JlYXRlIHRoZSBjaGlsZCBRdWFkVHJlZSdzIGZyb20gdGhlIGRpdmlkZWQgcXVhZHJhbnQgYm91bmRzXG5cblxuICB2YXIgcXVhZEJveGVzID0gZGl2aWRlQm91bmRpbmdCb3gocXVhZFRyZWUuYm91bmRzKTtcbiAgdmFyIHF1YWRyYW50cyA9IHF1YWRCb3hlcy5tYXAoZnVuY3Rpb24gKHF1YWRCb3gpIHtcbiAgICByZXR1cm4gY3JlYXRlUXVhZFRyZWUocXVhZEJveCwgcXVhZFRyZWUuY2FwYWNpdHkpO1xuICB9KTtcbiAgdmFyIHF1YWRPYmplY3RzID0gZ2V0UXVhZFRyZWVEYXRhKHF1YWRUcmVlKS5jb25jYXQob2JqZWN0KTsgLy8gYWRqdXN0IGN1cnJlbnQgcXVhZHRyZWUgc2V0dGluZ3NcbiAgLy8gTWF5IG5lZWQgdG8gYWRqdXN0IHRoZXNlIGluLXBsYWNlIGluc3RlYWQgb2YgY3JlYXRpbmcgbmV3IHJlZmVyZW5jZXNcblxuICBjbGVhclF1YWRUcmVlKHF1YWRUcmVlKTtcbiAgcXVhZFRyZWUucXVhZHJhbnRzID0gcXVhZHJhbnRzOyAvLyBhZGQgb2JqZWN0cyBmcm9tIHRoaXMgcXVhZCBub2RlIGJhY2sgdG8gaXQncyBvd24gc3VidHJlZVxuICAvLyBjaGlsZHJlbiB3aWxsIGJlIGF0dGVtcHRlZCB0byBiZSBhZGRlZCB0byBmaXJzdFxuXG4gIHJldHVybiBxdWFkT2JqZWN0cy5ldmVyeShmdW5jdGlvbiAocXVhZE9iamVjdCkge1xuICAgIHJldHVybiBhZGRUb1F1YWRUcmVlKHF1YWRUcmVlLCBxdWFkT2JqZWN0KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUZyb21RdWFkVHJlZShxdWFkVHJlZSwgb2JqZWN0KSB7XG4gIHZhciBvYmplY3RCb3VuZCA9IG9iamVjdC5nZXRCb3VuZHMoKTtcbiAgdmFyIG9iamVjdFBvaW50S2V5ID0gY3JlYXRlUG9pbnRLZXkob2JqZWN0Qm91bmQpO1xuICB2YXIgb2JqZWN0UG9pbnRTZXQgPSBxdWFkVHJlZS5kYXRhLmdldChvYmplY3RQb2ludEtleSkgfHwgbmV3IFNldCgpOyAvLyBJZiBvYmplY3QgaXMgZm91bmQsIGxldCdzIHJlbW92ZSBpdFxuXG4gIGlmIChvYmplY3RQb2ludFNldC5oYXMob2JqZWN0KSkge1xuICAgIG9iamVjdFBvaW50U2V0W1wiZGVsZXRlXCJdKG9iamVjdCk7IC8vIElmIHRoZXJlIHdlcmUgbXVsdGlwbGUgb2JqZWN0cyBhdCB0aGlzIHBvaW50XG4gICAgLy8gd2UgZG9uJ3QgbmVlZCB0byByZW1vdmUgdGhpcyBwb2ludCBrZXlcblxuICAgIGlmIChvYmplY3RQb2ludFNldC5zaXplID4gMCkge1xuICAgICAgcXVhZFRyZWUuZGF0YS5zZXQob2JqZWN0UG9pbnRLZXksIG9iamVjdFBvaW50U2V0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcXVhZFRyZWUuZGF0YVtcImRlbGV0ZVwiXShvYmplY3RQb2ludEtleSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH0gLy8gQ2hlY2sgY2hpbGRyZW4gdG8gZmluZCBvYmplY3QgYW5kIHJlbW92ZSBpZiBmb3VuZFxuXG5cbiAgdmFyIHdhc1JlbW92ZWQgPSBxdWFkVHJlZS5xdWFkcmFudHMuc29tZShmdW5jdGlvbiAocXVhZHJhbnQpIHtcbiAgICByZXR1cm4gcmVtb3ZlRnJvbVF1YWRUcmVlKHF1YWRyYW50LCBvYmplY3QpO1xuICB9KTsgLy8gSWYgb25lIG9mIHRoZSBjaGlsZHJlbiBjb250YWluZWQgdGhlIG9iamVjdCB3ZSBqdXN0IHJlbW92ZWRcbiAgLy8gTGV0J3MgcXVlcnkgdGhlIGJvdW5kaW5nIGJveCBvZiB1cyAodGhlIHBhcmVudCkgdG8gc2VlIGlmIHdlIFxuICAvLyBjYW4gY29sbGFwc2Ugb3IgY29uc3VtZSBvdXIgY2hpbGRyZW4uIE1lYW5pbmcgdGhlIGNoaWxkIHN1YnRyZWVcbiAgLy8gY29udGFpbnMgbGVzcyBlbGVtZW50cyB0aGFuIG91ciBpbmRpdmlkdWFsIGJ1Y2tldCBjYXBhY2l0eS5cblxuICBpZiAod2FzUmVtb3ZlZCkge1xuICAgIHZhciBjaGlsZE9iamVjdFNldCA9IHF1ZXJ5UXVhZFRyZWUocXVhZFRyZWUsIHF1YWRUcmVlLmJvdW5kcyk7XG5cbiAgICBpZiAoY2hpbGRPYmplY3RTZXQuc2l6ZSA8PSBxdWFkVHJlZS5jYXBhY2l0eSkge1xuICAgICAgY2xlYXJRdWFkVHJlZShxdWFkVHJlZSk7XG4gICAgICBjaGlsZE9iamVjdFNldC5mb3JFYWNoKGZ1bmN0aW9uIChjaGlsZE9iamVjdCkge1xuICAgICAgICByZXR1cm4gYWRkVG9RdWFkVHJlZShxdWFkVHJlZSwgY2hpbGRPYmplY3QpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHdhc1JlbW92ZWQ7XG59XG5cbmZ1bmN0aW9uIGNsZWFyUXVhZFRyZWUocXVhZFRyZWUpIHtcbiAgcXVhZFRyZWUuZGF0YSA9IG5ldyBNYXAoKTtcbiAgcXVhZFRyZWUucXVhZHJhbnRzID0gW107XG59XG5cbmZ1bmN0aW9uIHF1ZXJ5UXVhZFRyZWUocXVhZFRyZWUsIGJvdW5kcykge1xuICAvLyBDaGVjayBmaXJzdCBpZiB0aGUgcXVlcnkgYm91bmRzIGludGVyc2VjdCB3aXRoIHRoZSBib3VuZHNcbiAgLy8gb2YgdGhlIGJ1Y2tldCwgaWYgaXQgZG9lc24ndCB3ZSBjYW4gYmFpbCBpbW1lZGlhdGVseSB3aXRoIGFuIGVtcHR5IGxpc3RcbiAgaWYgKCFkb0JvdW5kc0ludGVyc2VjdChxdWFkVHJlZS5ib3VuZHMsIGJvdW5kcykpIHtcbiAgICByZXR1cm4gbmV3IFNldCgpO1xuICB9IC8vIENoZWNrIGlmIGN1cnJlbnQgbm9kZSBoYXMgY2hpbGRyZW5cblxuXG4gIGlmICgocXVhZFRyZWUucXVhZHJhbnRzIHx8IFtdKS5sZW5ndGggPT09IDApIHtcbiAgICAvLyBMZXQncyBpdGVyYXRlIG92ZXIgdGhlIGRhdGEgaW4gdGhlIGJ1Y2tldCB0byBzZWVcbiAgICAvLyBpZiB0aGUgb2JqZWN0cyB0aGVtc2VsdmVzIGludGVyc2VjdCB3aXRoIHRoZSBxdWVyeSBib3VuZHNcbiAgICByZXR1cm4gbmV3IFNldChnZXRRdWFkVHJlZURhdGEocXVhZFRyZWUpLmZpbHRlcihmdW5jdGlvbiAocXVhZE9iamVjdCkge1xuICAgICAgcmV0dXJuIGRvQm91bmRzSW50ZXJzZWN0KHF1YWRPYmplY3QuZ2V0Qm91bmRzKCksIGJvdW5kcyk7XG4gICAgfSkpO1xuICB9IC8vIENoZWNrIHRoZSBjdXJyZW50IG5vZGVzIGNoaWxkcmVuXG4gIC8vIHF1ZXJ5aW5nIHRoZW0gZm9yIHRoZSBzYW1lIGluZm8gYW5kIGNvbGxlY3RpbmdcbiAgLy8gdGhlIHJlc3VsdHNcblxuXG4gIHZhciBjaGlsZFF1ZXJ5UmVzdWx0U2V0ID0gZmxhdHRlblNldHMocXVhZFRyZWUucXVhZHJhbnRzLm1hcChmdW5jdGlvbiAocXVhZHJhbnQpIHtcbiAgICByZXR1cm4gcXVlcnlRdWFkVHJlZShxdWFkcmFudCwgYm91bmRzKTtcbiAgfSkpO1xuICByZXR1cm4gY2hpbGRRdWVyeVJlc3VsdFNldDtcbn1cblxuZnVuY3Rpb24gZ2V0UXVhZFRyZWVEYXRhKHF1YWRUcmVlKSB7XG4gIHJldHVybiBBcnJheS5mcm9tKGZsYXR0ZW5TZXRzKEFycmF5LmZyb20ocXVhZFRyZWUuZGF0YS52YWx1ZXMoKSkpKTtcbn1cbi8qKlxuICogQ3JlYXRlcyBhIHF1YWR0cmVlIFwibWFuYWdpbmdcIiB0aGUgaW5wdXQgYm91bmRzIHdpdGggaW5wdXQgbm9kZSBjYXBhY2l0eS5cbiAqIFxuICogQWxsIGNvbGxpc2lvbiBvYmplY3RzIHNob3VsZCBpbnRlcnNlY3Qgb3IgYmUgY29udGFpbmVkIHdpdGhpbiB0aGVzZSBcIm1hbmFnZWRcIiBib3VuZHMuXG4gKiBAcGFyYW0ge0JvdW5kaW5nQm94fSBib3VuZHMgLSBUaGUgYm91bmRpbmcgYm94IHdpdGggd2hpY2ggdGhlIHF1YWR0cmVlIFwibWFuYWdlc1wiLlxuICogQHBhcmFtIHtudW1iZXJ9IFtjYXBhY2l0eT0zXSAtIFRoZSAjIG9mIGNvbGxpc2lvbiBvYmplY3RzIGEgbm9kZSBjYW4gY29udGFpbiBiZWZvcmUgc3ViZGl2aWRpbmcuXG4gKiBAcmV0dXJuIHtRdWFkVHJlZX0gVGhlIGNyZWF0ZWQgcXVhZHRyZWUgXCJtYW5hZ2luZ1wiIHRoZSBpbnB1dCBib3VuZHMuXG4gKi9cblxuXG5mdW5jdGlvbiBjcmVhdGVRdWFkVHJlZShib3VuZHMpIHtcbiAgdmFyIGNhcGFjaXR5ID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiAzO1xuICB2YXIgcXVhZFRyZWUgPSB7XG4gICAgYm91bmRzOiBib3VuZHMsXG4gICAgZGF0YTogbmV3IE1hcCgpLFxuICAgIGNhcGFjaXR5OiBjYXBhY2l0eSxcbiAgICBxdWFkcmFudHM6IFtdLFxuICAgIGFkZDogZnVuY3Rpb24gYWRkKG9iamVjdCkge1xuICAgICAgcmV0dXJuIGFkZFRvUXVhZFRyZWUocXVhZFRyZWUsIG9iamVjdCk7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZShvYmplY3QpIHtcbiAgICAgIHJldHVybiByZW1vdmVGcm9tUXVhZFRyZWUocXVhZFRyZWUsIG9iamVjdCk7XG4gICAgfSxcbiAgICBjbGVhcjogZnVuY3Rpb24gY2xlYXIoKSB7XG4gICAgICByZXR1cm4gY2xlYXJRdWFkVHJlZShxdWFkVHJlZSk7XG4gICAgfSxcbiAgICBxdWVyeTogZnVuY3Rpb24gcXVlcnkoYm91bmRzKSB7XG4gICAgICByZXR1cm4gcXVlcnlRdWFkVHJlZShxdWFkVHJlZSwgYm91bmRzKTtcbiAgICB9LFxuICAgIGdldERhdGE6IGZ1bmN0aW9uIGdldERhdGEoKSB7XG4gICAgICByZXR1cm4gZ2V0UXVhZFRyZWVEYXRhKHF1YWRUcmVlKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBxdWFkVHJlZTtcbn1cblxuZXhwb3J0IHsgY3JlYXRlUXVhZFRyZWUgfTtcbiIsImltcG9ydCB7IFBpeGVsLCBDb2xvciB9IGZyb20gJy4vc2NoZW1hJztcbmltcG9ydCBHSUYgZnJvbSAnZ2lmLmpzJztcblxuZXhwb3J0IGNvbnN0IFBJWEVMX1dJRFRIOiBudW1iZXIgPSA0O1xuZXhwb3J0IGNvbnN0IFdISVRFX0NPTE9SOiBDb2xvciA9IHtcbiAgICByOiAyNTUsXG4gICAgZzogMjU1LFxuICAgIGI6IDI1NSxcbiAgICBhOiAyNTUsXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gbG9hZEltYWdlKGltYWdlRmlsZTogRmlsZSk6IFByb21pc2U8SFRNTEltYWdlRWxlbWVudD4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGNvbnN0IGltYWdlRmlsZURhdGFVcmwgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChpbWFnZUZpbGUpO1xuICAgICAgICBjb25zdCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xuXG4gICAgICAgIGltYWdlLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICAgIHdpbmRvdy5VUkwucmV2b2tlT2JqZWN0VVJMKGltYWdlRmlsZURhdGFVcmwpO1xuICAgICAgICAgICAgcmVzb2x2ZShpbWFnZSlcbiAgICAgICAgfTtcbiAgICAgICAgaW1hZ2Uub25lcnJvciA9IChlcnIpID0+IHtcbiAgICAgICAgICAgIHdpbmRvdy5VUkwucmV2b2tlT2JqZWN0VVJMKGltYWdlRmlsZURhdGFVcmwpO1xuICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIH07XG4gICAgICAgIGltYWdlLnNyYyA9IGltYWdlRmlsZURhdGFVcmw7XG4gICAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBdmVyYWdlQ29sb3IocGl4ZWxzOiBQaXhlbFtdKTogQ29sb3Ige1xuICAgIGxldCBzcXVhcmVkU3VtUjogbnVtYmVyO1xuICAgIGxldCBzcXVhcmVkU3VtRzogbnVtYmVyO1xuICAgIGxldCBzcXVhcmVkU3VtQjogbnVtYmVyO1xuICAgIGxldCBzcXVhcmVkU3VtQTogbnVtYmVyO1xuICAgIGxldCBhdmVyYWdlQ29sb3I6IENvbG9yID0gcGl4ZWxzWzBdIHx8IFdISVRFX0NPTE9SO1xuXG4gICAgaWYgKHBpeGVscy5sZW5ndGggPiAxKSB7XG4gICAgICAgIHJldHVybiBwaXhlbHMuc2xpY2UoMSlcbiAgICAgICAgICAgIC5yZWR1Y2UoKHByZXZBdmVyYWdlOiBDb2xvciwgY3VyclBpeGVsOiBQaXhlbCkgPT4ge1xuICAgICAgICAgICAgICAgIHNxdWFyZWRTdW1SID0gTWF0aC5wb3cocHJldkF2ZXJhZ2UuciwgMikgKyBNYXRoLnBvdyhjdXJyUGl4ZWwuciwgMik7XG4gICAgICAgICAgICAgICAgc3F1YXJlZFN1bUcgPSBNYXRoLnBvdyhwcmV2QXZlcmFnZS5nLCAyKSArIE1hdGgucG93KGN1cnJQaXhlbC5nLCAyKTtcbiAgICAgICAgICAgICAgICBzcXVhcmVkU3VtQiA9IE1hdGgucG93KHByZXZBdmVyYWdlLmIsIDIpICsgTWF0aC5wb3coY3VyclBpeGVsLmIsIDIpO1xuICAgICAgICAgICAgICAgIHNxdWFyZWRTdW1BID0gTWF0aC5wb3cocHJldkF2ZXJhZ2UuYSwgMikgKyBNYXRoLnBvdyhjdXJyUGl4ZWwuYSwgMik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgcjogTWF0aC5zcXJ0KHNxdWFyZWRTdW1SIC8gMiksXG4gICAgICAgICAgICAgICAgICAgIGc6IE1hdGguc3FydChzcXVhcmVkU3VtRyAvIDIpLFxuICAgICAgICAgICAgICAgICAgICBiOiBNYXRoLnNxcnQoc3F1YXJlZFN1bUIgLyAyKSxcbiAgICAgICAgICAgICAgICAgICAgYTogTWF0aC5zcXJ0KHNxdWFyZWRTdW1BIC8gMiksXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0sIGF2ZXJhZ2VDb2xvcik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGF2ZXJhZ2VDb2xvcjtcbn1cblxuZnVuY3Rpb24gY3JlYXRlUGl4ZWwoeDogbnVtYmVyLCB5OiBudW1iZXIsIHI6IG51bWJlciwgZzogbnVtYmVyLCBiOiBudW1iZXIsIGE6IG51bWJlcik6IFBpeGVsIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB4LFxuICAgICAgICB5LFxuICAgICAgICByLFxuICAgICAgICBnLFxuICAgICAgICBiLFxuICAgICAgICBhLFxuICAgICAgICBnZXRCb3VuZHMoKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHg6IHRoaXMueCxcbiAgICAgICAgICAgICAgICB5OiB0aGlzLnksXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUGl4ZWxzKGltYWdlRGF0YTogSW1hZ2VEYXRhKTogUGl4ZWxbXSB7XG4gICAgbGV0IHBpeGVsczogUGl4ZWxbXSA9IFtdO1xuICAgIHByb2Nlc3NJbWFnZURhdGEoaW1hZ2VEYXRhLCBwaXhlbCA9PiBwaXhlbHMucHVzaChwaXhlbCkpO1xuICAgIHJldHVybiBwaXhlbHM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaWxsUGl4ZWxJbkltYWdlRGF0YShpbWFnZURhdGE6IEltYWdlRGF0YSwgcGl4ZWw6IFBpeGVsKTogdm9pZCB7XG4gICAgY29uc3QgcGl4ZWxPZmZzZXQ6IG51bWJlciA9IChwaXhlbC54ICsgcGl4ZWwueSAqIGltYWdlRGF0YS53aWR0aCkgKiBQSVhFTF9XSURUSDtcbiAgICBpZiAocGl4ZWxPZmZzZXQgPCAwIHx8IHBpeGVsT2Zmc2V0ICsgUElYRUxfV0lEVEggPj0gaW1hZ2VEYXRhLmRhdGEubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaW1hZ2VEYXRhLmRhdGFbcGl4ZWxPZmZzZXRdID0gcGl4ZWwucjtcbiAgICBpbWFnZURhdGEuZGF0YVtwaXhlbE9mZnNldCArIDFdID0gcGl4ZWwuZztcbiAgICBpbWFnZURhdGEuZGF0YVtwaXhlbE9mZnNldCArIDJdID0gcGl4ZWwuYjtcbiAgICBpbWFnZURhdGEuZGF0YVtwaXhlbE9mZnNldCArIDNdID0gcGl4ZWwuYTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEltYWdlRGF0YU9mZlNjcmVlbihpbWFnZTogSFRNTEltYWdlRWxlbWVudCwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpOiBJbWFnZURhdGEge1xuICAgIGNvbnN0IGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICBjb25zdCBjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKSBhcyBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG5cbiAgICBjYW52YXMud2lkdGggPSB3aWR0aDtcbiAgICBjYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xuXG4gICAgY29udGV4dC5kcmF3SW1hZ2UoaW1hZ2UsIDAsIDAsIGltYWdlLndpZHRoLCBpbWFnZS5oZWlnaHQsIDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG5cbiAgICBjb25zdCBpbWFnZURhdGE6IEltYWdlRGF0YSA9IGNvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG4gICAgcmV0dXJuIGltYWdlRGF0YTtcbn1cblxuZnVuY3Rpb24gcHJvY2Vzc0ltYWdlRGF0YShpbWFnZURhdGE6IEltYWdlRGF0YSwgcHJvY2Vzc0Z1bmM6IChwaXhlbDogUGl4ZWwpID0+IHZvaWQsIGluaXRQaXhlbFg6IG51bWJlciA9IDAsIGluaXRQaXhlbFk6IG51bWJlciA9IDApOiB2b2lkIHtcbiAgICBsZXQgcjogbnVtYmVyO1xuICAgIGxldCBnOiBudW1iZXI7XG4gICAgbGV0IGI6IG51bWJlcjtcbiAgICBsZXQgYTogbnVtYmVyO1xuICAgIGxldCBvZmZzZXRYOiBudW1iZXI7XG4gICAgbGV0IG9mZnNldFk6IG51bWJlcjtcbiAgICBsZXQgcGl4ZWw6IFBpeGVsO1xuXG4gICAgZm9yIChsZXQgeCA9IGluaXRQaXhlbFg7IHggPCBpbWFnZURhdGEud2lkdGg7IHgrKykge1xuICAgICAgICBvZmZzZXRYID0geCAqIFBJWEVMX1dJRFRIO1xuXG4gICAgICAgIGZvciAobGV0IHkgPSBpbml0UGl4ZWxZOyB5IDwgaW1hZ2VEYXRhLmhlaWdodDsgeSsrKSB7XG4gICAgICAgICAgICBvZmZzZXRZID0gaW1hZ2VEYXRhLndpZHRoICogeSAqIFBJWEVMX1dJRFRIO1xuXG4gICAgICAgICAgICByID0gaW1hZ2VEYXRhLmRhdGFbb2Zmc2V0WCArIG9mZnNldFldO1xuICAgICAgICAgICAgZyA9IGltYWdlRGF0YS5kYXRhW29mZnNldFggKyBvZmZzZXRZICsgMV07XG4gICAgICAgICAgICBiID0gaW1hZ2VEYXRhLmRhdGFbb2Zmc2V0WCArIG9mZnNldFkgKyAyXTtcbiAgICAgICAgICAgIGEgPSBpbWFnZURhdGEuZGF0YVtvZmZzZXRYICsgb2Zmc2V0WSArIDNdO1xuXG4gICAgICAgICAgICBwaXhlbCA9IGNyZWF0ZVBpeGVsKHgsIHksIHIsIGcsIGIsIGEpO1xuICAgICAgICAgICAgcHJvY2Vzc0Z1bmMocGl4ZWwpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9HaWYoaW1hZ2VGcmFtZXM6IEltYWdlRGF0YVtdKTogdm9pZCB7XG4gICAgY29uc3QgZ2lmID0gbmV3IEdJRih7XG4gICAgICAgIHdvcmtlcnM6IDIsXG4gICAgICAgIHF1YWxpdHk6IDEwXG4gICAgfSk7XG5cbiAgICBpbWFnZUZyYW1lc1xuICAgICAgICAuZm9yRWFjaChpbWFnZUZyYW1lID0+IGdpZi5hZGRGcmFtZShpbWFnZUZyYW1lLCB7XG4gICAgICAgICAgICBkZWxheTogMjAwLFxuICAgICAgICB9KSk7XG5cbiAgICBnaWYub24oJ2ZpbmlzaGVkJywgKGJsb2I6IGFueSkgPT4ge1xuICAgICAgICBzYXZlQmxvYignc2ltcGxlcXVhZC5leHBvcnQuZ2lmJywgYmxvYik7XG4gICAgfSk7XG5cbiAgICBnaWYucmVuZGVyKCk7XG59XG5cbmZ1bmN0aW9uIHNhdmVCbG9iKGZpbGVOYW1lOiBzdHJpbmcsIGJsb2I6IEJsb2IpIHtcbiAgICBjb25zdCBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG4gICAgY29uc3QgdXJsID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG5cbiAgICBhLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICBhLmhyZWYgPSB1cmw7XG4gICAgYS5kb3dubG9hZCA9IGZpbGVOYW1lO1xuICAgIFxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYSk7XG4gICAgYS5jbGljaygpO1xuXG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChhKTtcbiAgICB3aW5kb3cuVVJMLnJldm9rZU9iamVjdFVSTCh1cmwpO1xufSJdLCJzb3VyY2VSb290IjoiIn0=