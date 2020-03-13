import SecureLS from "secure-ls";

export class Settings {
  constructor() {
    this.localStorage = new SecureLS();
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

  setListOfHighscores(listOfHigscores, localStorageDataName) {
    this.localStorage.set(localStorageDataName, listOfHigscores);
  }

  getHardmodeFlag(localStorageDataName) {
    return this.get(localStorageDataName)
      ? this.get(localStorageDataName)["hardMode"]
      : false;
  }

  getGameMode(localStorageDataName) {
    return this.get(localStorageDataName)
      ? this.get(localStorageDataName)["gameMode"]
      : "NormalMode";
  }

  getUserName(localStorageDataName) {
    return this.get(localStorageDataName)
      ? this.get(localStorageDataName)["playername"]
      : "";
  }
}
