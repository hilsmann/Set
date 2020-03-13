import { Score } from "../assets/score/score.js";
import { Highscore } from "../assets/highscore/highscore.js";
import SecureLS from "secure-ls";

describe("Integration test for Score functionality", () => {
  const GAME_MODE = "NormalMode";
  const USER_NAME = "Peter";
  const USER_POINTS = 100;

  const score = new Score();
  const localStorage = new SecureLS();

  it("saves the current score", () => {
    const highscore = new Highscore(USER_NAME, USER_POINTS, GAME_MODE);
    let allScores = [];

    allScores.push(highscore);

    score.save(USER_NAME, USER_POINTS, GAME_MODE);
    expect(localStorage.get("set_game")).toEqual(allScores);
  });
});
