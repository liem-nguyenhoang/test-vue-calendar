<template>
  <v-text-field
    v-model="phone.value.value"
    :counter="7"
    :error-messages="phone.errorMessage.value"
    label="Phone Number"
  ></v-text-field>

  <v-text-field
    v-model="email.value.value"
    :error-messages="email.errorMessage.value"
    label="E-mail"
  ></v-text-field>
</template>

<script setup>
import { useField } from "vee-validate";

const phone = useField(
  "phone",
  (value) => {
    if (/^[0-9-]{7,}$/.test(value)) return true;

    return "Phone number needs to be at least 7 digits.";
  },
  {
    validateOnValueUpdate: false,
  }
);
const email = useField(
  "email",
  (value) => {
    if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true;

    return "Must be a valid e-mail.";
  },
  {
    validateOnValueUpdate: false,
  }
);
</script>
