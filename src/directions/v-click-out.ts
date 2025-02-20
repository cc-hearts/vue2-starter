import { isFn } from '@cc-heart/utils'
import type Vue from 'vue'

export function setupVClickOutDirection(vue: typeof Vue) {
  const clickOutSymbol = Symbol('clickOut')

  vue.directive('clickOut', {
    bind(el: HTMLElement, binding: { value: unknown }) {
      const handler = binding.value
      const clickOutHandler = (e: MouseEvent) => {
        if (el.contains(e.target as Node)) {
          return
        }
        if (isFn(handler)) {
          handler(e)
        }
      }
      Reflect.set(el, clickOutSymbol, clickOutHandler)
      document.addEventListener('click', clickOutHandler)
    },
    unbind(el) {
      const clickOutHandler = Reflect.get(el, clickOutSymbol)
      if (clickOutHandler) {
        document.removeEventListener('click', clickOutHandler)
        Reflect.set(el, clickOutSymbol, null)
      }
    },
  })
}
