import request from '_u/request'
//用户-接口 

//用户登录 
export function postUserLogin(options) { 
  return request({ 
    url: `/user/login`, 
    method: 'post', 
    data:options.data, 
  })
}

//分页查询用户 
export function getUserPage(options) { 
  return request({ 
    url: `/user/page`, 
    method: 'get', 
    params:options.params, 
  })
}

//通过token获取信息 
export function getUserToken(options) { 
  return request({ 
    url: `/user/token`, 
    method: 'get', 
  })
}
