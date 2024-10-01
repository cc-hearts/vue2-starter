import { createLocalVue, mount } from '@vue/test-utils'
import { TooltipWrapper } from '@/components'
import * as ElementUI from 'element-ui'

const localVue = createLocalVue();
localVue.use(ElementUI);

describe('TooltipWrapper components', () => {
  const tooltipWrapperDestroy = (wrapper: ReturnType<typeof mount<typeof TooltipWrapper>>) => {
    wrapper.vm.onDestroy()
    wrapper.destroy()
  }

  test('renders a tooltip', (done) => {
    const el = document.createElement('div')
    document.body.append(el)

    const wrapper = mount(TooltipWrapper, {
      localVue,
      propsData: {
        getContent: () => 'foo baz',
        getEl: () => el
      }
    })
    const _getBoundingClientRect = Range.prototype.getBoundingClientRect

    Range.prototype.getBoundingClientRect = () => {
      return {
        width: 1,
        height: 0,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      } as DOMRect
    }
    expect(document.querySelector('.el-tooltip__popper')).toBeNull()

    el.dispatchEvent(new MouseEvent('mousemove', {
      bubbles: true,
      cancelable: true,
    }))

    Range.prototype.getBoundingClientRect = _getBoundingClientRect
    setTimeout(() => {
      const tooltipEl = document.querySelector('.el-tooltip__popper')
      expect(tooltipEl).not.toBeNull()
      expect(tooltipEl?.getAttribute('display')).not.toBe('none')
      expect(tooltipEl?.textContent?.trim()).toBe('foo baz')

      el.remove()
      tooltipWrapperDestroy(wrapper)
      done()
    })
  })

  test('not render a tooltip when content has no overflow', (done) => {
    const el = document.createElement('div')

    el.getBoundingClientRect = () => {
      return {
        width: 200,
        height: 0,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      } as DOMRect
    }

    document.body.append(el)

    const wrapper = mount(TooltipWrapper, {
      localVue,
      propsData: {
        getContent: () => 'foo baz1',
        getEl: () => el
      }
    })

    const _getBoundingClientRect = Range.prototype.getBoundingClientRect

    Range.prototype.getBoundingClientRect = () => {
      return {
        width: 100,
        height: 0,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      } as DOMRect
    }

    el.dispatchEvent(new MouseEvent('mousemove', {
      bubbles: true,
      cancelable: true,
    }))

    Range.prototype.getBoundingClientRect = _getBoundingClientRect

    setTimeout(() => {
      expect(document.querySelector('.el-tooltip__popper')).toBeNull()

      tooltipWrapperDestroy(wrapper)
      done()
    })
  })
})