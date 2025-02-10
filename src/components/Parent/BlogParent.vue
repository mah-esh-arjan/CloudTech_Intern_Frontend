<script setup>
import { ref, computed } from 'vue';
import BlogProp from '../Prop/BlogProp.vue';
import { RouterLink } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const allCards = computed(() => store.getters.allCards);

const handleTitleAction = (title) => {
    console.log(title + " Called Logger ");
}
</script>

<template>

    <div v-for="card in allCards" :key="card.id">
        <BlogProp :id="card.id" :title="card.title" :desc="card.description" @handleTitle="handleTitleAction" :Read="card.Read" />
        <RouterLink :to="`/blogs/${card.id}`">Read more</RouterLink>

    </div>

</template>