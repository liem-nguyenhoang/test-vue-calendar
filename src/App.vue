<template>
  <Form @submit="submit1" v-slot="{ handleReset }">
    <App1 />
    <App2 />
    <App3 />
    <v-btn type="submit">submit1</v-btn>
    <v-btn @click="handleReset">clear</v-btn>
  </Form>

  <Form @submit="submit2" v-slot="{ handleReset }">
    <App1 />
    <App3 />
    <v-btn type="submit">submit2</v-btn>
    <v-btn @click="handleReset">clear</v-btn>
  </Form>
</template>

<script setup>
import { Form } from "vee-validate";
import App1 from "./components/App1.vue";
import App2 from "./components/App2.vue";
import App3 from "./components/App3.vue";

const submit1 = (values) => {
  alert("Submit 1:\n" + JSON.stringify(values, null, 2));
};

const submit2 = (values) => {
  alert("Submit 2:\n" + JSON.stringify(values, null, 2));
};
</script>
