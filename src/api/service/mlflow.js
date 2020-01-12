import fetch from '@/utils/fetch'

export function getPropertyTemplate(query) {
  return fetch({
    url: '/api/service/re/property',
    method: 'get',
    params: { query }
  })
}

export function createMLExperiment(experimentName, data) {
  return fetch({
    url: `/api/mlflow/experiments/${experimentName}`,
    method: 'post',
    data: data
  })
}

export function createMLRun(data) {
  return fetch({
    url: `/api/mlflow/experiments/${data.registerName}/${data.version}/runs/${data.name}`,
    method: 'post',
    data: data
  })
}

export function getMLRunList(data) {
  return fetch({
    url: `/api/mlflow/runs/list`,
    method: 'get',
    params: data
  })
}

export function refreshMLRunList(data) {
  return fetch({
    url: `/api/mlflow/runs/refresh`,
    method: 'get',
    params: data
  })
}
