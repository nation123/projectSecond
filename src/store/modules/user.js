import api from '@/api/index'
import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'
import {
  resetRouter
} from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  phone: '',
  id: '',
  own: '',
  type: '',
  email: '',
  roles: [],
  menus: [],
  permissions: [],

  organization: {},
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER: (state, userInfo) => {
    state.orgId = userInfo.orgId;
    state.phone = userInfo.phone;
    state.id = userInfo.id;
    state.own = userInfo.own;
    state.username = userInfo.name;
    state.type = userInfo.type;
    state.email = userInfo.email;
    // state.token = userInfo.token;
    state.roles = userInfo.roleList || []; //角色权限
    state.menus = userInfo.menuList || [];
    // state.permissions = userInfo.permissionList || [];
    state.organization = userInfo.organization || {};
  },
  RESET_USER: (state) => {
    state.orgId = '';
    state.phone = '';
    state.id = '';
    state.own = '';
    state.type = '';
    state.email = '';
    // state.token = '';
    state.roles = [];
    state.menus = [];
    state.permissions = [];
    state.organization = {};
  },
}

const actions = {
  // user login
  login({
    commit
  }, {
    username,
    password
  }) {
    return new Promise((resolve, reject) => {
      console.log(api.r.user)
      api.r.user.postUserLogin({
        data: {
          phone: username.trim(),
          password: password
        }
      }).then(res => {
        const {
          data
        } = res
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({
    commit,
    state
  }) {
    console.log('===============getInfo');
    return new Promise((resolve, reject) => {
      api.r.user.getUserToken(state.token).then(res => {
        let userInfo = res.data;
        if (userInfo != null) {
          commit('SET_USER', userInfo)
          resolve(userInfo)
        }
        reject('用户信息为空')
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      //todo 后台没有logout接口，直接清空本地缓存即可
      // logout(state.token).then(() => {
      commit('SET_TOKEN', '')
      commit('RESET_USER')
      removeToken()
      resetRouter()
      resolve()
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // remove token
  resetToken({
    commit
  }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
