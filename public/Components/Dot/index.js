import {
  getRandomNumber,
  getRandomColor,
  getScore,
  getPixelValue,
} from "./../../utils/index.js";

export default class Dot {
  constructor(init) {
    this.$el = document.createElement("div");

    this.$id = Date.now(); //assign some unique id

    this.speed = init?.speed || 1; //(Varies from 1x to 10x)
    this.points = 0;

    // Callback to to know parent element is deleted
    this.onDelete = init?.onDelete;

    this.animationStartTime = null;
    this.animationFrameId = null;

    //Define The Size of dot
    this.setSize();

    // Size of parent window
    this.width = init.parentSize.width;

    // Top of dot, insteaf getting it from DOM (offsetTop), we will maintain it as property
    this.top = -(this.size.height - this.size.height / 2);

    // Calculate Lowest bottom point to destroy element
    this.bottom = init.parentSize.height + this.size.height + this.top; //Remove The Extra Top from The Height (-)

    /**
     * Initialise Dot With Some Style,
     * Should be set after initialising this.width
     */
    this.setStyleToDot();

    /**
     * Bind The Click Event
     * mousedown, touchstart: to capture event as soon as possible
     */
    this.handler = this.handleClick.bind(this);
    this.$el.addEventListener("mousedown", this.handler, false);
    this.$el.addEventListener("touchstart", this.handler, false);
  }

  setSpeed(speed) {
    this.speed = Number(speed);
  }

  setSize() {
    const randomSize = Math.round(getRandomNumber(10, 100) / 10) * 10; //trying to keep to 10 different sizes

    this.size = {
      width: randomSize,
      height: randomSize,
      radius: randomSize,
    };
  }

  setStyleToDot() {
    this.$el.classList.add("dot");

    this.$el.style.width = getPixelValue(this.size.width);
    this.$el.style.height = getPixelValue(this.size.height);
    this.$el.style.borderRadius = getPixelValue(this.size.radius);
    this.$el.style.backgroundColor = getRandomColor();
    this.$el.style.top = getPixelValue(this.top);

    this.$el.style.left = getPixelValue(
      getRandomNumber(this.size.width, this.width - this.size.width)
    );
  }

  appendDotTo(parent) {
    parent.appendChild(this.$el);

    this.animationFrameId = requestAnimationFrame(
      this.updatePosition.bind(this)
    );
  }

  animatePoints() {
    this.$el.animate(
      [
        { opacity: 1 },
        {
          opacity: 0,
          transform: "translateY(-300px)",
        },
      ],
      {
        duration: 4000 / this.speed, //Keeping Animation in syn with speed
        fill: "forwards",
        easing: "linear",
      }
    );
  }

  handleClick(event) {
    event.preventDefault();

    this.$el.removeEventListener("mousedown", this.handler);
    this.$el.removeEventListener("touchstart", this.handler);

    this.points = getScore(this.size.width);
    this.$el.innerHTML = `+${this.points}`;
    this.animatePoints();

    if (this.onDelete && this.points) {
      this.onDelete(this.id, this.points);
    }
    this.destroyDot();
  }

  /**
   * Destroy The Dot and other clean Up avoid memory leak
   */
  destroyDot() {
    cancelAnimationFrame(this.animationFrameId);

    setTimeout(() => {
      this.$el.remove();
    }, 1000); // Keeping Delay for animation to destroy

    this.animationStartTime = null;
  }

  updatePosition(timestamp) {
    if (this.animationStartTime === null) {
      this.animationStartTime = timestamp;
    }

    const CONSTNT_SPEED = 0.01; //10px/1000ms
    const elapseTime = timestamp - this.animationStartTime;
    const moveBy = CONSTNT_SPEED * elapseTime * this.speed; //Overall Speed Will be 10px/Sec*Speed

    this.top = this.top + moveBy;
    this.$el.style.top = getPixelValue(this.top); //Check For Performance as offset will cause reflow
    this.animationStartTime = timestamp;

    // Remove Element if Reaches at the bottom
    if (this.top >= this.bottom) {
      this.destroyDot();
    } else {
      this.animationFrameId = requestAnimationFrame(
        this.updatePosition.bind(this)
      );
    }
  }
}
