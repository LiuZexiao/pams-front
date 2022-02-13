// import { createRouter, createWebHashHistory } from "vue-router";
import { createRouter, createWebHistory  } from "vue-router";
import Layout from "../components/Layout/index.vue";
const routes = [
  {
    path: "/",
    redirect: "/main",
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/first",
    name: "首页",
    component: () => import("../views/First.vue"),
  },
  {
    path: "/main",
    component: Layout,
    redirect: "/user/home",
    children: [
      // {
      //   path: "/home",
      //   name: "个人系统首页",
      //   component: () => import("../views/user/Home.vue"), //
      // },
    ],
  },
  {
    path: "/user",
    name: "用户管理",
    component: Layout,
    children: [
      {
        path: "home",
        name: "个人中心",
        component: () => import("../views/user/Home.vue"), //
      },
      {
        path: "userinfo",
        name: "个人信息管理",
        component: () => import("../views/user/Userinfo.vue"), 
      },
    ],
  },
  {
    path: "/announcement",
    name: "通知公告管理",
    component: Layout,
    children: [
      {
        path: "ann-manage",
        name: "通知公告管理",
        component: () => import("../views/announcement/AnnManage.vue"), 
      },
    ],
  },
  {
    path: "/communist",
    name: "党务管理",
    component: Layout,
    children: [
      {
        path: "communist-data",
        name: "入党材料管理",
        component: () => import("../views/communist/CommunistData.vue"), 
      },
    ],
  },
  {
    path: "/organization",
    name: "党组织管理",
    component: Layout,
    children: [
      {
        path: "org-manage",
        name: "组织架构管理",
        component: () => import("../views/organization/OrgManage.vue"), 
      },
      {
        path: "user-manage",
        name: "组织成员管理",
        component: () => import("../views/organization/UserManage.vue"), 
      },
    ],
  },
  {
    path: "/system",
    name: "系统管理",
    component: Layout,
    children: [
      {
        path: "sys-log",
        name: "系统操作日志",
        component: () => import("../views/system/SysLog.vue"), 
      },
      {
        path: "sys-organization",
        name: "组织成员管理",
        component: () => import("../views/organization/OrgManage.vue"), 
      },
      {
        path: "sys-role",
        name: "系统权限管理",
        component: () => import("../views/system/SysLog.vue"), 
      },
      {
        path: "sys-user",
        name: "系统用户管理",
        component: () => import("../views/system/SysUser.vue"), 
      },
    ],
  },
  // {
  //   path: "/user",
  //   name: "用户管理",
  //   component: Layout,
  //   children: [
  //     {
  //       path: "/user-list",
  //       name: "UserList",
  //       component: () => import("../views/UserList.vue"),
  //     },
  //     {
  //       path: "/user-setting",
  //       name: "UserSetting",
  //       component: () => import("../views/UserSetting.vue"),
  //     },
  //   ],
  // },
  {
    path: '/:pathMatch(.*)*', 
    name: 'NotFound', 
    component: () => import("../views/NotFound.vue"),
  },
];

const router = createRouter({
  // history: createWebHashHistory(),
  history: createWebHistory(), // 除去 URL  # 
  routes,
});
// router.beforeEach((to, from, next) => { // 使用 router 都会执行 beforeEach
//   // to将要访问的路径
//   // from： 表示从哪个路径跳转过来的
//   // next：是一个函数，放行
//   if (to.path === "/login") return next();
//   // 获取token
//   const tokenStr = window.sessionStorage.getItem("token");
//   if (!tokenStr) return next('/login');
//   next();
// })
export default router; //这段后，要有回车保留一个空行否则会报错。
