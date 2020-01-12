import fetch from '@/utils/fetch'

export function getPropertyTemplate(query) {
  return fetch({
    url: '/api/service/re/property',
    method: 'get',
    params: { query }
  })
}

export function createDeployment(name, data) {
  return fetch({
    url: `/api/service/deployment/${name}`,
    method: 'post',
    data: data
  })
}
