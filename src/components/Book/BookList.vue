<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';

const books = ref();

const fetchBooks = async () => {

    try {

        const response = await axios.get('http://127.0.0.1:8000/api/books-list');

        if (response.data.status = 200) {
            books.value = response.data.data;
            console.log(books.value);
        }

    }
    catch (err) {
        console.error("Error: ", err);
    }
}

onMounted(fetchBooks);
</script>

<template>

    <div class="grid grid-cols-3 gap-4">
        <div v-for="book in books" :key="book.id"
            class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">

            <img class="rounded-t-lg" src="https://picsum.photos/400/300" alt="" />

            <div class="p-5">

                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ book.title }}</h5>

                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{ book.desc }}</p>
                <button
                    class="gap-[2px] inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Read more
                    <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </button>
            </div>
        </div>

    </div>

</template>