import fetch from '@/utils/fetch'

export function getServiceList(query) {
  return fetch({
    url: `/api/service/registration`,
    method: 'get',
    params: query
  })
}

export function createService(data) {
  return fetch({
    url: `/api/service/registration/${data.type}/${data.name}`,
    method: 'post',
    data: data
  })
}

export function deleteService(data) {
  return fetch({
    url: `/api/service/registration/${data.type}/${data.name}/${data.version}`,
    method: 'delete'
  })
}

export function setDefaultVersion(data) {
  return fetch({
    url: `/api/service/registration/defaultVersion/${data.type}/${data.name}/${data.version}`,
    method: 'get'
  })
}

export function getProperty(data) {
  return fetch({
    url: `/api/service/configuration/${data.type}/${data.name}/${data.version}`,
    method: 'get'
  })
}
