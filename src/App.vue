<template>
  <section class="title">
    <h1>카드 매칭 게임</h1>
    <div class="restart">
      <button
        v-show="!finished"
        @click="restart"
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
    // this.test()
  },
  methods: {
    startGame() {},

    restart() {
      let sample = []
      for (let i = 0; i < 16; i++) {
        sample.push(i)
      }
      let sampleLength = sample.length
      let curLength = sample.length

      let sampleSet = new Set()
      let i = 0
      while (sampleSet.size < sampleLength && i < 100) {
        i++
        curLength = sample.length
        let randIdx = Math.floor(Math.random() * curLength)

        let randVal = sample.splice(randIdx, 1)

        // console.log('randIdx: ', randIdx, ' randVal: ', randVal)
        console.log('sample: ', sample)

        sampleSet.add(randVal[0])
      }
      // console.log('sample: ', sampleSet, sampleSet.size, i)
      sample = []
      sampleSet.forEach((s) => {
        sample.push(s)
      })
      // console.log('newSample: ', sample)

      this.shuffleCards(sample)
    },
    shuffleCards(sample) {
      console.log('sample: ', sample)
      // this.cardList = _.shuffle(this.cardList)
      const newList = []
      for (let i = 0; i < sample.length; i++) {
        newList.push(this.cardList[sample[i]])
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
@font-face {
  font-family: 'HoengseongHanu';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2202@1.0/HoengseongHanu.woff')
    format('woff');
  font-weight: normal;
  font-style: normal;
}
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
