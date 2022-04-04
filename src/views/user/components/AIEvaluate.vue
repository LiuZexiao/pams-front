<template>
  <el-dialog v-model="visible" title="AI思想状态评估" width="60%" top="80px" @close="close">
    <el-scrollbar height="600px">
      <!-- 用户基本信息 BEGIN -->
      <el-card class="box-card" style="margin-top: 15px" shadow="hover">
        <template #header>
          <div class="card-header">
            <span>基本信息</span>
            <el-button circle @click="handleEditUserInfo"><el-icon><edit /></el-icon></el-button>
          </div>
        </template>
        <el-descriptions :column="3" border style="margin-top: 15px">
          <el-descriptions-item>
            <template #label>
              姓名
            </template>

            <div style="width: 100px">{{ userInfo.realName }}</div>
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              学号
            </template>
            <div style="width: 100px">{{ userInfo.number }}</div>
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              职业
            </template>
            <div style="width: 100px">{{ userInfo.job }}</div>
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              性别
            </template>
            <el-tag v-if="userInfo.gender === 'MALE'" type="info">男</el-tag>
            <el-tag v-if="userInfo.gender === 'FEMALE'" type="danger">女</el-tag>
            <el-tag v-if="userInfo.gender === 'OTHER'" type="warning">其他</el-tag>
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              年龄
            </template>
            {{ userInfo.age }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              班级
            </template>
            {{ userInfo.clazz }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              学院
            </template>
            {{ userInfo.college }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              申请入党时间
            </template>
            {{ userInfo.applyDate }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              当前阶段
            </template>
            {{ userInfo?.stage?.stage?.name }}
          </el-descriptions-item>
        </el-descriptions>
      </el-card>
      <!-- 用户基本信息 END -->

      <!-- AI评估报告 BEGIN -->
      <el-card class="box-card" style="margin-top: 15px" shadow="hover">
        <template #header>
          <div class="card-header">
            <span>AI评估报告</span>
            <el-tag class="ml-2" type="success">总分：5</el-tag>
          </div>
        </template>
        <ElButton v-if="!report" type="success" :loading="loading" @click="handleGenerate">{{loading ? "报告评估中..." : "点击生成AI评估报告"}}</ElButton>
        <div v-if="report">
          <el-progress type="circle" :percentage="report.total * 20" :color="customColors">
            <template #default="{ percentage }">
              <div style="font-size: 30px">{{ percentage / 20.0 }}</div>
              <el-tag v-if="percentage / 20.0 >= 4" type="success">优秀</el-tag>
              <el-tag v-if="percentage / 20.0 >= 3.5 & percentage / 20.0 < 4" type="info">良好</el-tag>
              <el-tag v-if="percentage / 20.0 >= 3 & percentage / 20.0 < 3.5" type="warning">及格</el-tag>
              <el-tag v-if="percentage / 20.0 < 3" type="danger">异常</el-tag>
            </template>
          </el-progress>
          <el-descriptions :column="2" border style="margin-top: 15px">
            <el-descriptions-item>
              <template #label>
                思想报告质量
              </template>
              <el-progress :text-inside="true" :stroke-width="15" :percentage="report.thoughtReport * 50"  :color="customColors" style="width: 100px" />
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                个人诚信度
              </template>
              <el-progress :text-inside="true" :stroke-width="15" :percentage="report.integrity * 100" :color="customColors" style="width: 100px" />
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                活动参与率
              </template>
              <el-progress :text-inside="true" :stroke-width="15" :percentage="report.positivity * 100" :color="customColors" />
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                个人绩点
              </template>
              <el-progress :text-inside="true" :stroke-width="15" :percentage="report.gpa * 100" :color="customColors" />
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                附加分
              </template>
              <el-progress :text-inside="true" :stroke-width="15" :percentage="report.additional * 200" :color="customColors" />
            </el-descriptions-item>
          </el-descriptions>
          <el-alert title="温馨提示：AI评估数据仅供参考" type="warning" show-icon style="margin-top: 15px" />
        </div>
      </el-card >
      <!-- AI评估报告 END -->

      <!-- 用户入党流程 BEGIN -->
      <el-card class="box-card" style="margin-top: 15px" shadow="hover">
        <template #header>
          <div class="card-header">
            <span>入党进程</span>
            <el-link href="/affair/userStage" :underline="false" >去审核</el-link>
          </div>
        </template>
        <el-scrollbar>
          <JoinProcess :user-info-id="userInfo.id" />
        </el-scrollbar>
      </el-card>
      <!-- 用户入党流程 END -->
    </el-scrollbar>
  </el-dialog>
</template>

<script>
import {ElMessage} from "element-plus";
import {reactive, toRefs} from "vue";
import router from '../../../router';
import {evaluate} from "../../../api/userInfo";
import JoinProcess from "./JoinProcess.vue";

export default {
  name: "AIEvaluate",
  components: {
    JoinProcess,
  },
  props: {
    userInfo: Object,
    visible: Boolean
  },
  emits: ["onClose", "onEditUserInfo"], // 父组件传过来的事件
  setup(props, { emit }) {
    const state = reactive({
      report: null,
      loading: false,
    }); // reactive 响应式对象声明

    const customColors = [
      { color: '#909399', percentage: 60 },
      { color: '#e6a23c', percentage: 70 },
      { color: '#1989fa', percentage: 80 },
      { color: '#67c23a', percentage: 100 },
    ]

    const handleGenerate = () => {
      state.loading = true
      evaluate(props.userInfo.id).then(res => {
        if (res.code === 200) {
          state.report = res.data
        } else {
          ElMessage.error(res.message)
        }
        state.loading = false
      })
    }

    const handleEditUserInfo = () => {
      close(false)
      emit("onEditUserInfo")
    }

    const close = (visible) => {
      state.loading = false
      state.report = null
      emit("onClose", visible)
    }

    return {
      ...toRefs(state),
      customColors,
      handleGenerate,
      handleEditUserInfo,
      close,
      router,
    };
  },
};
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>