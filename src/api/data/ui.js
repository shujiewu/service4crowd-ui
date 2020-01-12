import fetch from '@/utils/fetch'

export function createUI(data) {
  return fetch({
    url: '/api/data/UI/create',
    method: 'post',
    data: data
  })
}
export function updateUI(data) {
  return fetch({
    url: '/api/data/UI/update',
    method: 'post',
    data: data
  })
}
export function deleteUI(uiId) {
  return fetch({
    url: '/api/data/UI/' + uiId,
    method: 'delete'
  })
}

export function fetchUIList() {
  return fetch({
    url: '/api/data/UI/list',
    method: 'get'
  })
}

export function fetchUI(uiId) {
  return fetch({
    url: '/api/data/UI/' + uiId,
    method: 'get'
  })
}
