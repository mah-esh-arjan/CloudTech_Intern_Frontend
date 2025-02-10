<script setup>
import { computed, ref } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import BlogProp from './BlogProp.vue';
import { useStore } from 'vuex';

const route = useRoute();

const currentId = Number(route.params.id);

const store = useStore();
const card = computed(() => store.getters.cardId(currentId));

console.log(currentId);
console.log(card);


</script>

<template>

    <div v-if="card">
        <BlogProp :id="card.id" :title="card.title" :desc="card.description" :Read="card.Read" />
    </div>
    <div v-else>
       <h1> The id was not found in the array</h1> 
        </div>
</template>
