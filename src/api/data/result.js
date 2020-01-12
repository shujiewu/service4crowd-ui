import fetch from '@/utils/fetch'


export function getMergeResult(id) {
  return fetch({
    url: '/api/data/getMergeResult/' + id,
    method: 'get'
  })
}
export function getDataStat(id) {
  return fetch({
    url: '/api/data/getDataStat/' + id,
    method: 'get'
  })
}
export function getCrowdTask(data1, data2) {
  return fetch({
    url: '/api/data/getCrowdTask',
    method: 'get',
    params: { processInstanceId: data1, activityId: data2 }
  })
}




export function getCustomResult(serviceName, id) {
  return fetch({
    url: '/api/data/getCustomResult/' + serviceName + '/' + id,
    method: 'get'
  })
}


// 开始更新
export function getCrowdTaskByProcessInstanceId(processInstanceId) {
  return fetch({
    url: '/api/data/crowdTask/' + processInstanceId,
    method: 'get'
  })
}
export function getMachineJobByProcessInstanceId(processInstanceId) {
  return fetch({
    url: '/api/data/machineTask/' + processInstanceId,
    method: 'get'
    // params: { processInstanceId: processInstanceId }
  })
}
export function getCrowdTaskByUser() {
  return fetch({
    url: '/api/data/crowdTask/list',
    method: 'get'
  })
}

