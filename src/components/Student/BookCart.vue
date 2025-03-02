<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';


const imagePath = '/images/Kitab.png';
const url = 'http://127.0.0.1:8000/BookImages';
const lms = useStore();
const carts = computed(() => lms.getters.getCart);
const count = computed(() => parseInt(lms.getters.getCount));

const handleRemove = (cart) => {
    lms.commit("setPopCart", cart);
    lms.commit('setCount', count.value - 1);
    alert('Cart has been removed');
}

</script>

<template>

    <section id="section">
        {{ typeof count }}

        <div v-for="cart in carts" :key="cart.id"
            class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                :src="cart.image_path === null ? imagePath : `${url}/${cart.image_path}`" alt="">
            <div class="flex flex-col justify-between p-4 leading-normal">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ cart.id }}. {{
                    cart.title }}</h5>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{ cart.desc.length > 55 ?
                    cart.desc.substring(0, 100) + '...' : cart.desc }}</p>
                <button @click="() => handleRemove(cart)"
                    class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-fit">Remove</button>
            </div>
        </div>
    </section>
</template>