<template>
  <el-dialog v-model="visible" :title="row?.id ? '修改数据' : '新增数据'" width="40%" top="80px" center @close="close">

    <!-- 表单 BEGIN -->
    <el-scrollbar height="600px">
      <el-form :model="row" label-width="160px" label-position="left" class="from">
        <el-form-item label="活动">
          <el-input v-model="row.name" />
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="row.type" clearable placeholder="请选择类型">
            <el-option label="活动" value="ACTIVITY" />
            <el-option label="会议" value="MEETING" />
            <el-option label="其他" value="OTHER" />
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-date-picker v-model="row.beginTime"
                          type="datetime"
                          placeholder="选择日期"
                          format="YYYY-MM-DD HH:mm:ss"
                          value-format="YYYY-MM-DD HH:mm:ss"
                          style="width: 100%" />
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker v-model="row.endTime"
                          type="datetime"
                          placeholder="选择日期"
                          format="YYYY-MM-DD HH:mm:ss"
                          value-format="YYYY-MM-DD HH:mm:ss"
                          style="width: 100%" />
        </el-form-item>
        <el-form-item label="签到方式">
          <el-select v-model="row.signWay" clearable placeholder="请选择签到方式">
            <el-option label="签到" value="SIGN_IN" />
            <el-option label="签到-签退" value="SIGN_OUT" />
            <el-option label="无操作" value="OTHER" />
          </el-select>
        </el-form-item>
        <el-form-item label="活动地址">
          <el-input v-model="row.address" />
        </el-form-item>
        <el-form-item label="活动描述">
          <!--          <el-input v-model="row.contentHTML" />-->
        </el-form-item>
        <QuillEditor contentType="html"
                     v-model:content="row.descHTML"
                     theme="snow"
                     style="height: 300px;"/>
        <el-form-item label=""/>
<!--        <el-form-item label="记录员">-->
<!--          <el-select v-model="row.recorder.id" clearable placeholder="请选择记录员">-->
<!--            <el-option label="默认" value="1" />-->
<!--          </el-select>-->
<!--        </el-form-item>-->
        <el-form-item label="活动记录">
          <!--          <el-input v-model="row.contentHTML" />-->
        </el-form-item>
        <QuillEditor contentType="html"
                     v-model:content="row.remarkHTML"
                     theme="snow"
                     style="height: 300px;"/>
        <el-form-item label=""/>
<!--        <el-form-item label="所属组织">-->
<!--          <el-select placeholder="选择党组织" clearable v-model="row.department.id">-->
<!--            <el-option label="机电学院" value="机电学院" />-->
<!--            <el-option label="汽车工程学院" value="汽车工程学院" />-->
<!--            <el-option label="土木与建筑工程学院" value="土木与建筑工程学院" />-->
<!--            <el-option label="计算机与通信工程学院" value="计算机与通信工程学院" />-->
<!--            <el-option label="公益慈善管理学院o" value="公益慈善管理学院" />-->
<!--            <el-option label="国际酒店与饮食文化学院" value="国际酒店与饮食文化学院" />-->
<!--            <el-option label="工商税务管理学院" value="工商税务管理学院" />-->
<!--            <el-option label="商学院" value="商学院" />-->
<!--            <el-option label="外国语学院" value="外国语学院" />-->
<!--            <el-option label="艺术学院" value="艺术学院" />-->
<!--          </el-select>-->
<!--        </el-form-item>-->
      </el-form>
    </el-scrollbar>
    <!-- 表单 END -->

    <!-- FOOTER BEGIN -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="()=>{close(false);}">取消</el-button>
        <el-button type="primary" @click="save">保存</el-button>
      </span>
    </template>
    <!-- FOOTER END -->
  </el-dialog>
</template>

<script>
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { QuillEditor } from '@vueup/vue-quill'
export default {
  name: "Edit",
  components: {
    QuillEditor,
  },
  props: {
    mode: String,
    row: Object,
    visible: Boolean
  },
  emits: ["onSave", "onClose"], // 父组件传过来的事件
  setup(props, { emit }) {
    const save = () => {
      console.log("onSave:" + props.row)
      emit("onSave", props.row)
    }

    const close = (visible) => {
      emit("onClose", visible)
    }

    return {
      close,
      save
    };
  },
};
</script>

<style scoped>
.from {
  width: 80%;
}
</style>