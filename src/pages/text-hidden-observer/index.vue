<script>
import textHiddenObserver from '@/components/text-hidden-observer.vue';

export default {
  name: 'TextHidden',
  components: {
    TextHiddenObserver: textHiddenObserver,
  },
  data() {
    return {
      text: '12',
    }
  },
}
</script>


<template>
  <div>
    <TextHiddenObserver class="w-[50px] truncate">
      <span>
        {{ text }}
      </span>
    </TextHiddenObserver>

    <el-button @click="text = 'new text'">
      modify text
    </el-button>
  </div>
</template>