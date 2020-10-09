<template>
  <div id="cart">
    <nav-bar class="nav-bar"><div slot="center">购物车({{cartCount}})</div></nav-bar>
    <cart-list :cart-list="cartList" class="cart-list"></cart-list>
    <bottom-bar></bottom-bar>
  </div>
</template>

<script>
  import NavBar from "common/navbar/NavBar";
  import CartList from "./childComps/CartList";
  import BottomBar from "./childComps/BottomBar";

  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      BottomBar
    },
    computed: {
      cartList() {
        return this.$store.getters.cartList
      },
      cartCount() {
        return this.$store.getters.cartCount
      }
    }
  }
</script>

<style scoped>
  #cart {
    height: 100vh;
  }

  .nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }

  .cart-list {
    position: absolute;
    width: 100%;
    top: 44px;
    bottom: 49px;
  }

</style>
