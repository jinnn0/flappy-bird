let canvas = document.querySelector('canvas')
let c = canvas.getContext('2d')

let ww = canvas.width = 288
let wh = canvas.height = 600

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


let jump = new Audio()
let hit = new Audio()
jump.src ="./src/assets/audio/jump.mp3"
hit.src = "./src/assets/audio/hit.mp3"


let bg = new Image()
let pipeUpper = new Image()
let pipeLower = new Image()
let ground = new Image()
let flappyBird = new Image()

bg.src = "./src/assets/image/BG.png"
pipeUpper.src = "./src/assets/image/pipeUpper.png"
pipeLower.src = "./src/assets/image/pipeLower.png"
ground.src = "./src/assets/image/ground.png"
flappyBird.src = "./src/assets/image/bird.png"


function Bird(){
  this.x = 10
  this.y = 150
  this.velocity = {x: 0, y: 10}
  this.gravity = 1.5
  this.width = 38
  this.height = 26

  this.draw = function(){
    c.drawImage(flappyBird, this.x, this.y)
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
        // location.reload()
      }
    }
  }
}


function Pipe(x, y){
  this.x = x
  this.y = y
  this.gap = 75
  this.width = 52
  this.upperHeight = 242
  this.lowerHeight = 378
  this.lowerPipeYPos = this.upperHeight + this.gap

  this.draw = function(){
    for(let i = 0; i < pipes.length; i++) {
      c.drawImage(pipeUpper, this.x, this.y)
      c.drawImage(pipeLower, this.x, this.y + this.lowerPipeYPos)
    }
  }

  this.update = function(){
    this.draw()

    if(this.x === 120) {
      let x = ww
      let y = randomInteger(-this.upperHeight + 34, 0)
      pipes.push(new Pipe(x, y))
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
    let x = ww - 80
    let y = 0

    let pipe = new Pipe(x, y)
    pipes.push(pipe)
  }
}


function render(){
   c.fillRect(0, 0, ww, wh)
   c.drawImage(bg, 0, 0)  
  
  for(let i = 0; i < birds.length; i++){
    birds[i].update()
  }
  
  for(let i = 0; i < pipes.length; i++){
    pipes[i].update()
  }
  
  c.drawImage(ground, 0, wh - ground.height)

  requestAnimationFrame(render)
}

drawBird()
drawPipe()
render()



window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener)
// window.addEventListener("resize", resize)


function resize(){
 ww = canvas.width = window.innerWidth - 100
 wh = canvas.height = window.innerHeight - 100
 screenRatio = wh /ww
 init()
}

function randomInteger(min, max) {
 return Math.floor(Math.random() * (max - min + 1) + min);
}