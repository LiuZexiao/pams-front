<template>
  <!-- 更新账号信息 -->
  <div class="title" >账号信息</div>
  <el-form :model="account" ref="nameRef" label-width="40%" label-position="right" class="demo-ruleForm">
    <el-form-item label="头像：" prop="avatar">
      <el-upload class="avatar-uploader" multiple name="attachment"
                 :limit="1"
                 :file-list="fileList"
                 :action="baseUrl + '/open/oss/upload'"
                 :show-file-list="false"
                 :on-success="handleUploadSuccess"
      >
        <img v-if="account.avatar" :src="account.avatar" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
    </el-form-item>
    <el-form-item label="账号：" prop="account">
      <el-input style="width: 200px" v-model="account.username"></el-input>
    </el-form-item>
  </el-form>
  <div style="display: flex;justify-content: center">
    <el-button type="danger" @click="handleUpdateAccount">保存</el-button>
    <el-button type="pirmary" @click="handleCancelUpdate">取消</el-button>
  </div>

</template>

<script>
import { reactive, onMounted, ref, toRefs } from "vue";
import { save } from "../../../api/owner/user.js";
import {ElMessage} from "element-plus";

export default {
  name: "updateAccount",
  setup() {
    const state = reactive({
      account: {},
      baseUrl: import.meta.env.VITE_APP_URL,
      fileList: [],
    });

    onMounted(() => {
      state.account = JSON.parse(localStorage.getItem("account"))
    });

    const handleUpdateAccount = () => {
      let account = state.account
      save({avatar: account.avatar, username: account.username}).then(res => {
        if (res.code === 200) {
          localStorage.setItem("account", JSON.stringify(account))
          ElMessage.success(res.message)
        } else {
          ElMessage.error(res.message)
        }
      })
    };

    const handleCancelUpdate = () => {
      state.account = JSON.parse(localStorage.getItem("account"))
    };

    const handleUploadSuccess = (res) => {
      console.log(res, 'upload')
      if (res.code === 200) {
        state.account.avatar = res.data
        state.fileList = []
      }
    }
  
    return {
      ...toRefs(state),
      handleUpdateAccount,
      handleUploadSuccess,
      handleCancelUpdate,
    };
  },
};
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: block;
}
</style>

<style>
.title{
  margin-bottom: 30px;
  text-align: center;
  font-weight: 800;
  font-size: 25px;

}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  text-align: center;
}
</style>