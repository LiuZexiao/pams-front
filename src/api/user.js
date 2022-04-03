import request from '../utils/request'

// 暴露出我们的接口请求,export导出
export function logins(data) {
    return request({
        url: '/open/user/login',
        method: 'post',
        data,
    })
}

export function myInfor(){
    return request({
        url: '/owner/user/info',
        method: 'get',
    })
}

// 查询用户入党流程信息
export function userStage(data){
    return request({
        url: '/user/info/'+data+'/stage',
        method: 'get',
        data
    })
}