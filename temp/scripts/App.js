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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/scripts/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/scripts/app.js":
/*!****************************!*\
  !*** ./src/scripts/app.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_images__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/images */ "./src/scripts/modules/images.js");
/* harmony import */ var _modules_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/controller */ "./src/scripts/modules/controller.js");
/* harmony import */ var _modules_canvasElements__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/canvasElements */ "./src/scripts/modules/canvasElements.js");
/* harmony import */ var _modules_Bird__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/Bird */ "./src/scripts/modules/Bird.js");
/* harmony import */ var _modules_Pipe__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/Pipe */ "./src/scripts/modules/Pipe.js");
/* harmony import */ var _modules_Ground__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/Ground */ "./src/scripts/modules/Ground.js");








let imageLoadedCount = 0
function startLoadingAllImages(startGame){
  for(let i = 0; i < _modules_images__WEBPACK_IMPORTED_MODULE_0__["imageUrls"].length; i++) {
    _modules_images__WEBPACK_IMPORTED_MODULE_0__["imageNames"][i] = new Image()

    _modules_images__WEBPACK_IMPORTED_MODULE_0__["imageNames"][i].onload = function(){ 
      imageLoadedCount++; 
      if (imageLoadedCount >= _modules_images__WEBPACK_IMPORTED_MODULE_0__["imageUrls"].length ) {
        startGame();
      }
    }

    _modules_images__WEBPACK_IMPORTED_MODULE_0__["imageNames"][i].onerror = function(){ alert("image load failed" ) } 
    _modules_images__WEBPACK_IMPORTED_MODULE_0__["imageNames"][i].src = _modules_images__WEBPACK_IMPORTED_MODULE_0__["imageUrls"][i];
  }      
}

startLoadingAllImages(startGame)




function startGame(){
  drawPipe()
  drawBird()
  drawGround()
  render()
}




let birds = []
let pipes = []
let grounds = []

let controller = new _modules_controller__WEBPACK_IMPORTED_MODULE_1__["Controller"]()
let bird = new _modules_Bird__WEBPACK_IMPORTED_MODULE_3__["Bird"](controller, pipes, _modules_images__WEBPACK_IMPORTED_MODULE_0__["imageNames"][4], _modules_images__WEBPACK_IMPORTED_MODULE_0__["imageNames"][5])
let pipe = new _modules_Pipe__WEBPACK_IMPORTED_MODULE_4__["Pipe"](pipes, _modules_images__WEBPACK_IMPORTED_MODULE_0__["imageNames"][1], _modules_images__WEBPACK_IMPORTED_MODULE_0__["imageNames"][2], _modules_canvasElements__WEBPACK_IMPORTED_MODULE_2__["ww"], 0)
let ground = new _modules_Ground__WEBPACK_IMPORTED_MODULE_5__["Ground"](_modules_images__WEBPACK_IMPORTED_MODULE_0__["imageNames"][3])




function drawBird(){
  for(let i = 0; i < 1; i++) {
    birds.push(bird)
  }
}

function drawPipe(){
  for(let i = 0; i < 1; i++){
    pipes.push(pipe)
  }
}

function drawGround(){
  for(let i = 0; i < 1; i++){
    grounds.push(ground)
  }
}




function render(){
  _modules_canvasElements__WEBPACK_IMPORTED_MODULE_2__["c"].fillStyle = "white"
  _modules_canvasElements__WEBPACK_IMPORTED_MODULE_2__["c"].fillRect(0, 0, _modules_canvasElements__WEBPACK_IMPORTED_MODULE_2__["ww"], _modules_canvasElements__WEBPACK_IMPORTED_MODULE_2__["wh"])
  

  // constantly draw background
  _modules_canvasElements__WEBPACK_IMPORTED_MODULE_2__["c"].drawImage(_modules_images__WEBPACK_IMPORTED_MODULE_0__["imageNames"][0], 0, 0)  
  _modules_canvasElements__WEBPACK_IMPORTED_MODULE_2__["c"].drawImage(_modules_images__WEBPACK_IMPORTED_MODULE_0__["imageNames"][0], 286, 0)  
  
 for(let i = 0; i < birds.length; i++){
   if(!controller.gameStarted){
     birds[i].startAnimation()
   } else {
     birds[i].update()
   }
 }
 
 for(let i = 0; i < pipes.length; i++){
   if(!controller.gameStarted){
     pipes[i].draw()
   } else {
     pipes[i].update()
   }
 }

 for(let i = 0; i < grounds.length; i++){
   grounds[i].update()
 }

 requestAnimationFrame(render)
}



window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener)


/***/ }),

/***/ "./src/scripts/modules/Bird.js":
/*!*************************************!*\
  !*** ./src/scripts/modules/Bird.js ***!
  \*************************************/
/*! exports provided: Bird */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Bird", function() { return Bird; });
/* harmony import */ var _canvasElements__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./canvasElements */ "./src/scripts/modules/canvasElements.js");


function Bird(controller, pipes, img4, img5){
  let score = document.querySelector('.main-score-display')
  let fly = new Audio()
  let scored = new Audio()
  fly.src ="./src/assets/audio/fly.mp3"
  scored.src = "./src/assets/audio/score.mp3"
  scored.volume = 0.3


  this.x = 220
  this.y = 250
  this.velocity = {x: 0, y: 10}
  this.animation = {x: 0, y: 0.6}
  this.gravity = 3
  this.width = 38
  this.height = 26
  this.scoreCount = 0

  this.draw = function(){
    _canvasElements__WEBPACK_IMPORTED_MODULE_0__["c"].drawImage(img4, this.x, this.y)
  }

  this.startAnimation = function(){
    this.draw()

    if(this.y + this.animation.y > 250 + 5 
      || this.y + this.animation.y < 250 - 5) {
      this.animation.y = -this.animation.y
    }
  
    this.y += this.animation.y

    if(controller.spaceKeyDown
      || controller.upKeyDown) {
        controller.gameStarted = true
      }          
    }
    
    
    this.update = function(){
      this.draw()
      
      // keyboard interaction
      if(controller.upKeyDown || controller.spaceKeyDown) {
        this.y -= 5
        fly.play()
        _canvasElements__WEBPACK_IMPORTED_MODULE_0__["c"].drawImage(img5, this.x, this.y)
      }
      
      if(controller.downKeyDown) { this.y += 3 }
      if(controller.leftKeyDown) { this.x -= 3 }
      if(controller.rightKeyDown) { this.x += 3 }
      
      this.y += this.gravity
     


    // collision detection
    for(let i = 0; i < pipes.length; i++) {
      if(this.x + this.width > pipes[i].x 
        && this.x < pipes[i].x + pipes[i].width
        && this.y < pipes[i].y + pipes[i].upperHeight
        || 
        this.x + this.width > pipes[i].x 
        && this.x < pipes[i].x + pipes[i].width 
        && this.y + this.height > pipes[i].y + pipes[i].upperHeight + pipes[i].gap
        || 
        this.y + this.height + this.gravity > _canvasElements__WEBPACK_IMPORTED_MODULE_0__["wh"] - 117){
        location.reload()
      }

      // if you succeed 
      if(this.x == pipes[i].x + pipes[i].width){
          this.scoreCount ++
          score.textContent = this.scoreCount
          scored.play()
      }
     }
    }
  }

/***/ }),

/***/ "./src/scripts/modules/Ground.js":
/*!***************************************!*\
  !*** ./src/scripts/modules/Ground.js ***!
  \***************************************/
/*! exports provided: Ground */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Ground", function() { return Ground; });
/* harmony import */ var _canvasElements__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./canvasElements */ "./src/scripts/modules/canvasElements.js");


function Ground(img3){
  this.x = 0

  this.draw = function(){
    _canvasElements__WEBPACK_IMPORTED_MODULE_0__["c"].drawImage(img3, this.x, _canvasElements__WEBPACK_IMPORTED_MODULE_0__["wh"] - img3.height)
    _canvasElements__WEBPACK_IMPORTED_MODULE_0__["c"].drawImage(img3, this.x + 286, _canvasElements__WEBPACK_IMPORTED_MODULE_0__["wh"] - img3.height)
  }

  this.update = function(){
    this.draw()
    
    if(this.x < -10){
      this.x = 0
    }

    this.x --
    }

}

/***/ }),

/***/ "./src/scripts/modules/Pipe.js":
/*!*************************************!*\
  !*** ./src/scripts/modules/Pipe.js ***!
  \*************************************/
/*! exports provided: Pipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Pipe", function() { return Pipe; });
/* harmony import */ var _canvasElements__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./canvasElements */ "./src/scripts/modules/canvasElements.js");


function Pipe(pipes, img1, img2, x, y){
  this.x = x
  this.y = y
  this.velocity = 2
  this.gap = 75
  this.width = 52
  this.upperHeight = 242
  this.lowerHeight = 378
  this.lowerPipeYPos = this.upperHeight + this.gap
  
  this.draw = function(){
    for(let i = 0; i < pipes.length; i++) {
      _canvasElements__WEBPACK_IMPORTED_MODULE_0__["c"].drawImage(img1, this.x, this.y)
      _canvasElements__WEBPACK_IMPORTED_MODULE_0__["c"].drawImage(img2, this.x, this.y + this.lowerPipeYPos)
    }
  }

  this.update = function(){
    this.draw()

    this.x -= this.velocity

    if(this.x - this.velocity == 160) {
      let x = _canvasElements__WEBPACK_IMPORTED_MODULE_0__["ww"]
      let y = randomInteger(-this.upperHeight + 34, 0)
      pipes.push(new Pipe(pipes, img1, img2, x, y))
    }

    for(let i = 0; i < pipes.length; i++) {
      if(pipes[i].x < 0) {
        pipes.shift()
      }
    }
  }

  function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
   }
}

/***/ }),

/***/ "./src/scripts/modules/canvasElements.js":
/*!***********************************************!*\
  !*** ./src/scripts/modules/canvasElements.js ***!
  \***********************************************/
/*! exports provided: canvas, c, ww, wh */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "canvas", function() { return canvas; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return c; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ww", function() { return ww; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wh", function() { return wh; });
let canvas = document.querySelector('canvas')
let c = canvas.getContext('2d')
let ww = canvas.width = 500
let wh = canvas.height = 600


/***/ }),

/***/ "./src/scripts/modules/controller.js":
/*!*******************************************!*\
  !*** ./src/scripts/modules/controller.js ***!
  \*******************************************/
/*! exports provided: Controller */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Controller", function() { return Controller; });
function Controller(){
  this.gameStarted = false
  this.spaceKeyDown = false
  this.upKeyDown = false
  this.leftKeyDown = false
  this.rightKeyDown = false
  this.downKeyDown = false

  this.keyListener = (e) => {
    let keyState = (e.type == "keydown") ? true : false

    switch(e.code) {
      case "ArrowUp": this.upKeyDown = keyState; break;
      case "Space": this.spaceKeyDown = keyState; break;
      case "ArrowLeft": this.leftKeyDown = keyState; break;
      case "ArrowRight":  this.rightKeyDown = keyState; break;
      case "ArrowDown": this.downKeyDown = keyState; break;
    }
  }
}


/***/ }),

/***/ "./src/scripts/modules/images.js":
/*!***************************************!*\
  !*** ./src/scripts/modules/images.js ***!
  \***************************************/
/*! exports provided: imageNames, imageUrls */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "imageNames", function() { return imageNames; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "imageUrls", function() { return imageUrls; });
let imageNames = ["bg", "pipeUpper", "pipeLower", "ground", "bird-1", "bird-2"]
let imageUrls = [
  "./src/assets/image/bg.png",
  "./src/assets/image/pipeUpper.png",
  "./src/assets/image/pipeLower.png",
  "./src/assets/image/ground.png",
  "./src/assets/image/yellow-bird-1.png",
  "./src/assets/image/yellow-bird-2.png"
]

/***/ })

/******/ });