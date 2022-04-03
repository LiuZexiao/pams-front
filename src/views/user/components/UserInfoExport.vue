<template>
  <el-dialog v-model="visible" title="导出用户信息" width="40%" top="80px" center @close="close">

    <!-- 表单 BEGIN -->
    <el-scrollbar height="600px">
      <el-radio v-model="mode" :label="MODE_TYPE.CUSTOMIZE">自定义</el-radio>
      <el-radio v-model="mode" :label="MODE_TYPE.TEMPLATE">选择模板</el-radio>
    </el-scrollbar>
    <!-- 表单 END -->

    <!-- FOOTER BEGIN -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="()=>{close(false);}">取消</el-button>
        <el-button type="primary">导出</el-button>
      </span>
    </template>
    <!-- FOOTER END -->
  </el-dialog>
</template>

<script>
import {reactive, toRefs} from "vue";

const MODE_TYPE = {
  CUSTOMIZE: "customize",
  TEMPLATE: "template"
}

export default {
  name: "UserInfoExport",
  props: {
    visible: Boolean
  },
  emits: ["onClose"], // 父组件传过来的事件
  setup(props, { emit }) {

    const state = reactive({
      mode: MODE_TYPE.CUSTOMIZE, // 自定义还是按模板导出
    }); // reactive 响应式对象声明

    const close = (visible) => {
      emit("onClose", visible)
    }

    return {
      ...toRefs(state), //toRefs将对象中的内容转换为响应式数据
      MODE_TYPE,
      close,
    };
  },
};
</script>

<style scoped>

</style>