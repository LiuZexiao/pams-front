<template>
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
        <el-input placeholder="请输入活动名" v-model="params.name" />
      </el-col>
      <el-col :span="4">
        <el-input placeholder="请输入活动会议地址" v-model="params.address" />
      </el-col>
      <el-col :span="4">
        <el-select v-model="params.type" clearable placeholder="请选择类型">
          <el-option label="活动" value="ACTIVITY" />
          <el-option label="会议" value="MEETING" />
          <el-option label="其他" value="OTHER" />
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="params.signWay" clearable placeholder="请选择签到方式">
          <el-option label="签到" value="SIGN_IN" />
          <el-option label="签到-签退" value="SIGN_OUT" />
          <el-option label="无操作" value="OTHER" />
        </el-select>
      </el-col>
    </el-row>
    <el-row v-show="advancedSearch" :gutter="24" style="margin-top: 10px;text-align: left;line-height: 10px;">
      <el-col :span="4">
        <el-select placeholder="选择活动会议记录人" clearable v-model="params.recorderId">
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
        <el-select placeholder="选择创建人" clearable v-model="params.creatorId">
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
    </el-row>
    <!-- 高级搜索 END -->

    <!-- 列表 BEGIN -->
    <el-table :data="tableData" v-loading="tableDataLoading" style="width: 100%" height="550">
      <el-table-column fixed prop="type" label="类型" width="80">
        <template #default="scope">
          <el-tag v-if="scope.row.type === 'ACTIVITY'" type="info">活动</el-tag>
          <el-tag v-if="scope.row.type === 'MEETING'" type="warning">会议</el-tag>
          <el-tag v-if="scope.row.type === 'OTHER'" type="success">其他</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed prop="name" label="活动" width="250"/>
      <el-table-column prop="beginTime" label="开始时间" width="220"/>
      <el-table-column prop="endTime" label="结束时间" width="220"/>
      <el-table-column prop="signWay" label="签到方式" width="120">
        <template #default="scope">
          <el-tag v-if="scope.row.type === 'SIGN_IN'" type="info">签到</el-tag>
          <el-tag v-if="scope.row.type === 'SIGN_OUT'" type="warning">签到-签退</el-tag>
          <el-tag v-if="scope.row.type === 'OTHER'" type="success">无操作</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="活动地址" width="120"/>
      <el-table-column prop="creator.realName" label="创建者" width="120"/>
      <el-table-column prop="recorder.realName" label="记录人" width="120"/>
      <el-table-column prop="department.name" label="部门" width="80">
        <template #default="scope">
          <el-tag v-if="scope.row.gender === 'MALE'" type="info">男</el-tag>
          <el-tag v-if="scope.row.gender === 'FEMALE'" type="danger">女</el-tag>
          <el-tag v-if="scope.row.gender === 'OTHER'" type="warning">其他</el-tag>
        </template>
      </el-table-column>
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
  <ActivityEdit v-if="editVisible" :visible="editVisible" :row="data" :mode="mode" @onClose="(v) => closeEdit(v, state)" @onSave="(row) => handleEdit(row, state)"/>
  <!-- 组件 END -->
</template>

<script>
import { reactive, onMounted, toRefs } from "vue";
import { defaultUserInfo } from "../../api/userInfo.js";
import { loadData, MODE,
  handleEdit, handleDelete,
  closeEdit,
  showEdit } from "./service/activity.js";
import UserSearch from "./components/UserSearch.vue"
import ActivityEdit from "./components/ActivityEdit.vue"

export default {
  name: "Event",
  components: {
    UserSearch,
    ActivityEdit,
  },
  setup() {
    const state = reactive({
      tableData: [],
      data: defaultUserInfo,
      currentIndex: null,
      mode: null,
      params: {
        address: null,
        creatorId: null,
        recorderId: null,
        departmentId: null,
        signWay: null,
        name: null,
        page: 1, // 几页
        search: null, // 模糊查询内容
        size: 10, // 每页显示几条
        sort: null,
        sortType: null,
        type: null
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