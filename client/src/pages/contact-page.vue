<template>
  <div class="contactContainer">
    <div>Recept & Näring</div>
    <div class="sub">Jörgen Kocksgatan 7</div>
    <div class="sub">211 20 Malmö</div>
    <div class="sub">tfn. 040-123 456</div>
    <div class="sub">epost: kontakt@recept_naring.se</div>
  </div>
</template>

<script>
export default {
  name: "ContactPage"
};
</script>

<style scoped lang="less">
.contactContainer {
  font-family: "Lora", serif;
  font-style: italic;
  margin-top: 20vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 25px;
}
.contactContainer div {
  margin: 5px;
}
.sub {
  font-size: 20px;
}
</style>
