<template>
  <div class="searchContainer">
    <input class="searchInput" v-model="searchWord" type="text" placeholder="Sök efter recept" @keyup.enter="searchRecipes()"/>
    <round-button class="searchButton" v-bind:buttonFunction="searchRecipes" v-bind:text="buttonText"/>
  </div>
</template>

<script>
import RoundButton from "./round-button.vue";

export default {
  name: "SearchRecipeField",
  data() {
    return {
      buttonText: "SÖK",
      searchWord: "",
      allSearchHits: [],
      filteredSearchHits: []
    };
  },
  methods: {
    searchRecipes() {
      if (this.searchWord === "") {
        alert("Du har inte fyllt i någon söktext!");
      } else {
        this.$router.push({ path: `/search/${this.searchWord}` });
      }
    }
  },
  components: {
    RoundButton
  }
};
</script>

<style scoped lang="less">
.searchContainer {
  display: flex;
}
.searchInput {
  width: 300px;
  height: 40px;
  padding: 5px;
  font-family: "Lora", serif;
  font-size: 18px;
  border-radius: 5px;
  border: 1px solid rgb(197, 197, 197);
}
.searchButton {
  margin-left: 30px;
}
@media screen and (max-width: 992px) {
  .searchContainer {
    width: 100%;
    justify-content: center;
    margin-bottom: 50px;
  }
}
</style>
