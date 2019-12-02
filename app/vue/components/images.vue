<template>
  <h1>H1 Message {{ message }}</h1>
  <ul>
    <li style="background-image: url(/img/001.jpg);"></li>
    <li style="background-image: url(/img/002.jpg);"></li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      message: null
    };
  },
  created() {
    this.message = "Heloo images!!!";
  }
};
</script>

<style>
</style>