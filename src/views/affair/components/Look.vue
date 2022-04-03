<template>
  <el-dialog v-model="centerDialogVisible"
             title="子阶段显示"
             width="40%"
             center
             @close="closeDialog">
    
  </el-dialog>
</template>

<script>
import { reactive, toRefs } from "@vue/reactivity";
export default {
  props: {
    // 规定父组件的数据类型
    centerDialogVisible: Boolean,
  },
  emits: ["onCloseDialog"], // 父组件传过来的事件
  setup(props, { emit }) {
    return {
      ...toRefs(state),
      closeDialog,
    };
  },
};
</script>

<style>
</style>