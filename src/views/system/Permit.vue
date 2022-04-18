<template>
  <el-row :gutter="20" style="margin-top: 5px">
    <el-col :span="8">
      <!-- 树形列表 BEGIN -->
      <el-card class="box-card" shadow="hover">
        <template #header>
          <div class="card-header">
            <span>权限列表</span>
          </div>
        </template>
        <el-tree :data="tree" :props="defaultProps" @node-click="handleNodeClick" default-expand-all :expand-on-click-node="false"/>
      </el-card>
      <!-- 树形列表 END -->
    </el-col>
    <el-col :span="16">
      <!-- 节点详情 BEGIN -->
      <el-card class="box-card" shadow="hover">
        <template #header>
          <div class="card-header">
            <span>{{ permit.id ? "权限详情" : "添加权限" }}</span>
            <el-button class="button" type="text" @click="handleAddClick">添加</el-button>
          </div>
        </template>
        <div style="display: flex; justify-content: center;">
          <el-form :model="permit" label-width="160px" label-position="left" class="from">
            <el-form-item label="父权限">
              <PermitSelect :permit-id="permit.parentId" :tree-data="selectTree" @change="(val) => permit.parentId = val"/>
            </el-form-item>
            <el-form-item label="权限类型">
              <el-select v-model="permit.type" clearable placeholder="请选择">
                <el-option label="功能接口" value="API" />
                <el-option label="页面路由" value="ROUTE" />
                <el-option label="其他" value="OTHER" />
              </el-select>
            </el-form-item>
            <el-form-item label="权限名">
              <el-input v-model="permit.name" />
            </el-form-item>
            <el-form-item label="KEY">
              <el-input v-model="permit.key" />
            </el-form-item>
            <el-form-item label="URL">
              <el-input v-model="permit.url" />
            </el-form-item>
          </el-form>
        </div>
        <el-button v-if="!permit.id" @click="permit = { department: { id: null } }">取消</el-button>
        <el-popconfirm v-if="permit.id" confirm-button-text="确认" cancel-button-text="取消"
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
import {modify, remove, tree, add} from "../../api/permit";
import PermitSelect from "../../components/permit/PermitSelect.vue";
import DepartmentSelect from "../../components/department/DepartmentSelect.vue";
import {ElMessage} from "element-plus";

export default {
  name: "Permit",
  components: {
    PermitSelect,
    DepartmentSelect,
  },
  setup() {
    const state = reactive({
      tree: [],
      selectTree: [],
      permit: {},
    }); // reactive 响应式对象声明

    onMounted(() => {
      loadData()
    })

    const loadData = () => {
      tree().then(res => {
        if (res.code === 200) {
          state.tree = res.data
          state.selectTree = []
          state.tree.forEach(item => {
            let data = {
              value: item.id,
              label: item.name,
              children: buildChildren(item)
            }
            state.selectTree.push(data)
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
      state.permit = data
      console.log(data)
    }

    const handleAddClick = () => {
      state.permit = {}
    }

    const handleSaveClick = async () => {
      let res = {}
      if (state.permit.type === "") {
        state.permit.type = null
      }
      if (state.permit.id) {
        res = await modify(state.permit);
      } else {
        res = await add(state.permit);
      }
      if (res.code === 200) {
        refresh();
        ElMessage.success(res.message)
      } else {
        ElMessage.error(res.message)
      }
    }

    const handleDeleteClick = () => {
      if (!state.permit.id) return
      remove(state.permit.id).then(res => {
        if (res.code === 200) {
          refresh();
          ElMessage.success(res.message)
        } else {
          ElMessage.error(res.message)
        }
      })
    }

    const refresh = () => {
      state.permit = {}
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