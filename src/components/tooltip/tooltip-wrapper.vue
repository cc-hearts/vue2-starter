<template>
  <el-tooltip content="content" ref="triggerRef" :manual="true">
    {{ getEl() }}
  </el-tooltip>
</template>

<script>
import { useOverflowHidden } from '../../composables/use-overflow-hidden.ts'
export default {
  name: 'Test',
  data() {
    return {
      getEl: () => null,
      value: false,
    }
  },
  mounted() {
    const el = this.getEl()
    if (!el) return

    this.$refs.triggerRef.referenceElm = this.$refs.triggerRef.$el = el;

    el.addEventListener('mousemove', this.onMouseEnter, false)
    el.addEventListener('mouseleave', this.onMouseLeave, false)
  },
  methods: {
    onMouseEnter() {
      if (!this.value && useOverflowHidden(this.getEl())) {
        this.value = true
        this.$refs.triggerRef.showPopper = true
      }
    },
    onMouseLeave() {
      if (this.value) {
        this.value = false;
        this.$refs.triggerRef.showPopper = false
      }
    },
    onDestroy() {
      const el = this.getEl()
      if (!el) return

      el.removeEventListener('mousemove', this.onMouseEnter)
      el.removeEventListener('mouseleave', this.onMouseLeave)
    }
  },
}

</script>
