<template>
<!--  流程管理（入党流程、流程对应的附件》 需要最高权限！！！！）-->
  <el-card shadow="never" class="box-card">
    <el-button style="width: 100%" @click="showEdit({}, MODE.ADD)">添加阶段</el-button>-->
    <el-table :data="tableData" style="width: 100%; margin-bottom: 20px" row-key="id" border default-expand-all>
        <el-table-column prop="name" label="阶段名" />
        <el-table-column prop="needReview" label="需要审核">
          <template #default="scope">
            <el-icon v-if="scope.row.needReview" style="color: #67c23a"><circle-check-filled /></el-icon>
            <el-icon v-if="!scope.row.needReview" style="color: #909399"><circle-check-filled /></el-icon>
          </template>
        </el-table-column>
        <el-table-column prop="attachmentRequired" label="需要附件">
          <template #default="scope">
            <el-icon v-if="scope.row.attachmentRequired" style="color: #67c23a"><circle-check-filled /></el-icon>
            <el-icon v-if="!scope.row.attachmentRequired" style="color: #909399"><circle-check-filled /></el-icon>
          </template>
        </el-table-column>
        <el-table-column prop="needScore" label="需要评分">
          <template #default="scope">
            <el-icon v-if="scope.row.needScore" style="color: #67c23a"><circle-check-filled /></el-icon>
            <el-icon v-if="!scope.row.needScore" style="color: #909399"><circle-check-filled /></el-icon>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template #default="scope">
            <el-button size="small" @click="showEdit(scope.row, MODE.EDIT)">编辑</el-button>
            <el-popconfirm confirm-button-text="确认" cancel-button-text="取消"
                           :icon="InfoFilled" icon-color="red" title="确认删除这条数据？"
                           @confirm="handleRemove(scope.row.id)">
              <template #reference>
                <el-button size="small" type="danger">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
    </el-table>
  </el-card>

  <!-- 组件 BEGIN -->
  <StageEdit v-if="editVisible" :row="data" :visible="editVisible" @onClose="closeEdit" @onSave="handleEdit" />
  <!-- 组件 END -->
</template>

<script>
import {onMounted, reactive, toRefs} from "vue";
import {fetchTree, remove, save} from "../../api/stage";
import {ElMessage} from "element-plus";
const InfoFilled = require('@element-plus/icons/lib/InfoFilled');
import StageEdit from "./components/StageEdit.vue";

const MODE = {
  EDIT: 'edit',
  ADD: 'add',
}

export default {
  name: "Stage",
  components: {
    StageEdit,
  },
  setup() {
    const state = reactive({
      tableData: [],
      data: null,
      mode: null,
      editVisible: false,
    }); // reactive 响应式对象声明

    onMounted(() => {
      loadData()
    })

    const loadData = () => {
      fetchTree().then(res => {
        if (res.code === 200) {
          state.tableData = res.data
        } else {
          ElMessage.error(res.message)
        }
      })
    }

    const handleEdit = (row) => {
      save(row).then(res => {
        if (res.code === 200) {
          loadData()
          closeEdit(false)
          ElMessage.success(res.message)
        } else {
          ElMessage.error(res.message)
        }
      })
    }

    const handleRemove = (id) => {
      remove(id).then(res => {
        if (res.code === 200) {
          loadData()
          ElMessage.success(res.message)
        } else {
          ElMessage.error(res.message)
        }
      })
    }

    const showEdit = (row, mode) => {
      state.mode = mode
      state.data = row
      state.editVisible = true
    }

    const closeEdit = (visible) => {
      state.editVisible = visible
    }

    return {
      MODE,
      ...toRefs(state), //toRefs将对象中的内容转换为响应式数据
      handleEdit,
      handleRemove,
      showEdit,
      closeEdit,
    };
  }
}
</script>

<style scoped>

</style>