<template>
  <el-dialog v-model="visible" title="用户阶段信息审核" width="40%" top="80px" center @close="close">

    <el-scrollbar height="600px">

      <!-- 用户阶段基本信息 BEGIN -->
      <el-card class="box-card" style="margin-top: 15px" shadow="hover">
        <template #header>
          <div class="card-header">
            <span>基本信息</span>
            <el-link href="/user/list" :underline="false" >用户管理</el-link>
          </div>
        </template>
        <el-descriptions :column="3" border style="margin-top: 15px">
          <el-descriptions-item>
            <template #label>
              阶段名
            </template>

            <div style="width: 100px">{{ row.stage.name }}</div>
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              姓名
            </template>
            <div style="width: 100px">{{ row.userInfo.realName }}</div>
          </el-descriptions-item>
          <el-descriptions-item v-if="row.stage?.needScore">
            <template #label>
              分数
            </template>
            <div style="width: 100px">{{ row.score }}</div>
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              开始时间
            </template>
            <div>{{ row.beginDate }}</div>
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              结束时间
            </template>
            <div>{{ row.endDate }}</div>
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              备注
            </template>
            <div>{{ row.remark }}</div>
          </el-descriptions-item>
        </el-descriptions>
      </el-card>
      <!-- 用户阶段信息 END -->

      <!-- 附件提交情况 BEGIN -->
      <el-card v-if="row.attachmentDetail?.requiredAttachments?.length > 0" class="box-card" style="margin-top: 15px" shadow="hover">
        <template #header>
          <div class="card-header">
            <span>当前阶段附件提交情况</span>
            <el-link href="/user/list" :underline="false" >用户管理</el-link>
          </div>
        </template>
        <AttachmentDetail :attachment-detail="row.attachmentDetail" />
      </el-card>
      <!-- 附件提交情况 END -->


      <!-- 用户子阶段信息 BEGIN -->
      <el-card v-if="tableData.length > 0" class="box-card" style="margin-top: 15px" shadow="hover">
        <template #header>
          <div class="card-header">
            <span>用户子阶段信息（子阶段需要全部通过）</span>
            <el-link href="/user/list" :underline="false" >用户管理</el-link>
          </div>
        </template>
        <el-table :data="tableData" style="width: 100%" height="260">
          <el-table-column fixed prop="stage.name" label="阶段名称"/>
          <el-table-column fixed prop="userInfo.realName" label="姓名"/>
          <el-table-column prop="score" label="分数">
            <template #default="scope">
              {{ scope.row.stage.needScore ? scope.row.score : '\\'}}
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注"/>
          <el-table-column prop="status" label="状态">
            <template #default="scope">
              <AuditTag v-if="scope.row.stage.needReview" :state="scope.row.status" />
              <span v-else>\</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作">
            <template #default="scope">
              <el-button size="small" type="primary" :disabled="!scope.row.stage.needReview" @click="toAudit(scope.row.id)">审核</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <!-- 用户子阶段信息 END -->


      <!-- 审核表单 BEGIN -->
      <el-form :model="row" label-width="160px" label-position="left" class="from" style="margin-top: 15px">
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
        <el-button type="primary" @click="save">保存</el-button>
      </span>
    </template>
    <!-- FOOTER END -->
  </el-dialog>
</template>

<script>
import AuditSelect from "../../../components/AuditStatus/AuditSelect.vue";
import AttachmentDetail from "../../../components/AttachmentDetail.vue";
import {onMounted, reactive, toRefs} from "vue";
import {fetchChildren} from "../../../api/userInfoStage.js";
import {ElMessage} from "element-plus";

export default {
  name: "UserStageAudit",
  components: {
    AuditSelect,
    AttachmentDetail
  },
  props: {
    row: Object,
    visible: Boolean,
  },
  emits: ["onSave", "onClose", "onToAudit"], // 父组件传过来的事件
  setup(props, { emit }) {
    const state = reactive({
      tableData: [],
      params: {
        userInfoId: props.row?.userInfo?.id,
        stageId: props.row?.stage?.id,
      },
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

    const save = () => {
      console.log("onSave:" + props.row)
      emit("onSave", props.row)
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
      save,
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