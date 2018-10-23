<template>
  <div class="addIngredientContainer" v-click-outside="hideSearchResults">
    <div class="searchContainer">
      <div class="ingredientContainer">
        <input class="searchInput" v-model="ingredient.searchWord" type="text" placeholder="Lägg till ingrediens" @keyup="searchForIngredient"/>
        <div class="searchHitsContainer" v-bind:class="{ hide: !searchVisible || filteredSearchHits.length === 0 || ingredient.searchWord.length < 2}">
          <transition-group name="fade" tag="div">
            <search-hit-comp v-for="(food, index) in filteredSearchHits" v-bind:key="index" v-bind:selectFood="selectFood" v-bind:food="food"/>
          </transition-group>
        </div>
        <transition name="fade" mode="out-in">
          <div class="noMatch" v-if="noMatch && searchVisible">Inga träffar ..</div>
        </transition>
      </div>
      <input class="searchInput" v-model="ingredient.displayName" type="text" placeholder="Visningsnamn"/>
      <input class="searchInput" v-model="ingredient.amountInGrams" type="text" placeholder="Vikt i gram" @keypress="validateInput"/>
      <input class="searchInput" v-model="ingredient.defaultDisplayAmount" type="text" placeholder="Visningmått" @keypress="validateInput"/>
      <select class="measurements" v-model="ingredient.measure">
        <option v-for="(measure, index) in measurements" v-bind:key="index">{{measure}}</option>
      </select>
      <div class="removeContainer">
        <img class="remove" src="/remove.png" @click="removeThisIngredientComp(index)"/>
      </div>
    </div>
  </div>
</template>

<script>
import SearchHitComp from "./search-hit-comp.vue";
import axios from "axios";
import Recipe from "../helpers/recipe.js";

export default {
  name: "AddIngredientComp",
  data() {
    return {
      NULLCHAR: 0,
      BACKSPACE: 8,
      ENTER: 13,
      ZERO: 48,
      NINE: 57,
      DECIMAL: 46,
      allSearchHits: [],
      filteredSearchHits: [],
      noMatch: false,
      searchVisible: true,
      measurements: [
        "st",
        "l",
        "dl",
        "cl",
        "ml",
        "msk",
        "tsk",
        "krm",
        "kg",
        "hg",
        "g"
      ]
    };
  },
  props: {
    ingredient: Object,
    removeThisIngredientComp: Function,
    index: Number
  },
  methods: {
    hideSearchResults() {
      this.searchVisible = false;
    },
    validateInput: function(e) {
      const isValidKeyPress =
        [this.BACKSPACE, this.NULLCHAR, this.ENTER].includes(e.which) ||
        (e.which >= this.ZERO && e.which <= this.NINE) ||
        e.which === this.DECIMAL;

      if (!isValidKeyPress) {
        e.preventDefault();
      }
      return isValidKeyPress;
    },
    searchForIngredient: function() {
      const SEARCHWORD_LENGHT = this.ingredient.searchWord.length;
      const that = this;
      if (SEARCHWORD_LENGHT >= 2 && this.allSearchHits.length === 0) {
        axios
          .get(
            "http://localhost:3000/api/food/find/" + this.ingredient.searchWord
          )
          .then(function(response) {
            that.allSearchHits = response.data;
            that.filteredSearchHits = that.allSearchHits;
            that.noMatch =
              that.allSearchHits.length === 0 &&
              that.ingredient.searchWord.length > 1;
            that.searchVisible = that.ingredient.searchWord.length > 1;
          })
          .catch(function(error) {
            console.log(error);
          });
      } else if (SEARCHWORD_LENGHT >= 2) {
        const that = this;

        this.filteredSearchHits = this.allSearchHits.filter(food =>
          food.Namn.toLowerCase().includes(
            that.ingredient.searchWord.toLowerCase()
          )
        );
        this.noMatch =
          this.filteredSearchHits.length === 0 &&
          this.ingredient.searchWord.length > 1;
        this.searchVisible = this.ingredient.searchWord.length > 1;
      } else if (SEARCHWORD_LENGHT === 1) {
        this.allSearchHits = [];
        this.filteredSearchHits = [];
        this.noMatch = false;
      }
    },
    selectFood: function(food) {
      this.ingredient.searchWord = food.Namn;
      this.ingredient.nutritionValues = Recipe.getNewNutritionValues();
      let nutrients = food.Naringsvarden.Naringsvarde;

      this.ingredient.nutritionValues = this.ingredient.nutritionValues.map(
        nutrient => {
          let newNutrient = nutrients.filter(
            n => n.Forkortning === nutrient.short
          );
          nutrient.valuePer100 = newNutrient[0].Varde;

          return nutrient;
        }
      );

      this.allSearchHits = [];
      this.filteredSearchHits = [];
      this.noMatch = false;
    }
  },
  components: {
    SearchHitComp
  },
  created() {
    this.ingredient.measure =
      this.ingredient.measure === "" ? "g" : this.ingredient.measure;
  }
};
</script>

<style scoped lang="less">
@light-grey: rgb(218, 218, 218);
@border-grey: rgb(197, 197, 197);

.hide {
  display: none !important;
}
.addIngredientContainer {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}
.measurements {
  height: 35px;
  font-size: 16px;
  background-color: white;
  border: 1px solid @border-grey;
}
.removeContainer {
  width: 35px;
  height: 35px;
  display: flex !important;
  justify-content: center;
  align-items: center;
}
.remove {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.ingredientContainer {
  position: relative;
}
.searchHitsContainer {
  display: flex;
  flex-direction: column;
  width: 260px;
  border: 1px solid @light-grey;
  max-height: 280px;
  position: absolute;
  top: 35px;
  background-color: white;
  color: black;
  z-index: 999;
  overflow: scroll;
  -webkit-box-shadow: 0px 3px 13px 1px rgba(0, 0, 0, 0.26);
  -moz-box-shadow: 0px 3px 13px 1px rgba(0, 0, 0, 0.26);
  box-shadow: 0px 3px 13px 1px rgba(0, 0, 0, 0.26);
}
.noMatch {
  -webkit-box-shadow: 0px 3px 13px -3px rgba(0, 0, 0, 0.26);
  -moz-box-shadow: 0px 3px 13px -3px rgba(0, 0, 0, 0.26);
  box-shadow: 0px 3px 13px -3px rgba(0, 0, 0, 0.26);
  width: 260px;
  height: 35px;
  border: 1px solid @light-grey;
  color: rgb(179, 179, 179);
  font-size: 14px;
  display: flex;
  align-items: center;
  padding-left: 5px;
  background-color: white;
  position: absolute;
  top: 35px;
}
.fade-enter-active,
.fade-leave-active {
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
  max-height: 35px;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  max-height: 0px;
}
.searchContainer {
  display: flex;
  justify-content: space-between;
}
.searchInput {
  width: 18vw;
  height: 35px;
  font-family: "Lora", serif;
  font-size: 18px;
  padding: 5px;
  border: 1px solid @border-grey;
  border-radius: 5px;
  margin-right: 5px;
}
@media screen and (max-width: 1130px) {
  .searchInput {
    width: 17vw;
    height: 35px;
  }
}
@media screen and (max-width: 900px) {
  .searchContainer {
    display: grid;
    grid-template-columns: repeat(3, 26vw);
    column-gap: 1vw;
    grid-row-gap: 1vw;
  }
  .searchInput {
    width: 26vw;
    margin-right: 0px;
  }
}
@media screen and (max-width: 600px) {
  .searchContainer {
    grid-template-columns: repeat(3, 29vw);
    column-gap: 1.5vw;
  }
  .searchInput {
    width: 29vw;
  }
}
@media screen and (max-width: 530px) {
  .searchContainer {
    grid-template-columns: repeat(2, 44vw);
    column-gap: 2vw;
  }
  .searchInput {
    width: 44vw;
  }
}
@media screen and (max-width: 350px) {
  .searchInput {
    width: 44vw;
    font-size: 15px;
  }
}
</style>
