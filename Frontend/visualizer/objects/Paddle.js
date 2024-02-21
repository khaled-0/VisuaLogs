import * as Utils from "../utils.js";

export class Paddle {
  /**
   * @param {CanvasRenderingContext2D} canvas
   */
  constructor(canvas) {
    this.canvas = canvas;

    this.height = canvas.height / 10;
    this.width = canvas.width / 100;

    this.x = canvas.width - this.width;
    this.y = Math.random() * canvas.height - this.height / 2;

    this.fillStyle = Utils.getRandomColor();
    this.animationY = Utils.getRandomVelocity(this.y < canvas.height / 2);

    this.draw();
  }

  /** @param {Circle} closestBall */
  update(closestBall) {
    let yPos;
    if (closestBall.y + this.height / 2 > this.canvas.height) {
      yPos = this.canvas.height - this.height;
    } else if (closestBall.y - this.height / 2 < 0) {
      yPos = 0;
    } else {
      yPos = closestBall.y - this.height / 2;
    }

    const downwardsJump = yPos - this.height / 2 > this.y;
    const upwardsJump = yPos < this.y - this.height / 2;

    if (upwardsJump || downwardsJump) this.jumpTo(yPos, closestBall);
    else this.y = yPos;

    this.draw();
  }

  /**
   * @param {yPos} number
   * //TODO Fix teleportation
   */
  jumpTo(yPos, closestBall) {
    // let interpolatedYPos = yPos / (this.canvas.width - closestBall.x);
    // if (yPos < this.y) interpolatedYPos = -interpolatedYPos;

    //  this.y += interpolatedYPos;

    this.y = yPos;
  }

  idle() {
    if (this.y + this.height > this.canvas.height) {
      this.animationY = -this.animationY;
    }

    if (this.y < 0) {
      this.animationY = Math.abs(this.animationY);
    }

    this.y += this.animationY;
    this.draw();
  }

  draw() {
    this.canvas.beginPath();
    this.canvas.fillStyle = this.fillStyle;
    this.canvas.fillRect(this.x, this.y, this.width, this.height);
  }
}
