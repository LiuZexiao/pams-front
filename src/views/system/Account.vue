<template>
  <!-- 用户列表（导入、导出、添加、删除、修改、个性化查询、入党流程图） -->
  <el-card shadow="never" class="box-card">
    <!-- 搜索、添加、导入导出 BEGIN -->
    <el-row :gutter="24" style="text-align: left;line-height: 10px;margin-bottom: 10px">
      <el-col :span="4">
        <el-input placeholder="请输入搜索内容" v-model="params.search" />
      </el-col>
      <el-col :span="2">
        <el-button type="primary" style="width: 60px;" @click="loadData(state)">搜索</el-button>
      </el-col>
      <el-col :span="2">
        <el-button style="width: 60px;" @click="advancedSearch = !advancedSearch">
          更多
          <el-icon v-if="advancedSearch"><arrow-down /></el-icon>
          <el-icon v-if="!advancedSearch"><arrow-left /></el-icon>
        </el-button>
      </el-col>
      <el-col :span="13"></el-col>
      <el-col :span="2">
        <el-button style="width: 60px;" @click="showEdit(null, MODE.ADD, state)"><el-icon><plus /></el-icon>&nbsp;添加</el-button>
      </el-col>
    </el-row>
    <!-- 搜索、添加、导入导出END -->

    <!-- 高级搜索 BEGIN -->
    <el-row v-show="advancedSearch" :gutter="24" style="text-align: left;line-height: 10px;">
      <el-col :span="4">
        <el-input placeholder="请输入账户名" v-model="params.username" />
      </el-col>
      <el-col :span="4">
        <el-input placeholder="请输入用户邮箱" v-model="params.email" />
      </el-col>
      <el-col :span="4">
        <el-input placeholder="请输入用户手机号" v-model="params.phone" />
      </el-col>
      <el-col :span="4">
        <DepartmentSelect :department-id="params.departmentId" @change="(val) => params.departmentId = val"/>
      </el-col>
    </el-row>
    <!-- 高级搜索 END -->

    <!-- 列表 BEGIN -->
    <el-table :data="tableData" v-loading="tableDataLoading" style="width: 100%" height="550">
      <el-table-column fixed prop="department.name" label="党组织" />
      <el-table-column fixed prop="username" label="账号" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="phone" label="手机号" />
      <el-table-column prop="created" label="创建时间" />
      <el-table-column fixed="right" label="操作" width="200">
        <template #default="scope">
          <el-button size="small" @click="showEdit(scope.$index, MODE.EDIT, state)">编辑</el-button>
          <el-popconfirm confirm-button-text="确认" cancel-button-text="取消"
                         :icon="InfoFilled" icon-color="red" title="确认删除这条数据？"
                         @confirm="handleDelete(scope.row.id, state)">
            <template #reference>
              <el-button size="small" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="sizes, prev, pager, next, jumper, ->, total"
                   :total="total"
                   :page-size="params.size"
                   v-model:current-page="params.page"
                   @size-change="(pageSize) => {
          params.size = pageSize
          loadData(state)
        }"
                   @current-change="(current) => {
          params.page = current
          loadData(state)
        }"
    />
    <!-- 列表 END -->
  </el-card>

  <!-- 组件 BEGIN -->
  <UserSearch></UserSearch>
  <AccountEdit v-if="editVisible" :visible="editVisible" :row="data" :mode="mode" @onClose="(v) => closeEdit(v, state)" @onSave="(row) => handleEdit(row, state)"/>
  <!-- 组件 END -->
</template>

<script>
import { reactive, onMounted, toRefs } from "vue";
import { defaultUserInfo } from "../../api/userInfo.js";
import { loadData, MODE,
  handleEdit, handleDelete,
  closeEdit,
  showEdit } from "./service/account.js";
import UserSearch from "./components/UserSearch.vue"
import AccountEdit from "./components/AccountEdit.vue"
import DepartmentSelect from "../../components/department/DepartmentSelect.vue";

export default {
  name: "Account",
  components: {
    UserSearch,
    AccountEdit,
    DepartmentSelect,
  },
  setup() {
    const state = reactive({
      tableData: [],
      data: {id: null, department:{id: null}},
      currentIndex: null,
      mode: null,
      params: {
        departmentId: null,
        email: null,
        phone: null,
        page: 1, // 几页
        search: null, // 模糊查询内容
        size: 10, // 每页显示几条
        sort: null,
        sortType: null,
        username: null
      },
      total: 0,
      editVisible: false,
      advancedSearch: false,
      tableDataLoading: true,
    }); // reactive 响应式对象声明

    onMounted(() => {
      // 加载页面时执行
      loadData(state);
    });

    return {
      MODE,
      ...toRefs(state), //toRefs将对象中的内容转换为响应式数据
      state,
      loadData,
      handleEdit,
      handleDelete,
      showEdit,
      closeEdit,
    };
  },
};
</script>

<style scoped>
main.el-main {
  text-align: left;
  line-height: 0px;
}
</style>