<template>
  <button class="roundButton noselect" v-bind:class="{active: active}" @mousedown="mouseDown()" @click="click()">{{text}}</button>
</template>

<script>
export default {
  name: "RoundButton",
  data() {
    return {
      active: false
    };
  },
  props: {
    text: String,
    buttonFunction: Function
  },
  methods: {
    mouseDown: function() {
      this.active = true;
    },
    click: function() {
      this.active = false;
      this.buttonFunction();
    }
  }
};
</script>

<style scoped lang="less">
.active {
  -ms-transform: scale(0.98);
  -webkit-transform: scale(0.98);
  transform: scale(0.95);
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  transform-origin: center;
}
.roundButton {
  background-color: white;
  font-size: 16px;
  font-family: "Lora", serif;
  width: 150px;
  height: 40px;
  border: 1px solid rgb(197, 197, 197);
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-bottom: 10px;
  -webkit-box-shadow: 0px 3px 5px 2px rgba(0, 0, 0, 0.13);
  -moz-box-shadow: 0px 3px 5px 2px rgba(0, 0, 0, 0.13);
  box-shadow: 0px 3px 5px 2px rgba(0, 0, 0, 0.13);
}
.roundButton:focus {
  outline: 0;
}
</style>
