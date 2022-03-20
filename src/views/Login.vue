<template>
  <div class="login_box">
    <el-form
      class="login_form"
      :model="loginForm"
      :rules="loginFormRules"
      ref="loginFormRef"
    >
      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          prefix-icon="user-filled"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" prefix-icon="lock" type="password"> </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
        <el-button type="info" @click="resetLoginForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { reactive, toRefs, ref } from "vue";
import axios from "axios";
import { logins } from '../api/user.js'
import router from "../router";
import { ElMessage } from 'element-plus';
function useRestLog(loginFormRef) {
  const resetLoginForm = () => {
    loginFormRef.value.resetFields();
  };
  return {
    resetLoginForm,
  };
}
function userLogin(loginFormRef, state){
  const login = () => {
    loginFormRef.value.validate(async (valid) => { // 获取表单校验的值
      if(!valid) return; // 没有校验通过就退出
      const params={
        account: state.loginForm.username,
        password: state.loginForm.password,
      };
      const res  = await logins( params );

        console.log(logins(params));
        console.log(res);
        // console.log(res.code);
        if (res.code === 200) {
            window.sessionStorage.setItem("token", res.data.data.token);
            router.push("/");
        } else {
            ElMessage.error(res.message);
        }
      
      // logins(params).then(function(res) {
      //   console.log(res);
      //   if (res.code === 200) {
      //       window.sessionStorage.setItem("token", res.data.data.token);
      //       router.push("/");
      //   } else {
      //       ElMessage.error(res.message);
      //   }
      // });


      // const res = await axios.post("/open/user/login", params);
      // console.log(res)

      // if(res.data.code === 200){
      //   ElMessage.success(res.message);
      //   window.sessionStorage.setItem("token", res.data.data.token); //
      //   router.push("/");
        
      // }else{
      //   ElMessage.error("登陆失败");
      // }
    });
    
    // ElMessage.success("登陆成功");
    //   window.sessionStorage.setItem("token", "abcdefg"); //测试
    //   router.push("/");
  };
  return {
    login,
  };
}
export default {
  setup() {
    const loginFormRef = ref();
    const state = reactive({
      loginForm: {
        username: "",
        password: "",
      },
    });
    const loginFormRules = {
      username: [
        { required: true, message: "请输入用户名", trigger: "blur" }, // 必选项，...，失去焦点时校验
        {
          min: 3,
          max: 12,
          message: "用户名的长度在3到12个字符之间",
          trigger: "blur",
        },
      ],
      password: [
        { required: true, message: "请输入用户密码", trigger: "blur" }, // 必选项，...，失去焦点时校验
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
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  margin: 0 auto;
}
.login_form {
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>