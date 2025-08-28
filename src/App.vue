<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
      <!-- product list -->
      <section class="flex-1">
        <ProductList
          :cart="cart"
          @add="addToCart"
          @increase="increaseQuantity"
          @decrease="decreaseQuantity"
        />
      </section>

      <!-- cart -->
      <aside class="w-full lg:w-80">
        <CartSidebar
          :items="cart"
          @remove="removeFromCart"
          @confirm="confirmOrder"
        />
      </aside>

      <!-- order confirmation modal -->
      <OrderModal v-if="isOrderConfirmed" :items="cart" @reset="resetOrder" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductList from "./components/ProductList.vue"
import CartSidebar from "./components/CartSidebar.vue"
import OrderModal from "./components/OrderModal.vue"
import { ref } from "vue"
import type { CartItem, Product } from "./types/product"

// Cart functions
const cart = ref<CartItem[]>([])

function addToCart(product: Product) {
  const existing = cart.value.find((item) => item.product.id === product.id)
  if (existing) {
    existing.quantity++
  } else {
    cart.value.push({ product, quantity: 1 })
  }
}

function increaseQuantity(id: number) {
  const item = cart.value.find((i) => i.product.id === id)
  if (item) item.quantity++
}

function decreaseQuantity(id: number) {
  const index = cart.value.findIndex((i) => i.product.id === id)
  if (index !== -1) {
    if (cart.value[index].quantity > 1) {
      cart.value[index].quantity--
    } else {
      cart.value.splice(index, 1)
    }
  }
}

function removeFromCart(id: number) {
  cart.value = cart.value.filter((item) => item.product.id !== id)
}

// Order confirmation functions
const isOrderConfirmed = ref(false)

function confirmOrder() {
  isOrderConfirmed.value = true
}

function resetOrder() {
  cart.value = []
  isOrderConfirmed.value = false
}
</script>
