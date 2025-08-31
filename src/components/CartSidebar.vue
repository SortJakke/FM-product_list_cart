<template>
  <div class="bg-[var(--rose50)] rounded-lg p-6 flex flex-col gap-6">
    <h2 class="text-[var(--red)] text-xl font-bold">
      Your Cart ({{ totalItems }})
    </h2>

    <div
      v-if="items.length === 0"
      class="flex flex-col items-center text-sm text-[var(--rose500)] font-semibold"
    >
      <img
        src="../assets/illustration-empty-cart.svg"
        alt="empty cart"
        class="mx-auto mb-4"
      />
      Your added items will appear here.
    </div>

    <ul v-else class="space-y-4">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="flex justify-between items-center border-b pb-4 border-[var(--rose100)]"
      >
        <div>
          <p class="font-semibold mb-2">{{ item.product.name }}</p>
          <p class="text-sm flex gap-3">
            <span class="text-[var(--red)] font-semibold">
              {{ item.quantity }}x
            </span>
            <span class="text-[var(--rose400)]">
              @ ${{ item.product.price.toFixed(2) }}
            </span>
            <span class="text-[var(--rose500)] font-semibold">
              ${{ (item.product.price * item.quantity).toFixed(2) }}
            </span>
          </p>
        </div>
        <button
          @click="remove(item.product.id)"
          class="cursor-pointer w-[18px] h-[18px] flex items-center justify-center text-[var(--rose300)] hover:text-[var(--rose900)] transition"
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 50 50"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="24"
              cy="24"
              r="22"
              stroke="currentColor"
              stroke-width="5"
              fill="none"
            />
            <line
              x1="16"
              y1="16"
              x2="32"
              y2="32"
              stroke="currentColor"
              stroke-width="5"
            />
            <line
              x1="32"
              y1="16"
              x2="16"
              y2="32"
              stroke="currentColor"
              stroke-width="5"
            />
          </svg>
        </button>
      </li>
    </ul>

    <div v-if="items.length > 0" class="flex justify-between">
      <span>Order Total:</span>
      <span class="text-xl font-bold">${{ total.toFixed(2) }}</span>
    </div>

    <div
      v-if="items.length > 0"
      class="bg-[var(--rose100)] px-5 py-3 text-sm flex items-center gap-2 rounded-lg"
    >
      <img src="../assets/icon-carbon-neutral.svg" alt="carbon-neutral icon" />
      <p>
        This is a <span class="font-semibold">carbon-neutral</span> delivery
      </p>
    </div>

    <div v-if="items.length > 0">
      <button
        @click="emit('confirm')"
        class="cursor-pointer bg-[var(--red)] text-white px-4 py-2 rounded-3xl hover:bg-[hsl(14,86%,35%)] transition w-full"
      >
        Confirm Order
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import type { CartItem } from "../types/product"

const props = defineProps<{ items: CartItem[] }>()

const emit = defineEmits<{
  (e: "remove", id: number): void
  (e: "confirm"): void
}>()

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
