import router from '../router'
import {
  urlAutoCompletion,
  setUrlQuery
} from "_u"


// 全局指令
function install(Vue) {
  //路由跳转
  //<div class="dashboard-text" v-router="{name:'menu2',query:{id:1}}"> </div>
  //<div v-router="'menu2'>name</div>
  //<div v-router>返回上一页</div>
  Vue.directive('router', function (el, v) {
    let value = v.value;
    switch (typeof value) {
      case 'string':
        el.onclick = () => {
          router.push({
            name: value
          })
        }
        break;
      case 'object':
        el.onclick = () => {
          router.push(value)
        }
        break;
      default:
        el.onclick = () => {
          router.go(-1)
        }
        break;
    }
  })
  Vue.directive('open', function (el, v) {
    let value = v.value;
    switch (typeof value) {
      case 'string':
        el.onclick = () => {
          // v-open="HomeAnnounce"
          window.open(`#/${value}`)
        }
        break;
      case 'object':
        el.onclick = () => {
          // v-open="{path:'HomeAnnounce',query:{id:2,name:'sia'}}"
          let url = `#/${value.name || value.path}`;
          window.open(setUrlQuery(url,value.query))
        }
        break;
      default:
        el.onclick = () => {
          // router.go(-1)
          window.open("about:blank","_self").close()
        }
        break;
    }
  })

  Vue.directive('full', function (el) {
    //补全url指令，只针对img跟href
    let urlType = el.getAttribute('src') || el.getAttribute('href');
    el.src = urlAutoCompletion(urlType)
    el.href = urlAutoCompletion(urlType)
  })

  Vue.directive('delete', function (el, v, vnode) {
    const {
      name,
      id,
      fetchFun,
      fetchArgument,
      cb
    } = v.value;
    const {
      context
    } = vnode;
    el.onclick = () => {
      context.$confirm(`确认要删除 ${name} 吗?`, "删除", {
          confirmButtonText: "删除",
          cancelButtonText: "取消",
          type: "error"
        })
        .then(() => {
          fetchFun({
              id,
              ...fetchArgument
            })
            .then(res => {
              context.$message({
                message: '删除成功',
                type: 'success'
              });
              cb && cb()
            })
        })
    }
  })
}

export default {
  install
}
