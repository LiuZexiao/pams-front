<template>
  <el-table :data="attachmentDetail?.requiredAttachments" style="width: 100%">
    <el-table-column prop="name" label="附件名"/>
    <el-table-column prop="quantity" label="要求">
      <template #default="scope">
        <span style="color: #1989fa">{{ scope.row?.submittedAttachments?.length}} </span><strong>/{{scope.row.quantity}}</strong>
      </template>
    </el-table-column>
    <el-table-column prop="quantity" label="详情">
      <template #default="scope">
        <p v-for="submittedAttachment in scope.row?.submittedAttachments">
          {{ submittedAttachment.name }}
          <el-link type="primary" :href="submittedAttachment.url" target="_blank">下载</el-link> |
          <el-link v-if="scope.row.name === '思想报告'" type="info" @click="handleSummary(submittedAttachment.id)">摘要</el-link>
        </p>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import {ElMessage, ElMessageBox} from "element-plus";
import {summary} from "../api/userInfoStageAttachment";
import {reactive, toRefs} from "vue";

export default {
  name: "AuditSelect",
  props: {
    attachmentDetail: Object
  },
  setup() {
    const handleSummary = (id) => {
      summary(id).then(res => {
        if (res.code === 200) {
          ElMessageBox.alert(res.data, '思想报告摘要', {
            confirmButtonText: 'OK',
            callback: (action) => {},
          })
        } else {
          ElMessage.error(res.message)
        }
      })
    }
    return {
      handleSummary,
    }
  }
}
</script>

<style scoped>
</style>