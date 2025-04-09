<template>
  <div class="shipping-form">
    <!-- Header -->
    <div class="shipping-form__header">
      <h2 class="shipping-form__title">消費者指名/検索消費者データ一覧</h2>
      <v-btn
        class="shipping-form__add-btn"
        variant="text"
        prepend-icon="mdi-plus"
        >新規登録</v-btn
      >
    </div>

    <!-- Form -->
    <v-form class="shipping-form__form">
      <v-row>
        <!-- Left Column -->
        <v-col cols="12" md="6">
          <div class="shipping-form__field">
            <label class="shipping-form__label">地域</label>
            <v-select
              v-model="location"
              :items="locations"
              placeholder="地域を選択してください"
              variant="outlined"
              density="compact"
              class="shipping-form__input"
            />
          </div>

          <div class="shipping-form__field">
            <label class="shipping-form__label">ログインID</label>
            <v-text-field
              v-model="loginId"
              placeholder="ID（半角英数字・記号）"
              variant="outlined"
              density="compact"
              class="shipping-form__input"
            />
          </div>

          <div class="shipping-form__field">
            <label class="shipping-form__label">メールアドレス</label>
            <v-text-field
              v-model="email"
              placeholder="mail@address.co.jp"
              variant="outlined"
              density="compact"
              class="shipping-form__input"
            />
          </div>

          <div class="shipping-form__field">
            <label class="shipping-form__label">購置</label>
            <v-row>
              <v-col>
                <v-checkbox
                  v-model="isShippingAssigned"
                  label="消費者指名"
                  color="primary"
                  class="shipping-form__checkbox"
                />
              </v-col>
              <v-col>
                <v-checkbox
                  v-model="isShippingProhibited"
                  label="救急消費者"
                  color="primary"
                  class="shipping-form__checkbox"
                />
              </v-col>
            </v-row>
          </div>
        </v-col>

        <!-- Right Column -->
        <v-col cols="12" md="6">
          <div class="shipping-form__field">
            <label class="shipping-form__label">利用者名</label>
            <v-text-field
              v-model="userName"
              placeholder="利用者名を入力"
              variant="outlined"
              density="compact"
              class="shipping-form__input"
            />
          </div>

          <div class="shipping-form__field">
            <label class="shipping-form__label">施設利用者ID</label>
            <v-text-field
              v-model="facilityUserId"
              placeholder="ID（半角英数字・記号）"
              variant="outlined"
              density="compact"
              class="shipping-form__input"
            />
          </div>

          <div class="shipping-form__field">
            <label class="shipping-form__label">施設</label>
            <v-text-field
              v-model="facility"
              placeholder="施設名を入力"
              variant="outlined"
              density="compact"
              class="shipping-form__input"
            />
          </div>
        </v-col>
      </v-row>

      <!-- Buttons -->
      <div class="shipping-form__actions">
        <v-btn
          class="shipping-form__btn shipping-form__btn--cancel"
          variant="outlined"
          >キャンセル</v-btn
        >
        <v-btn
          class="shipping-form__btn shipping-form__btn--save"
          color="primary"
          >保存</v-btn
        >
      </div>
    </v-form>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Form data
const location = ref("");
const loginId = ref("");
const email = ref("");
const userName = ref("");
const facilityUserId = ref("");
const facility = ref("");
const isShippingAssigned = ref(true);
const isShippingProhibited = ref(false);

// Locations for the dropdown
const locations = ref([
  "地域を選択してください",
  "北海道",
  "東北",
  "関東",
  "中部",
  "近畿",
  "中国",
  "四国",
  "九州",
]);
</script>

<style lang="scss">
.shipping-form {
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;

  &__header {
    display: flex;
    flex-wrap: nowrap; /* Ngăn không cho các phần tử xuống dòng */
    align-items: center; /* Căn giữa theo chiều dọc */
    justify-content: space-between; /* Đẩy tiêu đề và nút ra hai bên */
    margin-bottom: 15px;
    width: 100%; /* Đảm bảo header chiếm toàn bộ chiều rộng */
  }

  &__title {
    font-size: 20px;
    font-weight: 500;
    color: #333;
    margin: 0; /* Xóa margin mặc định của h2 */
    line-height: 1; /* Đảm bảo chiều cao dòng không làm lệch căn chỉnh */
    flex-shrink: 0; /* Ngăn tiêu đề bị co lại */
  }

  &__add-btn {
    color: #1976d2;
    font-size: 14px;
    height: 24px !important; /* Đảm bảo nút không quá cao */
    padding: 0 8px !important; /* Giảm padding để nút nhỏ gọn */
    display: inline-flex; /* Đảm bảo nút hiển thị đúng trong flex */
    align-items: center;
    flex-shrink: 0; /* Ngăn nút bị co lại */
    .v-btn__prepend {
      margin-right: 4px; /* Khoảng cách giữa icon và chữ */
    }
  }

  &__form {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &__field {
    margin-bottom: 15px;
  }

  &__label {
    display: block;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 5px;
    color: #333;
  }

  &__input {
    .v-field {
      border-radius: 4px;
      border: 1px solid #ccc !important;
      font-size: 14px;
    }

    .v-field__input {
      padding: 8px 12px;
      min-height: 36px !important;
    }

    .v-field--focused {
      border-color: #1976d2 !important;
    }
  }

  &__checkbox {
    .v-label {
      font-size: 14px;
      color: #333;
    }

    .v-selection-control {
      min-height: 24px;
    }
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
  }

  &__btn {
    font-size: 14px;
    padding: 6px 16px;
    height: 36px;
    border-radius: 18px;

    &--cancel {
      color: #333;
      border: 1px solid #ccc;
      background: transparent;
    }

    &--save {
      background-color: #1976d2;
      color: #fff;
      border: none;
    }
  }
}
</style>
