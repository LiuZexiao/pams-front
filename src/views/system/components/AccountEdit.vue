<template>
  <el-dialog v-model="visible" :title="row?.id ? '修改数据' : '新增数据'" width="40%" top="80px" center @close="close">

    <!-- 表单 BEGIN -->
    <el-scrollbar height="600px">
      <el-card class="box-card" style="margin-top: 15px" shadow="hover">
        <template #header>
          <div class="card-header">
            <span>账号信息</span>
          </div>
        </template>
        <el-form :model="row" label-width="160px" label-position="left" class="from">
          <el-form-item label="所属组织">
            <DepartmentSelect :department-id="row.department.id" @change="(val) => row.department.id = val"/>
          </el-form-item>
          <el-form-item label="账户名">
            <el-input v-model="row.username"/>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="row.email"/>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="row.phone"/>
          </el-form-item>
        </el-form>
      </el-card>
      <el-card v-if="mode !== 'add'" class="box-card" style="margin-top: 15px" shadow="hover">
        <template #header>
          <div class="card-header">
            <span>账号角色</span>
          </div>
        </template>
        <el-tree :data="roleTree" :props="defaultProps" :default-checked-keys="defaultChecked" node-key="id"
                 default-expand-all show-checkbox check-on-click-node :expand-on-click-node="false" check-strictly
                 @check-change="handleCheckChange"/>
      </el-card>
    </el-scrollbar>
    <!-- 表单 END -->

    <!-- FOOTER BEGIN -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="()=>{close(false);}">取消</el-button>
        <el-button type="primary" @click="save">保存</el-button>
      </span>
    </template>
    <!-- FOOTER END -->
  </el-dialog>
</template>

<script>
import DepartmentSelect from "../../../components/department/DepartmentSelect.vue";
import {onMounted, reactive, toRefs} from "vue";
import {tree} from "../../../api/role";
import {ElMessage} from "element-plus";
import {fetchUserRoles, save as update, remove} from "../../../api/userRole";

export default {
  name: "Edit",
  components: {
    DepartmentSelect,
  },
  props: {
    mode: String,
    row: Object,
    visible: Boolean
  },
  emits: ["onSave", "onClose"], // 父组件传过来的事件
  setup(props, {emit}) {
    const state = reactive({
      roleTree: [],
      defaultChecked: []
    }); // reactive 响应式对象声明

    onMounted(() => {
      loadData()
    })

    const loadData = () => {
      tree().then(res => {
        if (res.code === 200) {
          state.roleTree = res.data
          listUserRole()
        } else {
          ElMessage.error(res.message)
        }
      })
    }

    const handleCheckChange = async (data, checked, indeterminate) => {
      console.log(data, checked, indeterminate)
      let userRole = {
        user: props.row,
        role: data
      }
      let res = {}
      if (checked) {
        res = await update(userRole);
      } else {
        res = await remove(userRole);
      }
      if (res.code === 200) {
        listUserRole()
      } else {
        ElMessage.error(res.message)
      }
    }

    const listUserRole = () =>　{
      fetchUserRoles(props.row.id).then(res => {
        if (res.code === 200) {
          state.defaultChecked = []
          res.data.forEach(role => {
            state.defaultChecked.push(role.id)
          })
        }
      })
    }

    const save = () => {
      console.log("onSave:" + props.row)
      emit("onSave", props.row)
    }

    const close = (visible) => {
      emit("onClose", visible)
    }

    return {
      ...toRefs(state), //toRefs将对象中的内容转换为响应式数据
      defaultProps,
      handleCheckChange,
      close,
      save
    };
  },
};

const defaultProps = {
  children: 'children',
  label: 'name',
}
</script>

<style scoped>

</style>