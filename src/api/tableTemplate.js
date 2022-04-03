import request from '../utils/request'

/**
 * 获取模板数据
 * @param data
 * @returns {AxiosPromise}
 */
export function fetchList(data) {
    return request({
        url: '/table/template/page',
        method: 'post',
        data
    })
}

/**
 * 新增模板
 * @param data
 * @returns {AxiosPromise}
 */
export function add(data) {
    return request({
        url: '/table/template',
        method: 'post',
        data
    })
}

/**
 * 修改模板
 * @param data
 * @returns {AxiosPromise}
 */
export function modify(data) {
    return request({
        url: '/table/template',
        method: 'put',
        data
    })
}

/**
 * 删除模板
 * @param id
 * @returns {AxiosPromise}
 */
export function remove(id) {
    return request({
        url: '/table/template/' + id,
        method: 'delete',
    })
}

/**
 * 下载空模板
 * @param id
 * @returns {AxiosPromise}
 */
export function download(id) {
    return request({
        url: '/table/template/' + id + "/download",
        method: 'get',
    })
}
