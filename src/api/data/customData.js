import fetch from '@/utils/fetch'
// 新的
export function getCustomDataList(data) {
  return fetch({
    url: '/api/data/customData/list',
    method: 'get',
    params: { page: data.page, limit: data.limit }
  })
}

export function getCustomDataFileList(fileId, data) {
  return fetch({
    url: '/api/data/customData/file/list',
    method: 'post',
    params: { page: data.page, limit: data.limit },
    data: fileId
  })
}

export function downloadCustomData(name) {
  return fetch({
    url: '/api/data/customData/download',
    method: 'get',
    params: { name: name }
  })
}

export function deleteCustomDataByName(name) {
  return fetch({
    url: '/api/data/customData/delete',
    method: 'get',
    params: { name: name }
  })
}

export function deleteCustomDataById(id) {
  return fetch({
    url: '/api/data/customData/delete',
    method: 'get',
    params: { name: id }
  })
}

export function uploadCustomDataById() {
  return fetch({
    url: '/api/data/customData/upload',
    method: 'post'
  })
}

export function validateCustomName(data) {
  return fetch({
    url: '/api/data/customData/exist?name=' + data,
    method: 'get'
  })
}

export function createCustomData(data, fileId) {
  return fetch({
    url: '/api/data/customData/create?name=' + data,
    method: 'post',
    data: fileId
  })
}
