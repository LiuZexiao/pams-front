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
        <el-tree :data="roleTree" :props="defaultProps" @node-click="handleNodeClick" default-expand-all/>
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
    </el-col>
  </el-row>
</template>

<script>
import {onMounted, reactive, toRefs} from "vue";
import {modify, remove, tree, add} from "../../api/role";
import RoleSelect from "../../components/role/RoleSelect.vue";
import DepartmentSelect from "../../components/department/DepartmentSelect.vue";
import {ElMessage} from "element-plus";

export default {
  name: "Role",
  components: {
    RoleSelect,
    DepartmentSelect,
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
    }); // reactive 响应式对象声明

    onMounted(() => {
      loadData()
    })

    const loadData = () => {
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

    const handleNodeClick = (data) => {
      state.role = data
      console.log(data)
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

    return {
      ...toRefs(state), // toRefs将对象中的内容转换为响应式数据
      defaultProps,
      handleNodeClick,
      handleAddClick,
      handleSaveClick,
      handleDeleteClick,
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