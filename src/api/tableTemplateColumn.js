import request from '../utils/request'

/**
 * 删除模板列
 * @param id
 * @returns {AxiosPromise}
 */
export function remove(id) {
    return request({
        url: '/table/template/column/' + id,
        method: 'delete',
    })
}

export const defaultTemplateColumns = {
    "id": null,
    "key": null,
    "name": null,
    "sort": null,
    "tableId": null,
}