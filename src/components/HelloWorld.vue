<template>
  <v-container>
    <form @submit.prevent="handleSubmit(onSubmit)">
      <Field
        name="time_start"
        rules="regex:^([01]?[0-9]|2[0-3]):[0-5][0-9]$"
        v-slot="{ field, errors }"
      >
        <input-time
          v-bind="field"
          v-model="data.time_start"
          label="Nhập giá trị"
        ></input-time>
        <span v-if="errors.length" class="error">{{ errors[0] }}</span>
      </Field>
      <Field
        name="time_end"
        rules="regex:^([01]?[0-9]|2[0-3]):[0-5][0-9]$"
        v-slot="{ field, errors }"
      >
        <input-time
          v-bind="field"
          v-model="data.time_end"
          label="Nhập giá trị"
        ></input-time>
        <span v-if="errors.length" class="error">{{ errors[0] }}</span>
      </Field>
      <v-btn type="submit" color="primary">Submit</v-btn>
    </form>
    <div>
      <p>
        Giá trị nhập vào sau khi định dạng: {{ data.time_start }} ||
        {{ data.time_end }}
      </p>
    </div>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { Field, useForm } from "vee-validate";
import * as yup from "yup";
import InputTime from "./InputTime.vue";

// Define validation schema
const schema = yup.object({
  time_start: yup
    .string()
    .nullable() // Allow empty values
    .test(
      "is-valid-time",
      "Thời gian không hợp lệ",
      (value) => !value || /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value)
    ), // Validate only if value exists
  time_end: yup
    .string()
    .nullable() // Allow empty values
    .test(
      "is-valid-time",
      "Thời gian không hợp lệ",
      (value) => !value || /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value)
    ), // Validate only if value exists
});

// Initialize form
const { handleSubmit } = useForm({
  validationSchema: schema,
});

const data = ref({
  time_start: "",
  time_end: "",
}); // Ensure this is a string

// Handle form submission
const onSubmit = (values) => {
  console.log("Form submitted with values:", values);
};
</script>

<style scoped>
.v-container {
  max-width: 400px;
  margin: auto;
  text-align: center;
}

.error {
  color: red;
  font-size: 0.875rem;
  margin-top: 4px;
}
</style>
