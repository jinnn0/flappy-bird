import {canvas2dContext, canvasHeight} from './canvasElements'

export function Ground(img3){
  this.x = 0

  this.draw = function(){ 
    canvas2dContext.drawImage(img3, this.x, canvasHeight - img3.height)
    canvas2dContext.drawImage(img3, this.x + 286, canvasHeight - img3.height)
  } 
    
  this.update = function(){
    this.draw()
    
    if(this.x < -10){
      this.x = 0
    }

    this.x --
    }

}