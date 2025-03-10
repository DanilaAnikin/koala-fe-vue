<template>
  <div v-if="items.length" class="border border-slate-100 p-2 rounded">
    <TableHeaders v-if="headers.length" :item="items[0]" />
    <div v-for="item in items" :key="item.id">
      <TableRow :item="item" :deleteItem="(path) => deleteItem([...path])" />
    </div>
  </div>
  <template v-else>
    <span v-if="showEmptyMessage">No data</span>
  </template>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import TableHeaders from '../TableHeaders/TableHeaders.vue'
import TableRow from '../TableRow/TableRow.vue'
import type { TableProps } from './types'

const props = defineProps<TableProps>()

const headers = computed(() => {
  const firstItem = props.items[0]
  if (!firstItem) return []
  return Object.keys(firstItem).filter(key => key !== 'children')
})
</script>
