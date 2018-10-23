<template>
  <div class="nutritionTable">
    <div class="nutritionsHeader">Näringsinnehåll</div>
    <table>
      <tr>
        <th class="nutrientNameHeader">Näringsämne</th>
        <th class="valueHeader">Värde totalt</th>
        <th class="valueHeader">Värde per port</th>
      </tr>
      <tr v-for="(nutrient, index) in recipe.nutritionValues" v-bind:key="index">
        <td>{{nutrient.name}}</td>
        <td class="nutrientValue">{{nutrient.totalValue}}</td>
        <td class="nutrientValue">{{nutrient.valuePerPortion}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "NutritionTable",
  props: {
    recipe: Object
  },
  computed: {
    currentNutritionValues() {
      return this.$store.state.currentNutritionValues;
    },
    currentRecipe() {
      return this.$store.state.currentRecipe;
    }
  },
  watch: {
    currentRecipe: function() {
      this.$store.dispatch("calculateNutritionValues");
    }
  }
};
</script>

<style scoped lang="less">
.nutritionsHeader {
  font-size: 20px;
  margin-bottom: 30px;
  margin-top: 30px;
}
.nutrientNameHeader {
  text-align: left;
}
.valueHeader {
  padding-left: 50px;
}
.nutrientValue {
  text-align: right;
}
@media screen and (max-width: 700px) {
  .nutritionTable {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
@media screen and (max-width: 500px) {
  .nutritionTable {
    font-size: 15px;
  }
  .valueHeader {
    padding-left: 20px;
    text-align: right;
  }
}
</style>
