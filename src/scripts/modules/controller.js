export function Controller(){
  this.gameStarted = false
  this.spaceKeyDown = false
  this.upKeyDown = false
  this.leftKeyDown = false
  this.rightKeyDown = false
  this.downKeyDown = false

  this.keyListener = (e) => {
    let keyState = (e.type == "keydown") ? true : false

    switch(e.code) {
      case "ArrowUp": this.upKeyDown = keyState; break;
      case "Space": this.spaceKeyDown = keyState; break;
      case "ArrowLeft": this.leftKeyDown = keyState; break;
      case "ArrowRight":  this.rightKeyDown = keyState; break;
      case "ArrowDown": this.downKeyDown = keyState; break;
    }
  }
}
