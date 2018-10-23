<template>
  <div class="addRecipeForm">
    <div class="flex-row">
      <input class="recipeTitle" v-model="recipe.title" type="text" placeholder="Lägg till en titel"/>
      <category-picker class="pointer" v-bind:setCategories="setCategories" /> 
    </div>
    <div class="header">(Receptets ingredienser ska motsvara 4 portioner)</div>
    <ingredient-comp v-for="(ingredient, index) in recipe.ingredients" v-bind:key="index" v-bind:index="index" 
      v-bind:ingredient="ingredient" v-bind:removeThisIngredientComp="removeThisIngredientComp"/>
    <round-button v-bind:buttonFunction="addIngredientComp" v-bind:text="newIngredientButtonText"/>
    <div class="imgUploadContainer">
      <label class="custom-file-upload">
        <div>Ladda upp bild</div>
        <input class="imgUpload" name="file" type="file" id="file" ref="files" multiple v-on:change="handleFilesUpload()"/>
      </label>
      <span v-if="file.name" id="file-selected">Vald bild: {{file.name}}</span>
      <div class="removeFileContainer" v-if="file.name">
        <img class="remove" src="/remove.png" @click="removeFile()"/>
      </div>
    </div>
    <textarea class="description" v-model="recipe.description" placeholder="Lägg till beskrivning"></textarea>
    <div class="buttonsContainer">
      <round-button class="removeButton" v-if="edit" v-bind:buttonFunction="removeRecipe" v-bind:text="removeButtonText"/>
      <round-button class="saveButton" v-bind:buttonFunction="validate" v-bind:text="saveButtonText"/>
    </div>
  </div>
</template>


<script src="./add-recipe-page.js"></script>
<style coped lang="less" src="./add-recipe-page.less"></style>
