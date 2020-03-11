import {canvas2dContext, canvasWidth, canvasHeight} from './canvasElements'
import {imageNames} from './images'

  
export function render(controller, birds, pipes, grounds){
  canvas2dContext.fillStyle = "white"
  canvas2dContext.fillRect(0, 0, canvasWidth, canvasHeight)
   
  // draw background
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