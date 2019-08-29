import {c, ww, wh} from './canvasElements'
import {imageNames} from './images'


export function render(controller, birds, pipes, grounds){
  c.fillStyle = "white"
  c.fillRect(0, 0, ww, wh)
  
  // draw background
  c.drawImage(imageNames[0], 0, 0)  
  c.drawImage(imageNames[0], 286, 0)  
  
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