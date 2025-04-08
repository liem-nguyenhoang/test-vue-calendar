<template>
  <div class="form-container">
    <h2>Form Validation on Submit Only</h2>
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="email">Email:</label>
        <input
          id="email"
          v-model="email"
          name="email"
          placeholder="Nhập email"
        />
        <span class="error">{{ errors.email }}</span>
      </div>

      <div class="form-group">
        <label for="password">Password:</label>
        <input
          id="password"
          v-model="password"
          type="password"
          name="password"
          placeholder="Nhập mật khẩu"
        />
        <span class="error">{{ errors.password }}</span>
      </div>

      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import { useForm } from "vee-validate";
import * as yup from "yup";

export default {
  name: "FormExample",
  setup() {
    // Định nghĩa schema validation với Yup
    const schema = yup.object({
      email: yup.string().email("Email không hợp lệ"),
      password: yup.string(),
    });

    // Sử dụng useForm với validateOnMount: false và validateOnInput: false
    const { handleSubmit, errors, values } = useForm({
      validationSchema: schema,
      initialValues: {
        email: "",
        password: "",
      }, // Giá trị khởi tạo
      validateOnMount: false, // Tắt validate khi khởi tạo
      validateOnInput: false, // Tắt validate khi nhập liệu
      validateOnChange: false, // Tắt validate khi thay_atomic đổi giá trị
    });

    // Gán giá trị cho các field
    const email = values.email;
    const password = values.password;

    // Hàm xử lý submit
    const onSubmit = handleSubmit((formValues) => {
      console.log("Form submitted successfully:", formValues);
      alert("Form submitted: " + JSON.stringify(formValues));
    });

    return { onSubmit, errors, email, password };
  },
};
</script>

<style scoped>
.form-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.error {
  color: red;
  font-size: 12px;
  display: block;
  margin-top: 5px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
