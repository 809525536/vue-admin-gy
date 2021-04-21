let Soket = null
const soketFun = {
  emit(fun, params) {

  },
  open() {
    console.log('open')
  }
}
const initSoket = (path) => {
  Soket = new WebSocket(path)
  Soket.onopen = () => {
    console.log(222)
  }
}

export default {
  install(Vue, options) {
    const { path } = options
    initSoket(path)
    Vue.prototype.$soket = soketFun
    console.log(path)
  }
}