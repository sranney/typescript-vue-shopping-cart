<template>
  <div>
    <div v-if="productsByCategory.length > 0">    
      <div  v-for="category in productsByCategory" :key="category.categoryName">
        <p class="text-h3">{{category.categoryName}}</p>
        <v-list>
          <v-list-item v-for="product in category.categoryProducts" :key="product.id" class="d-flex align-center">
            <div class="text-h4">{{product.name}}</div>
            <div class="ml-4">Unit Price: ${{product.price}}</div>
            <div class="d-flex ml-4">
              <v-btn color="primary" @click="REMOVE_FROM_SHOPPING_CART(product.id)" x-small>-1</v-btn>
              <div class="mx-4 px-4 white black--text ">{{product.quantity}}</div>
              <v-btn color="primary" @click="ADD_TO_SHOPPING_CART(product)" x-small>+1</v-btn>
            </div>
          </v-list-item>
        </v-list>
      </div>
      <div>Total Price of Products in Shopping Cart: ${{totalPrice}}</div>
    </div>
    <div v-else class="text-h3">
      There are no products in your cart
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapState, mapMutations } from 'vuex'
import { ShoppingCartMutations, ShoppingCartState, ShoppingCartProduct } from '../store/index'
export default Vue.extend<Data, Methods, Computed, Props>({
  computed: {
    ...mapState(['shoppingCartProducts']),
    totalPrice():Number {
      return this.shoppingCartProducts.reduce((summedPrice:number, product):number => {
        return summedPrice + (product.quantity * product.price)
      }, 0)
    },
    productsByCategory():ProductsByCategory[] {
      return this.shoppingCartProducts.reduce((shapedProductsByCategory: ProductsByCategory[], product:ShoppingCartProduct):ProductsByCategory[]=> {
        const productCategoryInShapedData = shapedProductsByCategory.find(({categoryName}: ProductsByCategory) => categoryName === product.category)
        if(productCategoryInShapedData) {
          productCategoryInShapedData.categoryProducts.push(product)
          return shapedProductsByCategory
        } else {
          shapedProductsByCategory.push({
            categoryName: product.category,
            categoryProducts: [product]
          })
          return shapedProductsByCategory
        }
      },[])
    }
  },
  methods: {
    ...mapMutations(['ADD_TO_SHOPPING_CART', 'REMOVE_FROM_SHOPPING_CART'])
  }
})
type ProductsByCategory = {
  categoryName: String,
  categoryProducts: ShoppingCartProduct[]
}
type Data = {}
type Methods = ShoppingCartMutations
type Computed = ShoppingCartState & {
  totalPrice: Number,
  productsByCategory: ProductsByCategory[]
}
type Props = {}
</script>