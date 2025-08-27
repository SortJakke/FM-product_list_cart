<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <ProductCard
      v-for="(product, index) in productsList"
      :key="index"
      :product="product"
      :quantity="getQuantity(product)"
      @add="emit('add', product)"
      @increase="emit('increase', product.id)"
      @decrease="emit('decrease', product.id)"
    />
  </div>
</template>

<script setup lang="ts">
import ProductCard from "./ProductCard.vue"
import products from "../data/data.json"
import type { Product, CartItem } from "../types/product"

const productsList: Product[] = products

const props = defineProps<{ cart: CartItem[] }>()

const emit = defineEmits<{
  (e: "add", product: Product): void
  (e: "increase", id: number): void
  (e: "decrease", id: number): void
}>()

function getQuantity(product: Product): number {
  const item = props.cart.find(i => i.product.id === product.id)
  return item ? item.quantity : 0
}

</script>
