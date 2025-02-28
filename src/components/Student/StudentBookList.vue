<script setup>
import axios from 'axios';
import { computed, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';


const books = ref();
const url = 'http://127.0.0.1:8000/BookImages';
const imagePath = '/images/Kitab.png';
const lms = useStore();

const token = localStorage.getItem('token');

const router = useRouter();


const user = localStorage.getItem('user');

const parsedStudent = JSON.parse(user);
const count = computed(() => lms.getters.getCount);
const countLeft = ref(3 - count.value);

watch(count, (newCount) => {
    countLeft.value = 3 - newCount;
});

const id = parsedStudent.student_id;


const cart = ref({ arrayId: [] });

const handleRent = async () => {
    try {
        const response = await axios.post(`http://127.0.0.1:8000/api/student-book/${id}`,
            cart.value,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        if (response.data.status === 201) {
            alert('Books have been rented succesfully');
        }
    }

    catch (err) {
        console.error("Error:", err);
    }

}

const fetchBooks = async () => {

    try {

        const response = await axios.get('http://127.0.0.1:8000/api/student-book-list',
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

        if (response.data.status = 200) {
            books.value = response.data.data;
        }

    }
    catch (err) {
        console.error("Error: ", err);
    }
}
const handleCart = (id) => {
    if (countLeft.value > 0) {
        if (!cart.value.arrayId.includes(id)) {
            cart.value.arrayId.push(id);
            countLeft.value--;
            console.log(countLeft.value);
            console.log(cart.value.arrayId);
        }
    }
    else {
        alert('Cart is full');
    }
}


onMounted(fetchBooks);
</script>

<template>

    <section id="section" class="flex justify-center flex-col ">
        <div>
            {{ count }} {{ countLeft }}
        </div>
        <div>

            <h2
                class="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight mb-8! mx-auto! border border-black-500 p-2">
                Student Book List</h2>
            <div>
                <div class="flex flex-row">
                    <span>Items : </span>
                    <h3 v-for="(item, index) in cart.arrayId" :key="index">{{ item }} , </h3>

                </div>
                <button @click="handleRent"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Rent it</button>
            </div>

            <div class="grid grid-cols-4 gap-4">
                <div v-for="book in books" :key="book.id"
                    class="flex-col max-h-[375px] bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">

                    <img class="h-1/2 w-full" :src="book.image_path === null ? imagePath : `${url}/${book.image_path}`"
                        alt="Not Found" />

                    <div class="px-5 py-2 flex flex-col justify-between">

                        <div class="mb-6!">
                            <h5 class=" text-2xl font-bold tracking-tight text-gray-900 dark:text-white"> <span> {{
                                book.id
                                    }}. </span>{{ book.title }}
                            </h5>

                        </div>

                        <div class="flex flex-col">
                            <div class="">
                                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{ book.desc.length > 55 ?
                                    book.desc.substring(0, 55) + '...' : book.desc }}</p>

                            </div>

                        </div>
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded max-w-fit"
                            @click="handleCart(book.id)">Cart</button>

                    </div>
                </div>

            </div>
        </div>

    </section>
</template>