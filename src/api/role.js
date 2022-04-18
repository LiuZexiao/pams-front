import request from '../utils/request'

/**
 * 获取树形的部门数据
 * @param data
 * @returns {AxiosPromise}
 */
export function tree() {
    return request({
        url: '/role/tree',
        method: 'get',
    })
}

/**
 * 新增
 * @param data
 */
export function add(data) {
    return request({
        url: '/role',
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
        url: '/role',
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
        url: '/role/' + id,
        method: 'delete',
    })
}
