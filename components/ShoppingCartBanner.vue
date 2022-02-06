<template>
  <div class="d-flex justify-space-between">
    <div class="d-flex align-center">
      <span>Shop:</span>
      <v-btn to="/category/Books" text nuxt>Books</v-btn>
      <v-btn to="/category/Clothes" text nuxt>Clothes</v-btn>
      <v-btn to="/category/Office" text nuxt>Office</v-btn>
    </div>
    <span class="mr-5">
      <v-btn to="/shopping-cart" icon nuxt><v-icon>mdi-cart</v-icon></v-btn>
      {{countOfItemsInCart}}
    </span>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { ShoppingCartState, ShoppingCartProduct } from '../store/index'
export default Vue.extend<Data, Methods, Computed, Props>({
  computed: {
    ...mapState(['shoppingCartProducts']),
    countOfItemsInCart():Number {
      return this.shoppingCartProducts.reduce((totalQuantityOfProducts: number, product: ShoppingCartProduct): number => {
        return totalQuantityOfProducts + product.quantity
      }, 0)
    }
  }
})

interface Data {}
type Methods = {}
type Computed = ShoppingCartState & {
  countOfItemsInCart: Number
}
interface Props {}
</script>