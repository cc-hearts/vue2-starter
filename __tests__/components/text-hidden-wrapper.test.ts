import { createLocalVue, mount } from '@vue/test-utils'
import Comp from '@/components/text-hidden-wrapper.vue'

jest.mock('@cc-heart/utils-client', () => ({
  isHidden: jest.fn(),
}))

import { isHidden as mockIsHidden } from '@cc-heart/utils-client'

const localVue = createLocalVue()

describe('TextHiddenWrapper', () => {
  test('Set state based on isHidden utility on mount', async () => {
      ;(mockIsHidden as jest.Mock).mockReturnValue(true)

    const wrapper = mount(Comp, {
      localVue,
      slots: {
        default: '<div>foo</div>',
      },
    })

    await wrapper.vm.$nextTick()

    expect((wrapper.vm as any).isHidden).toBe(true)

    wrapper.destroy()
  })

  test('Recalculate hidden state when text content changes', async () => {
      ;(mockIsHidden as jest.Mock).mockReturnValue(false)

    const wrapper = mount(Comp, {
      localVue,
      slots: {
        default: '<div>bar</div>',
      },
    })

    await wrapper.vm.$nextTick()
    expect((wrapper.vm as any).isHidden).toBe(false)

    ;(mockIsHidden as jest.Mock).mockReturnValue(true)

    const el: Element = (wrapper.vm as any).$refs.textHiddenWrapperRef
    const child = el.querySelector('div')
    const textNode = child?.firstChild as Text
    textNode.data = 'baz'

    await new Promise((r) => setTimeout(r))

    expect((wrapper.vm as any).isHidden).toBe(true)

    wrapper.destroy()
  })
})