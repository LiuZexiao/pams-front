<template>
  <el-card shadow="hover" style="height: 210px">
    <template #header>
      <el-row :gutter="24" style="text-align: left;line-height: 0px;">
        <el-col :span="20">
          <div class="card-header" style="text-align: left;line-height: 0px;">
            <el-icon>
              <chat-line-square/>
            </el-icon>
            新闻咨询
          </div>
        </el-col>
        <el-col :span="4">
          <router-link to="/" style="display:block; text-align: right;font-size: 13px;line-height: 13px; color: #a48888;">
            更多
          </router-link>
        </el-col>
      </el-row>
    </template>
    <!-- <div>新闻咨询</div> -->
    <el-scrollbar height="120px">
      <el-table class="infotable " v-loading="informationLoading" :show-header="false" :data="informationData">
        <el-table-column prop="title" label="标题">
          <template v-slot="scope">
            <a :href="scope.row.url" target="_blank"
               style="text-decoration:none; color: #333;">{{ scope.row.title }}</a>
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
  </el-card>
</template>

<script>
import {onMounted, reactive, ref, toRefs} from "vue";
import {reptile} from "../api/open/information";

export default {
  name: "NewsAdvisory",
  setup() {
    const state = reactive({
      userInfo: {},
      informationData: [
        {
          title: "0401测试",
          url: "www.baidu.com", //跳转链接
        },
        {
          title: "0401测试",
          url: "www.baidu.com", //跳转链接
        },
        {
          title: "0401测试",
          url: "www.baidu.com", //跳转链接
        },
      ],
      informationLoading: false,
    });

    onMounted(() =>　{
      loadData() // 加载数据
      loadInformation();
    })

    const loadData = () => {
      state.userInfo = JSON.parse(localStorage.getItem("userInfo"))
    }

    const loadInformation = () => {
      state.informationLoading = true
      reptile().then(res => {
        if (res.code === 200) {
          state.informationData = res.data
        }
        state.informationLoading = false
      })
    }

    return {
      ...toRefs(state), //toRefs将对象中的内容转换为响应式数据
    }
  }
};
</script>

<style scoped>
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