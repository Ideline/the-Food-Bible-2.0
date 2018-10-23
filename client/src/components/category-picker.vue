<template>
  <div class="categoriesContainer" v-click-outside="hideAllCategories">
    <div class="chooseCategory noselect" @click="toggleMainCategories()">Välj kategorier</div>
    <div class="mainCategories" v-if="mainCategoriesShow">
      <div class="mainCategory" v-for="(mainCategory, index) in categories" v-bind:key="index" v-bind:mainCategory="mainCategory" @click="setMainCategory(mainCategory)">
        <div class="mainCategoryTitle noselect">{{mainCategory.title}}</div>
      </div>
    </div>
    <div class="subcategories" v-if="subCategoriesShow">
      <div class="subCategory" v-for="(category, index) in mainCategory.subCategories" v-bind:key="index" v-bind:category="category" @click="setCategories(mainCategory.subCategories[index].title)">
        <div class="noselect subCategoryTitle">{{mainCategory.subCategories[index].title}}
          <div class="check" v-if="markedCategories.includes(mainCategory.subCategories[index].title)"> ✓</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CategoryPicker",
  data() {
    return {
      mainCategory: "",
      mainCategoriesShow: false,
      subCategoriesShow: false
    };
  },
  props: {
    setCategories: Function
  },
  computed: {
    categories() {
      return this.$store.state.categories;
    },
    markedCategories() {
      return this.$store.state.markedCategories;
    }
  },
  methods: {
    hideAllCategories() {
      (this.mainCategoriesShow = false), (this.subCategoriesShow = false);
    },
    setMainCategory(mainCategory) {
      if (this.mainCategory === mainCategory) {
        this.toggleSubCategories();
      } else {
        this.mainCategory = mainCategory;
        this.subCategoriesShow = true;
      }
    },
    toggleMainCategories() {
      this.mainCategoriesShow = !this.mainCategoriesShow;
      if (!this.mainCategoriesShow) {
        this.subCategoriesShow = false;
      }
    },
    toggleSubCategories() {
      this.subCategoriesShow = !this.subCategoriesShow;
    }
  }
};
</script>

<style lang="less">
@border-grey: rgb(197, 197, 197);

.check {
  margin-left: 10px;
}
.subCategoryTitle {
  display: flex;
}
.subcategories {
  width: 200px;
  display: flex;
  flex-direction: column;
  position: absolute;
  left: -200px;
  top: 35px;
}
.subCategory {
  background: #bbb;
  height: 35px;
  width: 100%;
  padding: 5px;
}
.subCategory:hover {
  background: #999;
}
.mainCategories {
  width: 200px;
  flex-direction: column;
  position: absolute;
  top: 35px;
  display: flex;
}
.mainCategory {
  height: 35px;
  background: #ddd;
  display: block;
  text-decoration: none;
  color: #000;
}
.mainCategoryTitle {
  margin: 5px;
}
.mainCategory:hover {
  background: #bbb;
}
.categoriesContainer {
  position: relative;
  width: 200px;
  margin-left: 10px;
  font-size: 18px;
}
.chooseCategory {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 35px;
  width: 100%;
  border-radius: 5px;
  border: 1px solid @border-grey;
}
</style>
