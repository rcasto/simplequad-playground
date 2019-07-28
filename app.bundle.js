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
  return new Worker(__webpack_require__.p + "0a837e32cfaeaec7289f.worker.js");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2dpZi5qcy9kaXN0L2dpZi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcXVhZC53b3JrZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FuaW1hdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC50cyJdLCJuYW1lcyI6WyJjYW52YXMiLCJjb250ZXh0IiwiaW1hZ2VJbnB1dCIsImV4cG9ydEdpZkJ1dHRvbiIsInF1YWRXb3JrZXIiLCJwcm9jZXNzZWRGcmFtZXMiLCJwcm9jZXNzaW5nUXVldWUiLCJpc1Byb2Nlc3NpbmciLCJvZmZsaW5lQW5pbWF0ZUlkIiwiZHJhdyIsImltYWdlRGF0YSIsImNsZWFyUmVjdCIsIndpZHRoIiwiaGVpZ2h0IiwicHV0SW1hZ2VEYXRhIiwib2ZmbGluZUFuaW1hdGUiLCJvZmZsaW5lRnJhbWVzIiwiYW5pbWF0ZUluZGV4IiwiY3VyckZyYW1lSW5kZXgiLCJudW1GcmFtZXNFYWNoIiwibmV4dEZyYW1lSW5kZXgiLCJuZXh0QW5pbWF0ZUluZGV4IiwibGVuZ3RoIiwid2luZG93IiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwicHJvY2Vzc0ltYWdlIiwiaW1hZ2VGaWxlIiwiY2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJsb2FkSW1hZ2UiLCJ0aGVuIiwiaW1hZ2VFbGVtIiwiZ2V0SW1hZ2VEYXRhT2ZmU2NyZWVuIiwibWVzc2FnZSIsInR5cGUiLCJkYXRhIiwicG9zdE1lc3NhZ2UiLCJvbkltYWdlQ2hhbmdlIiwiZXZlbnQiLCJ0YXJnZXQiLCJmaWxlcyIsInNraXBGaXJzdCIsImZpbGVJbmRleCIsInB1c2giLCJyZXNpemVDYW52YXMiLCJjb21wdXRlZFN0eWxlIiwiZ2V0Q29tcHV0ZWRTdHlsZSIsInBhcnNlSW50IiwiZ2V0UHJvcGVydHlWYWx1ZSIsIm9uV29ya2VyTWVzc2FnZSIsInRpbWVzdGFtcCIsIm5leHRJbWFnZUZpbGUiLCJzaGlmdCIsImRpc2FibGVkIiwiY29uc29sZSIsImVycm9yIiwibWFpbiIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJnZXRDb250ZXh0IiwiYWRkRXZlbnRMaXN0ZW5lciIsIlF1YWRXb3JrZXIiLCJ0b0dpZiIsIlBJWEVMX1dJRFRIIiwiV0hJVEVfQ09MT1IiLCJyIiwiZyIsImIiLCJhIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJpbWFnZUZpbGVEYXRhVXJsIiwiVVJMIiwiY3JlYXRlT2JqZWN0VVJMIiwiaW1hZ2UiLCJJbWFnZSIsIm9ubG9hZCIsInJldm9rZU9iamVjdFVSTCIsIm9uZXJyb3IiLCJlcnIiLCJzcmMiLCJnZXRBdmVyYWdlQ29sb3IiLCJwaXhlbHMiLCJzcXVhcmVkU3VtUiIsInNxdWFyZWRTdW1HIiwic3F1YXJlZFN1bUIiLCJzcXVhcmVkU3VtQSIsImF2ZXJhZ2VDb2xvciIsInNsaWNlIiwicmVkdWNlIiwicHJldkF2ZXJhZ2UiLCJjdXJyUGl4ZWwiLCJNYXRoIiwicG93Iiwic3FydCIsImNyZWF0ZVBpeGVsIiwieCIsInkiLCJnZXRCb3VuZHMiLCJjcmVhdGVQaXhlbHMiLCJwcm9jZXNzSW1hZ2VEYXRhIiwicGl4ZWwiLCJmaWxsUGl4ZWxJbkltYWdlRGF0YSIsInBpeGVsT2Zmc2V0IiwiY3JlYXRlRWxlbWVudCIsImRyYXdJbWFnZSIsImdldEltYWdlRGF0YSIsInByb2Nlc3NGdW5jIiwiaW5pdFBpeGVsWCIsImluaXRQaXhlbFkiLCJvZmZzZXRYIiwib2Zmc2V0WSIsImltYWdlRnJhbWVzIiwiZ2lmIiwiR0lGIiwid29ya2VycyIsInF1YWxpdHkiLCJmb3JFYWNoIiwiaW1hZ2VGcmFtZSIsImFkZEZyYW1lIiwiZGVsYXkiLCJvbiIsImJsb2IiLCJzYXZlQmxvYiIsInJlbmRlciIsImZpbGVOYW1lIiwidXJsIiwic3R5bGUiLCJkaXNwbGF5IiwiaHJlZiIsImRvd25sb2FkIiwiYm9keSIsImFwcGVuZENoaWxkIiwiY2xpY2siLCJyZW1vdmVDaGlsZCJd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QUFDOUJDLFlBQVEsQ0FBQyx1QkFBRCxFQUEwQkQsSUFBMUIsQ0FBUjtBQUNILEdBRkQ7QUFJQVQsS0FBRyxDQUFDVyxNQUFKO0FBQ0g7O0FBRUQsU0FBU0QsUUFBVCxDQUFrQkUsUUFBbEIsRUFBb0NILElBQXBDLEVBQWdEO0FBQzVDLE1BQU12RCxDQUFDLEdBQUdYLFFBQVEsQ0FBQ2dELGFBQVQsQ0FBdUIsR0FBdkIsQ0FBVjtBQUNBLE1BQU1zQixHQUFHLEdBQUd2RyxNQUFNLENBQUNpRCxHQUFQLENBQVdDLGVBQVgsQ0FBMkJpRCxJQUEzQixDQUFaO0FBRUF2RCxHQUFDLENBQUM0RCxLQUFGLENBQVFDLE9BQVIsR0FBa0IsTUFBbEI7QUFDQTdELEdBQUMsQ0FBQzhELElBQUYsR0FBU0gsR0FBVDtBQUNBM0QsR0FBQyxDQUFDK0QsUUFBRixHQUFhTCxRQUFiO0FBRUFyRSxVQUFRLENBQUMyRSxJQUFULENBQWNDLFdBQWQsQ0FBMEJqRSxDQUExQjtBQUNBQSxHQUFDLENBQUNrRSxLQUFGO0FBRUE3RSxVQUFRLENBQUMyRSxJQUFULENBQWNHLFdBQWQsQ0FBMEJuRSxDQUExQjtBQUNBNUMsUUFBTSxDQUFDaUQsR0FBUCxDQUFXSyxlQUFYLENBQTJCaUQsR0FBM0I7QUFDSCxDIiwiZmlsZSI6ImFwcC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9hbmltYXRpb24udHNcIik7XG4iLCIvLyBnaWYuanMgMC4yLjAgLSBodHRwczovL2dpdGh1Yi5jb20vam5vcmRiZXJnL2dpZi5qc1xuKGZ1bmN0aW9uKGYpe2lmKHR5cGVvZiBleHBvcnRzPT09XCJvYmplY3RcIiYmdHlwZW9mIG1vZHVsZSE9PVwidW5kZWZpbmVkXCIpe21vZHVsZS5leHBvcnRzPWYoKX1lbHNlIGlmKHR5cGVvZiBkZWZpbmU9PT1cImZ1bmN0aW9uXCImJmRlZmluZS5hbWQpe2RlZmluZShbXSxmKX1lbHNle3ZhciBnO2lmKHR5cGVvZiB3aW5kb3chPT1cInVuZGVmaW5lZFwiKXtnPXdpbmRvd31lbHNlIGlmKHR5cGVvZiBnbG9iYWwhPT1cInVuZGVmaW5lZFwiKXtnPWdsb2JhbH1lbHNlIGlmKHR5cGVvZiBzZWxmIT09XCJ1bmRlZmluZWRcIil7Zz1zZWxmfWVsc2V7Zz10aGlzfWcuR0lGPWYoKX19KShmdW5jdGlvbigpe3ZhciBkZWZpbmUsbW9kdWxlLGV4cG9ydHM7cmV0dXJuIGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSh7MTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7ZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCl7dGhpcy5fZXZlbnRzPXRoaXMuX2V2ZW50c3x8e307dGhpcy5fbWF4TGlzdGVuZXJzPXRoaXMuX21heExpc3RlbmVyc3x8dW5kZWZpbmVkfW1vZHVsZS5leHBvcnRzPUV2ZW50RW1pdHRlcjtFdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyPUV2ZW50RW1pdHRlcjtFdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHM9dW5kZWZpbmVkO0V2ZW50RW1pdHRlci5wcm90b3R5cGUuX21heExpc3RlbmVycz11bmRlZmluZWQ7RXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnM9MTA7RXZlbnRFbWl0dGVyLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnM9ZnVuY3Rpb24obil7aWYoIWlzTnVtYmVyKG4pfHxuPDB8fGlzTmFOKG4pKXRocm93IFR5cGVFcnJvcihcIm4gbXVzdCBiZSBhIHBvc2l0aXZlIG51bWJlclwiKTt0aGlzLl9tYXhMaXN0ZW5lcnM9bjtyZXR1cm4gdGhpc307RXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0PWZ1bmN0aW9uKHR5cGUpe3ZhciBlcixoYW5kbGVyLGxlbixhcmdzLGksbGlzdGVuZXJzO2lmKCF0aGlzLl9ldmVudHMpdGhpcy5fZXZlbnRzPXt9O2lmKHR5cGU9PT1cImVycm9yXCIpe2lmKCF0aGlzLl9ldmVudHMuZXJyb3J8fGlzT2JqZWN0KHRoaXMuX2V2ZW50cy5lcnJvcikmJiF0aGlzLl9ldmVudHMuZXJyb3IubGVuZ3RoKXtlcj1hcmd1bWVudHNbMV07aWYoZXIgaW5zdGFuY2VvZiBFcnJvcil7dGhyb3cgZXJ9ZWxzZXt2YXIgZXJyPW5ldyBFcnJvcignVW5jYXVnaHQsIHVuc3BlY2lmaWVkIFwiZXJyb3JcIiBldmVudC4gKCcrZXIrXCIpXCIpO2Vyci5jb250ZXh0PWVyO3Rocm93IGVycn19fWhhbmRsZXI9dGhpcy5fZXZlbnRzW3R5cGVdO2lmKGlzVW5kZWZpbmVkKGhhbmRsZXIpKXJldHVybiBmYWxzZTtpZihpc0Z1bmN0aW9uKGhhbmRsZXIpKXtzd2l0Y2goYXJndW1lbnRzLmxlbmd0aCl7Y2FzZSAxOmhhbmRsZXIuY2FsbCh0aGlzKTticmVhaztjYXNlIDI6aGFuZGxlci5jYWxsKHRoaXMsYXJndW1lbnRzWzFdKTticmVhaztjYXNlIDM6aGFuZGxlci5jYWxsKHRoaXMsYXJndW1lbnRzWzFdLGFyZ3VtZW50c1syXSk7YnJlYWs7ZGVmYXVsdDphcmdzPUFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywxKTtoYW5kbGVyLmFwcGx5KHRoaXMsYXJncyl9fWVsc2UgaWYoaXNPYmplY3QoaGFuZGxlcikpe2FyZ3M9QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLDEpO2xpc3RlbmVycz1oYW5kbGVyLnNsaWNlKCk7bGVuPWxpc3RlbmVycy5sZW5ndGg7Zm9yKGk9MDtpPGxlbjtpKyspbGlzdGVuZXJzW2ldLmFwcGx5KHRoaXMsYXJncyl9cmV0dXJuIHRydWV9O0V2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXI9ZnVuY3Rpb24odHlwZSxsaXN0ZW5lcil7dmFyIG07aWYoIWlzRnVuY3Rpb24obGlzdGVuZXIpKXRocm93IFR5cGVFcnJvcihcImxpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvblwiKTtpZighdGhpcy5fZXZlbnRzKXRoaXMuX2V2ZW50cz17fTtpZih0aGlzLl9ldmVudHMubmV3TGlzdGVuZXIpdGhpcy5lbWl0KFwibmV3TGlzdGVuZXJcIix0eXBlLGlzRnVuY3Rpb24obGlzdGVuZXIubGlzdGVuZXIpP2xpc3RlbmVyLmxpc3RlbmVyOmxpc3RlbmVyKTtpZighdGhpcy5fZXZlbnRzW3R5cGVdKXRoaXMuX2V2ZW50c1t0eXBlXT1saXN0ZW5lcjtlbHNlIGlmKGlzT2JqZWN0KHRoaXMuX2V2ZW50c1t0eXBlXSkpdGhpcy5fZXZlbnRzW3R5cGVdLnB1c2gobGlzdGVuZXIpO2Vsc2UgdGhpcy5fZXZlbnRzW3R5cGVdPVt0aGlzLl9ldmVudHNbdHlwZV0sbGlzdGVuZXJdO2lmKGlzT2JqZWN0KHRoaXMuX2V2ZW50c1t0eXBlXSkmJiF0aGlzLl9ldmVudHNbdHlwZV0ud2FybmVkKXtpZighaXNVbmRlZmluZWQodGhpcy5fbWF4TGlzdGVuZXJzKSl7bT10aGlzLl9tYXhMaXN0ZW5lcnN9ZWxzZXttPUV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzfWlmKG0mJm0+MCYmdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aD5tKXt0aGlzLl9ldmVudHNbdHlwZV0ud2FybmVkPXRydWU7Y29uc29sZS5lcnJvcihcIihub2RlKSB3YXJuaW5nOiBwb3NzaWJsZSBFdmVudEVtaXR0ZXIgbWVtb3J5IFwiK1wibGVhayBkZXRlY3RlZC4gJWQgbGlzdGVuZXJzIGFkZGVkLiBcIitcIlVzZSBlbWl0dGVyLnNldE1heExpc3RlbmVycygpIHRvIGluY3JlYXNlIGxpbWl0LlwiLHRoaXMuX2V2ZW50c1t0eXBlXS5sZW5ndGgpO2lmKHR5cGVvZiBjb25zb2xlLnRyYWNlPT09XCJmdW5jdGlvblwiKXtjb25zb2xlLnRyYWNlKCl9fX1yZXR1cm4gdGhpc307RXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbj1FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyO0V2ZW50RW1pdHRlci5wcm90b3R5cGUub25jZT1mdW5jdGlvbih0eXBlLGxpc3RlbmVyKXtpZighaXNGdW5jdGlvbihsaXN0ZW5lcikpdGhyb3cgVHlwZUVycm9yKFwibGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uXCIpO3ZhciBmaXJlZD1mYWxzZTtmdW5jdGlvbiBnKCl7dGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLGcpO2lmKCFmaXJlZCl7ZmlyZWQ9dHJ1ZTtsaXN0ZW5lci5hcHBseSh0aGlzLGFyZ3VtZW50cyl9fWcubGlzdGVuZXI9bGlzdGVuZXI7dGhpcy5vbih0eXBlLGcpO3JldHVybiB0aGlzfTtFdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyPWZ1bmN0aW9uKHR5cGUsbGlzdGVuZXIpe3ZhciBsaXN0LHBvc2l0aW9uLGxlbmd0aCxpO2lmKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSl0aHJvdyBUeXBlRXJyb3IoXCJsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb25cIik7aWYoIXRoaXMuX2V2ZW50c3x8IXRoaXMuX2V2ZW50c1t0eXBlXSlyZXR1cm4gdGhpcztsaXN0PXRoaXMuX2V2ZW50c1t0eXBlXTtsZW5ndGg9bGlzdC5sZW5ndGg7cG9zaXRpb249LTE7aWYobGlzdD09PWxpc3RlbmVyfHxpc0Z1bmN0aW9uKGxpc3QubGlzdGVuZXIpJiZsaXN0Lmxpc3RlbmVyPT09bGlzdGVuZXIpe2RlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07aWYodGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKXRoaXMuZW1pdChcInJlbW92ZUxpc3RlbmVyXCIsdHlwZSxsaXN0ZW5lcil9ZWxzZSBpZihpc09iamVjdChsaXN0KSl7Zm9yKGk9bGVuZ3RoO2ktLSA+MDspe2lmKGxpc3RbaV09PT1saXN0ZW5lcnx8bGlzdFtpXS5saXN0ZW5lciYmbGlzdFtpXS5saXN0ZW5lcj09PWxpc3RlbmVyKXtwb3NpdGlvbj1pO2JyZWFrfX1pZihwb3NpdGlvbjwwKXJldHVybiB0aGlzO2lmKGxpc3QubGVuZ3RoPT09MSl7bGlzdC5sZW5ndGg9MDtkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdfWVsc2V7bGlzdC5zcGxpY2UocG9zaXRpb24sMSl9aWYodGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKXRoaXMuZW1pdChcInJlbW92ZUxpc3RlbmVyXCIsdHlwZSxsaXN0ZW5lcil9cmV0dXJuIHRoaXN9O0V2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzPWZ1bmN0aW9uKHR5cGUpe3ZhciBrZXksbGlzdGVuZXJzO2lmKCF0aGlzLl9ldmVudHMpcmV0dXJuIHRoaXM7aWYoIXRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcil7aWYoYXJndW1lbnRzLmxlbmd0aD09PTApdGhpcy5fZXZlbnRzPXt9O2Vsc2UgaWYodGhpcy5fZXZlbnRzW3R5cGVdKWRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07cmV0dXJuIHRoaXN9aWYoYXJndW1lbnRzLmxlbmd0aD09PTApe2ZvcihrZXkgaW4gdGhpcy5fZXZlbnRzKXtpZihrZXk9PT1cInJlbW92ZUxpc3RlbmVyXCIpY29udGludWU7dGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoa2V5KX10aGlzLnJlbW92ZUFsbExpc3RlbmVycyhcInJlbW92ZUxpc3RlbmVyXCIpO3RoaXMuX2V2ZW50cz17fTtyZXR1cm4gdGhpc31saXN0ZW5lcnM9dGhpcy5fZXZlbnRzW3R5cGVdO2lmKGlzRnVuY3Rpb24obGlzdGVuZXJzKSl7dGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLGxpc3RlbmVycyl9ZWxzZSBpZihsaXN0ZW5lcnMpe3doaWxlKGxpc3RlbmVycy5sZW5ndGgpdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLGxpc3RlbmVyc1tsaXN0ZW5lcnMubGVuZ3RoLTFdKX1kZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO3JldHVybiB0aGlzfTtFdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycz1mdW5jdGlvbih0eXBlKXt2YXIgcmV0O2lmKCF0aGlzLl9ldmVudHN8fCF0aGlzLl9ldmVudHNbdHlwZV0pcmV0PVtdO2Vsc2UgaWYoaXNGdW5jdGlvbih0aGlzLl9ldmVudHNbdHlwZV0pKXJldD1bdGhpcy5fZXZlbnRzW3R5cGVdXTtlbHNlIHJldD10aGlzLl9ldmVudHNbdHlwZV0uc2xpY2UoKTtyZXR1cm4gcmV0fTtFdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVyQ291bnQ9ZnVuY3Rpb24odHlwZSl7aWYodGhpcy5fZXZlbnRzKXt2YXIgZXZsaXN0ZW5lcj10aGlzLl9ldmVudHNbdHlwZV07aWYoaXNGdW5jdGlvbihldmxpc3RlbmVyKSlyZXR1cm4gMTtlbHNlIGlmKGV2bGlzdGVuZXIpcmV0dXJuIGV2bGlzdGVuZXIubGVuZ3RofXJldHVybiAwfTtFdmVudEVtaXR0ZXIubGlzdGVuZXJDb3VudD1mdW5jdGlvbihlbWl0dGVyLHR5cGUpe3JldHVybiBlbWl0dGVyLmxpc3RlbmVyQ291bnQodHlwZSl9O2Z1bmN0aW9uIGlzRnVuY3Rpb24oYXJnKXtyZXR1cm4gdHlwZW9mIGFyZz09PVwiZnVuY3Rpb25cIn1mdW5jdGlvbiBpc051bWJlcihhcmcpe3JldHVybiB0eXBlb2YgYXJnPT09XCJudW1iZXJcIn1mdW5jdGlvbiBpc09iamVjdChhcmcpe3JldHVybiB0eXBlb2YgYXJnPT09XCJvYmplY3RcIiYmYXJnIT09bnVsbH1mdW5jdGlvbiBpc1VuZGVmaW5lZChhcmcpe3JldHVybiBhcmc9PT12b2lkIDB9fSx7fV0sMjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7dmFyIFVBLGJyb3dzZXIsbW9kZSxwbGF0Zm9ybSx1YTt1YT1uYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCk7cGxhdGZvcm09bmF2aWdhdG9yLnBsYXRmb3JtLnRvTG93ZXJDYXNlKCk7VUE9dWEubWF0Y2goLyhvcGVyYXxpZXxmaXJlZm94fGNocm9tZXx2ZXJzaW9uKVtcXHNcXC86XShbXFx3XFxkXFwuXSspPy4qPyhzYWZhcml8dmVyc2lvbltcXHNcXC86XShbXFx3XFxkXFwuXSspfCQpLyl8fFtudWxsLFwidW5rbm93blwiLDBdO21vZGU9VUFbMV09PT1cImllXCImJmRvY3VtZW50LmRvY3VtZW50TW9kZTticm93c2VyPXtuYW1lOlVBWzFdPT09XCJ2ZXJzaW9uXCI/VUFbM106VUFbMV0sdmVyc2lvbjptb2RlfHxwYXJzZUZsb2F0KFVBWzFdPT09XCJvcGVyYVwiJiZVQVs0XT9VQVs0XTpVQVsyXSkscGxhdGZvcm06e25hbWU6dWEubWF0Y2goL2lwKD86YWR8b2R8aG9uZSkvKT9cImlvc1wiOih1YS5tYXRjaCgvKD86d2Vib3N8YW5kcm9pZCkvKXx8cGxhdGZvcm0ubWF0Y2goL21hY3x3aW58bGludXgvKXx8W1wib3RoZXJcIl0pWzBdfX07YnJvd3Nlclticm93c2VyLm5hbWVdPXRydWU7YnJvd3Nlclticm93c2VyLm5hbWUrcGFyc2VJbnQoYnJvd3Nlci52ZXJzaW9uLDEwKV09dHJ1ZTticm93c2VyLnBsYXRmb3JtW2Jyb3dzZXIucGxhdGZvcm0ubmFtZV09dHJ1ZTttb2R1bGUuZXhwb3J0cz1icm93c2VyfSx7fV0sMzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7dmFyIEV2ZW50RW1pdHRlcixHSUYsYnJvd3NlcixleHRlbmQ9ZnVuY3Rpb24oY2hpbGQscGFyZW50KXtmb3IodmFyIGtleSBpbiBwYXJlbnQpe2lmKGhhc1Byb3AuY2FsbChwYXJlbnQsa2V5KSljaGlsZFtrZXldPXBhcmVudFtrZXldfWZ1bmN0aW9uIGN0b3IoKXt0aGlzLmNvbnN0cnVjdG9yPWNoaWxkfWN0b3IucHJvdG90eXBlPXBhcmVudC5wcm90b3R5cGU7Y2hpbGQucHJvdG90eXBlPW5ldyBjdG9yO2NoaWxkLl9fc3VwZXJfXz1wYXJlbnQucHJvdG90eXBlO3JldHVybiBjaGlsZH0saGFzUHJvcD17fS5oYXNPd25Qcm9wZXJ0eSxpbmRleE9mPVtdLmluZGV4T2Z8fGZ1bmN0aW9uKGl0ZW0pe2Zvcih2YXIgaT0wLGw9dGhpcy5sZW5ndGg7aTxsO2krKyl7aWYoaSBpbiB0aGlzJiZ0aGlzW2ldPT09aXRlbSlyZXR1cm4gaX1yZXR1cm4tMX0sc2xpY2U9W10uc2xpY2U7RXZlbnRFbWl0dGVyPXJlcXVpcmUoXCJldmVudHNcIikuRXZlbnRFbWl0dGVyO2Jyb3dzZXI9cmVxdWlyZShcIi4vYnJvd3Nlci5jb2ZmZWVcIik7R0lGPWZ1bmN0aW9uKHN1cGVyQ2xhc3Mpe3ZhciBkZWZhdWx0cyxmcmFtZURlZmF1bHRzO2V4dGVuZChHSUYsc3VwZXJDbGFzcyk7ZGVmYXVsdHM9e3dvcmtlclNjcmlwdDpcImdpZi53b3JrZXIuanNcIix3b3JrZXJzOjIscmVwZWF0OjAsYmFja2dyb3VuZDpcIiNmZmZcIixxdWFsaXR5OjEwLHdpZHRoOm51bGwsaGVpZ2h0Om51bGwsdHJhbnNwYXJlbnQ6bnVsbCxkZWJ1ZzpmYWxzZSxkaXRoZXI6ZmFsc2V9O2ZyYW1lRGVmYXVsdHM9e2RlbGF5OjUwMCxjb3B5OmZhbHNlfTtmdW5jdGlvbiBHSUYob3B0aW9ucyl7dmFyIGJhc2Usa2V5LHZhbHVlO3RoaXMucnVubmluZz1mYWxzZTt0aGlzLm9wdGlvbnM9e307dGhpcy5mcmFtZXM9W107dGhpcy5mcmVlV29ya2Vycz1bXTt0aGlzLmFjdGl2ZVdvcmtlcnM9W107dGhpcy5zZXRPcHRpb25zKG9wdGlvbnMpO2ZvcihrZXkgaW4gZGVmYXVsdHMpe3ZhbHVlPWRlZmF1bHRzW2tleV07aWYoKGJhc2U9dGhpcy5vcHRpb25zKVtrZXldPT1udWxsKXtiYXNlW2tleV09dmFsdWV9fX1HSUYucHJvdG90eXBlLnNldE9wdGlvbj1mdW5jdGlvbihrZXksdmFsdWUpe3RoaXMub3B0aW9uc1trZXldPXZhbHVlO2lmKHRoaXMuX2NhbnZhcyE9bnVsbCYmKGtleT09PVwid2lkdGhcInx8a2V5PT09XCJoZWlnaHRcIikpe3JldHVybiB0aGlzLl9jYW52YXNba2V5XT12YWx1ZX19O0dJRi5wcm90b3R5cGUuc2V0T3B0aW9ucz1mdW5jdGlvbihvcHRpb25zKXt2YXIga2V5LHJlc3VsdHMsdmFsdWU7cmVzdWx0cz1bXTtmb3Ioa2V5IGluIG9wdGlvbnMpe2lmKCFoYXNQcm9wLmNhbGwob3B0aW9ucyxrZXkpKWNvbnRpbnVlO3ZhbHVlPW9wdGlvbnNba2V5XTtyZXN1bHRzLnB1c2godGhpcy5zZXRPcHRpb24oa2V5LHZhbHVlKSl9cmV0dXJuIHJlc3VsdHN9O0dJRi5wcm90b3R5cGUuYWRkRnJhbWU9ZnVuY3Rpb24oaW1hZ2Usb3B0aW9ucyl7dmFyIGZyYW1lLGtleTtpZihvcHRpb25zPT1udWxsKXtvcHRpb25zPXt9fWZyYW1lPXt9O2ZyYW1lLnRyYW5zcGFyZW50PXRoaXMub3B0aW9ucy50cmFuc3BhcmVudDtmb3Ioa2V5IGluIGZyYW1lRGVmYXVsdHMpe2ZyYW1lW2tleV09b3B0aW9uc1trZXldfHxmcmFtZURlZmF1bHRzW2tleV19aWYodGhpcy5vcHRpb25zLndpZHRoPT1udWxsKXt0aGlzLnNldE9wdGlvbihcIndpZHRoXCIsaW1hZ2Uud2lkdGgpfWlmKHRoaXMub3B0aW9ucy5oZWlnaHQ9PW51bGwpe3RoaXMuc2V0T3B0aW9uKFwiaGVpZ2h0XCIsaW1hZ2UuaGVpZ2h0KX1pZih0eXBlb2YgSW1hZ2VEYXRhIT09XCJ1bmRlZmluZWRcIiYmSW1hZ2VEYXRhIT09bnVsbCYmaW1hZ2UgaW5zdGFuY2VvZiBJbWFnZURhdGEpe2ZyYW1lLmRhdGE9aW1hZ2UuZGF0YX1lbHNlIGlmKHR5cGVvZiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQhPT1cInVuZGVmaW5lZFwiJiZDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQhPT1udWxsJiZpbWFnZSBpbnN0YW5jZW9mIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRHx8dHlwZW9mIFdlYkdMUmVuZGVyaW5nQ29udGV4dCE9PVwidW5kZWZpbmVkXCImJldlYkdMUmVuZGVyaW5nQ29udGV4dCE9PW51bGwmJmltYWdlIGluc3RhbmNlb2YgV2ViR0xSZW5kZXJpbmdDb250ZXh0KXtpZihvcHRpb25zLmNvcHkpe2ZyYW1lLmRhdGE9dGhpcy5nZXRDb250ZXh0RGF0YShpbWFnZSl9ZWxzZXtmcmFtZS5jb250ZXh0PWltYWdlfX1lbHNlIGlmKGltYWdlLmNoaWxkTm9kZXMhPW51bGwpe2lmKG9wdGlvbnMuY29weSl7ZnJhbWUuZGF0YT10aGlzLmdldEltYWdlRGF0YShpbWFnZSl9ZWxzZXtmcmFtZS5pbWFnZT1pbWFnZX19ZWxzZXt0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGltYWdlXCIpfXJldHVybiB0aGlzLmZyYW1lcy5wdXNoKGZyYW1lKX07R0lGLnByb3RvdHlwZS5yZW5kZXI9ZnVuY3Rpb24oKXt2YXIgaSxqLG51bVdvcmtlcnMscmVmO2lmKHRoaXMucnVubmluZyl7dGhyb3cgbmV3IEVycm9yKFwiQWxyZWFkeSBydW5uaW5nXCIpfWlmKHRoaXMub3B0aW9ucy53aWR0aD09bnVsbHx8dGhpcy5vcHRpb25zLmhlaWdodD09bnVsbCl7dGhyb3cgbmV3IEVycm9yKFwiV2lkdGggYW5kIGhlaWdodCBtdXN0IGJlIHNldCBwcmlvciB0byByZW5kZXJpbmdcIil9dGhpcy5ydW5uaW5nPXRydWU7dGhpcy5uZXh0RnJhbWU9MDt0aGlzLmZpbmlzaGVkRnJhbWVzPTA7dGhpcy5pbWFnZVBhcnRzPWZ1bmN0aW9uKCl7dmFyIGoscmVmLHJlc3VsdHM7cmVzdWx0cz1bXTtmb3IoaT1qPTAscmVmPXRoaXMuZnJhbWVzLmxlbmd0aDswPD1yZWY/ajxyZWY6aj5yZWY7aT0wPD1yZWY/KytqOi0tail7cmVzdWx0cy5wdXNoKG51bGwpfXJldHVybiByZXN1bHRzfS5jYWxsKHRoaXMpO251bVdvcmtlcnM9dGhpcy5zcGF3bldvcmtlcnMoKTtpZih0aGlzLm9wdGlvbnMuZ2xvYmFsUGFsZXR0ZT09PXRydWUpe3RoaXMucmVuZGVyTmV4dEZyYW1lKCl9ZWxzZXtmb3IoaT1qPTAscmVmPW51bVdvcmtlcnM7MDw9cmVmP2o8cmVmOmo+cmVmO2k9MDw9cmVmPysrajotLWope3RoaXMucmVuZGVyTmV4dEZyYW1lKCl9fXRoaXMuZW1pdChcInN0YXJ0XCIpO3JldHVybiB0aGlzLmVtaXQoXCJwcm9ncmVzc1wiLDApfTtHSUYucHJvdG90eXBlLmFib3J0PWZ1bmN0aW9uKCl7dmFyIHdvcmtlcjt3aGlsZSh0cnVlKXt3b3JrZXI9dGhpcy5hY3RpdmVXb3JrZXJzLnNoaWZ0KCk7aWYod29ya2VyPT1udWxsKXticmVha310aGlzLmxvZyhcImtpbGxpbmcgYWN0aXZlIHdvcmtlclwiKTt3b3JrZXIudGVybWluYXRlKCl9dGhpcy5ydW5uaW5nPWZhbHNlO3JldHVybiB0aGlzLmVtaXQoXCJhYm9ydFwiKX07R0lGLnByb3RvdHlwZS5zcGF3bldvcmtlcnM9ZnVuY3Rpb24oKXt2YXIgaixudW1Xb3JrZXJzLHJlZixyZXN1bHRzO251bVdvcmtlcnM9TWF0aC5taW4odGhpcy5vcHRpb25zLndvcmtlcnMsdGhpcy5mcmFtZXMubGVuZ3RoKTsoZnVuY3Rpb24oKXtyZXN1bHRzPVtdO2Zvcih2YXIgaj1yZWY9dGhpcy5mcmVlV29ya2Vycy5sZW5ndGg7cmVmPD1udW1Xb3JrZXJzP2o8bnVtV29ya2VyczpqPm51bVdvcmtlcnM7cmVmPD1udW1Xb3JrZXJzP2orKzpqLS0pe3Jlc3VsdHMucHVzaChqKX1yZXR1cm4gcmVzdWx0c30pLmFwcGx5KHRoaXMpLmZvckVhY2goZnVuY3Rpb24oX3RoaXMpe3JldHVybiBmdW5jdGlvbihpKXt2YXIgd29ya2VyO190aGlzLmxvZyhcInNwYXduaW5nIHdvcmtlciBcIitpKTt3b3JrZXI9bmV3IFdvcmtlcihfdGhpcy5vcHRpb25zLndvcmtlclNjcmlwdCk7d29ya2VyLm9ubWVzc2FnZT1mdW5jdGlvbihldmVudCl7X3RoaXMuYWN0aXZlV29ya2Vycy5zcGxpY2UoX3RoaXMuYWN0aXZlV29ya2Vycy5pbmRleE9mKHdvcmtlciksMSk7X3RoaXMuZnJlZVdvcmtlcnMucHVzaCh3b3JrZXIpO3JldHVybiBfdGhpcy5mcmFtZUZpbmlzaGVkKGV2ZW50LmRhdGEpfTtyZXR1cm4gX3RoaXMuZnJlZVdvcmtlcnMucHVzaCh3b3JrZXIpfX0odGhpcykpO3JldHVybiBudW1Xb3JrZXJzfTtHSUYucHJvdG90eXBlLmZyYW1lRmluaXNoZWQ9ZnVuY3Rpb24oZnJhbWUpe3ZhciBpLGoscmVmO3RoaXMubG9nKFwiZnJhbWUgXCIrZnJhbWUuaW5kZXgrXCIgZmluaXNoZWQgLSBcIit0aGlzLmFjdGl2ZVdvcmtlcnMubGVuZ3RoK1wiIGFjdGl2ZVwiKTt0aGlzLmZpbmlzaGVkRnJhbWVzKys7dGhpcy5lbWl0KFwicHJvZ3Jlc3NcIix0aGlzLmZpbmlzaGVkRnJhbWVzL3RoaXMuZnJhbWVzLmxlbmd0aCk7dGhpcy5pbWFnZVBhcnRzW2ZyYW1lLmluZGV4XT1mcmFtZTtpZih0aGlzLm9wdGlvbnMuZ2xvYmFsUGFsZXR0ZT09PXRydWUpe3RoaXMub3B0aW9ucy5nbG9iYWxQYWxldHRlPWZyYW1lLmdsb2JhbFBhbGV0dGU7dGhpcy5sb2coXCJnbG9iYWwgcGFsZXR0ZSBhbmFseXplZFwiKTtpZih0aGlzLmZyYW1lcy5sZW5ndGg+Mil7Zm9yKGk9aj0xLHJlZj10aGlzLmZyZWVXb3JrZXJzLmxlbmd0aDsxPD1yZWY/ajxyZWY6aj5yZWY7aT0xPD1yZWY/KytqOi0tail7dGhpcy5yZW5kZXJOZXh0RnJhbWUoKX19fWlmKGluZGV4T2YuY2FsbCh0aGlzLmltYWdlUGFydHMsbnVsbCk+PTApe3JldHVybiB0aGlzLnJlbmRlck5leHRGcmFtZSgpfWVsc2V7cmV0dXJuIHRoaXMuZmluaXNoUmVuZGVyaW5nKCl9fTtHSUYucHJvdG90eXBlLmZpbmlzaFJlbmRlcmluZz1mdW5jdGlvbigpe3ZhciBkYXRhLGZyYW1lLGksaW1hZ2UsaixrLGwsbGVuLGxlbjEsbGVuMixsZW4zLG9mZnNldCxwYWdlLHJlZixyZWYxLHJlZjI7bGVuPTA7cmVmPXRoaXMuaW1hZ2VQYXJ0cztmb3Ioaj0wLGxlbjE9cmVmLmxlbmd0aDtqPGxlbjE7aisrKXtmcmFtZT1yZWZbal07bGVuKz0oZnJhbWUuZGF0YS5sZW5ndGgtMSkqZnJhbWUucGFnZVNpemUrZnJhbWUuY3Vyc29yfWxlbis9ZnJhbWUucGFnZVNpemUtZnJhbWUuY3Vyc29yO3RoaXMubG9nKFwicmVuZGVyaW5nIGZpbmlzaGVkIC0gZmlsZXNpemUgXCIrTWF0aC5yb3VuZChsZW4vMWUzKStcImtiXCIpO2RhdGE9bmV3IFVpbnQ4QXJyYXkobGVuKTtvZmZzZXQ9MDtyZWYxPXRoaXMuaW1hZ2VQYXJ0cztmb3Ioaz0wLGxlbjI9cmVmMS5sZW5ndGg7azxsZW4yO2srKyl7ZnJhbWU9cmVmMVtrXTtyZWYyPWZyYW1lLmRhdGE7Zm9yKGk9bD0wLGxlbjM9cmVmMi5sZW5ndGg7bDxsZW4zO2k9KytsKXtwYWdlPXJlZjJbaV07ZGF0YS5zZXQocGFnZSxvZmZzZXQpO2lmKGk9PT1mcmFtZS5kYXRhLmxlbmd0aC0xKXtvZmZzZXQrPWZyYW1lLmN1cnNvcn1lbHNle29mZnNldCs9ZnJhbWUucGFnZVNpemV9fX1pbWFnZT1uZXcgQmxvYihbZGF0YV0se3R5cGU6XCJpbWFnZS9naWZcIn0pO3JldHVybiB0aGlzLmVtaXQoXCJmaW5pc2hlZFwiLGltYWdlLGRhdGEpfTtHSUYucHJvdG90eXBlLnJlbmRlck5leHRGcmFtZT1mdW5jdGlvbigpe3ZhciBmcmFtZSx0YXNrLHdvcmtlcjtpZih0aGlzLmZyZWVXb3JrZXJzLmxlbmd0aD09PTApe3Rocm93IG5ldyBFcnJvcihcIk5vIGZyZWUgd29ya2Vyc1wiKX1pZih0aGlzLm5leHRGcmFtZT49dGhpcy5mcmFtZXMubGVuZ3RoKXtyZXR1cm59ZnJhbWU9dGhpcy5mcmFtZXNbdGhpcy5uZXh0RnJhbWUrK107d29ya2VyPXRoaXMuZnJlZVdvcmtlcnMuc2hpZnQoKTt0YXNrPXRoaXMuZ2V0VGFzayhmcmFtZSk7dGhpcy5sb2coXCJzdGFydGluZyBmcmFtZSBcIisodGFzay5pbmRleCsxKStcIiBvZiBcIit0aGlzLmZyYW1lcy5sZW5ndGgpO3RoaXMuYWN0aXZlV29ya2Vycy5wdXNoKHdvcmtlcik7cmV0dXJuIHdvcmtlci5wb3N0TWVzc2FnZSh0YXNrKX07R0lGLnByb3RvdHlwZS5nZXRDb250ZXh0RGF0YT1mdW5jdGlvbihjdHgpe3JldHVybiBjdHguZ2V0SW1hZ2VEYXRhKDAsMCx0aGlzLm9wdGlvbnMud2lkdGgsdGhpcy5vcHRpb25zLmhlaWdodCkuZGF0YX07R0lGLnByb3RvdHlwZS5nZXRJbWFnZURhdGE9ZnVuY3Rpb24oaW1hZ2Upe3ZhciBjdHg7aWYodGhpcy5fY2FudmFzPT1udWxsKXt0aGlzLl9jYW52YXM9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTt0aGlzLl9jYW52YXMud2lkdGg9dGhpcy5vcHRpb25zLndpZHRoO3RoaXMuX2NhbnZhcy5oZWlnaHQ9dGhpcy5vcHRpb25zLmhlaWdodH1jdHg9dGhpcy5fY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtjdHguc2V0RmlsbD10aGlzLm9wdGlvbnMuYmFja2dyb3VuZDtjdHguZmlsbFJlY3QoMCwwLHRoaXMub3B0aW9ucy53aWR0aCx0aGlzLm9wdGlvbnMuaGVpZ2h0KTtjdHguZHJhd0ltYWdlKGltYWdlLDAsMCk7cmV0dXJuIHRoaXMuZ2V0Q29udGV4dERhdGEoY3R4KX07R0lGLnByb3RvdHlwZS5nZXRUYXNrPWZ1bmN0aW9uKGZyYW1lKXt2YXIgaW5kZXgsdGFzaztpbmRleD10aGlzLmZyYW1lcy5pbmRleE9mKGZyYW1lKTt0YXNrPXtpbmRleDppbmRleCxsYXN0OmluZGV4PT09dGhpcy5mcmFtZXMubGVuZ3RoLTEsZGVsYXk6ZnJhbWUuZGVsYXksdHJhbnNwYXJlbnQ6ZnJhbWUudHJhbnNwYXJlbnQsd2lkdGg6dGhpcy5vcHRpb25zLndpZHRoLGhlaWdodDp0aGlzLm9wdGlvbnMuaGVpZ2h0LHF1YWxpdHk6dGhpcy5vcHRpb25zLnF1YWxpdHksZGl0aGVyOnRoaXMub3B0aW9ucy5kaXRoZXIsZ2xvYmFsUGFsZXR0ZTp0aGlzLm9wdGlvbnMuZ2xvYmFsUGFsZXR0ZSxyZXBlYXQ6dGhpcy5vcHRpb25zLnJlcGVhdCxjYW5UcmFuc2Zlcjpicm93c2VyLm5hbWU9PT1cImNocm9tZVwifTtpZihmcmFtZS5kYXRhIT1udWxsKXt0YXNrLmRhdGE9ZnJhbWUuZGF0YX1lbHNlIGlmKGZyYW1lLmNvbnRleHQhPW51bGwpe3Rhc2suZGF0YT10aGlzLmdldENvbnRleHREYXRhKGZyYW1lLmNvbnRleHQpfWVsc2UgaWYoZnJhbWUuaW1hZ2UhPW51bGwpe3Rhc2suZGF0YT10aGlzLmdldEltYWdlRGF0YShmcmFtZS5pbWFnZSl9ZWxzZXt0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGZyYW1lXCIpfXJldHVybiB0YXNrfTtHSUYucHJvdG90eXBlLmxvZz1mdW5jdGlvbigpe3ZhciBhcmdzO2FyZ3M9MTw9YXJndW1lbnRzLmxlbmd0aD9zbGljZS5jYWxsKGFyZ3VtZW50cywwKTpbXTtpZighdGhpcy5vcHRpb25zLmRlYnVnKXtyZXR1cm59cmV0dXJuIGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsYXJncyl9O3JldHVybiBHSUZ9KEV2ZW50RW1pdHRlcik7bW9kdWxlLmV4cG9ydHM9R0lGfSx7XCIuL2Jyb3dzZXIuY29mZmVlXCI6MixldmVudHM6MX1dfSx7fSxbM10pKDMpfSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1naWYuanMubWFwXG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gbmV3IFdvcmtlcihfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiMGE4MzdlMzJjZmFlYWVjNzI4OWYud29ya2VyLmpzXCIpO1xufTsiLCJpbXBvcnQgeyBRdWFkV29ya2VyRGF0YU1lc3NhZ2UgfSBmcm9tICcuL3NjaGVtYSc7XG5pbXBvcnQgeyBsb2FkSW1hZ2UsIGdldEltYWdlRGF0YU9mZlNjcmVlbiwgdG9HaWYgfSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IFF1YWRXb3JrZXIgZnJvbSAnd29ya2VyLWxvYWRlciEuL3F1YWQud29ya2VyJztcblxubGV0IGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XG5sZXQgY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xubGV0IGltYWdlSW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG5sZXQgZXhwb3J0R2lmQnV0dG9uOiBIVE1MQnV0dG9uRWxlbWVudDtcbmxldCBxdWFkV29ya2VyOiBRdWFkV29ya2VyO1xuY29uc3QgcHJvY2Vzc2VkRnJhbWVzOiBJbWFnZURhdGFbXSA9IFtdO1xuY29uc3QgcHJvY2Vzc2luZ1F1ZXVlOiBGaWxlW10gPSBbXTtcbmxldCBpc1Byb2Nlc3Npbmc6IGJvb2xlYW4gPSBmYWxzZTtcbmxldCBvZmZsaW5lQW5pbWF0ZUlkOiBudW1iZXI7XG5cbmZ1bmN0aW9uIGRyYXcoaW1hZ2VEYXRhOiBJbWFnZURhdGEpIHtcbiAgICBjb250ZXh0LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgIGNvbnRleHQucHV0SW1hZ2VEYXRhKGltYWdlRGF0YSwgMCwgMCk7XG59XG5cbmZ1bmN0aW9uIG9mZmxpbmVBbmltYXRlKG9mZmxpbmVGcmFtZXM6IEltYWdlRGF0YVtdLCBhbmltYXRlSW5kZXg6IG51bWJlciA9IDAsIGN1cnJGcmFtZUluZGV4OiBudW1iZXIgPSAwLCBudW1GcmFtZXNFYWNoOiBudW1iZXIgPSAyMCk6IHZvaWQge1xuICAgIGxldCBuZXh0RnJhbWVJbmRleDogbnVtYmVyID0gY3VyckZyYW1lSW5kZXggKyAxO1xuICAgIGxldCBuZXh0QW5pbWF0ZUluZGV4OiBudW1iZXIgPSBhbmltYXRlSW5kZXg7XG5cbiAgICBpZiAobmV4dEZyYW1lSW5kZXggPiBudW1GcmFtZXNFYWNoKSB7XG4gICAgICAgIG5leHRBbmltYXRlSW5kZXggPSBhbmltYXRlSW5kZXggKyAxID49IG9mZmxpbmVGcmFtZXMubGVuZ3RoID8gMCA6IGFuaW1hdGVJbmRleCArIDE7XG4gICAgICAgIG5leHRGcmFtZUluZGV4ID0gMDtcbiAgICB9XG5cbiAgICBvZmZsaW5lQW5pbWF0ZUlkID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiBvZmZsaW5lQW5pbWF0ZShvZmZsaW5lRnJhbWVzLCBuZXh0QW5pbWF0ZUluZGV4LCBuZXh0RnJhbWVJbmRleCwgbnVtRnJhbWVzRWFjaCkpO1xuXG4gICAgZHJhdyhvZmZsaW5lRnJhbWVzW25leHRBbmltYXRlSW5kZXhdKTtcbn1cblxuZnVuY3Rpb24gcHJvY2Vzc0ltYWdlKGltYWdlRmlsZTogRmlsZSk6IHZvaWQge1xuICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZShvZmZsaW5lQW5pbWF0ZUlkKTtcblxuICAgIGxvYWRJbWFnZShpbWFnZUZpbGUpXG4gICAgICAgIC50aGVuKGltYWdlRWxlbSA9PiBnZXRJbWFnZURhdGFPZmZTY3JlZW4oaW1hZ2VFbGVtLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpKVxuICAgICAgICAudGhlbigoaW1hZ2VEYXRhOiBJbWFnZURhdGEpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2U6IFF1YWRXb3JrZXJEYXRhTWVzc2FnZSA9IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnbmV3LWltYWdlJyxcbiAgICAgICAgICAgICAgICBkYXRhOiBpbWFnZURhdGFcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBxdWFkV29ya2VyLnBvc3RNZXNzYWdlKG1lc3NhZ2UpO1xuICAgICAgICB9KTtcbn1cblxuZnVuY3Rpb24gb25JbWFnZUNoYW5nZShldmVudDogRXZlbnQpIHtcbiAgICBjb25zdCBpbWFnZUlucHV0OiBIVE1MSW5wdXRFbGVtZW50ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgaWYgKCFpbWFnZUlucHV0IHx8XG4gICAgICAgICFpbWFnZUlucHV0LmZpbGVzIHx8XG4gICAgICAgICFpbWFnZUlucHV0LmZpbGVzLmxlbmd0aCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCBza2lwRmlyc3Q6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBpZiAoIWlzUHJvY2Vzc2luZykge1xuICAgICAgICBwcm9jZXNzSW1hZ2UoaW1hZ2VJbnB1dC5maWxlc1swXSk7XG5cbiAgICAgICAgaXNQcm9jZXNzaW5nID0gdHJ1ZTtcbiAgICAgICAgc2tpcEZpcnN0ID0gdHJ1ZTtcbiAgICB9XG4gICAgZm9yIChsZXQgZmlsZUluZGV4ID0gc2tpcEZpcnN0ID8gMSA6IDA7IGZpbGVJbmRleCA8IGltYWdlSW5wdXQuZmlsZXMubGVuZ3RoOyBmaWxlSW5kZXgrKykge1xuICAgICAgICBwcm9jZXNzaW5nUXVldWUucHVzaChpbWFnZUlucHV0LmZpbGVzW2ZpbGVJbmRleF0pO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gcmVzaXplQ2FudmFzKCkge1xuICAgIGNvbnN0IGNvbXB1dGVkU3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShjYW52YXMpO1xuICAgIGNvbnN0IHdpZHRoID0gcGFyc2VJbnQoY29tcHV0ZWRTdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKCd3aWR0aCcpLCAxMCk7XG4gICAgY29uc3QgaGVpZ2h0ID0gcGFyc2VJbnQoY29tcHV0ZWRTdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKCdoZWlnaHQnKSwgMTApO1xuICAgIGNhbnZhcy53aWR0aCA9IHdpZHRoO1xuICAgIGNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XG59XG5cbmZ1bmN0aW9uIG9uV29ya2VyTWVzc2FnZShldmVudDogTWVzc2FnZUV2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgbWVzc2FnZTogUXVhZFdvcmtlckRhdGFNZXNzYWdlID0gZXZlbnQuZGF0YTtcbiAgICBzd2l0Y2ggKG1lc3NhZ2UudHlwZSkge1xuICAgICAgICBjYXNlICdkcmF3JzpcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLmRhdGEpIHtcbiAgICAgICAgICAgICAgICBwcm9jZXNzZWRGcmFtZXMucHVzaChtZXNzYWdlLmRhdGEpO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGltZXN0YW1wID0+IGRyYXcobWVzc2FnZS5kYXRhKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdwcm9jZXNzZWQnOlxuICAgICAgICAgICAgaWYgKHByb2Nlc3NpbmdRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAvLyBwcm9jZXNzIHRoZSBuZXh0IGltYWdlIGluIHRoZSBxdWV1ZVxuICAgICAgICAgICAgICAgIGNvbnN0IG5leHRJbWFnZUZpbGU6IEZpbGUgPSBwcm9jZXNzaW5nUXVldWUuc2hpZnQoKSBhcyBGaWxlO1xuICAgICAgICAgICAgICAgIHByb2Nlc3NJbWFnZShuZXh0SW1hZ2VGaWxlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb2ZmbGluZUFuaW1hdGVJZCA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gb2ZmbGluZUFuaW1hdGUocHJvY2Vzc2VkRnJhbWVzKSk7XG4gICAgICAgICAgICAgICAgaXNQcm9jZXNzaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGV4cG9ydEdpZkJ1dHRvbi5kaXNhYmxlZCA9IGlzUHJvY2Vzc2luZztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgVW5rbm93biBtZXNzYWdlIHR5cGU6ICR7bWVzc2FnZX1gKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIG1haW4oKSB7XG4gICAgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhcycpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuICAgIGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKSBhcyBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gICAgaW1hZ2VJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbWFnZS1pbnB1dCcpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG5cbiAgICBpbWFnZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIG9uSW1hZ2VDaGFuZ2UpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCByZXNpemVDYW52YXMpO1xuXG4gICAgLy8gV2ViIHdvcmtlciBsb2dpY1xuICAgIHF1YWRXb3JrZXIgPSBuZXcgUXVhZFdvcmtlcigpO1xuICAgIHF1YWRXb3JrZXIuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIG9uV29ya2VyTWVzc2FnZSk7XG5cbiAgICAvLyBleHBvcnQgbG9naWNcbiAgICBleHBvcnRHaWZCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXhwb3J0LWdpZicpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xuICAgIGV4cG9ydEdpZkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgdG9HaWYocHJvY2Vzc2VkRnJhbWVzKTtcbiAgICB9KTtcblxuICAgIC8vIHNpemUgY2FudmFzXG4gICAgcmVzaXplQ2FudmFzKCk7XG59XG5cbm1haW4oKTsiLCJpbXBvcnQgeyBQaXhlbCwgQ29sb3IgfSBmcm9tICcuL3NjaGVtYSc7XG5pbXBvcnQgR0lGIGZyb20gJ2dpZi5qcyc7XG5cbmV4cG9ydCBjb25zdCBQSVhFTF9XSURUSDogbnVtYmVyID0gNDtcbmV4cG9ydCBjb25zdCBXSElURV9DT0xPUjogQ29sb3IgPSB7XG4gICAgcjogMjU1LFxuICAgIGc6IDI1NSxcbiAgICBiOiAyNTUsXG4gICAgYTogMjU1LFxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRJbWFnZShpbWFnZUZpbGU6IEZpbGUpOiBQcm9taXNlPEhUTUxJbWFnZUVsZW1lbnQ+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBjb25zdCBpbWFnZUZpbGVEYXRhVXJsID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoaW1hZ2VGaWxlKTtcbiAgICAgICAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcblxuICAgICAgICBpbWFnZS5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgICB3aW5kb3cuVVJMLnJldm9rZU9iamVjdFVSTChpbWFnZUZpbGVEYXRhVXJsKTtcbiAgICAgICAgICAgIHJlc29sdmUoaW1hZ2UpXG4gICAgICAgIH07XG4gICAgICAgIGltYWdlLm9uZXJyb3IgPSAoZXJyKSA9PiB7XG4gICAgICAgICAgICB3aW5kb3cuVVJMLnJldm9rZU9iamVjdFVSTChpbWFnZUZpbGVEYXRhVXJsKTtcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9O1xuICAgICAgICBpbWFnZS5zcmMgPSBpbWFnZUZpbGVEYXRhVXJsO1xuICAgIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0QXZlcmFnZUNvbG9yKHBpeGVsczogUGl4ZWxbXSk6IENvbG9yIHtcbiAgICBsZXQgc3F1YXJlZFN1bVI6IG51bWJlcjtcbiAgICBsZXQgc3F1YXJlZFN1bUc6IG51bWJlcjtcbiAgICBsZXQgc3F1YXJlZFN1bUI6IG51bWJlcjtcbiAgICBsZXQgc3F1YXJlZFN1bUE6IG51bWJlcjtcbiAgICBsZXQgYXZlcmFnZUNvbG9yOiBDb2xvciA9IHBpeGVsc1swXSB8fCBXSElURV9DT0xPUjtcblxuICAgIGlmIChwaXhlbHMubGVuZ3RoID4gMSkge1xuICAgICAgICByZXR1cm4gcGl4ZWxzLnNsaWNlKDEpXG4gICAgICAgICAgICAucmVkdWNlKChwcmV2QXZlcmFnZTogQ29sb3IsIGN1cnJQaXhlbDogUGl4ZWwpID0+IHtcbiAgICAgICAgICAgICAgICBzcXVhcmVkU3VtUiA9IE1hdGgucG93KHByZXZBdmVyYWdlLnIsIDIpICsgTWF0aC5wb3coY3VyclBpeGVsLnIsIDIpO1xuICAgICAgICAgICAgICAgIHNxdWFyZWRTdW1HID0gTWF0aC5wb3cocHJldkF2ZXJhZ2UuZywgMikgKyBNYXRoLnBvdyhjdXJyUGl4ZWwuZywgMik7XG4gICAgICAgICAgICAgICAgc3F1YXJlZFN1bUIgPSBNYXRoLnBvdyhwcmV2QXZlcmFnZS5iLCAyKSArIE1hdGgucG93KGN1cnJQaXhlbC5iLCAyKTtcbiAgICAgICAgICAgICAgICBzcXVhcmVkU3VtQSA9IE1hdGgucG93KHByZXZBdmVyYWdlLmEsIDIpICsgTWF0aC5wb3coY3VyclBpeGVsLmEsIDIpO1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHI6IE1hdGguc3FydChzcXVhcmVkU3VtUiAvIDIpLFxuICAgICAgICAgICAgICAgICAgICBnOiBNYXRoLnNxcnQoc3F1YXJlZFN1bUcgLyAyKSxcbiAgICAgICAgICAgICAgICAgICAgYjogTWF0aC5zcXJ0KHNxdWFyZWRTdW1CIC8gMiksXG4gICAgICAgICAgICAgICAgICAgIGE6IE1hdGguc3FydChzcXVhcmVkU3VtQSAvIDIpLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9LCBhdmVyYWdlQ29sb3IpO1xuICAgIH1cblxuICAgIHJldHVybiBhdmVyYWdlQ29sb3I7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVBpeGVsKHg6IG51bWJlciwgeTogbnVtYmVyLCByOiBudW1iZXIsIGc6IG51bWJlciwgYjogbnVtYmVyLCBhOiBudW1iZXIpOiBQaXhlbCB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgeCxcbiAgICAgICAgeSxcbiAgICAgICAgcixcbiAgICAgICAgZyxcbiAgICAgICAgYixcbiAgICAgICAgYSxcbiAgICAgICAgZ2V0Qm91bmRzKCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB4OiB0aGlzLngsXG4gICAgICAgICAgICAgICAgeTogdGhpcy55LFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVBpeGVscyhpbWFnZURhdGE6IEltYWdlRGF0YSk6IFBpeGVsW10ge1xuICAgIGxldCBwaXhlbHM6IFBpeGVsW10gPSBbXTtcbiAgICBwcm9jZXNzSW1hZ2VEYXRhKGltYWdlRGF0YSwgcGl4ZWwgPT4gcGl4ZWxzLnB1c2gocGl4ZWwpKTtcbiAgICByZXR1cm4gcGl4ZWxzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmlsbFBpeGVsSW5JbWFnZURhdGEoaW1hZ2VEYXRhOiBJbWFnZURhdGEsIHBpeGVsOiBQaXhlbCk6IHZvaWQge1xuICAgIGNvbnN0IHBpeGVsT2Zmc2V0OiBudW1iZXIgPSAocGl4ZWwueCArIHBpeGVsLnkgKiBpbWFnZURhdGEud2lkdGgpICogUElYRUxfV0lEVEg7XG4gICAgaWYgKHBpeGVsT2Zmc2V0IDwgMCB8fCBwaXhlbE9mZnNldCArIFBJWEVMX1dJRFRIID49IGltYWdlRGF0YS5kYXRhLmxlbmd0aCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGltYWdlRGF0YS5kYXRhW3BpeGVsT2Zmc2V0XSA9IHBpeGVsLnI7XG4gICAgaW1hZ2VEYXRhLmRhdGFbcGl4ZWxPZmZzZXQgKyAxXSA9IHBpeGVsLmc7XG4gICAgaW1hZ2VEYXRhLmRhdGFbcGl4ZWxPZmZzZXQgKyAyXSA9IHBpeGVsLmI7XG4gICAgaW1hZ2VEYXRhLmRhdGFbcGl4ZWxPZmZzZXQgKyAzXSA9IHBpeGVsLmE7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRJbWFnZURhdGFPZmZTY3JlZW4oaW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKTogSW1hZ2VEYXRhIHtcbiAgICBjb25zdCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgY29uc3QgY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEID0gY2FudmFzLmdldENvbnRleHQoJzJkJykgYXMgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuXG4gICAgY2FudmFzLndpZHRoID0gd2lkdGg7XG4gICAgY2FudmFzLmhlaWdodCA9IGhlaWdodDtcblxuICAgIGNvbnRleHQuZHJhd0ltYWdlKGltYWdlLCAwLCAwLCBpbWFnZS53aWR0aCwgaW1hZ2UuaGVpZ2h0LCAwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuXG4gICAgY29uc3QgaW1hZ2VEYXRhOiBJbWFnZURhdGEgPSBjb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgIHJldHVybiBpbWFnZURhdGE7XG59XG5cbmZ1bmN0aW9uIHByb2Nlc3NJbWFnZURhdGEoaW1hZ2VEYXRhOiBJbWFnZURhdGEsIHByb2Nlc3NGdW5jOiAocGl4ZWw6IFBpeGVsKSA9PiB2b2lkLCBpbml0UGl4ZWxYOiBudW1iZXIgPSAwLCBpbml0UGl4ZWxZOiBudW1iZXIgPSAwKTogdm9pZCB7XG4gICAgbGV0IHI6IG51bWJlcjtcbiAgICBsZXQgZzogbnVtYmVyO1xuICAgIGxldCBiOiBudW1iZXI7XG4gICAgbGV0IGE6IG51bWJlcjtcbiAgICBsZXQgb2Zmc2V0WDogbnVtYmVyO1xuICAgIGxldCBvZmZzZXRZOiBudW1iZXI7XG4gICAgbGV0IHBpeGVsOiBQaXhlbDtcblxuICAgIGZvciAobGV0IHggPSBpbml0UGl4ZWxYOyB4IDwgaW1hZ2VEYXRhLndpZHRoOyB4KyspIHtcbiAgICAgICAgb2Zmc2V0WCA9IHggKiBQSVhFTF9XSURUSDtcblxuICAgICAgICBmb3IgKGxldCB5ID0gaW5pdFBpeGVsWTsgeSA8IGltYWdlRGF0YS5oZWlnaHQ7IHkrKykge1xuICAgICAgICAgICAgb2Zmc2V0WSA9IGltYWdlRGF0YS53aWR0aCAqIHkgKiBQSVhFTF9XSURUSDtcblxuICAgICAgICAgICAgciA9IGltYWdlRGF0YS5kYXRhW29mZnNldFggKyBvZmZzZXRZXTtcbiAgICAgICAgICAgIGcgPSBpbWFnZURhdGEuZGF0YVtvZmZzZXRYICsgb2Zmc2V0WSArIDFdO1xuICAgICAgICAgICAgYiA9IGltYWdlRGF0YS5kYXRhW29mZnNldFggKyBvZmZzZXRZICsgMl07XG4gICAgICAgICAgICBhID0gaW1hZ2VEYXRhLmRhdGFbb2Zmc2V0WCArIG9mZnNldFkgKyAzXTtcblxuICAgICAgICAgICAgcGl4ZWwgPSBjcmVhdGVQaXhlbCh4LCB5LCByLCBnLCBiLCBhKTtcbiAgICAgICAgICAgIHByb2Nlc3NGdW5jKHBpeGVsKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvR2lmKGltYWdlRnJhbWVzOiBJbWFnZURhdGFbXSk6IHZvaWQge1xuICAgIGNvbnN0IGdpZiA9IG5ldyBHSUYoe1xuICAgICAgICB3b3JrZXJzOiAyLFxuICAgICAgICBxdWFsaXR5OiAxMFxuICAgIH0pO1xuXG4gICAgaW1hZ2VGcmFtZXNcbiAgICAgICAgLmZvckVhY2goaW1hZ2VGcmFtZSA9PiBnaWYuYWRkRnJhbWUoaW1hZ2VGcmFtZSwge1xuICAgICAgICAgICAgZGVsYXk6IDIwMCxcbiAgICAgICAgfSkpO1xuXG4gICAgZ2lmLm9uKCdmaW5pc2hlZCcsIChibG9iOiBhbnkpID0+IHtcbiAgICAgICAgc2F2ZUJsb2IoJ3NpbXBsZXF1YWQuZXhwb3J0LmdpZicsIGJsb2IpO1xuICAgIH0pO1xuXG4gICAgZ2lmLnJlbmRlcigpO1xufVxuXG5mdW5jdGlvbiBzYXZlQmxvYihmaWxlTmFtZTogc3RyaW5nLCBibG9iOiBCbG9iKSB7XG4gICAgY29uc3QgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICAgIGNvbnN0IHVybCA9IHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuXG4gICAgYS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgYS5ocmVmID0gdXJsO1xuICAgIGEuZG93bmxvYWQgPSBmaWxlTmFtZTtcbiAgICBcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGEpO1xuICAgIGEuY2xpY2soKTtcblxuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoYSk7XG4gICAgd2luZG93LlVSTC5yZXZva2VPYmplY3RVUkwodXJsKTtcbn0iXSwic291cmNlUm9vdCI6IiJ9