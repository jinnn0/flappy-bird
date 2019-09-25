import {c, wh} from './canvasElements'

export function Ground(img3){
  this.x = 0

  this.draw = function(){
    c.drawImage(img3, this.x, wh - img3.height)
    c.drawImage(img3, this.x + 286, wh - img3.height)
  } 

  this.update = function(){
    this.draw()
    
    if(this.x < -10){
      this.x = 0
    }

    this.x --
    }

}