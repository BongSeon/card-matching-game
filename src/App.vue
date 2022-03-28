<template>
  <h1>title</h1>
  <section class="game-board">
    <Card
      v-for="(card, index) in cardList"
      :key="`card-${index}`"
      :value="card.value"
      :position="card.position"
      :matched="card.matched"
      :visible="card.visible"
      @select-card="cardClick"
    />
  </section>
  <div>
    <h3>selPos</h3>
    {{ selPos }}
    <!-- <br />
    {{ selPos.size }} -->
    <h3>selVal</h3>
    {{ selVal }}
  </div>
</template>

<script>
import Card from './components/Card.vue'

export default {
  components: {
    Card
  },
  data() {
    return {
      cardList: [],
      selPos: new Set(), // user's select (max: 2)
      selVal: new Set(), // user's select (max: 2)
      checking: false // if user select 2, it's true while 1 sec
    }
  },
  created() {
    const cardItems = [
      'bat',
      'pumpkin',
      'ghost',
      'moon',
      'cupcake',
      'witch-hat',
      'candy',
      'cauldron'
    ]
    for (let i = 0; i < 16; i++) {
      this.cardList.push({
        value: cardItems[parseInt(i / 2)],
        position: i,
        matched: false,
        visible: false
      })
    }
  },
  methods: {
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
  color: #2c3e50;
  margin-top: 60px;
}
.game-board {
  display: grid;
  grid-template-columns: repeat(4, 60px);
  grid-template-rows: repeat(4, 60px);
  grid-column-gap: 12px;
  grid-row-gap: 12px;
  justify-content: center;
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
