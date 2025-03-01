<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const lms = useStore();
const router = useRouter();

const role = computed(() => lms.getters.getRole);
const user = computed(() => lms.getters.getUser);
const count = computed(() => lms.getters.getCount);
const cartLength = computed(() => lms.getters.getCart.length);

const logoimagePath = '/images/lms.png';
const adminImagePath = '/images/admin.png';
const studentImagePath = 'http://127.0.0.1:8000/images';

const handleProfileClick = (id) => {
  router.push(`/student/student-details/${id}`);

}

const handlePortal = () => {
  router.push('/student/student-cart');
}

</script>

<template>
  <div v-if="role === 'admin'">
    <nav class="nav">
      <div class="flex">
        <img class="h-[45px] w-[75px] object-contain ml-4!" :src="logoimagePath" alt="Not Found" />
        <router-link to="/admin/student-list">Student-list</router-link>
        <router-link to="/admin/books-list">Books</router-link>
        <router-link to="/admin/create-book">Create-Books</router-link>
        <router-link to="/admin/admin-login">Admin-Login</router-link>
        <router-link to="/student/student-login">Student-Login</router-link>
      </div>

      <div class="flex items-center mr-4! gap-4">

        <img class="h-[45px] w-[50px] rounded-full border-1 border-white object-cover " :src="adminImagePath"
          alt="Not Found" />
        <h1 class="text-white">Admin</h1>
      </div>

    </nav>
    <router-view></router-view>
  </div>
  <div v-else-if="role === 'student'">
    <nav class="nav">
      <div class="flex">
        <img class="h-[45px] w-[75px] object-contain ml-4!" :src="logoimagePath" alt="Not Found" />
        <router-link to="/student/student-register">Register</router-link>
        <router-link to="/student/student-login">Student-Login</router-link>
        <router-link to="/student/student-books-list">Student-BookList</router-link>
        <router-link to=""><button @click="handleProfileClick(user.student_id)">Student-Details</button></router-link>
      </div>

      <div v-if="user != null" class="flex items-center mr-4! gap-4">
        <button class="text-white" @click="handlePortal">Cart: {{ cartLength }}</button>
        <h1 class="text-white"> Books: {{ count }}</h1>
        <img class="h-[45px] w-[50px] rounded-full border-1 border-white object-cover"
          :src="`${studentImagePath}/${user.image_path}`" alt="User Not Found" />
        <button @click="handleProfileClick(user.student_id)" class="text-white">{{ user.name }}</button>
      </div>
    </nav>
    <router-view></router-view>
  </div>
  <div v-else>
    <nav class="nav">
      <img class="h-[45px] w-[75px] object-contain ml-4!" :src="imagePath" alt="Not Found" />
      <router-link to="/student/student-register">Register</router-link>
      <router-link to="/student/student-login">Student-Login</router-link>
      <router-link to="/admin/admin-login">Admin-Login</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>


<style scoped>
.nav {
  display: flex;
  background-color: #2c2c4a;
  /* Dark blue background */
  padding: 15px 0;
  border-radius: 8px;
  justify-content: space-between;
}

.nav a,
.nav router-link {
  color: #e0e0e0;
  /* Light grey text */
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
  padding: 8px 10px;
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

.frontground {
  background-color: rgba(177, 199, 177, 0.95);
  /* Slight transparency */
  position: fixed;
  /* Keeps modal centered */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
}

.hideground {
  visibility: hidden;
  /* Instead of display: none, avoids rendering issues */
  opacity: 0;
  pointer-events: none;
}
</style>