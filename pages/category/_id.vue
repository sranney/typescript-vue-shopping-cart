<template>
  <div><h1>{{categoryName}} Department</h1>
    <v-list>
      <v-list-item v-for="product in categoryProducts" :key="product.id" class="d-flex">
        <span class="text-h3">{{product.name}}</span>
        <span class="ml-3">Price: ${{product.price}}</span>
        <v-btn class="ml-3" color="primary" @click="addItemToCart(product)">
          <v-icon>mdi-plus</v-icon>
          Add to Cart
        </v-btn>
      </v-list-item>
    </v-list>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapState, mapGetters, mapMutations } from 'vuex'
import { Getters, CategoryPageState, CategoryPageMutations} from '../../store/index'
export default Vue.extend<Data, Methods, Computed, Props>({
  computed: {
    ...mapState([
      'allProducts',
      'activeProductCategory',
    ]),
    ...mapGetters([
      'categoryProducts'
    ]),
    categoryName():String {
      return this.$route.params.id
    }
  },
  mounted() {
    this.SET_ACTIVE_PRODUCT_CATEGORY(this.$route.params.id)
  },
  methods: {
    ...mapMutations(['ADD_TO_SHOPPING_CART', 'SET_ACTIVE_PRODUCT_CATEGORY']),
    addItemToCart(product: Product):void {
      this.ADD_TO_SHOPPING_CART(product)
    }
  }
})

interface Data {}
type Methods = CategoryPageMutations & {
  addItemToCart(product: Product): void
}
type Computed = CategoryPageState & Getters & {
  categoryName: String
}
interface Props {}
</script>