<template>
  <el-dialog v-model="visible"
             :title="row?.id ? '修改数据' : '新增数据'"
             width="40%"
             center
             @close="close">
    <el-form :model="row"
             label-width="160px"
             label-position="left"
             class="from">
      <el-form-item label="职务">
        <el-input v-model="row.job" />
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="row.realName" />
      </el-form-item>
      <el-form-item label="院系">
        <el-select v-model="row.college"
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
      <el-form-item label="班级">
        <el-input v-model="row.clazz" />
      </el-form-item>
      <el-form-item label="学号">
        <el-input v-model="row.number" />
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="row.gender"
                   placeholder="请选择性别">
          <el-option label="男"
                     value="MALE" />
          <el-option label="女"
                     value="FEMALE" />
          <el-option label="未知"
                     value="OTHER" />
        </el-select>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="row.age" type="number" />
      </el-form-item>
      <el-form-item label="籍贯">
        <el-input v-model="row.hometown" />
      </el-form-item>
      <el-form-item label="出生日期">
        <el-date-picker v-model="row.birthday"
                        type="date"
                        placeholder="选择日期"
                        style="width: 100%" />
      </el-form-item>
      <el-form-item label="身份证">
        <el-input v-model="row.idNumber" />
      </el-form-item>
      <el-form-item label="已获学历">
        <el-select v-model="row.education"
                   placeholder="请选择">
          <el-option label="本科"
                     value="UNDERGRADUATE" />
          <el-option label="大专"
                     value="JUNIOR_COLLEGE" />
          <el-option label="高中"
                     value="HIGH_SCHOOL" />
          <el-option label="中专"
                     value="TECHNICAL_SECONDARY" />
          <el-option label="未知"
                     value="OTHER" />
        </el-select>
      </el-form-item>
      <el-form-item label="英语水平">
        <el-select v-model="row.englishLevel"
                   placeholder="请选择">
          <el-option label="CET_4"
                     value="CET_4" />
          <el-option label="CET_6"
                     value="CET_6" />
          <el-option label="CET-4、CET-6"
                     value="CET_46" />
          <el-option label="未知"
                     value="OTHER" />
        </el-select>
      </el-form-item>
      <el-form-item label="计算机水平">
        <el-select v-model="row.computerLevel"
                   placeholder="请选择">
          <el-option label="计算机一级"
                     value="ONE" />
          <el-option label="计算机二级"
                     value="TWO" />
          <el-option label="计算机三级"
                     value="THREE" />
          <el-option label="计算机四级"
                     value="FOUR" />
          <el-option label="未知"
                     value="OTHER" />
        </el-select>
      </el-form-item>
      <el-form-item label="QQ">
        <el-input v-model="row.qq" />
      </el-form-item>
      <el-form-item label="微信">
        <el-input v-model="row.wx" />
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="row.mobilePhone" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="row.email" />
      </el-form-item>
      <el-form-item label="入党申请日期">
        <el-date-picker v-model="row.applyDate"
                        type="date"
                        placeholder="选择日期"
                        style="width: 100%" />
      </el-form-item>
      <el-form-item label="初级党课合格时间">
        <el-date-picker v-model="row.primaryQualifyingDate"
                        type="date"
                        placeholder="选择日期"
                        style="width: 100%" />
      </el-form-item>
      <el-form-item label="积极分子推优时间">
        <el-date-picker v-model="row.recommendedActivistsDate"
                        type="date"
                        placeholder="选择日期"
                        style="width: 100%" />
      </el-form-item>
      <el-form-item label="成为积极分子日期">
        <el-date-picker v-model="row.beActivistDate"
                        type="date"
                        placeholder="选择日期"
                        style="width: 100%" />
      </el-form-item>
      <el-form-item label="发展对象推优时间">
        <el-date-picker v-model="row.recommendedDevTargetDate"
                        type="date"
                        placeholder="选择日期"
                        style="width: 100%" />
      </el-form-item>
      <el-form-item label="成为发展对象时间">
        <el-date-picker v-model="row.beDevTargetDate"
                        type="date"
                        placeholder="选择日期"
                        style="width: 100%" />
      </el-form-item>
      <el-form-item label="发展对象培训时间">
        <el-date-picker v-model="row.devTargetTrainedDate"
                        type="date"
                        placeholder="选择日期"
                        style="width: 100%" />
      </el-form-item>
      <el-form-item label="入党时间">
        <el-date-picker v-model="row.joinedDate"
                        type="date"
                        placeholder="选择日期"
                        style="width: 100%" />
      </el-form-item>
      <el-form-item label=" 转正时间">
        <el-date-picker v-model="row.correctionDate"
                        type="date"
                        placeholder="选择日期"
                        style="width: 100%" />
      </el-form-item>
      <el-form-item label="审核状态">
        <el-select v-model="row.state"
                   placeholder="请选择状态">
          <el-option label="待审核"
                     value="UNDER_REVIEW" />
          <el-option label="审核中"
                     value="REVIEWING" />
          <el-option label="通过"
                     value="PASSED" />
          <el-option label="不通过"
                     value="FAIL" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="()=>{close(false);}">取消</el-button>
        <el-button type="primary"
                   @click="save">搜索</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: "Edit",
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

</style>