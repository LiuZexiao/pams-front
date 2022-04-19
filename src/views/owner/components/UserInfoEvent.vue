<template>
  <el-card shadow="hover" class="box-card " style="margin-top: 15px">
    <template #header>
      <div class="card-header" style="text-align: left;line-height: 0px;">
        <el-icon>
          <aim/>
        </el-icon>
        会议活动信息
      </div>
    </template>
    <el-table :data="tableData" style="width: 100%">
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
    <el-pagination background layout="sizes, prev, pager, next, jumper, ->, total"
                   :total="total"
                   :page-size="params.size"
                   v-model:current-page="params.page"
                   @size-change="(pageSize) => {
          params.size = pageSize
          loadData()
        }"
                   @current-change="(current) => {
          params.page = current
          loadData()
        }"
    />
  </el-card>
</template>

<script>
import {onMounted, reactive, toRefs} from "vue";
import {fetchByPage} from "../../../api/owner/userEvent";
import {ElMessage} from "element-plus";
export default {
  name: "UserInfoStage",
  components: {
  },
  setup() {
    const state = reactive({
      userInfo: {},
      tableData: [],
      params: {
        page: 1, // 几页
        search: null, // 模糊查询内容
        size: 10, // 每页显示几条
        sort: null,
        sortType: null,
        state: null
      },
      total: 0,
    });

    onMounted(() => {
      state.userInfo = JSON.parse(localStorage.getItem("userInfo"))
      loadData()
    })

    const loadData = () => {
      // fetchByPage(state.params).then(res => {
      //   if (res.code === 200) {
      //     state.tableData = res.data.content
      //     state.total =res.data.totalElements
      //     state.params.size = res.data.size
      //     state.params.page = res.data.number + 1
      //   } else {
      //     ElMessage.error(res.message)
      //   }
      // })
    }

    return {
      ...toRefs(state), //toRefs将对象中的内容转换为响应式数据
      loadData,
    }
  }
}
</script>

<style scoped>

</style>