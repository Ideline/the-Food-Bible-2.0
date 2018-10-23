<template>
  <div class="recipe">
    <h1 class="title">{{recipe.title}}</h1>
    <div class="recipeContent">
      <div class="recipeInfo">
        <ingredients-section v-bind:recipe="recipe" v-bind:calculatePortionValues="calculatePortionValues"/>
        <div class="descriptionList">
          <div class="line" v-for="(line, index) in recipe.description" v-bind:key="index">{{line}}</div>
        </div>
      </div>
      <div class="rightContainer">
        <img class="recipeImg" v-bind:src="imgSrc" />
        <round-button class="editButton" v-if="loggedIn" v-bind:buttonFunction="editRecipe" v-bind:text="editButtonText"/>
      </div>
    </div>
    <nutrition-table v-bind:recipe="recipe"/>
  </div>
</template>

<script>
import IngredientsSection from "../components/ingredients-section.vue";
import RoundButton from "../components/round-button.vue";
import NutritionTable from "../components/nutrition-table.vue";
import axios from "axios";
import MeasureConverter from "../helpers/measure-converter.js";

export default {
  name: "RecipePage",
  data() {
    return {
      imgSrc: "",
      recipe: {},
      editButtonText: "Redigera Recept"
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.loggedIn;
    }
  },
  methods: {
    getRecipe(recipeId) {
      const that = this;
      axios
        .get("http://localhost:3000/api/recipe/" + recipeId)
        .then(function(response) {
          that.recipe = response.data[0];
          that.setDisplayMeasures();
          that.setDisplayAmounts();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    setImgSrc: function(recipeId) {
      this.imgSrc = "http://localhost:3000/" + recipeId + ".jpg";
    },
    editRecipe: function() {
      this.$router.push({ path: `/recipes/edit/${this.recipe.id}` });
    },
    calculatePortionValues(nPortions) {
      this.calculateNutritionValues(nPortions);
      this.calculateIngredientAmounts(nPortions);
    },
    calculateNutritionValues(nPortions) {
      this.recipe.nutritionValues = this.recipe.nutritionValues.map(
        nutrient => {
          nutrient.totalValue = Math.round(
            parseInt(nutrient.valuePerPortion) * nPortions
          );
          return nutrient;
        }
      );
    },
    calculateIngredientAmounts(nPortions) {
      const DEFAULT_PORTIONS = 4;
      this.recipe.ingredients = this.recipe.ingredients.map(ingredient => {
        ingredient.displayAmount =
          (parseFloat(ingredient.defaultDisplayAmount) / DEFAULT_PORTIONS) *
          nPortions;

        ingredient.displayMeasure = ingredient.measure;
        return MeasureConverter.convertMeasure(ingredient);
      });
    },
    setDisplayMeasures() {
      for (let ingredient of this.recipe.ingredients) {
        ingredient.displayMeasure = ingredient.measure;
      }
    },
    setDisplayAmounts() {
      for (let ingredient of this.recipe.ingredients) {
        ingredient.displayAmount = ingredient.defaultDisplayAmount;
      }
    }
  },
  components: {
    IngredientsSection,
    RoundButton,
    NutritionTable
  },
  created() {
    let recipeId = this.$route.params.id;
    this.getRecipe(recipeId);
    this.setImgSrc(recipeId);
  }
};
</script>

<style scoped lang="less">
.line {
  min-height: 20px;
}
.recipe {
  margin: 30px 0 100px 0;
}
.title {
  font-size: 30px;
  text-align: center;
  margin-bottom: 40px;
  font-weight: 100;
}
.recipeContent {
  display: flex;
  justify-content: space-between;
}
.recipeImg {
  width: 30vw;
  height: 30vw;
  object-fit: cover;
  cursor: pointer;
}
.recipeInfo {
  margin-right: 50px;
}
.rightContainer {
  display: flex;
  flex-direction: column;
}
.editButton {
  align-self: flex-end;
  margin-top: 30px;
}
@media screen and (max-width: 700px) {
  .recipeContent {
    flex-direction: column-reverse;
  }
  .recipeImg {
    width: 60vw;
    height: 60vw;
    align-self: center;
  }
  .editButton {
    align-self: center;
    margin-bottom: 60px;
  }
  .recipeInfo {
    margin-right: 0px;
    align-self: center;
  }
}
@media screen and (max-width: 600px) {
  .recipeImg {
    width: 80vw;
    height: 80vw;
  }
}
</style>
