import request from '../utils/request'

export function fetchByPage(data) {
    return request({
        url: '/user/page',
        method: 'post',
        data,
    })
}

/**
 * 新增
 * @param data
 */
export function add(data) {
    return request({
        url: '/user',
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
        url: '/user',
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
        url: '/user/' + id,
        method: 'delete',
    })
}
