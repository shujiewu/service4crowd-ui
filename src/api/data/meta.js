import fetch from '@/utils/fetch'

export function createMeta(data) {
  return fetch({
    url: '/api/data/meta/create',
    method: 'post',
    data: data
  })
}

export function getMeta(data) {
  return fetch({
    url: '/api/data/getMeta',
    method: 'get'
  })
}

export function getMetaPage(data) {
  return fetch({
    url: '/api/data/getMetaPage',
    method: 'get',
    params: { page: data.page, limit: data.limit }
  })
}

export function getData(dataId) {
  return fetch({
    url: '/api/data/getData/',
    method: 'post',
    data: dataId
  })
}

export function deleteMeta(metaId) {
  return fetch({
    url: '/api/data/deleteMeta?metaId=' + metaId,
    method: 'get'
  })
}

export function deleteData(metaId, dataId) {
  return fetch({
    url: '/api/data/deleteData?metaId=' + metaId + '&dataId=' + dataId,
    method: 'get'
  })
}

export function validateMetaName(data) {
  return fetch({
    url: '/api/data/validateMetaName?metaName=' + data,
    method: 'get'
  })
}

export function createApp(data) {
  return fetch({
    url: '/api/workflows/rest/models',
    method: 'post',
    data: data
  })
}

export function readFile(dataId) {
  return fetch({
    url: '/api/data/getFile/' + dataId,
    method: 'get'
  })
}



