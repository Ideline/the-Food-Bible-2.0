import CategoryPicker from "../../components/category-picker.vue";
import IngredientComp from "../../components/ingredient-comp.vue";
import RoundButton from "../../components/round-button.vue";
import Recipe from "../../helpers/recipe.js";
import axios from "axios";

export default {
    name: "AddRecipeForm",
    data() {
        return {
            removeButtonText: "Ta Bort Recept",
            saveButtonText: "Spara Recept",
            edit: false,
            newIngredientButtonText: "+ Ny Ingrediens",
            recipe: Recipe.getNewRecipe(),
            file: {},
            validFileExtensions: [".jpg", ".jpeg", ".bmp", ".gif", ".png"],
            errorArray: new Array()
        };
    },
    methods: {
        setCategories(sCategory) {
            if (!this.recipe.subCategories.includes(sCategory)) {
                this.recipe.subCategories.push(sCategory);
                this.$store.commit("setMarkedCategory", sCategory);
            } else {
                this.recipe.subCategories = this.recipe.subCategories.filter(
                    category => category !== sCategory
                );
                this.$store.commit("removeMarkedCategory", sCategory);
            }
        },
        handleFilesUpload() {
            this.file = this.$refs.files.files[0];
        },
        removeFile() {
            this.file = {};
        },
        addIngredientComp: function () {
            this.recipe.ingredients.push(Recipe.getNewIngredient());
        },
        removeThisIngredientComp: function (index) {
            this.recipe.ingredients;
            this.recipe.ingredients.splice(index, 1);
        },
        validate() {
            if (this.isRecipeDataValid()) {
                this.formatDescription();
                this.calculateNutritionValues();
                this.saveRecipe();
            } else {
                let message = "Receptet saknar: ";
                let error = "";
                error = this.errorArray.map(e => error + " " + e);
                alert(message + error);
                this.errorArray = new Array();
            }
        },
        isRecipeDataValid() {
            let valid = true;

            if (this.recipe.title === "") {
                valid = false;
                this.errorArray.push("titel");
            }
            if (this.recipe.subCategories.length === 0) {
                valid = false;
                this.errorArray.push("kategori");
            }
            if (this.recipe.ingredients.length == 0) {
                valid = false;
                this.errorArray.push("ingredienser");
            }
            for (let i = 0; i < this.recipe.ingredients.length; i++) {
                const ingredient = this.recipe.ingredients[i];

                if (
                    ingredient.defaultDisplayAmount === "" ||
                    ingredient.measure === "" ||
                    ingredient.displayName === "" ||
                    ingredient.amountInGrams === ""
                ) {
                    valid = false;
                    this.errorArray.push("ingrediensdetaljer");
                    break;
                }
            }
            if (document.getElementById("file").value === "") {
                valid = false;
                this.errorArray.push("bild");
            }
            if (this.recipe.description.length === 0) {
                valid = false;
                this.errorArray.push("beskrivning");
            }
            return valid;
        },
        formatDescription() {
            let formatedDescription = this.recipe.description.split(/\n/);
            let unnecessaryNewLines = true;

            while (unnecessaryNewLines) {
                const LAST_INDEX = formatedDescription.length - 1;

                if (formatedDescription[LAST_INDEX] === "") {
                    formatedDescription.splice(LAST_INDEX);
                } else {
                    unnecessaryNewLines = false;
                }
            }
            this.recipe.description = formatedDescription;
        },
        calculateNutritionValues() {
            const DEFAULT_PORTIONS = 4;
            this.recipe.nutritionValues = Recipe.getNewNutritionValues();

            for (let ingredient of this.recipe.ingredients) {
                let ingredientNutrients = ingredient.nutritionValues;

                this.recipe.nutritionValues = this.recipe.nutritionValues.map(
                    nutrient => {
                        let newNutrient = ingredientNutrients.filter(
                            n => n.short === nutrient.short
                        );
                        let valuePer100 = newNutrient[0].valuePer100;
                        let weightInGrams = ingredient.amountInGrams;
                        nutrient.valuePerPortion += Math.round(
                            parseInt(valuePer100) *
                            (parseInt(weightInGrams) / DEFAULT_PORTIONS / 100)
                        );
                        nutrient.totalValue += Math.round(
                            parseInt(valuePer100) * DEFAULT_PORTIONS
                        );
                        return nutrient;
                    }
                );
            }
        },
        saveRecipe() {
            const that = this;
            let formData = new FormData();

            formData.append("file", this.file);
            formData.append("recipe", JSON.stringify(this.recipe));
            if (this.edit) {
                axios
                    .post("http://localhost:3000/api/recipe/edit", formData, {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    })
                    .then(function () {
                        console.log("SUCCESS!!");
                        that.removeFile();
                        that.$store.commit("resetMarkedCategories");
                        that.edit = false;
                        that.$router.push({ path: `/recipes/add` });
                    })
                    .catch(function () {
                        console.log("FAILURE!!");
                    });
            } else {
                axios
                    .post("http://localhost:3000/api/recipe/add", formData, {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    })
                    .then(function () {
                        console.log("SUCCESS!!");
                        that.recipe = Recipe.getNewRecipe();
                        that.removeFile();
                        that.$store.commit("resetMarkedCategories");
                    })
                    .catch(function () {
                        console.log("FAILURE!!");
                    });
            }
        },
        removeRecipe() {
            const that = this;
            let remove = confirm("Är du säker på att du vill ta bort receptet?");
            if (remove) {
                axios
                    .get("http://localhost:3000/api/recipe/" + that.recipe.id + "/remove")
                    .then(function (response) {
                        console.log(response);
                        alert("Du tog bort receptet!");
                        that.$router.push({ path: `/recipes/add` });
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        },
        getRecipe(recipeId) {
            const that = this;
            axios
                .get("http://localhost:3000/api/recipe/" + recipeId)
                .then(function (response) {
                    that.recipe = response.data[0];
                    that.fixMarkedCategories();
                    that.reFormatDescription();
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        fixMarkedCategories() {
            this.$store.commit("resetMarkedCategories");
            for (let category of this.recipe.subCategories) {
                this.$store.commit("setMarkedCategory", category);
            }
        },
        reFormatDescription() {
            let formatedDescription = "";
            for (let line of this.recipe.description) {
                formatedDescription += line + "\n";
            }
            this.recipe.description = formatedDescription;
        },
        clearPage() {
            this.recipe = Recipe.getNewRecipe();
            this.$store.commit("resetMarkedCategories");
            this.edit = false;
        }
    },
    components: {
        CategoryPicker,
        IngredientComp,
        RoundButton
    },
    watch: {
        $route: "clearPage"
    },
    created() {
        if (this.$route.params.recipeId) {
            let recipeId = this.$route.params.recipeId;
            this.edit = true;
            this.getRecipe(recipeId);
        }
    }
};