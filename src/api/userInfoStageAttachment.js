import request from '../utils/request'

export function summary(id) {
    return request({
        url: '/user/info/stage/attachment/' + id + "/summary",
        method: 'get',
    })
}