<template>
  <div class="portionPicker">
    <div class="portionSelectorLeft noselect" @click="decreasePortions">
      <img class="selectorImage" src="../../public/minus.png" />
    </div>
    <input class="portionInput" v-model=nPortions @change="calculatePortionValues(nPortions)" @keypress="inputNumbers" @blur="onBlur" />
    <div class="portionSelectorRight noselect" @click="increasePortions">
      <img class="selectorImage" src="../../public/plus.png" />
    </div>
    <div class="portions">portioner</div>
  </div>
</template>

<script>
export default {
  name: "PortionPicker",
  data() {
    return {
      NULLCHAR: 0,
      BACKSPACE: 8,
      ENTER: 13,
      ZERO: 48,
      NINE: 57,
      nPortions: 4,
      MINIMUM_PORTIONS: 1
    };
  },
  props: {
    calculatePortionValues: Function
  },
  methods: {
    inputNumbers: function(e) {
      const isValidKeyPress =
        [this.BACKSPACE, this.NULLCHAR, this.ENTER].includes(e.which) ||
        (e.which >= this.ZERO && e.which <= this.NINE);

      if (
        this.nPortions === "" ||
        (this.nPortions === "0" && e.which === this.ENTER)
      ) {
        this.nPortions = this.MINIMUM_PORTIONS;
      } else if (!isValidKeyPress) {
        e.preventDefault();
      }
      return isValidKeyPress;
    },
    onBlur: function() {
      if (this.nPortions === "" || this.nPortions === "0") {
        this.nPortions = this.MINIMUM_PORTIONS;
      }
    },
    increasePortions: function() {
      this.nPortions++;
      this.calculatePortionValues(this.nPortions);
    },
    decreasePortions: function() {
      if (this.nPortions > this.MINIMUM_PORTIONS) {
        this.nPortions--;
        this.calculatePortionValues(this.nPortions);
      }
    }
  }
};
</script>

<style scoped lang="less">
@medium-grey: rgb(190, 190, 190);

.portionPicker {
  height: 25px;
  display: flex;
  align-items: center;
}
.portionInput {
  outline: none;
  width: 33px;
  height: 25px;
  border: 0;
  color: @medium-grey;
  font-weight: bold;
  font-size: 14px;
  border-top: 2px solid @medium-grey;
  border-bottom: 2px solid @medium-grey;
  text-align: center;
}
.selectorImage {
  width: 12px;
}
.portionSelectorRight {
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid @medium-grey;
  border-top-right-radius: 50%;
  border-bottom-right-radius: 50%;
  cursor: pointer;
}
.portionSelectorLeft {
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid @medium-grey;
  border-top-left-radius: 50%;
  border-bottom-left-radius: 50%;
  cursor: pointer;
}
.portionSelector:active {
  -ms-transform: scale(0.9);
  -webkit-transform: scale(0.9);
  transform: scale(0.9);
}
.portions {
  margin-left: 10px;
  color: @medium-grey;
}
</style>
