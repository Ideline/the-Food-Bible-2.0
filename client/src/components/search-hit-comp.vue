<template>
  <div class="searchHit" @click="selectFood(food)">
    <div class="nameContainer">
      <div class="searchHitName">{{food.Namn}}</div>
    </div>
    <div class="line"></div>
  </div>
</template>

<script>
export default {
  name: "SearchHitComp",
  props: {
    food: Object,
    selectFood: Function
  }
};
</script>

<style scoped lang="less">
@light-grey: rgb(218, 218, 218);
@hover-grey: rgb(241, 241, 241);

.line {
  height: 1px;
  width: 252px;
  background-color: @light-grey;
}
.searchHit:last-child .line {
  display: none;
}
.nameContainer {
  display: flex;
  align-items: center;
  width: 252px;
  min-height: 34px;
}
.searchHit:hover {
  background-color: @hover-grey;
}
.searchHit {
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 260px;
  min-height: 35px;
  cursor: pointer;
}
.searchHitName {
  color: rgb(145, 145, 145);
}
</style>
