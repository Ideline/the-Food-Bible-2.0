<template>
  <form class="ingredientForm">
    <input class="ingredientName" v-model="ingredientName" type="text" placeholder="Lägg till ett livsmedelsnamn"/>
    <div class="nutritionGrid">
      <input class="nutritionInput" v-for="(nutrient, index) in nutritionValues" v-bind:key="index" v-model="nutrient.value" type="text" v-bind:placeholder="nutrient.name" @keypress="validateInput"/>
    </div>
    <round-button class="addButton" v-bind:buttonFunction="saveIngredient" v-bind:text="saveButtonText"/>
  </form>
</template>

<script>
import Recipe from "../helpers/recipe.js";
import RoundButton from "../components/round-button.vue";
import axios from "axios";

export default {
  name: "AddIngredientsPage",
  data() {
    return {
      ingredientName: "",
      nutritionValues: Recipe.getNewNutritionValues(),
      NULLCHAR: 0,
      BACKSPACE: 8,
      ENTER: 13,
      ZERO: 48,
      NINE: 57,
      saveButtonText: "Spara ingrediens",
      errorArray: new Array()
    };
  },
  methods: {
    validateInput: function(e) {
      const isValidKeyPress =
        [this.BACKSPACE, this.NULLCHAR, this.ENTER].includes(e.which) ||
        (e.which >= this.ZERO && e.which <= this.NINE);

      if (!isValidKeyPress) {
        e.preventDefault();
      }
      return isValidKeyPress;
    },
    saveIngredient() {
      const that = this;
      if (this.isIngredientDataValid()) {
        axios
          .post("http://localhost:3000/api/ingredients/add", {
            ingredientName: that.ingredientName,
            nutritionValues: that.nutritionValues
          })
          .then(function() {
            console.log("SUCCESS!!");
            that.clearPage();
            that.$router.push({ path: `/ingredients/add` });
          })
          .catch(function() {
            console.log("FAILURE!!");
          });
      } else {
        let message = "Ingrediensen saknar: ";
        let error = "";
        error = this.errorArray.map(e => error + " " + e);
        alert(message + error);
        this.errorArray = new Array();
      }
    },
    isIngredientDataValid() {
      let valid = true;

      if (this.ingredientName === "") {
        this.errorArray.push("ingrediensnamn");
        valid = false;
      }

      for (let nutrient of this.nutritionValues) {
        if (nutrient.value === undefined) {
          this.errorArray.push(nutrient.name);
          valid = false;
        }
      }
      return valid;
    },
    clearPage() {
      this.ingredientName = "";
      this.nutritionValues = Recipe.getNewNutritionValues();
    }
  },
  components: {
    RoundButton
  }
};
</script>

<style scoped lang="less">
@border-grey: rgb(197, 197, 197);
.ingredientForm {
  display: flex;
  flex-direction: column;
  margin: 50px 0 50px 0;
  align-items: center;
}
.ingredientName {
  width: 300px;
  height: 35px;
  font-family: "Lora", serif;
  font-size: 18px;
  padding: 5px;
  border: 1px solid @border-grey;
  border-radius: 5px;
  margin-bottom: 8vh;
}
.nutritionInput {
  font-family: "Lora", serif;
  font-size: 18px;
  padding: 5px;
  border: 1px solid @border-grey;
  border-radius: 5px;
  height: 35px;
  width: 150px;
}
.nutritionGrid {
  display: grid;
  grid-template-columns: repeat(4, 150px);
  column-gap: 5vw;
  grid-row-gap: 2vw;
}
.addButton {
  margin-top: 4vw;
  font-size: 18px;
  align-self: center;
}
@media screen and (max-width: 950px) {
  .nutritionGrid {
    grid-template-columns: repeat(3, 150px);
  }
}
@media screen and (max-width: 650px) {
  .nutritionGrid {
    grid-template-columns: repeat(2, 150px);
  }
}
@media screen and (max-width: 350px) {
  .nutritionGrid {
    grid-template-columns: repeat(1, 150px);
  }
  .ingredientName {
    width: 90vw;
  }
}
</style>
