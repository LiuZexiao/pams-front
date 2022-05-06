// import { createRouter, createWebHashHistory } from "vue-router";
import { createRouter, createWebHistory  } from "vue-router";
import Layout from "~/components/Layout/menu.vue";
import Header from "~/components/Layout/header.vue";
import Account from "~/views/owner/Account.vue";

import Information from "~/views/event/Information.vue";
import Activity from "~/views/event/Activity.vue";

import UserList from "~/views/user/List.vue";
import Template from "~/views/user/Template.vue";

import UserStage from "~/views/affair/UserStage.vue";
import ApplicationRecord from "~/views/affair/ApplicationRecord.vue";
import Stage from "~/views/affair/Stage.vue";

import SysAccount from "~/views/system/Account.vue";
import Department from "~/views/system/Department.vue";
import Role from "~/views/system/Role.vue";
import Permit from "~/views/system/Permit.vue";

import { userPermits } from "~/api/owner/user";

// 公开的路由
const publicRoutes = [
  {
    path: "/",
    component: () => import("~/views/Home.vue"),
  },
  {
    path: "/login",
    name: "登录",
    component: () => import("~/views/Login.vue"),
  },
  // {
  //   path: '/:pathMatch(.*)*',
  //   name: 'NotFound',
  //   component: () => import("../views/NotFound.vue"),
  // },
]

// 登录后公开的路由
const publicRoutesAfterLogin = [
  {
    path: "/owner",
    name: "个人管理",
    component: Header,
    children: [
      {
        path: "/owner/info",
        name: "个人信息",
        component: () => import("../views/owner/Info.vue"),
      },
      {
        path: "/owner/account",
        name: "账号中心",
        component: Account,
        children: [
          {
            path: "/owner/account/updateAccount",
            name: "更新账号信息",
            component: () => import("../views/owner/components/UpdateAccount.vue"),
          },
          {
            path: "/owner/account/updatePassword",
            name: "更新密码",
            component: () => import("../views/owner/components/UpdatePassword.vue"),
          },
          {
            path: "/owner/account/updateEmail",
            name: "更新邮箱",
            component: () => import("../views/owner/components/UpdateEmail.vue"),
          },
          {
            path: "/owner/account/updatePhone",
            name: "更新手机",
            component: () => import("../views/owner/components/UpdatePhone.vue"),
          },

        ],
      },
    ],
  },
  {
    path: "/home",
    name: "仪表盘",
    component: Layout,
    children: [
      {
        path: "/dashboard",
        name: "仪表盘主页",
        component: () => import("../views/dashboard/Dashboard.vue"),
      }
    ],
  },
]

const routes = [
  {
    path: "/",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/login",
    name: "登录",
    component: () => import("../views/Login.vue"),
  },
  // {
  //   path: "/owner",
  //   name: "个人管理",
  //   component: Header,
  //   children: [
  //     {
  //       path: "/owner/info",
  //       name: "个人信息",
  //       component: () => import("../views/owner/Info.vue"),
  //     },
  //     {
  //       path: "/owner/account",
  //       name: "账号中心",
  //       component: Account,
  //       children: [
  //         {
  //           path: "/owner/account/updateAccount",
  //           name: "更新账号信息",
  //           component: () => import("../views/owner/components/UpdateAccount.vue"),
  //         },
  //         {
  //           path: "/owner/account/updatePassword",
  //           name: "更新密码",
  //           component: () => import("../views/owner/components/UpdatePassword.vue"),
  //         },
  //         {
  //           path: "/owner/account/updateEmail",
  //           name: "更新邮箱",
  //           component: () => import("../views/owner/components/UpdateEmail.vue"),
  //         },
  //         {
  //           path: "/owner/account/updatePhone",
  //           name: "更新手机",
  //           component: () => import("../views/owner/components/UpdatePhone.vue"),
  //         },
  //
  //       ],
  //     },
  //   ],
  // },
  // {
  //   path: "/dashboard",
  //   name: "仪表盘",
  //   component: Layout,
  //   children: [
  //     {
  //       path: "/dashboard",
  //       name: "仪表盘",
  //       component: () => import("../views/dashboard/Dashboard.vue"),
  //     }
  //   ],
  // },
  // {
  //   path: "/event",
  //   name: "新闻活动",
  //   component: Layout,
  //   children: [
  //     {
  //       path: "/event/information",
  //       name: "新闻信息",
  //       component: () => import("../views/event/Information.vue"),
  //     },
  //     {
  //       path: "/event/activity",
  //       name: "党务活动",
  //       component: () => import("../views/event/Activity.vue"),
  //     },
  //   ],
  // },
  // {
  //   path: "/user",
  //   name: "用户管理",
  //   component: Layout,
  //   meta:{
  //     title: '用户管理',
  //   },
  //   children: [
  //     {
  //       path: "/user/list",
  //       name: "用户列表",
  //       component: () => import("../views/user/List.vue"),
  //       meta:{
  //         title: '用户列表',
  //       },
  //     },
  //     {
  //       path: "/user/template",
  //       name: "模板管理",
  //       component: () => import("../views/user/Template.vue"),
  //     },
  //   ],
  // },
  // {
  //   path: "/affair",
  //   name: "党务管理",
  //   component: Layout,
  //   children: [
  //     {
  //       path: "/affair/userStage",
  //       name: "阶段信息",
  //       component: () => import("../views/affair/UserStage.vue"),
  //     },
  //     {
  //       path: "/affair/applicationRecord",
  //       name: "记录审核",
  //       component: () => import("../views/affair/ApplicationRecord.vue"),
  //     },
  //     {
  //       path: "/affair/stage",
  //       name: "流程管理",
  //       component: () => import("../views/affair/Stage.vue"),
  //     },
  //   ],
  // },
  // {
  //   path: "/system",
  //   name: "系统管理",
  //   component: Layout,
  //   children: [
  //     {
  //       path: "/system/account",
  //       name: "账号管理",
  //       component: () => import("../views/system/Account.vue"),
  //     },
  //     {
  //       path: "/system/department",
  //       name: "部门管理",
  //       component: () => import("../views/system/Department.vue"),
  //     },
  //     {
  //       path: "/system/role",
  //       name: "角色管理",
  //       component: () => import("../views/system/Role.vue"),
  //     },
  //     {
  //       path: "/system/permit",
  //       name: "权限管理",
  //       component: () => import("../views/system/Permit.vue"),
  //     },
  //   ],
  // },
  
  // {
  //   path: '/:pathMatch(.*)*',
  //   name: 'NotFound',
  //   component: () => import("../views/NotFound.vue"),
  // }
];

const router = createRouter({
  // history: createWebHashHistory(),
  history: createWebHistory(), // 除去 URL  #
  routes: publicRoutes,
});

router.beforeEach((to, from, next) => {
  console.log("-------------------------------begin-------------------------------")
  let token = localStorage.getItem("token")
  if (token) {
    // 登录后路由
    publicRoutesAfterLogin.forEach((item) => {
      router.addRoute(item)
      addChildrenRoute(item, item.children)
    })
    // 获取动态路由
    let navigationList = JSON.parse(localStorage.getItem("userRoutes"))
    if (!navigationList) {
      navigationList = []
      userPermits('ROUTE').then(res => {
        if (res.code === 200) {
          navigationList = res.data
          localStorage.setItem("userRoutes", JSON.stringify(navigationList))
          buildRoutes(navigationList)
          console.log(router.getRoutes(), '动态路由第一次获取')
          next({ ...to, replace: true})
          // next()
        }
      })
    } else {
      // buildRoutes(navigationList)
      console.log(router.getRoutes(), '动态路由已经存在')
      localStorage.setItem("userRoutes", null)
      // next({ ...to, replace: true})
      next()
    }
  } else {
    console.log(router.getRoutes(), '没有登录的路由')
    next()
  }
  console.log("-------------------------------end-------------------------------")
})

const buildRoutes = (navList) => {
  navList.forEach(nav => {
    buildRoute(null, nav)
  })
}

const buildRoute = (parent, nav) => {
  let route = {
    path: nav.url,
    name: nav.name,
    component: nav.parentId === null ? Layout : routePath[nav.url],
    children: buildRouteChildren(nav)
  }
  if (parent) {
    router.addRoute(parent, route)
  } else {
    router.addRoute(route)
  }
  return route
}

const buildRouteChildren = (nav) => {
  let children = []
  nav.children.forEach(child => {
    children.push(buildRoute(nav.name, child))
  })
  return children
}

const addChildrenRoute = (route, children) => {
  children && children.forEach(child => {
    router.addRoute(route.name, child)
    addChildrenRoute(child, child.children)
  })
}

const routePath = {
  "/event/information" : Information,
  "/event/activity" : Activity,
  "/user/list" : UserList,
  "/user/template" : Template,
  "/affair/userStage" : UserStage,
  "/affair/applicationRecord" : ApplicationRecord,
  "/affair/stage" : Stage,
  "/system/account" : SysAccount,
  "/system/department" : Department,
  "/system/role" : Role,
  "/system/permit" : Permit,
}

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
