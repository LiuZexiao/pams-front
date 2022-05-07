import {add, defaultUserInfo, fetchData, modify, remove} from "../../../api/userInfo";
import {ElMessage} from "element-plus";

export const MODE = {
    EDIT: "modify",
    ADD: "add"
}

export const loadData = (state) => {
    state.tableDataLoading = true
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
        state.tableDataLoading = false
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
    console.log("showEdit3:" + mode)
    console.log("showEdit3:" + index)
    state.mode = mode
    state.data = index != null ? state.tableData[index] : defaultUserInfo
    console.log("showEdit3:" + JSON.stringify(state.data))
    state.editVisible = true
    state.currentIndex = null
}

/* 编辑用户 */
export const handleToEditUserInfo = (state) => {
    console.log("handleToEditUserInfo2:" + state.currentIndex)
    showEdit(state.currentIndex, MODE.EDIT, state)
}

/* 关闭编辑框 */
export const closeEdit = (visible, state) => {
    state.editVisible = visible
}

/* 成功导入数据 */
export const importSuccess = (state) => {
    state.importVisible = false
    loadData(state)
}

/* 打开导入窗口 */
export const showImport = (state) => {
    state.importVisible = true
}

/* 关闭导入窗口 */
export const closeImport = (visible, state) => {
    state.importVisible = visible
}

/* 打开导出窗口 */
export const showExport = (state) => {
    state.exportVisible = true
}

/* 关闭导出窗口 */
export const closeExport = (visible, state) => {
    state.exportVisible = visible
}

/* 打开评估窗口 */
export const showEvaluate = (index, state) => {
    console.log("showEvaluate1:" + index)
    state.currentIndex = index
    state.data = state.tableData[index]
    state.aiEvaluateVisible = true
}

/* 关闭评估窗口 */
export const closeEvaluate = (visible, state) => {
    state.aiEvaluateVisible = visible
}
