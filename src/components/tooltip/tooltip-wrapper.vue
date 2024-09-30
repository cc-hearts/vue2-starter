<template>
  <el-tooltip ref="triggerRef" :manual="true">
    <template #content>
      {{ internalContent }}
    </template>
  </el-tooltip>
</template>

<script>
import { useOverflowHidden } from '@/composables/use-overflow-hidden.ts'

export default {
  name: 'ToolTipWrapper',
  props: {
    getEl: {
      type: Function,
      default: () => null
    },
    getContent: {
      type: Function,
      default: () => ''
    }
  },
  data() {
    return {
      internalContent: '',
      isHover: false,
    }
  },
  mounted() {
    const el = this.getEl()
    if (!el) return

    this.$refs.triggerRef.referenceElm = el;

    el.addEventListener('mousemove', this.onMouseEnter, false)
    el.addEventListener('mouseleave', this.onMouseLeave, false)
  },
  methods: {
    onMouseEnter() {
      if (!this.isHover && useOverflowHidden(this.getEl())) {
        this.internalContent = this.getContent()
        this.isHover = true
        this.$refs.triggerRef.showPopper = true
      }
    },
    onMouseLeave() {
      this.isHover = false;
      this.$refs.triggerRef.showPopper = false
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
