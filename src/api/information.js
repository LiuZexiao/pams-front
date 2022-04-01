import request from '../utils/request'

export function informationManage(data) {
    return request({
        url: '/information/page',
        method: 'post',
        data,
    })
}