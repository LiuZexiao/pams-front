<template>
  <el-header>
    <!--    <div class="header-div">-->
    <!--      <img class="header-logo"-->
    <!--           src="../../assets/dh1024.png"-->
    <!--           alt="logo" />-->
    <!--      <span>-->
    <!--      <router-link to="/"> 党务系统</router-link>-->
    <!--      </span>-->
    <!--    </div>-->
    <div class="header-menu">
      <el-dropdown>
          <span class="el-dropdown-link">
            <a href="/owner/info" target="_blank">
               <el-avatar
                   :size="50"
                   src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
               />
            </a>
          </span>
        <template #dropdown>
          <el-dropdown-menu>
            <a href="/owner/info" target="_blank">
              <el-dropdown-item>个人中心</el-dropdown-item>
            </a>
            <a href="/owner/account" target="_blank">
              <el-dropdown-item>账号中心</el-dropdown-item>
            </a>
            <el-dropdown-item divided>
              <el-link :underline="false"
                       style="font-size: 10px;"
                       @click="loginout">
                <switch-button width="17px" style="vertical-align: middle;"/>
                退出
              </el-link>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script>
export default {
  name: "nav"
}
</script>

<style scoped>
body {
  margin: 0;
}

.header-div {
  top: 50%;
  left: 20%;
  position: absolute;
  transform: translate(-50%, -50%);

  color: #e9eef3;
  /* weight: 500; */
  font-size: 20px;
  /* position: absolute; */
}

.header-div img {
  vertical-align: middle;
  width: 45px;
  height: 45px;

  /*position: absolute; */

  /*  transform: translate(-50%, -50%); */
}

.header-menu {
  top: 50%;
  right: 10%;
  position: absolute;
  transform: translate(-50%, -50%);

  color: #e9eef3;
  /* weight: 500; */
  font-size: 10px;
  /* position: absolute; */

  display: flex;
}
</style>