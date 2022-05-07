import {add, defaultUserInfo, fetchData, modify, remove} from "../../../api/userInfo";
import {audit, fetchPageData} from "../../../api/applicationRecord";
import {ElMessage} from "element-plus";

export const ApplicationType = {
    FIRST_CONTACT: "第一培养联系人",
    SECOND_CONTACT: "第二培养联系人",
    FIRST_INTRODUCER: "第一入党介绍人",
    SECOND_INTRODUCER: "第二入党介绍人",
}

export const loadData = (state) => {
    state.tableDataLoading = true
    if (state.params.status === "") {
        state.params.status = null
    }
    if (state.params.type === "") {
        state.params.type = null
    }
    fetchPageData(state.params).then(function (res) {
        const data = res.data
        state.tableData = data.content;
        state.total =data.totalElements
        state.params.size = data.size
        state.params.page = data.number + 1
        state.tableDataLoading = false
    });
}

/**
 * 处理审核事件
 * @param id
 * @param status
 * @param state
 */
export const handleAudit = (id, status, state) => {
    audit({id, status}).then(res => {
        if (res.code === 200) {
            loadData(state)
            ElMessage.success(res.message)
        } else {
            ElMessage.error(res.message)
        }
    })
}