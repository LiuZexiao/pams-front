<template>
  <el-dialog v-model="visible" title="用户阶段信息审核" width="40%" top="80px" center @close="close">

    <!-- 表单 BEGIN -->
    <el-scrollbar height="600px">
      <AttachmentDetail :attachment-detail="row.attachmentDetail" />
      <el-form :model="row" label-width="160px" label-position="left" class="from" style="margin-top: 15px">
        <el-form-item label="审核状态">
          <AuditSelect :state="row.status" @onChange="(val) => row.status = val" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="row.remark" />
        </el-form-item>
      </el-form>
    </el-scrollbar>
    <!-- 表单 END -->

    <!-- FOOTER BEGIN -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close(false)">取消</el-button>
        <el-button type="primary" @click="save">保存</el-button>
      </span>
    </template>
    <!-- FOOTER END -->
  </el-dialog>
</template>

<script>
import AuditSelect from "../../../components/AuditStatus/AuditSelect.vue";
import AttachmentDetail from "../../../components/AttachmentDetail.vue";
export default {
  name: "UserStageAudit",
  components: {
    AuditSelect,
    AttachmentDetail
  },
  props: {
    row: Object,
    visible: Boolean
  },
  emits: ["onSave", "onClose"], // 父组件传过来的事件
  setup(props, { emit }) {
    const save = () => {
      console.log("onSave:" + props.row)
      emit("onSave", props.row)
    }

    const close = (visible) => {
      emit("onClose", visible)
    }

    return {
      close,
      save
    };
  },
};
</script>

<style scoped>

</style>