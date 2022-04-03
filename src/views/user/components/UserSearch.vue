<template>
  <el-dialog v-model="centerDialogVisible"
             title="高级搜索"
             width="40%"
             center
             @close="closeDialog">
    <el-form :model="userForm"
             label-width="160px"
             label-position="left"
             class="from">
      <el-form-item label="班级">
        <el-input v-model="userForm.clazz" />
      </el-form-item>
      <el-form-item label="院系">
        <el-select v-model="userForm.college"
                   placeholder="请选择院系">
          <el-option label="机电学院"
                     value="机电学院" />
          <el-option label="汽车工程学院"
                     value="汽车工程学院" />
          <el-option label="土木与建筑工程学院"
                     value="土木与建筑工程学院" />
          <el-option label="计算机与通信工程学院"
                     value="计算机与通信工程学院" />
          <el-option label="公益慈善管理学院o"
                     value="公益慈善管理学院" />
          <el-option label="国际酒店与饮食文化学院"
                     value="国际酒店与饮食文化学院" />
          <el-option label="工商税务管理学院"
                     value="工商税务管理学院" />
          <el-option label="商学院"
                     value="商学院" />
          <el-option label="外国语学院"
                     value="外国语学院" />
          <el-option label="艺术学院"
                     value="艺术学院" />
        </el-select>
      </el-form-item>
      <el-form-item label="入党阶段">
        <el-select v-model="userForm.stage"
                   placeholder="请选择入党阶段">
          <el-option-group v-for="group in userForm.stage"
                           :key="group.label"
                           :label="group.label">
            <el-option v-for="item in group.options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value" />
          </el-option-group>
        </el-select>
      </el-form-item>
      <el-form-item label="初级党课合格时间">
        <el-date-picker v-model="userForm.primaryQualifyingDate"
                        type="date"
                        placeholder="选择日期"
                        style="width: 100%" />
      </el-form-item>
      <el-form-item label="积极分子推优时间">
        <el-date-picker v-model="userForm.recommendedActivistsDate"
                        type="date"
                        placeholder="选择日期"
                        style="width: 100%" />
      </el-form-item>
      <el-form-item label="成为积极分子日期">
        <el-date-picker v-model="userForm.beActivistDate"
                        type="date"
                        placeholder="选择日期"
                        style="width: 100%" />
      </el-form-item>
      <el-form-item label="发展对象推优时间">
        <el-date-picker v-model="userForm.recommendedDevTargetDate"
                        type="date"
                        placeholder="选择日期"
                        style="width: 100%" />
      </el-form-item>
      <el-form-item label="成为发展对象时间">
        <el-date-picker v-model="userForm.beDevTargetDate"
                        type="date"
                        placeholder="选择日期"
                        style="width: 100%" />
      </el-form-item>
      <el-form-item label="发展对象培训时间">
        <el-date-picker v-model="userForm.devTargetTrainedDate"
                        type="date"
                        placeholder="选择日期"
                        style="width: 100%" />
      </el-form-item>
      <el-form-item label="入党时间">
        <el-date-picker v-model="userForm.joinedDate"
                        type="date"
                        placeholder="选择日期"
                        style="width: 100%" />
      </el-form-item>
      <el-form-item label=" 转正时间">
        <el-date-picker v-model="userForm.correctionDate"
                        type="date"
                        placeholder="选择日期"
                        style="width: 100%" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="()=>{closeDialog(false);}">取消</el-button>
        <el-button type="primary"
                   @click="centerDialogVisible = false">搜索</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { reactive, toRefs } from "@vue/reactivity";
export default {
  props: {
    // 规定父组件的数据类型
    centerDialogVisible: Boolean,
  },
  emits: ["onCloseDialog"], // 父组件传过来的事件
  setup(props, { emit }) {
    //获取传过来的值
    const state = reactive({
      centerDialogVisible: props.centerDialogVisible,
      userForm: {
        clazz: "",
        college: "",
        primaryQualifyingDate: "",
        recommendedActivistsDate: "",
        beActivistDate: "", 
        recommendedDevTargetDate: "", 
        beDevTargetDate: "", 
        devTargetTrainedDate: "", 
        joinedDate: "", 
        correctionDate: "",
        stage: [
          {
            code: 200,
            message: "操作成功!",
            data: [
              {
                id: 1,
                updated: null,
                created: null,
                deleted: null,
                name: "申请入党",
                parentId: null,
                priorId: null,
                nextId: 2,
                needReview: true,
                needScore: false,
                attachmentRequired: true,
                attachments: [
                  {
                    id: 1,
                    updated: null,
                    created: null,
                    deleted: null,
                    stageId: 1,
                    name: "入党申请书",
                    quantity: 1,
                  },
                ],
                children: [
                  {
                    id: 6,
                    updated: null,
                    created: null,
                    deleted: null,
                    name: "党组织谈话",
                    parentId: 1,
                    priorId: null,
                    nextId: 7,
                    needReview: true,
                    needScore: false,
                    attachmentRequired: false,
                    attachments: null,
                    children: [],
                  },
                  {
                    id: 7,
                    updated: null,
                    created: null,
                    deleted: null,
                    name: "初级党课培训",
                    parentId: 1,
                    priorId: 6,
                    nextId: 8,
                    needReview: true,
                    needScore: true,
                    attachmentRequired: false,
                    attachments: null,
                    children: [],
                  },
                  {
                    id: 8,
                    updated: null,
                    created: null,
                    deleted: null,
                    name: "团组织推优",
                    parentId: 1,
                    priorId: 7,
                    nextId: null,
                    needReview: true,
                    needScore: false,
                    attachmentRequired: true,
                    attachments: [
                      {
                        id: 2,
                        updated: null,
                        created: null,
                        deleted: null,
                        stageId: 8,
                        name: "团组织推优材料",
                        quantity: 1,
                      },
                    ],
                    children: [],
                  },
                ],
              },
              {
                id: 2,
                updated: null,
                created: null,
                deleted: null,
                name: "入党积极份子",
                parentId: null,
                priorId: 1,
                nextId: 3,
                needReview: true,
                needScore: false,
                attachmentRequired: true,
                attachments: [
                  {
                    id: 3,
                    updated: null,
                    created: null,
                    deleted: null,
                    stageId: 2,
                    name: "入党积极分子考察表",
                    quantity: 1,
                  },
                  {
                    id: 4,
                    updated: null,
                    created: null,
                    deleted: null,
                    stageId: 2,
                    name: "思想汇报",
                    quantity: 4,
                  },
                  {
                    id: 5,
                    updated: null,
                    created: null,
                    deleted: null,
                    stageId: 2,
                    name: "个人自传",
                    quantity: 1,
                  },
                ],
                children: [
                  {
                    id: 9,
                    updated: null,
                    created: null,
                    deleted: null,
                    name: "确定培养联系人",
                    parentId: 2,
                    priorId: null,
                    nextId: 10,
                    needReview: true,
                    needScore: false,
                    attachmentRequired: false,
                    attachments: null,
                    children: [],
                  },
                  {
                    id: 10,
                    updated: null,
                    created: null,
                    deleted: null,
                    name: "中级党课培训",
                    parentId: 2,
                    priorId: 9,
                    nextId: 11,
                    needReview: true,
                    needScore: true,
                    attachmentRequired: true,
                    attachments: [
                      {
                        id: 6,
                        updated: null,
                        created: null,
                        deleted: null,
                        stageId: 10,
                        name: "培训合格证书",
                        quantity: 1,
                      },
                      {
                        id: 7,
                        updated: null,
                        created: null,
                        deleted: null,
                        stageId: 10,
                        name: "结业鉴定表",
                        quantity: 1,
                      },
                    ],
                    children: [],
                  },
                  {
                    id: 11,
                    updated: null,
                    created: null,
                    deleted: null,
                    name: "座谈会",
                    parentId: 2,
                    priorId: 10,
                    nextId: 12,
                    needReview: true,
                    needScore: false,
                    attachmentRequired: true,
                    attachments: [
                      {
                        id: 8,
                        updated: null,
                        created: null,
                        deleted: null,
                        stageId: 11,
                        name: "群众座谈会记录",
                        quantity: 1,
                      },
                    ],
                    children: [],
                  },
                  {
                    id: 12,
                    updated: null,
                    created: null,
                    deleted: null,
                    name: "团组织推优",
                    parentId: 2,
                    priorId: 11,
                    nextId: 13,
                    needReview: true,
                    needScore: false,
                    attachmentRequired: true,
                    attachments: [
                      {
                        id: 9,
                        updated: null,
                        created: null,
                        deleted: null,
                        stageId: 12,
                        name: "团组织推优材料",
                        quantity: 1,
                      },
                    ],
                    children: [],
                  },
                  {
                    id: 13,
                    updated: null,
                    created: null,
                    deleted: null,
                    name: "报上级备案",
                    parentId: 2,
                    priorId: 12,
                    nextId: null,
                    needReview: true,
                    needScore: false,
                    attachmentRequired: false,
                    attachments: null,
                    children: [],
                  },
                ],
              },
              {
                id: 3,
                updated: null,
                created: null,
                deleted: null,
                name: "发展对象",
                parentId: null,
                priorId: 2,
                nextId: 4,
                needReview: true,
                needScore: false,
                attachmentRequired: true,
                attachments: [
                  {
                    id: 10,
                    updated: null,
                    created: null,
                    deleted: null,
                    stageId: 3,
                    name: "思想汇报",
                    quantity: 4,
                  },
                  {
                    id: 11,
                    updated: null,
                    created: null,
                    deleted: null,
                    stageId: 3,
                    name: "政审材料",
                    quantity: 1,
                  },
                ],
                children: [
                  {
                    id: 14,
                    updated: null,
                    created: null,
                    deleted: null,
                    name: "确定入党介绍人",
                    parentId: 3,
                    priorId: null,
                    nextId: 15,
                    needReview: true,
                    needScore: false,
                    attachmentRequired: false,
                    attachments: null,
                    children: [],
                  },
                  {
                    id: 15,
                    updated: null,
                    created: null,
                    deleted: null,
                    name: "座谈会",
                    parentId: 3,
                    priorId: 14,
                    nextId: 16,
                    needReview: true,
                    needScore: false,
                    attachmentRequired: true,
                    attachments: [
                      {
                        id: 12,
                        updated: null,
                        created: null,
                        deleted: null,
                        stageId: 15,
                        name: "群众座谈会记录",
                        quantity: 1,
                      },
                    ],
                    children: [],
                  },
                  {
                    id: 16,
                    updated: null,
                    created: null,
                    deleted: null,
                    name: "培训",
                    parentId: 3,
                    priorId: 15,
                    nextId: 17,
                    needReview: true,
                    needScore: false,
                    attachmentRequired: false,
                    attachments: null,
                    children: [],
                  },
                  {
                    id: 17,
                    updated: null,
                    created: null,
                    deleted: null,
                    name: "团组织推优",
                    parentId: 3,
                    priorId: 16,
                    nextId: null,
                    needReview: true,
                    needScore: false,
                    attachmentRequired: true,
                    attachments: [
                      {
                        id: 13,
                        updated: null,
                        created: null,
                        deleted: null,
                        stageId: 17,
                        name: "团员入党推荐表",
                        quantity: 1,
                      },
                    ],
                    children: [],
                  },
                ],
              },
              {
                id: 4,
                updated: null,
                created: null,
                deleted: null,
                name: "预备党员",
                parentId: null,
                priorId: 3,
                nextId: 5,
                needReview: true,
                needScore: false,
                attachmentRequired: true,
                attachments: [
                  {
                    id: 14,
                    updated: null,
                    created: null,
                    deleted: null,
                    stageId: 4,
                    name: "入党志愿书",
                    quantity: 1,
                  },
                  {
                    id: 15,
                    updated: null,
                    created: null,
                    deleted: null,
                    stageId: 4,
                    name: "预备党员考察表",
                    quantity: 1,
                  },
                  {
                    id: 16,
                    updated: null,
                    created: null,
                    deleted: null,
                    stageId: 4,
                    name: "高级培训结业证",
                    quantity: 1,
                  },
                  {
                    id: 17,
                    updated: null,
                    created: null,
                    deleted: null,
                    stageId: 4,
                    name: "结业鉴定表",
                    quantity: 1,
                  },
                  {
                    id: 18,
                    updated: null,
                    created: null,
                    deleted: null,
                    stageId: 4,
                    name: "思想汇报",
                    quantity: 1,
                  },
                  {
                    id: 19,
                    updated: null,
                    created: null,
                    deleted: null,
                    stageId: 4,
                    name: "转正申请",
                    quantity: 1,
                  },
                ],
                children: [],
              },
              {
                id: 5,
                updated: null,
                created: null,
                deleted: null,
                name: "党员",
                parentId: null,
                priorId: 4,
                nextId: null,
                needReview: false,
                needScore: false,
                attachmentRequired: false,
                attachments: null,
                children: [
                  {
                    id: 18,
                    updated: null,
                    created: null,
                    deleted: null,
                    name: "毕业班正式党员培训",
                    parentId: 5,
                    priorId: null,
                    nextId: null,
                    needReview: true,
                    needScore: true,
                    attachmentRequired: false,
                    attachments: null,
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    });
    const closeDialog = (visible) => {
      emit("onCloseDialog", visible);
    };
    return {
      ...toRefs(state),
      closeDialog,
    };
  },
};
</script>

<style>
.el-main {
  line-height: 0px;
}
.from {
  width: 60%;
  margin: 0 auto;
}
</style>