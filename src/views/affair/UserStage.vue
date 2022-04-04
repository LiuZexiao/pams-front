<template>
  <!-- 阶段信息（用户的入党阶段、审核、个性化查询） -->
   <el-card shadow="never" class="box-card">
    <!-- 搜索 BEGIN -->
    <el-row :gutter="24" style="text-align: left;line-height: 10px;margin-bottom: 10px">
      <el-col :span="4">
        <el-input placeholder="请输入搜索内容" v-model="params.search" />
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
      <el-col :span="4">
        <el-select placeholder="选择阶段" clearable v-model="params.stageId">
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
        <el-select placeholder="选择审核人" clearable v-model="params.approverId">
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
        <AuditSelect :state="params.status" @onChange="(val) => params.status = val" />
      </el-col>
      <el-col :span="4">
        <el-button type="primary" style="width: 60px;" @click="loadData">搜索</el-button>
      </el-col>
    </el-row>
    <!-- 搜索 END -->

    <!-- 用户列表 BEGIN -->
    <el-table :data="tableData" style="width: 100%" height="550">
      <el-table-column fixed prop="stage.name" label="阶段名称"/>
      <el-table-column fixed prop="userInfo.realName" label="姓名"/>
      <el-table-column prop="score" label="分数">
        <template #default="scope">
          <el-input type="number"
                    v-if="scope.row.stage.needScore"
                    v-model="scope.row.score"
                    @change="(val) => handleScoreChange(val, scope.row.id)"
          />
          <span v-else>\</span>
        </template>
      </el-table-column>
      <el-table-column prop="beginDate" label="开始时间"/>
      <el-table-column prop="endDate" label="结束时间"/>
      <el-table-column prop="remark" label="备注"/>
      <el-table-column prop="status" label="状态">
        <template #default="scope">
          <AuditTag v-if="scope.row.stage.needReview" :state="scope.row.status" />
          <span v-else>\</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template #default="scope">
          <el-button size="small" type="primary" :disabled="!scope.row.stage.needReview" @click="showAudit(scope.row)">审核</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="sizes, prev, pager, next, jumper, ->, total"
        :total="total"
        :page-size="params.size"
        v-model:current-page="params.page"
        @size-change="(pageSize) => {
          params.size = pageSize
          loadData()
        }"
        @current-change="(current) => {
          params.page = current
          loadData()
        }"
    />
    <!-- 用户列表 END -->
  </el-card>

  <!-- 组件 BEGIN -->
  <UserStageAudit v-if="auditVisible" :row="data" :visible="auditVisible" @onClose="closeAudit" @onSave="saveAudit"/>
  <!-- 组件 END -->
</template>

<script>
import { reactive, onMounted, toRefs } from "vue";
import {fetchPageData, entryScore, audit} from "../../api/stageManage.js";
import { ElMessage } from "element-plus";
import { InfoFilled } from '@element-plus/icons-vue'
import AuditSelect from "../../components/AuditStatus/AuditSelect.vue";
import AuditTag from "../../components/AuditStatus/AuditTag.vue";
import UserStageAudit from "./components/UserStageAudit.vue";

export default {
  name: "UserStage",
   components: {
     AuditSelect,
     AuditTag,
     UserStageAudit,
  },
  setup() {
    const state = reactive({
      tableData: [],
      data: null,
      params: {
        approverId: null,
        beginDate: null,
        departmentId: null,
        endDate: null,
        page: 1,
        search: null,
        size: 10,
        sort: null,
        sortType: null,
        stageId: null,
        status: null
      },
      total: 0,
      auditVisible: false,
      editVisible: false,
      advancedSearch: false,
    }); // reactive 响应式对象声明

    onMounted(() => {
      // 加载页面时执行
      loadData(state);
    });

    const loadData = () => {
      if (state.params.status === "") {
        state.params.status = null
      }
      fetchPageData(state.params).then(function (res) {
        console.log(res);
        console.log(res.data);
        const data = res.data
        state.tableData = data.content;
        state.total =data.totalElements
        state.params.size = data.size
        state.params.page = data.number + 1
      });
    }

    const handleScoreChange = (score, id) => {
      const param = {score, id}
      entryScore(param).then(res => {
        if (res.code === 200) {
          ElMessage.success(res.message)
        } else {
          ElMessage.error(res.message)
        }
      })
    }

    const saveAudit = (row) => {
      const param = {
        id: row.id,
        auditStatus: row.status,
        remark: row.remark
      }
      audit(param).then(res => {
        if (res.code === 200) {
          ElMessage.success(res.message)
          closeAudit(false)
          loadData()
        } else {
          ElMessage.error(res.message)
        }
      })
    }

    const showAudit = (row) => {
      state.data = row
      state.auditVisible = true
    }

    const closeAudit = (visible) => {
      state.auditVisible = visible
      state.data = null
    }



    return {
      ...toRefs(state), //toRefs将对象中的内容转换为响应式数据
      loadData,
      handleScoreChange,
      saveAudit,
      showAudit,
      closeAudit,
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