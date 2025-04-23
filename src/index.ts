import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/asserts/scss/index.css'
import i18n from './language/index'
import { setupVTooltipDirection } from './directions/v-tooltip.ts'
import { worker } from '../mocks/index'
;(async () => {
  Vue.config.productionTip = false
  Vue.use(ElementUI)
  setupVTooltipDirection(Vue)

  if (IS_DEV) {
    await worker.start({
      onUnhandledRequest: 'bypass',
    })
  }

  new Vue({
    router,
    store,
    i18n,
    render: (h) => h(App),
  }).$mount('#app')
})()
