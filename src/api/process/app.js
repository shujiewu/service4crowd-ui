import fetch from '@/utils/fetch'

export function page(query) {
  return fetch({
    url: '/api/admin/user/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return fetch({
    url: '/api/admin/user',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return fetch({
    url: '/api/admin/user/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return fetch({
    url: '/api/admin/user/' + id,
    method: 'delete'
  })
}

export function putObj(id, obj) {
  return fetch({
    url: '/api/admin/user/' + id,
    method: 'put',
    data: obj
  })
}

export function editModel(data) {
  return fetch({
    url: '/api/workflow/model/edit',
    method: 'get',
    params: { data }
  })
}

export function fetchArticle() {
  return fetch({
    url: '/api/article/detail',
    method: 'get'
  })
}

export function fetchPv(pv) {
  return fetch({
    url: '/api/article/pv',
    method: 'get',
    params: { pv }
  })
}

// export function createModel(data) {
//   return fetch({
//     url: '/api/workflow/model/create',
//     method: 'get',
//     params: data
//   })
// }

export function createModel(data) {
  return fetch({
    url: '/api/workflows/rest/models',
    method: 'post',
    data: data
  })
}

export function deleteModel(data) {
  return fetch({
    url: '/api/workflow/model/delete/' + data,
    method: 'get'
  })
}


export function updateArticle(data) {
  return fetch({
    url: '/api/article/update',
    method: 'post',
    data
  })
}

export function fetchProcess(data) {
  return fetch({
    url: '/api/workflow/process',
    method: 'get'
  })
}

export function readResource(data) {
  return fetch({
    url: '/api/workflows/rest/models/' + data.id + '/thumbnail?version=' + data.imageVersion,
    method: 'get',
    params: data
    // headers: {
    //   Accept: '*/*'
    // }
  })
}

export function deleteDeploy(data) {
  return fetch({
    url: '/api/workflow/deldeploy',
    method: 'get',
    params: { deploymentId: data }
  })
}

export function startProcess(data) {
  return fetch({
    url: '/api/workflow/start',
    method: 'get',
    params: { processDefinitionId: data }
  })
}

export function fetchRunProcess(listQuery) {
  return fetch({
    url: '/api/workflow/running',
    method: 'get'
  })
}
export function fetchList(query) {
  return fetch({
    url: '/api/workflows/rest/app/list',
    method: 'get',
    params: query
  })
}

export function deployModel(query) {
  return fetch({
    url: '/api/workflows/rest/app/' + query + '/publish',
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

