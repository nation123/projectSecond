import axios from 'axios'
import {
  MessageBox,
  Message
} from 'element-ui'
import store from '@/store'
import {
  getToken
} from '@/utils/auth'
import {
  baseUrlCom
} from "_u/config"

// create an axios instance

const service = axios.create({
  baseURL: baseUrlCom || process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    let token = getToken();
    if (token) {
      config.headers['token'] = token
    }
    if (['post', 'put', 'patch'].includes(config.method)) {

    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const {
      data,
      config
    } = response
    const reqUrl = config.url || ''

    // 这个接口返回的直接是文件字节
    if (reqUrl.indexOf("/file/url") != -1) {
      return data
    }

    // if the custom code is not 20000, it is judged as an error.
    if (data.code !== 200) {
      Message({
        message: data.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (data.code === 402 || data.code === 50008 || data.code === 50012 || data.code === 50014) {
        MessageBox.confirm('Token已过期，请重新登录', '温馨提示', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/logout').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(data.message || 'Error'))
    } else {
      return data
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
