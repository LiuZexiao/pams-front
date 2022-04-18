<template>
  <!-- 修改邮箱 -->
  <div class="title">绑定邮箱</div>
  <el-form :model="userData"
           ref="nameRef"
           label-width="40%"
           label-position="right"
           class="demo-ruleForm"
           :rules="rules">
    <el-form-item label="邮箱："
                  prop="email">
      <el-input style="width: 200px"
                v-model="userData.email"></el-input>
    </el-form-item>
    <el-form-item label="验证码："
                  prop="vrCode">
      <el-input style="width: 200px"
                v-model="userData.vrCode"></el-input>
       <el-link @click="getVerCode">{{countDownState.count === 0 ? "获取验证码" : countDownState.count}}</el-link>
    </el-form-item>
    <el-form-item>
      <el-button type="danger"
                 @click="submitName">确认修改</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { reactive, ref, toRefs } from "vue";
import { bindEmail } from "../../../api/owner/user.js";
import {ElMessage} from 'element-plus';
import countDown from "../../../utils/countDown.js";
import {smsVerCode, emailVerCode} from "../../../api/message";
export default {
 name: "phone",
  setup() {
    const state = reactive({
      userData: {
        email: localStorage.getItem('email'),
        vrCode: "",
      },
      rules: {
         vrCode: { required: true, message: "请输入验证码", trigger: "blur" },
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            pattern:/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/,
            message:
              "邮箱",
          },
        ],
       
      },
    });
     const { state: countDownState, start: startTimeout } = countDown(60)
    const getVerCode = async () => {
      let account = state.userData.email
      if (!account) {
        ElMessage.error("请输入邮箱")
        return
      }
      let res = {};
      // if (regEmail.test(account)) {
      //   res = await emailVerCode(account)
      // } else if (regMobile.test(account)) {
        res = await emailVerCode(account)
      // } else {
      //   ElMessage.error("请输入邮箱或验证码")
      //   return
      // }
      if (res.code === 200) {
        ElMessage.success("验证码已发送")
      } else {
        ElMessage.error(res.message)
      }
    }
    const submitName = () => {
      let params = state.userData
      bindEmail(params).then((res) => {
        console.log();
      if (res.code === 200) {
        ElMessage.success(res.message)
        loadData(state)
      } else {
        ElMessage.error(res.message)
      }
      });
    };

    return {
      ...toRefs(state),
      submitName,
      getVerCode,
      countDownState
    };
  },
}
</script>

<style>
.title {
  margin-bottom: 30px;
  text-align: center;
  font-weight: 800;
  font-size: 25px;
}
</style>