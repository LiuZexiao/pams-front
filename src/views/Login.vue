<template>
  <div class="login_box">
    <el-card class="login_card">
      <div style="text-align: center;width: 100%;">
        <h2>党务系统登录</h2>
      </div>
      <el-form class="login_form" :model="loginForm" :rules="loginFormRules" ref="loginFormRef" label-width="66px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" prefix-icon="user-filled"/>
        </el-form-item>
        <el-form-item label="密 码" prop="password" v-if="loginForm.method === 'pwd'">
          <el-input v-model="loginForm.password" prefix-icon="lock" type="password"/>
        </el-form-item>
        <el-form-item label="验证码" prop="verCode" v-if="loginForm.method === 'vc'">
          <el-input v-model="loginForm.verCode" prefix-icon="lock" style="width: 66%;"/>&nbsp;
          <el-link @click="getVerCode">{{countDownState.count === 0 ? "获取验证码" : countDownState.count}}</el-link>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
          <el-button @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
      <div style="text-align: right; width: 100%;">
        <el-link v-if="loginForm.method === 'pwd'" @click="loginForm.method='vc'">验证码登录</el-link>&nbsp;
        <el-link v-else @click="loginForm.method='pwd'">密码登录</el-link>&nbsp;
        <el-link href="https://element.eleme.io" target="_blank">忘记密码</el-link>
      </div>
    </el-card>
  </div>
</template>

<script>
import {reactive, toRefs, ref, onMounted} from "vue";
import {ElMessage} from 'element-plus';
import countDown from "../assets/js/countDown.js";
import {logins} from '../api/user.js'
import {smsVerCode, emailVerCode} from "../api/message";

const loginWay = {
  VC: "vc",
  PWD: "pwd",
}

const count = 60
const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;

function useRestLog(loginFormRef) {
  const resetLoginForm = () => {
    loginFormRef.value.resetFields();
  };
  return {
    resetLoginForm,
  };
}

function userLogin(loginFormRef, state) {
  const login = () => {
    loginFormRef.value.validate(async (valid) => { // 获取表单校验的值async
      if (!valid) return; // 没有校验通过就退出
      const params = {
        account: state.loginForm.username,
        password: state.loginForm.password,
        verCode: state.loginForm.verCode,
        method: state.loginForm.method
      };

      const res = await logins(params);
      if (res.code === 200) {
        window.sessionStorage.setItem("token", res.data.token);
        window.location.href = "/user/list"
      } else {
        ElMessage.error(res.message);
      }
    });
  };
  return {
    login,
  };
}

export default {
  setup() {
    const loginFormRef = ref();
    const loginFormRules = {
      username: [
        {required: true, message: "请输入用户名", trigger: "blur"}, // 必选项，...，失去焦点时校验
        {
          min: 3,
          max: 36,
          message: "用户名的长度在3到36个字符之间",
          trigger: "blur",
        },
      ],
      password: [
        {required: true, message: "请输入用户密码", trigger: "blur"}, // 必选项，...，失去焦点时校验
        {
          min: 6,
          max: 15,
          message: "用户密码的长度在6到15个字符之间",
          trigger: "blur",
        },
      ],
    };
    const state = reactive({
      loginForm: {
        username: "",
        password: "",
        method: loginWay.PWD,
        verCode: ""
      },
    });
    onMounted(() => {
      if (window.sessionStorage.getItem("token")) {
        window.location.href = "/dashboard"
      }
    })
    const { state: countDownState, start: startTimeout } = countDown(60)

    const getVerCode = async () => {
      let account = state.loginForm.username
      if (!account) {
        ElMessage.error("请输入账号")
        return
      }
      let res = null;
      if (regEmail.test(account)) {
        res = await emailVerCode(account)
      } else if (regMobile.test(account)) {
        res = await smsVerCode(account)
      } else {
        ElMessage.error("请输入邮箱或验证码")
        return
      }
      if (res.code === 200) {
        ElMessage.success("验证码已发送")
      } else {
        ElMessage.error(res.message)
      }
    }

    return {
      ...toRefs(state),
      loginFormRules,
      loginFormRef,
      countDownState,
      startTimeout,
      getVerCode,
      ...useRestLog(loginFormRef),
      ...userLogin(loginFormRef, state),
    };
  },

};
</script>

<style>
body {
  background: #de2910;
  background-image: url("../assets/login-bg.jpg");
  background-repeat: repeat-x;
}

.login_box {
  display: flex;
  justify-content: center;
  margin-top: 220px;
}

.login_card {
  text-align: center;
  width: 460px;
  height: 300px;
  background-color: rgba(0, 0, 0, 0);
  border: rgba(0, 0, 0, 0);
}

.login_form {
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>

