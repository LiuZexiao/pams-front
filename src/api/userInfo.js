import request from "../utils/request";

/**
 * 获取个人信息
 * @returns {AxiosPromise}
 */
export function userInfo(){
    return request({
        url: '/owner/user/info',
        method: 'get',
    })
}

/**
 * 查询用户信息（分页+多条件）
 * @param data
 * @returns {AxiosPromise}
 */
export function fetchData(data) {
    return request({
        url: '/user/info/page',
        method: 'post',
        data,
    })
}

/**
 * 新增
 * @param data
 * @param departmentId 不传的话，默认为当前用户的部门ID
 */
export function add(data, departmentId) {
    return request({
        url: '/user/info',
        method: 'post',
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



// userInfo
export const defaultUserInfo = {
    "age": null,
    "applyDate": null,
    "beActivistDate": null,
    "beDevTargetDate": null,
    "birthday": null,
    "clazz": null,
    "college": null,
    "computerLevel": null,
    "correctionDate": null,
    "devTargetTrainedDate": null,
    "education": null,
    "email": null,
    "englishLevel": null,
    "gender": null,
    "hometown": null,
    "id": null,
    "idNumber": null,
    "intermediateQualifyingDate": null,
    "job": null,
    "joinedDate": null,
    "mobilePhone": null,
    "number": null,
    "primaryQualifyingDate": null,
    "qq": null,
    "realName": null,
    "recommendedActivistsDate": null,
    "recommendedDevTargetDate": null,
    "remark": null,
    "state": null,
    "userId": null,
    "wx": null
}