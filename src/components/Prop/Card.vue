<script setup>
const props = defineProps({
    title: String,
    desc: String,
    id: Number,
    Read: Boolean,
});

</script>

<template>

    <div class="relative">
        <div class="max-w-sm mb-6 p-6 bg-transparent flex flex-col gap-5 " :style="{ padding: '32px' }">

            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white group-hover:text-stone-700">{{ id }}. {{ title }}</h5>
            <p class="font-normal text-gray-700 dark:text-gray-400 group-hover:text-stone-700">{{ desc }}</p>

        </div>
    </div>

</template>