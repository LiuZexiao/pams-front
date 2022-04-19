import request from '../../utils/request'

export function removeAttachment(id) {
    return request({
        url: '/owner/user/info/stage/attachment/' + id,
        method: 'delete',
    })
}