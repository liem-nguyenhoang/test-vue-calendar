<template>
  <v-container>
    <v-text-field
      v-model="inputValue"
      label="Nhập giá trị"
      @blur="formatTime"
      @input="validateInput"
    ></v-text-field>
  </v-container>
</template>

<script setup>
import { ref } from "vue";

const inputValue = ref("");

const validateInput = () => {
  // Chỉ cho phép nhập số và dấu :
  let value = inputValue.value.replace(/[^0-9:]/g, "");

  // Chỉ cho phép một dấu :
  const colonCount = (value.match(/:/g) || []).length;
  if (colonCount > 1) {
    value = value.substring(0, value.lastIndexOf(":"));
  }

  inputValue.value = value;
};

const formatTime = () => {
  // Nếu length > 5, không định dạng nữa
  if (inputValue.value.length >= 5) {
    return;
  }

  let value = inputValue.value.replace(/[^0-9:]/g, ""); // Chỉ giữ lại số và dấu :

  if (!value.includes(":")) {
    value = value.replace(/\D/g, ""); // Loại bỏ ký tự không phải số nếu không có dấu :
    const length = value.length;

    if (length === 1) {
      inputValue.value = `0${value}:00`;
    } else if (length === 2) {
      inputValue.value = `${value}:00`;
    } else if (length === 3) {
      inputValue.value = `${value[0]}${value[1]}:${value[2]}0`;
    } else if (length === 4) {
      inputValue.value = `${value.substring(0, 2)}:${value.substring(2, 4)}`;
    } else {
      inputValue.value = value;
    }
  } else {
    const parts = value.split(":");
    if (parts.length === 2) {
      let [hours, minutes] = parts;
      hours = hours.padStart(2, "0");
      if (minutes.length === 1) {
        minutes = minutes + "0"; // Thêm 0 vào cuối nếu chỉ có 1 chữ số
      }
      inputValue.value = `${hours}:${minutes}`;
    }
  }
};
</script>

<style scoped>
.v-container {
  max-width: 400px;
  margin: auto;
  text-align: center;
}
</style>
