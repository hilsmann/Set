import { Points } from "../assets/points/points.js";
import { Settings } from "../assets/settings/settings.js";

describe("Unit test Points functionality", () => {
  const GAME_MODE = "NormalMode";
  const HARD_MODE_FLAG = true;
  const LOCAL_STORAGE_DATA_SETTINGS = "settings";
  const USER_NAME = "Peter";
  const SET_POINTS_FOR_NORMAL_MODE = 100;
  const SET_POINTS_FOR_HARD_MODE = 150;
  const POINT_TO_BE_REMOVED_NORMAL_MODE = 1;
  const POINT_TO_BE_REMOVED_HARD_MODE = 3;

  const points = new Points();
  const settings = new Settings();

  it("saves some settings and get points for a current set", () => {
    settings.set(
      USER_NAME,
      GAME_MODE,
      HARD_MODE_FLAG,
      LOCAL_STORAGE_DATA_SETTINGS
    );
    expect(points.forCurrentSetWithModes()).toEqual(SET_POINTS_FOR_HARD_MODE);
  });

  it("deletes the current settings and get default points for a current set", () => {
    settings.delete(LOCAL_STORAGE_DATA_SETTINGS);
    expect(points.forCurrentSetWithModes()).toEqual(SET_POINTS_FOR_NORMAL_MODE);
  });

  it("saves some settings and get points for a current set", () => {
    settings.set(
      USER_NAME,
      GAME_MODE,
      HARD_MODE_FLAG,
      LOCAL_STORAGE_DATA_SETTINGS
    );
    expect(points.removeWithModes()).toEqual(POINT_TO_BE_REMOVED_HARD_MODE);
  });

  it("deletes the current settings and get default points for a current set", () => {
    settings.delete(LOCAL_STORAGE_DATA_SETTINGS);
    expect(points.removeWithModes()).toEqual(POINT_TO_BE_REMOVED_NORMAL_MODE);
  });
});
