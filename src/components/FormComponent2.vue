<template>
  <Form @submit="onSubmit" v-slot="{ resetForm }">
    <div v-for="(item, index) in items" :key="index">
      <label :for="'fie_a_' + index">Field A {{ index + 1 }}:</label>
      <Field
        :id="'fie_a_' + index"
        :name="`items[${index}].fie_a`"
        v-model="item.fie_a"
        placeholder="HH:mm"
        @input="clearError(index, 'fie_a')"
        @blur="validateField(index)"
      />
      <span v-if="errors[index]?.fie_a" class="error">{{
        errors[index].fie_a
      }}</span>

      <label :for="'fie_b_' + index">Field B {{ index + 1 }}:</label>
      <Field
        :id="'fie_b_' + index"
        :name="`items[${index}].fie_b`"
        v-model="item.fie_b"
        placeholder="HH:mm"
        @input="clearError(index, 'fie_b')"
        @blur="validateField(index)"
      />
      <span v-if="errors[index]?.fie_b" class="error">{{
        errors[index].fie_b
      }}</span>

      <button type="button" @click="remove(index, resetForm)">Xóa</button>
    </div>

    <button type="button" @click="add()">Thêm item</button>
    <button type="submit">Submit</button>
  </Form>
</template>

<script setup>
import { ref } from "vue";
import { Form, Field } from "vee-validate";

// Danh sách items
const items = ref([
  { fie_a: "", fie_b: "" },
  { fie_a: "", fie_b: "" },
]);

// Lưu error messages
const errors = ref([]);

// Chuyển "HH:mm" thành số phút để so sánh
const timeToMinutes = (time) => {
  if (!time) return null;
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

// Rule kiểm tra fie_a & fie_b (Chỉ validate khi rời khỏi ô nhập)
const validateField = (index) => {
  const fieA = items.value[index].fie_a;
  const fieB = items.value[index].fie_b;

  let errorA = "";
  let errorB = "";
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

  // Nếu cả hai rỗng, không báo lỗi
  if (!fieA && !fieB) {
    errors.value[index] = { fie_a: "", fie_b: "" };
    return;
  }

  if (fieA && !timeRegex.test(fieA))
    errorA = "Field A phải có định dạng HH:mm!";
  if (fieB && !timeRegex.test(fieB))
    errorB = "Field B phải có định dạng HH:mm!";

  if (!fieA && fieB) errorA = "Vui lòng nhập Field A!";
  if (!fieB && fieA) errorB = "Vui lòng nhập Field B!";

  if (fieA && fieB && timeToMinutes(fieA) > timeToMinutes(fieB)) {
    errorA = "Field A phải nhỏ hơn hoặc bằng Field B!";
  }

  errors.value[index] = { fie_a: errorA, fie_b: errorB };
};

// Xóa lỗi ngay khi nhập
const clearError = (index, field) => {
  if (errors.value[index]) {
    errors.value[index][field] = "";
  }
};

// Thêm một object mới vào danh sách
const add = () => {
  items.value.push({ fie_a: "", fie_b: "" });
  errors.value.push({});
};

// Xóa item khỏi danh sách và reset lỗi
const remove = (index, resetForm) => {
  items.value.splice(index, 1);
  errors.value.splice(index, 1);
  resetForm({ values: items.value });
};

// Xử lý khi submit
const onSubmit = (values) => {
  // Kiểm tra nếu có lỗi
  const hasError = errors.value.some((err) => err.fie_a || err.fie_b);

  if (hasError) {
    alert("Vui lòng sửa tất cả lỗi trước khi submit!");
    return;
  }

  console.log("Form hợp lệ!", values);
  alert("Form đã được submit thành công!");
};
</script>

<style scoped>
.error {
  color: red;
  font-size: 14px;
}
</style>
