<template>
  <div
    v-if="headers.length"
    class="grid bg-black p-2 font-bold rounded border border-gray-700"
    :style="gridStyle"
  >
    <!-- Empty div for expansion icon -->
    <div></div>
    <div v-for="(key, index) in headers" :key="index" class="text-center overflow-hidden px-2">
      {{ key }}
    </div>
    <div class="text-center">Actions</div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import type { TableHeaderProps } from './types'

const props = defineProps<TableHeaderProps>()

const headers = computed(() => Object.keys(props.item).filter(key => key !== 'children'))

const gridStyle = computed(() => ({
  gridTemplateColumns: `minmax(0, 30px) repeat(${headers.value.length}, minmax(0, 1fr)) minmax(0, 100px)`
}))
</script>
