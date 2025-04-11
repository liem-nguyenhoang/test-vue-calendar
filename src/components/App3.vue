<template>
  <v-select
    v-model="select.value.value"
    :error-messages="select.errorMessage.value"
    :items="items"
    label="Select 1"
  ></v-select>

  <v-checkbox
    v-model="checkbox.value.value"
    :error-messages="checkbox.errorMessage.value"
    label="Option 1"
    type="checkbox"
    value="1"
  ></v-checkbox>
</template>

<script setup>
import { ref } from "vue";
import { useField } from "vee-validate";

const select = useField(
  "select",
  (value) => {
    if (value) return true;

    return "Select an item.";
  },
  {
    validateOnValueUpdate: false,
  }
);
const checkbox = useField(
  "checkbox",
  (value) => {
    if (value === "1") return true;

    return "Must be checked.";
  },
  {
    validateOnValueUpdate: false,
  }
);

const items = ref(["Item 1", "Item 2", "Item 3", "Item 4"]);
</script>
