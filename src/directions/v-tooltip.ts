import { TooltipWrapper } from '../components/index'
import Vue from 'vue'
function createTooltipFactory(el: HTMLElement) {
  const Ctor = Vue.extend(TooltipWrapper)
  const instance = new Ctor({
    data() {
      return {
        getEl: () => el,
      }
    },
  })

  instance.$mount()
  return instance
}

export function setupDirection() {
  const tooltipSymbol = Symbol('tooltip')
  Vue.directive('tooltip', {
    bind(el) {
      const instance = createTooltipFactory(el)
      Reflect.set(el, tooltipSymbol, instance)
    },
    unbind(el) {
      const ins = Reflect.get(el, tooltipSymbol)
      if (!ins) return

      ins.onDestroy()
      ins.$destroy()
      Reflect.set(el, tooltipSymbol, null)
    },
  })
}