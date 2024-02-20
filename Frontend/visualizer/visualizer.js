import { Bouncer } from "./objects/Bouncer.js";
import { Circle } from "./objects/Circle.js";

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
  circles.push(new Circle(canvas, destroyHandler, bounceHandler));
}

function animate(frameTime) {
  canvas.clearRect(0, 0, canvas.width, canvas.height);
  circles.forEach((circle) => circle.update(bouncer.width));

  /** @type {Circle | undefined} */
  let closestBall;
  for (const circle of circles) {
    if (circle.bounced) continue;
    if (closestBall == undefined) closestBall = circle;
    if (circle.x > closestBall.x) closestBall = circle;
  }

  if (closestBall) bouncer.update(closestBall);
  else bouncer.idle();

  requestAnimationFrame(animate);
  updateMetrics(frameTime);
}

let previousFrameTime = 0;
function updateMetrics(frameTime) {
  const fps = (1000 / (frameTime - previousFrameTime)).toFixed(1);
  previousFrameTime = frameTime;

  postMessage({ fps: fps, balls: circles.length });
}

function destroyHandler(id) {
  circles = circles.filter((item) => item.id != id);
}

function bounceHandler(ball) {
  bouncer.fillStyle = ball.fillStyle;
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
