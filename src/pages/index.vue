<script>
export default {
  name: 'HomePage',
  data() {
    return {
      routes: [
        '/foo',
        '/foo/baz',
        '/modal-function',
        '/progress-demo',
        '/tooltip',
        '/user',
      ],
    }
  },
}
</script>

<template>
  <div class="p-4">
    <h1>Vue2 Starter</h1>
    <div class="navigation">
      <ul>
        <li v-for="route in routes" :key="route">
          <router-link :to="route">
            {{ route }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.navigation {
  margin-top: 20px;
}

.navigation ul {
  list-style: none;
  padding: 0;
}

.navigation li {
  margin: 10px 0;
}

.navigation a {
  color: #409eff;
  text-decoration: none;
  font-size: 16px;
}

.navigation a:hover {
  text-decoration: underline;
}
</style>
