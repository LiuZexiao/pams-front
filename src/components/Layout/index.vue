<template>
  <el-container>
    <el-header>
      <div class="header-div">
        <!-- <img class="header-logo"
             src="../../assets/dh1024.png"
             alt="logo" />
        <span>
          <router-link to="/">党务系统</router-link>
        </span> -->
      </div>
      <div class="header-menu">
        <el-dropdown>
          <span class="el-dropdown-link">
            <el-avatar
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            />
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item>账号信息</el-dropdown-item>
              <el-dropdown-item divided>
                <el-link :underline="false"
                         style="font-size: 10px;"
                         @click="loginout">
                  <switch-button width="17px" style="vertical-align: middle;"/>
                  退出
                </el-link>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>

    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu :default-active="activePath"
                 class="el-menu-vertical-demo"
                 background-color="rgb(226, 35, 33)"
                 text-color="#fff"
                 active-text-color="#ffd04b"
                 router>
          <!-- 一级菜单 -->
          <el-sub-menu v-for="item in menusData"
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
      </el-aside>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import {onMounted, reactive, toRefs} from "vue";
import axios from "axios";
import router from "../../router";

function useLoadMenuData(state) {
  axios.get("/menus").then((res) => {
    state.menusData = res.data;
  });
}

export default {
  name: "layout",
  setup() {
    const state = reactive({
      menusData: [//菜单数据
        {
          id: "1",
          title: "个人管理",
          path: "/login", // 在组件中用不到
          children: [
            {
              id: "2",
              title: "个人中心",
              path: "/user/home",
            },
            {
              id: "3",
              title: "个人信息管理",
              path: "/user/userinfo",
            }
          ],
        },
        {
          id: "4",
          title: "通知公告管理",
          path: "",
          children: [
            {
              id: "5",
              title: "通知公告管理",
              path: "/announcement/ann-manage",
            },
          ],
        },
        {
          id: "6",
          title: "党务管理",
          path: "",
          children: [
            {
              id: "7",
              title: "入党材料管理",
              path: "/communist/communist-data",
            },
          ],
        },
        {
          id: "8",
          title: "党组织管理",
          path: "",
          children: [
            {
              id: "9",
              title: "组织架构管理",
              path: "/organization/org-manage",
            },
          ],
        },
        {
          id: "10",
          title: "系统管理",
          path: "",
          children: [
            {
              id: "11",
              title: "系统操作日志",
              path: "/system/sys-log",
            },
            {
              id: "12",
              title: "组织成员管理",
              path: "/system/sys-organization",
            },
            {
              id: "13",
              title: "系统权限管理",
              path: "/system/sys-role",
            },
            {
              id: "14",
              title: "系统用户管理",
              path: "/system/sys-user",
            },
          ],
        },
      ],
      activePath: "", // 存储当前点击的菜单路径
    });
    onMounted(() => {
      // useLoadMenuData(state); //读取菜单
      state.activePath = window.sessionStorage.getItem("activePath");
      ;
    });

    // 保存链接的激活状态
    function saveNavPath(activePath) {
      window.sessionStorage.setItem("activePath", activePath);
      state.activePath = activePath;
    }

    // 用户退出
    function logoout() {
      window.sessionStorage.clear();
      router.push("/login");
    }

    return {
      ...toRefs(state),
      logoout,
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
  background-color: rgb(221, 24, 27);
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
  margin-left: 10%;
}

.el-main {
  background-color: #e9eef3;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 160px;
  margin-right: 10%;
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

.header-div img {
  vertical-align: middle;
  width: 45px;
  height: 45px;

  /*position: absolute; */

  /*  transform: translate(-50%, -50%); */
}

.header-div {
  top: 50%;
  left: 20%;
  position: absolute;
  transform: translate(-50%, -50%);

  color: #e9eef3;
  /* weight: 500; */
  font-size: 20px;
  /* position: absolute; */
}

.header-menu {
  top: 50%;
  right: 10%;
  position: absolute;
  transform: translate(-50%, -50%);

  color: #e9eef3;
  /* weight: 500; */
  font-size: 10px;
  /* position: absolute; */

  display: flex;
}

.header-menu img {
  vertical-align: middle;
  width: 45px;
  height: 45px;

  /*position: absolute; */

  /*  transform: translate(-50%, -50%); */
}

a {
  text-decoration: none;
  color: #e9eef3;
}

</style>