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
      <el-col :span="10"></el-col>
      <el-col :span="2">
        <el-button style="width: 60px;" @click="showEdit(null, MODE.ADD, state)"><el-icon><plus /></el-icon>&nbsp;添加</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" style="width: 60px;" @click="showImport(state)"><el-icon><bottom-left /></el-icon>&nbsp;导入</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="info" style="width: 60px;" @click="showExport(state)"><el-icon><download /></el-icon>&nbsp;导出</el-button>
      </el-col>
    </el-row>
    <!-- 搜索、添加、导入导出END -->

    <!-- 高级搜索 BEGIN -->
    <el-row v-show="advancedSearch" :gutter="24" style="text-align: left;line-height: 10px;">
      <el-col :span="4">
        <el-select v-model="params.state" clearable placeholder="请选择状态">
          <el-option label="待审核" value="UNDER_REVIEW" />
          <el-option label="审核中" value="REVIEWING" />
          <el-option label="通过" value="PASSED" />
          <el-option label="不通过" value="FAIL" />
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-input placeholder="请输入班级" v-model="params.clazz"/>
      </el-col>
      <el-col :span="4">
        <el-select placeholder="请选择院系" clearable v-model="params.college">
          <el-option label="请选择" value="" />
          <el-option label="机电学院" value="机电学院" />
          <el-option label="汽车工程学院" value="汽车工程学院" />
          <el-option label="土木与建筑工程学院" value="土木与建筑工程学院" />
          <el-option label="计算机与通信工程学院" value="计算机与通信工程学院" />
          <el-option label="公益慈善管理学院o" value="公益慈善管理学院" />
          <el-option label="国际酒店与饮食文化学院" value="国际酒店与饮食文化学院" />
          <el-option label="工商税务管理学院" value="工商税务管理学院" />
          <el-option label="商学院" value="商学院" />
          <el-option label="外国语学院" value="外国语学院" />
          <el-option label="艺术学院" value="艺术学院" />
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select placeholder="选择党组织" clearable v-model="params.departmentId">
          <el-option label="请选择" value="" />
          <el-option label="机电学院" value="机电学院" />
          <el-option label="汽车工程学院" value="汽车工程学院" />
          <el-option label="土木与建筑工程学院" value="土木与建筑工程学院" />
          <el-option label="计算机与通信工程学院" value="计算机与通信工程学院" />
          <el-option label="公益慈善管理学院o" value="公益慈善管理学院" />
          <el-option label="国际酒店与饮食文化学院" value="国际酒店与饮食文化学院" />
          <el-option label="工商税务管理学院" value="工商税务管理学院" />
          <el-option label="商学院" value="商学院" />
          <el-option label="外国语学院" value="外国语学院" />
          <el-option label="艺术学院" value="艺术学院" />
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select placeholder="选择性别" clearable v-model="params.gender">
          <el-option label="男" value="MALE" />
          <el-option label="女" value="FEMALE" />
          <el-option label="未知" value="OTHER" />
        </el-select>
      </el-col>
<!--      <el-col :span="3">-->
<!--        <el-select placeholder="入党阶段" clearable v-model="params.stageId">-->
<!--          <el-option label="请选择" value="" />-->
<!--          <el-option label="机电学院" value="机电学院" />-->
<!--          <el-option label="汽车工程学院" value="汽车工程学院" />-->
<!--          <el-option label="土木与建筑工程学院" value="土木与建筑工程学院" />-->
<!--          <el-option label="计算机与通信工程学院" value="计算机与通信工程学院" />-->
<!--          <el-option label="公益慈善管理学院o" value="公益慈善管理学院" />-->
<!--          <el-option label="国际酒店与饮食文化学院" value="国际酒店与饮食文化学院" />-->
<!--          <el-option label="工商税务管理学院" value="工商税务管理学院" />-->
<!--          <el-option label="商学院" value="商学院" />-->
<!--          <el-option label="外国语学院" value="外国语学院" />-->
<!--          <el-option label="艺术学院" value="艺术学院" />-->
<!--        </el-select>-->
<!--      </el-col>-->
    </el-row>
    <!-- 高级搜索 END -->

    <!-- 用户列表 BEGIN -->
    <el-table :data="tableData" v-loading="tableDataLoading" style="width: 100%" height="550">
      <el-table-column fixed prop="number" label="学号" width="120"/>
      <el-table-column prop="realName" label="姓名" width="80"/>
      <el-table-column prop="college" label="学院" width="220"/>
      <el-table-column prop="clazz" label="班级" width="140"/>
      <el-table-column prop="gender" label="性别" width="80">
        <template #default="scope">
          <el-tag v-if="scope.row.gender === 'MALE'" type="info">男</el-tag>
          <el-tag v-if="scope.row.gender === 'FEMALE'" type="danger">女</el-tag>
          <el-tag v-if="scope.row.gender === 'OTHER'" type="warning">其他</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="age" label="年龄" width="80"/>
      <el-table-column prop="applyDate" label="申请入党时间" width="120"/>
      <el-table-column prop="stage.stage.name" label="当前阶段" width="120"/>
      <el-table-column prop="state" label="状态" width="120">
        <template #default="scope">
          <AuditTag :state="scope.row.state" />
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="250">
        <template #default="scope">
          <el-button size="small" @click="showEdit(scope.$index, MODE.EDIT, state)">编辑</el-button>
          <el-button size="small" type="success" @click="showEvaluate(scope.$index, state)">AI评估</el-button>
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
    <!-- 用户列表 END -->
  </el-card>

  <!-- 组件 BEGIN -->
  <UserSearch></UserSearch>
  <UserInfoEdit :visible="editVisible" :row="data" :mode="mode" @onClose="(v) => closeEdit(v, state)" @onSave="(row) => handleEdit(row, state)"/>
  <AIEvaluate :visible="aiEvaluateVisible"
              :user-info="data"
              :index="currentIndex"
              @onClose="(v) => closeEvaluate(v, state)"
              @onEditUserInfo="handleToEditUserInfo(state)"
  />
  <UserInfoExport :visible="exportVisible" @onClose="(v) => closeExport(v, state)"/>
  <UserInfoImport :visible="importVisible" @onClose="(v) => closeImport(v, state)" @onSuccess="importSuccess(state)"/>
  <!-- 组件 END -->
</template>

<script>
import { reactive, onMounted, toRefs } from "vue";
import { defaultUserInfo } from "../../api/userInfo.js";
import { loadData, MODE, importSuccess,
  handleEdit, handleDelete, handleToEditUserInfo,
  closeEdit, closeEvaluate, closeImport, closeExport,
  showEvaluate, showEdit, showExport, showImport } from "./service/list.js";
import UserSearch from "./components/UserSearch.vue"
import UserInfoEdit from "./components/UserInfoEdit.vue"
import UserInfoExport from "./components/UserInfoExport.vue"
import UserInfoImport from "./components/UserInfoImport.vue"
import AIEvaluate from "./components/AIEvaluate.vue"
import AuditTag from "../../components/AuditStatus/AuditTag.vue";
import { ElMessage } from "element-plus";
import { InfoFilled } from '@element-plus/icons-vue'

export default {
  name: "list",
  components: {
    UserSearch,
    UserInfoEdit,
    UserInfoExport,
    UserInfoImport,
    AIEvaluate,
    AuditTag,
  },
  setup() {
    const state = reactive({
      tableData: [],
      data: defaultUserInfo,
      currentIndex: null,
      mode: null,
      params: {
        clazz: null,
        college: null,
        departmentId: null,
        gender: null,
        job: null,
        number: null,
        page: 1, // 几页
        realName: null,
        search: null, // 模糊查询内容
        size: 10, // 每页显示几条
        sort: null,
        sortType: null,
        stageId: null, // 阶段
        state: null
      },
      total: 0,
      editVisible: false,
      exportVisible: false,
      importVisible: false,
      aiEvaluateVisible: false,
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
      handleToEditUserInfo,
      importSuccess,
      showImport,
      showExport,
      showEdit,
      showEvaluate,
      closeImport,
      closeExport,
      closeEdit,
      closeEvaluate,
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