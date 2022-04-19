<template>
  <el-row :gutter="20">
    <!-- 个人信息 -->
    <el-col :span="14">
      <el-card shadow="hover" style="height: 210px">
        <template #header>
          <el-row :gutter="24" style="text-align: left;line-height: 0px;">
            <el-col :span="20">
              <div class="card-header" style="text-align: left;line-height: 0px;">
                <el-icon>
                  <postcard/>
                </el-icon>
                个人基本资料
              </div>
            </el-col>
            <el-col :span="4">
              <router-link to="/owner/info" target="_blank" style="display:block; text-align: right;line-height: 13px; color: #a48888;">
                <el-icon>
                  <edit/>
                </el-icon>
              </router-link>
            </el-col>
          </el-row>
        </template>
        <!-- <div>个人信息</div> -->
        <div class="big-box">
          <div class="base-box">
            <div class="base-lab">姓名</div>
            <span class="base-info">{{ userInfo.realName }}</span>
          </div>
          <div class="base-box">
            <div class="base-lab">班级</div>
            <span class="base-info">{{ userInfo.clazz }}</span>
          </div>
        </div>
        <div class="big-box">
          <div class="base-box">
            <div class="base-lab">学号</div>
            <span class="base-info">{{ userInfo.number }}</span>
          </div>
          <div class="base-box">
            <div class="base-lab">学院</div>
            <span class="base-info">{{ userInfo.college }}</span>
          </div>
        </div>
        <div class="big-box">
          <div class="base-box">
            <div class="base-lab">申请入党时间</div>
            <span class="base-info">{{ userInfo.applyDate }}</span>
          </div>
          <div class="base-box">
            <div class="base-lab">所属阶段</div>
            <span class="base-info">{{ userInfo?.stage?.stage?.name }}</span>
          </div>
        </div>
      </el-card>
    </el-col>
    <!-- 新闻公告 -->
    <el-col :span="10">
      <el-card shadow="hover" style="height: 210px">
        <template #header>
          <el-row :gutter="24" style="text-align: left;line-height: 0px;">
            <el-col :span="20">
              <div class="card-header" style="text-align: left;line-height: 0px;">
                <el-icon>
                  <chat-line-square/>
                </el-icon>
                新闻公告
              </div>
            </el-col>
            <el-col :span="4">
              <router-link to="/"
                           style="display:block; text-align: right;font-size: 13px;line-height: 13px; color: #a48888;">
                更多
              </router-link>
            </el-col>
          </el-row>

        </template>
        <!-- <div>新闻公告</div> -->
        <el-table class="infotable " :show-header="false" :data="informationData">
          <el-table-column prop="title" label="标题" width="280">
            <template v-slot="scope">
              <a :href="scope.row.resource" target="_blank"
                 style="text-decoration:none; color: #333;">{{ scope.row.title }}</a>
            </template>
          </el-table-column>
          <el-table-column prop="release_time" label="时间" width="130"/>
        </el-table>
      </el-card>
    </el-col>
  </el-row>

  <el-card shadow="hover" class="box-card " style="margin-top: 15px">
    <template #header>
      <div class="card-header">
        <div>
          <el-icon>
            <aim/>
          </el-icon>
          入党流程
        </div>
      </div>
    </template>
    <join-process />
  </el-card>
  <user-search/>
</template>

<script>
import JoinProcess from "../user/components/JoinProcess.vue";
import UserSearch from "../user/components/UserSearch.vue";
import {onMounted, reactive, ref, toRefs} from "vue";

export default {
  name: "Dashbroad",
  components: {
    JoinProcess,
    UserSearch
  },
  setup() {
    const state = reactive({
      userInfo: {},
      informationData: [
        {
          title: "0401测试",
          release_time: "2022-04-01",
          resource: "www.baidu.com", //跳转链接
        },
        {
          title: "0401测试",
          release_time: "2022-04-01",
          resource: "www.baidu.com", //跳转链接
        },
        {
          title: "0401测试",
          release_time: "2022-04-01",
          resource: "www.baidu.com", //跳转链接
        },
      ],
    });

    onMounted(() =>　{
      state.userInfo = JSON.parse(localStorage.getItem("userInfo"))
    })

    return {
      ...toRefs(state), //toRefs将对象中的内容转换为响应式数据
    }
  }
};
</script>

<style scoped>

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
  margin-right: 30px;
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
  width: 280px;
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
  width: 90px;
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
  width: 140px;
  text-align: left;
}

.infotable {
  width: 100%;
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
  /* height: 28px; */
  margin: 0 auto;
}
</style>