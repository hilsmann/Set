import { Card } from "../assets/card/card.js";

describe("Set Card functionality", () => {
  const ONE = 1;
  const TEN = 10;
  const image = new Image(); // create new Image

  it("creates a new Card with parameters", () => {
    const newCard = new Card(ONE, ONE, ONE, ONE, image);

    expect(newCard.color).toBe(ONE);
    expect(newCard.amount).toBe(ONE);
    expect(newCard.filling).toBe(ONE);
    expect(newCard.form).toBe(ONE);
  });

  it("creates a new Card and set the position", () => {
    const newCard = new Card(ONE, ONE, ONE, ONE, image);
    newCard.setPosition(ONE, ONE, TEN, TEN);

    expect(newCard.x_min).toBe(ONE);
    expect(newCard.y_min).toBe(ONE);
    expect(newCard.x_max).toBe(TEN);
    expect(newCard.y_max).toBe(TEN);
  });
});
