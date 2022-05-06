import request from '../utils/request'

/**
 * 获取树形的数据
 * @param data
 * @returns {AxiosPromise}
 */
export function tree() {
    return request({
        url: '/permit/tree',
        method: 'get',
    })
}

/**
 * 新增
 * @param data
 */
export function add(data) {
    return request({
        url: '/permit',
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
        url: '/permit',
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
        url: '/permit/' + id,
        method: 'delete',
    })
}
