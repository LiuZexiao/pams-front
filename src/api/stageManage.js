import request from '../utils/request'

//查询所有的入党阶段信息（分页+多条件，特别是审核状态）
export function stageInfoAll(data) {
    return request({
        url: '/user/info/stage/page',
        method: 'post',
        data,
    })
}
