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
      <el-col :span="6"></el-col>
      <el-col :span="6">
        <el-input placeholder="请输入搜索内容"></el-input>
      </el-col>
      <el-col :span="12">
        <el-button type="primary" @click="search()"> 搜索 </el-button>
        <el-button type="primary" @click="userSearch()"> 高级搜索 </el-button>
      </el-col>
    </el-row>
     <el-table :data="tableData"
            style="width: 100%"
            height="550">
    <el-table-column fixed
                     prop="id"
                     label="编号"
                     width="60" />
    <el-table-column prop="realName"
                     label="姓名"
                     width="120" />
    <el-table-column prop="number"
                     label="学号"
                     width="120" />
    <el-table-column prop="clazz"
                     label="班级"
                     width="320" />
    <el-table-column prop="address"
                     label="Address"
                     width="600" />
    <el-table-column prop="stage"
                     label="阶段"
                     width="120" />
    <el-table-column fixed="right"
                     label="操作"
                     width="90">
      <!-- <template #default>
        <el-button type="text" size="small" @click="handleClick"
          >Detail</el-button
        >
        <el-button type="text" size="small">Edit</el-button>
      </template> -->
    </el-table-column>
  </el-table>
  </el-card>
  <UserSearch :centerDialogVisible="centerDialogVisible" @onCloseDialog="closeDialogVisivle"></UserSearch>

</template>

<script>
import { reactive, onMounted, toRefs } from "vue";
import { userInfo } from "../..//api/user.js";
import UserSearch from "./UserSearch.vue"
import BreadCrumb from "../BreadCrumb.vue"
function loadData(state) {
  const params = {
    // "clazz": "",
    // "college": "",
    // "departmentId": 1,
    // "gender": "",
    // "job": "",
    // "number": "",
    page: 1, // 几页
    // "realName": "",
    // "search": "", // 模糊查询内容
    size: 10, // 每页显示几条
    // "sort": "",
    // "sortType": "",
    // "stageId": 1, //
    // "state": ""
  };
  userInfo(params).then(function (res) {
    console.log(res);
    console.log(res.data);
    state.tableData = res.data.content;
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

// function handleClick(){
//   console.log('click')
// }
function search(){}

// function userSearch(state){
//   state.centerDialogVisible = true;
// }

export default {
  name: "list",
  components: {
    UserSearch,
    BreadCrumb,
  },
  setup() {
    const state = reactive({
      tableData: [],
      centerDialogVisible: false,
    }); // reactive 响应式对象声明
    onMounted(() => {
      // 加载页面时执行
      loadData(state);
    });
    const userSearch = () =>{
      state.centerDialogVisible = true;
    }
    const closeDialogVisivle = (visible) => {
      state.centerDialogVisible = visible;
    }

    return {
      ...toRefs(state), //toRefs将对象中的内容转换为响应式数据
      userSearch,
      closeDialogVisivle,
    };
  },
};
</script>

<style scoped>
main.el-main{
  text-align: left;
  line-height: 0px;
}
</style>