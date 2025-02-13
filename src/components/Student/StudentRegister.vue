<script setup>

import { computed, ref, onMounted } from 'vue';
import { required, minLength, helpers } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import axios from 'axios';
import Compressor from 'compressorjs';


const formData = ref({
    name: '',
    password: '',
    age: null,
    gender: 'M',
    course: 'Commerce',
    image: null,
});

const imageUpload = (event) => {

    const file = event.target.files[0];

    if (file) {
        console.log('File MIME type:', file.type);
        
        console.log('File Size:', file.size);
        
        console.log(file.name);

        new Compressor(file,{
            quality: 0.6,
            success(result){
                formData.value.image = result;
                
                console.log("compressed file size:", result.size);
                console.log("compressed file type:", formData.value.image.type);
                console.log("compressed file type:", formData.value.image.name);
            }       
        })
    }

}


const lessAge = (value) => {
    return value < 99;
}

const allowedMime = ['image/jpg', 'image/png','image/jpeg']

const mimeType = (value) => {
    return value ? allowedMime.includes(value.type) : false;
}

const rules = computed(() => {

    return {
        name: { required },
        password: {
            required,
            minLength: minLength(6)
        },
        age: {
            required,
            lessAge: helpers.withMessage(' Age must be less than 99', lessAge),
        },
        image: {
            mimeType: helpers.withMessage('Image must be either png or jpg', mimeType)
        }
    }

});

const $v = useVuelidate(rules, formData)




const submitForm = async () => {
    const isValid = await $v.value.$validate();

    if (!isValid) {
        return alert('Form is not valid');
    }

    try {
        const response = await axios.post('http://127.0.0.1:8000/api/student-register',
            formData.value,
            { headers: { 'Content-Type': 'multipart/form-data' } })
        if (response.data.status === 409) {
            return alert('Username has been taken');
        }
        alert('Student has been registered successfully');
        console.log(response.data);
    }

    catch (err) {
        console.log('error', err);
    }
    console.log('Form submitted:', formData.value);
};

</script>

<template>
    <div class="p-4 max-w-md mx-auto border rounded-lg shadow-md flex flex-col gap-6">
        <h2 class="text-xl font-bold mb-4">Registration Form</h2>
        <form @submit.prevent="submitForm" class="space-y-4">

            <label class="block">
                <span class="text-gray-700">Username:</span>
                <input type="text" v-model="formData.name" class="w-full p-2 border rounded" />
                <span v-if="$v.name.$error">
                    {{ $v.name.$errors[0].$message }}
                </span>
            </label>

            <label class="block">
                <span class="text-gray-700">Password:</span>
                <input type="password" v-model="formData.password" class="w-full p-2 border rounded" />
                <span v-if="$v.password.$error" class="bg-red-500">
                    {{ $v.password.$errors[0].$message }}
                </span>
            </label>

            <label class="block">
                <span class="text-gray-700">Age:</span>
                <input type="number" v-model="formData.age" class="w-full p-2 border rounded" />
                <span v-if="$v.age.$error">
                    {{ $v.age.$errors[0].$message }}
                </span>
            </label>

            <label class="block">
                <span class="text-gray-700">Gender:</span>

                <div class="flex">
                    <input type="radio" id="male" value="M" v-model="formData.gender" />
                    <label for="male"> Male</label>
                </div>

                <div class="flex">
                    <input type="radio" id="female" value="F" v-model="formData.gender" />
                    <label for="female"> Female</label>
                </div>

                <input type="radio" id="other" value="O" v-model="formData.gender" />
                <label for="other"> Other</label>
            </label>

            <div class="mt-8 mb-8">
                <select v-model="formData.course" class="w-full p-2 border rounded bg-white text-gray-700 ">
                    <option value="Commerce">Commerce</option>
                    <option value="Science">Science</option>
                </select>
            </div>

            <div class="p-4 mt-4">

                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload
                    file</label>
                <input
                    class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    id="file_input" type="file" @change="imageUpload" />

                <span v-if="$v.image.$error" class="text-red-500"> {{ $v.image.$errors[0].$message }} </span>
            </div>


            <button type="submit" class="bg-blue-500 text-white p-2 rounded w-full">
                Submit
            </button>
        </form>
    </div>
</template>
