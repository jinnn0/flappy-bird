let canvas = document.querySelector('canvas')
let c = canvas.getContext('2d')

let ww = canvas.width = 500
let wh = canvas.height = 600

let score = document.querySelector('.main-score-display')


let fly = new Audio()
let scored = new Audio()
fly.src ="./src/assets/audio/fly.mp3"
scored.src = "./src/assets/audio/score.mp3"
scored.volume = 0.3


let imageNames = ["bg", "pipeUpper", "pipeLower", "ground", "bird-1", "bird-2"]
let imageUrls = [
  "./src/assets/image/bg.png",
  "./src/assets/image/pipeUpper.png",
  "./src/assets/image/pipeLower.png",
  "./src/assets/image/ground.png",
  "./src/assets/image/yellow-bird-1.png",
  "./src/assets/image/yellow-bird-2.png"
]


let imageLoadedCount = 0
function startLoadingAllImages(startGame){
  for(let i = 0; i < imageUrls.length; i++) {
    imageNames[i] = new Image();

    imageNames[i].onload = function(){ 
      imageLoadedCount++; 
      if (imageLoadedCount >= imageUrls.length ) {
        startGame();
      }
    }

    imageNames[i].onerror = function(){ alert("image load failed" )} 
    imageNames[i].src = imageUrls[i];
  }      
}

startLoadingAllImages(startGame)

function startGame(){
  drawBird()
  drawGround()
  drawPipe()
  render()
}


let gameStarted = false
let controller = {
  spaceKeyDown: false,
  upKeyDown: false,
  leftKeyDown: false,
  rightKeyDown: false,
  downKeyDown: false,

  keyListener: function(e) {
    let keyState = (e.type == "keydown") ? true : false

    switch(e.code) {
      case "ArrowUp":
        controller.upKeyDown = keyState;
      break;

      case "Space":
        controller.spaceKeyDown = keyState;
      break;

      case "ArrowLeft":
        controller.leftKeyDown = keyState;
      break;

      case "ArrowRight": 
        controller.rightKeyDown = keyState;
      break;

      case "ArrowDown":
        controller.downKeyDown = keyState;
      break;
    }
  }
}

function Bird(){
  this.x = 220
  this.y = 250
  this.velocity = {x: 0, y: 10}
  this.animation = {x: 0, y: 0.6}
  this.gravity = 3
  this.width = 38
  this.height = 26
  this.scoreCount = 0

  this.draw = function(){
      c.drawImage(imageNames[4], this.x, this.y)
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
        gameStarted = true
      }    
    }


  this.update = function(){
    this.draw()

    // keyboard interaction
    if(controller.upKeyDown || controller.spaceKeyDown) {
      this.y -= 5
      fly.play()
      c.drawImage(imageNames[5], this.x, this.y)
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
        this.y + this.height + this.gravity > wh - 117){
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

    if(this.x - this.velocity == 160) {
      let x = ww
      let y = randomInteger(-this.upperHeight + 34, 0)
      pipes.push(new Pipe(x, y))
    }

    this.x -= this.velocity
  }
}

function Ground(){
  this.x = 0

  this.draw = function(){
    c.drawImage(imageNames[3], this.x, wh - imageNames[3].height)
    c.drawImage(imageNames[3], this.x + 286, wh - imageNames[3].height)
  }

  this.update = function(){
    this.draw()
    
    if(this.x < -10){
      this.x = 0
    }

    this.x --
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
    let x = ww 
    let y = 0

    let pipe = new Pipe(x, y)
    pipes.push(pipe)
  }
}

let grounds
function drawGround(){
  grounds = []

  for(let i = 0; i < 1; i++){
    let ground = new Ground()
    grounds.push(ground)
  }
}

function render(){
   c.fillStyle = "white"
   c.fillRect(0, 0, ww, wh)

   // draw background
   c.drawImage(imageNames[0], 0, 0)  
   c.drawImage(imageNames[0], 286, 0)  
  
  for(let i = 0; i < birds.length; i++){
    if(!gameStarted){
      birds[i].startAnimation()
    } else {
      birds[i].update()
    }
  }
  
  for(let i = 0; i < pipes.length; i++){
    if(!gameStarted){
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


function randomInteger(min, max) {
 return Math.floor(Math.random() * (max - min + 1) + min);
}