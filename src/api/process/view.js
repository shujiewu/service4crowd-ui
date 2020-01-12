import fetch from '@/utils/fetch'

export function viewProcess(processModelId) {
  return fetch({
    url: '/api/workflows/rest/models/' + processModelId + '/model-json',
    method: 'get'
  })
}
export function viewRuntimeProcess(processInstanceId) {
  return fetch({
    url: '/api/workflow/processInstance/history/' + processInstanceId + '/modelJson',
    method: 'get'
  })
}

export function getProcessInfo(processInstanceId) {
  return fetch({
    url: '/api/workflow/processInstance/' + processInstanceId + '/info',
    method: 'get'
  })
}

export function processComplete(processInstanceId) {
  return fetch({
    url: '/api/workflow/processInstance/' + processInstanceId + '/complete',
    method: 'get'
  })
}
