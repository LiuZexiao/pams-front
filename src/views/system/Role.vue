<template>
  <el-row :gutter="20" style="margin-top: 5px">
    <el-col :span="8">
      <!-- 树形列表 BEGIN -->
      <el-card class="box-card" shadow="hover">
        <template #header>
          <div class="card-header">
            <span>角色列表</span>
          </div>
        </template>
        <el-tree :data="roleTree" v-loading="tableDataLoading" :props="defaultProps" @node-click="handleNodeClick" default-expand-all :expand-on-click-node="false"/>
      </el-card>
      <!-- 树形列表 END -->
    </el-col>
    <el-col :span="16">
      <!-- 节点详情 BEGIN -->
      <el-card class="box-card" shadow="hover">
        <template #header>
          <div class="card-header">
            <span>{{ role.id ? "角色详情" : "添加角色" }}</span>
            <el-button class="button" type="text" @click="handleAddClick">添加</el-button>
          </div>
        </template>
        <div style="display: flex; justify-content: center;">
          <el-form :model="role" label-width="160px" label-position="left" class="from">
            <el-form-item label="所属组织">
              <DepartmentSelect :department-id="role.department.id" @change="(val) => role.department.id = val"/>
            </el-form-item>
            <el-form-item label="父角色">
              <RoleSelect :role-id="role.parentId" :tree-data="roleSelectTree" @change="(val) => role.parentId = val"/>
            </el-form-item>
            <el-form-item label="角色名">
              <el-input v-model="role.name" />
            </el-form-item>
            <el-form-item label="KEY">
              <el-input v-model="role.key" />
            </el-form-item>
          </el-form>
        </div>
        <el-button v-if="!role.id" @click="role = { department: { id: null } }">取消</el-button>
        <el-popconfirm v-if="role.id" confirm-button-text="确认" cancel-button-text="取消"
                       :icon="InfoFilled" icon-color="red" title="确认删除这条数据？"
                       @confirm="handleDeleteClick">
          <template #reference>
            <el-button type="danger">删除</el-button>
          </template>
        </el-popconfirm>
        <el-button type="primary" @click="handleSaveClick">保存</el-button>
      </el-card>
      <!-- 节点详情 END -->
      <!-- 角色权限详情 BEGIN -->
      <el-card v-if="role.id" style="margin-top: 10px;" class="box-card" shadow="hover">
        <template #header>
          <div class="card-header">
            <span>角色权限</span>
            <el-button class="button" type="text" @click="handleAddPermitClick({ permit: {id: null}})">添加</el-button>
          </div>
        </template>
        <el-scrollbar height="300px">
          <el-table :data="rolePermits" style="width: 100%" height="550">
            <el-table-column fixed prop="role.name" label="角色" />
            <el-table-column fixed prop="permit.name" label="权限" />
            <el-table-column prop="read" label="读" >
              <template #default="scope">
                <el-icon v-if="scope.row.read" style="color: #67c23a"><circle-check-filled /></el-icon>
                <el-icon v-if="!scope.row.read" style="color: #909399"><circle-check-filled /></el-icon>
              </template>
            </el-table-column>
            <el-table-column prop="write" label="写" >
              <template #default="scope">
                <el-icon v-if="scope.row.write" style="color: #67c23a"><circle-check-filled /></el-icon>
                <el-icon v-if="!scope.row.write" style="color: #909399"><circle-check-filled /></el-icon>
              </template>
            </el-table-column>
            <el-table-column prop="execute" label="执行" >
              <template #default="scope">
                <el-icon v-if="scope.row.execute" style="color: #67c23a"><circle-check-filled /></el-icon>
                <el-icon v-if="!scope.row.execute" style="color: #909399"><circle-check-filled /></el-icon>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="200">
              <template #default="scope">
                <el-button size="small" @click="handleAddPermitClick(scope.row)">编辑</el-button>
                <el-popconfirm confirm-button-text="确认" cancel-button-text="取消"
                               :icon="InfoFilled" icon-color="red" title="确认删除这条数据？"
                               @confirm="handleDeleteRolePermit(scope.row.id, state)">
                  <template #reference>
                    <el-button size="small" type="danger">删除</el-button>
                  </template>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </el-scrollbar>
      </el-card>
      <!-- 角色权限详情 END -->
    </el-col>
  </el-row>

  <!-- 组件 BEGIN -->
  <RolePermitEdit v-if="rolePermitEditVisible" :row="rolePermit" :visible="rolePermitEditVisible" @onClose="closeRolePermitEdit" @onSave="handleRolePermitEdit" />
  <!-- 组件 END -->
</template>

<script>
import {onMounted, reactive, toRefs} from "vue";
import {modify, remove, tree, add} from "../../api/role";
import {fetchRolePermits, save as saveRolePermit, remove as removeRolePermit} from "../../api/rolePermit";
import RoleSelect from "../../components/role/RoleSelect.vue";
import DepartmentSelect from "../../components/department/DepartmentSelect.vue";
import RolePermitEdit from "./components/RolePermitEdit.vue";
import {ElMessage} from "element-plus";
import {save} from "../../api/stage";

export default {
  name: "Role",
  components: {
    RoleSelect,
    DepartmentSelect,
    RolePermitEdit,
  },
  setup() {
    const state = reactive({
      roleTree: [],
      roleSelectTree: [],
      role: {
        department: {
          id: null
        }
      },
      rolePermits: [],
      rolePermit: { permit: {id: null}},
      rolePermitEditVisible: false,
      tableDataLoading: true,
    }); // reactive 响应式对象声明

    onMounted(() => {
      loadData()
    })

    const loadData = () => {
      state.tableDataLoading = true
      tree().then(res => {
        if (res.code === 200) {
          state.roleTree = res.data
          state.roleSelectTree = []
          state.roleTree.forEach(item => {
            let data = {
              value: item.id,
              label: item.name,
              children: buildChildren(item)
            }
            state.roleSelectTree.push(data)
          })
        } else {
          ElMessage.error(res.message)
        }
        state.tableDataLoading = false
      })
    }

    const buildChildren = (parent) => {
      const children = []
      parent.children.forEach(child => {
        let data = {
          value: child.id,
          label: child.name,
          children: buildChildren(child)
        }
        children.push(data)
      })
      return children;
    }

    const handleDeleteRolePermit = (id) => {
      removeRolePermit(id).then(res => {
        if (res.code === 200) {
          listRolePermits()
          ElMessage.success(res.message)
        } else {
          ElMessage.error(res.message)
        }
      })
    }

    const handleNodeClick = (data) => {
      state.role = data
      listRolePermits()
      console.log(data)
    }

    const listRolePermits = () => {
      fetchRolePermits(state.role.id).then(res => {
        if (res.code === 200) {
          state.rolePermits = res.data
        }
      })
    }

    const handleAddClick = () => {
      state.role = {
        department: {
          id: null
        }
      }
    }

    const handleSaveClick = async () => {
      let res = {}
      if (state.role.id) {
        res = await modify(state.role);
      } else {
        res = await add(state.role);
      }
      if (res.code === 200) {
        refresh();
        ElMessage.success(res.message)
      } else {
        ElMessage.error(res.message)
      }
    }

    const handleRolePermitEdit = (row) => {
      row.role = state.role
      saveRolePermit(row).then(res => {
        if (res.code === 200) {
          listRolePermits()
          closeRolePermitEdit(false)
          ElMessage.success(res.message)
        } else {
          ElMessage.error(res.message)
        }
      })
    }

    const handleDeleteClick = () => {
      if (!state.role.id) return
      remove(state.role.id).then(res => {
        if (res.code === 200) {
          refresh();
          ElMessage.success(res.message)
        } else {
          ElMessage.error(res.message)
        }
      })
    }

    const refresh = () => {
      state.role = {
        department: {
          id: null
        }
      }
      loadData()
    }

    const handleAddPermitClick = (row) => {
      state.rolePermit = row
      state.rolePermitEditVisible = true
    }

    const closeRolePermitEdit = (visible) => {
      state.rolePermitEditVisible = visible
    }

    return {
      ...toRefs(state), // toRefs将对象中的内容转换为响应式数据
      defaultProps,
      handleNodeClick,
      handleAddClick,
      handleSaveClick,
      handleDeleteClick,
      handleAddPermitClick,
      handleDeleteRolePermit,
      closeRolePermitEdit,
      handleRolePermitEdit
    };
  },
}

const defaultProps = {
  children: 'children',
  label: 'name',
}
</script>

<style scoped>
.from {
  width: 80%;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>