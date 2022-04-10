<template>
  <!-- 修改账户密码 -->
  <div class="title">修改密码</div>
  <el-form :model="userData"
           ref="nameRef"
           label-width="40%"
           label-position="right"
           class="demo-ruleForm"
           :rules="rules">
    <el-form-item label="旧密码："
                  prop="oldPwd">
      <el-input style="width: 200px"
                type="password"
                v-model="userData.oldPwd"></el-input>
    </el-form-item>
    <el-form-item label="新密码："
                  prop="newPwd">
      <el-input style="width: 200px"
                type="password"
                v-model="userData.newPwd"></el-input>
    </el-form-item>
    <el-form-item label="确认新密码："
                  prop="repassword">
      <el-input style="width: 200px"
                type="password"
                v-model="userData.repassword"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="danger"
                 @click="submitName">确认修改</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { reactive, ref, toRefs } from "vue";
import { modifyPassword } from "../../..//api/userInfo.js";
function validatePass2(rule, value, callback, state) {
  console.log(state.userData.newPwd)
  if (value === "") {
    callback(new Error("请再次输入密码"));
  } 
  // else if (value !== userData.newPwd) {  // 无法获取数据
  //   callback(new Error("两次输入密码不一致!"));
  // } 
  else {
    callback();
  }
}
export default {
  name: "updatePassword",
  setup() {
    const state = reactive({
      userData: {
        oldPwd: "",
        newPwd: "",
        repassword: "",
      },
      rules: {
         oldPwd: { required: true, message: "请输入旧密码", trigger: "blur" },
        newPwd: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          // {
          //   pattern:
          //     /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,30}$/,
          //   message:
          //     "密码为数字，小写字母，大写字母，特殊符号 至少包含三种，长度为 8 - 30位，密码不能包含 用户名，公司名称(lidian), 公司域名(rekoon) （判断的时候不区分大小写)",
          // },
        ],
        repassword: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
      },
    });

    const submitName = () => {
      modifyPassword(state.userData).then((res) => {
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
      validatePass2,
      submitName,
    };
  },
};
</script>

<style>
.title {
  margin-bottom: 30px;
  text-align: center;
  font-weight: 800;
  font-size: 25px;
}
</style>