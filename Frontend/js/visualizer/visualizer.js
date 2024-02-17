import { Circle } from "./draw.js";

/** @type {CanvasRenderingContext2D} */
let canvas;
/**
 @param {HTMLCanvasElement} element
 */
export function init(element, height, width) {
  //TODO https://stackoverflow.com/a/73831830/16867144
  element.height = height ?? window.innerHeight;
  element.width = width ?? window.innerWidth;
  canvas = element.getContext("2d");
  canvas.height = element.height;
  canvas.width = element.width;
  animate();
}

/** @type {Array<Circle>} */
let circles = [];

/**
 * @param {string} log
 */
export function visualize(log) {
  if (canvas == undefined) throw Error("Canvas not initialized");
  circles.push(new Circle(canvas));
}

function animate() {
  requestAnimationFrame(animate);
  canvas.clearRect(0, 0, canvas.width, canvas.height);
  circles.forEach((circle) => circle.update());
}

addEventListener("message", (event) => {
  /** Init using Workers */
  if (event.data.canvas) {
    init(event.data.canvas, event.data.height, event.data.width);
  }

  /** Visualize using Workers */
  if (event.data.visualize) {
    visualize(event.data.visualize);
  }
});
