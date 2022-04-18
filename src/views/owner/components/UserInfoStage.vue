<template>
  <!-- 入党流程 -->
  <el-card shadow="hover" class="box-card " style="margin-top: 15px">
    <template #header>
      <div class="card-header" style="text-align: left;line-height: 0px;">
        <el-icon>
          <aim/>
        </el-icon>
        入党流程
      </div>
    </template>
    <div class="big-box" style=" height: auto; ">
      <!-- margin-left: 200px; -->
      <join-process :userInfoId="userInfo.id"></join-process>
    </div>
  </el-card>
</template>

<script>
import JoinProcess from "../../user/components/JoinProcess.vue";
import {onMounted, reactive, toRefs} from "vue";
export default {
  name: "UserInfoStage",
  components: {
    JoinProcess,
  },
  setup() {
    const state = reactive({
      userInfo: {},
    });

    onMounted(() => {
      state.userInfo = JSON.parse(localStorage.getItem("userInfo"))
    })

    return {
      ...toRefs(state), //toRefs将对象中的内容转换为响应式数据
    }
  }
}
</script>

<style scoped>

</style>