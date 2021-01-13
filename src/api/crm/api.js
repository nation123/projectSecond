import request from '_u/request'
//音频文件(app)-接口 

//查询音频文件 
export function getApiMediaList(options) { 
  return request({ 
    url: `/api/media/list`, 
    method: 'get', 
  })
}

//会员登录 
export function postApiMemberLogin(options) { 
  return request({ 
    url: `/api/member/login`, 
    method: 'post', 
    data:options.data, 
  })
}

//根据token查会员 
export function getApiMemberToken(options) { 
  return request({ 
    url: `/api/member/token/${options.token}`, 
    method: 'get', 
  })
}

//创建一个会员消费记录 
export function postApiMember_cost_record(options) { 
  return request({ 
    url: `/api/member_cost_record`, 
    method: 'post', 
    data:options.data, 
  })
}

//查询最近一次消费记录 
export function getApiMember_cost_recordLast(options) { 
  return request({ 
    url: `/api/member_cost_record/last/${options.memberId}`, 
    method: 'get', 
  })
}

//分页查询 
export function getApiMember_cost_recordPage(options) { 
  return request({ 
    url: `/api/member_cost_record/page/${options.memberId}`, 
    method: 'get', 
    params:options.params, 
  })
}

//分页查询会员充值记录 
export function getApiMember_recharge_recordPage(options) { 
  return request({ 
    url: `/api/member_recharge_record/page/${options.memberId}`, 
    method: 'get', 
    params:options.params, 
  })
}

//查询某个最新的通知消息 
export function getApiNoticeNew(options) { 
  return request({ 
    url: `/api/notice/new`, 
    method: 'get', 
  })
}

//分页查询通知消息 
export function postApiNoticePage(options) { 
  return request({ 
    url: `/api/notice/page`, 
    method: 'post', 
    params:options.params, 
    data:options.data, 
  })
}
