import {c, wh} from './canvasElements'

export function Bird(controller, pipes, img4, img5){
  let score = document.querySelector('.main-score-display')
  let fly = new Audio()
  let scored = new Audio()
  fly.src ="./src/assets/audio/fly.mp3"
  scored.src = "./src/assets/audio/score.mp3"
  scored.volume = 0.3
 

  this.x = 220
  this.y = 250
  this.velocity = {x: 0, y: 10}
  this.animation = {x: 0, y: 0.6}
  this.gravity = 3
  this.width = 38
  this.height = 26
  this.scoreCount = 0

  this.draw = function(){
    c.drawImage(img4, this.x, this.y)
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
        controller.gameStarted = true
      }          
    }

    
    this.update = function(){
      this.draw()
      
      // keyboard interaction
      if(controller.upKeyDown || controller.spaceKeyDown) {
        this.y -= 5
        fly.play()
        c.drawImage(img5, this.x, this.y)
      }

      if(controller.touched) {
        this.y -= 5
        fly.play()
        c.drawImage(img5, this.x, this.y)
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