// Import Vue and the component being tested
import Game from "../views/Game.vue";

import Vue from "vue";

describe("Game functionality", () => {
  // Mount an instance and inspect the render output
  it("sets all standard Values", () => {
    const Constructor = Vue.extend(Game);
    const vm = new Constructor().$mount();

    expect(vm.setCounter).toBe(0);
    expect(vm.pointsForCurrentSet).toBe(100);
    expect(vm.setCounter).toBe(0);
  });
  it("sets all standard Values", () => {
    const Constructor = Vue.extend(Game);
    const vm = new Constructor().$mount();

    expect(vm.checkSetProperties(1, 1, 1)).toBe(true);
  });
});
