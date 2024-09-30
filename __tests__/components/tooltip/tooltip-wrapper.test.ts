import { shallowMount, createLocalVue, mount } from '@vue/test-utils'
import { TooltipWrapper } from '@/components'
import * as ElementUI from 'element-ui'

const localVue = createLocalVue();
localVue.use(ElementUI);


describe('tooltip wrapper components', () => {
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
    const _get =  Range.prototype.getBoundingClientRect

    Range.prototype.getBoundingClientRect = () => {
      return {
        width: 100,
        height: 100,
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

    Range.prototype.getBoundingClientRect = _get
    setTimeout(() => {
      expect(document.querySelector('.el-tooltip__popper')).not.toBeNull()
      expect(document.querySelector('.el-tooltip__popper')?.textContent?.trim()).toBe('foo baz')
      done()
    }, 200)
  })
})