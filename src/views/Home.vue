<template>
  <iframe src="../../home/Home.html" frameborder="0" style="width: 100%;height: 943px"/>
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
      // load();
    });
  }
}
</script>

<style>
</style>