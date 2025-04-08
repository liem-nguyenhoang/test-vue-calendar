<template>
  <v-container class="user-table">
    <div class="user-table__header">
      <div class="user-table__results">
        検索結果 <span class="user-table__count">{{ totalItems }}</span> 件
      </div>
      <div class="user-table__display-control">
        表示件数
        <v-select
          v-model="itemsPerPage"
          :items="[10]"
          variant="outlined"
          density="compact"
          class="user-table__select"
          hide-details
        >
          <template v-slot:selection="{ item }"> {{ item.value }}件 </template>
          <template v-slot:item="{ item }"> {{ item.value }}件 </template>
        </v-select>
      </div>
    </div>

    <v-table class="user-table__data">
      <thead>
        <tr>
          <th class="user-table__column-header">ID</th>
          <th class="user-table__column-header">ユーザー名</th>
          <th class="user-table__column-header">職種</th>
          <th class="user-table__column-header">編集</th>
          <th class="user-table__column-header">削除</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id" class="user-table__row">
          <td class="user-table__cell">{{ user.id }}</td>
          <td class="user-table__cell">{{ user.name }} ({{ user.role }})</td>
          <td class="user-table__cell">{{ user.position }}</td>
          <td class="user-table__cell">
            <v-btn
              icon
              size="small"
              variant="text"
              color="primary"
              class="user-table__edit-button"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </td>
          <td class="user-table__cell">
            <v-btn
              icon
              size="small"
              variant="text"
              class="user-table__delete-button"
            >
              <v-icon>mdi-delete-outline</v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>

    <div class="user-table__pagination">
      <v-pagination
        v-model="page"
        :length="totalPages"
        :total-visible="5"
        rounded
      ></v-pagination>
    </div>
  </v-container>
</template>

<script setup>
import { ref, computed } from "vue";

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

const page = ref(1);
const itemsPerPage = ref(10);
const totalItems = computed(() => users.value.length);
const totalPages = computed(() =>
  Math.ceil(totalItems.value / itemsPerPage.value)
);
</script>

<style lang="scss" scoped>
.user-table {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }

  &__results {
    font-weight: 500;
    font-size: 16px;
  }

  &__count {
    font-weight: bold;
  }

  &__display-control {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__select {
    width: 120px;
  }

  &__data {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 16px;
  }

  &__column-header {
    text-align: left;
    padding: 12px 16px;
    border-bottom: 1px solid #e0e0e0;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.87);
  }

  &__row {
    border-bottom: 1px solid #e0e0e0;

    &:hover {
      background-color: #f5f5f5;
    }
  }

  &__cell {
    padding: 12px 16px;
    color: rgba(0, 0, 0, 0.87);
  }

  &__edit-button,
  &__delete-button {
    margin: 0;
    min-width: 36px;
    min-height: 36px;
  }

  &__delete-button {
    color: rgba(0, 0, 0, 0.6);
  }

  &__pagination {
    display: flex;
    justify-content: center;
    margin-top: 16px;
  }
}
</style>
