import { Dot } from "./../Components/index.js";
import appData from "./../store/data/index.js";

let createDotTimer = null;

function createSingleDot() {
  const { getSpeed, addDots, updateScore, removeDot } = appData();

  let deleteDotTimer = null;

  const onDelete = (dotId, earnPoints) => {
    if (deleteDotTimer) {
      clearTimeout(deleteDotTimer);
    }

    updateScore(earnPoints);
    removeDot(dotId);
    
    deleteDotTimer = setTimeout(createSingleDot, 1000);
  };

  const dot = new Dot({
    speed: getSpeed(),
    onDelete: onDelete,
  });

  addDots(dot);
  dot.appendDotTo(canvas);
}

function createDots() {
  if (document.hidden) {
    // To Avoid Creting Dots when Tab is not active
    return;
  }

  clearTimeout(createDotTimer);
  createSingleDot();

  /**
   * Create New Dot After Every 1 Sec
   */
  createDotTimer = setTimeout(createDots, 1000);
}

export default createDots;
