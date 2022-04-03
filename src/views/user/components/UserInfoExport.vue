<template>
  <el-dialog v-model="visible" title="导出用户信息" width="40%" top="80px" center @close="close">

    <!-- 表单 BEGIN -->
    <el-scrollbar height="600px">
      <el-form :model="row" label-width="160px" label-position="left" class="from">
        <el-form-item label="文件名">
          <el-input placeholder="请输入文件名" v-model="params.fileName" />
        </el-form-item>
        <el-form-item label="党组织">
          <el-tree-select placeholder="选择党组织" clearable v-model="params.departmentId" :data="departmentTree" check-strictly/>
        </el-form-item>
        <el-form-item label="模板">
          <el-select placeholder="选择模板" clearable v-model="params.templateId" @change="handleTemplateChange">
            <el-option v-for="template in templateList" :label="template.name" :value="template.id" />
          </el-select>
        </el-form-item>
      </el-form>
      <el-table :data="columns" style="width: 100%" height="400">
        <el-table-column prop="sort" label="排序" width="100"/>
        <el-table-column prop="name" label="列名" width="300"/>
        <el-table-column prop="key" label="键值" width="300" />
      </el-table>
    </el-scrollbar>
    <!-- 表单 END -->

    <!-- FOOTER BEGIN -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="()=>{close(false);}">取消</el-button>
        <el-button type="primary" @click="handleExport">导出</el-button>
      </span>
    </template>
    <!-- FOOTER END -->
  </el-dialog>
</template>

<script>
import {onMounted, reactive, toRefs} from "vue";
import {tree} from "../../../api/department";
import {fetchList} from "../../../api/tableTemplate";
import {ElMessage} from "element-plus";
import {convertRes2Blob} from "../../../utils/fileUtil";
import {userInfoExport} from "../../../api/userInfo";

export default {
  name: "UserInfoExport",
  props: {
    visible: Boolean
  },
  emits: ["onClose"], // 父组件传过来的事件
  setup(props, { emit }) {

    onMounted(() => {
      listTreeDepartment()
      listTemplate()
    })

    const state = reactive({
      params: {
        departmentId: null,
        fileName: null,
        templateId: null,
      },
      departmentTree: [],
      templateList: [],
      columns: [],
    }); // reactive 响应式对象声明

    const handleExport = async () => {
      convertRes2Blob(await userInfoExport(state.params))
    }

    const close = (visible) => {
      emit("onClose", visible)
    }

    const handleTemplateChange = (val) => {
      console.log("handleTemplateChange" + val)
      state.params.templateId = val
      state.templateList.forEach(item => {
        console.log("handleTemplateChange::forEach" + item)
        if (val === item.id) {
          state.columns = item.columns
        }
      })
    }

    const listTemplate = () => {
      fetchList().then(res => {
        if (res.code === 200) {
          state.templateList = res.data
        } else {
          ElMessage.error(res.message)
        }
      })
    }

    const listTreeDepartment = () => {
      tree().then(res => {
        if (res.code === 200) {
          const department = {
            value: res.data.id,
            label: res.data.name,
            children: buildChildren(res.data.children)
          }
          state.departmentTree.push(department)
          console.log("listTreeDepartment:" + JSON.stringify(state.departmentTree))
        } else {
          ElMessage.error(res.message)
        }
      })
    }

    const buildChildren = (children) => {
      let childrenList = []
      children.forEach(item => {
        let department = {
          value: item.id,
          label: item.name,
          children: buildChildren(item.children)
        }
        childrenList.push(department)
      })
      return childrenList;
    }

    return {
      ...toRefs(state), //toRefs将对象中的内容转换为响应式数据
      handleTemplateChange,
      handleExport,
      close,
    };
  },
};
</script>

<style scoped>

</style>