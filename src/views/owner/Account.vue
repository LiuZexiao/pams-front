<template>
  <el-row :gutter="15"
          style="margin: 3% 12% 0 12%">
    <!-- 账号信息、修改密码、绑定邮件、绑定手机 -->
    <!-- 个人信息 -->
    <el-col :span="8">
      <el-card shadow="hover"
               style="height: 100px">
        <el-avatar class="logo"
                   :size="90"
                   style="margin-bottom:5px;"
                   :src="account.avatar ? account.avatar : 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'" />
        <div class="name-title">{{ account.username }}</div>
        <span v-for="role in userRoles">
          <el-tag type="info">{{ role.name }}</el-tag>&nbsp;
        </span>

      </el-card>
      <!-- 导航 -->
      <el-card shadow="hover"
               class="box-card "
               style="margin-top: 6% ">
        <el-menu :default-active="activePath"
                 class="el-menu-vertical-demo"
                 router>
          <el-menu-item index="/owner/account/updateAccount" @click="saveNavPath('/owner/account/updateAccount')">
            <template #title>
              <el-icon>
                <user-filled />
              </el-icon>
              <span>账号信息</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/owner/account/updatePassword" @click="saveNavPath('/owner/account/updatePassword')">
            <el-icon>
              <key />
            </el-icon>
            <span>修改密码</span>
          </el-menu-item>
          <el-menu-item index="/owner/account/updateEmail" @click="saveNavPath('/owner/account/updateEmail')">
            <el-icon>
              <document />
            </el-icon>
            <span>绑定邮件</span>
          </el-menu-item>
          <el-menu-item index="/owner/account/updatePhone" @click="saveNavPath('/owner/account/updatePhone')">
            <el-icon>
              <setting />
            </el-icon>
            <span>绑定手机</span>
          </el-menu-item>
        </el-menu>
      </el-card>
    </el-col>
    <!--具体信息 -->
    <el-col :span="16">
      <el-card shadow="hover"
               style="">
        <router-view></router-view>
      </el-card>
    </el-col>
  </el-row>

</template>

<script>
import { reactive, onMounted, toRefs } from "vue";

export default {
  name: "Account",
  setup() {
    const state = reactive({
      editVisible: false,
      account: {},
      userRoles: []
    });

    onMounted(() => {
      // 加载页面时执行
      state.account = JSON.parse(localStorage.getItem("account"))
      state.userRoles = JSON.parse(localStorage.getItem("userRoles"))
    });

    // 保存链接的激活状态
    function saveNavPath(activePath) {
      localStorage.setItem("activePath", activePath);
      state.activePath = activePath;
    }

    return {
      ...toRefs(state), //toRefs将对象中的内容转换为响应式数据
      saveNavPath
    };
  },
};
</script>

<style scoped>
.logo {
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: transparent;
  font-size: 14px;
  color: #383838;
  line-height: 20px;
  font-family: "Helvetica Neue", "PingFang SC", "Microsoft Yahei", 微软雅黑,
    STXihei, 华文细黑, sans-serif;
  box-sizing: border-box;
  display: inline-block;
  float: left;
  position: relative;
  background-position: center !important;
  background-repeat: no-repeat !important;
  background-size: cover !important;
  background-color: #ededed;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  margin-right: 15px;
  background-image: url(https://tcs.teambition.net/thumbnail/112241cfa9dd60f799a0ab1edbfe4861474a/w/200/h/200);
}
.name-title {
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: transparent;
  color: #383838;
  line-height: 20px;
  font-family: "Helvetica Neue", "PingFang SC", "Microsoft Yahei", 微软雅黑,
    STXihei, 华文细黑, sans-serif;
  box-sizing: border-box;
  font-size: 18px;
  font-weight: 600;
  margin-top: 6px;
  margin-bottom: 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>