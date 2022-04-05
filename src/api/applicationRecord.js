import request from "../utils/request";
import requestFile from '../utils/requestFile'
import requestForm from '../utils/requestForm'

/**
 * 获取申请记录信息（多条件+分页）
 * @param data
 * @returns {AxiosPromise}
 */
export function fetchPageData(data){
    return request({
        url: '/application/record/page',
        method: 'POST',
        data,
    })
}

/**
 * 审核
 * @param params {{id: Number, status: String}}
 * @returns {AxiosPromise}
 */
export function audit(params){
    return request({
        url: '/application/record/' + params.id + '/audit',
        method: 'POST',
        params
    })
}

