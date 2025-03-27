<!-- NotificationPage.vue -->
<template>
  <div class="notification-page">
    <div class="notification-page__container">
      <div class="notification-page__header">
        <i class="notification-page__icon">i</i>
        <h1 class="notification-page__title">お知らせ</h1>
      </div>

      <div class="notification-page__list">
        <div
          v-for="(notification, index) in notifications"
          :key="index"
          class="notification-page__item"
        >
          <div class="notification-page__item-date">
            {{ notification.date }}
          </div>
          <div class="notification-page__item-title">
            {{ notification.title }}
          </div>
          <div class="notification-page__item-arrow">›</div>
        </div>
      </div>

      <button class="notification-page__login-button">ログインする</button>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "NotificationPage",
  setup() {
    const notifications = ref([
      {
        date: "2025/00/00",
        title: "緊急通報コンソールテスト：メンテナンスのお知らせ",
      },
      {
        date: "2025/00/00",
        title: "お知らせタイトルがここに入ります。",
      },
      {
        date: "2025/00/00",
        title: "お知らせタイトルがここに入ります。",
      },
    ]);

    return { notifications };
  },
});
</script>

<style lang="scss">
.notification-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 1rem;

  &__container {
    width: 100%;
    max-width: 400px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  &__header {
    display: flex;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid #e0e0e0;
  }

  &__icon {
    display: inline-block;
    width: 24px;
    height: 24px;
    background-color: #007bff;
    color: white;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 0.5rem;
    font-style: italic;
    font-weight: bold;
  }

  &__title {
    font-size: 1.25rem;
    font-weight: bold;
    color: #333;
  }

  &__list {
    background-color: white;
  }

  &__item {
    display: flex;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid #f0f0f0;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #f9f9f9;
    }

    &-date {
      color: #888;
      margin-right: 1rem;
      font-size: 0.875rem;
      min-width: 80px;
    }

    &-title {
      flex-grow: 1;
      color: #333;
      font-size: 0.975rem;
    }

    &-arrow {
      color: #888;
      font-size: 1.5rem;
      font-weight: bold;
    }
  }

  &__login-button {
    width: 100%;
    padding: 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 0 0 8px 8px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #0056b3;
    }
  }
}
</style>
