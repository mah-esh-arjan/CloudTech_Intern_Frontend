<template>

    <div v-for="(card, index) in dummyCard " :key="card.title">
        <div v-if="currentId === (index + 1)">
            <BlogProp :id="index + 1" :title="card.title" :desc="card.description" />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import BlogProp from './BlogProp.vue';

const route = useRoute();

const currentId = Number(route.params.id);
const props = defineProps(['title', 'desc', 'id']);

const dummyCard = ref([
    {
        "title": "Learn Vue Router",
        "description": "Understand how to set up and use Vue Router for navigation in a Vue.js application."
    },
    {
        "title": "Introduction to Vue.js",
        "description": "A beginner-friendly guide to understanding Vue.js and its core concepts."
    },
    {
        "title": "State Management with Vuex",
        "description": "Learn how to manage global state in a Vue.js application using Vuex."
    },
    {
        "title": "Working with Slots in Vue",
        "description": "Explore how to use slots for creating flexible and reusable components in Vue.js."
    },
]);

console.log(currentId)

</script>