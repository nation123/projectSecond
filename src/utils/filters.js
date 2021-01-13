// 全局过滤器
let froTime = timestamp => {
  let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let Y = date.getFullYear() + '-';
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  let D = date.getDate() + ' ';
  let h = date.getHours() + ':';
  let m = date.getMinutes() + ':';
  let s = date.getSeconds();
  return Y + M + D + h + m + s;
}
let formatSe = time => {
  // 去掉标准时间的秒，如2020-04-01 :12:00:00变成2020-04-01 :12:00
  time = String(time)
  let newTime = time.substring(0, 16)
  return newTime
}
let formatDay = time => {
  // 去掉标准时间的时分秒，如2020-04-01 :12:00:00变成2020-04-01
  time = String(time)
  let newTime = time.substring(0, 10)
  return newTime
}
let formatPhaseState = state => {
  const phaseStatus = {
    0: '未申请',
    1: '审核中',
    2: '已通过',
    3: '未通过',
  }
  return phaseStatus[state] || '未知状态'
}
export {
  froTime,
  formatSe,
  formatDay,
  formatPhaseState,
}
