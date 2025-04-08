<template>
  <Form @submit="onSubmit" v-slot="{ errors: formErrors }">
    <div v-for="(item, index) in items" :key="index">
      <label :for="'fie_a_' + index">Field A {{ index + 1 }}:</label>
      <Field
        :id="'fie_a_' + index"
        v-model="item.fie_a"
        :name="`items[${index}].fie_a`"
        placeholder="HH:mm"
        :rules="{ time_validation: [items[index].fie_b, 'fie_a'] }"
      />
      <span class="error">{{ formErrors[`items[${index}].fie_a`] }}</span>

      <label :for="'fie_b_' + index">Field B {{ index + 1 }}:</label>
      <Field
        :id="'fie_b_' + index"
        v-model="item.fie_b"
        :name="`items[${index}].fie_b`"
        placeholder="HH:mm"
        :rules="{ time_validation: [items[index].fie_a, 'fie_b'] }"
      />
      <span class="error">{{ formErrors[`items[${index}].fie_b`] }}</span>

      <button type="button" @click="remove(index)">Xóa</button>
    </div>

    <button type="button" @click="add()">Thêm item</button>
    <button type="submit">Submit</button>
  </Form>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Form, Field, defineRule } from "vee-validate";

// Interface cho object trong mảng items
interface FormItem {
  fie_a: string;
  fie_b: string;
}

// Type cho tham số của rule
type TimeValidationParams = [string, "fie_a" | "fie_b"];

// Định nghĩa rule với TypeScript
defineRule<string, TimeValidationParams>(
  "time_validation",
  (
    value: string,
    [otherFieldValue, fieldName]: TimeValidationParams
  ): string | true => {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

    const timeToMinutes = (time: string): number | null => {
      if (!time) return null;
      const [hours, minutes] = time.split(":").map(Number);
      return hours * 60 + minutes;
    };

    // Kiểm tra bắt buộc nhập
    if (!value) {
      return `${fieldName === "fie_a" ? "Field A" : "Field B"} là bắt buộc`;
    }

    // Kiểm tra định dạng
    if (!timeRegex.test(value)) {
      return `${
        fieldName === "fie_a" ? "Field A" : "Field B"
      } phải có định dạng HH:mm (00:00-23:59)`;
    }

    // Kiểm tra fie_a <= fie_b (chỉ kiểm tra khi là fie_a)
    if (fieldName === "fie_a" && value && otherFieldValue) {
      const fieAMinutes = timeToMinutes(value);
      const fieBMinutes = timeToMinutes(otherFieldValue);
      if (
        fieAMinutes !== null &&
        fieBMinutes !== null &&
        fieAMinutes > fieBMinutes
      ) {
        return "Field A phải nhỏ hơn hoặc bằng Field B";
      }
    }

    return true;
  }
);

// Khai báo mảng items với kiểu Ref<FormItem[]>
const items = ref<FormItem[]>([
  { fie_a: "", fie_b: "" },
  { fie_a: "", fie_b: "" },
]);

// Thêm một object mới vào mảng
const add = (): void => {
  items.value.push({ fie_a: "", fie_b: "" });
};

// Xóa item khỏi mảng
const remove = (index: number): void => {
  items.value.splice(index, 1);
};

// Xử lý khi submit với kiểu cho mảng object
const onSubmit = (values: { items: FormItem[] }): void => {
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
