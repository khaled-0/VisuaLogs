import { Bouncer } from "./Bouncer.js";
import { Circle } from "./Circle.js";

/** @type {CanvasRenderingContext2D} */
let canvas;
/** @type {Array<Circle>} */
let circles = [];
/** @type {Bouncer} */
let bouncer;

/**
 @param {HTMLCanvasElement} element
 */
function init(element, height, width) {
  //TODO https://stackoverflow.com/a/73831830/16867144
  element.height = height;
  element.width = width;
  canvas = element.getContext("2d");
  canvas.height = element.height;
  canvas.width = element.width;

  bouncer = new Bouncer(canvas);

  animate();
}

/**
 * @param {string} log
 */
export function visualize(log) {
  if (canvas == undefined) throw Error("Canvas not initialized");

  circles.push(
    new Circle(canvas, (id) => {
      circles = circles.filter((item) => item.id != id);
    })
  );
}

function animate(frameTime) {
  canvas.clearRect(0, 0, canvas.width, canvas.height);

  circles.forEach((circle) => circle.update());

  requestAnimationFrame(animate);
  updateMetrics(frameTime);
}

let previousFrameTime = 0;
function updateMetrics(frameTime) {
  const fps = (1000 / (frameTime - previousFrameTime)).toFixed(1);
  previousFrameTime = frameTime;

  postMessage({ fps: fps, balls: circles.length });
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
