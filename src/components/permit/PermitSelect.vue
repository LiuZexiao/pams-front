<template>
  <el-tree-select v-model="permitId" clearable check-strictly placeholder="请选择"
                  :data="treeData || tree"
                  @change="(val) => emit('onChange', val)" />
</template>

<script>

import {onMounted, reactive, toRefs} from "vue";
import {tree} from "../../api/permit";
import {ElMessage} from "element-plus";

export default {
  name: "PermitSelect",
  props: {
    permitId: String,
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
          res.data.forEach(item => {
            let data = {
              value: item.id,
              label: item.name,
              children: buildChildren(item)
            }
            state.tree.push(data)
          })
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