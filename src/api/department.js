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

/**
 * 新增
 * @param data
 */
export function add(data) {
    return request({
        url: '/department',
        method: 'post',
        data,
    })
}

/**
 * 修改
 * @param data
 */
export function modify(data) {
    return request({
        url: '/department',
        method: 'put',
        data,
    })
}

/**
 * 删除
 * @param id
 */
export function remove(id) {
    return request({
        url: '/department/' + id,
        method: 'delete',
    })
}
