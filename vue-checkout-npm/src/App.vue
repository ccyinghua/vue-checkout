<template>
    <div id="app">
        <!-- 路由 -->
        <router-view></router-view>
    </div>
</template>

<script>
import cart from './components/cart.vue'
import address from './components/address.vue'

export default {
  coponents: {
    cart,
    address
  }
}
</script>

<style>

</style>
