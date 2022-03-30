<template>
  <BreadCrumb></BreadCrumb>
  部门管理

  组织架构管理 “组织架构管理”功能，可以新建下级党组织，以及查询维护党组织结构关系。 组织架构管理能够对党组织机构信息进行管理，当初始化组织机构不存在时，则需要添加相应的组织机构信息。
  当信息需要修改时，可以对已存在的组织机构信息进行管理，若取消机构，则可以一并删除该组织机构信息。当组织信息更新时，操作信息会自动提交到系统日志中进行保存。
</template>

<script>
import BreadCrumb from "../BreadCrumb.vue"
export default {
  name: "Department",
   components: {
    BreadCrumb,
  },
};
</script>

<style scoped>
</style>