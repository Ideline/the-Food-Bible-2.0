<template>
  <section class="ingredientComp">
    <div class="ingredientsHead">
      <div class="ingredients">Ingredienser</div>
      <portion-picker v-bind:calculatePortionValues="calculatePortionValues"/>
    </div>
    <div class="ingredientsTable">
      <div class="ingredient" v-for="(ingredient, index) in recipe.ingredients" v-bind:key="index">
        <div class="value">
          <div class="amount" v-if="ingredient.displayAmount === ''">{{ingredient.defaultDisplayAmount}}</div>
          <div class="amount" v-else>{{ingredient.displayAmount}}</div>
          <div class="measure">{{ingredient.displayMeasure}}</div>
        </div>
          <div class="ingredientName">{{ingredient.displayName}}</div>
        </div>
    </div>
  </section>
</template>

<script>
import PortionPicker from "./portion-picker.vue";

export default {
  name: "IngredientsSection",
  props: {
    recipe: Object,
    calculatePortionValues: Function
  },
  computed: {
    currentIngredients() {
      return this.$store.state.currentIngredients;
    }
  },
  components: {
    PortionPicker
  }
};
</script>

<style scoped lang="less">
.ingredientComp {
  margin-bottom: 30px;
}
.ingredientsHead {
  display: flex;
}
.ingredients {
  font-size: 20px;
  margin-right: 20px;
}
.ingredient {
  display: flex;
}
.amount {
  margin-right: 4px;
}
.ingredient::before {
  content: "•";
  margin-right: 10px;
}
.portionPicker {
  margin-bottom: 30px;
}
.value {
  display: flex;
  min-width: 70px;
}
.measure {
  padding-right: 10px;
}
@media screen and (max-width: 992px) {
}
</style>
