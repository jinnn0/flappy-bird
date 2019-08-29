import {c, ww} from './canvasElements'

export function Pipe(pipes, img1, img2, x, y){
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
      c.drawImage(img1, this.x, this.y)
      c.drawImage(img2, this.x, this.y + this.lowerPipeYPos)
    }
  }

  this.update = function(){
    this.draw()

    this.x -= this.velocity

    if(this.x - this.velocity == 160) {
      let x = ww
      let y = randomInteger(-this.upperHeight + 34, 0)
      pipes.push(new Pipe(pipes, img1, img2, x, y))
    }

    for(let i = 0; i < pipes.length; i++) {
      if(pipes[i].x + pipes[i].width < 0) {
        pipes.shift()
      }
    }
  }

  function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
   }
}