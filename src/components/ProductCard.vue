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
  <div
    class="bg-white rounded-lg shadow-md p-4 flex flex-col items-center text-center"
  >
    <img
      :src="selectedImage"
      :alt="product.name"
      class="w-32 h-32 object-contain mb-4"
    />
    <p class="text-gray-600">{{ product.category }}</p>
    <h2 class="text-lg font-semibold mb-2">{{ product.name }}</h2>
    <p class="text-gray-600 mb-2">${{ product.price.toFixed(2) }}</p>

    <div v-if="quantity === 0">
      <button
        @click="handleAdd"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Add to Cart
      </button>
    </div>

    <div v-else class="flex items-center gap-2">
      <button
        @click="handleDecrease"
        class="bg-gray-300 px-2 py-1 rounded hover:bg-gray-400"
      >
        -
      </button>
      <span class="font-semibold">{{ quantity }}</span>
      <button
        @click="handleIncrease"
        class="bg-gray-300 px-2 py-1 rounded hover:bg-gray-400"
      >
        +
      </button>
    </div>
  </div>
</template>
