import request from '@/utils/fetch'

export function login(username, password) {
  return request({
    url: '/api/auth/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/api/auth/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/api/auth/jwt/invalid',
    method: 'post'
  })
}
