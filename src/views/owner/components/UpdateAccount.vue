<template>
  <!-- 更新账号信息 -->
  <div class="title" >账号信息</div>
  <el-form :model="userData"
           ref="nameRef"
           label-width="40%"
           label-position="right"
           class="demo-ruleForm">
    <el-form-item label="姓名："
                  prop="realName">
      <el-input style="width: 200px"
                v-model="userData.realName"></el-input>
    </el-form-item>
    <el-form-item label="班级："
                  prop="clazz">
      <el-input style="width: 200px"
                v-model="userData.clazz"></el-input>
    </el-form-item>
    <el-form-item label="年龄："
                  prop="age">
      <el-input style="width: 200px"
                v-model="userData.age"></el-input>
    </el-form-item>
    <el-form-item label="性别："
                  prop="gender">
      <el-select v-model="userData.gender"
                 placeholder="请选择"
                 style="width: 200px"
                 size="mini">
        <el-option label="男"
                   value="MALE" />
        <el-option label="女"
                   value="FEMALE" />
      </el-select>
    </el-form-item>
    <el-form-item label="出生日期："
                  prop="birthday">
      <el-input style="width: 200px"
                type="date"
                v-model="userData.birthday"></el-input>
    </el-form-item>
    <el-form-item label="籍贯："
                  prop="hometown">
      <el-input style="width: 200px"
                v-model="userData.hometown"></el-input>
    </el-form-item>
    <el-form-item label="qq："
                  prop="qq">
      <el-input style="width: 200px"
                v-model="userData.qq"></el-input>
    </el-form-item>
    <el-form-item label="微信："
                  prop="wx">
      <el-input style="width: 200px"
                v-model="userData.wx"></el-input>
    </el-form-item>
    <el-form-item label="英语等级："
                  prop="englishLevel">
      <el-select v-model="userData.englishLevel"
                 style="width: 200px"
                 placeholder="请选择"
                 size="large">
        <el-option label="CET_4"
                   value="CET_4" />
        <el-option label="CET_6"
                   value="CET_6" />
        <el-option label="CET_46"
                   value="CET_46" />
      </el-select>
    </el-form-item>
    <el-form-item label="计算机等级："
                  prop="computerLevel">
      <el-select v-model="userData.computerLevel"
                 placeholder="请选择"
                 style="width: 200px"
                 size="mini">
        <el-option label="ONE"
                   value="ONE" />
        <el-option label="TWO"
                   value="TWO" />
        <el-option label="THREE"
                   value="THREE" />
        <el-option label="FOUR"
                   value="FOUR" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="danger"
                 @click="submitName">确认修改</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { reactive, onMounted, ref, toRefs } from "vue";
import { modifyUserInfo, myInfor, modifyUser } from "../../..//api/userInfo.js";
function loadData(state){
  //  console.log(Number(state.userInfoId));
  myInfor().then(function (res) {
    console.log(res);
    state.userData.realName = res.data.realName;
    state.userData.clazz = res.data.clazz;
    state.userData.age = res.data.age;
    state.userData.gender = res.data.gender;
    state.userData.hometown = res.data.hometown;
    state.userData.qq = res.data.qq;
    state.userData.wx = res.data.wx;
    state.userData.englishLevel = res.data.englishLevel;
    state.userData.computerLevel = res.data.computerLevel;
     console.log(state.userData);
  });

  return state;
}
export default {
  name: "updateAccount",
  setup() {
    const state = reactive({
      userData: modifyUser,
      // user: null,
    });
    onMounted(() => {
       loadData(state);
    });
    const submitName = () => {
      let params = state.userData
      modifyUserInfo(params).then(res => {
        console.log()
        // if (res.code === 200) {
        //   ElMessage.success(res.message)
        //   loadData(state)
        // } else {
        //   ElMessage.error(res.message)
        // }
      })
    };
  
    return {
      ...toRefs(state),
      submitName,
      loadData,
    };
  },
};
</script>

<style>
.title{
    margin-bottom: 30px;
    text-align: center;
    font-weight: 800;
    font-size: 25px;

}
</style>