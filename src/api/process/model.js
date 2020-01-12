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

export function deleteDeploy(data) {
  return fetch({
    url: '/api/workflow/deldeploy',
    method: 'get',
    params: { deploymentId: data }
  })
}

// export function startProcess(data) {
//   return fetch({
//     url: '/api/workflow/start',
//     method: 'get',
//     params: { processDefinitionId: data }
//   })
// }

export function fetchRunProcess(listQuery) {
  return fetch({
    url: '/api/workflow/running',
    method: 'get'
  })
}
export function fetchTemplateList(query) {
  return fetch({
    url: '/api/workflows/rest/templates',
    method: 'get',
    params: query
  })
}

export function templateToModel(data) {
  return fetch({
    url: '/api/workflows/rest/templateToModel',
    method: 'get',
    params: data
  })
}



// 开始更新
export function fetchList(query) {
  return fetch({
    url: '/api/workflow/models',
    method: 'get',
    params: query
  })
}

export function deleteModel(data) {
  return fetch({
    url: '/api/workflow/models/' + data,
    method: 'delete'
  })
}

export function createModel(data) {
  return fetch({
    url: '/api/workflow/models',
    method: 'post',
    data: data
  })
}

export function publishProcess(data) {
  return fetch({
    url: '/api/workflow/models/' + data + '/publish',
    method: 'get'
  })
}

export function cloneModel(data) {
  return fetch({
    url: '/api/workflow/models/' + data.id + '/clone',
    method: 'post',
    data: data
  })
}

export function modelToTemplate(data) {
  return fetch({
    url: '/api/workflow/modelToTemplate',
    method: 'get',
    params: data
  })
}

export function readResource(data) {
  return fetch({
    url: '/api/workflow/models/' + data.id + '/thumbnail?version=' + data.imageVersion,
    method: 'get',
    params: data
  })
}

// 暂时删除
export function deployModel(data) {
  return fetch({
    url: '/api/workflows/app/deploy',
    method: 'post',
    data: data
  })
}
