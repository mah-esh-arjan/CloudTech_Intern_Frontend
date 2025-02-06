<script setup>
import SlotChild from '../Prop/SlotChild.vue';
</script>

<template>
    <SlotChild>
        <template #header>
            <div>
                <header class="custom">Custom header</header>
            </div>
        </template>
    </SlotChild>

</template>

<style scoped>
.custom {
    background-color: #28a745 !important;
    color: white !important;
    

}
</style>