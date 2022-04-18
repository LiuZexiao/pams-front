<template>
  <!-- 入党流程图 -->
  <el-steps :active="activeStage" align-center finish-status="success">
    <el-step :title="item.stage.name" v-for="(item, index) in userInfoStages" :key="index"
             :status="item.status === 'PASSED'
             ? 'success' : item.status === 'REVIEWING'
             ? 'process' : item.status === 'FAIL'
             ? 'error' : 'wait'" >
      <template v-slot:description>
        <table width="180px" border="0" cellspacing="0" cellpadding="0" class="processing_content">
          <tr v-for="(child, index) in item.children" :key="index">
            <td style="color:#98A6BE">
              <div class="processing_content_detail" style="float:left;width:100%">
                <span style="display:block;text-align:left;">
                  {{ index + 1 }}.  {{ child.stage.name }}
<!--                  <el-link target="_blank"></el-link>-->
                  <div style="float: right;">
                    <el-icon v-if="child.status !== 'PASSED'" style="color: #909399"><circle-check-filled /></el-icon>
                    <el-icon v-if="child.status === 'PASSED'" style="color: #67c23a"><circle-check-filled /></el-icon>
                  </div>
                </span>
              </div>
            </td>
          </tr>
        </table>
      </template>
    </el-step>
  </el-steps>
</template>

<script>
import {reactive, onMounted, toRefs} from "vue";

export default {
  name: "JoinProcess",
  props: {
    userInfoId: String,
    userInfoStages: Array,
  },
  setup(props) {
    const state = reactive({
      activeStage: 0,
      userInfoId: props.userInfoId,
    });

    onMounted(() => {
      for (let i = 0; i < props.userInfoStages.length; i++) {
        if (item.status === "PASSED") {
          state.activeStage = i
          return
        }
      }
    });

    return {
      ...toRefs(state), //toRefs将对象中的内容转换为响应式数据
    };
  },

};
</script>

<style>
.stepComponent {
  background-color: #dfebff;
  width: 100% -20px;
  padding: 10px 10px 10px 10px;
  margin: 10px 10px 10px 10px;
}

.stepsTitle {
  margin: 10px 0px 10px 10px;
}

.approvalProcess {
  color: #9eadc4;
  font-size: 14px;
  /* width: 100%; */
  background: #dfebff;
  margin-left: 20px;
  margin-right: 0px;
  margin-top: 10px;
}

.processing_content {
  font-size: 13px;
}

.processing_content_detail {
  margin-left: 10px;
  margin-top: 3.5px;
  margin-bottom: 3.5px;
  width: 150px;
  display: inline-block;
}

.step-row {
  min-width: 500px;
  margin-bottom: 12px;
  margin-top: 12px;
}
</style>


