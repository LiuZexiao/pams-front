import request from "../utils/request";
import requestFile from '../utils/requestFile'
import requestForm from '../utils/requestForm'

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

/**
 * 删除用户信息
 * @param id
 */
export function remove(id) {
    return request({
        url: '/user/info/' + id,
        method: 'delete',
    })
}

/**
 * 根据模板导出用户数据
 * @param templateId
 * @returns {AxiosPromise}
 */
export function userInfoExport(params) {
    return requestFile({
        url: '/user/info/export/' + params.templateId,
        method: 'get',
        params
    })
}

/**
 * 根据模板导入
 * @param templateId
 * @returns {string}
 */
export function userInfoImport(data, templateId) {
    return requestForm({
        url: '/user/info/import/' + templateId,
        method: 'post',
        data
    })
}

/**
 *  AI评估思想状态
 * @param userInfoId
 * @returns {AxiosPromise}
 */
export function evaluate(userInfoId) {
    return requestForm({
        url: '/user/info/' + userInfoId + '/evaluate',
        method: 'get',
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

export const userInfoKey = [
    { key: "job", value: "职务"},
    { key: "realName", value: "姓名"},
    { key: "college", value: "学院"},
    { key: "clazz", value: "班级"},
    { key: "number", value: "学号"},
    { key: "gender", value: "性别"},
    { key: "age", value: "年龄"},
    { key: "hometown", value: "籍贯"},
    { key: "birthday", value: "出生日期"},
    { key: "idNumber", value: "身份证号"},
    { key: "englishLevel", value: "英语水平"},
    { key: "computerLevel", value: "计算机水平"},
    { key: "applyDate", value: "入党申请日期"},
    { key: "qq", value: "QQ"},
    { key: "wx", value: "微信"},
    { key: "mobilePhone", value: "手机号"},
    { key: "email", value: "邮箱"},
    { key: "primaryQualifyingDate", value: "初级党课合格日期"},
    { key: "recommendedActivistsDate", value: "推优积极分子日期"},
    { key: "beActivistDate", value: "成为积极分子日期"},
    { key: "intermediateQualifyingDate", value: "中级党课合格日期"},
    { key: "recommendedDevTargetDate", value: "推优发展对象日期"},
    { key: "beDevTargetDate", value: "成为发展对象日期"},
    { key: "joinedDate", value: "入党日期"},
    { key: "correctionDate", value: "转正日期"},
    { key: "state", value: "信息状态"},
    { key: "remark", value: "备注"},
]