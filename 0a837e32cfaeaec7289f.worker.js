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
  var quadObjects = [].concat(_toConsumableArray(getQuadTreeData(quadTree)), [object]); // adjust current quadtree settings
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1YWQud29ya2VyLnRzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9naWYuanMvZGlzdC9naWYuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NpbXBsZXF1YWQvZGlzdC9zaW1wbGVxdWFkLmVzbS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC50cyJdLCJuYW1lcyI6WyJwcm9jZXNzZWRNZXNzYWdlIiwidHlwZSIsImJ1aWxkUXVhZFRyZWVGcm9tUGl4ZWxzIiwiaW1hZ2VEYXRhIiwiYm91bmRzIiwiY2FwYWNpdHkiLCJwaXhlbHMiLCJjcmVhdGVQaXhlbHMiLCJxdWFkVHJlZSIsImNyZWF0ZVF1YWRUcmVlIiwiZm9yRWFjaCIsInBpeGVsIiwiYWRkIiwiZmlsbEltYWdlRGF0YUZyb21RdWFkVHJlZSIsInF1YWRyYW50cyIsImxlbmd0aCIsInF1YWRyYW50IiwiZ2V0RGF0YSIsImF2ZXJhZ2VDb2xvciIsImdldEF2ZXJhZ2VDb2xvciIsImZpbGxQaXhlbEluSW1hZ2VEYXRhIiwicmVxdWVzdERyYXciLCJtZXNzYWdlIiwiZGF0YSIsImNyZWF0ZUltYWdlIiwicG9zdE1lc3NhZ2UiLCJwcm9jZXNzSW1hZ2UiLCJ3aWR0aCIsImhlaWdodCIsIm5ld0ltYWdlRGF0YSIsIkltYWdlRGF0YSIsIngiLCJ5Iiwid29ya2VyIiwic2VsZiIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsImNvbnNvbGUiLCJlcnJvciIsIlBJWEVMX1dJRFRIIiwiV0hJVEVfQ09MT1IiLCJyIiwiZyIsImIiLCJhIiwibG9hZEltYWdlIiwiaW1hZ2VGaWxlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJpbWFnZUZpbGVEYXRhVXJsIiwid2luZG93IiwiVVJMIiwiY3JlYXRlT2JqZWN0VVJMIiwiaW1hZ2UiLCJJbWFnZSIsIm9ubG9hZCIsInJldm9rZU9iamVjdFVSTCIsIm9uZXJyb3IiLCJlcnIiLCJzcmMiLCJzcXVhcmVkU3VtUiIsInNxdWFyZWRTdW1HIiwic3F1YXJlZFN1bUIiLCJzcXVhcmVkU3VtQSIsInNsaWNlIiwicmVkdWNlIiwicHJldkF2ZXJhZ2UiLCJjdXJyUGl4ZWwiLCJNYXRoIiwicG93Iiwic3FydCIsImNyZWF0ZVBpeGVsIiwiZ2V0Qm91bmRzIiwicHJvY2Vzc0ltYWdlRGF0YSIsInB1c2giLCJwaXhlbE9mZnNldCIsImdldEltYWdlRGF0YU9mZlNjcmVlbiIsImNhbnZhcyIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImNvbnRleHQiLCJnZXRDb250ZXh0IiwiZHJhd0ltYWdlIiwiZ2V0SW1hZ2VEYXRhIiwicHJvY2Vzc0Z1bmMiLCJpbml0UGl4ZWxYIiwiaW5pdFBpeGVsWSIsIm9mZnNldFgiLCJvZmZzZXRZIiwidG9HaWYiLCJpbWFnZUZyYW1lcyIsImdpZiIsIkdJRiIsIndvcmtlcnMiLCJxdWFsaXR5IiwiaW1hZ2VGcmFtZSIsImFkZEZyYW1lIiwiZGVsYXkiLCJvbiIsImJsb2IiLCJzYXZlQmxvYiIsInJlbmRlciIsImZpbGVOYW1lIiwidXJsIiwic3R5bGUiLCJkaXNwbGF5IiwiaHJlZiIsImRvd25sb2FkIiwiYm9keSIsImFwcGVuZENoaWxkIiwiY2xpY2siLCJyZW1vdmVDaGlsZCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QUM7OztBQUdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7QUFHRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQzs7QUFFdEM7QUFDQTtBQUNBLEdBQUc7OztBQUdIO0FBQ0E7QUFDQSxHQUFHOzs7QUFHSDtBQUNBO0FBQ0EsR0FBRzs7O0FBR0g7QUFDQTtBQUNBLEdBQUc7OztBQUdIO0FBQ0E7QUFDQSxHQUFHOzs7QUFHSDtBQUNBO0FBQ0EsR0FBRzs7O0FBR0g7QUFDQTtBQUNBLEdBQUc7OztBQUdIO0FBQ0E7QUFDQSxHQUFHOzs7QUFHSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBLHVDQUF1QztBQUN2Qzs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7O0FBR0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUssRUFBRTtBQUNQOztBQUVBO0FBQ0EsR0FBRzs7O0FBR0g7QUFDQSxzRUFBc0U7O0FBRXRFO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCx1RkFBdUY7QUFDdkY7O0FBRUE7QUFDQSxpQ0FBaUM7QUFDakM7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxzRUFBc0U7O0FBRXRFO0FBQ0Es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QUFELEVBQTBCRCxJQUExQixDQUFSO0FBQ0gsR0FGRDtBQUlBUixLQUFHLENBQUNVLE1BQUo7QUFDSDs7QUFFRCxTQUFTRCxRQUFULENBQWtCRSxRQUFsQixFQUFvQ0gsSUFBcEMsRUFBZ0Q7QUFDNUMsTUFBTXhELENBQUMsR0FBR21DLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixHQUF2QixDQUFWO0FBQ0EsTUFBTXdCLEdBQUcsR0FBR3JELE1BQU0sQ0FBQ0MsR0FBUCxDQUFXQyxlQUFYLENBQTJCK0MsSUFBM0IsQ0FBWjtBQUVBeEQsR0FBQyxDQUFDNkQsS0FBRixDQUFRQyxPQUFSLEdBQWtCLE1BQWxCO0FBQ0E5RCxHQUFDLENBQUMrRCxJQUFGLEdBQVNILEdBQVQ7QUFDQTVELEdBQUMsQ0FBQ2dFLFFBQUYsR0FBYUwsUUFBYjtBQUVBeEIsVUFBUSxDQUFDOEIsSUFBVCxDQUFjQyxXQUFkLENBQTBCbEUsQ0FBMUI7QUFDQUEsR0FBQyxDQUFDbUUsS0FBRjtBQUVBaEMsVUFBUSxDQUFDOEIsSUFBVCxDQUFjRyxXQUFkLENBQTBCcEUsQ0FBMUI7QUFDQU8sUUFBTSxDQUFDQyxHQUFQLENBQVdLLGVBQVgsQ0FBMkIrQyxHQUEzQjtBQUNILEMiLCJmaWxlIjoiMGE4MzdlMzJjZmFlYWVjNzI4OWYud29ya2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcyEuL3NyYy9xdWFkLndvcmtlci50c1wiKTtcbiIsImltcG9ydCB7IFF1YWRXb3JrZXJEYXRhTWVzc2FnZSwgUGl4ZWwsIENvbG9yLCBRdWFkV29ya2VyTWVzc2FnZSB9IGZyb20gJy4vc2NoZW1hJztcbmltcG9ydCB7IFF1YWRUcmVlLCBjcmVhdGVRdWFkVHJlZSwgQm91bmRpbmdCb3ggfSBmcm9tICdzaW1wbGVxdWFkJztcbmltcG9ydCB7IGNyZWF0ZVBpeGVscywgZ2V0QXZlcmFnZUNvbG9yLCBmaWxsUGl4ZWxJbkltYWdlRGF0YSB9IGZyb20gJy4vdXRpbCc7XG5cbmNvbnN0IHByb2Nlc3NlZE1lc3NhZ2U6IFF1YWRXb3JrZXJNZXNzYWdlID0ge1xuICAgIHR5cGU6ICdwcm9jZXNzZWQnLFxufTtcblxuZnVuY3Rpb24gYnVpbGRRdWFkVHJlZUZyb21QaXhlbHMoaW1hZ2VEYXRhOiBJbWFnZURhdGEsIGJvdW5kczogQm91bmRpbmdCb3gsIGNhcGFjaXR5OiBudW1iZXIpOiBRdWFkVHJlZTxQaXhlbD4ge1xuICAgIGNvbnN0IHBpeGVsczogUGl4ZWxbXSA9IGNyZWF0ZVBpeGVscyhpbWFnZURhdGEpO1xuICAgIGNvbnN0IHF1YWRUcmVlOiBRdWFkVHJlZTxQaXhlbD4gPSBjcmVhdGVRdWFkVHJlZShib3VuZHMsIGNhcGFjaXR5KTtcblxuICAgIC8vIEJ1aWxkIHF1YWR0cmVlIHdpdGggdGhpcyBjYXBhY2l0eSBmcm9tIHBpeGVsc1xuICAgIHBpeGVscy5mb3JFYWNoKHBpeGVsID0+IHF1YWRUcmVlLmFkZChwaXhlbCkpO1xuXG4gICAgcmV0dXJuIHF1YWRUcmVlO1xufVxuXG5mdW5jdGlvbiBmaWxsSW1hZ2VEYXRhRnJvbVF1YWRUcmVlKGltYWdlRGF0YTogSW1hZ2VEYXRhLCBxdWFkVHJlZTogUXVhZFRyZWU8UGl4ZWw+KTogSW1hZ2VEYXRhIHsgICAgXG4gICAgaWYgKHF1YWRUcmVlLnF1YWRyYW50cy5sZW5ndGgpIHtcbiAgICAgICAgcXVhZFRyZWUucXVhZHJhbnRzXG4gICAgICAgICAgICAuZm9yRWFjaChxdWFkcmFudCA9PlxuICAgICAgICAgICAgICAgIGZpbGxJbWFnZURhdGFGcm9tUXVhZFRyZWUoaW1hZ2VEYXRhLCBxdWFkcmFudCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHBpeGVsczogUGl4ZWxbXSA9IHF1YWRUcmVlLmdldERhdGEoKTtcbiAgICAgICAgY29uc3QgYXZlcmFnZUNvbG9yOiBDb2xvciA9IGdldEF2ZXJhZ2VDb2xvcihwaXhlbHMpO1xuICAgICAgICBwaXhlbHMuZm9yRWFjaChwaXhlbCA9PiBmaWxsUGl4ZWxJbkltYWdlRGF0YShpbWFnZURhdGEsIHtcbiAgICAgICAgICAgIC4uLnBpeGVsLFxuICAgICAgICAgICAgLi4uYXZlcmFnZUNvbG9yLFxuICAgICAgICB9KSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGltYWdlRGF0YTtcbn1cblxuZnVuY3Rpb24gcmVxdWVzdERyYXcoaW1hZ2VEYXRhOiBJbWFnZURhdGEsIGNhcGFjaXR5OiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCBtZXNzYWdlOiBRdWFkV29ya2VyRGF0YU1lc3NhZ2UgPSB7XG4gICAgICAgIHR5cGU6ICdkcmF3JyxcbiAgICAgICAgZGF0YTogY3JlYXRlSW1hZ2UoaW1hZ2VEYXRhLCBjYXBhY2l0eSksXG4gICAgfTtcbiAgICBwb3N0TWVzc2FnZShtZXNzYWdlKTtcbn1cblxuZnVuY3Rpb24gcHJvY2Vzc0ltYWdlKGltYWdlRGF0YTogSW1hZ2VEYXRhKTogdm9pZCB7XG4gICAgbGV0IGNhcGFjaXR5OiBudW1iZXIgPSBpbWFnZURhdGEud2lkdGggKiBpbWFnZURhdGEuaGVpZ2h0O1xuXG4gICAgd2hpbGUgKGNhcGFjaXR5ID4gMSkge1xuICAgICAgICByZXF1ZXN0RHJhdyhpbWFnZURhdGEsIGNhcGFjaXR5KTtcbiAgICAgICAgY2FwYWNpdHkgLz0gMjtcbiAgICB9XG5cbiAgICByZXF1ZXN0RHJhdyhpbWFnZURhdGEsIDEpO1xuICAgIHBvc3RNZXNzYWdlKHByb2Nlc3NlZE1lc3NhZ2UpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVJbWFnZShpbWFnZURhdGE6IEltYWdlRGF0YSwgY2FwYWNpdHk6IG51bWJlcik6IEltYWdlRGF0YSB7XG4gICAgY29uc3QgbmV3SW1hZ2VEYXRhOiBJbWFnZURhdGEgPSBuZXcgSW1hZ2VEYXRhKGltYWdlRGF0YS53aWR0aCwgaW1hZ2VEYXRhLmhlaWdodCk7XG4gICAgY29uc3QgcXVhZFRyZWU6IFF1YWRUcmVlPFBpeGVsPiA9IGJ1aWxkUXVhZFRyZWVGcm9tUGl4ZWxzKGltYWdlRGF0YSwge1xuICAgICAgICB4OiAwLFxuICAgICAgICB5OiAwLFxuICAgICAgICB3aWR0aDogaW1hZ2VEYXRhLndpZHRoLFxuICAgICAgICBoZWlnaHQ6IGltYWdlRGF0YS5oZWlnaHQsXG4gICAgfSwgY2FwYWNpdHkpO1xuICAgIGZpbGxJbWFnZURhdGFGcm9tUXVhZFRyZWUobmV3SW1hZ2VEYXRhLCBxdWFkVHJlZSk7XG4gICAgcmV0dXJuIG5ld0ltYWdlRGF0YTtcbn1cblxuLy8gU2V0dGluZyB1cCB0aGUgd29ya2VyXG5jb25zdCB3b3JrZXI6IFdvcmtlciA9IHNlbGYgYXMgYW55O1xud29ya2VyLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCAoZXZlbnQpID0+IHtcbiAgICBjb25zdCBtZXNzYWdlOiBRdWFkV29ya2VyRGF0YU1lc3NhZ2UgPSBldmVudC5kYXRhO1xuICAgIGNvbnN0IGltYWdlRGF0YTogSW1hZ2VEYXRhID0gbWVzc2FnZS5kYXRhO1xuXG4gICAgc3dpdGNoIChtZXNzYWdlLnR5cGUpIHtcbiAgICAgICAgY2FzZSAnbmV3LWltYWdlJzpcbiAgICAgICAgICAgIGlmIChpbWFnZURhdGEpIHtcbiAgICAgICAgICAgICAgICBwcm9jZXNzSW1hZ2UoaW1hZ2VEYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgVW5rbm93biBtZXNzYWdlIHR5cGU6ICR7bWVzc2FnZX1gKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICB9XG59KTsiLCIvLyBnaWYuanMgMC4yLjAgLSBodHRwczovL2dpdGh1Yi5jb20vam5vcmRiZXJnL2dpZi5qc1xuKGZ1bmN0aW9uKGYpe2lmKHR5cGVvZiBleHBvcnRzPT09XCJvYmplY3RcIiYmdHlwZW9mIG1vZHVsZSE9PVwidW5kZWZpbmVkXCIpe21vZHVsZS5leHBvcnRzPWYoKX1lbHNlIGlmKHR5cGVvZiBkZWZpbmU9PT1cImZ1bmN0aW9uXCImJmRlZmluZS5hbWQpe2RlZmluZShbXSxmKX1lbHNle3ZhciBnO2lmKHR5cGVvZiB3aW5kb3chPT1cInVuZGVmaW5lZFwiKXtnPXdpbmRvd31lbHNlIGlmKHR5cGVvZiBnbG9iYWwhPT1cInVuZGVmaW5lZFwiKXtnPWdsb2JhbH1lbHNlIGlmKHR5cGVvZiBzZWxmIT09XCJ1bmRlZmluZWRcIil7Zz1zZWxmfWVsc2V7Zz10aGlzfWcuR0lGPWYoKX19KShmdW5jdGlvbigpe3ZhciBkZWZpbmUsbW9kdWxlLGV4cG9ydHM7cmV0dXJuIGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSh7MTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7ZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCl7dGhpcy5fZXZlbnRzPXRoaXMuX2V2ZW50c3x8e307dGhpcy5fbWF4TGlzdGVuZXJzPXRoaXMuX21heExpc3RlbmVyc3x8dW5kZWZpbmVkfW1vZHVsZS5leHBvcnRzPUV2ZW50RW1pdHRlcjtFdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyPUV2ZW50RW1pdHRlcjtFdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHM9dW5kZWZpbmVkO0V2ZW50RW1pdHRlci5wcm90b3R5cGUuX21heExpc3RlbmVycz11bmRlZmluZWQ7RXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnM9MTA7RXZlbnRFbWl0dGVyLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnM9ZnVuY3Rpb24obil7aWYoIWlzTnVtYmVyKG4pfHxuPDB8fGlzTmFOKG4pKXRocm93IFR5cGVFcnJvcihcIm4gbXVzdCBiZSBhIHBvc2l0aXZlIG51bWJlclwiKTt0aGlzLl9tYXhMaXN0ZW5lcnM9bjtyZXR1cm4gdGhpc307RXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0PWZ1bmN0aW9uKHR5cGUpe3ZhciBlcixoYW5kbGVyLGxlbixhcmdzLGksbGlzdGVuZXJzO2lmKCF0aGlzLl9ldmVudHMpdGhpcy5fZXZlbnRzPXt9O2lmKHR5cGU9PT1cImVycm9yXCIpe2lmKCF0aGlzLl9ldmVudHMuZXJyb3J8fGlzT2JqZWN0KHRoaXMuX2V2ZW50cy5lcnJvcikmJiF0aGlzLl9ldmVudHMuZXJyb3IubGVuZ3RoKXtlcj1hcmd1bWVudHNbMV07aWYoZXIgaW5zdGFuY2VvZiBFcnJvcil7dGhyb3cgZXJ9ZWxzZXt2YXIgZXJyPW5ldyBFcnJvcignVW5jYXVnaHQsIHVuc3BlY2lmaWVkIFwiZXJyb3JcIiBldmVudC4gKCcrZXIrXCIpXCIpO2Vyci5jb250ZXh0PWVyO3Rocm93IGVycn19fWhhbmRsZXI9dGhpcy5fZXZlbnRzW3R5cGVdO2lmKGlzVW5kZWZpbmVkKGhhbmRsZXIpKXJldHVybiBmYWxzZTtpZihpc0Z1bmN0aW9uKGhhbmRsZXIpKXtzd2l0Y2goYXJndW1lbnRzLmxlbmd0aCl7Y2FzZSAxOmhhbmRsZXIuY2FsbCh0aGlzKTticmVhaztjYXNlIDI6aGFuZGxlci5jYWxsKHRoaXMsYXJndW1lbnRzWzFdKTticmVhaztjYXNlIDM6aGFuZGxlci5jYWxsKHRoaXMsYXJndW1lbnRzWzFdLGFyZ3VtZW50c1syXSk7YnJlYWs7ZGVmYXVsdDphcmdzPUFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywxKTtoYW5kbGVyLmFwcGx5KHRoaXMsYXJncyl9fWVsc2UgaWYoaXNPYmplY3QoaGFuZGxlcikpe2FyZ3M9QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLDEpO2xpc3RlbmVycz1oYW5kbGVyLnNsaWNlKCk7bGVuPWxpc3RlbmVycy5sZW5ndGg7Zm9yKGk9MDtpPGxlbjtpKyspbGlzdGVuZXJzW2ldLmFwcGx5KHRoaXMsYXJncyl9cmV0dXJuIHRydWV9O0V2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXI9ZnVuY3Rpb24odHlwZSxsaXN0ZW5lcil7dmFyIG07aWYoIWlzRnVuY3Rpb24obGlzdGVuZXIpKXRocm93IFR5cGVFcnJvcihcImxpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvblwiKTtpZighdGhpcy5fZXZlbnRzKXRoaXMuX2V2ZW50cz17fTtpZih0aGlzLl9ldmVudHMubmV3TGlzdGVuZXIpdGhpcy5lbWl0KFwibmV3TGlzdGVuZXJcIix0eXBlLGlzRnVuY3Rpb24obGlzdGVuZXIubGlzdGVuZXIpP2xpc3RlbmVyLmxpc3RlbmVyOmxpc3RlbmVyKTtpZighdGhpcy5fZXZlbnRzW3R5cGVdKXRoaXMuX2V2ZW50c1t0eXBlXT1saXN0ZW5lcjtlbHNlIGlmKGlzT2JqZWN0KHRoaXMuX2V2ZW50c1t0eXBlXSkpdGhpcy5fZXZlbnRzW3R5cGVdLnB1c2gobGlzdGVuZXIpO2Vsc2UgdGhpcy5fZXZlbnRzW3R5cGVdPVt0aGlzLl9ldmVudHNbdHlwZV0sbGlzdGVuZXJdO2lmKGlzT2JqZWN0KHRoaXMuX2V2ZW50c1t0eXBlXSkmJiF0aGlzLl9ldmVudHNbdHlwZV0ud2FybmVkKXtpZighaXNVbmRlZmluZWQodGhpcy5fbWF4TGlzdGVuZXJzKSl7bT10aGlzLl9tYXhMaXN0ZW5lcnN9ZWxzZXttPUV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzfWlmKG0mJm0+MCYmdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aD5tKXt0aGlzLl9ldmVudHNbdHlwZV0ud2FybmVkPXRydWU7Y29uc29sZS5lcnJvcihcIihub2RlKSB3YXJuaW5nOiBwb3NzaWJsZSBFdmVudEVtaXR0ZXIgbWVtb3J5IFwiK1wibGVhayBkZXRlY3RlZC4gJWQgbGlzdGVuZXJzIGFkZGVkLiBcIitcIlVzZSBlbWl0dGVyLnNldE1heExpc3RlbmVycygpIHRvIGluY3JlYXNlIGxpbWl0LlwiLHRoaXMuX2V2ZW50c1t0eXBlXS5sZW5ndGgpO2lmKHR5cGVvZiBjb25zb2xlLnRyYWNlPT09XCJmdW5jdGlvblwiKXtjb25zb2xlLnRyYWNlKCl9fX1yZXR1cm4gdGhpc307RXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbj1FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyO0V2ZW50RW1pdHRlci5wcm90b3R5cGUub25jZT1mdW5jdGlvbih0eXBlLGxpc3RlbmVyKXtpZighaXNGdW5jdGlvbihsaXN0ZW5lcikpdGhyb3cgVHlwZUVycm9yKFwibGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uXCIpO3ZhciBmaXJlZD1mYWxzZTtmdW5jdGlvbiBnKCl7dGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLGcpO2lmKCFmaXJlZCl7ZmlyZWQ9dHJ1ZTtsaXN0ZW5lci5hcHBseSh0aGlzLGFyZ3VtZW50cyl9fWcubGlzdGVuZXI9bGlzdGVuZXI7dGhpcy5vbih0eXBlLGcpO3JldHVybiB0aGlzfTtFdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyPWZ1bmN0aW9uKHR5cGUsbGlzdGVuZXIpe3ZhciBsaXN0LHBvc2l0aW9uLGxlbmd0aCxpO2lmKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSl0aHJvdyBUeXBlRXJyb3IoXCJsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb25cIik7aWYoIXRoaXMuX2V2ZW50c3x8IXRoaXMuX2V2ZW50c1t0eXBlXSlyZXR1cm4gdGhpcztsaXN0PXRoaXMuX2V2ZW50c1t0eXBlXTtsZW5ndGg9bGlzdC5sZW5ndGg7cG9zaXRpb249LTE7aWYobGlzdD09PWxpc3RlbmVyfHxpc0Z1bmN0aW9uKGxpc3QubGlzdGVuZXIpJiZsaXN0Lmxpc3RlbmVyPT09bGlzdGVuZXIpe2RlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07aWYodGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKXRoaXMuZW1pdChcInJlbW92ZUxpc3RlbmVyXCIsdHlwZSxsaXN0ZW5lcil9ZWxzZSBpZihpc09iamVjdChsaXN0KSl7Zm9yKGk9bGVuZ3RoO2ktLSA+MDspe2lmKGxpc3RbaV09PT1saXN0ZW5lcnx8bGlzdFtpXS5saXN0ZW5lciYmbGlzdFtpXS5saXN0ZW5lcj09PWxpc3RlbmVyKXtwb3NpdGlvbj1pO2JyZWFrfX1pZihwb3NpdGlvbjwwKXJldHVybiB0aGlzO2lmKGxpc3QubGVuZ3RoPT09MSl7bGlzdC5sZW5ndGg9MDtkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdfWVsc2V7bGlzdC5zcGxpY2UocG9zaXRpb24sMSl9aWYodGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKXRoaXMuZW1pdChcInJlbW92ZUxpc3RlbmVyXCIsdHlwZSxsaXN0ZW5lcil9cmV0dXJuIHRoaXN9O0V2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzPWZ1bmN0aW9uKHR5cGUpe3ZhciBrZXksbGlzdGVuZXJzO2lmKCF0aGlzLl9ldmVudHMpcmV0dXJuIHRoaXM7aWYoIXRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcil7aWYoYXJndW1lbnRzLmxlbmd0aD09PTApdGhpcy5fZXZlbnRzPXt9O2Vsc2UgaWYodGhpcy5fZXZlbnRzW3R5cGVdKWRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07cmV0dXJuIHRoaXN9aWYoYXJndW1lbnRzLmxlbmd0aD09PTApe2ZvcihrZXkgaW4gdGhpcy5fZXZlbnRzKXtpZihrZXk9PT1cInJlbW92ZUxpc3RlbmVyXCIpY29udGludWU7dGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoa2V5KX10aGlzLnJlbW92ZUFsbExpc3RlbmVycyhcInJlbW92ZUxpc3RlbmVyXCIpO3RoaXMuX2V2ZW50cz17fTtyZXR1cm4gdGhpc31saXN0ZW5lcnM9dGhpcy5fZXZlbnRzW3R5cGVdO2lmKGlzRnVuY3Rpb24obGlzdGVuZXJzKSl7dGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLGxpc3RlbmVycyl9ZWxzZSBpZihsaXN0ZW5lcnMpe3doaWxlKGxpc3RlbmVycy5sZW5ndGgpdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLGxpc3RlbmVyc1tsaXN0ZW5lcnMubGVuZ3RoLTFdKX1kZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO3JldHVybiB0aGlzfTtFdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycz1mdW5jdGlvbih0eXBlKXt2YXIgcmV0O2lmKCF0aGlzLl9ldmVudHN8fCF0aGlzLl9ldmVudHNbdHlwZV0pcmV0PVtdO2Vsc2UgaWYoaXNGdW5jdGlvbih0aGlzLl9ldmVudHNbdHlwZV0pKXJldD1bdGhpcy5fZXZlbnRzW3R5cGVdXTtlbHNlIHJldD10aGlzLl9ldmVudHNbdHlwZV0uc2xpY2UoKTtyZXR1cm4gcmV0fTtFdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVyQ291bnQ9ZnVuY3Rpb24odHlwZSl7aWYodGhpcy5fZXZlbnRzKXt2YXIgZXZsaXN0ZW5lcj10aGlzLl9ldmVudHNbdHlwZV07aWYoaXNGdW5jdGlvbihldmxpc3RlbmVyKSlyZXR1cm4gMTtlbHNlIGlmKGV2bGlzdGVuZXIpcmV0dXJuIGV2bGlzdGVuZXIubGVuZ3RofXJldHVybiAwfTtFdmVudEVtaXR0ZXIubGlzdGVuZXJDb3VudD1mdW5jdGlvbihlbWl0dGVyLHR5cGUpe3JldHVybiBlbWl0dGVyLmxpc3RlbmVyQ291bnQodHlwZSl9O2Z1bmN0aW9uIGlzRnVuY3Rpb24oYXJnKXtyZXR1cm4gdHlwZW9mIGFyZz09PVwiZnVuY3Rpb25cIn1mdW5jdGlvbiBpc051bWJlcihhcmcpe3JldHVybiB0eXBlb2YgYXJnPT09XCJudW1iZXJcIn1mdW5jdGlvbiBpc09iamVjdChhcmcpe3JldHVybiB0eXBlb2YgYXJnPT09XCJvYmplY3RcIiYmYXJnIT09bnVsbH1mdW5jdGlvbiBpc1VuZGVmaW5lZChhcmcpe3JldHVybiBhcmc9PT12b2lkIDB9fSx7fV0sMjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7dmFyIFVBLGJyb3dzZXIsbW9kZSxwbGF0Zm9ybSx1YTt1YT1uYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCk7cGxhdGZvcm09bmF2aWdhdG9yLnBsYXRmb3JtLnRvTG93ZXJDYXNlKCk7VUE9dWEubWF0Y2goLyhvcGVyYXxpZXxmaXJlZm94fGNocm9tZXx2ZXJzaW9uKVtcXHNcXC86XShbXFx3XFxkXFwuXSspPy4qPyhzYWZhcml8dmVyc2lvbltcXHNcXC86XShbXFx3XFxkXFwuXSspfCQpLyl8fFtudWxsLFwidW5rbm93blwiLDBdO21vZGU9VUFbMV09PT1cImllXCImJmRvY3VtZW50LmRvY3VtZW50TW9kZTticm93c2VyPXtuYW1lOlVBWzFdPT09XCJ2ZXJzaW9uXCI/VUFbM106VUFbMV0sdmVyc2lvbjptb2RlfHxwYXJzZUZsb2F0KFVBWzFdPT09XCJvcGVyYVwiJiZVQVs0XT9VQVs0XTpVQVsyXSkscGxhdGZvcm06e25hbWU6dWEubWF0Y2goL2lwKD86YWR8b2R8aG9uZSkvKT9cImlvc1wiOih1YS5tYXRjaCgvKD86d2Vib3N8YW5kcm9pZCkvKXx8cGxhdGZvcm0ubWF0Y2goL21hY3x3aW58bGludXgvKXx8W1wib3RoZXJcIl0pWzBdfX07YnJvd3Nlclticm93c2VyLm5hbWVdPXRydWU7YnJvd3Nlclticm93c2VyLm5hbWUrcGFyc2VJbnQoYnJvd3Nlci52ZXJzaW9uLDEwKV09dHJ1ZTticm93c2VyLnBsYXRmb3JtW2Jyb3dzZXIucGxhdGZvcm0ubmFtZV09dHJ1ZTttb2R1bGUuZXhwb3J0cz1icm93c2VyfSx7fV0sMzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7dmFyIEV2ZW50RW1pdHRlcixHSUYsYnJvd3NlcixleHRlbmQ9ZnVuY3Rpb24oY2hpbGQscGFyZW50KXtmb3IodmFyIGtleSBpbiBwYXJlbnQpe2lmKGhhc1Byb3AuY2FsbChwYXJlbnQsa2V5KSljaGlsZFtrZXldPXBhcmVudFtrZXldfWZ1bmN0aW9uIGN0b3IoKXt0aGlzLmNvbnN0cnVjdG9yPWNoaWxkfWN0b3IucHJvdG90eXBlPXBhcmVudC5wcm90b3R5cGU7Y2hpbGQucHJvdG90eXBlPW5ldyBjdG9yO2NoaWxkLl9fc3VwZXJfXz1wYXJlbnQucHJvdG90eXBlO3JldHVybiBjaGlsZH0saGFzUHJvcD17fS5oYXNPd25Qcm9wZXJ0eSxpbmRleE9mPVtdLmluZGV4T2Z8fGZ1bmN0aW9uKGl0ZW0pe2Zvcih2YXIgaT0wLGw9dGhpcy5sZW5ndGg7aTxsO2krKyl7aWYoaSBpbiB0aGlzJiZ0aGlzW2ldPT09aXRlbSlyZXR1cm4gaX1yZXR1cm4tMX0sc2xpY2U9W10uc2xpY2U7RXZlbnRFbWl0dGVyPXJlcXVpcmUoXCJldmVudHNcIikuRXZlbnRFbWl0dGVyO2Jyb3dzZXI9cmVxdWlyZShcIi4vYnJvd3Nlci5jb2ZmZWVcIik7R0lGPWZ1bmN0aW9uKHN1cGVyQ2xhc3Mpe3ZhciBkZWZhdWx0cyxmcmFtZURlZmF1bHRzO2V4dGVuZChHSUYsc3VwZXJDbGFzcyk7ZGVmYXVsdHM9e3dvcmtlclNjcmlwdDpcImdpZi53b3JrZXIuanNcIix3b3JrZXJzOjIscmVwZWF0OjAsYmFja2dyb3VuZDpcIiNmZmZcIixxdWFsaXR5OjEwLHdpZHRoOm51bGwsaGVpZ2h0Om51bGwsdHJhbnNwYXJlbnQ6bnVsbCxkZWJ1ZzpmYWxzZSxkaXRoZXI6ZmFsc2V9O2ZyYW1lRGVmYXVsdHM9e2RlbGF5OjUwMCxjb3B5OmZhbHNlfTtmdW5jdGlvbiBHSUYob3B0aW9ucyl7dmFyIGJhc2Usa2V5LHZhbHVlO3RoaXMucnVubmluZz1mYWxzZTt0aGlzLm9wdGlvbnM9e307dGhpcy5mcmFtZXM9W107dGhpcy5mcmVlV29ya2Vycz1bXTt0aGlzLmFjdGl2ZVdvcmtlcnM9W107dGhpcy5zZXRPcHRpb25zKG9wdGlvbnMpO2ZvcihrZXkgaW4gZGVmYXVsdHMpe3ZhbHVlPWRlZmF1bHRzW2tleV07aWYoKGJhc2U9dGhpcy5vcHRpb25zKVtrZXldPT1udWxsKXtiYXNlW2tleV09dmFsdWV9fX1HSUYucHJvdG90eXBlLnNldE9wdGlvbj1mdW5jdGlvbihrZXksdmFsdWUpe3RoaXMub3B0aW9uc1trZXldPXZhbHVlO2lmKHRoaXMuX2NhbnZhcyE9bnVsbCYmKGtleT09PVwid2lkdGhcInx8a2V5PT09XCJoZWlnaHRcIikpe3JldHVybiB0aGlzLl9jYW52YXNba2V5XT12YWx1ZX19O0dJRi5wcm90b3R5cGUuc2V0T3B0aW9ucz1mdW5jdGlvbihvcHRpb25zKXt2YXIga2V5LHJlc3VsdHMsdmFsdWU7cmVzdWx0cz1bXTtmb3Ioa2V5IGluIG9wdGlvbnMpe2lmKCFoYXNQcm9wLmNhbGwob3B0aW9ucyxrZXkpKWNvbnRpbnVlO3ZhbHVlPW9wdGlvbnNba2V5XTtyZXN1bHRzLnB1c2godGhpcy5zZXRPcHRpb24oa2V5LHZhbHVlKSl9cmV0dXJuIHJlc3VsdHN9O0dJRi5wcm90b3R5cGUuYWRkRnJhbWU9ZnVuY3Rpb24oaW1hZ2Usb3B0aW9ucyl7dmFyIGZyYW1lLGtleTtpZihvcHRpb25zPT1udWxsKXtvcHRpb25zPXt9fWZyYW1lPXt9O2ZyYW1lLnRyYW5zcGFyZW50PXRoaXMub3B0aW9ucy50cmFuc3BhcmVudDtmb3Ioa2V5IGluIGZyYW1lRGVmYXVsdHMpe2ZyYW1lW2tleV09b3B0aW9uc1trZXldfHxmcmFtZURlZmF1bHRzW2tleV19aWYodGhpcy5vcHRpb25zLndpZHRoPT1udWxsKXt0aGlzLnNldE9wdGlvbihcIndpZHRoXCIsaW1hZ2Uud2lkdGgpfWlmKHRoaXMub3B0aW9ucy5oZWlnaHQ9PW51bGwpe3RoaXMuc2V0T3B0aW9uKFwiaGVpZ2h0XCIsaW1hZ2UuaGVpZ2h0KX1pZih0eXBlb2YgSW1hZ2VEYXRhIT09XCJ1bmRlZmluZWRcIiYmSW1hZ2VEYXRhIT09bnVsbCYmaW1hZ2UgaW5zdGFuY2VvZiBJbWFnZURhdGEpe2ZyYW1lLmRhdGE9aW1hZ2UuZGF0YX1lbHNlIGlmKHR5cGVvZiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQhPT1cInVuZGVmaW5lZFwiJiZDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQhPT1udWxsJiZpbWFnZSBpbnN0YW5jZW9mIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRHx8dHlwZW9mIFdlYkdMUmVuZGVyaW5nQ29udGV4dCE9PVwidW5kZWZpbmVkXCImJldlYkdMUmVuZGVyaW5nQ29udGV4dCE9PW51bGwmJmltYWdlIGluc3RhbmNlb2YgV2ViR0xSZW5kZXJpbmdDb250ZXh0KXtpZihvcHRpb25zLmNvcHkpe2ZyYW1lLmRhdGE9dGhpcy5nZXRDb250ZXh0RGF0YShpbWFnZSl9ZWxzZXtmcmFtZS5jb250ZXh0PWltYWdlfX1lbHNlIGlmKGltYWdlLmNoaWxkTm9kZXMhPW51bGwpe2lmKG9wdGlvbnMuY29weSl7ZnJhbWUuZGF0YT10aGlzLmdldEltYWdlRGF0YShpbWFnZSl9ZWxzZXtmcmFtZS5pbWFnZT1pbWFnZX19ZWxzZXt0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGltYWdlXCIpfXJldHVybiB0aGlzLmZyYW1lcy5wdXNoKGZyYW1lKX07R0lGLnByb3RvdHlwZS5yZW5kZXI9ZnVuY3Rpb24oKXt2YXIgaSxqLG51bVdvcmtlcnMscmVmO2lmKHRoaXMucnVubmluZyl7dGhyb3cgbmV3IEVycm9yKFwiQWxyZWFkeSBydW5uaW5nXCIpfWlmKHRoaXMub3B0aW9ucy53aWR0aD09bnVsbHx8dGhpcy5vcHRpb25zLmhlaWdodD09bnVsbCl7dGhyb3cgbmV3IEVycm9yKFwiV2lkdGggYW5kIGhlaWdodCBtdXN0IGJlIHNldCBwcmlvciB0byByZW5kZXJpbmdcIil9dGhpcy5ydW5uaW5nPXRydWU7dGhpcy5uZXh0RnJhbWU9MDt0aGlzLmZpbmlzaGVkRnJhbWVzPTA7dGhpcy5pbWFnZVBhcnRzPWZ1bmN0aW9uKCl7dmFyIGoscmVmLHJlc3VsdHM7cmVzdWx0cz1bXTtmb3IoaT1qPTAscmVmPXRoaXMuZnJhbWVzLmxlbmd0aDswPD1yZWY/ajxyZWY6aj5yZWY7aT0wPD1yZWY/KytqOi0tail7cmVzdWx0cy5wdXNoKG51bGwpfXJldHVybiByZXN1bHRzfS5jYWxsKHRoaXMpO251bVdvcmtlcnM9dGhpcy5zcGF3bldvcmtlcnMoKTtpZih0aGlzLm9wdGlvbnMuZ2xvYmFsUGFsZXR0ZT09PXRydWUpe3RoaXMucmVuZGVyTmV4dEZyYW1lKCl9ZWxzZXtmb3IoaT1qPTAscmVmPW51bVdvcmtlcnM7MDw9cmVmP2o8cmVmOmo+cmVmO2k9MDw9cmVmPysrajotLWope3RoaXMucmVuZGVyTmV4dEZyYW1lKCl9fXRoaXMuZW1pdChcInN0YXJ0XCIpO3JldHVybiB0aGlzLmVtaXQoXCJwcm9ncmVzc1wiLDApfTtHSUYucHJvdG90eXBlLmFib3J0PWZ1bmN0aW9uKCl7dmFyIHdvcmtlcjt3aGlsZSh0cnVlKXt3b3JrZXI9dGhpcy5hY3RpdmVXb3JrZXJzLnNoaWZ0KCk7aWYod29ya2VyPT1udWxsKXticmVha310aGlzLmxvZyhcImtpbGxpbmcgYWN0aXZlIHdvcmtlclwiKTt3b3JrZXIudGVybWluYXRlKCl9dGhpcy5ydW5uaW5nPWZhbHNlO3JldHVybiB0aGlzLmVtaXQoXCJhYm9ydFwiKX07R0lGLnByb3RvdHlwZS5zcGF3bldvcmtlcnM9ZnVuY3Rpb24oKXt2YXIgaixudW1Xb3JrZXJzLHJlZixyZXN1bHRzO251bVdvcmtlcnM9TWF0aC5taW4odGhpcy5vcHRpb25zLndvcmtlcnMsdGhpcy5mcmFtZXMubGVuZ3RoKTsoZnVuY3Rpb24oKXtyZXN1bHRzPVtdO2Zvcih2YXIgaj1yZWY9dGhpcy5mcmVlV29ya2Vycy5sZW5ndGg7cmVmPD1udW1Xb3JrZXJzP2o8bnVtV29ya2VyczpqPm51bVdvcmtlcnM7cmVmPD1udW1Xb3JrZXJzP2orKzpqLS0pe3Jlc3VsdHMucHVzaChqKX1yZXR1cm4gcmVzdWx0c30pLmFwcGx5KHRoaXMpLmZvckVhY2goZnVuY3Rpb24oX3RoaXMpe3JldHVybiBmdW5jdGlvbihpKXt2YXIgd29ya2VyO190aGlzLmxvZyhcInNwYXduaW5nIHdvcmtlciBcIitpKTt3b3JrZXI9bmV3IFdvcmtlcihfdGhpcy5vcHRpb25zLndvcmtlclNjcmlwdCk7d29ya2VyLm9ubWVzc2FnZT1mdW5jdGlvbihldmVudCl7X3RoaXMuYWN0aXZlV29ya2Vycy5zcGxpY2UoX3RoaXMuYWN0aXZlV29ya2Vycy5pbmRleE9mKHdvcmtlciksMSk7X3RoaXMuZnJlZVdvcmtlcnMucHVzaCh3b3JrZXIpO3JldHVybiBfdGhpcy5mcmFtZUZpbmlzaGVkKGV2ZW50LmRhdGEpfTtyZXR1cm4gX3RoaXMuZnJlZVdvcmtlcnMucHVzaCh3b3JrZXIpfX0odGhpcykpO3JldHVybiBudW1Xb3JrZXJzfTtHSUYucHJvdG90eXBlLmZyYW1lRmluaXNoZWQ9ZnVuY3Rpb24oZnJhbWUpe3ZhciBpLGoscmVmO3RoaXMubG9nKFwiZnJhbWUgXCIrZnJhbWUuaW5kZXgrXCIgZmluaXNoZWQgLSBcIit0aGlzLmFjdGl2ZVdvcmtlcnMubGVuZ3RoK1wiIGFjdGl2ZVwiKTt0aGlzLmZpbmlzaGVkRnJhbWVzKys7dGhpcy5lbWl0KFwicHJvZ3Jlc3NcIix0aGlzLmZpbmlzaGVkRnJhbWVzL3RoaXMuZnJhbWVzLmxlbmd0aCk7dGhpcy5pbWFnZVBhcnRzW2ZyYW1lLmluZGV4XT1mcmFtZTtpZih0aGlzLm9wdGlvbnMuZ2xvYmFsUGFsZXR0ZT09PXRydWUpe3RoaXMub3B0aW9ucy5nbG9iYWxQYWxldHRlPWZyYW1lLmdsb2JhbFBhbGV0dGU7dGhpcy5sb2coXCJnbG9iYWwgcGFsZXR0ZSBhbmFseXplZFwiKTtpZih0aGlzLmZyYW1lcy5sZW5ndGg+Mil7Zm9yKGk9aj0xLHJlZj10aGlzLmZyZWVXb3JrZXJzLmxlbmd0aDsxPD1yZWY/ajxyZWY6aj5yZWY7aT0xPD1yZWY/KytqOi0tail7dGhpcy5yZW5kZXJOZXh0RnJhbWUoKX19fWlmKGluZGV4T2YuY2FsbCh0aGlzLmltYWdlUGFydHMsbnVsbCk+PTApe3JldHVybiB0aGlzLnJlbmRlck5leHRGcmFtZSgpfWVsc2V7cmV0dXJuIHRoaXMuZmluaXNoUmVuZGVyaW5nKCl9fTtHSUYucHJvdG90eXBlLmZpbmlzaFJlbmRlcmluZz1mdW5jdGlvbigpe3ZhciBkYXRhLGZyYW1lLGksaW1hZ2UsaixrLGwsbGVuLGxlbjEsbGVuMixsZW4zLG9mZnNldCxwYWdlLHJlZixyZWYxLHJlZjI7bGVuPTA7cmVmPXRoaXMuaW1hZ2VQYXJ0cztmb3Ioaj0wLGxlbjE9cmVmLmxlbmd0aDtqPGxlbjE7aisrKXtmcmFtZT1yZWZbal07bGVuKz0oZnJhbWUuZGF0YS5sZW5ndGgtMSkqZnJhbWUucGFnZVNpemUrZnJhbWUuY3Vyc29yfWxlbis9ZnJhbWUucGFnZVNpemUtZnJhbWUuY3Vyc29yO3RoaXMubG9nKFwicmVuZGVyaW5nIGZpbmlzaGVkIC0gZmlsZXNpemUgXCIrTWF0aC5yb3VuZChsZW4vMWUzKStcImtiXCIpO2RhdGE9bmV3IFVpbnQ4QXJyYXkobGVuKTtvZmZzZXQ9MDtyZWYxPXRoaXMuaW1hZ2VQYXJ0cztmb3Ioaz0wLGxlbjI9cmVmMS5sZW5ndGg7azxsZW4yO2srKyl7ZnJhbWU9cmVmMVtrXTtyZWYyPWZyYW1lLmRhdGE7Zm9yKGk9bD0wLGxlbjM9cmVmMi5sZW5ndGg7bDxsZW4zO2k9KytsKXtwYWdlPXJlZjJbaV07ZGF0YS5zZXQocGFnZSxvZmZzZXQpO2lmKGk9PT1mcmFtZS5kYXRhLmxlbmd0aC0xKXtvZmZzZXQrPWZyYW1lLmN1cnNvcn1lbHNle29mZnNldCs9ZnJhbWUucGFnZVNpemV9fX1pbWFnZT1uZXcgQmxvYihbZGF0YV0se3R5cGU6XCJpbWFnZS9naWZcIn0pO3JldHVybiB0aGlzLmVtaXQoXCJmaW5pc2hlZFwiLGltYWdlLGRhdGEpfTtHSUYucHJvdG90eXBlLnJlbmRlck5leHRGcmFtZT1mdW5jdGlvbigpe3ZhciBmcmFtZSx0YXNrLHdvcmtlcjtpZih0aGlzLmZyZWVXb3JrZXJzLmxlbmd0aD09PTApe3Rocm93IG5ldyBFcnJvcihcIk5vIGZyZWUgd29ya2Vyc1wiKX1pZih0aGlzLm5leHRGcmFtZT49dGhpcy5mcmFtZXMubGVuZ3RoKXtyZXR1cm59ZnJhbWU9dGhpcy5mcmFtZXNbdGhpcy5uZXh0RnJhbWUrK107d29ya2VyPXRoaXMuZnJlZVdvcmtlcnMuc2hpZnQoKTt0YXNrPXRoaXMuZ2V0VGFzayhmcmFtZSk7dGhpcy5sb2coXCJzdGFydGluZyBmcmFtZSBcIisodGFzay5pbmRleCsxKStcIiBvZiBcIit0aGlzLmZyYW1lcy5sZW5ndGgpO3RoaXMuYWN0aXZlV29ya2Vycy5wdXNoKHdvcmtlcik7cmV0dXJuIHdvcmtlci5wb3N0TWVzc2FnZSh0YXNrKX07R0lGLnByb3RvdHlwZS5nZXRDb250ZXh0RGF0YT1mdW5jdGlvbihjdHgpe3JldHVybiBjdHguZ2V0SW1hZ2VEYXRhKDAsMCx0aGlzLm9wdGlvbnMud2lkdGgsdGhpcy5vcHRpb25zLmhlaWdodCkuZGF0YX07R0lGLnByb3RvdHlwZS5nZXRJbWFnZURhdGE9ZnVuY3Rpb24oaW1hZ2Upe3ZhciBjdHg7aWYodGhpcy5fY2FudmFzPT1udWxsKXt0aGlzLl9jYW52YXM9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTt0aGlzLl9jYW52YXMud2lkdGg9dGhpcy5vcHRpb25zLndpZHRoO3RoaXMuX2NhbnZhcy5oZWlnaHQ9dGhpcy5vcHRpb25zLmhlaWdodH1jdHg9dGhpcy5fY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtjdHguc2V0RmlsbD10aGlzLm9wdGlvbnMuYmFja2dyb3VuZDtjdHguZmlsbFJlY3QoMCwwLHRoaXMub3B0aW9ucy53aWR0aCx0aGlzLm9wdGlvbnMuaGVpZ2h0KTtjdHguZHJhd0ltYWdlKGltYWdlLDAsMCk7cmV0dXJuIHRoaXMuZ2V0Q29udGV4dERhdGEoY3R4KX07R0lGLnByb3RvdHlwZS5nZXRUYXNrPWZ1bmN0aW9uKGZyYW1lKXt2YXIgaW5kZXgsdGFzaztpbmRleD10aGlzLmZyYW1lcy5pbmRleE9mKGZyYW1lKTt0YXNrPXtpbmRleDppbmRleCxsYXN0OmluZGV4PT09dGhpcy5mcmFtZXMubGVuZ3RoLTEsZGVsYXk6ZnJhbWUuZGVsYXksdHJhbnNwYXJlbnQ6ZnJhbWUudHJhbnNwYXJlbnQsd2lkdGg6dGhpcy5vcHRpb25zLndpZHRoLGhlaWdodDp0aGlzLm9wdGlvbnMuaGVpZ2h0LHF1YWxpdHk6dGhpcy5vcHRpb25zLnF1YWxpdHksZGl0aGVyOnRoaXMub3B0aW9ucy5kaXRoZXIsZ2xvYmFsUGFsZXR0ZTp0aGlzLm9wdGlvbnMuZ2xvYmFsUGFsZXR0ZSxyZXBlYXQ6dGhpcy5vcHRpb25zLnJlcGVhdCxjYW5UcmFuc2Zlcjpicm93c2VyLm5hbWU9PT1cImNocm9tZVwifTtpZihmcmFtZS5kYXRhIT1udWxsKXt0YXNrLmRhdGE9ZnJhbWUuZGF0YX1lbHNlIGlmKGZyYW1lLmNvbnRleHQhPW51bGwpe3Rhc2suZGF0YT10aGlzLmdldENvbnRleHREYXRhKGZyYW1lLmNvbnRleHQpfWVsc2UgaWYoZnJhbWUuaW1hZ2UhPW51bGwpe3Rhc2suZGF0YT10aGlzLmdldEltYWdlRGF0YShmcmFtZS5pbWFnZSl9ZWxzZXt0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGZyYW1lXCIpfXJldHVybiB0YXNrfTtHSUYucHJvdG90eXBlLmxvZz1mdW5jdGlvbigpe3ZhciBhcmdzO2FyZ3M9MTw9YXJndW1lbnRzLmxlbmd0aD9zbGljZS5jYWxsKGFyZ3VtZW50cywwKTpbXTtpZighdGhpcy5vcHRpb25zLmRlYnVnKXtyZXR1cm59cmV0dXJuIGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsYXJncyl9O3JldHVybiBHSUZ9KEV2ZW50RW1pdHRlcik7bW9kdWxlLmV4cG9ydHM9R0lGfSx7XCIuL2Jyb3dzZXIuY29mZmVlXCI6MixldmVudHM6MX1dfSx7fSxbM10pKDMpfSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1naWYuanMubWFwXG4iLCJmdW5jdGlvbiBfdG9Db25zdW1hYmxlQXJyYXkoYXJyKSB7XG4gIHJldHVybiBfYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5KGFycikgfHwgX25vbkl0ZXJhYmxlU3ByZWFkKCk7XG59XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhvdXRIb2xlcyhhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkge1xuICAgIGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGFyci5sZW5ndGgpOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSBhcnIyW2ldID0gYXJyW2ldO1xuXG4gICAgcmV0dXJuIGFycjI7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheShpdGVyKSB7XG4gIGlmIChTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGl0ZXIpIHx8IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChpdGVyKSA9PT0gXCJbb2JqZWN0IEFyZ3VtZW50c11cIikgcmV0dXJuIEFycmF5LmZyb20oaXRlcik7XG59XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVNwcmVhZCgpIHtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBzcHJlYWQgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpO1xufVxuXG4vLyBUaGUgIyBvZiBjb21iaW5hdGlvbnMgYmV0d2VlbiB0aGVzZSAzIGJvdW5kcyBpcyBhcyBmb2xsb3dzOlxuLy8gLSBDaXJjbGUgYW5kIENpcmNsZVxuLy8gLSBDaXJjbGUgYW5kIFBvaW50XG4vLyAtIENpcmNsZSBhbmQgQm91bmRpbmdCb3hcbi8vIC0gQm91bmRpbmdCb3ggYW5kIEJvdW5kaW5nQm94XG4vLyAtIEJvdW5kaW5nQm94IGFuZCBQb2ludFxuLy8gLSBQb2ludCBhbmQgUG9pbnRcbmZ1bmN0aW9uIGlzQ2lyY2xlKGJvdW5kKSB7XG4gIHJldHVybiBib3VuZC5yICE9PSB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIGlzQm91bmRpbmdCb3goYm91bmQpIHtcbiAgcmV0dXJuIGJvdW5kLndpZHRoICE9PSB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIGlzUG9pbnQoYm91bmQpIHtcbiAgcmV0dXJuICFpc0NpcmNsZShib3VuZCkgJiYgIWlzQm91bmRpbmdCb3goYm91bmQpO1xufVxuXG5mdW5jdGlvbiBkb1BvaW50c0ludGVyc2VjdChwb2ludDEsIHBvaW50Mikge1xuICByZXR1cm4gcG9pbnQxLnggPT09IHBvaW50Mi54ICYmIHBvaW50MS55ID09PSBwb2ludDIueTtcbn1cblxuZnVuY3Rpb24gZG9Cb3VuZGluZ0JveFBvaW50SW50ZXJzZWN0KGJvdW5kcywgcG9pbnQpIHtcbiAgcmV0dXJuIGRvQm91bmRpbmdCb3hlc0ludGVyc2VjdChib3VuZHMsIHtcbiAgICB4OiBwb2ludC54LFxuICAgIHk6IHBvaW50LnksXG4gICAgd2lkdGg6IDAsXG4gICAgaGVpZ2h0OiAwXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBkb0NpcmNsZVBvaW50SW50ZXJzZWN0KGNpcmNsZSwgcG9pbnQpIHtcbiAgcmV0dXJuIGRvQ2lyY2xlc0ludGVyc2VjdChjaXJjbGUsIHtcbiAgICB4OiBwb2ludC54LFxuICAgIHk6IHBvaW50LnksXG4gICAgcjogMFxuICB9KTtcbn0gLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9HYW1lcy9UZWNobmlxdWVzLzJEX2NvbGxpc2lvbl9kZXRlY3Rpb24jQXhpcy1BbGlnbmVkX0JvdW5kaW5nX0JveFxuXG5cbmZ1bmN0aW9uIGRvQm91bmRpbmdCb3hlc0ludGVyc2VjdChib3gxLCBib3gyKSB7XG4gIHJldHVybiBib3gxLnggPD0gYm94Mi54ICsgYm94Mi53aWR0aCAmJiBib3gxLnggKyBib3gxLndpZHRoID49IGJveDIueCAmJiBib3gxLnkgPD0gYm94Mi55ICsgYm94Mi5oZWlnaHQgJiYgYm94MS55ICsgYm94MS5oZWlnaHQgPj0gYm94Mi55O1xufSAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL0dhbWVzL1RlY2huaXF1ZXMvMkRfY29sbGlzaW9uX2RldGVjdGlvbiNDaXJjbGVfQ29sbGlzaW9uXG5cblxuZnVuY3Rpb24gZG9DaXJjbGVzSW50ZXJzZWN0KGNpcmNsZTEsIGNpcmNsZTIpIHtcbiAgdmFyIGR4ID0gY2lyY2xlMS54IC0gY2lyY2xlMi54O1xuICB2YXIgZHkgPSBjaXJjbGUxLnkgLSBjaXJjbGUyLnk7XG4gIHZhciBkaXN0YW5jZSA9IE1hdGguc3FydChNYXRoLnBvdyhkeCwgMikgKyBNYXRoLnBvdyhkeSwgMikpO1xuICByZXR1cm4gZGlzdGFuY2UgPD0gY2lyY2xlMS5yICsgY2lyY2xlMi5yO1xufSAvLyBodHRwczovL3lhbC5jYy9yZWN0YW5nbGUtY2lyY2xlLWludGVyc2VjdGlvbi10ZXN0L1xuXG5cbmZ1bmN0aW9uIGRvQ2lyY2xlQm91bmRpbmdCb3hJbnRlcnNlY3QoY2lyY2xlLCBib3gpIHtcbiAgdmFyIGR4ID0gY2lyY2xlLnggLSBNYXRoLm1heChib3gueCwgTWF0aC5taW4oY2lyY2xlLngsIGJveC54ICsgYm94LndpZHRoKSk7XG4gIHZhciBkeSA9IGNpcmNsZS55IC0gTWF0aC5tYXgoYm94LnksIE1hdGgubWluKGNpcmNsZS55LCBib3gueSArIGJveC5oZWlnaHQpKTtcbiAgcmV0dXJuIE1hdGgucG93KGR4LCAyKSArIE1hdGgucG93KGR5LCAyKSA8PSBNYXRoLnBvdyhjaXJjbGUuciwgMik7XG59XG5cbmZ1bmN0aW9uIGRvQm91bmRzSW50ZXJzZWN0KGJvdW5kMSwgYm91bmQyKSB7XG4gIHZhciBpc0JvdW5kMUNpcmNsZSA9IGlzQ2lyY2xlKGJvdW5kMSk7XG4gIHZhciBpc0JvdW5kMkNpcmNsZSA9IGlzQ2lyY2xlKGJvdW5kMik7XG4gIHZhciBpc0JvdW5kMUJvdW5kaW5nQm94ID0gaXNCb3VuZGluZ0JveChib3VuZDEpO1xuICB2YXIgaXNCb3VuZDJCb3VuZGluZ0JveCA9IGlzQm91bmRpbmdCb3goYm91bmQyKTtcbiAgdmFyIGlzQm91bmQxUG9pbnQgPSBpc1BvaW50KGJvdW5kMSk7XG4gIHZhciBpc0JvdW5kMlBvaW50ID0gaXNQb2ludChib3VuZDIpOyAvLyBUaGV5IGFyZSBib3RoIGNpcmNsZXNcblxuICBpZiAoaXNCb3VuZDFDaXJjbGUgJiYgaXNCb3VuZDJDaXJjbGUpIHtcbiAgICByZXR1cm4gZG9DaXJjbGVzSW50ZXJzZWN0KGJvdW5kMSwgYm91bmQyKTtcbiAgfSAvLyBUaGV5IGFyZSBib3RoIGJvdW5kaW5nIGJveGVzXG5cblxuICBpZiAoaXNCb3VuZDFCb3VuZGluZ0JveCAmJiBpc0JvdW5kMkJvdW5kaW5nQm94KSB7XG4gICAgcmV0dXJuIGRvQm91bmRpbmdCb3hlc0ludGVyc2VjdChib3VuZDEsIGJvdW5kMik7XG4gIH0gLy8gVGhleSBhcmUgYm90aCBwb2ludHNcblxuXG4gIGlmIChpc0JvdW5kMVBvaW50ICYmIGlzQm91bmQyUG9pbnQpIHtcbiAgICByZXR1cm4gZG9Qb2ludHNJbnRlcnNlY3QoYm91bmQxLCBib3VuZDIpO1xuICB9IC8vIDEgaXMgY2lyY2xlLCAyIGlzIGJvdW5kaW5nIGJveFxuXG5cbiAgaWYgKGlzQm91bmQxQ2lyY2xlICYmIGlzQm91bmQyQm91bmRpbmdCb3gpIHtcbiAgICByZXR1cm4gZG9DaXJjbGVCb3VuZGluZ0JveEludGVyc2VjdChib3VuZDEsIGJvdW5kMik7XG4gIH0gLy8gMSBpcyBjaXJjbGUsIDIgaXMgcG9pbnRcblxuXG4gIGlmIChpc0JvdW5kMUNpcmNsZSAmJiBpc0JvdW5kMlBvaW50KSB7XG4gICAgcmV0dXJuIGRvQ2lyY2xlUG9pbnRJbnRlcnNlY3QoYm91bmQxLCBib3VuZDIpO1xuICB9IC8vIDEgaXMgYm91bmRpbmcgYm94LCAyIGlzIGNpcmNsZVxuXG5cbiAgaWYgKGlzQm91bmQxQm91bmRpbmdCb3ggJiYgaXNCb3VuZDJDaXJjbGUpIHtcbiAgICByZXR1cm4gZG9DaXJjbGVCb3VuZGluZ0JveEludGVyc2VjdChib3VuZDIsIGJvdW5kMSk7XG4gIH0gLy8gMSBpcyBib3VuZGluZyBib3gsIDIgaXMgcG9pbnRcblxuXG4gIGlmIChpc0JvdW5kMUJvdW5kaW5nQm94ICYmIGlzQm91bmQyUG9pbnQpIHtcbiAgICByZXR1cm4gZG9Cb3VuZGluZ0JveFBvaW50SW50ZXJzZWN0KGJvdW5kMSwgYm91bmQyKTtcbiAgfSAvLyAxIGlzIHBvaW50LCAyIGlzIDIgaXMgY2lyY2xlXG5cblxuICBpZiAoaXNCb3VuZDFQb2ludCAmJiBpc0JvdW5kMkNpcmNsZSkge1xuICAgIHJldHVybiBkb0NpcmNsZVBvaW50SW50ZXJzZWN0KGJvdW5kMiwgYm91bmQxKTtcbiAgfSAvLyAxIGlzIHBvaW50LCAyIGlzIGJvdW5kaW5nIGJveFxuXG5cbiAgcmV0dXJuIGRvQm91bmRpbmdCb3hQb2ludEludGVyc2VjdChib3VuZDIsIGJvdW5kMSk7XG59XG5mdW5jdGlvbiBkaXZpZGVCb3VuZGluZ0JveChib3VuZHMpIHtcbiAgdmFyIHF1YWRXaWR0aCA9IGJvdW5kcy53aWR0aCAvIDI7XG4gIHZhciBxdWFkSGVpZ2h0ID0gYm91bmRzLmhlaWdodCAvIDI7XG4gIHZhciBvZmZzZXRYID0gYm91bmRzLnggKyBxdWFkV2lkdGg7XG4gIHZhciBvZmZzZXRZID0gYm91bmRzLnkgKyBxdWFkSGVpZ2h0O1xuICB2YXIgbndCb3VuZGluZ0JveCA9IHtcbiAgICB4OiBib3VuZHMueCxcbiAgICB5OiBib3VuZHMueSxcbiAgICB3aWR0aDogcXVhZFdpZHRoLFxuICAgIGhlaWdodDogcXVhZEhlaWdodFxuICB9O1xuICB2YXIgbmVCb3VuZGluZ0JveCA9IHtcbiAgICB4OiBvZmZzZXRYLFxuICAgIHk6IGJvdW5kcy55LFxuICAgIHdpZHRoOiBxdWFkV2lkdGgsXG4gICAgaGVpZ2h0OiBxdWFkSGVpZ2h0XG4gIH07XG4gIHZhciBzd0JvdW5kaW5nQm94ID0ge1xuICAgIHg6IGJvdW5kcy54LFxuICAgIHk6IG9mZnNldFksXG4gICAgd2lkdGg6IHF1YWRXaWR0aCxcbiAgICBoZWlnaHQ6IHF1YWRIZWlnaHRcbiAgfTtcbiAgdmFyIHNlQm91bmRpbmdCb3ggPSB7XG4gICAgeDogb2Zmc2V0WCxcbiAgICB5OiBvZmZzZXRZLFxuICAgIHdpZHRoOiBxdWFkV2lkdGgsXG4gICAgaGVpZ2h0OiBxdWFkSGVpZ2h0XG4gIH07XG4gIHJldHVybiBbbndCb3VuZGluZ0JveCwgbmVCb3VuZGluZ0JveCwgc3dCb3VuZGluZ0JveCwgc2VCb3VuZGluZ0JveF07XG59XG5mdW5jdGlvbiBjcmVhdGVQb2ludEtleShwb2ludCkge1xuICByZXR1cm4gXCIoXCIuY29uY2F0KHBvaW50LngsIFwiLFwiKS5jb25jYXQocG9pbnQueSwgXCIpXCIpO1xufVxuZnVuY3Rpb24gZmxhdHRlblNldHMoc2V0cykge1xuICB2YXIgZmxhdHRlbmVkU2V0ID0gbmV3IFNldCgpO1xuICAoc2V0cyB8fCBbXSkuZm9yRWFjaChmdW5jdGlvbiAoc2V0KSB7XG4gICAgaWYgKHNldC5zaXplID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc2V0LmZvckVhY2goZnVuY3Rpb24gKHNldEl0ZW0pIHtcbiAgICAgIHJldHVybiBmbGF0dGVuZWRTZXQuYWRkKHNldEl0ZW0pO1xuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIGZsYXR0ZW5lZFNldDtcbn1cblxuZnVuY3Rpb24gYWRkVG9RdWFkVHJlZShxdWFkVHJlZSwgb2JqZWN0KSB7XG4gIHZhciBvYmplY3RCb3VuZCA9IG9iamVjdC5nZXRCb3VuZHMoKTsgLy8gTGV0J3MgZmlyc3QgY2hlY2sgaWYgdGhlIHBvaW50IHRoaXMgb2JqZWN0IG9jY3VwaWVzIGlzIHdpdGhpblxuICAvLyB0aGUgYm91bmRzIG9mIHRoZSBidWNrZXRcblxuICBpZiAoIWRvQm91bmRzSW50ZXJzZWN0KHF1YWRUcmVlLmJvdW5kcywgb2JqZWN0Qm91bmQpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9IC8vIENoZWNraW5nIGNoaWxkcmVuLCBpZiB0aGlzIG5vZGUgaXMgYSBcIkNvbnRhaW5lclwiIChObyBkYXRhKVxuXG5cbiAgaWYgKChxdWFkVHJlZS5xdWFkcmFudHMgfHwgW10pLmxlbmd0aCA+IDApIHtcbiAgICAvLyBSdW4gdGhyb3VnaCBhbGwgY2hpbGRyZW4gY2hlY2tpbmcgaWYgdGhlIG9iamVjdCBjYW4gYmUgYWRkZWRcbiAgICAvLyBBdCB0aGUgZmlyc3Qgc3VjY2Vzc2Z1bCBhZGQsIHdlIGNhbiBiYWlsIG91dCwgb25seSBuZWVkcyB0byBiZSBzdG9yZWQgb25jZVxuICAgIHZhciB3YXNBZGRlZFRvQ2hpbGQgPSBxdWFkVHJlZS5xdWFkcmFudHMuc29tZShmdW5jdGlvbiAocXVhZHJhbnQpIHtcbiAgICAgIHJldHVybiBhZGRUb1F1YWRUcmVlKHF1YWRyYW50LCBvYmplY3QpO1xuICAgIH0pOyAvLyBPbmx5IGxlYWYgbm9kZXMgc2hvdWxkIGhhdmUgZGF0YSAoV2UgYXJlIGEgXCJDb250YWluZXIgbm9kZVwiKVxuICAgIC8vIElmIGl0IGRpZG4ndCBpbnRlcnNlY3Qgd2l0aCBhbnkgY2hpbGQsIGl0IHdvbid0IGludGVyc2VjdCB3aXRoIHVzXG5cbiAgICByZXR1cm4gd2FzQWRkZWRUb0NoaWxkO1xuICB9IC8vIExldCdzIGdldCB0aGUgZGF0YSBhbHJlYWR5IGFzc29jaWF0ZWQgd2l0aCB0aGlzIGJ1Y2tldFxuXG5cbiAgdmFyIG9iamVjdFBvaW50S2V5ID0gY3JlYXRlUG9pbnRLZXkob2JqZWN0Qm91bmQpO1xuICB2YXIgb2JqZWN0UG9pbnRTZXQgPSBxdWFkVHJlZS5kYXRhLmdldChvYmplY3RQb2ludEtleSkgfHwgbmV3IFNldCgpOyAvLyBMZXQncyBjaGVjayBpZiB0aGUgb2JqZWN0IGlzIGFscmVhZHkgaW4gdGhlIGJ1Y2tldFxuXG4gIGlmIChvYmplY3RQb2ludFNldC5oYXMob2JqZWN0KSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSAvLyBMZXQncyBzZWUgaWYgdGhpcyBxdWFkcmFudCBoYXMgYW55IGNhcGFjaXR5XG4gIC8vIElmIGl0IGRvZXMsIHdlIGNhbiBnbyBhaGVhZCBhbmQgc3RvcmUgdGhlIGN1cnJlbnQgb2JqZWN0XG4gIC8vXG4gIC8vIFdlIGFsc28gd2FubmEgZ28gYWhlYWQgYW5kIGFkZCwgaWYgdGhpcyBwb2ludCAoeCwgeSkgaGFzIGFscmVhZHlcbiAgLy8gaGFkIGFuIG9iamVjdCBhZGRlZCwgd2UnbGwgY2hhaW4gaXQgb24gdG8gdGhlIGxpc3Qgb2Ygb2JqZWN0cyBcbiAgLy8gYXNzb2NpYXRlZCB3aXRoIHRoaXMgcG9pbnRcblxuXG4gIGlmIChvYmplY3RQb2ludFNldC5zaXplID4gMCB8fCBxdWFkVHJlZS5kYXRhLnNpemUgKyAxIDw9IHF1YWRUcmVlLmNhcGFjaXR5KSB7XG4gICAgb2JqZWN0UG9pbnRTZXQuYWRkKG9iamVjdCk7XG4gICAgcXVhZFRyZWUuZGF0YS5zZXQob2JqZWN0UG9pbnRLZXksIG9iamVjdFBvaW50U2V0KTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSAvLyBUaGUgY3VycmVudCBub2RlIGZpdHMgdGhlIGN1cnJlbnQgb2JqZWN0LCBidXRcbiAgLy8gVGhlcmUgaXNuJ3QgYW55IGNhcGFjaXR5XG4gIC8vIFdlIG5lZWQgdG8gc3BsaXQgdGhpcyBidWNrZXQgdXBcbiAgLy8gTGV0J3MgZmlyc3QgYnVpbGQgdGhlIGNoaWxkIHF1YWRyYW50c1xuICAvLyBMZXQncyBjcmVhdGUgdGhlIGNoaWxkIFF1YWRUcmVlJ3MgZnJvbSB0aGUgZGl2aWRlZCBxdWFkcmFudCBib3VuZHNcblxuXG4gIHZhciBxdWFkQm94ZXMgPSBkaXZpZGVCb3VuZGluZ0JveChxdWFkVHJlZS5ib3VuZHMpO1xuICB2YXIgcXVhZHJhbnRzID0gcXVhZEJveGVzLm1hcChmdW5jdGlvbiAocXVhZEJveCkge1xuICAgIHJldHVybiBjcmVhdGVRdWFkVHJlZShxdWFkQm94LCBxdWFkVHJlZS5jYXBhY2l0eSk7XG4gIH0pO1xuICB2YXIgcXVhZE9iamVjdHMgPSBbXS5jb25jYXQoX3RvQ29uc3VtYWJsZUFycmF5KGdldFF1YWRUcmVlRGF0YShxdWFkVHJlZSkpLCBbb2JqZWN0XSk7IC8vIGFkanVzdCBjdXJyZW50IHF1YWR0cmVlIHNldHRpbmdzXG4gIC8vIE1heSBuZWVkIHRvIGFkanVzdCB0aGVzZSBpbi1wbGFjZSBpbnN0ZWFkIG9mIGNyZWF0aW5nIG5ldyByZWZlcmVuY2VzXG5cbiAgY2xlYXJRdWFkVHJlZShxdWFkVHJlZSk7XG4gIHF1YWRUcmVlLnF1YWRyYW50cyA9IHF1YWRyYW50czsgLy8gYWRkIG9iamVjdHMgZnJvbSB0aGlzIHF1YWQgbm9kZSBiYWNrIHRvIGl0J3Mgb3duIHN1YnRyZWVcbiAgLy8gY2hpbGRyZW4gd2lsbCBiZSBhdHRlbXB0ZWQgdG8gYmUgYWRkZWQgdG8gZmlyc3RcblxuICByZXR1cm4gcXVhZE9iamVjdHMuZXZlcnkoZnVuY3Rpb24gKHF1YWRPYmplY3QpIHtcbiAgICByZXR1cm4gYWRkVG9RdWFkVHJlZShxdWFkVHJlZSwgcXVhZE9iamVjdCk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiByZW1vdmVGcm9tUXVhZFRyZWUocXVhZFRyZWUsIG9iamVjdCkge1xuICB2YXIgb2JqZWN0Qm91bmQgPSBvYmplY3QuZ2V0Qm91bmRzKCk7XG4gIHZhciBvYmplY3RQb2ludEtleSA9IGNyZWF0ZVBvaW50S2V5KG9iamVjdEJvdW5kKTtcbiAgdmFyIG9iamVjdFBvaW50U2V0ID0gcXVhZFRyZWUuZGF0YS5nZXQob2JqZWN0UG9pbnRLZXkpIHx8IG5ldyBTZXQoKTsgLy8gSWYgb2JqZWN0IGlzIGZvdW5kLCBsZXQncyByZW1vdmUgaXRcblxuICBpZiAob2JqZWN0UG9pbnRTZXQuaGFzKG9iamVjdCkpIHtcbiAgICBvYmplY3RQb2ludFNldFtcImRlbGV0ZVwiXShvYmplY3QpOyAvLyBJZiB0aGVyZSB3ZXJlIG11bHRpcGxlIG9iamVjdHMgYXQgdGhpcyBwb2ludFxuICAgIC8vIHdlIGRvbid0IG5lZWQgdG8gcmVtb3ZlIHRoaXMgcG9pbnQga2V5XG5cbiAgICBpZiAob2JqZWN0UG9pbnRTZXQuc2l6ZSA+IDApIHtcbiAgICAgIHF1YWRUcmVlLmRhdGEuc2V0KG9iamVjdFBvaW50S2V5LCBvYmplY3RQb2ludFNldCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHF1YWRUcmVlLmRhdGFbXCJkZWxldGVcIl0ob2JqZWN0UG9pbnRLZXkpO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9IC8vIENoZWNrIGNoaWxkcmVuIHRvIGZpbmQgb2JqZWN0IGFuZCByZW1vdmUgaWYgZm91bmRcblxuXG4gIHZhciB3YXNSZW1vdmVkID0gcXVhZFRyZWUucXVhZHJhbnRzLnNvbWUoZnVuY3Rpb24gKHF1YWRyYW50KSB7XG4gICAgcmV0dXJuIHJlbW92ZUZyb21RdWFkVHJlZShxdWFkcmFudCwgb2JqZWN0KTtcbiAgfSk7IC8vIElmIG9uZSBvZiB0aGUgY2hpbGRyZW4gY29udGFpbmVkIHRoZSBvYmplY3Qgd2UganVzdCByZW1vdmVkXG4gIC8vIExldCdzIHF1ZXJ5IHRoZSBib3VuZGluZyBib3ggb2YgdXMgKHRoZSBwYXJlbnQpIHRvIHNlZSBpZiB3ZSBcbiAgLy8gY2FuIGNvbGxhcHNlIG9yIGNvbnN1bWUgb3VyIGNoaWxkcmVuLiBNZWFuaW5nIHRoZSBjaGlsZCBzdWJ0cmVlXG4gIC8vIGNvbnRhaW5zIGxlc3MgZWxlbWVudHMgdGhhbiBvdXIgaW5kaXZpZHVhbCBidWNrZXQgY2FwYWNpdHkuXG5cbiAgaWYgKHdhc1JlbW92ZWQpIHtcbiAgICB2YXIgY2hpbGRPYmplY3RTZXQgPSBxdWVyeVF1YWRUcmVlKHF1YWRUcmVlLCBxdWFkVHJlZS5ib3VuZHMpO1xuXG4gICAgaWYgKGNoaWxkT2JqZWN0U2V0LnNpemUgPD0gcXVhZFRyZWUuY2FwYWNpdHkpIHtcbiAgICAgIGNsZWFyUXVhZFRyZWUocXVhZFRyZWUpO1xuICAgICAgY2hpbGRPYmplY3RTZXQuZm9yRWFjaChmdW5jdGlvbiAoY2hpbGRPYmplY3QpIHtcbiAgICAgICAgcmV0dXJuIGFkZFRvUXVhZFRyZWUocXVhZFRyZWUsIGNoaWxkT2JqZWN0KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB3YXNSZW1vdmVkO1xufVxuXG5mdW5jdGlvbiBjbGVhclF1YWRUcmVlKHF1YWRUcmVlKSB7XG4gIHF1YWRUcmVlLmRhdGEgPSBuZXcgTWFwKCk7XG4gIHF1YWRUcmVlLnF1YWRyYW50cyA9IFtdO1xufVxuXG5mdW5jdGlvbiBxdWVyeVF1YWRUcmVlKHF1YWRUcmVlLCBib3VuZHMpIHtcbiAgLy8gQ2hlY2sgZmlyc3QgaWYgdGhlIHF1ZXJ5IGJvdW5kcyBpbnRlcnNlY3Qgd2l0aCB0aGUgYm91bmRzXG4gIC8vIG9mIHRoZSBidWNrZXQsIGlmIGl0IGRvZXNuJ3Qgd2UgY2FuIGJhaWwgaW1tZWRpYXRlbHkgd2l0aCBhbiBlbXB0eSBsaXN0XG4gIGlmICghZG9Cb3VuZHNJbnRlcnNlY3QocXVhZFRyZWUuYm91bmRzLCBib3VuZHMpKSB7XG4gICAgcmV0dXJuIG5ldyBTZXQoKTtcbiAgfSAvLyBDaGVjayBpZiBjdXJyZW50IG5vZGUgaGFzIGNoaWxkcmVuXG5cblxuICBpZiAoKHF1YWRUcmVlLnF1YWRyYW50cyB8fCBbXSkubGVuZ3RoID09PSAwKSB7XG4gICAgLy8gTGV0J3MgaXRlcmF0ZSBvdmVyIHRoZSBkYXRhIGluIHRoZSBidWNrZXQgdG8gc2VlXG4gICAgLy8gaWYgdGhlIG9iamVjdHMgdGhlbXNlbHZlcyBpbnRlcnNlY3Qgd2l0aCB0aGUgcXVlcnkgYm91bmRzXG4gICAgcmV0dXJuIG5ldyBTZXQoZ2V0UXVhZFRyZWVEYXRhKHF1YWRUcmVlKS5maWx0ZXIoZnVuY3Rpb24gKHF1YWRPYmplY3QpIHtcbiAgICAgIHJldHVybiBkb0JvdW5kc0ludGVyc2VjdChxdWFkT2JqZWN0LmdldEJvdW5kcygpLCBib3VuZHMpO1xuICAgIH0pKTtcbiAgfSAvLyBDaGVjayB0aGUgY3VycmVudCBub2RlcyBjaGlsZHJlblxuICAvLyBxdWVyeWluZyB0aGVtIGZvciB0aGUgc2FtZSBpbmZvIGFuZCBjb2xsZWN0aW5nXG4gIC8vIHRoZSByZXN1bHRzXG5cblxuICB2YXIgY2hpbGRRdWVyeVJlc3VsdFNldCA9IGZsYXR0ZW5TZXRzKHF1YWRUcmVlLnF1YWRyYW50cy5tYXAoZnVuY3Rpb24gKHF1YWRyYW50KSB7XG4gICAgcmV0dXJuIHF1ZXJ5UXVhZFRyZWUocXVhZHJhbnQsIGJvdW5kcyk7XG4gIH0pKTtcbiAgcmV0dXJuIGNoaWxkUXVlcnlSZXN1bHRTZXQ7XG59XG5cbmZ1bmN0aW9uIGdldFF1YWRUcmVlRGF0YShxdWFkVHJlZSkge1xuICByZXR1cm4gX3RvQ29uc3VtYWJsZUFycmF5KGZsYXR0ZW5TZXRzKF90b0NvbnN1bWFibGVBcnJheShxdWFkVHJlZS5kYXRhLnZhbHVlcygpKSkpO1xufVxuLyoqXG4gKiBDcmVhdGVzIGEgcXVhZHRyZWUgXCJtYW5hZ2luZ1wiIHRoZSBpbnB1dCBib3VuZHMgd2l0aCBpbnB1dCBub2RlIGNhcGFjaXR5LlxuICogXG4gKiBBbGwgY29sbGlzaW9uIG9iamVjdHMgc2hvdWxkIGludGVyc2VjdCBvciBiZSBjb250YWluZWQgd2l0aGluIHRoZXNlIFwibWFuYWdlZFwiIGJvdW5kcy5cbiAqIEBwYXJhbSB7Qm91bmRpbmdCb3h9IGJvdW5kcyAtIFRoZSBib3VuZGluZyBib3ggd2l0aCB3aGljaCB0aGUgcXVhZHRyZWUgXCJtYW5hZ2VzXCIuXG4gKiBAcGFyYW0ge251bWJlcn0gW2NhcGFjaXR5PTNdIC0gVGhlICMgb2YgY29sbGlzaW9uIG9iamVjdHMgYSBub2RlIGNhbiBjb250YWluIGJlZm9yZSBzdWJkaXZpZGluZy5cbiAqIEByZXR1cm4ge1F1YWRUcmVlfSBUaGUgY3JlYXRlZCBxdWFkdHJlZSBcIm1hbmFnaW5nXCIgdGhlIGlucHV0IGJvdW5kcy5cbiAqL1xuXG5cbmZ1bmN0aW9uIGNyZWF0ZVF1YWRUcmVlKGJvdW5kcykge1xuICB2YXIgY2FwYWNpdHkgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IDM7XG4gIHZhciBxdWFkVHJlZSA9IHtcbiAgICBib3VuZHM6IGJvdW5kcyxcbiAgICBkYXRhOiBuZXcgTWFwKCksXG4gICAgY2FwYWNpdHk6IGNhcGFjaXR5LFxuICAgIHF1YWRyYW50czogW10sXG4gICAgYWRkOiBmdW5jdGlvbiBhZGQob2JqZWN0KSB7XG4gICAgICByZXR1cm4gYWRkVG9RdWFkVHJlZShxdWFkVHJlZSwgb2JqZWN0KTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKG9iamVjdCkge1xuICAgICAgcmV0dXJuIHJlbW92ZUZyb21RdWFkVHJlZShxdWFkVHJlZSwgb2JqZWN0KTtcbiAgICB9LFxuICAgIGNsZWFyOiBmdW5jdGlvbiBjbGVhcigpIHtcbiAgICAgIHJldHVybiBjbGVhclF1YWRUcmVlKHF1YWRUcmVlKTtcbiAgICB9LFxuICAgIHF1ZXJ5OiBmdW5jdGlvbiBxdWVyeShib3VuZHMpIHtcbiAgICAgIHJldHVybiBxdWVyeVF1YWRUcmVlKHF1YWRUcmVlLCBib3VuZHMpO1xuICAgIH0sXG4gICAgZ2V0RGF0YTogZnVuY3Rpb24gZ2V0RGF0YSgpIHtcbiAgICAgIHJldHVybiBnZXRRdWFkVHJlZURhdGEocXVhZFRyZWUpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHF1YWRUcmVlO1xufVxuXG5leHBvcnQgeyBjcmVhdGVRdWFkVHJlZSB9O1xuIiwiaW1wb3J0IHsgUGl4ZWwsIENvbG9yIH0gZnJvbSAnLi9zY2hlbWEnO1xuaW1wb3J0IEdJRiBmcm9tICdnaWYuanMnO1xuXG5leHBvcnQgY29uc3QgUElYRUxfV0lEVEg6IG51bWJlciA9IDQ7XG5leHBvcnQgY29uc3QgV0hJVEVfQ09MT1I6IENvbG9yID0ge1xuICAgIHI6IDI1NSxcbiAgICBnOiAyNTUsXG4gICAgYjogMjU1LFxuICAgIGE6IDI1NSxcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2FkSW1hZ2UoaW1hZ2VGaWxlOiBGaWxlKTogUHJvbWlzZTxIVE1MSW1hZ2VFbGVtZW50PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgY29uc3QgaW1hZ2VGaWxlRGF0YVVybCA9IHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKGltYWdlRmlsZSk7XG4gICAgICAgIGNvbnN0IGltYWdlID0gbmV3IEltYWdlKCk7XG5cbiAgICAgICAgaW1hZ2Uub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgd2luZG93LlVSTC5yZXZva2VPYmplY3RVUkwoaW1hZ2VGaWxlRGF0YVVybCk7XG4gICAgICAgICAgICByZXNvbHZlKGltYWdlKVxuICAgICAgICB9O1xuICAgICAgICBpbWFnZS5vbmVycm9yID0gKGVycikgPT4ge1xuICAgICAgICAgICAgd2luZG93LlVSTC5yZXZva2VPYmplY3RVUkwoaW1hZ2VGaWxlRGF0YVVybCk7XG4gICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfTtcbiAgICAgICAgaW1hZ2Uuc3JjID0gaW1hZ2VGaWxlRGF0YVVybDtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEF2ZXJhZ2VDb2xvcihwaXhlbHM6IFBpeGVsW10pOiBDb2xvciB7XG4gICAgbGV0IHNxdWFyZWRTdW1SOiBudW1iZXI7XG4gICAgbGV0IHNxdWFyZWRTdW1HOiBudW1iZXI7XG4gICAgbGV0IHNxdWFyZWRTdW1COiBudW1iZXI7XG4gICAgbGV0IHNxdWFyZWRTdW1BOiBudW1iZXI7XG4gICAgbGV0IGF2ZXJhZ2VDb2xvcjogQ29sb3IgPSBwaXhlbHNbMF0gfHwgV0hJVEVfQ09MT1I7XG5cbiAgICBpZiAocGl4ZWxzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgcmV0dXJuIHBpeGVscy5zbGljZSgxKVxuICAgICAgICAgICAgLnJlZHVjZSgocHJldkF2ZXJhZ2U6IENvbG9yLCBjdXJyUGl4ZWw6IFBpeGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgc3F1YXJlZFN1bVIgPSBNYXRoLnBvdyhwcmV2QXZlcmFnZS5yLCAyKSArIE1hdGgucG93KGN1cnJQaXhlbC5yLCAyKTtcbiAgICAgICAgICAgICAgICBzcXVhcmVkU3VtRyA9IE1hdGgucG93KHByZXZBdmVyYWdlLmcsIDIpICsgTWF0aC5wb3coY3VyclBpeGVsLmcsIDIpO1xuICAgICAgICAgICAgICAgIHNxdWFyZWRTdW1CID0gTWF0aC5wb3cocHJldkF2ZXJhZ2UuYiwgMikgKyBNYXRoLnBvdyhjdXJyUGl4ZWwuYiwgMik7XG4gICAgICAgICAgICAgICAgc3F1YXJlZFN1bUEgPSBNYXRoLnBvdyhwcmV2QXZlcmFnZS5hLCAyKSArIE1hdGgucG93KGN1cnJQaXhlbC5hLCAyKTtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICByOiBNYXRoLnNxcnQoc3F1YXJlZFN1bVIgLyAyKSxcbiAgICAgICAgICAgICAgICAgICAgZzogTWF0aC5zcXJ0KHNxdWFyZWRTdW1HIC8gMiksXG4gICAgICAgICAgICAgICAgICAgIGI6IE1hdGguc3FydChzcXVhcmVkU3VtQiAvIDIpLFxuICAgICAgICAgICAgICAgICAgICBhOiBNYXRoLnNxcnQoc3F1YXJlZFN1bUEgLyAyKSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSwgYXZlcmFnZUNvbG9yKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXZlcmFnZUNvbG9yO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVQaXhlbCh4OiBudW1iZXIsIHk6IG51bWJlciwgcjogbnVtYmVyLCBnOiBudW1iZXIsIGI6IG51bWJlciwgYTogbnVtYmVyKTogUGl4ZWwge1xuICAgIHJldHVybiB7XG4gICAgICAgIHgsXG4gICAgICAgIHksXG4gICAgICAgIHIsXG4gICAgICAgIGcsXG4gICAgICAgIGIsXG4gICAgICAgIGEsXG4gICAgICAgIGdldEJvdW5kcygpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgeDogdGhpcy54LFxuICAgICAgICAgICAgICAgIHk6IHRoaXMueSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQaXhlbHMoaW1hZ2VEYXRhOiBJbWFnZURhdGEpOiBQaXhlbFtdIHtcbiAgICBsZXQgcGl4ZWxzOiBQaXhlbFtdID0gW107XG4gICAgcHJvY2Vzc0ltYWdlRGF0YShpbWFnZURhdGEsIHBpeGVsID0+IHBpeGVscy5wdXNoKHBpeGVsKSk7XG4gICAgcmV0dXJuIHBpeGVscztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbGxQaXhlbEluSW1hZ2VEYXRhKGltYWdlRGF0YTogSW1hZ2VEYXRhLCBwaXhlbDogUGl4ZWwpOiB2b2lkIHtcbiAgICBjb25zdCBwaXhlbE9mZnNldDogbnVtYmVyID0gKHBpeGVsLnggKyBwaXhlbC55ICogaW1hZ2VEYXRhLndpZHRoKSAqIFBJWEVMX1dJRFRIO1xuICAgIGlmIChwaXhlbE9mZnNldCA8IDAgfHwgcGl4ZWxPZmZzZXQgKyBQSVhFTF9XSURUSCA+PSBpbWFnZURhdGEuZGF0YS5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpbWFnZURhdGEuZGF0YVtwaXhlbE9mZnNldF0gPSBwaXhlbC5yO1xuICAgIGltYWdlRGF0YS5kYXRhW3BpeGVsT2Zmc2V0ICsgMV0gPSBwaXhlbC5nO1xuICAgIGltYWdlRGF0YS5kYXRhW3BpeGVsT2Zmc2V0ICsgMl0gPSBwaXhlbC5iO1xuICAgIGltYWdlRGF0YS5kYXRhW3BpeGVsT2Zmc2V0ICsgM10gPSBwaXhlbC5hO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SW1hZ2VEYXRhT2ZmU2NyZWVuKGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50LCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcik6IEltYWdlRGF0YSB7XG4gICAgY29uc3QgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgIGNvbnN0IGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpIGFzIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcblxuICAgIGNhbnZhcy53aWR0aCA9IHdpZHRoO1xuICAgIGNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XG5cbiAgICBjb250ZXh0LmRyYXdJbWFnZShpbWFnZSwgMCwgMCwgaW1hZ2Uud2lkdGgsIGltYWdlLmhlaWdodCwgMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcblxuICAgIGNvbnN0IGltYWdlRGF0YTogSW1hZ2VEYXRhID0gY29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgICByZXR1cm4gaW1hZ2VEYXRhO1xufVxuXG5mdW5jdGlvbiBwcm9jZXNzSW1hZ2VEYXRhKGltYWdlRGF0YTogSW1hZ2VEYXRhLCBwcm9jZXNzRnVuYzogKHBpeGVsOiBQaXhlbCkgPT4gdm9pZCwgaW5pdFBpeGVsWDogbnVtYmVyID0gMCwgaW5pdFBpeGVsWTogbnVtYmVyID0gMCk6IHZvaWQge1xuICAgIGxldCByOiBudW1iZXI7XG4gICAgbGV0IGc6IG51bWJlcjtcbiAgICBsZXQgYjogbnVtYmVyO1xuICAgIGxldCBhOiBudW1iZXI7XG4gICAgbGV0IG9mZnNldFg6IG51bWJlcjtcbiAgICBsZXQgb2Zmc2V0WTogbnVtYmVyO1xuICAgIGxldCBwaXhlbDogUGl4ZWw7XG5cbiAgICBmb3IgKGxldCB4ID0gaW5pdFBpeGVsWDsgeCA8IGltYWdlRGF0YS53aWR0aDsgeCsrKSB7XG4gICAgICAgIG9mZnNldFggPSB4ICogUElYRUxfV0lEVEg7XG5cbiAgICAgICAgZm9yIChsZXQgeSA9IGluaXRQaXhlbFk7IHkgPCBpbWFnZURhdGEuaGVpZ2h0OyB5KyspIHtcbiAgICAgICAgICAgIG9mZnNldFkgPSBpbWFnZURhdGEud2lkdGggKiB5ICogUElYRUxfV0lEVEg7XG5cbiAgICAgICAgICAgIHIgPSBpbWFnZURhdGEuZGF0YVtvZmZzZXRYICsgb2Zmc2V0WV07XG4gICAgICAgICAgICBnID0gaW1hZ2VEYXRhLmRhdGFbb2Zmc2V0WCArIG9mZnNldFkgKyAxXTtcbiAgICAgICAgICAgIGIgPSBpbWFnZURhdGEuZGF0YVtvZmZzZXRYICsgb2Zmc2V0WSArIDJdO1xuICAgICAgICAgICAgYSA9IGltYWdlRGF0YS5kYXRhW29mZnNldFggKyBvZmZzZXRZICsgM107XG5cbiAgICAgICAgICAgIHBpeGVsID0gY3JlYXRlUGl4ZWwoeCwgeSwgciwgZywgYiwgYSk7XG4gICAgICAgICAgICBwcm9jZXNzRnVuYyhwaXhlbCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b0dpZihpbWFnZUZyYW1lczogSW1hZ2VEYXRhW10pOiB2b2lkIHtcbiAgICBjb25zdCBnaWYgPSBuZXcgR0lGKHtcbiAgICAgICAgd29ya2VyczogMixcbiAgICAgICAgcXVhbGl0eTogMTBcbiAgICB9KTtcblxuICAgIGltYWdlRnJhbWVzXG4gICAgICAgIC5mb3JFYWNoKGltYWdlRnJhbWUgPT4gZ2lmLmFkZEZyYW1lKGltYWdlRnJhbWUsIHtcbiAgICAgICAgICAgIGRlbGF5OiAyMDAsXG4gICAgICAgIH0pKTtcblxuICAgIGdpZi5vbignZmluaXNoZWQnLCAoYmxvYjogYW55KSA9PiB7XG4gICAgICAgIHNhdmVCbG9iKCdzaW1wbGVxdWFkLmV4cG9ydC5naWYnLCBibG9iKTtcbiAgICB9KTtcblxuICAgIGdpZi5yZW5kZXIoKTtcbn1cblxuZnVuY3Rpb24gc2F2ZUJsb2IoZmlsZU5hbWU6IHN0cmluZywgYmxvYjogQmxvYikge1xuICAgIGNvbnN0IGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgICBjb25zdCB1cmwgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcblxuICAgIGEuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIGEuaHJlZiA9IHVybDtcbiAgICBhLmRvd25sb2FkID0gZmlsZU5hbWU7XG4gICAgXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChhKTtcbiAgICBhLmNsaWNrKCk7XG5cbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGEpO1xuICAgIHdpbmRvdy5VUkwucmV2b2tlT2JqZWN0VVJMKHVybCk7XG59Il0sInNvdXJjZVJvb3QiOiIifQ==