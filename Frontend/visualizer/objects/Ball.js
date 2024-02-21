import * as Utils from "../utils.js";
export class Ball {
  /**
   * @param {CanvasRenderingContext2D} canvas
   * @param {function(string): void} onDestroy
   * @param {function(Ball): void} onBounce
   */
  constructor(canvas, onDestroy, onBounce) {
    this.canvas = canvas;
    this.onDestroy = onDestroy;
    this.onBounce = onBounce;
    this.id = crypto.randomUUID();
    this.bounced = false;
    this.radius = Utils.getRandomInt() + 3;
    this.x = 0 - this.radius;
    this.y = Math.random() * canvas.height - this.radius;
    this.fillStyle = Utils.getRandomColor();

    this.animationX = Utils.getRandomVelocity(true);
    this.animationY = Utils.getRandomVelocity(this.y < canvas.height / 2);

    this.draw();
  }

  update(bouncerWidth = 0) {
    if (this.x + this.radius + bouncerWidth > this.canvas.width) {
      this.animationX = -this.animationX;
      this.bounced = true;
      this.onBounce(this);
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
    this.canvas.strokeStyle = this.fillStyle;
    this.bounced ? this.canvas.fill() : this.canvas.stroke();
  }
}
