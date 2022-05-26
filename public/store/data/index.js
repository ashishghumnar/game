/**
 * To Manage the App Data From Central Location and avoid updating from multiple places
 */

let score = 0;
let speed = 1;
let dots = [];

// To Allow other app components subscribe to listen to store update
const subscribers = {};

const updateScore = (points) => {
  score = score + points;

  if(subscribers['score']) {
    subscribers['score'](score); 
  }
};

const getScore = () => {
  return score;
};

const updateSpeed = (newSpeed) => {
  speed = newSpeed;
};

const getSpeed = () => {
  return speed;
};

const addDots = (dot) => {
  dots = [...dots, dot];
};

const getDots = () => {
  return dots;
};

const updateDotSpeed = () => {
  dots.forEach((dot) => {
    dot.setSpeed(speed);
  });
};

const subscribe = (propertyName, handler) => {
  subscribers[propertyName]= handler;
}

const removeDot = () => {};

function appData() {
  return {
    updateScore: updateScore,
    getScore: getScore,
    getSpeed: getSpeed,
    updateSpeed: updateSpeed,
    addDots: addDots,
    getDots: getDots,
    removeDot: removeDot,
    updateDotSpeed: updateDotSpeed,
    subscribe: subscribe,
  };
}

export default appData;
