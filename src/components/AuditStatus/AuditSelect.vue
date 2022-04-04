<template>
  <el-select v-model="state" clearable placeholder="请选择状态" @change="(val) => emit('onChange', val)">
    <el-option label="待审核" value="UNDER_REVIEW" />
    <el-option label="审核中" value="REVIEWING" />
    <el-option label="通过" value="PASSED" />
    <el-option label="不通过" value="FAIL" />
  </el-select>
</template>

<script>
export default {
  name: "AuditSelect",
  props: {
    state: String
  },
  emits: ["onChange"], // 父组件传过来的事件
  setup(props, { emit }) {
    return {
      emit
    }
  },
}
</script>

<style scoped>
</style>