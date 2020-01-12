import fetch from '@/utils/fetch'

export function fetchList(query) {
  return fetch({
    url: '/api/data/getService',
    method: 'get',
    params: query
  })
}

export function deleteService(id) {
  return fetch({
    url: '/api/data/deleteService/' + id,
    method: 'get'
  })
}
