import request from '../utils/request'

export function emailVerCode(email) {
    return request({
        url: '/open/message/email/verCode',
        method: 'get',
        params: {
            email
        },
    })
}

export function smsVerCode(phone) {
    return request({
        url: '/open/message/sms/verCode',
        method: 'get',
        params: {
            phone
        }
    })
}
