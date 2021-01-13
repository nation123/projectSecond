import request from '_u/request'
//项目-接口 

//新建一个项目 
export function postProject(options) {
  return request({
    url: `/project`,
    method: 'post',
    params: options.params,
    data: options.data,
  })
}

//统计数量（按进度划分） 
export function getProjectCountStatus(options) {
  return request({
    url: `/project/count/status`,
    method: 'get',
  })
}

//统计数量（按项目子类型划分） 
export function getProjectCountSubtype(options) {
  return request({
    url: `/project/count/subtype`,
    method: 'get',
  })
}

//统计数量（按月度划分） 
export function getProjectCountYear_month(options) {
  return request({
    url: `/project/count/year_month`,
    method: 'get',
    params: options.params,
  })
}

//项目库列表 
export function postProjectList(options) {
  return request({
    url: `/project/list`,
    method: 'post',
    params: options.params,
    data: options.data,
  })
}

//项目申报列表 
export function getProjectListApply(options) {
  return request({
    url: `/project/list/apply`,
    method: 'get',
    params: options.params,
  })
}

//我的项目申报列表 
export function getProjectListApplyMy(options) {
  return request({
    url: `/project/list/apply/my`,
    method: 'get',
    params: options.params,
  })
}

//项目实施列表 
export function getProjectListContinue(options) {
  return request({
    url: `/project/list/continue`,
    method: 'get',
    params: options.params,
  })
}

//我的项目实施列表 
export function getProjectListContinueMy(options) {
  return request({
    url: `/project/list/continue/my`,
    method: 'get',
    params: options.params,
  })
}

//首页最新产教融合项目列表 
export function getProjectListHomeNew(options) {
  return request({
    url: `/project/list/home/new`,
    method: 'get',
    params: options.params,
  })
}

//首页项目立项申报公告列表 
export function getProjectListHomeNotice(options) {
  return request({
    url: `/project/list/home/notice`,
    method: 'get',
    params: options.params,
  })
}

//我的已结束项目列表 
export function getProjectListOverMy(options) {
  return request({
    url: `/project/list/over/my`,
    method: 'get',
    params: options.params,
  })
}

//项目列表（供企业培育使用） 
export function getProjectListSimple(options) {
  return request({
    url: `/project/list/simple`,
    method: 'get',
    params: options.params,
  })
}

//查询某个项目 
export function getProject(options) {
  return request({
    url: `/project/${options.id}`,
    method: 'get',
  })
}
//查询某个项目详情(数据脱敏)  
export function getProjectDesensitization(options) {
  return request({
    url: `/project/desensitization/${options.id}`,
    method: 'get',
  })
}
//删除某个项目 
export function deleteProject(options) {
  return request({
    url: `/project/${options.id}`,
    method: 'delete',
  })
}

//更新某个项目 
export function patchProject(options) {
  return request({
    url: `/project/${options.id}`,
    method: 'patch',
    params: options.params,
    data: options.data,
  })
}

//提交申请（目前未使用，暂时保留） 
export function patchProjectApply(options) {
  return request({
    url: `/project/${options.id}/apply`,
    method: 'patch',
  })
}
