<script setup>
import { useRoute } from 'vue-router';
import { onMounted, reactive, ref } from 'vue';
import axios from 'axios';



const url = 'http://127.0.0.1:8000/images';

const route = useRoute();
const id = Number(route.params.id);

const studentData = ref({
    name: '',
    age: null,
    gender: '',
    course: '',
    image: null,
});

const bookCount = ref();

const showStudentDetails = async () => {

    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/student-book/${id}`,

        )
        console.log(response)
        if (response.data.status === 404) {
            studentData.value = null;
        }
        studentData.value = response.data.student
        bookCount.value = response.data.Count
    }
    catch (err) {
        console.error('Error:', err);
    }
}

onMounted(showStudentDetails);

</script>

<template>
    <section id="section" class="flex justify-center w-1/2">
        <div class="p-6 w-96 mx-auto border rounded-2xl shadow-lg bg-white flex flex-col gap-6 hover:shadow-xl transition-shadow duration-300"
            v-if="studentData">

            <h2 class="text-2xl font-bold text-gray-800 text-center">Student Profile</h2>

            <!-- Profile Picture -->
            <div class="flex flex-col items-center gap-2">
                <span class="text-gray-500 text-sm">Profile Picture</span>
                <img :src="previewUrl || `${url}/${studentData.image_path}`" alt="Profile"
                    class="rounded-full h-32 w-32 bg-gray-200 object-cover shadow-md border">
            </div>

            <!-- Student Details -->
            <div class="space-y-2 text-gray-700">
                <div class="flex justify-between border-b pb-2">
                    <span class="font-medium">Username:</span>
                    <span class="text-gray-900 font-semibold">{{ studentData.name }}</span>
                </div>

                <div class="flex justify-between border-b pb-2">
                    <span class="font-medium">Age:</span>
                    <span class="text-gray-900 font-semibold">{{ studentData.age }}</span>
                </div>

                <div class="flex justify-between border-b pb-2">
                    <span class="font-medium">Gender:</span>
                    <span class="text-gray-900 font-semibold">{{ studentData.gender }}</span>
                </div>

                <div class="flex justify-between border-b pb-2">
                    <span class="font-medium">Course:</span>
                    <span class="text-gray-900 font-semibold">{{ studentData.course }}</span>
                </div>


                <div class="flex justify-between">
                    <span class="font-medium">Number of books taken:</span>
                    <span class="text-gray-900 font-semibold">{{ bookCount }}</span>
                </div>
            </div>

        </div>

        <div v-else>
            <ErrorSlot>
                <template #code>404</template>
                <template #message> Student doesn't exist</template>
            </ErrorSlot>
        </div>
    </section>
</template>