<template>
  <v-container>
    <v-select
      v-model="selected"
      :items="items"
      label="Chọn một mục"
      menu-class="custom-menu"
      dessity="compact"
    >
      <template #item="{ props, item }">
        <v-list-item v-bind="props" height="10" density="compact">
          <template #title="{ title }">
            <div class="title">{{ title }}</div>
          </template>
        </v-list-item>
      </template>
    </v-select>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      selected: null,
      items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    };
  },
  methods: {
    getItemClass(item) {
      // Tùy chỉnh class dựa trên giá trị của item
      if (item === "Item 1") {
        return "item-red";
      } else if (item === "Item 2") {
        return "item-blue";
      } else {
        return "item-default";
      }
    },
  },
};
</script>

<style>
.title {
  background-color: red;
  font-size: 8px;
  padding: 0;
  margin: 0;
  height: 12px;
}
</style>
