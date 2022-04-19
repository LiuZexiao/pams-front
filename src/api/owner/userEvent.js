import request from '../../utils/request'

export function fetchByPage(data) {
    return request({
        url: '/owner/user/info/event/page',
        method: 'post',
        data
    })
}

export function removeEvent(id) {
    return request({
        url: '/owner/user/info/event/' + id,
        method: 'put',
    })
}