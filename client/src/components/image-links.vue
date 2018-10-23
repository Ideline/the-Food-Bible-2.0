<template>
  <div>
    <div class="imgLinkTable" v-if="array.length > 0">
      <div class="imgLinkTableRow">
        <div class="linkImgContainer" v-for="(item, index) in paginatedData" v-bind:key="index" v-bind:item="item" @click="onClick(item)">
          <div class="imgHeader">{{item.title}}</div>
          <img class="linkImg" v-if="type === 'categories' || type === 'subCategories'" v-bind:src="item.img" />
          <img class="linkImg" v-else-if="type === 'filteredRecipes' || type === 'searchResults'" v-bind:src="item.imgSrc" />
        </div>
      </div>
    </div>
    <div class="noHitsText" v-else>Inga träffar</div>
    <nav class="navButtons">
      <round-button class="navButton" :disabled="pageNumber === 0" v-bind:buttonFunction="prevPage" v-bind:text="prevPageText"/>
      <round-button class="navButton" :disabled="pageNumber >= pageCount - 1" v-bind:buttonFunction="nextPage" v-bind:text="nextPageText"/>
    </nav>
  </div>
</template>

<script>
import axios from "axios";
import RoundButton from "./round-button.vue";

export default {
  name: "ImageLinks",
  data() {
    return {
      prevPageText: "Föregående",
      nextPageText: "Nästa",
      array: [],
      pageNumber: 0,
      size: 6
    };
  },
  props: {
    type: String
  },
  computed: {
    searchHits() {
      return this.$store.state.searchHits;
    },
    pageCount() {
      return Math.ceil(this.array.length / this.size);
    },
    paginatedData() {
      const start = this.pageNumber * this.size,
        end = start + this.size;
      return this.array.slice(start, end);
    }
  },
  methods: {
    nextPage() {
      this.pageNumber++;
    },
    prevPage() {
      this.pageNumber--;
    },
    onClick: function(item) {
      if (this.type === "categories") {
        this.$router.push({ path: `/categories/${item.id}` });
      } else if (this.type === "subCategories") {
        this.$router.push({
          path: `/categories/${item.mainCategoryId}/subcategory/${item.id}`
        });
      } else if (
        this.type === "filteredRecipes" ||
        this.type === "searchResults"
      ) {
        this.$router.push({
          path: `/recipe/${item.id}`
        });
      }
    },
    getRecipe() {
      const that = this;
      const recipeIndex = 0;
      axios
        .get("http://localhost:3000/api/recipe/" + recipeIndex)
        .then(function(response) {
          that.$store.commit("setCurrentRecipe", response.data);
          that.showRecipe();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    showRecipe() {
      this.$store.dispatch("hideAll");
      this.$store.commit("setRecipePage", true);
    },
    searchSubCategory(category) {
      const that = this;

      axios
        .get("http://localhost:3000/api/recipes/category/find/" + category)
        .then(function(response) {
          that.getRecipeImages(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    searchRecipes(searchWord) {
      const that = this;

      axios
        .get("http://localhost:3000/api/recipes/find/" + searchWord)
        .then(function(response) {
          that.getRecipeImages(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getRecipeImages(response) {
      this.array = response.data.map(recipe => {
        recipe.imgSrc = "http://localhost:3000/" + recipe.id + ".jpg";
        return recipe;
      });
    },
    fetchData() {
      let mainCategoryId;
      switch (this.type) {
        case "categories": {
          this.array = this.$store.state.categories;
          break;
        }
        case "subCategories": {
          mainCategoryId = parseInt(this.$route.params.catId);
          let mainCategory = this.$store.state.categories.filter(
            category => category.id === mainCategoryId
          );
          this.array = mainCategory[0].subCategories;
          break;
        }
        case "filteredRecipes": {
          mainCategoryId = parseInt(this.$route.params.catId);
          const suCategoryId = parseInt(this.$route.params.subCatId);
          let subCategory = this.$store.state.categories.filter(
            category => category.id === mainCategoryId
          );
          let subCategoryTitle = subCategory[0].subCategories.filter(
            subCat => subCat.id === suCategoryId
          );
          this.searchSubCategory(subCategoryTitle[0].title);
          break;
        }
        case "searchResults": {
          let searchWord = this.$route.params.searchWord;
          this.searchRecipes(searchWord);
          break;
        }
      }
    }
  },
  components: {
    RoundButton
  },
  watch: {
    $route: "fetchData"
  },
  created() {
    this.fetchData();
  }
};
</script>

<style scoped lang="less">
.noHitsText {
  margin-top: 100px;
  margin-bottom: 200px;
  width: 100%;
  text-align: center;
  font-size: 30px;
  color: rgb(175, 175, 175);
  font-style: italic;
}
.imgLinkTable {
  display: flex;
  flex-direction: column;
  margin: 0 0 150px 0;
}
.navButtons {
  display: flex;
  width: 100%;
  justify-content: center;
}
.navButton:hover:disabled {
  cursor: not-allowed;
}
.active {
  -ms-transform: scale(0.98);
  -webkit-transform: scale(0.98);
  transform: scale(0.95);
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  transform-origin: center;
}
.navButton {
  margin: 0 30px 30px 30px;
}
.imgLinkTableRow {
  display: grid;
  grid-template-columns: repeat(3, 24vw);
  column-gap: 4vw;
  grid-row-gap: 5vw;
}
.linkImgContainer {
  width: 24vw;
  height: 60vh;
  display: flex;
  flex-direction: column;
}
.linkImg {
  width: 24vw;
  height: 24vw;
  object-fit: cover;
  cursor: pointer;
}
.imgHeader {
  width: 24vw;
  height: 10vh;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-size: calc(10px + 1vw);
  margin-bottom: 20px;
  cursor: pointer;
}
@media screen and (max-width: 992px) {
  .imgLinkTableRow {
    grid-template-columns: repeat(2, 35vw);
    column-gap: 10vw;
    grid-row-gap: 5vw;
  }
  .linkImgContainer {
    width: 35vw;
    height: 50vw;
  }
  .linkImg {
    width: 35vw;
    height: 35vw;
  }
  .imgHeader {
    width: 35vw;
    font-size: calc(10px + 1vw);
  }
}
@media screen and (max-width: 600px) {
  .imgLinkTableRow {
    grid-template-columns: repeat(2, 40vw);
  }
  .linkImgContainer {
    width: 40vw;
    height: 50vw;
  }
  .linkImg {
    width: 40vw;
    height: 40vw;
  }
  .imgHeader {
    width: 40vw;
    font-size: calc(15px + 1vw);
  }
}
@media screen and (max-width: 500px) {
  .imgLinkTableRow {
    grid-template-columns: repeat(1, 90vw);
  }
  .linkImgContainer {
    width: 90vw;
    height: 120vw;
  }
  .linkImg {
    width: 90vw;
    height: 90vw;
  }
  .imgHeader {
    width: 90vw;
    font-size: calc(18px + 1vw);
  }
  .navButton {
    margin: 0 15px 30px 15px;
  }
}
</style>
