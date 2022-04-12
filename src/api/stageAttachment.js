import request from "../utils/request";

/**
 * 删除阶段附件
 * @param id
 * @returns {AxiosPromise}
 */
export function remove(id){
    return request({
        url: '/stage/attachment/' + id,
        method: 'DELETE',
    })
}
