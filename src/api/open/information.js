import request from '../../utils/request'

/**
 * 爬虫 中国共产党新闻网--人民网 的新闻
 * @returns {*}
 */
export function reptile() {
    return request({
        url: 'open/information/reptile',
        method: 'get',
    })
}