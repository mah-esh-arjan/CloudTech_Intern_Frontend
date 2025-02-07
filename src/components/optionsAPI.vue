<script>
export default {

  data() {

    return {
      name: 'Slim Shady',
      status: 'active',
      statusNumber: 1,
      numbers: ['One', 'To', 'Two'],
      link: 'https://www.google.com/',
      message: '',
      showData: true,
      isButtonDisabled: true,
    }
  },
  methods: {
    toggleStatus() {
      if (this.status === 'active') {
        this.status = 'pending';
      }
      else if (this.status === 'pending') {
        this.status = 'inactive';
      }
      else {
        this.status = 'active';
      }
    },
    toggleShowData() {
      this.showData = !this.showData
    }

  }
}

</script>

<template>

  <div>
    <!-- Checking if else if else -->
    <h1 v-if="status === 'active'"> {{ name }} is active </h1>
    <h1 v-else-if="status === 'pending'"> {{ name }} is logging in </h1>
    <h1 v-else> {{ name }} is inactive </h1>
  </div>

  <div>
    <!-- Loop with for like .map in react with key as well -->
    <p>Using for loop with key</p>
    <ul>
      <li v-for="number in numbers" :key="number">{{ number }}</li>
    </ul>
  </div>

  <div>
    <!-- one way binding putting reusable variables -->
    <a v-bind:href="link">Google</a>
    <a :href="link">:href="link" works</a>
    <a :href="link" @click.prevent>@click.prevent disables click</a>
    <button v-bind:disabled="isButtonDisabled"> Enabled Button</button>

  </div>

  <div>
    <!-- Event listerner using on:click -->
    <button v-on:click="toggleStatus">Change Status from {{ status }}</button>
    <button @click="toggleStatus">@click also works </button>
  </div>

  <div>
    <input v-model="message" />
    <p>Message: {{ message }}</p>
  </div>

  <div v-show="showData"> It wil show if showData is true</div>
  <button @click="toggleShowData" class="bg-blue-500 text-white p-1">Toggle showData </button>

</template>

<style scoped></style>