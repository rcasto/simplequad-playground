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
  return new Worker(__webpack_require__.p + "c2fe4a6a675e7b508a7c.worker.js");
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
var processedFrames = [];
var processingQueue = [];
var isProcessing = false;
var offlineAnimateId;
var processTimestamp;

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
    processTimestamp = performance.now();
  });
}

function onImageChange(event) {
  var imageInput = event.target;

  if (!imageInput || !imageInput.files || !imageInput.files.length) {
    return;
  }

  var skipFirst = false;

  if (!isProcessing) {
    processImage(imageInput.files[0]);
    isProcessing = true;
    skipFirst = true;
  }

  for (var fileIndex = skipFirst ? 1 : 0; fileIndex < imageInput.files.length; fileIndex++) {
    processingQueue.push(imageInput.files[fileIndex]);
  }
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
        processedFrames.push(message.data);
        window.requestAnimationFrame(function (timestamp) {
          return draw(message.data);
        });
      }

      break;

    case 'processed':
      if (processingQueue.length) {
        // process the next image in the queue
        var nextImageFile = processingQueue.shift();
        processImage(nextImageFile);
      } else {
        offlineAnimateId = window.requestAnimationFrame(function () {
          return offlineAnimate(processedFrames);
        });
        isProcessing = false;
      }

      console.log("Time to process: ".concat(performance.now() - processTimestamp));
      exportGifButton.disabled = isProcessing;
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
    Object(_util__WEBPACK_IMPORTED_MODULE_0__["toGif"])(processedFrames);
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
    a: a
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
  var a = document.createElement('a');
  var url = window.URL.createObjectURL(blob);
  a.style.display = 'none';
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2dpZi5qcy9kaXN0L2dpZi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcXVhZC53b3JrZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FuaW1hdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC50cyJdLCJuYW1lcyI6WyJjYW52YXMiLCJjb250ZXh0IiwiaW1hZ2VJbnB1dCIsImV4cG9ydEdpZkJ1dHRvbiIsInF1YWRXb3JrZXIiLCJwcm9jZXNzZWRGcmFtZXMiLCJwcm9jZXNzaW5nUXVldWUiLCJpc1Byb2Nlc3NpbmciLCJvZmZsaW5lQW5pbWF0ZUlkIiwicHJvY2Vzc1RpbWVzdGFtcCIsImRyYXciLCJpbWFnZURhdGEiLCJjbGVhclJlY3QiLCJ3aWR0aCIsImhlaWdodCIsInB1dEltYWdlRGF0YSIsIm9mZmxpbmVBbmltYXRlIiwib2ZmbGluZUZyYW1lcyIsImFuaW1hdGVJbmRleCIsImN1cnJGcmFtZUluZGV4IiwibnVtRnJhbWVzRWFjaCIsIm5leHRGcmFtZUluZGV4IiwibmV4dEFuaW1hdGVJbmRleCIsImxlbmd0aCIsIndpbmRvdyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsInByb2Nlc3NJbWFnZSIsImltYWdlRmlsZSIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwibG9hZEltYWdlIiwidGhlbiIsImltYWdlRWxlbSIsImdldEltYWdlRGF0YU9mZlNjcmVlbiIsIm1lc3NhZ2UiLCJ0eXBlIiwiZGF0YSIsInBvc3RNZXNzYWdlIiwicGVyZm9ybWFuY2UiLCJub3ciLCJvbkltYWdlQ2hhbmdlIiwiZXZlbnQiLCJ0YXJnZXQiLCJmaWxlcyIsInNraXBGaXJzdCIsImZpbGVJbmRleCIsInB1c2giLCJyZXNpemVDYW52YXMiLCJjb21wdXRlZFN0eWxlIiwiZ2V0Q29tcHV0ZWRTdHlsZSIsInBhcnNlSW50IiwiZ2V0UHJvcGVydHlWYWx1ZSIsIm9uV29ya2VyTWVzc2FnZSIsInRpbWVzdGFtcCIsIm5leHRJbWFnZUZpbGUiLCJzaGlmdCIsImNvbnNvbGUiLCJsb2ciLCJkaXNhYmxlZCIsImVycm9yIiwibWFpbiIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJnZXRDb250ZXh0IiwiYWRkRXZlbnRMaXN0ZW5lciIsIlF1YWRXb3JrZXIiLCJ0b0dpZiIsIlBJWEVMX1dJRFRIIiwiV0hJVEVfQ09MT1IiLCJyIiwiZyIsImIiLCJhIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJpbWFnZUZpbGVEYXRhVXJsIiwiVVJMIiwiY3JlYXRlT2JqZWN0VVJMIiwiaW1hZ2UiLCJJbWFnZSIsIm9ubG9hZCIsInJldm9rZU9iamVjdFVSTCIsIm9uZXJyb3IiLCJlcnIiLCJzcmMiLCJnZXRBdmVyYWdlQ29sb3IiLCJwaXhlbHMiLCJzcXVhcmVkU3VtUiIsInNxdWFyZWRTdW1HIiwic3F1YXJlZFN1bUIiLCJzcXVhcmVkU3VtQSIsImF2ZXJhZ2VDb2xvciIsInNsaWNlIiwicmVkdWNlIiwicHJldkF2ZXJhZ2UiLCJjdXJyUGl4ZWwiLCJNYXRoIiwicG93Iiwic3FydCIsImNyZWF0ZVBpeGVsIiwieCIsInkiLCJjcmVhdGVQaXhlbHMiLCJwcm9jZXNzSW1hZ2VEYXRhIiwicGl4ZWwiLCJmaWxsUGl4ZWxJbkltYWdlRGF0YSIsInBpeGVsT2Zmc2V0IiwiY3JlYXRlRWxlbWVudCIsImRyYXdJbWFnZSIsImdldEltYWdlRGF0YSIsInByb2Nlc3NGdW5jIiwiaW5pdFBpeGVsWCIsImluaXRQaXhlbFkiLCJvZmZzZXRYIiwib2Zmc2V0WSIsImltYWdlRnJhbWVzIiwiZ2lmIiwiR0lGIiwid29ya2VycyIsInF1YWxpdHkiLCJmb3JFYWNoIiwiaW1hZ2VGcmFtZSIsImFkZEZyYW1lIiwiZGVsYXkiLCJvbiIsImJsb2IiLCJzYXZlQmxvYiIsInJlbmRlciIsImZpbGVOYW1lIiwidXJsIiwic3R5bGUiLCJkaXNwbGF5IiwiaHJlZiIsImRvd25sb2FkIiwiYm9keSIsImFw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QSxHQUR2QjtBQUtBUCxLQUFHLENBQUNRLEVBQUosQ0FBTyxVQUFQLEVBQW1CLFVBQUNDLElBQUQsRUFBZTtBQUM5QkMsWUFBUSxDQUFDLHVCQUFELEVBQTBCRCxJQUExQixDQUFSO0FBQ0gsR0FGRDtBQUlBVCxLQUFHLENBQUNXLE1BQUo7QUFDSDs7QUFFRCxTQUFTRCxRQUFULENBQWtCRSxRQUFsQixFQUFvQ0gsSUFBcEMsRUFBZ0Q7QUFDNUMsTUFBTXRELENBQUMsR0FBR1gsUUFBUSxDQUFDK0MsYUFBVCxDQUF1QixHQUF2QixDQUFWO0FBQ0EsTUFBTXNCLEdBQUcsR0FBR3pHLE1BQU0sQ0FBQ29ELEdBQVAsQ0FBV0MsZUFBWCxDQUEyQmdELElBQTNCLENBQVo7QUFFQXRELEdBQUMsQ0FBQzJELEtBQUYsQ0FBUUMsT0FBUixHQUFrQixNQUFsQjtBQUNBNUQsR0FBQyxDQUFDNkQsSUFBRixHQUFTSCxHQUFUO0FBQ0ExRCxHQUFDLENBQUM4RCxRQUFGLEdBQWFMLFFBQWI7QUFFQXBFLFVBQVEsQ0FBQzBFLElBQVQsQ0FBY0MsV0FBZCxDQUEwQmhFLENBQTFCO0FBQ0FBLEdBQUMsQ0FBQ2lFLEtBQUY7QUFFQTVFLFVBQVEsQ0FBQzBFLElBQVQsQ0FBY0csV0FBZCxDQUEwQmxFLENBQTFCO0FBQ0EvQyxRQUFNLENBQUNvRCxHQUFQLENBQVdLLGVBQVgsQ0FBMkJnRCxHQUEzQjtBQUNILEMiLCJmaWxlIjoiYXBwLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2FuaW1hdGlvbi50c1wiKTtcbiIsIi8vIGdpZi5qcyAwLjIuMCAtIGh0dHBzOi8vZ2l0aHViLmNvbS9qbm9yZGJlcmcvZ2lmLmpzXG4oZnVuY3Rpb24oZil7aWYodHlwZW9mIGV4cG9ydHM9PT1cIm9iamVjdFwiJiZ0eXBlb2YgbW9kdWxlIT09XCJ1bmRlZmluZWRcIil7bW9kdWxlLmV4cG9ydHM9ZigpfWVsc2UgaWYodHlwZW9mIGRlZmluZT09PVwiZnVuY3Rpb25cIiYmZGVmaW5lLmFtZCl7ZGVmaW5lKFtdLGYpfWVsc2V7dmFyIGc7aWYodHlwZW9mIHdpbmRvdyE9PVwidW5kZWZpbmVkXCIpe2c9d2luZG93fWVsc2UgaWYodHlwZW9mIGdsb2JhbCE9PVwidW5kZWZpbmVkXCIpe2c9Z2xvYmFsfWVsc2UgaWYodHlwZW9mIHNlbGYhPT1cInVuZGVmaW5lZFwiKXtnPXNlbGZ9ZWxzZXtnPXRoaXN9Zy5HSUY9ZigpfX0pKGZ1bmN0aW9uKCl7dmFyIGRlZmluZSxtb2R1bGUsZXhwb3J0cztyZXR1cm4gZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KHsxOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtmdW5jdGlvbiBFdmVudEVtaXR0ZXIoKXt0aGlzLl9ldmVudHM9dGhpcy5fZXZlbnRzfHx7fTt0aGlzLl9tYXhMaXN0ZW5lcnM9dGhpcy5fbWF4TGlzdGVuZXJzfHx1bmRlZmluZWR9bW9kdWxlLmV4cG9ydHM9RXZlbnRFbWl0dGVyO0V2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXI9RXZlbnRFbWl0dGVyO0V2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50cz11bmRlZmluZWQ7RXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fbWF4TGlzdGVuZXJzPXVuZGVmaW5lZDtFdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycz0xMDtFdmVudEVtaXR0ZXIucHJvdG90eXBlLnNldE1heExpc3RlbmVycz1mdW5jdGlvbihuKXtpZighaXNOdW1iZXIobil8fG48MHx8aXNOYU4obikpdGhyb3cgVHlwZUVycm9yKFwibiBtdXN0IGJlIGEgcG9zaXRpdmUgbnVtYmVyXCIpO3RoaXMuX21heExpc3RlbmVycz1uO3JldHVybiB0aGlzfTtFdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQ9ZnVuY3Rpb24odHlwZSl7dmFyIGVyLGhhbmRsZXIsbGVuLGFyZ3MsaSxsaXN0ZW5lcnM7aWYoIXRoaXMuX2V2ZW50cyl0aGlzLl9ldmVudHM9e307aWYodHlwZT09PVwiZXJyb3JcIil7aWYoIXRoaXMuX2V2ZW50cy5lcnJvcnx8aXNPYmplY3QodGhpcy5fZXZlbnRzLmVycm9yKSYmIXRoaXMuX2V2ZW50cy5lcnJvci5sZW5ndGgpe2VyPWFyZ3VtZW50c1sxXTtpZihlciBpbnN0YW5jZW9mIEVycm9yKXt0aHJvdyBlcn1lbHNle3ZhciBlcnI9bmV3IEVycm9yKCdVbmNhdWdodCwgdW5zcGVjaWZpZWQgXCJlcnJvclwiIGV2ZW50LiAoJytlcitcIilcIik7ZXJyLmNvbnRleHQ9ZXI7dGhyb3cgZXJyfX19aGFuZGxlcj10aGlzLl9ldmVudHNbdHlwZV07aWYoaXNVbmRlZmluZWQoaGFuZGxlcikpcmV0dXJuIGZhbHNlO2lmKGlzRnVuY3Rpb24oaGFuZGxlcikpe3N3aXRjaChhcmd1bWVudHMubGVuZ3RoKXtjYXNlIDE6aGFuZGxlci5jYWxsKHRoaXMpO2JyZWFrO2Nhc2UgMjpoYW5kbGVyLmNhbGwodGhpcyxhcmd1bWVudHNbMV0pO2JyZWFrO2Nhc2UgMzpoYW5kbGVyLmNhbGwodGhpcyxhcmd1bWVudHNbMV0sYXJndW1lbnRzWzJdKTticmVhaztkZWZhdWx0OmFyZ3M9QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLDEpO2hhbmRsZXIuYXBwbHkodGhpcyxhcmdzKX19ZWxzZSBpZihpc09iamVjdChoYW5kbGVyKSl7YXJncz1BcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsMSk7bGlzdGVuZXJzPWhhbmRsZXIuc2xpY2UoKTtsZW49bGlzdGVuZXJzLmxlbmd0aDtmb3IoaT0wO2k8bGVuO2krKylsaXN0ZW5lcnNbaV0uYXBwbHkodGhpcyxhcmdzKX1yZXR1cm4gdHJ1ZX07RXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lcj1mdW5jdGlvbih0eXBlLGxpc3RlbmVyKXt2YXIgbTtpZighaXNGdW5jdGlvbihsaXN0ZW5lcikpdGhyb3cgVHlwZUVycm9yKFwibGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uXCIpO2lmKCF0aGlzLl9ldmVudHMpdGhpcy5fZXZlbnRzPXt9O2lmKHRoaXMuX2V2ZW50cy5uZXdMaXN0ZW5lcil0aGlzLmVtaXQoXCJuZXdMaXN0ZW5lclwiLHR5cGUsaXNGdW5jdGlvbihsaXN0ZW5lci5saXN0ZW5lcik/bGlzdGVuZXIubGlzdGVuZXI6bGlzdGVuZXIpO2lmKCF0aGlzLl9ldmVudHNbdHlwZV0pdGhpcy5fZXZlbnRzW3R5cGVdPWxpc3RlbmVyO2Vsc2UgaWYoaXNPYmplY3QodGhpcy5fZXZlbnRzW3R5cGVdKSl0aGlzLl9ldmVudHNbdHlwZV0ucHVzaChsaXN0ZW5lcik7ZWxzZSB0aGlzLl9ldmVudHNbdHlwZV09W3RoaXMuX2V2ZW50c1t0eXBlXSxsaXN0ZW5lcl07aWYoaXNPYmplY3QodGhpcy5fZXZlbnRzW3R5cGVdKSYmIXRoaXMuX2V2ZW50c1t0eXBlXS53YXJuZWQpe2lmKCFpc1VuZGVmaW5lZCh0aGlzLl9tYXhMaXN0ZW5lcnMpKXttPXRoaXMuX21heExpc3RlbmVyc31lbHNle209RXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnN9aWYobSYmbT4wJiZ0aGlzLl9ldmVudHNbdHlwZV0ubGVuZ3RoPm0pe3RoaXMuX2V2ZW50c1t0eXBlXS53YXJuZWQ9dHJ1ZTtjb25zb2xlLmVycm9yKFwiKG5vZGUpIHdhcm5pbmc6IHBvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgXCIrXCJsZWFrIGRldGVjdGVkLiAlZCBsaXN0ZW5lcnMgYWRkZWQuIFwiK1wiVXNlIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKCkgdG8gaW5jcmVhc2UgbGltaXQuXCIsdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCk7aWYodHlwZW9mIGNvbnNvbGUudHJhY2U9PT1cImZ1bmN0aW9uXCIpe2NvbnNvbGUudHJhY2UoKX19fXJldHVybiB0aGlzfTtFdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uPUV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXI7RXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlPWZ1bmN0aW9uKHR5cGUsbGlzdGVuZXIpe2lmKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSl0aHJvdyBUeXBlRXJyb3IoXCJsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb25cIik7dmFyIGZpcmVkPWZhbHNlO2Z1bmN0aW9uIGcoKXt0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsZyk7aWYoIWZpcmVkKXtmaXJlZD10cnVlO2xpc3RlbmVyLmFwcGx5KHRoaXMsYXJndW1lbnRzKX19Zy5saXN0ZW5lcj1saXN0ZW5lcjt0aGlzLm9uKHR5cGUsZyk7cmV0dXJuIHRoaXN9O0V2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXI9ZnVuY3Rpb24odHlwZSxsaXN0ZW5lcil7dmFyIGxpc3QscG9zaXRpb24sbGVuZ3RoLGk7aWYoIWlzRnVuY3Rpb24obGlzdGVuZXIpKXRocm93IFR5cGVFcnJvcihcImxpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvblwiKTtpZighdGhpcy5fZXZlbnRzfHwhdGhpcy5fZXZlbnRzW3R5cGVdKXJldHVybiB0aGlzO2xpc3Q9dGhpcy5fZXZlbnRzW3R5cGVdO2xlbmd0aD1saXN0Lmxlbmd0aDtwb3NpdGlvbj0tMTtpZihsaXN0PT09bGlzdGVuZXJ8fGlzRnVuY3Rpb24obGlzdC5saXN0ZW5lcikmJmxpc3QubGlzdGVuZXI9PT1saXN0ZW5lcil7ZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtpZih0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpdGhpcy5lbWl0KFwicmVtb3ZlTGlzdGVuZXJcIix0eXBlLGxpc3RlbmVyKX1lbHNlIGlmKGlzT2JqZWN0KGxpc3QpKXtmb3IoaT1sZW5ndGg7aS0tID4wOyl7aWYobGlzdFtpXT09PWxpc3RlbmVyfHxsaXN0W2ldLmxpc3RlbmVyJiZsaXN0W2ldLmxpc3RlbmVyPT09bGlzdGVuZXIpe3Bvc2l0aW9uPWk7YnJlYWt9fWlmKHBvc2l0aW9uPDApcmV0dXJuIHRoaXM7aWYobGlzdC5sZW5ndGg9PT0xKXtsaXN0Lmxlbmd0aD0wO2RlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV19ZWxzZXtsaXN0LnNwbGljZShwb3NpdGlvbiwxKX1pZih0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpdGhpcy5lbWl0KFwicmVtb3ZlTGlzdGVuZXJcIix0eXBlLGxpc3RlbmVyKX1yZXR1cm4gdGhpc307RXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnM9ZnVuY3Rpb24odHlwZSl7dmFyIGtleSxsaXN0ZW5lcnM7aWYoIXRoaXMuX2V2ZW50cylyZXR1cm4gdGhpcztpZighdGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKXtpZihhcmd1bWVudHMubGVuZ3RoPT09MCl0aGlzLl9ldmVudHM9e307ZWxzZSBpZih0aGlzLl9ldmVudHNbdHlwZV0pZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtyZXR1cm4gdGhpc31pZihhcmd1bWVudHMubGVuZ3RoPT09MCl7Zm9yKGtleSBpbiB0aGlzLl9ldmVudHMpe2lmKGtleT09PVwicmVtb3ZlTGlzdGVuZXJcIiljb250aW51ZTt0aGlzLnJlbW92ZUFsbExpc3RlbmVycyhrZXkpfXRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKFwicmVtb3ZlTGlzdGVuZXJcIik7dGhpcy5fZXZlbnRzPXt9O3JldHVybiB0aGlzfWxpc3RlbmVycz10aGlzLl9ldmVudHNbdHlwZV07aWYoaXNGdW5jdGlvbihsaXN0ZW5lcnMpKXt0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsbGlzdGVuZXJzKX1lbHNlIGlmKGxpc3RlbmVycyl7d2hpbGUobGlzdGVuZXJzLmxlbmd0aCl0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsbGlzdGVuZXJzW2xpc3RlbmVycy5sZW5ndGgtMV0pfWRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07cmV0dXJuIHRoaXN9O0V2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzPWZ1bmN0aW9uKHR5cGUpe3ZhciByZXQ7aWYoIXRoaXMuX2V2ZW50c3x8IXRoaXMuX2V2ZW50c1t0eXBlXSlyZXQ9W107ZWxzZSBpZihpc0Z1bmN0aW9uKHRoaXMuX2V2ZW50c1t0eXBlXSkpcmV0PVt0aGlzLl9ldmVudHNbdHlwZV1dO2Vsc2UgcmV0PXRoaXMuX2V2ZW50c1t0eXBlXS5zbGljZSgpO3JldHVybiByZXR9O0V2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJDb3VudD1mdW5jdGlvbih0eXBlKXtpZih0aGlzLl9ldmVudHMpe3ZhciBldmxpc3RlbmVyPXRoaXMuX2V2ZW50c1t0eXBlXTtpZihpc0Z1bmN0aW9uKGV2bGlzdGVuZXIpKXJldHVybiAxO2Vsc2UgaWYoZXZsaXN0ZW5lcilyZXR1cm4gZXZsaXN0ZW5lci5sZW5ndGh9cmV0dXJuIDB9O0V2ZW50RW1pdHRlci5saXN0ZW5lckNvdW50PWZ1bmN0aW9uKGVtaXR0ZXIsdHlwZSl7cmV0dXJuIGVtaXR0ZXIubGlzdGVuZXJDb3VudCh0eXBlKX07ZnVuY3Rpb24gaXNGdW5jdGlvbihhcmcpe3JldHVybiB0eXBlb2YgYXJnPT09XCJmdW5jdGlvblwifWZ1bmN0aW9uIGlzTnVtYmVyKGFyZyl7cmV0dXJuIHR5cGVvZiBhcmc9PT1cIm51bWJlclwifWZ1bmN0aW9uIGlzT2JqZWN0KGFyZyl7cmV0dXJuIHR5cGVvZiBhcmc9PT1cIm9iamVjdFwiJiZhcmchPT1udWxsfWZ1bmN0aW9uIGlzVW5kZWZpbmVkKGFyZyl7cmV0dXJuIGFyZz09PXZvaWQgMH19LHt9XSwyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXt2YXIgVUEsYnJvd3Nlcixtb2RlLHBsYXRmb3JtLHVhO3VhPW5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKTtwbGF0Zm9ybT1uYXZpZ2F0b3IucGxhdGZvcm0udG9Mb3dlckNhc2UoKTtVQT11YS5tYXRjaCgvKG9wZXJhfGllfGZpcmVmb3h8Y2hyb21lfHZlcnNpb24pW1xcc1xcLzpdKFtcXHdcXGRcXC5dKyk/Lio/KHNhZmFyaXx2ZXJzaW9uW1xcc1xcLzpdKFtcXHdcXGRcXC5dKyl8JCkvKXx8W251bGwsXCJ1bmtub3duXCIsMF07bW9kZT1VQVsxXT09PVwiaWVcIiYmZG9jdW1lbnQuZG9jdW1lbnRNb2RlO2Jyb3dzZXI9e25hbWU6VUFbMV09PT1cInZlcnNpb25cIj9VQVszXTpVQVsxXSx2ZXJzaW9uOm1vZGV8fHBhcnNlRmxvYXQoVUFbMV09PT1cIm9wZXJhXCImJlVBWzRdP1VBWzRdOlVBWzJdKSxwbGF0Zm9ybTp7bmFtZTp1YS5tYXRjaCgvaXAoPzphZHxvZHxob25lKS8pP1wiaW9zXCI6KHVhLm1hdGNoKC8oPzp3ZWJvc3xhbmRyb2lkKS8pfHxwbGF0Zm9ybS5tYXRjaCgvbWFjfHdpbnxsaW51eC8pfHxbXCJvdGhlclwiXSlbMF19fTticm93c2VyW2Jyb3dzZXIubmFtZV09dHJ1ZTticm93c2VyW2Jyb3dzZXIubmFtZStwYXJzZUludChicm93c2VyLnZlcnNpb24sMTApXT10cnVlO2Jyb3dzZXIucGxhdGZvcm1bYnJvd3Nlci5wbGF0Zm9ybS5uYW1lXT10cnVlO21vZHVsZS5leHBvcnRzPWJyb3dzZXJ9LHt9XSwzOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXt2YXIgRXZlbnRFbWl0dGVyLEdJRixicm93c2VyLGV4dGVuZD1mdW5jdGlvbihjaGlsZCxwYXJlbnQpe2Zvcih2YXIga2V5IGluIHBhcmVudCl7aWYoaGFzUHJvcC5jYWxsKHBhcmVudCxrZXkpKWNoaWxkW2tleV09cGFyZW50W2tleV19ZnVuY3Rpb24gY3Rvcigpe3RoaXMuY29uc3RydWN0b3I9Y2hpbGR9Y3Rvci5wcm90b3R5cGU9cGFyZW50LnByb3RvdHlwZTtjaGlsZC5wcm90b3R5cGU9bmV3IGN0b3I7Y2hpbGQuX19zdXBlcl9fPXBhcmVudC5wcm90b3R5cGU7cmV0dXJuIGNoaWxkfSxoYXNQcm9wPXt9Lmhhc093blByb3BlcnR5LGluZGV4T2Y9W10uaW5kZXhPZnx8ZnVuY3Rpb24oaXRlbSl7Zm9yKHZhciBpPTAsbD10aGlzLmxlbmd0aDtpPGw7aSsrKXtpZihpIGluIHRoaXMmJnRoaXNbaV09PT1pdGVtKXJldHVybiBpfXJldHVybi0xfSxzbGljZT1bXS5zbGljZTtFdmVudEVtaXR0ZXI9cmVxdWlyZShcImV2ZW50c1wiKS5FdmVudEVtaXR0ZXI7YnJvd3Nlcj1yZXF1aXJlKFwiLi9icm93c2VyLmNvZmZlZVwiKTtHSUY9ZnVuY3Rpb24oc3VwZXJDbGFzcyl7dmFyIGRlZmF1bHRzLGZyYW1lRGVmYXVsdHM7ZXh0ZW5kKEdJRixzdXBlckNsYXNzKTtkZWZhdWx0cz17d29ya2VyU2NyaXB0OlwiZ2lmLndvcmtlci5qc1wiLHdvcmtlcnM6MixyZXBlYXQ6MCxiYWNrZ3JvdW5kOlwiI2ZmZlwiLHF1YWxpdHk6MTAsd2lkdGg6bnVsbCxoZWlnaHQ6bnVsbCx0cmFuc3BhcmVudDpudWxsLGRlYnVnOmZhbHNlLGRpdGhlcjpmYWxzZX07ZnJhbWVEZWZhdWx0cz17ZGVsYXk6NTAwLGNvcHk6ZmFsc2V9O2Z1bmN0aW9uIEdJRihvcHRpb25zKXt2YXIgYmFzZSxrZXksdmFsdWU7dGhpcy5ydW5uaW5nPWZhbHNlO3RoaXMub3B0aW9ucz17fTt0aGlzLmZyYW1lcz1bXTt0aGlzLmZyZWVXb3JrZXJzPVtdO3RoaXMuYWN0aXZlV29ya2Vycz1bXTt0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7Zm9yKGtleSBpbiBkZWZhdWx0cyl7dmFsdWU9ZGVmYXVsdHNba2V5XTtpZigoYmFzZT10aGlzLm9wdGlvbnMpW2tleV09PW51bGwpe2Jhc2Vba2V5XT12YWx1ZX19fUdJRi5wcm90b3R5cGUuc2V0T3B0aW9uPWZ1bmN0aW9uKGtleSx2YWx1ZSl7dGhpcy5vcHRpb25zW2tleV09dmFsdWU7aWYodGhpcy5fY2FudmFzIT1udWxsJiYoa2V5PT09XCJ3aWR0aFwifHxrZXk9PT1cImhlaWdodFwiKSl7cmV0dXJuIHRoaXMuX2NhbnZhc1trZXldPXZhbHVlfX07R0lGLnByb3RvdHlwZS5zZXRPcHRpb25zPWZ1bmN0aW9uKG9wdGlvbnMpe3ZhciBrZXkscmVzdWx0cyx2YWx1ZTtyZXN1bHRzPVtdO2ZvcihrZXkgaW4gb3B0aW9ucyl7aWYoIWhhc1Byb3AuY2FsbChvcHRpb25zLGtleSkpY29udGludWU7dmFsdWU9b3B0aW9uc1trZXldO3Jlc3VsdHMucHVzaCh0aGlzLnNldE9wdGlvbihrZXksdmFsdWUpKX1yZXR1cm4gcmVzdWx0c307R0lGLnByb3RvdHlwZS5hZGRGcmFtZT1mdW5jdGlvbihpbWFnZSxvcHRpb25zKXt2YXIgZnJhbWUsa2V5O2lmKG9wdGlvbnM9PW51bGwpe29wdGlvbnM9e319ZnJhbWU9e307ZnJhbWUudHJhbnNwYXJlbnQ9dGhpcy5vcHRpb25zLnRyYW5zcGFyZW50O2ZvcihrZXkgaW4gZnJhbWVEZWZhdWx0cyl7ZnJhbWVba2V5XT1vcHRpb25zW2tleV18fGZyYW1lRGVmYXVsdHNba2V5XX1pZih0aGlzLm9wdGlvbnMud2lkdGg9PW51bGwpe3RoaXMuc2V0T3B0aW9uKFwid2lkdGhcIixpbWFnZS53aWR0aCl9aWYodGhpcy5vcHRpb25zLmhlaWdodD09bnVsbCl7dGhpcy5zZXRPcHRpb24oXCJoZWlnaHRcIixpbWFnZS5oZWlnaHQpfWlmKHR5cGVvZiBJbWFnZURhdGEhPT1cInVuZGVmaW5lZFwiJiZJbWFnZURhdGEhPT1udWxsJiZpbWFnZSBpbnN0YW5jZW9mIEltYWdlRGF0YSl7ZnJhbWUuZGF0YT1pbWFnZS5kYXRhfWVsc2UgaWYodHlwZW9mIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCE9PVwidW5kZWZpbmVkXCImJkNhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCE9PW51bGwmJmltYWdlIGluc3RhbmNlb2YgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEfHx0eXBlb2YgV2ViR0xSZW5kZXJpbmdDb250ZXh0IT09XCJ1bmRlZmluZWRcIiYmV2ViR0xSZW5kZXJpbmdDb250ZXh0IT09bnVsbCYmaW1hZ2UgaW5zdGFuY2VvZiBXZWJHTFJlbmRlcmluZ0NvbnRleHQpe2lmKG9wdGlvbnMuY29weSl7ZnJhbWUuZGF0YT10aGlzLmdldENvbnRleHREYXRhKGltYWdlKX1lbHNle2ZyYW1lLmNvbnRleHQ9aW1hZ2V9fWVsc2UgaWYoaW1hZ2UuY2hpbGROb2RlcyE9bnVsbCl7aWYob3B0aW9ucy5jb3B5KXtmcmFtZS5kYXRhPXRoaXMuZ2V0SW1hZ2VEYXRhKGltYWdlKX1lbHNle2ZyYW1lLmltYWdlPWltYWdlfX1lbHNle3Rocm93IG5ldyBFcnJvcihcIkludmFsaWQgaW1hZ2VcIil9cmV0dXJuIHRoaXMuZnJhbWVzLnB1c2goZnJhbWUpfTtHSUYucHJvdG90eXBlLnJlbmRlcj1mdW5jdGlvbigpe3ZhciBpLGosbnVtV29ya2VycyxyZWY7aWYodGhpcy5ydW5uaW5nKXt0aHJvdyBuZXcgRXJyb3IoXCJBbHJlYWR5IHJ1bm5pbmdcIil9aWYodGhpcy5vcHRpb25zLndpZHRoPT1udWxsfHx0aGlzLm9wdGlvbnMuaGVpZ2h0PT1udWxsKXt0aHJvdyBuZXcgRXJyb3IoXCJXaWR0aCBhbmQgaGVpZ2h0IG11c3QgYmUgc2V0IHByaW9yIHRvIHJlbmRlcmluZ1wiKX10aGlzLnJ1bm5pbmc9dHJ1ZTt0aGlzLm5leHRGcmFtZT0wO3RoaXMuZmluaXNoZWRGcmFtZXM9MDt0aGlzLmltYWdlUGFydHM9ZnVuY3Rpb24oKXt2YXIgaixyZWYscmVzdWx0cztyZXN1bHRzPVtdO2ZvcihpPWo9MCxyZWY9dGhpcy5mcmFtZXMubGVuZ3RoOzA8PXJlZj9qPHJlZjpqPnJlZjtpPTA8PXJlZj8rK2o6LS1qKXtyZXN1bHRzLnB1c2gobnVsbCl9cmV0dXJuIHJlc3VsdHN9LmNhbGwodGhpcyk7bnVtV29ya2Vycz10aGlzLnNwYXduV29ya2VycygpO2lmKHRoaXMub3B0aW9ucy5nbG9iYWxQYWxldHRlPT09dHJ1ZSl7dGhpcy5yZW5kZXJOZXh0RnJhbWUoKX1lbHNle2ZvcihpPWo9MCxyZWY9bnVtV29ya2VyczswPD1yZWY/ajxyZWY6aj5yZWY7aT0wPD1yZWY/KytqOi0tail7dGhpcy5yZW5kZXJOZXh0RnJhbWUoKX19dGhpcy5lbWl0KFwic3RhcnRcIik7cmV0dXJuIHRoaXMuZW1pdChcInByb2dyZXNzXCIsMCl9O0dJRi5wcm90b3R5cGUuYWJvcnQ9ZnVuY3Rpb24oKXt2YXIgd29ya2VyO3doaWxlKHRydWUpe3dvcmtlcj10aGlzLmFjdGl2ZVdvcmtlcnMuc2hpZnQoKTtpZih3b3JrZXI9PW51bGwpe2JyZWFrfXRoaXMubG9nKFwia2lsbGluZyBhY3RpdmUgd29ya2VyXCIpO3dvcmtlci50ZXJtaW5hdGUoKX10aGlzLnJ1bm5pbmc9ZmFsc2U7cmV0dXJuIHRoaXMuZW1pdChcImFib3J0XCIpfTtHSUYucHJvdG90eXBlLnNwYXduV29ya2Vycz1mdW5jdGlvbigpe3ZhciBqLG51bVdvcmtlcnMscmVmLHJlc3VsdHM7bnVtV29ya2Vycz1NYXRoLm1pbih0aGlzLm9wdGlvbnMud29ya2Vycyx0aGlzLmZyYW1lcy5sZW5ndGgpOyhmdW5jdGlvbigpe3Jlc3VsdHM9W107Zm9yKHZhciBqPXJlZj10aGlzLmZyZWVXb3JrZXJzLmxlbmd0aDtyZWY8PW51bVdvcmtlcnM/ajxudW1Xb3JrZXJzOmo+bnVtV29ya2VycztyZWY8PW51bVdvcmtlcnM/aisrOmotLSl7cmVzdWx0cy5wdXNoKGopfXJldHVybiByZXN1bHRzfSkuYXBwbHkodGhpcykuZm9yRWFjaChmdW5jdGlvbihfdGhpcyl7cmV0dXJuIGZ1bmN0aW9uKGkpe3ZhciB3b3JrZXI7X3RoaXMubG9nKFwic3Bhd25pbmcgd29ya2VyIFwiK2kpO3dvcmtlcj1uZXcgV29ya2VyKF90aGlzLm9wdGlvbnMud29ya2VyU2NyaXB0KTt3b3JrZXIub25tZXNzYWdlPWZ1bmN0aW9uKGV2ZW50KXtfdGhpcy5hY3RpdmVXb3JrZXJzLnNwbGljZShfdGhpcy5hY3RpdmVXb3JrZXJzLmluZGV4T2Yod29ya2VyKSwxKTtfdGhpcy5mcmVlV29ya2Vycy5wdXNoKHdvcmtlcik7cmV0dXJuIF90aGlzLmZyYW1lRmluaXNoZWQoZXZlbnQuZGF0YSl9O3JldHVybiBfdGhpcy5mcmVlV29ya2Vycy5wdXNoKHdvcmtlcil9fSh0aGlzKSk7cmV0dXJuIG51bVdvcmtlcnN9O0dJRi5wcm90b3R5cGUuZnJhbWVGaW5pc2hlZD1mdW5jdGlvbihmcmFtZSl7dmFyIGksaixyZWY7dGhpcy5sb2coXCJmcmFtZSBcIitmcmFtZS5pbmRleCtcIiBmaW5pc2hlZCAtIFwiK3RoaXMuYWN0aXZlV29ya2Vycy5sZW5ndGgrXCIgYWN0aXZlXCIpO3RoaXMuZmluaXNoZWRGcmFtZXMrKzt0aGlzLmVtaXQoXCJwcm9ncmVzc1wiLHRoaXMuZmluaXNoZWRGcmFtZXMvdGhpcy5mcmFtZXMubGVuZ3RoKTt0aGlzLmltYWdlUGFydHNbZnJhbWUuaW5kZXhdPWZyYW1lO2lmKHRoaXMub3B0aW9ucy5nbG9iYWxQYWxldHRlPT09dHJ1ZSl7dGhpcy5vcHRpb25zLmdsb2JhbFBhbGV0dGU9ZnJhbWUuZ2xvYmFsUGFsZXR0ZTt0aGlzLmxvZyhcImdsb2JhbCBwYWxldHRlIGFuYWx5emVkXCIpO2lmKHRoaXMuZnJhbWVzLmxlbmd0aD4yKXtmb3IoaT1qPTEscmVmPXRoaXMuZnJlZVdvcmtlcnMubGVuZ3RoOzE8PXJlZj9qPHJlZjpqPnJlZjtpPTE8PXJlZj8rK2o6LS1qKXt0aGlzLnJlbmRlck5leHRGcmFtZSgpfX19aWYoaW5kZXhPZi5jYWxsKHRoaXMuaW1hZ2VQYXJ0cyxudWxsKT49MCl7cmV0dXJuIHRoaXMucmVuZGVyTmV4dEZyYW1lKCl9ZWxzZXtyZXR1cm4gdGhpcy5maW5pc2hSZW5kZXJpbmcoKX19O0dJRi5wcm90b3R5cGUuZmluaXNoUmVuZGVyaW5nPWZ1bmN0aW9uKCl7dmFyIGRhdGEsZnJhbWUsaSxpbWFnZSxqLGssbCxsZW4sbGVuMSxsZW4yLGxlbjMsb2Zmc2V0LHBhZ2UscmVmLHJlZjEscmVmMjtsZW49MDtyZWY9dGhpcy5pbWFnZVBhcnRzO2ZvcihqPTAsbGVuMT1yZWYubGVuZ3RoO2o8bGVuMTtqKyspe2ZyYW1lPXJlZltqXTtsZW4rPShmcmFtZS5kYXRhLmxlbmd0aC0xKSpmcmFtZS5wYWdlU2l6ZStmcmFtZS5jdXJzb3J9bGVuKz1mcmFtZS5wYWdlU2l6ZS1mcmFtZS5jdXJzb3I7dGhpcy5sb2coXCJyZW5kZXJpbmcgZmluaXNoZWQgLSBmaWxlc2l6ZSBcIitNYXRoLnJvdW5kKGxlbi8xZTMpK1wia2JcIik7ZGF0YT1uZXcgVWludDhBcnJheShsZW4pO29mZnNldD0wO3JlZjE9dGhpcy5pbWFnZVBhcnRzO2ZvcihrPTAsbGVuMj1yZWYxLmxlbmd0aDtrPGxlbjI7aysrKXtmcmFtZT1yZWYxW2tdO3JlZjI9ZnJhbWUuZGF0YTtmb3IoaT1sPTAsbGVuMz1yZWYyLmxlbmd0aDtsPGxlbjM7aT0rK2wpe3BhZ2U9cmVmMltpXTtkYXRhLnNldChwYWdlLG9mZnNldCk7aWYoaT09PWZyYW1lLmRhdGEubGVuZ3RoLTEpe29mZnNldCs9ZnJhbWUuY3Vyc29yfWVsc2V7b2Zmc2V0Kz1mcmFtZS5wYWdlU2l6ZX19fWltYWdlPW5ldyBCbG9iKFtkYXRhXSx7dHlwZTpcImltYWdlL2dpZlwifSk7cmV0dXJuIHRoaXMuZW1pdChcImZpbmlzaGVkXCIsaW1hZ2UsZGF0YSl9O0dJRi5wcm90b3R5cGUucmVuZGVyTmV4dEZyYW1lPWZ1bmN0aW9uKCl7dmFyIGZyYW1lLHRhc2ssd29ya2VyO2lmKHRoaXMuZnJlZVdvcmtlcnMubGVuZ3RoPT09MCl7dGhyb3cgbmV3IEVycm9yKFwiTm8gZnJlZSB3b3JrZXJzXCIpfWlmKHRoaXMubmV4dEZyYW1lPj10aGlzLmZyYW1lcy5sZW5ndGgpe3JldHVybn1mcmFtZT10aGlzLmZyYW1lc1t0aGlzLm5leHRGcmFtZSsrXTt3b3JrZXI9dGhpcy5mcmVlV29ya2Vycy5zaGlmdCgpO3Rhc2s9dGhpcy5nZXRUYXNrKGZyYW1lKTt0aGlzLmxvZyhcInN0YXJ0aW5nIGZyYW1lIFwiKyh0YXNrLmluZGV4KzEpK1wiIG9mIFwiK3RoaXMuZnJhbWVzLmxlbmd0aCk7dGhpcy5hY3RpdmVXb3JrZXJzLnB1c2god29ya2VyKTtyZXR1cm4gd29ya2VyLnBvc3RNZXNzYWdlKHRhc2spfTtHSUYucHJvdG90eXBlLmdldENvbnRleHREYXRhPWZ1bmN0aW9uKGN0eCl7cmV0dXJuIGN0eC5nZXRJbWFnZURhdGEoMCwwLHRoaXMub3B0aW9ucy53aWR0aCx0aGlzLm9wdGlvbnMuaGVpZ2h0KS5kYXRhfTtHSUYucHJvdG90eXBlLmdldEltYWdlRGF0YT1mdW5jdGlvbihpbWFnZSl7dmFyIGN0eDtpZih0aGlzLl9jYW52YXM9PW51bGwpe3RoaXMuX2NhbnZhcz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO3RoaXMuX2NhbnZhcy53aWR0aD10aGlzLm9wdGlvbnMud2lkdGg7dGhpcy5fY2FudmFzLmhlaWdodD10aGlzLm9wdGlvbnMuaGVpZ2h0fWN0eD10aGlzLl9jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO2N0eC5zZXRGaWxsPXRoaXMub3B0aW9ucy5iYWNrZ3JvdW5kO2N0eC5maWxsUmVjdCgwLDAsdGhpcy5vcHRpb25zLndpZHRoLHRoaXMub3B0aW9ucy5oZWlnaHQpO2N0eC5kcmF3SW1hZ2UoaW1hZ2UsMCwwKTtyZXR1cm4gdGhpcy5nZXRDb250ZXh0RGF0YShjdHgpfTtHSUYucHJvdG90eXBlLmdldFRhc2s9ZnVuY3Rpb24oZnJhbWUpe3ZhciBpbmRleCx0YXNrO2luZGV4PXRoaXMuZnJhbWVzLmluZGV4T2YoZnJhbWUpO3Rhc2s9e2luZGV4OmluZGV4LGxhc3Q6aW5kZXg9PT10aGlzLmZyYW1lcy5sZW5ndGgtMSxkZWxheTpmcmFtZS5kZWxheSx0cmFuc3BhcmVudDpmcmFtZS50cmFuc3BhcmVudCx3aWR0aDp0aGlzLm9wdGlvbnMud2lkdGgsaGVpZ2h0OnRoaXMub3B0aW9ucy5oZWlnaHQscXVhbGl0eTp0aGlzLm9wdGlvbnMucXVhbGl0eSxkaXRoZXI6dGhpcy5vcHRpb25zLmRpdGhlcixnbG9iYWxQYWxldHRlOnRoaXMub3B0aW9ucy5nbG9iYWxQYWxldHRlLHJlcGVhdDp0aGlzLm9wdGlvbnMucmVwZWF0LGNhblRyYW5zZmVyOmJyb3dzZXIubmFtZT09PVwiY2hyb21lXCJ9O2lmKGZyYW1lLmRhdGEhPW51bGwpe3Rhc2suZGF0YT1mcmFtZS5kYXRhfWVsc2UgaWYoZnJhbWUuY29udGV4dCE9bnVsbCl7dGFzay5kYXRhPXRoaXMuZ2V0Q29udGV4dERhdGEoZnJhbWUuY29udGV4dCl9ZWxzZSBpZihmcmFtZS5pbWFnZSE9bnVsbCl7dGFzay5kYXRhPXRoaXMuZ2V0SW1hZ2VEYXRhKGZyYW1lLmltYWdlKX1lbHNle3Rocm93IG5ldyBFcnJvcihcIkludmFsaWQgZnJhbWVcIil9cmV0dXJuIHRhc2t9O0dJRi5wcm90b3R5cGUubG9nPWZ1bmN0aW9uKCl7dmFyIGFyZ3M7YXJncz0xPD1hcmd1bWVudHMubGVuZ3RoP3NsaWNlLmNhbGwoYXJndW1lbnRzLDApOltdO2lmKCF0aGlzLm9wdGlvbnMuZGVidWcpe3JldHVybn1yZXR1cm4gY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSxhcmdzKX07cmV0dXJuIEdJRn0oRXZlbnRFbWl0dGVyKTttb2R1bGUuZXhwb3J0cz1HSUZ9LHtcIi4vYnJvd3Nlci5jb2ZmZWVcIjoyLGV2ZW50czoxfV19LHt9LFszXSkoMyl9KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWdpZi5qcy5tYXBcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgV29ya2VyKF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJjMmZlNGE2YTY3NWU3YjUwOGE3Yy53b3JrZXIuanNcIik7XG59OyIsImltcG9ydCB7IFF1YWRXb3JrZXJEYXRhTWVzc2FnZSB9IGZyb20gJy4vc2NoZW1hJztcbmltcG9ydCB7IGxvYWRJbWFnZSwgZ2V0SW1hZ2VEYXRhT2ZmU2NyZWVuLCB0b0dpZiB9IGZyb20gJy4vdXRpbCc7XG5pbXBvcnQgUXVhZFdvcmtlciBmcm9tICd3b3JrZXItbG9hZGVyIS4vcXVhZC53b3JrZXInO1xuXG5sZXQgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcbmxldCBjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG5sZXQgaW1hZ2VJbnB1dDogSFRNTElucHV0RWxlbWVudDtcbmxldCBleHBvcnRHaWZCdXR0b246IEhUTUxCdXR0b25FbGVtZW50O1xubGV0IHF1YWRXb3JrZXI6IFF1YWRXb3JrZXI7XG5jb25zdCBwcm9jZXNzZWRGcmFtZXM6IEltYWdlRGF0YVtdID0gW107XG5jb25zdCBwcm9jZXNzaW5nUXVldWU6IEZpbGVbXSA9IFtdO1xubGV0IGlzUHJvY2Vzc2luZzogYm9vbGVhbiA9IGZhbHNlO1xubGV0IG9mZmxpbmVBbmltYXRlSWQ6IG51bWJlcjtcbmxldCBwcm9jZXNzVGltZXN0YW1wOiBudW1iZXI7XG5cbmZ1bmN0aW9uIGRyYXcoaW1hZ2VEYXRhOiBJbWFnZURhdGEpIHtcbiAgICBjb250ZXh0LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgIGNvbnRleHQucHV0SW1hZ2VEYXRhKGltYWdlRGF0YSwgMCwgMCk7XG59XG5cbmZ1bmN0aW9uIG9mZmxpbmVBbmltYXRlKG9mZmxpbmVGcmFtZXM6IEltYWdlRGF0YVtdLCBhbmltYXRlSW5kZXg6IG51bWJlciA9IDAsIGN1cnJGcmFtZUluZGV4OiBudW1iZXIgPSAwLCBudW1GcmFtZXNFYWNoOiBudW1iZXIgPSAyMCk6IHZvaWQge1xuICAgIGxldCBuZXh0RnJhbWVJbmRleDogbnVtYmVyID0gY3VyckZyYW1lSW5kZXggKyAxO1xuICAgIGxldCBuZXh0QW5pbWF0ZUluZGV4OiBudW1iZXIgPSBhbmltYXRlSW5kZXg7XG5cbiAgICBpZiAobmV4dEZyYW1lSW5kZXggPiBudW1GcmFtZXNFYWNoKSB7XG4gICAgICAgIG5leHRBbmltYXRlSW5kZXggPSBhbmltYXRlSW5kZXggKyAxID49IG9mZmxpbmVGcmFtZXMubGVuZ3RoID8gMCA6IGFuaW1hdGVJbmRleCArIDE7XG4gICAgICAgIG5leHRGcmFtZUluZGV4ID0gMDtcbiAgICB9XG5cbiAgICBvZmZsaW5lQW5pbWF0ZUlkID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiBvZmZsaW5lQW5pbWF0ZShvZmZsaW5lRnJhbWVzLCBuZXh0QW5pbWF0ZUluZGV4LCBuZXh0RnJhbWVJbmRleCwgbnVtRnJhbWVzRWFjaCkpO1xuXG4gICAgZHJhdyhvZmZsaW5lRnJhbWVzW25leHRBbmltYXRlSW5kZXhdKTtcbn1cblxuZnVuY3Rpb24gcHJvY2Vzc0ltYWdlKGltYWdlRmlsZTogRmlsZSk6IHZvaWQge1xuICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZShvZmZsaW5lQW5pbWF0ZUlkKTtcblxuICAgIGxvYWRJbWFnZShpbWFnZUZpbGUpXG4gICAgICAgIC50aGVuKGltYWdlRWxlbSA9PiBnZXRJbWFnZURhdGFPZmZTY3JlZW4oaW1hZ2VFbGVtLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpKVxuICAgICAgICAudGhlbigoaW1hZ2VEYXRhOiBJbWFnZURhdGEpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2U6IFF1YWRXb3JrZXJEYXRhTWVzc2FnZSA9IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnbmV3LWltYWdlJyxcbiAgICAgICAgICAgICAgICBkYXRhOiBpbWFnZURhdGFcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBxdWFkV29ya2VyLnBvc3RNZXNzYWdlKG1lc3NhZ2UpO1xuICAgICAgICAgICAgcHJvY2Vzc1RpbWVzdGFtcCA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICAgICAgICB9KTtcbn1cblxuZnVuY3Rpb24gb25JbWFnZUNoYW5nZShldmVudDogRXZlbnQpIHtcbiAgICBjb25zdCBpbWFnZUlucHV0OiBIVE1MSW5wdXRFbGVtZW50ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgaWYgKCFpbWFnZUlucHV0IHx8XG4gICAgICAgICFpbWFnZUlucHV0LmZpbGVzIHx8XG4gICAgICAgICFpbWFnZUlucHV0LmZpbGVzLmxlbmd0aCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCBza2lwRmlyc3Q6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBpZiAoIWlzUHJvY2Vzc2luZykge1xuICAgICAgICBwcm9jZXNzSW1hZ2UoaW1hZ2VJbnB1dC5maWxlc1swXSk7XG5cbiAgICAgICAgaXNQcm9jZXNzaW5nID0gdHJ1ZTtcbiAgICAgICAgc2tpcEZpcnN0ID0gdHJ1ZTtcbiAgICB9XG4gICAgZm9yIChsZXQgZmlsZUluZGV4ID0gc2tpcEZpcnN0ID8gMSA6IDA7IGZpbGVJbmRleCA8IGltYWdlSW5wdXQuZmlsZXMubGVuZ3RoOyBmaWxlSW5kZXgrKykge1xuICAgICAgICBwcm9jZXNzaW5nUXVldWUucHVzaChpbWFnZUlucHV0LmZpbGVzW2ZpbGVJbmRleF0pO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gcmVzaXplQ2FudmFzKCkge1xuICAgIGNvbnN0IGNvbXB1dGVkU3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShjYW52YXMpO1xuICAgIGNvbnN0IHdpZHRoID0gcGFyc2VJbnQoY29tcHV0ZWRTdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKCd3aWR0aCcpLCAxMCk7XG4gICAgY29uc3QgaGVpZ2h0ID0gcGFyc2VJbnQoY29tcHV0ZWRTdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKCdoZWlnaHQnKSwgMTApO1xuICAgIGNhbnZhcy53aWR0aCA9IHdpZHRoO1xuICAgIGNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XG59XG5cbmZ1bmN0aW9uIG9uV29ya2VyTWVzc2FnZShldmVudDogTWVzc2FnZUV2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgbWVzc2FnZTogUXVhZFdvcmtlckRhdGFNZXNzYWdlID0gZXZlbnQuZGF0YTtcbiAgICBzd2l0Y2ggKG1lc3NhZ2UudHlwZSkge1xuICAgICAgICBjYXNlICdkcmF3JzpcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLmRhdGEpIHtcbiAgICAgICAgICAgICAgICBwcm9jZXNzZWRGcmFtZXMucHVzaChtZXNzYWdlLmRhdGEpO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGltZXN0YW1wID0+IGRyYXcobWVzc2FnZS5kYXRhKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdwcm9jZXNzZWQnOlxuICAgICAgICAgICAgaWYgKHByb2Nlc3NpbmdRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAvLyBwcm9jZXNzIHRoZSBuZXh0IGltYWdlIGluIHRoZSBxdWV1ZVxuICAgICAgICAgICAgICAgIGNvbnN0IG5leHRJbWFnZUZpbGU6IEZpbGUgPSBwcm9jZXNzaW5nUXVldWUuc2hpZnQoKSBhcyBGaWxlO1xuICAgICAgICAgICAgICAgIHByb2Nlc3NJbWFnZShuZXh0SW1hZ2VGaWxlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb2ZmbGluZUFuaW1hdGVJZCA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gb2ZmbGluZUFuaW1hdGUocHJvY2Vzc2VkRnJhbWVzKSk7XG4gICAgICAgICAgICAgICAgaXNQcm9jZXNzaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBUaW1lIHRvIHByb2Nlc3M6ICR7cGVyZm9ybWFuY2Uubm93KCkgLSBwcm9jZXNzVGltZXN0YW1wfWApO1xuICAgICAgICAgICAgZXhwb3J0R2lmQnV0dG9uLmRpc2FibGVkID0gaXNQcm9jZXNzaW5nO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBVbmtub3duIG1lc3NhZ2UgdHlwZTogJHttZXNzYWdlfWApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gbWFpbigpIHtcbiAgICBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJykgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG4gICAgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpIGFzIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcbiAgICBpbWFnZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ltYWdlLWlucHV0JykgYXMgSFRNTElucHV0RWxlbWVudDtcblxuICAgIGltYWdlSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgb25JbWFnZUNoYW5nZSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHJlc2l6ZUNhbnZhcyk7XG5cbiAgICAvLyBXZWIgd29ya2VyIGxvZ2ljXG4gICAgcXVhZFdvcmtlciA9IG5ldyBRdWFkV29ya2VyKCk7XG4gICAgcXVhZFdvcmtlci5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgb25Xb3JrZXJNZXNzYWdlKTtcblxuICAgIC8vIGV4cG9ydCBsb2dpY1xuICAgIGV4cG9ydEdpZkJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdleHBvcnQtZ2lmJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gICAgZXhwb3J0R2lmQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICB0b0dpZihwcm9jZXNzZWRGcmFtZXMpO1xuICAgIH0pO1xuXG4gICAgLy8gc2l6ZSBjYW52YXNcbiAgICByZXNpemVDYW52YXMoKTtcbn1cblxubWFpbigpOyIsImltcG9ydCB7IFBpeGVsLCBDb2xvciB9IGZyb20gJy4vc2NoZW1hJztcbmltcG9ydCBHSUYgZnJvbSAnZ2lmLmpzJztcblxuZXhwb3J0IGNvbnN0IFBJWEVMX1dJRFRIOiBudW1iZXIgPSA0O1xuZXhwb3J0IGNvbnN0IFdISVRFX0NPTE9SOiBDb2xvciA9IHtcbiAgICByOiAyNTUsXG4gICAgZzogMjU1LFxuICAgIGI6IDI1NSxcbiAgICBhOiAyNTUsXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gbG9hZEltYWdlKGltYWdlRmlsZTogRmlsZSk6IFByb21pc2U8SFRNTEltYWdlRWxlbWVudD4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGNvbnN0IGltYWdlRmlsZURhdGFVcmwgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChpbWFnZUZpbGUpO1xuICAgICAgICBjb25zdCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xuXG4gICAgICAgIGltYWdlLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICAgIHdpbmRvdy5VUkwucmV2b2tlT2JqZWN0VVJMKGltYWdlRmlsZURhdGFVcmwpO1xuICAgICAgICAgICAgcmVzb2x2ZShpbWFnZSlcbiAgICAgICAgfTtcbiAgICAgICAgaW1hZ2Uub25lcnJvciA9IChlcnIpID0+IHtcbiAgICAgICAgICAgIHdpbmRvdy5VUkwucmV2b2tlT2JqZWN0VVJMKGltYWdlRmlsZURhdGFVcmwpO1xuICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIH07XG4gICAgICAgIGltYWdlLnNyYyA9IGltYWdlRmlsZURhdGFVcmw7XG4gICAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBdmVyYWdlQ29sb3IocGl4ZWxzOiBQaXhlbFtdKTogQ29sb3Ige1xuICAgIGxldCBzcXVhcmVkU3VtUjogbnVtYmVyO1xuICAgIGxldCBzcXVhcmVkU3VtRzogbnVtYmVyO1xuICAgIGxldCBzcXVhcmVkU3VtQjogbnVtYmVyO1xuICAgIGxldCBzcXVhcmVkU3VtQTogbnVtYmVyO1xuICAgIGxldCBhdmVyYWdlQ29sb3I6IENvbG9yID0gcGl4ZWxzWzBdIHx8IFdISVRFX0NPTE9SO1xuXG4gICAgaWYgKHBpeGVscy5sZW5ndGggPiAxKSB7XG4gICAgICAgIHJldHVybiBwaXhlbHMuc2xpY2UoMSlcbiAgICAgICAgICAgIC5yZWR1Y2UoKHByZXZBdmVyYWdlOiBDb2xvciwgY3VyclBpeGVsOiBQaXhlbCkgPT4ge1xuICAgICAgICAgICAgICAgIHNxdWFyZWRTdW1SID0gTWF0aC5wb3cocHJldkF2ZXJhZ2UuciwgMikgKyBNYXRoLnBvdyhjdXJyUGl4ZWwuciwgMik7XG4gICAgICAgICAgICAgICAgc3F1YXJlZFN1bUcgPSBNYXRoLnBvdyhwcmV2QXZlcmFnZS5nLCAyKSArIE1hdGgucG93KGN1cnJQaXhlbC5nLCAyKTtcbiAgICAgICAgICAgICAgICBzcXVhcmVkU3VtQiA9IE1hdGgucG93KHByZXZBdmVyYWdlLmIsIDIpICsgTWF0aC5wb3coY3VyclBpeGVsLmIsIDIpO1xuICAgICAgICAgICAgICAgIHNxdWFyZWRTdW1BID0gTWF0aC5wb3cocHJldkF2ZXJhZ2UuYSwgMikgKyBNYXRoLnBvdyhjdXJyUGl4ZWwuYSwgMik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgcjogTWF0aC5zcXJ0KHNxdWFyZWRTdW1SIC8gMiksXG4gICAgICAgICAgICAgICAgICAgIGc6IE1hdGguc3FydChzcXVhcmVkU3VtRyAvIDIpLFxuICAgICAgICAgICAgICAgICAgICBiOiBNYXRoLnNxcnQoc3F1YXJlZFN1bUIgLyAyKSxcbiAgICAgICAgICAgICAgICAgICAgYTogTWF0aC5zcXJ0KHNxdWFyZWRTdW1BIC8gMiksXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0sIGF2ZXJhZ2VDb2xvcik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGF2ZXJhZ2VDb2xvcjtcbn1cblxuZnVuY3Rpb24gY3JlYXRlUGl4ZWwoeDogbnVtYmVyLCB5OiBudW1iZXIsIHI6IG51bWJlciwgZzogbnVtYmVyLCBiOiBudW1iZXIsIGE6IG51bWJlcik6IFBpeGVsIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB4LFxuICAgICAgICB5LFxuICAgICAgICByLFxuICAgICAgICBnLFxuICAgICAgICBiLFxuICAgICAgICBhLFxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVBpeGVscyhpbWFnZURhdGE6IEltYWdlRGF0YSk6IFBpeGVsW10ge1xuICAgIGxldCBwaXhlbHM6IFBpeGVsW10gPSBbXTtcbiAgICBwcm9jZXNzSW1hZ2VEYXRhKGltYWdlRGF0YSwgcGl4ZWwgPT4gcGl4ZWxzLnB1c2gocGl4ZWwpKTtcbiAgICByZXR1cm4gcGl4ZWxzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmlsbFBpeGVsSW5JbWFnZURhdGEoaW1hZ2VEYXRhOiBJbWFnZURhdGEsIHBpeGVsOiBQaXhlbCk6IHZvaWQge1xuICAgIGNvbnN0IHBpeGVsT2Zmc2V0OiBudW1iZXIgPSAocGl4ZWwueCArIHBpeGVsLnkgKiBpbWFnZURhdGEud2lkdGgpICogUElYRUxfV0lEVEg7XG4gICAgaWYgKHBpeGVsT2Zmc2V0IDwgMCB8fCBwaXhlbE9mZnNldCArIFBJWEVMX1dJRFRIID49IGltYWdlRGF0YS5kYXRhLmxlbmd0aCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGltYWdlRGF0YS5kYXRhW3BpeGVsT2Zmc2V0XSA9IHBpeGVsLnI7XG4gICAgaW1hZ2VEYXRhLmRhdGFbcGl4ZWxPZmZzZXQgKyAxXSA9IHBpeGVsLmc7XG4gICAgaW1hZ2VEYXRhLmRhdGFbcGl4ZWxPZmZzZXQgKyAyXSA9IHBpeGVsLmI7XG4gICAgaW1hZ2VEYXRhLmRhdGFbcGl4ZWxPZmZzZXQgKyAzXSA9IHBpeGVsLmE7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRJbWFnZURhdGFPZmZTY3JlZW4oaW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKTogSW1hZ2VEYXRhIHtcbiAgICBjb25zdCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgY29uc3QgY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEID0gY2FudmFzLmdldENvbnRleHQoJzJkJykgYXMgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuXG4gICAgY2FudmFzLndpZHRoID0gd2lkdGg7XG4gICAgY2FudmFzLmhlaWdodCA9IGhlaWdodDtcblxuICAgIGNvbnRleHQuZHJhd0ltYWdlKGltYWdlLCAwLCAwLCBpbWFnZS53aWR0aCwgaW1hZ2UuaGVpZ2h0LCAwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuXG4gICAgY29uc3QgaW1hZ2VEYXRhOiBJbWFnZURhdGEgPSBjb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgIHJldHVybiBpbWFnZURhdGE7XG59XG5cbmZ1bmN0aW9uIHByb2Nlc3NJbWFnZURhdGEoaW1hZ2VEYXRhOiBJbWFnZURhdGEsIHByb2Nlc3NGdW5jOiAocGl4ZWw6IFBpeGVsKSA9PiB2b2lkLCBpbml0UGl4ZWxYOiBudW1iZXIgPSAwLCBpbml0UGl4ZWxZOiBudW1iZXIgPSAwKTogdm9pZCB7XG4gICAgbGV0IHI6IG51bWJlcjtcbiAgICBsZXQgZzogbnVtYmVyO1xuICAgIGxldCBiOiBudW1iZXI7XG4gICAgbGV0IGE6IG51bWJlcjtcbiAgICBsZXQgb2Zmc2V0WDogbnVtYmVyO1xuICAgIGxldCBvZmZzZXRZOiBudW1iZXI7XG4gICAgbGV0IHBpeGVsOiBQaXhlbDtcblxuICAgIGZvciAobGV0IHggPSBpbml0UGl4ZWxYOyB4IDwgaW1hZ2VEYXRhLndpZHRoOyB4KyspIHtcbiAgICAgICAgb2Zmc2V0WCA9IHggKiBQSVhFTF9XSURUSDtcblxuICAgICAgICBmb3IgKGxldCB5ID0gaW5pdFBpeGVsWTsgeSA8IGltYWdlRGF0YS5oZWlnaHQ7IHkrKykge1xuICAgICAgICAgICAgb2Zmc2V0WSA9IGltYWdlRGF0YS53aWR0aCAqIHkgKiBQSVhFTF9XSURUSDtcblxuICAgICAgICAgICAgciA9IGltYWdlRGF0YS5kYXRhW29mZnNldFggKyBvZmZzZXRZXTtcbiAgICAgICAgICAgIGcgPSBpbWFnZURhdGEuZGF0YVtvZmZzZXRYICsgb2Zmc2V0WSArIDFdO1xuICAgICAgICAgICAgYiA9IGltYWdlRGF0YS5kYXRhW29mZnNldFggKyBvZmZzZXRZICsgMl07XG4gICAgICAgICAgICBhID0gaW1hZ2VEYXRhLmRhdGFbb2Zmc2V0WCArIG9mZnNldFkgKyAzXTtcblxuICAgICAgICAgICAgcGl4ZWwgPSBjcmVhdGVQaXhlbCh4LCB5LCByLCBnLCBiLCBhKTtcbiAgICAgICAgICAgIHByb2Nlc3NGdW5jKHBpeGVsKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvR2lmKGltYWdlRnJhbWVzOiBJbWFnZURhdGFbXSk6IHZvaWQge1xuICAgIGNvbnN0IGdpZiA9IG5ldyBHSUYoe1xuICAgICAgICB3b3JrZXJzOiAyLFxuICAgICAgICBxdWFsaXR5OiAxMFxuICAgIH0pO1xuXG4gICAgaW1hZ2VGcmFtZXNcbiAgICAgICAgLmZvckVhY2goaW1hZ2VGcmFtZSA9PiBnaWYuYWRkRnJhbWUoaW1hZ2VGcmFtZSwge1xuICAgICAgICAgICAgZGVsYXk6IDIwMCxcbiAgICAgICAgfSkpO1xuXG4gICAgZ2lmLm9uKCdmaW5pc2hlZCcsIChibG9iOiBhbnkpID0+IHtcbiAgICAgICAgc2F2ZUJsb2IoJ3NpbXBsZXF1YWQuZXhwb3J0LmdpZicsIGJsb2IpO1xuICAgIH0pO1xuXG4gICAgZ2lmLnJlbmRlcigpO1xufVxuXG5mdW5jdGlvbiBzYXZlQmxvYihmaWxlTmFtZTogc3RyaW5nLCBibG9iOiBCbG9iKSB7XG4gICAgY29uc3QgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBjb25zdCB1cmwgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcblxuICAgIGEuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBhLmhyZWYgPSB1cmw7XG4gICAgYS5kb3dubG9hZCA9IGZpbGVOYW1lO1xuICAgIFxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYSk7XG4gICAgYS5jbGljaygpO1xuXG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChhKTtcbiAgICB3aW5kb3cuVVJMLnJldm9rZU9iamVjdFVSTCh1cmwpO1xufSJdLCJzb3VyY2VSb290IjoiIn0=