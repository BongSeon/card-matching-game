<template>
  <section class="title">
    <h1>카드 매칭 게임</h1>
    <div class="buttons">
      <button
        v-show="!$store.state.gameStatus"
        @click="startGame"
        class="btn btn-primary mt-3 btn-restart bordered"
      >
        <i class="fas fa-flag-checkered"></i>게임 시작
      </button>
      <button
        v-show="$store.state.gameStatus"
        @click="restartGame"
        class="btn btn-primary mt-3 btn-restart bordered"
      >
        <i class="fas fa-flag-checkered"></i>재시작
      </button>
    </div>
  </section>
  <transition-group tag="section" class="game-board" name="shuffle-card">
    <Card
      v-for="card in cardList"
      :key="`${card.value}-${card.variant}`"
      :value="card.value"
      :variant="card.variant"
      :position="card.position"
      :matched="card.matched"
      :visible="card.visible"
      @select-card="cardClick"
    />
  </transition-group>
  <!-- <div>
    <h3>selPos</h3>
    {{ selPos }}
    <h3>selVal</h3>
    {{ selVal }}
  </div> -->
  <p>
    스테이지: {{ $store.getters['stage'] }}, gameStatus:
    {{ $store.getters['gameStatus'] }}
  </p>
  <p>matched: {{ matched }}</p>
</template>

<script>
import Card from './components/Card.vue'
const cardItems = [
  'arana',
  'azmodan',
  'jaina',
  'lich',
  'magni',
  'cthun',
  'orc',
  'sylvanas'
]

export default {
  components: {
    Card
  },
  data() {
    return {
      itemCnt: 16,
      cardList: [],
      selPos: new Set(), // user's select (max: 2)
      selVal: new Set(), // user's select (max: 2)
      checking: false, // if user select 2, it's true while 1 sec
      matched: 0, // 맞춘개수 2씩 늘어남
      finished: false // 전체 다 맞춘 경우
    }
  },
  computed: {},
  created() {
    // this.$store.commit('nextStage')
    // console.log(this.$store.state.stage)
    // console.log(this.$store.getters['stageNum'])

    for (let i = 0; i < this.itemCnt; i++) {
      const value = cardItems[parseInt(i / 2)]
      const variant = i % 2 === 0 ? 1 : 2
      const visible = i % 2 === 0 ? false : true
      this.cardList.push({
        value: value,
        variant: variant,
        position: i,
        matched: false,
        visible: visible
      })
    }
    // this.test()
  },
  mounted() {},
  methods: {
    restartGame() {
      this.startGame()
    },
    startGame() {
      this.matched = 0
      this.$store.commit('gameStart')

      let array = []
      for (let i = 0; i < this.itemCnt; i++) {
        array.push(i)
      }
      // sample : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
      const shuffled = this.shuffleArray(array)
      // shuffled : [13, 4, 6, 1, 7, 0, 12, 15, 5, ...]

      this.shuffleCards(shuffled)
    },
    shuffleArray(array) {
      let curLength = array.length
      const count = array.length

      let shuffledSet = new Set()
      let i = 0

      // 무작위 인덱스 하나를 생성해서 그 인덱스에 해당하는 item을
      // array에서 제거하고 shuffledSet에 추가한다
      // shuffledSet 의 크기가 count(16)이 될때까지 반복한다.
      while (shuffledSet.size < count) {
        i++
        curLength = array.length
        let randIdx = Math.floor(Math.random() * curLength)

        // array에서 선택한 item을 꺼내서 변수에 저장한다(array에서는 삭제됨)
        let randPick = array.splice(randIdx, 1)
        // 저장한 item을 Set에 추가한다
        shuffledSet.add(randPick[0])
      }
      // [13]     반복문 한번 수행될때마다 array에서 요소하나를 꺼내서
      // [13, 4]  shuffledSet 에 추가하며 삭제 한다.
      // [13, 4, 6]
      // [13, 4, 6, 1]
      // [13, 4, 6, 1...]

      let shuffled = []
      shuffledSet.forEach((s) => {
        shuffled.push(s)
      })
      return shuffled
    },

    // shuffled 의 순서대로 ex. [ 13, 4, 6, 1, 0, ... ]
    // this.cardList의 순서를 재배열
    shuffleCards(shuffled) {
      const newList = []
      for (let i = 0; i < shuffled.length; i++) {
        newList.push(this.cardList[shuffled[i]])
      }
      // const temp = this.cardList[1]
      // this.cardList[1] = this.cardList[2]
      // this.cardList[2] = temp
      this.cardList = newList

      this.cardList = this.cardList.map((card, index) => {
        return {
          ...card,
          position: index,
          visible: false,
          matched: false
        }
      })
    },
    async cardClick(position, value) {
      if (this.checking == true) {
        // 2개를 선택한 상황이고 오답일 경우 카드가 다시 뒤집어질때까지
        // 클릭 막기 위한 조건문
        return
      }
      // console.log('flipCard:', position)
      this.cardList[position].visible = !this.cardList[position].visible

      this.selPos.add(position)
      this.selVal.add(value)
      if (this.selPos.size === 2) {
        this.checking = true

        // 2개 의 value가 같은지 체크하고
        // 맞다면 matched 를 true
        const match = this.selVal.size === 1
        if (match) {
          // console.log('맞췄습니다. val:', value)
          this.matched += 2
          if (this.matched === this.itemCnt) {
            console.log(this.matched, this.itemCnt)
            this.$store.commit('gameOver')
          }
          // this.cardList[this.selPos[0]].matched = true
          // this.cardList[this.selPos[1]].matched = true
          this.selPos.forEach((pos) => {
            this.cardList[pos].matched = true
          })
        }

        // this.selPos.forEach((sel) => {
        //   console.log(sel)
        // })

        setTimeout(() => {
          this.checking = false
          if (!match) {
            this.selPos.forEach((pos) => {
              this.cardList[pos].visible = false
            })
          }
          this.selPos.clear()
          this.selVal.clear()
        }, 1000)
      }
    },
    selClear() {}
  }
}
</script>

<style>
.title {
  background: #2c3e50;
  padding: 30px 0;
  font-family: 'HoengseongHanu', sans-serif;
  text-shadow: rgb(0 0 0) 2px 0px 0px, rgb(0 0 0) 1.75517px 0.95885px 0px,
    rgb(0 0 0) 1.0806px 1.68294px 0px, rgb(0 0 0) 0.14147px 1.99499px 0px,
    rgb(0 0 0) -0.83229px 1.81859px 0px, rgb(0 0 0) -1.60229px 1.19694px 0px,
    rgb(0 0 0) -1.97998px 0.28224px 0px, rgb(0 0 0) -1.87291px -0.70157px 0px,
    rgb(0 0 0) -1.30729px -1.5136px 0px, rgb(0 0 0) -0.42159px -1.95506px 0px,
    rgb(0 0 0) 0.56732px -1.91785px 0px, rgb(0 0 0) 1.41734px -1.41108px 0px,
    rgb(0 0 0) 1.92034px -0.55883px 0px;
}
.game-board {
  display: grid;
  grid-template-columns: repeat(4, 60px);
  grid-template-rows: repeat(4, 60px);
  grid-column-gap: 12px;
  grid-row-gap: 12px;
  justify-content: center;
  padding: 30px 0;
}
.buttons {
  height: 40px;
  margin-bottom: 20px;
}
.btn {
  height: 40px;
  width: 200px;
}

.shuffle-card-move {
  transition: transform 0.8s ease-in;
}

@media screen and (min-width: 500px) {
  .game-board {
    grid-template-columns: repeat(4, 90px);
    grid-template-rows: repeat(4, 90px);
  }
}
@media screen and (min-width: 600px) {
  .game-board {
    grid-template-columns: repeat(4, 120px);
    grid-template-rows: repeat(4, 120px);
  }
}
</style>
