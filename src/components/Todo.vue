<script setup>
import { ref, computed } from 'vue';

const list = ref(['list1', 'list2']);
const text = ref("");

const handleTodoCLick = () => {
    list.value.push(text.value);
    text.value = "";
}

</script>

<template>
    <h1 class="!mb-10 font-bold text-4xl"> TODO LIST</h1>
    <div class="!mb-4">
        <input placeholder="Enter your task" v-model="text"
            class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            @click.prevent="handleTodoCLick">Add it</button>
    </div>

    <h1 class="font-bold !mb-4">Your tasks left</h1>
    <li v-for="list in list" :key="list">
        {{ list }}
    </li>

</template>