<script setup>
import axios from 'axios';
import Compressor from 'compressorjs';
import { ref } from 'vue';

const bookData = ref({
    title: '',
    desc: '',
    image_path: null

});

const token = localStorage.getItem('token');

const previewUrl = ref("");

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

const handleBookSubmit = async () => {

    try {
        console.log(bookData.value)

        const response = await axios.post('http://127.0.0.1:8000/api/book-create',
            bookData.value,
            {
                headers: {
                    'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}`
                }
            }
        )

        if (response.data.status === 201) {
            alert('Book has been created');
        }

    }

    catch (err) {
        console.error("Error:", err);

    }

}




</script>

<template>
    <section id="section" class="flex justify-center">
        <div class="p-4 max-w-md mx-auto border rounded-lg shadow-md flex flex-col gap-6 w-1/2">
            <h2 class="text-xl font-bold mb-4">Add a Book</h2>

            <form @submit.prevent="handleBookSubmit" class="space-y-4">

                <div class="flex flex-col items-center gap-[10px] my-auto mb-[20px]">
                    <span class="text-gray-700 underline">Book Photo:</span>
                    <img :src="previewUrl" alt="Not Found">
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

    </section>
</template>