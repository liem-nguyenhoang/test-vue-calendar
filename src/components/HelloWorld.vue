<template>
  <v-container>
    <v-select
      v-model="selected"
      :items="items"
      label="Chọn một mục"
      menu-class="custom-menu"
    >
      <template #item="{ item, index }">
        <div class="title">item: {{ item.title }}</div>
        <div class="value">index: {{ item.props.value }}</div>
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
};
</script>

<style>
.title {
  background-color: red;
  font-size: 8px;
}
.value {
  background-color: blue;
  font-size: 12px;
}
</style>
