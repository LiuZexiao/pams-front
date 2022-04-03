import request from '../utils/request'

/**
 * 获取树形的部门数据
 * @param data
 * @returns {AxiosPromise}
 */
export function tree() {
    return request({
        url: '/department/tree',
        method: 'get',
    })
}