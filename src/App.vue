<script setup>


</script>

<template>
  <div>
    <nav class="nav">
      <router-link to="/todo">Todo</router-link>
      <router-link to="/blogs">Blogs</router-link>
      <router-link to="/slot">Slot</router-link>
      <router-link to="/tabs">Tabs</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/student-register">Register</router-link>
      <router-link to="/student-login">Login</router-link>
     
    </nav>
    <router-view></router-view>
  </div>
</template>


<style scoped>
.nav {
  display: flex;
  gap: 45px;
  margin-bottom: 160px;
}
</style>