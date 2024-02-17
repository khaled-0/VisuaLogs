import * as Visualizer from "./visualizer/visualizer.js";

let worker;
const logViewCanvas = document.getElementById("logViewCanvas");
if ("transferControlToOffscreen" in logViewCanvas) {
  const offscreenCanvas = logViewCanvas.transferControlToOffscreen();
  worker = new Worker("js/visualizer/visualizer.js", {
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
} else {
  Visualizer.init(logViewCanvas);
  console.error("webgl in worker unsupported");
}

const ws = new WebSocket("ws://localhost:8080");
ws.onmessage = (event) => {
  const log = event.data;

  if (worker) worker.postMessage({ visualize: log });
  else Visualizer.visualize(log);
};
