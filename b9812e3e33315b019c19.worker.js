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
  var generatedImage = createImage(imageData, capacity);
  requestDrawGenerated(generatedImage);
}

function requestDrawGenerated(imageData) {
  var message = {
    type: 'draw',
    data: imageData
  };
  postMessage(message);
}

function processImage(imageData) {
  var capacity = imageData.width * imageData.height;

  while (capacity > 1) {
    requestDraw(imageData, capacity);
    capacity /= 2;
  }

  requestDrawGenerated(imageData);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1YWQud29ya2VyLnRzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9naWYuanMvZGlzdC9naWYuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NpbXBsZXF1YWQvZGlzdC9zaW1wbGVxdWFkLmVzbS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC50cyJdLCJuYW1lcyI6WyJwcm9jZXNzZWRNZXNzYWdlIiwidHlwZSIsImJ1aWxkUXVhZFRyZWVGcm9tUGl4ZWxzIiwiaW1hZ2VEYXRhIiwiYm91bmRzIiwiY2FwYWNpdHkiLCJwaXhlbHMiLCJjcmVhdGVQaXhlbHMiLCJxdWFkVHJlZSIsImNyZWF0ZVF1YWRUcmVlIiwiZm9yRWFjaCIsInBpeGVsIiwiYWRkIiwiZmlsbEltYWdlRGF0YUZyb21RdWFkVHJlZSIsInF1YWRyYW50cyIsImxlbmd0aCIsInF1YWRyYW50IiwiZ2V0RGF0YSIsImF2ZXJhZ2VDb2xvciIsImdldEF2ZXJhZ2VDb2xvciIsImZpbGxQaXhlbEluSW1hZ2VEYXRhIiwieCIsInkiLCJyIiwiZyIsImIiLCJhIiwicmVxdWVzdERyYXciLCJnZW5lcmF0ZWRJbWFnZSIsImNyZWF0ZUltYWdlIiwicmVxdWVzdERyYXdHZW5lcmF0ZWQiLCJtZXNzYWdlIiwiZGF0YSIsInBvc3RNZXNzYWdlIiwicHJvY2Vzc0ltYWdlIiwid2lkdGgiLCJoZWlnaHQiLCJuZXdJbWFnZURhdGEiLCJJbWFnZURhdGEiLCJ3b3JrZXIiLCJzZWxmIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwiY29uc29sZSIsImVycm9yIiwiUElYRUxfV0lEVEgiLCJXSElURV9DT0xPUiIsImxvYWRJbWFnZSIsImltYWdlRmlsZSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiaW1hZ2VGaWxlRGF0YVVybCIsIndpbmRvdyIsIlVSTCIsImNyZWF0ZU9iamVjdFVSTCIsImltYWdlIiwiSW1hZ2UiLCJvbmxvYWQiLCJyZXZva2VPYmplY3RVUkwiLCJvbmVycm9yIiwiZXJyIiwic3JjIiwic3F1YXJlZFN1bVIiLCJzcXVhcmVkU3VtRyIsInNxdWFyZWRTdW1CIiwic3F1YXJlZFN1bUEiLCJzbGljZSIsInJlZHVjZSIsInByZXZBdmVyYWdlIiwiY3VyclBpeGVsIiwiTWF0aCIsInBvdyIsInNxcnQiLCJjcmVhdGVQaXhlbCIsInByb2Nlc3NJbWFnZURhdGEiLCJwdXNoIiwicGl4ZWxPZmZzZXQiLCJnZXRJbWFnZURhdGFPZmZTY3JlZW4iLCJjYW52YXMiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJjb250ZXh0IiwiZ2V0Q29udGV4dCIsImRyYXdJbWFnZSIsImdldEltYWdlRGF0YSIsInByb2Nlc3NGdW5jIiwiaW5pdFBpeGVsWCIsImluaXRQaXhlbFkiLCJvZmZzZXRYIiwib2Zmc2V0WSIsInRvR2lmIiwiaW1hZ2VGcmFtZXMiLCJnaWYiLCJHSUYiLCJ3b3JrZXJzIiwicXVhbGl0eSIsImltYWdlRnJhbWUiLCJhZGRGcmFtZSIsImRlbGF5Iiwib24iLCJibG9iIiwic2F2ZUJsb2IiLCJyZW5kZXIiLCJmaWxlTmFtZSIsInVybCIsInN0eWxlIiwiZGlzcGxheSIsImhyZWYiLCJkb3dubG9hZCIsImJvZHkiLCJhcHBlbmRDaGlsZCIsImNsaWNrIiwicmVtb3ZlQ2hpbGQiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFD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Ozs7Ozs7Ozs7Ozs7O0FDRkE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQixzQkFBc0I7QUFDdkM7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QztBQUN2QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSyxFQUFFO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOzs7QUFHTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEseUJBQXlCLHFCQUFxQjtBQUM5Qzs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDOztBQUV0QztBQUNBO0FBQ0EsR0FBRzs7O0FBR0g7QUFDQTtBQUNBLEdBQUc7OztBQUdIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7OztBQUdIO0FBQ0E7QUFDQSxHQUFHOzs7QUFHSDtBQUNBO0FBQ0EsR0FBRzs7O0FBR0g7QUFDQTs7QUFFQTtBQUNBLEdBQUc7OztBQUdIO0FBQ0E7O0FBRUE7QUFDQSxHQUFHOzs7QUFHSDtBQUNBOztBQUVBO0FBQ0EsR0FBRzs7O0FBR0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7O0FBR0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUssRUFBRTtBQUNQOztBQUVBO0FBQ0EsR0FBRzs7O0FBR0g7QUFDQSxzRUFBc0U7O0FBRXRFO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCw2REFBNkQ7QUFDN0Q7O0FBRUE7QUFDQSxpQ0FBaUM7QUFDakM7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzRUFBc0U7QUFDdEU7O0FBRUE7QUFDQTtBQUNBLEdBQUc7OztBQUdIO0FBQ0EscUNBQXFDO0FBQ3JDOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBLEdBQUc7OztBQUdIO0FBQ0E7QUFDQSxHQUFHLEVBQUU7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7OztBQUdIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDRDQUE0QztBQUM1QztBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7QUFDTDtBQUNBLEdBQUc7QUFDSDtBQUNBOzs7QUFHQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QVQsQ0FBY0csV0FBZCxDQUEwQnZGLENBQTFCO0FBQ0EyQixRQUFNLENBQUNDLEdBQVAsQ0FBV0ssZUFBWCxDQUEyQjhDLEdBQTNCO0FBQ0gsQyIsImZpbGUiOiJiOTgxMmUzZTMzMzE1YjAxOWMxOS53b3JrZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4vc3JjL3F1YWQud29ya2VyLnRzXCIpO1xuIiwiaW1wb3J0IHsgUXVhZFdvcmtlckRhdGFNZXNzYWdlLCBQaXhlbCwgQ29sb3IsIFF1YWRXb3JrZXJNZXNzYWdlIH0gZnJvbSAnLi9zY2hlbWEnO1xuaW1wb3J0IHsgUXVhZFRyZWUsIGNyZWF0ZVF1YWRUcmVlLCBCb3VuZGluZ0JveCB9IGZyb20gJ3NpbXBsZXF1YWQnO1xuaW1wb3J0IHsgY3JlYXRlUGl4ZWxzLCBnZXRBdmVyYWdlQ29sb3IsIGZpbGxQaXhlbEluSW1hZ2VEYXRhIH0gZnJvbSAnLi91dGlsJztcblxuY29uc3QgcHJvY2Vzc2VkTWVzc2FnZTogUXVhZFdvcmtlck1lc3NhZ2UgPSB7XG4gICAgdHlwZTogJ3Byb2Nlc3NlZCcsXG59O1xuXG5mdW5jdGlvbiBidWlsZFF1YWRUcmVlRnJvbVBpeGVscyhpbWFnZURhdGE6IEltYWdlRGF0YSwgYm91bmRzOiBCb3VuZGluZ0JveCwgY2FwYWNpdHk6IG51bWJlcik6IFF1YWRUcmVlPFBpeGVsPiB7XG4gICAgY29uc3QgcGl4ZWxzOiBQaXhlbFtdID0gY3JlYXRlUGl4ZWxzKGltYWdlRGF0YSk7XG4gICAgY29uc3QgcXVhZFRyZWU6IFF1YWRUcmVlPFBpeGVsPiA9IGNyZWF0ZVF1YWRUcmVlKGJvdW5kcywgY2FwYWNpdHkpO1xuXG4gICAgLy8gQnVpbGQgcXVhZHRyZWUgd2l0aCB0aGlzIGNhcGFjaXR5IGZyb20gcGl4ZWxzXG4gICAgcGl4ZWxzLmZvckVhY2gocGl4ZWwgPT4gcXVhZFRyZWUuYWRkKHBpeGVsKSk7XG5cbiAgICByZXR1cm4gcXVhZFRyZWU7XG59XG5cbmZ1bmN0aW9uIGZpbGxJbWFnZURhdGFGcm9tUXVhZFRyZWUoaW1hZ2VEYXRhOiBJbWFnZURhdGEsIHF1YWRUcmVlOiBRdWFkVHJlZTxQaXhlbD4pOiBJbWFnZURhdGEgeyAgICBcbiAgICBpZiAocXVhZFRyZWUucXVhZHJhbnRzLmxlbmd0aCkge1xuICAgICAgICBxdWFkVHJlZS5xdWFkcmFudHNcbiAgICAgICAgICAgIC5mb3JFYWNoKHF1YWRyYW50ID0+XG4gICAgICAgICAgICAgICAgZmlsbEltYWdlRGF0YUZyb21RdWFkVHJlZShpbWFnZURhdGEsIHF1YWRyYW50KSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgcGl4ZWxzOiBQaXhlbFtdID0gcXVhZFRyZWUuZ2V0RGF0YSgpO1xuICAgICAgICBjb25zdCBhdmVyYWdlQ29sb3I6IENvbG9yID0gZ2V0QXZlcmFnZUNvbG9yKHBpeGVscyk7XG4gICAgICAgIHBpeGVscy5mb3JFYWNoKHBpeGVsID0+IGZpbGxQaXhlbEluSW1hZ2VEYXRhKGltYWdlRGF0YSwge1xuICAgICAgICAgICAgeDogcGl4ZWwueCxcbiAgICAgICAgICAgIHk6IHBpeGVsLnksXG4gICAgICAgICAgICByOiBhdmVyYWdlQ29sb3IucixcbiAgICAgICAgICAgIGc6IGF2ZXJhZ2VDb2xvci5nLFxuICAgICAgICAgICAgYjogYXZlcmFnZUNvbG9yLmIsXG4gICAgICAgICAgICBhOiBhdmVyYWdlQ29sb3IuYSxcbiAgICAgICAgfSkpO1xuICAgIH1cblxuICAgIHJldHVybiBpbWFnZURhdGE7XG59XG5cbmZ1bmN0aW9uIHJlcXVlc3REcmF3KGltYWdlRGF0YTogSW1hZ2VEYXRhLCBjYXBhY2l0eTogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgZ2VuZXJhdGVkSW1hZ2U6IEltYWdlRGF0YSA9IGNyZWF0ZUltYWdlKGltYWdlRGF0YSwgY2FwYWNpdHkpO1xuICAgIHJlcXVlc3REcmF3R2VuZXJhdGVkKGdlbmVyYXRlZEltYWdlKTtcbn1cblxuZnVuY3Rpb24gcmVxdWVzdERyYXdHZW5lcmF0ZWQoaW1hZ2VEYXRhOiBJbWFnZURhdGEpIHtcbiAgICBjb25zdCBtZXNzYWdlOiBRdWFkV29ya2VyRGF0YU1lc3NhZ2UgPSB7XG4gICAgICAgIHR5cGU6ICdkcmF3JyxcbiAgICAgICAgZGF0YTogaW1hZ2VEYXRhLFxuICAgIH07XG4gICAgcG9zdE1lc3NhZ2UobWVzc2FnZSk7XG59XG5cbmZ1bmN0aW9uIHByb2Nlc3NJbWFnZShpbWFnZURhdGE6IEltYWdlRGF0YSk6IHZvaWQge1xuICAgIGxldCBjYXBhY2l0eTogbnVtYmVyID0gaW1hZ2VEYXRhLndpZHRoICogaW1hZ2VEYXRhLmhlaWdodDtcblxuICAgIHdoaWxlIChjYXBhY2l0eSA+IDEpIHtcbiAgICAgICAgcmVxdWVzdERyYXcoaW1hZ2VEYXRhLCBjYXBhY2l0eSk7XG4gICAgICAgIGNhcGFjaXR5IC89IDI7XG4gICAgfVxuXG4gICAgcmVxdWVzdERyYXdHZW5lcmF0ZWQoaW1hZ2VEYXRhKTtcbiAgICBwb3N0TWVzc2FnZShwcm9jZXNzZWRNZXNzYWdlKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlSW1hZ2UoaW1hZ2VEYXRhOiBJbWFnZURhdGEsIGNhcGFjaXR5OiBudW1iZXIpOiBJbWFnZURhdGEge1xuICAgIGNvbnN0IG5ld0ltYWdlRGF0YTogSW1hZ2VEYXRhID0gbmV3IEltYWdlRGF0YShpbWFnZURhdGEud2lkdGgsIGltYWdlRGF0YS5oZWlnaHQpO1xuICAgIGNvbnN0IHF1YWRUcmVlOiBRdWFkVHJlZTxQaXhlbD4gPSBidWlsZFF1YWRUcmVlRnJvbVBpeGVscyhpbWFnZURhdGEsIHtcbiAgICAgICAgeDogMCxcbiAgICAgICAgeTogMCxcbiAgICAgICAgd2lkdGg6IGltYWdlRGF0YS53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBpbWFnZURhdGEuaGVpZ2h0LFxuICAgIH0sIGNhcGFjaXR5KTtcbiAgICBmaWxsSW1hZ2VEYXRhRnJvbVF1YWRUcmVlKG5ld0ltYWdlRGF0YSwgcXVhZFRyZWUpO1xuICAgIHJldHVybiBuZXdJbWFnZURhdGE7XG59XG5cbi8vIFNldHRpbmcgdXAgdGhlIHdvcmtlclxuY29uc3Qgd29ya2VyOiBXb3JrZXIgPSBzZWxmIGFzIGFueTtcbndvcmtlci5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgbWVzc2FnZTogUXVhZFdvcmtlckRhdGFNZXNzYWdlID0gZXZlbnQuZGF0YTtcbiAgICBjb25zdCBpbWFnZURhdGE6IEltYWdlRGF0YSA9IG1lc3NhZ2UuZGF0YTtcblxuICAgIHN3aXRjaCAobWVzc2FnZS50eXBlKSB7XG4gICAgICAgIGNhc2UgJ25ldy1pbWFnZSc6XG4gICAgICAgICAgICBpZiAoaW1hZ2VEYXRhKSB7XG4gICAgICAgICAgICAgICAgcHJvY2Vzc0ltYWdlKGltYWdlRGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYFVua25vd24gbWVzc2FnZSB0eXBlOiAke21lc3NhZ2V9YCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgfVxufSk7IiwiLy8gZ2lmLmpzIDAuMi4wIC0gaHR0cHM6Ly9naXRodWIuY29tL2pub3JkYmVyZy9naWYuanNcbihmdW5jdGlvbihmKXtpZih0eXBlb2YgZXhwb3J0cz09PVwib2JqZWN0XCImJnR5cGVvZiBtb2R1bGUhPT1cInVuZGVmaW5lZFwiKXttb2R1bGUuZXhwb3J0cz1mKCl9ZWxzZSBpZih0eXBlb2YgZGVmaW5lPT09XCJmdW5jdGlvblwiJiZkZWZpbmUuYW1kKXtkZWZpbmUoW10sZil9ZWxzZXt2YXIgZztpZih0eXBlb2Ygd2luZG93IT09XCJ1bmRlZmluZWRcIil7Zz13aW5kb3d9ZWxzZSBpZih0eXBlb2YgZ2xvYmFsIT09XCJ1bmRlZmluZWRcIil7Zz1nbG9iYWx9ZWxzZSBpZih0eXBlb2Ygc2VsZiE9PVwidW5kZWZpbmVkXCIpe2c9c2VsZn1lbHNle2c9dGhpc31nLkdJRj1mKCl9fSkoZnVuY3Rpb24oKXt2YXIgZGVmaW5lLG1vZHVsZSxleHBvcnRzO3JldHVybiBmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30oezE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe2Z1bmN0aW9uIEV2ZW50RW1pdHRlcigpe3RoaXMuX2V2ZW50cz10aGlzLl9ldmVudHN8fHt9O3RoaXMuX21heExpc3RlbmVycz10aGlzLl9tYXhMaXN0ZW5lcnN8fHVuZGVmaW5lZH1tb2R1bGUuZXhwb3J0cz1FdmVudEVtaXR0ZXI7RXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlcj1FdmVudEVtaXR0ZXI7RXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzPXVuZGVmaW5lZDtFdmVudEVtaXR0ZXIucHJvdG90eXBlLl9tYXhMaXN0ZW5lcnM9dW5kZWZpbmVkO0V2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzPTEwO0V2ZW50RW1pdHRlci5wcm90b3R5cGUuc2V0TWF4TGlzdGVuZXJzPWZ1bmN0aW9uKG4pe2lmKCFpc051bWJlcihuKXx8bjwwfHxpc05hTihuKSl0aHJvdyBUeXBlRXJyb3IoXCJuIG11c3QgYmUgYSBwb3NpdGl2ZSBudW1iZXJcIik7dGhpcy5fbWF4TGlzdGVuZXJzPW47cmV0dXJuIHRoaXN9O0V2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdD1mdW5jdGlvbih0eXBlKXt2YXIgZXIsaGFuZGxlcixsZW4sYXJncyxpLGxpc3RlbmVycztpZighdGhpcy5fZXZlbnRzKXRoaXMuX2V2ZW50cz17fTtpZih0eXBlPT09XCJlcnJvclwiKXtpZighdGhpcy5fZXZlbnRzLmVycm9yfHxpc09iamVjdCh0aGlzLl9ldmVudHMuZXJyb3IpJiYhdGhpcy5fZXZlbnRzLmVycm9yLmxlbmd0aCl7ZXI9YXJndW1lbnRzWzFdO2lmKGVyIGluc3RhbmNlb2YgRXJyb3Ipe3Rocm93IGVyfWVsc2V7dmFyIGVycj1uZXcgRXJyb3IoJ1VuY2F1Z2h0LCB1bnNwZWNpZmllZCBcImVycm9yXCIgZXZlbnQuICgnK2VyK1wiKVwiKTtlcnIuY29udGV4dD1lcjt0aHJvdyBlcnJ9fX1oYW5kbGVyPXRoaXMuX2V2ZW50c1t0eXBlXTtpZihpc1VuZGVmaW5lZChoYW5kbGVyKSlyZXR1cm4gZmFsc2U7aWYoaXNGdW5jdGlvbihoYW5kbGVyKSl7c3dpdGNoKGFyZ3VtZW50cy5sZW5ndGgpe2Nhc2UgMTpoYW5kbGVyLmNhbGwodGhpcyk7YnJlYWs7Y2FzZSAyOmhhbmRsZXIuY2FsbCh0aGlzLGFyZ3VtZW50c1sxXSk7YnJlYWs7Y2FzZSAzOmhhbmRsZXIuY2FsbCh0aGlzLGFyZ3VtZW50c1sxXSxhcmd1bWVudHNbMl0pO2JyZWFrO2RlZmF1bHQ6YXJncz1BcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsMSk7aGFuZGxlci5hcHBseSh0aGlzLGFyZ3MpfX1lbHNlIGlmKGlzT2JqZWN0KGhhbmRsZXIpKXthcmdzPUFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywxKTtsaXN0ZW5lcnM9aGFuZGxlci5zbGljZSgpO2xlbj1saXN0ZW5lcnMubGVuZ3RoO2ZvcihpPTA7aTxsZW47aSsrKWxpc3RlbmVyc1tpXS5hcHBseSh0aGlzLGFyZ3MpfXJldHVybiB0cnVlfTtFdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyPWZ1bmN0aW9uKHR5cGUsbGlzdGVuZXIpe3ZhciBtO2lmKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSl0aHJvdyBUeXBlRXJyb3IoXCJsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb25cIik7aWYoIXRoaXMuX2V2ZW50cyl0aGlzLl9ldmVudHM9e307aWYodGhpcy5fZXZlbnRzLm5ld0xpc3RlbmVyKXRoaXMuZW1pdChcIm5ld0xpc3RlbmVyXCIsdHlwZSxpc0Z1bmN0aW9uKGxpc3RlbmVyLmxpc3RlbmVyKT9saXN0ZW5lci5saXN0ZW5lcjpsaXN0ZW5lcik7aWYoIXRoaXMuX2V2ZW50c1t0eXBlXSl0aGlzLl9ldmVudHNbdHlwZV09bGlzdGVuZXI7ZWxzZSBpZihpc09iamVjdCh0aGlzLl9ldmVudHNbdHlwZV0pKXRoaXMuX2V2ZW50c1t0eXBlXS5wdXNoKGxpc3RlbmVyKTtlbHNlIHRoaXMuX2V2ZW50c1t0eXBlXT1bdGhpcy5fZXZlbnRzW3R5cGVdLGxpc3RlbmVyXTtpZihpc09iamVjdCh0aGlzLl9ldmVudHNbdHlwZV0pJiYhdGhpcy5fZXZlbnRzW3R5cGVdLndhcm5lZCl7aWYoIWlzVW5kZWZpbmVkKHRoaXMuX21heExpc3RlbmVycykpe209dGhpcy5fbWF4TGlzdGVuZXJzfWVsc2V7bT1FdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVyc31pZihtJiZtPjAmJnRoaXMuX2V2ZW50c1t0eXBlXS5sZW5ndGg+bSl7dGhpcy5fZXZlbnRzW3R5cGVdLndhcm5lZD10cnVlO2NvbnNvbGUuZXJyb3IoXCIobm9kZSkgd2FybmluZzogcG9zc2libGUgRXZlbnRFbWl0dGVyIG1lbW9yeSBcIitcImxlYWsgZGV0ZWN0ZWQuICVkIGxpc3RlbmVycyBhZGRlZC4gXCIrXCJVc2UgZW1pdHRlci5zZXRNYXhMaXN0ZW5lcnMoKSB0byBpbmNyZWFzZSBsaW1pdC5cIix0aGlzLl9ldmVudHNbdHlwZV0ubGVuZ3RoKTtpZih0eXBlb2YgY29uc29sZS50cmFjZT09PVwiZnVuY3Rpb25cIil7Y29uc29sZS50cmFjZSgpfX19cmV0dXJuIHRoaXN9O0V2ZW50RW1pdHRlci5wcm90b3R5cGUub249RXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lcjtFdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2U9ZnVuY3Rpb24odHlwZSxsaXN0ZW5lcil7aWYoIWlzRnVuY3Rpb24obGlzdGVuZXIpKXRocm93IFR5cGVFcnJvcihcImxpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvblwiKTt2YXIgZmlyZWQ9ZmFsc2U7ZnVuY3Rpb24gZygpe3RoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSxnKTtpZighZmlyZWQpe2ZpcmVkPXRydWU7bGlzdGVuZXIuYXBwbHkodGhpcyxhcmd1bWVudHMpfX1nLmxpc3RlbmVyPWxpc3RlbmVyO3RoaXMub24odHlwZSxnKTtyZXR1cm4gdGhpc307RXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lcj1mdW5jdGlvbih0eXBlLGxpc3RlbmVyKXt2YXIgbGlzdCxwb3NpdGlvbixsZW5ndGgsaTtpZighaXNGdW5jdGlvbihsaXN0ZW5lcikpdGhyb3cgVHlwZUVycm9yKFwibGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uXCIpO2lmKCF0aGlzLl9ldmVudHN8fCF0aGlzLl9ldmVudHNbdHlwZV0pcmV0dXJuIHRoaXM7bGlzdD10aGlzLl9ldmVudHNbdHlwZV07bGVuZ3RoPWxpc3QubGVuZ3RoO3Bvc2l0aW9uPS0xO2lmKGxpc3Q9PT1saXN0ZW5lcnx8aXNGdW5jdGlvbihsaXN0Lmxpc3RlbmVyKSYmbGlzdC5saXN0ZW5lcj09PWxpc3RlbmVyKXtkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO2lmKHRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcil0aGlzLmVtaXQoXCJyZW1vdmVMaXN0ZW5lclwiLHR5cGUsbGlzdGVuZXIpfWVsc2UgaWYoaXNPYmplY3QobGlzdCkpe2ZvcihpPWxlbmd0aDtpLS0gPjA7KXtpZihsaXN0W2ldPT09bGlzdGVuZXJ8fGxpc3RbaV0ubGlzdGVuZXImJmxpc3RbaV0ubGlzdGVuZXI9PT1saXN0ZW5lcil7cG9zaXRpb249aTticmVha319aWYocG9zaXRpb248MClyZXR1cm4gdGhpcztpZihsaXN0Lmxlbmd0aD09PTEpe2xpc3QubGVuZ3RoPTA7ZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXX1lbHNle2xpc3Quc3BsaWNlKHBvc2l0aW9uLDEpfWlmKHRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcil0aGlzLmVtaXQoXCJyZW1vdmVMaXN0ZW5lclwiLHR5cGUsbGlzdGVuZXIpfXJldHVybiB0aGlzfTtFdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycz1mdW5jdGlvbih0eXBlKXt2YXIga2V5LGxpc3RlbmVycztpZighdGhpcy5fZXZlbnRzKXJldHVybiB0aGlzO2lmKCF0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpe2lmKGFyZ3VtZW50cy5sZW5ndGg9PT0wKXRoaXMuX2V2ZW50cz17fTtlbHNlIGlmKHRoaXMuX2V2ZW50c1t0eXBlXSlkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO3JldHVybiB0aGlzfWlmKGFyZ3VtZW50cy5sZW5ndGg9PT0wKXtmb3Ioa2V5IGluIHRoaXMuX2V2ZW50cyl7aWYoa2V5PT09XCJyZW1vdmVMaXN0ZW5lclwiKWNvbnRpbnVlO3RoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKGtleSl9dGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoXCJyZW1vdmVMaXN0ZW5lclwiKTt0aGlzLl9ldmVudHM9e307cmV0dXJuIHRoaXN9bGlzdGVuZXJzPXRoaXMuX2V2ZW50c1t0eXBlXTtpZihpc0Z1bmN0aW9uKGxpc3RlbmVycykpe3RoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSxsaXN0ZW5lcnMpfWVsc2UgaWYobGlzdGVuZXJzKXt3aGlsZShsaXN0ZW5lcnMubGVuZ3RoKXRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSxsaXN0ZW5lcnNbbGlzdGVuZXJzLmxlbmd0aC0xXSl9ZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtyZXR1cm4gdGhpc307RXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnM9ZnVuY3Rpb24odHlwZSl7dmFyIHJldDtpZighdGhpcy5fZXZlbnRzfHwhdGhpcy5fZXZlbnRzW3R5cGVdKXJldD1bXTtlbHNlIGlmKGlzRnVuY3Rpb24odGhpcy5fZXZlbnRzW3R5cGVdKSlyZXQ9W3RoaXMuX2V2ZW50c1t0eXBlXV07ZWxzZSByZXQ9dGhpcy5fZXZlbnRzW3R5cGVdLnNsaWNlKCk7cmV0dXJuIHJldH07RXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lckNvdW50PWZ1bmN0aW9uKHR5cGUpe2lmKHRoaXMuX2V2ZW50cyl7dmFyIGV2bGlzdGVuZXI9dGhpcy5fZXZlbnRzW3R5cGVdO2lmKGlzRnVuY3Rpb24oZXZsaXN0ZW5lcikpcmV0dXJuIDE7ZWxzZSBpZihldmxpc3RlbmVyKXJldHVybiBldmxpc3RlbmVyLmxlbmd0aH1yZXR1cm4gMH07RXZlbnRFbWl0dGVyLmxpc3RlbmVyQ291bnQ9ZnVuY3Rpb24oZW1pdHRlcix0eXBlKXtyZXR1cm4gZW1pdHRlci5saXN0ZW5lckNvdW50KHR5cGUpfTtmdW5jdGlvbiBpc0Z1bmN0aW9uKGFyZyl7cmV0dXJuIHR5cGVvZiBhcmc9PT1cImZ1bmN0aW9uXCJ9ZnVuY3Rpb24gaXNOdW1iZXIoYXJnKXtyZXR1cm4gdHlwZW9mIGFyZz09PVwibnVtYmVyXCJ9ZnVuY3Rpb24gaXNPYmplY3QoYXJnKXtyZXR1cm4gdHlwZW9mIGFyZz09PVwib2JqZWN0XCImJmFyZyE9PW51bGx9ZnVuY3Rpb24gaXNVbmRlZmluZWQoYXJnKXtyZXR1cm4gYXJnPT09dm9pZCAwfX0se31dLDI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe3ZhciBVQSxicm93c2VyLG1vZGUscGxhdGZvcm0sdWE7dWE9bmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpO3BsYXRmb3JtPW5hdmlnYXRvci5wbGF0Zm9ybS50b0xvd2VyQ2FzZSgpO1VBPXVhLm1hdGNoKC8ob3BlcmF8aWV8ZmlyZWZveHxjaHJvbWV8dmVyc2lvbilbXFxzXFwvOl0oW1xcd1xcZFxcLl0rKT8uKj8oc2FmYXJpfHZlcnNpb25bXFxzXFwvOl0oW1xcd1xcZFxcLl0rKXwkKS8pfHxbbnVsbCxcInVua25vd25cIiwwXTttb2RlPVVBWzFdPT09XCJpZVwiJiZkb2N1bWVudC5kb2N1bWVudE1vZGU7YnJvd3Nlcj17bmFtZTpVQVsxXT09PVwidmVyc2lvblwiP1VBWzNdOlVBWzFdLHZlcnNpb246bW9kZXx8cGFyc2VGbG9hdChVQVsxXT09PVwib3BlcmFcIiYmVUFbNF0/VUFbNF06VUFbMl0pLHBsYXRmb3JtOntuYW1lOnVhLm1hdGNoKC9pcCg/OmFkfG9kfGhvbmUpLyk/XCJpb3NcIjoodWEubWF0Y2goLyg/OndlYm9zfGFuZHJvaWQpLyl8fHBsYXRmb3JtLm1hdGNoKC9tYWN8d2lufGxpbnV4Lyl8fFtcIm90aGVyXCJdKVswXX19O2Jyb3dzZXJbYnJvd3Nlci5uYW1lXT10cnVlO2Jyb3dzZXJbYnJvd3Nlci5uYW1lK3BhcnNlSW50KGJyb3dzZXIudmVyc2lvbiwxMCldPXRydWU7YnJvd3Nlci5wbGF0Zm9ybVticm93c2VyLnBsYXRmb3JtLm5hbWVdPXRydWU7bW9kdWxlLmV4cG9ydHM9YnJvd3Nlcn0se31dLDM6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe3ZhciBFdmVudEVtaXR0ZXIsR0lGLGJyb3dzZXIsZXh0ZW5kPWZ1bmN0aW9uKGNoaWxkLHBhcmVudCl7Zm9yKHZhciBrZXkgaW4gcGFyZW50KXtpZihoYXNQcm9wLmNhbGwocGFyZW50LGtleSkpY2hpbGRba2V5XT1wYXJlbnRba2V5XX1mdW5jdGlvbiBjdG9yKCl7dGhpcy5jb25zdHJ1Y3Rvcj1jaGlsZH1jdG9yLnByb3RvdHlwZT1wYXJlbnQucHJvdG90eXBlO2NoaWxkLnByb3RvdHlwZT1uZXcgY3RvcjtjaGlsZC5fX3N1cGVyX189cGFyZW50LnByb3RvdHlwZTtyZXR1cm4gY2hpbGR9LGhhc1Byb3A9e30uaGFzT3duUHJvcGVydHksaW5kZXhPZj1bXS5pbmRleE9mfHxmdW5jdGlvbihpdGVtKXtmb3IodmFyIGk9MCxsPXRoaXMubGVuZ3RoO2k8bDtpKyspe2lmKGkgaW4gdGhpcyYmdGhpc1tpXT09PWl0ZW0pcmV0dXJuIGl9cmV0dXJuLTF9LHNsaWNlPVtdLnNsaWNlO0V2ZW50RW1pdHRlcj1yZXF1aXJlKFwiZXZlbnRzXCIpLkV2ZW50RW1pdHRlcjticm93c2VyPXJlcXVpcmUoXCIuL2Jyb3dzZXIuY29mZmVlXCIpO0dJRj1mdW5jdGlvbihzdXBlckNsYXNzKXt2YXIgZGVmYXVsdHMsZnJhbWVEZWZhdWx0cztleHRlbmQoR0lGLHN1cGVyQ2xhc3MpO2RlZmF1bHRzPXt3b3JrZXJTY3JpcHQ6XCJnaWYud29ya2VyLmpzXCIsd29ya2VyczoyLHJlcGVhdDowLGJhY2tncm91bmQ6XCIjZmZmXCIscXVhbGl0eToxMCx3aWR0aDpudWxsLGhlaWdodDpudWxsLHRyYW5zcGFyZW50Om51bGwsZGVidWc6ZmFsc2UsZGl0aGVyOmZhbHNlfTtmcmFtZURlZmF1bHRzPXtkZWxheTo1MDAsY29weTpmYWxzZX07ZnVuY3Rpb24gR0lGKG9wdGlvbnMpe3ZhciBiYXNlLGtleSx2YWx1ZTt0aGlzLnJ1bm5pbmc9ZmFsc2U7dGhpcy5vcHRpb25zPXt9O3RoaXMuZnJhbWVzPVtdO3RoaXMuZnJlZVdvcmtlcnM9W107dGhpcy5hY3RpdmVXb3JrZXJzPVtdO3RoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtmb3Ioa2V5IGluIGRlZmF1bHRzKXt2YWx1ZT1kZWZhdWx0c1trZXldO2lmKChiYXNlPXRoaXMub3B0aW9ucylba2V5XT09bnVsbCl7YmFzZVtrZXldPXZhbHVlfX19R0lGLnByb3RvdHlwZS5zZXRPcHRpb249ZnVuY3Rpb24oa2V5LHZhbHVlKXt0aGlzLm9wdGlvbnNba2V5XT12YWx1ZTtpZih0aGlzLl9jYW52YXMhPW51bGwmJihrZXk9PT1cIndpZHRoXCJ8fGtleT09PVwiaGVpZ2h0XCIpKXtyZXR1cm4gdGhpcy5fY2FudmFzW2tleV09dmFsdWV9fTtHSUYucHJvdG90eXBlLnNldE9wdGlvbnM9ZnVuY3Rpb24ob3B0aW9ucyl7dmFyIGtleSxyZXN1bHRzLHZhbHVlO3Jlc3VsdHM9W107Zm9yKGtleSBpbiBvcHRpb25zKXtpZighaGFzUHJvcC5jYWxsKG9wdGlvbnMsa2V5KSljb250aW51ZTt2YWx1ZT1vcHRpb25zW2tleV07cmVzdWx0cy5wdXNoKHRoaXMuc2V0T3B0aW9uKGtleSx2YWx1ZSkpfXJldHVybiByZXN1bHRzfTtHSUYucHJvdG90eXBlLmFkZEZyYW1lPWZ1bmN0aW9uKGltYWdlLG9wdGlvbnMpe3ZhciBmcmFtZSxrZXk7aWYob3B0aW9ucz09bnVsbCl7b3B0aW9ucz17fX1mcmFtZT17fTtmcmFtZS50cmFuc3BhcmVudD10aGlzLm9wdGlvbnMudHJhbnNwYXJlbnQ7Zm9yKGtleSBpbiBmcmFtZURlZmF1bHRzKXtmcmFtZVtrZXldPW9wdGlvbnNba2V5XXx8ZnJhbWVEZWZhdWx0c1trZXldfWlmKHRoaXMub3B0aW9ucy53aWR0aD09bnVsbCl7dGhpcy5zZXRPcHRpb24oXCJ3aWR0aFwiLGltYWdlLndpZHRoKX1pZih0aGlzLm9wdGlvbnMuaGVpZ2h0PT1udWxsKXt0aGlzLnNldE9wdGlvbihcImhlaWdodFwiLGltYWdlLmhlaWdodCl9aWYodHlwZW9mIEltYWdlRGF0YSE9PVwidW5kZWZpbmVkXCImJkltYWdlRGF0YSE9PW51bGwmJmltYWdlIGluc3RhbmNlb2YgSW1hZ2VEYXRhKXtmcmFtZS5kYXRhPWltYWdlLmRhdGF9ZWxzZSBpZih0eXBlb2YgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEIT09XCJ1bmRlZmluZWRcIiYmQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEIT09bnVsbCYmaW1hZ2UgaW5zdGFuY2VvZiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkR8fHR5cGVvZiBXZWJHTFJlbmRlcmluZ0NvbnRleHQhPT1cInVuZGVmaW5lZFwiJiZXZWJHTFJlbmRlcmluZ0NvbnRleHQhPT1udWxsJiZpbWFnZSBpbnN0YW5jZW9mIFdlYkdMUmVuZGVyaW5nQ29udGV4dCl7aWYob3B0aW9ucy5jb3B5KXtmcmFtZS5kYXRhPXRoaXMuZ2V0Q29udGV4dERhdGEoaW1hZ2UpfWVsc2V7ZnJhbWUuY29udGV4dD1pbWFnZX19ZWxzZSBpZihpbWFnZS5jaGlsZE5vZGVzIT1udWxsKXtpZihvcHRpb25zLmNvcHkpe2ZyYW1lLmRhdGE9dGhpcy5nZXRJbWFnZURhdGEoaW1hZ2UpfWVsc2V7ZnJhbWUuaW1hZ2U9aW1hZ2V9fWVsc2V7dGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBpbWFnZVwiKX1yZXR1cm4gdGhpcy5mcmFtZXMucHVzaChmcmFtZSl9O0dJRi5wcm90b3R5cGUucmVuZGVyPWZ1bmN0aW9uKCl7dmFyIGksaixudW1Xb3JrZXJzLHJlZjtpZih0aGlzLnJ1bm5pbmcpe3Rocm93IG5ldyBFcnJvcihcIkFscmVhZHkgcnVubmluZ1wiKX1pZih0aGlzLm9wdGlvbnMud2lkdGg9PW51bGx8fHRoaXMub3B0aW9ucy5oZWlnaHQ9PW51bGwpe3Rocm93IG5ldyBFcnJvcihcIldpZHRoIGFuZCBoZWlnaHQgbXVzdCBiZSBzZXQgcHJpb3IgdG8gcmVuZGVyaW5nXCIpfXRoaXMucnVubmluZz10cnVlO3RoaXMubmV4dEZyYW1lPTA7dGhpcy5maW5pc2hlZEZyYW1lcz0wO3RoaXMuaW1hZ2VQYXJ0cz1mdW5jdGlvbigpe3ZhciBqLHJlZixyZXN1bHRzO3Jlc3VsdHM9W107Zm9yKGk9aj0wLHJlZj10aGlzLmZyYW1lcy5sZW5ndGg7MDw9cmVmP2o8cmVmOmo+cmVmO2k9MDw9cmVmPysrajotLWope3Jlc3VsdHMucHVzaChudWxsKX1yZXR1cm4gcmVzdWx0c30uY2FsbCh0aGlzKTtudW1Xb3JrZXJzPXRoaXMuc3Bhd25Xb3JrZXJzKCk7aWYodGhpcy5vcHRpb25zLmdsb2JhbFBhbGV0dGU9PT10cnVlKXt0aGlzLnJlbmRlck5leHRGcmFtZSgpfWVsc2V7Zm9yKGk9aj0wLHJlZj1udW1Xb3JrZXJzOzA8PXJlZj9qPHJlZjpqPnJlZjtpPTA8PXJlZj8rK2o6LS1qKXt0aGlzLnJlbmRlck5leHRGcmFtZSgpfX10aGlzLmVtaXQoXCJzdGFydFwiKTtyZXR1cm4gdGhpcy5lbWl0KFwicHJvZ3Jlc3NcIiwwKX07R0lGLnByb3RvdHlwZS5hYm9ydD1mdW5jdGlvbigpe3ZhciB3b3JrZXI7d2hpbGUodHJ1ZSl7d29ya2VyPXRoaXMuYWN0aXZlV29ya2Vycy5zaGlmdCgpO2lmKHdvcmtlcj09bnVsbCl7YnJlYWt9dGhpcy5sb2coXCJraWxsaW5nIGFjdGl2ZSB3b3JrZXJcIik7d29ya2VyLnRlcm1pbmF0ZSgpfXRoaXMucnVubmluZz1mYWxzZTtyZXR1cm4gdGhpcy5lbWl0KFwiYWJvcnRcIil9O0dJRi5wcm90b3R5cGUuc3Bhd25Xb3JrZXJzPWZ1bmN0aW9uKCl7dmFyIGosbnVtV29ya2VycyxyZWYscmVzdWx0cztudW1Xb3JrZXJzPU1hdGgubWluKHRoaXMub3B0aW9ucy53b3JrZXJzLHRoaXMuZnJhbWVzLmxlbmd0aCk7KGZ1bmN0aW9uKCl7cmVzdWx0cz1bXTtmb3IodmFyIGo9cmVmPXRoaXMuZnJlZVdvcmtlcnMubGVuZ3RoO3JlZjw9bnVtV29ya2Vycz9qPG51bVdvcmtlcnM6aj5udW1Xb3JrZXJzO3JlZjw9bnVtV29ya2Vycz9qKys6ai0tKXtyZXN1bHRzLnB1c2goail9cmV0dXJuIHJlc3VsdHN9KS5hcHBseSh0aGlzKS5mb3JFYWNoKGZ1bmN0aW9uKF90aGlzKXtyZXR1cm4gZnVuY3Rpb24oaSl7dmFyIHdvcmtlcjtfdGhpcy5sb2coXCJzcGF3bmluZyB3b3JrZXIgXCIraSk7d29ya2VyPW5ldyBXb3JrZXIoX3RoaXMub3B0aW9ucy53b3JrZXJTY3JpcHQpO3dvcmtlci5vbm1lc3NhZ2U9ZnVuY3Rpb24oZXZlbnQpe190aGlzLmFjdGl2ZVdvcmtlcnMuc3BsaWNlKF90aGlzLmFjdGl2ZVdvcmtlcnMuaW5kZXhPZih3b3JrZXIpLDEpO190aGlzLmZyZWVXb3JrZXJzLnB1c2god29ya2VyKTtyZXR1cm4gX3RoaXMuZnJhbWVGaW5pc2hlZChldmVudC5kYXRhKX07cmV0dXJuIF90aGlzLmZyZWVXb3JrZXJzLnB1c2god29ya2VyKX19KHRoaXMpKTtyZXR1cm4gbnVtV29ya2Vyc307R0lGLnByb3RvdHlwZS5mcmFtZUZpbmlzaGVkPWZ1bmN0aW9uKGZyYW1lKXt2YXIgaSxqLHJlZjt0aGlzLmxvZyhcImZyYW1lIFwiK2ZyYW1lLmluZGV4K1wiIGZpbmlzaGVkIC0gXCIrdGhpcy5hY3RpdmVXb3JrZXJzLmxlbmd0aCtcIiBhY3RpdmVcIik7dGhpcy5maW5pc2hlZEZyYW1lcysrO3RoaXMuZW1pdChcInByb2dyZXNzXCIsdGhpcy5maW5pc2hlZEZyYW1lcy90aGlzLmZyYW1lcy5sZW5ndGgpO3RoaXMuaW1hZ2VQYXJ0c1tmcmFtZS5pbmRleF09ZnJhbWU7aWYodGhpcy5vcHRpb25zLmdsb2JhbFBhbGV0dGU9PT10cnVlKXt0aGlzLm9wdGlvbnMuZ2xvYmFsUGFsZXR0ZT1mcmFtZS5nbG9iYWxQYWxldHRlO3RoaXMubG9nKFwiZ2xvYmFsIHBhbGV0dGUgYW5hbHl6ZWRcIik7aWYodGhpcy5mcmFtZXMubGVuZ3RoPjIpe2ZvcihpPWo9MSxyZWY9dGhpcy5mcmVlV29ya2Vycy5sZW5ndGg7MTw9cmVmP2o8cmVmOmo+cmVmO2k9MTw9cmVmPysrajotLWope3RoaXMucmVuZGVyTmV4dEZyYW1lKCl9fX1pZihpbmRleE9mLmNhbGwodGhpcy5pbWFnZVBhcnRzLG51bGwpPj0wKXtyZXR1cm4gdGhpcy5yZW5kZXJOZXh0RnJhbWUoKX1lbHNle3JldHVybiB0aGlzLmZpbmlzaFJlbmRlcmluZygpfX07R0lGLnByb3RvdHlwZS5maW5pc2hSZW5kZXJpbmc9ZnVuY3Rpb24oKXt2YXIgZGF0YSxmcmFtZSxpLGltYWdlLGosayxsLGxlbixsZW4xLGxlbjIsbGVuMyxvZmZzZXQscGFnZSxyZWYscmVmMSxyZWYyO2xlbj0wO3JlZj10aGlzLmltYWdlUGFydHM7Zm9yKGo9MCxsZW4xPXJlZi5sZW5ndGg7ajxsZW4xO2orKyl7ZnJhbWU9cmVmW2pdO2xlbis9KGZyYW1lLmRhdGEubGVuZ3RoLTEpKmZyYW1lLnBhZ2VTaXplK2ZyYW1lLmN1cnNvcn1sZW4rPWZyYW1lLnBhZ2VTaXplLWZyYW1lLmN1cnNvcjt0aGlzLmxvZyhcInJlbmRlcmluZyBmaW5pc2hlZCAtIGZpbGVzaXplIFwiK01hdGgucm91bmQobGVuLzFlMykrXCJrYlwiKTtkYXRhPW5ldyBVaW50OEFycmF5KGxlbik7b2Zmc2V0PTA7cmVmMT10aGlzLmltYWdlUGFydHM7Zm9yKGs9MCxsZW4yPXJlZjEubGVuZ3RoO2s8bGVuMjtrKyspe2ZyYW1lPXJlZjFba107cmVmMj1mcmFtZS5kYXRhO2ZvcihpPWw9MCxsZW4zPXJlZjIubGVuZ3RoO2w8bGVuMztpPSsrbCl7cGFnZT1yZWYyW2ldO2RhdGEuc2V0KHBhZ2Usb2Zmc2V0KTtpZihpPT09ZnJhbWUuZGF0YS5sZW5ndGgtMSl7b2Zmc2V0Kz1mcmFtZS5jdXJzb3J9ZWxzZXtvZmZzZXQrPWZyYW1lLnBhZ2VTaXplfX19aW1hZ2U9bmV3IEJsb2IoW2RhdGFdLHt0eXBlOlwiaW1hZ2UvZ2lmXCJ9KTtyZXR1cm4gdGhpcy5lbWl0KFwiZmluaXNoZWRcIixpbWFnZSxkYXRhKX07R0lGLnByb3RvdHlwZS5yZW5kZXJOZXh0RnJhbWU9ZnVuY3Rpb24oKXt2YXIgZnJhbWUsdGFzayx3b3JrZXI7aWYodGhpcy5mcmVlV29ya2Vycy5sZW5ndGg9PT0wKXt0aHJvdyBuZXcgRXJyb3IoXCJObyBmcmVlIHdvcmtlcnNcIil9aWYodGhpcy5uZXh0RnJhbWU+PXRoaXMuZnJhbWVzLmxlbmd0aCl7cmV0dXJufWZyYW1lPXRoaXMuZnJhbWVzW3RoaXMubmV4dEZyYW1lKytdO3dvcmtlcj10aGlzLmZyZWVXb3JrZXJzLnNoaWZ0KCk7dGFzaz10aGlzLmdldFRhc2soZnJhbWUpO3RoaXMubG9nKFwic3RhcnRpbmcgZnJhbWUgXCIrKHRhc2suaW5kZXgrMSkrXCIgb2YgXCIrdGhpcy5mcmFtZXMubGVuZ3RoKTt0aGlzLmFjdGl2ZVdvcmtlcnMucHVzaCh3b3JrZXIpO3JldHVybiB3b3JrZXIucG9zdE1lc3NhZ2UodGFzayl9O0dJRi5wcm90b3R5cGUuZ2V0Q29udGV4dERhdGE9ZnVuY3Rpb24oY3R4KXtyZXR1cm4gY3R4LmdldEltYWdlRGF0YSgwLDAsdGhpcy5vcHRpb25zLndpZHRoLHRoaXMub3B0aW9ucy5oZWlnaHQpLmRhdGF9O0dJRi5wcm90b3R5cGUuZ2V0SW1hZ2VEYXRhPWZ1bmN0aW9uKGltYWdlKXt2YXIgY3R4O2lmKHRoaXMuX2NhbnZhcz09bnVsbCl7dGhpcy5fY2FudmFzPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7dGhpcy5fY2FudmFzLndpZHRoPXRoaXMub3B0aW9ucy53aWR0aDt0aGlzLl9jYW52YXMuaGVpZ2h0PXRoaXMub3B0aW9ucy5oZWlnaHR9Y3R4PXRoaXMuX2NhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7Y3R4LnNldEZpbGw9dGhpcy5vcHRpb25zLmJhY2tncm91bmQ7Y3R4LmZpbGxSZWN0KDAsMCx0aGlzLm9wdGlvbnMud2lkdGgsdGhpcy5vcHRpb25zLmhlaWdodCk7Y3R4LmRyYXdJbWFnZShpbWFnZSwwLDApO3JldHVybiB0aGlzLmdldENvbnRleHREYXRhKGN0eCl9O0dJRi5wcm90b3R5cGUuZ2V0VGFzaz1mdW5jdGlvbihmcmFtZSl7dmFyIGluZGV4LHRhc2s7aW5kZXg9dGhpcy5mcmFtZXMuaW5kZXhPZihmcmFtZSk7dGFzaz17aW5kZXg6aW5kZXgsbGFzdDppbmRleD09PXRoaXMuZnJhbWVzLmxlbmd0aC0xLGRlbGF5OmZyYW1lLmRlbGF5LHRyYW5zcGFyZW50OmZyYW1lLnRyYW5zcGFyZW50LHdpZHRoOnRoaXMub3B0aW9ucy53aWR0aCxoZWlnaHQ6dGhpcy5vcHRpb25zLmhlaWdodCxxdWFsaXR5OnRoaXMub3B0aW9ucy5xdWFsaXR5LGRpdGhlcjp0aGlzLm9wdGlvbnMuZGl0aGVyLGdsb2JhbFBhbGV0dGU6dGhpcy5vcHRpb25zLmdsb2JhbFBhbGV0dGUscmVwZWF0OnRoaXMub3B0aW9ucy5yZXBlYXQsY2FuVHJhbnNmZXI6YnJvd3Nlci5uYW1lPT09XCJjaHJvbWVcIn07aWYoZnJhbWUuZGF0YSE9bnVsbCl7dGFzay5kYXRhPWZyYW1lLmRhdGF9ZWxzZSBpZihmcmFtZS5jb250ZXh0IT1udWxsKXt0YXNrLmRhdGE9dGhpcy5nZXRDb250ZXh0RGF0YShmcmFtZS5jb250ZXh0KX1lbHNlIGlmKGZyYW1lLmltYWdlIT1udWxsKXt0YXNrLmRhdGE9dGhpcy5nZXRJbWFnZURhdGEoZnJhbWUuaW1hZ2UpfWVsc2V7dGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBmcmFtZVwiKX1yZXR1cm4gdGFza307R0lGLnByb3RvdHlwZS5sb2c9ZnVuY3Rpb24oKXt2YXIgYXJnczthcmdzPTE8PWFyZ3VtZW50cy5sZW5ndGg/c2xpY2UuY2FsbChhcmd1bWVudHMsMCk6W107aWYoIXRoaXMub3B0aW9ucy5kZWJ1Zyl7cmV0dXJufXJldHVybiBjb25zb2xlLmxvZy5hcHBseShjb25zb2xlLGFyZ3MpfTtyZXR1cm4gR0lGfShFdmVudEVtaXR0ZXIpO21vZHVsZS5leHBvcnRzPUdJRn0se1wiLi9icm93c2VyLmNvZmZlZVwiOjIsZXZlbnRzOjF9XX0se30sWzNdKSgzKX0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Z2lmLmpzLm1hcFxuIiwiZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiKSB7XG4gICAgX3R5cGVvZiA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgIHJldHVybiB0eXBlb2Ygb2JqO1xuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgX3R5cGVvZiA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgIHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqO1xuICAgIH07XG4gIH1cblxuICByZXR1cm4gX3R5cGVvZihvYmopO1xufVxuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn1cblxuZnVuY3Rpb24gb3duS2V5cyhvYmplY3QsIGVudW1lcmFibGVPbmx5KSB7XG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqZWN0KTtcblxuICBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuICAgIGtleXMucHVzaC5hcHBseShrZXlzLCBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKG9iamVjdCkpO1xuICB9XG5cbiAgaWYgKGVudW1lcmFibGVPbmx5KSBrZXlzID0ga2V5cy5maWx0ZXIoZnVuY3Rpb24gKHN5bSkge1xuICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgc3ltKS5lbnVtZXJhYmxlO1xuICB9KTtcbiAgcmV0dXJuIGtleXM7XG59XG5cbmZ1bmN0aW9uIF9vYmplY3RTcHJlYWQyKHRhcmdldCkge1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV0gIT0gbnVsbCA/IGFyZ3VtZW50c1tpXSA6IHt9O1xuXG4gICAgaWYgKGkgJSAyKSB7XG4gICAgICBvd25LZXlzKHNvdXJjZSwgdHJ1ZSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIF9kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgc291cmNlW2tleV0pO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycykge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhzb3VyY2UpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgb3duS2V5cyhzb3VyY2UpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBrZXkpKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbmZ1bmN0aW9uIGdldFZlY3RvckJldHdlZW5Qb2ludHMocG9pbnQxLCBwb2ludDIpIHtcbiAgcmV0dXJuIHtcbiAgICB4OiBwb2ludDIueCAtIHBvaW50MS54LFxuICAgIHk6IHBvaW50Mi55IC0gcG9pbnQxLnlcbiAgfTtcbn1cblxuZnVuY3Rpb24gZ2V0UG9pbnRzKGJvdW5kaW5nQm94KSB7XG4gIHZhciBtYXhYID0gYm91bmRpbmdCb3gueCArIGJvdW5kaW5nQm94LndpZHRoO1xuICB2YXIgbWF4WSA9IGJvdW5kaW5nQm94LnkgKyBib3VuZGluZ0JveC5oZWlnaHQ7XG4gIHZhciB0b3BMZWZ0UG9pbnQgPSB7XG4gICAgeDogYm91bmRpbmdCb3gueCxcbiAgICB5OiBib3VuZGluZ0JveC55XG4gIH07XG4gIHZhciB0b3BSaWdodFBvaW50ID0ge1xuICAgIHg6IG1heFgsXG4gICAgeTogYm91bmRpbmdCb3gueVxuICB9O1xuICB2YXIgYm90dG9tUmlnaHRQb2ludCA9IHtcbiAgICB4OiBtYXhYLFxuICAgIHk6IG1heFlcbiAgfTtcbiAgdmFyIGJvdHRvbUxlZnRQb2ludCA9IHtcbiAgICB4OiBib3VuZGluZ0JveC54LFxuICAgIHk6IG1heFlcbiAgfTtcbiAgcmV0dXJuIFt0b3BMZWZ0UG9pbnQsIHRvcFJpZ2h0UG9pbnQsIGJvdHRvbVJpZ2h0UG9pbnQsIGJvdHRvbUxlZnRQb2ludF07XG59XG5cbmZ1bmN0aW9uIGdldE5vblBhcmFsbGVsU2lkZVZlY3RvcnMoYm91bmRpbmdCb3gpIHtcbiAgdmFyIHBvaW50cyA9IGdldFBvaW50cyhib3VuZGluZ0JveCk7XG4gIHJldHVybiBbLy8gdG9wIGxlZnQgLT4gdG9wIHJpZ2h0XG4gIGdldFZlY3RvckJldHdlZW5Qb2ludHMocG9pbnRzWzBdLCBwb2ludHNbMV0pLCAvLyB0b3AgcmlnaHQgLT4gYm90dG9tIHJpZ2h0XG4gIGdldFZlY3RvckJldHdlZW5Qb2ludHMocG9pbnRzWzFdLCBwb2ludHNbMl0pXTtcbn1cblxuZnVuY3Rpb24gZ2V0Tm9ybWFsKHZlY3Rvcikge1xuICByZXR1cm4ge1xuICAgIHg6IHZlY3Rvci55LFxuICAgIHk6IC12ZWN0b3IueFxuICB9O1xufVxuXG5mdW5jdGlvbiBub3JtYWxpemUodmVjdG9yKSB7XG4gIHZhciBtYWduaXR1ZGUgPSBnZXRNYWduaXR1ZGUodmVjdG9yKTtcbiAgcmV0dXJuIHtcbiAgICB4OiBtYWduaXR1ZGUgPiAwID8gdmVjdG9yLnggLyBtYWduaXR1ZGUgOiAwLFxuICAgIHk6IG1hZ25pdHVkZSA+IDAgPyB2ZWN0b3IueSAvIG1hZ25pdHVkZSA6IDBcbiAgfTtcbn1cblxuZnVuY3Rpb24gZ2V0RG90KHZlY3RvcjEsIHZlY3RvcjIpIHtcbiAgcmV0dXJuIHZlY3RvcjEueCAqIHZlY3RvcjIueCArIHZlY3RvcjEueSAqIHZlY3RvcjIueTtcbn1cblxuZnVuY3Rpb24gbXVsdGlwbHkodmVjdG9yMSwgdmVjdG9yMikge1xuICByZXR1cm4ge1xuICAgIHg6IHZlY3RvcjEueCAqIHZlY3RvcjIueCxcbiAgICB5OiB2ZWN0b3IxLnkgKiB2ZWN0b3IyLnlcbiAgfTtcbn1cblxuZnVuY3Rpb24gZ2V0TWFnbml0dWRlKHZlY3Rvcikge1xuICByZXR1cm4gTWF0aC5zcXJ0KE1hdGgucG93KHZlY3Rvci54LCAyKSArIE1hdGgucG93KHZlY3Rvci55LCAyKSk7XG59XG5cbmZ1bmN0aW9uIGNsb3Nlc3RUb1BvaW50KHRhcmdldFBvaW50LCBwb2ludHMpIHtcbiAgdmFyIGNsb3Nlc3RQb2ludCA9IHBvaW50c1swXTtcbiAgdmFyIGNsb3Nlc3REaXN0YW5jZSA9IE51bWJlci5QT1NJVElWRV9JTkZJTklUWTtcbiAgdmFyIGN1cnJlbnREaXN0YW5jZTtcbiAgcG9pbnRzLmZvckVhY2goZnVuY3Rpb24gKHBvaW50KSB7XG4gICAgY3VycmVudERpc3RhbmNlID0gZ2V0TWFnbml0dWRlKGdldFZlY3RvckJldHdlZW5Qb2ludHModGFyZ2V0UG9pbnQsIHBvaW50KSk7XG5cbiAgICBpZiAoY3VycmVudERpc3RhbmNlIDwgY2xvc2VzdERpc3RhbmNlKSB7XG4gICAgICBjbG9zZXN0RGlzdGFuY2UgPSBjdXJyZW50RGlzdGFuY2U7XG4gICAgICBjbG9zZXN0UG9pbnQgPSBwb2ludDtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gY2xvc2VzdFBvaW50O1xufVxuXG5mdW5jdGlvbiBkb0ludGVyc2VjdENpcmNsZXNTQVQoY2lyY2xlMSwgY2lyY2xlMikge1xuICB2YXIgc2F0MSA9IGdldFNBVEluZm9Gb3JDaXJjbGUoY2lyY2xlMSk7XG4gIHZhciBzYXQyID0gZ2V0U0FUSW5mb0ZvckNpcmNsZShjaXJjbGUyKTtcbiAgdmFyIGNlbnRlclBvaW50c0F4aXMgPSBnZXRWZWN0b3JCZXR3ZWVuUG9pbnRzKGNpcmNsZTEsIGNpcmNsZTIpO1xuICBzYXQxLmF4ZXMucHVzaChjZW50ZXJQb2ludHNBeGlzKTtcbiAgcmV0dXJuIGRvSW50ZXJzZWN0U0FUKHNhdDEsIHNhdDIpO1xufVxuZnVuY3Rpb24gZG9JbnRlcnNlY3RCb3VuZGluZ0JveENpcmNsZVNBVChib3gsIGNpcmNsZSkge1xuICB2YXIgc2F0MSA9IGdldFNBVEluZm9Gb3JCb3VuZGluZ0JveChib3gpO1xuICB2YXIgc2F0MiA9IGdldFNBVEluZm9Gb3JDaXJjbGUoY2lyY2xlKTtcbiAgdmFyIGJveFBvaW50cyA9IGdldFBvaW50cyhib3gpO1xuICB2YXIgY2xvc2VzdFBvaW50ID0gY2xvc2VzdFRvUG9pbnQoY2lyY2xlLCBib3hQb2ludHMpO1xuICBzYXQxLmF4ZXMucHVzaChnZXRWZWN0b3JCZXR3ZWVuUG9pbnRzKGNsb3Nlc3RQb2ludCwgY2lyY2xlKSk7XG4gIHJldHVybiBkb0ludGVyc2VjdFNBVChzYXQxLCBzYXQyKTtcbn1cbmZ1bmN0aW9uIGRvSW50ZXJzZWN0Qm91bmRpbmdCb3hlc1NBVChib3gxLCBib3gyKSB7XG4gIHZhciBzYXQxID0gZ2V0U0FUSW5mb0ZvckJvdW5kaW5nQm94KGJveDEpO1xuICB2YXIgc2F0MiA9IGdldFNBVEluZm9Gb3JCb3VuZGluZ0JveChib3gyKTtcbiAgcmV0dXJuIGRvSW50ZXJzZWN0U0FUKHNhdDEsIHNhdDIpO1xufVxuXG5mdW5jdGlvbiBnZXRTQVRJbmZvRm9yQ2lyY2xlKGNpcmNsZSkge1xuICByZXR1cm4ge1xuICAgIGF4ZXM6IFtdLFxuICAgIHBvaW50czogW3tcbiAgICAgIHg6IGNpcmNsZS54LFxuICAgICAgeTogY2lyY2xlLnlcbiAgICB9XSxcbiAgICBidWZmZXI6IGNpcmNsZS5yXG4gIH07XG59XG5cbmZ1bmN0aW9uIGdldFNBVEluZm9Gb3JCb3VuZGluZ0JveChib3gpIHtcbiAgdmFyIHBvaW50cyA9IGdldFBvaW50cyhib3gpO1xuICB2YXIgc2lkZXMgPSBnZXROb25QYXJhbGxlbFNpZGVWZWN0b3JzKGJveCk7XG4gIHZhciBheGVzID0gc2lkZXMubWFwKGZ1bmN0aW9uIChzaWRlKSB7XG4gICAgcmV0dXJuIGdldE5vcm1hbChzaWRlKTtcbiAgfSk7XG4gIHJldHVybiB7XG4gICAgYXhlczogYXhlcyxcbiAgICBwb2ludHM6IHBvaW50cyxcbiAgICBidWZmZXI6IDBcbiAgfTtcbn1cblxuZnVuY3Rpb24gZG9JbnRlcnNlY3RTQVQoc2F0MSwgc2F0Mikge1xuICB2YXIgc2NhbGFyUHJvamVjdGlvbjtcbiAgdmFyIG1heEJveDE7XG4gIHZhciBtaW5Cb3gxO1xuICB2YXIgbWF4Qm94MjtcbiAgdmFyIG1pbkJveDI7XG4gIHZhciBvdmVybGFwMTtcbiAgdmFyIG92ZXJsYXAyO1xuICB2YXIgbWluVHJhbnNsYXRpb25EaXN0YW5jZSA9IE51bWJlci5QT1NJVElWRV9JTkZJTklUWTtcbiAgdmFyIG1pblRyYW5zbGF0aW9uVmVjdG9yID0gbnVsbDtcbiAgdmFyIGF4ZXMgPSBzYXQxLmF4ZXMuY29uY2F0KHNhdDIuYXhlcykubWFwKGZ1bmN0aW9uIChheGlzKSB7XG4gICAgcmV0dXJuIG5vcm1hbGl6ZShheGlzKTtcbiAgfSk7XG4gIHZhciBudW1BeGVzID0gYXhlcy5sZW5ndGg7XG5cbiAgdmFyIF9sb29wID0gZnVuY3Rpb24gX2xvb3AoYXhlc0luZGV4KSB7XG4gICAgbWF4Qm94MSA9IE51bWJlci5ORUdBVElWRV9JTkZJTklUWTtcbiAgICBtaW5Cb3gxID0gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZO1xuICAgIG1heEJveDIgPSBOdW1iZXIuTkVHQVRJVkVfSU5GSU5JVFk7XG4gICAgbWluQm94MiA9IE51bWJlci5QT1NJVElWRV9JTkZJTklUWTsgLy8gcHJvamVjdCBhbGwgc2lkZXMgb2YgYm94MSBvbnRvIG5vcm1hbCAoc2VwYXJhdGluZyBheGlzKVxuICAgIC8vIFdlIHdhbnQgdG8gcmVjb3JkIHRoZSBtaW5pbXVtIGFuZCBtYXhpbXVtIHNjYWxhciBwcm9qZWN0aW9uc1xuICAgIC8vIFRoaXMgd2lsbCBiZSBkb25lIGZvciBib3RoIGJveGVzXG5cbiAgICBzYXQxLnBvaW50cy5mb3JFYWNoKGZ1bmN0aW9uIChwb2ludEluMSkge1xuICAgICAgc2NhbGFyUHJvamVjdGlvbiA9IGdldERvdChwb2ludEluMSwgYXhlc1theGVzSW5kZXhdKTtcbiAgICAgIG1pbkJveDEgPSBNYXRoLm1pbihzY2FsYXJQcm9qZWN0aW9uIC0gc2F0MS5idWZmZXIsIG1pbkJveDEpO1xuICAgICAgbWF4Qm94MSA9IE1hdGgubWF4KHNjYWxhclByb2plY3Rpb24gKyBzYXQxLmJ1ZmZlciwgbWF4Qm94MSk7XG4gICAgfSk7XG4gICAgc2F0Mi5wb2ludHMuZm9yRWFjaChmdW5jdGlvbiAocG9pbnRJbjIpIHtcbiAgICAgIHNjYWxhclByb2plY3Rpb24gPSBnZXREb3QocG9pbnRJbjIsIGF4ZXNbYXhlc0luZGV4XSk7XG4gICAgICBtaW5Cb3gyID0gTWF0aC5taW4oc2NhbGFyUHJvamVjdGlvbiAtIHNhdDIuYnVmZmVyLCBtaW5Cb3gyKTtcbiAgICAgIG1heEJveDIgPSBNYXRoLm1heChzY2FsYXJQcm9qZWN0aW9uICsgc2F0Mi5idWZmZXIsIG1heEJveDIpO1xuICAgIH0pOyAvLyBNdXN0IGludGVyc2VjdCAob3ZlcmxhcCkgb24gYWxsIHNlcGFyYXRpbmcgYXhlc1xuICAgIC8vIENhbiBiYWlsIGVhcmx5LCBvciBvbiB0aGUgZmlyc3QgdGltZSBub3Qgb3ZlcmxhcHBpbmdcblxuICAgIGlmIChtYXhCb3gxIDwgbWluQm94MiB8fCBtYXhCb3gyIDwgbWluQm94MSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdjogbnVsbFxuICAgICAgfTtcbiAgICB9IC8vIGNvbXB1dGUgb3ZlcmxhcFxuXG5cbiAgICBvdmVybGFwMSA9IG1heEJveDEgLSBtaW5Cb3gyO1xuICAgIG92ZXJsYXAyID0gbWF4Qm94MiAtIG1pbkJveDE7XG5cbiAgICBpZiAob3ZlcmxhcDEgPCBtaW5UcmFuc2xhdGlvbkRpc3RhbmNlKSB7XG4gICAgICBtaW5UcmFuc2xhdGlvbkRpc3RhbmNlID0gb3ZlcmxhcDE7XG4gICAgICBtaW5UcmFuc2xhdGlvblZlY3RvciA9IGF4ZXNbYXhlc0luZGV4XTtcbiAgICB9XG5cbiAgICBpZiAob3ZlcmxhcDIgPCBtaW5UcmFuc2xhdGlvbkRpc3RhbmNlKSB7XG4gICAgICBtaW5UcmFuc2xhdGlvbkRpc3RhbmNlID0gb3ZlcmxhcDI7XG4gICAgICBtaW5UcmFuc2xhdGlvblZlY3RvciA9IGF4ZXNbYXhlc0luZGV4XTtcbiAgICB9XG4gIH07XG5cbiAgZm9yICh2YXIgYXhlc0luZGV4ID0gMDsgYXhlc0luZGV4IDwgbnVtQXhlczsgYXhlc0luZGV4KyspIHtcbiAgICB2YXIgX3JldCA9IF9sb29wKGF4ZXNJbmRleCk7XG5cbiAgICBpZiAoX3R5cGVvZihfcmV0KSA9PT0gXCJvYmplY3RcIikgcmV0dXJuIF9yZXQudjtcbiAgfVxuXG4gIHJldHVybiBtaW5UcmFuc2xhdGlvblZlY3RvciA/IG11bHRpcGx5KG1pblRyYW5zbGF0aW9uVmVjdG9yLCB7XG4gICAgeDogbWluVHJhbnNsYXRpb25EaXN0YW5jZSxcbiAgICB5OiBtaW5UcmFuc2xhdGlvbkRpc3RhbmNlXG4gIH0pIDogbnVsbDtcbn1cblxuLy8gLSBDaXJjbGUgYW5kIENpcmNsZVxuLy8gLSBDaXJjbGUgYW5kIFBvaW50XG4vLyAtIENpcmNsZSBhbmQgQm91bmRpbmdCb3hcbi8vIC0gQm91bmRpbmdCb3ggYW5kIEJvdW5kaW5nQm94XG4vLyAtIEJvdW5kaW5nQm94IGFuZCBQb2ludFxuLy8gLSBQb2ludCBhbmQgUG9pbnRcblxuZnVuY3Rpb24gaXNDaXJjbGUoYm91bmQpIHtcbiAgcmV0dXJuIGJvdW5kLnIgIT09IHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gaXNCb3VuZGluZ0JveChib3VuZCkge1xuICByZXR1cm4gYm91bmQud2lkdGggIT09IHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gaXNQb2ludChib3VuZCkge1xuICByZXR1cm4gIWlzQ2lyY2xlKGJvdW5kKSAmJiAhaXNCb3VuZGluZ0JveChib3VuZCk7XG59XG5cbmZ1bmN0aW9uIHRvQ2lyY2xlRnJvbVBvaW50KHBvaW50KSB7XG4gIHJldHVybiB7XG4gICAgeDogcG9pbnQueCxcbiAgICB5OiBwb2ludC55LFxuICAgIHI6IDBcbiAgfTtcbn1cblxuZnVuY3Rpb24gZG9Cb3VuZHNJbnRlcnNlY3QoYm91bmQxLCBib3VuZDIpIHtcbiAgdmFyIGlzQm91bmQxQ2lyY2xlID0gaXNDaXJjbGUoYm91bmQxKTtcbiAgdmFyIGlzQm91bmQyQ2lyY2xlID0gaXNDaXJjbGUoYm91bmQyKTtcbiAgdmFyIGlzQm91bmQxQm91bmRpbmdCb3ggPSBpc0JvdW5kaW5nQm94KGJvdW5kMSk7XG4gIHZhciBpc0JvdW5kMkJvdW5kaW5nQm94ID0gaXNCb3VuZGluZ0JveChib3VuZDIpO1xuICB2YXIgaXNCb3VuZDFQb2ludCA9IGlzUG9pbnQoYm91bmQxKTtcbiAgdmFyIGlzQm91bmQyUG9pbnQgPSBpc1BvaW50KGJvdW5kMik7IC8vIFRoZXkgYXJlIGJvdGggY2lyY2xlc1xuXG4gIGlmIChpc0JvdW5kMUNpcmNsZSAmJiBpc0JvdW5kMkNpcmNsZSkge1xuICAgIHJldHVybiBkb0ludGVyc2VjdENpcmNsZXNTQVQoYm91bmQxLCBib3VuZDIpO1xuICB9IC8vIFRoZXkgYXJlIGJvdGggYm91bmRpbmcgYm94ZXNcblxuXG4gIGlmIChpc0JvdW5kMUJvdW5kaW5nQm94ICYmIGlzQm91bmQyQm91bmRpbmdCb3gpIHtcbiAgICByZXR1cm4gZG9JbnRlcnNlY3RCb3VuZGluZ0JveGVzU0FUKGJvdW5kMSwgYm91bmQyKTtcbiAgfSAvLyBUaGV5IGFyZSBib3RoIHBvaW50c1xuXG5cbiAgaWYgKGlzQm91bmQxUG9pbnQgJiYgaXNCb3VuZDJQb2ludCkge1xuICAgIHZhciBfcG9pbnQxQ2lyY2xlID0gdG9DaXJjbGVGcm9tUG9pbnQoYm91bmQxKTtcblxuICAgIHZhciBwb2ludDJDaXJjbGUgPSB0b0NpcmNsZUZyb21Qb2ludChib3VuZDIpO1xuICAgIHJldHVybiBkb0ludGVyc2VjdENpcmNsZXNTQVQoX3BvaW50MUNpcmNsZSwgcG9pbnQyQ2lyY2xlKTtcbiAgfSAvLyAxIGlzIGNpcmNsZSwgMiBpcyBib3VuZGluZyBib3hcblxuXG4gIGlmIChpc0JvdW5kMUNpcmNsZSAmJiBpc0JvdW5kMkJvdW5kaW5nQm94KSB7XG4gICAgcmV0dXJuIGRvSW50ZXJzZWN0Qm91bmRpbmdCb3hDaXJjbGVTQVQoYm91bmQyLCBib3VuZDEpO1xuICB9IC8vIDEgaXMgYm91bmRpbmcgYm94LCAyIGlzIGNpcmNsZVxuXG5cbiAgaWYgKGlzQm91bmQxQm91bmRpbmdCb3ggJiYgaXNCb3VuZDJDaXJjbGUpIHtcbiAgICByZXR1cm4gZG9JbnRlcnNlY3RCb3VuZGluZ0JveENpcmNsZVNBVChib3VuZDEsIGJvdW5kMik7XG4gIH0gLy8gMSBpcyBjaXJjbGUsIDIgaXMgcG9pbnRcblxuXG4gIGlmIChpc0JvdW5kMUNpcmNsZSAmJiBpc0JvdW5kMlBvaW50KSB7XG4gICAgdmFyIF9wb2ludDJDaXJjbGUgPSB0b0NpcmNsZUZyb21Qb2ludChib3VuZDIpO1xuXG4gICAgcmV0dXJuIGRvSW50ZXJzZWN0Q2lyY2xlc1NBVChib3VuZDEsIF9wb2ludDJDaXJjbGUpO1xuICB9IC8vIDEgaXMgcG9pbnQsIDIgaXMgMiBpcyBjaXJjbGVcblxuXG4gIGlmIChpc0JvdW5kMVBvaW50ICYmIGlzQm91bmQyQ2lyY2xlKSB7XG4gICAgdmFyIF9wb2ludDFDaXJjbGUyID0gdG9DaXJjbGVGcm9tUG9pbnQoYm91bmQxKTtcblxuICAgIHJldHVybiBkb0ludGVyc2VjdENpcmNsZXNTQVQoX3BvaW50MUNpcmNsZTIsIGJvdW5kMik7XG4gIH0gLy8gMSBpcyBib3VuZGluZyBib3gsIDIgaXMgcG9pbnRcblxuXG4gIGlmIChpc0JvdW5kMUJvdW5kaW5nQm94ICYmIGlzQm91bmQyUG9pbnQpIHtcbiAgICB2YXIgX3BvaW50MkNpcmNsZTIgPSB0b0NpcmNsZUZyb21Qb2ludChib3VuZDIpO1xuXG4gICAgcmV0dXJuIGRvSW50ZXJzZWN0Qm91bmRpbmdCb3hDaXJjbGVTQVQoYm91bmQxLCBfcG9pbnQyQ2lyY2xlMik7XG4gIH0gLy8gMSBpcyBwb2ludCwgMiBpcyBib3VuZGluZyBib3hcblxuXG4gIHZhciBwb2ludDFDaXJjbGUgPSB0b0NpcmNsZUZyb21Qb2ludChib3VuZDEpO1xuICByZXR1cm4gZG9JbnRlcnNlY3RCb3VuZGluZ0JveENpcmNsZVNBVChib3VuZDIsIHBvaW50MUNpcmNsZSk7XG59XG5mdW5jdGlvbiBkaXZpZGVCb3VuZGluZ0JveChib3VuZHMpIHtcbiAgdmFyIHF1YWRXaWR0aCA9IGJvdW5kcy53aWR0aCAvIDI7XG4gIHZhciBxdWFkSGVpZ2h0ID0gYm91bmRzLmhlaWdodCAvIDI7XG4gIHZhciBvZmZzZXRYID0gYm91bmRzLnggKyBxdWFkV2lkdGg7XG4gIHZhciBvZmZzZXRZID0gYm91bmRzLnkgKyBxdWFkSGVpZ2h0O1xuICB2YXIgbndCb3VuZGluZ0JveCA9IHtcbiAgICB4OiBib3VuZHMueCxcbiAgICB5OiBib3VuZHMueSxcbiAgICB3aWR0aDogcXVhZFdpZHRoLFxuICAgIGhlaWdodDogcXVhZEhlaWdodFxuICB9O1xuICB2YXIgbmVCb3VuZGluZ0JveCA9IHtcbiAgICB4OiBvZmZzZXRYLFxuICAgIHk6IGJvdW5kcy55LFxuICAgIHdpZHRoOiBxdWFkV2lkdGgsXG4gICAgaGVpZ2h0OiBxdWFkSGVpZ2h0XG4gIH07XG4gIHZhciBzd0JvdW5kaW5nQm94ID0ge1xuICAgIHg6IGJvdW5kcy54LFxuICAgIHk6IG9mZnNldFksXG4gICAgd2lkdGg6IHF1YWRXaWR0aCxcbiAgICBoZWlnaHQ6IHF1YWRIZWlnaHRcbiAgfTtcbiAgdmFyIHNlQm91bmRpbmdCb3ggPSB7XG4gICAgeDogb2Zmc2V0WCxcbiAgICB5OiBvZmZzZXRZLFxuICAgIHdpZHRoOiBxdWFkV2lkdGgsXG4gICAgaGVpZ2h0OiBxdWFkSGVpZ2h0XG4gIH07XG4gIHJldHVybiBbbndCb3VuZGluZ0JveCwgbmVCb3VuZGluZ0JveCwgc3dCb3VuZGluZ0JveCwgc2VCb3VuZGluZ0JveF07XG59XG5mdW5jdGlvbiBjcmVhdGVQb2ludEtleShwb2ludCkge1xuICByZXR1cm4gXCIoXCIuY29uY2F0KHBvaW50LngsIFwiLFwiKS5jb25jYXQocG9pbnQueSwgXCIpXCIpO1xufVxuZnVuY3Rpb24gZmxhdHRlblNldHMoc2V0cykge1xuICByZXR1cm4gc2V0cy5yZWR1Y2UoZnVuY3Rpb24gKGZsYXR0ZW5lZFNldCwgY3VyclNldCkge1xuICAgIGN1cnJTZXQuZm9yRWFjaChmdW5jdGlvbiAoc2V0SXRlbSkge1xuICAgICAgcmV0dXJuIGZsYXR0ZW5lZFNldC5hZGQoc2V0SXRlbSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGZsYXR0ZW5lZFNldDtcbiAgfSwgbmV3IFNldCgpKTtcbn1cblxuZnVuY3Rpb24gYWRkVG9RdWFkVHJlZShxdWFkVHJlZSwgb2JqZWN0KSB7XG4gIHZhciBvYmplY3RQb2ludCA9IHtcbiAgICB4OiBvYmplY3QueCxcbiAgICB5OiBvYmplY3QueVxuICB9OyAvLyBMZXQncyBmaXJzdCBjaGVjayBpZiB0aGUgcG9pbnQgdGhpcyBvYmplY3Qgb2NjdXBpZXMgaXMgd2l0aGluXG4gIC8vIHRoZSBib3VuZHMgb2YgdGhlIGJ1Y2tldFxuXG4gIGlmICghZG9Cb3VuZHNJbnRlcnNlY3QocXVhZFRyZWUuYm91bmRzLCBvYmplY3RQb2ludCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0gLy8gQ2hlY2tpbmcgY2hpbGRyZW4sIGlmIHRoaXMgbm9kZSBpcyBhIFwiQ29udGFpbmVyXCIgKE5vIGRhdGEpXG5cblxuICBpZiAoKHF1YWRUcmVlLnF1YWRyYW50cyB8fCBbXSkubGVuZ3RoKSB7XG4gICAgLy8gUnVuIHRocm91Z2ggYWxsIGNoaWxkcmVuIGNoZWNraW5nIGlmIHRoZSBvYmplY3QgY2FuIGJlIGFkZGVkXG4gICAgLy8gQXQgdGhlIGZpcnN0IHN1Y2Nlc3NmdWwgYWRkLCB3ZSBjYW4gYmFpbCBvdXQsIG9ubHkgbmVlZHMgdG8gYmUgc3RvcmVkIG9uY2VcbiAgICB2YXIgd2FzQWRkZWRUb0NoaWxkID0gcXVhZFRyZWUucXVhZHJhbnRzLnNvbWUoZnVuY3Rpb24gKHF1YWRyYW50KSB7XG4gICAgICByZXR1cm4gYWRkVG9RdWFkVHJlZShxdWFkcmFudCwgb2JqZWN0KTtcbiAgICB9KTsgLy8gT25seSBsZWFmIG5vZGVzIHNob3VsZCBoYXZlIGRhdGEgKFdlIGFyZSBhIFwiQ29udGFpbmVyIG5vZGVcIilcbiAgICAvLyBJZiBpdCBkaWRuJ3QgaW50ZXJzZWN0IHdpdGggYW55IGNoaWxkLCBpdCB3b24ndCBpbnRlcnNlY3Qgd2l0aCB1c1xuXG4gICAgcmV0dXJuIHdhc0FkZGVkVG9DaGlsZDtcbiAgfSAvLyBMZXQncyBnZXQgdGhlIGRhdGEgYWxyZWFkeSBhc3NvY2lhdGVkIHdpdGggdGhpcyBidWNrZXRcblxuXG4gIHZhciBvYmplY3RQb2ludEtleSA9IGNyZWF0ZVBvaW50S2V5KG9iamVjdFBvaW50KTtcbiAgdmFyIG9iamVjdFBvaW50U2V0ID0gcXVhZFRyZWUuZGF0YS5nZXQob2JqZWN0UG9pbnRLZXkpIHx8IG5ldyBTZXQoKTsgLy8gTGV0J3MgY2hlY2sgaWYgdGhlIG9iamVjdCBpcyBhbHJlYWR5IGluIHRoZSBidWNrZXRcblxuICBpZiAob2JqZWN0UG9pbnRTZXQuaGFzKG9iamVjdCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0gLy8gTGV0J3Mgc2VlIGlmIHRoaXMgcXVhZHJhbnQgaGFzIGFueSBjYXBhY2l0eVxuICAvLyBJZiBpdCBkb2VzLCB3ZSBjYW4gZ28gYWhlYWQgYW5kIHN0b3JlIHRoZSBjdXJyZW50IG9iamVjdFxuICAvL1xuICAvLyBXZSBhbHNvIHdhbm5hIGdvIGFoZWFkIGFuZCBhZGQsIGlmIHRoaXMgcG9pbnQgKHgsIHkpIGhhcyBhbHJlYWR5XG4gIC8vIGhhZCBhbiBvYmplY3QgYWRkZWQsIHdlJ2xsIGNoYWluIGl0IG9uIHRvIHRoZSBsaXN0IG9mIG9iamVjdHMgXG4gIC8vIGFzc29jaWF0ZWQgd2l0aCB0aGlzIHBvaW50XG5cblxuICBpZiAob2JqZWN0UG9pbnRTZXQuc2l6ZSA+IDAgfHwgcXVhZFRyZWUuZGF0YS5zaXplICsgMSA8PSBxdWFkVHJlZS5jYXBhY2l0eSkge1xuICAgIG9iamVjdFBvaW50U2V0LmFkZChvYmplY3QpO1xuICAgIHF1YWRUcmVlLmRhdGEuc2V0KG9iamVjdFBvaW50S2V5LCBvYmplY3RQb2ludFNldCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gLy8gVGhlIGN1cnJlbnQgbm9kZSBmaXRzIHRoZSBjdXJyZW50IG9iamVjdCwgYnV0XG4gIC8vIFRoZXJlIGlzbid0IGFueSBjYXBhY2l0eVxuICAvLyBXZSBuZWVkIHRvIHNwbGl0IHRoaXMgYnVja2V0IHVwXG4gIC8vIExldCdzIGZpcnN0IGJ1aWxkIHRoZSBjaGlsZCBxdWFkcmFudHNcbiAgLy8gTGV0J3MgY3JlYXRlIHRoZSBjaGlsZCBRdWFkVHJlZSdzIGZyb20gdGhlIGRpdmlkZWQgcXVhZHJhbnQgYm91bmRzXG5cblxuICB2YXIgcXVhZEJveGVzID0gZGl2aWRlQm91bmRpbmdCb3gocXVhZFRyZWUuYm91bmRzKTtcbiAgdmFyIHF1YWRyYW50cyA9IHF1YWRCb3hlcy5tYXAoZnVuY3Rpb24gKHF1YWRCb3gpIHtcbiAgICByZXR1cm4gY3JlYXRlUXVhZFRyZWUocXVhZEJveCwgcXVhZFRyZWUuY2FwYWNpdHkpO1xuICB9KTtcbiAgdmFyIHF1YWRPYmplY3RzID0gZ2V0UXVhZFRyZWVEYXRhKHF1YWRUcmVlKS5jb25jYXQob2JqZWN0KTsgLy8gYWRqdXN0IGN1cnJlbnQgcXVhZHRyZWUgc2V0dGluZ3NcbiAgLy8gTWF5IG5lZWQgdG8gYWRqdXN0IHRoZXNlIGluLXBsYWNlIGluc3RlYWQgb2YgY3JlYXRpbmcgbmV3IHJlZmVyZW5jZXNcblxuICBjbGVhclF1YWRUcmVlKHF1YWRUcmVlKTtcbiAgcXVhZFRyZWUucXVhZHJhbnRzID0gcXVhZHJhbnRzOyAvLyBhZGQgb2JqZWN0cyBmcm9tIHRoaXMgcXVhZCBub2RlIGJhY2sgdG8gaXQncyBvd24gc3VidHJlZVxuICAvLyBjaGlsZHJlbiB3aWxsIGJlIGF0dGVtcHRlZCB0byBiZSBhZGRlZCB0byBmaXJzdFxuXG4gIHJldHVybiBxdWFkT2JqZWN0cy5ldmVyeShmdW5jdGlvbiAocXVhZE9iamVjdCkge1xuICAgIHJldHVybiBhZGRUb1F1YWRUcmVlKHF1YWRUcmVlLCBxdWFkT2JqZWN0KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUZyb21RdWFkVHJlZShxdWFkVHJlZSwgb2JqZWN0KSB7XG4gIHZhciBvYmplY3RQb2ludCA9IHtcbiAgICB4OiBvYmplY3QueCxcbiAgICB5OiBvYmplY3QueVxuICB9O1xuICB2YXIgb2JqZWN0UG9pbnRLZXkgPSBjcmVhdGVQb2ludEtleShvYmplY3RQb2ludCk7XG4gIHZhciBvYmplY3RQb2ludFNldCA9IHF1YWRUcmVlLmRhdGEuZ2V0KG9iamVjdFBvaW50S2V5KSB8fCBuZXcgU2V0KCk7IC8vIExldCdzIGZpcnN0IGNoZWNrIGlmIHRoZSBwb2ludCB0aGlzIG9iamVjdCBvY2N1cGllcyBpcyB3aXRoaW5cbiAgLy8gdGhlIGJvdW5kcyBvZiB0aGUgYnVja2V0XG5cbiAgaWYgKCFkb0JvdW5kc0ludGVyc2VjdChxdWFkVHJlZS5ib3VuZHMsIG9iamVjdFBvaW50KSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSAvLyBJZiBvYmplY3QgaXMgZm91bmQsIGxldCdzIHJlbW92ZSBpdFxuXG5cbiAgaWYgKG9iamVjdFBvaW50U2V0LmhhcyhvYmplY3QpKSB7XG4gICAgb2JqZWN0UG9pbnRTZXRbXCJkZWxldGVcIl0ob2JqZWN0KTsgLy8gSWYgdGhlcmUgd2VyZSBtdWx0aXBsZSBvYmplY3RzIGF0IHRoaXMgcG9pbnRcbiAgICAvLyB3ZSBkb24ndCBuZWVkIHRvIHJlbW92ZSB0aGlzIHBvaW50IGtleVxuXG4gICAgaWYgKG9iamVjdFBvaW50U2V0LnNpemUgPiAwKSB7XG4gICAgICBxdWFkVHJlZS5kYXRhLnNldChvYmplY3RQb2ludEtleSwgb2JqZWN0UG9pbnRTZXQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBxdWFkVHJlZS5kYXRhW1wiZGVsZXRlXCJdKG9iamVjdFBvaW50S2V5KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSAvLyBDaGVjayBjaGlsZHJlbiB0byBmaW5kIG9iamVjdCBhbmQgcmVtb3ZlIGlmIGZvdW5kXG5cblxuICB2YXIgd2FzUmVtb3ZlZCA9IHF1YWRUcmVlLnF1YWRyYW50cy5zb21lKGZ1bmN0aW9uIChxdWFkcmFudCkge1xuICAgIHJldHVybiByZW1vdmVGcm9tUXVhZFRyZWUocXVhZHJhbnQsIG9iamVjdCk7XG4gIH0pOyAvLyBJZiBvbmUgb2YgdGhlIGNoaWxkcmVuIGNvbnRhaW5lZCB0aGUgb2JqZWN0IHdlIGp1c3QgcmVtb3ZlZFxuICAvLyBMZXQncyBxdWVyeSB0aGUgYm91bmRpbmcgYm94IG9mIHVzICh0aGUgcGFyZW50KSB0byBzZWUgaWYgd2UgXG4gIC8vIGNhbiBjb2xsYXBzZSBvciBjb25zdW1lIG91ciBjaGlsZHJlbi4gTWVhbmluZyB0aGUgY2hpbGQgc3VidHJlZVxuICAvLyBjb250YWlucyBsZXNzIGVsZW1lbnRzIHRoYW4gb3VyIGluZGl2aWR1YWwgYnVja2V0IGNhcGFjaXR5LlxuXG4gIGlmICh3YXNSZW1vdmVkKSB7XG4gICAgdmFyIGNoaWxkT2JqZWN0U2V0ID0gcXVlcnlRdWFkVHJlZShxdWFkVHJlZSwgcXVhZFRyZWUuYm91bmRzKTtcblxuICAgIGlmIChjaGlsZE9iamVjdFNldC5zaXplIDw9IHF1YWRUcmVlLmNhcGFjaXR5KSB7XG4gICAgICBjbGVhclF1YWRUcmVlKHF1YWRUcmVlKTtcbiAgICAgIGNoaWxkT2JqZWN0U2V0LmZvckVhY2goZnVuY3Rpb24gKGNoaWxkT2JqZWN0KSB7XG4gICAgICAgIHJldHVybiBhZGRUb1F1YWRUcmVlKHF1YWRUcmVlLCBjaGlsZE9iamVjdCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gd2FzUmVtb3ZlZDtcbn1cblxuZnVuY3Rpb24gY2xlYXJRdWFkVHJlZShxdWFkVHJlZSkge1xuICBxdWFkVHJlZS5kYXRhID0gbmV3IE1hcCgpO1xuICBxdWFkVHJlZS5xdWFkcmFudHMgPSBbXTtcbn1cblxuZnVuY3Rpb24gcXVlcnlRdWFkVHJlZShxdWFkVHJlZSwgYm91bmRzKSB7XG4gIC8vIENoZWNrIGZpcnN0IGlmIHRoZSBxdWVyeSBib3VuZHMgaW50ZXJzZWN0IHdpdGggdGhlIGJvdW5kc1xuICAvLyBvZiB0aGUgYnVja2V0LCBpZiBpdCBkb2Vzbid0IHdlIGNhbiBiYWlsIGltbWVkaWF0ZWx5IHdpdGggYW4gZW1wdHkgbGlzdFxuICBpZiAoIWRvQm91bmRzSW50ZXJzZWN0KHF1YWRUcmVlLmJvdW5kcywgYm91bmRzKSkge1xuICAgIHJldHVybiBuZXcgU2V0KCk7XG4gIH0gLy8gQ2hlY2sgaWYgY3VycmVudCBub2RlIGhhcyBjaGlsZHJlblxuXG5cbiAgaWYgKChxdWFkVHJlZS5xdWFkcmFudHMgfHwgW10pLmxlbmd0aCA9PT0gMCkge1xuICAgIC8vIExldCdzIGl0ZXJhdGUgb3ZlciB0aGUgZGF0YSBpbiB0aGUgYnVja2V0IHRvIHNlZVxuICAgIC8vIGlmIHRoZSBvYmplY3RzIHRoZW1zZWx2ZXMgaW50ZXJzZWN0IHdpdGggdGhlIHF1ZXJ5IGJvdW5kc1xuICAgIHZhciBxdWVyeVJlc3VsdFNldCA9IG5ldyBTZXQoKTtcbiAgICBnZXRRdWFkVHJlZURhdGEocXVhZFRyZWUpLmZvckVhY2goZnVuY3Rpb24gKHF1YWRPYmplY3QpIHtcbiAgICAgIHZhciBtdHYgPSBkb0JvdW5kc0ludGVyc2VjdChxdWFkT2JqZWN0LCBib3VuZHMpO1xuXG4gICAgICBpZiAobXR2ICYmIHF1YWRPYmplY3QgIT09IGJvdW5kcykge1xuICAgICAgICBxdWVyeVJlc3VsdFNldC5hZGQoX29iamVjdFNwcmVhZDIoe30sIHF1YWRPYmplY3QsIHtcbiAgICAgICAgICBtdHY6IG10dlxuICAgICAgICB9KSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHF1ZXJ5UmVzdWx0U2V0O1xuICB9IC8vIENoZWNrIHRoZSBjdXJyZW50IG5vZGVzIGNoaWxkcmVuXG4gIC8vIHF1ZXJ5aW5nIHRoZW0gZm9yIHRoZSBzYW1lIGluZm8gYW5kIGNvbGxlY3RpbmdcbiAgLy8gdGhlIHJlc3VsdHNcblxuXG4gIHZhciBjaGlsZFF1ZXJ5UmVzdWx0U2V0ID0gZmxhdHRlblNldHMocXVhZFRyZWUucXVhZHJhbnRzLm1hcChmdW5jdGlvbiAocXVhZHJhbnQpIHtcbiAgICByZXR1cm4gcXVlcnlRdWFkVHJlZShxdWFkcmFudCwgYm91bmRzKTtcbiAgfSkpO1xuICByZXR1cm4gY2hpbGRRdWVyeVJlc3VsdFNldDtcbn1cblxuZnVuY3Rpb24gZ2V0UXVhZFRyZWVEYXRhKHF1YWRUcmVlKSB7XG4gIHJldHVybiBBcnJheS5mcm9tKGZsYXR0ZW5TZXRzKEFycmF5LmZyb20ocXVhZFRyZWUuZGF0YS52YWx1ZXMoKSkpKTtcbn1cbi8qKlxuICogQ3JlYXRlcyBhIHF1YWR0cmVlIFwibWFuYWdpbmdcIiB0aGUgaW5wdXQgYm91bmRzIHdpdGggaW5wdXQgbm9kZSBjYXBhY2l0eS5cbiAqIFxuICogQWxsIGNvbGxpc2lvbiBvYmplY3RzIHNob3VsZCBpbnRlcnNlY3Qgb3IgYmUgY29udGFpbmVkIHdpdGhpbiB0aGVzZSBcIm1hbmFnZWRcIiBib3VuZHMuXG4gKiBAcGFyYW0ge0JvdW5kaW5nQm94fSBib3VuZHMgLSBUaGUgYm91bmRpbmcgYm94IHdpdGggd2hpY2ggdGhlIHF1YWR0cmVlIFwibWFuYWdlc1wiLlxuICogQHBhcmFtIHtudW1iZXJ9IFtjYXBhY2l0eT0zXSAtIFRoZSAjIG9mIGNvbGxpc2lvbiBvYmplY3RzIGEgbm9kZSBjYW4gY29udGFpbiBiZWZvcmUgc3ViZGl2aWRpbmcuXG4gKiBAcmV0dXJuIHtRdWFkVHJlZX0gVGhlIGNyZWF0ZWQgcXVhZHRyZWUgXCJtYW5hZ2luZ1wiIHRoZSBpbnB1dCBib3VuZHMuXG4gKi9cblxuXG5mdW5jdGlvbiBjcmVhdGVRdWFkVHJlZShib3VuZHMpIHtcbiAgdmFyIGNhcGFjaXR5ID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiAzO1xuICB2YXIgcXVhZFRyZWUgPSB7XG4gICAgYm91bmRzOiBib3VuZHMsXG4gICAgZGF0YTogbmV3IE1hcCgpLFxuICAgIGNhcGFjaXR5OiBjYXBhY2l0eSxcbiAgICBxdWFkcmFudHM6IFtdLFxuICAgIGFkZDogZnVuY3Rpb24gYWRkKG9iamVjdCkge1xuICAgICAgcmV0dXJuIGFkZFRvUXVhZFRyZWUocXVhZFRyZWUsIG9iamVjdCk7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZShvYmplY3QpIHtcbiAgICAgIHJldHVybiByZW1vdmVGcm9tUXVhZFRyZWUocXVhZFRyZWUsIG9iamVjdCk7XG4gICAgfSxcbiAgICBjbGVhcjogZnVuY3Rpb24gY2xlYXIoKSB7XG4gICAgICByZXR1cm4gY2xlYXJRdWFkVHJlZShxdWFkVHJlZSk7XG4gICAgfSxcbiAgICBxdWVyeTogZnVuY3Rpb24gcXVlcnkoYm91bmRzKSB7XG4gICAgICByZXR1cm4gcXVlcnlRdWFkVHJlZShxdWFkVHJlZSwgYm91bmRzKTtcbiAgICB9LFxuICAgIGdldERhdGE6IGZ1bmN0aW9uIGdldERhdGEoKSB7XG4gICAgICByZXR1cm4gZ2V0UXVhZFRyZWVEYXRhKHF1YWRUcmVlKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBxdWFkVHJlZTtcbn1cblxuZXhwb3J0IHsgY3JlYXRlUXVhZFRyZWUgfTtcbiIsImltcG9ydCB7IFBpeGVsLCBDb2xvciB9IGZyb20gJy4vc2NoZW1hJztcbmltcG9ydCBHSUYgZnJvbSAnZ2lmLmpzJztcblxuZXhwb3J0IGNvbnN0IFBJWEVMX1dJRFRIOiBudW1iZXIgPSA0O1xuZXhwb3J0IGNvbnN0IFdISVRFX0NPTE9SOiBDb2xvciA9IHtcbiAgICByOiAyNTUsXG4gICAgZzogMjU1LFxuICAgIGI6IDI1NSxcbiAgICBhOiAyNTUsXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gbG9hZEltYWdlKGltYWdlRmlsZTogRmlsZSk6IFByb21pc2U8SFRNTEltYWdlRWxlbWVudD4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGNvbnN0IGltYWdlRmlsZURhdGFVcmwgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChpbWFnZUZpbGUpO1xuICAgICAgICBjb25zdCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xuXG4gICAgICAgIGltYWdlLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICAgIHdpbmRvdy5VUkwucmV2b2tlT2JqZWN0VVJMKGltYWdlRmlsZURhdGFVcmwpO1xuICAgICAgICAgICAgcmVzb2x2ZShpbWFnZSlcbiAgICAgICAgfTtcbiAgICAgICAgaW1hZ2Uub25lcnJvciA9IChlcnIpID0+IHtcbiAgICAgICAgICAgIHdpbmRvdy5VUkwucmV2b2tlT2JqZWN0VVJMKGltYWdlRmlsZURhdGFVcmwpO1xuICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIH07XG4gICAgICAgIGltYWdlLnNyYyA9IGltYWdlRmlsZURhdGFVcmw7XG4gICAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBdmVyYWdlQ29sb3IocGl4ZWxzOiBQaXhlbFtdKTogQ29sb3Ige1xuICAgIGxldCBzcXVhcmVkU3VtUjogbnVtYmVyO1xuICAgIGxldCBzcXVhcmVkU3VtRzogbnVtYmVyO1xuICAgIGxldCBzcXVhcmVkU3VtQjogbnVtYmVyO1xuICAgIGxldCBzcXVhcmVkU3VtQTogbnVtYmVyO1xuICAgIGxldCBhdmVyYWdlQ29sb3I6IENvbG9yID0gcGl4ZWxzWzBdIHx8IFdISVRFX0NPTE9SO1xuXG4gICAgaWYgKHBpeGVscy5sZW5ndGggPiAxKSB7XG4gICAgICAgIHJldHVybiBwaXhlbHMuc2xpY2UoMSlcbiAgICAgICAgICAgIC5yZWR1Y2UoKHByZXZBdmVyYWdlOiBDb2xvciwgY3VyclBpeGVsOiBQaXhlbCkgPT4ge1xuICAgICAgICAgICAgICAgIHNxdWFyZWRTdW1SID0gTWF0aC5wb3cocHJldkF2ZXJhZ2UuciwgMikgKyBNYXRoLnBvdyhjdXJyUGl4ZWwuciwgMik7XG4gICAgICAgICAgICAgICAgc3F1YXJlZFN1bUcgPSBNYXRoLnBvdyhwcmV2QXZlcmFnZS5nLCAyKSArIE1hdGgucG93KGN1cnJQaXhlbC5nLCAyKTtcbiAgICAgICAgICAgICAgICBzcXVhcmVkU3VtQiA9IE1hdGgucG93KHByZXZBdmVyYWdlLmIsIDIpICsgTWF0aC5wb3coY3VyclBpeGVsLmIsIDIpO1xuICAgICAgICAgICAgICAgIHNxdWFyZWRTdW1BID0gTWF0aC5wb3cocHJldkF2ZXJhZ2UuYSwgMikgKyBNYXRoLnBvdyhjdXJyUGl4ZWwuYSwgMik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgcjogTWF0aC5zcXJ0KHNxdWFyZWRTdW1SIC8gMiksXG4gICAgICAgICAgICAgICAgICAgIGc6IE1hdGguc3FydChzcXVhcmVkU3VtRyAvIDIpLFxuICAgICAgICAgICAgICAgICAgICBiOiBNYXRoLnNxcnQoc3F1YXJlZFN1bUIgLyAyKSxcbiAgICAgICAgICAgICAgICAgICAgYTogTWF0aC5zcXJ0KHNxdWFyZWRTdW1BIC8gMiksXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0sIGF2ZXJhZ2VDb2xvcik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGF2ZXJhZ2VDb2xvcjtcbn1cblxuZnVuY3Rpb24gY3JlYXRlUGl4ZWwoeDogbnVtYmVyLCB5OiBudW1iZXIsIHI6IG51bWJlciwgZzogbnVtYmVyLCBiOiBudW1iZXIsIGE6IG51bWJlcik6IFBpeGVsIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB4LFxuICAgICAgICB5LFxuICAgICAgICByLFxuICAgICAgICBnLFxuICAgICAgICBiLFxuICAgICAgICBhLFxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVBpeGVscyhpbWFnZURhdGE6IEltYWdlRGF0YSk6IFBpeGVsW10ge1xuICAgIGxldCBwaXhlbHM6IFBpeGVsW10gPSBbXTtcbiAgICBwcm9jZXNzSW1hZ2VEYXRhKGltYWdlRGF0YSwgcGl4ZWwgPT4gcGl4ZWxzLnB1c2gocGl4ZWwpKTtcbiAgICByZXR1cm4gcGl4ZWxzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmlsbFBpeGVsSW5JbWFnZURhdGEoaW1hZ2VEYXRhOiBJbWFnZURhdGEsIHBpeGVsOiBQaXhlbCk6IHZvaWQge1xuICAgIGNvbnN0IHBpeGVsT2Zmc2V0OiBudW1iZXIgPSAocGl4ZWwueCArIHBpeGVsLnkgKiBpbWFnZURhdGEud2lkdGgpICogUElYRUxfV0lEVEg7XG4gICAgaWYgKHBpeGVsT2Zmc2V0IDwgMCB8fCBwaXhlbE9mZnNldCArIFBJWEVMX1dJRFRIID49IGltYWdlRGF0YS5kYXRhLmxlbmd0aCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGltYWdlRGF0YS5kYXRhW3BpeGVsT2Zmc2V0XSA9IHBpeGVsLnI7XG4gICAgaW1hZ2VEYXRhLmRhdGFbcGl4ZWxPZmZzZXQgKyAxXSA9IHBpeGVsLmc7XG4gICAgaW1hZ2VEYXRhLmRhdGFbcGl4ZWxPZmZzZXQgKyAyXSA9IHBpeGVsLmI7XG4gICAgaW1hZ2VEYXRhLmRhdGFbcGl4ZWxPZmZzZXQgKyAzXSA9IHBpeGVsLmE7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRJbWFnZURhdGFPZmZTY3JlZW4oaW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKTogSW1hZ2VEYXRhIHtcbiAgICBjb25zdCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgY29uc3QgY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEID0gY2FudmFzLmdldENvbnRleHQoJzJkJykgYXMgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuXG4gICAgY2FudmFzLndpZHRoID0gd2lkdGg7XG4gICAgY2FudmFzLmhlaWdodCA9IGhlaWdodDtcblxuICAgIGNvbnRleHQuZHJhd0ltYWdlKGltYWdlLCAwLCAwLCBpbWFnZS53aWR0aCwgaW1hZ2UuaGVpZ2h0LCAwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuXG4gICAgY29uc3QgaW1hZ2VEYXRhOiBJbWFnZURhdGEgPSBjb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgIHJldHVybiBpbWFnZURhdGE7XG59XG5cbmZ1bmN0aW9uIHByb2Nlc3NJbWFnZURhdGEoaW1hZ2VEYXRhOiBJbWFnZURhdGEsIHByb2Nlc3NGdW5jOiAocGl4ZWw6IFBpeGVsKSA9PiB2b2lkLCBpbml0UGl4ZWxYOiBudW1iZXIgPSAwLCBpbml0UGl4ZWxZOiBudW1iZXIgPSAwKTogdm9pZCB7XG4gICAgbGV0IHI6IG51bWJlcjtcbiAgICBsZXQgZzogbnVtYmVyO1xuICAgIGxldCBiOiBudW1iZXI7XG4gICAgbGV0IGE6IG51bWJlcjtcbiAgICBsZXQgb2Zmc2V0WDogbnVtYmVyO1xuICAgIGxldCBvZmZzZXRZOiBudW1iZXI7XG4gICAgbGV0IHBpeGVsOiBQaXhlbDtcblxuICAgIGZvciAobGV0IHggPSBpbml0UGl4ZWxYOyB4IDwgaW1hZ2VEYXRhLndpZHRoOyB4KyspIHtcbiAgICAgICAgb2Zmc2V0WCA9IHggKiBQSVhFTF9XSURUSDtcblxuICAgICAgICBmb3IgKGxldCB5ID0gaW5pdFBpeGVsWTsgeSA8IGltYWdlRGF0YS5oZWlnaHQ7IHkrKykge1xuICAgICAgICAgICAgb2Zmc2V0WSA9IGltYWdlRGF0YS53aWR0aCAqIHkgKiBQSVhFTF9XSURUSDtcblxuICAgICAgICAgICAgciA9IGltYWdlRGF0YS5kYXRhW29mZnNldFggKyBvZmZzZXRZXTtcbiAgICAgICAgICAgIGcgPSBpbWFnZURhdGEuZGF0YVtvZmZzZXRYICsgb2Zmc2V0WSArIDFdO1xuICAgICAgICAgICAgYiA9IGltYWdlRGF0YS5kYXRhW29mZnNldFggKyBvZmZzZXRZICsgMl07XG4gICAgICAgICAgICBhID0gaW1hZ2VEYXRhLmRhdGFbb2Zmc2V0WCArIG9mZnNldFkgKyAzXTtcblxuICAgICAgICAgICAgcGl4ZWwgPSBjcmVhdGVQaXhlbCh4LCB5LCByLCBnLCBiLCBhKTtcbiAgICAgICAgICAgIHByb2Nlc3NGdW5jKHBpeGVsKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvR2lmKGltYWdlRnJhbWVzOiBJbWFnZURhdGFbXSk6IHZvaWQge1xuICAgIGNvbnN0IGdpZiA9IG5ldyBHSUYoe1xuICAgICAgICB3b3JrZXJzOiAyLFxuICAgICAgICBxdWFsaXR5OiAxMFxuICAgIH0pO1xuXG4gICAgaW1hZ2VGcmFtZXNcbiAgICAgICAgLmZvckVhY2goaW1hZ2VGcmFtZSA9PiBnaWYuYWRkRnJhbWUoaW1hZ2VGcmFtZSwge1xuICAgICAgICAgICAgZGVsYXk6IDIwMCxcbiAgICAgICAgfSkpO1xuXG4gICAgZ2lmLm9uKCdmaW5pc2hlZCcsIChibG9iOiBhbnkpID0+IHtcbiAgICAgICAgc2F2ZUJsb2IoJ3NpbXBsZXF1YWQuZXhwb3J0LmdpZicsIGJsb2IpO1xuICAgIH0pO1xuXG4gICAgZ2lmLnJlbmRlcigpO1xufVxuXG5mdW5jdGlvbiBzYXZlQmxvYihmaWxlTmFtZTogc3RyaW5nLCBibG9iOiBCbG9iKSB7XG4gICAgY29uc3QgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBjb25zdCB1cmwgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcblxuICAgIGEuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBhLmhyZWYgPSB1cmw7XG4gICAgYS5kb3dubG9hZCA9IGZpbGVOYW1lO1xuICAgIFxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYSk7XG4gICAgYS5jbGljaygpO1xuXG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChhKTtcbiAgICB3aW5kb3cuVVJMLnJldm9rZU9iamVjdFVSTCh1cmwpO1xufSJdLCJzb3VyY2VSb290IjoiIn0=