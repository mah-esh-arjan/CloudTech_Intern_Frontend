<script setup>
import { onBeforeMount, onBeforeUnmount, onBeforeUpdate, onMounted, onUnmounted, onUpdated, ref } from 'vue';

const counter = ref(0);

onBeforeMount(() => {
    alert("Component is going to mount");
});

onMounted(() => {
    console.log('Counter & Button is rendered');
});

onBeforeUpdate(() => {
    console.log(alert('Update has been batched'));

});

onUpdated(() => {
    console.log(counter.value + ' has been updated');
});

onBeforeUnmount(() => {
    clearInterval(interval);
});

onUnmounted(() => {
    alert('Component is going to unmount');
})

const increment = () => counter.value++;
</script>

<template>
    {{ counter }} <button @click="increment"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add</button>



</template>
