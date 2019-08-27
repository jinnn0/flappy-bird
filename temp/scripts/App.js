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
/*! no static exports found */
/***/ (function(module, exports) {

let canvas = document.querySelector('canvas')
let c = canvas.getContext('2d')

let ww = canvas.width = 500
let wh = canvas.height = 600


let jump = new Audio()
let hit = new Audio()
jump.src ="./src/assets/audio/jump.mp3"
hit.src = "./src/assets/audio/hit.mp3"


let imageNames = ["bg", "pipeUpper", "pipeLower", "ground", "bird"]
let imageUrls = [
  "./src/assets/image/bg.png",
  "./src/assets/image/pipeUpper.png",
  "./src/assets/image/pipeLower.png",
  "./src/assets/image/ground.png",
  "./src/assets/image/bird.png"
]


let imageLoadedCount = 0
function startLoadingAllImages(start){
  for(let i = 0; i < imageUrls.length; i++) {
    imageNames[i] = new Image();

    imageNames[i].onload = function(){ 
      imageLoadedCount++; 
      if (imageLoadedCount >= imageUrls.length ) {
        start();
      }
    }

    imageNames[i].onerror = function(){ alert("image load failed" )} 
    imageNames[i].src = imageUrls[i];
  }      
}

startLoadingAllImages(start)

function start(){
  drawBird()
  drawPipe()
  render()
}



let controller = {
  leftKeyDown: false,
  rightKeyDown: false,
  upKeyDown: false,
  downKeyDown: false,

  keyListener: function(e) {
    let keyState = (e.type == "keydown") ? true : false

    switch(e.key) {
      case "ArrowLeft":
        controller.leftKeyDown = keyState;
      break;

      case "ArrowRight": 
        controller.rightKeyDown = keyState;
      break;

      case "ArrowUp":
        controller.upKeyDown = keyState;
      break;

      case "ArrowDown":
        controller.downKeyDown = keyState;
      break;
    }
  }
}


function Bird(){
  this.x = 200
  this.y = 150
  this.velocity = {x: 0, y: 10}
  this.gravity = 1.8
  this.width = 38
  this.height = 26

  this.draw = function(){
      c.drawImage(imageNames[4], this.x, this.y)
  }

  this.update = function(){
    this.draw()

    if(controller.upKeyDown) {
      this.y -= 3
      jump.play()
    }

    if(controller.downKeyDown) { this.y += 3 }
    if(controller.leftKeyDown) { this.x -= 3 }
    if(controller.rightKeyDown) { this.x += 3 }
  
    this.y += this.gravity

    for(let i = 0; i < pipes.length; i++) {
      if(this.x + this.width > pipes[i].x 
        && this.x < pipes[i].x + pipes[i].width
        && this.y < pipes[i].y + pipes[i].upperHeight
        || 
        this.x + this.width > pipes[i].x 
        && this.x < pipes[i].x + pipes[i].width 
        && this.y + this.height > pipes[i].y + pipes[i].upperHeight + pipes[i].gap){
        hit.play()
        location.reload()
      }
    }
  }
}


function Pipe(x, y){
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
      c.drawImage(imageNames[1], this.x, this.y)
      c.drawImage(imageNames[2], this.x, this.y + this.lowerPipeYPos)
    }
  }

  this.update = function(){
    this.draw()

    if(this.x - this.velocity == 120) {
      let x = ww
      let y = randomInteger(-this.upperHeight + 34, 0)
      pipes.push(new Pipe(x, y))
    }

    this.x -= this.velocity
  }

}

let birds 
function drawBird(){
  birds = []
  for(let i = 0; i < 1; i++) {
    let bird = new Bird()
    birds.push(bird)
  }
}


let pipes
function drawPipe(){
  pipes = []
  for(let i = 0; i < 1; i++){
    let x = ww - 80
    let y = 0

    let pipe = new Pipe(x, y)
    pipes.push(pipe)
  }
}

let groundOneX = 0
let groundTwoX = 286
function render(){
   c.fillRect(0, 0, ww, wh)
   c.drawImage(imageNames[0], 0, 0)  
   c.drawImage(imageNames[0], 286, 0)  
  
  for(let i = 0; i < birds.length; i++){
    birds[i].update()
  }
  
  for(let i = 0; i < pipes.length; i++){
    pipes[i].update()
  }
  
  c.drawImage(imageNames[3], groundOneX, wh - imageNames[3].height)
  c.drawImage(imageNames[3], groundOneX+ 286, wh - imageNames[3].height)
  if(groundOneX < -10){
    groundOneX = 0
  }
  groundOneX --

  requestAnimationFrame(render)
}


window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener)


function randomInteger(min, max) {
 return Math.floor(Math.random() * (max - min + 1) + min);
}

/***/ })

/******/ });