import request from '../utils/request'

/**
 * 查询所有的入党阶段信息（分页+多条件，特别是审核状态）
 * @param data
 * @returns {AxiosPromise}
 */
export function fetchPageData(data) {
    return request({
        url: '/user/info/stage/page',
        method: 'post',
        data,
    })
}

/**
 * 打分
 * @param params {{id: Number, score: Number}}
 * @returns {AxiosPromise}
 */
export function entryScore(params) {
    return request({
        url: '/user/info/stage/entry/' + params.id + "/score",
        method: 'get',
        params,
    })
}

/**
 * 审核
 * @param params {{id: Number, remark: String, auditStatus: String}}
 * @returns {AxiosPromise}
 */
export function audit(params) {
    return request({
        url: '/user/info/stage/' + params.id + "/audit",
        method: 'get',
        params,
    })
}
