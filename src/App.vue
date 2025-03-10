<template>
  <div class="container mx-auto p-4 text-gray-200">
    <Table :items="items" :deleteItem="deleteItem" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Table from './components/Table/Table.vue';
import type { DataItem } from './types';
import { apiLoadData } from './api/data';
import { transformData } from './utils/transformData';

const items = ref<DataItem[]>([]);

onMounted(async () => {
  try {
    const apiData = await apiLoadData();
    const transformedData = apiData.map((item: any) => transformData(item));
    items.value = transformedData;
  } catch (error) {
    console.error("Error loading data:", error);
  }
});

function deleteItem(path: string[]) {
  items.value = deleteItemAtPath(items.value, path);
}

function deleteItemAtPath(array: DataItem[], path: string[]): DataItem[] {
  return array.reduce((acc: DataItem[], current: DataItem) => {
    if (current.id === path[0]) {
      if (path.length === 1) {
        // Delete this item by not including it in the new array.
        return acc;
      }
      acc.push({
        ...current,
        children: deleteItemAtPath(current.children, path.slice(1))
      });
    } else {
      acc.push(current);
    }
    return acc;
  }, []);
}
</script>
