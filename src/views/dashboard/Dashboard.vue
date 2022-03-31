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
        <!-- <div>个人信息</div> -->
        <div class="big-box">
          <div class="base-box">
            <div class="base-lab">姓名</div>
            <span class="base-info">{{usereData.realName}}</span>
          </div>
          <div class="base-box">
            <div class="base-lab">班级</div>
            <span class="base-info">{{usereData.clazz}}</span>
          </div>
        </div>
         <div class="big-box">
          <div class="base-box">
            <div class="base-lab">学号</div>
            <span class="base-info">{{usereData.number}}</span>
          </div>
          <div class="base-box">
            <div class="base-lab">电话</div>
            <span class="base-info">{{usereData.phone}}</span>
          </div>
        </div>
         <div class="big-box">
          <div class="base-box">
            <div class="base-lab">成为积极分子的时间</div>
            <span class="base-info">{{usereData.beActivistDate}}</span>
          </div>
          <div class="base-box">
            <div class="base-lab">所属支部</div>
            <span class="base-info">计通学院党支部</span>
          </div>
        </div>
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
  <el-card shadow="hover"
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
import { myInfor } from "../..//api/user.js";
function loadData(state) {
  myInfor().then(function (res) {
    // state.usereData = res.data;
    // console.log(res);
  });
  return state.usereData;
}

export default {
  name: "Dashbroad",
  setup() {
    const state = reactive({
      usereData: {
        realName: "liu",
        clazz: "20计科专本01班",
        number: "Z2020120100", //学号
        phone: "13900000000", //手机号
        beActivistDate: "2022-02-06", //成为积极分子的时间
      },
    });

    onMounted(() => {
      // 加载页面时执行
      loadData(state);
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
.big-box {
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  font-size: 14px;
  line-height: 1.42857143;
  color: #333;
  font-weight: 400;
  font-family: Helvetica Neue, Helvetica, microsoft yahei, arial, STHeiTi,
    sans-serif;
  -webkit-box-direction: normal;
  box-sizing: border-box;
  padding: 0;
  width: 100%;
  height: 28px;
  margin: 0 auto 14px;
}
.base-box {
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  font-size: 14px;
  line-height: 1.42857143;
  color: #333;
  font-weight: 400;
  font-family: Helvetica Neue, Helvetica, microsoft yahei, arial, STHeiTi,
    sans-serif;
  -webkit-box-direction: normal;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  width: 250px;
  height: 28px;
  float: left;
}
.base-lab {
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  font-weight: 400;
  font-family: Helvetica Neue, Helvetica, microsoft yahei, arial, STHeiTi,
    sans-serif;
  -webkit-box-direction: normal;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  width: 92px;
  height: 28px;
  border-radius: 6px;
  background: #e4e4e4;
  color: #000;
  line-height: 28px;
  text-align: center;
  float: left;
  font-size: 14px;
}
.base-info {
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  font-weight: 400;
  font-family: Helvetica Neue, Helvetica, microsoft yahei, arial, STHeiTi,
    sans-serif;
  -webkit-box-direction: normal;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  float: left;
  margin-left: 20px;
  color: #000;
  font-size: 14px;
  height: auto;
  line-height: 28px;
  width: 130px;
  text-align: left;
}
</style>