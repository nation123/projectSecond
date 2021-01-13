import request from '_u/request'
//市场资源(管理后台)-接口 

//创建一个市场资源 
export function postMarket_resource(options) { 
  return request({ 
    url: `/market_resource`, 
    method: 'post', 
    data:options.data, 
  })
}

//分页查询市场资源 
export function getMarket_resourcePage(options) { 
  return request({ 
    url: `/market_resource/page`, 
    method: 'get', 
    params:options.params, 
  })
}

//删除某个市场资源 
export function deleteMarket_resource(options) { 
  return request({ 
    url: `/market_resource/${options.id}`, 
    method: 'delete', 
  })
}

//更新某个市场资源 
export function patchMarket_resource(options) { 
  return request({ 
    url: `/market_resource/${options.id}`, 
    method: 'patch', 
    data:options.data, 
  })
}
