<template>
  <el-table :data="attachmentDetail?.requiredAttachments" style="width: 100%" height="460">
    <el-table-column prop="name" label="附件名"/>
    <el-table-column prop="quantity" label="要求">
      <template #default="scope">
        <span style="color: #1989fa">{{ scope.row?.submittedAttachments?.length}} </span><strong>/{{scope.row.quantity}}</strong>
      </template>
    </el-table-column>
    <el-table-column prop="quantity" label="详情">
      <template #default="scope">
        <p v-for="submittedAttachment in scope.row?.submittedAttachments">
          {{ submittedAttachment.name }} <el-link type="primary" :href="submittedAttachment.url" target="_blank">下载</el-link>
        </p>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "AuditSelect",
  props: {
    attachmentDetail: Object
  },
}
</script>

<style scoped>
</style>