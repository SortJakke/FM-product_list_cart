<template>
  <div class="bg-white rounded-lg shadow-md p-4">
    <h2 class="text-xl font-bold mb-4">Carrinho</h2>

    <div v-if="items.length === 0" class="text-gray-500">
      Seu carrinho está vazio.
    </div>

    <ul v-else class="space-y-4">
      <li v-for="(item, index) in items" :key="index" class="flex justify-between items-center">
        <div>
          <p class="font-medium">{{ item.name }}</p>
          <p class="text-sm text-gray-600">R$ {{ item.price.toFixed(2) }}</p>
        </div>
        <button
          @click="remove(item.id)"
          class="text-red-500 hover:text-red-700 text-sm"
        >
          Remover
        </button>
      </li>
    </ul>

    <div v-if="items.length > 0" class="mt-6 border-t pt-4">
      <p class="font-semibold">
        Total: R$ {{ total.toFixed(2) }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Product } from '../types/Product'

const props = defineProps<{ items: Product[] }>()

const emit = defineEmits<{ (e: 'remove', id: number): void }>()

function remove(id: number) {
  emit('remove', id)
}

const total = computed(() =>
  props.items.reduce((sum, item) => sum + item.price, 0)
)
</script>
