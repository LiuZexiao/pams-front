import request from '../../utils/request'

// 暴露出我们的接口请求,export导出
export function logins(data) {
    return request({
        url: '/open/user/login',
        method: 'post',
        data,
    })
}