import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    stage: 1,
    gameStatus: 0 // ready: 0 , game-started: 1, gameover: 2
  },
  getters: {
    stage(state) {
      return state.stage
    },
    gameStatus(state) {
      return state.gameStatus
    }
  },
  mutations: {
    setFirstStage(state) {
      state.stage = 1
    },
    // restartGame(state){

    // },
    gameStart(state) {
      console.log('vuex: 게임을 시작합니다.')
      state.gameStatus = 1
    },
    gameOver(state) {
      console.log('vuex: 게임이 종료되었습니다.')
      state.gameStatus = 2
    },
    nextStage(state) {
      state.stage++
    }
  },
  actions: {}
})
