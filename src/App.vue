<template>
  <section class="title">
    <h1>title</h1>
    <div class="restart">
      <button
        v-show="!finished"
        @click="doReset"
        class="btn btn-primary btn-restart bordered"
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
  <div>
    <h3>selPos</h3>
    {{ selPos }}
    <h3>selVal</h3>
    {{ selVal }}
  </div>
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
      cardList: [],
      selPos: new Set(), // user's select (max: 2)
      selVal: new Set(), // user's select (max: 2)
      checking: false, // if user select 2, it's true while 1 sec
      finished: false // 전체 다 맞춘 경우
    }
  },
  created() {
    for (let i = 0; i < 16; i++) {
      const value = cardItems[parseInt(i / 2)]
      const variant = i % 2 === 0 ? 1 : 2
      this.cardList.push({
        value: value,
        variant: variant,
        position: i,
        matched: false,
        visible: false
      })
    }
  },
  methods: {
    shuffleCards() {
      // this.cardList = _.shuffle(this.cardList)
      const temp = this.cardList[1]
      this.cardList[1] = this.cardList[2]
      this.cardList[2] = temp

      this.cardList = this.cardList.map((card, index) => {
        return {
          ...card,
          position: index,
          visible: false,
          matched: false
        }
      })
    },
    doReset() {
      this.shuffleCards()

      // console.log(this.cardList[0], this.cardList[1], this.cardList[2])
      // let list = this.cardList
      // this.cardList = []
      // let rand = 2
      // let pop = list.pop(rand)
      // console.log(pop)
      // this.cardList.push(pop)
      // this.cardList.push(pop)
    },
    async cardClick(position, value) {
      if (this.checking == true) {
        // 2개를 선택한 상황이고 오답일 경우 카드가 다시 뒤집어질때까지
        // 클릭 막기 위한 조건문
        return
      }
      console.log('flipCard:', position)
      this.cardList[position].visible = !this.cardList[position].visible

      this.selPos.add(position)
      this.selVal.add(value)
      if (this.selPos.size === 2) {
        this.checking = true

        // 2개 의 value가 같은지 체크하고
        // 맞다면 matched 를 true
        const match = this.selVal.size === 1
        if (match) {
          console.log('맞췄습니다. val:', value)
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  /* background: yellow url('/images/page-bg.png') right top fixed; */
  background: rgb(92, 92, 92) url('/images/page-bg.png') right top;
}
.title {
  background: #2c3e50;
  padding: 30px 0;
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
.restart {
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
