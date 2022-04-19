<template>
  <el-dialog v-model="visible" title="阶段详情" width="40%" top="80px" center @close="close">

    <el-scrollbar height="600px">

      <!-- 附件提交情况 BEGIN -->
      <el-card v-if="row.attachmentDetail?.requiredAttachments?.length > 0" class="box-card" style="margin-top: 15px" shadow="hover">
        <template #header>
          <div class="card-header">
            <span>当前阶段附件提交情况</span>
          </div>
        </template>
        <AttachmentsDetail :attachment-detail="row.attachmentDetail" />
      </el-card>
      <!-- 附件提交情况 END -->

      <!-- 审核表单 BEGIN -->
      <el-form :model="row" label-width="160px" disabled label-position="left" class="from" style="margin-top: 15px">
        <el-form-item label="审核状态">
          <AuditSelect :state="row.status" @onChange="(val) => row.status = val" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="row.remark" />
        </el-form-item>
      </el-form>
      <!-- 审核表单 END -->
    </el-scrollbar>

    <!-- FOOTER BEGIN -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close(false)">取消</el-button>
        <el-button type="primary" @click="handleApplyToNext">申请进入下一阶段</el-button>
      </span>
    </template>
    <!-- FOOTER END -->
  </el-dialog>
</template>

<script>
import AuditSelect from "../../../components/AuditStatus/AuditSelect.vue";
import AttachmentsDetail from "./AttachmentsDetail.vue";
import {onMounted, reactive, toRefs} from "vue";
import {fetchChildren} from "../../../api/userInfoStage.js";
import {ElMessage} from "element-plus";
import {applyToNext} from "../../../api/owner/userInfoStage";

export default {
  name: "UserStageAudit",
  components: {
    AuditSelect,
    AttachmentsDetail
  },
  props: {
    row: Object,
    visible: Boolean,
  },
  emits: ["onClose"], // 父组件传过来的事件
  setup(props, { emit }) {
    const state = reactive({
      tableData: [],
      params: {
        userInfoId: props.row?.userInfo?.id,
        stageId: props.row?.stage?.id,
      },
      approverId: null,
    }); // reactive 响应式对象声明

    onMounted(() => {
      // 获取当前阶段的子阶段与用户关联的数据
      loadChildren()
    });

    const loadChildren = () => {
      fetchChildren(state.params).then(res => {
        if (res.code === 200) {
          state.tableData = res.data
        } else {
          ElMessage.error(res.message)
        }
      })
    }

    const handleApplyToNext = () => {
      if (state.approverId == null) {
        state.approverId = 1
      }
      applyToNext(state.approverId).then(res => {
        if (res.code === 200) {
          close(false)
          ElMessage.success(res.message)
          location.reload()
        } else {
          ElMessage.error(res.message)
        }
      })
    }

    const close = (visible) => {
      state.tableData = []
      emit("onClose", visible)
    }

    const toAudit = (rowId) => {
      close(false)
      emit("onToAudit", rowId)
    }

    return {
      ...toRefs(state),
      close,
      handleApplyToNext,
      toAudit,
      loadChildren
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