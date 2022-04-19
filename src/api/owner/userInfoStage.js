import request from '../../utils/request'

/**
 * 获取子阶段和用户关联数据
 * @returns {AxiosPromise}
 */
export function currentUserInfoStage() {
    return request({
        url: '/owner/user/info/stage',
        method: 'get',
    })
}

/**
 * 申请入党
 * @param params
 * @returns {AxiosPromise}
 */
export function apply(params) {
    return request({
        url: '/owner/user/info/stage',
        method: 'put',
        params
    })
}

/**
 * 申请进入下一阶段
 * @param approverId
 * @returns {AxiosPromise}
 */
export function applyToNext(approverId) {
    return request({
        url: '/owner/user/info/stage?approverId=' + approverId,
        method: 'post',
    })
}
