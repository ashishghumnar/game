export default class Dot {
  constructor(init) {
    this.$parent = null;
    this.$el = document.createElement("div");
    this.$id = Math.random() * 100; //assign some unique id

    this.animationFrameId = null;
    this.isDestroyed = false;
    this.speed = init?.speed || 1;
    this.points = 0;
    this.onDelete = init?.onDelete;
    this.animationStartTime = null;

    /**
     * Define The Size of dot
     */
    this.setSize();

    /**
     * Get Size Of Parent
     */
    
    this.bottom = init.parentHeight; //600 + parseInt(this.size.height);
    this.top = -(parseInt(this.size.height)-(parseInt(this.size.height)/2));


    /**
     * Initialise Dot With Some Style
     */
    this.setStyleToDot();

    /**
     * Bind The Click Event
     */
    this.$el.addEventListener("mousedown", this.handleClick.bind(this)); //ISSUE: TWO EVENTS gET trigger in mobile
    this.$el.addEventListener("touchstart", this.handleClick.bind(this));
  }

  setSpeed(speed) {
    this.speed = Number(speed);
  }

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  setSize() {
    const randomSize =Math.round(this.getRandomNumber(10, 100)/10)*10;

    const randomNumber = this.getPixelValue(randomSize);
    this.size = {
      width: randomNumber,
      height: randomNumber,
      radius: randomNumber,
    };
  }

  setStyleToDot() {
    this.$el.style.width = this.size.width;
    this.$el.style.height = this.size.height;
    this.$el.style.backgroundColor = this.getColor();
    this.$el.style.borderRadius = this.size.radius;
    this.$el.style.top = this.getPixelValue(this.top);

    this.$el.style.left = this.getPixelValue(Math.random() * 500);

    this.$el.classList.add("dot");
  }

  /* 
   * Move this to util AND CACHE THE COLOR
   */
  getColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";

    while (color.length < 7) {
      color += letters[Math.round(Math.random() * 16)];
    }

    return color;
  }

  getPixelValue(val) {
    return `${val}px`;
  }

  appendDotTo(parent) {
    this.$parent = parent;
    this.$parent.appendChild(this.$el);

    this.animationFrameId = requestAnimationFrame(
      this.updatePosition.bind(this)
    );
  }

  animatePoints() {
    const an = this.$el.animate(
      [
        { opacity: 1 },
        {
          opacity: 0,
          transform: "translateY(-300px)",
        },
      ],
      {
        duration: 1000,
        fill: "forwards",
        easing: "linear",
      }
    );
  }

  handleClick() {
    this.points = Math.floor(100/parseInt(this.size.width));
    
    this.$el.innerHTML=`+${this.points}`;
    
   this.animatePoints();

   setTimeout(this.destroyDot.bind(this), 1000);
  }

  /**
   * Destroy The Dot and unbind the listeners
   */
  destroyDot() {
    /**
     * Clean Up avoid memory leak
     */
    if (this.onDelete && this.points) {
      this.onDelete(this.id, this.points);
    }

    this.$el.removeEventListener("mousedown", this.handleClick);

    cancelAnimationFrame(this.animationFrameId);

    this.isDestroyed = true;
    this.$el.remove();

    this.animationStartTime = null;
  }

  updatePosition(timestamp) {
    if (this.animationStartTime === null) {
      this.animationStartTime = timestamp;
    }

    const CONSTNT_SPEED = 0.01; //10px/1000ms
    const elapseTime = timestamp - this.animationStartTime;
    const moveBy = CONSTNT_SPEED * elapseTime * this.speed;

    this.top = this.top + moveBy;
    this.$el.style.top = this.getPixelValue(this.top); //Check For Performance as offset will cause reflow
    this.animationStartTime = timestamp;

    if (this.top > this.bottom) {
      this.destroyDot();
    } else {
      this.animationFrameId = requestAnimationFrame(
        this.updatePosition.bind(this)
      );
    }
  }
}
