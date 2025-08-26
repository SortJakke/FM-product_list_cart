<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <ProductCard
      v-for="(product, index) in productsList"
      :key="index"
      :product="product"
      @add="handleAddToCart"
    />
  </div>
</template>

<script setup lang="ts">
import ProductCard from './ProductCard.vue'
import products from '../data/data.json'
import type { Product } from '../types/Product'

// Define os produtos como um array tipado
const productsList: Product[] = products

// Emite o evento para o componente pai (App.vue)
const emit = defineEmits<{
  (e: 'add', product: Product): void
}>()

function handleAddToCart(product: Product) {
  emit('add', product)
}
</script>
