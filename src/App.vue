<template>
  <div class="main-font min-h-screen bg-[var(--rose100)] p-6">
    <div class="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
      <!-- product list -->
      <section class="flex-1">
        <h1 class="text-4xl font-bold mb-8">Desserts</h1>
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
  document.body.style.overflow = "hidden"
}

function resetOrder() {
  cart.value = []
  isOrderConfirmed.value = false
  document.body.style.overflow = "auto"  
}

</script>

<style>
:root {
  --red: hsl(14, 86%, 42%);
  --green: hsl(159, 69%, 38%);

  --rose50: hsl(20, 50%, 98%);
  --rose100: hsl(13, 31%, 94%);
  --rose300: hsl(14, 25%, 72%);
  --rose400: hsl(7, 20%, 60%);
  --rose500: hsl(12, 20%, 44%);
  --rose900: hsl(14, 65%, 9%);
}

.main-font {
  font-family: "Red Hat Text", sans-serif;
  color: hsl(14, 65%, 9%);
}
</style>
