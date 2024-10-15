<template>
  <div>
    {{ id }} home
  </div>

</template>

<script>

export default {
  name: 'User.Id',
  computed: {
    id() {
      return this.$route.params.id
    }
  }
}
</script>
