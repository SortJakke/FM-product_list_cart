<template>
  <div class="bg-white rounded-lg shadow-md p-4">
    <h2 class="text-xl font-bold mb-4">Your Cart ({{ totalItems }})</h2>

    <div v-if="items.length === 0" class="text-gray-500">
      Your added items will appear here.
    </div>

    <ul v-else class="space-y-4">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="flex justify-between items-center"
      >
        <div>
          <p class="font-medium">{{ item.product.name }}</p>
          <p class="text-sm text-gray-600 flex gap-3">
            <span> {{ item.quantity }}x </span>
            <span> @${{ item.product.price.toFixed(2) }} </span>
            <span> ${{ (item.product.price * item.quantity).toFixed(2) }} </span>
          </p>
        </div>
        <button
          @click="remove(item.product.id)"
          class="text-red-500 hover:text-red-700 text-sm"
        >
          Remove
        </button>
      </li>
    </ul>

    <div v-if="items.length > 0" class="mt-6 border-t pt-4">
      <p class="font-semibold">Order Total: ${{ total.toFixed(2) }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import type { CartItem } from "../types/product"

const props = defineProps<{ items: CartItem[] }>()

const emit = defineEmits<{ (e: "remove", id: number): void }>()

function remove(id: number) {
  emit("remove", id)
}

const total = computed(() =>
  props.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
)
const totalItems = computed(() =>
  props.items.reduce((sum, item) => sum + item.quantity, 0)
)
</script>
