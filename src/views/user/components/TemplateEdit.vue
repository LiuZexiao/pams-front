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
              <el-option v-for="item in userInfoKey" :label="item.value" :value="item.key" />
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
import { userInfoKey} from "../../../api/userInfo"
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
      userInfoKey,
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