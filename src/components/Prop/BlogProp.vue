<template>

    <div class="!mb-5">
        <div
            class="!block max-w-sm mb-6 p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ id }}. {{ title }}</h5>
            <p class="font-normal text-gray-700 dark:text-gray-400">{{ desc }}</p>
            <div class="flex justify-between">
                <button @click="handleLog"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Log it </button>

                <button @click="toggleReadStatus" class="mt-2 px-4 py-2 text-white rounded"
                    :class="read ? 'bg-green-500' : 'bg-red-500'">
                    {{ Read ? "Mark as Unread" : "Mark as Read" }}
                </button>

                <button class="bg-yellow-500 p-2" @click="toggleReadAndLog">Log</button>

                <span :class="Read ? 'bg-blue-500 p-2' : 'bg-red-500 p-2'"> {{ Read ? 'Read' : 'Not Read' }} </span>
            </div>

        </div>
    </div>

</template>

<script setup>
import { useStore } from 'vuex';

const store = useStore();

const toggleReadStatus = () => {
    store.commit('toggleRead', props.id)
}

const toggleReadAndLog  = () => {
    store.dispatch('toggleReadStatusAndLog', props.id);
}

const emit = defineEmits(['handleTitle']);
const props = defineProps({
    title: String,
    desc: String,
    id: Number,
    Read: Boolean,
});


const handleLog = () => {
    emit('handleTitle', props.title)
}


</script>
