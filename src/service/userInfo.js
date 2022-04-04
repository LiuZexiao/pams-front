import {add, defaultUserInfo, fetchData, modify, remove} from "../api/userInfo";
import {ElMessage} from "element-plus";

const MODE = {
    EDIT: "modify",
    ADD: "add"
}

export const loadData = (state) => {
    if (state.params.state === "") {
        state.params.state = null
    }
    if (state.params.gender === "") {
        state.params.gender = null
    }
    fetchData(state.params).then(function (res) {
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
    if (state.mode === MODE.EDIT) {
        res = await modify(row, row.id)
    } else {
        res = await add(row, null)
    }
    if (res.code === 200) {
        state.mode = null
        state.data = defaultUserInfo
        state.editVisible = false
        loadData(state)
        ElMessage.success(res.message)
    } else {
        loadData(state)
        ElMessage.error(res.message)
    }
}

/* 处理删除事件 */
const handleDelete = (rowId, state) => {
    remove(rowId).then(res => {
        if (res.code === 200) {
            ElMessage.success(res.message)
            loadData(state)
        } else {
            ElMessage.error(res.message)
        }
    })
}