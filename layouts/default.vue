<template>
  <v-app dark>
    <shopping-cart-banner />
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import ShoppingCartBanner from '../components/ShoppingCartBanner.vue'
export default {
  components: {
    ShoppingCartBanner
  }
}
</script>
