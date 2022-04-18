import request from '../utils/request'

/**
 * 获取树形的部门数据
 * @param userId
 */
export function fetchUserRoles(userId) {
    return request({
        url: '/user/role?userId=' + userId,
        method: 'get',
    })
}

/**
 * 保存
 * @param data
 */
export function save(data) {
    return request({
        url: '/user/role',
        method: 'put',
        data,
    })
}

/**
 * 删除
 * @param data
 */
export function remove(data) {
    return request({
        url: '/user/role',
        method: 'delete',
        data
    })
}
