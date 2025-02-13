<script setup>
import axios from 'axios';
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const students = ref(null);
const token = localStorage.getItem('token');

const fetchStudents = async () => {

    try {
        const response = await axios.get('http://127.0.0.1:8000/api/students-list/',
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

        students.value = response.data.data;
    }
    catch (err) {
        console.error('error:', err);
    }

}

const deleteStudent = async (id) => {
    try {
        const response = await axios.delete(`http://127.0.0.1:8000/api/student-delete/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        if (response.data.status === 200) {
            alert(`${response.data.data.name} has been deleted`);

        }
        fetchStudents();

    }

    catch (err) {
        console.error('error', err);
    }

}

const showStudent = (id) => {

    router.push(`/student-edit/${id}`);

}

onMounted(fetchStudents);

</script>


<template>
    <div class="container mx-auto p-4">
        <h1 class="text-2xl font-bold mb-4">List of Students</h1>
        <table class="min-w-full bg-white border border-gray-200">
            <thead>
                <tr class="bg-gray-100">
                    <th class="px-4 py-2 border">Student ID</th>
                    <th class="px-4 py-2 border">Name</th>
                    <th class="px-4 py-2 border">Image</th>
                    <th class="px-4 py-2 border">Age</th>
                    <th class="px-4 py-2 border">Gender</th>
                    <th class="px-4 py-2 border">Course</th>
                    <th class="px-4 py-2 border">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="student in students" :key="student.student_id" class="hover:bg-gray-50">
                    <td class="px-4 py-2 border">{{ student.student_id }}</td>
                    <td class="px-4 py-2 border">{{ student.name }}</td>
                    <td class="px-4 py-2 border">
                        <img :src="`/images/${student.image_path}`" alt="Not Found"
                            class="w-16 h-16 object-cover mx-auto">
                    </td>
                    <td class="px-4 py-2 border">{{ student.age }}</td>
                    <td class="px-4 py-2 border">{{ student.gender }}</td>
                    <td class="px-4 py-2 border">{{ student.course }}</td>
                    <td class="px-4 py-2 border flex space-x-2">
                        <button class="px-4 py-2 bg-blue-500 text-white rounded"
                            @click="showStudent(student.student_id)">Edit</button>
                        <button class="px-4 py-2 bg-red-500 text-white rounded"
                            @click="deleteStudent(student.student_id)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>