import { defineStore } from "pinia";

export const useGlobalStore = defineStore("global", {
  state: () => {
    return {
      slide: 0,
      autoplaySongs: true,
      loopSongs: false,
    };
  },
  actions: {},
  getters: {},
});
