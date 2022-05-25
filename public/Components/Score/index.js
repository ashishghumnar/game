export default class Score {
  constructor() {}

  createElement() {
    this.$el = document.createElement("section");
    this.$el.classList.add('score')

    this.$score = document.createElement('span');
    this.$score.innerHTML = 0;
    
    this.$el.appendChild(document.createTextNode('Score:'));
    this.$el.appendChild(this.$score);

    return this.$el;
  }

  updateScore(score) {
    this.$score.innerHTML = score
  }
}
