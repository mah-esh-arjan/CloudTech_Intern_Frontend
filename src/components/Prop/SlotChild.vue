<script setup>


</script>

<template>
    <header class="default">
        <slot name="header">Default header</slot>
    </header>
    <main class="default">
        <slot>Default paragraph </slot>
    </main>

    <footer class="default">
        <slot name="footer">Default Footer</slot>
    </footer>
</template>

<style scoped>
.default {
    background-color: #007bff;
    color: white;
    padding: 10px;
    border-radius: 5px;
    text-align: center;
    margin-bottom: 20px;
}
</style>