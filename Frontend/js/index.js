import * as Visualizer from "./visualizer.js";

const logView = document.getElementById("logView");
Visualizer.init(logView);

const ws = new WebSocket("ws://localhost:8081");
ws.onmessage = (event) => {
  Visualizer.visualize(event.data);
};
