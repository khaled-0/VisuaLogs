import { WebSocketServer } from "ws";
import express from "express";
import { Tail } from "tail";

const logFile = new Tail("/tmp/logstalgia");

const server = express().use(express.static("Frontend")).listen(8080);
const ws = new WebSocketServer({ server });

ws.on("connection", function connection(ws) {
  logFile.on("line", (line) => {
    ws.send(line);
  });
});
