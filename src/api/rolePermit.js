import request from '../utils/request'

/**
 * 获取树形的部门数据
 * @param roleId
 */
export function fetchRolePermits(roleId) {
    return request({
        url: '/role/permit?roleId=' + roleId,
        method: 'get',
    })
}

/**
 * 保存
 * @param data
 */
export function save(data) {
    return request({
        url: '/role/permit',
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
        url: '/role/permit/' + id,
        method: 'delete',
    })
}
