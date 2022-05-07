<template>
  <el-card shadow="hover" class="box-card " style="margin-top: 15px">
    <template #header>
      <div class="card-header" style="display: flex; justify-content: space-between">
        <span>联系人、介绍人申请记录 </span>
        <el-select v-model="status" placeholder="选择审核状态" @change="loadData">
          <el-option label="全部" value="ALL" />
          <el-option label="待审核" value="UNDER_REVIEW" />
          <el-option label="审核中" value="REVIEWING" />
          <el-option label="通过" value="PASSED" />
          <el-option label="不通过" value="FAIL" />
        </el-select>
      </div>
    </template>
    <el-table :data="applyRecordList" v-loading="applyRecordListLoading" style="width: 100%">
      <el-table-column fixed prop="applicant.realName" label="申请人" />
      <el-table-column fixed prop="target.realName" label="目标" />
      <el-table-column prop="type" label="类型" >
        <template #default="scope">
          <span v-if="scope.row.type === 'FIRST_CONTACT'" >第一培养联系人</span>
          <span v-if="scope.row.type === 'SECOND_CONTACT'" >第二培养联系人</span>
          <span v-if="scope.row.type === 'FIRST_INTRODUCER'" >第一入党介绍人</span>
          <span v-if="scope.row.type === 'SECOND_INTRODUCER'" >第二入党介绍人</span>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="审核状态" >
        <template #default="scope">
          <AuditTag :state="scope.row.status" />
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template #default="scope">
          <el-popconfirm confirm-button-text="确认" cancel-button-text="取消"
                         :icon="InfoFilled" icon-color="red" title="确认删除这条数据？"
                         @confirm="handleRemoveApplyRecord(scope.row.id)">
            <template #reference>
              <el-button size="small" type="danger">取消申请</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import {onMounted, reactive, toRefs} from "vue";
import {applyRecord, removeApplyRecord} from "../../../api/owner/userInfo";
import AuditTag from "../../../components/AuditStatus/AuditTag.vue";
import {ElMessage} from "element-plus";
export default {
  name: "UserInfoStage",
  components: {
    AuditTag,
  },
  setup() {
    const state = reactive({
      userInfo: {},
      status: "ALL",
      applyRecordList: [],
      applyRecordListLoading: true,
    });

    onMounted(() => {
      state.userInfo = JSON.parse(localStorage.getItem("userInfo"))
      loadData()
    })

    const loadData = () => {
      state.applyRecordListLoading = true
      if (state.status === "") {
        state.status = null
      }
      applyRecord(state.status).then(res => {
        if (res.code === 200) {
          state.applyRecordList = res.data
        }
        state.applyRecordListLoading = false
      })
    }

    const handleRemoveApplyRecord = (id) => {
      removeApplyRecord(id).then(res => {
        if (res.code === 200) {
          loadData()
          ElMessage.success(res.message)
        } else {
          ElMessage.error(res.message)
        }
      })
    }

    return {
      ...toRefs(state), //toRefs将对象中的内容转换为响应式数据
      loadData,
      handleRemoveApplyRecord,
    }
  }
}
</script>

<style scoped>

</style>