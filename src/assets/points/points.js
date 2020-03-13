import { Settings } from "../settings/settings.js";

export class Points {
  constructor() {
    this.settings = new Settings();

    this.LOCAL_STORAGE_DATA_SETTINGS = "settings";
    this.HARD_MODE = "hardMode";
  }

  // Methods for NormalMode/HardMode Values
  forCurrentSetWithModes() {
    if (this.settings.get(this.LOCAL_STORAGE_DATA_SETTINGS)[this.HARD_MODE]) {
      return 150;
    } else {
      return 100; // Default is NormalMode
    }
  }
  removeWithModes() {
    if (this.settings.get(this.LOCAL_STORAGE_DATA_SETTINGS)[this.HARD_MODE]) {
      return 3;
    } else {
      return 1; // Default is NormalMode
    }
  }
}
