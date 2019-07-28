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
  return new Worker(__webpack_require__.p + "b906928e76d1107fe4ad.worker.js");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2dpZi5qcy9kaXN0L2dpZi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcXVhZC53b3JrZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FuaW1hdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC50cyJdLCJuYW1lcyI6WyJjYW52YXMiLCJjb250ZXh0IiwiaW1hZ2VJbnB1dCIsImV4cG9ydEdpZkJ1dHRvbiIsInF1YWRXb3JrZXIiLCJmcmFtZXMiLCJvZmZsaW5lQW5pbWF0ZUlkIiwiZHJhdyIsImltYWdlRGF0YSIsImNsZWFyUmVjdCIsIndpZHRoIiwiaGVpZ2h0IiwicHV0SW1hZ2VEYXRhIiwib2ZmbGluZUFuaW1hdGUiLCJvZmZsaW5lRnJhbWVzIiwiYW5pbWF0ZUluZGV4IiwiY3VyckZyYW1lSW5kZXgiLCJudW1GcmFtZXNFYWNoIiwibmV4dEZyYW1lSW5kZXgiLCJuZXh0QW5pbWF0ZUluZGV4IiwibGVuZ3RoIiwid2luZG93IiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwicHJvY2Vzc0ltYWdlIiwiaW1hZ2VGaWxlIiwiY2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJsb2FkSW1hZ2UiLCJ0aGVuIiwiaW1hZ2VFbGVtIiwiZ2V0SW1hZ2VEYXRhT2ZmU2NyZWVuIiwibWVzc2FnZSIsInR5cGUiLCJkYXRhIiwicG9zdE1lc3NhZ2UiLCJvbkltYWdlQ2hhbmdlIiwiZXZlbnQiLCJ0YXJnZXQiLCJmaWxlcyIsImZpcnN0SW1hZ2UiLCJyZXNpemVDYW52YXMiLCJjb21wdXRlZFN0eWxlIiwiZ2V0Q29tcHV0ZWRTdHlsZSIsInBhcnNlSW50IiwiZ2V0UHJvcGVydHlWYWx1ZSIsIm9uV29ya2VyTWVzc2FnZSIsInB1c2giLCJ0aW1lc3RhbXAiLCJkaXNhYmxlZCIsImNvbnNvbGUiLCJlcnJvciIsIm1haW4iLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiZ2V0Q29udGV4dCIsImFkZEV2ZW50TGlzdGVuZXIiLCJRdWFkV29ya2VyIiwidG9HaWYiLCJQSVhFTF9XSURUSCIsIldISVRFX0NPTE9SIiwiciIsImciLCJiIiwiYSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiaW1hZ2VGaWxlRGF0YVVybCIsIlVSTCIsImNyZWF0ZU9iamVjdFVSTCIsImltYWdlIiwiSW1hZ2UiLCJvbmxvYWQiLCJyZXZva2VPYmplY3RVUkwiLCJvbmVycm9yIiwiZXJyIiwic3JjIiwiZ2V0QXZlcmFnZUNvbG9yIiwicGl4ZWxzIiwic3F1YXJlZFN1bVIiLCJzcXVhcmVkU3VtRyIsInNxdWFyZWRTdW1CIiwic3F1YXJlZFN1bUEiLCJhdmVyYWdlQ29sb3IiLCJzbGljZSIsInJlZHVjZSIsInByZXZBdmVyYWdlIiwiY3VyclBpeGVsIiwiTWF0aCIsInBvdyIsInNxcnQiLCJjcmVhdGVQaXhlbCIsIngiLCJ5IiwiZ2V0Qm91bmRzIiwiY3JlYXRlUGl4ZWxzIiwicHJvY2Vzc0ltYWdlRGF0YSIsInBpeGVsIiwiZmlsbFBpeGVsSW5JbWFnZURhdGEiLCJwaXhlbE9mZnNldCIsImNyZWF0ZUVsZW1lbnQiLCJkcmF3SW1hZ2UiLCJnZXRJbWFnZURhdGEiLCJwcm9jZXNzRnVuYyIsImluaXRQaXhlbFgiLCJpbml0UGl4ZWxZIiwib2Zmc2V0WCIsIm9mZnNldFkiLCJpbWFnZUZyYW1lcyIsImdpZiIsIkdJRiIsIndvcmtlcnMiLCJxdWFsaXR5IiwiZm9yRWFjaCIsImltYWdlRnJhbWUiLCJhZGRGcmFtZSIsImRlbGF5Iiwib24iLCJibG9iIiwic2F2ZUJsb2IiLCJyZW5kZXIiLCJmaWxlTmFtZSIsInVybCIsInN0eWxlIiwiZGlzcGxheSIsImhyZWYiLCJkb3dubG9hZCIsImJvZHkiLCJhcHBlbmRDaGlsZCIsImNsaWNrIiwicmVtb3ZlQ2hpbGQiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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IFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvYW5pbWF0aW9uLnRzXCIpO1xuIiwiLy8gZ2lmLmpzIDAuMi4wIC0gaHR0cHM6Ly9naXRodWIuY29tL2pub3JkYmVyZy9naWYuanNcbihmdW5jdGlvbihmKXtpZih0eXBlb2YgZXhwb3J0cz09PVwib2JqZWN0XCImJnR5cGVvZiBtb2R1bGUhPT1cInVuZGVmaW5lZFwiKXttb2R1bGUuZXhwb3J0cz1mKCl9ZWxzZSBpZih0eXBlb2YgZGVmaW5lPT09XCJmdW5jdGlvblwiJiZkZWZpbmUuYW1kKXtkZWZpbmUoW10sZil9ZWxzZXt2YXIgZztpZih0eXBlb2Ygd2luZG93IT09XCJ1bmRlZmluZWRcIil7Zz13aW5kb3d9ZWxzZSBpZih0eXBlb2YgZ2xvYmFsIT09XCJ1bmRlZmluZWRcIil7Zz1nbG9iYWx9ZWxzZSBpZih0eXBlb2Ygc2VsZiE9PVwidW5kZWZpbmVkXCIpe2c9c2VsZn1lbHNle2c9dGhpc31nLkdJRj1mKCl9fSkoZnVuY3Rpb24oKXt2YXIgZGVmaW5lLG1vZHVsZSxleHBvcnRzO3JldHVybiBmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30oezE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe2Z1bmN0aW9uIEV2ZW50RW1pdHRlcigpe3RoaXMuX2V2ZW50cz10aGlzLl9ldmVudHN8fHt9O3RoaXMuX21heExpc3RlbmVycz10aGlzLl9tYXhMaXN0ZW5lcnN8fHVuZGVmaW5lZH1tb2R1bGUuZXhwb3J0cz1FdmVudEVtaXR0ZXI7RXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlcj1FdmVudEVtaXR0ZXI7RXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzPXVuZGVmaW5lZDtFdmVudEVtaXR0ZXIucHJvdG90eXBlLl9tYXhMaXN0ZW5lcnM9dW5kZWZpbmVkO0V2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzPTEwO0V2ZW50RW1pdHRlci5wcm90b3R5cGUuc2V0TWF4TGlzdGVuZXJzPWZ1bmN0aW9uKG4pe2lmKCFpc051bWJlcihuKXx8bjwwfHxpc05hTihuKSl0aHJvdyBUeXBlRXJyb3IoXCJuIG11c3QgYmUgYSBwb3NpdGl2ZSBudW1iZXJcIik7dGhpcy5fbWF4TGlzdGVuZXJzPW47cmV0dXJuIHRoaXN9O0V2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdD1mdW5jdGlvbih0eXBlKXt2YXIgZXIsaGFuZGxlcixsZW4sYXJncyxpLGxpc3RlbmVycztpZighdGhpcy5fZXZlbnRzKXRoaXMuX2V2ZW50cz17fTtpZih0eXBlPT09XCJlcnJvclwiKXtpZighdGhpcy5fZXZlbnRzLmVycm9yfHxpc09iamVjdCh0aGlzLl9ldmVudHMuZXJyb3IpJiYhdGhpcy5fZXZlbnRzLmVycm9yLmxlbmd0aCl7ZXI9YXJndW1lbnRzWzFdO2lmKGVyIGluc3RhbmNlb2YgRXJyb3Ipe3Rocm93IGVyfWVsc2V7dmFyIGVycj1uZXcgRXJyb3IoJ1VuY2F1Z2h0LCB1bnNwZWNpZmllZCBcImVycm9yXCIgZXZlbnQuICgnK2VyK1wiKVwiKTtlcnIuY29udGV4dD1lcjt0aHJvdyBlcnJ9fX1oYW5kbGVyPXRoaXMuX2V2ZW50c1t0eXBlXTtpZihpc1VuZGVmaW5lZChoYW5kbGVyKSlyZXR1cm4gZmFsc2U7aWYoaXNGdW5jdGlvbihoYW5kbGVyKSl7c3dpdGNoKGFyZ3VtZW50cy5sZW5ndGgpe2Nhc2UgMTpoYW5kbGVyLmNhbGwodGhpcyk7YnJlYWs7Y2FzZSAyOmhhbmRsZXIuY2FsbCh0aGlzLGFyZ3VtZW50c1sxXSk7YnJlYWs7Y2FzZSAzOmhhbmRsZXIuY2FsbCh0aGlzLGFyZ3VtZW50c1sxXSxhcmd1bWVudHNbMl0pO2JyZWFrO2RlZmF1bHQ6YXJncz1BcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsMSk7aGFuZGxlci5hcHBseSh0aGlzLGFyZ3MpfX1lbHNlIGlmKGlzT2JqZWN0KGhhbmRsZXIpKXthcmdzPUFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywxKTtsaXN0ZW5lcnM9aGFuZGxlci5zbGljZSgpO2xlbj1saXN0ZW5lcnMubGVuZ3RoO2ZvcihpPTA7aTxsZW47aSsrKWxpc3RlbmVyc1tpXS5hcHBseSh0aGlzLGFyZ3MpfXJldHVybiB0cnVlfTtFdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyPWZ1bmN0aW9uKHR5cGUsbGlzdGVuZXIpe3ZhciBtO2lmKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSl0aHJvdyBUeXBlRXJyb3IoXCJsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb25cIik7aWYoIXRoaXMuX2V2ZW50cyl0aGlzLl9ldmVudHM9e307aWYodGhpcy5fZXZlbnRzLm5ld0xpc3RlbmVyKXRoaXMuZW1pdChcIm5ld0xpc3RlbmVyXCIsdHlwZSxpc0Z1bmN0aW9uKGxpc3RlbmVyLmxpc3RlbmVyKT9saXN0ZW5lci5saXN0ZW5lcjpsaXN0ZW5lcik7aWYoIXRoaXMuX2V2ZW50c1t0eXBlXSl0aGlzLl9ldmVudHNbdHlwZV09bGlzdGVuZXI7ZWxzZSBpZihpc09iamVjdCh0aGlzLl9ldmVudHNbdHlwZV0pKXRoaXMuX2V2ZW50c1t0eXBlXS5wdXNoKGxpc3RlbmVyKTtlbHNlIHRoaXMuX2V2ZW50c1t0eXBlXT1bdGhpcy5fZXZlbnRzW3R5cGVdLGxpc3RlbmVyXTtpZihpc09iamVjdCh0aGlzLl9ldmVudHNbdHlwZV0pJiYhdGhpcy5fZXZlbnRzW3R5cGVdLndhcm5lZCl7aWYoIWlzVW5kZWZpbmVkKHRoaXMuX21heExpc3RlbmVycykpe209dGhpcy5fbWF4TGlzdGVuZXJzfWVsc2V7bT1FdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVyc31pZihtJiZtPjAmJnRoaXMuX2V2ZW50c1t0eXBlXS5sZW5ndGg+bSl7dGhpcy5fZXZlbnRzW3R5cGVdLndhcm5lZD10cnVlO2NvbnNvbGUuZXJyb3IoXCIobm9kZSkgd2FybmluZzogcG9zc2libGUgRXZlbnRFbWl0dGVyIG1lbW9yeSBcIitcImxlYWsgZGV0ZWN0ZWQuICVkIGxpc3RlbmVycyBhZGRlZC4gXCIrXCJVc2UgZW1pdHRlci5zZXRNYXhMaXN0ZW5lcnMoKSB0byBpbmNyZWFzZSBsaW1pdC5cIix0aGlzLl9ldmVudHNbdHlwZV0ubGVuZ3RoKTtpZih0eXBlb2YgY29uc29sZS50cmFjZT09PVwiZnVuY3Rpb25cIil7Y29uc29sZS50cmFjZSgpfX19cmV0dXJuIHRoaXN9O0V2ZW50RW1pdHRlci5wcm90b3R5cGUub249RXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lcjtFdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2U9ZnVuY3Rpb24odHlwZSxsaXN0ZW5lcil7aWYoIWlzRnVuY3Rpb24obGlzdGVuZXIpKXRocm93IFR5cGVFcnJvcihcImxpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvblwiKTt2YXIgZmlyZWQ9ZmFsc2U7ZnVuY3Rpb24gZygpe3RoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSxnKTtpZighZmlyZWQpe2ZpcmVkPXRydWU7bGlzdGVuZXIuYXBwbHkodGhpcyxhcmd1bWVudHMpfX1nLmxpc3RlbmVyPWxpc3RlbmVyO3RoaXMub24odHlwZSxnKTtyZXR1cm4gdGhpc307RXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lcj1mdW5jdGlvbih0eXBlLGxpc3RlbmVyKXt2YXIgbGlzdCxwb3NpdGlvbixsZW5ndGgsaTtpZighaXNGdW5jdGlvbihsaXN0ZW5lcikpdGhyb3cgVHlwZUVycm9yKFwibGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uXCIpO2lmKCF0aGlzLl9ldmVudHN8fCF0aGlzLl9ldmVudHNbdHlwZV0pcmV0dXJuIHRoaXM7bGlzdD10aGlzLl9ldmVudHNbdHlwZV07bGVuZ3RoPWxpc3QubGVuZ3RoO3Bvc2l0aW9uPS0xO2lmKGxpc3Q9PT1saXN0ZW5lcnx8aXNGdW5jdGlvbihsaXN0Lmxpc3RlbmVyKSYmbGlzdC5saXN0ZW5lcj09PWxpc3RlbmVyKXtkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO2lmKHRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcil0aGlzLmVtaXQoXCJyZW1vdmVMaXN0ZW5lclwiLHR5cGUsbGlzdGVuZXIpfWVsc2UgaWYoaXNPYmplY3QobGlzdCkpe2ZvcihpPWxlbmd0aDtpLS0gPjA7KXtpZihsaXN0W2ldPT09bGlzdGVuZXJ8fGxpc3RbaV0ubGlzdGVuZXImJmxpc3RbaV0ubGlzdGVuZXI9PT1saXN0ZW5lcil7cG9zaXRpb249aTticmVha319aWYocG9zaXRpb248MClyZXR1cm4gdGhpcztpZihsaXN0Lmxlbmd0aD09PTEpe2xpc3QubGVuZ3RoPTA7ZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXX1lbHNle2xpc3Quc3BsaWNlKHBvc2l0aW9uLDEpfWlmKHRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcil0aGlzLmVtaXQoXCJyZW1vdmVMaXN0ZW5lclwiLHR5cGUsbGlzdGVuZXIpfXJldHVybiB0aGlzfTtFdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycz1mdW5jdGlvbih0eXBlKXt2YXIga2V5LGxpc3RlbmVycztpZighdGhpcy5fZXZlbnRzKXJldHVybiB0aGlzO2lmKCF0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpe2lmKGFyZ3VtZW50cy5sZW5ndGg9PT0wKXRoaXMuX2V2ZW50cz17fTtlbHNlIGlmKHRoaXMuX2V2ZW50c1t0eXBlXSlkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO3JldHVybiB0aGlzfWlmKGFyZ3VtZW50cy5sZW5ndGg9PT0wKXtmb3Ioa2V5IGluIHRoaXMuX2V2ZW50cyl7aWYoa2V5PT09XCJyZW1vdmVMaXN0ZW5lclwiKWNvbnRpbnVlO3RoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKGtleSl9dGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoXCJyZW1vdmVMaXN0ZW5lclwiKTt0aGlzLl9ldmVudHM9e307cmV0dXJuIHRoaXN9bGlzdGVuZXJzPXRoaXMuX2V2ZW50c1t0eXBlXTtpZihpc0Z1bmN0aW9uKGxpc3RlbmVycykpe3RoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSxsaXN0ZW5lcnMpfWVsc2UgaWYobGlzdGVuZXJzKXt3aGlsZShsaXN0ZW5lcnMubGVuZ3RoKXRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSxsaXN0ZW5lcnNbbGlzdGVuZXJzLmxlbmd0aC0xXSl9ZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtyZXR1cm4gdGhpc307RXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnM9ZnVuY3Rpb24odHlwZSl7dmFyIHJldDtpZighdGhpcy5fZXZlbnRzfHwhdGhpcy5fZXZlbnRzW3R5cGVdKXJldD1bXTtlbHNlIGlmKGlzRnVuY3Rpb24odGhpcy5fZXZlbnRzW3R5cGVdKSlyZXQ9W3RoaXMuX2V2ZW50c1t0eXBlXV07ZWxzZSByZXQ9dGhpcy5fZXZlbnRzW3R5cGVdLnNsaWNlKCk7cmV0dXJuIHJldH07RXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lckNvdW50PWZ1bmN0aW9uKHR5cGUpe2lmKHRoaXMuX2V2ZW50cyl7dmFyIGV2bGlzdGVuZXI9dGhpcy5fZXZlbnRzW3R5cGVdO2lmKGlzRnVuY3Rpb24oZXZsaXN0ZW5lcikpcmV0dXJuIDE7ZWxzZSBpZihldmxpc3RlbmVyKXJldHVybiBldmxpc3RlbmVyLmxlbmd0aH1yZXR1cm4gMH07RXZlbnRFbWl0dGVyLmxpc3RlbmVyQ291bnQ9ZnVuY3Rpb24oZW1pdHRlcix0eXBlKXtyZXR1cm4gZW1pdHRlci5saXN0ZW5lckNvdW50KHR5cGUpfTtmdW5jdGlvbiBpc0Z1bmN0aW9uKGFyZyl7cmV0dXJuIHR5cGVvZiBhcmc9PT1cImZ1bmN0aW9uXCJ9ZnVuY3Rpb24gaXNOdW1iZXIoYXJnKXtyZXR1cm4gdHlwZW9mIGFyZz09PVwibnVtYmVyXCJ9ZnVuY3Rpb24gaXNPYmplY3QoYXJnKXtyZXR1cm4gdHlwZW9mIGFyZz09PVwib2JqZWN0XCImJmFyZyE9PW51bGx9ZnVuY3Rpb24gaXNVbmRlZmluZWQoYXJnKXtyZXR1cm4gYXJnPT09dm9pZCAwfX0se31dLDI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe3ZhciBVQSxicm93c2VyLG1vZGUscGxhdGZvcm0sdWE7dWE9bmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpO3BsYXRmb3JtPW5hdmlnYXRvci5wbGF0Zm9ybS50b0xvd2VyQ2FzZSgpO1VBPXVhLm1hdGNoKC8ob3BlcmF8aWV8ZmlyZWZveHxjaHJvbWV8dmVyc2lvbilbXFxzXFwvOl0oW1xcd1xcZFxcLl0rKT8uKj8oc2FmYXJpfHZlcnNpb25bXFxzXFwvOl0oW1xcd1xcZFxcLl0rKXwkKS8pfHxbbnVsbCxcInVua25vd25cIiwwXTttb2RlPVVBWzFdPT09XCJpZVwiJiZkb2N1bWVudC5kb2N1bWVudE1vZGU7YnJvd3Nlcj17bmFtZTpVQVsxXT09PVwidmVyc2lvblwiP1VBWzNdOlVBWzFdLHZlcnNpb246bW9kZXx8cGFyc2VGbG9hdChVQVsxXT09PVwib3BlcmFcIiYmVUFbNF0/VUFbNF06VUFbMl0pLHBsYXRmb3JtOntuYW1lOnVhLm1hdGNoKC9pcCg/OmFkfG9kfGhvbmUpLyk/XCJpb3NcIjoodWEubWF0Y2goLyg/OndlYm9zfGFuZHJvaWQpLyl8fHBsYXRmb3JtLm1hdGNoKC9tYWN8d2lufGxpbnV4Lyl8fFtcIm90aGVyXCJdKVswXX19O2Jyb3dzZXJbYnJvd3Nlci5uYW1lXT10cnVlO2Jyb3dzZXJbYnJvd3Nlci5uYW1lK3BhcnNlSW50KGJyb3dzZXIudmVyc2lvbiwxMCldPXRydWU7YnJvd3Nlci5wbGF0Zm9ybVticm93c2VyLnBsYXRmb3JtLm5hbWVdPXRydWU7bW9kdWxlLmV4cG9ydHM9YnJvd3Nlcn0se31dLDM6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe3ZhciBFdmVudEVtaXR0ZXIsR0lGLGJyb3dzZXIsZXh0ZW5kPWZ1bmN0aW9uKGNoaWxkLHBhcmVudCl7Zm9yKHZhciBrZXkgaW4gcGFyZW50KXtpZihoYXNQcm9wLmNhbGwocGFyZW50LGtleSkpY2hpbGRba2V5XT1wYXJlbnRba2V5XX1mdW5jdGlvbiBjdG9yKCl7dGhpcy5jb25zdHJ1Y3Rvcj1jaGlsZH1jdG9yLnByb3RvdHlwZT1wYXJlbnQucHJvdG90eXBlO2NoaWxkLnByb3RvdHlwZT1uZXcgY3RvcjtjaGlsZC5fX3N1cGVyX189cGFyZW50LnByb3RvdHlwZTtyZXR1cm4gY2hpbGR9LGhhc1Byb3A9e30uaGFzT3duUHJvcGVydHksaW5kZXhPZj1bXS5pbmRleE9mfHxmdW5jdGlvbihpdGVtKXtmb3IodmFyIGk9MCxsPXRoaXMubGVuZ3RoO2k8bDtpKyspe2lmKGkgaW4gdGhpcyYmdGhpc1tpXT09PWl0ZW0pcmV0dXJuIGl9cmV0dXJuLTF9LHNsaWNlPVtdLnNsaWNlO0V2ZW50RW1pdHRlcj1yZXF1aXJlKFwiZXZlbnRzXCIpLkV2ZW50RW1pdHRlcjticm93c2VyPXJlcXVpcmUoXCIuL2Jyb3dzZXIuY29mZmVlXCIpO0dJRj1mdW5jdGlvbihzdXBlckNsYXNzKXt2YXIgZGVmYXVsdHMsZnJhbWVEZWZhdWx0cztleHRlbmQoR0lGLHN1cGVyQ2xhc3MpO2RlZmF1bHRzPXt3b3JrZXJTY3JpcHQ6XCJnaWYud29ya2VyLmpzXCIsd29ya2VyczoyLHJlcGVhdDowLGJhY2tncm91bmQ6XCIjZmZmXCIscXVhbGl0eToxMCx3aWR0aDpudWxsLGhlaWdodDpudWxsLHRyYW5zcGFyZW50Om51bGwsZGVidWc6ZmFsc2UsZGl0aGVyOmZhbHNlfTtmcmFtZURlZmF1bHRzPXtkZWxheTo1MDAsY29weTpmYWxzZX07ZnVuY3Rpb24gR0lGKG9wdGlvbnMpe3ZhciBiYXNlLGtleSx2YWx1ZTt0aGlzLnJ1bm5pbmc9ZmFsc2U7dGhpcy5vcHRpb25zPXt9O3RoaXMuZnJhbWVzPVtdO3RoaXMuZnJlZVdvcmtlcnM9W107dGhpcy5hY3RpdmVXb3JrZXJzPVtdO3RoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtmb3Ioa2V5IGluIGRlZmF1bHRzKXt2YWx1ZT1kZWZhdWx0c1trZXldO2lmKChiYXNlPXRoaXMub3B0aW9ucylba2V5XT09bnVsbCl7YmFzZVtrZXldPXZhbHVlfX19R0lGLnByb3RvdHlwZS5zZXRPcHRpb249ZnVuY3Rpb24oa2V5LHZhbHVlKXt0aGlzLm9wdGlvbnNba2V5XT12YWx1ZTtpZih0aGlzLl9jYW52YXMhPW51bGwmJihrZXk9PT1cIndpZHRoXCJ8fGtleT09PVwiaGVpZ2h0XCIpKXtyZXR1cm4gdGhpcy5fY2FudmFzW2tleV09dmFsdWV9fTtHSUYucHJvdG90eXBlLnNldE9wdGlvbnM9ZnVuY3Rpb24ob3B0aW9ucyl7dmFyIGtleSxyZXN1bHRzLHZhbHVlO3Jlc3VsdHM9W107Zm9yKGtleSBpbiBvcHRpb25zKXtpZighaGFzUHJvcC5jYWxsKG9wdGlvbnMsa2V5KSljb250aW51ZTt2YWx1ZT1vcHRpb25zW2tleV07cmVzdWx0cy5wdXNoKHRoaXMuc2V0T3B0aW9uKGtleSx2YWx1ZSkpfXJldHVybiByZXN1bHRzfTtHSUYucHJvdG90eXBlLmFkZEZyYW1lPWZ1bmN0aW9uKGltYWdlLG9wdGlvbnMpe3ZhciBmcmFtZSxrZXk7aWYob3B0aW9ucz09bnVsbCl7b3B0aW9ucz17fX1mcmFtZT17fTtmcmFtZS50cmFuc3BhcmVudD10aGlzLm9wdGlvbnMudHJhbnNwYXJlbnQ7Zm9yKGtleSBpbiBmcmFtZURlZmF1bHRzKXtmcmFtZVtrZXldPW9wdGlvbnNba2V5XXx8ZnJhbWVEZWZhdWx0c1trZXldfWlmKHRoaXMub3B0aW9ucy53aWR0aD09bnVsbCl7dGhpcy5zZXRPcHRpb24oXCJ3aWR0aFwiLGltYWdlLndpZHRoKX1pZih0aGlzLm9wdGlvbnMuaGVpZ2h0PT1udWxsKXt0aGlzLnNldE9wdGlvbihcImhlaWdodFwiLGltYWdlLmhlaWdodCl9aWYodHlwZW9mIEltYWdlRGF0YSE9PVwidW5kZWZpbmVkXCImJkltYWdlRGF0YSE9PW51bGwmJmltYWdlIGluc3RhbmNlb2YgSW1hZ2VEYXRhKXtmcmFtZS5kYXRhPWltYWdlLmRhdGF9ZWxzZSBpZih0eXBlb2YgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEIT09XCJ1bmRlZmluZWRcIiYmQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEIT09bnVsbCYmaW1hZ2UgaW5zdGFuY2VvZiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkR8fHR5cGVvZiBXZWJHTFJlbmRlcmluZ0NvbnRleHQhPT1cInVuZGVmaW5lZFwiJiZXZWJHTFJlbmRlcmluZ0NvbnRleHQhPT1udWxsJiZpbWFnZSBpbnN0YW5jZW9mIFdlYkdMUmVuZGVyaW5nQ29udGV4dCl7aWYob3B0aW9ucy5jb3B5KXtmcmFtZS5kYXRhPXRoaXMuZ2V0Q29udGV4dERhdGEoaW1hZ2UpfWVsc2V7ZnJhbWUuY29udGV4dD1pbWFnZX19ZWxzZSBpZihpbWFnZS5jaGlsZE5vZGVzIT1udWxsKXtpZihvcHRpb25zLmNvcHkpe2ZyYW1lLmRhdGE9dGhpcy5nZXRJbWFnZURhdGEoaW1hZ2UpfWVsc2V7ZnJhbWUuaW1hZ2U9aW1hZ2V9fWVsc2V7dGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBpbWFnZVwiKX1yZXR1cm4gdGhpcy5mcmFtZXMucHVzaChmcmFtZSl9O0dJRi5wcm90b3R5cGUucmVuZGVyPWZ1bmN0aW9uKCl7dmFyIGksaixudW1Xb3JrZXJzLHJlZjtpZih0aGlzLnJ1bm5pbmcpe3Rocm93IG5ldyBFcnJvcihcIkFscmVhZHkgcnVubmluZ1wiKX1pZih0aGlzLm9wdGlvbnMud2lkdGg9PW51bGx8fHRoaXMub3B0aW9ucy5oZWlnaHQ9PW51bGwpe3Rocm93IG5ldyBFcnJvcihcIldpZHRoIGFuZCBoZWlnaHQgbXVzdCBiZSBzZXQgcHJpb3IgdG8gcmVuZGVyaW5nXCIpfXRoaXMucnVubmluZz10cnVlO3RoaXMubmV4dEZyYW1lPTA7dGhpcy5maW5pc2hlZEZyYW1lcz0wO3RoaXMuaW1hZ2VQYXJ0cz1mdW5jdGlvbigpe3ZhciBqLHJlZixyZXN1bHRzO3Jlc3VsdHM9W107Zm9yKGk9aj0wLHJlZj10aGlzLmZyYW1lcy5sZW5ndGg7MDw9cmVmP2o8cmVmOmo+cmVmO2k9MDw9cmVmPysrajotLWope3Jlc3VsdHMucHVzaChudWxsKX1yZXR1cm4gcmVzdWx0c30uY2FsbCh0aGlzKTtudW1Xb3JrZXJzPXRoaXMuc3Bhd25Xb3JrZXJzKCk7aWYodGhpcy5vcHRpb25zLmdsb2JhbFBhbGV0dGU9PT10cnVlKXt0aGlzLnJlbmRlck5leHRGcmFtZSgpfWVsc2V7Zm9yKGk9aj0wLHJlZj1udW1Xb3JrZXJzOzA8PXJlZj9qPHJlZjpqPnJlZjtpPTA8PXJlZj8rK2o6LS1qKXt0aGlzLnJlbmRlck5leHRGcmFtZSgpfX10aGlzLmVtaXQoXCJzdGFydFwiKTtyZXR1cm4gdGhpcy5lbWl0KFwicHJvZ3Jlc3NcIiwwKX07R0lGLnByb3RvdHlwZS5hYm9ydD1mdW5jdGlvbigpe3ZhciB3b3JrZXI7d2hpbGUodHJ1ZSl7d29ya2VyPXRoaXMuYWN0aXZlV29ya2Vycy5zaGlmdCgpO2lmKHdvcmtlcj09bnVsbCl7YnJlYWt9dGhpcy5sb2coXCJraWxsaW5nIGFjdGl2ZSB3b3JrZXJcIik7d29ya2VyLnRlcm1pbmF0ZSgpfXRoaXMucnVubmluZz1mYWxzZTtyZXR1cm4gdGhpcy5lbWl0KFwiYWJvcnRcIil9O0dJRi5wcm90b3R5cGUuc3Bhd25Xb3JrZXJzPWZ1bmN0aW9uKCl7dmFyIGosbnVtV29ya2VycyxyZWYscmVzdWx0cztudW1Xb3JrZXJzPU1hdGgubWluKHRoaXMub3B0aW9ucy53b3JrZXJzLHRoaXMuZnJhbWVzLmxlbmd0aCk7KGZ1bmN0aW9uKCl7cmVzdWx0cz1bXTtmb3IodmFyIGo9cmVmPXRoaXMuZnJlZVdvcmtlcnMubGVuZ3RoO3JlZjw9bnVtV29ya2Vycz9qPG51bVdvcmtlcnM6aj5udW1Xb3JrZXJzO3JlZjw9bnVtV29ya2Vycz9qKys6ai0tKXtyZXN1bHRzLnB1c2goail9cmV0dXJuIHJlc3VsdHN9KS5hcHBseSh0aGlzKS5mb3JFYWNoKGZ1bmN0aW9uKF90aGlzKXtyZXR1cm4gZnVuY3Rpb24oaSl7dmFyIHdvcmtlcjtfdGhpcy5sb2coXCJzcGF3bmluZyB3b3JrZXIgXCIraSk7d29ya2VyPW5ldyBXb3JrZXIoX3RoaXMub3B0aW9ucy53b3JrZXJTY3JpcHQpO3dvcmtlci5vbm1lc3NhZ2U9ZnVuY3Rpb24oZXZlbnQpe190aGlzLmFjdGl2ZVdvcmtlcnMuc3BsaWNlKF90aGlzLmFjdGl2ZVdvcmtlcnMuaW5kZXhPZih3b3JrZXIpLDEpO190aGlzLmZyZWVXb3JrZXJzLnB1c2god29ya2VyKTtyZXR1cm4gX3RoaXMuZnJhbWVGaW5pc2hlZChldmVudC5kYXRhKX07cmV0dXJuIF90aGlzLmZyZWVXb3JrZXJzLnB1c2god29ya2VyKX19KHRoaXMpKTtyZXR1cm4gbnVtV29ya2Vyc307R0lGLnByb3RvdHlwZS5mcmFtZUZpbmlzaGVkPWZ1bmN0aW9uKGZyYW1lKXt2YXIgaSxqLHJlZjt0aGlzLmxvZyhcImZyYW1lIFwiK2ZyYW1lLmluZGV4K1wiIGZpbmlzaGVkIC0gXCIrdGhpcy5hY3RpdmVXb3JrZXJzLmxlbmd0aCtcIiBhY3RpdmVcIik7dGhpcy5maW5pc2hlZEZyYW1lcysrO3RoaXMuZW1pdChcInByb2dyZXNzXCIsdGhpcy5maW5pc2hlZEZyYW1lcy90aGlzLmZyYW1lcy5sZW5ndGgpO3RoaXMuaW1hZ2VQYXJ0c1tmcmFtZS5pbmRleF09ZnJhbWU7aWYodGhpcy5vcHRpb25zLmdsb2JhbFBhbGV0dGU9PT10cnVlKXt0aGlzLm9wdGlvbnMuZ2xvYmFsUGFsZXR0ZT1mcmFtZS5nbG9iYWxQYWxldHRlO3RoaXMubG9nKFwiZ2xvYmFsIHBhbGV0dGUgYW5hbHl6ZWRcIik7aWYodGhpcy5mcmFtZXMubGVuZ3RoPjIpe2ZvcihpPWo9MSxyZWY9dGhpcy5mcmVlV29ya2Vycy5sZW5ndGg7MTw9cmVmP2o8cmVmOmo+cmVmO2k9MTw9cmVmPysrajotLWope3RoaXMucmVuZGVyTmV4dEZyYW1lKCl9fX1pZihpbmRleE9mLmNhbGwodGhpcy5pbWFnZVBhcnRzLG51bGwpPj0wKXtyZXR1cm4gdGhpcy5yZW5kZXJOZXh0RnJhbWUoKX1lbHNle3JldHVybiB0aGlzLmZpbmlzaFJlbmRlcmluZygpfX07R0lGLnByb3RvdHlwZS5maW5pc2hSZW5kZXJpbmc9ZnVuY3Rpb24oKXt2YXIgZGF0YSxmcmFtZSxpLGltYWdlLGosayxsLGxlbixsZW4xLGxlbjIsbGVuMyxvZmZzZXQscGFnZSxyZWYscmVmMSxyZWYyO2xlbj0wO3JlZj10aGlzLmltYWdlUGFydHM7Zm9yKGo9MCxsZW4xPXJlZi5sZW5ndGg7ajxsZW4xO2orKyl7ZnJhbWU9cmVmW2pdO2xlbis9KGZyYW1lLmRhdGEubGVuZ3RoLTEpKmZyYW1lLnBhZ2VTaXplK2ZyYW1lLmN1cnNvcn1sZW4rPWZyYW1lLnBhZ2VTaXplLWZyYW1lLmN1cnNvcjt0aGlzLmxvZyhcInJlbmRlcmluZyBmaW5pc2hlZCAtIGZpbGVzaXplIFwiK01hdGgucm91bmQobGVuLzFlMykrXCJrYlwiKTtkYXRhPW5ldyBVaW50OEFycmF5KGxlbik7b2Zmc2V0PTA7cmVmMT10aGlzLmltYWdlUGFydHM7Zm9yKGs9MCxsZW4yPXJlZjEubGVuZ3RoO2s8bGVuMjtrKyspe2ZyYW1lPXJlZjFba107cmVmMj1mcmFtZS5kYXRhO2ZvcihpPWw9MCxsZW4zPXJlZjIubGVuZ3RoO2w8bGVuMztpPSsrbCl7cGFnZT1yZWYyW2ldO2RhdGEuc2V0KHBhZ2Usb2Zmc2V0KTtpZihpPT09ZnJhbWUuZGF0YS5sZW5ndGgtMSl7b2Zmc2V0Kz1mcmFtZS5jdXJzb3J9ZWxzZXtvZmZzZXQrPWZyYW1lLnBhZ2VTaXplfX19aW1hZ2U9bmV3IEJsb2IoW2RhdGFdLHt0eXBlOlwiaW1hZ2UvZ2lmXCJ9KTtyZXR1cm4gdGhpcy5lbWl0KFwiZmluaXNoZWRcIixpbWFnZSxkYXRhKX07R0lGLnByb3RvdHlwZS5yZW5kZXJOZXh0RnJhbWU9ZnVuY3Rpb24oKXt2YXIgZnJhbWUsdGFzayx3b3JrZXI7aWYodGhpcy5mcmVlV29ya2Vycy5sZW5ndGg9PT0wKXt0aHJvdyBuZXcgRXJyb3IoXCJObyBmcmVlIHdvcmtlcnNcIil9aWYodGhpcy5uZXh0RnJhbWU+PXRoaXMuZnJhbWVzLmxlbmd0aCl7cmV0dXJufWZyYW1lPXRoaXMuZnJhbWVzW3RoaXMubmV4dEZyYW1lKytdO3dvcmtlcj10aGlzLmZyZWVXb3JrZXJzLnNoaWZ0KCk7dGFzaz10aGlzLmdldFRhc2soZnJhbWUpO3RoaXMubG9nKFwic3RhcnRpbmcgZnJhbWUgXCIrKHRhc2suaW5kZXgrMSkrXCIgb2YgXCIrdGhpcy5mcmFtZXMubGVuZ3RoKTt0aGlzLmFjdGl2ZVdvcmtlcnMucHVzaCh3b3JrZXIpO3JldHVybiB3b3JrZXIucG9zdE1lc3NhZ2UodGFzayl9O0dJRi5wcm90b3R5cGUuZ2V0Q29udGV4dERhdGE9ZnVuY3Rpb24oY3R4KXtyZXR1cm4gY3R4LmdldEltYWdlRGF0YSgwLDAsdGhpcy5vcHRpb25zLndpZHRoLHRoaXMub3B0aW9ucy5oZWlnaHQpLmRhdGF9O0dJRi5wcm90b3R5cGUuZ2V0SW1hZ2VEYXRhPWZ1bmN0aW9uKGltYWdlKXt2YXIgY3R4O2lmKHRoaXMuX2NhbnZhcz09bnVsbCl7dGhpcy5fY2FudmFzPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7dGhpcy5fY2FudmFzLndpZHRoPXRoaXMub3B0aW9ucy53aWR0aDt0aGlzLl9jYW52YXMuaGVpZ2h0PXRoaXMub3B0aW9ucy5oZWlnaHR9Y3R4PXRoaXMuX2NhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7Y3R4LnNldEZpbGw9dGhpcy5vcHRpb25zLmJhY2tncm91bmQ7Y3R4LmZpbGxSZWN0KDAsMCx0aGlzLm9wdGlvbnMud2lkdGgsdGhpcy5vcHRpb25zLmhlaWdodCk7Y3R4LmRyYXdJbWFnZShpbWFnZSwwLDApO3JldHVybiB0aGlzLmdldENvbnRleHREYXRhKGN0eCl9O0dJRi5wcm90b3R5cGUuZ2V0VGFzaz1mdW5jdGlvbihmcmFtZSl7dmFyIGluZGV4LHRhc2s7aW5kZXg9dGhpcy5mcmFtZXMuaW5kZXhPZihmcmFtZSk7dGFzaz17aW5kZXg6aW5kZXgsbGFzdDppbmRleD09PXRoaXMuZnJhbWVzLmxlbmd0aC0xLGRlbGF5OmZyYW1lLmRlbGF5LHRyYW5zcGFyZW50OmZyYW1lLnRyYW5zcGFyZW50LHdpZHRoOnRoaXMub3B0aW9ucy53aWR0aCxoZWlnaHQ6dGhpcy5vcHRpb25zLmhlaWdodCxxdWFsaXR5OnRoaXMub3B0aW9ucy5xdWFsaXR5LGRpdGhlcjp0aGlzLm9wdGlvbnMuZGl0aGVyLGdsb2JhbFBhbGV0dGU6dGhpcy5vcHRpb25zLmdsb2JhbFBhbGV0dGUscmVwZWF0OnRoaXMub3B0aW9ucy5yZXBlYXQsY2FuVHJhbnNmZXI6YnJvd3Nlci5uYW1lPT09XCJjaHJvbWVcIn07aWYoZnJhbWUuZGF0YSE9bnVsbCl7dGFzay5kYXRhPWZyYW1lLmRhdGF9ZWxzZSBpZihmcmFtZS5jb250ZXh0IT1udWxsKXt0YXNrLmRhdGE9dGhpcy5nZXRDb250ZXh0RGF0YShmcmFtZS5jb250ZXh0KX1lbHNlIGlmKGZyYW1lLmltYWdlIT1udWxsKXt0YXNrLmRhdGE9dGhpcy5nZXRJbWFnZURhdGEoZnJhbWUuaW1hZ2UpfWVsc2V7dGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBmcmFtZVwiKX1yZXR1cm4gdGFza307R0lGLnByb3RvdHlwZS5sb2c9ZnVuY3Rpb24oKXt2YXIgYXJnczthcmdzPTE8PWFyZ3VtZW50cy5sZW5ndGg/c2xpY2UuY2FsbChhcmd1bWVudHMsMCk6W107aWYoIXRoaXMub3B0aW9ucy5kZWJ1Zyl7cmV0dXJufXJldHVybiBjb25zb2xlLmxvZy5hcHBseShjb25zb2xlLGFyZ3MpfTtyZXR1cm4gR0lGfShFdmVudEVtaXR0ZXIpO21vZHVsZS5leHBvcnRzPUdJRn0se1wiLi9icm93c2VyLmNvZmZlZVwiOjIsZXZlbnRzOjF9XX0se30sWzNdKSgzKX0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Z2lmLmpzLm1hcFxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG5ldyBXb3JrZXIoX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImI5MDY5MjhlNzZkMTEwN2ZlNGFkLndvcmtlci5qc1wiKTtcbn07IiwiaW1wb3J0IHsgUXVhZFdvcmtlckRhdGFNZXNzYWdlIH0gZnJvbSAnLi9zY2hlbWEnO1xuaW1wb3J0IHsgbG9hZEltYWdlLCBnZXRJbWFnZURhdGFPZmZTY3JlZW4sIHRvR2lmIH0gZnJvbSAnLi91dGlsJztcbmltcG9ydCBRdWFkV29ya2VyIGZyb20gJ3dvcmtlci1sb2FkZXIhLi9xdWFkLndvcmtlcic7XG5cbmxldCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xubGV0IGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcbmxldCBpbWFnZUlucHV0OiBIVE1MSW5wdXRFbGVtZW50O1xubGV0IGV4cG9ydEdpZkJ1dHRvbjogSFRNTEJ1dHRvbkVsZW1lbnQ7XG5sZXQgcXVhZFdvcmtlcjogUXVhZFdvcmtlcjtcbmNvbnN0IGZyYW1lczogSW1hZ2VEYXRhW10gPSBbXTtcbmxldCBvZmZsaW5lQW5pbWF0ZUlkOiBudW1iZXI7XG5cbmZ1bmN0aW9uIGRyYXcoaW1hZ2VEYXRhOiBJbWFnZURhdGEpIHtcbiAgICBjb250ZXh0LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgIGNvbnRleHQucHV0SW1hZ2VEYXRhKGltYWdlRGF0YSwgMCwgMCk7XG59XG5cbmZ1bmN0aW9uIG9mZmxpbmVBbmltYXRlKG9mZmxpbmVGcmFtZXM6IEltYWdlRGF0YVtdLCBhbmltYXRlSW5kZXg6IG51bWJlciA9IDAsIGN1cnJGcmFtZUluZGV4OiBudW1iZXIgPSAwLCBudW1GcmFtZXNFYWNoOiBudW1iZXIgPSAyMCk6IHZvaWQge1xuICAgIGxldCBuZXh0RnJhbWVJbmRleDogbnVtYmVyID0gY3VyckZyYW1lSW5kZXggKyAxO1xuICAgIGxldCBuZXh0QW5pbWF0ZUluZGV4OiBudW1iZXIgPSBhbmltYXRlSW5kZXg7XG5cbiAgICBpZiAobmV4dEZyYW1lSW5kZXggPiBudW1GcmFtZXNFYWNoKSB7XG4gICAgICAgIG5leHRBbmltYXRlSW5kZXggPSBhbmltYXRlSW5kZXggKyAxID49IG9mZmxpbmVGcmFtZXMubGVuZ3RoID8gMCA6IGFuaW1hdGVJbmRleCArIDE7XG4gICAgICAgIG5leHRGcmFtZUluZGV4ID0gMDtcbiAgICB9XG5cbiAgICBvZmZsaW5lQW5pbWF0ZUlkID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiBvZmZsaW5lQW5pbWF0ZShvZmZsaW5lRnJhbWVzLCBuZXh0QW5pbWF0ZUluZGV4LCBuZXh0RnJhbWVJbmRleCwgbnVtRnJhbWVzRWFjaCkpO1xuXG4gICAgZHJhdyhvZmZsaW5lRnJhbWVzW25leHRBbmltYXRlSW5kZXhdKTtcbn1cblxuZnVuY3Rpb24gcHJvY2Vzc0ltYWdlKGltYWdlRmlsZTogRmlsZSk6IHZvaWQge1xuICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZShvZmZsaW5lQW5pbWF0ZUlkKTtcblxuICAgIGxvYWRJbWFnZShpbWFnZUZpbGUpXG4gICAgICAgIC50aGVuKGltYWdlRWxlbSA9PiBnZXRJbWFnZURhdGFPZmZTY3JlZW4oaW1hZ2VFbGVtLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpKVxuICAgICAgICAudGhlbigoaW1hZ2VEYXRhOiBJbWFnZURhdGEpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2U6IFF1YWRXb3JrZXJEYXRhTWVzc2FnZSA9IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnbmV3LWltYWdlJyxcbiAgICAgICAgICAgICAgICBkYXRhOiBpbWFnZURhdGFcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBxdWFkV29ya2VyLnBvc3RNZXNzYWdlKG1lc3NhZ2UpO1xuICAgICAgICB9KTtcbn1cblxuZnVuY3Rpb24gb25JbWFnZUNoYW5nZShldmVudDogRXZlbnQpIHtcbiAgICBjb25zdCBpbWFnZUlucHV0OiBIVE1MSW5wdXRFbGVtZW50ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgaWYgKCFpbWFnZUlucHV0IHx8XG4gICAgICAgICFpbWFnZUlucHV0LmZpbGVzIHx8XG4gICAgICAgICFpbWFnZUlucHV0LmZpbGVzLmxlbmd0aCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGZpcnN0SW1hZ2UgPSBpbWFnZUlucHV0LmZpbGVzWzBdO1xuICAgIHByb2Nlc3NJbWFnZShmaXJzdEltYWdlKTtcbn1cblxuZnVuY3Rpb24gcmVzaXplQ2FudmFzKCkge1xuICAgIGNvbnN0IGNvbXB1dGVkU3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShjYW52YXMpO1xuICAgIGNvbnN0IHdpZHRoID0gcGFyc2VJbnQoY29tcHV0ZWRTdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKCd3aWR0aCcpLCAxMCk7XG4gICAgY29uc3QgaGVpZ2h0ID0gcGFyc2VJbnQoY29tcHV0ZWRTdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKCdoZWlnaHQnKSwgMTApO1xuICAgIGNhbnZhcy53aWR0aCA9IHdpZHRoO1xuICAgIGNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XG59XG5cbmZ1bmN0aW9uIG9uV29ya2VyTWVzc2FnZShldmVudDogTWVzc2FnZUV2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgbWVzc2FnZTogUXVhZFdvcmtlckRhdGFNZXNzYWdlID0gZXZlbnQuZGF0YTtcbiAgICBzd2l0Y2ggKG1lc3NhZ2UudHlwZSkge1xuICAgICAgICBjYXNlICdkcmF3JzpcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLmRhdGEpIHtcbiAgICAgICAgICAgICAgICBmcmFtZXMucHVzaChtZXNzYWdlLmRhdGEpO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGltZXN0YW1wID0+IGRyYXcobWVzc2FnZS5kYXRhKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdwcm9jZXNzZWQnOlxuICAgICAgICAgICAgb2ZmbGluZUFuaW1hdGVJZCA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gb2ZmbGluZUFuaW1hdGUoZnJhbWVzKSk7XG4gICAgICAgICAgICBleHBvcnRHaWZCdXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgVW5rbm93biBtZXNzYWdlIHR5cGU6ICR7bWVzc2FnZX1gKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIG1haW4oKSB7XG4gICAgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhcycpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuICAgIGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKSBhcyBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gICAgaW1hZ2VJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbWFnZS1pbnB1dCcpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG5cbiAgICBpbWFnZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIG9uSW1hZ2VDaGFuZ2UpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCByZXNpemVDYW52YXMpO1xuXG4gICAgLy8gV2ViIHdvcmtlciBsb2dpY1xuICAgIHF1YWRXb3JrZXIgPSBuZXcgUXVhZFdvcmtlcigpO1xuICAgIHF1YWRXb3JrZXIuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIG9uV29ya2VyTWVzc2FnZSk7XG5cbiAgICAvLyBleHBvcnQgbG9naWNcbiAgICBleHBvcnRHaWZCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXhwb3J0LWdpZicpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xuICAgIGV4cG9ydEdpZkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgdG9HaWYoZnJhbWVzKTtcbiAgICB9KTtcblxuICAgIC8vIHNpemUgY2FudmFzXG4gICAgcmVzaXplQ2FudmFzKCk7XG59XG5cbm1haW4oKTsiLCJpbXBvcnQgeyBQaXhlbCwgQ29sb3IgfSBmcm9tICcuL3NjaGVtYSc7XG5pbXBvcnQgR0lGIGZyb20gJ2dpZi5qcyc7XG5cbmV4cG9ydCBjb25zdCBQSVhFTF9XSURUSDogbnVtYmVyID0gNDtcbmV4cG9ydCBjb25zdCBXSElURV9DT0xPUjogQ29sb3IgPSB7XG4gICAgcjogMjU1LFxuICAgIGc6IDI1NSxcbiAgICBiOiAyNTUsXG4gICAgYTogMjU1LFxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRJbWFnZShpbWFnZUZpbGU6IEZpbGUpOiBQcm9taXNlPEhUTUxJbWFnZUVsZW1lbnQ+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBjb25zdCBpbWFnZUZpbGVEYXRhVXJsID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoaW1hZ2VGaWxlKTtcbiAgICAgICAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcblxuICAgICAgICBpbWFnZS5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgICB3aW5kb3cuVVJMLnJldm9rZU9iamVjdFVSTChpbWFnZUZpbGVEYXRhVXJsKTtcbiAgICAgICAgICAgIHJlc29sdmUoaW1hZ2UpXG4gICAgICAgIH07XG4gICAgICAgIGltYWdlLm9uZXJyb3IgPSAoZXJyKSA9PiB7XG4gICAgICAgICAgICB3aW5kb3cuVVJMLnJldm9rZU9iamVjdFVSTChpbWFnZUZpbGVEYXRhVXJsKTtcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9O1xuICAgICAgICBpbWFnZS5zcmMgPSBpbWFnZUZpbGVEYXRhVXJsO1xuICAgIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0QXZlcmFnZUNvbG9yKHBpeGVsczogUGl4ZWxbXSk6IENvbG9yIHtcbiAgICBsZXQgc3F1YXJlZFN1bVI6IG51bWJlcjtcbiAgICBsZXQgc3F1YXJlZFN1bUc6IG51bWJlcjtcbiAgICBsZXQgc3F1YXJlZFN1bUI6IG51bWJlcjtcbiAgICBsZXQgc3F1YXJlZFN1bUE6IG51bWJlcjtcbiAgICBsZXQgYXZlcmFnZUNvbG9yOiBDb2xvciA9IHBpeGVsc1swXSB8fCBXSElURV9DT0xPUjtcblxuICAgIGlmIChwaXhlbHMubGVuZ3RoID4gMSkge1xuICAgICAgICByZXR1cm4gcGl4ZWxzLnNsaWNlKDEpXG4gICAgICAgICAgICAucmVkdWNlKChwcmV2QXZlcmFnZTogQ29sb3IsIGN1cnJQaXhlbDogUGl4ZWwpID0+IHtcbiAgICAgICAgICAgICAgICBzcXVhcmVkU3VtUiA9IE1hdGgucG93KHByZXZBdmVyYWdlLnIsIDIpICsgTWF0aC5wb3coY3VyclBpeGVsLnIsIDIpO1xuICAgICAgICAgICAgICAgIHNxdWFyZWRTdW1HID0gTWF0aC5wb3cocHJldkF2ZXJhZ2UuZywgMikgKyBNYXRoLnBvdyhjdXJyUGl4ZWwuZywgMik7XG4gICAgICAgICAgICAgICAgc3F1YXJlZFN1bUIgPSBNYXRoLnBvdyhwcmV2QXZlcmFnZS5iLCAyKSArIE1hdGgucG93KGN1cnJQaXhlbC5iLCAyKTtcbiAgICAgICAgICAgICAgICBzcXVhcmVkU3VtQSA9IE1hdGgucG93KHByZXZBdmVyYWdlLmEsIDIpICsgTWF0aC5wb3coY3VyclBpeGVsLmEsIDIpO1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHI6IE1hdGguc3FydChzcXVhcmVkU3VtUiAvIDIpLFxuICAgICAgICAgICAgICAgICAgICBnOiBNYXRoLnNxcnQoc3F1YXJlZFN1bUcgLyAyKSxcbiAgICAgICAgICAgICAgICAgICAgYjogTWF0aC5zcXJ0KHNxdWFyZWRTdW1CIC8gMiksXG4gICAgICAgICAgICAgICAgICAgIGE6IE1hdGguc3FydChzcXVhcmVkU3VtQSAvIDIpLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9LCBhdmVyYWdlQ29sb3IpO1xuICAgIH1cblxuICAgIHJldHVybiBhdmVyYWdlQ29sb3I7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVBpeGVsKHg6IG51bWJlciwgeTogbnVtYmVyLCByOiBudW1iZXIsIGc6IG51bWJlciwgYjogbnVtYmVyLCBhOiBudW1iZXIpOiBQaXhlbCB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgeCxcbiAgICAgICAgeSxcbiAgICAgICAgcixcbiAgICAgICAgZyxcbiAgICAgICAgYixcbiAgICAgICAgYSxcbiAgICAgICAgZ2V0Qm91bmRzKCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB4OiB0aGlzLngsXG4gICAgICAgICAgICAgICAgeTogdGhpcy55LFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVBpeGVscyhpbWFnZURhdGE6IEltYWdlRGF0YSk6IFBpeGVsW10ge1xuICAgIGxldCBwaXhlbHM6IFBpeGVsW10gPSBbXTtcbiAgICBwcm9jZXNzSW1hZ2VEYXRhKGltYWdlRGF0YSwgcGl4ZWwgPT4gcGl4ZWxzLnB1c2gocGl4ZWwpKTtcbiAgICByZXR1cm4gcGl4ZWxzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmlsbFBpeGVsSW5JbWFnZURhdGEoaW1hZ2VEYXRhOiBJbWFnZURhdGEsIHBpeGVsOiBQaXhlbCk6IHZvaWQge1xuICAgIGNvbnN0IHBpeGVsT2Zmc2V0OiBudW1iZXIgPSAocGl4ZWwueCArIHBpeGVsLnkgKiBpbWFnZURhdGEud2lkdGgpICogUElYRUxfV0lEVEg7XG4gICAgaWYgKHBpeGVsT2Zmc2V0IDwgMCB8fCBwaXhlbE9mZnNldCArIFBJWEVMX1dJRFRIID49IGltYWdlRGF0YS5kYXRhLmxlbmd0aCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGltYWdlRGF0YS5kYXRhW3BpeGVsT2Zmc2V0XSA9IHBpeGVsLnI7XG4gICAgaW1hZ2VEYXRhLmRhdGFbcGl4ZWxPZmZzZXQgKyAxXSA9IHBpeGVsLmc7XG4gICAgaW1hZ2VEYXRhLmRhdGFbcGl4ZWxPZmZzZXQgKyAyXSA9IHBpeGVsLmI7XG4gICAgaW1hZ2VEYXRhLmRhdGFbcGl4ZWxPZmZzZXQgKyAzXSA9IHBpeGVsLmE7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRJbWFnZURhdGFPZmZTY3JlZW4oaW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKTogSW1hZ2VEYXRhIHtcbiAgICBjb25zdCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgY29uc3QgY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEID0gY2FudmFzLmdldENvbnRleHQoJzJkJykgYXMgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuXG4gICAgY2FudmFzLndpZHRoID0gd2lkdGg7XG4gICAgY2FudmFzLmhlaWdodCA9IGhlaWdodDtcblxuICAgIGNvbnRleHQuZHJhd0ltYWdlKGltYWdlLCAwLCAwLCBpbWFnZS53aWR0aCwgaW1hZ2UuaGVpZ2h0LCAwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuXG4gICAgY29uc3QgaW1hZ2VEYXRhOiBJbWFnZURhdGEgPSBjb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgIHJldHVybiBpbWFnZURhdGE7XG59XG5cbmZ1bmN0aW9uIHByb2Nlc3NJbWFnZURhdGEoaW1hZ2VEYXRhOiBJbWFnZURhdGEsIHByb2Nlc3NGdW5jOiAocGl4ZWw6IFBpeGVsKSA9PiB2b2lkLCBpbml0UGl4ZWxYOiBudW1iZXIgPSAwLCBpbml0UGl4ZWxZOiBudW1iZXIgPSAwKTogdm9pZCB7XG4gICAgbGV0IHI6IG51bWJlcjtcbiAgICBsZXQgZzogbnVtYmVyO1xuICAgIGxldCBiOiBudW1iZXI7XG4gICAgbGV0IGE6IG51bWJlcjtcbiAgICBsZXQgb2Zmc2V0WDogbnVtYmVyO1xuICAgIGxldCBvZmZzZXRZOiBudW1iZXI7XG4gICAgbGV0IHBpeGVsOiBQaXhlbDtcblxuICAgIGZvciAobGV0IHggPSBpbml0UGl4ZWxYOyB4IDwgaW1hZ2VEYXRhLndpZHRoOyB4KyspIHtcbiAgICAgICAgb2Zmc2V0WCA9IHggKiBQSVhFTF9XSURUSDtcblxuICAgICAgICBmb3IgKGxldCB5ID0gaW5pdFBpeGVsWTsgeSA8IGltYWdlRGF0YS5oZWlnaHQ7IHkrKykge1xuICAgICAgICAgICAgb2Zmc2V0WSA9IGltYWdlRGF0YS53aWR0aCAqIHkgKiBQSVhFTF9XSURUSDtcblxuICAgICAgICAgICAgciA9IGltYWdlRGF0YS5kYXRhW29mZnNldFggKyBvZmZzZXRZXTtcbiAgICAgICAgICAgIGcgPSBpbWFnZURhdGEuZGF0YVtvZmZzZXRYICsgb2Zmc2V0WSArIDFdO1xuICAgICAgICAgICAgYiA9IGltYWdlRGF0YS5kYXRhW29mZnNldFggKyBvZmZzZXRZICsgMl07XG4gICAgICAgICAgICBhID0gaW1hZ2VEYXRhLmRhdGFbb2Zmc2V0WCArIG9mZnNldFkgKyAzXTtcblxuICAgICAgICAgICAgcGl4ZWwgPSBjcmVhdGVQaXhlbCh4LCB5LCByLCBnLCBiLCBhKTtcbiAgICAgICAgICAgIHByb2Nlc3NGdW5jKHBpeGVsKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvR2lmKGltYWdlRnJhbWVzOiBJbWFnZURhdGFbXSk6IHZvaWQge1xuICAgIGNvbnN0IGdpZiA9IG5ldyBHSUYoe1xuICAgICAgICB3b3JrZXJzOiAyLFxuICAgICAgICBxdWFsaXR5OiAxMFxuICAgIH0pO1xuXG4gICAgaW1hZ2VGcmFtZXNcbiAgICAgICAgLmZvckVhY2goaW1hZ2VGcmFtZSA9PiBnaWYuYWRkRnJhbWUoaW1hZ2VGcmFtZSwge1xuICAgICAgICAgICAgZGVsYXk6IDIwMCxcbiAgICAgICAgfSkpO1xuXG4gICAgZ2lmLm9uKCdmaW5pc2hlZCcsIChibG9iOiBhbnkpID0+IHtcbiAgICAgICAgc2F2ZUJsb2IoJ3NpbXBsZXF1YWQuZXhwb3J0LmdpZicsIGJsb2IpO1xuICAgIH0pO1xuXG4gICAgZ2lmLnJlbmRlcigpO1xufVxuXG5mdW5jdGlvbiBzYXZlQmxvYihmaWxlTmFtZTogc3RyaW5nLCBibG9iOiBCbG9iKSB7XG4gICAgY29uc3QgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICAgIGNvbnN0IHVybCA9IHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuXG4gICAgYS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgYS5ocmVmID0gdXJsO1xuICAgIGEuZG93bmxvYWQgPSBmaWxlTmFtZTtcbiAgICBcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGEpO1xuICAgIGEuY2xpY2soKTtcblxuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoYSk7XG4gICAgd2luZG93LlVSTC5yZXZva2VPYmplY3RVUkwodXJsKTtcbn0iXSwic291cmNlUm9vdCI6IiJ9