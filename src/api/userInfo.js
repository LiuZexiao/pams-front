
import request from "../utils/request";

/**
 * 查询用户信息（分页+多条件）
 * @param data
 * @returns {AxiosPromise}
 */
export function userInfo(data) {
    return request({
        url: '/user/info/page',
        method: 'post',
        data,
    })
}

/**
 * 修改信息
 * @param data
 * @param departmentId 不传的话，默认为当前用户的部门ID
 */
export function add(data, departmentId) {
    return request({
        url: '/user/info',
        method: 'put',
        data,
        params: {
            departmentId
        }
    })
}

/**
 * 修改信息
 * @param data
 * @param id
 */
export function modify(data, id) {
    return request({
        url: '/user/info/' + id,
        method: 'put',
        data,
    })
}

