import { createGameCanvas, createGameControls } from './core/index.js';

(function DotGame() {
  /**Timer To Be Removed */
  const displayTimer = () => {
    const time = new Date();
    const timer = document.getElementById('timer');
    timer.innerText = `${time.getHours()} ${time.getMinutes()} ${time.getSeconds()}` ;

    setTimeout(displayTimer, 10);
  }

  setTimeout(displayTimer, 10);
  

  createGameControls();
  createGameCanvas();
})()


