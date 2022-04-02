
import request from "../utils/request";

// 查询用户信息（分页+多条件）
export function userInfo(data) {
    return request({
        url: '/user/info/page',
        method: 'post',
        data,
    })
}