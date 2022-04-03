<template>
  <el-row :gutter="15"
          style="margin: 3% 12% 0 12%">
    <!-- 个人信息 -->
    <el-col :span="8">
      <el-card shadow="hover"
               style="height: 110px">
          <img class="header-logo" src="../../assets/dh1024.png" alt="logo" />
      </el-card>
      <!-- 导航 -->
      <el-card shadow="hover"
               class="box-card "
               style="margin-top: 6% ">

      </el-card>
    </el-col>
    <!--具体信息 -->
    <el-col :span="16">

      <el-card shadow="hover"
               style="height: 210px">

      </el-card>
    </el-col>
  </el-row>

</template>

<script>
export default {
  name: "Account",
};
</script>

<style scoped>


</style>