<template>
  <el-card shadow="never" class="box-card">
    <el-button style="width: 100%" @click="showEdit({}, MODE.ADD)">添加党组织</el-button>-->
    <el-table :data="tableData" style="width: 100%; margin-bottom: 20px" row-key="id" border default-expand-all>
      <!-- 部门等级 党支部[3-50) 党总支[50-100） 党委[100+) -->
      <el-table-column prop="level" label="级别" />
      <el-table-column prop="name" label="党组织名" />
      <el-table-column prop="updated" label="更新时间" />
      <el-table-column prop="created" label="创建时间" />
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
  <DepartmentEdit v-if="editVisible" :row="data" :visible="editVisible" @onClose="closeEdit" @onSave="handleEdit" />
  <!-- 组件 END -->
</template>

<script>
import {onMounted, reactive, toRefs} from "vue";
import {tree, add, modify, remove} from "../../api/department";
import {ElMessage} from "element-plus";
import DepartmentEdit from "./components/DepartmentEdit.vue";

const MODE = {
  EDIT: 'edit',
  ADD: 'add',
}

export default {
  name: "Department",
  components: {
    DepartmentEdit,
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
      tree().then(res => {
        if (res.code === 200) {
          state.tableData = res.data.children
        } else {
          ElMessage.error(res.message)
        }
      })
    }

    const handleEdit = async (row) => {
      let res = {};
      if (state.mode === MODE.ADD) {
        res = await add(row)
      } else {
        res = await modify(row)
      }
      if (res.code === 200) {
        loadData()
        closeEdit(false)
        ElMessage.success(res.message)
      } else {
        ElMessage.error(res.message)
      }
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