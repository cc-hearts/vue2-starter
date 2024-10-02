import { TooltipWrapper } from '../components/index'
import Vue from 'vue'

function createTooltipFactory(el: HTMLElement, getContent: () => string, vue: typeof Vue) {
  const Ctor = vue.extend(TooltipWrapper)
  const instance = new Ctor({
    propsData: {
      getContent,
      getEl: () => el,
    },
  })

  instance.$mount()
  return instance
}

export function setupVTooltipDirection(vue: typeof Vue) {
  const tooltipSymbol = Symbol('tooltip')
  vue.directive('tooltip', {
    bind(el: HTMLElement) {
      const instance = createTooltipFactory(el, () => el.getAttribute('tooltip-content') || '', vue)
      Reflect.set(el, tooltipSymbol, instance)
    },
    unbind(el) {
      const ins = Reflect.get(el, tooltipSymbol)

      ins.onDestroy()
      ins.$destroy()
      Reflect.set(el, tooltipSymbol, null)
    },
  })
}
