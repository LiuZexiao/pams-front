<template>
  <el-dialog v-model="visible" :title="row?.id ? '修改数据' : '新增数据'" width="40%" top="180px" center @close="close">

    <!-- 表单 BEGIN -->
    <el-form :model="row" label-width="160px" label-position="left" class="from">
      <el-form-item label="上级党组织">
        <DepartmentSelect :department-id="row.parentId" :tree-data="treeData" @change="(val) => row.parentId = val"/>
      </el-form-item>
      <el-form-item label="级别">
        <el-input v-model="row.level" />
      </el-form-item>
      <el-form-item label="组织名">
        <el-input v-model="row.name" />
      </el-form-item>
    </el-form>
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
import { remove as removeAttachment } from "../../../api/stageAttachment"
import { userInfoKey} from "../../../api/userInfo"
import {ElMessage} from "element-plus";
import DepartmentSelect from "../../../components/department/DepartmentSelect.vue";
import {tree} from "../../../api/department";
import {onMounted, reactive, toRefs} from "vue";
export default {
  name: "DepartmentEdit",
  components: {
    DepartmentSelect,
  },
  props: {
    row: Object,
    visible: Boolean
  },
  emits: ["onSave", "onClose"], // 父组件传过来的事件
  setup(props, { emit }) {

    const state = reactive({
      treeData: [],
    }); // reactive 响应式对象声明

    onMounted(() => {
      loadData()
    })

    const loadData = () => {
      tree().then(res => {
        if (res.code === 200) {
          let data = {
            value: res.data.id,
            label: res.data.name,
            children: buildChildren(res.data)
          }
          state.treeData.push(data)
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

    const handleDeleteColumn = (index) => {
      let column = props.row.attachments[index]
      if (column.id != null) {
        removeAttachment(column.id).then(res => {
          if (res.code === 200) {
            props.row.attachments.splice(index, 1)
            ElMessage.success(res.message)
          } else {
            ElMessage.error(res.message)
          }
        })
      } else {
        props.row.attachments.splice(index, 1)
      }
    }

    const save = () => {
      emit("onSave", props.row)
    }

    const close = (visible) => {
      emit("onClose", visible)
    }

    return {
      ...toRefs(state), //toRefs将对象中的内容转换为响应式数据
      userInfoKey,
      handleDeleteColumn,
      close,
      save
    };
  },
};
</script>

<style scoped>

</style>