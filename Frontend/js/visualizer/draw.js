export class Circle {
  /**@param {CanvasRenderingContext2D} canvas  */
  constructor(canvas) {
    this.canvas = canvas;
    this.x = 0;
    this.y = Math.random() * canvas.width;
    this.radius = Math.random() * 10;
    this.fillStyle = this.#getRandomColor();

    this.speed = 5;

    this.animationX = this.#getRandomVelocity();
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

    if (this.x < this.radius) {
      this.animationX = Math.abs(this.animationX);
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

  #getRandomColor() {
    return "#000000".replace(/0/g, function () {
      return (~~(Math.random() * 16)).toString(16);
    });
  }

  #getRandomVelocity() {
    const array = [-4, -3, -2, 2, 3, 4];
    return array[Math.floor(Math.random() * array.length)];
  }
}
