<script>
export default {
  name: 'TooltipHome',
  data() {
    return {
      visible: true,
    }
  },
  methods: {
    handleToggle() {
      this.visible = !this.visible
    },
  },
}
</script>

<template>
  <div>
    <div
      v-if="visible"
      v-tooltip
      class="text-overflow"
      tooltip-content="content"
    >
      {{ $t('confirm') }}
    </div>

    <button @click="handleToggle">
      toogle visible
    </button>
  </div>
</template>

<style>
.text-overflow {
  width: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
