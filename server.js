import { WebSocketServer } from "ws";
import express from "express";
import { Tail } from "tail";

const logFile = new Tail("/tmp/logstalgia");

express().use(express.static("Frontend")).listen(8080);

const ws = new WebSocketServer({ port: 8081 });

ws.on("connection", function connection(ws) {
  logFile.on("line", (line) => {
    ws.send(line);
  });
});
