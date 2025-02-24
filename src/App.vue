<script setup>


</script>

<template>
  <div>
    <nav class="nav">
      <!-- ALl testing components only below: -->
      <!-- <router-link to="/todo">Todo</router-link>
      <router-link to="/blogs">Blogs</router-link>
      <router-link to="/slot">Slot</router-link>
      <router-link to="/tabs">Tabs</router-link>
      <router-link to="/about">About</router-link> -->
      <router-link to="/admin/student-list">Student-list</router-link>
      <router-link to="/admin/books-list">Books</router-link>
      <router-link to="/admin/create-book">Create-Books</router-link>

      <router-link to="/student/student-register">Register</router-link>
      <router-link to="/student/student-login">Student-Login</router-link>
      <router-link to="/student/student-books-list">Student-BookList</router-link>

      <router-link to="/admin/admin-login" >Admin-Login</router-link>


    </nav>
    <router-view></router-view>
  </div>
</template>


<style scoped>
.nav {
  display: flex;
  gap: 45px;
  justify-content: center;
  background-color: #1a1a2e;
  /* Dark blue background */
  padding: 15px 0;
  border-radius: 8px;
}

.nav a,
.nav router-link {
  color: #e0e0e0;
  /* Light grey text */
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
  padding: 10px 15px;
  transition: color 0.3s, background 0.3s;
  border-radius: 5px;
}

.nav a:hover,
.nav router-link:hover {
  color: #1a1a2e;
  /* Dark text on hover */
  background: #e0e0e0;
  /* Light grey background */
}
</style>