<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';

const users = ref([]);


const getUsers = async () => {

    try {
        const response = await axios.get('http://127.0.0.1:8000/api/users');
        users.value = response.data;
        console.log(users.value);
    }

    catch (err) {
        console.error("Error:", err)
    }
}

const handleDelete = async (id) => {

    try {
        const response = await axios.delete(`http://127.0.0.1:8000/api/users/${id}`);

        console.log(response.data);

        if (response.data.status === 200) {
            alert(`${id} has been soft deleted`);
            window.location.reload();
        }

    }

    catch (err) {
        console.error("Error:", err);
    }

}

onMounted(getUsers)

</script>

<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th> Id</th>
                    <th> user</th>
                    <th>Button</th>
                </tr>
            </thead>
            <tbody>

                <tr v-for="user in users" :key="user.id">
                    <td>{{ user.id }}</td>
                    <td>{{ user.name }}</td>
                    <td> <button
                            class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                            @click="handleDelete(user.id)"> Delete</button></td>
                </tr>
            </tbody>
        </table>
    </div>

</template>