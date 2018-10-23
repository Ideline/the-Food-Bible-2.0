<template>
  <div id="app" class="black">
    <site-header v-bind:key="header" v-if="routerPath !== '/login/'"/>
    <main v-bind:key="main" v-bind:class="{'loginPageMain': routerPath === '/login/'}">
    <!-- <transition name="fade"> -->
      <router-view></router-view>
    <!-- </transition> -->
    </main>
    <site-footer v-bind:key="footer" v-if="routerPath !== '/login/'"/>
  </div>
</template>

<script>
import SiteHeader from "./components/site-header.vue";
import SiteFooter from "./components/site-footer.vue";
import axios from "axios";

export default {
  name: "app",
  data() {
    return {
      header: "site-header",
      main: "main",
      footer: "site-footer"
    };
  },
  methods: {
    validateToken() {
      const that = this;
      axios
        .get("http://localhost:3000/api/token")
        .then(function() {
          that.$store.commit("setLoggedIn", true);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  computed: {
    routerPath() {
      return this.$route.path;
    }
  },
  components: {
    SiteHeader,
    SiteFooter
  },
  created() {
    this.validateToken();
  }
};
</script>

<style lang="less">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
body {
  font-family: "Lora", serif;
}
.loginPageMain {
  padding: 0;
  height: 100vh;
  overflow: hidden;
}
main {
  padding: 0 10vw 0 10vw;
  height: 68vh;
  flex-grow: 1;
  overflow: auto;
  min-height: 2em;
  background-color: white;
  background-size: cover;
}
.black {
  background-color: black;
}
.noselect {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.pointer {
  cursor: pointer;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
@media screen and (max-width: 600px) {
  main {
    padding: 0 5vw 0 5vw;
  }
}
</style>
