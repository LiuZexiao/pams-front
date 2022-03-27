<template>
  
</template>

<script>
import { onMounted } from "vue";
function load(){
  window.location.href="../../home/Home.html";
}
export default {
  setup() {
    onMounted(() => {
      // 加载页面时执行
      load();
    });
  }
}
</script>

<style>

</style>