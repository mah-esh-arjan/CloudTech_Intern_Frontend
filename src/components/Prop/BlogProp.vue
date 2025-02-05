<script setup>
defineProps(['title', 'desc'])
</script>

<template>

    <div class="!mb-5">
        <a href="#"
            class="!block max-w-sm mb-6 p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ title }}</h5>
            <p class="font-normal text-gray-700 dark:text-gray-400">{{ desc }}</p>
        </a>
    </div>

</template>