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

/***/ "./node_modules/worker-loader/dist/cjs.js!./src/quad.worker.ts":
/*!*********************************************************************!*\
  !*** ./node_modules/worker-loader/dist/cjs.js!./src/quad.worker.ts ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = function() {
  return new Worker(__webpack_require__.p + "10e041b915b6e05c2ff4.worker.js");
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
var exportGifButton;
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
      exportGifButton.disabled = false;
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
  quadWorker.addEventListener('message', onWorkerMessage); // export logic

  exportGifButton = document.getElementById('export-gif');
  exportGifButton.addEventListener('click', function () {
    Object(_util__WEBPACK_IMPORTED_MODULE_0__["toGif"])(frames);
  }); // size canvas

  resizeCanvas();
}

main();

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
    return gif.addFrame(imageFrame);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2dpZi5qcy9kaXN0L2dpZi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcXVhZC53b3JrZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FuaW1hdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC50cyJdLCJuYW1lcyI6WyJjYW52YXMiLCJjb250ZXh0IiwiaW1hZ2VJbnB1dCIsImV4cG9ydEdpZkJ1dHRvbiIsInF1YWRXb3JrZXIiLCJmcmFtZXMiLCJvZmZsaW5lQW5pbWF0ZUlkIiwiZHJhdyIsImltYWdlRGF0YSIsImNsZWFyUmVjdCIsIndpZHRoIiwiaGVpZ2h0IiwicHV0SW1hZ2VEYXRhIiwib2ZmbGluZUFuaW1hdGUiLCJvZmZsaW5lRnJhbWVzIiwiYW5pbWF0ZUluZGV4IiwiY3VyckZyYW1lSW5kZXgiLCJudW1GcmFtZXNFYWNoIiwibmV4dEZyYW1lSW5kZXgiLCJuZXh0QW5pbWF0ZUluZGV4IiwibGVuZ3RoIiwid2luZG93IiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwicHJvY2Vzc0ltYWdlIiwiaW1hZ2VGaWxlIiwiY2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJsb2FkSW1hZ2UiLCJ0aGVuIiwiaW1hZ2VFbGVtIiwiZ2V0SW1hZ2VEYXRhT2ZmU2NyZWVuIiwibWVzc2FnZSIsInR5cGUiLCJkYXRhIiwicG9zdE1lc3NhZ2UiLCJvbkltYWdlQ2hhbmdlIiwiZXZlbnQiLCJ0YXJnZXQiLCJmaWxlcyIsImZpcnN0SW1hZ2UiLCJyZXNpemVDYW52YXMiLCJjb21wdXRlZFN0eWxlIiwiZ2V0Q29tcHV0ZWRTdHlsZSIsInBhcnNlSW50IiwiZ2V0UHJvcGVydHlWYWx1ZSIsIm9uV29ya2VyTWVzc2FnZSIsInB1c2giLCJ0aW1lc3RhbXAiLCJkaXNhYmxlZCIsImNvbnNvbGUiLCJlcnJvciIsIm1haW4iLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiZ2V0Q29udGV4dCIsImFkZEV2ZW50TGlzdGVuZXIiLCJRdWFkV29ya2VyIiwidG9HaWYiLCJQSVhFTF9XSURUSCIsIldISVRFX0NPTE9SIiwiciIsImciLCJiIiwiYSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiaW1hZ2VGaWxlRGF0YVVybCIsIlVSTCIsImNyZWF0ZU9iamVjdFVSTCIsImltYWdlIiwiSW1hZ2UiLCJvbmxvYWQiLCJyZXZva2VPYmplY3RVUkwiLCJvbmVycm9yIiwiZXJyIiwic3JjIiwiZ2V0QXZlcmFnZUNvbG9yIiwicGl4ZWxzIiwic3F1YXJlZFN1bVIiLCJzcXVhcmVkU3VtRyIsInNxdWFyZWRTdW1CIiwic3F1YXJlZFN1bUEiLCJhdmVyYWdlQ29sb3IiLCJzbGljZSIsInJlZHVjZSIsInByZXZBdmVyYWdlIiwiY3VyclBpeGVsIiwiTWF0aCIsInBvdyIsInNxcnQiLCJjcmVhdGVQaXhlbCIsIngiLCJ5IiwiZ2V0Qm91bmRzIiwiY3JlYXRlUGl4ZWxzIiwicHJvY2Vzc0ltYWdlRGF0YSIsInBpeGVsIiwiZmlsbFBpeGVsSW5JbWFnZURhdGEiLCJwaXhlbE9mZnNldCIsImNyZWF0ZUVsZW1lbnQiLCJkcmF3SW1hZ2UiLCJnZXRJbWFnZURhdGEiLCJwcm9jZXNzRnVuYyIsImluaXRQaXhlbFgiLCJpbml0UGl4ZWxZIiwib2Zmc2V0WCIsIm9mZnNldFkiLCJpbWFnZUZyYW1lcyIsImdpZiIsIkdJRiIsIndvcmtlcnMiLCJxdWFsaXR5IiwiZm9yRWFjaCIsImltYWdlRnJhbWUiLCJhZGRGcmFtZSIsIm9uIiwiYmxvYiIsInNhdmVCbG9iIiwicmVuZGVyIiwiZmlsZU5hbWUiLCJ1cmwiLCJzdHlsZSIsImRpc3BsYXkiLCJocmVmIiwiZG93bmxvYWQiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJjbGljayIsInJlbW92ZUNoaWxkIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QyxLQUFULENBQWVtRCxXQUFmLEVBQStDO0FBQ2xELE1BQU1DLEdBQUcsR0FBRyxJQUFJQyw2Q0FBSixDQUFRO0FBQ2hCQyxXQUFPLEVBQUUsQ0FETztBQUVoQkMsV0FBTyxFQUFFO0FBRk8sR0FBUixDQUFaO0FBS0FKLGFBQVcsQ0FDTkssT0FETCxDQUNhLFVBQUFDLFVBQVU7QUFBQSxXQUFJTCxHQUFHLENBQUNNLFFBQUosQ0FBYUQsVUFBYixDQUFKO0FBQUEsR0FEdkI7QUFHQUwsS0FBRyxDQUFDTyxFQUFKLENBQU8sVUFBUCxFQUFtQixVQUFDQyxJQUFELEVBQWU7QUFDOUJDLFlBQVEsQ0FBQyx1QkFBRCxFQUEwQkQsSUFBMUIsQ0FBUjtBQUNILEdBRkQ7QUFJQVIsS0FBRyxDQUFDVSxNQUFKO0FBQ0g7O0FBRUQsU0FBU0QsUUFBVCxDQUFrQkUsUUFBbEIsRUFBb0NILElBQXBDLEVBQWdEO0FBQzVDLE1BQU10RCxDQUFDLEdBQUdYLFFBQVEsQ0FBQ2dELGFBQVQsQ0FBdUIsR0FBdkIsQ0FBVjtBQUNBLE1BQU1xQixHQUFHLEdBQUduRyxNQUFNLENBQUM4QyxHQUFQLENBQVdDLGVBQVgsQ0FBMkJnRCxJQUEzQixDQUFaO0FBRUF0RCxHQUFDLENBQUMyRCxLQUFGLENBQVFDLE9BQVIsR0FBa0IsTUFBbEI7QUFDQTVELEdBQUMsQ0FBQzZELElBQUYsR0FBU0gsR0FBVDtBQUNBMUQsR0FBQyxDQUFDOEQsUUFBRixHQUFhTCxRQUFiO0FBRUFwRSxVQUFRLENBQUMwRSxJQUFULENBQWNDLFdBQWQsQ0FBMEJoRSxDQUExQjtBQUNBQSxHQUFDLENBQUNpRSxLQUFGO0FBRUE1RSxVQUFRLENBQUMwRSxJQUFULENBQWNHLFdBQWQsQ0FBMEJsRSxDQUExQjtBQUNBekMsUUFBTSxDQUFDOEMsR0FBUCxDQUFXSyxlQUFYLENBQTJCZ0QsR0FBM0I7QUFDSCxDIiwiZmlsZSI6ImFwcC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9hbmltYXRpb24udHNcIik7XG4iLCIvLyBnaWYuanMgMC4yLjAgLSBodHRwczovL2dpdGh1Yi5jb20vam5vcmRiZXJnL2dpZi5qc1xuKGZ1bmN0aW9uKGYpe2lmKHR5cGVvZiBleHBvcnRzPT09XCJvYmplY3RcIiYmdHlwZW9mIG1vZHVsZSE9PVwidW5kZWZpbmVkXCIpe21vZHVsZS5leHBvcnRzPWYoKX1lbHNlIGlmKHR5cGVvZiBkZWZpbmU9PT1cImZ1bmN0aW9uXCImJmRlZmluZS5hbWQpe2RlZmluZShbXSxmKX1lbHNle3ZhciBnO2lmKHR5cGVvZiB3aW5kb3chPT1cInVuZGVmaW5lZFwiKXtnPXdpbmRvd31lbHNlIGlmKHR5cGVvZiBnbG9iYWwhPT1cInVuZGVmaW5lZFwiKXtnPWdsb2JhbH1lbHNlIGlmKHR5cGVvZiBzZWxmIT09XCJ1bmRlZmluZWRcIil7Zz1zZWxmfWVsc2V7Zz10aGlzfWcuR0lGPWYoKX19KShmdW5jdGlvbigpe3ZhciBkZWZpbmUsbW9kdWxlLGV4cG9ydHM7cmV0dXJuIGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSh7MTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7ZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCl7dGhpcy5fZXZlbnRzPXRoaXMuX2V2ZW50c3x8e307dGhpcy5fbWF4TGlzdGVuZXJzPXRoaXMuX21heExpc3RlbmVyc3x8dW5kZWZpbmVkfW1vZHVsZS5leHBvcnRzPUV2ZW50RW1pdHRlcjtFdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyPUV2ZW50RW1pdHRlcjtFdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHM9dW5kZWZpbmVkO0V2ZW50RW1pdHRlci5wcm90b3R5cGUuX21heExpc3RlbmVycz11bmRlZmluZWQ7RXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnM9MTA7RXZlbnRFbWl0dGVyLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnM9ZnVuY3Rpb24obil7aWYoIWlzTnVtYmVyKG4pfHxuPDB8fGlzTmFOKG4pKXRocm93IFR5cGVFcnJvcihcIm4gbXVzdCBiZSBhIHBvc2l0aXZlIG51bWJlclwiKTt0aGlzLl9tYXhMaXN0ZW5lcnM9bjtyZXR1cm4gdGhpc307RXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0PWZ1bmN0aW9uKHR5cGUpe3ZhciBlcixoYW5kbGVyLGxlbixhcmdzLGksbGlzdGVuZXJzO2lmKCF0aGlzLl9ldmVudHMpdGhpcy5fZXZlbnRzPXt9O2lmKHR5cGU9PT1cImVycm9yXCIpe2lmKCF0aGlzLl9ldmVudHMuZXJyb3J8fGlzT2JqZWN0KHRoaXMuX2V2ZW50cy5lcnJvcikmJiF0aGlzLl9ldmVudHMuZXJyb3IubGVuZ3RoKXtlcj1hcmd1bWVudHNbMV07aWYoZXIgaW5zdGFuY2VvZiBFcnJvcil7dGhyb3cgZXJ9ZWxzZXt2YXIgZXJyPW5ldyBFcnJvcignVW5jYXVnaHQsIHVuc3BlY2lmaWVkIFwiZXJyb3JcIiBldmVudC4gKCcrZXIrXCIpXCIpO2Vyci5jb250ZXh0PWVyO3Rocm93IGVycn19fWhhbmRsZXI9dGhpcy5fZXZlbnRzW3R5cGVdO2lmKGlzVW5kZWZpbmVkKGhhbmRsZXIpKXJldHVybiBmYWxzZTtpZihpc0Z1bmN0aW9uKGhhbmRsZXIpKXtzd2l0Y2goYXJndW1lbnRzLmxlbmd0aCl7Y2FzZSAxOmhhbmRsZXIuY2FsbCh0aGlzKTticmVhaztjYXNlIDI6aGFuZGxlci5jYWxsKHRoaXMsYXJndW1lbnRzWzFdKTticmVhaztjYXNlIDM6aGFuZGxlci5jYWxsKHRoaXMsYXJndW1lbnRzWzFdLGFyZ3VtZW50c1syXSk7YnJlYWs7ZGVmYXVsdDphcmdzPUFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywxKTtoYW5kbGVyLmFwcGx5KHRoaXMsYXJncyl9fWVsc2UgaWYoaXNPYmplY3QoaGFuZGxlcikpe2FyZ3M9QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLDEpO2xpc3RlbmVycz1oYW5kbGVyLnNsaWNlKCk7bGVuPWxpc3RlbmVycy5sZW5ndGg7Zm9yKGk9MDtpPGxlbjtpKyspbGlzdGVuZXJzW2ldLmFwcGx5KHRoaXMsYXJncyl9cmV0dXJuIHRydWV9O0V2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXI9ZnVuY3Rpb24odHlwZSxsaXN0ZW5lcil7dmFyIG07aWYoIWlzRnVuY3Rpb24obGlzdGVuZXIpKXRocm93IFR5cGVFcnJvcihcImxpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvblwiKTtpZighdGhpcy5fZXZlbnRzKXRoaXMuX2V2ZW50cz17fTtpZih0aGlzLl9ldmVudHMubmV3TGlzdGVuZXIpdGhpcy5lbWl0KFwibmV3TGlzdGVuZXJcIix0eXBlLGlzRnVuY3Rpb24obGlzdGVuZXIubGlzdGVuZXIpP2xpc3RlbmVyLmxpc3RlbmVyOmxpc3RlbmVyKTtpZighdGhpcy5fZXZlbnRzW3R5cGVdKXRoaXMuX2V2ZW50c1t0eXBlXT1saXN0ZW5lcjtlbHNlIGlmKGlzT2JqZWN0KHRoaXMuX2V2ZW50c1t0eXBlXSkpdGhpcy5fZXZlbnRzW3R5cGVdLnB1c2gobGlzdGVuZXIpO2Vsc2UgdGhpcy5fZXZlbnRzW3R5cGVdPVt0aGlzLl9ldmVudHNbdHlwZV0sbGlzdGVuZXJdO2lmKGlzT2JqZWN0KHRoaXMuX2V2ZW50c1t0eXBlXSkmJiF0aGlzLl9ldmVudHNbdHlwZV0ud2FybmVkKXtpZighaXNVbmRlZmluZWQodGhpcy5fbWF4TGlzdGVuZXJzKSl7bT10aGlzLl9tYXhMaXN0ZW5lcnN9ZWxzZXttPUV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzfWlmKG0mJm0+MCYmdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aD5tKXt0aGlzLl9ldmVudHNbdHlwZV0ud2FybmVkPXRydWU7Y29uc29sZS5lcnJvcihcIihub2RlKSB3YXJuaW5nOiBwb3NzaWJsZSBFdmVudEVtaXR0ZXIgbWVtb3J5IFwiK1wibGVhayBkZXRlY3RlZC4gJWQgbGlzdGVuZXJzIGFkZGVkLiBcIitcIlVzZSBlbWl0dGVyLnNldE1heExpc3RlbmVycygpIHRvIGluY3JlYXNlIGxpbWl0LlwiLHRoaXMuX2V2ZW50c1t0eXBlXS5sZW5ndGgpO2lmKHR5cGVvZiBjb25zb2xlLnRyYWNlPT09XCJmdW5jdGlvblwiKXtjb25zb2xlLnRyYWNlKCl9fX1yZXR1cm4gdGhpc307RXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbj1FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyO0V2ZW50RW1pdHRlci5wcm90b3R5cGUub25jZT1mdW5jdGlvbih0eXBlLGxpc3RlbmVyKXtpZighaXNGdW5jdGlvbihsaXN0ZW5lcikpdGhyb3cgVHlwZUVycm9yKFwibGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uXCIpO3ZhciBmaXJlZD1mYWxzZTtmdW5jdGlvbiBnKCl7dGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLGcpO2lmKCFmaXJlZCl7ZmlyZWQ9dHJ1ZTtsaXN0ZW5lci5hcHBseSh0aGlzLGFyZ3VtZW50cyl9fWcubGlzdGVuZXI9bGlzdGVuZXI7dGhpcy5vbih0eXBlLGcpO3JldHVybiB0aGlzfTtFdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyPWZ1bmN0aW9uKHR5cGUsbGlzdGVuZXIpe3ZhciBsaXN0LHBvc2l0aW9uLGxlbmd0aCxpO2lmKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSl0aHJvdyBUeXBlRXJyb3IoXCJsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb25cIik7aWYoIXRoaXMuX2V2ZW50c3x8IXRoaXMuX2V2ZW50c1t0eXBlXSlyZXR1cm4gdGhpcztsaXN0PXRoaXMuX2V2ZW50c1t0eXBlXTtsZW5ndGg9bGlzdC5sZW5ndGg7cG9zaXRpb249LTE7aWYobGlzdD09PWxpc3RlbmVyfHxpc0Z1bmN0aW9uKGxpc3QubGlzdGVuZXIpJiZsaXN0Lmxpc3RlbmVyPT09bGlzdGVuZXIpe2RlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07aWYodGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKXRoaXMuZW1pdChcInJlbW92ZUxpc3RlbmVyXCIsdHlwZSxsaXN0ZW5lcil9ZWxzZSBpZihpc09iamVjdChsaXN0KSl7Zm9yKGk9bGVuZ3RoO2ktLSA+MDspe2lmKGxpc3RbaV09PT1saXN0ZW5lcnx8bGlzdFtpXS5saXN0ZW5lciYmbGlzdFtpXS5saXN0ZW5lcj09PWxpc3RlbmVyKXtwb3NpdGlvbj1pO2JyZWFrfX1pZihwb3NpdGlvbjwwKXJldHVybiB0aGlzO2lmKGxpc3QubGVuZ3RoPT09MSl7bGlzdC5sZW5ndGg9MDtkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdfWVsc2V7bGlzdC5zcGxpY2UocG9zaXRpb24sMSl9aWYodGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKXRoaXMuZW1pdChcInJlbW92ZUxpc3RlbmVyXCIsdHlwZSxsaXN0ZW5lcil9cmV0dXJuIHRoaXN9O0V2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzPWZ1bmN0aW9uKHR5cGUpe3ZhciBrZXksbGlzdGVuZXJzO2lmKCF0aGlzLl9ldmVudHMpcmV0dXJuIHRoaXM7aWYoIXRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcil7aWYoYXJndW1lbnRzLmxlbmd0aD09PTApdGhpcy5fZXZlbnRzPXt9O2Vsc2UgaWYodGhpcy5fZXZlbnRzW3R5cGVdKWRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07cmV0dXJuIHRoaXN9aWYoYXJndW1lbnRzLmxlbmd0aD09PTApe2ZvcihrZXkgaW4gdGhpcy5fZXZlbnRzKXtpZihrZXk9PT1cInJlbW92ZUxpc3RlbmVyXCIpY29udGludWU7dGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoa2V5KX10aGlzLnJlbW92ZUFsbExpc3RlbmVycyhcInJlbW92ZUxpc3RlbmVyXCIpO3RoaXMuX2V2ZW50cz17fTtyZXR1cm4gdGhpc31saXN0ZW5lcnM9dGhpcy5fZXZlbnRzW3R5cGVdO2lmKGlzRnVuY3Rpb24obGlzdGVuZXJzKSl7dGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLGxpc3RlbmVycyl9ZWxzZSBpZihsaXN0ZW5lcnMpe3doaWxlKGxpc3RlbmVycy5sZW5ndGgpdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLGxpc3RlbmVyc1tsaXN0ZW5lcnMubGVuZ3RoLTFdKX1kZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO3JldHVybiB0aGlzfTtFdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycz1mdW5jdGlvbih0eXBlKXt2YXIgcmV0O2lmKCF0aGlzLl9ldmVudHN8fCF0aGlzLl9ldmVudHNbdHlwZV0pcmV0PVtdO2Vsc2UgaWYoaXNGdW5jdGlvbih0aGlzLl9ldmVudHNbdHlwZV0pKXJldD1bdGhpcy5fZXZlbnRzW3R5cGVdXTtlbHNlIHJldD10aGlzLl9ldmVudHNbdHlwZV0uc2xpY2UoKTtyZXR1cm4gcmV0fTtFdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVyQ291bnQ9ZnVuY3Rpb24odHlwZSl7aWYodGhpcy5fZXZlbnRzKXt2YXIgZXZsaXN0ZW5lcj10aGlzLl9ldmVudHNbdHlwZV07aWYoaXNGdW5jdGlvbihldmxpc3RlbmVyKSlyZXR1cm4gMTtlbHNlIGlmKGV2bGlzdGVuZXIpcmV0dXJuIGV2bGlzdGVuZXIubGVuZ3RofXJldHVybiAwfTtFdmVudEVtaXR0ZXIubGlzdGVuZXJDb3VudD1mdW5jdGlvbihlbWl0dGVyLHR5cGUpe3JldHVybiBlbWl0dGVyLmxpc3RlbmVyQ291bnQodHlwZSl9O2Z1bmN0aW9uIGlzRnVuY3Rpb24oYXJnKXtyZXR1cm4gdHlwZW9mIGFyZz09PVwiZnVuY3Rpb25cIn1mdW5jdGlvbiBpc051bWJlcihhcmcpe3JldHVybiB0eXBlb2YgYXJnPT09XCJudW1iZXJcIn1mdW5jdGlvbiBpc09iamVjdChhcmcpe3JldHVybiB0eXBlb2YgYXJnPT09XCJvYmplY3RcIiYmYXJnIT09bnVsbH1mdW5jdGlvbiBpc1VuZGVmaW5lZChhcmcpe3JldHVybiBhcmc9PT12b2lkIDB9fSx7fV0sMjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7dmFyIFVBLGJyb3dzZXIsbW9kZSxwbGF0Zm9ybSx1YTt1YT1uYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCk7cGxhdGZvcm09bmF2aWdhdG9yLnBsYXRmb3JtLnRvTG93ZXJDYXNlKCk7VUE9dWEubWF0Y2goLyhvcGVyYXxpZXxmaXJlZm94fGNocm9tZXx2ZXJzaW9uKVtcXHNcXC86XShbXFx3XFxkXFwuXSspPy4qPyhzYWZhcml8dmVyc2lvbltcXHNcXC86XShbXFx3XFxkXFwuXSspfCQpLyl8fFtudWxsLFwidW5rbm93blwiLDBdO21vZGU9VUFbMV09PT1cImllXCImJmRvY3VtZW50LmRvY3VtZW50TW9kZTticm93c2VyPXtuYW1lOlVBWzFdPT09XCJ2ZXJzaW9uXCI/VUFbM106VUFbMV0sdmVyc2lvbjptb2RlfHxwYXJzZUZsb2F0KFVBWzFdPT09XCJvcGVyYVwiJiZVQVs0XT9VQVs0XTpVQVsyXSkscGxhdGZvcm06e25hbWU6dWEubWF0Y2goL2lwKD86YWR8b2R8aG9uZSkvKT9cImlvc1wiOih1YS5tYXRjaCgvKD86d2Vib3N8YW5kcm9pZCkvKXx8cGxhdGZvcm0ubWF0Y2goL21hY3x3aW58bGludXgvKXx8W1wib3RoZXJcIl0pWzBdfX07YnJvd3Nlclticm93c2VyLm5hbWVdPXRydWU7YnJvd3Nlclticm93c2VyLm5hbWUrcGFyc2VJbnQoYnJvd3Nlci52ZXJzaW9uLDEwKV09dHJ1ZTticm93c2VyLnBsYXRmb3JtW2Jyb3dzZXIucGxhdGZvcm0ubmFtZV09dHJ1ZTttb2R1bGUuZXhwb3J0cz1icm93c2VyfSx7fV0sMzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7dmFyIEV2ZW50RW1pdHRlcixHSUYsYnJvd3NlcixleHRlbmQ9ZnVuY3Rpb24oY2hpbGQscGFyZW50KXtmb3IodmFyIGtleSBpbiBwYXJlbnQpe2lmKGhhc1Byb3AuY2FsbChwYXJlbnQsa2V5KSljaGlsZFtrZXldPXBhcmVudFtrZXldfWZ1bmN0aW9uIGN0b3IoKXt0aGlzLmNvbnN0cnVjdG9yPWNoaWxkfWN0b3IucHJvdG90eXBlPXBhcmVudC5wcm90b3R5cGU7Y2hpbGQucHJvdG90eXBlPW5ldyBjdG9yO2NoaWxkLl9fc3VwZXJfXz1wYXJlbnQucHJvdG90eXBlO3JldHVybiBjaGlsZH0saGFzUHJvcD17fS5oYXNPd25Qcm9wZXJ0eSxpbmRleE9mPVtdLmluZGV4T2Z8fGZ1bmN0aW9uKGl0ZW0pe2Zvcih2YXIgaT0wLGw9dGhpcy5sZW5ndGg7aTxsO2krKyl7aWYoaSBpbiB0aGlzJiZ0aGlzW2ldPT09aXRlbSlyZXR1cm4gaX1yZXR1cm4tMX0sc2xpY2U9W10uc2xpY2U7RXZlbnRFbWl0dGVyPXJlcXVpcmUoXCJldmVudHNcIikuRXZlbnRFbWl0dGVyO2Jyb3dzZXI9cmVxdWlyZShcIi4vYnJvd3Nlci5jb2ZmZWVcIik7R0lGPWZ1bmN0aW9uKHN1cGVyQ2xhc3Mpe3ZhciBkZWZhdWx0cyxmcmFtZURlZmF1bHRzO2V4dGVuZChHSUYsc3VwZXJDbGFzcyk7ZGVmYXVsdHM9e3dvcmtlclNjcmlwdDpcImdpZi53b3JrZXIuanNcIix3b3JrZXJzOjIscmVwZWF0OjAsYmFja2dyb3VuZDpcIiNmZmZcIixxdWFsaXR5OjEwLHdpZHRoOm51bGwsaGVpZ2h0Om51bGwsdHJhbnNwYXJlbnQ6bnVsbCxkZWJ1ZzpmYWxzZSxkaXRoZXI6ZmFsc2V9O2ZyYW1lRGVmYXVsdHM9e2RlbGF5OjUwMCxjb3B5OmZhbHNlfTtmdW5jdGlvbiBHSUYob3B0aW9ucyl7dmFyIGJhc2Usa2V5LHZhbHVlO3RoaXMucnVubmluZz1mYWxzZTt0aGlzLm9wdGlvbnM9e307dGhpcy5mcmFtZXM9W107dGhpcy5mcmVlV29ya2Vycz1bXTt0aGlzLmFjdGl2ZVdvcmtlcnM9W107dGhpcy5zZXRPcHRpb25zKG9wdGlvbnMpO2ZvcihrZXkgaW4gZGVmYXVsdHMpe3ZhbHVlPWRlZmF1bHRzW2tleV07aWYoKGJhc2U9dGhpcy5vcHRpb25zKVtrZXldPT1udWxsKXtiYXNlW2tleV09dmFsdWV9fX1HSUYucHJvdG90eXBlLnNldE9wdGlvbj1mdW5jdGlvbihrZXksdmFsdWUpe3RoaXMub3B0aW9uc1trZXldPXZhbHVlO2lmKHRoaXMuX2NhbnZhcyE9bnVsbCYmKGtleT09PVwid2lkdGhcInx8a2V5PT09XCJoZWlnaHRcIikpe3JldHVybiB0aGlzLl9jYW52YXNba2V5XT12YWx1ZX19O0dJRi5wcm90b3R5cGUuc2V0T3B0aW9ucz1mdW5jdGlvbihvcHRpb25zKXt2YXIga2V5LHJlc3VsdHMsdmFsdWU7cmVzdWx0cz1bXTtmb3Ioa2V5IGluIG9wdGlvbnMpe2lmKCFoYXNQcm9wLmNhbGwob3B0aW9ucyxrZXkpKWNvbnRpbnVlO3ZhbHVlPW9wdGlvbnNba2V5XTtyZXN1bHRzLnB1c2godGhpcy5zZXRPcHRpb24oa2V5LHZhbHVlKSl9cmV0dXJuIHJlc3VsdHN9O0dJRi5wcm90b3R5cGUuYWRkRnJhbWU9ZnVuY3Rpb24oaW1hZ2Usb3B0aW9ucyl7dmFyIGZyYW1lLGtleTtpZihvcHRpb25zPT1udWxsKXtvcHRpb25zPXt9fWZyYW1lPXt9O2ZyYW1lLnRyYW5zcGFyZW50PXRoaXMub3B0aW9ucy50cmFuc3BhcmVudDtmb3Ioa2V5IGluIGZyYW1lRGVmYXVsdHMpe2ZyYW1lW2tleV09b3B0aW9uc1trZXldfHxmcmFtZURlZmF1bHRzW2tleV19aWYodGhpcy5vcHRpb25zLndpZHRoPT1udWxsKXt0aGlzLnNldE9wdGlvbihcIndpZHRoXCIsaW1hZ2Uud2lkdGgpfWlmKHRoaXMub3B0aW9ucy5oZWlnaHQ9PW51bGwpe3RoaXMuc2V0T3B0aW9uKFwiaGVpZ2h0XCIsaW1hZ2UuaGVpZ2h0KX1pZih0eXBlb2YgSW1hZ2VEYXRhIT09XCJ1bmRlZmluZWRcIiYmSW1hZ2VEYXRhIT09bnVsbCYmaW1hZ2UgaW5zdGFuY2VvZiBJbWFnZURhdGEpe2ZyYW1lLmRhdGE9aW1hZ2UuZGF0YX1lbHNlIGlmKHR5cGVvZiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQhPT1cInVuZGVmaW5lZFwiJiZDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQhPT1udWxsJiZpbWFnZSBpbnN0YW5jZW9mIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRHx8dHlwZW9mIFdlYkdMUmVuZGVyaW5nQ29udGV4dCE9PVwidW5kZWZpbmVkXCImJldlYkdMUmVuZGVyaW5nQ29udGV4dCE9PW51bGwmJmltYWdlIGluc3RhbmNlb2YgV2ViR0xSZW5kZXJpbmdDb250ZXh0KXtpZihvcHRpb25zLmNvcHkpe2ZyYW1lLmRhdGE9dGhpcy5nZXRDb250ZXh0RGF0YShpbWFnZSl9ZWxzZXtmcmFtZS5jb250ZXh0PWltYWdlfX1lbHNlIGlmKGltYWdlLmNoaWxkTm9kZXMhPW51bGwpe2lmKG9wdGlvbnMuY29weSl7ZnJhbWUuZGF0YT10aGlzLmdldEltYWdlRGF0YShpbWFnZSl9ZWxzZXtmcmFtZS5pbWFnZT1pbWFnZX19ZWxzZXt0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGltYWdlXCIpfXJldHVybiB0aGlzLmZyYW1lcy5wdXNoKGZyYW1lKX07R0lGLnByb3RvdHlwZS5yZW5kZXI9ZnVuY3Rpb24oKXt2YXIgaSxqLG51bVdvcmtlcnMscmVmO2lmKHRoaXMucnVubmluZyl7dGhyb3cgbmV3IEVycm9yKFwiQWxyZWFkeSBydW5uaW5nXCIpfWlmKHRoaXMub3B0aW9ucy53aWR0aD09bnVsbHx8dGhpcy5vcHRpb25zLmhlaWdodD09bnVsbCl7dGhyb3cgbmV3IEVycm9yKFwiV2lkdGggYW5kIGhlaWdodCBtdXN0IGJlIHNldCBwcmlvciB0byByZW5kZXJpbmdcIil9dGhpcy5ydW5uaW5nPXRydWU7dGhpcy5uZXh0RnJhbWU9MDt0aGlzLmZpbmlzaGVkRnJhbWVzPTA7dGhpcy5pbWFnZVBhcnRzPWZ1bmN0aW9uKCl7dmFyIGoscmVmLHJlc3VsdHM7cmVzdWx0cz1bXTtmb3IoaT1qPTAscmVmPXRoaXMuZnJhbWVzLmxlbmd0aDswPD1yZWY/ajxyZWY6aj5yZWY7aT0wPD1yZWY/KytqOi0tail7cmVzdWx0cy5wdXNoKG51bGwpfXJldHVybiByZXN1bHRzfS5jYWxsKHRoaXMpO251bVdvcmtlcnM9dGhpcy5zcGF3bldvcmtlcnMoKTtpZih0aGlzLm9wdGlvbnMuZ2xvYmFsUGFsZXR0ZT09PXRydWUpe3RoaXMucmVuZGVyTmV4dEZyYW1lKCl9ZWxzZXtmb3IoaT1qPTAscmVmPW51bVdvcmtlcnM7MDw9cmVmP2o8cmVmOmo+cmVmO2k9MDw9cmVmPysrajotLWope3RoaXMucmVuZGVyTmV4dEZyYW1lKCl9fXRoaXMuZW1pdChcInN0YXJ0XCIpO3JldHVybiB0aGlzLmVtaXQoXCJwcm9ncmVzc1wiLDApfTtHSUYucHJvdG90eXBlLmFib3J0PWZ1bmN0aW9uKCl7dmFyIHdvcmtlcjt3aGlsZSh0cnVlKXt3b3JrZXI9dGhpcy5hY3RpdmVXb3JrZXJzLnNoaWZ0KCk7aWYod29ya2VyPT1udWxsKXticmVha310aGlzLmxvZyhcImtpbGxpbmcgYWN0aXZlIHdvcmtlclwiKTt3b3JrZXIudGVybWluYXRlKCl9dGhpcy5ydW5uaW5nPWZhbHNlO3JldHVybiB0aGlzLmVtaXQoXCJhYm9ydFwiKX07R0lGLnByb3RvdHlwZS5zcGF3bldvcmtlcnM9ZnVuY3Rpb24oKXt2YXIgaixudW1Xb3JrZXJzLHJlZixyZXN1bHRzO251bVdvcmtlcnM9TWF0aC5taW4odGhpcy5vcHRpb25zLndvcmtlcnMsdGhpcy5mcmFtZXMubGVuZ3RoKTsoZnVuY3Rpb24oKXtyZXN1bHRzPVtdO2Zvcih2YXIgaj1yZWY9dGhpcy5mcmVlV29ya2Vycy5sZW5ndGg7cmVmPD1udW1Xb3JrZXJzP2o8bnVtV29ya2VyczpqPm51bVdvcmtlcnM7cmVmPD1udW1Xb3JrZXJzP2orKzpqLS0pe3Jlc3VsdHMucHVzaChqKX1yZXR1cm4gcmVzdWx0c30pLmFwcGx5KHRoaXMpLmZvckVhY2goZnVuY3Rpb24oX3RoaXMpe3JldHVybiBmdW5jdGlvbihpKXt2YXIgd29ya2VyO190aGlzLmxvZyhcInNwYXduaW5nIHdvcmtlciBcIitpKTt3b3JrZXI9bmV3IFdvcmtlcihfdGhpcy5vcHRpb25zLndvcmtlclNjcmlwdCk7d29ya2VyLm9ubWVzc2FnZT1mdW5jdGlvbihldmVudCl7X3RoaXMuYWN0aXZlV29ya2Vycy5zcGxpY2UoX3RoaXMuYWN0aXZlV29ya2Vycy5pbmRleE9mKHdvcmtlciksMSk7X3RoaXMuZnJlZVdvcmtlcnMucHVzaCh3b3JrZXIpO3JldHVybiBfdGhpcy5mcmFtZUZpbmlzaGVkKGV2ZW50LmRhdGEpfTtyZXR1cm4gX3RoaXMuZnJlZVdvcmtlcnMucHVzaCh3b3JrZXIpfX0odGhpcykpO3JldHVybiBudW1Xb3JrZXJzfTtHSUYucHJvdG90eXBlLmZyYW1lRmluaXNoZWQ9ZnVuY3Rpb24oZnJhbWUpe3ZhciBpLGoscmVmO3RoaXMubG9nKFwiZnJhbWUgXCIrZnJhbWUuaW5kZXgrXCIgZmluaXNoZWQgLSBcIit0aGlzLmFjdGl2ZVdvcmtlcnMubGVuZ3RoK1wiIGFjdGl2ZVwiKTt0aGlzLmZpbmlzaGVkRnJhbWVzKys7dGhpcy5lbWl0KFwicHJvZ3Jlc3NcIix0aGlzLmZpbmlzaGVkRnJhbWVzL3RoaXMuZnJhbWVzLmxlbmd0aCk7dGhpcy5pbWFnZVBhcnRzW2ZyYW1lLmluZGV4XT1mcmFtZTtpZih0aGlzLm9wdGlvbnMuZ2xvYmFsUGFsZXR0ZT09PXRydWUpe3RoaXMub3B0aW9ucy5nbG9iYWxQYWxldHRlPWZyYW1lLmdsb2JhbFBhbGV0dGU7dGhpcy5sb2coXCJnbG9iYWwgcGFsZXR0ZSBhbmFseXplZFwiKTtpZih0aGlzLmZyYW1lcy5sZW5ndGg+Mil7Zm9yKGk9aj0xLHJlZj10aGlzLmZyZWVXb3JrZXJzLmxlbmd0aDsxPD1yZWY/ajxyZWY6aj5yZWY7aT0xPD1yZWY/KytqOi0tail7dGhpcy5yZW5kZXJOZXh0RnJhbWUoKX19fWlmKGluZGV4T2YuY2FsbCh0aGlzLmltYWdlUGFydHMsbnVsbCk+PTApe3JldHVybiB0aGlzLnJlbmRlck5leHRGcmFtZSgpfWVsc2V7cmV0dXJuIHRoaXMuZmluaXNoUmVuZGVyaW5nKCl9fTtHSUYucHJvdG90eXBlLmZpbmlzaFJlbmRlcmluZz1mdW5jdGlvbigpe3ZhciBkYXRhLGZyYW1lLGksaW1hZ2UsaixrLGwsbGVuLGxlbjEsbGVuMixsZW4zLG9mZnNldCxwYWdlLHJlZixyZWYxLHJlZjI7bGVuPTA7cmVmPXRoaXMuaW1hZ2VQYXJ0cztmb3Ioaj0wLGxlbjE9cmVmLmxlbmd0aDtqPGxlbjE7aisrKXtmcmFtZT1yZWZbal07bGVuKz0oZnJhbWUuZGF0YS5sZW5ndGgtMSkqZnJhbWUucGFnZVNpemUrZnJhbWUuY3Vyc29yfWxlbis9ZnJhbWUucGFnZVNpemUtZnJhbWUuY3Vyc29yO3RoaXMubG9nKFwicmVuZGVyaW5nIGZpbmlzaGVkIC0gZmlsZXNpemUgXCIrTWF0aC5yb3VuZChsZW4vMWUzKStcImtiXCIpO2RhdGE9bmV3IFVpbnQ4QXJyYXkobGVuKTtvZmZzZXQ9MDtyZWYxPXRoaXMuaW1hZ2VQYXJ0cztmb3Ioaz0wLGxlbjI9cmVmMS5sZW5ndGg7azxsZW4yO2srKyl7ZnJhbWU9cmVmMVtrXTtyZWYyPWZyYW1lLmRhdGE7Zm9yKGk9bD0wLGxlbjM9cmVmMi5sZW5ndGg7bDxsZW4zO2k9KytsKXtwYWdlPXJlZjJbaV07ZGF0YS5zZXQocGFnZSxvZmZzZXQpO2lmKGk9PT1mcmFtZS5kYXRhLmxlbmd0aC0xKXtvZmZzZXQrPWZyYW1lLmN1cnNvcn1lbHNle29mZnNldCs9ZnJhbWUucGFnZVNpemV9fX1pbWFnZT1uZXcgQmxvYihbZGF0YV0se3R5cGU6XCJpbWFnZS9naWZcIn0pO3JldHVybiB0aGlzLmVtaXQoXCJmaW5pc2hlZFwiLGltYWdlLGRhdGEpfTtHSUYucHJvdG90eXBlLnJlbmRlck5leHRGcmFtZT1mdW5jdGlvbigpe3ZhciBmcmFtZSx0YXNrLHdvcmtlcjtpZih0aGlzLmZyZWVXb3JrZXJzLmxlbmd0aD09PTApe3Rocm93IG5ldyBFcnJvcihcIk5vIGZyZWUgd29ya2Vyc1wiKX1pZih0aGlzLm5leHRGcmFtZT49dGhpcy5mcmFtZXMubGVuZ3RoKXtyZXR1cm59ZnJhbWU9dGhpcy5mcmFtZXNbdGhpcy5uZXh0RnJhbWUrK107d29ya2VyPXRoaXMuZnJlZVdvcmtlcnMuc2hpZnQoKTt0YXNrPXRoaXMuZ2V0VGFzayhmcmFtZSk7dGhpcy5sb2coXCJzdGFydGluZyBmcmFtZSBcIisodGFzay5pbmRleCsxKStcIiBvZiBcIit0aGlzLmZyYW1lcy5sZW5ndGgpO3RoaXMuYWN0aXZlV29ya2Vycy5wdXNoKHdvcmtlcik7cmV0dXJuIHdvcmtlci5wb3N0TWVzc2FnZSh0YXNrKX07R0lGLnByb3RvdHlwZS5nZXRDb250ZXh0RGF0YT1mdW5jdGlvbihjdHgpe3JldHVybiBjdHguZ2V0SW1hZ2VEYXRhKDAsMCx0aGlzLm9wdGlvbnMud2lkdGgsdGhpcy5vcHRpb25zLmhlaWdodCkuZGF0YX07R0lGLnByb3RvdHlwZS5nZXRJbWFnZURhdGE9ZnVuY3Rpb24oaW1hZ2Upe3ZhciBjdHg7aWYodGhpcy5fY2FudmFzPT1udWxsKXt0aGlzLl9jYW52YXM9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTt0aGlzLl9jYW52YXMud2lkdGg9dGhpcy5vcHRpb25zLndpZHRoO3RoaXMuX2NhbnZhcy5oZWlnaHQ9dGhpcy5vcHRpb25zLmhlaWdodH1jdHg9dGhpcy5fY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtjdHguc2V0RmlsbD10aGlzLm9wdGlvbnMuYmFja2dyb3VuZDtjdHguZmlsbFJlY3QoMCwwLHRoaXMub3B0aW9ucy53aWR0aCx0aGlzLm9wdGlvbnMuaGVpZ2h0KTtjdHguZHJhd0ltYWdlKGltYWdlLDAsMCk7cmV0dXJuIHRoaXMuZ2V0Q29udGV4dERhdGEoY3R4KX07R0lGLnByb3RvdHlwZS5nZXRUYXNrPWZ1bmN0aW9uKGZyYW1lKXt2YXIgaW5kZXgsdGFzaztpbmRleD10aGlzLmZyYW1lcy5pbmRleE9mKGZyYW1lKTt0YXNrPXtpbmRleDppbmRleCxsYXN0OmluZGV4PT09dGhpcy5mcmFtZXMubGVuZ3RoLTEsZGVsYXk6ZnJhbWUuZGVsYXksdHJhbnNwYXJlbnQ6ZnJhbWUudHJhbnNwYXJlbnQsd2lkdGg6dGhpcy5vcHRpb25zLndpZHRoLGhlaWdodDp0aGlzLm9wdGlvbnMuaGVpZ2h0LHF1YWxpdHk6dGhpcy5vcHRpb25zLnF1YWxpdHksZGl0aGVyOnRoaXMub3B0aW9ucy5kaXRoZXIsZ2xvYmFsUGFsZXR0ZTp0aGlzLm9wdGlvbnMuZ2xvYmFsUGFsZXR0ZSxyZXBlYXQ6dGhpcy5vcHRpb25zLnJlcGVhdCxjYW5UcmFuc2Zlcjpicm93c2VyLm5hbWU9PT1cImNocm9tZVwifTtpZihmcmFtZS5kYXRhIT1udWxsKXt0YXNrLmRhdGE9ZnJhbWUuZGF0YX1lbHNlIGlmKGZyYW1lLmNvbnRleHQhPW51bGwpe3Rhc2suZGF0YT10aGlzLmdldENvbnRleHREYXRhKGZyYW1lLmNvbnRleHQpfWVsc2UgaWYoZnJhbWUuaW1hZ2UhPW51bGwpe3Rhc2suZGF0YT10aGlzLmdldEltYWdlRGF0YShmcmFtZS5pbWFnZSl9ZWxzZXt0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGZyYW1lXCIpfXJldHVybiB0YXNrfTtHSUYucHJvdG90eXBlLmxvZz1mdW5jdGlvbigpe3ZhciBhcmdzO2FyZ3M9MTw9YXJndW1lbnRzLmxlbmd0aD9zbGljZS5jYWxsKGFyZ3VtZW50cywwKTpbXTtpZighdGhpcy5vcHRpb25zLmRlYnVnKXtyZXR1cm59cmV0dXJuIGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsYXJncyl9O3JldHVybiBHSUZ9KEV2ZW50RW1pdHRlcik7bW9kdWxlLmV4cG9ydHM9R0lGfSx7XCIuL2Jyb3dzZXIuY29mZmVlXCI6MixldmVudHM6MX1dfSx7fSxbM10pKDMpfSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1naWYuanMubWFwXG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gbmV3IFdvcmtlcihfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiMTBlMDQxYjkxNWI2ZTA1YzJmZjQud29ya2VyLmpzXCIpO1xufTsiLCJpbXBvcnQgeyBRdWFkV29ya2VyRGF0YU1lc3NhZ2UgfSBmcm9tICcuL3NjaGVtYSc7XG5pbXBvcnQgeyBsb2FkSW1hZ2UsIGdldEltYWdlRGF0YU9mZlNjcmVlbiwgdG9HaWYgfSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IFF1YWRXb3JrZXIgZnJvbSAnd29ya2VyLWxvYWRlciEuL3F1YWQud29ya2VyJztcblxubGV0IGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XG5sZXQgY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xubGV0IGltYWdlSW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG5sZXQgZXhwb3J0R2lmQnV0dG9uOiBIVE1MQnV0dG9uRWxlbWVudDtcbmxldCBxdWFkV29ya2VyOiBRdWFkV29ya2VyO1xuY29uc3QgZnJhbWVzOiBJbWFnZURhdGFbXSA9IFtdO1xubGV0IG9mZmxpbmVBbmltYXRlSWQ6IG51bWJlcjtcblxuZnVuY3Rpb24gZHJhdyhpbWFnZURhdGE6IEltYWdlRGF0YSkge1xuICAgIGNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG4gICAgY29udGV4dC5wdXRJbWFnZURhdGEoaW1hZ2VEYXRhLCAwLCAwKTtcbn1cblxuZnVuY3Rpb24gb2ZmbGluZUFuaW1hdGUob2ZmbGluZUZyYW1lczogSW1hZ2VEYXRhW10sIGFuaW1hdGVJbmRleDogbnVtYmVyID0gMCwgY3VyckZyYW1lSW5kZXg6IG51bWJlciA9IDAsIG51bUZyYW1lc0VhY2g6IG51bWJlciA9IDIwKTogdm9pZCB7XG4gICAgbGV0IG5leHRGcmFtZUluZGV4OiBudW1iZXIgPSBjdXJyRnJhbWVJbmRleCArIDE7XG4gICAgbGV0IG5leHRBbmltYXRlSW5kZXg6IG51bWJlciA9IGFuaW1hdGVJbmRleDtcblxuICAgIGlmIChuZXh0RnJhbWVJbmRleCA+IG51bUZyYW1lc0VhY2gpIHtcbiAgICAgICAgbmV4dEFuaW1hdGVJbmRleCA9IGFuaW1hdGVJbmRleCArIDEgPj0gb2ZmbGluZUZyYW1lcy5sZW5ndGggPyAwIDogYW5pbWF0ZUluZGV4ICsgMTtcbiAgICAgICAgbmV4dEZyYW1lSW5kZXggPSAwO1xuICAgIH1cblxuICAgIG9mZmxpbmVBbmltYXRlSWQgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IG9mZmxpbmVBbmltYXRlKG9mZmxpbmVGcmFtZXMsIG5leHRBbmltYXRlSW5kZXgsIG5leHRGcmFtZUluZGV4LCBudW1GcmFtZXNFYWNoKSk7XG5cbiAgICBkcmF3KG9mZmxpbmVGcmFtZXNbbmV4dEFuaW1hdGVJbmRleF0pO1xufVxuXG5mdW5jdGlvbiBwcm9jZXNzSW1hZ2UoaW1hZ2VGaWxlOiBGaWxlKTogdm9pZCB7XG4gICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKG9mZmxpbmVBbmltYXRlSWQpO1xuXG4gICAgbG9hZEltYWdlKGltYWdlRmlsZSlcbiAgICAgICAgLnRoZW4oaW1hZ2VFbGVtID0+IGdldEltYWdlRGF0YU9mZlNjcmVlbihpbWFnZUVsZW0sIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCkpXG4gICAgICAgIC50aGVuKChpbWFnZURhdGE6IEltYWdlRGF0YSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbWVzc2FnZTogUXVhZFdvcmtlckRhdGFNZXNzYWdlID0ge1xuICAgICAgICAgICAgICAgIHR5cGU6ICduZXctaW1hZ2UnLFxuICAgICAgICAgICAgICAgIGRhdGE6IGltYWdlRGF0YVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHF1YWRXb3JrZXIucG9zdE1lc3NhZ2UobWVzc2FnZSk7XG4gICAgICAgIH0pO1xufVxuXG5mdW5jdGlvbiBvbkltYWdlQ2hhbmdlKGV2ZW50OiBFdmVudCkge1xuICAgIGNvbnN0IGltYWdlSW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQgPSBldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICBpZiAoIWltYWdlSW5wdXQgfHxcbiAgICAgICAgIWltYWdlSW5wdXQuZmlsZXMgfHxcbiAgICAgICAgIWltYWdlSW5wdXQuZmlsZXMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgZmlyc3RJbWFnZSA9IGltYWdlSW5wdXQuZmlsZXNbMF07XG4gICAgcHJvY2Vzc0ltYWdlKGZpcnN0SW1hZ2UpO1xufVxuXG5mdW5jdGlvbiByZXNpemVDYW52YXMoKSB7XG4gICAgY29uc3QgY29tcHV0ZWRTdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGNhbnZhcyk7XG4gICAgY29uc3Qgd2lkdGggPSBwYXJzZUludChjb21wdXRlZFN0eWxlLmdldFByb3BlcnR5VmFsdWUoJ3dpZHRoJyksIDEwKTtcbiAgICBjb25zdCBoZWlnaHQgPSBwYXJzZUludChjb21wdXRlZFN0eWxlLmdldFByb3BlcnR5VmFsdWUoJ2hlaWdodCcpLCAxMCk7XG4gICAgY2FudmFzLndpZHRoID0gd2lkdGg7XG4gICAgY2FudmFzLmhlaWdodCA9IGhlaWdodDtcbn1cblxuZnVuY3Rpb24gb25Xb3JrZXJNZXNzYWdlKGV2ZW50OiBNZXNzYWdlRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBtZXNzYWdlOiBRdWFkV29ya2VyRGF0YU1lc3NhZ2UgPSBldmVudC5kYXRhO1xuICAgIHN3aXRjaCAobWVzc2FnZS50eXBlKSB7XG4gICAgICAgIGNhc2UgJ2RyYXcnOlxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuZGF0YSkge1xuICAgICAgICAgICAgICAgIGZyYW1lcy5wdXNoKG1lc3NhZ2UuZGF0YSk7XG4gICAgICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aW1lc3RhbXAgPT4gZHJhdyhtZXNzYWdlLmRhdGEpKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3Byb2Nlc3NlZCc6XG4gICAgICAgICAgICBvZmZsaW5lQW5pbWF0ZUlkID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiBvZmZsaW5lQW5pbWF0ZShmcmFtZXMpKTtcbiAgICAgICAgICAgIGV4cG9ydEdpZkJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBVbmtub3duIG1lc3NhZ2UgdHlwZTogJHttZXNzYWdlfWApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gbWFpbigpIHtcbiAgICBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJykgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG4gICAgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpIGFzIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcbiAgICBpbWFnZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ltYWdlLWlucHV0JykgYXMgSFRNTElucHV0RWxlbWVudDtcblxuICAgIGltYWdlSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgb25JbWFnZUNoYW5nZSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHJlc2l6ZUNhbnZhcyk7XG5cbiAgICAvLyBXZWIgd29ya2VyIGxvZ2ljXG4gICAgcXVhZFdvcmtlciA9IG5ldyBRdWFkV29ya2VyKCk7XG4gICAgcXVhZFdvcmtlci5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgb25Xb3JrZXJNZXNzYWdlKTtcblxuICAgIC8vIGV4cG9ydCBsb2dpY1xuICAgIGV4cG9ydEdpZkJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdleHBvcnQtZ2lmJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gICAgZXhwb3J0R2lmQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICB0b0dpZihmcmFtZXMpO1xuICAgIH0pO1xuXG4gICAgLy8gc2l6ZSBjYW52YXNcbiAgICByZXNpemVDYW52YXMoKTtcbn1cblxubWFpbigpOyIsImltcG9ydCB7IFBpeGVsLCBDb2xvciB9IGZyb20gJy4vc2NoZW1hJztcbmltcG9ydCBHSUYgZnJvbSAnZ2lmLmpzJztcblxuZXhwb3J0IGNvbnN0IFBJWEVMX1dJRFRIOiBudW1iZXIgPSA0O1xuZXhwb3J0IGNvbnN0IFdISVRFX0NPTE9SOiBDb2xvciA9IHtcbiAgICByOiAyNTUsXG4gICAgZzogMjU1LFxuICAgIGI6IDI1NSxcbiAgICBhOiAyNTUsXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gbG9hZEltYWdlKGltYWdlRmlsZTogRmlsZSk6IFByb21pc2U8SFRNTEltYWdlRWxlbWVudD4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGNvbnN0IGltYWdlRmlsZURhdGFVcmwgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChpbWFnZUZpbGUpO1xuICAgICAgICBjb25zdCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xuXG4gICAgICAgIGltYWdlLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICAgIHdpbmRvdy5VUkwucmV2b2tlT2JqZWN0VVJMKGltYWdlRmlsZURhdGFVcmwpO1xuICAgICAgICAgICAgcmVzb2x2ZShpbWFnZSlcbiAgICAgICAgfTtcbiAgICAgICAgaW1hZ2Uub25lcnJvciA9IChlcnIpID0+IHtcbiAgICAgICAgICAgIHdpbmRvdy5VUkwucmV2b2tlT2JqZWN0VVJMKGltYWdlRmlsZURhdGFVcmwpO1xuICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIH07XG4gICAgICAgIGltYWdlLnNyYyA9IGltYWdlRmlsZURhdGFVcmw7XG4gICAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBdmVyYWdlQ29sb3IocGl4ZWxzOiBQaXhlbFtdKTogQ29sb3Ige1xuICAgIGxldCBzcXVhcmVkU3VtUjogbnVtYmVyO1xuICAgIGxldCBzcXVhcmVkU3VtRzogbnVtYmVyO1xuICAgIGxldCBzcXVhcmVkU3VtQjogbnVtYmVyO1xuICAgIGxldCBzcXVhcmVkU3VtQTogbnVtYmVyO1xuICAgIGxldCBhdmVyYWdlQ29sb3I6IENvbG9yID0gcGl4ZWxzWzBdIHx8IFdISVRFX0NPTE9SO1xuXG4gICAgaWYgKHBpeGVscy5sZW5ndGggPiAxKSB7XG4gICAgICAgIHJldHVybiBwaXhlbHMuc2xpY2UoMSlcbiAgICAgICAgICAgIC5yZWR1Y2UoKHByZXZBdmVyYWdlOiBDb2xvciwgY3VyclBpeGVsOiBQaXhlbCkgPT4ge1xuICAgICAgICAgICAgICAgIHNxdWFyZWRTdW1SID0gTWF0aC5wb3cocHJldkF2ZXJhZ2UuciwgMikgKyBNYXRoLnBvdyhjdXJyUGl4ZWwuciwgMik7XG4gICAgICAgICAgICAgICAgc3F1YXJlZFN1bUcgPSBNYXRoLnBvdyhwcmV2QXZlcmFnZS5nLCAyKSArIE1hdGgucG93KGN1cnJQaXhlbC5nLCAyKTtcbiAgICAgICAgICAgICAgICBzcXVhcmVkU3VtQiA9IE1hdGgucG93KHByZXZBdmVyYWdlLmIsIDIpICsgTWF0aC5wb3coY3VyclBpeGVsLmIsIDIpO1xuICAgICAgICAgICAgICAgIHNxdWFyZWRTdW1BID0gTWF0aC5wb3cocHJldkF2ZXJhZ2UuYSwgMikgKyBNYXRoLnBvdyhjdXJyUGl4ZWwuYSwgMik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgcjogTWF0aC5zcXJ0KHNxdWFyZWRTdW1SIC8gMiksXG4gICAgICAgICAgICAgICAgICAgIGc6IE1hdGguc3FydChzcXVhcmVkU3VtRyAvIDIpLFxuICAgICAgICAgICAgICAgICAgICBiOiBNYXRoLnNxcnQoc3F1YXJlZFN1bUIgLyAyKSxcbiAgICAgICAgICAgICAgICAgICAgYTogTWF0aC5zcXJ0KHNxdWFyZWRTdW1BIC8gMiksXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0sIGF2ZXJhZ2VDb2xvcik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGF2ZXJhZ2VDb2xvcjtcbn1cblxuZnVuY3Rpb24gY3JlYXRlUGl4ZWwoeDogbnVtYmVyLCB5OiBudW1iZXIsIHI6IG51bWJlciwgZzogbnVtYmVyLCBiOiBudW1iZXIsIGE6IG51bWJlcik6IFBpeGVsIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB4LFxuICAgICAgICB5LFxuICAgICAgICByLFxuICAgICAgICBnLFxuICAgICAgICBiLFxuICAgICAgICBhLFxuICAgICAgICBnZXRCb3VuZHMoKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHg6IHRoaXMueCxcbiAgICAgICAgICAgICAgICB5OiB0aGlzLnksXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUGl4ZWxzKGltYWdlRGF0YTogSW1hZ2VEYXRhKTogUGl4ZWxbXSB7XG4gICAgbGV0IHBpeGVsczogUGl4ZWxbXSA9IFtdO1xuICAgIHByb2Nlc3NJbWFnZURhdGEoaW1hZ2VEYXRhLCBwaXhlbCA9PiBwaXhlbHMucHVzaChwaXhlbCkpO1xuICAgIHJldHVybiBwaXhlbHM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaWxsUGl4ZWxJbkltYWdlRGF0YShpbWFnZURhdGE6IEltYWdlRGF0YSwgcGl4ZWw6IFBpeGVsKTogdm9pZCB7XG4gICAgY29uc3QgcGl4ZWxPZmZzZXQ6IG51bWJlciA9IChwaXhlbC54ICsgcGl4ZWwueSAqIGltYWdlRGF0YS53aWR0aCkgKiBQSVhFTF9XSURUSDtcbiAgICBpZiAocGl4ZWxPZmZzZXQgPCAwIHx8IHBpeGVsT2Zmc2V0ICsgUElYRUxfV0lEVEggPj0gaW1hZ2VEYXRhLmRhdGEubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaW1hZ2VEYXRhLmRhdGFbcGl4ZWxPZmZzZXRdID0gcGl4ZWwucjtcbiAgICBpbWFnZURhdGEuZGF0YVtwaXhlbE9mZnNldCArIDFdID0gcGl4ZWwuZztcbiAgICBpbWFnZURhdGEuZGF0YVtwaXhlbE9mZnNldCArIDJdID0gcGl4ZWwuYjtcbiAgICBpbWFnZURhdGEuZGF0YVtwaXhlbE9mZnNldCArIDNdID0gcGl4ZWwuYTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEltYWdlRGF0YU9mZlNjcmVlbihpbWFnZTogSFRNTEltYWdlRWxlbWVudCwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpOiBJbWFnZURhdGEge1xuICAgIGNvbnN0IGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICBjb25zdCBjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKSBhcyBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG5cbiAgICBjYW52YXMud2lkdGggPSB3aWR0aDtcbiAgICBjYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xuXG4gICAgY29udGV4dC5kcmF3SW1hZ2UoaW1hZ2UsIDAsIDAsIGltYWdlLndpZHRoLCBpbWFnZS5oZWlnaHQsIDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG5cbiAgICBjb25zdCBpbWFnZURhdGE6IEltYWdlRGF0YSA9IGNvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG4gICAgcmV0dXJuIGltYWdlRGF0YTtcbn1cblxuZnVuY3Rpb24gcHJvY2Vzc0ltYWdlRGF0YShpbWFnZURhdGE6IEltYWdlRGF0YSwgcHJvY2Vzc0Z1bmM6IChwaXhlbDogUGl4ZWwpID0+IHZvaWQsIGluaXRQaXhlbFg6IG51bWJlciA9IDAsIGluaXRQaXhlbFk6IG51bWJlciA9IDApOiB2b2lkIHtcbiAgICBsZXQgcjogbnVtYmVyO1xuICAgIGxldCBnOiBudW1iZXI7XG4gICAgbGV0IGI6IG51bWJlcjtcbiAgICBsZXQgYTogbnVtYmVyO1xuICAgIGxldCBvZmZzZXRYOiBudW1iZXI7XG4gICAgbGV0IG9mZnNldFk6IG51bWJlcjtcbiAgICBsZXQgcGl4ZWw6IFBpeGVsO1xuXG4gICAgZm9yIChsZXQgeCA9IGluaXRQaXhlbFg7IHggPCBpbWFnZURhdGEud2lkdGg7IHgrKykge1xuICAgICAgICBvZmZzZXRYID0geCAqIFBJWEVMX1dJRFRIO1xuXG4gICAgICAgIGZvciAobGV0IHkgPSBpbml0UGl4ZWxZOyB5IDwgaW1hZ2VEYXRhLmhlaWdodDsgeSsrKSB7XG4gICAgICAgICAgICBvZmZzZXRZID0gaW1hZ2VEYXRhLndpZHRoICogeSAqIFBJWEVMX1dJRFRIO1xuXG4gICAgICAgICAgICByID0gaW1hZ2VEYXRhLmRhdGFbb2Zmc2V0WCArIG9mZnNldFldO1xuICAgICAgICAgICAgZyA9IGltYWdlRGF0YS5kYXRhW29mZnNldFggKyBvZmZzZXRZICsgMV07XG4gICAgICAgICAgICBiID0gaW1hZ2VEYXRhLmRhdGFbb2Zmc2V0WCArIG9mZnNldFkgKyAyXTtcbiAgICAgICAgICAgIGEgPSBpbWFnZURhdGEuZGF0YVtvZmZzZXRYICsgb2Zmc2V0WSArIDNdO1xuXG4gICAgICAgICAgICBwaXhlbCA9IGNyZWF0ZVBpeGVsKHgsIHksIHIsIGcsIGIsIGEpO1xuICAgICAgICAgICAgcHJvY2Vzc0Z1bmMocGl4ZWwpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9HaWYoaW1hZ2VGcmFtZXM6IEltYWdlRGF0YVtdKTogdm9pZCB7XG4gICAgY29uc3QgZ2lmID0gbmV3IEdJRih7XG4gICAgICAgIHdvcmtlcnM6IDIsXG4gICAgICAgIHF1YWxpdHk6IDEwXG4gICAgfSk7XG5cbiAgICBpbWFnZUZyYW1lc1xuICAgICAgICAuZm9yRWFjaChpbWFnZUZyYW1lID0+IGdpZi5hZGRGcmFtZShpbWFnZUZyYW1lKSk7XG5cbiAgICBnaWYub24oJ2ZpbmlzaGVkJywgKGJsb2I6IGFueSkgPT4ge1xuICAgICAgICBzYXZlQmxvYignc2ltcGxlcXVhZC5leHBvcnQuZ2lmJywgYmxvYik7XG4gICAgfSk7XG5cbiAgICBnaWYucmVuZGVyKCk7XG59XG5cbmZ1bmN0aW9uIHNhdmVCbG9iKGZpbGVOYW1lOiBzdHJpbmcsIGJsb2I6IEJsb2IpIHtcbiAgICBjb25zdCBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG4gICAgY29uc3QgdXJsID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG5cbiAgICBhLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICBhLmhyZWYgPSB1cmw7XG4gICAgYS5kb3dubG9hZCA9IGZpbGVOYW1lO1xuICAgIFxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYSk7XG4gICAgYS5jbGljaygpO1xuXG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChhKTtcbiAgICB3aW5kb3cuVVJMLnJldm9rZU9iamVjdFVSTCh1cmwpO1xufSJdLCJzb3VyY2VSb290IjoiIn0=