<template>
  <header class="siteHeader">
    <div class="logout pointer" v-if="loggedIn" @click="logout()">Logga ut</div>
    <div class="logout pointer" v-if="!loggedIn" @click="login()">Logga in</div>
    <div class="title noselect">The Food Bible</div>
    <img class="headerImage noselect" src="/header-background.jpg"/>
    <header-navigation/>
  </header>
</template>

<script>
import HeaderNavigation from "./header-navigation.vue";

export default {
  name: "SiteHeader",
  computed: {
    loggedIn() {
      return this.$store.state.loggedIn;
    }
  },
  methods: {
    logout: function() {
      localStorage.setItem("foodBibleToken", "");
      this.$store.commit("setLoggedIn", false);
      this.$router.push({ path: `/` });
    },
    login: function() {
      this.$router.push({ path: `/login/` });
    }
  },
  components: {
    HeaderNavigation
  }
};
</script>

<style scoped lang="less">
.siteHeader {
  width: 100%;
  height: 24vh;
  flex-shrink: 0;
}
.headerImage {
  width: 100%;
  height: 19vh;
  object-fit: cover;
  object-position: 50% 80%;
}
.logout {
  color: white;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1000;
}
.title {
  width: 100vw;
  height: 19vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  position: absolute;
  font-size: 50px;
}
@media screen and (max-width: 450px) {
  .title {
    font-size: calc(38px + 2vw);
  }
}
</style>
