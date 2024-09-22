<template>
  <div>
    <div v-if="visible" ref="testRef" class="text-overflow" v-tooltip>
      {{ $t('confirm') }}
    </div>

    <button @click="handleToggle">toogle visible</button>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      visible: true
    }
  },
  methods: {
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