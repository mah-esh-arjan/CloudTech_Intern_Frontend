<script setup>
import axios from 'axios';
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';

const token = localStorage.getItem('token');

const studentData = ref(null);

const route = useRoute();
const id = Number(route.params.id);

const showStudent = async () => {

    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/students-show/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        )
        studentData.value = response.data.data
        console.log(studentData);
    }
    catch (err) {
        console.error('Error:', err);
    }
}

const handleEdit = () => {
    console.log(studentData);
}

onMounted(showStudent);

</script>


<template>
    <div class="p-4 max-w-md mx-auto border rounded-lg shadow-md flex flex-col gap-6" v-if="studentData">
        <h2 class="text-xl font-bold mb-4">Editing Form</h2>

        <form @submit.prevent="handleEdit" class="space-y-4">
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
        <h1> Student doesnt exists</h1>
    </div>

</template>
