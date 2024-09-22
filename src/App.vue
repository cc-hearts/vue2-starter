<template>
  <div>
    <div v-if="visible" ref="testRef" class="text-overflow" @click="handleClick" v-tooltip>
      {{ $t('confirm') }}
    </div>

    <button @click="handleToggle">toogle visible</button>
  </div>
</template>

<script>
// import { useTooltip } from "./use-tooltip";
export default {
  name: 'App',
  data() {
    return {
      visible: true
    }
  },
  methods: {
    handleClick() {
      // useTooltip( this.$refs.testRef)
    },
    handleToggle() {
      this.visible = !this.visible
    }
  }
};
</script>

<style>
.text-overflow {
  width: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>