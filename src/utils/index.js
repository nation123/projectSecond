import {resourseUrl} from "./config"
import {isHttp} from "./validate"
/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
import {
  colorLists
} from "./config"
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
    .replace(/"/g, '\\"')
    .replace(/&/g, '","')
    .replace(/=/g, '":"')
    .replace(/\+/g, ' ') +
    '"}'
  )
}


export function checkFromToday(dateStr) {
  let targetDate = new Date(dateStr.replace(/-/g, "/"))
  let dateNow = new Date(); //获取当前时间
  let timeDiff = targetDate.getTime() - dateNow.getTime(); //时间差的毫秒数
  let dayDiff = Math.floor(timeDiff / (24 * 3600 * 1000)); //计算相差天数
  return dayDiff
}

export function nowInDateBetwen(d1, d2) {
  if (!d1 || !d2){ return -1 } //空值判断
  // d1开始时间，d2结束时间
  let dateTime = 1; //0未开始 1进行中 2已过期
  //如果时间格式是正确的，那下面这一步转化时间格式就可以不用了
  let dateBegin = new Date(d1.replace(/-/g, "/")); //将-转化为/，使用new Date
  let dateEnd = new Date(d2.replace(/-/g, "/")); //将-转化为/，使用new Date
  // d1 = parseInt(d1);
  // d2 = parseInt(d2);
  // let dateBegin = new Date(d1); //将-转化为/，使用new Date
  // let dateEnd = new Date(d2); //将-转化为/，使用new Date
  let dateNow = new Date(); //获取当前时间

  let beginDiff = dateNow.getTime() - dateBegin.getTime(); //时间差的毫秒数
  let beginDayDiff = Math.floor(beginDiff / (24 * 3600 * 1000)); //计算出相差天数

  let endDiff = dateEnd.getTime() - dateNow.getTime(); //时间差的毫秒数
  let endDayDiff = Math.floor(endDiff / (24 * 3600 * 1000)); //计算出相差天数
  if (endDayDiff < 0) {
    //已过期
    dateTime = 2;
    return dateTime;
  }
  if (beginDayDiff < 0) {
    //没到开始时间
    dateTime = 0;
    return dateTime;
  }
  return dateTime
}
export function getRandColors() {
  // 深克隆，要不然浅克隆会三个随机数组都是一样的，因为地址指向一样
  let [...arr] = colorLists;
  arr.sort(function () {
    return Math.random() - 0.5;
  });
  return arr;
}
export function getTreeData(data) {
  for (let i = 0, len = data.length; i < len; i++) {

    if (data[i].children.length < 1) {
      // children若为空数组，则将children设为undefined
      data[i].children = undefined;
    } else {
      // children若不为空数组，则继续 递归调用 本方法
      getTreeData(data[i].children);

    }
  }
  return data;
}
export function getNumYear(getYear=0,yearNum=10) {
  // yearNum,获取最近的几年，默认10年
  let date = new Date();
  let yearArr = [];
  let toYear = parseInt(date.getFullYear())
  for(let i=0;i<yearNum;i++){
    yearArr.push(toYear-i)
  }
  if(getYear===1){
    let yearObject = {
      year:toYear, //获取当前年份
      yearArr:yearArr
    }
    return yearObject
  }
  return yearArr
}
export function getYearList(yearNum=10,allValue="") {
  // yearNum,获取最近的几年，默认10年
  let date = new Date();
  let yearArr = [
    {
      id: allValue,
      name:'全部'
    }
  ];
  let toYear = parseInt(date.getFullYear())
  for(let i=0;i<yearNum;i++){
    let body = {
      id: toYear-i,
      name:toYear-i
    }
    yearArr.push(body)
  }
  return yearArr
}
export function urlAutoCompletion(src){
  if(!isHttp(src)){
    return resourseUrl + src 
  }
  return src
}
export function setUrlQuery(url, data) {
  //用法  setUrlQuery('www.xxx.com', {id:1,name:2}),返回www.xxx.com?id=1&name=2 
  if (typeof (url) == 'undefined' || url == null || url == '') {
    return '';
  }
  if (typeof (data) == 'undefined' || data == null || typeof (data) != 'object') {
    return '';
  }
  url += (url.indexOf("?") != -1) ? "" : "?";
  for (var k in data) {
    url += ((url.indexOf("=") != -1) ? "&" : "") + k + "=" + encodeURI(data[k]);
  }
  return url;
}