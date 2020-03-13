export class Card {
  constructor(color, amount, filling, form, image) {
    this.color = color;
    this.amount = amount;
    this.filling = filling;
    this.form = form;
    this.image = image;
  }

  setPosition(x_min, y_min, x_max, y_max) {
    this.x_min = x_min;
    this.y_min = y_min;
    this.x_max = x_max;
    this.y_max = y_max;
  }
}
