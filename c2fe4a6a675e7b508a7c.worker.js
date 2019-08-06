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
      return Object(_util__WEBPACK_IMPORTED_MODULE_1__["fillPixelInImageData"])(imageData, {
        x: pixel.x,
        y: pixel.y,
        r: averageColor.r,
        g: averageColor.g,
        b: averageColor.b,
        a: averageColor.a
      });
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

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    keys.push.apply(keys, Object.getOwnPropertySymbols(object));
  }

  if (enumerableOnly) keys = keys.filter(function (sym) {
    return Object.getOwnPropertyDescriptor(object, sym).enumerable;
  });
  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
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

function getNonParallelSideVectors(boundingBox) {
  var points = getPoints(boundingBox);
  return [// top left -> top right
  getVectorBetweenPoints(points[0], points[1]), // top right -> bottom right
  getVectorBetweenPoints(points[1], points[2])];
}

function getNormal(vector) {
  return {
    x: vector.y,
    y: -vector.x
  };
}

function normalize(vector) {
  var magnitude = getMagnitude(vector);
  return {
    x: magnitude > 0 ? vector.x / magnitude : 0,
    y: magnitude > 0 ? vector.y / magnitude : 0
  };
}

function getDot(vector1, vector2) {
  return vector1.x * vector2.x + vector1.y * vector2.y;
}

function multiply(vector1, vector2) {
  return {
    x: vector1.x * vector2.x,
    y: vector1.y * vector2.y
  };
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

function doIntersectCirclesSAT(circle1, circle2) {
  var sat1 = getSATInfoForCircle(circle1);
  var sat2 = getSATInfoForCircle(circle2);
  var centerPointsAxis = getVectorBetweenPoints(circle1, circle2);
  sat1.axes.push(centerPointsAxis);
  return doIntersectSAT(sat1, sat2);
}
function doIntersectBoundingBoxCircleSAT(box, circle) {
  var sat1 = getSATInfoForBoundingBox(box);
  var sat2 = getSATInfoForCircle(circle);
  var boxPoints = getPoints(box);
  var closestPoint = closestToPoint(circle, boxPoints);
  sat1.axes.push(getVectorBetweenPoints(closestPoint, circle));
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
    points: [{
      x: circle.x,
      y: circle.y
    }],
    buffer: circle.r
  };
}

function getSATInfoForBoundingBox(box) {
  var points = getPoints(box);
  var sides = getNonParallelSideVectors(box);
  var axes = sides.map(function (side) {
    return getNormal(side);
  });
  return {
    axes: axes,
    points: points,
    buffer: 0
  };
}

function doIntersectSAT(sat1, sat2) {
  var scalarProjection;
  var maxBox1;
  var minBox1;
  var maxBox2;
  var minBox2;
  var overlap1;
  var overlap2;
  var minTranslationDistance = Number.POSITIVE_INFINITY;
  var minTranslationVector = null;
  var axes = sat1.axes.concat(sat2.axes).map(function (axis) {
    return normalize(axis);
  });
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
      minBox1 = Math.min(scalarProjection - sat1.buffer, minBox1);
      maxBox1 = Math.max(scalarProjection + sat1.buffer, maxBox1);
    });
    sat2.points.forEach(function (pointIn2) {
      scalarProjection = getDot(pointIn2, axes[axesIndex]);
      minBox2 = Math.min(scalarProjection - sat2.buffer, minBox2);
      maxBox2 = Math.max(scalarProjection + sat2.buffer, maxBox2);
    }); // Must intersect (overlap) on all separating axes
    // Can bail early, or on the first time not overlapping

    if (maxBox1 < minBox2 || maxBox2 < minBox1) {
      return {
        v: null
      };
    } // compute overlap


    overlap1 = maxBox1 - minBox2;
    overlap2 = maxBox2 - minBox1;

    if (overlap1 < minTranslationDistance) {
      minTranslationDistance = overlap1;
      minTranslationVector = axes[axesIndex];
    }

    if (overlap2 < minTranslationDistance) {
      minTranslationDistance = overlap2;
      minTranslationVector = axes[axesIndex];
    }
  };

  for (var axesIndex = 0; axesIndex < numAxes; axesIndex++) {
    var _ret = _loop(axesIndex);

    if (_typeof(_ret) === "object") return _ret.v;
  }

  return minTranslationVector ? multiply(minTranslationVector, {
    x: minTranslationDistance,
    y: minTranslationDistance
  }) : null;
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
}

function doBoundsIntersect(bound1, bound2) {
  var isBound1Circle = isCircle(bound1);
  var isBound2Circle = isCircle(bound2);
  var isBound1BoundingBox = isBoundingBox(bound1);
  var isBound2BoundingBox = isBoundingBox(bound2);
  var isBound1Point = isPoint(bound1);
  var isBound2Point = isPoint(bound2); // They are both circles

  if (isBound1Circle && isBound2Circle) {
    return doIntersectCirclesSAT(bound1, bound2);
  } // They are both bounding boxes


  if (isBound1BoundingBox && isBound2BoundingBox) {
    return doIntersectBoundingBoxesSAT(bound1, bound2);
  } // They are both points


  if (isBound1Point && isBound2Point) {
    var _point1Circle = toCircleFromPoint(bound1);

    var point2Circle = toCircleFromPoint(bound2);
    return doIntersectCirclesSAT(_point1Circle, point2Circle);
  } // 1 is circle, 2 is bounding box


  if (isBound1Circle && isBound2BoundingBox) {
    return doIntersectBoundingBoxCircleSAT(bound2, bound1);
  } // 1 is bounding box, 2 is circle


  if (isBound1BoundingBox && isBound2Circle) {
    return doIntersectBoundingBoxCircleSAT(bound1, bound2);
  } // 1 is circle, 2 is point


  if (isBound1Circle && isBound2Point) {
    var _point2Circle = toCircleFromPoint(bound2);

    return doIntersectCirclesSAT(bound1, _point2Circle);
  } // 1 is point, 2 is 2 is circle


  if (isBound1Point && isBound2Circle) {
    var _point1Circle2 = toCircleFromPoint(bound1);

    return doIntersectCirclesSAT(_point1Circle2, bound2);
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
  var objectPoint = {
    x: object.x,
    y: object.y
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


  var objectPointKey = createPointKey(objectPoint);
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
  var objectPoint = {
    x: object.x,
    y: object.y
  };
  var objectPointKey = createPointKey(objectPoint);
  var objectPointSet = quadTree.data.get(objectPointKey) || new Set(); // Let's first check if the point this object occupies is within
  // the bounds of the bucket

  if (!doBoundsIntersect(quadTree.bounds, objectPoint)) {
    return false;
  } // If object is found, let's remove it


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
    var queryResultSet = new Set();
    getQuadTreeData(quadTree).forEach(function (quadObject) {
      var mtv = doBoundsIntersect(quadObject, bounds);

      if (mtv && quadObject !== bounds) {
        queryResultSet.add(_objectSpread2({}, quadObject, {
          mtv: mtv
        }));
      }
    });
    return queryResultSet;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1YWQud29ya2VyLnRzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9naWYuanMvZGlzdC9naWYuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NpbXBsZXF1YWQvZGlzdC9zaW1wbGVxdWFkLmVzbS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC50cyJdLCJuYW1lcyI6WyJwcm9jZXNzZWRNZXNzYWdlIiwidHlwZSIsImJ1aWxkUXVhZFRyZWVGcm9tUGl4ZWxzIiwiaW1hZ2VEYXRhIiwiYm91bmRzIiwiY2FwYWNpdHkiLCJwaXhlbHMiLCJjcmVhdGVQaXhlbHMiLCJxdWFkVHJlZSIsImNyZWF0ZVF1YWRUcmVlIiwiZm9yRWFjaCIsInBpeGVsIiwiYWRkIiwiZmlsbEltYWdlRGF0YUZyb21RdWFkVHJlZSIsInF1YWRyYW50cyIsImxlbmd0aCIsInF1YWRyYW50IiwiZ2V0RGF0YSIsImF2ZXJhZ2VDb2xvciIsImdldEF2ZXJhZ2VDb2xvciIsImZpbGxQaXhlbEluSW1hZ2VEYXRhIiwieCIsInkiLCJyIiwiZyIsImIiLCJhIiwicmVxdWVzdERyYXciLCJtZXNzYWdlIiwiZGF0YSIsImNyZWF0ZUltYWdlIiwicG9zdE1lc3NhZ2UiLCJwcm9jZXNzSW1hZ2UiLCJ3aWR0aCIsImhlaWdodCIsIm5ld0ltYWdlRGF0YSIsIkltYWdlRGF0YSIsIndvcmtlciIsInNlbGYiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJjb25zb2xlIiwiZXJyb3IiLCJQSVhFTF9XSURUSCIsIldISVRFX0NPTE9SIiwibG9hZEltYWdlIiwiaW1hZ2VGaWxlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJpbWFnZUZpbGVEYXRhVXJsIiwid2luZG93IiwiVVJMIiwiY3JlYXRlT2JqZWN0VVJMIiwiaW1hZ2UiLCJJbWFnZSIsIm9ubG9hZCIsInJldm9rZU9iamVjdFVSTCIsIm9uZXJyb3IiLCJlcnIiLCJzcmMiLCJzcXVhcmVkU3VtUiIsInNxdWFyZWRTdW1HIiwic3F1YXJlZFN1bUIiLCJzcXVhcmVkU3VtQSIsInNsaWNlIiwicmVkdWNlIiwicHJldkF2ZXJhZ2UiLCJjdXJyUGl4ZWwiLCJNYXRoIiwicG93Iiwic3FydCIsImNyZWF0ZVBpeGVsIiwicHJvY2Vzc0ltYWdlRGF0YSIsInB1c2giLCJwaXhlbE9mZnNldCIsImdldEltYWdlRGF0YU9mZlNjcmVlbiIsImNhbnZhcyIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImNvbnRleHQiLCJnZXRDb250ZXh0IiwiZHJhd0ltYWdlIiwiZ2V0SW1hZ2VEYXRhIiwicHJvY2Vzc0Z1bmMiLCJpbml0UGl4ZWxYIiwiaW5pdFBpeGVsWSIsIm9mZnNldFgiLCJvZmZzZXRZIiwidG9HaWYiLCJpbWFnZUZyYW1lcyIsImdpZiIsIkdJRiIsIndvcmtlcnMiLCJxdWFsaXR5IiwiaW1hZ2VGcmFtZSIsImFkZEZyYW1lIiwiZGVsYXkiLCJvbiIsImJsb2IiLCJzYXZlQmxvYiIsInJlbmRlciIsImZpbGVOYW1lIiwidXJsIiwic3R5bGUiLCJkaXNwbGF5IiwiaHJlZiIsImRvd25sb2FkIiwiYm9keSIsImFwcGVuZENoaWxkIiwiY2xpY2siLCJyZW1vdmVDaGlsZCJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNB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LEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCLHNCQUFzQjtBQUN2Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLLEVBQUU7QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7OztBQUdMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx5QkFBeUIscUJBQXFCO0FBQzlDOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0M7O0FBRXRDO0FBQ0E7QUFDQSxHQUFHOzs7QUFHSDtBQUNBO0FBQ0EsR0FBRzs7O0FBR0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7O0FBR0g7QUFDQTtBQUNBLEdBQUc7OztBQUdIO0FBQ0E7QUFDQSxHQUFHOzs7QUFHSDtBQUNBOztBQUVBO0FBQ0EsR0FBRzs7O0FBR0g7QUFDQTs7QUFFQTtBQUNBLEdBQUc7OztBQUdIO0FBQ0E7O0FBRUE7QUFDQSxHQUFHOzs7QUFHSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFD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OlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcyEuL3NyYy9xdWFkLndvcmtlci50c1wiKTtcbiIsImltcG9ydCB7IFF1YWRXb3JrZXJEYXRhTWVzc2FnZSwgUGl4ZWwsIENvbG9yLCBRdWFkV29ya2VyTWVzc2FnZSB9IGZyb20gJy4vc2NoZW1hJztcbmltcG9ydCB7IFF1YWRUcmVlLCBjcmVhdGVRdWFkVHJlZSwgQm91bmRpbmdCb3ggfSBmcm9tICdzaW1wbGVxdWFkJztcbmltcG9ydCB7IGNyZWF0ZVBpeGVscywgZ2V0QXZlcmFnZUNvbG9yLCBmaWxsUGl4ZWxJbkltYWdlRGF0YSB9IGZyb20gJy4vdXRpbCc7XG5cbmNvbnN0IHByb2Nlc3NlZE1lc3NhZ2U6IFF1YWRXb3JrZXJNZXNzYWdlID0ge1xuICAgIHR5cGU6ICdwcm9jZXNzZWQnLFxufTtcblxuZnVuY3Rpb24gYnVpbGRRdWFkVHJlZUZyb21QaXhlbHMoaW1hZ2VEYXRhOiBJbWFnZURhdGEsIGJvdW5kczogQm91bmRpbmdCb3gsIGNhcGFjaXR5OiBudW1iZXIpOiBRdWFkVHJlZTxQaXhlbD4ge1xuICAgIGNvbnN0IHBpeGVsczogUGl4ZWxbXSA9IGNyZWF0ZVBpeGVscyhpbWFnZURhdGEpO1xuICAgIGNvbnN0IHF1YWRUcmVlOiBRdWFkVHJlZTxQaXhlbD4gPSBjcmVhdGVRdWFkVHJlZShib3VuZHMsIGNhcGFjaXR5KTtcblxuICAgIC8vIEJ1aWxkIHF1YWR0cmVlIHdpdGggdGhpcyBjYXBhY2l0eSBmcm9tIHBpeGVsc1xuICAgIHBpeGVscy5mb3JFYWNoKHBpeGVsID0+IHF1YWRUcmVlLmFkZChwaXhlbCkpO1xuXG4gICAgcmV0dXJuIHF1YWRUcmVlO1xufVxuXG5mdW5jdGlvbiBmaWxsSW1hZ2VEYXRhRnJvbVF1YWRUcmVlKGltYWdlRGF0YTogSW1hZ2VEYXRhLCBxdWFkVHJlZTogUXVhZFRyZWU8UGl4ZWw+KTogSW1hZ2VEYXRhIHsgICAgXG4gICAgaWYgKHF1YWRUcmVlLnF1YWRyYW50cy5sZW5ndGgpIHtcbiAgICAgICAgcXVhZFRyZWUucXVhZHJhbnRzXG4gICAgICAgICAgICAuZm9yRWFjaChxdWFkcmFudCA9PlxuICAgICAgICAgICAgICAgIGZpbGxJbWFnZURhdGFGcm9tUXVhZFRyZWUoaW1hZ2VEYXRhLCBxdWFkcmFudCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHBpeGVsczogUGl4ZWxbXSA9IHF1YWRUcmVlLmdldERhdGEoKTtcbiAgICAgICAgY29uc3QgYXZlcmFnZUNvbG9yOiBDb2xvciA9IGdldEF2ZXJhZ2VDb2xvcihwaXhlbHMpO1xuICAgICAgICBwaXhlbHMuZm9yRWFjaChwaXhlbCA9PiBmaWxsUGl4ZWxJbkltYWdlRGF0YShpbWFnZURhdGEsIHtcbiAgICAgICAgICAgIHg6IHBpeGVsLngsXG4gICAgICAgICAgICB5OiBwaXhlbC55LFxuICAgICAgICAgICAgcjogYXZlcmFnZUNvbG9yLnIsXG4gICAgICAgICAgICBnOiBhdmVyYWdlQ29sb3IuZyxcbiAgICAgICAgICAgIGI6IGF2ZXJhZ2VDb2xvci5iLFxuICAgICAgICAgICAgYTogYXZlcmFnZUNvbG9yLmEsXG4gICAgICAgIH0pKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaW1hZ2VEYXRhO1xufVxuXG5mdW5jdGlvbiByZXF1ZXN0RHJhdyhpbWFnZURhdGE6IEltYWdlRGF0YSwgY2FwYWNpdHk6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IG1lc3NhZ2U6IFF1YWRXb3JrZXJEYXRhTWVzc2FnZSA9IHtcbiAgICAgICAgdHlwZTogJ2RyYXcnLFxuICAgICAgICBkYXRhOiBjcmVhdGVJbWFnZShpbWFnZURhdGEsIGNhcGFjaXR5KSxcbiAgICB9O1xuICAgIHBvc3RNZXNzYWdlKG1lc3NhZ2UpO1xufVxuXG5mdW5jdGlvbiBwcm9jZXNzSW1hZ2UoaW1hZ2VEYXRhOiBJbWFnZURhdGEpOiB2b2lkIHtcbiAgICBsZXQgY2FwYWNpdHk6IG51bWJlciA9IGltYWdlRGF0YS53aWR0aCAqIGltYWdlRGF0YS5oZWlnaHQ7XG5cbiAgICB3aGlsZSAoY2FwYWNpdHkgPiAxKSB7XG4gICAgICAgIHJlcXVlc3REcmF3KGltYWdlRGF0YSwgY2FwYWNpdHkpO1xuICAgICAgICBjYXBhY2l0eSAvPSAyO1xuICAgIH1cblxuICAgIHJlcXVlc3REcmF3KGltYWdlRGF0YSwgMSk7XG4gICAgcG9zdE1lc3NhZ2UocHJvY2Vzc2VkTWVzc2FnZSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUltYWdlKGltYWdlRGF0YTogSW1hZ2VEYXRhLCBjYXBhY2l0eTogbnVtYmVyKTogSW1hZ2VEYXRhIHtcbiAgICBjb25zdCBuZXdJbWFnZURhdGE6IEltYWdlRGF0YSA9IG5ldyBJbWFnZURhdGEoaW1hZ2VEYXRhLndpZHRoLCBpbWFnZURhdGEuaGVpZ2h0KTtcbiAgICBjb25zdCBxdWFkVHJlZTogUXVhZFRyZWU8UGl4ZWw+ID0gYnVpbGRRdWFkVHJlZUZyb21QaXhlbHMoaW1hZ2VEYXRhLCB7XG4gICAgICAgIHg6IDAsXG4gICAgICAgIHk6IDAsXG4gICAgICAgIHdpZHRoOiBpbWFnZURhdGEud2lkdGgsXG4gICAgICAgIGhlaWdodDogaW1hZ2VEYXRhLmhlaWdodCxcbiAgICB9LCBjYXBhY2l0eSk7XG4gICAgZmlsbEltYWdlRGF0YUZyb21RdWFkVHJlZShuZXdJbWFnZURhdGEsIHF1YWRUcmVlKTtcbiAgICByZXR1cm4gbmV3SW1hZ2VEYXRhO1xufVxuXG4vLyBTZXR0aW5nIHVwIHRoZSB3b3JrZXJcbmNvbnN0IHdvcmtlcjogV29ya2VyID0gc2VsZiBhcyBhbnk7XG53b3JrZXIuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIChldmVudCkgPT4ge1xuICAgIGNvbnN0IG1lc3NhZ2U6IFF1YWRXb3JrZXJEYXRhTWVzc2FnZSA9IGV2ZW50LmRhdGE7XG4gICAgY29uc3QgaW1hZ2VEYXRhOiBJbWFnZURhdGEgPSBtZXNzYWdlLmRhdGE7XG5cbiAgICBzd2l0Y2ggKG1lc3NhZ2UudHlwZSkge1xuICAgICAgICBjYXNlICduZXctaW1hZ2UnOlxuICAgICAgICAgICAgaWYgKGltYWdlRGF0YSkge1xuICAgICAgICAgICAgICAgIHByb2Nlc3NJbWFnZShpbWFnZURhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBVbmtub3duIG1lc3NhZ2UgdHlwZTogJHttZXNzYWdlfWApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgIH1cbn0pOyIsIi8vIGdpZi5qcyAwLjIuMCAtIGh0dHBzOi8vZ2l0aHViLmNvbS9qbm9yZGJlcmcvZ2lmLmpzXG4oZnVuY3Rpb24oZil7aWYodHlwZW9mIGV4cG9ydHM9PT1cIm9iamVjdFwiJiZ0eXBlb2YgbW9kdWxlIT09XCJ1bmRlZmluZWRcIil7bW9kdWxlLmV4cG9ydHM9ZigpfWVsc2UgaWYodHlwZW9mIGRlZmluZT09PVwiZnVuY3Rpb25cIiYmZGVmaW5lLmFtZCl7ZGVmaW5lKFtdLGYpfWVsc2V7dmFyIGc7aWYodHlwZW9mIHdpbmRvdyE9PVwidW5kZWZpbmVkXCIpe2c9d2luZG93fWVsc2UgaWYodHlwZW9mIGdsb2JhbCE9PVwidW5kZWZpbmVkXCIpe2c9Z2xvYmFsfWVsc2UgaWYodHlwZW9mIHNlbGYhPT1cInVuZGVmaW5lZFwiKXtnPXNlbGZ9ZWxzZXtnPXRoaXN9Zy5HSUY9ZigpfX0pKGZ1bmN0aW9uKCl7dmFyIGRlZmluZSxtb2R1bGUsZXhwb3J0cztyZXR1cm4gZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KHsxOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtmdW5jdGlvbiBFdmVudEVtaXR0ZXIoKXt0aGlzLl9ldmVudHM9dGhpcy5fZXZlbnRzfHx7fTt0aGlzLl9tYXhMaXN0ZW5lcnM9dGhpcy5fbWF4TGlzdGVuZXJzfHx1bmRlZmluZWR9bW9kdWxlLmV4cG9ydHM9RXZlbnRFbWl0dGVyO0V2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXI9RXZlbnRFbWl0dGVyO0V2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50cz11bmRlZmluZWQ7RXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fbWF4TGlzdGVuZXJzPXVuZGVmaW5lZDtFdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycz0xMDtFdmVudEVtaXR0ZXIucHJvdG90eXBlLnNldE1heExpc3RlbmVycz1mdW5jdGlvbihuKXtpZighaXNOdW1iZXIobil8fG48MHx8aXNOYU4obikpdGhyb3cgVHlwZUVycm9yKFwibiBtdXN0IGJlIGEgcG9zaXRpdmUgbnVtYmVyXCIpO3RoaXMuX21heExpc3RlbmVycz1uO3JldHVybiB0aGlzfTtFdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQ9ZnVuY3Rpb24odHlwZSl7dmFyIGVyLGhhbmRsZXIsbGVuLGFyZ3MsaSxsaXN0ZW5lcnM7aWYoIXRoaXMuX2V2ZW50cyl0aGlzLl9ldmVudHM9e307aWYodHlwZT09PVwiZXJyb3JcIil7aWYoIXRoaXMuX2V2ZW50cy5lcnJvcnx8aXNPYmplY3QodGhpcy5fZXZlbnRzLmVycm9yKSYmIXRoaXMuX2V2ZW50cy5lcnJvci5sZW5ndGgpe2VyPWFyZ3VtZW50c1sxXTtpZihlciBpbnN0YW5jZW9mIEVycm9yKXt0aHJvdyBlcn1lbHNle3ZhciBlcnI9bmV3IEVycm9yKCdVbmNhdWdodCwgdW5zcGVjaWZpZWQgXCJlcnJvclwiIGV2ZW50LiAoJytlcitcIilcIik7ZXJyLmNvbnRleHQ9ZXI7dGhyb3cgZXJyfX19aGFuZGxlcj10aGlzLl9ldmVudHNbdHlwZV07aWYoaXNVbmRlZmluZWQoaGFuZGxlcikpcmV0dXJuIGZhbHNlO2lmKGlzRnVuY3Rpb24oaGFuZGxlcikpe3N3aXRjaChhcmd1bWVudHMubGVuZ3RoKXtjYXNlIDE6aGFuZGxlci5jYWxsKHRoaXMpO2JyZWFrO2Nhc2UgMjpoYW5kbGVyLmNhbGwodGhpcyxhcmd1bWVudHNbMV0pO2JyZWFrO2Nhc2UgMzpoYW5kbGVyLmNhbGwodGhpcyxhcmd1bWVudHNbMV0sYXJndW1lbnRzWzJdKTticmVhaztkZWZhdWx0OmFyZ3M9QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLDEpO2hhbmRsZXIuYXBwbHkodGhpcyxhcmdzKX19ZWxzZSBpZihpc09iamVjdChoYW5kbGVyKSl7YXJncz1BcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsMSk7bGlzdGVuZXJzPWhhbmRsZXIuc2xpY2UoKTtsZW49bGlzdGVuZXJzLmxlbmd0aDtmb3IoaT0wO2k8bGVuO2krKylsaXN0ZW5lcnNbaV0uYXBwbHkodGhpcyxhcmdzKX1yZXR1cm4gdHJ1ZX07RXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lcj1mdW5jdGlvbih0eXBlLGxpc3RlbmVyKXt2YXIgbTtpZighaXNGdW5jdGlvbihsaXN0ZW5lcikpdGhyb3cgVHlwZUVycm9yKFwibGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uXCIpO2lmKCF0aGlzLl9ldmVudHMpdGhpcy5fZXZlbnRzPXt9O2lmKHRoaXMuX2V2ZW50cy5uZXdMaXN0ZW5lcil0aGlzLmVtaXQoXCJuZXdMaXN0ZW5lclwiLHR5cGUsaXNGdW5jdGlvbihsaXN0ZW5lci5saXN0ZW5lcik/bGlzdGVuZXIubGlzdGVuZXI6bGlzdGVuZXIpO2lmKCF0aGlzLl9ldmVudHNbdHlwZV0pdGhpcy5fZXZlbnRzW3R5cGVdPWxpc3RlbmVyO2Vsc2UgaWYoaXNPYmplY3QodGhpcy5fZXZlbnRzW3R5cGVdKSl0aGlzLl9ldmVudHNbdHlwZV0ucHVzaChsaXN0ZW5lcik7ZWxzZSB0aGlzLl9ldmVudHNbdHlwZV09W3RoaXMuX2V2ZW50c1t0eXBlXSxsaXN0ZW5lcl07aWYoaXNPYmplY3QodGhpcy5fZXZlbnRzW3R5cGVdKSYmIXRoaXMuX2V2ZW50c1t0eXBlXS53YXJuZWQpe2lmKCFpc1VuZGVmaW5lZCh0aGlzLl9tYXhMaXN0ZW5lcnMpKXttPXRoaXMuX21heExpc3RlbmVyc31lbHNle209RXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnN9aWYobSYmbT4wJiZ0aGlzLl9ldmVudHNbdHlwZV0ubGVuZ3RoPm0pe3RoaXMuX2V2ZW50c1t0eXBlXS53YXJuZWQ9dHJ1ZTtjb25zb2xlLmVycm9yKFwiKG5vZGUpIHdhcm5pbmc6IHBvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgXCIrXCJsZWFrIGRldGVjdGVkLiAlZCBsaXN0ZW5lcnMgYWRkZWQuIFwiK1wiVXNlIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKCkgdG8gaW5jcmVhc2UgbGltaXQuXCIsdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCk7aWYodHlwZW9mIGNvbnNvbGUudHJhY2U9PT1cImZ1bmN0aW9uXCIpe2NvbnNvbGUudHJhY2UoKX19fXJldHVybiB0aGlzfTtFdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uPUV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXI7RXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlPWZ1bmN0aW9uKHR5cGUsbGlzdGVuZXIpe2lmKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSl0aHJvdyBUeXBlRXJyb3IoXCJsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb25cIik7dmFyIGZpcmVkPWZhbHNlO2Z1bmN0aW9uIGcoKXt0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsZyk7aWYoIWZpcmVkKXtmaXJlZD10cnVlO2xpc3RlbmVyLmFwcGx5KHRoaXMsYXJndW1lbnRzKX19Zy5saXN0ZW5lcj1saXN0ZW5lcjt0aGlzLm9uKHR5cGUsZyk7cmV0dXJuIHRoaXN9O0V2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXI9ZnVuY3Rpb24odHlwZSxsaXN0ZW5lcil7dmFyIGxpc3QscG9zaXRpb24sbGVuZ3RoLGk7aWYoIWlzRnVuY3Rpb24obGlzdGVuZXIpKXRocm93IFR5cGVFcnJvcihcImxpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvblwiKTtpZighdGhpcy5fZXZlbnRzfHwhdGhpcy5fZXZlbnRzW3R5cGVdKXJldHVybiB0aGlzO2xpc3Q9dGhpcy5fZXZlbnRzW3R5cGVdO2xlbmd0aD1saXN0Lmxlbmd0aDtwb3NpdGlvbj0tMTtpZihsaXN0PT09bGlzdGVuZXJ8fGlzRnVuY3Rpb24obGlzdC5saXN0ZW5lcikmJmxpc3QubGlzdGVuZXI9PT1saXN0ZW5lcil7ZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtpZih0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpdGhpcy5lbWl0KFwicmVtb3ZlTGlzdGVuZXJcIix0eXBlLGxpc3RlbmVyKX1lbHNlIGlmKGlzT2JqZWN0KGxpc3QpKXtmb3IoaT1sZW5ndGg7aS0tID4wOyl7aWYobGlzdFtpXT09PWxpc3RlbmVyfHxsaXN0W2ldLmxpc3RlbmVyJiZsaXN0W2ldLmxpc3RlbmVyPT09bGlzdGVuZXIpe3Bvc2l0aW9uPWk7YnJlYWt9fWlmKHBvc2l0aW9uPDApcmV0dXJuIHRoaXM7aWYobGlzdC5sZW5ndGg9PT0xKXtsaXN0Lmxlbmd0aD0wO2RlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV19ZWxzZXtsaXN0LnNwbGljZShwb3NpdGlvbiwxKX1pZih0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpdGhpcy5lbWl0KFwicmVtb3ZlTGlzdGVuZXJcIix0eXBlLGxpc3RlbmVyKX1yZXR1cm4gdGhpc307RXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnM9ZnVuY3Rpb24odHlwZSl7dmFyIGtleSxsaXN0ZW5lcnM7aWYoIXRoaXMuX2V2ZW50cylyZXR1cm4gdGhpcztpZighdGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKXtpZihhcmd1bWVudHMubGVuZ3RoPT09MCl0aGlzLl9ldmVudHM9e307ZWxzZSBpZih0aGlzLl9ldmVudHNbdHlwZV0pZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtyZXR1cm4gdGhpc31pZihhcmd1bWVudHMubGVuZ3RoPT09MCl7Zm9yKGtleSBpbiB0aGlzLl9ldmVudHMpe2lmKGtleT09PVwicmVtb3ZlTGlzdGVuZXJcIiljb250aW51ZTt0aGlzLnJlbW92ZUFsbExpc3RlbmVycyhrZXkpfXRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKFwicmVtb3ZlTGlzdGVuZXJcIik7dGhpcy5fZXZlbnRzPXt9O3JldHVybiB0aGlzfWxpc3RlbmVycz10aGlzLl9ldmVudHNbdHlwZV07aWYoaXNGdW5jdGlvbihsaXN0ZW5lcnMpKXt0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsbGlzdGVuZXJzKX1lbHNlIGlmKGxpc3RlbmVycyl7d2hpbGUobGlzdGVuZXJzLmxlbmd0aCl0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsbGlzdGVuZXJzW2xpc3RlbmVycy5sZW5ndGgtMV0pfWRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07cmV0dXJuIHRoaXN9O0V2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzPWZ1bmN0aW9uKHR5cGUpe3ZhciByZXQ7aWYoIXRoaXMuX2V2ZW50c3x8IXRoaXMuX2V2ZW50c1t0eXBlXSlyZXQ9W107ZWxzZSBpZihpc0Z1bmN0aW9uKHRoaXMuX2V2ZW50c1t0eXBlXSkpcmV0PVt0aGlzLl9ldmVudHNbdHlwZV1dO2Vsc2UgcmV0PXRoaXMuX2V2ZW50c1t0eXBlXS5zbGljZSgpO3JldHVybiByZXR9O0V2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJDb3VudD1mdW5jdGlvbih0eXBlKXtpZih0aGlzLl9ldmVudHMpe3ZhciBldmxpc3RlbmVyPXRoaXMuX2V2ZW50c1t0eXBlXTtpZihpc0Z1bmN0aW9uKGV2bGlzdGVuZXIpKXJldHVybiAxO2Vsc2UgaWYoZXZsaXN0ZW5lcilyZXR1cm4gZXZsaXN0ZW5lci5sZW5ndGh9cmV0dXJuIDB9O0V2ZW50RW1pdHRlci5saXN0ZW5lckNvdW50PWZ1bmN0aW9uKGVtaXR0ZXIsdHlwZSl7cmV0dXJuIGVtaXR0ZXIubGlzdGVuZXJDb3VudCh0eXBlKX07ZnVuY3Rpb24gaXNGdW5jdGlvbihhcmcpe3JldHVybiB0eXBlb2YgYXJnPT09XCJmdW5jdGlvblwifWZ1bmN0aW9uIGlzTnVtYmVyKGFyZyl7cmV0dXJuIHR5cGVvZiBhcmc9PT1cIm51bWJlclwifWZ1bmN0aW9uIGlzT2JqZWN0KGFyZyl7cmV0dXJuIHR5cGVvZiBhcmc9PT1cIm9iamVjdFwiJiZhcmchPT1udWxsfWZ1bmN0aW9uIGlzVW5kZWZpbmVkKGFyZyl7cmV0dXJuIGFyZz09PXZvaWQgMH19LHt9XSwyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXt2YXIgVUEsYnJvd3Nlcixtb2RlLHBsYXRmb3JtLHVhO3VhPW5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKTtwbGF0Zm9ybT1uYXZpZ2F0b3IucGxhdGZvcm0udG9Mb3dlckNhc2UoKTtVQT11YS5tYXRjaCgvKG9wZXJhfGllfGZpcmVmb3h8Y2hyb21lfHZlcnNpb24pW1xcc1xcLzpdKFtcXHdcXGRcXC5dKyk/Lio/KHNhZmFyaXx2ZXJzaW9uW1xcc1xcLzpdKFtcXHdcXGRcXC5dKyl8JCkvKXx8W251bGwsXCJ1bmtub3duXCIsMF07bW9kZT1VQVsxXT09PVwiaWVcIiYmZG9jdW1lbnQuZG9jdW1lbnRNb2RlO2Jyb3dzZXI9e25hbWU6VUFbMV09PT1cInZlcnNpb25cIj9VQVszXTpVQVsxXSx2ZXJzaW9uOm1vZGV8fHBhcnNlRmxvYXQoVUFbMV09PT1cIm9wZXJhXCImJlVBWzRdP1VBWzRdOlVBWzJdKSxwbGF0Zm9ybTp7bmFtZTp1YS5tYXRjaCgvaXAoPzphZHxvZHxob25lKS8pP1wiaW9zXCI6KHVhLm1hdGNoKC8oPzp3ZWJvc3xhbmRyb2lkKS8pfHxwbGF0Zm9ybS5tYXRjaCgvbWFjfHdpbnxsaW51eC8pfHxbXCJvdGhlclwiXSlbMF19fTticm93c2VyW2Jyb3dzZXIubmFtZV09dHJ1ZTticm93c2VyW2Jyb3dzZXIubmFtZStwYXJzZUludChicm93c2VyLnZlcnNpb24sMTApXT10cnVlO2Jyb3dzZXIucGxhdGZvcm1bYnJvd3Nlci5wbGF0Zm9ybS5uYW1lXT10cnVlO21vZHVsZS5leHBvcnRzPWJyb3dzZXJ9LHt9XSwzOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXt2YXIgRXZlbnRFbWl0dGVyLEdJRixicm93c2VyLGV4dGVuZD1mdW5jdGlvbihjaGlsZCxwYXJlbnQpe2Zvcih2YXIga2V5IGluIHBhcmVudCl7aWYoaGFzUHJvcC5jYWxsKHBhcmVudCxrZXkpKWNoaWxkW2tleV09cGFyZW50W2tleV19ZnVuY3Rpb24gY3Rvcigpe3RoaXMuY29uc3RydWN0b3I9Y2hpbGR9Y3Rvci5wcm90b3R5cGU9cGFyZW50LnByb3RvdHlwZTtjaGlsZC5wcm90b3R5cGU9bmV3IGN0b3I7Y2hpbGQuX19zdXBlcl9fPXBhcmVudC5wcm90b3R5cGU7cmV0dXJuIGNoaWxkfSxoYXNQcm9wPXt9Lmhhc093blByb3BlcnR5LGluZGV4T2Y9W10uaW5kZXhPZnx8ZnVuY3Rpb24oaXRlbSl7Zm9yKHZhciBpPTAsbD10aGlzLmxlbmd0aDtpPGw7aSsrKXtpZihpIGluIHRoaXMmJnRoaXNbaV09PT1pdGVtKXJldHVybiBpfXJldHVybi0xfSxzbGljZT1bXS5zbGljZTtFdmVudEVtaXR0ZXI9cmVxdWlyZShcImV2ZW50c1wiKS5FdmVudEVtaXR0ZXI7YnJvd3Nlcj1yZXF1aXJlKFwiLi9icm93c2VyLmNvZmZlZVwiKTtHSUY9ZnVuY3Rpb24oc3VwZXJDbGFzcyl7dmFyIGRlZmF1bHRzLGZyYW1lRGVmYXVsdHM7ZXh0ZW5kKEdJRixzdXBlckNsYXNzKTtkZWZhdWx0cz17d29ya2VyU2NyaXB0OlwiZ2lmLndvcmtlci5qc1wiLHdvcmtlcnM6MixyZXBlYXQ6MCxiYWNrZ3JvdW5kOlwiI2ZmZlwiLHF1YWxpdHk6MTAsd2lkdGg6bnVsbCxoZWlnaHQ6bnVsbCx0cmFuc3BhcmVudDpudWxsLGRlYnVnOmZhbHNlLGRpdGhlcjpmYWxzZX07ZnJhbWVEZWZhdWx0cz17ZGVsYXk6NTAwLGNvcHk6ZmFsc2V9O2Z1bmN0aW9uIEdJRihvcHRpb25zKXt2YXIgYmFzZSxrZXksdmFsdWU7dGhpcy5ydW5uaW5nPWZhbHNlO3RoaXMub3B0aW9ucz17fTt0aGlzLmZyYW1lcz1bXTt0aGlzLmZyZWVXb3JrZXJzPVtdO3RoaXMuYWN0aXZlV29ya2Vycz1bXTt0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7Zm9yKGtleSBpbiBkZWZhdWx0cyl7dmFsdWU9ZGVmYXVsdHNba2V5XTtpZigoYmFzZT10aGlzLm9wdGlvbnMpW2tleV09PW51bGwpe2Jhc2Vba2V5XT12YWx1ZX19fUdJRi5wcm90b3R5cGUuc2V0T3B0aW9uPWZ1bmN0aW9uKGtleSx2YWx1ZSl7dGhpcy5vcHRpb25zW2tleV09dmFsdWU7aWYodGhpcy5fY2FudmFzIT1udWxsJiYoa2V5PT09XCJ3aWR0aFwifHxrZXk9PT1cImhlaWdodFwiKSl7cmV0dXJuIHRoaXMuX2NhbnZhc1trZXldPXZhbHVlfX07R0lGLnByb3RvdHlwZS5zZXRPcHRpb25zPWZ1bmN0aW9uKG9wdGlvbnMpe3ZhciBrZXkscmVzdWx0cyx2YWx1ZTtyZXN1bHRzPVtdO2ZvcihrZXkgaW4gb3B0aW9ucyl7aWYoIWhhc1Byb3AuY2FsbChvcHRpb25zLGtleSkpY29udGludWU7dmFsdWU9b3B0aW9uc1trZXldO3Jlc3VsdHMucHVzaCh0aGlzLnNldE9wdGlvbihrZXksdmFsdWUpKX1yZXR1cm4gcmVzdWx0c307R0lGLnByb3RvdHlwZS5hZGRGcmFtZT1mdW5jdGlvbihpbWFnZSxvcHRpb25zKXt2YXIgZnJhbWUsa2V5O2lmKG9wdGlvbnM9PW51bGwpe29wdGlvbnM9e319ZnJhbWU9e307ZnJhbWUudHJhbnNwYXJlbnQ9dGhpcy5vcHRpb25zLnRyYW5zcGFyZW50O2ZvcihrZXkgaW4gZnJhbWVEZWZhdWx0cyl7ZnJhbWVba2V5XT1vcHRpb25zW2tleV18fGZyYW1lRGVmYXVsdHNba2V5XX1pZih0aGlzLm9wdGlvbnMud2lkdGg9PW51bGwpe3RoaXMuc2V0T3B0aW9uKFwid2lkdGhcIixpbWFnZS53aWR0aCl9aWYodGhpcy5vcHRpb25zLmhlaWdodD09bnVsbCl7dGhpcy5zZXRPcHRpb24oXCJoZWlnaHRcIixpbWFnZS5oZWlnaHQpfWlmKHR5cGVvZiBJbWFnZURhdGEhPT1cInVuZGVmaW5lZFwiJiZJbWFnZURhdGEhPT1udWxsJiZpbWFnZSBpbnN0YW5jZW9mIEltYWdlRGF0YSl7ZnJhbWUuZGF0YT1pbWFnZS5kYXRhfWVsc2UgaWYodHlwZW9mIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCE9PVwidW5kZWZpbmVkXCImJkNhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCE9PW51bGwmJmltYWdlIGluc3RhbmNlb2YgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEfHx0eXBlb2YgV2ViR0xSZW5kZXJpbmdDb250ZXh0IT09XCJ1bmRlZmluZWRcIiYmV2ViR0xSZW5kZXJpbmdDb250ZXh0IT09bnVsbCYmaW1hZ2UgaW5zdGFuY2VvZiBXZWJHTFJlbmRlcmluZ0NvbnRleHQpe2lmKG9wdGlvbnMuY29weSl7ZnJhbWUuZGF0YT10aGlzLmdldENvbnRleHREYXRhKGltYWdlKX1lbHNle2ZyYW1lLmNvbnRleHQ9aW1hZ2V9fWVsc2UgaWYoaW1hZ2UuY2hpbGROb2RlcyE9bnVsbCl7aWYob3B0aW9ucy5jb3B5KXtmcmFtZS5kYXRhPXRoaXMuZ2V0SW1hZ2VEYXRhKGltYWdlKX1lbHNle2ZyYW1lLmltYWdlPWltYWdlfX1lbHNle3Rocm93IG5ldyBFcnJvcihcIkludmFsaWQgaW1hZ2VcIil9cmV0dXJuIHRoaXMuZnJhbWVzLnB1c2goZnJhbWUpfTtHSUYucHJvdG90eXBlLnJlbmRlcj1mdW5jdGlvbigpe3ZhciBpLGosbnVtV29ya2VycyxyZWY7aWYodGhpcy5ydW5uaW5nKXt0aHJvdyBuZXcgRXJyb3IoXCJBbHJlYWR5IHJ1bm5pbmdcIil9aWYodGhpcy5vcHRpb25zLndpZHRoPT1udWxsfHx0aGlzLm9wdGlvbnMuaGVpZ2h0PT1udWxsKXt0aHJvdyBuZXcgRXJyb3IoXCJXaWR0aCBhbmQgaGVpZ2h0IG11c3QgYmUgc2V0IHByaW9yIHRvIHJlbmRlcmluZ1wiKX10aGlzLnJ1bm5pbmc9dHJ1ZTt0aGlzLm5leHRGcmFtZT0wO3RoaXMuZmluaXNoZWRGcmFtZXM9MDt0aGlzLmltYWdlUGFydHM9ZnVuY3Rpb24oKXt2YXIgaixyZWYscmVzdWx0cztyZXN1bHRzPVtdO2ZvcihpPWo9MCxyZWY9dGhpcy5mcmFtZXMubGVuZ3RoOzA8PXJlZj9qPHJlZjpqPnJlZjtpPTA8PXJlZj8rK2o6LS1qKXtyZXN1bHRzLnB1c2gobnVsbCl9cmV0dXJuIHJlc3VsdHN9LmNhbGwodGhpcyk7bnVtV29ya2Vycz10aGlzLnNwYXduV29ya2VycygpO2lmKHRoaXMub3B0aW9ucy5nbG9iYWxQYWxldHRlPT09dHJ1ZSl7dGhpcy5yZW5kZXJOZXh0RnJhbWUoKX1lbHNle2ZvcihpPWo9MCxyZWY9bnVtV29ya2VyczswPD1yZWY/ajxyZWY6aj5yZWY7aT0wPD1yZWY/KytqOi0tail7dGhpcy5yZW5kZXJOZXh0RnJhbWUoKX19dGhpcy5lbWl0KFwic3RhcnRcIik7cmV0dXJuIHRoaXMuZW1pdChcInByb2dyZXNzXCIsMCl9O0dJRi5wcm90b3R5cGUuYWJvcnQ9ZnVuY3Rpb24oKXt2YXIgd29ya2VyO3doaWxlKHRydWUpe3dvcmtlcj10aGlzLmFjdGl2ZVdvcmtlcnMuc2hpZnQoKTtpZih3b3JrZXI9PW51bGwpe2JyZWFrfXRoaXMubG9nKFwia2lsbGluZyBhY3RpdmUgd29ya2VyXCIpO3dvcmtlci50ZXJtaW5hdGUoKX10aGlzLnJ1bm5pbmc9ZmFsc2U7cmV0dXJuIHRoaXMuZW1pdChcImFib3J0XCIpfTtHSUYucHJvdG90eXBlLnNwYXduV29ya2Vycz1mdW5jdGlvbigpe3ZhciBqLG51bVdvcmtlcnMscmVmLHJlc3VsdHM7bnVtV29ya2Vycz1NYXRoLm1pbih0aGlzLm9wdGlvbnMud29ya2Vycyx0aGlzLmZyYW1lcy5sZW5ndGgpOyhmdW5jdGlvbigpe3Jlc3VsdHM9W107Zm9yKHZhciBqPXJlZj10aGlzLmZyZWVXb3JrZXJzLmxlbmd0aDtyZWY8PW51bVdvcmtlcnM/ajxudW1Xb3JrZXJzOmo+bnVtV29ya2VycztyZWY8PW51bVdvcmtlcnM/aisrOmotLSl7cmVzdWx0cy5wdXNoKGopfXJldHVybiByZXN1bHRzfSkuYXBwbHkodGhpcykuZm9yRWFjaChmdW5jdGlvbihfdGhpcyl7cmV0dXJuIGZ1bmN0aW9uKGkpe3ZhciB3b3JrZXI7X3RoaXMubG9nKFwic3Bhd25pbmcgd29ya2VyIFwiK2kpO3dvcmtlcj1uZXcgV29ya2VyKF90aGlzLm9wdGlvbnMud29ya2VyU2NyaXB0KTt3b3JrZXIub25tZXNzYWdlPWZ1bmN0aW9uKGV2ZW50KXtfdGhpcy5hY3RpdmVXb3JrZXJzLnNwbGljZShfdGhpcy5hY3RpdmVXb3JrZXJzLmluZGV4T2Yod29ya2VyKSwxKTtfdGhpcy5mcmVlV29ya2Vycy5wdXNoKHdvcmtlcik7cmV0dXJuIF90aGlzLmZyYW1lRmluaXNoZWQoZXZlbnQuZGF0YSl9O3JldHVybiBfdGhpcy5mcmVlV29ya2Vycy5wdXNoKHdvcmtlcil9fSh0aGlzKSk7cmV0dXJuIG51bVdvcmtlcnN9O0dJRi5wcm90b3R5cGUuZnJhbWVGaW5pc2hlZD1mdW5jdGlvbihmcmFtZSl7dmFyIGksaixyZWY7dGhpcy5sb2coXCJmcmFtZSBcIitmcmFtZS5pbmRleCtcIiBmaW5pc2hlZCAtIFwiK3RoaXMuYWN0aXZlV29ya2Vycy5sZW5ndGgrXCIgYWN0aXZlXCIpO3RoaXMuZmluaXNoZWRGcmFtZXMrKzt0aGlzLmVtaXQoXCJwcm9ncmVzc1wiLHRoaXMuZmluaXNoZWRGcmFtZXMvdGhpcy5mcmFtZXMubGVuZ3RoKTt0aGlzLmltYWdlUGFydHNbZnJhbWUuaW5kZXhdPWZyYW1lO2lmKHRoaXMub3B0aW9ucy5nbG9iYWxQYWxldHRlPT09dHJ1ZSl7dGhpcy5vcHRpb25zLmdsb2JhbFBhbGV0dGU9ZnJhbWUuZ2xvYmFsUGFsZXR0ZTt0aGlzLmxvZyhcImdsb2JhbCBwYWxldHRlIGFuYWx5emVkXCIpO2lmKHRoaXMuZnJhbWVzLmxlbmd0aD4yKXtmb3IoaT1qPTEscmVmPXRoaXMuZnJlZVdvcmtlcnMubGVuZ3RoOzE8PXJlZj9qPHJlZjpqPnJlZjtpPTE8PXJlZj8rK2o6LS1qKXt0aGlzLnJlbmRlck5leHRGcmFtZSgpfX19aWYoaW5kZXhPZi5jYWxsKHRoaXMuaW1hZ2VQYXJ0cyxudWxsKT49MCl7cmV0dXJuIHRoaXMucmVuZGVyTmV4dEZyYW1lKCl9ZWxzZXtyZXR1cm4gdGhpcy5maW5pc2hSZW5kZXJpbmcoKX19O0dJRi5wcm90b3R5cGUuZmluaXNoUmVuZGVyaW5nPWZ1bmN0aW9uKCl7dmFyIGRhdGEsZnJhbWUsaSxpbWFnZSxqLGssbCxsZW4sbGVuMSxsZW4yLGxlbjMsb2Zmc2V0LHBhZ2UscmVmLHJlZjEscmVmMjtsZW49MDtyZWY9dGhpcy5pbWFnZVBhcnRzO2ZvcihqPTAsbGVuMT1yZWYubGVuZ3RoO2o8bGVuMTtqKyspe2ZyYW1lPXJlZltqXTtsZW4rPShmcmFtZS5kYXRhLmxlbmd0aC0xKSpmcmFtZS5wYWdlU2l6ZStmcmFtZS5jdXJzb3J9bGVuKz1mcmFtZS5wYWdlU2l6ZS1mcmFtZS5jdXJzb3I7dGhpcy5sb2coXCJyZW5kZXJpbmcgZmluaXNoZWQgLSBmaWxlc2l6ZSBcIitNYXRoLnJvdW5kKGxlbi8xZTMpK1wia2JcIik7ZGF0YT1uZXcgVWludDhBcnJheShsZW4pO29mZnNldD0wO3JlZjE9dGhpcy5pbWFnZVBhcnRzO2ZvcihrPTAsbGVuMj1yZWYxLmxlbmd0aDtrPGxlbjI7aysrKXtmcmFtZT1yZWYxW2tdO3JlZjI9ZnJhbWUuZGF0YTtmb3IoaT1sPTAsbGVuMz1yZWYyLmxlbmd0aDtsPGxlbjM7aT0rK2wpe3BhZ2U9cmVmMltpXTtkYXRhLnNldChwYWdlLG9mZnNldCk7aWYoaT09PWZyYW1lLmRhdGEubGVuZ3RoLTEpe29mZnNldCs9ZnJhbWUuY3Vyc29yfWVsc2V7b2Zmc2V0Kz1mcmFtZS5wYWdlU2l6ZX19fWltYWdlPW5ldyBCbG9iKFtkYXRhXSx7dHlwZTpcImltYWdlL2dpZlwifSk7cmV0dXJuIHRoaXMuZW1pdChcImZpbmlzaGVkXCIsaW1hZ2UsZGF0YSl9O0dJRi5wcm90b3R5cGUucmVuZGVyTmV4dEZyYW1lPWZ1bmN0aW9uKCl7dmFyIGZyYW1lLHRhc2ssd29ya2VyO2lmKHRoaXMuZnJlZVdvcmtlcnMubGVuZ3RoPT09MCl7dGhyb3cgbmV3IEVycm9yKFwiTm8gZnJlZSB3b3JrZXJzXCIpfWlmKHRoaXMubmV4dEZyYW1lPj10aGlzLmZyYW1lcy5sZW5ndGgpe3JldHVybn1mcmFtZT10aGlzLmZyYW1lc1t0aGlzLm5leHRGcmFtZSsrXTt3b3JrZXI9dGhpcy5mcmVlV29ya2Vycy5zaGlmdCgpO3Rhc2s9dGhpcy5nZXRUYXNrKGZyYW1lKTt0aGlzLmxvZyhcInN0YXJ0aW5nIGZyYW1lIFwiKyh0YXNrLmluZGV4KzEpK1wiIG9mIFwiK3RoaXMuZnJhbWVzLmxlbmd0aCk7dGhpcy5hY3RpdmVXb3JrZXJzLnB1c2god29ya2VyKTtyZXR1cm4gd29ya2VyLnBvc3RNZXNzYWdlKHRhc2spfTtHSUYucHJvdG90eXBlLmdldENvbnRleHREYXRhPWZ1bmN0aW9uKGN0eCl7cmV0dXJuIGN0eC5nZXRJbWFnZURhdGEoMCwwLHRoaXMub3B0aW9ucy53aWR0aCx0aGlzLm9wdGlvbnMuaGVpZ2h0KS5kYXRhfTtHSUYucHJvdG90eXBlLmdldEltYWdlRGF0YT1mdW5jdGlvbihpbWFnZSl7dmFyIGN0eDtpZih0aGlzLl9jYW52YXM9PW51bGwpe3RoaXMuX2NhbnZhcz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO3RoaXMuX2NhbnZhcy53aWR0aD10aGlzLm9wdGlvbnMud2lkdGg7dGhpcy5fY2FudmFzLmhlaWdodD10aGlzLm9wdGlvbnMuaGVpZ2h0fWN0eD10aGlzLl9jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO2N0eC5zZXRGaWxsPXRoaXMub3B0aW9ucy5iYWNrZ3JvdW5kO2N0eC5maWxsUmVjdCgwLDAsdGhpcy5vcHRpb25zLndpZHRoLHRoaXMub3B0aW9ucy5oZWlnaHQpO2N0eC5kcmF3SW1hZ2UoaW1hZ2UsMCwwKTtyZXR1cm4gdGhpcy5nZXRDb250ZXh0RGF0YShjdHgpfTtHSUYucHJvdG90eXBlLmdldFRhc2s9ZnVuY3Rpb24oZnJhbWUpe3ZhciBpbmRleCx0YXNrO2luZGV4PXRoaXMuZnJhbWVzLmluZGV4T2YoZnJhbWUpO3Rhc2s9e2luZGV4OmluZGV4LGxhc3Q6aW5kZXg9PT10aGlzLmZyYW1lcy5sZW5ndGgtMSxkZWxheTpmcmFtZS5kZWxheSx0cmFuc3BhcmVudDpmcmFtZS50cmFuc3BhcmVudCx3aWR0aDp0aGlzLm9wdGlvbnMud2lkdGgsaGVpZ2h0OnRoaXMub3B0aW9ucy5oZWlnaHQscXVhbGl0eTp0aGlzLm9wdGlvbnMucXVhbGl0eSxkaXRoZXI6dGhpcy5vcHRpb25zLmRpdGhlcixnbG9iYWxQYWxldHRlOnRoaXMub3B0aW9ucy5nbG9iYWxQYWxldHRlLHJlcGVhdDp0aGlzLm9wdGlvbnMucmVwZWF0LGNhblRyYW5zZmVyOmJyb3dzZXIubmFtZT09PVwiY2hyb21lXCJ9O2lmKGZyYW1lLmRhdGEhPW51bGwpe3Rhc2suZGF0YT1mcmFtZS5kYXRhfWVsc2UgaWYoZnJhbWUuY29udGV4dCE9bnVsbCl7dGFzay5kYXRhPXRoaXMuZ2V0Q29udGV4dERhdGEoZnJhbWUuY29udGV4dCl9ZWxzZSBpZihmcmFtZS5pbWFnZSE9bnVsbCl7dGFzay5kYXRhPXRoaXMuZ2V0SW1hZ2VEYXRhKGZyYW1lLmltYWdlKX1lbHNle3Rocm93IG5ldyBFcnJvcihcIkludmFsaWQgZnJhbWVcIil9cmV0dXJuIHRhc2t9O0dJRi5wcm90b3R5cGUubG9nPWZ1bmN0aW9uKCl7dmFyIGFyZ3M7YXJncz0xPD1hcmd1bWVudHMubGVuZ3RoP3NsaWNlLmNhbGwoYXJndW1lbnRzLDApOltdO2lmKCF0aGlzLm9wdGlvbnMuZGVidWcpe3JldHVybn1yZXR1cm4gY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSxhcmdzKX07cmV0dXJuIEdJRn0oRXZlbnRFbWl0dGVyKTttb2R1bGUuZXhwb3J0cz1HSUZ9LHtcIi4vYnJvd3Nlci5jb2ZmZWVcIjoyLGV2ZW50czoxfV19LHt9LFszXSkoMyl9KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWdpZi5qcy5tYXBcbiIsImZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gIGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIikge1xuICAgIF90eXBlb2YgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIG9iajtcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIF90eXBlb2YgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgICByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajtcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIF90eXBlb2Yob2JqKTtcbn1cblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkge1xuICBpZiAoa2V5IGluIG9iaikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59XG5cbmZ1bmN0aW9uIG93bktleXMob2JqZWN0LCBlbnVtZXJhYmxlT25seSkge1xuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iamVjdCk7XG5cbiAgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgICBrZXlzLnB1c2guYXBwbHkoa2V5cywgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhvYmplY3QpKTtcbiAgfVxuXG4gIGlmIChlbnVtZXJhYmxlT25seSkga2V5cyA9IGtleXMuZmlsdGVyKGZ1bmN0aW9uIChzeW0pIHtcbiAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHN5bSkuZW51bWVyYWJsZTtcbiAgfSk7XG4gIHJldHVybiBrZXlzO1xufVxuXG5mdW5jdGlvbiBfb2JqZWN0U3ByZWFkMih0YXJnZXQpIHtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldICE9IG51bGwgPyBhcmd1bWVudHNbaV0gOiB7fTtcblxuICAgIGlmIChpICUgMikge1xuICAgICAgb3duS2V5cyhzb3VyY2UsIHRydWUpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICBfZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHNvdXJjZVtrZXldKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMoc291cmNlKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG93bktleXMoc291cmNlKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwga2V5KSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5mdW5jdGlvbiBnZXRWZWN0b3JCZXR3ZWVuUG9pbnRzKHBvaW50MSwgcG9pbnQyKSB7XG4gIHJldHVybiB7XG4gICAgeDogcG9pbnQyLnggLSBwb2ludDEueCxcbiAgICB5OiBwb2ludDIueSAtIHBvaW50MS55XG4gIH07XG59XG5cbmZ1bmN0aW9uIGdldFBvaW50cyhib3VuZGluZ0JveCkge1xuICB2YXIgbWF4WCA9IGJvdW5kaW5nQm94LnggKyBib3VuZGluZ0JveC53aWR0aDtcbiAgdmFyIG1heFkgPSBib3VuZGluZ0JveC55ICsgYm91bmRpbmdCb3guaGVpZ2h0O1xuICB2YXIgdG9wTGVmdFBvaW50ID0ge1xuICAgIHg6IGJvdW5kaW5nQm94LngsXG4gICAgeTogYm91bmRpbmdCb3gueVxuICB9O1xuICB2YXIgdG9wUmlnaHRQb2ludCA9IHtcbiAgICB4OiBtYXhYLFxuICAgIHk6IGJvdW5kaW5nQm94LnlcbiAgfTtcbiAgdmFyIGJvdHRvbVJpZ2h0UG9pbnQgPSB7XG4gICAgeDogbWF4WCxcbiAgICB5OiBtYXhZXG4gIH07XG4gIHZhciBib3R0b21MZWZ0UG9pbnQgPSB7XG4gICAgeDogYm91bmRpbmdCb3gueCxcbiAgICB5OiBtYXhZXG4gIH07XG4gIHJldHVybiBbdG9wTGVmdFBvaW50LCB0b3BSaWdodFBvaW50LCBib3R0b21SaWdodFBvaW50LCBib3R0b21MZWZ0UG9pbnRdO1xufVxuXG5mdW5jdGlvbiBnZXROb25QYXJhbGxlbFNpZGVWZWN0b3JzKGJvdW5kaW5nQm94KSB7XG4gIHZhciBwb2ludHMgPSBnZXRQb2ludHMoYm91bmRpbmdCb3gpO1xuICByZXR1cm4gWy8vIHRvcCBsZWZ0IC0+IHRvcCByaWdodFxuICBnZXRWZWN0b3JCZXR3ZWVuUG9pbnRzKHBvaW50c1swXSwgcG9pbnRzWzFdKSwgLy8gdG9wIHJpZ2h0IC0+IGJvdHRvbSByaWdodFxuICBnZXRWZWN0b3JCZXR3ZWVuUG9pbnRzKHBvaW50c1sxXSwgcG9pbnRzWzJdKV07XG59XG5cbmZ1bmN0aW9uIGdldE5vcm1hbCh2ZWN0b3IpIHtcbiAgcmV0dXJuIHtcbiAgICB4OiB2ZWN0b3IueSxcbiAgICB5OiAtdmVjdG9yLnhcbiAgfTtcbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplKHZlY3Rvcikge1xuICB2YXIgbWFnbml0dWRlID0gZ2V0TWFnbml0dWRlKHZlY3Rvcik7XG4gIHJldHVybiB7XG4gICAgeDogbWFnbml0dWRlID4gMCA/IHZlY3Rvci54IC8gbWFnbml0dWRlIDogMCxcbiAgICB5OiBtYWduaXR1ZGUgPiAwID8gdmVjdG9yLnkgLyBtYWduaXR1ZGUgOiAwXG4gIH07XG59XG5cbmZ1bmN0aW9uIGdldERvdCh2ZWN0b3IxLCB2ZWN0b3IyKSB7XG4gIHJldHVybiB2ZWN0b3IxLnggKiB2ZWN0b3IyLnggKyB2ZWN0b3IxLnkgKiB2ZWN0b3IyLnk7XG59XG5cbmZ1bmN0aW9uIG11bHRpcGx5KHZlY3RvcjEsIHZlY3RvcjIpIHtcbiAgcmV0dXJuIHtcbiAgICB4OiB2ZWN0b3IxLnggKiB2ZWN0b3IyLngsXG4gICAgeTogdmVjdG9yMS55ICogdmVjdG9yMi55XG4gIH07XG59XG5cbmZ1bmN0aW9uIGdldE1hZ25pdHVkZSh2ZWN0b3IpIHtcbiAgcmV0dXJuIE1hdGguc3FydChNYXRoLnBvdyh2ZWN0b3IueCwgMikgKyBNYXRoLnBvdyh2ZWN0b3IueSwgMikpO1xufVxuXG5mdW5jdGlvbiBjbG9zZXN0VG9Qb2ludCh0YXJnZXRQb2ludCwgcG9pbnRzKSB7XG4gIHZhciBjbG9zZXN0UG9pbnQgPSBwb2ludHNbMF07XG4gIHZhciBjbG9zZXN0RGlzdGFuY2UgPSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFk7XG4gIHZhciBjdXJyZW50RGlzdGFuY2U7XG4gIHBvaW50cy5mb3JFYWNoKGZ1bmN0aW9uIChwb2ludCkge1xuICAgIGN1cnJlbnREaXN0YW5jZSA9IGdldE1hZ25pdHVkZShnZXRWZWN0b3JCZXR3ZWVuUG9pbnRzKHRhcmdldFBvaW50LCBwb2ludCkpO1xuXG4gICAgaWYgKGN1cnJlbnREaXN0YW5jZSA8IGNsb3Nlc3REaXN0YW5jZSkge1xuICAgICAgY2xvc2VzdERpc3RhbmNlID0gY3VycmVudERpc3RhbmNlO1xuICAgICAgY2xvc2VzdFBvaW50ID0gcG9pbnQ7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGNsb3Nlc3RQb2ludDtcbn1cblxuZnVuY3Rpb24gZG9JbnRlcnNlY3RDaXJjbGVzU0FUKGNpcmNsZTEsIGNpcmNsZTIpIHtcbiAgdmFyIHNhdDEgPSBnZXRTQVRJbmZvRm9yQ2lyY2xlKGNpcmNsZTEpO1xuICB2YXIgc2F0MiA9IGdldFNBVEluZm9Gb3JDaXJjbGUoY2lyY2xlMik7XG4gIHZhciBjZW50ZXJQb2ludHNBeGlzID0gZ2V0VmVjdG9yQmV0d2VlblBvaW50cyhjaXJjbGUxLCBjaXJjbGUyKTtcbiAgc2F0MS5heGVzLnB1c2goY2VudGVyUG9pbnRzQXhpcyk7XG4gIHJldHVybiBkb0ludGVyc2VjdFNBVChzYXQxLCBzYXQyKTtcbn1cbmZ1bmN0aW9uIGRvSW50ZXJzZWN0Qm91bmRpbmdCb3hDaXJjbGVTQVQoYm94LCBjaXJjbGUpIHtcbiAgdmFyIHNhdDEgPSBnZXRTQVRJbmZvRm9yQm91bmRpbmdCb3goYm94KTtcbiAgdmFyIHNhdDIgPSBnZXRTQVRJbmZvRm9yQ2lyY2xlKGNpcmNsZSk7XG4gIHZhciBib3hQb2ludHMgPSBnZXRQb2ludHMoYm94KTtcbiAgdmFyIGNsb3Nlc3RQb2ludCA9IGNsb3Nlc3RUb1BvaW50KGNpcmNsZSwgYm94UG9pbnRzKTtcbiAgc2F0MS5heGVzLnB1c2goZ2V0VmVjdG9yQmV0d2VlblBvaW50cyhjbG9zZXN0UG9pbnQsIGNpcmNsZSkpO1xuICByZXR1cm4gZG9JbnRlcnNlY3RTQVQoc2F0MSwgc2F0Mik7XG59XG5mdW5jdGlvbiBkb0ludGVyc2VjdEJvdW5kaW5nQm94ZXNTQVQoYm94MSwgYm94Mikge1xuICB2YXIgc2F0MSA9IGdldFNBVEluZm9Gb3JCb3VuZGluZ0JveChib3gxKTtcbiAgdmFyIHNhdDIgPSBnZXRTQVRJbmZvRm9yQm91bmRpbmdCb3goYm94Mik7XG4gIHJldHVybiBkb0ludGVyc2VjdFNBVChzYXQxLCBzYXQyKTtcbn1cblxuZnVuY3Rpb24gZ2V0U0FUSW5mb0ZvckNpcmNsZShjaXJjbGUpIHtcbiAgcmV0dXJuIHtcbiAgICBheGVzOiBbXSxcbiAgICBwb2ludHM6IFt7XG4gICAgICB4OiBjaXJjbGUueCxcbiAgICAgIHk6IGNpcmNsZS55XG4gICAgfV0sXG4gICAgYnVmZmVyOiBjaXJjbGUuclxuICB9O1xufVxuXG5mdW5jdGlvbiBnZXRTQVRJbmZvRm9yQm91bmRpbmdCb3goYm94KSB7XG4gIHZhciBwb2ludHMgPSBnZXRQb2ludHMoYm94KTtcbiAgdmFyIHNpZGVzID0gZ2V0Tm9uUGFyYWxsZWxTaWRlVmVjdG9ycyhib3gpO1xuICB2YXIgYXhlcyA9IHNpZGVzLm1hcChmdW5jdGlvbiAoc2lkZSkge1xuICAgIHJldHVybiBnZXROb3JtYWwoc2lkZSk7XG4gIH0pO1xuICByZXR1cm4ge1xuICAgIGF4ZXM6IGF4ZXMsXG4gICAgcG9pbnRzOiBwb2ludHMsXG4gICAgYnVmZmVyOiAwXG4gIH07XG59XG5cbmZ1bmN0aW9uIGRvSW50ZXJzZWN0U0FUKHNhdDEsIHNhdDIpIHtcbiAgdmFyIHNjYWxhclByb2plY3Rpb247XG4gIHZhciBtYXhCb3gxO1xuICB2YXIgbWluQm94MTtcbiAgdmFyIG1heEJveDI7XG4gIHZhciBtaW5Cb3gyO1xuICB2YXIgb3ZlcmxhcDE7XG4gIHZhciBvdmVybGFwMjtcbiAgdmFyIG1pblRyYW5zbGF0aW9uRGlzdGFuY2UgPSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFk7XG4gIHZhciBtaW5UcmFuc2xhdGlvblZlY3RvciA9IG51bGw7XG4gIHZhciBheGVzID0gc2F0MS5heGVzLmNvbmNhdChzYXQyLmF4ZXMpLm1hcChmdW5jdGlvbiAoYXhpcykge1xuICAgIHJldHVybiBub3JtYWxpemUoYXhpcyk7XG4gIH0pO1xuICB2YXIgbnVtQXhlcyA9IGF4ZXMubGVuZ3RoO1xuXG4gIHZhciBfbG9vcCA9IGZ1bmN0aW9uIF9sb29wKGF4ZXNJbmRleCkge1xuICAgIG1heEJveDEgPSBOdW1iZXIuTkVHQVRJVkVfSU5GSU5JVFk7XG4gICAgbWluQm94MSA9IE51bWJlci5QT1NJVElWRV9JTkZJTklUWTtcbiAgICBtYXhCb3gyID0gTnVtYmVyLk5FR0FUSVZFX0lORklOSVRZO1xuICAgIG1pbkJveDIgPSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFk7IC8vIHByb2plY3QgYWxsIHNpZGVzIG9mIGJveDEgb250byBub3JtYWwgKHNlcGFyYXRpbmcgYXhpcylcbiAgICAvLyBXZSB3YW50IHRvIHJlY29yZCB0aGUgbWluaW11bSBhbmQgbWF4aW11bSBzY2FsYXIgcHJvamVjdGlvbnNcbiAgICAvLyBUaGlzIHdpbGwgYmUgZG9uZSBmb3IgYm90aCBib3hlc1xuXG4gICAgc2F0MS5wb2ludHMuZm9yRWFjaChmdW5jdGlvbiAocG9pbnRJbjEpIHtcbiAgICAgIHNjYWxhclByb2plY3Rpb24gPSBnZXREb3QocG9pbnRJbjEsIGF4ZXNbYXhlc0luZGV4XSk7XG4gICAgICBtaW5Cb3gxID0gTWF0aC5taW4oc2NhbGFyUHJvamVjdGlvbiAtIHNhdDEuYnVmZmVyLCBtaW5Cb3gxKTtcbiAgICAgIG1heEJveDEgPSBNYXRoLm1heChzY2FsYXJQcm9qZWN0aW9uICsgc2F0MS5idWZmZXIsIG1heEJveDEpO1xuICAgIH0pO1xuICAgIHNhdDIucG9pbnRzLmZvckVhY2goZnVuY3Rpb24gKHBvaW50SW4yKSB7XG4gICAgICBzY2FsYXJQcm9qZWN0aW9uID0gZ2V0RG90KHBvaW50SW4yLCBheGVzW2F4ZXNJbmRleF0pO1xuICAgICAgbWluQm94MiA9IE1hdGgubWluKHNjYWxhclByb2plY3Rpb24gLSBzYXQyLmJ1ZmZlciwgbWluQm94Mik7XG4gICAgICBtYXhCb3gyID0gTWF0aC5tYXgoc2NhbGFyUHJvamVjdGlvbiArIHNhdDIuYnVmZmVyLCBtYXhCb3gyKTtcbiAgICB9KTsgLy8gTXVzdCBpbnRlcnNlY3QgKG92ZXJsYXApIG9uIGFsbCBzZXBhcmF0aW5nIGF4ZXNcbiAgICAvLyBDYW4gYmFpbCBlYXJseSwgb3Igb24gdGhlIGZpcnN0IHRpbWUgbm90IG92ZXJsYXBwaW5nXG5cbiAgICBpZiAobWF4Qm94MSA8IG1pbkJveDIgfHwgbWF4Qm94MiA8IG1pbkJveDEpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHY6IG51bGxcbiAgICAgIH07XG4gICAgfSAvLyBjb21wdXRlIG92ZXJsYXBcblxuXG4gICAgb3ZlcmxhcDEgPSBtYXhCb3gxIC0gbWluQm94MjtcbiAgICBvdmVybGFwMiA9IG1heEJveDIgLSBtaW5Cb3gxO1xuXG4gICAgaWYgKG92ZXJsYXAxIDwgbWluVHJhbnNsYXRpb25EaXN0YW5jZSkge1xuICAgICAgbWluVHJhbnNsYXRpb25EaXN0YW5jZSA9IG92ZXJsYXAxO1xuICAgICAgbWluVHJhbnNsYXRpb25WZWN0b3IgPSBheGVzW2F4ZXNJbmRleF07XG4gICAgfVxuXG4gICAgaWYgKG92ZXJsYXAyIDwgbWluVHJhbnNsYXRpb25EaXN0YW5jZSkge1xuICAgICAgbWluVHJhbnNsYXRpb25EaXN0YW5jZSA9IG92ZXJsYXAyO1xuICAgICAgbWluVHJhbnNsYXRpb25WZWN0b3IgPSBheGVzW2F4ZXNJbmRleF07XG4gICAgfVxuICB9O1xuXG4gIGZvciAodmFyIGF4ZXNJbmRleCA9IDA7IGF4ZXNJbmRleCA8IG51bUF4ZXM7IGF4ZXNJbmRleCsrKSB7XG4gICAgdmFyIF9yZXQgPSBfbG9vcChheGVzSW5kZXgpO1xuXG4gICAgaWYgKF90eXBlb2YoX3JldCkgPT09IFwib2JqZWN0XCIpIHJldHVybiBfcmV0LnY7XG4gIH1cblxuICByZXR1cm4gbWluVHJhbnNsYXRpb25WZWN0b3IgPyBtdWx0aXBseShtaW5UcmFuc2xhdGlvblZlY3Rvciwge1xuICAgIHg6IG1pblRyYW5zbGF0aW9uRGlzdGFuY2UsXG4gICAgeTogbWluVHJhbnNsYXRpb25EaXN0YW5jZVxuICB9KSA6IG51bGw7XG59XG5cbi8vIC0gQ2lyY2xlIGFuZCBDaXJjbGVcbi8vIC0gQ2lyY2xlIGFuZCBQb2ludFxuLy8gLSBDaXJjbGUgYW5kIEJvdW5kaW5nQm94XG4vLyAtIEJvdW5kaW5nQm94IGFuZCBCb3VuZGluZ0JveFxuLy8gLSBCb3VuZGluZ0JveCBhbmQgUG9pbnRcbi8vIC0gUG9pbnQgYW5kIFBvaW50XG5cbmZ1bmN0aW9uIGlzQ2lyY2xlKGJvdW5kKSB7XG4gIHJldHVybiBib3VuZC5yICE9PSB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIGlzQm91bmRpbmdCb3goYm91bmQpIHtcbiAgcmV0dXJuIGJvdW5kLndpZHRoICE9PSB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIGlzUG9pbnQoYm91bmQpIHtcbiAgcmV0dXJuICFpc0NpcmNsZShib3VuZCkgJiYgIWlzQm91bmRpbmdCb3goYm91bmQpO1xufVxuXG5mdW5jdGlvbiB0b0NpcmNsZUZyb21Qb2ludChwb2ludCkge1xuICByZXR1cm4ge1xuICAgIHg6IHBvaW50LngsXG4gICAgeTogcG9pbnQueSxcbiAgICByOiAwXG4gIH07XG59XG5cbmZ1bmN0aW9uIGRvQm91bmRzSW50ZXJzZWN0KGJvdW5kMSwgYm91bmQyKSB7XG4gIHZhciBpc0JvdW5kMUNpcmNsZSA9IGlzQ2lyY2xlKGJvdW5kMSk7XG4gIHZhciBpc0JvdW5kMkNpcmNsZSA9IGlzQ2lyY2xlKGJvdW5kMik7XG4gIHZhciBpc0JvdW5kMUJvdW5kaW5nQm94ID0gaXNCb3VuZGluZ0JveChib3VuZDEpO1xuICB2YXIgaXNCb3VuZDJCb3VuZGluZ0JveCA9IGlzQm91bmRpbmdCb3goYm91bmQyKTtcbiAgdmFyIGlzQm91bmQxUG9pbnQgPSBpc1BvaW50KGJvdW5kMSk7XG4gIHZhciBpc0JvdW5kMlBvaW50ID0gaXNQb2ludChib3VuZDIpOyAvLyBUaGV5IGFyZSBib3RoIGNpcmNsZXNcblxuICBpZiAoaXNCb3VuZDFDaXJjbGUgJiYgaXNCb3VuZDJDaXJjbGUpIHtcbiAgICByZXR1cm4gZG9JbnRlcnNlY3RDaXJjbGVzU0FUKGJvdW5kMSwgYm91bmQyKTtcbiAgfSAvLyBUaGV5IGFyZSBib3RoIGJvdW5kaW5nIGJveGVzXG5cblxuICBpZiAoaXNCb3VuZDFCb3VuZGluZ0JveCAmJiBpc0JvdW5kMkJvdW5kaW5nQm94KSB7XG4gICAgcmV0dXJuIGRvSW50ZXJzZWN0Qm91bmRpbmdCb3hlc1NBVChib3VuZDEsIGJvdW5kMik7XG4gIH0gLy8gVGhleSBhcmUgYm90aCBwb2ludHNcblxuXG4gIGlmIChpc0JvdW5kMVBvaW50ICYmIGlzQm91bmQyUG9pbnQpIHtcbiAgICB2YXIgX3BvaW50MUNpcmNsZSA9IHRvQ2lyY2xlRnJvbVBvaW50KGJvdW5kMSk7XG5cbiAgICB2YXIgcG9pbnQyQ2lyY2xlID0gdG9DaXJjbGVGcm9tUG9pbnQoYm91bmQyKTtcbiAgICByZXR1cm4gZG9JbnRlcnNlY3RDaXJjbGVzU0FUKF9wb2ludDFDaXJjbGUsIHBvaW50MkNpcmNsZSk7XG4gIH0gLy8gMSBpcyBjaXJjbGUsIDIgaXMgYm91bmRpbmcgYm94XG5cblxuICBpZiAoaXNCb3VuZDFDaXJjbGUgJiYgaXNCb3VuZDJCb3VuZGluZ0JveCkge1xuICAgIHJldHVybiBkb0ludGVyc2VjdEJvdW5kaW5nQm94Q2lyY2xlU0FUKGJvdW5kMiwgYm91bmQxKTtcbiAgfSAvLyAxIGlzIGJvdW5kaW5nIGJveCwgMiBpcyBjaXJjbGVcblxuXG4gIGlmIChpc0JvdW5kMUJvdW5kaW5nQm94ICYmIGlzQm91bmQyQ2lyY2xlKSB7XG4gICAgcmV0dXJuIGRvSW50ZXJzZWN0Qm91bmRpbmdCb3hDaXJjbGVTQVQoYm91bmQxLCBib3VuZDIpO1xuICB9IC8vIDEgaXMgY2lyY2xlLCAyIGlzIHBvaW50XG5cblxuICBpZiAoaXNCb3VuZDFDaXJjbGUgJiYgaXNCb3VuZDJQb2ludCkge1xuICAgIHZhciBfcG9pbnQyQ2lyY2xlID0gdG9DaXJjbGVGcm9tUG9pbnQoYm91bmQyKTtcblxuICAgIHJldHVybiBkb0ludGVyc2VjdENpcmNsZXNTQVQoYm91bmQxLCBfcG9pbnQyQ2lyY2xlKTtcbiAgfSAvLyAxIGlzIHBvaW50LCAyIGlzIDIgaXMgY2lyY2xlXG5cblxuICBpZiAoaXNCb3VuZDFQb2ludCAmJiBpc0JvdW5kMkNpcmNsZSkge1xuICAgIHZhciBfcG9pbnQxQ2lyY2xlMiA9IHRvQ2lyY2xlRnJvbVBvaW50KGJvdW5kMSk7XG5cbiAgICByZXR1cm4gZG9JbnRlcnNlY3RDaXJjbGVzU0FUKF9wb2ludDFDaXJjbGUyLCBib3VuZDIpO1xuICB9IC8vIDEgaXMgYm91bmRpbmcgYm94LCAyIGlzIHBvaW50XG5cblxuICBpZiAoaXNCb3VuZDFCb3VuZGluZ0JveCAmJiBpc0JvdW5kMlBvaW50KSB7XG4gICAgdmFyIF9wb2ludDJDaXJjbGUyID0gdG9DaXJjbGVGcm9tUG9pbnQoYm91bmQyKTtcblxuICAgIHJldHVybiBkb0ludGVyc2VjdEJvdW5kaW5nQm94Q2lyY2xlU0FUKGJvdW5kMSwgX3BvaW50MkNpcmNsZTIpO1xuICB9IC8vIDEgaXMgcG9pbnQsIDIgaXMgYm91bmRpbmcgYm94XG5cblxuICB2YXIgcG9pbnQxQ2lyY2xlID0gdG9DaXJjbGVGcm9tUG9pbnQoYm91bmQxKTtcbiAgcmV0dXJuIGRvSW50ZXJzZWN0Qm91bmRpbmdCb3hDaXJjbGVTQVQoYm91bmQyLCBwb2ludDFDaXJjbGUpO1xufVxuZnVuY3Rpb24gZGl2aWRlQm91bmRpbmdCb3goYm91bmRzKSB7XG4gIHZhciBxdWFkV2lkdGggPSBib3VuZHMud2lkdGggLyAyO1xuICB2YXIgcXVhZEhlaWdodCA9IGJvdW5kcy5oZWlnaHQgLyAyO1xuICB2YXIgb2Zmc2V0WCA9IGJvdW5kcy54ICsgcXVhZFdpZHRoO1xuICB2YXIgb2Zmc2V0WSA9IGJvdW5kcy55ICsgcXVhZEhlaWdodDtcbiAgdmFyIG53Qm91bmRpbmdCb3ggPSB7XG4gICAgeDogYm91bmRzLngsXG4gICAgeTogYm91bmRzLnksXG4gICAgd2lkdGg6IHF1YWRXaWR0aCxcbiAgICBoZWlnaHQ6IHF1YWRIZWlnaHRcbiAgfTtcbiAgdmFyIG5lQm91bmRpbmdCb3ggPSB7XG4gICAgeDogb2Zmc2V0WCxcbiAgICB5OiBib3VuZHMueSxcbiAgICB3aWR0aDogcXVhZFdpZHRoLFxuICAgIGhlaWdodDogcXVhZEhlaWdodFxuICB9O1xuICB2YXIgc3dCb3VuZGluZ0JveCA9IHtcbiAgICB4OiBib3VuZHMueCxcbiAgICB5OiBvZmZzZXRZLFxuICAgIHdpZHRoOiBxdWFkV2lkdGgsXG4gICAgaGVpZ2h0OiBxdWFkSGVpZ2h0XG4gIH07XG4gIHZhciBzZUJvdW5kaW5nQm94ID0ge1xuICAgIHg6IG9mZnNldFgsXG4gICAgeTogb2Zmc2V0WSxcbiAgICB3aWR0aDogcXVhZFdpZHRoLFxuICAgIGhlaWdodDogcXVhZEhlaWdodFxuICB9O1xuICByZXR1cm4gW253Qm91bmRpbmdCb3gsIG5lQm91bmRpbmdCb3gsIHN3Qm91bmRpbmdCb3gsIHNlQm91bmRpbmdCb3hdO1xufVxuZnVuY3Rpb24gY3JlYXRlUG9pbnRLZXkocG9pbnQpIHtcbiAgcmV0dXJuIFwiKFwiLmNvbmNhdChwb2ludC54LCBcIixcIikuY29uY2F0KHBvaW50LnksIFwiKVwiKTtcbn1cbmZ1bmN0aW9uIGZsYXR0ZW5TZXRzKHNldHMpIHtcbiAgcmV0dXJuIHNldHMucmVkdWNlKGZ1bmN0aW9uIChmbGF0dGVuZWRTZXQsIGN1cnJTZXQpIHtcbiAgICBjdXJyU2V0LmZvckVhY2goZnVuY3Rpb24gKHNldEl0ZW0pIHtcbiAgICAgIHJldHVybiBmbGF0dGVuZWRTZXQuYWRkKHNldEl0ZW0pO1xuICAgIH0pO1xuICAgIHJldHVybiBmbGF0dGVuZWRTZXQ7XG4gIH0sIG5ldyBTZXQoKSk7XG59XG5cbmZ1bmN0aW9uIGFkZFRvUXVhZFRyZWUocXVhZFRyZWUsIG9iamVjdCkge1xuICB2YXIgb2JqZWN0UG9pbnQgPSB7XG4gICAgeDogb2JqZWN0LngsXG4gICAgeTogb2JqZWN0LnlcbiAgfTsgLy8gTGV0J3MgZmlyc3QgY2hlY2sgaWYgdGhlIHBvaW50IHRoaXMgb2JqZWN0IG9jY3VwaWVzIGlzIHdpdGhpblxuICAvLyB0aGUgYm91bmRzIG9mIHRoZSBidWNrZXRcblxuICBpZiAoIWRvQm91bmRzSW50ZXJzZWN0KHF1YWRUcmVlLmJvdW5kcywgb2JqZWN0UG9pbnQpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9IC8vIENoZWNraW5nIGNoaWxkcmVuLCBpZiB0aGlzIG5vZGUgaXMgYSBcIkNvbnRhaW5lclwiIChObyBkYXRhKVxuXG5cbiAgaWYgKChxdWFkVHJlZS5xdWFkcmFudHMgfHwgW10pLmxlbmd0aCkge1xuICAgIC8vIFJ1biB0aHJvdWdoIGFsbCBjaGlsZHJlbiBjaGVja2luZyBpZiB0aGUgb2JqZWN0IGNhbiBiZSBhZGRlZFxuICAgIC8vIEF0IHRoZSBmaXJzdCBzdWNjZXNzZnVsIGFkZCwgd2UgY2FuIGJhaWwgb3V0LCBvbmx5IG5lZWRzIHRvIGJlIHN0b3JlZCBvbmNlXG4gICAgdmFyIHdhc0FkZGVkVG9DaGlsZCA9IHF1YWRUcmVlLnF1YWRyYW50cy5zb21lKGZ1bmN0aW9uIChxdWFkcmFudCkge1xuICAgICAgcmV0dXJuIGFkZFRvUXVhZFRyZWUocXVhZHJhbnQsIG9iamVjdCk7XG4gICAgfSk7IC8vIE9ubHkgbGVhZiBub2RlcyBzaG91bGQgaGF2ZSBkYXRhIChXZSBhcmUgYSBcIkNvbnRhaW5lciBub2RlXCIpXG4gICAgLy8gSWYgaXQgZGlkbid0IGludGVyc2VjdCB3aXRoIGFueSBjaGlsZCwgaXQgd29uJ3QgaW50ZXJzZWN0IHdpdGggdXNcblxuICAgIHJldHVybiB3YXNBZGRlZFRvQ2hpbGQ7XG4gIH0gLy8gTGV0J3MgZ2V0IHRoZSBkYXRhIGFscmVhZHkgYXNzb2NpYXRlZCB3aXRoIHRoaXMgYnVja2V0XG5cblxuICB2YXIgb2JqZWN0UG9pbnRLZXkgPSBjcmVhdGVQb2ludEtleShvYmplY3RQb2ludCk7XG4gIHZhciBvYmplY3RQb2ludFNldCA9IHF1YWRUcmVlLmRhdGEuZ2V0KG9iamVjdFBvaW50S2V5KSB8fCBuZXcgU2V0KCk7IC8vIExldCdzIGNoZWNrIGlmIHRoZSBvYmplY3QgaXMgYWxyZWFkeSBpbiB0aGUgYnVja2V0XG5cbiAgaWYgKG9iamVjdFBvaW50U2V0LmhhcyhvYmplY3QpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9IC8vIExldCdzIHNlZSBpZiB0aGlzIHF1YWRyYW50IGhhcyBhbnkgY2FwYWNpdHlcbiAgLy8gSWYgaXQgZG9lcywgd2UgY2FuIGdvIGFoZWFkIGFuZCBzdG9yZSB0aGUgY3VycmVudCBvYmplY3RcbiAgLy9cbiAgLy8gV2UgYWxzbyB3YW5uYSBnbyBhaGVhZCBhbmQgYWRkLCBpZiB0aGlzIHBvaW50ICh4LCB5KSBoYXMgYWxyZWFkeVxuICAvLyBoYWQgYW4gb2JqZWN0IGFkZGVkLCB3ZSdsbCBjaGFpbiBpdCBvbiB0byB0aGUgbGlzdCBvZiBvYmplY3RzIFxuICAvLyBhc3NvY2lhdGVkIHdpdGggdGhpcyBwb2ludFxuXG5cbiAgaWYgKG9iamVjdFBvaW50U2V0LnNpemUgPiAwIHx8IHF1YWRUcmVlLmRhdGEuc2l6ZSArIDEgPD0gcXVhZFRyZWUuY2FwYWNpdHkpIHtcbiAgICBvYmplY3RQb2ludFNldC5hZGQob2JqZWN0KTtcbiAgICBxdWFkVHJlZS5kYXRhLnNldChvYmplY3RQb2ludEtleSwgb2JqZWN0UG9pbnRTZXQpO1xuICAgIHJldHVybiB0cnVlO1xuICB9IC8vIFRoZSBjdXJyZW50IG5vZGUgZml0cyB0aGUgY3VycmVudCBvYmplY3QsIGJ1dFxuICAvLyBUaGVyZSBpc24ndCBhbnkgY2FwYWNpdHlcbiAgLy8gV2UgbmVlZCB0byBzcGxpdCB0aGlzIGJ1Y2tldCB1cFxuICAvLyBMZXQncyBmaXJzdCBidWlsZCB0aGUgY2hpbGQgcXVhZHJhbnRzXG4gIC8vIExldCdzIGNyZWF0ZSB0aGUgY2hpbGQgUXVhZFRyZWUncyBmcm9tIHRoZSBkaXZpZGVkIHF1YWRyYW50IGJvdW5kc1xuXG5cbiAgdmFyIHF1YWRCb3hlcyA9IGRpdmlkZUJvdW5kaW5nQm94KHF1YWRUcmVlLmJvdW5kcyk7XG4gIHZhciBxdWFkcmFudHMgPSBxdWFkQm94ZXMubWFwKGZ1bmN0aW9uIChxdWFkQm94KSB7XG4gICAgcmV0dXJuIGNyZWF0ZVF1YWRUcmVlKHF1YWRCb3gsIHF1YWRUcmVlLmNhcGFjaXR5KTtcbiAgfSk7XG4gIHZhciBxdWFkT2JqZWN0cyA9IGdldFF1YWRUcmVlRGF0YShxdWFkVHJlZSkuY29uY2F0KG9iamVjdCk7IC8vIGFkanVzdCBjdXJyZW50IHF1YWR0cmVlIHNldHRpbmdzXG4gIC8vIE1heSBuZWVkIHRvIGFkanVzdCB0aGVzZSBpbi1wbGFjZSBpbnN0ZWFkIG9mIGNyZWF0aW5nIG5ldyByZWZlcmVuY2VzXG5cbiAgY2xlYXJRdWFkVHJlZShxdWFkVHJlZSk7XG4gIHF1YWRUcmVlLnF1YWRyYW50cyA9IHF1YWRyYW50czsgLy8gYWRkIG9iamVjdHMgZnJvbSB0aGlzIHF1YWQgbm9kZSBiYWNrIHRvIGl0J3Mgb3duIHN1YnRyZWVcbiAgLy8gY2hpbGRyZW4gd2lsbCBiZSBhdHRlbXB0ZWQgdG8gYmUgYWRkZWQgdG8gZmlyc3RcblxuICByZXR1cm4gcXVhZE9iamVjdHMuZXZlcnkoZnVuY3Rpb24gKHF1YWRPYmplY3QpIHtcbiAgICByZXR1cm4gYWRkVG9RdWFkVHJlZShxdWFkVHJlZSwgcXVhZE9iamVjdCk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiByZW1vdmVGcm9tUXVhZFRyZWUocXVhZFRyZWUsIG9iamVjdCkge1xuICB2YXIgb2JqZWN0UG9pbnQgPSB7XG4gICAgeDogb2JqZWN0LngsXG4gICAgeTogb2JqZWN0LnlcbiAgfTtcbiAgdmFyIG9iamVjdFBvaW50S2V5ID0gY3JlYXRlUG9pbnRLZXkob2JqZWN0UG9pbnQpO1xuICB2YXIgb2JqZWN0UG9pbnRTZXQgPSBxdWFkVHJlZS5kYXRhLmdldChvYmplY3RQb2ludEtleSkgfHwgbmV3IFNldCgpOyAvLyBMZXQncyBmaXJzdCBjaGVjayBpZiB0aGUgcG9pbnQgdGhpcyBvYmplY3Qgb2NjdXBpZXMgaXMgd2l0aGluXG4gIC8vIHRoZSBib3VuZHMgb2YgdGhlIGJ1Y2tldFxuXG4gIGlmICghZG9Cb3VuZHNJbnRlcnNlY3QocXVhZFRyZWUuYm91bmRzLCBvYmplY3RQb2ludCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0gLy8gSWYgb2JqZWN0IGlzIGZvdW5kLCBsZXQncyByZW1vdmUgaXRcblxuXG4gIGlmIChvYmplY3RQb2ludFNldC5oYXMob2JqZWN0KSkge1xuICAgIG9iamVjdFBvaW50U2V0W1wiZGVsZXRlXCJdKG9iamVjdCk7IC8vIElmIHRoZXJlIHdlcmUgbXVsdGlwbGUgb2JqZWN0cyBhdCB0aGlzIHBvaW50XG4gICAgLy8gd2UgZG9uJ3QgbmVlZCB0byByZW1vdmUgdGhpcyBwb2ludCBrZXlcblxuICAgIGlmIChvYmplY3RQb2ludFNldC5zaXplID4gMCkge1xuICAgICAgcXVhZFRyZWUuZGF0YS5zZXQob2JqZWN0UG9pbnRLZXksIG9iamVjdFBvaW50U2V0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcXVhZFRyZWUuZGF0YVtcImRlbGV0ZVwiXShvYmplY3RQb2ludEtleSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH0gLy8gQ2hlY2sgY2hpbGRyZW4gdG8gZmluZCBvYmplY3QgYW5kIHJlbW92ZSBpZiBmb3VuZFxuXG5cbiAgdmFyIHdhc1JlbW92ZWQgPSBxdWFkVHJlZS5xdWFkcmFudHMuc29tZShmdW5jdGlvbiAocXVhZHJhbnQpIHtcbiAgICByZXR1cm4gcmVtb3ZlRnJvbVF1YWRUcmVlKHF1YWRyYW50LCBvYmplY3QpO1xuICB9KTsgLy8gSWYgb25lIG9mIHRoZSBjaGlsZHJlbiBjb250YWluZWQgdGhlIG9iamVjdCB3ZSBqdXN0IHJlbW92ZWRcbiAgLy8gTGV0J3MgcXVlcnkgdGhlIGJvdW5kaW5nIGJveCBvZiB1cyAodGhlIHBhcmVudCkgdG8gc2VlIGlmIHdlIFxuICAvLyBjYW4gY29sbGFwc2Ugb3IgY29uc3VtZSBvdXIgY2hpbGRyZW4uIE1lYW5pbmcgdGhlIGNoaWxkIHN1YnRyZWVcbiAgLy8gY29udGFpbnMgbGVzcyBlbGVtZW50cyB0aGFuIG91ciBpbmRpdmlkdWFsIGJ1Y2tldCBjYXBhY2l0eS5cblxuICBpZiAod2FzUmVtb3ZlZCkge1xuICAgIHZhciBjaGlsZE9iamVjdFNldCA9IHF1ZXJ5UXVhZFRyZWUocXVhZFRyZWUsIHF1YWRUcmVlLmJvdW5kcyk7XG5cbiAgICBpZiAoY2hpbGRPYmplY3RTZXQuc2l6ZSA8PSBxdWFkVHJlZS5jYXBhY2l0eSkge1xuICAgICAgY2xlYXJRdWFkVHJlZShxdWFkVHJlZSk7XG4gICAgICBjaGlsZE9iamVjdFNldC5mb3JFYWNoKGZ1bmN0aW9uIChjaGlsZE9iamVjdCkge1xuICAgICAgICByZXR1cm4gYWRkVG9RdWFkVHJlZShxdWFkVHJlZSwgY2hpbGRPYmplY3QpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHdhc1JlbW92ZWQ7XG59XG5cbmZ1bmN0aW9uIGNsZWFyUXVhZFRyZWUocXVhZFRyZWUpIHtcbiAgcXVhZFRyZWUuZGF0YSA9IG5ldyBNYXAoKTtcbiAgcXVhZFRyZWUucXVhZHJhbnRzID0gW107XG59XG5cbmZ1bmN0aW9uIHF1ZXJ5UXVhZFRyZWUocXVhZFRyZWUsIGJvdW5kcykge1xuICAvLyBDaGVjayBmaXJzdCBpZiB0aGUgcXVlcnkgYm91bmRzIGludGVyc2VjdCB3aXRoIHRoZSBib3VuZHNcbiAgLy8gb2YgdGhlIGJ1Y2tldCwgaWYgaXQgZG9lc24ndCB3ZSBjYW4gYmFpbCBpbW1lZGlhdGVseSB3aXRoIGFuIGVtcHR5IGxpc3RcbiAgaWYgKCFkb0JvdW5kc0ludGVyc2VjdChxdWFkVHJlZS5ib3VuZHMsIGJvdW5kcykpIHtcbiAgICByZXR1cm4gbmV3IFNldCgpO1xuICB9IC8vIENoZWNrIGlmIGN1cnJlbnQgbm9kZSBoYXMgY2hpbGRyZW5cblxuXG4gIGlmICgocXVhZFRyZWUucXVhZHJhbnRzIHx8IFtdKS5sZW5ndGggPT09IDApIHtcbiAgICAvLyBMZXQncyBpdGVyYXRlIG92ZXIgdGhlIGRhdGEgaW4gdGhlIGJ1Y2tldCB0byBzZWVcbiAgICAvLyBpZiB0aGUgb2JqZWN0cyB0aGVtc2VsdmVzIGludGVyc2VjdCB3aXRoIHRoZSBxdWVyeSBib3VuZHNcbiAgICB2YXIgcXVlcnlSZXN1bHRTZXQgPSBuZXcgU2V0KCk7XG4gICAgZ2V0UXVhZFRyZWVEYXRhKHF1YWRUcmVlKS5mb3JFYWNoKGZ1bmN0aW9uIChxdWFkT2JqZWN0KSB7XG4gICAgICB2YXIgbXR2ID0gZG9Cb3VuZHNJbnRlcnNlY3QocXVhZE9iamVjdCwgYm91bmRzKTtcblxuICAgICAgaWYgKG10diAmJiBxdWFkT2JqZWN0ICE9PSBib3VuZHMpIHtcbiAgICAgICAgcXVlcnlSZXN1bHRTZXQuYWRkKF9vYmplY3RTcHJlYWQyKHt9LCBxdWFkT2JqZWN0LCB7XG4gICAgICAgICAgbXR2OiBtdHZcbiAgICAgICAgfSkpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBxdWVyeVJlc3VsdFNldDtcbiAgfSAvLyBDaGVjayB0aGUgY3VycmVudCBub2RlcyBjaGlsZHJlblxuICAvLyBxdWVyeWluZyB0aGVtIGZvciB0aGUgc2FtZSBpbmZvIGFuZCBjb2xsZWN0aW5nXG4gIC8vIHRoZSByZXN1bHRzXG5cblxuICB2YXIgY2hpbGRRdWVyeVJlc3VsdFNldCA9IGZsYXR0ZW5TZXRzKHF1YWRUcmVlLnF1YWRyYW50cy5tYXAoZnVuY3Rpb24gKHF1YWRyYW50KSB7XG4gICAgcmV0dXJuIHF1ZXJ5UXVhZFRyZWUocXVhZHJhbnQsIGJvdW5kcyk7XG4gIH0pKTtcbiAgcmV0dXJuIGNoaWxkUXVlcnlSZXN1bHRTZXQ7XG59XG5cbmZ1bmN0aW9uIGdldFF1YWRUcmVlRGF0YShxdWFkVHJlZSkge1xuICByZXR1cm4gQXJyYXkuZnJvbShmbGF0dGVuU2V0cyhBcnJheS5mcm9tKHF1YWRUcmVlLmRhdGEudmFsdWVzKCkpKSk7XG59XG4vKipcbiAqIENyZWF0ZXMgYSBxdWFkdHJlZSBcIm1hbmFnaW5nXCIgdGhlIGlucHV0IGJvdW5kcyB3aXRoIGlucHV0IG5vZGUgY2FwYWNpdHkuXG4gKiBcbiAqIEFsbCBjb2xsaXNpb24gb2JqZWN0cyBzaG91bGQgaW50ZXJzZWN0IG9yIGJlIGNvbnRhaW5lZCB3aXRoaW4gdGhlc2UgXCJtYW5hZ2VkXCIgYm91bmRzLlxuICogQHBhcmFtIHtCb3VuZGluZ0JveH0gYm91bmRzIC0gVGhlIGJvdW5kaW5nIGJveCB3aXRoIHdoaWNoIHRoZSBxdWFkdHJlZSBcIm1hbmFnZXNcIi5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbY2FwYWNpdHk9M10gLSBUaGUgIyBvZiBjb2xsaXNpb24gb2JqZWN0cyBhIG5vZGUgY2FuIGNvbnRhaW4gYmVmb3JlIHN1YmRpdmlkaW5nLlxuICogQHJldHVybiB7UXVhZFRyZWV9IFRoZSBjcmVhdGVkIHF1YWR0cmVlIFwibWFuYWdpbmdcIiB0aGUgaW5wdXQgYm91bmRzLlxuICovXG5cblxuZnVuY3Rpb24gY3JlYXRlUXVhZFRyZWUoYm91bmRzKSB7XG4gIHZhciBjYXBhY2l0eSA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogMztcbiAgdmFyIHF1YWRUcmVlID0ge1xuICAgIGJvdW5kczogYm91bmRzLFxuICAgIGRhdGE6IG5ldyBNYXAoKSxcbiAgICBjYXBhY2l0eTogY2FwYWNpdHksXG4gICAgcXVhZHJhbnRzOiBbXSxcbiAgICBhZGQ6IGZ1bmN0aW9uIGFkZChvYmplY3QpIHtcbiAgICAgIHJldHVybiBhZGRUb1F1YWRUcmVlKHF1YWRUcmVlLCBvYmplY3QpO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUob2JqZWN0KSB7XG4gICAgICByZXR1cm4gcmVtb3ZlRnJvbVF1YWRUcmVlKHF1YWRUcmVlLCBvYmplY3QpO1xuICAgIH0sXG4gICAgY2xlYXI6IGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgICAgcmV0dXJuIGNsZWFyUXVhZFRyZWUocXVhZFRyZWUpO1xuICAgIH0sXG4gICAgcXVlcnk6IGZ1bmN0aW9uIHF1ZXJ5KGJvdW5kcykge1xuICAgICAgcmV0dXJuIHF1ZXJ5UXVhZFRyZWUocXVhZFRyZWUsIGJvdW5kcyk7XG4gICAgfSxcbiAgICBnZXREYXRhOiBmdW5jdGlvbiBnZXREYXRhKCkge1xuICAgICAgcmV0dXJuIGdldFF1YWRUcmVlRGF0YShxdWFkVHJlZSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gcXVhZFRyZWU7XG59XG5cbmV4cG9ydCB7IGNyZWF0ZVF1YWRUcmVlIH07XG4iLCJpbXBvcnQgeyBQaXhlbCwgQ29sb3IgfSBmcm9tICcuL3NjaGVtYSc7XG5pbXBvcnQgR0lGIGZyb20gJ2dpZi5qcyc7XG5cbmV4cG9ydCBjb25zdCBQSVhFTF9XSURUSDogbnVtYmVyID0gNDtcbmV4cG9ydCBjb25zdCBXSElURV9DT0xPUjogQ29sb3IgPSB7XG4gICAgcjogMjU1LFxuICAgIGc6IDI1NSxcbiAgICBiOiAyNTUsXG4gICAgYTogMjU1LFxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRJbWFnZShpbWFnZUZpbGU6IEZpbGUpOiBQcm9taXNlPEhUTUxJbWFnZUVsZW1lbnQ+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBjb25zdCBpbWFnZUZpbGVEYXRhVXJsID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoaW1hZ2VGaWxlKTtcbiAgICAgICAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcblxuICAgICAgICBpbWFnZS5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgICB3aW5kb3cuVVJMLnJldm9rZU9iamVjdFVSTChpbWFnZUZpbGVEYXRhVXJsKTtcbiAgICAgICAgICAgIHJlc29sdmUoaW1hZ2UpXG4gICAgICAgIH07XG4gICAgICAgIGltYWdlLm9uZXJyb3IgPSAoZXJyKSA9PiB7XG4gICAgICAgICAgICB3aW5kb3cuVVJMLnJldm9rZU9iamVjdFVSTChpbWFnZUZpbGVEYXRhVXJsKTtcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9O1xuICAgICAgICBpbWFnZS5zcmMgPSBpbWFnZUZpbGVEYXRhVXJsO1xuICAgIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0QXZlcmFnZUNvbG9yKHBpeGVsczogUGl4ZWxbXSk6IENvbG9yIHtcbiAgICBsZXQgc3F1YXJlZFN1bVI6IG51bWJlcjtcbiAgICBsZXQgc3F1YXJlZFN1bUc6IG51bWJlcjtcbiAgICBsZXQgc3F1YXJlZFN1bUI6IG51bWJlcjtcbiAgICBsZXQgc3F1YXJlZFN1bUE6IG51bWJlcjtcbiAgICBsZXQgYXZlcmFnZUNvbG9yOiBDb2xvciA9IHBpeGVsc1swXSB8fCBXSElURV9DT0xPUjtcblxuICAgIGlmIChwaXhlbHMubGVuZ3RoID4gMSkge1xuICAgICAgICByZXR1cm4gcGl4ZWxzLnNsaWNlKDEpXG4gICAgICAgICAgICAucmVkdWNlKChwcmV2QXZlcmFnZTogQ29sb3IsIGN1cnJQaXhlbDogUGl4ZWwpID0+IHtcbiAgICAgICAgICAgICAgICBzcXVhcmVkU3VtUiA9IE1hdGgucG93KHByZXZBdmVyYWdlLnIsIDIpICsgTWF0aC5wb3coY3VyclBpeGVsLnIsIDIpO1xuICAgICAgICAgICAgICAgIHNxdWFyZWRTdW1HID0gTWF0aC5wb3cocHJldkF2ZXJhZ2UuZywgMikgKyBNYXRoLnBvdyhjdXJyUGl4ZWwuZywgMik7XG4gICAgICAgICAgICAgICAgc3F1YXJlZFN1bUIgPSBNYXRoLnBvdyhwcmV2QXZlcmFnZS5iLCAyKSArIE1hdGgucG93KGN1cnJQaXhlbC5iLCAyKTtcbiAgICAgICAgICAgICAgICBzcXVhcmVkU3VtQSA9IE1hdGgucG93KHByZXZBdmVyYWdlLmEsIDIpICsgTWF0aC5wb3coY3VyclBpeGVsLmEsIDIpO1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHI6IE1hdGguc3FydChzcXVhcmVkU3VtUiAvIDIpLFxuICAgICAgICAgICAgICAgICAgICBnOiBNYXRoLnNxcnQoc3F1YXJlZFN1bUcgLyAyKSxcbiAgICAgICAgICAgICAgICAgICAgYjogTWF0aC5zcXJ0KHNxdWFyZWRTdW1CIC8gMiksXG4gICAgICAgICAgICAgICAgICAgIGE6IE1hdGguc3FydChzcXVhcmVkU3VtQSAvIDIpLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9LCBhdmVyYWdlQ29sb3IpO1xuICAgIH1cblxuICAgIHJldHVybiBhdmVyYWdlQ29sb3I7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVBpeGVsKHg6IG51bWJlciwgeTogbnVtYmVyLCByOiBudW1iZXIsIGc6IG51bWJlciwgYjogbnVtYmVyLCBhOiBudW1iZXIpOiBQaXhlbCB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgeCxcbiAgICAgICAgeSxcbiAgICAgICAgcixcbiAgICAgICAgZyxcbiAgICAgICAgYixcbiAgICAgICAgYSxcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQaXhlbHMoaW1hZ2VEYXRhOiBJbWFnZURhdGEpOiBQaXhlbFtdIHtcbiAgICBsZXQgcGl4ZWxzOiBQaXhlbFtdID0gW107XG4gICAgcHJvY2Vzc0ltYWdlRGF0YShpbWFnZURhdGEsIHBpeGVsID0+IHBpeGVscy5wdXNoKHBpeGVsKSk7XG4gICAgcmV0dXJuIHBpeGVscztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbGxQaXhlbEluSW1hZ2VEYXRhKGltYWdlRGF0YTogSW1hZ2VEYXRhLCBwaXhlbDogUGl4ZWwpOiB2b2lkIHtcbiAgICBjb25zdCBwaXhlbE9mZnNldDogbnVtYmVyID0gKHBpeGVsLnggKyBwaXhlbC55ICogaW1hZ2VEYXRhLndpZHRoKSAqIFBJWEVMX1dJRFRIO1xuICAgIGlmIChwaXhlbE9mZnNldCA8IDAgfHwgcGl4ZWxPZmZzZXQgKyBQSVhFTF9XSURUSCA+PSBpbWFnZURhdGEuZGF0YS5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpbWFnZURhdGEuZGF0YVtwaXhlbE9mZnNldF0gPSBwaXhlbC5yO1xuICAgIGltYWdlRGF0YS5kYXRhW3BpeGVsT2Zmc2V0ICsgMV0gPSBwaXhlbC5nO1xuICAgIGltYWdlRGF0YS5kYXRhW3BpeGVsT2Zmc2V0ICsgMl0gPSBwaXhlbC5iO1xuICAgIGltYWdlRGF0YS5kYXRhW3BpeGVsT2Zmc2V0ICsgM10gPSBwaXhlbC5hO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SW1hZ2VEYXRhT2ZmU2NyZWVuKGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50LCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcik6IEltYWdlRGF0YSB7XG4gICAgY29uc3QgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgIGNvbnN0IGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpIGFzIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcblxuICAgIGNhbnZhcy53aWR0aCA9IHdpZHRoO1xuICAgIGNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XG5cbiAgICBjb250ZXh0LmRyYXdJbWFnZShpbWFnZSwgMCwgMCwgaW1hZ2Uud2lkdGgsIGltYWdlLmhlaWdodCwgMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcblxuICAgIGNvbnN0IGltYWdlRGF0YTogSW1hZ2VEYXRhID0gY29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgICByZXR1cm4gaW1hZ2VEYXRhO1xufVxuXG5mdW5jdGlvbiBwcm9jZXNzSW1hZ2VEYXRhKGltYWdlRGF0YTogSW1hZ2VEYXRhLCBwcm9jZXNzRnVuYzogKHBpeGVsOiBQaXhlbCkgPT4gdm9pZCwgaW5pdFBpeGVsWDogbnVtYmVyID0gMCwgaW5pdFBpeGVsWTogbnVtYmVyID0gMCk6IHZvaWQge1xuICAgIGxldCByOiBudW1iZXI7XG4gICAgbGV0IGc6IG51bWJlcjtcbiAgICBsZXQgYjogbnVtYmVyO1xuICAgIGxldCBhOiBudW1iZXI7XG4gICAgbGV0IG9mZnNldFg6IG51bWJlcjtcbiAgICBsZXQgb2Zmc2V0WTogbnVtYmVyO1xuICAgIGxldCBwaXhlbDogUGl4ZWw7XG5cbiAgICBmb3IgKGxldCB4ID0gaW5pdFBpeGVsWDsgeCA8IGltYWdlRGF0YS53aWR0aDsgeCsrKSB7XG4gICAgICAgIG9mZnNldFggPSB4ICogUElYRUxfV0lEVEg7XG5cbiAgICAgICAgZm9yIChsZXQgeSA9IGluaXRQaXhlbFk7IHkgPCBpbWFnZURhdGEuaGVpZ2h0OyB5KyspIHtcbiAgICAgICAgICAgIG9mZnNldFkgPSBpbWFnZURhdGEud2lkdGggKiB5ICogUElYRUxfV0lEVEg7XG5cbiAgICAgICAgICAgIHIgPSBpbWFnZURhdGEuZGF0YVtvZmZzZXRYICsgb2Zmc2V0WV07XG4gICAgICAgICAgICBnID0gaW1hZ2VEYXRhLmRhdGFbb2Zmc2V0WCArIG9mZnNldFkgKyAxXTtcbiAgICAgICAgICAgIGIgPSBpbWFnZURhdGEuZGF0YVtvZmZzZXRYICsgb2Zmc2V0WSArIDJdO1xuICAgICAgICAgICAgYSA9IGltYWdlRGF0YS5kYXRhW29mZnNldFggKyBvZmZzZXRZICsgM107XG5cbiAgICAgICAgICAgIHBpeGVsID0gY3JlYXRlUGl4ZWwoeCwgeSwgciwgZywgYiwgYSk7XG4gICAgICAgICAgICBwcm9jZXNzRnVuYyhwaXhlbCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b0dpZihpbWFnZUZyYW1lczogSW1hZ2VEYXRhW10pOiB2b2lkIHtcbiAgICBjb25zdCBnaWYgPSBuZXcgR0lGKHtcbiAgICAgICAgd29ya2VyczogMixcbiAgICAgICAgcXVhbGl0eTogMTBcbiAgICB9KTtcblxuICAgIGltYWdlRnJhbWVzXG4gICAgICAgIC5mb3JFYWNoKGltYWdlRnJhbWUgPT4gZ2lmLmFkZEZyYW1lKGltYWdlRnJhbWUsIHtcbiAgICAgICAgICAgIGRlbGF5OiAyMDAsXG4gICAgICAgIH0pKTtcblxuICAgIGdpZi5vbignZmluaXNoZWQnLCAoYmxvYjogYW55KSA9PiB7XG4gICAgICAgIHNhdmVCbG9iKCdzaW1wbGVxdWFkLmV4cG9ydC5naWYnLCBibG9iKTtcbiAgICB9KTtcblxuICAgIGdpZi5yZW5kZXIoKTtcbn1cblxuZnVuY3Rpb24gc2F2ZUJsb2IoZmlsZU5hbWU6IHN0cmluZywgYmxvYjogQmxvYikge1xuICAgIGNvbnN0IGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgY29uc3QgdXJsID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG5cbiAgICBhLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgYS5ocmVmID0gdXJsO1xuICAgIGEuZG93bmxvYWQgPSBmaWxlTmFtZTtcbiAgICBcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGEpO1xuICAgIGEuY2xpY2soKTtcblxuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoYSk7XG4gICAgd2luZG93LlVSTC5yZXZva2VPYmplY3RVUkwodXJsKTtcbn0iXSwic291cmNlUm9vdCI6IiJ9