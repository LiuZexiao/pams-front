import request from '../utils/request'
import requestForm from "../../utils/requestForm";

//修改个人信息
export function modifyUserInfo(data) {
    return request({
        url: '/owner/user/info',
        method: 'post',
        data
    })
}

//获取个人信息
export function myInfor(){
    return request({
        url: '/owner/user/info',
        method: 'get',
    })
}