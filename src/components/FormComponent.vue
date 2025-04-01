<template>
  <Form @submit="onSubmit" v-slot="{ resetForm }">
    <div v-for="(item, index) in items" :key="index">
      <label :for="'fie_a_' + index">Field A {{ index + 1 }}:</label>
      <Field
        :id="'fie_a_' + index"
        :name="`items[${index}].fie_a`"
        v-model="item.fie_a"
        :rules="() => customRule(index, 'fie_a')"
        placeholder="HH:mm"
        @blur="resetErrors(resetForm)"
      />
      <ErrorMessage :name="`items[${index}].fie_a`" class="error" />

      <label :for="'fie_b_' + index">Field B {{ index + 1 }}:</label>
      <Field
        :id="'fie_b_' + index"
        :name="`items[${index}].fie_b`"
        v-model="item.fie_b"
        :rules="() => customRule(index, 'fie_b')"
        placeholder="HH:mm"
        @blur="resetErrors(resetForm)"
      />
      <ErrorMessage :name="`items[${index}].fie_b`" class="error" />

      <button type="button" @click="remove(index, resetForm)">Xóa</button>
    </div>

    <button type="button" @click="add()">Thêm item</button>
    <button type="submit">Submit</button>
  </Form>
</template>

<script setup>
import { ref } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";

// Danh sách items
const items = ref([
  { fie_a: "", fie_b: "" },
  { fie_a: "", fie_b: "" },
]);

// Helper: Chuyển "HH:mm" thành số phút để so sánh
const timeToMinutes = (time) => {
  if (!time) return null;
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

// Rule kiểm tra fie_a & fie_b
const customRule = (index, field) => {
  const fieA = items.value[index].fie_a;
  const fieB = items.value[index].fie_b;

  // Nếu cả hai đều rỗng, không báo lỗi
  if (!fieA && !fieB) return true;

  // Kiểm tra định dạng HH:mm
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  if (fieA && !timeRegex.test(fieA)) return "Field A phải có định dạng HH:mm!";
  if (fieB && !timeRegex.test(fieB)) return "Field B phải có định dạng HH:mm!";

  // Kiểm tra bắt buộc nhập cả hai
  if (field === "fie_b" && fieA && !fieB) return "Vui lòng nhập Field B!";
  if (field === "fie_a" && fieB && !fieA) return "Vui lòng nhập Field A!";

  // Kiểm tra fie_a phải nhỏ hơn hoặc bằng fie_b
  if (fieA && fieB && timeToMinutes(fieA) > timeToMinutes(fieB)) {
    return field === "fie_a" ? "Field A phải nhỏ hơn hoặc bằng Field B!" : true;
  }

  return true;
};

// Reset lỗi khi xóa hết giá trị
const resetErrors = (resetForm) => {
  const allEmpty = items.value.every((item) => !item.fie_a && !item.fie_b);
  if (allEmpty) resetForm({ values: items.value });
};

// Thêm một object mới vào danh sách
const add = () => {
  items.value.push({ fie_a: "", fie_b: "" });
};

// Xóa item khỏi danh sách và reset lỗi
const remove = (index, resetForm) => {
  items.value.splice(index, 1);
  resetErrors(resetForm);
};

// Xử lý khi submit
const onSubmit = (values) => {
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
