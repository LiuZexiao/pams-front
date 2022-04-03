<template>
  <el-dialog v-model="visible" :title="row?.id ? '修改数据' : '新增数据'" width="40%" top="80px" center @close="close">

    <!-- 表单 BEGIN -->
    <el-scrollbar height="600px">
      <el-form :model="row" label-width="160px" label-position="left" class="from">
        <el-form-item label="模板名">
          <el-input v-model="row.name" />
        </el-form-item>
      </el-form>
      <el-button style="width: 100%" @click="handleAddColumn">添加列</el-button>
      <el-table :data="row.columns" style="width: 100%" height="500">
        <el-table-column prop="sort" label="排序" width="80">
          <template #default="scope">
            <el-input v-model="scope.row.sort" type="number" />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="列名" width="250">
          <template #default="scope">
            <el-input v-model="scope.row.name" />
          </template>
        </el-table-column>
        <el-table-column prop="key" label="键值" width="250">
          <template #default="scope">
            <el-select v-model="scope.row.key" clearable placeholder="请选择">
              <el-option label="职务" value="job" />
              <el-option label="姓名" value="realName" />
              <el-option label="学院" value="college" />
              <el-option label="班级" value="clazz" />
              <el-option label="学号" value="number" />
              <el-option label="性别" value="gender" />
              <el-option label="年龄" value="age" />
              <el-option label="籍贯" value="hometown" />
              <el-option label="出生日期" value="birthday" />
              <el-option label="身份证号" value="idNumber" />
              <el-option label="英语水平" value="englishLevel" />
              <el-option label="计算机水平" value="computerLevel" />
              <el-option label="入党申请日期" value="applyDate" />
              <el-option label="QQ" value="qq" />
              <el-option label="微信" value="wx" />
              <el-option label="手机号" value="mobilePhone" />
              <el-option label="邮箱" value="email" />
              <el-option label="初级党课合格日期" value="primaryQualifyingDate" />
              <el-option label="推优积极分子日期" value="recommendedActivistsDate" />
              <el-option label="成为积极分子日期" value="beActivistDate" />
              <el-option label="中级党课合格日期" value="intermediateQualifyingDate" />
              <el-option label="推优发展对象日期" value="recommendedDevTargetDate" />
              <el-option label="成为发展对象日期" value="beDevTargetDate" />
              <el-option label="入党日期" value="joinedDate" />
              <el-option label="转正日期" value="correctionDate" />
              <el-option label="信息状态" value="state" />
              <el-option label="备注" value="remark" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template #default="scope">
            <el-popconfirm confirm-button-text="确认" cancel-button-text="取消"
                           :icon="InfoFilled" icon-color="red" title="确认删除这条数据？"
                           @confirm="handleDeleteColumn(scope.$index)">
              <template #reference>
                <el-button size="small" type="danger">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
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
import { remove as removeColumn } from "../../../api/tableTemplateColumn"
import {ElMessage} from "element-plus";
export default {
  name: "TemplateEdit",
  props: {
    mode: String,
    row: Object,
    visible: Boolean
  },
  emits: ["onSave", "onClose"], // 父组件传过来的事件
  setup(props, { emit }) {

    const handleAddColumn = () => {
      let column = {
        id: null,
        key: null,
        name: null,
        sort: null,
        tableId: props.row.id
      }
      props.row.columns.push(column)
    }

    const handleDeleteColumn = (index) => {
      let column = props.row.columns[index]
      if (column.id != null) {
        removeColumn(column.id).then(res => {
          if (res.code === 200) {
            props.row.columns.splice(index, 1)
            ElMessage.success(res.message)
          } else {
            ElMessage.error(res.message)
          }
        })
      } else {
        props.row.columns.splice(index, 1)
      }
    }

    const save = () => {
      emit("onSave", props.row)
    }

    const close = (visible) => {
      emit("onClose", visible)
    }

    return {
      handleAddColumn,
      handleDeleteColumn,
      close,
      save
    };
  },
};
</script>

<style scoped>

</style>