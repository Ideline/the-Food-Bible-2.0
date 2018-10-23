<template>
    <div class="loginPage">
        <img class="loginBackground" src="/login-background.jpg" />
        <form class="loginForm">
          <div class="loginInputField">
            <input class="loginInput" v-model="password" type="password" @keyup.enter="login()"/>
            <div class="errorMessage noselect" v-if="showErrorMessage">Fel lösenord!</div>
          </div>
          <round-button class="loginButton pointer" type="submit" v-bind:text="buttonText" v-bind:buttonFunction="login"/>
        </form>
    </div>
</template>

<script>
import axios from "axios";
import RoundButton from "../components/round-button.vue";

export default {
  name: "LoginPage",
  data() {
    return {
      password: "",
      buttonText: "Logga in",
      showErrorMessage: false
    };
  },
  methods: {
    login: function() {
      const that = this;
      axios
        .post("http://localhost:3000/api/login", { password: this.password })
        .then(function(response) {
          const jwt = response.data.jwt;
          localStorage.setItem("foodBibleToken", jwt);
          that.$store.commit("setLoggedIn", true);
          that.$router.push({ path: `/` });
          that.showErrorMessage = false;
        })
        .catch(function(error) {
          that.showErrorMessage = true;
          console.log(error);
        });
    }
  },
  components: {
    RoundButton
  }
};
</script>

<style scoped lang="less">
.loginPage {
  width: 100vw;
  height: 100vh;
}
.loginBackground {
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  object-position: 50% 40%;
  transition: opacity 0.5s ease;
}
.loginInput {
  width: 250px;
  height: 40px;
  padding: 5px;
  font-size: 15px;
  border-radius: 5px;
  position: relative;
}
.loginButton {
  margin-left: 10px;
  margin-bottom: 0 !important;
  -webkit-box-shadow: 10px 10px 5px -6px rgba(0, 0, 0, 0.75) !important;
  -moz-box-shadow: 10px 10px 5px -6px rgba(0, 0, 0, 0.75) !important;
  box-shadow: 10px 10px 5px -6px rgba(0, 0, 0, 0.75) !important;
}
.loginForm {
  height: 60px;
  width: 100vw;
  display: flex;
  justify-content: center;
  position: absolute;
  top: 50vh;
  transform: translate(50);
}
.loginInputField {
  position: relative;
}
.errorMessage {
  font-size: 30px;
  text-shadow: 4px 4px 2px rgb(0, 0, 0);
  color: white;
  width: 100%;
  height: 50px;
  z-index: 9999;
  text-align: center;
}
@media screen and (max-width: 500px) {
  .loginForm {
    flex-direction: column;
    height: 150px;
    align-items: center;
    top: 40vh;
  }
  .loginButton {
    margin-left: 0;
    margin-top: 10px;
  }
  .loginInputField {
    display: flex;
    flex-direction: column-reverse;
  }
}
</style>
