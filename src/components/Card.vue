<template>
  <div class="card" :class="{ 'is-flipped': visible }" @click="selectCard">
    <div class="card-face is-front">
      <img :src="`/images/${value}.png`" :alt="value" />
      <!-- <div class="position">{{ variant }}</div> -->
      <div class="matched-mark" v-if="matched">
        <i class="fas fa-check-square"></i>
      </div>
    </div>
    <div class="card-face is-back">
      <!-- <div class="position">{{ position }}</div> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    },
    variant: {
      type: Number,
      required: true
    },
    position: {
      type: Number,
      required: true
    },
    matched: {
      type: Boolean,
      default: false
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  methods: {
    selectCard() {
      if (this.$store.state.gameStatus !== 1) {
        console.log('먼저 게임을 시작해주세요.')
        return
      }
      if (!this.visible) {
        this.$emit('select-card', this.position, this.value)
      }
    },
    reset() {},
    test() {
      // console.log(
      //   'val;',
      //   this.value,
      //   'pos;',
      //   this.position,
      //   'matched;',
      //   this.matched,
      //   'visible;',
      //   this.visible
      // )
    }
  }
}
</script>

<style scoped>
.position {
  position: absolute;
  font-size: 2rem;
  font-weight: bold;
  left: 10px;
  top: 0;
}
.card {
  cursor: pointer;
  position: relative;
  transition: transform 0.5s ease-in-out;
  transform-style: preserve-3d;
  background-color: transparent;
  border: 2px solid #2c3e50;
  border-radius: 10px;
}
.card-face {
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}
.card-face.is-front {
  background-image: url('/images/card-bg.png');
  color: #fff;
  transform: rotateY(180deg);
}
.card-face.is-front img {
  width: 100%;
  border-radius: 10px;
  color: #fff;
  /* transform: rotateY(180deg); */
}
.card-face.is-back {
  background-image: url('/images/card-back-Cthun.png');
  background-position: center center;
  background-repeat: no-repeat;
  transform: rotateY(0deg);
  background-size: contain;
}
.card.is-flipped {
  transform: rotateY(180deg);
}
.matched-mark {
  position: absolute;
  font-size: 24px;
  color: gold;
  right: 10px;
  bottom: 4px;
}
</style>
