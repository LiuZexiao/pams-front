<template>
  <el-tree-select v-model="departmentId" clearable check-strictly placeholder="请选择"
                  :data="treeData || tree"
                  @change="(val) => emit('onChange', val)" />
</template>

<script>

import {onMounted, reactive, toRefs} from "vue";
import {tree} from "../../api/department";
import {ElMessage} from "element-plus";

export default {
  name: "StageSelect",
  props: {
    departmentId: String,
    treeData: Array
  },
  emits: ["onChange"], // 父组件传过来的事件
  setup(props, { emit }) {

    const state = reactive({
      tree: [],
    }); // reactive 响应式对象声明

    onMounted(() => {
      if (!props.treeData) {
        loadData();
      }
    })

    const loadData = () => {
      tree().then(res => {
        if (res.code === 200) {
          let data = {
            value: res.data.id,
            label: res.data.name,
            children: buildChildren(res.data)
          }
          state.tree.push(data)
        } else {
          ElMessage.error(res.message)
        }
      })
    }

    const buildChildren = (parent) => {
      const children = []
      parent.children.forEach(child => {
        let data = {
          value: child.id,
          label: child.name,
          children: buildChildren(child)
        }
        children.push(data)
      })
      return children;
    }

    return {
      ...toRefs(state), //toRefs将对象中的内容转换为响应式数据
      emit,
    }
  },
}
</script>

<style scoped>
</style>