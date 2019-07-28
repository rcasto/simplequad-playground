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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1YWQud29ya2VyLnRzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9naWYuanMvZGlzdC9naWYuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NpbXBsZXF1YWQvZGlzdC9zaW1wbGVxdWFkLmVzbS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC50cyJdLCJuYW1lcyI6WyJwcm9jZXNzZWRNZXNzYWdlIiwidHlwZSIsImJ1aWxkUXVhZFRyZWVGcm9tUGl4ZWxzIiwiaW1hZ2VEYXRhIiwiYm91bmRzIiwiY2FwYWNpdHkiLCJwaXhlbHMiLCJjcmVhdGVQaXhlbHMiLCJxdWFkVHJlZSIsImNyZWF0ZVF1YWRUcmVlIiwiZm9yRWFjaCIsInBpeGVsIiwiYWRkIiwiZmlsbEltYWdlRGF0YUZyb21RdWFkVHJlZSIsInF1YWRyYW50cyIsImxlbmd0aCIsInF1YWRyYW50IiwiZ2V0RGF0YSIsImF2ZXJhZ2VDb2xvciIsImdldEF2ZXJhZ2VDb2xvciIsImZpbGxQaXhlbEluSW1hZ2VEYXRhIiwicmVxdWVzdERyYXciLCJtZXNzYWdlIiwiZGF0YSIsImNyZWF0ZUltYWdlIiwicG9zdE1lc3NhZ2UiLCJwcm9jZXNzSW1hZ2UiLCJ3aWR0aCIsImhlaWdodCIsIm5ld0ltYWdlRGF0YSIsIkltYWdlRGF0YSIsIngiLCJ5Iiwid29ya2VyIiwic2VsZiIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsImNvbnNvbGUiLCJlcnJvciIsIlBJWEVMX1dJRFRIIiwiV0hJVEVfQ09MT1IiLCJyIiwiZyIsImIiLCJhIiwibG9hZEltYWdlIiwiaW1hZ2VGaWxlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJpbWFnZUZpbGVEYXRhVXJsIiwid2luZG93IiwiVVJMIiwiY3JlYXRlT2JqZWN0VVJMIiwiaW1hZ2UiLCJJbWFnZSIsIm9ubG9hZCIsInJldm9rZU9iamVjdFVSTCIsIm9uZXJyb3IiLCJlcnIiLCJzcmMiLCJzcXVhcmVkU3VtUiIsInNxdWFyZWRTdW1HIiwic3F1YXJlZFN1bUIiLCJzcXVhcmVkU3VtQSIsInNsaWNlIiwicmVkdWNlIiwicHJldkF2ZXJhZ2UiLCJjdXJyUGl4ZWwiLCJNYXRoIiwicG93Iiwic3FydCIsImNyZWF0ZVBpeGVsIiwiZ2V0Qm91bmRzIiwicHJvY2Vzc0ltYWdlRGF0YSIsInB1c2giLCJwaXhlbE9mZnNldCIsImdldEltYWdlRGF0YU9mZlNjcmVlbiIsImNhbnZhcyIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImNvbnRleHQiLCJnZXRDb250ZXh0IiwiZHJhd0ltYWdlIiwiZ2V0SW1hZ2VEYXRhIiwicHJvY2Vzc0Z1bmMiLCJpbml0UGl4ZWxYIiwiaW5pdFBpeGVsWSIsIm9mZnNldFgiLCJvZmZzZXRZIiwidG9HaWYiLCJpbWFnZUZyYW1lcyIsImdpZiIsIkdJRiIsIndvcmtlcnMiLCJxdWFsaXR5IiwiaW1hZ2VGcmFtZSIsImFkZEZyYW1lIiwiZGVsYXkiLCJvbiIsImJsb2IiLCJzYXZlQmxvYiIsInJlbmRlciIsImZpbGVOYW1lIiwidXJsIiwic3R5bGUiLCJkaXNwbGF5IiwiaHJlZiIsImRvd25sb2FkIiwiYm9keSIsImFwcGVuZENoaWxkIiwiY2xpY2siLCJyZW1vdmVDaGlsZCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QUM7OztBQUdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7QUFHRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQzs7QUFFdEM7QUFDQTtBQUNBLEdBQUc7OztBQUdIO0FBQ0E7QUFDQSxHQUFHOzs7QUFHSDtBQUNBO0FBQ0EsR0FBRzs7O0FBR0g7QUFDQTtBQUNBLEdBQUc7OztBQUdIO0FBQ0E7QUFDQSxHQUFHOzs7QUFHSDtBQUNBO0FBQ0EsR0FBRzs7O0FBR0g7QUFDQTtBQUNBLEdBQUc7OztBQUdIO0FBQ0E7QUFDQSxHQUFHOzs7QUFHSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBLHVDQUF1QztBQUN2Qzs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7O0FBR0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUssRUFBRTtBQUNQOztBQUVBO0FBQ0EsR0FBRzs7O0FBR0g7QUFDQSxzRUFBc0U7O0FBRXRFO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gscUhBQXFIO0FBQ3JIOztBQUVBO0FBQ0EsaUNBQWlDO0FBQ2pDOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esc0VBQXNFOztBQUV0RTtBQUNBLHFDQUFx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QUEwQkQsSUFBMUIsQ0FBUjtBQUNILEdBRkQ7QUFJQVIsS0FBRyxDQUFDVSxNQUFKO0FBQ0g7O0FBRUQsU0FBU0QsUUFBVCxDQUFrQkUsUUFBbEIsRUFBb0NILElBQXBDLEVBQWdEO0FBQzVDLE1BQU14RCxDQUFDLEdBQUdtQyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsR0FBdkIsQ0FBVjtBQUNBLE1BQU13QixHQUFHLEdBQUdyRCxNQUFNLENBQUNDLEdBQVAsQ0FBV0MsZUFBWCxDQUEyQitDLElBQTNCLENBQVo7QUFFQXhELEdBQUMsQ0FBQzZELEtBQUYsQ0FBUUMsT0FBUixHQUFrQixNQUFsQjtBQUNBOUQsR0FBQyxDQUFDK0QsSUFBRixHQUFTSCxHQUFUO0FBQ0E1RCxHQUFDLENBQUNnRSxRQUFGLEdBQWFMLFFBQWI7QUFFQXhCLFVBQVEsQ0FBQzhCLElBQVQsQ0FBY0MsV0FBZCxDQUEwQmxFLENBQTFCO0FBQ0FBLEdBQUMsQ0FBQ21FLEtBQUY7QUFFQWhDLFVBQVEsQ0FBQzhCLElBQVQsQ0FBY0csV0FBZCxDQUEwQnBFLENBQTFCO0FBQ0FPLFFBQU0sQ0FBQ0MsR0FBUCxDQUFXSyxlQUFYLENBQTJCK0MsR0FBM0I7QUFDSCxDIiwiZmlsZSI6ImI5MDY5MjhlNzZkMTEwN2ZlNGFkLndvcmtlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanMhLi9zcmMvcXVhZC53b3JrZXIudHNcIik7XG4iLCJpbXBvcnQgeyBRdWFkV29ya2VyRGF0YU1lc3NhZ2UsIFBpeGVsLCBDb2xvciwgUXVhZFdvcmtlck1lc3NhZ2UgfSBmcm9tICcuL3NjaGVtYSc7XG5pbXBvcnQgeyBRdWFkVHJlZSwgY3JlYXRlUXVhZFRyZWUsIEJvdW5kaW5nQm94IH0gZnJvbSAnc2ltcGxlcXVhZCc7XG5pbXBvcnQgeyBjcmVhdGVQaXhlbHMsIGdldEF2ZXJhZ2VDb2xvciwgZmlsbFBpeGVsSW5JbWFnZURhdGEgfSBmcm9tICcuL3V0aWwnO1xuXG5jb25zdCBwcm9jZXNzZWRNZXNzYWdlOiBRdWFkV29ya2VyTWVzc2FnZSA9IHtcbiAgICB0eXBlOiAncHJvY2Vzc2VkJyxcbn07XG5cbmZ1bmN0aW9uIGJ1aWxkUXVhZFRyZWVGcm9tUGl4ZWxzKGltYWdlRGF0YTogSW1hZ2VEYXRhLCBib3VuZHM6IEJvdW5kaW5nQm94LCBjYXBhY2l0eTogbnVtYmVyKTogUXVhZFRyZWU8UGl4ZWw+IHtcbiAgICBjb25zdCBwaXhlbHM6IFBpeGVsW10gPSBjcmVhdGVQaXhlbHMoaW1hZ2VEYXRhKTtcbiAgICBjb25zdCBxdWFkVHJlZTogUXVhZFRyZWU8UGl4ZWw+ID0gY3JlYXRlUXVhZFRyZWUoYm91bmRzLCBjYXBhY2l0eSk7XG5cbiAgICAvLyBCdWlsZCBxdWFkdHJlZSB3aXRoIHRoaXMgY2FwYWNpdHkgZnJvbSBwaXhlbHNcbiAgICBwaXhlbHMuZm9yRWFjaChwaXhlbCA9PiBxdWFkVHJlZS5hZGQocGl4ZWwpKTtcblxuICAgIHJldHVybiBxdWFkVHJlZTtcbn1cblxuZnVuY3Rpb24gZmlsbEltYWdlRGF0YUZyb21RdWFkVHJlZShpbWFnZURhdGE6IEltYWdlRGF0YSwgcXVhZFRyZWU6IFF1YWRUcmVlPFBpeGVsPik6IEltYWdlRGF0YSB7ICAgIFxuICAgIGlmIChxdWFkVHJlZS5xdWFkcmFudHMubGVuZ3RoKSB7XG4gICAgICAgIHF1YWRUcmVlLnF1YWRyYW50c1xuICAgICAgICAgICAgLmZvckVhY2gocXVhZHJhbnQgPT5cbiAgICAgICAgICAgICAgICBmaWxsSW1hZ2VEYXRhRnJvbVF1YWRUcmVlKGltYWdlRGF0YSwgcXVhZHJhbnQpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBwaXhlbHM6IFBpeGVsW10gPSBxdWFkVHJlZS5nZXREYXRhKCk7XG4gICAgICAgIGNvbnN0IGF2ZXJhZ2VDb2xvcjogQ29sb3IgPSBnZXRBdmVyYWdlQ29sb3IocGl4ZWxzKTtcbiAgICAgICAgcGl4ZWxzLmZvckVhY2gocGl4ZWwgPT4gZmlsbFBpeGVsSW5JbWFnZURhdGEoaW1hZ2VEYXRhLCB7XG4gICAgICAgICAgICAuLi5waXhlbCxcbiAgICAgICAgICAgIC4uLmF2ZXJhZ2VDb2xvcixcbiAgICAgICAgfSkpO1xuICAgIH1cblxuICAgIHJldHVybiBpbWFnZURhdGE7XG59XG5cbmZ1bmN0aW9uIHJlcXVlc3REcmF3KGltYWdlRGF0YTogSW1hZ2VEYXRhLCBjYXBhY2l0eTogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgbWVzc2FnZTogUXVhZFdvcmtlckRhdGFNZXNzYWdlID0ge1xuICAgICAgICB0eXBlOiAnZHJhdycsXG4gICAgICAgIGRhdGE6IGNyZWF0ZUltYWdlKGltYWdlRGF0YSwgY2FwYWNpdHkpLFxuICAgIH07XG4gICAgcG9zdE1lc3NhZ2UobWVzc2FnZSk7XG59XG5cbmZ1bmN0aW9uIHByb2Nlc3NJbWFnZShpbWFnZURhdGE6IEltYWdlRGF0YSk6IHZvaWQge1xuICAgIGxldCBjYXBhY2l0eTogbnVtYmVyID0gaW1hZ2VEYXRhLndpZHRoICogaW1hZ2VEYXRhLmhlaWdodDtcblxuICAgIHdoaWxlIChjYXBhY2l0eSA+IDEpIHtcbiAgICAgICAgcmVxdWVzdERyYXcoaW1hZ2VEYXRhLCBjYXBhY2l0eSk7XG4gICAgICAgIGNhcGFjaXR5IC89IDI7XG4gICAgfVxuXG4gICAgcmVxdWVzdERyYXcoaW1hZ2VEYXRhLCAxKTtcbiAgICBwb3N0TWVzc2FnZShwcm9jZXNzZWRNZXNzYWdlKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlSW1hZ2UoaW1hZ2VEYXRhOiBJbWFnZURhdGEsIGNhcGFjaXR5OiBudW1iZXIpOiBJbWFnZURhdGEge1xuICAgIGNvbnN0IG5ld0ltYWdlRGF0YTogSW1hZ2VEYXRhID0gbmV3IEltYWdlRGF0YShpbWFnZURhdGEud2lkdGgsIGltYWdlRGF0YS5oZWlnaHQpO1xuICAgIGNvbnN0IHF1YWRUcmVlOiBRdWFkVHJlZTxQaXhlbD4gPSBidWlsZFF1YWRUcmVlRnJvbVBpeGVscyhpbWFnZURhdGEsIHtcbiAgICAgICAgeDogMCxcbiAgICAgICAgeTogMCxcbiAgICAgICAgd2lkdGg6IGltYWdlRGF0YS53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBpbWFnZURhdGEuaGVpZ2h0LFxuICAgIH0sIGNhcGFjaXR5KTtcbiAgICBmaWxsSW1hZ2VEYXRhRnJvbVF1YWRUcmVlKG5ld0ltYWdlRGF0YSwgcXVhZFRyZWUpO1xuICAgIHJldHVybiBuZXdJbWFnZURhdGE7XG59XG5cbi8vIFNldHRpbmcgdXAgdGhlIHdvcmtlclxuY29uc3Qgd29ya2VyOiBXb3JrZXIgPSBzZWxmIGFzIGFueTtcbndvcmtlci5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgbWVzc2FnZTogUXVhZFdvcmtlckRhdGFNZXNzYWdlID0gZXZlbnQuZGF0YTtcbiAgICBjb25zdCBpbWFnZURhdGE6IEltYWdlRGF0YSA9IG1lc3NhZ2UuZGF0YTtcblxuICAgIHN3aXRjaCAobWVzc2FnZS50eXBlKSB7XG4gICAgICAgIGNhc2UgJ25ldy1pbWFnZSc6XG4gICAgICAgICAgICBpZiAoaW1hZ2VEYXRhKSB7XG4gICAgICAgICAgICAgICAgcHJvY2Vzc0ltYWdlKGltYWdlRGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYFVua25vd24gbWVzc2FnZSB0eXBlOiAke21lc3NhZ2V9YCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgfVxufSk7IiwiLy8gZ2lmLmpzIDAuMi4wIC0gaHR0cHM6Ly9naXRodWIuY29tL2pub3JkYmVyZy9naWYuanNcbihmdW5jdGlvbihmKXtpZih0eXBlb2YgZXhwb3J0cz09PVwib2JqZWN0XCImJnR5cGVvZiBtb2R1bGUhPT1cInVuZGVmaW5lZFwiKXttb2R1bGUuZXhwb3J0cz1mKCl9ZWxzZSBpZih0eXBlb2YgZGVmaW5lPT09XCJmdW5jdGlvblwiJiZkZWZpbmUuYW1kKXtkZWZpbmUoW10sZil9ZWxzZXt2YXIgZztpZih0eXBlb2Ygd2luZG93IT09XCJ1bmRlZmluZWRcIil7Zz13aW5kb3d9ZWxzZSBpZih0eXBlb2YgZ2xvYmFsIT09XCJ1bmRlZmluZWRcIil7Zz1nbG9iYWx9ZWxzZSBpZih0eXBlb2Ygc2VsZiE9PVwidW5kZWZpbmVkXCIpe2c9c2VsZn1lbHNle2c9dGhpc31nLkdJRj1mKCl9fSkoZnVuY3Rpb24oKXt2YXIgZGVmaW5lLG1vZHVsZSxleHBvcnRzO3JldHVybiBmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30oezE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe2Z1bmN0aW9uIEV2ZW50RW1pdHRlcigpe3RoaXMuX2V2ZW50cz10aGlzLl9ldmVudHN8fHt9O3RoaXMuX21heExpc3RlbmVycz10aGlzLl9tYXhMaXN0ZW5lcnN8fHVuZGVmaW5lZH1tb2R1bGUuZXhwb3J0cz1FdmVudEVtaXR0ZXI7RXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlcj1FdmVudEVtaXR0ZXI7RXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzPXVuZGVmaW5lZDtFdmVudEVtaXR0ZXIucHJvdG90eXBlLl9tYXhMaXN0ZW5lcnM9dW5kZWZpbmVkO0V2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzPTEwO0V2ZW50RW1pdHRlci5wcm90b3R5cGUuc2V0TWF4TGlzdGVuZXJzPWZ1bmN0aW9uKG4pe2lmKCFpc051bWJlcihuKXx8bjwwfHxpc05hTihuKSl0aHJvdyBUeXBlRXJyb3IoXCJuIG11c3QgYmUgYSBwb3NpdGl2ZSBudW1iZXJcIik7dGhpcy5fbWF4TGlzdGVuZXJzPW47cmV0dXJuIHRoaXN9O0V2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdD1mdW5jdGlvbih0eXBlKXt2YXIgZXIsaGFuZGxlcixsZW4sYXJncyxpLGxpc3RlbmVycztpZighdGhpcy5fZXZlbnRzKXRoaXMuX2V2ZW50cz17fTtpZih0eXBlPT09XCJlcnJvclwiKXtpZighdGhpcy5fZXZlbnRzLmVycm9yfHxpc09iamVjdCh0aGlzLl9ldmVudHMuZXJyb3IpJiYhdGhpcy5fZXZlbnRzLmVycm9yLmxlbmd0aCl7ZXI9YXJndW1lbnRzWzFdO2lmKGVyIGluc3RhbmNlb2YgRXJyb3Ipe3Rocm93IGVyfWVsc2V7dmFyIGVycj1uZXcgRXJyb3IoJ1VuY2F1Z2h0LCB1bnNwZWNpZmllZCBcImVycm9yXCIgZXZlbnQuICgnK2VyK1wiKVwiKTtlcnIuY29udGV4dD1lcjt0aHJvdyBlcnJ9fX1oYW5kbGVyPXRoaXMuX2V2ZW50c1t0eXBlXTtpZihpc1VuZGVmaW5lZChoYW5kbGVyKSlyZXR1cm4gZmFsc2U7aWYoaXNGdW5jdGlvbihoYW5kbGVyKSl7c3dpdGNoKGFyZ3VtZW50cy5sZW5ndGgpe2Nhc2UgMTpoYW5kbGVyLmNhbGwodGhpcyk7YnJlYWs7Y2FzZSAyOmhhbmRsZXIuY2FsbCh0aGlzLGFyZ3VtZW50c1sxXSk7YnJlYWs7Y2FzZSAzOmhhbmRsZXIuY2FsbCh0aGlzLGFyZ3VtZW50c1sxXSxhcmd1bWVudHNbMl0pO2JyZWFrO2RlZmF1bHQ6YXJncz1BcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsMSk7aGFuZGxlci5hcHBseSh0aGlzLGFyZ3MpfX1lbHNlIGlmKGlzT2JqZWN0KGhhbmRsZXIpKXthcmdzPUFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywxKTtsaXN0ZW5lcnM9aGFuZGxlci5zbGljZSgpO2xlbj1saXN0ZW5lcnMubGVuZ3RoO2ZvcihpPTA7aTxsZW47aSsrKWxpc3RlbmVyc1tpXS5hcHBseSh0aGlzLGFyZ3MpfXJldHVybiB0cnVlfTtFdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyPWZ1bmN0aW9uKHR5cGUsbGlzdGVuZXIpe3ZhciBtO2lmKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSl0aHJvdyBUeXBlRXJyb3IoXCJsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb25cIik7aWYoIXRoaXMuX2V2ZW50cyl0aGlzLl9ldmVudHM9e307aWYodGhpcy5fZXZlbnRzLm5ld0xpc3RlbmVyKXRoaXMuZW1pdChcIm5ld0xpc3RlbmVyXCIsdHlwZSxpc0Z1bmN0aW9uKGxpc3RlbmVyLmxpc3RlbmVyKT9saXN0ZW5lci5saXN0ZW5lcjpsaXN0ZW5lcik7aWYoIXRoaXMuX2V2ZW50c1t0eXBlXSl0aGlzLl9ldmVudHNbdHlwZV09bGlzdGVuZXI7ZWxzZSBpZihpc09iamVjdCh0aGlzLl9ldmVudHNbdHlwZV0pKXRoaXMuX2V2ZW50c1t0eXBlXS5wdXNoKGxpc3RlbmVyKTtlbHNlIHRoaXMuX2V2ZW50c1t0eXBlXT1bdGhpcy5fZXZlbnRzW3R5cGVdLGxpc3RlbmVyXTtpZihpc09iamVjdCh0aGlzLl9ldmVudHNbdHlwZV0pJiYhdGhpcy5fZXZlbnRzW3R5cGVdLndhcm5lZCl7aWYoIWlzVW5kZWZpbmVkKHRoaXMuX21heExpc3RlbmVycykpe209dGhpcy5fbWF4TGlzdGVuZXJzfWVsc2V7bT1FdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVyc31pZihtJiZtPjAmJnRoaXMuX2V2ZW50c1t0eXBlXS5sZW5ndGg+bSl7dGhpcy5fZXZlbnRzW3R5cGVdLndhcm5lZD10cnVlO2NvbnNvbGUuZXJyb3IoXCIobm9kZSkgd2FybmluZzogcG9zc2libGUgRXZlbnRFbWl0dGVyIG1lbW9yeSBcIitcImxlYWsgZGV0ZWN0ZWQuICVkIGxpc3RlbmVycyBhZGRlZC4gXCIrXCJVc2UgZW1pdHRlci5zZXRNYXhMaXN0ZW5lcnMoKSB0byBpbmNyZWFzZSBsaW1pdC5cIix0aGlzLl9ldmVudHNbdHlwZV0ubGVuZ3RoKTtpZih0eXBlb2YgY29uc29sZS50cmFjZT09PVwiZnVuY3Rpb25cIil7Y29uc29sZS50cmFjZSgpfX19cmV0dXJuIHRoaXN9O0V2ZW50RW1pdHRlci5wcm90b3R5cGUub249RXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lcjtFdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2U9ZnVuY3Rpb24odHlwZSxsaXN0ZW5lcil7aWYoIWlzRnVuY3Rpb24obGlzdGVuZXIpKXRocm93IFR5cGVFcnJvcihcImxpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvblwiKTt2YXIgZmlyZWQ9ZmFsc2U7ZnVuY3Rpb24gZygpe3RoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSxnKTtpZighZmlyZWQpe2ZpcmVkPXRydWU7bGlzdGVuZXIuYXBwbHkodGhpcyxhcmd1bWVudHMpfX1nLmxpc3RlbmVyPWxpc3RlbmVyO3RoaXMub24odHlwZSxnKTtyZXR1cm4gdGhpc307RXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lcj1mdW5jdGlvbih0eXBlLGxpc3RlbmVyKXt2YXIgbGlzdCxwb3NpdGlvbixsZW5ndGgsaTtpZighaXNGdW5jdGlvbihsaXN0ZW5lcikpdGhyb3cgVHlwZUVycm9yKFwibGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uXCIpO2lmKCF0aGlzLl9ldmVudHN8fCF0aGlzLl9ldmVudHNbdHlwZV0pcmV0dXJuIHRoaXM7bGlzdD10aGlzLl9ldmVudHNbdHlwZV07bGVuZ3RoPWxpc3QubGVuZ3RoO3Bvc2l0aW9uPS0xO2lmKGxpc3Q9PT1saXN0ZW5lcnx8aXNGdW5jdGlvbihsaXN0Lmxpc3RlbmVyKSYmbGlzdC5saXN0ZW5lcj09PWxpc3RlbmVyKXtkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO2lmKHRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcil0aGlzLmVtaXQoXCJyZW1vdmVMaXN0ZW5lclwiLHR5cGUsbGlzdGVuZXIpfWVsc2UgaWYoaXNPYmplY3QobGlzdCkpe2ZvcihpPWxlbmd0aDtpLS0gPjA7KXtpZihsaXN0W2ldPT09bGlzdGVuZXJ8fGxpc3RbaV0ubGlzdGVuZXImJmxpc3RbaV0ubGlzdGVuZXI9PT1saXN0ZW5lcil7cG9zaXRpb249aTticmVha319aWYocG9zaXRpb248MClyZXR1cm4gdGhpcztpZihsaXN0Lmxlbmd0aD09PTEpe2xpc3QubGVuZ3RoPTA7ZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXX1lbHNle2xpc3Quc3BsaWNlKHBvc2l0aW9uLDEpfWlmKHRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcil0aGlzLmVtaXQoXCJyZW1vdmVMaXN0ZW5lclwiLHR5cGUsbGlzdGVuZXIpfXJldHVybiB0aGlzfTtFdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycz1mdW5jdGlvbih0eXBlKXt2YXIga2V5LGxpc3RlbmVycztpZighdGhpcy5fZXZlbnRzKXJldHVybiB0aGlzO2lmKCF0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpe2lmKGFyZ3VtZW50cy5sZW5ndGg9PT0wKXRoaXMuX2V2ZW50cz17fTtlbHNlIGlmKHRoaXMuX2V2ZW50c1t0eXBlXSlkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO3JldHVybiB0aGlzfWlmKGFyZ3VtZW50cy5sZW5ndGg9PT0wKXtmb3Ioa2V5IGluIHRoaXMuX2V2ZW50cyl7aWYoa2V5PT09XCJyZW1vdmVMaXN0ZW5lclwiKWNvbnRpbnVlO3RoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKGtleSl9dGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoXCJyZW1vdmVMaXN0ZW5lclwiKTt0aGlzLl9ldmVudHM9e307cmV0dXJuIHRoaXN9bGlzdGVuZXJzPXRoaXMuX2V2ZW50c1t0eXBlXTtpZihpc0Z1bmN0aW9uKGxpc3RlbmVycykpe3RoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSxsaXN0ZW5lcnMpfWVsc2UgaWYobGlzdGVuZXJzKXt3aGlsZShsaXN0ZW5lcnMubGVuZ3RoKXRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSxsaXN0ZW5lcnNbbGlzdGVuZXJzLmxlbmd0aC0xXSl9ZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtyZXR1cm4gdGhpc307RXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnM9ZnVuY3Rpb24odHlwZSl7dmFyIHJldDtpZighdGhpcy5fZXZlbnRzfHwhdGhpcy5fZXZlbnRzW3R5cGVdKXJldD1bXTtlbHNlIGlmKGlzRnVuY3Rpb24odGhpcy5fZXZlbnRzW3R5cGVdKSlyZXQ9W3RoaXMuX2V2ZW50c1t0eXBlXV07ZWxzZSByZXQ9dGhpcy5fZXZlbnRzW3R5cGVdLnNsaWNlKCk7cmV0dXJuIHJldH07RXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lckNvdW50PWZ1bmN0aW9uKHR5cGUpe2lmKHRoaXMuX2V2ZW50cyl7dmFyIGV2bGlzdGVuZXI9dGhpcy5fZXZlbnRzW3R5cGVdO2lmKGlzRnVuY3Rpb24oZXZsaXN0ZW5lcikpcmV0dXJuIDE7ZWxzZSBpZihldmxpc3RlbmVyKXJldHVybiBldmxpc3RlbmVyLmxlbmd0aH1yZXR1cm4gMH07RXZlbnRFbWl0dGVyLmxpc3RlbmVyQ291bnQ9ZnVuY3Rpb24oZW1pdHRlcix0eXBlKXtyZXR1cm4gZW1pdHRlci5saXN0ZW5lckNvdW50KHR5cGUpfTtmdW5jdGlvbiBpc0Z1bmN0aW9uKGFyZyl7cmV0dXJuIHR5cGVvZiBhcmc9PT1cImZ1bmN0aW9uXCJ9ZnVuY3Rpb24gaXNOdW1iZXIoYXJnKXtyZXR1cm4gdHlwZW9mIGFyZz09PVwibnVtYmVyXCJ9ZnVuY3Rpb24gaXNPYmplY3QoYXJnKXtyZXR1cm4gdHlwZW9mIGFyZz09PVwib2JqZWN0XCImJmFyZyE9PW51bGx9ZnVuY3Rpb24gaXNVbmRlZmluZWQoYXJnKXtyZXR1cm4gYXJnPT09dm9pZCAwfX0se31dLDI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe3ZhciBVQSxicm93c2VyLG1vZGUscGxhdGZvcm0sdWE7dWE9bmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpO3BsYXRmb3JtPW5hdmlnYXRvci5wbGF0Zm9ybS50b0xvd2VyQ2FzZSgpO1VBPXVhLm1hdGNoKC8ob3BlcmF8aWV8ZmlyZWZveHxjaHJvbWV8dmVyc2lvbilbXFxzXFwvOl0oW1xcd1xcZFxcLl0rKT8uKj8oc2FmYXJpfHZlcnNpb25bXFxzXFwvOl0oW1xcd1xcZFxcLl0rKXwkKS8pfHxbbnVsbCxcInVua25vd25cIiwwXTttb2RlPVVBWzFdPT09XCJpZVwiJiZkb2N1bWVudC5kb2N1bWVudE1vZGU7YnJvd3Nlcj17bmFtZTpVQVsxXT09PVwidmVyc2lvblwiP1VBWzNdOlVBWzFdLHZlcnNpb246bW9kZXx8cGFyc2VGbG9hdChVQVsxXT09PVwib3BlcmFcIiYmVUFbNF0/VUFbNF06VUFbMl0pLHBsYXRmb3JtOntuYW1lOnVhLm1hdGNoKC9pcCg/OmFkfG9kfGhvbmUpLyk/XCJpb3NcIjoodWEubWF0Y2goLyg/OndlYm9zfGFuZHJvaWQpLyl8fHBsYXRmb3JtLm1hdGNoKC9tYWN8d2lufGxpbnV4Lyl8fFtcIm90aGVyXCJdKVswXX19O2Jyb3dzZXJbYnJvd3Nlci5uYW1lXT10cnVlO2Jyb3dzZXJbYnJvd3Nlci5uYW1lK3BhcnNlSW50KGJyb3dzZXIudmVyc2lvbiwxMCldPXRydWU7YnJvd3Nlci5wbGF0Zm9ybVticm93c2VyLnBsYXRmb3JtLm5hbWVdPXRydWU7bW9kdWxlLmV4cG9ydHM9YnJvd3Nlcn0se31dLDM6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe3ZhciBFdmVudEVtaXR0ZXIsR0lGLGJyb3dzZXIsZXh0ZW5kPWZ1bmN0aW9uKGNoaWxkLHBhcmVudCl7Zm9yKHZhciBrZXkgaW4gcGFyZW50KXtpZihoYXNQcm9wLmNhbGwocGFyZW50LGtleSkpY2hpbGRba2V5XT1wYXJlbnRba2V5XX1mdW5jdGlvbiBjdG9yKCl7dGhpcy5jb25zdHJ1Y3Rvcj1jaGlsZH1jdG9yLnByb3RvdHlwZT1wYXJlbnQucHJvdG90eXBlO2NoaWxkLnByb3RvdHlwZT1uZXcgY3RvcjtjaGlsZC5fX3N1cGVyX189cGFyZW50LnByb3RvdHlwZTtyZXR1cm4gY2hpbGR9LGhhc1Byb3A9e30uaGFzT3duUHJvcGVydHksaW5kZXhPZj1bXS5pbmRleE9mfHxmdW5jdGlvbihpdGVtKXtmb3IodmFyIGk9MCxsPXRoaXMubGVuZ3RoO2k8bDtpKyspe2lmKGkgaW4gdGhpcyYmdGhpc1tpXT09PWl0ZW0pcmV0dXJuIGl9cmV0dXJuLTF9LHNsaWNlPVtdLnNsaWNlO0V2ZW50RW1pdHRlcj1yZXF1aXJlKFwiZXZlbnRzXCIpLkV2ZW50RW1pdHRlcjticm93c2VyPXJlcXVpcmUoXCIuL2Jyb3dzZXIuY29mZmVlXCIpO0dJRj1mdW5jdGlvbihzdXBlckNsYXNzKXt2YXIgZGVmYXVsdHMsZnJhbWVEZWZhdWx0cztleHRlbmQoR0lGLHN1cGVyQ2xhc3MpO2RlZmF1bHRzPXt3b3JrZXJTY3JpcHQ6XCJnaWYud29ya2VyLmpzXCIsd29ya2VyczoyLHJlcGVhdDowLGJhY2tncm91bmQ6XCIjZmZmXCIscXVhbGl0eToxMCx3aWR0aDpudWxsLGhlaWdodDpudWxsLHRyYW5zcGFyZW50Om51bGwsZGVidWc6ZmFsc2UsZGl0aGVyOmZhbHNlfTtmcmFtZURlZmF1bHRzPXtkZWxheTo1MDAsY29weTpmYWxzZX07ZnVuY3Rpb24gR0lGKG9wdGlvbnMpe3ZhciBiYXNlLGtleSx2YWx1ZTt0aGlzLnJ1bm5pbmc9ZmFsc2U7dGhpcy5vcHRpb25zPXt9O3RoaXMuZnJhbWVzPVtdO3RoaXMuZnJlZVdvcmtlcnM9W107dGhpcy5hY3RpdmVXb3JrZXJzPVtdO3RoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtmb3Ioa2V5IGluIGRlZmF1bHRzKXt2YWx1ZT1kZWZhdWx0c1trZXldO2lmKChiYXNlPXRoaXMub3B0aW9ucylba2V5XT09bnVsbCl7YmFzZVtrZXldPXZhbHVlfX19R0lGLnByb3RvdHlwZS5zZXRPcHRpb249ZnVuY3Rpb24oa2V5LHZhbHVlKXt0aGlzLm9wdGlvbnNba2V5XT12YWx1ZTtpZih0aGlzLl9jYW52YXMhPW51bGwmJihrZXk9PT1cIndpZHRoXCJ8fGtleT09PVwiaGVpZ2h0XCIpKXtyZXR1cm4gdGhpcy5fY2FudmFzW2tleV09dmFsdWV9fTtHSUYucHJvdG90eXBlLnNldE9wdGlvbnM9ZnVuY3Rpb24ob3B0aW9ucyl7dmFyIGtleSxyZXN1bHRzLHZhbHVlO3Jlc3VsdHM9W107Zm9yKGtleSBpbiBvcHRpb25zKXtpZighaGFzUHJvcC5jYWxsKG9wdGlvbnMsa2V5KSljb250aW51ZTt2YWx1ZT1vcHRpb25zW2tleV07cmVzdWx0cy5wdXNoKHRoaXMuc2V0T3B0aW9uKGtleSx2YWx1ZSkpfXJldHVybiByZXN1bHRzfTtHSUYucHJvdG90eXBlLmFkZEZyYW1lPWZ1bmN0aW9uKGltYWdlLG9wdGlvbnMpe3ZhciBmcmFtZSxrZXk7aWYob3B0aW9ucz09bnVsbCl7b3B0aW9ucz17fX1mcmFtZT17fTtmcmFtZS50cmFuc3BhcmVudD10aGlzLm9wdGlvbnMudHJhbnNwYXJlbnQ7Zm9yKGtleSBpbiBmcmFtZURlZmF1bHRzKXtmcmFtZVtrZXldPW9wdGlvbnNba2V5XXx8ZnJhbWVEZWZhdWx0c1trZXldfWlmKHRoaXMub3B0aW9ucy53aWR0aD09bnVsbCl7dGhpcy5zZXRPcHRpb24oXCJ3aWR0aFwiLGltYWdlLndpZHRoKX1pZih0aGlzLm9wdGlvbnMuaGVpZ2h0PT1udWxsKXt0aGlzLnNldE9wdGlvbihcImhlaWdodFwiLGltYWdlLmhlaWdodCl9aWYodHlwZW9mIEltYWdlRGF0YSE9PVwidW5kZWZpbmVkXCImJkltYWdlRGF0YSE9PW51bGwmJmltYWdlIGluc3RhbmNlb2YgSW1hZ2VEYXRhKXtmcmFtZS5kYXRhPWltYWdlLmRhdGF9ZWxzZSBpZih0eXBlb2YgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEIT09XCJ1bmRlZmluZWRcIiYmQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEIT09bnVsbCYmaW1hZ2UgaW5zdGFuY2VvZiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkR8fHR5cGVvZiBXZWJHTFJlbmRlcmluZ0NvbnRleHQhPT1cInVuZGVmaW5lZFwiJiZXZWJHTFJlbmRlcmluZ0NvbnRleHQhPT1udWxsJiZpbWFnZSBpbnN0YW5jZW9mIFdlYkdMUmVuZGVyaW5nQ29udGV4dCl7aWYob3B0aW9ucy5jb3B5KXtmcmFtZS5kYXRhPXRoaXMuZ2V0Q29udGV4dERhdGEoaW1hZ2UpfWVsc2V7ZnJhbWUuY29udGV4dD1pbWFnZX19ZWxzZSBpZihpbWFnZS5jaGlsZE5vZGVzIT1udWxsKXtpZihvcHRpb25zLmNvcHkpe2ZyYW1lLmRhdGE9dGhpcy5nZXRJbWFnZURhdGEoaW1hZ2UpfWVsc2V7ZnJhbWUuaW1hZ2U9aW1hZ2V9fWVsc2V7dGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBpbWFnZVwiKX1yZXR1cm4gdGhpcy5mcmFtZXMucHVzaChmcmFtZSl9O0dJRi5wcm90b3R5cGUucmVuZGVyPWZ1bmN0aW9uKCl7dmFyIGksaixudW1Xb3JrZXJzLHJlZjtpZih0aGlzLnJ1bm5pbmcpe3Rocm93IG5ldyBFcnJvcihcIkFscmVhZHkgcnVubmluZ1wiKX1pZih0aGlzLm9wdGlvbnMud2lkdGg9PW51bGx8fHRoaXMub3B0aW9ucy5oZWlnaHQ9PW51bGwpe3Rocm93IG5ldyBFcnJvcihcIldpZHRoIGFuZCBoZWlnaHQgbXVzdCBiZSBzZXQgcHJpb3IgdG8gcmVuZGVyaW5nXCIpfXRoaXMucnVubmluZz10cnVlO3RoaXMubmV4dEZyYW1lPTA7dGhpcy5maW5pc2hlZEZyYW1lcz0wO3RoaXMuaW1hZ2VQYXJ0cz1mdW5jdGlvbigpe3ZhciBqLHJlZixyZXN1bHRzO3Jlc3VsdHM9W107Zm9yKGk9aj0wLHJlZj10aGlzLmZyYW1lcy5sZW5ndGg7MDw9cmVmP2o8cmVmOmo+cmVmO2k9MDw9cmVmPysrajotLWope3Jlc3VsdHMucHVzaChudWxsKX1yZXR1cm4gcmVzdWx0c30uY2FsbCh0aGlzKTtudW1Xb3JrZXJzPXRoaXMuc3Bhd25Xb3JrZXJzKCk7aWYodGhpcy5vcHRpb25zLmdsb2JhbFBhbGV0dGU9PT10cnVlKXt0aGlzLnJlbmRlck5leHRGcmFtZSgpfWVsc2V7Zm9yKGk9aj0wLHJlZj1udW1Xb3JrZXJzOzA8PXJlZj9qPHJlZjpqPnJlZjtpPTA8PXJlZj8rK2o6LS1qKXt0aGlzLnJlbmRlck5leHRGcmFtZSgpfX10aGlzLmVtaXQoXCJzdGFydFwiKTtyZXR1cm4gdGhpcy5lbWl0KFwicHJvZ3Jlc3NcIiwwKX07R0lGLnByb3RvdHlwZS5hYm9ydD1mdW5jdGlvbigpe3ZhciB3b3JrZXI7d2hpbGUodHJ1ZSl7d29ya2VyPXRoaXMuYWN0aXZlV29ya2Vycy5zaGlmdCgpO2lmKHdvcmtlcj09bnVsbCl7YnJlYWt9dGhpcy5sb2coXCJraWxsaW5nIGFjdGl2ZSB3b3JrZXJcIik7d29ya2VyLnRlcm1pbmF0ZSgpfXRoaXMucnVubmluZz1mYWxzZTtyZXR1cm4gdGhpcy5lbWl0KFwiYWJvcnRcIil9O0dJRi5wcm90b3R5cGUuc3Bhd25Xb3JrZXJzPWZ1bmN0aW9uKCl7dmFyIGosbnVtV29ya2VycyxyZWYscmVzdWx0cztudW1Xb3JrZXJzPU1hdGgubWluKHRoaXMub3B0aW9ucy53b3JrZXJzLHRoaXMuZnJhbWVzLmxlbmd0aCk7KGZ1bmN0aW9uKCl7cmVzdWx0cz1bXTtmb3IodmFyIGo9cmVmPXRoaXMuZnJlZVdvcmtlcnMubGVuZ3RoO3JlZjw9bnVtV29ya2Vycz9qPG51bVdvcmtlcnM6aj5udW1Xb3JrZXJzO3JlZjw9bnVtV29ya2Vycz9qKys6ai0tKXtyZXN1bHRzLnB1c2goail9cmV0dXJuIHJlc3VsdHN9KS5hcHBseSh0aGlzKS5mb3JFYWNoKGZ1bmN0aW9uKF90aGlzKXtyZXR1cm4gZnVuY3Rpb24oaSl7dmFyIHdvcmtlcjtfdGhpcy5sb2coXCJzcGF3bmluZyB3b3JrZXIgXCIraSk7d29ya2VyPW5ldyBXb3JrZXIoX3RoaXMub3B0aW9ucy53b3JrZXJTY3JpcHQpO3dvcmtlci5vbm1lc3NhZ2U9ZnVuY3Rpb24oZXZlbnQpe190aGlzLmFjdGl2ZVdvcmtlcnMuc3BsaWNlKF90aGlzLmFjdGl2ZVdvcmtlcnMuaW5kZXhPZih3b3JrZXIpLDEpO190aGlzLmZyZWVXb3JrZXJzLnB1c2god29ya2VyKTtyZXR1cm4gX3RoaXMuZnJhbWVGaW5pc2hlZChldmVudC5kYXRhKX07cmV0dXJuIF90aGlzLmZyZWVXb3JrZXJzLnB1c2god29ya2VyKX19KHRoaXMpKTtyZXR1cm4gbnVtV29ya2Vyc307R0lGLnByb3RvdHlwZS5mcmFtZUZpbmlzaGVkPWZ1bmN0aW9uKGZyYW1lKXt2YXIgaSxqLHJlZjt0aGlzLmxvZyhcImZyYW1lIFwiK2ZyYW1lLmluZGV4K1wiIGZpbmlzaGVkIC0gXCIrdGhpcy5hY3RpdmVXb3JrZXJzLmxlbmd0aCtcIiBhY3RpdmVcIik7dGhpcy5maW5pc2hlZEZyYW1lcysrO3RoaXMuZW1pdChcInByb2dyZXNzXCIsdGhpcy5maW5pc2hlZEZyYW1lcy90aGlzLmZyYW1lcy5sZW5ndGgpO3RoaXMuaW1hZ2VQYXJ0c1tmcmFtZS5pbmRleF09ZnJhbWU7aWYodGhpcy5vcHRpb25zLmdsb2JhbFBhbGV0dGU9PT10cnVlKXt0aGlzLm9wdGlvbnMuZ2xvYmFsUGFsZXR0ZT1mcmFtZS5nbG9iYWxQYWxldHRlO3RoaXMubG9nKFwiZ2xvYmFsIHBhbGV0dGUgYW5hbHl6ZWRcIik7aWYodGhpcy5mcmFtZXMubGVuZ3RoPjIpe2ZvcihpPWo9MSxyZWY9dGhpcy5mcmVlV29ya2Vycy5sZW5ndGg7MTw9cmVmP2o8cmVmOmo+cmVmO2k9MTw9cmVmPysrajotLWope3RoaXMucmVuZGVyTmV4dEZyYW1lKCl9fX1pZihpbmRleE9mLmNhbGwodGhpcy5pbWFnZVBhcnRzLG51bGwpPj0wKXtyZXR1cm4gdGhpcy5yZW5kZXJOZXh0RnJhbWUoKX1lbHNle3JldHVybiB0aGlzLmZpbmlzaFJlbmRlcmluZygpfX07R0lGLnByb3RvdHlwZS5maW5pc2hSZW5kZXJpbmc9ZnVuY3Rpb24oKXt2YXIgZGF0YSxmcmFtZSxpLGltYWdlLGosayxsLGxlbixsZW4xLGxlbjIsbGVuMyxvZmZzZXQscGFnZSxyZWYscmVmMSxyZWYyO2xlbj0wO3JlZj10aGlzLmltYWdlUGFydHM7Zm9yKGo9MCxsZW4xPXJlZi5sZW5ndGg7ajxsZW4xO2orKyl7ZnJhbWU9cmVmW2pdO2xlbis9KGZyYW1lLmRhdGEubGVuZ3RoLTEpKmZyYW1lLnBhZ2VTaXplK2ZyYW1lLmN1cnNvcn1sZW4rPWZyYW1lLnBhZ2VTaXplLWZyYW1lLmN1cnNvcjt0aGlzLmxvZyhcInJlbmRlcmluZyBmaW5pc2hlZCAtIGZpbGVzaXplIFwiK01hdGgucm91bmQobGVuLzFlMykrXCJrYlwiKTtkYXRhPW5ldyBVaW50OEFycmF5KGxlbik7b2Zmc2V0PTA7cmVmMT10aGlzLmltYWdlUGFydHM7Zm9yKGs9MCxsZW4yPXJlZjEubGVuZ3RoO2s8bGVuMjtrKyspe2ZyYW1lPXJlZjFba107cmVmMj1mcmFtZS5kYXRhO2ZvcihpPWw9MCxsZW4zPXJlZjIubGVuZ3RoO2w8bGVuMztpPSsrbCl7cGFnZT1yZWYyW2ldO2RhdGEuc2V0KHBhZ2Usb2Zmc2V0KTtpZihpPT09ZnJhbWUuZGF0YS5sZW5ndGgtMSl7b2Zmc2V0Kz1mcmFtZS5jdXJzb3J9ZWxzZXtvZmZzZXQrPWZyYW1lLnBhZ2VTaXplfX19aW1hZ2U9bmV3IEJsb2IoW2RhdGFdLHt0eXBlOlwiaW1hZ2UvZ2lmXCJ9KTtyZXR1cm4gdGhpcy5lbWl0KFwiZmluaXNoZWRcIixpbWFnZSxkYXRhKX07R0lGLnByb3RvdHlwZS5yZW5kZXJOZXh0RnJhbWU9ZnVuY3Rpb24oKXt2YXIgZnJhbWUsdGFzayx3b3JrZXI7aWYodGhpcy5mcmVlV29ya2Vycy5sZW5ndGg9PT0wKXt0aHJvdyBuZXcgRXJyb3IoXCJObyBmcmVlIHdvcmtlcnNcIil9aWYodGhpcy5uZXh0RnJhbWU+PXRoaXMuZnJhbWVzLmxlbmd0aCl7cmV0dXJufWZyYW1lPXRoaXMuZnJhbWVzW3RoaXMubmV4dEZyYW1lKytdO3dvcmtlcj10aGlzLmZyZWVXb3JrZXJzLnNoaWZ0KCk7dGFzaz10aGlzLmdldFRhc2soZnJhbWUpO3RoaXMubG9nKFwic3RhcnRpbmcgZnJhbWUgXCIrKHRhc2suaW5kZXgrMSkrXCIgb2YgXCIrdGhpcy5mcmFtZXMubGVuZ3RoKTt0aGlzLmFjdGl2ZVdvcmtlcnMucHVzaCh3b3JrZXIpO3JldHVybiB3b3JrZXIucG9zdE1lc3NhZ2UodGFzayl9O0dJRi5wcm90b3R5cGUuZ2V0Q29udGV4dERhdGE9ZnVuY3Rpb24oY3R4KXtyZXR1cm4gY3R4LmdldEltYWdlRGF0YSgwLDAsdGhpcy5vcHRpb25zLndpZHRoLHRoaXMub3B0aW9ucy5oZWlnaHQpLmRhdGF9O0dJRi5wcm90b3R5cGUuZ2V0SW1hZ2VEYXRhPWZ1bmN0aW9uKGltYWdlKXt2YXIgY3R4O2lmKHRoaXMuX2NhbnZhcz09bnVsbCl7dGhpcy5fY2FudmFzPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7dGhpcy5fY2FudmFzLndpZHRoPXRoaXMub3B0aW9ucy53aWR0aDt0aGlzLl9jYW52YXMuaGVpZ2h0PXRoaXMub3B0aW9ucy5oZWlnaHR9Y3R4PXRoaXMuX2NhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7Y3R4LnNldEZpbGw9dGhpcy5vcHRpb25zLmJhY2tncm91bmQ7Y3R4LmZpbGxSZWN0KDAsMCx0aGlzLm9wdGlvbnMud2lkdGgsdGhpcy5vcHRpb25zLmhlaWdodCk7Y3R4LmRyYXdJbWFnZShpbWFnZSwwLDApO3JldHVybiB0aGlzLmdldENvbnRleHREYXRhKGN0eCl9O0dJRi5wcm90b3R5cGUuZ2V0VGFzaz1mdW5jdGlvbihmcmFtZSl7dmFyIGluZGV4LHRhc2s7aW5kZXg9dGhpcy5mcmFtZXMuaW5kZXhPZihmcmFtZSk7dGFzaz17aW5kZXg6aW5kZXgsbGFzdDppbmRleD09PXRoaXMuZnJhbWVzLmxlbmd0aC0xLGRlbGF5OmZyYW1lLmRlbGF5LHRyYW5zcGFyZW50OmZyYW1lLnRyYW5zcGFyZW50LHdpZHRoOnRoaXMub3B0aW9ucy53aWR0aCxoZWlnaHQ6dGhpcy5vcHRpb25zLmhlaWdodCxxdWFsaXR5OnRoaXMub3B0aW9ucy5xdWFsaXR5LGRpdGhlcjp0aGlzLm9wdGlvbnMuZGl0aGVyLGdsb2JhbFBhbGV0dGU6dGhpcy5vcHRpb25zLmdsb2JhbFBhbGV0dGUscmVwZWF0OnRoaXMub3B0aW9ucy5yZXBlYXQsY2FuVHJhbnNmZXI6YnJvd3Nlci5uYW1lPT09XCJjaHJvbWVcIn07aWYoZnJhbWUuZGF0YSE9bnVsbCl7dGFzay5kYXRhPWZyYW1lLmRhdGF9ZWxzZSBpZihmcmFtZS5jb250ZXh0IT1udWxsKXt0YXNrLmRhdGE9dGhpcy5nZXRDb250ZXh0RGF0YShmcmFtZS5jb250ZXh0KX1lbHNlIGlmKGZyYW1lLmltYWdlIT1udWxsKXt0YXNrLmRhdGE9dGhpcy5nZXRJbWFnZURhdGEoZnJhbWUuaW1hZ2UpfWVsc2V7dGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBmcmFtZVwiKX1yZXR1cm4gdGFza307R0lGLnByb3RvdHlwZS5sb2c9ZnVuY3Rpb24oKXt2YXIgYXJnczthcmdzPTE8PWFyZ3VtZW50cy5sZW5ndGg/c2xpY2UuY2FsbChhcmd1bWVudHMsMCk6W107aWYoIXRoaXMub3B0aW9ucy5kZWJ1Zyl7cmV0dXJufXJldHVybiBjb25zb2xlLmxvZy5hcHBseShjb25zb2xlLGFyZ3MpfTtyZXR1cm4gR0lGfShFdmVudEVtaXR0ZXIpO21vZHVsZS5leHBvcnRzPUdJRn0se1wiLi9icm93c2VyLmNvZmZlZVwiOjIsZXZlbnRzOjF9XX0se30sWzNdKSgzKX0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Z2lmLmpzLm1hcFxuIiwiZnVuY3Rpb24gX3RvQ29uc3VtYWJsZUFycmF5KGFycikge1xuICByZXR1cm4gX2FycmF5V2l0aG91dEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheShhcnIpIHx8IF9ub25JdGVyYWJsZVNwcmVhZCgpO1xufVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShhcnIubGVuZ3RoKTsgaSA8IGFyci5sZW5ndGg7IGkrKykgYXJyMltpXSA9IGFycltpXTtcblxuICAgIHJldHVybiBhcnIyO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXkoaXRlcikge1xuICBpZiAoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChpdGVyKSB8fCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaXRlcikgPT09IFwiW29iamVjdCBBcmd1bWVudHNdXCIpIHJldHVybiBBcnJheS5mcm9tKGl0ZXIpO1xufVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVTcHJlYWQoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gc3ByZWFkIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTtcbn1cblxuLy8gVGhlICMgb2YgY29tYmluYXRpb25zIGJldHdlZW4gdGhlc2UgMyBib3VuZHMgaXMgYXMgZm9sbG93czpcbi8vIC0gQ2lyY2xlIGFuZCBDaXJjbGVcbi8vIC0gQ2lyY2xlIGFuZCBQb2ludFxuLy8gLSBDaXJjbGUgYW5kIEJvdW5kaW5nQm94XG4vLyAtIEJvdW5kaW5nQm94IGFuZCBCb3VuZGluZ0JveFxuLy8gLSBCb3VuZGluZ0JveCBhbmQgUG9pbnRcbi8vIC0gUG9pbnQgYW5kIFBvaW50XG5mdW5jdGlvbiBpc0NpcmNsZShib3VuZCkge1xuICByZXR1cm4gYm91bmQuciAhPT0gdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBpc0JvdW5kaW5nQm94KGJvdW5kKSB7XG4gIHJldHVybiBib3VuZC53aWR0aCAhPT0gdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBpc1BvaW50KGJvdW5kKSB7XG4gIHJldHVybiAhaXNDaXJjbGUoYm91bmQpICYmICFpc0JvdW5kaW5nQm94KGJvdW5kKTtcbn1cblxuZnVuY3Rpb24gZG9Qb2ludHNJbnRlcnNlY3QocG9pbnQxLCBwb2ludDIpIHtcbiAgcmV0dXJuIHBvaW50MS54ID09PSBwb2ludDIueCAmJiBwb2ludDEueSA9PT0gcG9pbnQyLnk7XG59XG5cbmZ1bmN0aW9uIGRvQm91bmRpbmdCb3hQb2ludEludGVyc2VjdChib3VuZHMsIHBvaW50KSB7XG4gIHJldHVybiBkb0JvdW5kaW5nQm94ZXNJbnRlcnNlY3QoYm91bmRzLCB7XG4gICAgeDogcG9pbnQueCxcbiAgICB5OiBwb2ludC55LFxuICAgIHdpZHRoOiAwLFxuICAgIGhlaWdodDogMFxuICB9KTtcbn1cblxuZnVuY3Rpb24gZG9DaXJjbGVQb2ludEludGVyc2VjdChjaXJjbGUsIHBvaW50KSB7XG4gIHJldHVybiBkb0NpcmNsZXNJbnRlcnNlY3QoY2lyY2xlLCB7XG4gICAgeDogcG9pbnQueCxcbiAgICB5OiBwb2ludC55LFxuICAgIHI6IDBcbiAgfSk7XG59IC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvR2FtZXMvVGVjaG5pcXVlcy8yRF9jb2xsaXNpb25fZGV0ZWN0aW9uI0F4aXMtQWxpZ25lZF9Cb3VuZGluZ19Cb3hcblxuXG5mdW5jdGlvbiBkb0JvdW5kaW5nQm94ZXNJbnRlcnNlY3QoYm94MSwgYm94Mikge1xuICByZXR1cm4gYm94MS54IDw9IGJveDIueCArIGJveDIud2lkdGggJiYgYm94MS54ICsgYm94MS53aWR0aCA+PSBib3gyLnggJiYgYm94MS55IDw9IGJveDIueSArIGJveDIuaGVpZ2h0ICYmIGJveDEueSArIGJveDEuaGVpZ2h0ID49IGJveDIueTtcbn0gLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9HYW1lcy9UZWNobmlxdWVzLzJEX2NvbGxpc2lvbl9kZXRlY3Rpb24jQ2lyY2xlX0NvbGxpc2lvblxuXG5cbmZ1bmN0aW9uIGRvQ2lyY2xlc0ludGVyc2VjdChjaXJjbGUxLCBjaXJjbGUyKSB7XG4gIHZhciBkeCA9IGNpcmNsZTEueCAtIGNpcmNsZTIueDtcbiAgdmFyIGR5ID0gY2lyY2xlMS55IC0gY2lyY2xlMi55O1xuICB2YXIgZGlzdGFuY2UgPSBNYXRoLnNxcnQoTWF0aC5wb3coZHgsIDIpICsgTWF0aC5wb3coZHksIDIpKTtcbiAgcmV0dXJuIGRpc3RhbmNlIDw9IGNpcmNsZTEuciArIGNpcmNsZTIucjtcbn0gLy8gaHR0cHM6Ly95YWwuY2MvcmVjdGFuZ2xlLWNpcmNsZS1pbnRlcnNlY3Rpb24tdGVzdC9cblxuXG5mdW5jdGlvbiBkb0NpcmNsZUJvdW5kaW5nQm94SW50ZXJzZWN0KGNpcmNsZSwgYm94KSB7XG4gIHZhciBkeCA9IGNpcmNsZS54IC0gTWF0aC5tYXgoYm94LngsIE1hdGgubWluKGNpcmNsZS54LCBib3gueCArIGJveC53aWR0aCkpO1xuICB2YXIgZHkgPSBjaXJjbGUueSAtIE1hdGgubWF4KGJveC55LCBNYXRoLm1pbihjaXJjbGUueSwgYm94LnkgKyBib3guaGVpZ2h0KSk7XG4gIHJldHVybiBNYXRoLnBvdyhkeCwgMikgKyBNYXRoLnBvdyhkeSwgMikgPD0gTWF0aC5wb3coY2lyY2xlLnIsIDIpO1xufVxuXG5mdW5jdGlvbiBkb0JvdW5kc0ludGVyc2VjdChib3VuZDEsIGJvdW5kMikge1xuICB2YXIgaXNCb3VuZDFDaXJjbGUgPSBpc0NpcmNsZShib3VuZDEpO1xuICB2YXIgaXNCb3VuZDJDaXJjbGUgPSBpc0NpcmNsZShib3VuZDIpO1xuICB2YXIgaXNCb3VuZDFCb3VuZGluZ0JveCA9IGlzQm91bmRpbmdCb3goYm91bmQxKTtcbiAgdmFyIGlzQm91bmQyQm91bmRpbmdCb3ggPSBpc0JvdW5kaW5nQm94KGJvdW5kMik7XG4gIHZhciBpc0JvdW5kMVBvaW50ID0gaXNQb2ludChib3VuZDEpO1xuICB2YXIgaXNCb3VuZDJQb2ludCA9IGlzUG9pbnQoYm91bmQyKTsgLy8gVGhleSBhcmUgYm90aCBjaXJjbGVzXG5cbiAgaWYgKGlzQm91bmQxQ2lyY2xlICYmIGlzQm91bmQyQ2lyY2xlKSB7XG4gICAgcmV0dXJuIGRvQ2lyY2xlc0ludGVyc2VjdChib3VuZDEsIGJvdW5kMik7XG4gIH0gLy8gVGhleSBhcmUgYm90aCBib3VuZGluZyBib3hlc1xuXG5cbiAgaWYgKGlzQm91bmQxQm91bmRpbmdCb3ggJiYgaXNCb3VuZDJCb3VuZGluZ0JveCkge1xuICAgIHJldHVybiBkb0JvdW5kaW5nQm94ZXNJbnRlcnNlY3QoYm91bmQxLCBib3VuZDIpO1xuICB9IC8vIFRoZXkgYXJlIGJvdGggcG9pbnRzXG5cblxuICBpZiAoaXNCb3VuZDFQb2ludCAmJiBpc0JvdW5kMlBvaW50KSB7XG4gICAgcmV0dXJuIGRvUG9pbnRzSW50ZXJzZWN0KGJvdW5kMSwgYm91bmQyKTtcbiAgfSAvLyAxIGlzIGNpcmNsZSwgMiBpcyBib3VuZGluZyBib3hcblxuXG4gIGlmIChpc0JvdW5kMUNpcmNsZSAmJiBpc0JvdW5kMkJvdW5kaW5nQm94KSB7XG4gICAgcmV0dXJuIGRvQ2lyY2xlQm91bmRpbmdCb3hJbnRlcnNlY3QoYm91bmQxLCBib3VuZDIpO1xuICB9IC8vIDEgaXMgY2lyY2xlLCAyIGlzIHBvaW50XG5cblxuICBpZiAoaXNCb3VuZDFDaXJjbGUgJiYgaXNCb3VuZDJQb2ludCkge1xuICAgIHJldHVybiBkb0NpcmNsZVBvaW50SW50ZXJzZWN0KGJvdW5kMSwgYm91bmQyKTtcbiAgfSAvLyAxIGlzIGJvdW5kaW5nIGJveCwgMiBpcyBjaXJjbGVcblxuXG4gIGlmIChpc0JvdW5kMUJvdW5kaW5nQm94ICYmIGlzQm91bmQyQ2lyY2xlKSB7XG4gICAgcmV0dXJuIGRvQ2lyY2xlQm91bmRpbmdCb3hJbnRlcnNlY3QoYm91bmQyLCBib3VuZDEpO1xuICB9IC8vIDEgaXMgYm91bmRpbmcgYm94LCAyIGlzIHBvaW50XG5cblxuICBpZiAoaXNCb3VuZDFCb3VuZGluZ0JveCAmJiBpc0JvdW5kMlBvaW50KSB7XG4gICAgcmV0dXJuIGRvQm91bmRpbmdCb3hQb2ludEludGVyc2VjdChib3VuZDEsIGJvdW5kMik7XG4gIH0gLy8gMSBpcyBwb2ludCwgMiBpcyAyIGlzIGNpcmNsZVxuXG5cbiAgaWYgKGlzQm91bmQxUG9pbnQgJiYgaXNCb3VuZDJDaXJjbGUpIHtcbiAgICByZXR1cm4gZG9DaXJjbGVQb2ludEludGVyc2VjdChib3VuZDIsIGJvdW5kMSk7XG4gIH0gLy8gMSBpcyBwb2ludCwgMiBpcyBib3VuZGluZyBib3hcblxuXG4gIHJldHVybiBkb0JvdW5kaW5nQm94UG9pbnRJbnRlcnNlY3QoYm91bmQyLCBib3VuZDEpO1xufVxuZnVuY3Rpb24gZGl2aWRlQm91bmRpbmdCb3goYm91bmRzKSB7XG4gIHZhciBxdWFkV2lkdGggPSBib3VuZHMud2lkdGggLyAyO1xuICB2YXIgcXVhZEhlaWdodCA9IGJvdW5kcy5oZWlnaHQgLyAyO1xuICB2YXIgb2Zmc2V0WCA9IGJvdW5kcy54ICsgcXVhZFdpZHRoO1xuICB2YXIgb2Zmc2V0WSA9IGJvdW5kcy55ICsgcXVhZEhlaWdodDtcbiAgdmFyIG53Qm91bmRpbmdCb3ggPSB7XG4gICAgeDogYm91bmRzLngsXG4gICAgeTogYm91bmRzLnksXG4gICAgd2lkdGg6IHF1YWRXaWR0aCxcbiAgICBoZWlnaHQ6IHF1YWRIZWlnaHRcbiAgfTtcbiAgdmFyIG5lQm91bmRpbmdCb3ggPSB7XG4gICAgeDogb2Zmc2V0WCxcbiAgICB5OiBib3VuZHMueSxcbiAgICB3aWR0aDogcXVhZFdpZHRoLFxuICAgIGhlaWdodDogcXVhZEhlaWdodFxuICB9O1xuICB2YXIgc3dCb3VuZGluZ0JveCA9IHtcbiAgICB4OiBib3VuZHMueCxcbiAgICB5OiBvZmZzZXRZLFxuICAgIHdpZHRoOiBxdWFkV2lkdGgsXG4gICAgaGVpZ2h0OiBxdWFkSGVpZ2h0XG4gIH07XG4gIHZhciBzZUJvdW5kaW5nQm94ID0ge1xuICAgIHg6IG9mZnNldFgsXG4gICAgeTogb2Zmc2V0WSxcbiAgICB3aWR0aDogcXVhZFdpZHRoLFxuICAgIGhlaWdodDogcXVhZEhlaWdodFxuICB9O1xuICByZXR1cm4gW253Qm91bmRpbmdCb3gsIG5lQm91bmRpbmdCb3gsIHN3Qm91bmRpbmdCb3gsIHNlQm91bmRpbmdCb3hdO1xufVxuZnVuY3Rpb24gY3JlYXRlUG9pbnRLZXkocG9pbnQpIHtcbiAgcmV0dXJuIFwiKFwiLmNvbmNhdChwb2ludC54LCBcIixcIikuY29uY2F0KHBvaW50LnksIFwiKVwiKTtcbn1cbmZ1bmN0aW9uIGZsYXR0ZW5TZXRzKHNldHMpIHtcbiAgdmFyIGZsYXR0ZW5lZFNldCA9IG5ldyBTZXQoKTtcbiAgKHNldHMgfHwgW10pLmZvckVhY2goZnVuY3Rpb24gKHNldCkge1xuICAgIGlmIChzZXQuc2l6ZSA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNldC5mb3JFYWNoKGZ1bmN0aW9uIChzZXRJdGVtKSB7XG4gICAgICByZXR1cm4gZmxhdHRlbmVkU2V0LmFkZChzZXRJdGVtKTtcbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBmbGF0dGVuZWRTZXQ7XG59XG5cbmZ1bmN0aW9uIGFkZFRvUXVhZFRyZWUocXVhZFRyZWUsIG9iamVjdCkge1xuICB2YXIgb2JqZWN0Qm91bmQgPSBvYmplY3QuZ2V0Qm91bmRzKCk7IC8vIExldCdzIGZpcnN0IGNoZWNrIGlmIHRoZSBwb2ludCB0aGlzIG9iamVjdCBvY2N1cGllcyBpcyB3aXRoaW5cbiAgLy8gdGhlIGJvdW5kcyBvZiB0aGUgYnVja2V0XG5cbiAgaWYgKCFkb0JvdW5kc0ludGVyc2VjdChxdWFkVHJlZS5ib3VuZHMsIG9iamVjdEJvdW5kKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSAvLyBDaGVja2luZyBjaGlsZHJlbiwgaWYgdGhpcyBub2RlIGlzIGEgXCJDb250YWluZXJcIiAoTm8gZGF0YSlcblxuXG4gIGlmICgocXVhZFRyZWUucXVhZHJhbnRzIHx8IFtdKS5sZW5ndGggPiAwKSB7XG4gICAgLy8gUnVuIHRocm91Z2ggYWxsIGNoaWxkcmVuIGNoZWNraW5nIGlmIHRoZSBvYmplY3QgY2FuIGJlIGFkZGVkXG4gICAgLy8gQXQgdGhlIGZpcnN0IHN1Y2Nlc3NmdWwgYWRkLCB3ZSBjYW4gYmFpbCBvdXQsIG9ubHkgbmVlZHMgdG8gYmUgc3RvcmVkIG9uY2VcbiAgICB2YXIgd2FzQWRkZWRUb0NoaWxkID0gcXVhZFRyZWUucXVhZHJhbnRzLnNvbWUoZnVuY3Rpb24gKHF1YWRyYW50KSB7XG4gICAgICByZXR1cm4gYWRkVG9RdWFkVHJlZShxdWFkcmFudCwgb2JqZWN0KTtcbiAgICB9KTsgLy8gT25seSBsZWFmIG5vZGVzIHNob3VsZCBoYXZlIGRhdGEgKFdlIGFyZSBhIFwiQ29udGFpbmVyIG5vZGVcIilcbiAgICAvLyBJZiBpdCBkaWRuJ3QgaW50ZXJzZWN0IHdpdGggYW55IGNoaWxkLCBpdCB3b24ndCBpbnRlcnNlY3Qgd2l0aCB1c1xuXG4gICAgcmV0dXJuIHdhc0FkZGVkVG9DaGlsZDtcbiAgfSAvLyBMZXQncyBnZXQgdGhlIGRhdGEgYWxyZWFkeSBhc3NvY2lhdGVkIHdpdGggdGhpcyBidWNrZXRcblxuXG4gIHZhciBvYmplY3RQb2ludEtleSA9IGNyZWF0ZVBvaW50S2V5KG9iamVjdEJvdW5kKTtcbiAgdmFyIG9iamVjdFBvaW50U2V0ID0gcXVhZFRyZWUuZGF0YS5nZXQob2JqZWN0UG9pbnRLZXkpIHx8IG5ldyBTZXQoKTsgLy8gTGV0J3MgY2hlY2sgaWYgdGhlIG9iamVjdCBpcyBhbHJlYWR5IGluIHRoZSBidWNrZXRcblxuICBpZiAob2JqZWN0UG9pbnRTZXQuaGFzKG9iamVjdCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0gLy8gTGV0J3Mgc2VlIGlmIHRoaXMgcXVhZHJhbnQgaGFzIGFueSBjYXBhY2l0eVxuICAvLyBJZiBpdCBkb2VzLCB3ZSBjYW4gZ28gYWhlYWQgYW5kIHN0b3JlIHRoZSBjdXJyZW50IG9iamVjdFxuICAvL1xuICAvLyBXZSBhbHNvIHdhbm5hIGdvIGFoZWFkIGFuZCBhZGQsIGlmIHRoaXMgcG9pbnQgKHgsIHkpIGhhcyBhbHJlYWR5XG4gIC8vIGhhZCBhbiBvYmplY3QgYWRkZWQsIHdlJ2xsIGNoYWluIGl0IG9uIHRvIHRoZSBsaXN0IG9mIG9iamVjdHMgXG4gIC8vIGFzc29jaWF0ZWQgd2l0aCB0aGlzIHBvaW50XG5cblxuICBpZiAob2JqZWN0UG9pbnRTZXQuc2l6ZSA+IDAgfHwgcXVhZFRyZWUuZGF0YS5zaXplICsgMSA8PSBxdWFkVHJlZS5jYXBhY2l0eSkge1xuICAgIHF1YWRUcmVlLmRhdGEuc2V0KG9iamVjdFBvaW50S2V5LCBuZXcgU2V0KFtdLmNvbmNhdChfdG9Db25zdW1hYmxlQXJyYXkob2JqZWN0UG9pbnRTZXQpLCBbb2JqZWN0XSkpKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSAvLyBUaGUgY3VycmVudCBub2RlIGZpdHMgdGhlIGN1cnJlbnQgb2JqZWN0LCBidXRcbiAgLy8gVGhlcmUgaXNuJ3QgYW55IGNhcGFjaXR5XG4gIC8vIFdlIG5lZWQgdG8gc3BsaXQgdGhpcyBidWNrZXQgdXBcbiAgLy8gTGV0J3MgZmlyc3QgYnVpbGQgdGhlIGNoaWxkIHF1YWRyYW50c1xuICAvLyBMZXQncyBjcmVhdGUgdGhlIGNoaWxkIFF1YWRUcmVlJ3MgZnJvbSB0aGUgZGl2aWRlZCBxdWFkcmFudCBib3VuZHNcblxuXG4gIHZhciBxdWFkQm94ZXMgPSBkaXZpZGVCb3VuZGluZ0JveChxdWFkVHJlZS5ib3VuZHMpO1xuICB2YXIgcXVhZHJhbnRzID0gcXVhZEJveGVzLm1hcChmdW5jdGlvbiAocXVhZEJveCkge1xuICAgIHJldHVybiBjcmVhdGVRdWFkVHJlZShxdWFkQm94LCBxdWFkVHJlZS5jYXBhY2l0eSk7XG4gIH0pO1xuICB2YXIgcXVhZE9iamVjdHMgPSBbXS5jb25jYXQoX3RvQ29uc3VtYWJsZUFycmF5KGZsYXR0ZW5TZXRzKF90b0NvbnN1bWFibGVBcnJheShxdWFkVHJlZS5kYXRhLnZhbHVlcygpKSkpLCBbb2JqZWN0XSk7IC8vIGFkanVzdCBjdXJyZW50IHF1YWR0cmVlIHNldHRpbmdzXG4gIC8vIE1heSBuZWVkIHRvIGFkanVzdCB0aGVzZSBpbi1wbGFjZSBpbnN0ZWFkIG9mIGNyZWF0aW5nIG5ldyByZWZlcmVuY2VzXG5cbiAgY2xlYXJRdWFkVHJlZShxdWFkVHJlZSk7XG4gIHF1YWRUcmVlLnF1YWRyYW50cyA9IHF1YWRyYW50czsgLy8gYWRkIG9iamVjdHMgZnJvbSB0aGlzIHF1YWQgbm9kZSBiYWNrIHRvIGl0J3Mgb3duIHN1YnRyZWVcbiAgLy8gY2hpbGRyZW4gd2lsbCBiZSBhdHRlbXB0ZWQgdG8gYmUgYWRkZWQgdG8gZmlyc3RcblxuICByZXR1cm4gcXVhZE9iamVjdHMuZXZlcnkoZnVuY3Rpb24gKHF1YWRPYmplY3QpIHtcbiAgICByZXR1cm4gYWRkVG9RdWFkVHJlZShxdWFkVHJlZSwgcXVhZE9iamVjdCk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiByZW1vdmVGcm9tUXVhZFRyZWUocXVhZFRyZWUsIG9iamVjdCkge1xuICB2YXIgb2JqZWN0Qm91bmQgPSBvYmplY3QuZ2V0Qm91bmRzKCk7XG4gIHZhciBvYmplY3RQb2ludEtleSA9IGNyZWF0ZVBvaW50S2V5KG9iamVjdEJvdW5kKTtcbiAgdmFyIG9iamVjdFBvaW50U2V0ID0gcXVhZFRyZWUuZGF0YS5nZXQob2JqZWN0UG9pbnRLZXkpIHx8IG5ldyBTZXQoKTsgLy8gSWYgb2JqZWN0IGlzIGZvdW5kLCBsZXQncyByZW1vdmUgaXRcblxuICBpZiAob2JqZWN0UG9pbnRTZXQuaGFzKG9iamVjdCkpIHtcbiAgICBvYmplY3RQb2ludFNldFtcImRlbGV0ZVwiXShvYmplY3QpOyAvLyBJZiB0aGVyZSB3ZXJlIG11bHRpcGxlIG9iamVjdHMgYXQgdGhpcyBwb2ludFxuICAgIC8vIHdlIGRvbid0IG5lZWQgdG8gcmVtb3ZlIHRoaXMgcG9pbnQga2V5XG5cbiAgICBpZiAob2JqZWN0UG9pbnRTZXQuc2l6ZSA+IDApIHtcbiAgICAgIHF1YWRUcmVlLmRhdGEuc2V0KG9iamVjdFBvaW50S2V5LCBvYmplY3RQb2ludFNldCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHF1YWRUcmVlLmRhdGFbXCJkZWxldGVcIl0ob2JqZWN0UG9pbnRLZXkpO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9IC8vIENoZWNrIGNoaWxkcmVuIHRvIGZpbmQgb2JqZWN0IGFuZCByZW1vdmUgaWYgZm91bmRcblxuXG4gIHZhciB3YXNSZW1vdmVkID0gcXVhZFRyZWUucXVhZHJhbnRzLnNvbWUoZnVuY3Rpb24gKHF1YWRyYW50KSB7XG4gICAgcmV0dXJuIHJlbW92ZUZyb21RdWFkVHJlZShxdWFkcmFudCwgb2JqZWN0KTtcbiAgfSk7IC8vIElmIG9uZSBvZiB0aGUgY2hpbGRyZW4gY29udGFpbmVkIHRoZSBvYmplY3Qgd2UganVzdCByZW1vdmVkXG4gIC8vIExldCdzIHF1ZXJ5IHRoZSBib3VuZGluZyBib3ggb2YgdXMgKHRoZSBwYXJlbnQpIHRvIHNlZSBpZiB3ZSBcbiAgLy8gY2FuIGNvbGxhcHNlIG9yIGNvbnN1bWUgb3VyIGNoaWxkcmVuLiBNZWFuaW5nIHRoZSBjaGlsZCBzdWJ0cmVlXG4gIC8vIGNvbnRhaW5zIGxlc3MgZWxlbWVudHMgdGhhbiBvdXIgaW5kaXZpZHVhbCBidWNrZXQgY2FwYWNpdHkuXG5cbiAgaWYgKHdhc1JlbW92ZWQpIHtcbiAgICB2YXIgY2hpbGRPYmplY3RTZXQgPSBxdWVyeVF1YWRUcmVlKHF1YWRUcmVlLCBxdWFkVHJlZS5ib3VuZHMpO1xuXG4gICAgaWYgKGNoaWxkT2JqZWN0U2V0LnNpemUgPD0gcXVhZFRyZWUuY2FwYWNpdHkpIHtcbiAgICAgIGNsZWFyUXVhZFRyZWUocXVhZFRyZWUpO1xuICAgICAgY2hpbGRPYmplY3RTZXQuZm9yRWFjaChmdW5jdGlvbiAoY2hpbGRPYmplY3QpIHtcbiAgICAgICAgcmV0dXJuIGFkZFRvUXVhZFRyZWUocXVhZFRyZWUsIGNoaWxkT2JqZWN0KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB3YXNSZW1vdmVkO1xufVxuXG5mdW5jdGlvbiBjbGVhclF1YWRUcmVlKHF1YWRUcmVlKSB7XG4gIHF1YWRUcmVlLmRhdGEgPSBuZXcgTWFwKCk7XG4gIHF1YWRUcmVlLnF1YWRyYW50cyA9IFtdO1xufVxuXG5mdW5jdGlvbiBxdWVyeVF1YWRUcmVlKHF1YWRUcmVlLCBib3VuZHMpIHtcbiAgLy8gQ2hlY2sgZmlyc3QgaWYgdGhlIHF1ZXJ5IGJvdW5kcyBpbnRlcnNlY3Qgd2l0aCB0aGUgYm91bmRzXG4gIC8vIG9mIHRoZSBidWNrZXQsIGlmIGl0IGRvZXNuJ3Qgd2UgY2FuIGJhaWwgaW1tZWRpYXRlbHkgd2l0aCBhbiBlbXB0eSBsaXN0XG4gIGlmICghZG9Cb3VuZHNJbnRlcnNlY3QocXVhZFRyZWUuYm91bmRzLCBib3VuZHMpKSB7XG4gICAgcmV0dXJuIG5ldyBTZXQoKTtcbiAgfSAvLyBDaGVjayBpZiBjdXJyZW50IG5vZGUgaGFzIGNoaWxkcmVuXG5cblxuICBpZiAoKHF1YWRUcmVlLnF1YWRyYW50cyB8fCBbXSkubGVuZ3RoID09PSAwKSB7XG4gICAgLy8gTGV0J3MgaXRlcmF0ZSBvdmVyIHRoZSBkYXRhIGluIHRoZSBidWNrZXQgdG8gc2VlXG4gICAgLy8gaWYgdGhlIG9iamVjdHMgdGhlbXNlbHZlcyBpbnRlcnNlY3Qgd2l0aCB0aGUgcXVlcnkgYm91bmRzXG4gICAgcmV0dXJuIG5ldyBTZXQoX3RvQ29uc3VtYWJsZUFycmF5KGZsYXR0ZW5TZXRzKF90b0NvbnN1bWFibGVBcnJheShxdWFkVHJlZS5kYXRhLnZhbHVlcygpKSkpLmZpbHRlcihmdW5jdGlvbiAocXVhZE9iamVjdCkge1xuICAgICAgcmV0dXJuIGRvQm91bmRzSW50ZXJzZWN0KHF1YWRPYmplY3QuZ2V0Qm91bmRzKCksIGJvdW5kcyk7XG4gICAgfSkpO1xuICB9IC8vIENoZWNrIHRoZSBjdXJyZW50IG5vZGVzIGNoaWxkcmVuXG4gIC8vIHF1ZXJ5aW5nIHRoZW0gZm9yIHRoZSBzYW1lIGluZm8gYW5kIGNvbGxlY3RpbmdcbiAgLy8gdGhlIHJlc3VsdHNcblxuXG4gIHZhciBjaGlsZFF1ZXJ5UmVzdWx0U2V0ID0gZmxhdHRlblNldHMocXVhZFRyZWUucXVhZHJhbnRzLm1hcChmdW5jdGlvbiAocXVhZHJhbnQpIHtcbiAgICByZXR1cm4gcXVlcnlRdWFkVHJlZShxdWFkcmFudCwgYm91bmRzKTtcbiAgfSkpO1xuICByZXR1cm4gY2hpbGRRdWVyeVJlc3VsdFNldDtcbn1cblxuZnVuY3Rpb24gZ2V0UXVhZFRyZWVEYXRhKHF1YWRUcmVlKSB7XG4gIHJldHVybiBfdG9Db25zdW1hYmxlQXJyYXkoZmxhdHRlblNldHMoX3RvQ29uc3VtYWJsZUFycmF5KHF1YWRUcmVlLmRhdGEudmFsdWVzKCkpKSk7XG59XG4vKipcbiAqIENyZWF0ZXMgYSBxdWFkdHJlZSBcIm1hbmFnaW5nXCIgdGhlIGlucHV0IGJvdW5kcyB3aXRoIGlucHV0IG5vZGUgY2FwYWNpdHkuXG4gKiBcbiAqIEFsbCBjb2xsaXNpb24gb2JqZWN0cyBzaG91bGQgaW50ZXJzZWN0IG9yIGJlIGNvbnRhaW5lZCB3aXRoaW4gdGhlc2UgXCJtYW5hZ2VkXCIgYm91bmRzLlxuICogQHBhcmFtIHtCb3VuZGluZ0JveH0gYm91bmRzIC0gVGhlIGJvdW5kaW5nIGJveCB3aXRoIHdoaWNoIHRoZSBxdWFkdHJlZSBcIm1hbmFnZXNcIi5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbY2FwYWNpdHk9M10gLSBUaGUgIyBvZiBjb2xsaXNpb24gb2JqZWN0cyBhIG5vZGUgY2FuIGNvbnRhaW4gYmVmb3JlIHN1YmRpdmlkaW5nLlxuICogQHJldHVybiB7UXVhZFRyZWV9IFRoZSBjcmVhdGVkIHF1YWR0cmVlIFwibWFuYWdpbmdcIiB0aGUgaW5wdXQgYm91bmRzLlxuICovXG5cblxuZnVuY3Rpb24gY3JlYXRlUXVhZFRyZWUoYm91bmRzKSB7XG4gIHZhciBjYXBhY2l0eSA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogMztcbiAgdmFyIHF1YWRUcmVlID0ge1xuICAgIGJvdW5kczogYm91bmRzLFxuICAgIGRhdGE6IG5ldyBNYXAoKSxcbiAgICBjYXBhY2l0eTogY2FwYWNpdHksXG4gICAgcXVhZHJhbnRzOiBbXSxcbiAgICBhZGQ6IGZ1bmN0aW9uIGFkZChvYmplY3QpIHtcbiAgICAgIHJldHVybiBhZGRUb1F1YWRUcmVlKHF1YWRUcmVlLCBvYmplY3QpO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUob2JqZWN0KSB7XG4gICAgICByZXR1cm4gcmVtb3ZlRnJvbVF1YWRUcmVlKHF1YWRUcmVlLCBvYmplY3QpO1xuICAgIH0sXG4gICAgY2xlYXI6IGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgICAgcmV0dXJuIGNsZWFyUXVhZFRyZWUocXVhZFRyZWUpO1xuICAgIH0sXG4gICAgcXVlcnk6IGZ1bmN0aW9uIHF1ZXJ5KGJvdW5kcykge1xuICAgICAgcmV0dXJuIHF1ZXJ5UXVhZFRyZWUocXVhZFRyZWUsIGJvdW5kcyk7XG4gICAgfSxcbiAgICBnZXREYXRhOiBmdW5jdGlvbiBnZXREYXRhKCkge1xuICAgICAgcmV0dXJuIGdldFF1YWRUcmVlRGF0YShxdWFkVHJlZSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gcXVhZFRyZWU7XG59XG5cbmV4cG9ydCB7IGNyZWF0ZVF1YWRUcmVlIH07XG4iLCJpbXBvcnQgeyBQaXhlbCwgQ29sb3IgfSBmcm9tICcuL3NjaGVtYSc7XG5pbXBvcnQgR0lGIGZyb20gJ2dpZi5qcyc7XG5cbmV4cG9ydCBjb25zdCBQSVhFTF9XSURUSDogbnVtYmVyID0gNDtcbmV4cG9ydCBjb25zdCBXSElURV9DT0xPUjogQ29sb3IgPSB7XG4gICAgcjogMjU1LFxuICAgIGc6IDI1NSxcbiAgICBiOiAyNTUsXG4gICAgYTogMjU1LFxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRJbWFnZShpbWFnZUZpbGU6IEZpbGUpOiBQcm9taXNlPEhUTUxJbWFnZUVsZW1lbnQ+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBjb25zdCBpbWFnZUZpbGVEYXRhVXJsID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoaW1hZ2VGaWxlKTtcbiAgICAgICAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcblxuICAgICAgICBpbWFnZS5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgICB3aW5kb3cuVVJMLnJldm9rZU9iamVjdFVSTChpbWFnZUZpbGVEYXRhVXJsKTtcbiAgICAgICAgICAgIHJlc29sdmUoaW1hZ2UpXG4gICAgICAgIH07XG4gICAgICAgIGltYWdlLm9uZXJyb3IgPSAoZXJyKSA9PiB7XG4gICAgICAgICAgICB3aW5kb3cuVVJMLnJldm9rZU9iamVjdFVSTChpbWFnZUZpbGVEYXRhVXJsKTtcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9O1xuICAgICAgICBpbWFnZS5zcmMgPSBpbWFnZUZpbGVEYXRhVXJsO1xuICAgIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0QXZlcmFnZUNvbG9yKHBpeGVsczogUGl4ZWxbXSk6IENvbG9yIHtcbiAgICBsZXQgc3F1YXJlZFN1bVI6IG51bWJlcjtcbiAgICBsZXQgc3F1YXJlZFN1bUc6IG51bWJlcjtcbiAgICBsZXQgc3F1YXJlZFN1bUI6IG51bWJlcjtcbiAgICBsZXQgc3F1YXJlZFN1bUE6IG51bWJlcjtcbiAgICBsZXQgYXZlcmFnZUNvbG9yOiBDb2xvciA9IHBpeGVsc1swXSB8fCBXSElURV9DT0xPUjtcblxuICAgIGlmIChwaXhlbHMubGVuZ3RoID4gMSkge1xuICAgICAgICByZXR1cm4gcGl4ZWxzLnNsaWNlKDEpXG4gICAgICAgICAgICAucmVkdWNlKChwcmV2QXZlcmFnZTogQ29sb3IsIGN1cnJQaXhlbDogUGl4ZWwpID0+IHtcbiAgICAgICAgICAgICAgICBzcXVhcmVkU3VtUiA9IE1hdGgucG93KHByZXZBdmVyYWdlLnIsIDIpICsgTWF0aC5wb3coY3VyclBpeGVsLnIsIDIpO1xuICAgICAgICAgICAgICAgIHNxdWFyZWRTdW1HID0gTWF0aC5wb3cocHJldkF2ZXJhZ2UuZywgMikgKyBNYXRoLnBvdyhjdXJyUGl4ZWwuZywgMik7XG4gICAgICAgICAgICAgICAgc3F1YXJlZFN1bUIgPSBNYXRoLnBvdyhwcmV2QXZlcmFnZS5iLCAyKSArIE1hdGgucG93KGN1cnJQaXhlbC5iLCAyKTtcbiAgICAgICAgICAgICAgICBzcXVhcmVkU3VtQSA9IE1hdGgucG93KHByZXZBdmVyYWdlLmEsIDIpICsgTWF0aC5wb3coY3VyclBpeGVsLmEsIDIpO1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHI6IE1hdGguc3FydChzcXVhcmVkU3VtUiAvIDIpLFxuICAgICAgICAgICAgICAgICAgICBnOiBNYXRoLnNxcnQoc3F1YXJlZFN1bUcgLyAyKSxcbiAgICAgICAgICAgICAgICAgICAgYjogTWF0aC5zcXJ0KHNxdWFyZWRTdW1CIC8gMiksXG4gICAgICAgICAgICAgICAgICAgIGE6IE1hdGguc3FydChzcXVhcmVkU3VtQSAvIDIpLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9LCBhdmVyYWdlQ29sb3IpO1xuICAgIH1cblxuICAgIHJldHVybiBhdmVyYWdlQ29sb3I7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVBpeGVsKHg6IG51bWJlciwgeTogbnVtYmVyLCByOiBudW1iZXIsIGc6IG51bWJlciwgYjogbnVtYmVyLCBhOiBudW1iZXIpOiBQaXhlbCB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgeCxcbiAgICAgICAgeSxcbiAgICAgICAgcixcbiAgICAgICAgZyxcbiAgICAgICAgYixcbiAgICAgICAgYSxcbiAgICAgICAgZ2V0Qm91bmRzKCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB4OiB0aGlzLngsXG4gICAgICAgICAgICAgICAgeTogdGhpcy55LFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVBpeGVscyhpbWFnZURhdGE6IEltYWdlRGF0YSk6IFBpeGVsW10ge1xuICAgIGxldCBwaXhlbHM6IFBpeGVsW10gPSBbXTtcbiAgICBwcm9jZXNzSW1hZ2VEYXRhKGltYWdlRGF0YSwgcGl4ZWwgPT4gcGl4ZWxzLnB1c2gocGl4ZWwpKTtcbiAgICByZXR1cm4gcGl4ZWxzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmlsbFBpeGVsSW5JbWFnZURhdGEoaW1hZ2VEYXRhOiBJbWFnZURhdGEsIHBpeGVsOiBQaXhlbCk6IHZvaWQge1xuICAgIGNvbnN0IHBpeGVsT2Zmc2V0OiBudW1iZXIgPSAocGl4ZWwueCArIHBpeGVsLnkgKiBpbWFnZURhdGEud2lkdGgpICogUElYRUxfV0lEVEg7XG4gICAgaWYgKHBpeGVsT2Zmc2V0IDwgMCB8fCBwaXhlbE9mZnNldCArIFBJWEVMX1dJRFRIID49IGltYWdlRGF0YS5kYXRhLmxlbmd0aCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGltYWdlRGF0YS5kYXRhW3BpeGVsT2Zmc2V0XSA9IHBpeGVsLnI7XG4gICAgaW1hZ2VEYXRhLmRhdGFbcGl4ZWxPZmZzZXQgKyAxXSA9IHBpeGVsLmc7XG4gICAgaW1hZ2VEYXRhLmRhdGFbcGl4ZWxPZmZzZXQgKyAyXSA9IHBpeGVsLmI7XG4gICAgaW1hZ2VEYXRhLmRhdGFbcGl4ZWxPZmZzZXQgKyAzXSA9IHBpeGVsLmE7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRJbWFnZURhdGFPZmZTY3JlZW4oaW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKTogSW1hZ2VEYXRhIHtcbiAgICBjb25zdCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgY29uc3QgY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEID0gY2FudmFzLmdldENvbnRleHQoJzJkJykgYXMgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuXG4gICAgY2FudmFzLndpZHRoID0gd2lkdGg7XG4gICAgY2FudmFzLmhlaWdodCA9IGhlaWdodDtcblxuICAgIGNvbnRleHQuZHJhd0ltYWdlKGltYWdlLCAwLCAwLCBpbWFnZS53aWR0aCwgaW1hZ2UuaGVpZ2h0LCAwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuXG4gICAgY29uc3QgaW1hZ2VEYXRhOiBJbWFnZURhdGEgPSBjb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgIHJldHVybiBpbWFnZURhdGE7XG59XG5cbmZ1bmN0aW9uIHByb2Nlc3NJbWFnZURhdGEoaW1hZ2VEYXRhOiBJbWFnZURhdGEsIHByb2Nlc3NGdW5jOiAocGl4ZWw6IFBpeGVsKSA9PiB2b2lkLCBpbml0UGl4ZWxYOiBudW1iZXIgPSAwLCBpbml0UGl4ZWxZOiBudW1iZXIgPSAwKTogdm9pZCB7XG4gICAgbGV0IHI6IG51bWJlcjtcbiAgICBsZXQgZzogbnVtYmVyO1xuICAgIGxldCBiOiBudW1iZXI7XG4gICAgbGV0IGE6IG51bWJlcjtcbiAgICBsZXQgb2Zmc2V0WDogbnVtYmVyO1xuICAgIGxldCBvZmZzZXRZOiBudW1iZXI7XG4gICAgbGV0IHBpeGVsOiBQaXhlbDtcblxuICAgIGZvciAobGV0IHggPSBpbml0UGl4ZWxYOyB4IDwgaW1hZ2VEYXRhLndpZHRoOyB4KyspIHtcbiAgICAgICAgb2Zmc2V0WCA9IHggKiBQSVhFTF9XSURUSDtcblxuICAgICAgICBmb3IgKGxldCB5ID0gaW5pdFBpeGVsWTsgeSA8IGltYWdlRGF0YS5oZWlnaHQ7IHkrKykge1xuICAgICAgICAgICAgb2Zmc2V0WSA9IGltYWdlRGF0YS53aWR0aCAqIHkgKiBQSVhFTF9XSURUSDtcblxuICAgICAgICAgICAgciA9IGltYWdlRGF0YS5kYXRhW29mZnNldFggKyBvZmZzZXRZXTtcbiAgICAgICAgICAgIGcgPSBpbWFnZURhdGEuZGF0YVtvZmZzZXRYICsgb2Zmc2V0WSArIDFdO1xuICAgICAgICAgICAgYiA9IGltYWdlRGF0YS5kYXRhW29mZnNldFggKyBvZmZzZXRZICsgMl07XG4gICAgICAgICAgICBhID0gaW1hZ2VEYXRhLmRhdGFbb2Zmc2V0WCArIG9mZnNldFkgKyAzXTtcblxuICAgICAgICAgICAgcGl4ZWwgPSBjcmVhdGVQaXhlbCh4LCB5LCByLCBnLCBiLCBhKTtcbiAgICAgICAgICAgIHByb2Nlc3NGdW5jKHBpeGVsKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvR2lmKGltYWdlRnJhbWVzOiBJbWFnZURhdGFbXSk6IHZvaWQge1xuICAgIGNvbnN0IGdpZiA9IG5ldyBHSUYoe1xuICAgICAgICB3b3JrZXJzOiAyLFxuICAgICAgICBxdWFsaXR5OiAxMFxuICAgIH0pO1xuXG4gICAgaW1hZ2VGcmFtZXNcbiAgICAgICAgLmZvckVhY2goaW1hZ2VGcmFtZSA9PiBnaWYuYWRkRnJhbWUoaW1hZ2VGcmFtZSwge1xuICAgICAgICAgICAgZGVsYXk6IDIwMCxcbiAgICAgICAgfSkpO1xuXG4gICAgZ2lmLm9uKCdmaW5pc2hlZCcsIChibG9iOiBhbnkpID0+IHtcbiAgICAgICAgc2F2ZUJsb2IoJ3NpbXBsZXF1YWQuZXhwb3J0LmdpZicsIGJsb2IpO1xuICAgIH0pO1xuXG4gICAgZ2lmLnJlbmRlcigpO1xufVxuXG5mdW5jdGlvbiBzYXZlQmxvYihmaWxlTmFtZTogc3RyaW5nLCBibG9iOiBCbG9iKSB7XG4gICAgY29uc3QgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICAgIGNvbnN0IHVybCA9IHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuXG4gICAgYS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgYS5ocmVmID0gdXJsO1xuICAgIGEuZG93bmxvYWQgPSBmaWxlTmFtZTtcbiAgICBcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGEpO1xuICAgIGEuY2xpY2soKTtcblxuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoYSk7XG4gICAgd2luZG93LlVSTC5yZXZva2VPYmplY3RVUkwodXJsKTtcbn0iXSwic291cmNlUm9vdCI6IiJ9