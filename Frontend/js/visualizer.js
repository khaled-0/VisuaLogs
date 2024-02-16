/** @type {CanvasRenderingContext2D} */
let canvas;
/**
 * @param {HTMLCanvasElement} element
 */
export function init(element) {
  //TODO https://stackoverflow.com/a/73831830/16867144
  element.height = window.innerHeight;
  element.width = window.innerWidth;
  canvas = element.getContext("2d");
}
/**
 * @param {string} log
 */
export function visualize(log) {}
