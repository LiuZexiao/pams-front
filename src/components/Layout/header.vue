<template>
  <Nav />
  <router-view></router-view>
</template>

<script>
import Nav from "./compoents/nav.vue";
export default {
  name: "header",
  components: {Nav}
}
</script>

<style scoped>

</style>