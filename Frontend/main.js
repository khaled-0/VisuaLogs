const logViewCanvas = document.getElementById("logViewCanvas");
if (!("transferControlToOffscreen" in logViewCanvas))
  throw Error("WebGL in worker unsupported");

const offscreenCanvas = logViewCanvas.transferControlToOffscreen();
const worker = new Worker("visualizer/visualizer.js", {
  type: "module",
});
worker.postMessage(
  {
    canvas: offscreenCanvas,
    height: window.innerHeight,
    width: window.innerWidth,
  },
  [offscreenCanvas]
);

const ws = new WebSocket("ws://localhost:8080");
ws.onmessage = (event) => {
  const log = event.data;
  worker.postMessage({ visualize: log });
};

/** FPS Listener */
//TODO Throttle this
worker.addEventListener("message", (event) => {
  document.getElementById("fps").innerHTML = `FPS: ${event.data.fps}`;
  document.getElementById("balls").innerHTML = `Balls: ${event.data.balls}`;
});
