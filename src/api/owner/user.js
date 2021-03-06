import request from '../../utils/request'
import requestForm from "../../utils/requestForm";

//修改密码
export function modifyPassword(data) {
    return request({
        url: '/owner/modify/password',
        method: 'put',
        data
    })
}

//绑定手机号码
export function bindPhone(params) {
    return request({
        url: '/owner/user/bind/phone',
        method: 'put',
        params
    })
}

//绑定邮箱
export function bindEmail(params) {
    return request({
        url: '/owner/user/bind/email',
        method: 'put',
        params
    })
}

/**
 * 保存用户账号信息
 * @param data
 * @returns {AxiosPromise}
 */
export function save(data) {
    return request({
        url: '/owner/user',
        method: 'put',
        data
    })
}

/**
 * 根据类型获取用户权限 API 或 ROUTE
 * @param type
 * @returns {AxiosPromise}
 */
export function userPermits(type) {
    return request({
        url: '/owner/user/permits',
        method: 'get',
        params: {
            type
        }
    })
}

/**
 * 获取用户角色
 * @returns {AxiosPromise}
 */
export function userRoles() {
    return request({
        url: '/owner/user/roles',
        method: 'get',
    })
}


// modifyUser
export const modifyUser = {
    "age": "18", // 年龄
    "birthday": "1999-01-28", //出生日期
    "clazz": "20计科",  //班级
    "computerLevel": "TWO", // 计算机水平 	可用值:ONE,TWO,THREE,FOUR,OTHER
    "email": "123456@qq.com", // 邮箱
    "englishLevel": "CET_4", // 英语水平 可用值:CET_4,CET_6,CET_46,OTHER
    "gender": "MALE", //性别 	可用值:MALE,FEMALE,OTHER
    "hometown": "湖南", // 籍贯
    "mobilePhone": "13935100000", // 手机号
    "qq": "123456", // qq
    "realName": "刘xx", // 真实姓名
    "wx": "luke01", // 微信号
}