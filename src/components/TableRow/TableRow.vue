<template>
  <div class="my-2 rounded border border-gray-700 shadow-sm">
    <div
      :class="['grid', 'bg-gray-900', 'p-2', 'items-center', hasChildren ? 'cursor-pointer' : 'cursor-default']"
      :style="gridStyle"
      @click="toggleExpand"
    >
      <div class="text-center">
        {{ hasChildren ? (isExpanded ? '▼' : '▶') : '' }}
      </div>
      <div
        v-for="([key, value]) in itemValues"
        :key="key"
        class="font-bold text-center overflow-hidden px-2"
      >
        {{ value }}
      </div>
      <div class="text-center">
        <button
          @click.stop="handleDelete"
          class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-all duration-400"
        >
          Delete
        </button>
      </div>
    </div>
    <div v-if="isExpanded" class="ml-4">
      <!-- For nested tables, we disable the empty message -->
      <Table :items="item.children" :deleteItem="childDelete" :showEmptyMessage="false" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps } from 'vue'
import Table from '../Table/Table.vue'
import type { TableRowProps } from './types'

const props = defineProps<TableRowProps>()

const isExpanded = ref(false)

const hasChildren = computed(() => {
  return props.item.children && props.item.children.length > 0
})

const itemValues = computed(() => {
  return Object.entries(props.item).filter(([key]) => key !== 'children')
})

const gridStyle = computed(() => ({
  gridTemplateColumns: `minmax(0, 30px) repeat(${itemValues.value.length}, minmax(0, 1fr)) minmax(0, 100px)`
}))

function toggleExpand() {
  if (!hasChildren.value) return
  isExpanded.value = !isExpanded.value
}

function handleDelete() {
  props.deleteItem([props.item.id])
}

function childDelete(path: string[]) {
  props.deleteItem([props.item.id, ...path])
}
</script>
