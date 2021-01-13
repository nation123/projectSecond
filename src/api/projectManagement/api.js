import request from '_u/request'
//通用Api(系统子平台)-接口 

//查询平台列表 
export function getApiPlatformSystemList(options) { 
  return request({ 
    url: `/api/platformSystem/list`, 
    method: 'get', 
  })
}

//登录 
export function postApiUserLogin(options) { 
  return request({ 
    url: `/api/user/login`, 
    method: 'post', 
    data:options.data, 
  })
}

//退出登录 
export function postApiUserLogout(options) { 
  return request({ 
    url: `/api/user/logout`, 
    method: 'post', 
  })
}

//通过token获取用户的信息 
export function getApiUserToken(options) { 
  return request({ 
    url: `/api/user/token`, 
    method: 'get', 
  })
}
