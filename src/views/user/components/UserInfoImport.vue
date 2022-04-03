<template>
  <el-dialog v-model="visible" title="导入用户信息" width="40%" top="80px" center @close="close">

    <!-- 表单 BEGIN -->
    <el-scrollbar height="600px">
      <el-form :model="row" label-width="160px" label-position="left" class="from">
        <el-form-item label="党组织">
          <el-tree-select placeholder="选择党组织" clearable v-model="params.departmentId" :data="departmentTree" check-strictly/>
        </el-form-item>
        <el-form-item label="模板">
          <el-select placeholder="选择模板" clearable v-model="params.templateId" @change="handleTemplateChange">
            <el-option v-for="template in templateList" :label="template.name" :value="template.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="上传文件">
          <input type="file" placeholder="请上传文件" @change="handleFileChange" />
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
        <el-button type="primary" @click="handleImport">导入</el-button>
        <el-button type="info" @click="handleDownload">下载模板</el-button>
      </span>
    </template>
    <!-- FOOTER END -->
  </el-dialog>
</template>

<script>
import {onMounted, reactive, toRefs} from "vue";
import {tree} from "../../../api/department";
import {download, fetchList} from "../../../api/tableTemplate";
import {ElMessage} from "element-plus";
import {userInfoImport} from "../../../api/userInfo";
import {convertRes2Blob} from "../../../utils/fileUtil";

export default {
  name: "UserInfoExport",
  props: {
    visible: Boolean
  },
  emits: ["onClose", "onSuccess"], // 父组件传过来的事件
  setup(props, { emit }) {

    onMounted(() => {
      listTreeDepartment()
      listTemplate()
    })

    const state = reactive({
      params: {
        departmentId: null,
        file: null,
        templateId: null,
      },
      files: [],
      departmentTree: [],
      templateList: [],
      columns: [],
    }); // reactive 响应式对象声明

    const handleImport = async () => {
      const formData = new FormData();
      formData.append("file", state.files[0])
      formData.append("departmentId", state.params.departmentId)
      formData.append("templateId", state.params.templateId)
      userInfoImport(formData, state.params.templateId).then(res => {
        if (res.code === 200) {
          ElMessage.success(res.message)
          emit("onSuccess")
        } else {
          ElMessage.error(res.message)
        }
      })
    }

    const close = (visible) => {
      emit("onClose", visible)
    }

    const handleFileChange = (e) => {
      console.log("handleFileChange" + JSON.stringify(e))
      const input  = e.target;
      let files = input.files;
      if(files){
        console.log(files[0])
      }
      state.files = files;
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

    const handleDownload = async () => {
      if (state.params.templateId) {
        convertRes2Blob(await download(state.params.templateId))
      } else {
        ElMessage.error("请选择模板")
      }
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
      handleFileChange,
      handleImport,
      handleDownload,
      close,
    };
  },
};
</script>

<style scoped>

</style>