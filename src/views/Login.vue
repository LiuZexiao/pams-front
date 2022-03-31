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
        <el-form-item label="密 码" prop="password" v-if="currentLoginWay === 'pwd'">
          <el-input v-model="loginForm.password" prefix-icon="lock" type="password"/>
        </el-form-item>
        <el-form-item label="验证码" prop="verCode" v-if="currentLoginWay === 'vc'">
          <el-input v-model="loginForm.verCode" prefix-icon="lock" style="width: 66%;"/>&nbsp;
          <el-link>获取验证码</el-link>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
          <el-button @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
      <div style="text-align: right; width: 100%;">
        <el-link v-if="currentLoginWay === 'pwd'" @click="currentLoginWay='vc'">验证码登录</el-link>&nbsp;
        <el-link v-else @click="currentLoginWay='pwd'">密码登录</el-link>&nbsp;
        <el-link href="https://element.eleme.io" target="_blank">忘记密码</el-link>
      </div>
    </el-card>
  </div>
</template>

<script>
import {reactive, toRefs, ref} from "vue";
import axios from "axios";
import {logins} from '../api/user.js'
import router from "../router";
import {ElMessage} from 'element-plus';

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
      };

      const res = await logins(params);
      if (res.code === 200) {
        window.sessionStorage.setItem("token", res.data.token);
        router.push("/user/list");
      } else {
        ElMessage.error(res.message);
      }

      // logins(params).then(function(res) {
      //   console.log(res);
      // if (res.code === 200) {
      //     window.sessionStorage.setItem("token", res.data.data.token);
      //     router.push("/");
      // } else {
      //     ElMessage.error(res.message);
      // }
      // });


      // const res = await axios.post("/open/user/login", params);
      // console.log(res)

    });

    // ElMessage.success("登陆成功");
    //   window.sessionStorage.setItem("token", "abcdefg"); //测试
    //   router.push("/");
  };
  return {
    login,
  };
}

const loginWay = {
  VC: "vc",
  PWD: "pwd",
}

export default {
  setup() {
    const loginFormRef = ref();
    const state = reactive({
      currentLoginWay: loginWay.PWD,
      loginForm: {
        username: "",
        password: "",
        method: loginWay.PWD,
        verCode: ""
      },
    });
    const loginFormRules = {
      username: [
        {required: true, message: "请输入用户名", trigger: "blur"}, // 必选项，...，失去焦点时校验
        {
          min: 3,
          max: 12,
          message: "用户名的长度在3到12个字符之间",
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
    return {
      ...toRefs(state),
      loginFormRules,
      loginFormRef,
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

