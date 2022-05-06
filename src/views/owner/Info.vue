<template>
  <el-row :gutter="20">
    <el-col :span="4"></el-col>
    <el-col :span="16">
      <el-row :gutter="15" style="margin-top: 15px">
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
                  <router-link to="" @click="showUserInfoEdit()"
                               style="display:block; text-align: right;line-height: 13px; color: #a48888;">
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
      <el-tabs v-model="activeName" tab-position="top" style="margin-top: 15px" class="demo-tabs">
        <el-tab-pane label="党务信息" name="first">
          <UserInfoStage />
        </el-tab-pane>
        <el-tab-pane label="申请记录" name="second">
          <UserInfoApplyRecord />
        </el-tab-pane>
        <el-tab-pane label="活动信息" name="third">
          <UserInfoEvent />
        </el-tab-pane>
        <el-tab-pane label="奖惩信息" name="fourth">
          <UserInfoAward />
        </el-tab-pane>
      </el-tabs>

    </el-col>
    <el-col :span="4"></el-col>
  </el-row>


  <!-- 组件 Begin -->
  <UserInfoEdit :visible="userInfoEditVisible" :row="userInfo" @onClose="closeUserInfoEdit" @onSave="handleUserInfoEdit"/>
  <UserSearch />
  <!-- 组件 End -->
</template>

<script>
import {reactive, onMounted, toRefs} from "vue";
import JoinProcess from "../user/components/JoinProcess.vue";
import UserInfoEdit from "../user/components/UserInfoEdit.vue";
import UserSearch from "../user/components/UserSearch.vue";
import UserInfoStage from "./components/UserInfoStage.vue";
import UserInfoApplyRecord from "./components/UserInfoApplyRecord.vue";
import UserInfoEvent from "./components/UserInfoEvent.vue";
import UserInfoAward from "./components/UserInfoAward.vue";
import {currentUserInfo, modifyUserInfo} from "../../api/owner/userInfo";
import {ElMessage} from "element-plus";

export default {
  name: "Info",
  components: {
    JoinProcess,
    UserInfoEdit,
    UserSearch,
    UserInfoStage,
    UserInfoApplyRecord,
    UserInfoEvent,
    UserInfoAward,
  },
  setup() {
    const state = reactive({
      userInfoEditVisible: false,
      userInfo: {},
      activeName: 'first',
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

    onMounted(() => {
      // 加载页面时执行
      state.userInfo = JSON.parse(localStorage.getItem("userInfo"))
    });

    /**
     * 处理编辑事件
     */
    const handleUserInfoEdit = (row) => {
      modifyUserInfo(row).then(res => {
        if (res.code === 200) {
          state.userInfoEditVisible = false
          ElMessage.success(res.message)
        } else {
          ElMessage.error(res.message)
        }
      })
    }
    /**
     * 显示编辑框
     */
    const showUserInfoEdit = () => {
      // state.mode = mode
      // state.data = index != null ? state.tableData[index] : defaultUserInfo
      state.userInfoEditVisible = true
      // console.log("showEdit:" + state.data)
    }

    /**
     * 关闭编辑框
     * @param visible
     */
    const closeUserInfoEdit = (visible) => {
      state.userInfoEditVisible = visible
    }

    return {
      ...toRefs(state), //toRefs将对象中的内容转换为响应式数据
      handleUserInfoEdit,
      showUserInfoEdit,
      closeUserInfoEdit,
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

.el-table_1_column_2 {
  text-align: right;
}
</style>