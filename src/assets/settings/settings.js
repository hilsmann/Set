import SecureLS from "secure-ls";

export class Settings {
  constructor() {
    this.localStorage = new SecureLS();
    this.USER_NAME = "playername";
    this.GAME_MODE = "gameMode";
    this.HARD_MODE_FLAG = "hardMode";
  }

  get(localStorageDataName) {
    return this.localStorage.get(localStorageDataName);
  }

  set(userName, gameMode, hardMode, localStorageDataName) {
    this.localStorage.set(localStorageDataName, {
      playername: userName,
      gameMode: gameMode,
      hardMode: hardMode
    });
  }

  delete(localStorageDataName) {
    this.localStorage.set(localStorageDataName, {});
  }

  setListOfHighscores(listOfHigscores, localStorageDataName) {
    this.localStorage.set(localStorageDataName, listOfHigscores);
  }

  getHardmodeFlag(localStorageDataName) {
    if (
      typeof this.get(localStorageDataName)[this.HARD_MODE_FLAG] !==
        "undefined" ||
      this.get(localStorageDataName)[this.HARD_MODE_FLAG]
    ) {
      return this.get(localStorageDataName)[this.HARD_MODE_FLAG];
    } else {
      return false;
    }
  }

  getGameMode(localStorageDataName) {
    if (
      typeof this.get(localStorageDataName)[this.GAME_MODE] !== "undefined" ||
      this.get(localStorageDataName)[this.GAME_MODE]
    ) {
      return this.get(localStorageDataName)[this.GAME_MODE];
    } else {
      return "NormalMode";
    }
  }

  getUserName(localStorageDataName) {
    if (
      typeof this.get(localStorageDataName)[this.USER_NAME] !== "undefined" ||
      this.get(localStorageDataName[this.USER_NAME])
    ) {
      return this.get(localStorageDataName)[this.USER_NAME];
    } else {
      return "";
    }
  }
}
