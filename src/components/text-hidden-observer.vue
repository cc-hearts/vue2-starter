<script>
import { isHidden } from '@cc-heart/utils-client';
export default {
  name: 'TextHiddenWrapper',
  data() {
    return {
      isHidden: false,
    }
  },
  mounted() {
    const cb = () => {
      this.isHidden = isHidden(this.$refs.textHiddenWrapperRef);
      console.log(`isHidden: ${this.isHidden}`)
    }

    const observer = new MutationObserver(() => {
      cb()
    });
    observer.observe(this.$refs.textHiddenWrapperRef, {
      characterData: true,
      subtree: true
    });

    this.__internalOb = observer

    cb()
  },
  beforeDestroy() {
    if (this.__internalOb) {
      this.__internalOb.disconnect()
    }
  }
}
</script>


<template>
    <div ref="textHiddenWrapperRef">
      <slot />
    </div>
</template>