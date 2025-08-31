<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue"
import type { Product } from "../types/product"

const props = defineProps<{
  product: Product
  quantity: number
}>()

const emit = defineEmits<{
  (e: "add", product: Product): void
  (e: "increase", id: number): void
  (e: "decrease", id: number): void
}>()

const selectedImage = ref("")

function resolveImage(path: string) {
  return new URL(`../assets/${path}`, import.meta.url).href
}

function updateImageByScreenSize() {
  const width = window.innerWidth

  if (width < 640) {
    selectedImage.value = resolveImage(props.product.image.mobile)
  } else if (width < 1024) {
    selectedImage.value = resolveImage(props.product.image.tablet)
  } else {
    selectedImage.value = resolveImage(props.product.image.desktop)
  }
}

onMounted(() => {
  updateImageByScreenSize()
  window.addEventListener("resize", updateImageByScreenSize)
})

onUnmounted(() => {
  window.removeEventListener("resize", updateImageByScreenSize)
})

function handleAdd() {
  emit("add", props.product)
}
function handleIncrease() {
  emit("increase", props.product.id)
}
function handleDecrease() {
  emit("decrease", props.product.id)
}
</script>

<template>
  <div class="flex flex-col gap-8">
    <div class="relative">
      <figure v-if="quantity === 0" class="w-full rounded-lg overflow-hidden">
        <img :src="selectedImage" :alt="product.name" class="object-contain" />
      </figure>
      <figure
        v-else
        class="w-full rounded-lg overflow-hidden border-2 border-[var(--red)]"
      >
        <img :src="selectedImage" :alt="product.name" class="object-contain" />
      </figure>
      <div
        class="absolute bottom-0 transform translate-y-1/2 left-1/2 -translate-x-1/2"
      >
        <div v-if="quantity === 0">
          <button
            @click="handleAdd"
            class="cursor-pointer w-[155px] flex justify-between bg-[var(--rose50)] border border-[var(--rose500)] font-semibold px-4 py-2 rounded-3xl hover:bg-[var(--rose100)] transition"
          >
            <img src="../assets/icon-add-to-cart.svg" alt="" />Add to Cart
          </button>
        </div>

        <div
          v-else
          class="w-[155px] flex justify-between items-center gap-2 bg-[var(--red)] border border-[var(--red)] text-[var(--rose50)] font-semibold px-4 py-2 rounded-3xl"
        >
          <button
            @click="handleDecrease"
            class="cursor-pointer w-[15px] h-[15px] flex items-center justify-center hover:text-[var(--red)] transition"
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 50 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="hover:fill-[var(--rose50)] transition"
            >
              <circle
                cx="24"
                cy="24"
                r="22"
                stroke="var(--rose50)"
                stroke-width="5"
              />
              <line
                x1="14"
                y1="24"
                x2="34"
                y2="24"
                stroke="currentColor"
                stroke-width="5"
              />
            </svg>
          </button>
          <span class="font-semibold">{{ quantity }}</span>
          <button
            @click="handleIncrease"
            class="cursor-pointer w-[15px] h-[15px] flex items-center justify-center hover:text-[var(--red)] transition"
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 50 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="hover:fill-[var(--rose50)] transition"
            >
              <circle
                cx="24"
                cy="24"
                r="22"
                stroke="var(--rose50)"
                stroke-width="5"
              />
              <line
                x1="24"
                y1="14"
                x2="24"
                y2="34"
                stroke="currentColor"
                stroke-width="5"
              />
              <line
                x1="14"
                y1="24"
                x2="34"
                y2="24"
                stroke="currentColor"
                stroke-width="5"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-1">
      <p class="text-[var(--rose500)]">{{ product.category }}</p>
      <h2 class="text-lg font-semibold">{{ product.name }}</h2>
      <p class="text-[var(--red)] font-semibold">
        ${{ product.price.toFixed(2) }}
      </p>
    </div>
  </div>
</template>
