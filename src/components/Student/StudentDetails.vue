<script setup>
import { useRoute, useRouter } from 'vue-router';
import { onMounted, reactive, ref } from 'vue';
import axios from 'axios';


const router = useRouter();
const url = 'http://127.0.0.1:8000/images';

const route = useRoute();
const id = Number(route.params.id);
const token = localStorage.getItem('token');

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
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

        )
        console.log(response)
        if (response.data.status === 404) {
            studentData.value = null;
        }
        studentData.value = response.data.student
        bookCount.value = response.data.count
    }
    catch (err) {
        console.error('Error:', err);
    }
}

const handleEdit = (id) => {
    router.push(`/student/student-edit/${id}`);
}

const handleBookDetails = (id) => {
    router.push(`/student/student-books/${id}`);

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


                <div class="flex justify-between border-b pb-2">
                    <span class="font-medium">Number of books taken:</span>
                    <span class="text-gray-900 font-semibold">{{ bookCount }}</span>
                </div>

                <div class="flex justify-between border-b pb-2">
                    <button @click="handleEdit(studentData.student_id)"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit</button>

                    <button @click="handleBookDetails(studentData.student_id)"
                        class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Books</button>
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