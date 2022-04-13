import request from '../utils/request'

export function fetchByPage(data) {
    return request({
        url: '/event/page',
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
        url: '/event/add',
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
        url: '/event/modify',
        method: 'post',
        data,
    })
}

/**
 * 删除
 * @param id
 */
export function remove(id) {
    return request({
        url: '/event/' + id,
        method: 'delete',
    })
}
