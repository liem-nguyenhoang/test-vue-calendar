<template>
  <div class="firefighter-management">
    <div class="firefighter-management__header">
      <h2 class="firefighter-management__title">消防指令台/救急消防士 一覧</h2>
      <button class="firefighter-management__new-btn">
        <span class="firefighter-management__new-btn-icon">+</span>
        新規登録
      </button>
    </div>

    <div class="firefighter-management__search-form">
      <div class="firefighter-management__form-row">
        <div class="firefighter-management__form-group">
          <label class="firefighter-management__label">地域</label>
          <div class="firefighter-management__select-wrapper">
            <select class="firefighter-management__select">
              <option>地域を選択してください</option>
            </select>
          </div>
        </div>
        <div class="firefighter-management__form-group">
          <label class="firefighter-management__label">利用者名</label>
          <input
            type="text"
            class="firefighter-management__input"
            placeholder="利用者名を入力"
          />
        </div>
      </div>

      <div class="firefighter-management__form-row">
        <div class="firefighter-management__form-group">
          <label class="firefighter-management__label">ログインID</label>
          <input
            type="text"
            class="firefighter-management__input"
            placeholder="ID（半角英数字・記号）"
          />
        </div>
        <div class="firefighter-management__form-group">
          <label class="firefighter-management__label">地域利用者ID</label>
          <input
            type="text"
            class="firefighter-management__input"
            placeholder="ID（半角英数字・記号）"
          />
        </div>
      </div>

      <div class="firefighter-management__form-row">
        <div class="firefighter-management__form-group">
          <label class="firefighter-management__label">メールアドレス</label>
          <input
            type="email"
            class="firefighter-management__input"
            placeholder="mail@address.co.jp"
          />
        </div>
        <div class="firefighter-management__form-group">
          <label class="firefighter-management__label">施設</label>
          <input
            type="text"
            class="firefighter-management__input"
            placeholder="施設名を入力"
          />
        </div>
      </div>

      <div class="firefighter-management__form-row">
        <div class="firefighter-management__form-group">
          <label class="firefighter-management__label">職種</label>
          <div class="firefighter-management__checkbox-group">
            <label class="firefighter-management__checkbox-label">
              <input
                type="checkbox"
                class="firefighter-management__checkbox"
                checked
              />
              <span class="firefighter-management__checkbox-text"
                >消防指令台</span
              >
            </label>
            <label class="firefighter-management__checkbox-label">
              <input type="checkbox" class="firefighter-management__checkbox" />
              <span class="firefighter-management__checkbox-text"
                >救急消防士</span
              >
            </label>
          </div>
        </div>
        <div
          class="firefighter-management__form-group firefighter-management__form-group--buttons"
        >
          <button class="firefighter-management__clear-btn">クリア</button>
          <button class="firefighter-management__search-btn">検索</button>
        </div>
      </div>
    </div>

    <div class="firefighter-management__results">
      <div class="firefighter-management__results-header">
        <div class="firefighter-management__results-count">
          検索結果 <span>10</span> 件
        </div>
        <div class="firefighter-management__results-display">
          <span>表示件数</span>
          <div class="firefighter-management__display-select">
            <select class="firefighter-management__count-select">
              <option>10件</option>
            </select>
          </div>
        </div>
      </div>

      <div class="firefighter-management__table-container">
        <table class="firefighter-management__table">
          <thead class="firefighter-management__table-head">
            <tr>
              <th class="firefighter-management__th">ID</th>
              <th class="firefighter-management__th">ユーザー名</th>
              <th class="firefighter-management__th">職種</th>
              <th class="firefighter-management__th">編集</th>
              <th class="firefighter-management__th">削除</th>
            </tr>
          </thead>
          <tbody class="firefighter-management__table-body">
            <tr
              v-for="(user, index) in users"
              :key="user.id"
              class="firefighter-management__tr"
            >
              <td class="firefighter-management__td">{{ user.id }}</td>
              <td class="firefighter-management__td">
                {{ user.name }} ({{ user.title }})
              </td>
              <td class="firefighter-management__td">{{ user.role }}</td>
              <td class="firefighter-management__td">
                <button class="firefighter-management__edit-btn">
                  <svg
                    class="firefighter-management__icon"
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                  >
                    <path
                      d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
                    />
                  </svg>
                </button>
              </td>
              <td class="firefighter-management__td">
                <button class="firefighter-management__delete-btn">
                  <svg
                    class="firefighter-management__icon"
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                  >
                    <path
                      d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="firefighter-management__pagination">
        <button
          class="firefighter-management__pagination-btn firefighter-management__pagination-btn--prev"
        >
          <svg
            class="firefighter-management__pagination-icon"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </button>
        <button
          class="firefighter-management__pagination-btn firefighter-management__pagination-btn--active"
        >
          1
        </button>
        <button class="firefighter-management__pagination-btn">2</button>
        <span class="firefighter-management__pagination-ellipsis">...</span>
        <button class="firefighter-management__pagination-btn">10</button>
        <button
          class="firefighter-management__pagination-btn firefighter-management__pagination-btn--next"
        >
          <svg
            class="firefighter-management__pagination-icon"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const users = ref([
  {
    id: "00001",
    name: "山田 太郎",
    title: "サービス運営責任者",
    role: "消防指令台",
  },
  {
    id: "00002",
    name: "山田 太郎",
    title: "サービス運営責任者",
    role: "消防指令台",
  },
  {
    id: "00003",
    name: "田中 花子",
    title: "緊急通報管理者",
    role: "救急消防士",
  },
  {
    id: "00004",
    name: "田中 花子",
    title: "緊急通報管理者",
    role: "救急消防士",
  },
  {
    id: "00005",
    name: "山田 太郎",
    title: "サービス運営責任者",
    role: "消防指令台",
  },
  {
    id: "00006",
    name: "山田 太郎",
    title: "サービス運営責任者",
    role: "消防指令台",
  },
  {
    id: "00007",
    name: "山田 太郎",
    title: "サービス運営責任者",
    role: "消防指令台",
  },
  {
    id: "00008",
    name: "山田 太郎",
    title: "サービス運営責任者",
    role: "消防指令台",
  },
  {
    id: "00009",
    name: "山田 太郎",
    title: "サービス運営責任者",
    role: "消防指令台",
  },
  {
    id: "00010",
    name: "山田 太郎",
    title: "サービス運営責任者",
    role: "消防指令台",
  },
]);
</script>

<style lang="scss">
.firefighter-management {
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  padding: 20px;
  font-family: sans-serif;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  &__title {
    font-size: 18px;
    font-weight: 500;
    margin: 0;
  }

  &__new-btn {
    display: flex;
    align-items: center;
    padding: 8px 16px;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;

    &-icon {
      margin-right: 5px;
      font-size: 16px;
    }
  }

  &__search-form {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
  }

  &__form-row {
    display: flex;
    margin-bottom: 15px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__form-group {
    flex: 1;
    margin-right: 20px;

    &:last-child {
      margin-right: 0;
    }

    &--buttons {
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;
    }
  }

  &__label {
    display: block;
    margin-bottom: 8px;
    font-size: 14px;
  }

  &__input {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
  }

  &__select-wrapper {
    position: relative;

    &::after {
      content: "";
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 5px solid #666;
      pointer-events: none;
    }
  }

  &__select {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    appearance: none;
    background: white;
  }

  &__checkbox-group {
    display: flex;
  }

  &__checkbox-label {
    display: flex;
    align-items: center;
    margin-right: 20px;
    cursor: pointer;

    &:last-child {
      margin-right: 0;
    }
  }

  &__checkbox {
    margin-right: 6px;
  }

  &__clear-btn {
    padding: 8px 20px;
    background-color: #f3f3f3;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-right: 10px;
    cursor: pointer;
  }

  &__search-btn {
    padding: 8px 20px;
    background-color: #0066b3;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  &__results {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  &__results-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  }

  &__results-count {
    font-size: 14px;

    span {
      font-weight: bold;
    }
  }

  &__results-display {
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  &__display-select {
    position: relative;
    margin-left: 10px;

    &::after {
      content: "";
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 5px solid #666;
      pointer-events: none;
    }
  }

  &__count-select {
    padding: 5px 25px 5px 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    appearance: none;
    background: white;
  }

  &__table-container {
    overflow-x: auto;
  }

  &__table {
    width: 100%;
    border-collapse: collapse;
  }

  &__th {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #ddd;
    font-weight: normal;
    font-size: 14px;
  }

  &__tr {
    &:nth-child(even) {
      background-color: #f9f9f9;
    }

    &:hover {
      background-color: #f0f0f0;
    }
  }

  &__td {
    padding: 12px 15px;
    border-bottom: 1px solid #ddd;
    font-size: 14px;
  }

  &__edit-btn,
  &__delete-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
  }

  &__icon {
    fill: #666;
  }

  &__pagination {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  &__pagination-btn {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 5px;
    border: 1px solid #ddd;
    border-radius: 50%;
    background-color: white;
    cursor: pointer;

    &--active {
      background-color: #333;
      color: white;
      border-color: #333;
    }

    &--prev,
    &__pagination-btn--next {
      background-color: #f3f3f3;
    }
  }

  &__pagination-icon {
    fill: #666;
  }

  &__pagination-ellipsis {
    display: flex;
    align-items: center;
    margin: 0 5px;
  }
}
</style>
