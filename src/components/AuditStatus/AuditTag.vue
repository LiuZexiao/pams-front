<template>
  <el-tag v-if="state === 'UNDER_REVIEW'" type="info">待审核</el-tag>
  <el-tag v-if="state === 'REVIEWING'" type="warning">审核中</el-tag>
  <el-tag v-if="state === 'PASSED'" type="success">通过</el-tag>
  <el-tag v-if="state === 'FAIL'" type="danger">不通过</el-tag>
</template>

<script>
export default {
  name: "AuditTag",
  props: {
    state: String
  }
}
</script>

<style scoped>

</style>