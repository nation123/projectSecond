import api from "_api";

const state = {
  dicts: {}
}
const mutations = {}
const actions = {
  getDictByCode({commit}, dictCode) {
    return new Promise(resolve => {
      let dict = state.dicts[dictCode]
      if (dict) {
        resolve(dict)
      } else {
        api.c.rscenter.getRscenterApiV1DictCode({code: dictCode})
          .then(res => {
            state.dicts[dictCode] = res.data
            resolve(res.data)
          });
      }
    })
  },
  getDictById({commit}, dictId) {
    return new Promise(resolve => {
      // let dict = state.dicts[dictId]
      // if (dict) {
      //   resolve(dict)
      // } else {
        api.c.rscenter.getRscenterApiV1Dict({id: dictId})
          .then(res => {
            state.dicts[dictId] = res.data
            resolve(res.data)
          });
      // }
    })
  }
}


export default {
  namespaced: true,
  state,
  mutations,
  actions
}

