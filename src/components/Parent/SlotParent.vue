<script setup>
import SlotChild from '../Prop/SlotChild.vue';

import axios from 'axios';
import { ref, onMounted } from 'vue';

const posts = ref(null);
const getPosts = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/data');
        console.log(response.data);
        posts.value = response.data;
        console.log(posts.value);
    }

    catch (err) {
        console.log('error', err);
    }

}

onMounted(getPosts);

</script>

<template>
    <SlotChild>
        <template #header>
            <div>
                <header class="custom">Custom header</header>
                <div v-if="posts">
                    <h1 class="text-lg font-semibold">Name: {{ posts.name }}</h1>
                    <p>Email: {{ posts.email }}</p>
                    <p>Address: {{ posts.address }}</p>
                </div>
            </div>
        </template>
    </SlotChild>

</template>

<style scoped>
.custom {
    background-color: #28a745 !important;
    color: white !important;


}
</style>