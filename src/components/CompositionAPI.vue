<script setup>

import { ref, computed } from 'vue';

const status = ref('Active');
const toStatus = ref('Logging');

const changeStatus = () => {

    if (status.value === 'Active') {
        status.value = 'Logging';
        toStatus.value = 'Inactive'
    }
    else if (status.value === 'Logging') {
        status.value = 'Inactive';
        toStatus.value = 'Active';
    }
    else {
        status.value = 'Active';
        toStatus.value = 'Logging';
    }

}

const buttonClass = computed(() => {

    if (toStatus.value === 'Logging') {
        return 'btn blue';
    }
    else if (toStatus.value === 'Inactive') {
        return 'btn red';
    }
    else {
        return 'btn green';
    }
});

</script>


<template>

    <div>
        <h1 class="font-bold">User's Status</h1>
        <!-- Checking if else if else -->
        <!-- Could be computed property, just a reminder about using if else -->
        <div>
            <h1 v-if="status === 'Active'">
                Eminem is <span class="bg-green-500 text-white"> Active </span>
            </h1>
            <h1 v-else-if="status === 'Logging'">
                Eminem is <span class="bg-blue-500 text-white"> Logging </span>
            </h1>
            <h1 v-else>
                Eminem is <span class="bg-red-500 text-white"> Inactive </span>
            </h1>
        </div>

    </div>


    <!-- A ternary operater changed into using computed property instead -->
    <span>Change status to <button @click="changeStatus" :class="buttonClass"> {{ toStatus }}
        </button> </span>


</template>

<style scoped>
.btn {
    padding: 2px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.red {
    background-color: red;
    color: white;
}

.red:hover {
    background-color: darkred;
}

.blue {
    background-color: blue;
    color: white;
}

.blue:hover {
    background-color: darkblue;
}

.green {
    background-color: green;
    color: white;
}

.green:hover {
    background-color: darkgreen;
}
</style>