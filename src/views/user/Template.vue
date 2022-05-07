<template>
  <el-card shadow="never" class="box-card">
    <!-- 搜索、添加 BEGIN -->
    <el-row :gutter="24" style="text-align: left;line-height: 10px;margin-bottom: 10px">
      <el-col :span="4">
        <el-input placeholder="请输入搜索内容" v-model="params.search" />
      </el-col>
      <el-col :span="2">
        <el-button type="primary" style="width: 60px;" @click="loadData">搜索</el-button>
      </el-col>
      <el-col :span="2">
        <el-button style="width: 60px;" @click="advancedSearch = !advancedSearch">
          更多
          <el-icon v-if="advancedSearch"><arrow-down /></el-icon>
          <el-icon v-if="!advancedSearch"><arrow-left /></el-icon>
        </el-button>
      </el-col>
      <el-col :span="10"></el-col>
      <el-col :span="3" />
      <el-col :span="2">
        <el-button style="width: 60px;" @click="showEdit(null, MODE.ADD)"><el-icon><plus /></el-icon>&nbsp;添加</el-button>
      </el-col>
      <el-col :span="1" />
    </el-row>
    <!-- 搜索、添加 END -->

    <!-- 高级搜索 BEGIN -->
    <el-row v-show="advancedSearch" :gutter="24" style="text-align: left;line-height: 10px;">
      <el-col :span="4">
        <el-input placeholder="请输入模板名" v-model="params.name"/>
      </el-col>
      <el-col :span="4">
        <el-select placeholder="请选择创建人" clearable v-model="params.creatorId">
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

    <!-- 数据列表 BEGIN -->
    <el-table :data="tableData" v-loading="tableDataLoading" style="width: 100%" height="550">
      <el-table-column fixed prop="id" label="编号" width="80"/>
      <el-table-column fixed prop="name" label="模板" width="280"/>
      <el-table-column prop="department.name" label="部门" width="150"/>
      <el-table-column prop="creator.realName" label="创建者" width="150"/>
      <el-table-column prop="updated" label="更新时间" width="240"/>
      <el-table-column prop="created" label="创建时间" width="240"/>
      <el-table-column fixed="right" label="操作" width="200">
        <template #default="scope">
          <el-button size="small" @click="showEdit(scope.$index, MODE.EDIT)">编辑</el-button>
          <el-button size="small" type="info" @click="handleDownload(scope.row.id)">下载</el-button>
          <el-popconfirm confirm-button-text="确认" cancel-button-text="取消"
                         :icon="InfoFilled" icon-color="red" title="确认删除这条数据？"
                         @confirm="handleDelete(scope.row.id)">
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
          loadData()
        }"
                   @current-change="(current) => {
          params.page = current
          loadData()
        }"
    />
    <!-- 数据列表 END -->
  </el-card>

  <!-- 组件 BEGIN -->
  <TemplateEdit :visible="editVisible" :row="data" :mode="mode" @onClose="closeEdit" @onSave="handleEdit"/>
  <!-- 组件 END -->
</template>

<script>
import { reactive, onMounted, toRefs } from "vue";
import TemplateEdit from "./components/TemplateEdit.vue"
import { ElMessage } from "element-plus";
import { InfoFilled } from '@element-plus/icons-vue'
import { fetchListByPage, remove, add, modify, download, defaultTemplate } from "../../api/tableTemplate";
import {convertRes2Blob} from "../../utils/fileUtil";

export default {
  name: "Template",
  components: {
    TemplateEdit,
  },
  setup() {
    const MODE = {
      EDIT: "modify",
      ADD: "add"
    }
    const state = reactive({
      tableData: [],
      data: defaultTemplate,
      mode: null,
      params: {
        creatorId: null,
        departmentId: null,
        name: null,
        page: 1, // 几页
        search: null, // 模糊查询内容
        size: 10, // 每页显示几条
        sort: null,
        sortType: null,
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

    /**
     * 加载数据
     */
    const loadData = () => {
      state.tableDataLoading = true
      fetchListByPage(state.params).then(res => {
        const data = res.data
        state.tableData = data.content;
        state.total =data.totalElements
        state.params.size = data.size
        state.params.page = data.number + 1
        state.tableDataLoading = false
      })
    }

    /**
     * 处理编辑事件
     */
    const handleEdit = async (row) => {
      let res = {};
      if (state.mode === MODE.EDIT) {
        res = await modify(row)
      } else {
        res = await add(row)
      }
      if (res.code === 200) {
        state.mode = null
        state.data = defaultTemplate
        state.editVisible = false
        loadData()
        ElMessage.success(res.message)
      } else {
        loadData()
        ElMessage.error(res.message)
      }
    }

    /**
     * 处理下载事件
     */
    const handleDownload = async (rowId) => {
      convertRes2Blob(await download(rowId))
    }

    /**
     * 处理删除事件
     */
    const handleDelete = (rowId) => {
      remove(rowId).then(res => {
        if (res.code === 200) {
          ElMessage.success(res.message)
          loadData()
        } else {
          ElMessage.error(res.message)
        }
      })
    }

    /**
     * 显示编辑框
     */
    const showEdit = (index, mode) => {
      state.mode = mode
      state.data = index != null ? state.tableData[index] : defaultTemplate
      state.editVisible = true
      console.log("showEdit:" + state.data)
    }

    /**
     * 关闭编辑框
     * @param visible
     */
    const closeEdit = (visible) => {
      state.editVisible = visible
    }

    return {
      MODE,
      ...toRefs(state), //toRefs将对象中的内容转换为响应式数据
      loadData,
      handleEdit,
      handleDownload,
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