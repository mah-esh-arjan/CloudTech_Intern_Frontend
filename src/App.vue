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
  <div v-if="role === 'admin'" class="h-screen flex flex-col">
    <!-- Admin Navbar -->
    <div class="admin-nav">
      <div>
        <img :src="logoimagePath" alt="Logo" />
      </div>

      <div class="admin-profile">
        <img :src="adminImagePath" alt="Admin" />
        <h1>Admin</h1>
      </div>
    </div>

    <!-- Sidebar + Content -->
    <div class="flex flex-1">
      <aside class="w-64 bg-gray-800 text-white flex flex-col p-6 shadow-lg">
        <router-link class="py-2 px-4 rounded hover:bg-gray-700 transition" to="/admin/student-list">📚 Student
          List</router-link>
        <router-link class="py-2 px-4 rounded hover:bg-gray-700 transition" to="/admin/books-list">📖Books
          List</router-link>
        <router-link class="py-2 px-4 rounded hover:bg-gray-700 transition" to="/admin/create-book">✍️ Create
          Book</router-link>
        <router-link class="py-2 px-4 rounded hover:bg-gray-700 transition" to="/admin/admin-login">🔑 Admin
          Login</router-link>
        <router-link class="py-2 px-4 rounded hover:bg-gray-700 transition" to="/student/student-login">👨‍🎓 Student
          Login</router-link>
      </aside>

      <main class="flex-1 bg-gray-100 p-6 overflow-auto">
        <router-view></router-view>
      </main>
    </div>
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

      <div v-if="user != null" class="flex items-center gap-3 mr-4! relative">
        <!-- Cart Button with Badge -->
        <button @click="handlePortal" class="relative text-white text-lg flex items-center gap-2">
          <div class="relative inline-block">
            <!-- Cart Badge -->
         

            <!-- Cart Icon & Text -->
            <button
              class="flex items-center text-white text-lg gap-2 transition-all duration-300 hover:text-gray-300 hover:scale-110">
              <font-awesome-icon :icon="['fas', 'shopping-cart']" class="text-2xl" />
              <span
              class="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {{ cartLength }}
            </span>
            </button>
          </div>
        </button>

        <!-- Books Count -->
        <h1 class="text-white text-lg">📚 Books: {{ count }}</h1>

        <!-- User Profile Image -->
        <img class="h-12 w-12 rounded-full border-2 border-white object-cover"
          :src="`${studentImagePath}/${user.image_path}`" alt="User Not Found" />

        <!-- User Name -->
        <button @click="handleProfileClick(user.student_id)" class="text-white text-lg font-semibold hover:underline">
          {{ user.name }}
        </button>
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


.admin-nav {
  display: flex;
  background-color: #1e1e38;
  /* Darker shade for differentiation */
  padding: 15px 20px;
  border-radius: 8px;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.admin-nav a,
.admin-nav router-link {
  color: #ffffff;
  /* White text for contrast */
  text-decoration: none;
  font-size: 16px;
  font-weight: bold;
  padding: 10px 15px;
  transition: all 0.3s ease-in-out;
  border-radius: 5px;
}

.admin-nav a:hover,
.admin-nav router-link:hover {
  color: #1e1e38;
  /* Dark text */
  background: #ffffff;
  /* White background */
  box-shadow: 0px 2px 10px rgba(255, 255, 255, 0.3);
}

/* Admin Navbar Image */
.admin-nav img {
  height: 45px;
  width: 75px;
  object-fit: contain;
}

/* Admin Profile Section */
.admin-profile {
  display: flex;
  align-items: center;
  gap: 10px;
}

.admin-profile img {
  height: 45px;
  width: 50px;
  border-radius: 50%;
  border: 2px solid white;
  object-fit: cover;
}

.admin-profile h1 {
  color: white;
  font-size: 18px;
  font-weight: bold;
}
</style>