import { Settings } from "../assets/settings/settings.js";

describe("Integration test for Settings functionality", () => {
  const GAME_MODE = "hardMode";
  const HARD_MODE_FLAG = true;
  const LOCAL_STORAGE_DATA_SETTINGS = "settings";
  const USER_NAME = "Peter";

  const settings = new Settings();

  it("sets and gets the current useranme", () => {
    settings.set(
      USER_NAME,
      GAME_MODE,
      HARD_MODE_FLAG,
      LOCAL_STORAGE_DATA_SETTINGS
    );
    expect(settings.getUserName(LOCAL_STORAGE_DATA_SETTINGS)).toEqual(
      USER_NAME
    );
  });

  it("sets and gets the current HardModeFlag", () => {
    settings.set(
      USER_NAME,
      GAME_MODE,
      HARD_MODE_FLAG,
      LOCAL_STORAGE_DATA_SETTINGS
    );
    expect(settings.getHardmodeFlag(LOCAL_STORAGE_DATA_SETTINGS)).toEqual(
      HARD_MODE_FLAG
    );
  });

  it("sets and gets the current GameMode", () => {
    settings.set(
      USER_NAME,
      GAME_MODE,
      HARD_MODE_FLAG,
      LOCAL_STORAGE_DATA_SETTINGS
    );
    expect(settings.getGameMode(LOCAL_STORAGE_DATA_SETTINGS)).toEqual(
      GAME_MODE
    );
  });

  it("deletes Local Storage and tries to gets the default Username", () => {
    settings.delete(LOCAL_STORAGE_DATA_SETTINGS);
    expect(settings.getUserName(LOCAL_STORAGE_DATA_SETTINGS)).toEqual("");
  });

  it("deletes Local Storage and tries to gets the default Mode", () => {
    settings.delete(LOCAL_STORAGE_DATA_SETTINGS);
    expect(settings.getGameMode(LOCAL_STORAGE_DATA_SETTINGS)).toEqual("NormalMode");
  });

  it("deletes Local Storage and tries to gets the default HardModeFlag", () => {
    settings.delete(LOCAL_STORAGE_DATA_SETTINGS);
    expect(settings.getHardmodeFlag(LOCAL_STORAGE_DATA_SETTINGS)).toEqual(false);
  });
});
