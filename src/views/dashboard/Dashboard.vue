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
    <!-- 新闻资讯 -->
    <el-col :span="10">
      <NewsAdvisory />
    </el-col>
  </el-row>

  <!-- 快捷入口 -->
  <el-card shadow="hover" class="box-card " style="margin-top: 15px">
    <template #header>
      <div class="card-header">
        <el-icon><position/></el-icon>&nbsp;快捷入口
      </div>
    </template>
    <div class="cricle">
      <div class="container">
        <div class="box" v-for="entry in quickEntryList">
          <el-button plain @click="() => {
            $router.push(entry.url)
          }"><el-icon><location /></el-icon>&nbsp;{{ entry.name }} </el-button>
<!--            <div class="img">-->
<!--              <img src="../../assets/icos/浏览器.png"/>-->
<!--            </div>-->
<!--            <p v-if="sets.showTitle">{{ entry.name }}</p>-->
        </div>
      </div>
    </div>
  </el-card>

  <el-card shadow="hover" class="box-card " style="margin-top: 15px">
    <template #header>
      <div class="card-header">
        <div>
          <el-icon>
            <aim/>
          </el-icon>
          入党流程示例
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
import NewsAdvisory from "../../components/NewsAdvisory.vue";
import {onMounted, reactive, ref, toRefs} from "vue";

export default {
  name: "Dashbroad",
  components: {
    JoinProcess,
    UserSearch,
    NewsAdvisory,
  },
  setup() {
    const state = reactive({
      userInfo: {},
      sets: {
        showTitle: true,
        type: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      },
      quickEntryList: []
    });

    onMounted(() =>　{
      loadData() // 加载数据
    })

    const loadData = () => {
      state.userInfo = JSON.parse(localStorage.getItem("userInfo"))
      let userRoutes = JSON.parse(localStorage.getItem("userRoutes"))
      // state.quickEntryList.push({
      //   name: "个人中心",
      //   url: "/owner/info"
      // })
      // state.quickEntryList.push({
      //   name: "账号中心",
      //   url: "/owner/account/updateAccount"
      // })
      userRoutes.forEach(route => {
        route.children.forEach(child => {
          state.quickEntryList.push({
            name: child.name,
            url: child.url
          })
        })
      })
    }

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

.cricle{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container{
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  align-items: center;
}
.container .box{
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  align-content: center;
  width: 174px;
  margin: 10px;
}
.container .box .img{
  width: 60px;
  height: 80px;
  box-shadow: 18px 18px 30px rgba(0, 0, 0, 0.1),
  -18px -18px 30px rgba(255, 255, 255, 1);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #efeeee;
  transition: box-shadow .2s ease-out;
  position: relative;
}
.container .box .img  img{
  width: 30px;
  transition: width 0.2s ease-out;
}
.container .box p{
  color: slategrey;
}
.container .box .img:hover{
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.2),
  0px 0px 0px rgba(255, 255, 255, 0.8),
  inset 18px 18px 30px rgba(0, 0, 0, 0.1),
  inset -18px -18px 30px rgba(255, 255, 255, 1);
  transition: box-shadow .2s ease-out;
}
.container .box .img:hover img{
  width: 42px;
  transition: width 0.2s ease-out;
}
</style>