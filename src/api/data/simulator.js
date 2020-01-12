import fetch from '@/utils/fetch'

export function createSimData(data) {
  return fetch({
    url: '/api/data/createSimData',
    method: 'post',
    data: data
  })
}
export function deleteAnswerData(answerId) {
  return fetch({
    url: '/api/data/deleteAnswerData',
    method: 'get',
    params: { answerId: answerId }
  })
}
export function getSimPage(data) {
  return fetch({
    url: '/api/data/getSimPage',
    method: 'get',
    params: { page: data.page, limit: data.limit }
  })
}

export function getSimReport(data) {
  return fetch({
    url: '/api/simulator/getSimReport/' + data,
    method: 'get'
  })
}
