<template>
  <div class="card" :class="{ 'is-flipped': !visible }" @click="selectCard">
    <div class="card-face is-front">
      <img :src="`/images/${value}.png`" :alt="value" />
      <img v-if="matched" src="/images/checkmark.svg" alt="" />
      <div>{{ position }} - {{ value }}</div>
      <div v-if="matched">{{ matched }}</div>
    </div>
    <div class="card-face is-back">back</div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
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
      if (!this.visible) {
        this.$emit('select-card', this.position, this.value)
      }
    }
  }
}
</script>

<style scoped>
.card {
  cursor: pointer;
  position: relative;
  transition: transform 0.5s ease-in;
  transform-style: preserve-3d;
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
  /* transform: rotateY(180deg); */
}
.card-face.is-back {
  background-color: rgb(140, 197, 207);
  transform: rotateY(180deg);
}
.card.is-flipped {
  transform: rotateY(180deg);
}
</style>
