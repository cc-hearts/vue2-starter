import { createLocalVue } from "@vue/test-utils";
import { setupVClickOutDirection } from "@/directions/v-click-out";
import { mount } from "@vue/test-utils";

const localVue = createLocalVue()
setupVClickOutDirection(localVue)

describe("v-click-out", () => {
  test('use vClickOut', async () => {
    const fn = jest.fn()
    const Comp = localVue.component('Comp', {
      template: `
        <div class="wrapper" v-click-out="handlerClickOut">
          <div id="id1">1</div>
          <div id="id2">2</div>
        </div>
      `,
      methods: {
        handlerClickOut() {
          fn()
        }
      }
    })

    const wrapper = mount(Comp, {
      localVue
    })

    await wrapper.find('#id1').trigger('click')
    expect(fn).not.toHaveBeenCalled()

    await wrapper.find('.wrapper').trigger('click')
    expect(fn).not.toHaveBeenCalled()

    await wrapper.find('#id2').trigger('click')
    expect(fn).not.toHaveBeenCalled()

    document.body.click()
    expect(fn).toHaveBeenCalled()

    wrapper.destroy()
  })
})