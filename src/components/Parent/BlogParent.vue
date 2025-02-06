<script setup>
import { ref } from 'vue';

import BlogProp from '../Prop/BlogProp.vue';

const handleTitleAction = (title) => {
    console.log(title + "Called Logger ");
}

</script>

<template>

    <BlogProp title="ChatGPT " @handleTitle="handleTitleAction"
        desc="A versatile AI chatbot developed by OpenAI, designed for natural language understanding, coding assistance" />
    <BlogProp title="Deepseek" @handleTitle="handleTitleAction"
        desc="An AI model focused on reasoning, problem-solving, and code generation, optimized for complex technical tasks" />

</template>