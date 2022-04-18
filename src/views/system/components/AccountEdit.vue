<template>
  <el-dialog v-model="visible" :title="row?.id ? '修改数据' : '新增数据'" width="40%" top="180px" center @close="close">

    <!-- 表单 BEGIN -->
    <el-scrollbar height="180px">
      <el-form :model="row" label-width="160px" label-position="left" class="from">
      <!--
        <el-form-item label="所属组织">
          <el-select placeholder="选择党组织" clearable v-model="row.department.id">
            <el-option label="机电学院" value="机电学院"/>
            <el-option label="汽车工程学院" value="汽车工程学院"/>
            <el-option label="土木与建筑工程学院" value="土木与建筑工程学院"/>
            <el-option label="计算机与通信工程学院" value="计算机与通信工程学院"/>
            <el-option label="公益慈善管理学院o" value="公益慈善管理学院"/>
            <el-option label="国际酒店与饮食文化学院" value="国际酒店与饮食文化学院"/>
            <el-option label="工商税务管理学院" value="工商税务管理学院"/>
            <el-option label="商学院" value="商学院"/>
            <el-option label="外国语学院" value="外国语学院"/>
            <el-option label="艺术学院" value="艺术学院"/>
          </el-select>
        </el-form-item>
      -->
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
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import {QuillEditor} from '@vueup/vue-quill'

export default {
  name: "Edit",
  components: {
    QuillEditor,
  },
  props: {
    mode: String,
    row: Object,
    visible: Boolean
  },
  emits: ["onSave", "onClose"], // 父组件传过来的事件
  setup(props, {emit}) {
    const save = () => {
      console.log("onSave:" + props.row)
      emit("onSave", props.row)
    }

    const close = (visible) => {
      emit("onClose", visible)
    }

    return {
      close,
      save
    };
  },
};
</script>

<style scoped>

</style>