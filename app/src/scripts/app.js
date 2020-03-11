import "../styles/style.scss"
  
import {imageNames, imageUrls} from './modules/images'
import {Controller} from './modules/controller'
import {canvas, canvas2dContext, canvasWidth, canvasHeight} from './modules/canvasElements'
import {Bird} from './modules/Bird'
import {Pipe} from './modules/Pipe'
import {Ground} from './modules/Ground' 
      

let imageLoadedCount = 0 
function startLoadingAllImages(startGame){
  for(let i = 0; i < imageUrls.length; i++) {
    imageNames[i] = new Image()

    imageNames[i].onload = function(){ 
      imageLoadedCount++; 
      if (imageLoadedCount >= imageUrls.length ) {
        startGame();
      }
    }

    imageNames[i].onerror = function(){ alert("image load failed" ) } 
    imageNames[i].src = imageUrls[i];
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

let controller = new Controller()
let bird = new Bird(controller, pipes, imageNames[4], imageNames[5])
let pipe = new Pipe(pipes, imageNames[1], imageNames[2], canvasWidth, 0)
let ground = new Ground(imageNames[3])

 

 
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
  canvas2dContext.fillStyle = "canvasHeightite"
  canvas2dContext.fillRect(0, 0, canvasWidth, canvasHeight)
  

  // constantly draw background
  canvas2dContext.drawImage(imageNames[0], 0, 0)  
  canvas2dContext.drawImage(imageNames[0], 286, 0)  
  
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
canvas.addEventListener("touchstart", controller.touchListener)
canvas.addEventListener("touchend", controller.touchListener)
