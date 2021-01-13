import api from "_api";

const state = {
  systemList: ''
}
const mutations = {}
const actions = {
  getSystemList({commit}) {
    return new Promise(resolve => {
      if (state.systemList) {
        resolve(state.systemList)
      } else {
        api.c.rscenter.getRscenterApiV1PlatformSystemList().then(res => {
          state.systemList = res.data || []
          resolve(res.data)
        });
      }
    })
  }
}


export default {
  namespaced: true,
  state,
  mutations,
  actions
}

