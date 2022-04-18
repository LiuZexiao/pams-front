import {fetchByPage, modify, add, remove} from "../../../api/information";
import {ElMessage} from "element-plus";

export const MODE = {
    EDIT: "modify",
    ADD: "add"
}

export const loadData = (state) => {
    if (state.params.type === "") {
        state.params.type = null
    }
    if (state.params.creatorId === "") {
        state.params.creatorId = null
    }
    if (state.params.departmentId === "") {
        state.params.departmentId = null
    }
    fetchByPage(state.params).then(function (res) {
        const data = res.data
        state.tableData = data.content;
        state.total =data.totalElements
        state.params.size = data.size
        state.params.page = data.number + 1
    });
}

/* 处理编辑事件 */
export const handleEdit = async (row, state) => {
    let res = {};
    row.contentText = row.contentHTML
    if (state.mode === MODE.EDIT) {
        res = await modify(row)
    } else {
        res = await add(row)
    }
    if (res.code === 200) {
        state.mode = null
        state.data = {department:{}}
        state.editVisible = false
        loadData(state)
        ElMessage.success(res.message)
    } else {
        loadData(state)
        ElMessage.error(res.message)
    }
}

/* 处理删除事件 */
export const handleDelete = (rowId, state) => {
    remove(rowId).then(res => {
        if (res.code === 200) {
            ElMessage.success(res.message)
            loadData(state)
        } else {
            ElMessage.error(res.message)
        }
    })
}

/* 显示编辑框 */
export const showEdit = (index, mode, state) => {
    state.mode = mode
    state.data = index != null ? state.tableData[index] : {}
    state.editVisible = true
    state.currentIndex = null
}

/* 关闭编辑框 */
export const closeEdit = (visible, state) => {
    state.editVisible = visible
}
