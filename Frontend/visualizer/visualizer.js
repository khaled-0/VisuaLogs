import { Paddle } from "./objects/Paddle.js";
import { Ball } from "./objects/Ball.js";

/** @type {CanvasRenderingContext2D} */
let canvas;
/** @type {Array<Ball>} */
let balls = [];
/** @type {Paddle} */
let paddle;

/**
 @param {HTMLCanvasElement} element
 */
function init(element, height, width) {
  //TODO https://stackoverflow.com/a/73831830/16867144 Canvas resize
  element.height = height;
  element.width = width;
  canvas = element.getContext("2d");
  canvas.height = element.height;
  canvas.width = element.width;

  paddle = new Paddle(canvas);

  animate();
}

/**
 * @param {string} log
 */
export function visualize(log) {
  if (canvas == undefined) throw Error("Canvas not initialized");
  balls.push(new Ball(canvas, ballDestroyHandler, ballBounceHandler));
}

function animate(frameTime) {
  canvas.clearRect(0, 0, canvas.width, canvas.height);
  balls.forEach((circle) => circle.update(paddle.width));

  /** @type {Ball | undefined} */
  let closestBall;
  for (const circle of balls) {
    if (circle.bounced) continue;
    if (closestBall == undefined) closestBall = circle;

    if (circle.x > closestBall.x && circle.animationX > closestBall.animationX)
      closestBall = circle;
  }

  if (closestBall) paddle.update(closestBall);
  else paddle.idle();

  requestAnimationFrame(animate);
  updateMetrics(frameTime);
}

let previousFrameTime = 0;
function updateMetrics(frameTime) {
  const fps = (1000 / (frameTime - previousFrameTime)).toFixed(1);
  previousFrameTime = frameTime;

  postMessage({ fps: fps, balls: balls.length });
}

function ballDestroyHandler(id) {
  balls = balls.filter((item) => item.id != id);
}

function ballBounceHandler(ball) {
  paddle.fillStyle = ball.fillStyle;
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
