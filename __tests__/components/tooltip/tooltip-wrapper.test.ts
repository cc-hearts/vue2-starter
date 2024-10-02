import { createLocalVue, mount } from '@vue/test-utils'
import { TooltipWrapper } from '@/components'
import { setupVTooltipDirection } from '@/directions/v-tooltip'
import * as ElementUI from 'element-ui'

const localVue = createLocalVue();
localVue.use(ElementUI);
setupVTooltipDirection(localVue)


describe('TooltipWrapper components', () => {
  const tooltipWrapperDestroy = (wrapper: ReturnType<typeof mount<typeof TooltipWrapper>>) => {
    wrapper.vm.onDestroy()
    wrapper.destroy()
  }

  const createMockGetBoundingClientRectFactory = (width: number) => {
    return () => ({
      width,
      height: 0,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    } as DOMRect)
  }

  const triggerMouseMove = (el: Element) => {
    el.dispatchEvent(new MouseEvent('mousemove', {
      bubbles: true,
      cancelable: true,
    }))
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

    Range.prototype.getBoundingClientRect = createMockGetBoundingClientRectFactory(1)

    expect(document.querySelector('.el-tooltip__popper')).toBeNull()

    triggerMouseMove(el)

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

    el.getBoundingClientRect = createMockGetBoundingClientRectFactory(200)

    document.body.append(el)

    const wrapper = mount(TooltipWrapper, {
      localVue,
      propsData: {
        getContent: () => 'foo baz1',
        getEl: () => el
      }
    })

    const _getBoundingClientRect = Range.prototype.getBoundingClientRect

    Range.prototype.getBoundingClientRect = createMockGetBoundingClientRectFactory(100)

    triggerMouseMove(el)

    Range.prototype.getBoundingClientRect = _getBoundingClientRect

    setTimeout(() => {
      expect(document.querySelector('.el-tooltip__popper')).toBeNull()
      tooltipWrapperDestroy(wrapper)
      el.remove()
      done()
    })
  })

  test('use v-tooltip render a tooltip', (done) => {
    const Comp = localVue.component('Comp', {
      template: `
        <div v-tooltip style="width:10px;overflow:hidden;">
          <span>foo bar</span>
        </div>
      `
    })

    const wrapper = mount(Comp, {
      localVue
    })

    const el = wrapper.vm.$el
    el.getBoundingClientRect = createMockGetBoundingClientRectFactory(10)
    Range.prototype.getBoundingClientRect = createMockGetBoundingClientRectFactory(20)

    triggerMouseMove(el)

    setTimeout(() => {
      const tooltipEl = document.querySelector('.el-tooltip__popper')
      expect(tooltipEl).not.toBeNull()
      expect(tooltipEl?.textContent?.trim()).toBe('')

      el.setAttribute('tooltip-content', 'foo')
      el.dispatchEvent(new MouseEvent('mouseleave'))

      triggerMouseMove(el)

      setTimeout(() => {
        expect(tooltipEl?.textContent?.trim()).toBe('foo')
        wrapper.destroy()
        expect(document.querySelector('.el-tooltip__popper')).toBeNull()
        done()
      })
    })
  })
})