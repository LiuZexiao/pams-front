<template>
  <!-- 用户列表（导入、导出、添加、删除、修改、个性化查询、入党流程图） -->
  <el-card shadow="never" class="box-card">
    <!-- 搜索、添加、导入导出 BEGIN -->
    <el-row :gutter="24" style="text-align: left;line-height: 10px;margin-bottom: 10px">
      <el-col :span="4">
        <el-input placeholder="请输入搜索内容" v-model="params.search" />
      </el-col>
      <el-col :span="4">
        <el-select v-model="params.status" clearable placeholder="选择审核状态">
          <el-option label="待审核" value="UNDER_REVIEW" />
          <el-option label="审核中" value="REVIEWING" />
          <el-option label="通过" value="PASSED" />
          <el-option label="不通过" value="FAIL" />
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="params.type" clearable placeholder="选择申请类型">
          <el-option v-for="(value, key) in ApplicationType" :label="value" :value="key" />
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select placeholder="选择党组织" clearable v-model="params.departmentId">
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
      <el-col :span="2">
        <el-button type="primary" style="width: 60px;" @click="loadData(state)">搜索</el-button>
      </el-col>
    </el-row>
    <!-- 搜索、添加、导入导出END -->

    <!-- 用户列表 BEGIN -->
    <el-table :data="tableData" style="width: 100%" height="550">
      <el-table-column fixed prop="department.name" label="党组织"/>
      <el-table-column fixed prop="applicant.realName" label="申请人"/>
      <el-table-column fixed prop="target.realName" label="目标对象"/>
      <el-table-column prop="type" label="类型">
        <template #default="scope">
          <el-tag type="info">{{ ApplicationType[scope.row.type] }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template #default="scope">
          <AuditTag :state="scope.row.status" />
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template #default="scope">
          <el-button size="small" type="danger" @click="handleAudit(scope.row.id, 'FAIL', state)">拒绝</el-button>
          <el-button size="small" type="success" @click="handleAudit(scope.row.id, 'PASSED', state)">通过</el-button>
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
  <!-- 组件 END -->
</template>

<script>
import { reactive, onMounted, toRefs } from "vue";
import {loadData, handleAudit, ApplicationType} from "./service/applicationRecord.js";
import AuditTag from "../../components/AuditStatus/AuditTag.vue";

export default {
  name: "ApplicationRecord",
  components: {
    AuditTag,
  },
  setup() {
    const state = reactive({
      tableData: [],
      params: {
        departmentId: null,
        page: 1, // 几页
        search: null, // 模糊查询内容
        size: 10, // 每页显示几条
        sort: null,
        sortType: null,
        status: null,
        type: null
      },
      total: 0,
    }); // reactive 响应式对象声明

    onMounted(() => {
      // 加载页面时执行
      loadData(state);
    });

    return {
      ApplicationType,
      state,
      ...toRefs(state), //toRefs将对象中的内容转换为响应式数据
      loadData,
      handleAudit,
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