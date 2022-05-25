import createDots from './createDots.js';
import appData from "./../store/data/index.js";

function createGameCanvas() {
  const canvas = document.getElementById("canvas");
  
  createDots();
}

export default createGameCanvas;
