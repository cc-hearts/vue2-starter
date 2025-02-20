<script>
export default {
  name: 'UserPage',
  computed: {
    id() {
      return this.$route.params.id
    },
  },
}
</script>

<template>
  <div>{{ id }} home</div>
</template>
