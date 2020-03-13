import { Score } from "../assets/score/score.js";
import { Highscore } from "../assets/highscore/highscore.js";
import { Settings } from "../assets/settings/settings.js";

describe("Integration test for Score functionality", () => {
  const GAME_MODE = "NormalMode";
  const LOCAL_STORAGE_DATA_SET_GAME = "set_game";
  const USER_NAME = "Peter";
  const USER_POINTS = 100;

  const score = new Score();
  const settings = new Settings();

  it("saves the current score", () => {
    const highscore = new Highscore(USER_NAME, USER_POINTS, GAME_MODE);
    let allScores = [];

    allScores.push(highscore);

    score.save(USER_NAME, USER_POINTS, GAME_MODE);
    expect(settings.get(LOCAL_STORAGE_DATA_SET_GAME)).toEqual(allScores);
  });
});
