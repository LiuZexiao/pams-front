<template>
  <el-tree-select v-model="stageId" clearable check-strictly placeholder="请选择阶段"
                  :data="treeData"
                  @change="(val) => emit('onChange', val)" />
</template>

<script>

export default {
  name: "StageSelect",
  props: {
    stageId: String,
    treeData: Array
  },
  emits: ["onChange"], // 父组件传过来的事件
  setup(props, { emit }) {
    return {
      emit,
    }
  },
}
</script>

<style scoped>
</style>