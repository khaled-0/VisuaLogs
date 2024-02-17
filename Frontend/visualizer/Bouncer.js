export class Bouncer {
  /**
   * @param {CanvasRenderingContext2D} canvas
   */
  constructor(canvas) {
    this.canvas = canvas;

    this.x = canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 10;
    this.fillStyle = this.#getRandomColor();

    this.animationX = this.#getRandomVelocity(true);
    this.animationY = this.#getRandomVelocity();

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

    if (this.x + this.radius < 0) {
      this.onDestroy(this.id);
    }

    this.x += this.animationX;
    this.y += this.animationY;
  }

  draw() {
    this.canvas.beginPath();
    this.canvas.fillStyle = this.fillStyle;
    this.canvas.fillRect(this.x, this.y, 10, 70);
  }

  #getRandomColor() {
    return "#000000".replace(/0/g, function () {
      return (~~(Math.random() * 16)).toString(16);
    });
  }

  #getRandomVelocity(positive = false) {
    const array = positive ? [2, 3, 4] : [, -4, -3, -2, 2, 3, 4];
    return array[Math.floor(Math.random() * array.length)];
  }
}
