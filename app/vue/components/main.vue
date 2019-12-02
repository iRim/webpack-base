<template>
  <div class="wrapper">
    <h1>webpack {{ message }}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: null
    };
  },
  created() {
    this.message = this.$store.getters.getMessage;
  }
};
</script>

<style></style>
