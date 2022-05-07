import {fetchPageData} from "../../../api/userInfoStage";

export const loadData = (state) => {
    state.tableDataLoading = true
    if (state.params.status === "") {
        state.params.status = null
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