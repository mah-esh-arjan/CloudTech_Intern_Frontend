<script setup>
import router from '@/views/router';
import axios from 'axios';
import { computed, onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import ErrorSlot from '../Prop/ErrorSlot.vue';
import Compressor from 'compressorjs';


const url = 'http://127.0.0.1:8000/BookImages';

const bookData = ref({
    title: '',
    desc: '',
    image_path: null,
});

const route = useRoute();
const id = Number(route.params.id);
const previewUrl = ref("");

const showBook = async () => {

    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/book-show/${id}`)
        if (response.data.code === 404) {
            bookData.value = null;
        }
        bookData.value = response.data.data
    }
    catch (err) {
        console.error('Error:', err);
    }
}

const hanleBookEdit = async () => {


    try {
        const formData = new FormData();
        formData.append('title', bookData.value.title)
        formData.append('desc', bookData.value.desc)
        formData.append('image_path', bookData.value.image_path)
        formData.append('_method', 'PUT');

        const response = await axios.post(`http://127.0.0.1:8000/api/book-update/${id}`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

        if (response.data.status === 201) {
            
            alert('Book has been update successfully');
            router.push('/books-list');

        }
    }
    catch (err) {
        console.error('Error:', err);
    }

}

// Image upload with validation:

const imageUpload = (event) => {

    const file = event.target.files[0];

    if (file) {
        new Compressor(file, {
            quality: 0.6,
            success(result) {
                bookData.value.image_path = result;
                previewUrl.value = URL.createObjectURL(result);
            }
        })
    }

}

onMounted(showBook);

</script>


<template>
    <div class="p-4 max-w-md mx-auto border rounded-lg shadow-md flex flex-col gap-6" v-if="bookData">
        <h2 class="text-xl font-bold mb-4">Editing Books</h2>

        <form @submit.prevent="hanleBookEdit" class="space-y-4">


            <div class="flex flex-col items-center gap-[10px] my-auto mb-[20px]">
                <span class="text-gray-700 underline">Book Photo:</span>
                <img :src="previewUrl || `${url}/${bookData.image_path}`" alt="Not Found"
                    class="h-[200px] w-[200px] bg-gray-300ee">
            </div>

            <div class="p-4 mt-4">
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload
                    file</label>
                <input
                    class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    id="file_input" type="file" @change="imageUpload" />

            </div>


            <label class="block">
                <span class="text-gray-700">Title:</span>
                <input type="text" v-model="bookData.title" class="w-full p-2 border rounded" />

            </label>

            <label class="block">
                <span class="text-gray-700">Description:</span>
                <textarea type="text" v-model="bookData.desc" class="w-full p-2 border rounded"> </textarea>

            </label>

            <button type="submit" class="bg-blue-500 text-white p-2 rounded w-full "> Submit </button>
        </form>
    </div>
    <div v-else>
        <ErrorSlot>
            <template #code>404</template>
            <template #message> Books was not found in the database</template>
        </ErrorSlot>
    </div>

</template>
