import createDots from './createSingleDot.js';
import createSingleDot from './createSingleDot.js';
import appData from "./../store/data/index.js";

function createGameCanvas() {
  const canvas = document.getElementById("canvas");
  const parentSize = {
    width: canvas.offsetWidth,
    height: canvas.offsetHeight
  }

  let createDotTimer = null;
  console.log(canvas.getBoundingClientRect());
  console.log(canvas.innerHeight);


  const createDotLoop = () => {
    if (document.hidden) {
      // To Avoid Creting Dots when Tab is not active
      return;
    }
  
    clearTimeout(createDotTimer);
    createSingleDot(parentSize).appendDotTo(canvas);
  
    /**
     * Create New Dot After Every 1 Sec
     */
    createDotTimer = setTimeout(createDotLoop, 1000);
  };

  createDotLoop();
}

export default createGameCanvas;
