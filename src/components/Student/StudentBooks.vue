<script setup>
import router from '@/views/router';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { CheckIcon } from '@heroicons/vue/20/solid';

const url = 'http://127.0.0.1:8000/BookImages';
const imagePath = '/images/Kitab.png';


const bookData = ref([]);

const route = useRoute();
const id = Number(route.params.id);

const getBook = async () => {

    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/student-book/${id}`,
        )
        if (response.data.status === 404) {
            studentData.value = null;
        }
        bookData.value = response.data.student.books
        console.log(bookData);
    }
    catch (err) {
        console.error('Error:', err);
    }

}

onMounted(getBook);

</script>

<template>
    <section id="section" class="bg-white dark:bg-gray-900">
        <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div class="mx-auto max-w-screen-md mb-8! lg:mb-12">
                <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">List of your books
                </h2>
            </div>

            <div class="grid grid-cols-3 gap-4">
                <div v-for="book in bookData" :key="book.id"
                    class="flex-col max-h-[375px] bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">

                    <img class="h-1/2 w-full" :src="book.image_path === null ? imagePath : `${url}/${book.image_path}`"
                        alt="Not Found" />

                    <div class="p-5 flex flex-col justify-between">

                        <div class="mb-6!">
                            <h5 class=" text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ book.title
                                }}
                            </h5>

                        </div>


                        <div class="flex flex-col">
                            <div class="">
                                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{ book.desc.length > 55 ?
                                    book.desc.substring(0, 55) + '...' : book.desc }}</p>

                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>