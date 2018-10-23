<template>
  <section class="searchPage">
    <search-recipe-field class="searchRecipeForm"/>
    <transition name="fade">
      <image-links v-bind:type="type" />
    </transition>
  </section>
</template>

<script>
import SearchRecipeField from "../components/search-recipe-field.vue";
import ImageLinks from "../components/image-links.vue";

export default {
  name: "MainSearchPage",
  data() {
    return {
      type: "categories"
    };
  },
  components: {
    SearchRecipeField,
    ImageLinks
  }
};
</script>

<style scoped lang="less">
.topSection {
  display: flex;
}
.searchPage {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.searchRecipeForm {
  margin: 30px 0 20px 0;
}
.noHitsText {
  width: 100%;
  text-align: center;
  font-size: 30px;
  color: rgb(175, 175, 175);
  font-style: italic;
}
</style>
