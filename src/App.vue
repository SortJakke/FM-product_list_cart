<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
      <!-- Lista de produtos -->
      <section class="flex-1">
        <ProductList @add="addToCart" />
      </section>

      <!-- Carrinho lateral -->
      <aside class="w-full lg:w-80">
        <CartSidebar :items="cart" @remove="removeFromCart"/>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductList from './components/ProductList.vue'
import CartSidebar from './components/CartSidebar.vue'
import { ref } from 'vue'
import type { Product } from './types/Product'

const cart = ref<Product[]>([])

function addToCart(product: Product) {
  cart.value.push(product)
}

function removeFromCart(id: number) {
  cart.value = cart.value.filter(item => item.id !== id)
}
</script>
