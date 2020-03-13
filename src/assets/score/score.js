import { Highscore } from "../highscore/highscore.js";
import { Settings } from "../settings/settings.js";

export class Score {
  constructor() {
    this.settings = new Settings();

    this.LOCAL_STORAGE_DATA_SET_GAME = "set_game";
  }

  save(name, points, gameMode) {
    const newScore = new Highscore(name, points, gameMode);
    let allScores = [];

    if (this.settings.get(this.LOCAL_STORAGE_DATA_SET_GAME)) {
      allScores = this.settings.get(this.LOCAL_STORAGE_DATA_SET_GAME);
    }
    allScores.push(newScore);
    this.settings.setListOfHighscores(
      allScores,
      this.LOCAL_STORAGE_DATA_SET_GAME
    );
  }
}
