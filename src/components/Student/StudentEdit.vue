<script setup>
import router from '@/views/router';
import axios from 'axios';
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import ErrorSlot from '../Prop/ErrorSlot.vue';
import Compressor from 'compressorjs';



const token = localStorage.getItem('token');

const url = 'http://127.0.0.1:8000/images';

const studentData = ref({
    name: '',
    age: null,
    gender: '',
    course: '',
    image: null,
});

const route = useRoute();
const id = Number(route.params.id);
const previewUrl = ref("");

const showStudent = async () => {

    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/students-show/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        )
        if (response.data.status === 404) {
            studentData.value = null;
        }
        studentData.value = response.data.data
    }
    catch (err) {
        console.error('Error:', err);
    }
}

const handleEdit = async () => {

    try {
        console.log(token);
        console.log(studentData);

        const formData = new FormData();
        formData.append('name', studentData.value.name)
        formData.append('gender', studentData.value.gender)
        formData.append('age', studentData.value.age)
        formData.append('course', studentData.value.course)
        formData.append('image', studentData.value.image)
        formData.append('_method', 'PUT');

        const response = await axios.post(`http://127.0.0.1:8000/api/student-update/${id}`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                }
            });

        if (response.data.status === 201) {
            alert('Student have been update successfully');

            router.push(`/student/student-details/${id}`);

        }

    }
    catch (err) {
        console.error('Error:', err);
    }

}

const imageUpload = (event) => {

    const file = event.target.files[0];

    if (file) {

        new Compressor(file, {
            quality: 0.6,
            success(result) {
                studentData.value.image = result;
                previewUrl.value = URL.createObjectURL(result);
            }
        })
    }

}

onMounted(showStudent);

</script>


<template>
    <section id="section" class="flex justify-center w-1/2">
        <div class="p-4 w-96 mx-auto border rounded-lg shadow-md flex flex-col gap-6" v-if="studentData">
            <h2 class="text-xl font-bold mb-4">Editing Form</h2>

            <form @submit.prevent="handleEdit" class="space-y-4">


                <div class="flex flex-col items-center gap-[10px] my-auto mb-[20px]">
                    <span class="text-gray-700 underline">Profile Picutre:</span>
                    <img :src="previewUrl || `${url}/${studentData.image_path}`" alt="Not Found"
                        class="rounded-full h-[200px] w-[200px] bg-gray-300 object-cover">
                </div>

                <div class="p-4 mt-4">
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload
                        file</label>
                    <input
                        class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        id="file_input" type="file" @change="imageUpload" />
                </div>


                <label class="block">
                    <span class="text-gray-700">Username:</span>
                    <input type="text" v-model="studentData.name" class="w-full p-2 border rounded" />

                </label>

                <label class="block">
                    <span class="text-gray-700">Age:</span>
                    <input type="text" v-model="studentData.age" class="w-full p-2 border rounded" />

                </label>

                <label class="block">
                    <span class="text-gray-700">Gender:</span>

                    <div class="flex">
                        <input type="radio" id="male" value="M" v-model="studentData.gender" />
                        <label for="male"> Male</label>
                    </div>

                    <div class="flex">
                        <input type="radio" id="female" value="F" v-model="studentData.gender" />
                        <label for="female"> Female</label>
                    </div>

                    <input type="radio" id="other" value="O" v-model="studentData.gender" />
                    <label for="other"> Other</label>
                </label>

                <div class="mt-8 mb-8">
                    <select v-model="studentData.course" class="w-full p-2 border rounded bg-white text-gray-700 ">
                        <option value="Commerce">Commerce</option>
                        <option value="Science">Science</option>
                    </select>
                </div>

                <button type="submit" class="bg-blue-500 text-white p-2 rounded w-full "> Submit </button>
            </form>
        </div>
        <div v-else>
            <ErrorSlot>
                <template #code>404</template>
                <template #message> Student doesn't exist</template>
            </ErrorSlot>
        </div>
    </section>
</template>
