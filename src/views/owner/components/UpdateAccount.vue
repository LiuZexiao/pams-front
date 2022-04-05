<template>
  更新账号信息
</template>

<script>
import { defaultUserInfo, modifyUserInfo } from "../..//api/userInfo.js";
export default {
  setup() {
    const state = reactive({
      userData: defaultUserInfo

    });
  },
};
</script>

<style>
</style>