import fetch from '@/utils/fetch'

export function fetchList(query) {
  return fetch({
    url: '/api/data/getTruthInference',
    method: 'get',
    params: query
  })
}
