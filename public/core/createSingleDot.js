import { Dot } from "../components/index.js";
import appData from "../store/data/index.js";

function createSingleDot(parentSize) {
  const { getSpeed, addDots, updateScore, removeDot } = appData();

  let deleteDotTimer = null;

  const onDelete = (dotId, earnPoints) => {
    if (deleteDotTimer) {
      clearTimeout(deleteDotTimer);
    }

    updateScore(earnPoints);
    removeDot(dotId);
    
    //Create New Dot After 1Sec of of deleting current one
    deleteDotTimer = setTimeout(() => {
      createSingleDot(parentSize);
    }, 1000);
  };

  const dot = new Dot({
    speed: getSpeed(),
    onDelete: onDelete,
    parentSize: parentSize
  });

  addDots(dot);

  return dot;
}


export default createSingleDot;
