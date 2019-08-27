let canvas = document.querySelector('canvas')
let c = canvas.getContext('2d')

let ww = canvas.width = 500
let wh = canvas.height = 600

let score = document.querySelector('.score-display')

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
  this.gravity = 3
  this.width = 38
  this.height = 26
  this.scoreCount = 0

  this.draw = function(){
      c.drawImage(imageNames[4], this.x, this.y)
  }

  this.update = function(){
    this.draw()

    if(controller.upKeyDown) {
      this.y -= 5
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
        && this.y + this.height > pipes[i].y + pipes[i].upperHeight + pipes[i].gap
        || 
        this.y + this.height + this.gravity > wh - 117){
        hit.play()
        location.reload()
      }

      // if you succeed 
      if(this.x == pipes[i].x + pipes[i].width){
          this.scoreCount ++
          score.textContent = this.scoreCount
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

let groundX = 0
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
  
  c.drawImage(imageNames[3], groundX, wh - imageNames[3].height)
  c.drawImage(imageNames[3], groundX+ 286, wh - imageNames[3].height)
  if(groundX < -10){
    groundX = 0
  }
  groundX --

  requestAnimationFrame(render)
}


window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener)


function randomInteger(min, max) {
 return Math.floor(Math.random() * (max - min + 1) + min);
}







