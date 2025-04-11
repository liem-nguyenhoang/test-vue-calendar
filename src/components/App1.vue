<template>
  <v-text-field
    v-model="name.value.value"
    :counter="10"
    :error-messages="name.errorMessage.value"
    label="Name"
  ></v-text-field>
</template>

<script setup>
import { useField } from "vee-validate";

const name = useField(
  "name",
  (value) => {
    if (value?.length >= 2) return true;

    return "Name needs to be at least 2 characters.";
  },
  {
    validateOnValueUpdate: false,
  }
);
</script>
