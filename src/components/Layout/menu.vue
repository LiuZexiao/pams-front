<template>
  <Nav />
  <el-container>

    <el-aside width="200px">
      <el-scrollbar height="850px">
        <div class="header-menu">
          <div style="margin-top: 20px; margin-bottom:20px;line-height: 0px;">
          <span class="el-dropdown-link">
            <a href="/owner/info"
               target="_blank">
              <el-avatar :size="80" style="margin-bottom:5px;"
                         :src="account.avatar ? account.avatar : 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'" />
            </a>
          </span>
            <div class="user_role">
              {{ userInfo.realName }}
              <el-carousel height="30px" indicator-position="none" arrow="never">
                <el-carousel-item v-for="(role, index) in rolesData" :key="index">
                  <el-tag type="success"> {{ role.name }}</el-tag>
                </el-carousel-item>
              </el-carousel>
            </div>
          </div>
        </div>
        <el-menu :default-active="activePath"
                 class="el-menu-vertical-demo"
                 background-color="rgb(226, 35, 33)"
                 text-color="#fff"
                 active-text-color="#ffd04b"
                 router>
          <!-- 一级菜单 无子菜单 -->
          <el-menu-item v-for="item in menusData"
                        v-show="!item.children"
                        :index="item.path"
                        :key="item.id"
                        @click="saveNavPath(item.path)">
            <template #title>
              <!-- <el-icon> 菜单图标
                <add-location />
              </el-icon> -->
              <span>{{ item.title }}</span>
            </template>
          </el-menu-item>
          <!-- 一级菜单 有子菜单 -->
          <el-sub-menu v-for="item in menusData"
                       v-show="item.children"
                       :index="item.id"
                       :key="item.id">
            <template #title>
              <!-- <el-icon> 菜单图标
                <add-location />
              </el-icon> -->
              <span>{{ item.title }}</span>
            </template>
            <el-menu-item v-for="subItem in item.children"
                          :index="subItem.path"
                          :key="subItem.id"
                          @click="saveNavPath(subItem.path)">
              <!-- <el-menu-item
              v-for="subItem in item.children"
              :index="'/'+subItem.path"
              :key="subItem.id"
            > -->
              {{ subItem.title }}
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>

    </el-aside>

    <el-main>
      <BreadCrumb></BreadCrumb>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
import { onMounted, reactive, toRefs } from "vue";
import { useRouter } from "vue-router"
import axios from "axios";
import router from "../../router";
import { userInfo } from "../../api/userInfo.js";
import Nav from "./compoents/nav.vue";
import BreadCrumb from "../BreadCrumb.vue"
import {userRoles} from "../../api/owner/user";

function useLoadMenuData(state) {
  axios.get("/menus").then((res) => {
    state.menusData = res.data;
  });
}

function userName(state){
  userInfo().then(function (res) {
    state.realName = res.data.realName;
  })
}

export default {
  name: "layout",
  components: {
    Nav,
    BreadCrumb,
  },
  setup() {
    const state = reactive({
      userInfo: {},
      account: {},
      menusData: [
        //菜单数据
        {
          id: "1",
          title: "仪表盘",
          path: "/dashboard", // 在组件中用不到
        },
        {
          id: "2",
          title: "新闻活动",
          path: "",
          children: [
            {
              id: "21",
              title: "新闻信息",
              path: "/event/information",
            },
            {
              id: "22",
              title: "党务活动",
              path: "/event/activity",
            },
          ],
        },
        {
          id: "3",
          title: "用户管理",
          path: "",
          children: [
            {
              id: "31",
              title: "用户列表",
              path: "/user/list",
            },
            {
              id: "33",
              title: "模板管理",
              path: "/user/template",
            },
          ],
        },
        {
          id: "4",
          title: "党务管理",
          path: "",
          children: [
            {
              id: "41",
              title: "用户阶段信息",
              path: "/affair/userStage",
            },
            {
              id: "42",
              title: "联系人介绍人",
              path: "/affair/applicationRecord",
            },
            {
              id: "43",
              title: "入党流程",
              path: "/affair/stage",
            },
          ],
        },
        {
          id: "5",
          title: "系统管理",
          path: "",
          children: [
            {
              id: "51",
              title: "账号管理",
              path: "/system/account",
            },
            {
              id: "52",
              title: "部门管理",
              path: "/system/department",
            },
            {
              id: "53",
              title: "角色管理",
              path: "/system/role",
            },
            {
              id: "54",
              title: "权限管理",
              path: "/system/permit",
            },
          ],
        },
      ],
      rolesData: [],
      activePath: "", // 存储当前点击的菜单路径
    });

    onMounted(() => {
      loadData() // 初始化数据
      loadMenu() // 读取菜单
      loadRole() // 读取用户当前角色
    });

    function loadData() {
      // state.activePath = localStorage.getItem("activePath");
      state.activePath = useRouter().currentRoute.value.path
      state.account = JSON.parse(localStorage.getItem("account"))
      state.userInfo = JSON.parse(localStorage.getItem("userInfo"))
    }

    function loadRole() {
      userRoles().then(res => {
        if (res.code === 200) {
          state.rolesData = res.data
          localStorage.setItem("userRoles", JSON.stringify(res.data))
        }
      })
    }

    function loadMenu() {
      let userRoutes = JSON.parse(localStorage.getItem("userRoutes"))
      state.menusData = [
        {
          id: "-1",
          title: "仪表盘",
          path: "/dashboard", // 在组件中用不到
        },
      ]
      userRoutes.forEach((route, index) => {
        state.menusData.push(buildMenu(route, index))
      })
    }

    function buildMenu(route, index) {
      return {
        id: index,
        title: route.name,
        path: route.parentId ? route.url : "",
        children: buildMenuChildren(route)
      }
    }

    function buildMenuChildren(parent) {
      let children = []
      parent.children.forEach((child, index) => {
        children.push(buildMenu(child, index))
      })
      return children
    }



    // 保存链接的激活状态
    function saveNavPath(activePath) {
      // localStorage.setItem("activePath", activePath);
      state.activePath = activePath;
    }

    return {
      ...toRefs(state),
      saveNavPath,
    };
  },
};
</script>

<style>
body {
  margin: 0;
}

.el-header,
.el-footer {
  /* background-color: rgb(221, 24, 27); */
  color: var(--el-text-color-primary);
  /* text-align: center; */
  line-height: 60px;
  position: relative; /** */
}

.el-aside {
  background-color: rgb(226, 35, 33);
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 200px;
  margin-left: 8%;
}

.el-main {
  background-color: #e9eef3;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 160px;
  margin-right: 8%;
  --el-header-height: 0px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

/*.header-div img {*/
/*  vertical-align: middle;*/
/*  width: 45px;*/
/*  height: 45px;*/

/*  !*position: absolute; *!*/

/*  !*  transform: translate(-50%, -50%); *!*/
/*}*/

/*.header-div {*/
/*  top: 50%;*/
/*  left: 20%;*/
/*  position: absolute;*/
/*  transform: translate(-50%, -50%);*/

/*  color: #e9eef3;*/
/*  !* weight: 500; *!*/
/*  font-size: 20px;*/
/*  !* position: absolute; *!*/
/*}*/

/*.header-menu {*/
/*  top: 50%;*/
/*  right: 10%;*/
/*  position: absolute;*/
/*  transform: translate(-50%, -50%);*/

/*  color: #e9eef3;*/
/*  !* weight: 500; *!*/
/*  font-size: 10px;*/
/*  !* position: absolute; *!*/

/*  display: flex;*/
/*}*/

/*.header-menu img {*/
/*  vertical-align: middle;*/
/*  width: 45px;*/
/*  height: 45px;*/

/*  !*position: absolute; *!*/

/*  !*  transform: translate(-50%, -50%); *!*/
/*}*/

a {
  text-decoration: none;
  color: #e9eef3;
}

.user_role {
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  font-size: 14px;
  line-height: 1.42857143;
  font-family: Helvetica Neue,Helvetica,microsoft yahei,arial,STHeiTi,sans-serif;
  -webkit-box-direction: normal;
  box-sizing: border-box;
  font-weight: 700;
  color: white;
}
</style>