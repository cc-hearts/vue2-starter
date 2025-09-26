<script>
export default {
  name: 'HomePage',
}
</script>

<template>
  <div class="p-4">
    <h1>Vue2 Starter</h1>
    <div class="navigation">
      <h2>演示页面</h2>
      <ul>
        <li>
          <router-link to="/tooltip">
            Tooltip 演示
          </router-link>
        </li>
        <li>
          <router-link to="/progress-demo">
            进度条演示
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
