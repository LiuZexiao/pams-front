<template>
  <!-- 修改手机号 -->
  <div class="title">绑定手机号</div>
  <el-form :model="userData"
           ref="nameRef"
           label-width="40%"
           label-position="right"
           class="demo-ruleForm"
           :rules="rules">
    <el-form-item label="手机号："
                  prop="phone">
      <el-input style="width: 200px"
                v-model="userData.phone"></el-input>
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
import { bindPhone } from "../../../api/owner/user.js";
import {ElMessage} from 'element-plus';
import countDown from "../../../utils/countDown.js";
import {smsVerCode, emailVerCode} from "../../../api/message";
export default {
 name: "phone",
  setup() {
    const state = reactive({
      userData: {
        phone: localStorage.getItem('phone'),
        vrCode: "",
      },
      rules: {
         vrCode: { required: true, message: "请输入验证码", trigger: "blur" },
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern:
              /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/,
            message:
              "正确手机号码",
          },
        ],
       
      },
    });
     const { state: countDownState, start: startTimeout } = countDown(60)
    const getVerCode = async () => {
      let account = state.userData.phone
      if (!account) {
        ElMessage.error("请输入手机号")
        return
      }
      let res = {};
      // if (regEmail.test(account)) {
      //   res = await emailVerCode(account)
      // } else if (regMobile.test(account)) {
        res = await smsVerCode(account)
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
      bindPhone(params).then((res) => {
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