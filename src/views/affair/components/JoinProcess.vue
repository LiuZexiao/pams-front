<template>
  <!-- 入党流程图 -->
  <el-steps :active="active"
            align-center
            finish-status="success">
    <!-- direction="vertical" 竖向排列 -->
    <el-step :title="item.stage.name"
             v-for="item,key in proData"
             :key="key">
      <template v-slot:description>
        <table width="180px"
               border="0"
               cellspacing="0"
               cellpadding="0"
               class="processing_content">
          <tr v-for="ch,key in item.children"
              :key="key">
            <td style="color:#98A6BE">
              <div class="processing_content_detail"
                   style="float:left;width:80%"><span style="display:block;text-align:left;">{{ch.stage.id}}.
                  {{ch.stage.name}}<div style="float: right;">
                    <el-icon style="color: #67c23a">
                      <circle-check-filled />
                    </el-icon>
                  </div></span></div>
              <!-- <div class="processing_content_detail"
                   style="float:left;width:70%">
                <div style="float:left;width: 2px;height: 20px; background:#C7D4E9;margin-left:10px;margin-right:10px">
                </div>
                <span style="color:#919FB8">已完成</span> 
              </div>-->
              <!--<div class="processing_content_detail"
                   style="float:right;"><span><i class="el-icon-time"></i>&nbsp;&nbsp;昨天12:24</span> </div> -->
            </td>
          </tr>
        </table>
      </template>

    </el-step>
  </el-steps>
</template>

<script>
import { reactive, onMounted, toRefs } from "vue";
import { userStage } from "../../../api/userInfo.js";
function loadData(state){
  //  console.log(Number(state.userInfoId));
  userStage(state.userInfoId).then(function (res) {
    console.log(res);
    state.proData = res.data;
  });
  countStep(state)
  return state;
}

function countStep(state) {
  let num = 0;
  if (state.proData[0].children.length <= 3) {
    num++;
    if (
      state.proData[1].children.length <= 7 &&
      state.proData[1].children.length != 0
    ) {
      num++;
      if (
        state.proData[2].children.length <= 7 &&
        state.proData[2].children.length != 0
      ) {
        num++;
        if (
          state.proData[3].children.length <= 8 &&
          state.proData[3].children.length != 0
        ) {
          num++;
          if (
            state.proData[4].children.length <= 1 &&
            state.proData[4].children.length != 0
          ) {
            num++;
          }
        }
      }
    }
  }
  console.log(num);
  state.active = num;
  return state;
}

export default {
  name: "JoinProcess",
  props: {
    // 规定父组件的数据类型
    userInfoId: String,
  },
  setup(props) {
    const state = reactive({
      active: 0,
      userInfoId: props.userInfoId,
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
                id: 1,
                name: "党组织谈话",
              },
            },
            {
              id: null,
              userInfoId: 1,
              stage: {
                id: 2,
                name: "初级党课培训",
              },
            },
            {
              id: null,
              userInfoId: 1,
              stage: {
                id: 3,
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
          children: [
            {
              id: null,
              userInfoId: 1,
              stage: {
                id: 1,
                name: "提交入党积极分子考察表",
              },
            },
            {
              id: null,
              userInfoId: 1,
              stage: {
                id: 2,
                name: "提交思想汇报",
              },
            },
            {
              id: null,
              userInfoId: 1,
              stage: {
                id: 3,
                name: "完成中级党课培训",
              },
            },
            {
              id: null,
              userInfoId: 1,
              stage: {
                id: 4,
                name: "个人自传",
              },
            },
            {
              id: null,
              userInfoId: 1,
              stage: {
                id: 5,
                name: "座谈会",
              },
            },
            {
              id: null,
              userInfoId: 1,
              stage: {
                id: 6,
                name: "团组织推优",
              },
            },
            {
              id: null,
              userInfoId: 1,
              stage: {
                id: 7,
                name: "报上级备案",
              },
            },
          ],
          score: null,
        },
        {
          id: null,
          userInfoId: 1,
          stage: {
            id: 3,
            name: "发展对象",
          },
          children: [
            {
              id: null,
              userInfoId: 1,
              stage: {
                id: 1,
                name: "确定入党介绍人",
              },
            },
            {
              id: null,
              userInfoId: 1,
              stage: {
                id: 2,
                name: "提交思想汇报",
              },
            },
            {
              id: null,
              userInfoId: 1,
              stage: {
                id: 3,
                name: "政审材料",
              },
            },
            {
              id: null,
              userInfoId: 1,
              stage: {
                id: 4,
                name: "群众座谈会",
              },
            },
            {
              id: null,
              userInfoId: 1,
              stage: {
                id: 5,
                name: "培训",
              },
            },
            {
              id: null,
              userInfoId: 1,
              stage: {
                id: 6,
                name: "发展对象公示情况",
              },
            },
            {
              id: null,
              userInfoId: 1,
              stage: {
                id: 7,
                name: "团组织推优",
              },
            },
          ],

          score: null,
        },
        {
          id: null,
          userInfoId: 1,
          stage: {
            id: 4,
            name: "预备党员",
          },
          children: [
            {
              id: null,
              userInfoId: 1,
              stage: {
                id: 1,
                name: "支部大会接收预备党员的决议",
              },
            },
            {
              id: null,
              userInfoId: 1,
              stage: {
                id: 2,
                name: "入党志愿书",
              },
            },
            {
              id: null,
              userInfoId: 1,
              stage: {
                id: 3,
                name: "预备党员考察表",
              },
            },
            {
              id: null,
              userInfoId: 1,
              stage: {
                id: 4,
                name: "高级培训结业证",
              },
            },
            {
              id: null,
              userInfoId: 1,
              stage: {
                id: 5,
                name: "思想汇报",
              },
            },
            {
              id: null,
              userInfoId: 1,
              stage: {
                id: 6,
                name: "转正申请",
              },
            },
            {
              id: null,
              userInfoId: 1,
              stage: {
                id: 7,
                name: "预备党员转正公示材料",
              },
            },
            {
              id: null,
              userInfoId: 1,
              stage: {
                id: 8,
                name: "支部大会讨论预备党员转正决议",
              },
            },
          ],
          score: null,
        },
        {
          id: null,
          userInfoId: 1,
          stage: {
            id: 5,
            name: "党员",
          },
          children: [
            {
              id: null,
              userInfoId: 1,
              stage: {
                id: 1,
                name: "毕业班正式党员培训",
              },
            },
          ],
          score: null,
        },
      ],
    });
     onMounted(() => {
      // 加载页面时执行
      loadData(state);
    });
    return {
      ...toRefs(state), //toRefs将对象中的内容转换为响应式数据
      loadData,
      countStep,
    };
  },
  
};
</script>

<style>
.stepComponent {
  background-color: #dfebff;
  width: 100%-20px;
  padding: 10px 10px 10px 10px;
  margin: 10px 10px 10px 10px;
}
.stepsTitle {
  margin: 10px 0px 10px 10px;
}
.approvalProcess {
  color: #9eadc4;
  font-size: 14px;
  /* width: 100%; */
  background: #dfebff;
  margin-left: 20px;
  margin-right: 0px;
  margin-top: 10px;
}
.processing_content {
  font-size: 13px;
}
.processing_content_detail {
  margin-left: 10px;
  margin-top: 3.5px;
  margin-bottom: 3.5px;
  width: 150px;
  display: inline-block;
}
.step-row {
  min-width: 500px;
  margin-bottom: 12px;
  margin-top: 12px;
}
</style>


