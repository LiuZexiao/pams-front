import request from "../utils/request";

/**
 * 获取入党阶段（树形）
 * @returns {AxiosPromise}
 */
export function fetchTree(){
    return request({
        url: '/stage',
        method: 'GET',
    })
}

/**
 * 添加、修改阶段
 * @param data
 * @returns {AxiosPromise}
 */
export function save(data){
    return request({
        url: '/stage',
        method: 'POST',
        data,
    })
}

/**
 * 删除阶段
 * @param id
 * @returns {AxiosPromise}
 */
export function remove(id){
    return request({
        url: '/stage/' + id,
        method: 'DELETE',
    })
}
