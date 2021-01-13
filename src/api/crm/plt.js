import request from '_u/request'
//音频文件-接口 

//创建一个 
export function postPltMedia(options) { 
  return request({ 
    url: `/plt/media`, 
    method: 'post', 
    data:options.data, 
  })
}

//分页查询 
export function getPltMediaPage(options) { 
  return request({ 
    url: `/plt/media/page`, 
    method: 'get', 
    params:options.params, 
  })
}

//查询某个 
export function getPltMedia(options) { 
  return request({ 
    url: `/plt/media/${options.id}`, 
    method: 'get', 
  })
}

//删除某个 
export function deletePltMedia(options) { 
  return request({ 
    url: `/plt/media/${options.id}`, 
    method: 'delete', 
  })
}

//更新某个 
export function patchPltMedia(options) { 
  return request({ 
    url: `/plt/media/${options.id}`, 
    method: 'patch', 
    data:options.data, 
  })
}

//分页查询 
export function getPltMember_cost_recordPage(options) { 
  return request({ 
    url: `/plt/member_cost_record/page`, 
    method: 'get', 
    params:options.params, 
  })
}

//查询某个 
export function getPltMember_cost_record(options) { 
  return request({ 
    url: `/plt/member_cost_record/${options.id}`, 
    method: 'get', 
  })
}

//删除某个 
export function deletePltMember_cost_record(options) { 
  return request({ 
    url: `/plt/member_cost_record/${options.id}`, 
    method: 'delete', 
  })
}

//更新某个 
export function patchPltMember_cost_record(options) { 
  return request({ 
    url: `/plt/member_cost_record/${options.id}`, 
    method: 'patch', 
    data:options.data, 
  })
}

//创建一个会员充值记录 
export function postPltMember_recharge_record(options) { 
  return request({ 
    url: `/plt/member_recharge_record`, 
    method: 'post', 
    data:options.data, 
  })
}

//导出会员充值记录 
export function getPltMember_recharge_recordExport(options) { 
  return request({ 
    url: `/plt/member_recharge_record/export`, 
    method: 'get', 
    params:options.params, 
  })
}

//分页查询会员充值记录(按时间查询) 
export function getPltMember_recharge_recordPage(options) { 
  return request({ 
    url: `/plt/member_recharge_record/page`, 
    method: 'get', 
    params:options.params, 
  })
}

//查询某个会员充值记录 
export function getPltMember_recharge_record(options) { 
  return request({ 
    url: `/plt/member_recharge_record/${options.id}`, 
    method: 'get', 
  })
}

//删除某个会员充值记录 
export function deletePltMember_recharge_record(options) { 
  return request({ 
    url: `/plt/member_recharge_record/${options.id}`, 
    method: 'delete', 
  })
}

//更新某个会员充值记录 
export function patchPltMember_recharge_record(options) { 
  return request({ 
    url: `/plt/member_recharge_record/${options.id}`, 
    method: 'patch', 
    data:options.data, 
  })
}

//创建一个通知消息 
export function postPltNotice(options) { 
  return request({ 
    url: `/plt/notice`, 
    method: 'post', 
    data:options.data, 
  })
}

//分页查询通知消息 
export function getPltNoticePage(options) { 
  return request({ 
    url: `/plt/notice/page`, 
    method: 'get', 
    params:options.params, 
  })
}

//查询某个通知消息 
export function getPltNotice(options) { 
  return request({ 
    url: `/plt/notice/${options.id}`, 
    method: 'get', 
  })
}

//删除某个通知消息 
export function deletePltNotice(options) { 
  return request({ 
    url: `/plt/notice/${options.id}`, 
    method: 'delete', 
  })
}

//更新某个通知消息 
export function patchPltNotice(options) { 
  return request({ 
    url: `/plt/notice/${options.id}`, 
    method: 'patch', 
    data:options.data, 
  })
}
