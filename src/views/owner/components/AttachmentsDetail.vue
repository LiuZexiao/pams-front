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
          <el-link type="info" :href="submittedAttachment.url" target="_blank">下载</el-link>&nbsp;
          <el-link type="primary" @click="handleRemove(submittedAttachment.id)">删除</el-link>
        </p>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="80">
      <template #default="scope">
        <el-upload
            class="upload-demo" multiple :limit="1"
            name="attachment"
            :action="baseUrl + '/owner/user/info/stage/attachment'"
            :data="{stageAttachmentId: scope.row.id, userInfoStageId: attachmentDetail.userInfoStageId}"
            :headers="{ token }"
            :on-exceed="handleFileExceed"
            :on-success="handleUploadSuccess"
            :file-list="fileList"
        >
          <el-button size="small" type="primary">上传</el-button>
        </el-upload>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>

import {reactive, toRefs} from "vue";
import {ElMessage} from "element-plus";
import {removeAttachment} from "../../../api/owner/userInfoStageAttachment";

export default {
  name: "AttachmentDetail",
  props: {
    attachmentDetail: Object
  },
  setup() {
    const state = reactive({
      fileList: [],
      baseUrl: import.meta.env.VITE_APP_URL,
      token: localStorage.getItem('token'),
    }); // reactive 响应式对象声明

    const handleRemove = (id) => {
      removeAttachment(id).then(res => {
        if (res.code === 200) {
          ElMessage.success(res.message)
          location.reload()
        } else {
          ElMessage.error(res.message)
        }
      })
    }

    const handleFileExceed = () => {
      ElMessage.warning("请删除已上传的文件")
    }

    const handleUploadSuccess = () => {
      ElMessage.success("上传成功")
      location.reload()
    }

    return {
      ...toRefs(state),
      handleRemove,
      handleFileExceed,
      handleUploadSuccess,
    }
  }
}
</script>

<style scoped>
</style>