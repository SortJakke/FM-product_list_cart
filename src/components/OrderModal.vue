<template>
  <div
    class="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-end md:items-center justify-center z-50 overflow-hidden"
  >
    <div
      class="bg-[var(--rose50)] rounded-t-lg md:rounded-lg p-3 w-full max-w-lg h-[87%] md:h-[70%]"
    >
      <div class="flex flex-col gap-4 p-3 h-full rounded-lg overflow-auto">
        <div class="w-[40px]">
          <img
            src="../assets/icon-order-confirmed.svg"
            alt="order confirmed"
            class="w-full"
          />
        </div>

        <div>
          <h2
            class="text-4xl font-bold leading-tight whitespace-nowrap w-fit mb-2"
          >
            Order <br />
            Confirmed
          </h2>
          <p class="text-[var(--rose500)]">We hope you enjoy your food</p>
        </div>

        <div
          class="bg-[var(--rose100)] p-6 rounded-lg flex-1 flex flex-col gap-6"
        >
          <ul class="text-left grid gap-2">
            <li
              v-for="(item, index) in items"
              :key="index"
              class="flex justify-between items-center gap-3 border-b pb-4 border-[var(--rose300)]"
            >
              <img
                :src="resolveImage(item.product.image.thumbnail)"
                :alt="item.product.name"
                class="w-12 h-12 object-contain rounded"
              />
              <div class="">
                <p
                  class="font-medium truncate w-40 whitespace-nowrap overflow-hidden md:w-full"
                >
                  {{ item.product.name }}
                </p>
                <p class="text-sm text-gray-600 flex gap-3">
                  <span> {{ item.quantity }}x </span>
                  <span> @${{ item.product.price.toFixed(2) }} </span>
                </p>
              </div>
              <span class="ml-auto font-semibold">
                ${{ (item.product.price * item.quantity).toFixed(2) }}
              </span>
            </li>
          </ul>
          <p class="flex justify-between">
            <span>Order Total:</span>
            <span class="text-xl font-bold">${{ total.toFixed(2) }}</span>
          </p>
        </div>

        <button
          @click="onReset"
          class="cursor-pointer bg-[var(--red)] text-white px-4 py-2 rounded-3xl hover:bg-[hsl(14,86%,35%)] transition w-full"
        >
          Start New Order
        </button>
      </div>
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
