<template>
  <!-- 入党流程 -->
  <el-card v-if="!userInfo.stage" shadow="hover" class="box-card " style="margin-top: 15px">
    <template #header>
      <div class="card-header" style="display: flex; justify-content: space-between">
        <div>
          <el-icon>
            <aim/>
          </el-icon>
          申请入党
        </div>
        <div>
          <el-button size="small" @click="handleApply">提交</el-button>
        </div>
      </div>
    </template>

    <div class="big-box" style="display: flex;justify-content: center">
      <el-form :model="applyData" label-width="160px" label-position="left" class="from">
        <el-form-item label="申请日期">
          <el-date-picker v-model="applyData.applyDate" type="date" placeholder="选择日期" style="width: 100%"
                          format="YYYY-MM-DD"
                          value-format="YYYY-MM-DD"/>
        </el-form-item>
        <el-form-item label="审核人">
          <el-select v-model="applyData.approverId" placeholder="请选择审核人">
            <el-option label="系统管理员" value="1"/>
          </el-select>
        </el-form-item>
      </el-form>

    </div>
  </el-card>
  <el-card v-if="userInfo.stage" shadow="hover" class="box-card " style="margin-top: 15px">
    <template #header>
      <div class="card-header" style="display: flex; justify-content: space-between">
        <div>
          <el-icon>
            <aim/>
          </el-icon>
          入党流程
        </div>
        <div>
          <el-button size="small" type="primary" @click="showDetail">详情</el-button>&nbsp;
        </div>
      </div>
    </template>
    <div class="big-box" style=" height: auto; ">
      <JoinProcess :userInfoStages="userInfoStages" :userInfoId="userInfo.id"/>
    </div>
  </el-card>
  <!-- 组件 BEGIN -->
  <UserStageDetail v-if="detailVisible" :row="userInfoStage" :visible="detailVisible" @onClose="closeDetail"/>
  <!-- 组件 END -->
</template>

<script>
import JoinProcess from "./JoinProcess.vue";
import UserStageDetail from "./UserStageDetail.vue";
import {onMounted, reactive, toRefs} from "vue";
import {apply, currentUserInfoStage} from "../../../api/owner/userInfoStage";
import {ElMessage} from "element-plus";

export default {
  name: "UserInfoStage",
  components: {
    JoinProcess,
    UserStageDetail,
  },
  setup() {
    const state = reactive({
      userInfo: {},
      userInfoStages: [],
      userInfoStage: {},
      applyData: {
        applyDate: null,
        approverId: null,
      },
      detailVisible: false,
    });

    onMounted(() => {
      state.userInfo = JSON.parse(localStorage.getItem("userInfo"))
      loadData()
    })

    const loadData = () => {
      currentUserInfoStage().then(res => {
        if (res.code === 200) {
          state.userInfoStages = res.data
          // 获取当前阶段得详情
          state.userInfoStages.forEach(item => {
            if (item.id === state.userInfo.stage.id) {
              state.userInfoStage = item
            }
            item.children.forEach(child => {
              if (child.id === state.userInfo.stage.id) {
                state.userInfoStage = child
              }
            })
          })
        } else {
          ElMessage.error(res.message)
        }
      })
    }

    const handleApply = () => {
      apply(state.applyData).then(res => {
        if (res.code === 200) {
          ElMessage.success(res.message)
          loadData();
          state.userInfo.stage = {}
        } else {
          ElMessage.error(res.message)
        }
      })
    }

    const closeDetail = (v) => {
      state.detailVisible = v;
    }

    const showDetail = () => {
      state.detailVisible = true
    }

    return {
      ...toRefs(state), //toRefs将对象中的内容转换为响应式数据
      handleApply,
      closeDetail,
      showDetail,
    }
  }
}
</script>

<style scoped>

</style>