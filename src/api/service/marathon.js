import fetch from '@/utils/fetch'

export function getServiceInstanceList(data) {
  return fetch({
    url: `/api/service/deployment`,
    method: 'get',
    params: data
  })
}

export function refreshServiceInstanceList(data) {
  return fetch({
    url: `/api/mlflow/runs/refresh`,
    method: 'get',
    params: data
  })
}
