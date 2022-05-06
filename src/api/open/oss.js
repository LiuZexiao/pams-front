import requestForm from '../utils/requestForm'

/**
 * 上传文件
 * @param data
 * @returns {*}
 */
export function upload(data) {
    return requestForm({
        url: '/open/oss/upload',
        method: 'post',
        data
    })
}