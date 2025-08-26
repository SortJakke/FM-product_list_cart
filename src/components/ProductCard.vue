<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import type { Product } from '../types/Product'

const props = defineProps<{ product: Product }>()
const emit = defineEmits<{ (e: 'add', product: Product): void }>()

const selectedImage = ref('')

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
  window.addEventListener('resize', updateImageByScreenSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateImageByScreenSize)
})

function handleAdd() {
  emit('add', props.product)
}
</script>

<template>
  <div class="bg-white rounded-lg shadow-md p-4 flex flex-col items-center text-center">
    <img :src="selectedImage" :alt="product.name" class="w-32 h-32 object-contain mb-4" />
    <h2 class="text-lg font-semibold">{{ product.name }}</h2>
    <p class="text-gray-600 mb-2">R$ {{ product.price.toFixed(2) }}</p>
    <button
      @click="handleAdd"
      class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
    >
      Adicionar ao carrinho
    </button>
  </div>
</template>
