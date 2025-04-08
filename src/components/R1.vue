<template>
  <div class="user-list">
    <div class="user-list__header">
      <div class="user-list__search-result">検索結果 {{ totalItems }}件</div>
      <div class="user-list__display-count">
        表示件数
        <select class="user-list__select" v-model="itemsPerPage">
          <option value="10">10件</option>
          <option value="20">20件</option>
          <option value="50">50件</option>
        </select>
      </div>
    </div>

    <table class="user-list__table">
      <thead class="user-list__thead">
        <tr>
          <th class="user-list__th">ID</th>
          <th class="user-list__th">ユーザー名</th>
          <th class="user-list__th">職種</th>
          <th class="user-list__th">編集</th>
          <th class="user-list__th">削除</th>
        </tr>
      </thead>
      <tbody class="user-list__tbody">
        <tr class="user-list__tr" v-for="user in users" :key="user.id">
          <td class="user-list__td">{{ user.id }}</td>
          <td class="user-list__td">{{ user.name }} ({{ user.role }})</td>
          <td class="user-list__td">{{ user.position }}</td>
          <td class="user-list__td">
            <button class="user-list__edit-btn">
              <span class="user-list__edit-icon">✏️</span>
            </button>
          </td>
          <td class="user-list__td">
            <button class="user-list__delete-btn">
              <span class="user-list__delete-icon">🗑️</span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="user-list__pagination">
      <button class="user-list__pagination-btn user-list__pagination-prev">
        <span>&lt;</span>
      </button>
      <div class="user-list__pagination-pages">
        <button
          v-for="page in totalPages"
          :key="page"
          :class="[
            'user-list__pagination-page',
            { 'user-list__pagination-page--active': page === currentPage },
          ]"
        >
          {{ page }}
        </button>
        <span v-if="totalPages > 3" class="user-list__pagination-ellipsis"
          >...</span
        >
        <button v-if="totalPages > 3" class="user-list__pagination-page">
          {{ totalPages }}
        </button>
      </div>
      <button class="user-list__pagination-btn user-list__pagination-next">
        <span>&gt;</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const currentPage = ref(1);
const itemsPerPage = ref(10);
const totalItems = ref(10);
const totalPages = ref(10);

const users = ref([
  {
    id: "00001",
    name: "山田 太郎",
    role: "サービス運営責任者",
    position: "消防指令台",
  },
  {
    id: "00002",
    name: "山田 太郎",
    role: "サービス運営責任者",
    position: "消防指令台",
  },
  {
    id: "00003",
    name: "田中 花子",
    role: "緊急通報管理者",
    position: "救急消防士",
  },
  {
    id: "00004",
    name: "田中 花子",
    role: "緊急通報管理者",
    position: "救急消防士",
  },
  {
    id: "00005",
    name: "山田 太郎",
    role: "サービス運営責任者",
    position: "消防指令台",
  },
  {
    id: "00006",
    name: "山田 太郎",
    role: "サービス運営責任者",
    position: "消防指令台",
  },
  {
    id: "00007",
    name: "山田 太郎",
    role: "サービス運営責任者",
    position: "消防指令台",
  },
  {
    id: "00008",
    name: "山田 太郎",
    role: "サービス運営責任者",
    position: "消防指令台",
  },
  {
    id: "00009",
    name: "山田 太郎",
    role: "サービス運営責任者",
    position: "消防指令台",
  },
  {
    id: "00010",
    name: "山田 太郎",
    role: "サービス運営責任者",
    position: "消防指令台",
  },
]);
</script>

<style lang="scss">
.user-list {
  max-width: 1200px;
  margin: 0 auto;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  font-family: sans-serif;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  &__search-result {
    font-size: 18px;
    font-weight: bold;
  }

  &__display-count {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__select {
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 20px;
    appearance: none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 10px center;
    background-size: 12px;
    padding-right: 30px;
    cursor: pointer;
  }

  &__table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }

  &__thead {
    border-bottom: 1px solid #eee;
  }

  &__th {
    text-align: left;
    padding: 12px 16px;
    font-weight: normal;
    color: #666;
  }

  &__tbody {
    .user-list__tr {
      border-bottom: 1px solid #eee;

      &:hover {
        background-color: #f9f9f9;
      }
    }
  }

  &__td {
    padding: 16px;
    color: #333;
  }

  &__edit-btn,
  &__delete-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 6px;
    border-radius: 4px;

    &:hover {
      background-color: #f0f0f0;
    }
  }

  &__edit-icon,
  &__delete-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
  }

  &__pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
  }

  &__pagination-pages {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  &__pagination-btn {
    background: none;
    border: 1px solid #eee;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
      background-color: #f5f5f5;
    }
  }

  &__pagination-page {
    background: none;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
      background-color: #f5f5f5;
    }

    &--active {
      background-color: #333;
      color: white;

      &:hover {
        background-color: #222;
      }
    }
  }

  &__pagination-ellipsis {
    color: #666;
  }
}
</style>
