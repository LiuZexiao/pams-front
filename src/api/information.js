import request from '../utils/request'

export function fetchByPage(data) {
    return request({
        url: '/information/page',
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
        url: '/information',
        method: 'post',
        data,
    })
}

/**
 * 修改信息
 * @param data
 */
export function modify(data) {
    return request({
        url: '/information',
        method: 'put',
        data,
    })
}

/**
 * 删除信息
 * @param id
 */
export function remove(id) {
    return request({
        url: '/information/' + id,
        method: 'delete',
    })
}

/**
 * 爬虫 中国共产党新闻网--人民网 的新闻
 * @returns {AxiosPromise}
 */
export function reptile() {
    return request({
        url: '/information/reptile',
        method: 'get',
    })
}