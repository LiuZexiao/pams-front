<template>
  <!-- 入党流程图 -->
  <el-steps :active="active"
            align-center
            direction="vertical">
    <el-step :title="item.stage.name"
             v-for="item,key in proData"
             :key="key"
             >
      <template >
        <table width="100%"
               border="0"
               cellspacing="0"
               cellpadding="0"
               class="processing_content">
          <tr>
            <td style="color:#98A6BE">
              <div class="processing_content_detail"
                   style="float:left;width:70%"><span>申请人&nbsp;&nbsp;<span
                        style="color:#219AFF">圆领{{}}</span>&nbsp;&nbsp;提交了割接方案</span></div>
              <div class="processing_content_detail"
                   style="float:right;"><span><i class="el-icon-time"></i>&nbsp;&nbsp;昨天12:24</span> </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="processing_content_detail"
                   style="float:left;width:70%">
                <div style="float:left;width: 2px;height: 20px; background:#C7D4E9;margin-left:10px;margin-right:10px">
                </div>
                <span style="color:#919FB8">同意，建议通过</span>
              </div>
            </td>
          </tr>
        </table>
      </template>
    </el-step>
  </el-steps>
</template>

<script>
import { reactive, onMounted, toRefs } from "vue";
export default {
  name: "JoinProcess",
  setup() {
    const state = reactive({
      active: 0,
      proData: [
        {
          id: null,
          userInfoId: 1,
          stage: {
            id: 1,
            name: "申请入党",
          },
          score: null,
          children: [
            {
              id: null,
              userInfoId: 1,
              stage: {
                id: 6,
                name: "党组织谈话",
              },
            },
            {
              id: null,
              userInfoId: 1,
              stage: {
                id: 7,
                name: "初级党课培训",
              },
            },
            {
              id: null,
              userInfoId: 1,
              stage: {
                id: 8,
                name: "团组织推优",
              },
            },
          ],
        },
        {
          id: null,
          userInfoId: 1,
          stage: {
            id: 2,
            name: "入党积极份子",
          },
          score: null,
        },
        {
          id: null,
          userInfoId: 1,
          stage: {
            id: 3,
            name: "发展对象",
          },
          score: null,
        },
        {
          id: null,
          userInfoId: 1,
          stage: {
            id: 4,
            name: "预备党员",
          },
          score: null,
        },
        {
          id: null,
          userInfoId: 1,
          stage: {
            id: 5,
            name: "党员",
          },
          score: null,
        },
      ],
    });
    return {
      ...toRefs(state), //toRefs将对象中的内容转换为响应式数据
    };
  },
};
</script>

<style>
</style>


