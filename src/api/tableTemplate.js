import request from '../utils/request'
import requestFile from '../utils/requestFile'


/**
 * 获取模板数据
 * @param data
 * @returns {AxiosPromise}
 */
export function fetchList() {
    return request({
        url: '/table/template',
        method: 'get',
    })
}

/**
 * 获取模板数据(分页+多条件)
 * @param data
 * @returns {AxiosPromise}
 */
export function fetchListByPage(data) {
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
    return requestFile({
        url: '/table/template/' + id + "/download",
        method: 'get',
    })
}

export const defaultTemplate = {
    "columns": [],
    "deleted": null,
    "department": {
        "id": null,
        "level": null,
        "name": null,
        "parentId": null
    },
    "id": null,
    "name": null
}
