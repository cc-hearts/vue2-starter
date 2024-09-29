import { mount } from '@vue/test-utils'
import Component from '../../src/App.vue'

describe('Component', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Component)
    expect(wrapper).toMatchSnapshot()
  })
})

