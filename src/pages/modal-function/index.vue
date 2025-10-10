<script>
import BaseModal from '@/components/modal/base.vue'
import Vue from 'vue'
export default {
  name: 'ModalFunction',
  methods: {
    openModal() {
      const Comp = Vue.extend(BaseModal)
      const ins = new Comp({
        propsData: {
          dialogVisible: false,
        },
      })
      ins.$on('update:dialogVisible', (val) => {
        if (!val) {
          ins.dialogVisible = false
          setTimeout(() => {
            ins.$destroy()
            ins.$off('update:dialogVisible')
          }, 300)
        }
      })

      ins.$mount()

      this.$nextTick(() => {
        ins.dialogVisible = true
      })
    },
  },
}
</script>

<template>
  <div>
    <button @click="openModal">
      打开弹窗
    </button>
  </div>
</template>
