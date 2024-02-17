import * as Utils from "./utils.js";
export class Circle {
  /**
   * @param {CanvasRenderingContext2D} canvas
   * @param {onDestroy} //TODO type
   */
  constructor(canvas, onDestroy) {
    this.canvas = canvas;
    this.onDestroy = onDestroy;
    this.id = crypto.randomUUID();
    this.x = 0;
    this.y = Math.random() * canvas.width;
    this.radius = Math.random() * 10 || 6;
    this.fillStyle = Utils.getRandomColor();

    this.animationX = Utils.getRandomVelocity(true);
    this.animationY = Utils.getRandomVelocity();

    this.draw();
  }

  update() {
    if (this.x + this.radius > this.canvas.width) {
      this.animationX = -this.animationX;
    }

    if (this.y + this.radius > this.canvas.height) {
      this.animationY = -this.animationY;
    }

    if (this.y < this.radius) {
      this.animationY = Math.abs(this.animationY);
    }

    if (this.x + this.radius * 2 < 0) {
      this.onDestroy(this.id);
    }

    this.x += this.animationX;
    this.y += this.animationY;

    this.draw();
  }

  draw() {
    this.canvas.beginPath();
    this.canvas.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.canvas.fillStyle = this.fillStyle;
    this.canvas.fill();
  }
}
