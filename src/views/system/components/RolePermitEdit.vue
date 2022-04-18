<template>
  <el-dialog v-model="visible" :title="row?.id ? '修改数据' : '新增数据'" width="40%" top="80px" center @close="close">

    <!-- 表单 BEGIN -->
    <el-form :model="row" label-width="160px" label-position="left" class="from">
      <el-form-item label="权限">
        <PermitSelect :permit-id="row.permit.id" @change="(val) => row.permit.id = val"/>
      </el-form-item>
      <el-form-item label="可读">
        <el-switch v-model="row.read" />
      </el-form-item>
      <el-form-item label="可写">
        <el-switch v-model="row.write" />
      </el-form-item>
      <el-form-item label="可执行">
        <el-switch v-model="row.execute" />
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
import PermitSelect from "../../../components/permit/PermitSelect.vue";
import {fetchTree} from "../../../api/stage";
import {onMounted, reactive, toRefs} from "vue";
export default {
  name: "StageEdit",
  components: {
    PermitSelect,
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
      fetchTree().then(res => {
        if (res.code === 200) {
          res.data.forEach(item => {
            let data = {
              value: item.id,
              label: item.name,
              children: buildChildren(item)
            }
            state.treeData.push(data)
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

    const handleAddColumn = () => {
      let column = {
        stageId: props.row.id,
        name: null,
        quantity: 0,
        sort: null,
      }
      props.row.attachments.push(column)
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
      handleAddColumn,
      handleDeleteColumn,
      close,
      save
    };
  },
};
</script>

<style scoped>

</style>