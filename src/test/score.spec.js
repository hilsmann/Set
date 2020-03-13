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

  // Prepare the Highscore List for the Tests
  const highscore = new Highscore(USER_NAME, USER_POINTS, GAME_MODE);
  let allScores = [];
  allScores.push(highscore);

  it("saves the current score", () => {
    score.save(USER_NAME, USER_POINTS, GAME_MODE);
    expect(settings.get(LOCAL_STORAGE_DATA_SET_GAME)).toEqual(allScores);
  });

  it("deletes the 'Set_Game' setting and tries to get all scores", () => {
    settings.delete(LOCAL_STORAGE_DATA_SET_GAME);

    expect(settings.get(LOCAL_STORAGE_DATA_SET_GAME)).toEqual({});
  });
});
