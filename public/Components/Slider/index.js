export default class Slider {
  static min = 1; //default min value
  static max = 10; //default max value

  constructor(init) {
    this.value = init.value || 1;
    this.$el = null;
    this.className = init.className;

    this.onChangeHandler = init.onChange;
  }

  createElement() {
    this.$el = document.createElement("section");
    this.$el.classList.add(this.className);

    const $label = document.createElement("label");
    $label.append(document.createTextNode("Speed"));
    this.$el.appendChild($label);

    const $input = document.createElement("input");
    $input.setAttribute("value", this.value);
    $input.setAttribute("type", "range");
    $input.setAttribute("min", Slider.min);
    $input.setAttribute("max", Slider.max);
    $input.addEventListener("change", this.onChange.bind(this));

    this.$el.appendChild($input);

    return this.$el;
  }

  onChange(event) {
    if (typeof this.onChangeHandler === "function") {
      this.onChangeHandler.call(this, event);
    }
  }

  onDestroy() {
    this.$el.remove();
    this.$el.removeEventListener("change", this.onChange.bind(this));
  }
}
