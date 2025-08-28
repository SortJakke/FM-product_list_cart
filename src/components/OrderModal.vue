<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white rounded-lg p-6 w-full max-w-md">
      <h2 class="text-2xl font-bold mb-4">Order Confirmed</h2>
      <p class="text-gray-700 mb-4">We hope you enjoy your food</p>

      <ul class="text-left mb-4 grid gap-2">
        <li
          v-for="(item, index) in items"
          :key="index"
          class="w-full flex gap-2 items-center"
        >
          <img
            :src="resolveImage(item.product.image.thumbnail)"
            :alt="item.product.name"
            class="w-12 h-12 object-contain rounded"
          />
          <div class="">
            <p class="font-medium">{{ item.product.name }}</p>
            <p class="text-sm text-gray-600 flex gap-3">
              <span> {{ item.quantity }}x </span>
              <span> @${{ item.product.price.toFixed(2) }} </span>
              <span class="ml-auto">
                ${{ (item.product.price * item.quantity).toFixed(2) }}
              </span>
            </p>
          </div>
        </li>
      </ul>

      <p class="font-semibold mb-6">Order Total: ${{ total.toFixed(2) }}</p>

      <button
        @click="onReset"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full"
      >
        Start New Order
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import type { CartItem } from "../types/product"

const props = defineProps<{ items: CartItem[] }>()

const emit = defineEmits<{
  (e: "reset"): void
}>()

const total = computed(() =>
  props.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
)

function resolveImage(path: string) {
  return new URL(`../assets/${path}`, import.meta.url).href
}

function onReset() {
  emit("reset")
}
</script>
