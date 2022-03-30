<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="(item,index) in breadList"
                        :key="index">{{item.name}}</el-breadcrumb-item>   <!--  :to="{ path: item.path }" -->
                      
  </el-breadcrumb>
</template>

<script>
// https://www.jb51.net/article/164318.htm
export default {
  name: "BreadCrumb",
  data() {
    return {
      breadList: [], // 路由集合
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    },
  },
  methods: {
    isHome(route) {
      // return route.name === "home";
    },
    getBreadcrumb() {
      let matched = this.$route.matched;
      //如果不是首页
      if (!this.isHome(matched[0])) {
        // matched = [{ path: "/home", meta: { title: "首页" } }].concat(matched); // 源代码，需要修改
      }
      this.breadList = matched;
    },
  },
  created() {
    this.getBreadcrumb();
  },

};
</script>

<style>
</style>