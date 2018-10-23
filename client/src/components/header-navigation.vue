<template>
  <nav class="headNav">
    <div class="fullMenu">
      <router-link class="pointer noselect headNavLink" to="/">Hitta recept</router-link>
      <router-link class="pointer noselect headNavLink" v-if="loggedIn" to="/recipes/add">Lägg till recept</router-link>
      <router-link class="pointer noselect headNavLink" v-if="loggedIn" to="/ingredients/add">Lägg till ingrediens</router-link>
      <router-link class="pointer noselect headNavLink" to="/contact">Kontakt</router-link>
    </div>
    <small-menu/>
  </nav>
</template>

<script>
import SmallMenu from "./small-menu.vue";

export default {
  name: "HeaderNavigation",
  computed: {
    loggedIn() {
      return this.$store.state.loggedIn;
    }
  },
  components: {
    SmallMenu
  }
};
</script>

<style scoped lang="less">
.headNav {
  font-size: 2.5vh;
  width: 100%;
  height: 5vh;
  color: white;
  display: flex;
  padding: 0 10vw 0 10vw;
  background-color: black;
}
.fullMenu {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.headNavLink {
  margin-bottom: 6px;
  text-decoration: none;
  color: white;
}
@media screen and (max-width: 600px) {
  .headNav {
    padding: 0 5vw 0 5vw;
  }
}
@media screen and (max-width: 480px) {
  .fullMenu {
    display: none;
  }
}
</style>
