<template>
  <div class="smallMenu" @click="toggleMenu()" v-click-outside="hide">
    <img class="menuIcon" src="../../public/menu.png"/>
    <div class="linkPopUp" v-if="showSmallMenu">
      <router-link class="pointer noselect headNavLinkSmall" to="/">Hitta recept</router-link>
      <router-link class="pointer noselect headNavLinkSmall" to="/recipes/add">Lägg till recept</router-link>
      <router-link class="pointer noselect headNavLinkSmall" to="/ingredients/add">Lägg till ingrediens</router-link>
      <router-link class="pointer noselect headNavLinkSmall" to="/contact">Kontakt</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "SmallMenu",
  data() {
    return {
      showSmallMenu: false
    };
  },
  methods: {
    hide() {
      this.showSmallMenu = false;
    },
    toggleMenu() {
      this.showSmallMenu = !this.showSmallMenu;
    }
  }
};
</script>

<style scoped lang="less">
@hover-grey: rgb(241, 241, 241);
.smallMenu {
  display: none;
}
@media screen and (max-width: 480px) {
  .headNavLinkSmall {
    width: 200px;
    height: 35px;
    text-decoration: none;
    color: black;
    text-align: center;
    align-self: center;
    padding-top: 8px;
  }
  .headNavLinkSmall:hover {
    background-color: @hover-grey;
  }
  .smallMenu {
    width: 100%;
    display: flex;
    position: relative;
    height: 5vh;
    justify-content: center;
  }
  .menuIcon {
    margin-top: 0.5vh;
    width: 3vh;
    height: 3vh;
    object-fit: cover;
    cursor: pointer;
  }
  .linkPopUp {
    background-color: white;
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 35px;
    border: 1px solid lightgrey;
    z-index: 9999;
  }
}
</style>
