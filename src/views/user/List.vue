<template>
  <!-- 用户列表（导入、导出、添加、删除、修改、个性化查询、入党流程图） -->
  <el-card shadow="never" class="box-card">
    <template #header>
      <div class="card-header" style="text-align: left;line-height: 0px;">
        <BreadCrumb></BreadCrumb>
        <!-- <span>用户列表</span> -->
      </div>
    </template>
    <el-row :gutter="24" style="text-align: left;line-height: 10px;">
      <el-col :span="4">
        <el-input placeholder="请输入搜索内容" v-model="params.search" />
      </el-col>
      <el-col :span="4">
        <el-input placeholder="请输入班级" v-model="params.clazz"/>
      </el-col>
      <el-col :span="4">
        <el-select placeholder="请选择院系" v-model="params.college">
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
      </el-col>
      <el-col :span="4">
        <el-select placeholder="选择党组织" v-model="params.departmentId">
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
      </el-col>
      <el-col :span="4">
        <el-select placeholder="入党阶段" v-model="params.stageId">
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
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="loadData"> 搜索</el-button>
<!--        <el-button type="primary" @click=""> 高级搜索</el-button>-->
      </el-col>
    </el-row>
    <el-table :data="tableData" style="width: 100%" height="550">
      <el-table-column fixed prop="number" label="学号" width="120"/>
      <el-table-column prop="realName" label="姓名" width="80"/>
      <el-table-column prop="college" label="学院" width="220"/>
      <el-table-column prop="clazz" label="班级" width="130"/>
      <el-table-column prop="gender" label="性别" width="80"/>
      <el-table-column prop="age" label="年龄" width="80"/>
      <el-table-column prop="applyDate" label="申请入党时间" width="180"/>
      <el-table-column prop="stage.stage.name" label="当前阶段" width="120"/>
      <el-table-column prop="state" label="信息状态" width="120"/>
      <el-table-column fixed="right" label="操作" width="260">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        background
        layout="sizes, prev, pager, next, jumper, ->, total"
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
  </el-card>
  <UserSearch :centerDialogVisible="centerDialogVisible" @onCloseDialog="closeDialogVisivle"></UserSearch>

</template>

<script>
import { reactive, onMounted, toRefs } from "vue";
import { userInfo } from "../../api/userInfo.js";
import UserSearch from "./UserSearch.vue"
import BreadCrumb from "../BreadCrumb.vue"

export default {
  name: "list",
  components: {
    UserSearch,
    BreadCrumb,
  },
  setup() {
    const state = reactive({
      tableData: [],
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
      centerDialogVisible: false,
    }); // reactive 响应式对象声明

    onMounted(() => {
      // 加载页面时执行
      loadData(state);
    });

    const userSearch = () => {
      state.centerDialogVisible = true;
    }

    const closeDialogVisivle = (visible) => {
      state.centerDialogVisible = visible;
    }

    const loadData = () => {
      userInfo(state.params).then(function (res) {
        console.log(res);
        console.log(res.data);
        const data = res.data
        state.tableData = data.content;
        state.total =data.totalElements
        state.params.size = data.size
        state.params.page = data.number + 1
        console.log(state);
      });
      // tableData = [
      //   {
      //     age: null, // 年龄
      //     applyDate: null,
      //     beActivistDate: null, //成为积极分子日期
      //     beDevTargetDate: null, //成为发展对象日期
      //     birthday: null, // 出生日期
      //     clazz: "20计科专本01班",
      //     college: null, //学院
      //     computerLevel: null, //计算机等级
      //     contacts1: null, // 联系人1
      //     contacts2: null, //
      //     correctionDate: null, // 转正时间
      //     devTargetTrainedDate: null, // 发展对象培训时间
      //     education: null, //教育水平
      //     email: null,
      //     englishLevel: null, //英语水平
      //     gender: null, // 性别
      //     hometown: null, // 籍贯
      //     id: 3,
      //     idNumber: null, // 身份证
      //     intermediateQualifyingDate: null, // 中级党课合格时间
      //     introducer1: null, //介绍人1
      //     introducer2: null,
      //     job: null,
      //     joinedDate: null, // 入党时间
      //     mobilePhone: null,
      //     number: "Z2020120127", // 学号
      //     primaryQualifyingDate: null, // 初级党课合格时间
      //     qq: null,
      //     realName: "缪某",
      //     recommendedActivistsDate: null, // 积极分子推优时间
      //     recommendedDevTargetDate: null, // 发展对象推优时间
      //     remark: null, //备注
      //     stage: null, //阶段18个{申请入党、人党积极分子、发展对象、...、毕业班正式党员培训}
      //     state: null,
      //     userId: 3,
      //     wx: null,
      //   },
      // ];
      // data.push({
      //   date: '2016-05-03',
      //   name: 'Tom',
      //   state: 'California',
      //   city: 'Los Angeles',
      //   address: 'No. 189, Grove St, Los Angeles',
      //   zip: 'CA 90036',
      // },
      // {
      //   date: '2016-05-02',
      //   name: 'Tom',
      //   state: 'California',
      //   city: 'Los Angeles',
      //   address: 'No. 189, Grove St, Los Angeles',
      //   zip: 'CA 90036',
      // })
      return state.tableData;
    }

    const handleEdit = (index, row) => {

    }

    return {
      ...toRefs(state), //toRefs将对象中的内容转换为响应式数据
      userSearch,
      loadData,
      handleEdit,
      closeDialogVisivle,
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