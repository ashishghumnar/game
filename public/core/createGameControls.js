import { Slider, Score } from "../components/index.js";

import appData from "./../store/data/index.js";

/*
 * Create Speed Controller and Display Scores
 */
function createGameControls() {
  const { updateSpeed, subscribe, updateDotSpeed } = appData();
  const controls = document.getElementById("controls");
  const DEFAULT_SPEED = 5;

  //Set Default Speed
  updateSpeed(DEFAULT_SPEED);

  const handleSliderChange = function (event) {
    updateSpeed(event.target.value);
    updateDotSpeed();
  };

  const $slider = new Slider({
    className: "speedSlider",
    value: DEFAULT_SPEED,
    onChange: handleSliderChange,
  });

  const $scoreEl = new Score({
    className: "score",
  });

  /**
   * subscribe to app store score to get the update of value
   */
  subscribe("score", (value) => {
    $scoreEl.updateScore(value);
  });

  controls.append($slider.createElement(), $scoreEl.createElement());
}

export default createGameControls;
