import request from '../../utils/request'
import requestForm from "../../utils/requestForm";

//获取个人信息
export function currentUserInfo(){
    return request({
        url: '/owner/user/info',
        method: 'get',
    })
}

//修改个人信息
export function modifyUserInfo(data) {
    return request({
        url: '/owner/user/info',
        method: 'put',
        data
    })
}

/**
 * 联系人、介绍人申请记录
 * @param data
 * @returns {AxiosPromise}
 */
export function applyRecord(status) {
    return request({
        url: '/owner/user/info/apply/record?status=' + status,
        method: 'get',
    })
}

/**
 * 取消申请
 * @param id
 * @returns {AxiosPromise}
 */
export function removeApplyRecord(id) {
    return request({
        url: '/owner/user/info/apply/record/' + id,
        method: 'delete',
    })
}

/**
 * 申请联系人或介绍人
 * @param targetId
 * @param type
 * @returns {AxiosPromise}
 */
export function addApplyRecord(targetId, type) {
    return request({
        url: '/owner/user/info/apply/' + targetId,
        method: 'put',
    })
}

export const ApplicationType = [
    {lable: "第一培养联系人", type: "FIRST_CONTACT"},
    {lable: "第二培养联系人", type: "SECOND_CONTACT"},
    {lable: "第一入党介绍人", type: "FIRST_INTRODUCER"},
    {lable: "第二入党介绍人", type: "SECOND_INTRODUCER"},
]


