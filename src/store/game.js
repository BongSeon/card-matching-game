import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', {
  state: () => {
    return {
      stage: 1,
      gameStatus: 0 // ready: 0 , game-started: 1, gameover: 2
    }
  },
  getters: {
    stageNum: (state) => {
      state.stage * 2
    }
  },
  actions: {
    reset() {
      this.stage = 1
    },
    nextStage() {
      tihs.stage++
    }
  }
})
