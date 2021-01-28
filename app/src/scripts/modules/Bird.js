import { canvas2dContext } from './canvasElements';

function Bird(controller, pipes, img4, img5) {
  let score = document.querySelector('.main-score-display');
  let fly = new Audio();
  let scored = new Audio();
  fly.src = './src/assets/audio/fly.mp3';
  scored.src = './src/assets/audio/score.mp3';
  scored.volume = 0.2;

  // Bird's initial position x,y
  this.x = 220;
  this.y = 250;
  this.velocity = { x: 0, y: 10 };
  this.animation = { x: 0, y: 0.6 };
  this.gravity = 3;
  this.width = 38;
  this.height = 26;
  this.scoreCount = 0;

  this.draw = function () {
    canvas2dContext.drawImage(img4, this.x, this.y);
  };

  // simulates bird floating in the air
  // before the game starts
  this.startAnimation = function () {
    this.draw();

    if (this.y + this.animation.y > 250 + 5 || this.y + this.animation.y < 250 - 5) {
      this.animation.y = -this.animation.y;
    }

    this.y += this.animation.y;

    if (controller.spaceKeyDown || controller.upKeyDown || controller.touchStart) {
      controller.gameStarted = true;
    }
  };

  this.update = function () {
    this.draw();

    // desktop keyboard and mobiel touch start interaction
    if (controller.upKeyDown || controller.spaceKeyDown || controller.touchStart) {
      this.y -= 5;
      fly.play();
      canvas2dContext.drawImage(img5, this.x, this.y);
    }

    // mobile touch end interaction
    if (controller.touchEnd) {
      this.gravity = 1;
      this.y += this.gravity;
    }

    if (controller.downKeyDown) {
      this.y += 3;
    }
    if (controller.leftKeyDown) {
      this.x -= 3;
    }
    if (controller.rightKeyDown) {
      this.x += 3;
    }

    this.y += this.gravity;

    // collision detection
    const startOfBird = this.x;
    const endOfBird = this.x + this.width;
    const bottomOfBird = this.y;

    for (let i = 0; i < pipes.length; i++) {
      const startOfPipe = pipes[i].x;
      const endOfPipe = pipes[i].x + pipes[i].width;
      const pipeHeight = pipes[i].y + pipes[i].upperHeight;
      const birdHeight = this.y + this.height;
      const insidePipe = endOfBird > startOfPipe && startOfBird < endOfPipe;
      const crashed = bottomOfBird < pipeHeight || birdHeight > pipeHeight + pipes[i].gap;

      if (insidePipe && crashed) {
        location.reload();
      }

      // if you succeed
      if (startOfBird === endOfPipe) {
        this.scoreCount++;
        score.textContent = this.scoreCount;
        scored.play();
      }
    }
  };
}

export default Bird;
