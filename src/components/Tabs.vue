<script setup>

import optionsAPI from './optionsAPI.vue';
import CompositionAPI from './CompositionAPI.vue';
import { ref } from 'vue';

const tabs = {
    optionsAPI: optionsAPI,
    CompositionAPI: CompositionAPI
};
const activeTab = ref(tabs.CompositionAPI);

</script>

<template>
    <div class="container">
        <div class="tabs">
            <button @click="activeTab = tabs.CompositionAPI"
                :class="activeTab.value === tabs.CompositionAPI ? 'button-active' : 'button-inactive'">
                Composition API
            </button>
            <button @click="activeTab = tabs.optionsAPI"
                :class="activeTab.value === tabs.optionsAPI ? 'button-active' : 'button-inactive'">
                Options API
            </button>
        </div>

        <div class="tab-content">
            <component :is="activeTab"></component>
        </div>
    </div>
</template>

<style scoped>
.container {
    max-width: 600px;
    margin: 30px auto;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
}

.tabs {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 20px;
}

.tabs button {
    padding: 10px 20px;
    border: none;
    background-color: #f0f0f0;
    color: #333;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    transition: background 0.3s, color 0.3s;
}

.tabs .button-active {
    background-color: #007bff !important;
    color: white;
    font-weight: bold;
}

.tabs .button-inactive {
    background-color: #f0f0f0;
    color: #333;
}

.tab-content {
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background: #f9f9f9;
}
</style>