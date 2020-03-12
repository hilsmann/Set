// Import Vue and the component being tested
import { Highscore } from "../assets/highscore/highscore.js"

describe("Highscore object functionality", () => {

  const ONE = 1;

  it("creates a new Highscore with parameters", () => {
    const newHighscore = new Highscore('Peter', 1, 'NormalMode');

    expect(newHighscore.name).toBe('Peter');
    expect(newHighscore.score).toBe(ONE);
    expect(newHighscore.gameMode).toBe('NormalMode');
  });
});
