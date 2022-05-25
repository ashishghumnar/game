
 import { Slider, Score } from "./../Components/index.js";

 import appData from "./../store/data/index.js";

 /*
   * Create
   * Speed Controller
   * Display Scores
   */
  function createGameControls() {
    const { updateSpeed, subscribe, updateDotSpeed } = appData();
    const controls = document.getElementById("controls");
      
    const handleSliderChange = function (event) {
      updateSpeed(event.target.value);
      updateDotSpeed();
    };
  
    const $slider = new Slider({
      className: "speedSlider",
      min: 1,
      max: 10,
      value: 1,
      onChange: handleSliderChange,
    });
  
    const $scoreEl = new Score({
      className: "score",
    });

    /**
     * subscribe to app store to get the update of value
     */
     subscribe('score', (value) => {
      $scoreEl.updateScore(value);
    });

    const timer = document.createElement('div');
    timer.setAttribute('id', "timer");
  
    controls.append($slider.createElement(), timer , $scoreEl.createElement());
  }

  export default createGameControls;