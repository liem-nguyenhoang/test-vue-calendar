<template>
  <v-text-field
    v-model="localValue"
    :label="label"
    @input="filterInput"
    @blur="formatTime"
  ></v-text-field>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "Enter time",
  },
});

const emit = defineEmits(["update:modelValue"]);

const localValue = ref(props.modelValue);

// Watch for changes in the parent-provided modelValue and update the local value
watch(
  () => props.modelValue,
  (newValue) => {
    localValue.value = newValue;
  }
);

// Watch for changes in localValue and emit updates immediately
watch(localValue, (newValue) => {
  emit("update:modelValue", newValue);
});

// Filter input to allow only numbers and a colon
const filterInput = () => {
  localValue.value = localValue.value.replace(/[^0-9:]/g, ""); // Remove invalid characters
};

// Format the time input to a standard format (e.g., HH:mm) on blur
const formatTime = () => {
  let value = localValue.value.replace(/[^0-9:]/g, ""); // Remove invalid characters

  if (!value.includes(":")) {
    // If no colon is present, format as HH:mm
    value = value.replace(/\D/g, ""); // Remove non-digit characters
    const length = value.length;

    if (length === 1) {
      localValue.value = `0${value}:00`;
    } else if (length === 2) {
      localValue.value = `${value}:00`;
    } else if (length === 3) {
      localValue.value = `${value[0]}${value[1]}:${value[2]}0`;
    } else if (length === 4) {
      localValue.value = `${value.substring(0, 2)}:${value.substring(2, 4)}`;
    } else {
      localValue.value = value;
    }
  } else {
    // If a colon is present, ensure proper formatting
    const parts = value.split(":");
    if (parts.length === 2) {
      let [hours, minutes] = parts;
      hours = hours.padStart(2, "0"); // Ensure hours are two digits
      if (minutes.length === 1) {
        minutes = minutes + "0"; // Ensure minutes are two digits
      }
      localValue.value = `${hours}:${minutes}`;
    }
  }

  emit("update:modelValue", localValue.value); // Emit the formatted value
};
</script>

<style scoped></style>
