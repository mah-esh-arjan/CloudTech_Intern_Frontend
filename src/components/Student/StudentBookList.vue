<script setup>
import axios from 'axios';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const books = ref();
const cart = ref([]);
const url = 'http://127.0.0.1:8000/BookImages';
const imagePath = '/images/Kitab.png';

const token = localStorage.getItem('token');


const router = useRouter();

const fetchBooks = async () => {

    try {

        const response = await axios.get('http://127.0.0.1:8000/api/books-list',
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

        if (response.data.status = 200) {
            books.value = response.data.data;
            console.log(books.value);
        }

    }
    catch (err) {
        console.error("Error: ", err);
    }
}

const handleCart = (id) => {
    if (cart.value.length < 3) {
        if (!cart.value.includes(id)) {
            cart.value.push(id);
            console.log(cart.value);
        }
    }
    else{
        alert('Cart is full');
    }
}


onMounted(fetchBooks);
</script>

<template>

    <section id="section" class="flex justify-center flex-col ">
        <h2
            class="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight mb-8! mx-auto! border border-black-500 p-2">
            Student Book List</h2>

        <div class="grid grid-cols-4 gap-4">
            <div v-for="book in books" :key="book.id"
                class="flex-col max-h-[375px] bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">

                <img class="h-1/2 w-full" :src="book.image_path === null ? imagePath : `${url}/${book.image_path}`"
                    alt="Not Found" />

                <div class="px-5 py-2 flex flex-col justify-between">

                    <div class="mb-6!">
                        <h5 class=" text-2xl font-bold tracking-tight text-gray-900 dark:text-white"> <span> {{ book.id
                                }}. </span>{{ book.title }}
                        </h5>

                    </div>

                    <div class="flex flex-col">
                        <div class="">
                            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{ book.desc.length > 55 ?
                                book.desc.substring(0, 55) + '...' : book.desc }}</p>

                        </div>

                    </div>
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded max-w-fit"
                        @click="handleCart(book.id)">Cart</button>

                </div>
            </div>

        </div>
    </section>
</template>