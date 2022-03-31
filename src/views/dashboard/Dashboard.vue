<template>
  <!-- 个人系统首页 页面显示个人信息、组织内公告、入党流程
  仪表盘（常规信息、快捷入口、入党流程图、快捷按钮（发布活动、发布信息）） -->
  <el-row :gutter="15">
    <!-- 个人信息 -->
    <el-col :span="14">
      <el-card shadow="hover">
        <template #header>
          <el-row :gutter="24"
                  style="text-align: left;line-height: 0px;">
            <el-col :span="20">
              <div class="card-header"
                   style="text-align: left;line-height: 0px;">
                <el-icon>
                  <postcard />
                </el-icon>
                个人基本资料
              </div>
            </el-col>
            <el-col :span="4">
              <router-link to="/owner/info"
                           style="display:block; text-align: right;font-size: 13px;line-height: 13px; color: #a48888;">
                更多</router-link>
            </el-col>
          </el-row>

        </template>
        <div>个人信息</div>

      </el-card>
    </el-col>
    <!-- 新闻公告 -->
    <el-col :span="10">

      <el-card shadow="hover">
        <template #header>
          <el-row :gutter="24"
                  style="text-align: left;line-height: 0px;">
            <el-col :span="20">
              <div class="card-header"
                   style="text-align: left;line-height: 0px;">
                <el-icon>
                  <chat-line-square />
                </el-icon>
                新闻公告
              </div>
            </el-col>
            <el-col :span="4">
              <router-link to="/event/information"
                           style="display:block; text-align: right;font-size: 13px;line-height: 13px; color: #a48888;">
                更多</router-link>
            </el-col>
          </el-row>

        </template>
        <div>新闻公告</div>
      </el-card>
    </el-col>
  </el-row>

  <!-- 入党流程 -->
  <el-card shadow="never"
           class="box-card ">
    <template #header>
      <div class="card-header"
           style="text-align: left;line-height: 0px;">
        <el-icon>
          <aim />
        </el-icon>
        入党流程
      </div>
    </template>
  </el-card>

</template>

<script>
import { reactive, onMounted, toRefs } from "vue";
export default {
  name: "Dashbroad",
  setup() {
    const state = reactive({
      usereData: {
        realName: "liu",
        clazz: "",
        number: "", //学号
        phone: "", //手机号
        beActivistDate: "", //成为积极分子的时间
      },
    });
    return {
      ...toRefs(state), //toRefs将对象中的内容转换为响应式数据
    };
  },
};
</script>

<style scoped>
.card-main {
  display: flex;
  width: 40%;
  justify-content: center;
  /* margin: 0px; */
  /* justify-content: space-around; */
  /* margin-top: 10px; */
}
</style>